import { PostAddbinValues } from "@/types/addFormTypes";
import { instance } from "./axios";

export const postAddbin = async (data: PostAddbinValues) => {
  try {
    const res = await instance.post("/bins", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error("Error posting bin data:", error);
    throw error;
  }
};

export const patchEditbin = async (id: string | number, data: any) => {
  try {
    const res = await instance.patch(`/bins/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error("Error posting bin data:", error);
    throw error;
  }
};
