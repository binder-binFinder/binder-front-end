import arrowGary from "@/../public/images/arrowGray.svg";
import Card from "@/components/commons/Card";
import AdminFilter from "@/components/commons/DropBottom/AdminFilter";
import { getAdminBins } from "@/lib/apis/ask";
import { getAdminBinsFix } from "@/lib/apis/fix";
import { getAdminBinsReport } from "@/lib/apis/report";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./AdminPageItem.module.scss";
import { useAtom } from "jotai";
import { BinDetail, binDetail } from "@/lib/atoms/binAtom";

const cn = classNames.bind(styles);

interface AdminProps {
  title: string;
}
export default function AdminPageItem({ title }: AdminProps) {
  const [drop, setDrop] = useState<boolean>(false);
  const [, setBinDetail] = useAtom(binDetail);

  const router = useRouter();
  const filter = router.query.filter || "전체";
  const binData = (() => {
    switch (router.pathname) {
      case "/mypage/ask":
        const { data: ask } = useQuery({
          queryKey: ["ask", filter],
          queryFn: () => getAdminBins(filter),
        });
        const askCount = ask?.pendingCount;
        return [askCount, ask?.binRegistrationDetails]; // 데이터를 반환
      case "/mypage/fix":
        const { data: fix } = useQuery({
          queryKey: ["fix", filter],
          queryFn: () => getAdminBinsFix(filter),
        });
        const fixCount = fix?.pendingCount;
        return [fixCount, fix?.binModificationDetails]; // 데이터를 반환

      default:
        const { data: report } = useQuery({
          queryKey: ["report", filter],
          queryFn: () => getAdminBinsReport(filter),
        });
        const reportCount = report?.pendingCount;
        return [reportCount, report?.binComplaintDetails]; // 기본 데이터를 반환
    }
  })();

  const handleClickCard = (item: BinDetail, id: string | number) => {
    if (id === item.binId) {
      setBinDetail(item);
      router.push(router.route + "/" + id);
      //이렇게 할 경우 url 직접 입력시 빈값
    }
  };

  const handleDrop = () => {
    setDrop((prev) => !prev);
  };

  return (
    <>
      <div className={cn("adminWrap")}>
        <div className={cn("adminTitleWrap")}>
          <div className={cn("adminTitle")}>
            <div className={cn("adminTitleText")}>{title}</div>
            <div className={cn("adminTitleTag")}>{binData[0]}건</div>
          </div>
          <div className={cn("adminDrop")} onClick={handleDrop}>
            {filter}
            <Image src={arrowGary} alt="드롭다운" width={10} height={10} />
          </div>
        </div>

        <div className={cn("adminCardList")}>
          {binData[1]?.map((item: any) => (
            <div onClick={() => handleClickCard(item, item.binId)} key={item.id}>
              <Card
                binId={item.binId}
                title={item.title}
                address={item.address}
                type={item.type}
                status={item.status}
                createdAt={item.createdAt}
                nickname={item.nickname}
                bookmarkCount={0}
                admin={true}
                complaintCount={item?.complaintCount}
              />
            </div>
          ))}
        </div>
      </div>

      {drop && <AdminFilter closeModal={handleDrop} pageFilter={filter} />}
    </>
  );
}
function askPageContext() {
  throw new Error("Function not implemented.");
}
