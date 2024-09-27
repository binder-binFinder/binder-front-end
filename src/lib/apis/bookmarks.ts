import { instance } from "./axios";

export const postMyBookmark = async (id: number | string) => {
  try {
    const res = await instance.post(`/bookmarks`, { binId: id });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteMyBookmark = async (id: number | string) => {
  try {
    const res = await instance.delete(`/bookmarks/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMyBookmark = async (
  x: number,
  y: number,
  radius: number = 500
) => {
  try {
    const res = await instance.get(
      `/bookmarks/nearby?longitude=${y}&latitude=${x}&radius=${radius}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
