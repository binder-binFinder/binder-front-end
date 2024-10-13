import { getBinsId } from "@/lib/apis/bins";
import { deleteMyBookmark, postMyBookmark } from "@/lib/apis/bookmarks";
import {
  deleteDislike,
  deleteLike,
  patchDislike,
  patchLike,
} from "@/lib/apis/likes";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBinActions = (
  binId: number,
  onSuccessBookmark: () => void,
  getBibsData: () => Promise<void>
) => {
  const {
    data: binDetailData,
    isLoading,
    refetch: refetchBinData,
  } = useQuery({
    queryKey: ["get-bin-detail", binId],
    queryFn: () => getBinsId(binId),
    enabled: !!binId,
  });

  const { mutate: postBookmarkMutate } = useMutation({
    mutationFn: () => postMyBookmark(binId),
    onSuccess: () => {
      onSuccessBookmark();
      refetchBinData();
    },
  });
  const { mutate: deleteBookmarkMutate } = useMutation({
    mutationFn: () => deleteMyBookmark(binId),
    onSuccess: () => {
      refetchBinData();
      getBibsData();
    },
  });
  const { mutate: patchLikeMutate } = useMutation({
    mutationFn: () => patchLike(binId),
    onSuccess: () => {
      refetchBinData();
    },
  });
  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: () => deleteLike(binId),
    onSuccess: () => {
      refetchBinData();
    },
  });
  const { mutate: patchDislikeMutate } = useMutation({
    mutationFn: () => patchDislike(binId),
    onSuccess: () => {
      refetchBinData();
    },
  });
  const { mutate: deletedisLikeMutate } = useMutation({
    mutationFn: () => deleteDislike(binId),
    onSuccess: () => {
      refetchBinData();
    },
  });

  return {
    binDetailData,
    isLoading,
    postBookmarkMutate,
    deleteBookmarkMutate,
    patchLikeMutate,
    deleteLikeMutate,
    patchDislikeMutate,
    deletedisLikeMutate,
  };
};
