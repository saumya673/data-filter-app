import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";

export const useSalaryFilterStore = createFilterModalStore<{
  min?: number;
  max?: number;
  sliderMin: number;
  sliderMax: number;
  step: number;
}>({
  min: undefined,
  max: undefined,
  sliderMin: 0,
  sliderMax: 200000,
  step: 1000,
});
