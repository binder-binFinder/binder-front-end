import { instance } from "./axios";

export const getAdminBinsReport = async (data: any) => {
  const filter = data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(`/admin/bins/complaints?filter=${filter}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getAdminBinsReportCount = async (id: string | string[] | undefined) => {
  try {
    const res = await instance.get(`/admin/bins/complaints/${id}/counts`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const postAcceptReport = async (id: string | string[] | undefined) => {
  try {
    const res = await instance.post(`/admin/bins/complaints/${id}/approve`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postRejectReport = async (id: string | string[] | undefined, data: string) => {
  try {
    const res = await instance.post(`/admin/bins/complaints/${id}/reject`, { rejectReason: data });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
