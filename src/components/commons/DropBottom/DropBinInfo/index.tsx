import { useDrag } from "@/lib/hooks/useDrag";
import { useToggle } from "@/lib/hooks/useToggle";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Toast from "../../Toast";
import DropReport from "../DropReport";
import styles from "./DropBinInfo.module.scss";
import { useBinActions } from "./useBinActions";

const cn = classNames.bind(styles);
interface Props {
  closeDropDown: () => void;
  binId: number;
  distance: number;
  getBibsData: () => Promise<void>;
}

export function ImgField({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className={cn("img-box")}>
      {imageUrl && <Image src={imageUrl} alt="쓰레기통 이미지" fill />}
    </div>
  );
}

export default function DropBinInfo({
  closeDropDown,
  binId,
  distance,
  getBibsData,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isReport, isReportOpen, iseReportClose] = useToggle(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [cardHeight, setCardHeight] = useState(400);
  const router = useRouter();

  const [
    isSuccessMybookmark,
    openSuccessMybookmarkToast,
    closeSuccessMybookmarkToast,
  ] = useToggle(false);

  const onDragEnd = (deltaY: number) => {
    if (deltaY < -100) {
      setCardHeight(window.innerHeight);
    } else {
      setCardHeight(400);
    }
  };

  const { ref, handleDragStart, handleDrag, handleDragEnd } =
    useDrag(onDragEnd);

  const onSuccessBookmark = () => {
    openSuccessMybookmarkToast();
    getBibsData();

    setTimeout(() => {
      closeSuccessMybookmarkToast();
    }, 3000);
  };

  const {
    binDetailData,
    isLoading,
    postBookmarkMutate,
    deleteBookmarkMutate,
    patchLikeMutate,
    deleteLikeMutate,
    patchDislikeMutate,
    deletedisLikeMutate,
  } = useBinActions(binId, onSuccessBookmark, getBibsData);

  const disableButtonTemporarily = () => {
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 1000);
  };
  console.log(binDetailData);

  const handleClickBookmark = () => {
    if (binDetailData?.binInfoForMember === null) {
      return router.push("/signin");
    }

    if (isButtonDisabled) return;
    disableButtonTemporarily();

    if (binDetailData?.binInfoForMember.isBookMarked) {
      return deleteBookmarkMutate();
    } else {
      return postBookmarkMutate();
    }
  };
  const handleClickLike = () => {
    if (binDetailData?.binInfoForMember === null) {
      return router.push("/signin");
    }
    if (isButtonDisabled) return;
    disableButtonTemporarily();

    if (binDetailData?.binInfoForMember.isLiked) {
      return deleteLikeMutate();
    } else {
      return patchLikeMutate();
    }
  };
  const handleClickDisLike = () => {
    if (binDetailData?.binInfoForMember === null) {
      return router.push("/signin");
    }
    if (isButtonDisabled) return;
    disableButtonTemporarily();

    if (binDetailData?.binInfoForMember.isDisliked) {
      return deletedisLikeMutate();
    } else {
      return patchDislikeMutate();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(closeDropDown, 290);
  };

  useOnClickOutside(ref, () => {
    if (!isReport) handleClose();
  });

  if (isLoading) {
    <p>로딩 중</p>;
  }

  return (
    <div className={cn("drop")}>
      <div
        className={cn("dropWrap", { exit: !isVisible })}
        ref={ref}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        style={{ height: cardHeight }}
      >
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
            <Link href={`/mypage/edit/${binId}`}>
              <button>
                <Image
                  src={"/images/icon-edit-pen-btn.svg"}
                  alt="수정하기 버튼"
                  width={41}
                  height={41}
                />
              </button>
            </Link>

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
              binDetailData?.binInfoForMember?.isBookMarked && "selected"
            )}
            onClick={handleClickBookmark}
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
              binDetailData?.binInfoForMember?.isLiked && "selected"
            )}
            onClick={handleClickLike}
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
              binDetailData?.binInfoForMember?.isDisliked && "selected"
            )}
            onClick={handleClickDisLike}
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
          <p
            className={cn("alert", binDetailData?.complaintCount < 3 && "none")}
          >
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
        {isSuccessMybookmark && (
          <Toast
            isgreen
          >{`저장한 장소에 ${binDetailData?.title}을 추가했습니다`}</Toast>
        )}
      </div>
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
