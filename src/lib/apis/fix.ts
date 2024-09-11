import { instance } from "./axios";

export const getAdminBinsFix = async (data: any, cookies: any) => {
  const filter =
    data === "전체" ? "ENTIRE" : data === "처리 전" ? "PENDING" : "FINISHED";
  try {
    const res = await instance.get(
      `/admin/bins/modifications?filter=${filter}`,
      {
        headers: {
          Cookie: cookies || "", // 쿠키를 헤더에 포함하여 API 요청
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const postAcceptFix = async (id: any) => {
  try {
    const res = await instance.post(
      `/admin/bins/modifications/${id - 1}/approve`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
