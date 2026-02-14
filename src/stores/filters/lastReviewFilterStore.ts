import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";
import type { DatePreset } from "./dateUtils";
import { presetToRangeMs } from "./dateUtils";

const preset: DatePreset = "all";

export const useLastReviewFilterStore = createFilterModalStore<{
  preset: DatePreset;
  fromMs?: number;
  toMs?: number;
}>({
  preset,
  ...presetToRangeMs(preset),
});
