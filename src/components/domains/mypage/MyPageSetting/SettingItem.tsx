import arrowRight from "@/../public/images/arrowRight.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./MyPageToggle.module.scss";

const cn = classNames.bind(styles);

interface SettingItemProps {
  name: string;
  handleFn: () => void;
  img: string;
}

export default function SettingItem({ name, handleFn, img }: SettingItemProps) {
  return (
    <div className={cn("settingItem")} onClick={handleFn}>
      <div className={cn("settingTitle")}>
        <div className={cn("settingLogout")}>
          <Image src={img} alt="로그아웃" fill sizes="15px" />
        </div>
        <div className={cn("settingText")}>{name}</div>
      </div>

      <div className={cn("settingLink")}>
        <Image src={arrowRight} alt="이동하기" fill sizes="8px" />
      </div>
    </div>
  );
}
