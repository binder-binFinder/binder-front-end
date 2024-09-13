import NavTitle from "@/components/commons/NavTitle";
import AddBinForm from "@/components/domains/addBin/addBinForm";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import { getBinsId } from "@/lib/apis/bins";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useToggle } from "usehooks-ts";

export default function EditPage() {
  const [isEdit, toggleIsEdit] = useToggle(false);
  const router = useRouter();
  const { id } = router.query;

  const { data: binDetail } = useQuery({
    queryKey: ["binDetail", id],
    queryFn: () => getBinsId(id),
  });

  return (
    <>
      <NavTitle>내가 발견한 쓰레기통</NavTitle>
      {isEdit ? (
        <AddBinForm binDetail={binDetail} toggleIsEdit={toggleIsEdit} />
      ) : (
        <AdminDetail state="정보" binDetail={binDetail} approve={toggleIsEdit} toggleIsEdit={toggleIsEdit} />
      )}
    </>
  );
}
