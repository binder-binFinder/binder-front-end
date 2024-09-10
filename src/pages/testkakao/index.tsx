import { getLocation } from "@/lib/apis/geo";
import { userAddress, userCoordinate } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const initMap = (kakao: any, coordinate: { x: number; y: number }) => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(coordinate.x, coordinate.y),
    level: 3,
  };

  return new kakao.maps.Map(container, options);
};

const addMarker = (map: any, kakao: any, coordinate: { x: number; y: number }) => {
  const markerPosition = new kakao.maps.LatLng(coordinate.x, coordinate.y);

  const marker = new kakao.maps.Marker({
    position: markerPosition,
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

  geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
      const getAddress = result[0];
      callback(getAddress);
    } else {
      console.error("역지오코딩 실패", status);
    }
  });
};

export default function TestKakao() {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [address, setAddress] = useAtom(userAddress);

  const { data: locationData } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
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
          addMarker(map, window.kakao, coordinate);
          getAddressFromCoords(window.kakao, coordinate, (getAddress: any) => {
            setAddress({
              roadAddress: getAddress.road_address.address_name,
              address: getAddress.address.address_name,
            });
            console.log("주소:", address);
          });
        });
      };

      kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    }
  }, [coordinate]);

  return <div id="map" style={{ width: "100%", height: "100vh", zIndex: "0" }}></div>;
}
