import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";
import type { DatePreset } from "./dateUtils";
import { presetToRangeMs } from "./dateUtils";

export type JoinDateFilter = {
  preset: DatePreset;
  fromMs?: number;
  toMs?: number;
};

// what user sees when they open the modal
const initialDraft: JoinDateFilter = {
  preset: "last2weeks",
  ...presetToRangeMs("last2weeks"),
};

// what is actually applied on page load
const initialApplied: JoinDateFilter = {
  preset: "all",
  ...presetToRangeMs("all"), // => {}
};

export const useJoinDateFilterStore = createFilterModalStore<JoinDateFilter>(initialDraft);

// override applied default once (safe for zustand store files)
useJoinDateFilterStore.setState({ applied: initialApplied });
