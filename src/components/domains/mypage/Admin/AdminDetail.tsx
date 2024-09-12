import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./AdminDetail.module.scss";
import { getBinsId } from "@/lib/apis/bins";
import { btnInputValues } from "@/lib/constants/btnInputValues";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import AdminDetailItem from "./AdminDetailItem";

const cn = classNames.bind(styles);

interface Props {
  state: "등록" | "신고" | "수정";
  approve: () => void;
}

export default function DefaultForm({ state, approve }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data: binDetail } = useQuery({
    queryKey: ["binDetail", id],
    queryFn: () => getBinsId(id),
  });

  return (
    <>
      <article className={cn("detailWrap")}>
        <h3 className={cn("detailTitle")}>쓰레기통 {state} 심사</h3>
      </article>
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
        {binDetail?.imageUrl && binDetail?.imageUrl !== "string" && (
          <article className={cn("detail")}>
            <h4>
              쓰레기통 사진<span>(선택)</span>
            </h4>
            <Image src={binDetail?.imageUrl} alt="이미지" width={356} height={143} />
          </article>
        )}
        {state === "수정" && <AdminDetailItem title={"수정 요청 사유"} detail={"binDetail?.title"} />}
        <article className={cn("detailBtn")}>
          <button className={cn("detailReject")}>{state} 거절</button>
          <button className={cn("detailAccept")} onClick={approve}>
            {state} 승인
          </button>
        </article>
      </section>
    </>
  );
}
