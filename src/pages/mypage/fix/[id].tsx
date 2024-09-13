import Modal from "@/components/commons/Modal/TrashHow";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptFix } from "@/lib/apis/fix";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function AskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModal, openModal, closeModal] = useToggle(false);

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAcceptFix(id),
    onSuccess: (res) => {
      res && openModal();
    },
    onError: (error: any) => {
      return alert(error.response.data.message);
    },
  });

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <AdminPageBar />
      <AdminDetail state={"수정"} approve={handleAccept} />
      {isOpenModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.approveFix} />}
    </>
  );
}
