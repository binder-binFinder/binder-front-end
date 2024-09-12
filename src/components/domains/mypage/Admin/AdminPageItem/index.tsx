import arrowGary from "@/../public/images/arrowGray.svg";
import Card from "@/components/commons/Card";
import AdminFilter from "@/components/commons/DropBottom/AdminFilter";
import { usePageContext } from "@/pages/mypage/ask";
import { useFixPageContext } from "@/pages/mypage/fix";
import { useReportPageContext } from "@/pages/mypage/report";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./AdminPageItem.module.scss";

const cn = classNames.bind(styles);

interface AdminProps {
  title: string;
}
export default function AdminPageItem({ title }: AdminProps) {
  const [drop, setDrop] = useState<boolean>(false);
  const [pageFilter, setPageFilter] = useState<string>("전체");

  const router = useRouter();
  const binData = (() => {
    switch (router.pathname) {
      case "/mypage/ask":
        const ask = usePageContext();
        const askCount = ask.queries[0].state.data.pendingCount;
        return [askCount, ask.queries[0].state.data.binRegistrationDetails]; // 데이터를 반환

      case "/mypage/fix":
        const fix = useFixPageContext();
        const fixCount = fix.queries[0].state.data.pendingCount;
        return [fixCount, fix.queries[0].state.data.binModificationDetails]; // 데이터를 반환

      default:
        const report = useReportPageContext();
        const reportCount = report.queries[0].state.data.pendingCount;
        return [reportCount, report.queries[0].state.data.binComplaintDetails]; // 기본 데이터를 반환
    }
  })();

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
            {pageFilter}
            <Image src={arrowGary} alt="드롭다운" width={10} height={10} />
          </div>
        </div>

        <div className={cn("adminCardList")}>
          {binData[1].map((item: any, index: number) => (
            <div
              onClick={() => {
                router.push(router.route + "/" + item.binId);
              }}
              key={index}
            >
              <Card
                id={item.binId}
                title={item.title}
                address={item.address}
                type={item.type}
                status={item.status}
                createdAt={item.createdAt}
                nickname={item.nickname}
                bookmarkCount={0}
                admin={true}
              />
            </div>
          ))}
        </div>
      </div>

      {drop && (
        <AdminFilter
          closeModal={handleDrop}
          setPageFilter={setPageFilter}
          pageFilter={pageFilter}
        />
      )}
    </>
  );
}
function askPageContext() {
  throw new Error("Function not implemented.");
}
