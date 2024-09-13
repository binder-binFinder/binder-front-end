import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
interface SearchType {
  state: string;
  title: string;
  date: string;
}
export const searchPrev = atomWithStorage<SearchType[]>("searchPrev", []);

export const myPageSetting = atom<string>("활동내역");
