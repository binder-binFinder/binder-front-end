import classNames from "classnames/bind";
import KakaoMap from "../KakaoMap";
import BtnField from "../KakaoMap/SearchBtn";
import styles from "./LayOut.module.scss";

const cn = classNames.bind(styles);

export default function HomeLayOut({
  isAddBin,
  isSearch,
}: {
  isAddBin: boolean;
  isSearch: boolean;
}) {
  return (
    <section className={cn("map-wrapper")}>
      <BtnField isAddBin={isAddBin} />
      <KakaoMap isAddBin={isAddBin} isSearch={isSearch} />
    </section>
  );
}
