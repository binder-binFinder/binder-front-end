import { getBinsId } from "@/lib/apis/bins";
import { deleteMyBookmark, postMyBookmark } from "@/lib/apis/bookmarks";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Toast from "../../Toast";
import DropReport from "../DropReport";
import styles from "./DropBinInfo.module.scss";

const cn = classNames.bind(styles);
interface Props {
  closeDropDown: () => void;
  binId: number;
  distance: number;
}

export function ImgField({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className={cn("img-box")}>
      {imageUrl && <Image src={imageUrl} alt="쓰레기통 이미지" fill />}
    </div>
  );
}

export default function DropBinInfo({ closeDropDown, binId, distance }: Props) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReport, isReportOpen, iseReportClose] = useToggle(false);

  const { data: binDetailData } = useQuery({
    queryKey: ["get-bin-detail", binId],
    queryFn: () => getBinsId(binId),
    enabled: !!binId,
  });

  const { mutate: postBookmarkMutate } = useMutation({
    mutationFn: () => postMyBookmark(binId),
  });
  const { mutate: deleteBookmarkMutate } = useMutation({
    mutationFn: () => deleteMyBookmark(binId),
  });

  console.log("드롭바텀", binDetailData);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(closeDropDown, 290);
  };

  useOnClickOutside(ref, () => {
    if (!isReport) handleClose();
  });

  return (
    <div className={cn("drop")}>
      <article className={cn("dropWrap", { exit: !isVisible })} ref={ref}>
        <button className={cn("drag-btn")}></button>
        <div className={cn("title-box")}>
          <div className={cn("title-text")}>
            <h6 className={cn("title")}>{binDetailData?.title}</h6>
            <p className={cn("address")}>
              <Image
                src={"/images/icon-location-green-pin.svg"}
                alt="위치 표시용 핀"
                width={14}
                height={17}
              />
              {binDetailData?.address}
            </p>
          </div>
          <div>
            {binDetailData?.binInfoForMember.isOwner && (
              <button>
                <Image
                  src={"/images/icon-edit-pen-btn.svg"}
                  alt="수정하기 버튼"
                  width={41}
                  height={41}
                />
              </button>
            )}
            <button className={cn("report-btn")} onClick={isReportOpen}>
              <Image
                src={"/images/icon-report-btn.svg"}
                alt="신고하기 버튼"
                width={41}
                height={41}
              />
            </button>
          </div>
        </div>
        <ImgField imageUrl={binDetailData?.imageUrl} />
        <div className={cn("btn-box")}>
          <button
            className={cn(
              "state-btn",
              binDetailData?.binInfoForMember.isBookmarked && "selected"
            )}
          >
            <Image
              src={"/images/icon-gray-star.svg"}
              width={16}
              height={16}
              alt="즐겨찾기"
            />
            {binDetailData?.bookmarkCount}
          </button>
          <button
            className={cn(
              "state-btn",
              binDetailData?.binInfoForMember.isLiked && "selected"
            )}
          >
            <Image
              src={"/images/thumb-up.svg"}
              width={16}
              height={16}
              alt="좋아요"
            />
            {binDetailData?.likeCount}
          </button>
          <button
            className={cn(
              "state-btn",
              binDetailData?.binInfoForMember.isDisliked && "selected"
            )}
          >
            <Image
              src={"/images/thumb-down.svg"}
              width={16}
              height={16}
              alt="싫어요"
            />
            {binDetailData?.dislikeCount}
          </button>
        </div>
        <div className={cn("info-box")}>
          <p className={cn("alert", "none")}>
            <Image
              src={"/images/alert.svg"}
              alt="경고"
              width={13}
              height={13}
            />
            누적된 신고가 많은 쓰레기통입니다
          </p>
          <div className={cn("distance")}>
            <Image
              src={"/images/icon-location-green-pin.svg"}
              alt="위치 표시 핀"
              width={12}
              height={15}
            />
            <p> {Math.floor(distance) + "m"}</p>
          </div>
        </div>
        <Toast
          isgreen
        >{`저장한 장소에 ${binDetailData?.title}을 추가했습니다`}</Toast>
      </article>
      {isReport && binDetailData.id && (
        <DropReport
          binId={binDetailData.id}
          littleTitle={binDetailData?.title}
          binAddress={binDetailData?.address}
          imageUrl={binDetailData.imageUrl}
          closeBtn={iseReportClose}
        />
      )}
    </div>
  );
}
