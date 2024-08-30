import {
  BriefcaseIcon,
  Building2Icon,
  ClapperboardIcon,
  CpuIcon,
  TrophyIcon,
} from "lucide-react";

export const categories = [
  {
    name: "Politics",
    value: "politics",
    Icon: BriefcaseIcon,
  },
  {
    name: "Sports",
    value: "sports",
    Icon: TrophyIcon,
  },
  {
    name: "Technology",
    value: "technology",
    Icon: CpuIcon,
  },
  {
    name: "Business",
    value: "business",
    Icon: Building2Icon,
  },
  {
    name: "Entertainment",
    value: "entertainment",
    Icon: ClapperboardIcon,
  },
] as const;
