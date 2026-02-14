import { FilterFieldConfig, Operator } from "@/types/filter";

export const AVAILABLE_FIELDS: FilterFieldConfig[] = [
    { id: "name", label: "Name", type: "text", path: "name" },
    { id: "email", label: "Email", type: "text", path: "email" },
    { id: "department", label: "Department", type: "single-select", path: "department", options: ["Engineering", "HR", "Sales", "Finance", "Support", "Marketing"] },
    { id: "role", label: "Role", type: "text", path: "role" },
    { id: "salary", label: "Salary", type: "number", path: "salary" },
    { id: "joinDate", label: "Join Date", type: "date", path: "joinDate" },
    { id: "active", label: "Active Status", type: "boolean", path: "isActive" },
    {
        id: "skills",
        label: "Skills",
        type: "multi-select",
        path: "skills",
        options: []
    },
    { id: "projects", label: "Projects Delivered", type: "number", path: "projects" },
    { id: "city", label: "City", type: "text", path: "address.city" },
    { id: "country", label: "Country", type: "text", path: "address.country" },
];

export const OPERATORS_BY_TYPE: Record<string, { value: Operator; label: string }[]> = {
    text: [
        { value: "contains", label: "Contains" },
        { value: "equals", label: "Equals" },
        { value: "starts_with", label: "Starts With" },
        { value: "ends_with", label: "Ends With" },
        { value: "does_not_contain", label: "Does Not Contain" },
    ],
    number: [
        { value: "eq", label: "=" },
        { value: "neq", label: "!=" },
        { value: "gt", label: ">" },
        { value: "gte", label: ">=" },
        { value: "lt", label: "<" },
        { value: "lte", label: "<=" },
        { value: "between", label: "Between" },
    ],
    date: [
        { value: "date_is", label: "Is" },
        { value: "date_before", label: "Before" },
        { value: "date_after", label: "After" },
        { value: "date_between", label: "Between" },
    ],
    boolean: [
        { value: "bool_eq", label: "Is" },
    ],
    "single-select": [
        { value: "equals", label: "Is" },
        { value: "neq", label: "Is Not" },
    ],
    "multi-select": [
        { value: "includes_any", label: "Includes Any" },
        { value: "includes_all", label: "Includes All" },
        { value: "does_not_include", label: "Does Not Include" },
    ],
};
