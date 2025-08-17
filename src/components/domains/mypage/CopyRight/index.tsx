import classNames from "classnames/bind";
import style from "./CopyRight.module.scss";

const cn = classNames.bind(style);

export default function CopyRight() {
  return (
    <div className={cn("copyRightWrap")}>
      &copy; 2024 Binder. All rights reserved. <br />
      Designed and developed by the Binder Team.
      <br />
      Contact :
      <a href="mailto:rladbstn1212@gmail.com"> rladbstn1212@gmail.com</a>
    </div>
  );
}
