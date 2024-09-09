import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./SearchToggle.module.scss";

const cn = classNames.bind(styles);

export default function SearchToggle() {
  const [btnState, setBtnState] = useState<string>("최근 검색");
  return (
    <div className={cn("toggleWrap")}>
      <div
        className={
          btnState === "최근 검색" ? cn("toggleBtnOn") : cn("toggleBtn")
        }
        onClick={() => setBtnState("최근 검색")}
      >
        최근 검색
      </div>
      <div
        className={
          btnState === "저장한 장소" ? cn("toggleBtnOn") : cn("toggleBtn")
        }
        onClick={() => setBtnState("저장한 장소")}
      >
        저장한 장소
      </div>
    </div>
  );
}
