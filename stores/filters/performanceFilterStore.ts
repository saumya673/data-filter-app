import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";

export const usePerformanceFilterStore = createFilterModalStore<{
  mode: "range" | "exact";
  min: number;
  max: number;
  exact?: number;
}>({
  mode: "range",
  min: 1,
  max: 5,
  exact: undefined,
});
