import classNames from "classnames/bind";
import Portal from "./Portal";
import styles from "./Modal.module.scss";
import wrong from "@/../public/images/modalWrong.svg";
import Image from "next/image";

const cn = classNames.bind(styles);

interface IModalProps {
  modalClose: () => void;
}

export default function DeleteMemberModal({ modalClose }: IModalProps) {
  return (
    <Portal>
      <div className={cn("modal")}>
        <div className={cn("deleteModalWrap")}>
          <div className={cn("modalImgWrap")}>
            <div className={cn("modalImg")}>
              <Image src={wrong} alt="상태이미지" fill sizes="40px" />
            </div>
          </div>

          <div className={cn("modalTitle")}>탈퇴 완료</div>
          <div className={cn("modalText")}>
            그동안 Binder를 이용해주셔서 감사했습니다.
          </div>

          <div className={cn("modalClose")} onClick={modalClose}>
            닫기
          </div>
        </div>
      </div>
    </Portal>
  );
}
