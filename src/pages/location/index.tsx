import { getLocation } from "@/lib/apis/geo";
import { getPlace, getPlaceNameByOSM } from "@/lib/apis/location";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Location() {
  const [xy, setXy] = useState({});

  const { data: locationData } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation, // 함수 참조로 넘겨야 함
  });
  const { data: place, isLoading } = useQuery({
    queryKey: ["place", xy],
    queryFn: () => getPlaceNameByOSM(xy.x, xy.y), // 함수 참조로 넘겨야 함
    enabled: !!xy,
  });
  console.log(place);
  useEffect(() => {
    if (locationData) {
      setXy(locationData[0]);
    }
  }, [locationData]);
  return <div>{isLoading ? "로딩중.." : place}</div>;
}

export default Location;
