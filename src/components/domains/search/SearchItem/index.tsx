import closeImg from "@/../public/images/close.svg";
import searchImg from "@/../public/images/search.svg";
import { searchPrev } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

export default function SearchItem({ item, num }: any) {
  const [prevData, setSearchPrev] = useAtom(searchPrev);
  const handleDelete = () => {
    const newPrevData = [...prevData];
    newPrevData.splice(num, 1);
    setSearchPrev(newPrevData);
  };
  console.log(item, num);
  return (
    <div className={cn("itemWrap")}>
      <Image src={searchImg} alt="검색 상태 이미지" width={15} height={15} />
      <div className={cn("itemTitle")}>{item.title}</div>
      <div className={cn("itemDate")}>{item.date}</div>
      <Image
        className={cn("itemClose")}
        src={closeImg}
        alt="검색 상태 이미지"
        width={11}
        height={11}
        onClick={handleDelete}
      />
    </div>
  );
}
