import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminFilter.module.scss";

const cn = classNames.bind(styles);

export default function AdminFilter() {
  const [submit, setSubmit] = useState<boolean>(false);
  const [choice, setChoice] = useState<String>("");

  const handleChoice = (e: string) => {
    setChoice(e);
  };

  useEffect(() => {
    if (choice !== "") {
      setSubmit(true);
    }
  }, [choice]);

  return (
    <DropWrap
      title="처리 상태"
      btn="적용"
      closeBtn={undefined}
      submitState={submit}
    >
      <div className={cn("wrap")}>
        <div
          className={choice === "전체" ? cn("btnOn") : cn("btn")}
          onClick={() => handleChoice("전체")}
        >
          전체
        </div>
        <div
          className={choice === "처리 전" ? cn("btnOn") : cn("btn")}
          onClick={() => handleChoice("처리 전")}
        >
          처리 전
        </div>
        <div
          className={choice === "처리 완료" ? cn("btnOn") : cn("btn")}
          onClick={() => handleChoice("처리 완료")}
        >
          처리 완료
        </div>
      </div>
    </DropWrap>
  );
}
AdminFilter.defaultProps = {};
