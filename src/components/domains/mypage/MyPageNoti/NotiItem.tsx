import close from "@/../public/images/close.svg";
import { deleteNoti } from "@/lib/apis/noti";
import { binType } from "@/lib/constants/binType";
import { notiText } from "@/lib/constants/notiText";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./MyPageNoti.module.scss";

const cn = classNames.bind(styles);

interface NotiItemProps {
  item: any;
  setNotis: any;
}
export default function NotiItem({ item, setNotis }: NotiItemProps) {
  const binText = notiText(item?.notificationType);

  const binTypes = binType(item.binType);
  const date = [
    item.createdAt.slice(0, 4),
    item.createdAt.slice(5, 7),
    item.createdAt.slice(8, 10),
  ];

  const { mutate: deleteNotis } = useMutation({
    mutationFn: () => deleteNoti(item.notificationId),
    onSuccess: () => {
      setNotis((prev: any[]) =>
        prev.filter(
          (prevItem: { notificationId: any }) =>
            prevItem.notificationId !== item.notificationId
        )
      );
    },
  });
  return (
    <div className={cn("notiItemWrap")}>
      <div className={cn("notiItemDate")}>
        {date[0] + ". " + date[1] + ". " + date[2]}{" "}
        {!item.isRead && <div className={cn("notiItemNew")}></div>}
      </div>
      <div className={cn("notiItemTitle")}>
        {item?.binTitle} {binTypes} {binText}
      </div>
      <div className={cn("notiItemAddress")}>{item?.binAddress}</div>
      <div className={cn("notiItemAdmin")}>{item?.reasonMessage}</div>
      <Image
        className={cn("notiItemDelete")}
        src={close}
        alt={"알림 지우기"}
        width={11}
        height={11}
        onClick={() => deleteNotis()}
      />
    </div>
  );
}
