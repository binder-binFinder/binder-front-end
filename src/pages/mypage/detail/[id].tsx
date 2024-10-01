import NavTitle from "@/components/commons/NavTitle";
import AddBinForm from "@/components/domains/addBin/addBinForm";
import AdminDetail from "@/components/domains/mypage/Admin/AdminDetail";
import { getBinsId } from "@/lib/apis/bins";
import { editStatus } from "@/lib/atoms/editAtom";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function EditPage() {
  const [isEdit, setIsEdit] = useAtom(editStatus);
  const router = useRouter();
  const { id } = router.query;

  const { data: binDetail } = useQuery({
    queryKey: ["binDetail", id],
    queryFn: () => getBinsId(id),
  });

  const handleClickToggleIsEdit = () => {
    return setIsEdit((prev) => !prev);
  };

  return (
    <>
      <NavTitle>내가 발견한 쓰레기통</NavTitle>
      {isEdit ? (
        <AddBinForm
          binDetail={binDetail}
          toggleIsEdit={handleClickToggleIsEdit}
        />
      ) : (
        <AdminDetail
          state="정보"
          binDetail={binDetail}
          approve={handleClickToggleIsEdit}
        />
      )}
    </>
  );
}
