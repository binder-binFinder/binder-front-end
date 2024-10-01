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

export const getMyBookmark = async (x: number, y: number, id: number = -1) => {
  try {
    if (id !== -1) {
      const res = await instance.get(
        `/bookmarks/all?longitude=${y}&latitude=${x}&lastId=${id}`
      );
      return res.data;
    } else {
      const res = await instance.get(
        `/bookmarks/all?longitude=${y}&latitude=${x}`
      );
      return res.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
