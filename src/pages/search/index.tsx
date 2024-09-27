import SearchInput from "@/components/domains/search/SearchInput";
import SearchItems from "@/components/domains/search/SearchItems";
import SearchToggle from "@/components/domains/search/SearchToggle";
import { searchDetailList } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Search() {
  const [detail, setDetail] = useAtom(searchDetailList);
  const [prevSearchPick, setPrevSearchPick] = useState<string>("");

  useEffect(() => {
    setDetail([]);
  }, []);
  return (
    <>
      <SearchInput prevSearchPick={prevSearchPick} />
      {detail.length === 0 && <SearchToggle />}
      <SearchItems setPrevSearchPick={setPrevSearchPick} />
    </>
  );
}
