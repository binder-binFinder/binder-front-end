import { instance } from "./axios";

export const postRejectAddbin = async (id: string | string[] | undefined, data: string) => {
  try {
    const res = await instance.post(`/admin/bins/registrations/${id}/reject`, { rejectReason: data });
    return res;
  } catch (error) {
    console.log(error);
  }
};
