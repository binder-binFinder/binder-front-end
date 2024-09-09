import { searchPrev } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import SearchItem from "../SearchItem";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

export default function SearchItems() {
  const [prevSearch, setSearchPrev] = useAtom(searchPrev);
  return (
    <div className={cn("itemsWrap")}>
      {prevSearch?.map((item: any, index: number) => (
        <div key={index}>
          <SearchItem item={item} num={index} />
        </div>
      ))}
    </div>
  );
}
