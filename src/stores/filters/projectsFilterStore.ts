import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";

export const useProjectsFilterStore = createFilterModalStore<{
  mode: "range" | "exact";
  min: number;
  max: number;
  exact?: number;
}>({
  mode: "range",
  min: 1,
  max: 100,
  exact: undefined,
});
