import { forwardRef } from "react";
import styles from "./AddBinForm.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { InputProps } from "@/types/addFormTypes";

const cn = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      onClickDelete,
      type = "text",
      isError,
      errorMessage,
      name,
      ...rest
    },
    ref
  ) => (
    <div>
      <input
        id={id}
        type={type}
        name={name}
        className={cn("addbin-input", { error: isError })}
        ref={ref}
        {...rest}
      />
      <label htmlFor={id} className={cn("addbin-label", { error: isError })}>
        {label}
      </label>
      {type === "serch" && (
        <Link href={"/KakaoMap"}>
          <button className={cn("addbin-input-delete-button")}>
            <Image
              src={"/images/search.svg"}
              alt="입력값 지우기"
              width={17}
              height={17}
            />
          </button>
        </Link>
      )}
      {!!onClickDelete && (
        <button
          className={cn("addbin-input-delete-button")}
          onClick={() => onClickDelete(name!)}
        >
          <Image
            src={"/images/inputX.svg"}
            alt="입력값 지우기"
            width={17}
            height={17}
          />
        </button>
      )}
      {errorMessage && <p className={cn("error-message")}>{errorMessage}</p>}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
