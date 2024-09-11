import { instance } from "./axios";

export const getBinsId = async (id: any) => {
  try {
    const res = await instance.get(`/bins/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
