import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
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

export default function BtnField({ isAddBin }: { isAddBin: boolean }) {
  if (isAddBin) {
    return (
      <section className={cn("btn-field")}>
        <Link href={"/addbin"} className={cn("btn-addbin-link")}>
          <button>
            <Image
              src={"/images/icon-back-circle-btn.svg"}
              alt="신규 쓰레기통 등록하기"
              width={49}
              height={49}
            />
          </button>
        </Link>
        <SearchBtn />
      </section>
    );
  }
  return (
    <section className={cn("btn-field")}>
      <SearchBtn />
      <AddBinBtn />
    </section>
  );
}
