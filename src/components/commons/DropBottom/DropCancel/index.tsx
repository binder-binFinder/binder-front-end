import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropCancel.module.scss";
import { useMutation } from "@tanstack/react-query";
import { deleteMembers } from "@/lib/apis/members";

const cn = classNames.bind(styles);

interface DropCancelProps {
  handleDrop: () => void;
}
interface IFormInput {
  cancel: string;
}

export default function DropCancel({ handleDrop }: DropCancelProps) {
  const [cancelStats, setCancelState] = useState<string>("");
  const [btnBool, setBtnBoolean] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    cancelMember(data.cancel);
  };

  const { mutate: cancelMember } = useMutation({
    mutationFn: (data: string) => deleteMembers(data),
    onSuccess: () => {
      console.log("성공");
      handleDrop();
    },
  });

  const cancel = useWatch({
    control,
    name: "cancel",
    defaultValue: "",
  });
  useEffect(() => {
    if (cancel === "탈퇴하기") {
      setCancelState("Green");
      setBtnBoolean(true);
    } else if (cancel === "") {
      setCancelState("");
      setBtnBoolean(false);
    } else {
      setCancelState("Red");
      setBtnBoolean(false);
    }
  }, [cancel]);
  return (
    <DropWrap
      title="탈퇴하기"
      btn="탈퇴하기"
      closeBtn={handleDrop}
      btnFunction={handleSubmit(onSubmit)}
      submitState={btnBool}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={cn(
            "cancelText",
            cancelStats && `cancelText${cancelStats}`
          )}
        >
          정말 탈퇴를 원하시면 "탈퇴하기"를 입력해 주세요.
        </div>
        <input
          className={cn(
            "cancelTextInput",
            cancelStats && `cancelTextInput${cancelStats}`
          )}
          type="text"
          placeholder="탈퇴하기"
          {...register("cancel")}
        />
      </form>
    </DropWrap>
  );
}
