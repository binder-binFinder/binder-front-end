import { getBinsId } from "@/lib/apis/bins";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { SetStateAction, useRef, useState } from "react";
import styles from "./RecommendCard.module.scss";

const cn = classNames.bind(styles);

interface Props {
  binDataId: string;
  distance: number;
  isCardHidden: boolean;
  setIsCardHidden: (value: SetStateAction<boolean>) => void;
}

export default function RecommendCard({
  binDataId,
  distance,
  isCardHidden,
  setIsCardHidden,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const { data: binDetailData, isLoading } = useQuery({
    queryKey: ["bindetail", binDataId],
    queryFn: () => getBinsId(binDataId),
    enabled: !!binDataId,
  });

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (cardRef.current) {
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - startY;

      if (deltaY > 0) {
        setCurrentY(deltaY);
        cardRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    }
  };

  const handleDragEnd = () => {
    if (currentY > 100) {
      setIsCardHidden(true);
    } else {
      if (cardRef.current) {
        cardRef.current.style.transform = `translateY(0)`;
      }
    }
    setCurrentY(0);
  };

  if (isLoading || !binDetailData) {
    return null;
  }

  return (
    <div
      ref={cardRef}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      className={cn("card-wrapper", { hidden: isCardHidden })}
    >
      <div className={cn("text-box")}>
        <span className={cn("recommend")}>추천</span>
        <p className={cn("card-title")}>
          {binDetailData.title}
          <span></span>
        </p>
        <div className={cn("address-box")}>
          <Image
            alt="위치 표시 핀"
            src={"/images/icon-location-green-pin.svg"}
            width={14}
            height={17}
          />
          <p>{binDetailData.address}</p>
        </div>
        <div className={cn("likes-box")}>
          <Image
            src={"/images/icon-gray-star.svg"}
            className={cn("star")}
            alt="즐겨찾기 갯수"
            width={14}
            height={14}
          />
          <p>{binDetailData.bookmarkCount}</p>
          <Image
            src={"/images/thumb-up.svg"}
            alt="좋아요 갯수"
            width={17}
            height={14}
          />
          <p>{binDetailData.likeCount}</p>
          <Image
            src={"/images/thumb-down.svg"}
            alt="싫어요 갯수"
            width={17}
            height={14}
          />
          <p>{binDetailData.dislikeCount}</p>
        </div>
      </div>
      <div className={cn("img-box")}>
        {binDetailData.imageUrl && (
          <Image
            src={binDetailData.imageUrl}
            alt="쓰레기통 이미지"
            width={115}
            height={95}
          />
        )}
        <p className={cn("img-box-text")}>
          <Image
            src={"/images/icon-location-green-pin.svg"}
            alt="위치 표시 핀"
            width={11}
            height={14}
          />
          {Math.floor(distance) + "m"}
        </p>
      </div>
    </div>
  );
}
