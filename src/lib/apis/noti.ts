import { instance } from "./axios";

export const getNoti = async (id: number = -1) => {
  try {
    if (id !== -1) {
      const res = await instance.get(`/notifications?lastId=${id}`);
      return res.data;
    } else {
      const res = await instance.get(`/notifications`);
      return res.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const readNoti = async () => {
  try {
    const res = await instance.post("/notifications/read-all");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
