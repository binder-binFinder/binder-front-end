import Image from "next/image";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEdit from "@/../public/images/profileEdit.svg";
import classNames from "classnames/bind";
import styles from "./DropProfileEdit.module.scss";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
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

  const handleImgPost = async () => {
    const formData = new FormData();
    formData.append("file", profileImg[0]);
    imgPost(formData);
  };
  useEffect(() => {
    if (profileImg !== "") {
      handleImgPost();
    }
  }, [profileImg]);
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
