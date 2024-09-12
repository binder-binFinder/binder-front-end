import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropReason.module.scss";
import Image from "next/image";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEdit from "@/../public/images/profileEdit.svg";
import { postRejectAddbin } from "@/lib/apis/postRejectAddbin";
import { useMutation } from "@tanstack/react-query";

const cn = classNames.bind(styles);

interface IFormInput {
  text: string;
}

interface Props {
  title: string;
  placeholder: string;
  onHandleSubmit: (data: string) => void;
  binId: string | string[] | undefined;
}
export default function DropReason({ title, placeholder, binId, onHandleSubmit }: Props) {
  const [submit, setSubmit] = useState<boolean>(false);

  const { mutate: rejectMutate } = useMutation({
    mutationKey: ["rejectAddBin", binId],
    mutationFn: (data: string) => postRejectAddbin(binId, data),
    onSuccess: () => {},
  });

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onHandleSubmit(data.text);
    rejectMutate(data.text);
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
      closeBtn={() => {}}
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
