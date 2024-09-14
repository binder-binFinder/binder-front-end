import Image from "next/image";
import styles from "./AddBinForm.module.scss";
import classNames from "classnames/bind";
import { ReactElement } from "react";

const cn = classNames.bind(styles);

export default function NoneImgInput({ children, disabled = false }: { children?: ReactElement; disabled?: boolean }) {
  return (
    <div className={cn("addbin-img-box")}>
      <Image src={"/images/icon-add-img.svg"} alt="쓰레기통 이미지가 없습니다" width={30} height={22} />
      <p className={cn("addbin-img-box-text")}>
        {disabled ? "등록된 사진이 없습니다." : "여기를 눌러 사진을 추가하세요"}
      </p>
      {children}
    </div>
  );
}
