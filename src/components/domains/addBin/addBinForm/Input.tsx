import { InputProps } from "@/types/addFormTypes";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import styles from "./AddBinForm.module.scss";

const cn = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      mapCenter,
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
      {id === "address" && (
        <Link
          className={cn("addbin-input-search-button")}
          href={{
            pathname: "/",
            query: {
              addBin: true,
              latitude: mapCenter?.x,
              longitude: mapCenter?.y,
            },
          }}
        >
          <div>
            <Image src={"/images/search.svg"} alt="검색으로 이동하기" fill />
          </div>
        </Link>
      )}
      {!!onClickDelete && (
        <button
          className={cn("addbin-input-delete-button")}
          onClick={() => onClickDelete(name!)}
        >
          <div>
            <Image src={"/images/inputX.svg"} alt="입력값 지우기" fill />
          </div>
        </button>
      )}
      {errorMessage && <p className={cn("error-message")}>{errorMessage}</p>}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
