import { Input } from "@/components/ui/input";

export function FilterByDate({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm font-medium">From:</p>
      <Input
        className="w-fit"
        type="date"
        name="from"
        max={new Date().toISOString().split("T")[0]}
        value={date?.toISOString().split("T")[0] || ""}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
    </div>
  );
}
