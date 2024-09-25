export const createMarker = (
  kakao: any,
  map: any,
  coordinate: { x: number; y: number },
  imageSrc: string
) => {
  if (!kakao || !kakao.maps.Size) {
    console.error("Kakao maps API is not loaded.marker");
    return null;
  }
  const imageSize = new kakao.maps.Size(40, 40);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  const markerPosition = new kakao.maps.LatLng(coordinate.x, coordinate.y);

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    map: map,
  });

  return marker;
};

export const removeMarker = (marker: any) => {
  if (marker && typeof marker.setMap === "function") {
    marker.setMap(null);
  }
};

export const addMyLocationMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number }
) => {
  const myLocationMarkerImage = "/images/icon-marker-my-location.svg";
  return createMarker(kakao, map, coordinate, myLocationMarkerImage);
};

export const addClickMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number },
  existingMarker: any,
  setMarker: (marker: any) => void
) => {
  removeMarker(existingMarker);

  const clickMarkerImage = "/images/icon-marker-add-bin.svg";
  const newMarker = createMarker(kakao, map, coordinate, clickMarkerImage);
  newMarker.setDraggable(true);

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

export const updateMarkers = (
  binData: any,
  map: any,
  binkMarkerRef: any,
  handelClickMarker: (id: number) => void
) => {
  if (!!map && binkMarkerRef.current.length > 0) {
    binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
  }

  if (binData && !!map) {
    const newMarkers = binData.map((bin: any, index: number) => {
      const markerImage =
        index === 0
          ? "/images/icon-marker-recommend.svg"
          : getMarkerImage(bin.isBookMarked, bin.type);
      const marker = createMarker(
        window.kakao,
        map,
        { x: bin.latitude, y: bin.longitude },
        markerImage
      );
      window.kakao.maps.event.addListener(marker, "click", () => {
        handelClickMarker(bin.id);
      });
      return marker;
    });

    binkMarkerRef.current = newMarkers;
  }
};
