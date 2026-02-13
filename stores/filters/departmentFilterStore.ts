import { create } from "zustand";

type DeptState = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;

  draft: { options: string[]; selected: string[] };
  applied: { options: string[]; selected: string[] };

  setSelected: (selected: string[]) => void;
  addOption: (dept: string) => void;

  apply: () => void;
  clear: () => void;
};

const DEFAULT_OPTIONS = ["engineering", "hr", "sales", "finance", "support", "marketing"];

const initial = {
  options: DEFAULT_OPTIONS,
  selected: [] as string[],
};

export const useDepartmentFilterStore = create<DeptState>((set, get) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),

  draft: initial,
  applied: initial,

  setSelected: (selected) =>
    set((s) => ({ draft: { ...s.draft, selected } })),

  addOption: (dept) =>
    set((s) => {
      const d = dept.trim();
      if (!d) return s;
      if (s.draft.options.includes(d)) return s;
      return { draft: { ...s.draft, options: [...s.draft.options, d] } };
    }),

  apply: () => set({ applied: get().draft, open: false }),

  clear: () => set({ draft: initial, applied: initial }),
}));
