import Image from "next/image";
import styles from "./AddBinForm.module.scss";
import classNames from "classnames/bind";
import { InputProps } from ".";

const cn = classNames.bind(styles);

export default function ImgInput({ id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={cn("addbin-label")}>
        <p>
          쓰레기통 사진<span className={cn("choose")}>&#40;선택&#41;</span>
        </p>
        <div className={cn("addbin-img-box")}>
          <Image src={"/images/icon-add-img.svg"} alt="쓰레기통 이미지 추가하기" width={30} height={22} />
          <p className={cn("addbin-img-box-text")}>여기를 눌러 사진을 추가하세요</p>
        </div>
      </label>
      <input id={id} className={cn("img-input")} type="file" {...props} />
    </div>
  );
}
