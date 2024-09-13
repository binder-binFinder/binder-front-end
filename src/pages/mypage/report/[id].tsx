import Modal from "@/components/commons/Modal/TrashHow";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptReport } from "@/lib/apis/report";
import { binDetail } from "@/lib/atoms/binAtom";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

export default function ReportDetail() {
  const [reportDetail] = useAtom(binDetail);
  const [isOpenErrorModal, openErrorModal, closeErrorModal] = useToggle(false);

  const { mutate: reportMutate } = useMutation({
    mutationFn: () => postAcceptReport(String(reportDetail.complaintId)),
    onSuccess: () => {},
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
      <AdminDetail binDetail={reportDetail} state={"신고"} approve={reportMutate} />
      {isOpenErrorModal && <Modal modalClose={closeErrorModal} modalState={MODAL_CONTENTS.processingCompleted} />}
    </>
  );
}
