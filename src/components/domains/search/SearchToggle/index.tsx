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
  const [isDistance, setDistance] = useState<number | null>(null);

  const {
    data: bookmarkData,
    fetchNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["bookmarkDatas", lastId, coordinate, isDistance],
    queryFn: () =>
      getMyBookmark(coordinate.x, coordinate.y, lastId, isDistance),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const notificationDetails = lastPage;
      return notificationDetails?.length >= 10
        ? notificationDetails[notificationDetails.length - 1].bookmarkId
        : undefined;
    },
    enabled: !!coordinate && !!login,
  });

  useEffect(() => {
    if (!target.current || !bookmarkData?.pages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && bookmarkData?.pages?.length > 0) {
          const lastPage = bookmarkData.pages[bookmarkData.pages.length - 1];
          if (lastPage?.length >= 10) {
            setLastId(lastPage[9].bookmarkId);
            setDistance(lastPage[9].distance);
          }
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
    };
  }, [target, bookmarkData, fetchNextPage]); // bookmarkData와 fetchNextPage 의존성 추가

  // 중복 제거 및 상태 업데이트
  useEffect(() => {
    if (isSuccess && bookmarkData?.pages) {
      const newBookmark = bookmarkData.pages.flat();

      setSearch((prev: any) => {
        // prev가 null이거나 undefined일 경우 빈 배열로 대체
        const combinedNotis = [
          ...(Array.isArray(prev) ? prev : []),
          ...newBookmark,
        ];

        // 중복 제거
        const uniqueNotis = combinedNotis.filter(
          (v, i, a) => a.findIndex((t) => t.bookmarkId === v.bookmarkId) === i
        );

        return uniqueNotis;
      });
    }
  }, [isSuccess, bookmarkData, setSearch]); // 의존성에 isSuccess와 bookmarkData 추가

  // 로그인 확인 로직
  useEffect(() => {
    if (btnState === "저장한 장소" && !login) {
      setLoginplzModal(true);
      setTimeout(() => {
        setLoginplzModal(false);
      }, 3000);
    }
  }, [btnState, login]);

  // 최근 검색 및 저장한 장소 버튼 로직
  useEffect(() => {
    if (detail?.length > 0) {
      setBtnState("");
    } else if (btnState === "최근 검색" || btnState === "저장한 장소") {
      setDetail(null);
    }
  }, [detail]);

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
