import { atomWithStorage } from "jotai/utils";
interface SearchType {
  state: string;
  title: string;
  date: string;
}
export const searchPrev = atomWithStorage<SearchType[]>("searchPrev", []);
