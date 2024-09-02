import SocialoginButton from "@/components/domains/signin/SocialoginButton";
import styles from "./signin.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMembersMe } from "@/lib/apis/getMembersMe";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";

const cn = classNames.bind(styles);

export default function Signin() {
  const [user, setUser] = useAtom(userAtom);

  const { data: userData, isLoading, isError } = useQuery({ queryKey: ["user"], queryFn: () => getMembersMe() });

  useEffect(() => {
    if (userData && !user) {
      setUser(userData);
      console.log(userData);
    }
  }, [userData, user, setUser]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  //.env 에 담아서 url 변수로 지정하기 -- 나중에
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
        <SocialoginButton label="kakao" onClick={handleClickKakaoSignIn} testId={"kakaoBtn"} />
        <SocialoginButton label="naver" onClick={handleClickNaverSignIn} testId={"naverBtn"} />
        <SocialoginButton label="google" onClick={handleClickGoogleSignIn} testId={"googleBtn"} />
      </article>
    </>
  );
}
