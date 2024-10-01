import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
interface SearchType {
  state: string;
  title: string;
  date: string;
}
export const themeColor = atomWithStorage<string>("themeColor", "라이트 모드");
export const searchPrev = atomWithStorage<SearchType[]>("searchPrev", []);
export const searchData = atom<string>("");
export const searchBookmark = atom<any>([]);
export const searchDetailList = atom<any>(null);

export const myPageSetting = atom<string>("활동내역");

export const onBoardingAtom = atomWithStorage<boolean | null>(
  "onBoarding",
  null
);
export const tutorialAtom = atomWithStorage<boolean | null>("tutorial", null);

export const searchToggle = atom<string>("최근 검색");
