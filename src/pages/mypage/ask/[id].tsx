import Modal from "@/components/commons/Modal/TrashHow";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAccept } from "@/lib/apis/ask";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useToggle } from "@/lib/hooks/useToggle";
import { useAtom } from "jotai";
import { binDetail } from "@/lib/atoms/binAtom";
import AddBinForm from "@/components/domains/addBin/addBinForm";
import { useState } from "react";

export default function AskDetail() {
  const router = useRouter();
  // const { id } = router.query;
  const [askDetail] = useAtom(binDetail);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [isOpenErrorModal, openErrorModal, closeErrorModal] = useToggle(false);

  const handleCloseModal = () => {
    router.back();
  };

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAccept(String(askDetail.binId)),
    onSuccess: () => {
      openModal();
    },
    onError: (error: any) => {
      if (error.status === 400) {
        openErrorModal();
      }
      console.log("err", error.status);
    },
  });

  return (
    <>
      <AdminPageBar />
      {isEdit ? (
        <AddBinForm isAdmin={true} binDetail={askDetail} toggleIsEdit={() => setIsEdit(false)} />
      ) : (
        <AdminDetail state={"등록"} binDetail={askDetail} approve={handleAccept} toggleIsEdit={() => setIsEdit(true)} />
      )}
      {isOpenModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.approveAdd} />}
      {isOpenErrorModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.processingCompleted} />}
    </>
  );
}
