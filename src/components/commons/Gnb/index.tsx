import home from "@/../public/images/home.svg";
import homeOn from "@/../public/images/homeOn.svg";
import mypage from "@/../public/images/mypage.svg";
import more from "@/../public/images/mypageMore.svg";
import mypageOn from "@/../public/images/mypageOn.svg";
import search from "@/../public/images/search.svg";
import searchOn from "@/../public/images/searchOn.svg";
import { getNotiUnread } from "@/lib/apis/noti";
import { notiAtom } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Gnb.module.scss";

const cn = classNames.bind(styles);

export default function Gnb() {
  const [page, setPage] = useState<string>("");
  const [isNoti, setIsNoti] = useAtom(notiAtom);

  const router = useRouter();
  useEffect(() => {
    setPage(router.asPath);
  }, [router]);

  const {
    data: noti,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["noti"],
    queryFn: getNotiUnread,

    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) {
        return false; // 401 에러면 재시도 중지
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setIsNoti(noti.hasUnread);
    }
  }, [isSuccess]);

  if (isError) {
    setIsNoti(false);
  }

  return (
    <>
      <div className={cn("gnbWrap")}>
        {router.asPath === "/mypage" && (
          <Link href={"/addbin"} className={cn("more")}>
            <Image src={more} alt={"쓰레기통 작성"} fill sizes="52px" />
          </Link>
        )}
        <div className={page === "/" ? cn("gnbOn") : cn("gnb")}>
          <div className={cn("onBar")}></div>{" "}
          <Link href={"/"} className={cn("gnbMenuImg")}>
            <Image src={page === "/" ? homeOn : home} alt="홈" fill />
          </Link>
          <span>홈</span>
        </div>

        <div className={page.startsWith("/search") ? cn("gnbOn") : cn("gnb")}>
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

        <div className={page.startsWith("/mypage") ? cn("gnbOn") : cn("gnb")}>
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
      </div>
    </>
  );
}

Gnb.defaultProps = {};
