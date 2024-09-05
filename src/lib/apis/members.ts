import { instance } from "./axios";

export const getMembers = async (cookies: string | undefined) => {
  try {
    const res = await instance.get("/members/me", {
      headers: {
        Cookie: cookies || "", // 쿠키를 헤더에 포함하여 API 요청
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteMembers = async (data: string) => {
  try {
    const res = await instance.delete(`/members/me?input=${data}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const patchMembers = async (data: {
  nickname: string;
  imageUrl: string;
}) => {
  try {
    const res = await instance.patch(
      `/members/me?nickname=${data.nickname}&imageUrl=${data.imageUrl}`
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getMembersTimeline = async () => {
  try {
    const res = await instance.get("/members/me/timeline");
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
