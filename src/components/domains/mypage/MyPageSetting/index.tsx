import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import SettingItem from "./SettingItem";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/lib/apis/auth";
import { useRouter } from "next/router";
import DropCancle from "@/components/commons/DropBottom/DropCancle";
import { useState } from "react";

const cn = classNames.bind(styles);
export default function MyPageSetting() {
  const [drop, setDrop] = useState<boolean>(false);
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

  return (
    <div className={cn("findWrap")}>
      <div className={cn("settingWrap")}>
        <SettingItem name={"공유하기"} handleFn={() => {}} />
        <SettingItem name={"로그아웃"} handleFn={logout} />
        <SettingItem name={"탈퇴하기"} handleFn={handleDrop} />
      </div>
      {drop && <DropCancle handleDrop={handleDrop} />}
    </div>
  );
}
