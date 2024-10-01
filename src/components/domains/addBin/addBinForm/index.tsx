import Button from "@/components/commons/Button";
import DropReason from "@/components/commons/DropBottom/DropReason";
import Modal from "@/components/commons/Modal/TrashHow";
import { patchBinAdmin } from "@/lib/apis/admin";
import { patchEditbin, postAddbin } from "@/lib/apis/postAddbin";
import {
  newAddAddress,
  newAddCoordinate,
  userAddress,
  userCoordinate,
} from "@/lib/atoms/userAtom";
import { btnInputValues } from "@/lib/constants/btnInputValues";
import { MODAL_CONTENTS } from "@/lib/constants/modalContents";
import { useToggle } from "@/lib/hooks/useToggle";
import {
  AddFormProps,
  AddbinFormValues,
  PostAddbinValues,
} from "@/types/addFormTypes";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Router from "next/router";
import { FocusEventHandler, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddBinForm.module.scss";
import ImgInput from "./ImgInput";
import Input from "./Input";

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
  const [newAddress, setNewAddress] = useAtom(newAddAddress);
  const [newCoordinate, setNewCoordinate] = useAtom(newAddCoordinate);

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
    if (!!binDetail) {
      console.log("detail", binDetail);
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

    if (newAddress?.roadAddress || newAddress?.address) {
      setValue("address", newAddress.roadAddress || newAddress.address);
    }
    console.log("dddd", newAddress);
    console.log(binDetail);
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
      registrationId: binDetail?.registrationId || null,
      modificationId: binDetail?.modificationId || null,
    };

    if (!!binDetail) {
      postData.latitude = newCoordinate?.x || binDetail.latitude;
      postData.longitude = newCoordinate?.y || binDetail.longitude;
      setEditPostData(postData);
      console.log(postData);
    } else {
      postData.latitude = newCoordinate?.x || coordinate?.x;
      postData.longitude = newCoordinate?.y || coordinate?.y;
      submitAddbin(postData);
    }
  };

  const { mutate: submitAddbin } = useMutation({
    mutationKey: ["post-add-bin"],
    mutationFn: (data: PostAddbinValues) => postAddbin(data),

    onSuccess: () => {
      openModal();
      setNewAddress({ roadAddress: "", address: "" });
      setNewCoordinate({ x: 0, y: 0 });
    },
  });

  const { mutate: submitEditbin } = useMutation({
    mutationKey: ["petch-edit-bin", binDetail?.id],
    mutationFn: (data) => patchEditbin(binDetail?.id!, data),
    onSuccess: () => {
      closeDropBottom();
      openModal();
      setNewAddress({ roadAddress: "", address: "" });
      setNewCoordinate({ x: 0, y: 0 });
    },
    onError: (error: any) => alert(error.response.data.message),
  });

  const { mutate: patchBinAdminMutate } = useMutation({
    mutationKey: ["petch-admin-edit-bin", binDetail?.id],
    mutationFn: (data) =>
      patchBinAdmin(binDetail?.binId || binDetail?.id!, data),
    onSuccess: () => {
      closeDropBottom();
      openModal();
      setNewAddress({ roadAddress: "", address: "" });
      setNewCoordinate({ x: 0, y: 0 });
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
      isAdmin ? patchBinAdminMutate(editPostData) : submitEditbin(editPostData);
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
          mapCenter={{ x: binDetail?.latitude, y: binDetail?.longitude }}
          placeholder="주소를 입력하세요"
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
            !binDetail
              ? MODAL_CONTENTS.requestAddBin
              : isAdmin
                ? MODAL_CONTENTS.editbin
                : MODAL_CONTENTS.requestFixBin
          }
          modalClose={() => {
            !!toggleIsEdit && toggleIsEdit();
            Router.back();
          }}
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
