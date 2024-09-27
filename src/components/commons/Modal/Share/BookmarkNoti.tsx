import classNames from "classnames/bind";
import styles from "./Share.module.scss";

const cn = classNames.bind(styles);

export default function BookmarkNoti() {
  return <div className={cn("bookmarkNoti")}>로그인 후 이용 가능합니다</div>;
}
