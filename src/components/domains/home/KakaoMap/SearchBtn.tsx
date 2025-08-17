import { loginState } from "@/lib/atoms/userAtom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./KakaoMap.module.scss";

const cn = classNames.bind(styles);

function SearchBtn() {
  const handleSearchClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search_page_click", {
        event_category: "Navigation",
        event_label: "Search Button",
        value: 1,
      });
    }
  };
  return (
    <Link
      href={"/search"}
      className={cn("btn-search-link")}
      onClick={handleSearchClick}
      data-cy="searchBtn"
    >
      <button>
        <Image
          src={"/images/search.svg"}
          alt="검색창으로 이동"
          width={15}
          height={15}
        />
        <p>쓰레기통 위치 검색</p>
      </button>
    </Link>
  );
}

function AddBinBtn({ isLogin }: { isLogin: boolean }) {
  const handleAddBin = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_bin_click", {
        event_category: "Navigation",
        event_label: "Add Bin Button",
        value: 1,
      });
    }
  };
  return (
    <Link
      href={isLogin ? "/addbin" : "/signin"}
      className={cn("btn-addbin-link")}
      onClick={handleAddBin}
    >
      <Image src={"/images/icon-plus.svg"} alt="신규 쓰레기통 등록하기" fill />
    </Link>
  );
}

export default function BtnField({ isAddBin }: { isAddBin?: boolean }) {
  const router = useRouter();
  const [isLogin] = useAtom(loginState);
  const handleClickBack = () => {
    return router.back();
  };
  if (isAddBin) {
    return (
      <article className={cn("btn-field", { isAddBin: isAddBin })}>
        <button onClick={handleClickBack} className={cn("btn-addbin-link")}>
          <Image
            src={"/images/icon-back-circle-btn.svg"}
            alt="뒤로 가기"
            fill
          />
        </button>
      </article>
    );
  }
  return (
    <article className={cn("btn-field")}>
      <SearchBtn />
      <AddBinBtn isLogin={isLogin} />
    </article>
  );
}
