import Modal from "@/components/commons/Modal/TrashHow";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptFix } from "@/lib/apis/fix";
import { binDetail } from "@/lib/atoms/binAtom";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function FixDetail() {
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [fixDetail] = useAtom(binDetail);
  const [isOpenErrorModal, openErrorModal, closeErrorModal] = useToggle(false);
  const router = useRouter();

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAcceptFix(fixDetail.modificationId),
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

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <>
      <AdminPageBar />
      <AdminDetail state={"수정"} approve={handleAccept} binDetail={fixDetail} />
      {isOpenModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.approveFix} />}
      {isOpenErrorModal && <Modal modalClose={handleCloseModal} modalState={MODAL_CONTENTS.processingCompleted} />}
    </>
  );
}
