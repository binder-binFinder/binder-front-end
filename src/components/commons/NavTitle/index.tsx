import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./NavTitle.module.scss";

const cn = classNames.bind(styles);

interface Props {
  children: ReactNode;
}

export default function NavTitle({ children }: Props) {
  const router = useRouter();

  const handleClickRouteBack = () => router.back();

  return (
    <header className={cn("nav-title-wrapper")}>
      <button
        className={cn("prev-btn")}
        onClick={handleClickRouteBack}
        type="button"
      >
        <Image
          src={"/images/icon-left-arrow.svg"}
          alt="전 페이지로 이동"
          fill
        />
      </button>
      <h2 className={cn("nav-title")}>{children}</h2>
      <div></div>
    </header>
  );
}
