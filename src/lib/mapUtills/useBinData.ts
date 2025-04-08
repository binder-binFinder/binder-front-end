import { useQuery } from "@tanstack/react-query";
import { getAroundbins } from "@/lib/apis/search";

export const useBinData = (binType: any, centerCoordinate: any) => {
  const fetchBinsWithId = async (id: any) => {
    const data = await getAroundbins(
      centerCoordinate.x,
      centerCoordinate.y,
      id !== "isBookmarked" ? id : null,
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
