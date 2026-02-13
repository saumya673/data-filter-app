import { create } from "zustand";

export type FilterModalStore<T> = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;

  draft: T;
  applied: T;

  setDraft: (updater: T | ((prev: T) => T)) => void;
  apply: () => void;
  clear: () => void;
};

type Updater<T> = T | ((prev: T) => T);

export function createFilterModalStore<T extends object | string | number | boolean | null>(initial: T) {
  return create<FilterModalStore<T>>((set, get) => ({
    open: false,
    openModal: () => set({ open: true }),
    closeModal: () => set({ open: false }),

    draft: initial,
    applied: initial,

    setDraft: (updater: Updater<T>) =>
      set((s) => ({
        draft:
          typeof updater === "function"
            ? (updater as (prev: T) => T)(s.draft)
            : updater,
      })),

    apply: () => set({ applied: get().draft, open: false }),
    clear: () => set({ draft: initial, applied: initial }),
  }));
}
