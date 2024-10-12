import arrowBack from "@/../public/images/arrowGreen.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./AdminPageBar.module.scss";

const cn = classNames.bind(styles);

export default function AdminPageBar() {
  const router = useRouter();

  const handleBtn = () => {
    switch (router.pathname) {
      case "/mypage/ask":
        router.push("/mypage");
        break;

      default:
        router.back();
        break;
    }
  };
  return (
    <article className={cn("adminBar")} onClick={() => handleBtn()}>
      <Image src={arrowBack} alt="이전으로" width={8} height={16} />
      <div>관리자 페이지</div>
      <span></span>
    </article>
  );
}
