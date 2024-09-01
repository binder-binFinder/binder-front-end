import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropReason.module.scss";
import Image from "next/image";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEdit from "@/../public/images/profileEdit.svg";

const cn = classNames.bind(styles);

interface IFormInput {
  text: string;
}

export default function DropReason() {
  const [submit, setSubmit] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  const text = watch("text");
  useEffect(() => {
    if (text !== "") {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [text]);

  return (
    <DropWrap
      title="거절 사유 입력"
      btn="등록"
      closeBtn={undefined}
      btnFunction={handleSubmit(onSubmit)}
      submitState={submit}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={cn("profiltEditWrap")}>
        <textarea
          className={cn("textInput")}
          id="text"
          {...register("text")}
          placeholder="거절 사유를 입력하세요"
        />
      </form>
    </DropWrap>
  );
}
DropReason.defaultProps = {};
