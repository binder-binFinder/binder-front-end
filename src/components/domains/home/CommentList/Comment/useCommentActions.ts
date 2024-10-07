import {
  deleteComment,
  deleteCommentDislike,
  deleteCommentLike,
  postCommentDislike,
  postCommentLike,
} from "@/lib/apis/comments";
import { useMutation } from "@tanstack/react-query";

export const useCommentActions = (
  commentId: number,
  refetchComments: () => void,
  openAskToast: () => void
) => {
  const { mutate: postLikeMutate } = useMutation({
    mutationFn: () => postCommentLike(commentId),
    onSuccess: () => refetchComments(),
    onError: (error: any) => {
      if (error.status === 401) {
        openAskToast();
      }
    },
  });

  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: () => deleteCommentLike(commentId),
    onSuccess: () => refetchComments(),
    onError: (error: any) => {
      if (error.status === 401) {
        openAskToast();
      }
    },
  });

  const { mutate: postDislikeMutate } = useMutation({
    mutationFn: () => postCommentDislike(commentId),
    onSuccess: () => refetchComments(),
    onError: (error: any) => {
      if (error.status === 401) {
        openAskToast();
      }
    },
  });

  const { mutate: deleteDislikeMutate } = useMutation({
    mutationFn: () => deleteCommentDislike(commentId),
    onSuccess: () => refetchComments(),
    onError: (error: any) => {
      if (error.status === 401) {
        openAskToast();
      }
    },
  });

  const { mutate: deleteCommentsMutate } = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => refetchComments(),
    onError: (error: any) => {
      if (error.status === 401) {
        openAskToast();
      }
    },
  });

  const handleClickLike = (isLiked: boolean) => {
    if (isLiked) {
      deleteLikeMutate();
    } else {
      postLikeMutate();
    }
  };

  const handleClickDislike = (isDisliked: boolean) => {
    if (isDisliked) {
      deleteDislikeMutate();
    } else {
      postDislikeMutate();
    }
  };

  const handleClickDeleteComment = () => {
    deleteCommentsMutate();
  };

  return {
    handleClickLike,
    handleClickDislike,
    handleClickDeleteComment,
  };
};
