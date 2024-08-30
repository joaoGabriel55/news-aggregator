import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchFilters } from "@/hooks/use-search-filters";
import { SearchIcon } from "lucide-react";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";
import { APISourcesSelector } from "./api-sources-selector";

export function Search() {
  const {
    query,
    setQuery,
    date,
    selectedCategories,
    handleSelectedCategory,
    handleDateChange,
    handleSubmitSearch,
    handleClearSearch,
  } = useSearchFilters();

  return (
    <div className="md:flex md:flex-col w-full gap-4 px-4">
      <APISourcesSelector />
      <div className="flex flex-col w-full max-w-xl gap-4">
        <Input
          className="text-black"
          type="email"
          placeholder="Search for articles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmitSearch();
            }
          }}
        />
        {query || selectedCategories.length ? (
          <FilterByDate date={date} setDate={handleDateChange} />
        ) : null}
      </div>
      <FilterByCategory
        selectedCategories={selectedCategories}
        onSelectCategory={handleSelectedCategory}
      />
      <Button
        onClick={handleSubmitSearch}
        variant="default"
        className="bg-red-500 text-white hover:bg-red-600 w-full transition duration-300"
      >
        Search
        <SearchIcon className="w-5 h-5 ml-2" />
      </Button>
      <Button
        onClick={handleClearSearch}
        className="text-red-500 text-center mx-auto"
      >
        Clear all filters
      </Button>
    </div>
  );
}
