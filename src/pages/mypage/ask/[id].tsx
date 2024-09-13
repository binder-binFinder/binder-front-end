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

export default function AskDetail() {
  // const router = useRouter();
  // const { id } = router.query;
  const [askDetail] = useAtom(binDetail);

  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [isOpenErrorModal, openErrorModal, closeErrorModal] = useToggle(false);

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
      <AdminDetail state={"등록"} binDetail={askDetail} approve={handleAccept} />
      {isOpenModal && <Modal modalClose={closeModal} modalState={MODAL_CONTENTS.approveAdd} />}
      {isOpenErrorModal && <Modal modalClose={closeErrorModal} modalState={MODAL_CONTENTS.processingCompleted} />}
    </>
  );
}
