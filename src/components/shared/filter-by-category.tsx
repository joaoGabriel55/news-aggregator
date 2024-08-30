import { categories } from "@/constants/categories";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FilterByCategory({
  selectedCategories,
  onSelectCategory,
}: {
  selectedCategories: string[];
  onSelectCategory: (category: string) => void;
}) {
  return (
    <section>
      <h3 className="hidden md:block text-base font-semibold mb-4">Filter by Category</h3>
      <div className="flex flex-wrap md:flex-nowrap md:flex-col gap-2 items-center">
        {categories.map(({ name, value, Icon }) => (
          <Button
            key={value}
            className={cn(
              "flex items-center justify-start gap-2 p-2 w-full font-normal transition duration-300 rounded-lg",
              selectedCategories.includes(value) && "bg-red-300"
            )}
            onClick={() => onSelectCategory(value)}
          >
            <Icon className="w-4 h-4" />
            {name}
          </Button>
        ))}
      </div>
    </section>
  );
}
