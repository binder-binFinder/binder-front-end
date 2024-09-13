import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropReason.module.scss";
import { useMutation } from "@tanstack/react-query";
import { postRejectAccept } from "@/lib/apis/ask";
import { postRejectFix } from "@/lib/apis/fix";

const cn = classNames.bind(styles);

interface IFormInput {
  text: string;
}

interface Props {
  title: string;
  placeholder: string;
  onHandleSubmit: (data: string) => void;
  id: number | string;
  state: "수정" | "등록" | "신고" | "정보";
  closeBtn: () => void;
}
export default function DropReason({ title, placeholder, id, onHandleSubmit, closeBtn, state }: Props) {
  const [submit, setSubmit] = useState<boolean>(false);

  const { mutate: rejectAskMutate } = useMutation({
    mutationKey: ["rejectAddBin", id],
    mutationFn: (data: string) => postRejectAccept(String(id), data),
    onSuccess: () => {},
  });

  const { mutate: rejectFixMutate } = useMutation({
    mutationKey: ["rejectFixBin", id],
    mutationFn: (data: string) => postRejectFix(String(id), data),
  });

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    switch (state) {
      case "수정":
        return onHandleSubmit(data.text), rejectFixMutate(data.text);
      case "등록":
        return onHandleSubmit(data.text), rejectAskMutate(data.text);
      case "정보":
        return onHandleSubmit(data.text);
      case "신고":
        return onHandleSubmit(data.text);
      default:
        console.log("Unknown state:", state);
    }

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
      title={title + "사유 입력"}
      btn="등록"
      closeBtn={closeBtn}
      btnFunction={handleSubmit(onSubmit)}
      submitState={submit}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={cn("profiltEditWrap")}>
        <textarea
          className={cn("textInput")}
          id="text"
          {...register("text")}
          placeholder={placeholder + "사유를 입력하세요"}
        />
      </form>
    </DropWrap>
  );
}
DropReason.defaultProps = {};
