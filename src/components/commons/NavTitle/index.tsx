import { ReactNode } from "react";
import styles from "./NavTitle.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

interface Props {
  children: ReactNode;
}

export default function NavTitle({ children }: Props) {
  const router = useRouter();

  const handelClickRouteBack = () => router.back();

  return (
    <section className={cn("nav-title-wrapper")}>
      <button className={cn("prev-btn")} onClick={handelClickRouteBack} type="button">
        <Image src={"/images/icon-left-arrow.svg"} alt="전 페이지로 이동" width={8} height={16} />
      </button>
      <h2 className={cn("nav-title")}>{children}</h2>
      <div></div>
    </section>
  );
}
