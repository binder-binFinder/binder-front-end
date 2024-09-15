import { getLocation } from "@/lib/apis/geo";
import { userAddress, userCoordinate } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./KakaoMap.module.scss";
import BtnField from "./SearchBtn";

const cn = classNames.bind(styles);

declare global {
  interface Window {
    kakao: any;
  }
}

export const filterAddress = (address: string) => {
  // "특별시", "광역시", "특별자치시" 등을 제거하는 정규식
  return address.replace(/(특별시|광역시|특별자치시)/g, "").trim();
};

const initMap = (kakao: any, coordinate: { x: number; y: number }) => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(coordinate.x, coordinate.y),
    level: 0,
  };

  const map = new kakao.maps.Map(container, options);
  map.setMaxLevel(5);

  return map;
};

const addMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number }
) => {
  const imageSrc = "/images/icon-marker-my-location.svg",
    imageSize = new kakao.maps.Size(40, 40);

  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
    markerPosition = new kakao.maps.LatLng(coordinate.x, coordinate.y);

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    map: map,
  });

  const infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;">내 위치</div>`,
  });

  kakao.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });

  return marker;
};

const getAddressFromCoords = (
  kakao: any,
  coordinate: { x: number; y: number },
  callback: (address: string) => void
) => {
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(coordinate.x, coordinate.y);

  geocoder.coord2Address(
    coord.getLng(),
    coord.getLat(),
    (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const getAddress = result[0];
        console.log("address", getAddress);
        callback(getAddress);
      } else {
        console.error("역지오코딩 실패", status);
      }
    }
  );
};

export default function KakaoMap() {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [, setAddress] = useAtom(userAddress);
  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);

  const { data: locationData, refetch: locationRefetch } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
    gcTime: 3000,
  });

  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
    }
  }, [locationData]);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    if (coordinate.x !== 0) {
      const onLoadKakaoAPI = () => {
        window.kakao.maps.load(() => {
          const map = initMap(window.kakao, coordinate);
          const marker = addMarker(map, window.kakao, coordinate);

          mapRef.current = map;
          myMarkerRef.current = marker;

          getAddressFromCoords(window.kakao, coordinate, (getAddress: any) => {
            setAddress({
              roadAddress:
                filterAddress(getAddress.road_address?.address_name) || null,
              address: filterAddress(getAddress.address.address_name),
            });
          });
        });
      };

      kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    }
  }, [coordinate]);

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
                address: getAddress.address.address_name,
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
      <BtnField />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "0",
          position: "relative",
        }}
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
