import { myPageSetting } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import MyPageFindBin from "../MyPageFindBin";
import MyPageSetting from "../MyPageSetting";
import styles from "./MyPageToggle.module.scss";

const cn = classNames.bind(styles);

export default function MyPageToggle() {
  const [menu, setMenu] = useAtom(myPageSetting);
  return (
    <>
      <div className={cn("toggleWrap")}>
        <div className={cn("toggle")}>
          <div
            data-cy="toggle1"
            className={
              menu === "활동내역" ? cn("toggleItemOn") : cn("toggleItem")
            }
            onClick={() => setMenu("활동내역")}
          >
            활동내역
          </div>
          <div
            data-cy="toggle2"
            className={menu === "설정" ? cn("toggleItemOn") : cn("toggleItem")}
            onClick={() => setMenu("설정")}
          >
            설정
          </div>
        </div>
        <div
          className={menu === "활동내역" ? cn("toggleBar") : cn("toggleBar2")}
        ></div>
      </div>

      {menu === "활동내역" ? <MyPageFindBin /> : <MyPageSetting />}
    </>
  );
}
