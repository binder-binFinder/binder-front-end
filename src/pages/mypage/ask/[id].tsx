import Modal from "@/components/commons/Modal/TrashHow";
import AddBinForm from "@/components/domains/addBin/addBinForm";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAccept } from "@/lib/apis/ask";
import { binDetail } from "@/lib/atoms/binAtom";
import { editStatus } from "@/lib/atoms/editAtom";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function AskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [askDetail] = useAtom(binDetail);
  const [isEdit, setIsEdit] = useAtom(editStatus);
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [isOpenErrorModal, openErrorModal, closeErrorModal] = useToggle(false);

  const handleCloseModal = () => {
    setIsEdit(false);
    router.back();
  };

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAccept(String(askDetail.registrationId)),
    onSuccess: () => {
      openModal();
    },
    onError: (error: any) => {
      if (error.status === 400) {
        openErrorModal();
      }
      return alert(error.response.data.message);
    },
  });

  console.log("askDetail", askDetail);
  return (
    <>
      <AdminPageBar />
      {isEdit ? (
        <AddBinForm
          isAdmin={true}
          binDetail={askDetail}
          toggleIsEdit={() => setIsEdit(false)}
        />
      ) : (
        <AdminDetail
          state={"등록"}
          binDetail={askDetail}
          approve={handleAccept}
          toggleIsEdit={() => setIsEdit(true)}
        />
      )}
      {isOpenModal && (
        <Modal
          modalClose={handleCloseModal}
          modalState={MODAL_CONTENTS.approveAdd}
        />
      )}
      {isOpenErrorModal && (
        <Modal
          modalClose={handleCloseModal}
          modalState={MODAL_CONTENTS.processingCompleted}
        />
      )}
    </>
  );
}
