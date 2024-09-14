import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./AdminDetail.module.scss";
import { btnInputValues } from "@/lib/constants/btnInputValues";
import AdminDetailItem from "./AdminDetailItem";
import DropReason from "@/components/commons/DropBottom/DropReason";
import { useState } from "react";
import Modal from "@/components/commons/Modal/TrashHow";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import { BinDetail } from "@/lib/atoms/binAtom";
import Button from "@/components/commons/Button";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { postRejectFix } from "@/lib/apis/fix";
import { postRejectAccept } from "@/lib/apis/ask";
import { postRejectReport } from "@/lib/apis/report";

const cn = classNames.bind(styles);

interface Props {
  state: "등록" | "신고" | "수정" | "정보";
  approve: ((data: string) => void) | (() => void);
  binDetail: BinDetail;
  toggleIsEdit?: () => void;
}

type DropBottomState = "수정" | "등록" | "신고 승인" | "신고 거절" | "정보";

const dropReasonPlaceholderMap: Record<DropBottomState, string> = {
  수정: "수정 요청받은 쓰레기 통의 거절",
  등록: "거절 사유를 입력해 주세요",
  "신고 거절": "신고가 반려되니 신중히 입력해 주세요",
  "신고 승인": "장소가 삭제되니 신중히 입력해 주세요",
  정보: "",
};

export default function DefaultForm({ state, approve, binDetail, toggleIsEdit }: Props) {
  const [isOpenDropBottom, openDropBottom, closeDropBottom] = useToggle(false);
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [isOpenErrorModal, openErrorModal, closeErrorModal] = useToggle(false);
  const [dropBottomState, setDropBottomState] = useState<DropBottomState>(getInitialDropBottomState(state));
  const [reason, setReason] = useState("");

  const handleClickReportApprove = () => {
    setDropBottomState("신고 승인");
    openDropBottom();
  };

  const handleClickReject = () => {
    if (state === "신고") {
      setDropBottomState("신고 거절");
      return openDropBottom();
    }

    return openDropBottom();
  };

  const mutationFnMap = {
    수정: useMutation(getMutationOptions("rejectFixBin", postRejectFix, binDetail.modificationId!)),
    등록: useMutation(getMutationOptions("rejectAddBin", postRejectAccept, binDetail.binId)),
    "신고 거절": useMutation(getMutationOptions("rejectReportBin", postRejectReport, binDetail.complaintId!)),
  };

  function getMutationOptions(mutationKey: string, mutationFn: Function, id: string | number) {
    return {
      mutationKey: [mutationKey, id],
      mutationFn: (data: string) => mutationFn(String(id), data),
      onSuccess: () => {
        closeDropBottom();
        openModal();
      },
      onError: (error: any) => {
        if (error.status === 400) openErrorModal();
        console.log("Error:", error.status);
      },
    };
  }

  const handleClickSubmit = (data: string) => {
    setReason(data);

    if (dropBottomState === "신고 승인") {
      approve(data);
    } else if (dropBottomState !== "정보") {
      mutationFnMap[dropBottomState]?.mutate(data);
    }
  };

  const renderDetailTitle = () => `쓰레기통 ${state === "정보" ? "정보" : `${state} 심사`}`;

  const renderButtons = () => (
    <article className={cn("detailBtn")}>
      <button className={cn(state === "신고" ? "detailRejectReport" : "detailReject")} onClick={handleClickReject}>
        {state} 거절
      </button>
      <button
        className={cn(state === "신고" ? "detailAcceptReport" : "detailAccept")}
        onClick={state === "신고" ? handleClickReportApprove : (approve as () => void)}
      >
        {state} 승인
      </button>
    </article>
  );

  const renderDropReason = () => (
    <DropReason
      state={dropBottomState}
      closeBtn={closeDropBottom}
      title={dropBottomState}
      placeholder={dropReasonPlaceholderMap[dropBottomState]}
      id={binDetail.complaintId || binDetail.modificationId || binDetail.binId}
      onHandleSubmit={handleClickSubmit}
    />
  );

  const renderModal = () => (
    <Modal
      modalClose={closeModal}
      modalState={
        MODAL_CONTENTS[
          dropBottomState === "수정"
            ? "rejectFix"
            : dropBottomState === "등록"
              ? "rejectAdd"
              : dropBottomState === "신고 거절"
                ? "rejectReport"
                : "SuccessReport"
        ]
      }
      moreInfo={reason}
    />
  );

  return (
    <>
      <article className={cn("detailWrap")}>
        <h3 className={cn("detailTitle")}>{renderDetailTitle()}</h3>
      </article>
      <section className={cn("detailInner")}>
        <AdminDetailItem title={"쓰레기통 주소"} detail={binDetail?.address} />
        <article className={cn("detail")}>
          <h4>쓰레기통 분류</h4>
          <div className={cn("detailSelect")}>
            {btnInputValues.map((item, index) => (
              <div
                key={index}
                className={binDetail?.type === item.id ? cn("detailSelectItemOn") : cn("detailSelectItem")}
              >
                {item.label}
              </div>
            ))}
          </div>
        </article>
        <AdminDetailItem title={"장소 명칭"} detail={binDetail?.title} />
        {binDetail?.imageUrl && binDetail?.imageUrl !== "string" && (
          <article className={cn("detail")}>
            <h4>
              쓰레기통 사진<span>(선택)</span>
            </h4>
            <Image src={binDetail?.imageUrl} alt="이미지" width={356} height={143} />
          </article>
        )}
        {state === "수정" && <AdminDetailItem title={"수정 요청 사유"} detail={binDetail?.title} />}
        {state === "정보" ? (
          <Button status="edit" onClick={toggleIsEdit}>
            쓰레기통 정보 수정하기
          </Button>
        ) : (
          renderButtons()
        )}
        {isOpenDropBottom && renderDropReason()}
        {isOpenModal && renderModal()}
        {isOpenErrorModal && <Modal modalClose={closeErrorModal} modalState={MODAL_CONTENTS.processingCompleted} />}
      </section>
    </>
  );
}

function getInitialDropBottomState(state: string): DropBottomState {
  const stateMap: Record<string, DropBottomState> = {
    신고: "신고 거절",
    수정: "수정",
    등록: "등록",
    정보: "정보",
  };
  return stateMap[state] || "정보";
}
