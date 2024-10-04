import closeImg from "@/../public/images/close.svg";
import locationImg from "@/../public/images/location.svg";
import searchImg from "@/../public/images/search.svg";
import { dateSet } from "@/lib/constants/date";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

export default function SearchItem({ item, num, removeItem }: any) {
  const date = dateSet(item.createdAt);
  return (
    <div className={cn("itemWrap")}>
      <Image
        src={item.hasBinsNearby ? locationImg : searchImg}
        alt="검색 상태 이미지"
        width={15}
        height={15}
      />
      <div className={cn("itemTitle")}>{item?.keyword}</div>
      <div className={cn("itemDate")}>{date}</div>
      <Image
        className={cn("itemClose")}
        src={closeImg}
        alt="최근검색 지우기"
        width={11}
        height={11}
        onClick={removeItem}
      />
    </div>
  );
}
