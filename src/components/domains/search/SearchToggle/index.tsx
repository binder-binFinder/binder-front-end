import BookmarkNoti from "@/components/commons/Modal/Share/BookmarkNoti";
import { getMyBookmark } from "@/lib/apis/bookmarks";
import { searchBookmark, searchToggle } from "@/lib/atoms/atom";
import { loginState, userCoordinate } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styles from "./SearchToggle.module.scss";

const cn = classNames.bind(styles);

export default function SearchToggle() {
  const [btnState, setBtnState] = useAtom(searchToggle);
  const [coordinate] = useAtom(userCoordinate);
  const [login] = useAtom(loginState);
  const [, setSearch] = useAtom(searchBookmark);
  const [loginplzModal, setLoginplzModal] = useState<boolean>(false);

  const { data: bookmarkData, isSuccess } = useQuery({
    queryKey: ["bookmarkDatas", btnState],
    queryFn: () => getMyBookmark(coordinate.x, coordinate.y),
    enabled: !!coordinate,
  });

  if (isSuccess) {
    setSearch(bookmarkData);
  }
  useEffect(() => {
    if (btnState === "저장한 장소" && login === false) {
      setLoginplzModal(true);

      setTimeout(() => {
        setLoginplzModal(false);
      }, 3000);
    }
  }, [btnState, login]);

  return (
    <>
      {" "}
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
      {loginplzModal && <BookmarkNoti />}
    </>
  );
}
