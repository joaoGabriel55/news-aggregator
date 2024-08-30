import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APISources, sources } from "@/hooks/use-news-articles";
import { Label } from "@/components/ui/label";

export function APISourcesSelector({
  source,
  onSourceChange,
}: {
  source: APISources;
  onSourceChange: (source: APISources) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Select a source</Label>
      <Select value={source || ""} onValueChange={onSourceChange}>
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
    </div>
  );
}
