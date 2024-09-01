import classNames from "classnames/bind";
import Portal from "./Portal";
import styles from "./Modal.module.scss";
import wrong from "@/../public/images/modalWrong.svg";
import access from "@/../public/images/modalAccess.svg";
import audit from "@/../public/images/modalAudit.svg";
import Image from "next/image";
import { useState } from "react";

const cn = classNames.bind(styles);

interface IModalProps {
  modalState: string;
  modalClose: () => void;
}

export default function Modal({ modalState, modalClose }: IModalProps) {
  const [modalHow, setModalHow] = useState<string>("거절");
  // 거절, 승인 ,심사 중
  const date = new Date();
  const name = "oo";
  const getImageSrc = () => {
    switch (modalHow) {
      case "거절":
        return wrong;
      case "승인":
        return access;
      default:
        return audit;
    }
  };

  return (
    <Portal>
      <div className={cn("modal")}>
        <div className={cn("modalWrap")}>
          <div
            className={
              modalHow === "거절"
                ? cn("modalImgWrap")
                : modalHow === "승인"
                  ? cn("modalImgWrapAccess")
                  : cn("modalImgWrapAudit")
            }
          >
            <div className={cn("modalImg")}>
              <Image src={getImageSrc()} alt="상태이미지" fill sizes="40px" />
            </div>
          </div>

          <div
            className={
              modalHow === "거절"
                ? cn("modalTitle")
                : modalHow === "승인"
                  ? cn("modalTitleAccess")
                  : cn("modalTitleAudit") // '심사 중' 상태에 대한 클래스
            }
          >
            쓰레기통 등록 <span>{modalHow}</span>
          </div>
          <div className={cn("modalText")}>
            {modalHow === "심사 중" ? (
              <>
                {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}
                등록한
                <br />
                쓰레기통 이름이 심사 중입니다.
                <br />
                심사 결과까지 대략 3일 소요됩니다.
              </>
            ) : (
              <>
                {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}{" "}
                {name} 님이 신청한
                <br />
                쓰레기통 등록 건에 대하여
                <br />
                {modalHow} 처리 하였습니다.
              </>
            )}
          </div>

          <div className={cn("modalClose")} onClick={modalClose}>
            닫기
          </div>
        </div>
      </div>
    </Portal>
  );
}

Modal.defaultProps = {
  modalState: "거절",
};
