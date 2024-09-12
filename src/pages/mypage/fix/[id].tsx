import Modal from "@/components/commons/Modal/TrashHow";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptFix } from "@/lib/apis/fix";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModal, setIsOpenModal] = useState(true);

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAcceptFix(id),
    onSuccess: () => {
      router.push(`/mypage/ask`);
    },
  });

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <AdminPageBar />
      <AdminDetail state={"수정"} approve={handleAccept} />
      {isOpenModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.approveAdd} />}
    </>
  );
}
