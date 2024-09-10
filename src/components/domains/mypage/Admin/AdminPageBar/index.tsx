import arrowBack from "@/../public/images/arrowGreen.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./AdminPageBar.module.scss";

const cn = classNames.bind(styles);

export default function AdminPageBar() {
  const router = useRouter();
  return (
    <div className={cn("adminBar")} onClick={() => router.push("/mypage")}>
      <Image src={arrowBack} alt="이전으로" width={8} height={16} />
      <div>관리자 페이지</div>
      <span></span>
    </div>
  );
}
