import close from "@/../public/images/close.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./MyPageNoti.module.scss";

const cn = classNames.bind(styles);
export default function NotiItem() {
  return (
    <div className={cn("notiItemWrap")}>
      <div className={cn("notiItemDate")}>
        2023. 06. 13 <div className={cn("notiItemNew")}></div>
      </div>
      <div className={cn("notiItemTitle")}>
        이렇고 저렇고 알림 이 왔습니다. 쓰레기통이 거절일지도 승인일지도
      </div>
      <div className={cn("notiItemAdmin")}>관리자가 입력한 사유</div>
      <Image
        className={cn("notiItemDelete")}
        src={close}
        alt={"알림 지우기"}
        width={11}
        height={11}
      />
    </div>
  );
}
