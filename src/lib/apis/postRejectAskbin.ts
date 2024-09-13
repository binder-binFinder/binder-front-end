import { instance } from "./axios";

export const postRejectFixbin = async (id: string | string[] | undefined, data: string) => {
  try {
    const res = await instance.post(`admin/bins/modifications/${id}/reject`, { rejectReason: data });
    return res;
  } catch (error) {
    console.log(error);
  }
};
