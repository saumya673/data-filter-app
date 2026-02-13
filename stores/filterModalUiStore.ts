import { create } from "zustand";

type ModalKey =
  | null
  | "nameEmail"
  | "department"
  | "role"
  | "salary"
  | "joinDate"
  | "active"
  | "projects"
  | "lastReview"
  | "performance";

export const useFilterModalUiStore = create<{
  activeModal: ModalKey;
  open: (k: ModalKey) => void;
  close: () => void;
}>((set) => ({
  activeModal: null,
  open: (k) => set({ activeModal: k }),
  close: () => set({ activeModal: null }),
}));
