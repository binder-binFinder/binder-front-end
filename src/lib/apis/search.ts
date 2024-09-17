import { btnInputValues } from "../constants/btnInputValues";
import { instance } from "./axios";

type BinType = (typeof btnInputValues)[number]["id"];

export const getAroundbins = async (
  latitude: number,
  longitude: number,
  type: BinType | null,
  radius = 100
) => {
  try {
    const res = await instance.get("/search/bins", {
      params: {
        longitude,
        latitude,
        radius,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
