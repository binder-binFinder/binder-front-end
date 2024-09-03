import { MouseEventHandler, ReactNode } from "react";
import style from "./Button.module.scss";
import classNames from "classnames/bind";
import { useToggle } from "@/lib/hooks/useToggle";

const cn = classNames.bind(style);

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  status?: "basic" | "alert" | "primary";
}

export default function Button({ children, onClick, status = "basic", type = "button", ...rest }: Props) {
  const { isToggle, handleToggleClick } = useToggle();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    handleToggleClick();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button className={cn("button", status, { selected: isToggle })} onClick={handleOnClick} type={type} {...rest}>
      {children}
    </button>
  );
}
