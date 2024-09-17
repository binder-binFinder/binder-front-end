import Button from "@/components/commons/Button";
import DropReason from "@/components/commons/DropBottom/DropReason";
import Modal from "@/components/commons/Modal/TrashHow";
import { patchEditbin, postAddbin } from "@/lib/apis/postAddbin";
import { userAddress, userCoordinate } from "@/lib/atoms/userAtom";
import { btnInputValues } from "@/lib/constants/btnInputValues";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Router from "next/router";
import { FocusEventHandler, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddBinForm.module.scss";
import ImgInput from "./ImgInput";
import Input from "./Input";
import {
  AddbinFormValues,
  AddFormProps,
  PostAddbinValues,
} from "@/types/addFormTypes";

const cn = classNames.bind(styles);

export default function AddBinForm({
  binDetail,
  toggleIsEdit,
  isAdmin = false,
}: AddFormProps) {
  const [isOpenDropBottom, openDropBottom, closeDropBottom] = useToggle(false);
  const [isOpenModal, openModal, closeModal] = useToggle(false);
  const [selectedBin, setSelectedBin] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isBtnFocus, setIsBtnFocus] = useState(false);
  const [reason, setReason] = useState("");
  const [editPostData, setEditPostData] = useState<any>();
  const [coordinate] = useAtom(userCoordinate);
  const [address] = useAtom(userAddress);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<AddbinFormValues>({
    mode: "onChange",
    defaultValues: { binType: "", title: "", imageUrl: "" },
  });

  const handleDisabledSubmit = () => {
    if (errors.address || errors.binType || errors.title) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (binDetail && binDetail.binInfoForMember?.isOwner) {
      setValue("address", binDetail.address || "");
      setValue("binType", binDetail.type || "");
      setValue("title", binDetail.title || "");
      setValue("imageUrl", binDetail.imageUrl || "");
      setSelectedBin(
        btnInputValues.find((item) => item.id === binDetail.type)?.id || ""
      );
      setImg(binDetail.imageUrl || "");
    } else if (address?.roadAddress || address?.address) {
      setValue("address", address.roadAddress || address.address);
    }
  }, [address, setValue, binDetail]);

  const handleBlurBtn: FocusEventHandler<HTMLButtonElement> = () => {
    setIsBtnFocus(false);
  };

  const handleFousBtn: FocusEventHandler<HTMLButtonElement> = () => {
    return setIsBtnFocus(true);
  };

  const handleDeleteInput = (name: string) => {
    setValue(name as keyof AddbinFormValues, "");
  };

  const handleChangeImgData = (imgUrl: string) => {
    setValue("imageUrl", imgUrl);
    setImg(imgUrl);
  };

  const handleBinTypeClick = (id: string) => {
    setSelectedBin(id);
    setValue("binType", id);
    trigger("binType");
  };

  const onSubmit: SubmitHandler<AddbinFormValues> = (data) => {
    const postData: PostAddbinValues = {
      ...data,
      type: data.binType,
    };

    if (!!binDetail) {
      postData.latitude = binDetail.latitude;
      postData.longitude = binDetail.longitude;
      setEditPostData(postData);
    } else {
      postData.latitude = coordinate?.x;
      postData.longitude = coordinate?.y;
      submitAddbin(postData);
    }
  };

  const { mutate: submitAddbin } = useMutation({
    mutationKey: ["post-add-bin"],
    mutationFn: (data: PostAddbinValues) => postAddbin(data),

    onSuccess: () => {
      openModal();
    },
  });

  const { mutate: submitEditbin } = useMutation({
    mutationKey: ["petch-edit-bin", binDetail?.id],
    mutationFn: (data) => patchEditbin(binDetail?.id!, data),
    onSuccess: () => {
      closeDropBottom();
      openModal();
    },
    onError: (error: any) => alert(error.response.data.message),
  });

  const handleClickEditSubmit = (data: string) => {
    setReason(data);
    setEditPostData((prevData: PostAddbinValues) => ({
      ...prevData,
      modificationReason: data,
    }));
  };

  useEffect(() => {
    if (editPostData?.modificationReason) {
      submitEditbin(editPostData);
    }
  }, [editPostData]);

  return (
    <>
      {!!binDetail && (
        <h3 className={cn("edit-small-title")}>
          쓰레기통 정보 수정{!isAdmin && "요청"}
        </h3>
      )}
      <form className={cn("addbin-form")} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="address"
          label="쓰레기통 주소"
          placeholder="주소를 입력하세요"
          type="search"
          {...register("address", { required: "주소는 필수입니다." })}
          isError={!!errors.address}
          errorMessage={errors.address?.message}
        />

        <div className={cn("addbin-selector", { error: errors.binType })}>
          <label
            className={cn(
              "addbin-label",
              { focus: isBtnFocus },
              { error: !!errors.binType }
            )}
          >
            쓰레기통 분류
          </label>
          <Controller
            name="binType"
            control={control}
            rules={{ required: "필수 항목입니다." }}
            render={({ field, fieldState: { error } }) => (
              <>
                {btnInputValues.map((bin) => (
                  <Button
                    key={bin.id}
                    id={bin.id}
                    onFocus={handleFousBtn}
                    type="button"
                    selected={selectedBin === bin.id}
                    onClick={() => handleBinTypeClick(bin.id)}
                    {...field}
                    onBlur={handleBlurBtn}
                  >
                    {bin.label}
                  </Button>
                ))}
                {error && (
                  <p className={cn("error-message")}>{error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <Input
          id="title"
          label="장소 명칭"
          placeholder="명칭을 입력하세요"
          {...register("title", { required: "명칭은 필수입니다." })}
          isError={!!errors.title}
          onClickDelete={handleDeleteInput}
          errorMessage={errors.title?.message}
        />

        <ImgInput id="img" img={img} onChangeImgData={handleChangeImgData} />

        {!!binDetail ? (
          <article className={cn("edit-btnWrapper")}>
            <Button status="editCancel" type="button" onClick={toggleIsEdit}>
              수정 취소
            </Button>
            <Button
              status="editComplete"
              type="submit"
              onClick={openDropBottom}
            >
              수정 완료
            </Button>
          </article>
        ) : (
          <Button
            status="primary"
            type="submit"
            disabled={handleDisabledSubmit()}
          >
            위치 등록하기
          </Button>
        )}
      </form>

      {isOpenModal && (
        <Modal
          modalState={
            !!binDetail
              ? MODAL_CONTENTS.requestFixBin
              : MODAL_CONTENTS.requestAddBin
          }
          modalClose={Router.back}
          moreInfo={reason}
        />
      )}

      {isOpenDropBottom && (
        <DropReason
          onHandleSubmit={handleClickEditSubmit}
          state="정보"
          closeBtn={closeDropBottom}
          title="수정 사유 입력"
          placeholder="쓰레기통 수정"
        />
      )}
    </>
  );
}
