import arrowBack from "@/../public/images/arrowGreen.svg";
import notiNone from "@/../public/images/notiNone.svg";
import Portal from "@/components/commons/Modal/Portal";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./MyPageNoti.module.scss";
import NotiItem from "./NotiItem";

const cn = classNames.bind(styles);

export default function MyPageNoti({ closeBtn }: any) {
  const noti = true;
  return (
    <Portal>
      <div className={cn("modal")}>
        <div className={cn("notiWrap")}>
          <div className={cn("bar")} onClick={closeBtn}>
            <Image src={arrowBack} alt="이전으로" width={8} height={16} />
            <div>
              알림 <div className={cn("notiCount")}>3건</div>
            </div>
            <span></span>
          </div>

          <div className={cn("notiBack")}>
            {noti ? (
              <div className={cn("notiItemBox")}>
                <NotiItem />
                <NotiItem />
                <NotiItem />
                <NotiItem />
                <NotiItem />
                <NotiItem />
              </div>
            ) : (
              <div className={cn("notiNone")}>
                <Image
                  src={notiNone}
                  alt="알림이 없습니다."
                  width={79}
                  height={79}
                />
                <p>새로운 알림이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
