import classNames from "classnames/bind";
import styles from "./MyPageToggle.module.scss";
import SettingItem from "./SettingItem";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/lib/apis/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DropCancel from "@/components/commons/DropBottom/DropCancel";
import Share from "@/components/commons/Modal/Share";
import { useAtom } from "jotai";
import { loginState } from "@/lib/atoms/userAtom";
import ShareNoti from "@/components/commons/Modal/Share/ShareNoti";
import DeleteMemberModal from "@/components/commons/Modal/DeleteMember";

const cn = classNames.bind(styles);
export default function MyPageSetting() {
  const [drop, setDrop] = useState<boolean>(false);
  const [dropShare, setDropShare] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loginStates, setLoginState] = useAtom(loginState);

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
  const socialLogin = () => {
    setLoginState(false);
    router.push("/signin");
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
    router.push("/");
  };

  useEffect(() => {
    if (share) {
      setTimeout(() => {
        setShare(false);
      }, 3000);
    }
  }, [share]);

  return (
    <div className={cn("findWrap")}>
      <div className={cn("settingWrap")}>
        <SettingItem name={"공유하기"} handleFn={handleDropShare} />
        {loginStates ? (
          <>
            <SettingItem name={"로그아웃"} handleFn={logout} />
            <SettingItem name={"탈퇴하기"} handleFn={handleDrop} />
          </>
        ) : (
          <SettingItem name={"소셜 로그인"} handleFn={socialLogin} />
        )}
      </div>
      {drop && (
        <DropCancel handleDrop={handleDrop} setDeleteModal={setDeleteModal} />
      )}
      {dropShare && <Share modalClose={handleDropShare} setShare={setShare} />}
      {share && <ShareNoti />}
      {deleteModal && <DeleteMemberModal modalClose={deleteModalClose} />}
    </div>
  );
}
