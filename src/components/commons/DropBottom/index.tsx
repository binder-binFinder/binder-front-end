import classNames from "classnames/bind";
import styles from "./dropBottom.module.scss";
import close from "@/../public/images/dropClose.svg";
import Image from "next/image";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const cn = classNames.bind(styles);

interface DropProps {
  children: React.ReactElement;
  title: string;
  closeBtn: () => void;
  btn: string;
  btnFunction?: () => void;
  submitState: boolean;
}

export default function DropWrap({
  children,
  title,
  closeBtn,
  btn,
  btnFunction,
  submitState = false,
}: DropProps) {
  const ref = useRef(null);

  useOnClickOutside(ref, closeBtn);
  return title !== "탈퇴하기" ? (
    <div className={cn("drop")}>
      <div className={cn("dropWrap")} ref={ref}>
        <div className={cn("dropTitle")}>
          <div>{title}</div>
          <div className={cn("dropClose")} onClick={closeBtn}>
            <Image src={close} fill alt="닫기" sizes="35px" />
          </div>
        </div>

        <div className={cn("dropChildren")}>{children}</div>

        <div
          onClick={submitState ? btnFunction : () => {}}
          className={submitState ? cn("dropBtnOn") : cn("dropBtn")}
        >
          {btn}
        </div>
      </div>
    </div>
  ) : (
    <div className={cn("drop")}>
      <div className={cn("dropWrap")} ref={ref}>
        <div className={cn("dropTitle")}>
          <div>{title}</div>
          <div className={cn("dropClose")} onClick={closeBtn}>
            <Image src={close} fill alt="닫기" sizes="35px" />
          </div>
        </div>

        <div className={cn("dropChildren")}>{children}</div>

        <div className={cn("cancle")}>
          <div onClick={closeBtn} className={cn("dropBtn")}>
            취소하기
          </div>
          <div
            onClick={submitState ? btnFunction : () => {}}
            className={submitState ? cn("dropBtnOn") : cn("dropBtn")}
          >
            {btn}
          </div>
        </div>
      </div>
    </div>
  );
}

DropWrap.defaultProps = {
  children: <div>test</div>,
  title: "제목",
  btn: "전송",
};
