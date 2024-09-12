import inputX from "@/../public/images/inputX.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./DropProfileEdit.module.scss";

const cn = classNames.bind(styles);

interface NicknameProps {
  register: any;
  errors: any;
  submitNick: boolean;
  prevNickname: string;
  nickname: string;
  inputValue?: string;
  handleInputX: () => void;
}
export default function Nickname({
  register,
  errors,
  submitNick,
  prevNickname,
  nickname,
  inputValue,
  handleInputX,
}: NicknameProps) {
  return (
    <div className={cn("nicknameWrap")}>
      <div className={cn("nicknameTitle")}>
        <label
          htmlFor="nickname"
          className={
            errors.nickname
              ? cn("nicknameRed")
              : submitNick
                ? cn("nicknameGreen")
                : cn("nickname")
          }
        >
          닉네임
        </label>
        {errors.nickname ? (
          <div className={cn("nicknameNotiRed")}>{errors.nickname.message}</div>
        ) : (
          <div className={cn("nicknameNoti")}>
            {nickname.length === 0 ? prevNickname.length : nickname.length} /
            16자
          </div>
        )}
      </div>
      <div className={cn("inputWrap")}>
        <input
          // defaultValue={inputValue}
          className={
            errors.nickname
              ? cn("nicknameInputRed")
              : submitNick
                ? cn("nicknameInputGreen")
                : cn("nicknameInput")
          }
          id="nickname"
          type="text"
          maxLength={16}
          value={inputValue}
          {...register}
          placeholder="한글, 영어, 숫자만 사용가능 (2자 이상)"
        />
        <div className={cn("inputX")} onClick={() => handleInputX()}>
          <Image src={inputX} alt="인풋 비우기" fill sizes="17px" />
        </div>
      </div>
    </div>
  );
}
