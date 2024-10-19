import Button from "@/components/commons/Button";
import DropBinInfo from "@/components/commons/DropBottom/DropBinInfo";
import Toast from "@/components/commons/Toast";
import { getLocation } from "@/lib/apis/geo";
import {
  mapCenterCoordinate,
  newAddAddress,
  newAddCoordinate,
  searchChoice,
  userAddress,
  userCoordinate,
} from "@/lib/atoms/userAtom";
import { BinItemType } from "@/lib/constants/btnInputValues";
import { useToggle } from "@/lib/hooks/useToggle";
import {
  addClickMarker,
  addMyLocationMarker,
  fetchAddressFromCoords,
  panToCoordinate,
  resetAndAddMarkers,
  useBinData,
  useKakaoMap,
} from "@/lib/mapUtills";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import AroundBinSearchBtns from "../AroundBinSearchBtns";
import BinTypeBtnList from "../BinTypeBtnList";
import RecommendCard from "../RecommendCard";

export default function KakaoMap({
  isAddBin,
  isSearch = false,
}: {
  isAddBin: boolean;
  isSearch?: boolean;
}) {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [, setAddress] = useAtom(userAddress);
  const [, setNewAddAddress] = useAtom(newAddAddress);
  const [AddCoordinate, setNewAddCoordinate] = useAtom(newAddCoordinate);
  const [choice] = useAtom(searchChoice);
  const [bins, setbins] = useState<any>("");
  const [isCardHidden, setIsCardHidden] = useState(false);
  const [binType, setBinType] = useState<
    null | BinItemType["id"] | "isBookmarked"
  >(null);
  const [selectedBinId, setSelectedBinId] = useState<number | null>(null);
  const [centerCoordinate, setCenterCoordinate] = useAtom(mapCenterCoordinate);
  const [showToast, toggleToastOpen, toggletoastClose] = useToggle(false);
  const [
    toggleMyLocation,
    toggleMyLocationOpen,
    toggleMyLocationClose,
    toggleMyLocationToggle,
  ] = useToggle(false);
  const [toggleAroundBin, toggleAroundBinOpen, toggleAroundBinClose] =
    useToggle(false);
  const [toggleBinInfo, toggleBinInfoOpen, toggleBinInfoClose] =
    useToggle(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { query } = router;

  const { data: locationData, refetch: locationRefetch } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
    gcTime: 3000,
  });

  useEffect(() => {
    if (query.latitude && query.longitude) {
      setNewAddAddress({ roadAddress: "", address: "" });
      setNewAddCoordinate({ x: 0, y: 0 });
      setCoordinate({
        x: Number(query.latitude),
        y: Number(query.longitude),
      });
    } else return;
  }, [query]);

  useEffect(() => {
    if (isSearch && choice.latitude !== 0 && choice.longitude !== 0) {
      setCenterCoordinate({ x: choice.latitude, y: choice.longitude });
    } else return;
  }, [isSearch, choice]);

  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
      setCenterCoordinate(locationData[0]);
    }
  }, [locationData]);

  const {
    data: binData,
    refetch: refetchBinData,
    isError,
    isLoading,
  } = useBinData(binType, centerCoordinate);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        toggletoastClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleMarkerClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "Marker_click", {
        event_category: "Navigation",
        event_label: "Marker Button",
        value: 1,
      });
    }
  };
  const handleClickMarker = (id: number) => {
    setSelectedBinId(id);
    toggleBinInfoOpen();
    handleMarkerClick();
  };

  const debouncedHandleCenterChanged = useDebounceCallback(() => {
    if (!!mapRef.current) {
      const center = mapRef.current.getCenter();
      const newCenterCoordinate = {
        x: center.getLat(),
        y: center.getLng(),
      };

      if (
        newCenterCoordinate.x !== centerCoordinate.x ||
        newCenterCoordinate.y !== centerCoordinate.y
      ) {
        setCenterCoordinate(newCenterCoordinate);
        toggleAroundBinClose();
      }
    }
  }, 300);

  const { mapRef, myMarkerRef, binkMarkerRef } = useKakaoMap(
    coordinate,
    setAddress,
    debouncedHandleCenterChanged,
    handleClickAddMarker,
    isAddBin,
    isSearch,
    choice,
    handleClickMarker
  );

  function handleClickAddMarker(mouseEvent: any) {
    if (!isAddBin) return;

    const latlng = mouseEvent.latLng;
    const newCoordinate = { x: latlng.getLat(), y: latlng.getLng() };
    setNewAddCoordinate(newCoordinate);
    fetchAddressFromCoords(newCoordinate, setNewAddAddress);

    addClickMarker(
      mapRef.current,
      window.kakao,
      newCoordinate,
      binkMarkerRef,
      (newMarker) => {
        binkMarkerRef.current = [newMarker];
      }
    );
  }

  const handleClickSearchBintype = (id: BinItemType["id"] | "isBookmarked") => {
    return setBinType((prev) => (prev === id ? null : id));
  };

  const handleClickGetAroundBinData = async () => {
    try {
      toggleAroundBinOpen();
      const { data: fetchedBinData } = await refetchBinData();
      setbins(fetchedBinData);
      setIsCardHidden(false);
      if (fetchedBinData.length === 0) {
        toggleToastOpen();
      } else if (fetchedBinData.length > 0) {
        panToCoordinate(mapRef.current, fetchedBinData[0]);
        resetAndAddMarkers(
          mapRef.current,
          binkMarkerRef,
          fetchedBinData,
          handleClickMarker
        );
      }
    } catch (error) {
      console.error("주변 쓰레기통 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    const fetchBinData = async () => {
      if (binType == undefined) {
        return;
      }

      try {
        const { data: fetchedBinData } = await refetchBinData();
        setbins(fetchedBinData);
        console.log(binType);
        if (fetchedBinData?.length === 0) {
          toggleToastOpen();
          if (mapRef.current) {
            resetAndAddMarkers(
              mapRef.current,
              binkMarkerRef,
              [],
              handleClickMarker
            );
          }
        }

        if (binType === "isBookmarked") {
          console.log("bins", bins);
          return setbins(
            (prev: any) => prev?.filter((bin: any) => bin.isBookmarked) || []
          );
        }

        if (fetchedBinData && mapRef.current && bins.length !== 0) {
          const filteredData = fetchedBinData.filter(
            (item: any) => item.type === binType
          );

          panToCoordinate(mapRef.current, filteredData[0]);
          return resetAndAddMarkers(
            mapRef.current,
            binkMarkerRef,
            filteredData,
            handleClickMarker
          );
        }
      } catch (error) {
        console.error(
          "주변 쓰레기통 데이터를 불러오는 데 실패했습니다:",
          error
        );
      }
    };

    fetchBinData();
  }, [binType, isSearch]);

  const handleClickGetmyLocation = async () => {
    try {
      const { data: newLocationData } = await locationRefetch();
      if (newLocationData && Array.isArray(newLocationData)) {
        if (newLocationData[0] !== coordinate) {
          myMarkerRef.current.forEach((marker: any) => marker?.setMap(null));

          addMyLocationMarker(mapRef.current, window.kakao, {
            x: newLocationData[0].x,
            y: newLocationData[0].y,
          });
        }

        const newCoordinate = newLocationData[0];
        setCoordinate(newCoordinate);

        panToCoordinate(mapRef.current, {
          latitude: newLocationData[0].x,
          longitude: newLocationData[0].y,
        });

        fetchAddressFromCoords(newLocationData[0], setAddress);
      }
    } catch (error) {
      console.error("데이터 다시 불러오기 실패:", error);
      // toggleMyLocationClose();
    }
  };

  if (isAddBin) {
    return (
      <>
        <div
          id="map"
          style={{
            width: "100%",
            height: "calc(100vh - 7.3rem)",
            zIndex: "0",
            position: "relative",
          }}
          ref={mapRef}
        ></div>
        <Button
          style={{
            zIndex: "3",
            position: "absolute",
            width: "calc(100% - 4rem)",
            left: "2rem",
            bottom: "3rem",
          }}
          onClick={() => {
            setCoordinate({ x: 0, y: 0 });
            router.back();
          }}
          disabled={AddCoordinate.x === 0}
          status="primary"
        >
          현재 위치로 등록
        </Button>
      </>
    );
  }
  // const mapDrag = getSwLatlng();
  // const [prevMapDrag, setPrevMapDrag] = useState();
  // console.log(mapDrag);
  // useEffect(() => {
  //   if (mapDrag !== prevMapDrag) {
  //     toggleMyLocationClose();
  //   }
  // }, [mapDrag]);

  useEffect(() => {
    if (toggleMyLocation) {
      handleClickGetmyLocation();
      const id = setInterval(() => {
        handleClickGetmyLocation();
      }, 3000);

      handleClickGetmyLocation();
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [toggleMyLocation]);

  return (
    <>
      <BinTypeBtnList binType={binType!} onClick={handleClickSearchBintype} />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          zIndex: "0",
          position: "relative",
        }}
        ref={mapRef}
        onClick={() => setIsCardHidden(true)}
      ></div>
      <AroundBinSearchBtns
        onClickGetAroundBinData={handleClickGetAroundBinData}
        onClickGetmyLocation={handleClickGetmyLocation}
        toggleAroundBin={toggleAroundBin}
        toggleMyLocation={toggleMyLocation}
        toggleMyLocationToggle={toggleMyLocationToggle}
        hasData={
          !isError && (bins?.length > 0 || (isSearch && choice.id !== 0))
        }
        isCardHidden={isCardHidden}
      />
      {!isCardHidden && (bins[0]?.id || (isSearch && choice.id !== 0)) && (
        <RecommendCard
          setIsCardHidden={setIsCardHidden}
          isCardHidden={isCardHidden}
          binDataId={bins[0]?.id || choice.id || choice.binId!}
          distance={bins[0]?.distance || choice.distance}
          handleClickMarker={handleClickMarker}
        />
      )}
      {showToast && <Toast>근처 쓰레기통이 없습니다</Toast>}
      {isLoading && <Toast>근처 쓰레기통을 검색 중 입니다</Toast>}

      {toggleBinInfo && selectedBinId !== null && (
        <DropBinInfo
          binId={selectedBinId}
          distance={
            binData?.find((bin: any) => bin.id === selectedBinId)?.distance ||
            choice.distance
          }
          closeDropDown={toggleBinInfoClose}
          getBibsData={handleClickGetAroundBinData}
        />
      )}
    </>
  );
}
