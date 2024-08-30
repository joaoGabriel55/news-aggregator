import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchFilters } from "@/hooks/use-search-filters";
import { SearchIcon } from "lucide-react";
import { APISourcesSelector } from "./api-sources-selector";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";

export function SearchMobile() {
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
    <div className="flex flex-col gap-4 px-4">
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
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline">
            Filter by Category
          </AccordionTrigger>
          <AccordionContent>
            <FilterByCategory
              selectedCategories={selectedCategories}
              onSelectCategory={handleSelectedCategory}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        onClick={handleSubmitSearch}
        variant="default"
        className="bg-red-500 text-white hover:bg-red-600 w-full transition duration-300"
      >
        Search
        <SearchIcon className="w-5 h-5 ml-2" />
      </Button>
      <Button onClick={handleClearSearch} className="text-red-500 self-end">
        Clear all filters
      </Button>
    </div>
  );
}
