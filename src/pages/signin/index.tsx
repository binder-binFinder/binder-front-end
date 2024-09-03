import SocialoginButton from "@/components/domains/signin/SocialoginButton";
import styles from "./signin.module.scss";
import classNames from "classnames/bind";
import { SOCIAL_LOGIN_URL } from "@/lib/constants/urls";
import Toast from "@/components/domains/signin/Toast";

const cn = classNames.bind(styles);

export default function Signin() {
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
      <article className={cn("btns-wrapper")}>
        <Toast />
        <SocialoginButton label="kakao" onClick={handleClickKakaoSignIn} testId={"kakaoBtn"} />
        <SocialoginButton label="naver" onClick={handleClickNaverSignIn} testId={"naverBtn"} />
        <SocialoginButton label="google" onClick={handleClickGoogleSignIn} testId={"googleBtn"} />
      </article>
    </section>
  );
}
