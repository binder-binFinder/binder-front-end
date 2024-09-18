import { getLocation } from "@/lib/apis/geo";
import { getAroundbins } from "@/lib/apis/search";
import {
  mapCenterCoordinate,
  userAddress,
  userCoordinate,
} from "@/lib/atoms/userAtom";
import {
  addMyLocationMarker,
  createMarker,
  filterAddress,
  getAddressFromCoords,
  getMarkerImage,
  initMap,
} from "@/lib/map";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDebounceCallback } from "usehooks-ts";
import styles from "./KakaoMap.module.scss";

const cn = classNames.bind(styles);

declare global {
  interface Window {
    kakao: any;
  }
}

const loadKakaoMapScript = (callback: () => void) => {
  if (window.kakao && window.kakao.maps) {
    callback();
  } else {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;

    kakaoMapScript.async = false;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        callback();
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }
};

const initializeMap = (coordinate: any, setAddress: any) => {
  if (window.kakao && window.kakao.maps) {
    const map = initMap(window.kakao, coordinate);
    const myLocationMarker = addMyLocationMarker(map, window.kakao, coordinate);

    getAddressFromCoords(window.kakao, coordinate, (getAddress: any) => {
      setAddress({
        roadAddress:
          filterAddress(getAddress.road_address?.address_name) || null,
        address: getAddress.address?.address_name,
      });
    });

    return { map, myLocationMarker };
  } else {
    return null;
  }
};

const updateMarkers = (binData: any, map: any, binkMarkerRef: any) => {
  if (binkMarkerRef.current.length > 0) {
    binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
  }

  if (binData && !!map) {
    const newMarkers = binData.map((bin: any) => {
      const marker = createMarker(
        window.kakao,
        map,
        { x: bin.latitude, y: bin.longitude },
        getMarkerImage(bin.isBookMarked, bin.type),
        bin.title
      );
      return marker;
    });
    binkMarkerRef.current = newMarkers;
  }
};

export default function KakaoMap() {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [, setAddress] = useAtom(userAddress);
  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const binkMarkerRef = useRef<any>([]);
  const [centerCoordinate, setCenterCoordinate] = useAtom(mapCenterCoordinate);

  const { data: locationData, refetch: locationRefetch } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
    gcTime: 3000,
  });

  const { data: binData, refetch: refetchBinData } = useQuery({
    queryKey: ["get-around-bins", centerCoordinate],
    queryFn: () =>
      getAroundbins(centerCoordinate.x, centerCoordinate.y, null, 500),
    enabled: !!centerCoordinate.x && !!centerCoordinate.y,
    gcTime: 3000,
  });

  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
      setCenterCoordinate(locationData[0]);
    }
  }, [locationData]);

  const debouncedHandleCenterChanged = useDebounceCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const newCenterCoordinate = {
        x: center.getLat(),
        y: center.getLng(),
      };
      setCenterCoordinate(newCenterCoordinate);
    }
  }, 500);

  useEffect(() => {
    loadKakaoMapScript(() => {
      if (coordinate.x !== 0 && coordinate.y !== 0) {
        const result = initializeMap(coordinate, setAddress);
        if (result) {
          mapRef.current = result.map;
          myMarkerRef.current = result.myLocationMarker;

          updateMarkers(binData, mapRef.current, binkMarkerRef);

          window.kakao.maps.event.addListener(
            mapRef.current,
            "center_changed",
            debouncedHandleCenterChanged
          );
        }
      } else {
        console.error("Invalid coordinates or Kakao Map API not loaded.");
      }
    });

    return () => {
      if (mapRef.current) {
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
        binkMarkerRef.current = [];
      }
    };
  }, [coordinate]);

  const handelClickGetmyLocation = async () => {
    try {
      const { data: newLocationData } = await locationRefetch();
      if (newLocationData && Array.isArray(newLocationData)) {
        const newCoordinate = newLocationData[0];
        setCoordinate(newCoordinate);

        if (mapRef.current && myMarkerRef.current && window.kakao.maps) {
          const newLatLng = new window.kakao.maps.LatLng(
            newCoordinate.x,
            newCoordinate.y
          );
          mapRef.current.panTo(newLatLng);
          myMarkerRef.current.setPosition(newLatLng);

          getAddressFromCoords(
            window.kakao,
            newCoordinate,
            (getAddress: any) => {
              setAddress({
                roadAddress:
                  filterAddress(getAddress.road_address?.address_name) || null,
                address: getAddress.address?.address_name,
              });
            }
          );
        }
      }
    } catch (error) {
      console.error("데이터 다시 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (mapRef.current && centerCoordinate.x !== 0) {
      refetchBinData();
    }
  }, [centerCoordinate, refetchBinData]);

  useEffect(() => {
    if (binData && !!mapRef.current) {
      updateMarkers(binData, mapRef.current, binkMarkerRef);
    }
  }, [binData]);

  return (
    <>
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
      <section className={cn("map-wrapper")}>
        <button
          className={cn("my-location-btn")}
          onClick={handelClickGetmyLocation}
        >
          <Image
            src={"/images/icon-my-lovcationBtn.svg"}
            alt="내 위치 다시 가져오기"
            width={49}
            height={49}
          />
        </button>
      </section>
    </>
  );
}
