import { instance } from "./axios";

export const getAdminBins = async (data: any) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(
      `/admin/bins/registrations?filter=${filter}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const postAccept = async (id: any) => {
  try {
    const res = await instance.post(`/admin/bins/registrations/${id}/approve`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
