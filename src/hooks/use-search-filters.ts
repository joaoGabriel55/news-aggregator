import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const today = new Date().toISOString();

export function useSearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [date, setDate] = useState<Date>(
    new Date(searchParams.get("from") || today)
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );

  useEffect(() => {
    if (!query) {
      setSearchParams({});
    }
  }, [query]);

  function handleDateChange(date: Date) {
    setDate(date);
  }

  function handleSubmitSearch() {
    const source = searchParams.get("source");

    setSearchParams({
      ...(source ? { source } : {}),
      ...(query ? { query, from: date.toISOString() } : {}),
      ...(selectedCategories.length > 0
        ? { categories: selectedCategories.join(",") }
        : {}),
    });
  }

  function handleClearSearch() {
    setSearchParams({});
    setQuery("");
    setSelectedCategories([]);
    setDate(new Date(today));
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
    query,
    setQuery,
    date,
    selectedCategories,
    handleSelectedCategory,
    handleDateChange,
    handleSubmitSearch,
    handleClearSearch,
  };
}
