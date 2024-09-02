import { instance } from "./axios";

export async function getMembersMe() {
  try {
    const response = await instance.get("members/me", { headers: { "Content-Type": "application/json" } });
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.error("getError :", error);
    throw error;
  }
}
