import arrow from "@/../public/images/arrowRight.svg";
import location from "@/../public/images/location.svg";
import search from "@/../public/images/search.svg";
import { getSearch, getSearchKeyword } from "@/lib/apis/search";
import { searchData, searchDetailList, searchPrev } from "@/lib/atoms/atom";
import { userCoordinate } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";

import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./SearchInput.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  searchData: string;
}

interface SearchType {
  state: string;
  title: string;
  date: string;
}

interface SearchInputProps {
  prevSearchPick: string;
}

export default function SearchInput({ prevSearchPick }: SearchInputProps) {
  const [, setSearchPrev] = useAtom(searchPrev);
  const [searchInput, setSearchData] = useAtom(searchData);
  const [, setDetail] = useAtom(searchDetailList);
  const [coordinate] = useAtom(userCoordinate);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const [choicePlace, setChoicePlace] = useState<any>();

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSearchPrev((prev: SearchType[]) => {
      const updatedPrev = prev.filter(
        (item: any) => item.title !== searchInput
      );
      const dates = new Date();
      const newData = {
        state: "search",
        title: searchInput,
        date: `${String(dates.getMonth() + 1).padStart(2, "0")}.${String(dates.getDate()).padStart(2, "0")}`,
      };
      return [newData, ...updatedPrev];
    });
  };

  // 디바운스 적용
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 300); // 300ms 디바운스 적용

    return () => {
      clearTimeout(handler); // 검색어 변경 시 이전 타이머 취소
    };
  }, [searchInput]);

  // 리액트 쿼리 사용해서 데이터 요청
  const {
    data: addresses = [],
    isFetching: isSearching,
    isSuccess: addressSuccess,
  } = useQuery({
    queryKey: ["searchAddresses", debouncedSearchInput],
    queryFn: () => getSearch(debouncedSearchInput),
    enabled: !!debouncedSearchInput,
    staleTime: 300000, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 포커스 시 재요청 막기
  });

  // const ref = useRef(null);

  const handleClickOutside = () => {
    setSearchData("");
  };

  // useOnClickOutside(ref, handleClickOutside);

  const { data: searchAddress, isSuccess } = useQuery({
    queryKey: ["searchAddress", coordinate, choicePlace, searchInput],
    queryFn: () =>
      getSearchKeyword(
        coordinate.y,
        coordinate.x,
        choicePlace.x,
        choicePlace.y,
        searchInput,
        choicePlace.address_name
      ),
  });
  const handleChoice = (item: any) => {
    setChoicePlace(item);

    setSearchData(item.title);

    handleSubmit(onSubmit)();
  };
  if (isSuccess) {
    setDetail(searchAddress);
  }

  useEffect(() => {
    setSearchData(prevSearchPick);
  }, [prevSearchPick]);

  return (
    <>
      <form className={cn("inputWrap")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("inputInner")}>
          <button>
            <Image src={search} alt="검색버튼" width={15} height={15} />
          </button>
          <input
            {...register("searchData")}
            type="text"
            placeholder="쓰레기통 위치 검색"
            value={searchInput}
            onChange={(e) => setSearchData(e.target.value)}
            // ref={ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (addresses.length > 0) {
                  handleChoice(addresses[0]);
                  handleClickOutside();
                  handleSubmit(onSubmit)();
                }
              }
            }}
            autoComplete="off"
          />
        </div>
      </form>

      {/* {isSearching && <p>검색 중...</p>} */}

      <ul
        className={
          addresses.length > 0 ? cn("searchList") : cn("searchListNone")
        }
      >
        {addresses.map((address: any, index: number) => (
          <li
            key={index}
            onClick={() => {
              handleChoice(address);
              handleClickOutside();
            }}
          >
            <Image src={location} alt="위치이미지" width={16} height={19} />
            <p>{address.place_name}</p>
            <Image src={arrow} alt="화살표" width={14} height={14} />
          </li>
        ))}
      </ul>
    </>
  );
}
