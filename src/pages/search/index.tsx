import SearchInput from "@/components/domains/search/SearchInput";
import SearchItems from "@/components/domains/search/SearchItems";
import SearchToggle from "@/components/domains/search/SearchToggle";

export default function Search() {
  return (
    <>
      <SearchInput />
      <SearchToggle />
      <SearchItems />
    </>
  );
}
