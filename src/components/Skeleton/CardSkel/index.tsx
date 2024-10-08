import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./CardSkel.module.scss";

const cn = classNames.bind(styles);

export default function CardSkel() {
  return (
    <button className={cn("card-wrapper")}>
      <Image
        src={"/images/icon-location-green-pin.svg"}
        alt="초록색 위치 표시 핀"
        width={16}
        height={19}
        className={cn("")}
      />
      <div className={cn("card-text-box")}>
        <div className={cn("card-title-box")}>
          <h4 className={cn("card-title")}></h4>
          <p className={cn("card-createdAt")}></p>
        </div>
        <p className={cn("card-address")}></p>
        <div className={cn("card-bottom")}>
          <div>
            <span className={cn("card-tag")}></span>

            <span></span>
          </div>
          <div className={cn("card-likes")}></div>
        </div>
      </div>
    </button>
  );
}
