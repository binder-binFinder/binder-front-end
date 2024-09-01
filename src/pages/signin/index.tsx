import SigninButton from "@/components/domain/signin/SigninButton";
import styles from "./signin.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function SignIn() {
  const handleClickKakaoSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/kakao";
  };

  const handleClickNaverSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/naver";
  };
  const handleClickGoogleSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/google";
  };
  
  return (
    <>
      <article className={cn("btns-wrapper")}>
        <SigninButton label="kakao" onClick={handleClickKakaoSignIn} testId={"kakaoBtn"} />
        <SigninButton label="naver" onClick={handleClickNaverSignIn} testId={"naverBtn"} />
        <SigninButton label="google" onClick={handleClickGoogleSignIn} testId={"googleBtn"} />
      </article>
    </>
  );
}
