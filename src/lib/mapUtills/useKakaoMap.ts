import { useEffect, useRef } from "react";
import { initializeMap, loadKakaoMapScript } from ".";

export const useKakaoMap = (
  coordinate: { x: number; y: number },
  setAddress: any,
  debouncedHandleCenterChanged: () => void,
  handleClickAddMarker: (e: any) => void,
  isAddBin: boolean,
  isSearch?: boolean,
  choice?: any,
  handleClickMarker?: (id: number) => void
) => {
  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const binkMarkerRef = useRef<any>([]);

  useEffect(() => {
    loadKakaoMapScript(() => {
      if (coordinate.x !== 0 && coordinate.y !== 0) {
        const result = initializeMap(
          coordinate,
          setAddress,
          isSearch,
          binkMarkerRef,
          handleClickMarker,
          choice
        );
        if (result) {
          mapRef.current = result.map;
          myMarkerRef.current = result.myLocationMarker;

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
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
        binkMarkerRef.current = [];
      }
    };
  }, [coordinate, mapRef, isAddBin, isSearch]);

  return { mapRef, myMarkerRef, binkMarkerRef };
};
