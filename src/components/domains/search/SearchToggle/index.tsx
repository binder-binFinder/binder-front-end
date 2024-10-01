import BookmarkNoti from "@/components/commons/Modal/Share/BookmarkNoti";
import { getMyBookmark } from "@/lib/apis/bookmarks";
import {
  searchBookmark,
  searchDetailList,
  searchToggle,
} from "@/lib/atoms/atom";
import { loginState, userCoordinate } from "@/lib/atoms/userAtom";
import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styles from "./SearchToggle.module.scss";

const cn = classNames.bind(styles);

export default function SearchToggle({ target }: any) {
  const [btnState, setBtnState] = useAtom(searchToggle);
  const [coordinate] = useAtom(userCoordinate);
  const [login] = useAtom(loginState);
  const [, setSearch] = useAtom(searchBookmark);
  const [loginplzModal, setLoginplzModal] = useState<boolean>(false);
  const [detail, setDetail] = useAtom(searchDetailList);
  const [lastId, setLastId] = useState<number>(-1);
  const [notis, setNotis] = useState<any[]>([]);

  const {
    data: bookmarkData,
    fetchNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["bookmarkDatas", lastId, coordinate],
    queryFn: () => getMyBookmark(coordinate.x, coordinate.y, lastId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const notificationDetails = lastPage?.notificationDetails;
      return notificationDetails?.length >= 10
        ? notificationDetails[notificationDetails.length - 1].notificationId
        : undefined;
    },
    enabled: !!coordinate,
  });

  if (isSuccess) {
    setSearch(bookmarkData);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const lastPage = bookmarkData?.pages[bookmarkData.pages.length - 1];
          if (bookmarkData?.pages[0]?.length >= 10) {
            console.log(lastPage);
            setLastId(lastPage[9].bookmarkId);
          }
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, []);

  useEffect(() => {
    if (bookmarkData?.pages) {
      const newBookmark = bookmarkData.pages.flat();

      setSearch((prev: any) => {
        // prev가 null이거나 undefined일 경우 빈 배열로 대체
        const combinedNotis = [
          ...newBookmark,
          ...(Array.isArray(prev) ? prev : []),
        ];

        // Set을 이용하여 중복 제거
        const uniqueNotis = Array.from(
          new Set(combinedNotis.map((item) => item.bookmarkId))
        ).map((id) => combinedNotis.find((item) => item.bookmarkId === id));

        return uniqueNotis;
      });
    }
  }, [bookmarkData]);
  useEffect(() => {
    if (btnState === "저장한 장소" && login === false) {
      setLoginplzModal(true);

      setTimeout(() => {
        setLoginplzModal(false);
      }, 3000);
    }
  }, [btnState, login]);

  useEffect(() => {
    if (detail?.length > 0) {
      setBtnState("");
    } else if (btnState === "최근 검색") {
      setBtnState("최근 검색");
    } else if (btnState === "저장한 장소") {
      setBtnState("저장한 장소");
    }
  }, [detail]);

  useEffect(() => {
    if (btnState === "최근 검색" || btnState === "저장한 장소") {
      setDetail(null);
    }
  }, [btnState]);

  const onClickRecentSearch = (text: string) => {
    setDetail(null);
    setBtnState(text);
  };
  return (
    <>
      <div className={cn("toggleWrap")}>
        <div
          className={
            btnState === "최근 검색" ? cn("toggleBtnOn") : cn("toggleBtn")
          }
          onClick={() => onClickRecentSearch("최근 검색")}
        >
          최근 검색
        </div>
        <div
          className={
            btnState === "저장한 장소" ? cn("toggleBtnOn") : cn("toggleBtn")
          }
          onClick={() => onClickRecentSearch("저장한 장소")}
        >
          저장한 장소
        </div>
      </div>
      {loginplzModal && <BookmarkNoti />}
    </>
  );
}
