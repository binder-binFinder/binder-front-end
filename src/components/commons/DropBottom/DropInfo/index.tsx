import DropWrap from "..";
import classNames from "classnames/bind";
import styles from "./DropInfo.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getReportReason } from "@/lib/apis/report";
import { getBinsId } from "@/lib/apis/bins";
import { reportReasonValues } from "@/lib/constants/reportReasonValues";
import AdminDetailItem from "@/components/domains/mypage/Admin/AdminDetailItem";
import NoneImgInput from "@/components/domains/addBin/addBinForm/NoneImgInput";
import Image from "next/image";
import { btnInputValues } from "@/lib/constants/btnInputValues";

const cn = classNames.bind(styles);

interface Props {
  title: string;
  state: "신고" | "수정" | "정보" | "등록";
  id: number | string;
  closeBtn: () => void;
}

interface ReportReason {
  type: keyof typeof reportReasonValues;
  count: number;
}

export default function DropInfo({ title, closeBtn, state, id }: Props) {
  const { data: reportReason, isLoading: isReasonLoading } = useQuery({
    queryKey: ["report-reason", id],
    queryFn: () => getReportReason(id),
    enabled: state === "신고",
  });

  const { data: binDetail, isLoading: isbinLoading } = useQuery({
    queryKey: ["binDetail", id],
    queryFn: () => getBinsId(id),
    enabled: state === "수정",
  });

  if (isReasonLoading || isbinLoading) {
    return <div>loading</div>;
  }

  const mergedReportReason = Object.keys(reportReasonValues).map((key) => {
    const found = reportReason?.counts?.find((item: ReportReason) => item.type === key);
    return {
      type: key as keyof typeof reportReasonValues,
      count: found ? found.count : 0,
    };
  });

  return (
    <DropWrap title={title} btn={"none"} closeBtn={closeBtn}>
      {state === "신고" ? (
        <ul className={cn("reasons")}>
          {mergedReportReason.map((item: ReportReason) => (
            <li key={item.type} className={cn("text-wrapper")}>
              <p className={cn("text")}>{reportReasonValues[item.type]}</p>
              <span className={cn("tag", { none: item.count === 0 })}>
                {reportReasonValues[item.type] && `${item.count}건`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <section className={cn("detailInner")}>
          <AdminDetailItem title={"쓰레기통 주소"} detail={binDetail?.address} />
          <article className={cn("detail")}>
            <h4>쓰레기통 분류</h4>
            <div className={cn("detailSelect")}>
              {btnInputValues.map((item, index) => (
                <div
                  key={index}
                  className={binDetail?.type === item.id ? cn("detailSelectItemOn") : cn("detailSelectItem")}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </article>
          <AdminDetailItem title={"장소 명칭"} detail={binDetail?.title} />
          <article className={cn("detail")}>
            <h4>
              쓰레기통 사진<span>(선택)</span>
            </h4>
            {binDetail.imageUrl ? (
              <Image src={binDetail.imageUrl} alt="이미지" width={356} height={143} />
            ) : (
              <NoneImgInput disabled={true} />
            )}
          </article>
        </section>
      )}
    </DropWrap>
  );
}
