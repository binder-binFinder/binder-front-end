import { instance } from "./axios";

export const getAdminBinsFix = async (data: any) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(
      `/admin/bins/modifications?filter=${filter}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const postAcceptFix = async (id: any) => {
  try {
    const res = await instance.post(`/admin/bins/modifications/${id}/approve`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
