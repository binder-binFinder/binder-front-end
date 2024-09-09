import search from "@/../public/images/search.svg";
import { searchPrev } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
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
export default function SearchInput() {
  const [, setSearchPrev] = useAtom(searchPrev);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSearchPrev((prev: SearchType[]) => {
      const updatedPrev = prev.filter(
        (item: any) => item.title !== data.searchData
      );
      const dates = new Date();
      const newData = {
        state: "search",
        title: data.searchData,
        date: `${String(dates.getMonth() + 1).padStart(2, "0")}.${String(dates.getDate()).padStart(2, "0")}`,
      };
      return [newData, ...updatedPrev];
    });
  };

  return (
    <form className={cn("inputWrap")} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn("inputInner")}>
        <button>
          <Image src={search} alt="검색버튼" width={15} height={15} />
        </button>
        <input
          {...register("searchData")}
          type="text"
          placeholder="쓰레기통 위치 검색"
        />
      </div>
    </form>
  );
}
