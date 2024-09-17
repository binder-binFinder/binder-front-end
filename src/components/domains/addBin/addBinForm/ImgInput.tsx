import Image from "next/image";
import styles from "./AddBinForm.module.scss";
import classNames from "classnames/bind";
import { ChangeEvent, forwardRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postImg } from "@/lib/apis/image";
import NoneImgInput from "./NoneImgInput";
import { InputProps } from "@/types/addFormTypes";

const cn = classNames.bind(styles);

interface Props extends InputProps {
  img: string;
  onChangeImgData: (imgurl: string) => void;
}

const ImgInput = forwardRef<HTMLInputElement, Props>(
  ({ id, img, onChangeImgData, onChange, ...props }, ref) => {
    const { mutate: imgPost } = useMutation({
      mutationFn: (data: FormData) => postImg(data),
      onSuccess: (imgData: { imageUrl: string }) => {
        onChangeImgData(imgData.imageUrl);
      },
      onError: (error) => {
        console.error(error);
      },
    });

    const handleChangeImgInput = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const formData = new FormData();
      formData.append("file", file!);
      file && imgPost(formData);
    };

    return (
      <div>
        <label htmlFor={id} className={cn("addbin-label")}>
          <p>
            쓰레기통 사진<span className={cn("choose")}>&#40;선택&#41;</span>
          </p>
          <NoneImgInput>
            {img ? (
              <Image
                src={img}
                className={cn("preview")}
                alt="쓰레기통 사진 미리 보기"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <></>
            )}
          </NoneImgInput>
        </label>
        <input
          id={id}
          className={cn("img-input")}
          type="file"
          onChange={handleChangeImgInput}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

ImgInput.displayName = "ImgInput";

export default ImgInput;
