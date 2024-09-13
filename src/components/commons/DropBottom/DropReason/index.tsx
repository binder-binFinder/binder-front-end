import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropReason.module.scss";
import { postRejectAddbin } from "@/lib/apis/postRejectAddbin";
import { useMutation } from "@tanstack/react-query";
import { postRejectFixbin } from "@/lib/apis/postRejectAskbin";


const cn = classNames.bind(styles);

interface IFormInput {
  text: string;
}

interface Props {
  title: string;
  placeholder: string;
  onHandleSubmit: (data: string) => void;
  binId: string | string[] | undefined;
  state: "수정" | "등록" | "신고" | undefined;
  closeBtn: () => void;
}
export default function DropReason({ title, placeholder, binId, onHandleSubmit, closeBtn, state }: Props) {
  const [submit, setSubmit] = useState<boolean>(false);

  const { mutate: rejectAskMutate } = useMutation({
    mutationKey: ["rejectAddBin", binId],
    mutationFn: (data: string) => postRejectAddbin(binId, data),
    onSuccess: () => {},
  });

  const { mutate: rejectFixMutate } = useMutation({
    mutationKey: ["rejectFixBin", binId],
    mutationFn: (data: string) => postRejectFixbin(binId, data),
  });

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onHandleSubmit(data.text);

    switch (state) {
      case "수정":
        return rejectFixMutate(data.text);
      case "등록":
        return rejectAskMutate(data.text);
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
