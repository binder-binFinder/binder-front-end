import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptReport } from "@/lib/apis/report";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function AskDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { mutate: handleReport } = useMutation({
    mutationFn: () => postAcceptReport(id),
    onSuccess: () => {
      router.push(`/mypage/ask`);
    },
  });

  return (
    <>
      <AdminPageBar />
      <AdminDetail state={"신고"} approve={handleReport} />
    </>
  );
}
