import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./AddBinForm.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ImgInput from "./ImgInput";
import Input from "./Input";
import { btnInputValues } from "@/lib/constants/btnInputValues";

const cn = classNames.bind(styles);

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
  id: string;
}

interface FormValues {
  address: string;
  title: string;
  binType: string;
  image?: FileList;
}

export default function AddBinForm() {
  const [selectedBin, setSelectedBin] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const handleBinTypeClick = (id: string) => {
    setSelectedBin(id);
    setValue("binType", id); // 선택된 값을 binType에 저장
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form className={cn("addbin-form")} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="address"
        label="쓰레기통 주소"
        placeholder="주소를 입력하세요"
        {...register("address", { required: true })}
        isError={!!errors.address}
        errorMessage={errors.address ? "주소는 필수입니다." : ""}
      />

      <div className={cn("addbin-selector")}>
        <p className={cn("addbin-label")}>쓰레기통 분류</p>
        <Controller
          name="binType"
          control={control}
          render={({ field }) => (
            <>
              {btnInputValues.map((bin) => (
                <Button
                  key={bin.id}
                  id={bin.id}
                  type="button"
                  selected={selectedBin === bin.id}
                  onClick={() => handleBinTypeClick(bin.id)}
                  status="basic"
                  {...field}
                >
                  {bin.label}
                </Button>
              ))}
            </>
          )}
        />
      </div>

      <Input
        id="title"
        label="장소 명칭"
        isError={!!errors.title}
        errorMessage={errors.title?.message}
        placeholder="명칭을 입력하세요"
        {...register("title", { required: "명칭은 필수입니다." })}
      />

      <ImgInput id="img" {...register("image")} />

      <Button status="primary" type="submit">
        위치 등록하기
      </Button>
    </form>
  );
}
