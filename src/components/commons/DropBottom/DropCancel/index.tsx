import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropCancel.module.scss";
import { useMutation } from "@tanstack/react-query";
import { deleteMembers } from "@/lib/apis/members";
import inputX from "@/../public/images/inputX.svg";
import Image from "next/image";

const cn = classNames.bind(styles);

interface DropCancelProps {
  handleDrop: () => void;
  setDeleteModal: any;
}
interface IFormInput {
  cancel: string;
}

export default function DropCancel({
  handleDrop,
  setDeleteModal,
}: DropCancelProps) {
  const [cancelStats, setCancelState] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [btnBool, setBtnBoolean] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    cancelMember(data.cancel);
  };

  const { mutate: cancelMember } = useMutation({
    mutationFn: (data: string) => deleteMembers(data),
    onSuccess: () => {
      console.log("성공");
      handleDrop();
      setDeleteModal(true);
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

  const handleInputX = () => {
    setInputValue("");
  };
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
          정말 탈퇴를 원하시면 {`"`}탈퇴하기{`"`}를 입력해 주세요.
        </div>
        <div className={cn("inputWrap")}>
          <input
            className={cn(
              "cancelTextInput",
              cancelStats && `cancelTextInput${cancelStats}`
            )}
            type="text"
            value={inputValue}
            placeholder="탈퇴하기"
            maxLength={10}
            {...register("cancel", {
              onChange: (e) => {
                setInputValue(e.target.value);
              },
            })}
          />
          <div className={cn("inputX")} onClick={handleInputX}>
            <Image src={inputX} alt="인풋 비우기" fill sizes="17px" />
          </div>
        </div>
      </form>
    </DropWrap>
  );
}
