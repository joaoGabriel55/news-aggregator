import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APISources, sources } from "@/hooks/use-news-articles";

export function APISourcesSelector({
  source,
  onSourceChange,
}: {
  source: APISources;
  onSourceChange: (source: APISources) => void;
}) {

  return (
    <Select value={source || ''} onValueChange={onSourceChange}>
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
