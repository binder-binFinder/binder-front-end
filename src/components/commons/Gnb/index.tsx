import home from "@/../public/images/home.svg";
import homeOn from "@/../public/images/homeOn.svg";
import mypage from "@/../public/images/mypage.svg";
import more from "@/../public/images/mypageMore.svg";
import mypageOn from "@/../public/images/mypageOn.svg";
import search from "@/../public/images/search.svg";
import searchOn from "@/../public/images/searchOn.svg";
import { getNotiUnread } from "@/lib/apis/noti";
import { loginState, notiAtom } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styles from "./Gnb.module.scss";

const cn = classNames.bind(styles);

export default function Gnb() {
  const [page, setPage] = useState<string>("");
  const [isNoti, setIsNoti] = useAtom(notiAtom);
  const [, setLoginState] = useAtom(loginState);
  const notiSet = useMemo(() => {
    let date = new Date().getMinutes();
    return page + date;
  }, [page]);

  const router = useRouter();
  useEffect(() => {
    setPage(router.asPath);
  }, [router]);

  const {
    data: noti,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["noti", notiSet],
    queryFn: getNotiUnread,
    gcTime: 1000,

    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) {
        setLoginState(false);
        return false; // 401 에러면 재시도 중지
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setIsNoti(noti.hasUnread);
      setLoginState(true);
    }
  }, [isSuccess]);

  if (isError) {
    setIsNoti(false);
  }
  const handleSearchClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search_page_click", {
        event_category: "Navigation",
        event_label: "Search Button",
        value: 1,
      });
    }
  };
  const handleAddBin = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_bin_click", {
        event_category: "Navigation",
        event_label: "Add Bin Button",
        value: 1,
      });
    }
  };
  return (
    <>
      <nav className={cn("gnbWrap")}>
        {router.asPath === "/mypage" && (
          <Link href={"/addbin"} className={cn("more")} onClick={handleAddBin}>
            <Image src={more} alt={"쓰레기통 작성"} fill sizes="52px" />
          </Link>
        )}
        <div data-cy="gnb1" className={page === "/" ? cn("gnbOn") : cn("gnb")}>
          <div className={cn("onBar")}></div>{" "}
          <Link href={"/"} className={cn("gnbMenuImg")}>
            <Image src={page === "/" ? homeOn : home} alt="홈" fill />
          </Link>
          <span>홈</span>
        </div>

        <div
          data-cy="gnb2"
          className={page.startsWith("/search") ? cn("gnbOn") : cn("gnb")}
          onClick={handleSearchClick}
        >
          <div className={cn("onBar")}></div>{" "}
          <Link href={"/search"} className={cn("gnbMenuImg")}>
            <Image
              src={page.startsWith("/search") ? searchOn : search}
              alt="검색"
              fill
            />
          </Link>
          <span>검색</span>
        </div>

        <div
          data-cy="gnb3"
          className={page.startsWith("/mypage") ? cn("gnbOn") : cn("gnb")}
        >
          <div className={cn("onBar")}></div>
          <Link href={"/mypage"} className={cn("gnbMenuImg")}>
            <Image
              src={page.startsWith("/mypage") ? mypageOn : mypage}
              alt="마이"
              fill
            />
            {isNoti && <div className={cn("notiNew")}></div>}
          </Link>
          <span>마이</span>
        </div>
      </nav>
    </>
  );
}

// Gnb.defaultProps = {};
