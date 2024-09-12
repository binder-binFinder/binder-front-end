import arrowRight from "@/../public/images/arrowGreen.svg";
import noti from "@/../public/images/noti.svg";
import defaultImg from "@/../public/images/profileDefault.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./MyPageNologin.module.scss";

const cn = classNames.bind(styles);

export default function MyPageNologin() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/signin");
  };

  return (
    <>
      <div className={cn("profileWrap")}>
        <div className={cn("imgEditWrap")}>
          <div className={cn("profileImg")}>
            <Image src={defaultImg} alt="프로필 이미지" fill />
          </div>
        </div>

        <div
          className={cn("profileName")}
          onClick={handleLogin}
          data-cy="goLogin"
        >
          로그인하기{" "}
          <div className={cn("loginImg")}>
            <Image src={arrowRight} alt={"로그인하러 가기"} fill />
          </div>
        </div>
        <Image
          className={cn("profileNoti")}
          src={noti}
          alt="알림이미지"
          width={26}
          height={30}
        />
      </div>
    </>
  );
}
