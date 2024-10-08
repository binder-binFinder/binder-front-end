import { ModalContent } from "@/lib/constants/modalContents";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import Portal from "./Portal";

const cn = classNames.bind(styles);

interface IModalProps {
  modalState: ModalContent;
  moreInfo?: string;
  modalClose: () => void;
}

export default function Modal({
  modalState,
  modalClose,
  moreInfo,
}: IModalProps) {
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
            !
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
          {modalState.ismore && (
            <div className={cn("modalMoreInfo")}>{moreInfo}</div>
          )}

          <div className={cn("modalClose")} onClick={modalClose}>
            닫기
          </div>
        </article>
      </section>
    </Portal>
  );
}
