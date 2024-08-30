export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const box = showPosition(position);
        resolve(box); // 위치 데이터와 함께 Promise를 성공적으로 해결
      }, handleError);
    } else {
      alert("Geolocation is not supported by this browser.");
      reject("Geolocation not supported"); // 지오로케이션 지원 안 함을 이유로 Promise 거부
    }
  });
}

export function showPosition(position: GeolocationPosition) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const box = [{ x: latitude, y: longitude }];
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  return box;
}

function handleError(error: {
  code: any;
  PERMISSION_DENIED: any;
  POSITION_UNAVAILABLE: any;
  TIMEOUT: any;
}) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    default:
      console.error("An unknown error occurred.");
      break;
  }
}
