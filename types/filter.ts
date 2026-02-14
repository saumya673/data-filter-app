export type FieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "single-select"
  | "multi-select";

export type Operator =
  // Text
  | "equals"
  | "contains"
  | "starts_with"
  | "ends_with"
  | "does_not_contain"
  // Number
  | "eq"
  | "neq"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "between"
  // Date
  | "date_is"
  | "date_before"
  | "date_after"
  | "date_between"
  // Array / Multi-select
  | "includes_all"
  | "includes_any"
  | "does_not_include";

export interface FilterCondition {
  id: string;
  fieldId: string;
  operator: Operator;
  value: any; // string | number | [min, max] | string[]
}

export interface FilterFieldConfig {
  id: string;
  label: string;
  type: FieldType;
  path: string; // "department" or "address.city"
  options?: string[]; // For select types
}
