import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./Toast.module.scss";

const cn = classNames.bind(styles);

interface Prop {
  children: ReactNode;
  isgreen?: boolean;
}

export default function Toast({ children, isgreen }: Prop) {
  return (
    <article className={cn("toast", isgreen && "green")}>
      <p>{children}</p>
    </article>
  );
}
