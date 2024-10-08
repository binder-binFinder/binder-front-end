import { themeColor } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import styles from "./AroundBinSearchBtns.module.scss";

const cn = classNames.bind(styles);
interface Props {
  onClickGetAroundBinData: () => void;
  onClickGetmyLocation: () => void;
  toggleAroundBin: boolean;
  toggleMyLocation: boolean;
  hasData: boolean;
  isCardHidden: boolean;
}

export default function AroundBinSearchBtns({
  onClickGetAroundBinData,
  onClickGetmyLocation,
  toggleAroundBin,
  toggleMyLocation,
  hasData,
  isCardHidden,
}: Props) {
  const [themeMode] = useAtom(themeColor);

  const handleSearchClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "nearby_search_click", {
        event_category: "Navigation",
        event_label: "Nearby Search Button",
        value: 1,
      });
    }
  };
  return (
    <article
      className={cn("btns-wrapper", !isCardHidden && hasData ? "hasBin" : "")}
    >
      <button
        onClick={() => {
          onClickGetAroundBinData();
          handleSearchClick();
        }}
        className={cn("search-around-bin-btn", toggleAroundBin && "on")}
      >
        <Image
          src={"/images/return.svg"}
          alt="현위치에서 다시 검색하기"
          width={21}
          height={20}
        />
        <p>현 위치에서 검색</p>
      </button>
      <button
        className={cn(
          !toggleMyLocation ? "my-location-btn" : "my-location-btn-on"
        )}
        onClick={onClickGetmyLocation}
      >
        {themeMode === "다크 모드" ? (
          <Image
            src={"/images/icon-my-locationBtn-dark.svg"}
            alt="내 위치 다시 가져오기"
            fill
          />
        ) : (
          <Image
            src={"/images/icon-my-locationBtn.svg"}
            alt="내 위치 다시 가져오기"
            fill
          />
        )}
      </button>
    </article>
  );
}
