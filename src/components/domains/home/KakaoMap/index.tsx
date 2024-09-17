import { getLocation } from "@/lib/apis/geo";
import { getAroundbins } from "@/lib/apis/search";
import { userAddress, userCoordinate } from "@/lib/atoms/userAtom";
import {
  addMyLocationMarker,
  createMarker,
  getAddressFromCoords,
  getMarkerImage,
  initMap,
} from "@/lib/map";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./KakaoMap.module.scss";

const cn = classNames.bind(styles);

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [, setAddress] = useAtom(userAddress);
  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const binkMarkerRef = useRef<any>([]);
  const queryClient = useQueryClient();
  const [centerCoordinate, setCenterCoordinate] = useState(coordinate); // 지도의 중심 좌표 따로 관리

  const { data: locationData, refetch: locationRefetch } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
    gcTime: 3000,
  });

  const { data: binData, refetch: refetchBinData } = useQuery({
    queryKey: ["get-around-bins", centerCoordinate], // 지도의 중심 좌표를 사용
    queryFn: () =>
      getAroundbins(centerCoordinate.x, centerCoordinate.y, null, 500),
    enabled: centerCoordinate.x !== 0,
  });

  // 좌표 데이터 업데이트
  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
    }
  }, [locationData]);

  // Kakao 지도 스크립트 로드 및 지도 초기화
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (coordinate.x !== 0 && coordinate.y !== 0) {
            const map = initMap(window.kakao, coordinate);
            const myLocationMarker = addMyLocationMarker(
              map,
              window.kakao,
              coordinate
            );

            mapRef.current = map;
            myMarkerRef.current = myLocationMarker;

            getAddressFromCoords(
              window.kakao,
              coordinate,
              (getAddress: any) => {
                setAddress({
                  roadAddress: getAddress.road_address?.address_name || null,
                  address: getAddress.address?.address_name,
                });
              }
            );
            if (binkMarkerRef.current.length > 0) {
              binkMarkerRef.current.forEach((marker: any) =>
                marker.setMap(null)
              );
            }

            // 새로운 마커 추가
            if (binData) {
              const newMarkers = binData.map((bin: any) => {
                const marker = createMarker(
                  window.kakao,
                  mapRef.current,
                  { x: bin.latitude, y: bin.longitude },
                  getMarkerImage(bin.isBookMarked, bin.type),
                  bin.title
                );
                return marker;
              });

              binkMarkerRef.current = newMarkers;
            }

            // const center = map.getCenter();

            // if (
            //   center.getLat() !== coordinate.x ||
            //   center.getLng() !== coordinate.y
            // ) {
            //   const newCenterCoordinate = {
            //     x: center.getLat(),
            //     y: center.getLng(),
            //   };

            //   // 중심 좌표 업데이트
            //   setCenterCoordinate(newCenterCoordinate);
            //   // 새로운 중심 좌표로 binData 다시 요청
            //   refetchBinData();
            // }
          }
        });
      }
    };

    // Kakao Map 스크립트가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
      kakaoMapScript.async = true;
      kakaoMapScript.onload = loadKakaoMap;
      document.head.appendChild(kakaoMapScript);
    }

    return () => {
      if (mapRef.current) {
        // 기존 마커나 지도 상태 초기화 (필요 시)
        binkMarkerRef.current.forEach((marker: any) => marker.setMap(null));
        binkMarkerRef.current = [];
      }
    };
  }, [coordinate, binData]);

  // 사용자가 위치 버튼 클릭 시 위치 갱신
  const handelClickGetmyLocation = async () => {
    try {
      const { data: newLocationData } = await locationRefetch();
      if (newLocationData && Array.isArray(newLocationData)) {
        const newCoordinate = newLocationData[0];
        setCoordinate(newCoordinate);

        if (mapRef.current && myMarkerRef.current) {
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
                roadAddress: getAddress.road_address?.address_name || null,
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
