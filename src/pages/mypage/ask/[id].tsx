import Modal from "@/components/commons/Modal/TrashHow";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAccept } from "@/lib/apis/ask";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAccept(id),
    onSuccess: () => {
      setIsOpenModal(true);
    },
  });

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <AdminPageBar />
      <AdminDetail state={"등록"} approve={handleAccept} />
      {isOpenModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.approveAdd} />}
    </>
  );
}
