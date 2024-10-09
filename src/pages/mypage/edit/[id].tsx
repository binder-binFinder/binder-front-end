import AddBinForm from "@/components/domains/addBin/addBinForm";
import { getBinsId } from "@/lib/apis/bins";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EditBinsPage() {
  const router = useRouter();

  const { data: binDetailData } = useQuery({
    queryKey: ["get-bin-detail", router.query?.id],
    queryFn: () => getBinsId(router.query.id),
  });

  return <AddBinForm binDetail={binDetailData} toggleIsEdit={router.back} />;
}
