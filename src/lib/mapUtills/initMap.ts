let swLatlng: any;

export const initMap = (kakao: any, coordinate: { x: number; y: number }) => {
  if (!!kakao && !!kakao.maps && !!kakao.maps.LatLng) {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(coordinate.x, coordinate.y),
      level: 1,
    };

    const map = new kakao.maps.Map(container, options);
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    map.setMaxLevel(4);

    kakao.maps.event.addListener(map, "bounds_changed", function () {
      const bounds = map.getBounds();
      swLatlng = bounds.getSouthWest();
    });

    return map;
  } else {
    console.log("initMap error");
  }
};

export const getSwLatlng = () => {
  if (!swLatlng) {
    return null;
  }

  return swLatlng;
};
