import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropReason.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  text: string;
}

interface Props {
  title: string;
  placeholder: string;
  onHandleSubmit: (data: string) => void;
  state: "수정" | "등록" | "신고 승인" | "신고 거절" | "정보";
  closeBtn: () => void;
}
export default function DropReason({ title, placeholder, onHandleSubmit, closeBtn, state }: Props) {
  const [submit, setSubmit] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onHandleSubmit(data.text);
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
      title={title}
      btn={state === "신고 거절" || state === "신고 승인" ? state : "등록"}
      closeBtn={closeBtn}
      btnFunction={handleSubmit(onSubmit)}
      submitState={submit}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={cn("profiltEditWrap")}>
        <textarea className={cn("textInput")} id="text" {...register("text")} placeholder={placeholder} />
      </form>
    </DropWrap>
  );
}
DropReason.defaultProps = {};
