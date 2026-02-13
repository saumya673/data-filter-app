import { create } from "zustand";

export type DatePreset = "last2weeks" | "last1month" | "all" | "custom";

export type EmployeeFilters = {
  // 1) Name/email
  query: string;

  // 2) Department + ability to add
  departmentOptions: string[];
  departments: string[]; // selected

  // 3) Role + ability to add
  roleOptions: string[];
  roles: string[]; // selected

  // 4) Salary range
  salaryMin?: number;
  salaryMax?: number;

  // 5) Join date
  joinPreset: DatePreset;
  joinFromMs?: number;
  joinToMs?: number;

  // 6) Active
  active: "all" | "active" | "inactive";

  // 7) Projects
  projectsMode: "range" | "exact";
  projectsMin: number;
  projectsMax: number;
  projectsExact?: number;

  // 8) Last review date
  reviewPreset: DatePreset;
  reviewFromMs?: number;
  reviewToMs?: number;

  // 9) Performance rating
  perfMode: "range" | "exact";
  perfMin: number; // 1-5
  perfMax: number; // 1-5
  perfExact?: number;
};

const DEFAULT_DEPTS = ["engineering", "hr", "sales", "finance", "support", "marketing"];
const DEFAULT_ROLES = [
  "Senior Developer",
  "Frontend Developer",
  "Backend Developer",
  "HR Manager",
  "Account Executive",
  "Financial Analyst",
  "Devops Engineer",
  "QA Engineer",
];

function presetToRangeMs(preset: DatePreset): { fromMs?: number; toMs?: number } {
  if (preset === "all") return {};
  const toMs = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const fromMs =
    preset === "last2weeks" ? toMs - 14 * day :
    preset === "last1month" ? toMs - 30 * day :
    undefined;
  return { fromMs, toMs };
}

export const initialFilters: EmployeeFilters = {
  query: "",

  departmentOptions: DEFAULT_DEPTS,
  departments: [],

  roleOptions: DEFAULT_ROLES,
  roles: [],

  salaryMin: undefined,
  salaryMax: undefined,

  joinPreset: "last2weeks",
  ...presetToRangeMs("last2weeks"),

  active: "all",

  projectsMode: "range",
  projectsMin: 1,
  projectsMax: 100,
  projectsExact: undefined,

  reviewPreset: "all",
  ...presetToRangeMs("all"),

  perfMode: "range",
  perfMin: 1,
  perfMax: 5,
  perfExact: undefined,
};

type FiltersStore = {
  draft: EmployeeFilters;
  applied: EmployeeFilters;

  // update draft
  setDraft: (patch: Partial<EmployeeFilters>) => void;

  // special helpers for options
  addDepartmentOption: (dept: string) => void;
  addRoleOption: (role: string) => void;
  setJoinPreset: (p: DatePreset) => void;
  setReviewPreset: (p: DatePreset) => void;

  // main buttons
  applyAll: () => void;
  clearAll: () => void;
};

export const useEmployeeFiltersStore = create<FiltersStore>((set, get) => ({
  draft: initialFilters,
  applied: initialFilters,

  setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),

  addDepartmentOption: (dept) => {
    const d = dept.trim();
    if (!d) return;
    set((s) => {
      if (s.draft.departmentOptions.includes(d)) return s;
      return {
        draft: { ...s.draft, departmentOptions: [...s.draft.departmentOptions, d] },
        applied: s.applied,
      };
    });
  },

  addRoleOption: (role) => {
    const r = role.trim();
    if (!r) return;
    set((s) => {
      if (s.draft.roleOptions.includes(r)) return s;
      return {
        draft: { ...s.draft, roleOptions: [...s.draft.roleOptions, r] },
        applied: s.applied,
      };
    });
  },

  setJoinPreset: (p) => set((s) => ({
    draft: { ...s.draft, joinPreset: p, ...presetToRangeMs(p) },
  })),

  setReviewPreset: (p) => set((s) => ({
    draft: { ...s.draft, reviewPreset: p, ...presetToRangeMs(p) },
  })),

  applyAll: () => set({ applied: get().draft }),
  clearAll: () => set({ draft: initialFilters, applied: initialFilters }),
}));
