import { EmployeeDataResponse } from "@/schema/employee-data-response";
import { FilterCondition, Operator } from "@/types/filter";
import { AVAILABLE_FIELDS } from "@/config/filterConfig";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

// Helper to get nested value
function getValue(obj: any, path: string): any {
    return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

export function evaluateCondition(row: any, condition: FilterCondition): boolean {
    if (!condition.fieldId) return true; // Incomplete condition ignored

    const fieldConfig = AVAILABLE_FIELDS.find((f) => f.id === condition.fieldId);
    if (!fieldConfig) return true;

    const value = getValue(row, fieldConfig.path);
    const { operator, value: filterValue } = condition;

    // Handle undefined/null values in data
    if (value === undefined || value === null) {
        // Some operators might explicitly look for empty/null, but for now return false
        return false;
    }

    switch (operator) {
        // --- Text ---
        case "contains":
            return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
        case "equals":
            return String(value).toLowerCase() === String(filterValue).toLowerCase();
        case "starts_with":
            return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
        case "ends_with":
            return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
        case "does_not_contain":
            return !String(value).toLowerCase().includes(String(filterValue).toLowerCase());

        // --- Number ---
        case "eq":
            return Number(value) === Number(filterValue);
        case "neq":
            return Number(value) !== Number(filterValue);
        case "gt":
            return Number(value) > Number(filterValue);
        case "gte":
            return Number(value) >= Number(filterValue);
        case "lt":
            return Number(value) < Number(filterValue);
        case "lte":
            return Number(value) <= Number(filterValue);
        case "between":
            if (Array.isArray(filterValue)) {
                const [min, max] = filterValue;
                return Number(value) >= Number(min) && Number(value) <= Number(max);
            }
            return false;

        // --- Date ---
        case "date_is":
            return dayjs(value).isSame(dayjs(filterValue as string), "day");
        case "date_before":
            return dayjs(value).isBefore(dayjs(filterValue as string), "day");
        case "date_after":
            return dayjs(value).isAfter(dayjs(filterValue as string), "day");
        case "date_between":
            if (Array.isArray(filterValue)) {
                const [start, end] = filterValue;
                return dayjs(value).isBetween(dayjs(start), dayjs(end), "day", "[]");
            }
            return false;

        // --- Boolean ---
        case "eq": // reusing eq for boolean
            return Boolean(value) === Boolean(filterValue);

        // --- Array / Multi-select ---
        case "includes_any":
            if (Array.isArray(value) && Array.isArray(filterValue)) {
                return filterValue.some((v: any) => value.includes(v));
            }
            return false;
        case "includes_all":
            if (Array.isArray(value) && Array.isArray(filterValue)) {
                return filterValue.every((v: any) => value.includes(v));
            }
            return false;
        case "does_not_include":
            if (Array.isArray(value) && Array.isArray(filterValue)) {
                return !filterValue.some((v: any) => value.includes(v));
            }
            return false;

        default:
            return true;
    }
}

export function filterEmployeesDynamic(
    rows: EmployeeDataResponse,
    conditions: FilterCondition[]
): EmployeeDataResponse {
    if (!conditions || conditions.length === 0) return rows;

    return rows.filter((row) => {
        // AND logic: All conditions must be true
        return conditions.every((condition) => evaluateCondition(row, condition));
    });
}
