import { MutableRefObject } from "react";
import { fetchAddressFromCoords } from "./getAddressFromCoords";
import { initMap } from "./initMap";
import { addMyLocationMarker, updateMarkers } from "./markers";

export const initializeMap = (
  coordinate: { x: number; y: number },
  setAddress: any,
  isSearch = false,
  binkMarkerRef: MutableRefObject<any>,
  handleClickMarker?: (id: number) => void,
  choice?: any
) => {
  if (!!window.kakao && !!window.kakao.maps) {
    const map = initMap(
      window.kakao,
      isSearch ? { x: choice.latitude, y: choice.longitude } : coordinate
    );

    if (isSearch && handleClickMarker) {
      updateMarkers([choice], map, handleClickMarker, binkMarkerRef!);
    } else {
      const myLocationMarker = addMyLocationMarker(
        map,
        window.kakao,
        coordinate
      );
      fetchAddressFromCoords(coordinate, setAddress);
      return { map, myLocationMarker };
    }

    return { map };
  } else {
    return null;
  }
};
