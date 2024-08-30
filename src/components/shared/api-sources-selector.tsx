import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APISources, sources } from "@/hooks/use-news-articles";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function APISourcesSelector() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [source, setSource] = useState<APISources>("newsapi-org");

  useEffect(() => {
    setSearchParams({ source });
    setSource((searchParams.get("source") || "newsapi-org") as APISources);
  }, []);

  function handleSourceChange(source: APISources) {
    setSearchParams({ source });
    setSource(source);
  }

  return (
    <Select defaultValue="newsapi-org" onValueChange={handleSourceChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a source" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {Object.keys(sources).map((source) => (
          <SelectItem key={source} value={source}>
            {source}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
