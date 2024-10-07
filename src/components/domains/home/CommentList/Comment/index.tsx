import ConfirmModal from "@/components/commons/Modal/Confirm";
import Toast from "@/components/commons/Toast";
import { useToggle } from "@/lib/hooks/useToggle";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./Comment.module.scss";
import { useCommentActions } from "./useCommentActions";

const cn = classNames.bind(styles);
interface Props {
  commentData: any;
  refetchComments: () => void;
  onClickFixState: (id: number) => void;
  isBest: boolean;
}

export default function Comment({
  commentData,
  refetchComments,
  onClickFixState,
  isBest,
}: Props) {
  const [isOpenAskFixModal, openAskFixModal, closeAskFixModal] =
    useToggle(false);
  const [isOpenAskDeleteModal, openAskDeleteModal, closeAskDeleteModal] =
    useToggle(false);
  const [isOpenToast, openToast, closeToast] = useToggle(false);

  const formattedDate = commentData.createdAt.split("T")[0].replace(/-/g, ".");

  const { handleClickLike, handleClickDislike, handleClickDeleteComment } =
    useCommentActions(commentData.commentId, refetchComments, openToast);

  useEffect(() => {
    if (isOpenToast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpenToast, closeToast]);

  return (
    <>
      <li className={cn("comment-warpper")}>
        <div className={cn("title-box")}>
          {isBest && <span className={cn("best-tag")}>BEST</span>}
          <h6 className={cn("name")}>{commentData.writer}</h6>
          <p className={cn("date")}>{formattedDate}</p>
        </div>
        <p className={cn("text")}>{commentData.content}</p>
        <div className={cn("btn-field")}>
          <button
            className={cn("like-btn", {
              selected: commentData.commentInfoForMember?.isLiked,
            })}
            onClick={() =>
              handleClickLike(commentData.commentInfoForMember?.isLiked)
            }
          >
            <Image
              src={"/images/thumb-up.svg"}
              alt="좋아요"
              width={16}
              height={12}
            />
            {commentData.likeCount}
          </button>
          <button
            className={cn("dislike-btn", {
              selected: commentData.commentInfoForMember?.isDisliked,
            })}
            onClick={() =>
              handleClickDislike(commentData.commentInfoForMember?.isDisliked)
            }
          >
            <Image
              src={"/images/thumb-down.svg"}
              alt="싫어요"
              width={16}
              height={12}
            />
            {commentData.dislikeCount}
          </button>
        </div>
        <div className={cn("user-action-btn-field")}>
          {/* {!commentData.commentInfoForMember.isWriter && <button>신고</button>} */}
          {commentData.commentInfoForMember?.isWriter && (
            <>
              <button onClick={openAskFixModal}>수정</button>
              <button onClick={openAskDeleteModal}>삭제</button>
            </>
          )}
        </div>
        {isOpenAskFixModal && (
          <ConfirmModal
            title="댓글 수정"
            text="댓글을 수정하시겠습니까?"
            onConfirm={() => onClickFixState(commentData.commentId)}
            modalClose={closeAskFixModal}
            cancelText="취소"
            confirmText="수정하기"
          />
        )}
        {isOpenAskDeleteModal && (
          <ConfirmModal
            title="댓글 삭제"
            text="댓글을 정말 삭제하시겠습니까?"
            onConfirm={handleClickDeleteComment}
            modalClose={closeAskDeleteModal}
            cancelText="취소"
            confirmText="삭제하기"
          />
        )}
      </li>
      {isOpenToast && <Toast>로그인이 필요한 서비스입니다.</Toast>}
    </>
  );
}
