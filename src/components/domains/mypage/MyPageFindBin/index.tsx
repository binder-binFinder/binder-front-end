import CardList from "@/components/commons/CardList";
import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";

const cn = classNames.bind(styles);
export default function MyPageFindBin() {
  return (
    <div className={cn("findWrap")}>
      <div className={cn("findTitle")}>내가 발견한 쓰레기통</div>
      <CardList />
    </div>
  );
}
