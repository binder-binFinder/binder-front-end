import grayStar from "@/../public/images/icon-gray-star.svg";
import reportGray from "@/../public/images/report-gray.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { CardProps, Status } from "../CardList";
import styles from "./Card.module.scss";

const cn = classNames.bind(styles);

const STATUSTEXT: Record<Status, string> = {
  APPROVED: "승인",
  REJECTED: "거절",
  PENDING: "심사 중",
};

export default function Card({ ...item }: CardProps) {
  const statusText = STATUSTEXT[item.status as Status];

  const router = useRouter();
  const isReport = router.asPath === "/mypage/report";
  const completed =
    item.status === "REJECTED" ||
    (item.status === "APPROVED" && item.admin) ||
    item.isDeleted;

  const tagNames: { [key: string]: string } = {
    "/mypage": "등록",
    "/mypage/ask": "요청",
    "/mypage/fix": "수정",
    "/mypage/report": "신고",
  };

  const tagName = tagNames[router.asPath];

  const isAdminjudging = () => {
    return !item.isAdmin || item.status !== "REJECTED";
  };
  const binState = () => {
    switch (item.type) {
      case "GENERAL":
        return "일반 쓰레기통";
      case "RECYCLE":
        return "분리수거함";
      case "drink":
        return "음료 쓰레기통";
      case "cigarette":
        return "담배꽁초 수거함";
      default:
        return "일반 쓰레기통";
    }
  };

  return (
    <button className={cn("card-wrapper")} disabled={completed}>
      <Image
        src={"/images/icon-location-green-pin.svg"}
        alt="초록색 위치 표시 핀"
        width={16}
        height={19}
        layout="intrinsic"
        className={cn("")}
      />
      <div className={cn("card-text-box")}>
        <div className={cn("card-title-box")}>
          <h4 className={cn("card-title")}>{item.title}</h4>
          <p className={cn("card-createdAt")}>{item.createdAt?.slice(0, 10)}</p>
        </div>
        <p className={cn("card-address")}>{item.address}</p>
        <div className={cn("card-bottom")}>
          <div>
            <span className={cn("card-tag", "bin")}>{binState()}</span>

            {isAdminjudging() &&
              (item.admin && item.status === "PENDING" ? (
                <></>
              ) : (
                <span
                  className={
                    item.isDeleted
                      ? item.status === "REJECTED"
                        ? cn("card-tag", item.status)
                        : cn("card-tag", "DELETE")
                      : cn("card-tag", item.status)
                  }
                >
                  {item.isDeleted
                    ? item.status === "REJECTED"
                      ? `${tagName} ${statusText}`
                      : "삭제 됨"
                    : tagName
                      ? `${tagName} ${statusText}`
                      : statusText}
                </span>
              ))}
          </div>
          <div
            className={cn("card-likes", {
              mylike: item.bookmarkCount > 0,
              admin: item.isAdmin,
            })}
          >
            {item.admin && !isReport ? (
              <p>{item.nickname?.slice(0, 16)}</p>
            ) : (
              <>
                {isReport ? (
                  <Image
                    src={reportGray}
                    alt="좋아요"
                    width={15}
                    height={15}
                    objectFit="fit"
                    className={cn("isReport")}
                  />
                ) : (
                  <Image
                    src={grayStar}
                    alt="좋아요"
                    width={15}
                    height={15}
                    objectFit="fit"
                  />
                )}

                {item?.complaintCount ? (
                  <p>{item?.complaintCount}</p>
                ) : (
                  <p>{item.bookmarkCount}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
