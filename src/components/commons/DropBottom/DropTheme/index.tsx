import { themeColor } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import DropWrap from "..";
import styles from "./DropTheme.module.scss";

const cn = classNames.bind(styles);

interface AdminFilter {
  closeModal: () => void;
  pageFilter: any;
}
export default function DropTheme({ closeModal, pageFilter }: AdminFilter) {
  const [submit, setSubmit] = useState<boolean>(false);
  const [choice, setChoice] = useState<string>(pageFilter);
  const [, setThemeMode] = useAtom(themeColor);

  const handleChoice = (e: string) => {
    setChoice(e);
  };

  useEffect(() => {
    if (choice !== "") {
      setSubmit(true);
    }
  }, [choice]);

  const handleSubmit = () => {
    closeModal();
    setThemeMode(choice);
  };

  return (
    <DropWrap
      title="처리 상태"
      btn="적용"
      closeBtn={closeModal}
      submitState={submit}
      btnFunction={handleSubmit}
    >
      <div className={cn("wrap")}>
        <div
          className={choice === "라이트 모드" ? cn("btnOn") : cn("btn")}
          onClick={() => handleChoice("라이트 모드")}
          data-cy="light"
        >
          라이트 모드
        </div>
        <div
          className={choice === "다크 모드" ? cn("btnOn") : cn("btn")}
          onClick={() => handleChoice("다크 모드")}
          data-cy="dark"
        >
          다크 모드
        </div>
      </div>
    </DropWrap>
  );
}
