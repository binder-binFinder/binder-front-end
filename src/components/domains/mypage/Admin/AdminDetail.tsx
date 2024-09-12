import classNames from "classnames/bind";

import Image from "next/image";
import styles from "./AdminDetail.module.scss";

import { getBinsId } from "@/lib/apis/bins";
import { btnInputValues } from "@/lib/constants/btnInputValues";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import AdminDetailItem from "./AdminDetailItem";

const cn = classNames.bind(styles);

export default function DefaultForm({ state, approve }: any) {
  const router = useRouter();
  const { id } = router.query;
  const { data: binDetail } = useQuery({
    queryKey: ["binDetail", id],
    queryFn: () => getBinsId(id),
  });
  console.log(state);
  return (
    <>
      <div className={cn("detailWrap")}>
        <div className={cn("detailTitle")}>쓰레기통 {state} 심사</div>
      </div>
      <div className={cn("detailInner")}>
        <AdminDetailItem title={"쓰레기통 주소"} detail={binDetail?.address} />

        <div className={cn("detail")}>
          <div>쓰레기통 분류</div>
          <div className={cn("detailSelect")}>
            {btnInputValues.map((item, index) => (
              <div
                key={index}
                className={
                  binDetail?.type === item.id
                    ? cn("detailSelectItemOn")
                    : cn("detailSelectItem")
                }
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <AdminDetailItem title={"장소 명칭"} detail={binDetail?.title} />
        {binDetail?.imageUrl && binDetail?.imageUrl !== "string" && (
          <div className={cn("detail")}>
            <div>
              쓰레기통 사진<span>(선택)</span>
            </div>
            <Image
              src={binDetail?.imageUrl}
              alt="이미지"
              width={356}
              height={143}
            />
          </div>
        )}
        {state === "수정" && (
          <AdminDetailItem
            title={"수정 요청 사유"}
            detail={"binDetail?.title"}
          />
        )}
        <div className={cn("detailBtn")}>
          <div
            className={
              state === "신고" ? cn("detailRejectReport") : cn("detailReject")
            }
          >
            등록 거절
          </div>
          <div
            className={
              state === "신고" ? cn("detailAcceptReport") : cn("detailAccept")
            }
            onClick={approve}
          >
            등록 승인
          </div>
        </div>
      </div>
    </>
  );
}
