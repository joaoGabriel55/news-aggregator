import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APISources } from "@/hooks/use-news-articles";
import { useSearchFilters } from "@/hooks/use-search-filters";
import { SearchIcon } from "lucide-react";
import { APISourcesSelector } from "./api-sources-selector";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";

export function Search() {
  const {
    source,
    setSource,
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
    <div className="flex flex-col w-full gap-4 px-4">
      <APISourcesSelector
        source={source as APISources}
        onSourceChange={setSource}
      />
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
      <Accordion type="single" className="w-full md:hidden" collapsible>
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
      <div className="hidden md:block">
        <FilterByCategory
          selectedCategories={selectedCategories}
          onSelectCategory={handleSelectedCategory}
        />
      </div>
      <Button
        className="bg-red-500 text-white hover:bg-red-600 w-full transition duration-300"
        variant="default"
        disabled={!source}
        onClick={handleSubmitSearch}
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
