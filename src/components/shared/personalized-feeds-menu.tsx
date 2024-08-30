import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchFilters } from "@/hooks/use-search-filters";
import { DeleteIcon, XIcon } from "lucide-react";
import { useState } from "react";

export function PersonalizedFeedsMenu({
  personalizedFeeds,
  onSelectFeed,
  onDeleteFeed,
}: {
  personalizedFeeds: Record<string, SearchFilters>;
  onSelectFeed: (feedName: string) => void;
  onDeleteFeed: (feedName: string) => void;
}) {
  const [selectedFeed, setSelectedFeed] = useState<string>("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">My Personalized Feeds</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Feeds</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(personalizedFeeds).map((feedName) => (
          <div key={feedName} className="flex justify-between gap-1">
            <DropdownMenuCheckboxItem
              className="cursor-pointer"
              checked={selectedFeed === feedName}
              onCheckedChange={() => {
                setSelectedFeed(feedName);
                onSelectFeed(feedName);
              }}
            >
              {feedName}
            </DropdownMenuCheckboxItem>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onDeleteFeed(feedName);
              }}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
