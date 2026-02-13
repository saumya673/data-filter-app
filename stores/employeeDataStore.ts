import { create } from "zustand";
import type { EmployeeDataResponse } from "@/schema/employee-data-response";

type State = {
  employees: EmployeeDataResponse;
  isLoading: boolean;
  setEmployees: (rows: EmployeeDataResponse) => void;
  setLoading: (v: boolean) => void;
};

export const useEmployeeDataStore = create<State>((set) => ({
  employees: [],
  isLoading: false,
  setEmployees: (rows) => set({ employees: rows }),
  setLoading: (v) => set({ isLoading: v }),
}));
