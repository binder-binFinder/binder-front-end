import SearchInput from "@/components/domains/search/SearchInput";
import SearchItems from "@/components/domains/search/SearchItems";
import SearchToggle from "@/components/domains/search/SearchToggle";
import { getMembers } from "@/lib/apis/members";
import { searchDetailList, searchToggle } from "@/lib/atoms/atom";
import { loginState } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [detail, setDetail] = useAtom(searchDetailList);
  const [prevSearchPick, setPrevSearchPick] = useState<string>("");
  const target = useRef<HTMLDivElement>(null);
  const [btnState, setBtnState] = useAtom(searchToggle);
  const prevSearchRef = useRef<HTMLDivElement>(null);

  const { data: memberData } = useQuery({
    queryKey: ["memberDatas"],
    queryFn: () => getMembers(),
  });

  const [, setLoginState] = useAtom(loginState);
  useEffect(() => {
    if (memberData !== null) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [memberData]);

  useEffect(() => {
    setDetail(null);
    setBtnState("최근 검색");
  }, []);

  return (
    <section>
      <SearchInput prevSearchPick={prevSearchPick} />
      <SearchToggle target={target} />

      <SearchItems
        setPrevSearchPick={setPrevSearchPick}
        target={target}
        prevSearchRef={prevSearchRef}
      />

      <div
        ref={target}
        style={{
          height: "1px",
          marginTop: "-5rem",
          display: btnState === "저장한 장소" ? "block" : "none",
        }}
      ></div>

      <div
        ref={prevSearchRef}
        style={{
          height: "1px",
          // marginTop: "-5rem",
          display: btnState === "최근 검색" ? "block" : "none",
        }}
      ></div>
    </section>
  );
}
