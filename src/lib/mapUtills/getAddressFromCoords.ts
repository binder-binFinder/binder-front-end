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
        callback(getAddress);
      } else {
        console.error("역지오코딩 실패", status);
      }
    }
  );
};

const filterAddress = (address: string) => {
  return address?.replace(/(특별시|광역시|특별자치시)/g, "").trim();
};

export const fetchAddressFromCoords = (
  coordinate: { x: number; y: number },
  callback: (address: any) => void
) => {
  getAddressFromCoords(window.kakao, coordinate, (getAddress: any) => {
    callback({
      roadAddress: filterAddress(getAddress.road_address?.address_name) || null,
      address: getAddress.address?.address_name,
    });
  });
};
