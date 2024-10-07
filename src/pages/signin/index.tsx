import LoginToast from "@/components/domains/signin/LoginToast";
import SocialoginButton from "@/components/domains/signin/SocialoginButton";
import { SOCIAL_LOGIN_URL } from "@/lib/constants/urls";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./signin.module.scss";

const cn = classNames.bind(styles);

export default function Signin() {
  const router = useRouter();
  const handleClickKakaoSignIn = () => {
    window.location.href = SOCIAL_LOGIN_URL + "/kakao";
  };

  const handleClickNaverSignIn = () => {
    window.location.href = SOCIAL_LOGIN_URL + "/naver";
  };

  const handleClickGoogleSignIn = () => {
    window.location.href = SOCIAL_LOGIN_URL + "/google";
  };

  return (
    <section className={cn("wrapper")}>
      <button className={cn("back-btn")} onClick={router.back}>
        <Image src={"/images/icon-left-arrow.svg"} alt="뒤로가기" fill />
      </button>
      <div>
        <article className={cn("title-box")}>
          <Image
            alt="logo"
            src={"/images/logo.svg"}
            objectFit="fit"
            width={120}
            height={39}
          />
          <p className={cn("description")}>로그인 후 이용가능합니다.</p>
        </article>
        <article className={cn("btns-wrapper")}>
          <LoginToast />
          <SocialoginButton
            label="kakao"
            onClick={handleClickKakaoSignIn}
            testId={"kakaoBtn"}
          />
          <SocialoginButton
            label="naver"
            onClick={handleClickNaverSignIn}
            testId={"naverBtn"}
          />
          <SocialoginButton
            label="google"
            onClick={handleClickGoogleSignIn}
            testId={"googleBtn"}
          />
        </article>
      </div>
    </section>
  );
}
