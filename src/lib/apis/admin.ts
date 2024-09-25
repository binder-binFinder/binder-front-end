import { instance } from "./axios";

export const deleteBinAdmin = async (id: string | number) => {
  try {
    const res = await instance.delete(`admin/bins/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new error();
  }
};
export const patchBinAdmin = async (id: string | number, data: any) => {
  try {
    const res = await instance.patch(`admin/bins/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new error();
  }
};
