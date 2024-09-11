import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import AdminPageBar from "@/components/domains/mypage/Admin/AdminPageBar";
import { postAcceptFix } from "@/lib/apis/fix";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function AskDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => postAcceptFix(id),
    onSuccess: () => {
      router.push(`/mypage/ask`);
    },
  });

  return (
    <>
      <AdminPageBar />
      <AdminDetail state={"등록"} approve={handleAccept} />
    </>
  );
}
