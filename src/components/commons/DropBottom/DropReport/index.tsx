import { postReport } from "@/lib/apis/report";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { REPORT_VALUES } from "@/lib/constants/reportReasonValues";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DropWrap from "..";
import Button from "../../Button";
import Modal from "../../Modal/TrashHow";
import { ImgField } from "../DropBinInfo";
import styles from "./DropReport.module.scss";

const cn = classNames.bind(styles);

interface Props {
  closeBtn: () => void;
  littleTitle?: string;
  binAddress?: string;
  imageUrl?: string;
  binId: number;
}
interface Inputs {
  complaintType: string;
}
interface ReportData {
  binId: number;
  complaintType: string;
}
export default function DropReport({
  closeBtn,
  littleTitle,
  binAddress,
  imageUrl,
  binId,
}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [reason, setReason] = useState("");
  const { mutate: postReportMutate } = useMutation({
    mutationFn: (data: { binId: number; complaintType: string }) =>
      postReport(data),
    onSuccess: openModal,
    onError: (err: any) => {
      alert(err.response.data.message);
    },
  });
  const handelCloseModal = () => {
    closeModal();
    closeBtn();
  };

  const handleOnSubmit: SubmitHandler<Inputs> = (data) => {
    setReason(
      REPORT_VALUES.find((item) => item.complaintType === data.complaintType)
        ?.text || "신고 사유를 알 수 없습니다."
    );
    const postData: ReportData = {
      binId, // 별도로 binId 추가
      complaintType: data.complaintType, // 폼에서 선택된 값
    };
    postReportMutate(postData);
  };
  return (
    <DropWrap closeBtn={closeBtn} btn="none" title="쓰레기통 신고 사유 선택">
      <div>
        <h5 className={cn("little-title")}>{littleTitle}</h5>
        <p className={cn("address")}>
          <Image
            src={"/images/icon-red-pin.svg"}
            alt="위치 핀"
            width={14}
            height={17}
          />
          {binAddress}
        </p>
        <ImgField imageUrl={imageUrl} />
        <form className={cn("form")} onSubmit={handleSubmit(handleOnSubmit)}>
          {REPORT_VALUES.map((item) => (
            <div className={cn("input-box")} key={item.complaintType}>
              <input
                className={cn("input")}
                id={item.complaintType}
                type="radio"
                {...register("complaintType", { required: "선택해 주세요" })}
                value={item.complaintType}
              />
              <label className={cn("label")} htmlFor={item.complaintType}>
                <span className={cn("check-mark")}></span> {item.text}
              </label>
            </div>
          ))}
          <Button status="alert" type="submit">
            신고 완료
          </Button>
        </form>
        {isOpenModal && reason !== "" && (
          <Modal
            modalClose={handelCloseModal}
            modalState={MODAL_CONTENTS.reportComplaint}
            moreInfo={reason}
          />
        )}
      </div>
    </DropWrap>
  );
}
