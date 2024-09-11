import classNames from "classnames/bind";

import styles from "./AdminDetail.module.scss";

const cn = classNames.bind(styles);

interface AdminDetailItemProps {
  title: string;
  detail: string;
}

export default function AdminDetailItem({
  title,
  detail,
}: AdminDetailItemProps) {
  return (
    <div className={cn("detail")}>
      <div>{title}</div>
      <div className={cn("detailItemTitle")}>{detail}</div>
    </div>
  );
}
