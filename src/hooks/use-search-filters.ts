import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const today = new Date().toISOString();

export type SearchFilters = {
  source: string | null;
  query: string;
  from: string;
  categories: string[];
};

export function useSearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [source, setSource] = useState(searchParams.get("source"));
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [from, setFrom] = useState<Date>(
    new Date(searchParams.get("from") || today)
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );

  function handleDateChange(from: Date) {
    setFrom(from);
  }

  function handleSubmitSearch() {
    setSearchParams({
      ...(source ? { source } : {}),
      ...(query ? { query } : {}),
      ...(from ? { from: from.toISOString() } : {}),
      ...(selectedCategories.length > 0
        ? { categories: selectedCategories.join(",") }
        : {}),
    });
  }

  function updateSearchFiltersState(searchFilters: SearchFilters) {
    setQuery(searchFilters.query);
    setSource(searchFilters.source);
    setSelectedCategories(searchFilters.categories);
    setFrom(new Date(searchFilters.from));
  }

  function handleClearSearch() {
    setSearchParams({});
    setQuery("");
    setSource(null);
    setSelectedCategories([]);
    setFrom(new Date(today));
  }

  function handleSelectedCategory(category: string) {
    setSelectedCategories((state) => {
      if (state.includes(category)) {
        return state.filter((item) => item !== category);
      }
      return [...state, category];
    });
  }

  return {
    source,
    setSource,
    query,
    setQuery,
    from,
    selectedCategories,
    handleSelectedCategory,
    handleDateChange,
    handleSubmitSearch,
    handleClearSearch,
    updateSearchFiltersState,
  };
}
