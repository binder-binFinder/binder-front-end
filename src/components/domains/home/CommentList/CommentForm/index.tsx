import Button from "@/components/commons/Button";
import ConfirmModal from "@/components/commons/Modal/Confirm";
import Toast from "@/components/commons/Toast";
import { useToggle } from "@/lib/hooks/useToggle";
import classNames from "classnames/bind";
import Image from "next/image";
import { useWatch } from "react-hook-form";
import styles from "./CommentForm.module.scss";
import { useCommentForm } from "./useCommentForm";

const cn = classNames.bind(styles);
interface Props {
  binId: number | string;
  refetchComments: () => void;
  fixCommentId: number;
  onClearFixId: () => void;
}

export default function CommentForm({
  binId,
  refetchComments,
  fixCommentId,
  onClearFixId,
}: Props) {
  const [isOpenFixCancelModal, openFixCancelModal, closeFixCancelModal] =
    useToggle(false);
  const {
    register,
    handleSubmit,
    handleOnSubmit,
    control,
    errors,
    isOpenToast,
    setValue,
  } = useCommentForm(binId, fixCommentId, refetchComments, onClearFixId);

  const content = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });

  const charCount = content.length;

  const handleClickDeleteValue = () => {
    setValue("content", "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return handleSubmit(handleOnSubmit)();
    }
  };

  const isCancelFix = fixCommentId !== 0 && charCount === 0;

  return (
    <form
      className={cn("comment-form")}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className={cn("comment-input-field")}>
        <label className={cn("comment-label", { error: errors.content })}>
          댓글 {fixCommentId !== 0 ? "수정" : "작성"}
        </label>

        <textarea
          className={cn("comment-input", { error: errors.content })}
          id="comments"
          placeholder="댓글은 60자까지 입력할 수 있습니다"
          {...register("content", {
            required: "댓글을 입력해 주세요",
            maxLength: {
              value: 60,
              message: `${charCount} / 60자`,
            },
          })}
          rows={1}
          onKeyDown={handleKeyDown}
        />
        {charCount !== 0 && (
          <Image
            className={cn("delete-input-btn")}
            alt="작성한 댓글 지우기"
            src={"/images/inputDelete.svg"}
            width={17}
            height={17}
            onClick={handleClickDeleteValue}
          />
        )}
      </div>
      <div className={cn("btn-field")}>
        {errors.content ? (
          <p className={cn("error-message")}>{errors.content.message}</p>
        ) : (
          <p className={cn("charCount")}>{charCount} / 60자</p>
        )}
        <Button
          type={isCancelFix ? "button" : "submit"}
          status="primary"
          disabled={(!isCancelFix && !!errors.content) || isOpenToast}
          onClick={isCancelFix ? openFixCancelModal : undefined}
        >
          {fixCommentId !== 0 ? (charCount === 0 ? "취소" : "수정") : "등록"}
        </Button>
      </div>
      {isOpenToast && (
        <Toast
          isgreen
        >{`댓글이 ${fixCommentId !== 0 ? "수정" : "등록"}되었습니다`}</Toast>
      )}
      {isOpenFixCancelModal && (
        <ConfirmModal
          title="댓글 수정"
          text="댓글 수정을 취소할까요?"
          onConfirm={() => {
            onClearFixId();
          }}
          modalClose={closeFixCancelModal}
          cancelText="계속 수정하기"
          confirmText="수정 취소"
        />
      )}
    </form>
  );
}
