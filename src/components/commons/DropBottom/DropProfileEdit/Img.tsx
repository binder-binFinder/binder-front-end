import { useCallback, useEffect } from "react";
import Image from "next/image";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEdit from "@/../public/images/profileEdit.svg";
import classNames from "classnames/bind";
import styles from "./DropProfileEdit.module.scss";
import { useMutation } from "@tanstack/react-query";
import { postImg } from "@/lib/apis/image";

const cn = classNames.bind(styles);

export default function Img({
  register,
  imgData,
  setImgData,
  profileImg,
  memberImg,
}: any) {
  const { mutate: imgPost } = useMutation({
    mutationFn: (data: any) => postImg(data),
    onSuccess: (data) => {
      setImgData(data.imageUrl);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // useCallback으로 handleImgPost 함수 메모이제이션
  const handleImgPost = useCallback(async () => {
    if (profileImg && profileImg[0]) {
      const formData = new FormData();
      formData.append("file", profileImg[0]);
      imgPost(formData);
    }
  }, [imgPost, profileImg]);

  // useEffect에 handleImgPost 및 profileImg를 의존성 배열에 추가
  useEffect(() => {
    if (profileImg !== "") {
      handleImgPost();
    }
  }, [handleImgPost, profileImg]);

  const img = imgData ? imgData : memberImg ? memberImg : defaultImg;

  return (
    <>
      <label htmlFor="profileImg" className={cn("imgEditWrap")}>
        <div className={cn("profileImg")}>
          <Image src={img} alt="프로필 이미지" fill />
        </div>
        <div className={cn("profileEdit")}>
          <div className={cn("profileEditimg")}>
            <Image src={profileEdit} alt="프로필 편집 이미지" fill />
          </div>
        </div>
      </label>
      <input
        className={cn("profile")}
        id="profileImg"
        type="file"
        accept="image/*"
        {...register}
      />
    </>
  );
}
