import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropCancle.module.scss";
import { useMutation } from "@tanstack/react-query";
import { patchMembers } from "@/lib/apis/members";

const cn = classNames.bind(styles);

interface DropCancleProps {
  handleDrop: () => void;
}

export default function DropCancle({ handleDrop }: DropCancleProps) {
  return (
    <DropWrap
      title="탈퇴하기"
      btn="탈퇴하기"
      closeBtn={handleDrop}
      btnFunction={() => {}}
      submitState={true}
    >
      <form>
        <div>정말 탈퇴를 원하시면 "탈퇴하기"를 입력해 주세요.</div>
      </form>
    </DropWrap>
  );
}
