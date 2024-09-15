import home from "@/../public/images/home.svg";
import homeOn from "@/../public/images/homeOn.svg";
import mypage from "@/../public/images/mypage.svg";
import mypageOn from "@/../public/images/mypageOn.svg";
import search from "@/../public/images/search.svg";
import searchOn from "@/../public/images/searchOn.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Gnb.module.scss";

const cn = classNames.bind(styles);

export default function Gnb() {
  const [page, setPage] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    setPage(router.asPath);
  }, [router]);

  return (
    <div className={cn("gnbWrap")}>
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
          {false && <div className={cn("notiNew")}></div>}
        </Link>
        <span>마이</span>
      </div>
    </div>
  );
}

Gnb.defaultProps = {};
