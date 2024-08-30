import { Newspaper } from "lucide-react";
import { SearchMobile } from "./search-mobile";

export function Header() {
  return (
    <header className="bg-white md:w-full  border-b shadow-sm sticky top-0 z-10">
      <div className="md:container w-full p-4 md:px-6 flex flex-col md:flex-row gap-4 items-center justify-between h-full md:h-16">
        <a href="#" className="flex items-center gap-2 text-lg font-bold text-red-500">
          <Newspaper className="w-6 h-6" />
          <span>News Aggregator</span>
        </a>
        <div className="md:hidden w-full">
          <SearchMobile />
        </div>
      </div>
    </header>
  );
}
