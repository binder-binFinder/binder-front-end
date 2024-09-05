import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import SettingItem from "./SettingItem";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/lib/apis/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import DropCancel from "@/components/commons/DropBottom/DropCancel";
import Share from "@/components/commons/Modal/Share";
import Modal from "@/components/commons/Modal/TrashHow";

const cn = classNames.bind(styles);
export default function MyPageSetting() {
  const [drop, setDrop] = useState<boolean>(false);
  const [dropShare, setDropShare] = useState<boolean>(false);
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleDrop = () => {
    setDrop((prev) => !prev);
  };
  const handleDropShare = () => {
    setDropShare((prev) => !prev);
  };

  return (
    <div className={cn("findWrap")}>
      <div className={cn("settingWrap")}>
        <SettingItem name={"공유하기"} handleFn={handleDropShare} />
        <SettingItem name={"로그아웃"} handleFn={logout} />
        <SettingItem name={"탈퇴하기"} handleFn={handleDrop} />
      </div>
      {drop && <DropCancel handleDrop={handleDrop} />}
      {dropShare && <Share modalClose={handleDropShare} />}
    </div>
  );
}
