import { create } from "zustand";
import { FilterCondition } from "@/types/filter";
import { v4 as uuidv4 } from "uuid";

type DynamicFilterState = {
    conditions: FilterCondition[];
    addCondition: () => void;
    removeCondition: (id: string) => void;
    updateCondition: (id: string, patch: Partial<FilterCondition>) => void;
    clearAll: () => void;
    setConditions: (conditions: FilterCondition[]) => void;
};

export const useDynamicFilterStore = create<DynamicFilterState>((set) => ({
    conditions: [],

    addCondition: () => {
        set((state) => ({
            conditions: [
                ...state.conditions,
                {
                    id: uuidv4(),
                    fieldId: "", // User must select
                    operator: "contains", // Default, will change based on field
                    value: "",
                },
            ],
        }));
    },

    removeCondition: (id) => {
        set((state) => ({
            conditions: state.conditions.filter((c) => c.id !== id),
        }));
    },

    updateCondition: (id, patch) => {
        set((state) => ({
            conditions: state.conditions.map((c) =>
                c.id === id ? { ...c, ...patch } : c
            ),
        }));
    },

    clearAll: () => set({ conditions: [] }),

    setConditions: (conditions) => set({ conditions }),
}));
