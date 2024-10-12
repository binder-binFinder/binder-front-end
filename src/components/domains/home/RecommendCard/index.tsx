import { getBinsId } from "@/lib/apis/bins";
import { useDrag } from "@/lib/hooks/useDrag";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { SetStateAction } from "react";
import styles from "./RecommendCard.module.scss";

const cn = classNames.bind(styles);

interface Props {
  binDataId: string;
  distance: number;
  isCardHidden: boolean;
  setIsCardHidden: (value: SetStateAction<boolean>) => void;
  handleClickMarker: (id: number) => void;
}

export default function RecommendCard({
  binDataId,
  distance,
  isCardHidden,
  setIsCardHidden,
  handleClickMarker,
}: Props) {
  const { data: binDetailData, isLoading } = useQuery({
    queryKey: ["bindetail", binDataId],
    queryFn: () => getBinsId(binDataId),
    enabled: !!binDataId,
  });

  const onDragEnd = (deltaY: number) => {
    if (deltaY > 100) {
      setIsCardHidden(true);
    }
  };

  const { ref, handleDragStart, handleDragEnd } = useDrag(onDragEnd, true);

  if (isLoading || !binDetailData) {
    return null;
  }

  return (
    <div
      ref={ref}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onClick={() => handleClickMarker(Number(binDataId))}
      className={cn("card-wrapper", { hidden: isCardHidden })}
    >
      <div className={cn("text-box")}>
        <span className={cn("recommend")}>추천</span>
        <div className={cn("card-title-box")}>
          <p className={cn("card-title")}>{binDetailData.title}</p>
          <span className={cn("card-title-arrow")}>
            <Image src={"/images/arrowRight.svg"} alt="자세히 보기" fill />
          </span>
        </div>
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
