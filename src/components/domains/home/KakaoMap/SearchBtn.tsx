import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./KakaoMap.module.scss";

const cn = classNames.bind(styles);

function SearchBtn() {
  return (
    <Link href={"/search"} className={cn("btn-search-link")}>
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

function AddBinBtn() {
  return (
    <Link href={"/addbin"} className={cn("btn-addbin-link")}>
      <button>
        <Image
          src={"/images/icon-plus.svg"}
          alt="신규 쓰레기통 등록하기"
          width={49}
          height={49}
        />
      </button>
    </Link>
  );
}

export default function BtnField({ isAddBin }: { isAddBin?: boolean }) {
  const router = useRouter();
  const handleClickBack = () => {
    return router.back();
  };
  if (isAddBin) {
    return (
      <article className={cn("btn-field")}>
        <button onClick={handleClickBack} className={cn("btn-addbin-link")}>
          <Image
            src={"/images/icon-back-circle-btn.svg"}
            alt="뒤로 가기"
            width={49}
            height={49}
          />
        </button>
        <SearchBtn />
      </article>
    );
  }
  return (
    <article className={cn("btn-field")}>
      <SearchBtn />
      <AddBinBtn />
    </article>
  );
}
