import BookmarkNoti from "@/components/commons/Modal/Share/BookmarkNoti";
import { deleteSearch, prevSearch } from "@/lib/apis/search";
import {
  searchBookmark,
  searchDetailList,
  searchPrev,
  searchToggle,
} from "@/lib/atoms/atom";
import { loginState, searchChoice } from "@/lib/atoms/userAtom";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchDetail from "../SearchDetail";
import SearchItem from "../SearchItem";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

interface searchProps {
  setPrevSearchPick: any;
  target: any;
  prevSearchRef: any;
}

export default function SearchItems({
  setPrevSearchPick,
  target,
  prevSearchRef,
}: searchProps) {
  const [prevSearchNologin] = useAtom(searchPrev);
  const [detail] = useAtom(searchDetailList);
  const [, setChoice] = useAtom(searchChoice);
  const [bookmarks] = useAtom(searchBookmark);
  const [btnState, setBtnState] = useAtom(searchToggle);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [prevSearchList, setPrevSearchList] = useState<any[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [loginStates] = useAtom(loginState);

  const router = useRouter();

  const handleClickItem = (item: any) => {
    setChoice(item);
    return router.push(`/search/${item.id || item.binId}`);
  };

  const handlePickPrev = (data: any) => {
    setPrevSearchPick(data);
  };

  const {
    data: prevSearchData,
    fetchNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["searchPrev", lastId],
    queryFn: () => prevSearch(lastId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const notificationDetails = lastPage;
      return notificationDetails?.length >= 10
        ? notificationDetails[notificationDetails.length - 1].id
        : undefined;
    },
    enabled: !!loginStates,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: (id: number) => deleteSearch(id),
  });

  const deleteItem = (id: number, e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    handleDelete(id);
    setPrevSearchList((prev: any) =>
      prev.filter((prevItem: { id: number }) => prevItem.id !== id)
    );
  };

  useEffect(() => {
    if (!loginStates) {
      setPrevSearchList(prevSearchNologin);
    } else {
      setPrevSearchList([]);
    }
  }, [loginStates]);

  useEffect(() => {
    if (!prevSearchRef.current || !prevSearchData?.pages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && prevSearchData?.pages?.length > 0) {
          const lastPage = prevSearchData.pages[0];

          if (lastPage?.length >= 10) {
            setLastId(lastPage[9].id);
          }
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(prevSearchRef.current);

    return () => {
      if (prevSearchRef.current) observer.unobserve(prevSearchRef.current);
    };
  }, [prevSearchRef, prevSearchData, fetchNextPage]);

  useEffect(() => {
    if (isSuccess && prevSearchList !== null && lastId !== 0) {
      setPrevSearchList((prev) => [...prev, ...prevSearchData.pages.flat()]);
    } else if (isSuccess) {
      console.log(prevSearchData);
      setPrevSearchList(prevSearchData.pages[0]);
    }
  }, [isSuccess, prevSearchData, setPrevSearchList]);

  return (
    <>
      <div className={cn("itemsWrap")}>
        {detail &&
        Array.isArray(detail) &&
        detail.length === 0 &&
        btnState === "" ? (
          <div className={cn("searchNo")}>연관된 장소가 없습니다</div>
        ) : detail !== null && btnState === "" ? (
          detail?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                handleClickItem(item);
              }}
            >
              <SearchDetail item={item} setLoginModal={setLoginModal} />
            </div>
          ))
        ) : btnState === "최근 검색" ? (
          <>
            {prevSearchList?.map((item: any, index: number) => (
              <div key={index} onClick={() => handlePickPrev(item.keyword)}>
                <SearchItem
                  item={item}
                  num={index}
                  removeItem={(e: { stopPropagation: () => void }) =>
                    deleteItem(item.id, e)
                  }
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {bookmarks?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  handleClickItem(item);
                }}
              >
                <SearchDetail item={item} savePlace={true} />
              </div>
            ))}
          </>
        )}
      </div>
      {loginModal && <BookmarkNoti />}
    </>
  );
}
