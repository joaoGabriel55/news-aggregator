import { Newspaper } from "lucide-react";
import { Search } from "./search";

export function Header() {
  return (
    <header className="bg-white md:w-full  border-b shadow-sm sticky top-0 z-10">
      <div className="md:container w-full p-4 md:px-6 flex flex-col md:flex-row gap-4 items-center justify-between h-full md:h-16">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 text-lg font-bold text-red-500">
            <Newspaper className="w-6 h-6" />
            <h1>News Aggregator</h1>
          </div>
        </div>
        <div className="md:hidden w-full">
          <Search />
        </div>
      </div>
    </header>
  );
}
