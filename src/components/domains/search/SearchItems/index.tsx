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
}

export default function SearchItems({ setPrevSearchPick }: searchProps) {
  const [prevSearch] = useAtom(searchPrev);
  const [detail, a] = useAtom(searchDetailList);
  const [, setChoice] = useAtom(searchChoice);
  const [bookmarks] = useAtom(searchBookmark);
  const [btnState] = useAtom(searchToggle);
  const [loginModal, setLoginModal] = useState(false);
  const router = useRouter();

  const handleDetail = (item: any) => {
    setChoice(item);
    router.push("/");
  };

  return (
    <>
      <div className={detail > 0 ? cn("itemsWrapDetail") : cn("itemsWrap")}>
        {/* <div onClick={() => a([])}>sdf</div> */}
        {detail.length > 0
          ? detail?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  handleDetail(item);
                }}
              >
                <SearchDetail item={item} setLoginModal={setLoginModal} />
              </div>
            ))
          : btnState === "최근 검색"
            ? prevSearch?.map((item: any, index: number) => (
                <div key={index} onClick={() => setPrevSearchPick(item.title)}>
                  <SearchItem item={item} num={index} />
                </div>
              ))
            : bookmarks?.map((item, index) => (
                <div key={index}>
                  <SearchDetail item={item} savePlace={true} />
                </div>
              ))}
      </div>
      {loginModal && <BookmarkNoti />}
    </>
  );
}
