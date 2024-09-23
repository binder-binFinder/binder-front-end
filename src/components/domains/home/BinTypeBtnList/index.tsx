import { BinItemType, btnInputValues } from "@/lib/constants/btnInputValues";
import classNames from "classnames/bind";
import BinTypeBtn from "./BinTypeBtn";
import styles from "./BinTypeBtnList.module.scss";

const cn = classNames.bind(styles);

interface Props {
  onClick: (id: BinItemType["id"] | "isBookmarked") => void;
  binType: null | BinItemType["id"] | "isBookmarked";
}

export default function BinTypeBtnList({ onClick, binType }: Props) {
  return (
    <ul className={cn("list")}>
      <li>
        <BinTypeBtn binType={binType} onClick={onClick} type={"isBookmarked"} />
      </li>
      {btnInputValues.map((type) => (
        <li>
          <BinTypeBtn binType={binType} type={type} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}
