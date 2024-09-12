import classNames from "classnames/bind";
import Portal from "./Portal";
import styles from "./Modal.module.scss";
import wrong from "@/../public/images/modalWrong.svg";
import access from "@/../public/images/modalAccess.svg";
import audit from "@/../public/images/modalAudit.svg";
import Image from "next/image";
import { ModalContent } from "@/lib/constants/modalContents";

const cn = classNames.bind(styles);

interface IModalProps {
  modalState: ModalContent;
  moreInfo?: string;
  modalClose: () => void;
}

export default function Modal({ modalState, modalClose, moreInfo }: IModalProps) {
  const getImageSrc = () => {
    switch (modalState.status) {
      case "red":
        return wrong;
      case "green":
        return access;
      case "basic":
        return audit;
      default:
        return audit;
    }
  };

  return (
    <Portal>
      <section className={cn("modal")}>
        <article className={cn("modalWrap")}>
          <div
            className={
              modalState.status === "red"
                ? cn("modalImgWrap")
                : modalState.status === "green"
                  ? cn("modalImgWrapAccess")
                  : cn("modalImgWrapAudit")
            }
          >
            <div className={cn("modalImg")}>
              <Image src={getImageSrc()} alt="상태이미지" sizes="40px" />
            </div>
          </div>

          <div
            className={
              modalState.status === "red"
                ? cn("modalTitle")
                : modalState.status === "green"
                  ? cn("modalTitleAccess")
                  : cn("modalTitleAudit")
            }
          >
            {modalState.title}
          </div>
          <div className={cn("modalText")}>
            {modalState.text.split(".").map((sentence, index) => (
              <span key={index}>
                {sentence.trim()}
                {index < modalState.text.split(".").length - 1 && <br />}
              </span>
            ))}
          </div>
          {modalState.ismore && <div className={cn("modalMoreInfo")}>{moreInfo}</div>}

          <div className={cn("modalClose")} onClick={modalClose}>
            닫기
          </div>
        </article>
      </section>
    </Portal>
  );
}
