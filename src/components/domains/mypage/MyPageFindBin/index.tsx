import more from "@/../public/images/mypageMore.svg";
import CardList from "@/components/commons/CardList";
import { loginState } from "@/lib/atoms/userAtom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import styles from "./MyPageToggle.module.scss";

const cn = classNames.bind(styles);
export default function MyPageFindBin() {
  const [loginStates] = useAtom(loginState);
  return (
    <div className={cn("findWrap")}>
      {loginStates && (
        <>
          <div className={cn("findTitle")}>내가 발견한 쓰레기통</div>
          <Link href={"/addbin"} className={cn("more")}>
            <Image src={more} alt={"쓰레기통 작성"} fill sizes="52px" />
          </Link>
        </>
      )}
      <div className={cn("findWrap2")}>
        <CardList />
      </div>
    </div>
  );
}
