import { FilterCondition } from "@/types/filter";
import { AVAILABLE_FIELDS } from "@/config/filterConfig";
import { TextField, Select, MenuItem, Stack, Checkbox, ListItemText, FormControl, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface FilterValueInputProps {
    condition: FilterCondition;
    dynamicOptions?: Record<string, string[]>;
    onChange: (value: any) => void;
}

export function FilterValueInput({ condition, dynamicOptions, onChange }: FilterValueInputProps) {
    const field = AVAILABLE_FIELDS.find((f) => f.id === condition.fieldId);
    const operator = condition.operator;

    if (!field) return null;

    // --- Boolean ---
    if (field.type === "boolean") {
        return (
            <Select
                size="small"
                value={String(condition.value)}
                onChange={(e) => onChange(e.target.value === "true")}
                sx={{ minWidth: 100 }}
            >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
            </Select>
        );
    }

    // --- Date ---
    if (field.type === "date") {
        const isRange = operator === "date_between";

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={1}>
                    {isRange ? (
                        <>
                            <DatePicker
                                label="Start"
                                value={condition.value?.[0] ? dayjs(condition.value[0]) : null}
                                onChange={(newValue) => {
                                    const start = newValue ? newValue.format("YYYY-MM-DD") : "";
                                    const end = condition.value?.[1] || "";
                                    onChange([start, end]);
                                }}
                                slotProps={{ textField: { size: "small" } }}
                            />
                            <DatePicker
                                label="End"
                                value={condition.value?.[1] ? dayjs(condition.value[1]) : null}
                                onChange={(newValue) => {
                                    const start = condition.value?.[0] || "";
                                    const end = newValue ? newValue.format("YYYY-MM-DD") : "";
                                    onChange([start, end]);
                                }}
                                slotProps={{ textField: { size: "small" } }}
                            />
                        </>
                    ) : (
                        <DatePicker
                            label="Date"
                            value={condition.value ? dayjs(condition.value) : null}
                            onChange={(newValue) => onChange(newValue ? newValue.format("YYYY-MM-DD") : "")}
                            slotProps={{ textField: { size: "small" } }}
                        />
                    )}
                </Stack>
            </LocalizationProvider>
        );
    }

    // --- Single Select ---
    if (field.type === "single-select" && field.options) {
        return (
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Value</InputLabel>
                <Select
                    value={condition.value || ""}
                    label="Value"
                    onChange={(e) => onChange(e.target.value)}
                >
                    {field.options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    // --- Multi Select ---
    if (field.type === "multi-select" && field.options) {
        const currentVal = Array.isArray(condition.value) ? condition.value : [];
        return (
            <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Values</InputLabel>
                <Select
                    multiple
                    value={currentVal}
                    label="Values"
                    onChange={(e) => onChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    renderValue={(selected) => (selected as string[]).join(", ")}
                >
                    {(dynamicOptions?.[field.id] || field.options || []).map((opt) => (
                        <MenuItem key={opt} value={opt}>
                            <Checkbox checked={currentVal.indexOf(opt) > -1} />
                            <ListItemText primary={opt} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    // --- Number Between ---
    if (field.type === "number" && operator === "between") {
        return (
            <Stack direction="row" spacing={1}>
                <TextField
                    size="small"
                    type="number"
                    label="Min"
                    value={condition.value?.[0] ?? ""}
                    onChange={(e) => {
                        const min = e.target.value;
                        const max = condition.value?.[1] ?? "";
                        onChange([min, max]);
                    }}
                    sx={{ width: 100 }}
                />
                <TextField
                    size="small"
                    type="number"
                    label="Max"
                    value={condition.value?.[1] ?? ""}
                    onChange={(e) => {
                        const min = condition.value?.[0] ?? "";
                        const max = e.target.value;
                        onChange([min, max]);
                    }}
                    sx={{ width: 100 }}
                />
            </Stack>
        );
    }

    // --- Default (Text / Simple Number) ---
    return (
        <TextField
            size="small"
            type={field.type === "number" ? "number" : "text"}
            value={condition.value || ""}
            onChange={(e) => onChange(e.target.value)}
            label="Value"
            fullWidth
        />
    );
}
