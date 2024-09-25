import DropBinInfo from "@/components/commons/DropBottom/DropBinInfo";
import Toast from "@/components/commons/Toast";
import { getLocation } from "@/lib/apis/geo";
import { getAroundbins } from "@/lib/apis/search";
import {
  mapCenterCoordinate,
  newAddAddress,
  newAddCoordinate,
  userAddress,
  userCoordinate,
} from "@/lib/atoms/userAtom";
import { BinItemType } from "@/lib/constants/btnInputValues";
import { useToggle } from "@/lib/hooks/useToggle";
import {
  addClickMarker,
  filterAddress,
  getAddressFromCoords,
  initializeMap,
  loadKakaoMapScript,
  updateMarkers,
} from "@/lib/map";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import AroundBinSearchBtns from "../AroundBinSearchBtns";
import BinTypeBtnList from "../BinTypeBtnList";
import RecommendCard from "../RecommendCard";
import styles from "./KakaoMap.module.scss";

const cn = classNames.bind(styles);

export default function KakaoMap({ isAddBin }: { isAddBin: boolean }) {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [, setAddress] = useAtom(userAddress);
  const [newAddress, setNewAddAddress] = useAtom(newAddAddress);
  const [, setNewAddCoordinate] = useAtom(newAddCoordinate);
  const [bins, setbins] = useState<any>("");
  const [isCardHidden, setIsCardHidden] = useState(false);
  const [binType, setBinType] = useState<
    null | BinItemType["id"] | "isBookmarked"
  >(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedBinId, setSelectedBinId] = useState<number | null>(null);
  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const binkMarkerRef = useRef<any>([]);
  const [centerCoordinate, setCenterCoordinate] = useAtom(mapCenterCoordinate);
  const [toggleMyLocation, toggleMyLocationOpen, toggleMyLocationClose] =
    useToggle(false);
  const [toggleAroundBin, toggleAroundBinOpen, toggleAroundBinClose] =
    useToggle(false);
  const [toggleBinInfo, toggleBinInfoOpen, toggleBinInfoClose] =
    useToggle(false);

  const { data: locationData, refetch: locationRefetch } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
    gcTime: 3000,
  });
  console.log("bins", bins);

  const fetchBinsWithId = async (
    id: BinItemType["id"] | "isBookmarked" | null
  ) => {
    const data = await getAroundbins(
      centerCoordinate.x,
      centerCoordinate.y,
      id !== "isBookmarked" ? id : null,
      500
    );
    return data;
  };

  // React Query에서 binType을 기반으로 쿼리 실행
  const {
    data: binData,
    refetch: refetchBinData,
    isError,
  } = useQuery({
    queryKey: ["get-around-bins", binType], // queryKey로 binType을 포함
    queryFn: () => fetchBinsWithId(binType),
    enabled: !!binType && !!centerCoordinate.x && !!centerCoordinate.y, // binType이 존재할 때만 실행
    gcTime: 3000,
  });

  const handleClickSearchBintype = (id: BinItemType["id"] | "isBookmarked") => {
    setBinType((prev) => (prev === id ? null : id)); // 같은 타입이면 해제, 아니면 설정
  };

  // binType 상태를 감지하고 그에 따라 데이터 가져오기
  useEffect(() => {
    const fetchBinData = async () => {
      if (!binType || centerCoordinate.x === 0 || centerCoordinate.y === 0) {
        return;
      }

      try {
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null)); // 기존 마커 제거
        binkMarkerRef.current = [];

        const { data: fetchedBinData } = await refetchBinData(); // binType에 따른 데이터 가져오기
        setbins(fetchedBinData);

        if (fetchedBinData?.length === 0) {
          setShowToast(true);
        } else {
          setShowToast(false);
        }

        if (binType === "isBookmarked") {
          setbins((prev: any) => prev?.filter((bin: any) => bin.isBookMarked));
        }

        // 마커 업데이트
        if (fetchedBinData && !!mapRef.current) {
          updateMarkers(
            fetchedBinData,
            mapRef.current,
            binkMarkerRef,
            handleClickMarker
          );
        }

        const timer = setTimeout(() => {
          setShowToast(false);
        }, 3000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error(
          "주변 쓰레기통 데이터를 불러오는 데 실패했습니다:",
          error
        );
      }
    };

    fetchBinData(); // 상태가 변경될 때마다 데이터 가져오기
  }, [binType]); // binType과 좌표가 변경될 때 실행

  console.log(binType);
  //gps로 현위치 불러오기
  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
      setCenterCoordinate(locationData[0]);
      setNewAddCoordinate(locationData[0]);
    }
  }, [locationData]);

  //중앙 좌표값 세팅
  const debouncedHandleCenterChanged = useDebounceCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const newCenterCoordinate = {
        x: center.getLat(),
        y: center.getLng(),
      };

      setCenterCoordinate(newCenterCoordinate);
      if (newCenterCoordinate !== centerCoordinate) {
        toggleAroundBinClose();
        toggleMyLocationClose();
      }
    }
  }, 500);

  const handleClickAddMarker = (mouseEvent: any) => {
    if (isAddBin) {
      const latlng = mouseEvent.latLng;
      const newCoordinate = { x: latlng.getLat(), y: latlng.getLng() };
      setNewAddCoordinate(newCoordinate);
      getAddressFromCoords(window.kakao, newCoordinate, (getAddress: any) => {
        setNewAddAddress({
          roadAddress:
            filterAddress(getAddress.road_address?.address_name) || null,
          address: getAddress.address?.address_name,
        });
      });
      addClickMarker(
        mapRef.current,
        window.kakao,
        newCoordinate,
        binkMarkerRef.current,
        (newMarker) => {
          binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
          binkMarkerRef.current = [];

          binkMarkerRef.current.push(newMarker);
        }
      );
    }
  };

  useEffect(() => {
    // Kakao Map 스크립트를 로드
    loadKakaoMapScript(() => {
      if (coordinate.x !== 0 && coordinate.y !== 0) {
        const result = initializeMap(coordinate, setAddress);
        if (result) {
          mapRef.current = result.map;
          myMarkerRef.current = result.myLocationMarker;

          // 맵 중앙 이동시 새로 데이터 불러오기
          window.kakao.maps.event.addListener(
            mapRef.current,
            "center_changed",
            debouncedHandleCenterChanged
          );

          if (isAddBin) {
            window.kakao.maps.event.addListener(
              mapRef.current,
              "click",
              handleClickAddMarker
            );
          }
        }
      } else {
        console.error("Invalid coordinates or Kakao Map API not loaded.");
      }
    });

    return () => {
      if (mapRef.current) {
        // 등록된 모든 마커 제거
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
        binkMarkerRef.current = [];
      }
    };
  }, [coordinate, isAddBin, binkMarkerRef]);

  //내위치 버튼
  const handleClickGetmyLocation = async () => {
    try {
      const { data: newLocationData } = await locationRefetch();
      if (newLocationData && Array.isArray(newLocationData)) {
        const newCoordinate = newLocationData[0];
        setCoordinate(newCoordinate);
        toggleMyLocationOpen();

        const newLatLng = new window.kakao.maps.LatLng(
          newCoordinate.x,
          newCoordinate.y
        );
        mapRef.current.panTo(newLatLng);
        myMarkerRef.current.setPosition(newLatLng);

        getAddressFromCoords(window.kakao, newCoordinate, (getAddress: any) => {
          setAddress({
            roadAddress:
              filterAddress(getAddress.road_address?.address_name) || null,
            address: getAddress.address?.address_name,
          });
        });
      }
    } catch (error) {
      console.error("데이터 다시 불러오기 실패:", error);
    }
  };

  console.log("bbb", binData);
  // 맵 중앙 이동시 새로 데이터 불러오기
  // useEffect(() => {
  //   if (mapRef.current && centerCoordinate.x !== 0) {
  //     refetchBinData();
  //   }
  // }, [centerCoordinate, refetchBinData]);

  const handleClickGetAroundBinData = async () => {
    try {
      if (centerCoordinate.x !== 0 && centerCoordinate.y !== 0) {
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
        binkMarkerRef.current = [];
        toggleAroundBinOpen();
        const { data: fetchedBinData } = await refetchBinData();
        setbins(fetchedBinData);
        setIsCardHidden(false);

        if (fetchedBinData.length === 0) {
          setShowToast(true);
        }
        if (fetchedBinData && fetchedBinData.length > 0) {
          const { latitude, longitude } = fetchedBinData[0];
          const latLng = new window.kakao.maps.LatLng(latitude, longitude);

          mapRef.current.panTo(latLng);

          updateMarkers(
            fetchedBinData,
            mapRef.current,
            binkMarkerRef,
            handleClickMarker
          );
        }
      }
    } catch (error) {
      console.error("주변 쓰레기통 데이터를 불러오는 데 실패했습니다:", error);
    }

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const handleClickMarker = (id: number) => {
    console.log(id);
    setSelectedBinId(id);
    toggleBinInfoOpen();
  };

  if (isAddBin) {
    return (
      <div
        id="map"
        style={{
          width: "100%",
          zIndex: "0",
          position: "relative",
        }}
        ref={mapRef}
        className={cn("map")}
      ></div>
    );
  }
  return (
    <>
      <BinTypeBtnList binType={binType!} onClick={handleClickSearchBintype} />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "0",
          position: "relative",
        }}
        ref={mapRef}
      ></div>
      <AroundBinSearchBtns
        onClickGetAroundBinData={handleClickGetAroundBinData}
        onClickGetmyLocation={handleClickGetmyLocation}
        toggleAroundBin={toggleAroundBin}
        toggleMyLocation={toggleMyLocation}
        hasData={!isError && bins?.length > 0}
        isCardHidden={isCardHidden}
      />
      {!isCardHidden && !!bins && bins[0]?.id && (
        <RecommendCard
          setIsCardHidden={setIsCardHidden}
          isCardHidden={isCardHidden}
          binDataId={bins[0]?.id}
          distance={bins[0]?.distance}
        />
      )}
      {showToast && <Toast>근처 쓰레기통이 없습니다</Toast>}
      {toggleBinInfo && selectedBinId !== null && (
        <DropBinInfo
          binId={selectedBinId}
          distance={
            binData.find((bin: any) => bin.id === selectedBinId)?.distance
          }
          closeDropDown={toggleBinInfoClose}
        />
      )}
    </>
  );
}
