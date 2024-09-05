import classNames from "classnames/bind";
import styles from "./Share.module.scss";

const cn = classNames.bind(styles);

export default function ShareNoti() {
  return <div className={cn("shareNoti")}>URL 복사가 완료되었습니다</div>;
}
