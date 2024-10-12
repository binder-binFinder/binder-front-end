import logo from "@/../public/images/logo-144-full.png";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Splash.module.scss";

const cn = classNames.bind(styles);

export default function Splash() {
  const [loading, setLoading] = useState(false); // 초기 상태 false로 변경

  useEffect(() => {
    const hasVisited = Cookies.get("visited");

    if (hasVisited !== "true") {
      setLoading(true); // 처음 방문할 때만 로딩 화면을 보여줌
      Cookies.set("visited", "true", { expires: 1 }); // 쿠키 설정
      setTimeout(() => {
        setLoading(false); // 3초 후 로딩 종료
      }, 3000);
    }
  }, []);

  return (
    loading && (
      <div className={cn("splashWrap")}>
        <div>
          <Image src={logo} alt="로고" width={144} height={144} />
          {/* <p>앗! 쓰레기통이다</p> */}
        </div>
        <div className={cn("version")}>Ver. 01</div>
      </div>
    )
  );
}
