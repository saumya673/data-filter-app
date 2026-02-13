import { createFilterModalStore } from "@/stores/factories/createFilterModalStore";

export const useNameEmailFilterStore = createFilterModalStore<{ query: string }>({
  query: "",
});
