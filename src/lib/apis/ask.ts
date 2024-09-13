import { instance } from "./axios";

export const getAdminBins = async (data: any, cookies: any) => {
  const filter = data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(`/admin/bins/registrations?filter=${filter}`, {
      headers: {
        Cookie: cookies || "", // 쿠키를 헤더에 포함하여 API 요청
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postAccept = async (id: string | string[] | undefined) => {
  try {
    const res = await instance.post(`/admin/bins/registrations/${id}/approve`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const postRejectAccept = async (id: string | string[] | undefined, data: string) => {
  try {
    const res = await instance.post(`/admin/bins/registrations/${id}/reject`, { rejectReason: data });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
