import React, { ReactNode, forwardRef } from "react";
import style from "./Button.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(style);

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  status?: "basic" | "alert" | "primary" | "edit" | "editCancel" | "editComplete";
  selected?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, selected, status = "basic", type = "button", disabled, id, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("button", status, { selected })}
        disabled={disabled}
        onClick={onClick}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
