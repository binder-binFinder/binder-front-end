import { getLocation } from "@/lib/apis/geo";
import { getPlaceNameByOSM } from "@/lib/apis/location";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Location() {
  const [xy, setXy] = useState<any>(null);

  const { data: locationData } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  const { data: place, isLoading } = useQuery({
    queryKey: ["place"],
    queryFn: () => getPlaceNameByOSM(xy.x, xy.y),
    enabled: xy !== null,
  });

  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setXy(locationData[0]);
    }
  }, [locationData]);

  return <div>{isLoading ? "로딩중.." : place || "장소 정보 없음"}</div>;
}

export default Location;
