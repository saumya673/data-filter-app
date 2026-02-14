import { create } from "zustand";
import type { EmployeeDataResponse } from "@/schema/employee-data-response";

type State = {
  employees: EmployeeDataResponse;
  isLoading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;

  // Manual setters for sync with hooks/SWR
  setEmployees: (data: EmployeeDataResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useEmployeeDataStore = create<State>((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const url = import.meta.env.VITE_API_URL;
      if (!url) {
        throw new Error("API URL not configured");
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      set({ employees: data as EmployeeDataResponse, isLoading: false });
    } catch (err) {
      console.error("Error fetching employees:", err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error"
      });
    }
  },

  setEmployees: (data) => set({ employees: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
