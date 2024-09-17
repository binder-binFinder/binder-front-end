import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

//추후 수정
export const mapCenterCoordinate = atom<{ x: 0; y: 0 }>({ x: 0, y: 0 });
export const adminUser = atom<string>("");
export const loginState = atomWithStorage<boolean>("loginState", false);

//user 위치, 초기 위치 (0,0)
export const userCoordinate = atomWithStorage("coordinate", { x: 0, y: 0 });
export const userAddress = atomWithStorage<{
  roadAddress: null | string;
  address: string;
}>("address", {
  roadAddress: null,
  address: "",
});
