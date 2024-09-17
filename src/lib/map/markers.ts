export const createMarker = (
  kakao: any,
  map: any,
  coordinate: { x: number; y: number },
  imageSrc: string,
  infoContent: string
) => {
  const imageSize = new kakao.maps.Size(40, 40);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  const markerPosition = new kakao.maps.LatLng(coordinate.x, coordinate.y);

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    map: map,
  });

  const infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;">${infoContent}</div>`,
  });

  kakao.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });

  return marker;
};

export const removeMarker = (marker: any) => {
  if (marker) {
    marker.setMap(null);
  }
};

export const addMyLocationMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number }
) => {
  const myLocationMarkerImage = "/images/icon-marker-my-location.svg";
  return createMarker(kakao, map, coordinate, myLocationMarkerImage, "내 위치");
};

// 클릭 마커를 추가하는 함수
export const addClickMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number },
  existingMarker: any,
  setMarker: (marker: any) => void
) => {
  removeMarker(existingMarker);

  const clickMarkerImage = "/images/icon-marker-general-bin.svg";
  const newMarker = createMarker(
    kakao,
    map,
    coordinate,
    clickMarkerImage,
    "클릭한 위치"
  );

  setMarker(newMarker);
};

export const getMarkerImage = (isBookMarked: boolean, type: string) => {
  let imageSrc = "";
  if (isBookMarked) return "/images/icon-marker-favorite.svg";

  switch (type) {
    case "GENERAL":
      imageSrc = "/images/icon-marker-general-bin.svg";
      break;
    case "RECYCLE":
      imageSrc = "/images/icon-marker-recyle-bin.svg";
      break;
    case "BEVERAGE":
      imageSrc = "/images/icon-marker-drink-bin.svg";
      break;
    case "CIGAR":
      imageSrc = "/images/icon-marker-tabacoo.svg";
      break;
    default:
      alert("데이터 접근이 안됨");
      imageSrc = "/images/icon-marker-general-bin.svg";
  }
  return imageSrc;
};
