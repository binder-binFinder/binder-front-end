import bookmark from "@/../public/images/bookmark.svg";
import bookmarkOn from "@/../public/images/bookmarkOn.svg";
import { deleteMyBookmark, postMyBookmark } from "@/lib/apis/bookmarks";
import { binType } from "@/lib/constants/binType";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SearchDetail.module.scss";

const cn = classNames.bind(styles);

interface DetailProp {
  item: {
    id?: number;
    address: string;
    title: string;
    type: string;
    longitude: number;
    latitude: number;
    isBookMarked: boolean;
    distance: number;
    binId?: number;
  };
  savePlace?: boolean;
}

export default function SearchDetail({ item, savePlace }: DetailProp) {
  const distances = Math.floor(item.distance).toLocaleString();
  const bin = binType(item.type);

  const [isBookmark, setIsBookmark] = useState<boolean>(
    savePlace ? true : item.isBookMarked
  );

  useEffect(() => {
    setIsBookmark(savePlace ? true : item.isBookMarked);
  }, [item.isBookMarked, savePlace]);

  const bookmarkImg = isBookmark ? bookmarkOn : bookmark;
  const binId: any = savePlace ? item.binId : item.id;

  const { mutate: handlePost } = useMutation({
    mutationFn: () => postMyBookmark(binId),
    onSuccess: () => {
      setIsBookmark(true);
    },
  });
  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deleteMyBookmark(binId),
    onSuccess: () => {
      setIsBookmark(false);
    },
  });

  const handleBookmark = (e: any) => {
    e.stopPropagation();
    if (isBookmark) {
      handleDelete();
    } else {
      handlePost();
    }
  };

  return (
    <div className={cn("detailWrap")}>
      <Image
        src={bookmarkImg}
        alt={"북마크 이미지"}
        width={16}
        height={19}
        onClick={(e) => handleBookmark(e)}
      />

      <div className={cn("detailMain")}>
        <p className={cn("detailTitle")}>{item.title}</p>
        <p className={cn("detailAddress")}>{item.address}</p>
      </div>

      <div className={cn("detailSub")}>
        <p className={cn("detailDistance")}>{distances}m</p>
        <p className={cn("detailTag")}>{bin}</p>
      </div>
    </div>
  );
}
