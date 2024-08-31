import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { APISources } from "@/hooks/use-news-articles";
import { usePersonalizedFeeds } from "@/hooks/use-personalized-feeds";
import { useSearchFilters } from "@/hooks/use-search-filters";
import { SearchIcon } from "lucide-react";
import { APISourcesSelector } from "./api-sources-selector";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";
import { NewPersonalizedFeedDialog } from "./new-personalized-feed-dialog";
import { PersonalizedFeedsMenu } from "./personalized-feeds-menu";

function SearchBar({
  value,
  setValue,
  onSubmit,
}: {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <Input
      className="text-black"
      type="email"
      placeholder="Search for articles"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSubmit();
        }
      }}
    />
  );
}

export function Search() {
  const {
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
  } = useSearchFilters();

  const {
    personalizedFeeds,
    applyPersonalizedFeed,
    getPersonalizedFeed,
    savePersonalizedFeed,
    deletePersonalizedFeed,
  } = usePersonalizedFeeds();

  function handleSelectFeed(feedName: string) {
    applyPersonalizedFeed(feedName);
    updateSearchFiltersState(getPersonalizedFeed(feedName));
  }

  function handleSavePersonalizedFeed(feedName: string) {
    savePersonalizedFeed({
      feedName,
      source: source || "",
      query,
      from: new Date(from).toISOString(),
      categories: selectedCategories,
    });
  }

  return (
    <>
      <div className="hidden md:flex flex-col w-full gap-4 px-4">
        <PersonalizedFeedsMenu
          personalizedFeeds={personalizedFeeds}
          onSelectFeed={handleSelectFeed}
          onDeleteFeed={deletePersonalizedFeed}
        />
        <APISourcesSelector
          source={source as APISources}
          onSourceChange={setSource}
        />
        <SearchBar
          value={query}
          setValue={setQuery}
          onSubmit={handleSubmitSearch}
        />
        {query || selectedCategories.length ? (
          <FilterByDate date={from} setDate={handleDateChange} />
        ) : null}
        <FilterByCategory
          selectedCategories={selectedCategories}
          onSelectCategory={handleSelectedCategory}
        />
        <section className="flex flex-col w-full gap-2">
          <Button
            className="bg-red-500 text-white hover:bg-red-600 w-full transition duration-300"
            variant="default"
            disabled={!source}
            onClick={handleSubmitSearch}
          >
            Search
            <SearchIcon className="w-5 h-5 ml-2" />
          </Button>
          <NewPersonalizedFeedDialog onSubmit={handleSavePersonalizedFeed} />
          <Button
            onClick={handleClearSearch}
            className="text-center text-gray-500 mx-auto"
          >
            Clear all filters
          </Button>
        </section>
      </div>
      <div className="flex md:hidden flex-col w-full gap-4 px-4">
        <PersonalizedFeedsMenu
          personalizedFeeds={personalizedFeeds}
          onSelectFeed={handleSelectFeed}
          onDeleteFeed={deletePersonalizedFeed}
        />
        <Drawer>
          <DrawerTrigger className="w-full md:hidden" asChild>
            <Button className="w-full" variant="outline">
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col w-full gap-4 px-4">
                <APISourcesSelector
                  source={source as APISources}
                  onSourceChange={setSource}
                />
                <SearchBar
                  value={query}
                  setValue={setQuery}
                  onSubmit={handleSubmitSearch}
                />
                {query || selectedCategories.length ? (
                  <FilterByDate date={from} setDate={handleDateChange} />
                ) : null}
                <FilterByCategory
                  selectedCategories={selectedCategories}
                  onSelectCategory={handleSelectedCategory}
                />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600 w-full transition duration-300"
                    variant="default"
                    disabled={!source}
                    onClick={handleSubmitSearch}
                  >
                    Search
                    <SearchIcon className="w-5 h-5 ml-2" />
                  </Button>
                </DrawerClose>
                <NewPersonalizedFeedDialog
                  onSubmit={handleSavePersonalizedFeed}
                />
                <DrawerClose asChild>
                  <Button
                    onClick={handleClearSearch}
                    className="text-center text-gray-500 mx-auto"
                  >
                    Clear all filters
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
