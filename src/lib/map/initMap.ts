export const initMap = (kakao: any, coordinate: { x: number; y: number }) => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(coordinate.x, coordinate.y),
    level: 0,
  };

  const map = new kakao.maps.Map(container, options);
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

  map.setMaxLevel(10);

  return map;
};
