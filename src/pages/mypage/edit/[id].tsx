import AddBinForm from "@/components/domains/addBin/addBinForm";
import { getBinsId } from "@/lib/apis/bins";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EditBinsPage() {
  const { query } = useRouter();

  const { data: binDetailData } = useQuery({
    queryKey: ["get-bin-detail", query?.id],
    queryFn: () => getBinsId(query.id),
  });

  return <AddBinForm binDetail={binDetailData} />;
}
