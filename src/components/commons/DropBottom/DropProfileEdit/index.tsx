import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropProfileEdit.module.scss";
import Image from "next/image";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEdit from "@/../public/images/profileEdit.svg";

const cn = classNames.bind(styles);

interface IFormInput {
  profileImg: string;
  nickname: string;
}

export default function DropProfileEdit() {
  const [submit, setSubmit] = useState<boolean>(false);

  const { register, handleSubmit, control } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const profileImg = useWatch({
    control,
    name: "profileImg",
    defaultValue: "",
  });

  const nickname = useWatch({
    control,
    name: "nickname",
    defaultValue: "",
  });

  useEffect(() => {
    setSubmit(profileImg.length > 0 || nickname !== "");
  }, [profileImg, nickname]);

  return (
    <DropWrap
      title="프로필 수정"
      btn="적용"
      closeBtn={() => {}}
      btnFunction={handleSubmit(onSubmit)}
      submitState={submit}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={cn("profiltEditWrap")}>
        <div className={cn("imgEditWrap")}>
          <div className={cn("profileImg")}>
            <Image src={defaultImg} alt="프로필 이미지" fill />
          </div>
          <label htmlFor="profileImg" className={cn("profileEdit")}>
            <div className={cn("profileEditimg")}>
              <Image src={profileEdit} alt="프로필 편집 이미지" fill />
            </div>
          </label>
        </div>
        <input
          className={cn("profile")}
          id="profileImg"
          type="file"
          accept="image/*"
          {...register("profileImg")}
        />

        <div className={cn("nicknameWrap")}>
          <label htmlFor="nickname" className={cn("nickname")}>
            닉네임
          </label>
          <input
            className={cn("nicknameInput")}
            id="nickname"
            type="text"
            {...register("nickname")}
            placeholder="한글, 영어, 숫자만 사용가능"
          />
        </div>
      </form>
    </DropWrap>
  );
}
DropProfileEdit.defaultProps = {};
