import classNames from "classnames/bind";
import styles from "./DropProfileEdit.module.scss";

const cn = classNames.bind(styles);

interface NicknameProps {
  register: any;
  errors: any;
  submitNick: boolean;
  prevNickname: string;
  nickname: string;
}
export default function Nickname({
  register,
  errors,
  submitNick,
  prevNickname,
  nickname,
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
      <input
        defaultValue={prevNickname}
        className={
          errors.nickname
            ? cn("nicknameInputRed")
            : submitNick
              ? cn("nicknameInputGreen")
              : cn("nicknameInput")
        }
        id="nickname"
        type="text"
        maxLength={10}
        {...register}
        placeholder="한글, 영어, 숫자만 사용가능 (2자 이상)"
      />
    </div>
  );
}
