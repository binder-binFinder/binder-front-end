import Image from "next/image";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { CardProps } from "../CardList";
import { useState } from "react";

const cn = classNames.bind(styles);

const STATUSTEXT = {
  approve: "승인",
  reject: "거절",
  judge: "검토 중",
};

export default function Card({ ...item }: CardProps) {
  //데이터 받아올 때 다시 처리해야 할 듯...?
  const [isLike, setIsLike] = useState(item.likes?.mylike);
  const [likeCounter, setLikeCounter] = useState(item.likes?.count);

  const completed = item.isAdmin && item.status !== "judge";

  const isAdminjudging = () => {
    return !item.isAdmin || item.status !== "judge";
  };

  const handleLikeUpdate = () => {
    setLikeCounter((prevCount) =>
      typeof prevCount === "number" ? (isLike ? prevCount - 1 : prevCount + 1) : prevCount
    );
  };

  const handleClick = (id: number) => {
    if (item.isAdmin) {
      //페이지 이동시키기
      return console.log(id);
    } else {
      setIsLike((prev) => !prev);
      handleLikeUpdate();
    }
  };

  return (
    <button className={cn("card-wrapper")} onClick={() => handleClick(item.id)} disabled={completed}>
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
          <h4 className={cn("card-title")}>{item.name}</h4>
          {isAdminjudging() && <span className={cn("card-tag", item.status)}>{STATUSTEXT[item.status]}</span>}
        </div>
        <p className={cn("card-address")}>{item.address}</p>
        <div className={cn("card-likes", { mylike: isLike, admin: item.isAdmin })}>
          {item.isAdmin ? (
            <p>{item.admin}</p>
          ) : (
            <>
              <Image src={"/images/icon-gray-star.svg"} alt="좋아요" width={15} height={15} objectFit="fit" />
              <p>{likeCounter}</p>
            </>
          )}
        </div>
        <p className={cn("card-createdAt")}>{item.createdAt}</p>
      </div>
    </button>
  );
}
