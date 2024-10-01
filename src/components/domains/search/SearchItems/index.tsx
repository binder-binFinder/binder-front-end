import BookmarkNoti from "@/components/commons/Modal/Share/BookmarkNoti";
import {
  searchBookmark,
  searchDetailList,
  searchPrev,
  searchToggle,
} from "@/lib/atoms/atom";
import { searchChoice } from "@/lib/atoms/userAtom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchDetail from "../SearchDetail";
import SearchItem from "../SearchItem";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

interface searchProps {
  setPrevSearchPick: any;
  target: any;
}

export default function SearchItems({
  setPrevSearchPick,
  target,
}: searchProps) {
  const [prevSearch] = useAtom(searchPrev);
  const [detail] = useAtom(searchDetailList);
  const [, setChoice] = useAtom(searchChoice);
  const [bookmarks] = useAtom(searchBookmark);
  const [btnState] = useAtom(searchToggle);
  const [loginModal, setLoginModal] = useState(false);

  const router = useRouter();

  const handleClickItem = (item: any) => {
    setChoice(item);
    return router.push(`search/${item.id}`);
  };
  console.log(bookmarks);
  return (
    <>
      <div className={cn("itemsWrap")}>
        {detail && Array.isArray(detail) && detail.length === 0 ? (
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
          prevSearch?.map((item: any, index: number) => (
            <div key={index} onClick={() => setPrevSearchPick(item.title)}>
              <SearchItem item={item} num={index} />
            </div>
          ))
        ) : (
          <>
            {bookmarks?.pages[0]?.map((item: any, index: number) => (
              <div key={index}>
                <SearchDetail item={item} savePlace={true} />
              </div>
            ))}
            <div ref={target} className={cn("refBox")}></div>
          </>
        )}
      </div>
      {loginModal && <BookmarkNoti />}
    </>
  );
}
