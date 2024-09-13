import { patchMembers } from "@/lib/apis/members";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import styles from "./DropProfileEdit.module.scss";
import Img from "./Img";
import Nickname from "./Nickname";

const cn = classNames.bind(styles);

interface IFormInput {
  profileImg: any;
  nickname: string;
}

interface EditProfileProps {
  closeBtn: () => void;
  memberData: any;
  setNick: any;
  nick: string;
  setImg: any;
}

export default function DropProfileEdit({
  closeBtn,
  memberData,
  setNick,
  nick,
  setImg,
}: EditProfileProps) {
  const [submit, setSubmit] = useState<boolean>(false);
  const [submitNick, setSubmitNick] = useState<boolean>(false);
  const [imgData, setImgData] = useState<any>(memberData.imageUrl);
  const [prevNickname, setPrevNickname] = useState<string>(nick.slice(0, 16));
  const [inputValue, setInputValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    profileEdit({
      nickname: data.nickname ? data.nickname : prevNickname,
      imageUrl: imgData,
    });
    console.log(data.nickname, imgData);
  };

  const { mutate: profileEdit } = useMutation({
    mutationFn: (data: { nickname: string; imageUrl: string }) =>
      patchMembers(data),
    onSuccess: () => {
      closeBtn();
      setNick(nickname === "" ? prevNickname : nickname);
      setPrevNickname(nick);
      setImg(imgData);
    },
  });

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

  const handleInputX = () => {
    setInputValue("");
  };

  useEffect(() => {
    setSubmit(
      profileImg.length > 0 || (nickname !== "" && nickname.length > 1)
    );
    setSubmitNick(nickname.length > 1);
  }, [profileImg, nickname]);

  useEffect(() => {
    setInputValue(prevNickname);
  }, []);

  return (
    <DropWrap
      title="프로필 수정"
      btn="적용"
      closeBtn={closeBtn}
      btnFunction={handleSubmit(onSubmit)}
      submitState={submit}
    >
      <>
        {/^(naver_|google_|kakao_)/.test(nick) && (
          <div className={cn("editfirst")}>
            최초 수정 시 닉네임 변경이 필요합니다
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("profiltEditWrap")}
        >
          <Img
            register={register("profileImg")}
            imgData={imgData}
            setImgData={setImgData}
            profileImg={profileImg}
            memberImg={memberData.imageUrl}
          />

          {/* 닉네임  */}
          <Nickname
            errors={errors}
            register={{
              ...register("nickname", {
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 2자 이상이어야 합니다.",
                },
                maxLength: 16,
                pattern: {
                  value: /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/,
                  message: "특수문자는 사용할 수 없습니다.",
                },
                onChange: (e) => {
                  setInputValue(e.target.value);
                },
              }),
            }}
            submitNick={submitNick}
            prevNickname={prevNickname}
            nickname={nickname}
            inputValue={inputValue}
            handleInputX={handleInputX}
          />
        </form>
      </>
    </DropWrap>
  );
}
DropProfileEdit.defaultProps = {};
