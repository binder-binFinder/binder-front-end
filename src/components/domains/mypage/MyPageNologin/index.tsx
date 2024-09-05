import classNames from "classnames/bind";
import styles from "./MyPageNologin.module.scss";
import defaultImg from "@/../public/images/profileDefault.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import arrowRight from "@/../public/images/arrowGreen.svg";

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

        <div className={cn("profileName")} onClick={handleLogin}>
          로그인하기{" "}
          <div className={cn("loginImg")}>
            <Image src={arrowRight} alt={"로그인하러 가기"} fill />
          </div>
        </div>
      </div>
    </>
  );
}
