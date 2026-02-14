import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";

export const useActiveFilterStore = createFilterModalStore<{
  value: "all" | "active" | "inactive";
}>({
  value: "all",
});