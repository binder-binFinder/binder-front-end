import Image from "next/image";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { CardProps, Status } from "../CardList";

const cn = classNames.bind(styles);

const STATUSTEXT: Record<Status, string> = {
  APPROVED: "승인",
  REJECTED: "거절",
  PENDING: "검토 중",
};

export default function Card({ ...item }: CardProps) {
  const statusText = STATUSTEXT[item.status as Status];

  const completed = item.isAdmin && item.status !== "judge";

  const isAdminjudging = () => {
    return !item.isAdmin || item.status !== "judge";
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
  // const handleLikeUpdate = () => {
  //   setLikeCounter((prevCount) =>
  //     typeof prevCount === "number"
  //       ? isLike
  //         ? prevCount - 1
  //         : prevCount + 1
  //       : prevCount
  //   );
  // };

  const handleClick = (id: number) => {
    if (item.isAdmin) {
      //페이지 이동시키기
      return console.log(id);
    } else {
      // setIsLike((prev) => !prev);
      // handleLikeUpdate();
    }
  };

  return (
    <button
      className={cn("card-wrapper")}
      onClick={() => handleClick(item.id)}
      disabled={completed}
    >
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
          <p className={cn("card-createdAt")}>{item.createdAt.slice(0, 10)}</p>
        </div>
        <p className={cn("card-address")}>{item.address}</p>
        <div className={cn("card-bottom")}>
          <div>
            <span className={cn("card-tag", "bin")}>{binState()}</span>

            {isAdminjudging() && (
              <span className={cn("card-tag", item.status)}>{statusText}</span>
            )}
          </div>
          <div
            className={cn("card-likes", {
              mylike: item.bookmarkCount > 0,
              admin: item.isAdmin,
            })}
          >
            {item.isAdmin ? (
              <p>{item.admin}</p>
            ) : (
              <>
                <Image
                  src={"/images/icon-gray-star.svg"}
                  alt="좋아요"
                  width={15}
                  height={15}
                  objectFit="fit"
                />
                <p>{item.bookmarkCount}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
