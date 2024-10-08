export const loadKakaoMapScript = (callback: () => void) => {
  if (!!window.kakao && !!window.kakao.maps) {
    callback();
  } else {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        callback();
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }
};
