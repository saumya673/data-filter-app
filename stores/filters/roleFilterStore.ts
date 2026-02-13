import { create } from "zustand";

type RoleState = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;

  draft: { options: string[]; selected: string[] };
  applied: { options: string[]; selected: string[] };

  setSelected: (selected: string[]) => void;
  addOption: (role: string) => void;

  apply: () => void;
  clear: () => void;
};

const DEFAULT_OPTIONS = [
  "Senior Developer",
  "Frontend Developer",
  "Backend Developer",
  "HR Manager",
  "Account Executive",
  "Financial Analyst",
  "Devops Engineer",
  "QA Engineer",
];

const initial = {
  options: DEFAULT_OPTIONS,
  selected: [] as string[],
};

export const useRoleFilterStore = create<RoleState>((set, get) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),

  draft: initial,
  applied: initial,

  setSelected: (selected) =>
    set((s) => ({ draft: { ...s.draft, selected } })),

  addOption: (role) =>
    set((s) => {
      const r = role.trim();
      if (!r) return s;
      if (s.draft.options.includes(r)) return s;
      return { draft: { ...s.draft, options: [...s.draft.options, r] } };
    }),

  apply: () => set({ applied: get().draft, open: false }),

  clear: () => set({ draft: initial, applied: initial }),
}));
