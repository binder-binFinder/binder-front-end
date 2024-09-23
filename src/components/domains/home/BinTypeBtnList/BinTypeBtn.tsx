import { BinItemType } from "@/lib/constants/btnInputValues";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./BinTypeBtnList.module.scss";

const cn = classNames.bind(styles);

interface Props {
  type: BinItemType | "isBookmarked";
  binType: null | BinItemType["id"] | "isBookmarked";
  onClick: (id: BinItemType["id"] | "isBookmarked") => void;
}

const getBinImage = (binType?: string) => {
  switch (binType) {
    case "GENERAL":
      return "/images/general-bin.svg";
    case "RECYCLE":
      return "/images/recyle-bin.svg";
    case "BEVERAGE":
      return "/images/drink-bin.svg";
    case "CIGAR":
      return "/images/tabacoo-bin.svg";
    default:
      return "/images/favorite-bin.svg";
  }
};

export default function BinTypeBtn({ binType, type, onClick }: Props) {
  const handleClick = () => {
    if (type !== "isBookmarked") {
      onClick(type.id);
    } else {
      onClick("isBookmarked");
    }
  };

  return (
    <button
      className={cn(
        "bin-type-btn",
        binType === (type !== "isBookmarked" ? type.id : "isBookmarked") &&
          "selected"
      )}
      onClick={handleClick}
    >
      <Image
        src={getBinImage(type !== "isBookmarked" ? type.id : undefined)}
        alt={`${type !== "isBookmarked" ? type.label : "저장한 장소"} 이미지`}
        width={24.5}
        height={25}
      />
      <p>{type !== "isBookmarked" ? type.label : "저장한 장소"}</p>
    </button>
  );
}
