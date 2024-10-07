import closeImg from "@/../public/images/close.svg";
import locationImg from "@/../public/images/location.svg";
import searchImg from "@/../public/images/search.svg";
import { searchPrev } from "@/lib/atoms/atom";
import { loginState } from "@/lib/atoms/userAtom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

export default function SearchItem({ item, num, removeItem }: any) {
  const [prevData, setSearchPrev] = useAtom(searchPrev);
  const [loginStates] = useAtom(loginState);
  const handleDelete = (e: any) => {
    e.stopPropagation();
    const newPrevData = [...prevData];
    newPrevData.splice(num, 1);
    setSearchPrev(newPrevData);
  };

  const dateSet =
    item?.createdAt?.slice(5, 7) + ". " + item?.createdAt?.slice(8, 10);
  return !loginStates ? (
    <div className={cn("itemWrap")}>
      <Image src={searchImg} alt="검색 상태 이미지" width={15} height={15} />
      <div className={cn("itemTitle")}>{item?.title}</div>
      <div className={cn("itemDate")}>{item?.date}</div>
      <Image
        className={cn("itemClose")}
        src={closeImg}
        alt="최근검색 지우기"
        width={11}
        height={11}
        onClick={(e) => handleDelete(e)}
      />
    </div>
  ) : (
    <div className={cn("itemWrap")}>
      <Image
        src={item?.hasBinsNearby ? locationImg : searchImg}
        alt="검색 상태 이미지"
        width={15}
        height={15}
      />
      <div className={cn("itemTitle")}>{item?.keyword}</div>
      <div className={cn("itemDate")}>{dateSet}</div>
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
