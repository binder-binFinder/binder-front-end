import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptReport } from "@/lib/apis/report";
import { binDetail } from "@/lib/atoms/binAtom";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function ReportDetail() {
  const [reportDetail] = useAtom(binDetail);

  const { mutate: reportMutate } = useMutation({
    mutationFn: () => postAcceptReport(String(reportDetail.complaintId)),
    onSuccess: () => {},
  });

  return (
    <>
      <AdminPageBar />
      <AdminDetail binDetail={reportDetail} state={"신고"} approve={reportMutate} />
    </>
  );
}
