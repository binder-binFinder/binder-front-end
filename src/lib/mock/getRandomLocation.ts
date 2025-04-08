function getRandomLocation(center : {lat : number, lng: number}, radius = 100)  {
  const d2r = Math.PI / 180;
  const r2d = 180 / Math.PI;
  const earthRadius = 6378000; // 지구 반지름 (단위: m)

  // 랜덤 거리와 방향
  const r = Math.random() * radius;
  const rlat = (r / earthRadius) * r2d;
  const rlng = rlat / Math.cos(center.lat * d2r);

  const theta = Math.random() * 2 * Math.PI;
  const latitude = center.lat + rlat * Math.sin(theta);
  const longitude = center.lng + rlng * Math.cos(theta);

  return { latitude, longitude  };
}
