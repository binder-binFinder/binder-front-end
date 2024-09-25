import { instance } from "./axios";

export const patchLike = async (id: string | number) => {
  try {
    const res = await instance.patch(`/bins/likes/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new err();
  }
};

export const deleteLike = async (id: string | number) => {
  try {
    const res = await instance.delete(`/bins/likes/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new err();
  }
};
export const patchDislike = async (id: string | number) => {
  try {
    const res = await instance.patch(`/bins/dislikes/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new err();
  }
};
export const deleteDislike = async (id: string | number) => {
  try {
    const res = await instance.delete(`/bins/dislikes/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new err();
  }
};
