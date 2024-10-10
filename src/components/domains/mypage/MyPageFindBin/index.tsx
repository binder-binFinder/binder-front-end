import CardList from "@/components/commons/CardList";
import { loginState } from "@/lib/atoms/userAtom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import styles from "./MyPageToggle.module.scss";

const cn = classNames.bind(styles);
export default function MyPageFindBin() {
  const [loginStates] = useAtom(loginState);
  return (
    <figure>
      <div className={cn("findWrap")}>
        {loginStates && (
          <>
            <div className={cn("findTitle")}>내가 발견한 쓰레기통</div>
          </>
        )}
        <div className={cn("findWrap2")}>
          <CardList />
        </div>
      </div>
    </figure>
  );
}
