import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import accountDelete from "@/../public/images/accountDelete.svg";
import logout from "@/../public/images/logout.svg";
import arrowRight from "@/../public/images/arrowRight.svg";
import share from "@/../public/images/share.svg";
import Image from "next/image";

const cn = classNames.bind(styles);

interface SettingItemProps {
  name: string;
  handleFn: () => void;
}

export default function SettingItem({ name, handleFn }: SettingItemProps) {
  return (
    <div className={cn("settingItem")} onClick={handleFn}>
      <div className={cn("settingTitle")}>
        <div className={cn("settingLogout")}>
          <Image
            src={
              name === "로그아웃" || name === "소셜 로그인"
                ? logout
                : name === "공유하기"
                  ? share
                  : accountDelete
            }
            alt="로그아웃"
            fill
            sizes="15px"
          />
        </div>
        <div className={cn("settingText")}>{name}</div>
      </div>

      <div className={cn("settingLink")}>
        <Image src={arrowRight} alt="이동하기" fill sizes="8px" />
      </div>
    </div>
  );
}
