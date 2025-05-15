import { useQuery } from "@tanstack/react-query";
import { getAroundbins } from "@/lib/apis/search";
import { BinItemType } from "../constants/btnInputValues";
import { Coordinate } from "@/types/Coordinate";

type getBinDataWithType  = null | BinItemType["id"] | "isBookmarked"

export const useBinData = (binType: getBinDataWithType, centerCoordinate: Coordinate) => {
  const fetchBinsWithId = async (binType : getBinDataWithType ) => {
    const data = await getAroundbins(
      centerCoordinate.x,
      centerCoordinate.y,
      binType !== "isBookmarked" ? binType : null,
      500
    );
    return data;
  };

  return useQuery({
    queryKey: ["get-around-bins", binType],
    queryFn: () => fetchBinsWithId(binType),
    enabled: !!binType && !!centerCoordinate.x && !!centerCoordinate.y,
    gcTime: 3000,
    
  });
};
