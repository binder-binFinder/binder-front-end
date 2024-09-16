import close from "@/../public/images/close.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./MyPageNoti.module.scss";

const cn = classNames.bind(styles);

interface NotiItemProps {
  item: any;
}
export default function NotiItem({ item }: NotiItemProps) {
  const binType = () => {
    switch (item?.notificationType) {
      case "BIN_REGISTRATION_REJECTED":
        return "등록 이(가) 거절 되었습니다.";
      case "BIN_REGISTRATION_APPROVED":
        return "등록 이(가) 승인 되었습니다.";
      case "BIN_MODIFICATION_APPROVED":
        return "수정 이(가) 승인 되었습니다.";
      case "BIN_MODIFICATION_REJECTED":
        return "수정 이(가) 거절 되었습니다.";
      case "BIN_COMPLAINT_APPROVED":
        return "신고 이(가) 승인 되었습니다.";
      case "BIN_COMPLAINT_REJECTED":
        return "신고 이(가) 거절 되었습니다.";
      case "BIN_LIKED":
        return "좋아요";
      case "BIN_DISLIKED":
        return "싫어요";
      default:
        break;
    }
  };

  return (
    <div className={cn("notiItemWrap")}>
      <div className={cn("notiItemDate")}>
        2023. 06. 13 {!item.isRead && <div className={cn("notiItemNew")}></div>}
      </div>
      <div className={cn("notiItemTitle")}>
        {item?.binTitle} (쓰레기통 종류) {binType()}
      </div>
      <div className={cn("notiItemAddress")}>{item?.binAddress}</div>
      <div className={cn("notiItemAdmin")}>{item?.reasonMessage}</div>
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
