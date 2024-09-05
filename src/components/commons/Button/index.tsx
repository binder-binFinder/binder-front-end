import { MouseEventHandler, ReactNode } from "react";
import style from "./Button.module.scss";
import classNames from "classnames/bind";
import { useToggle } from "@/lib/hooks/useToggle";

const cn = classNames.bind(style);

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  status?: "basic" | "alert" | "primary";
  selected?: boolean;
}

export default function Button({
  children,
  onClick,
  selected,
  status = "basic",
  type = "button",
  disabled,
  id,
  ...rest
}: Props) {
  return (
    <button className={cn("button", status, { selected })} disabled={disabled} onClick={onClick} type={type} {...rest}>
      {children}
    </button>
  );
}
