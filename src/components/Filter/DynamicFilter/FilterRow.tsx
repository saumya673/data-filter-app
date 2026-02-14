import { FilterCondition, Operator } from "@/types/filter";
import { AVAILABLE_FIELDS, OPERATORS_BY_TYPE } from "@/config/filterConfig";
import {
  Stack,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { FilterValueInput } from "./FilterValueInput";

interface FilterRowProps {
  condition: FilterCondition;
  dynamicOptions?: Record<string, string[]>;
  onUpdate: (patch: Partial<FilterCondition>) => void;
  onRemove: () => void;
}

export function FilterRow({
  condition,
  dynamicOptions,
  onUpdate,
  onRemove,
}: FilterRowProps) {
  const selectedField = AVAILABLE_FIELDS.find(
    (f) => f.id === condition.fieldId,
  );

  const handleFieldChange = (fieldId: string) => {
    const field = AVAILABLE_FIELDS.find((f) => f.id === fieldId);
    if (!field) return;

    // Reset operator and value when field changes to a new type
    const availableOps = OPERATORS_BY_TYPE[field.type] || [];
    const defaultOp = availableOps[0]?.value || "equals";

    onUpdate({
      fieldId,
      operator: defaultOp,
      value:
        field.type === "multi-select" ||
        (field.type === "number" && defaultOp === "between") ||
        (field.type === "date" && defaultOp === "date_between")
          ? []
          : "",
    });
  };

  const availableOps = selectedField
    ? OPERATORS_BY_TYPE[selectedField.type]
    : [];

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        mb: 2,
        p: 2,
        border: "1px solid #eee",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      {/* Field Selector */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel sx={{ fontWeight: "bold" }}>Field</InputLabel>
        <Select
          value={condition.fieldId}
          label="Field"
          onChange={(e) => handleFieldChange(e.target.value)}
        >
          {AVAILABLE_FIELDS.map((f) => (
            <MenuItem key={f.id} value={f.id}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Operator Selector */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel sx={{ fontWeight: "bold" }}>Operator</InputLabel>
        <Select
          value={condition.operator}
          label="Operator"
          onChange={(e) => onUpdate({ operator: e.target.value as Operator })}
          disabled={!condition.fieldId}
        >
          {availableOps?.map((op) => (
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Value Input */}
      <div style={{ flex: 1 }}>
        <FilterValueInput
          condition={condition}
          dynamicOptions={dynamicOptions}
          onChange={(val) => onUpdate({ value: val })}
        />
      </div>

      <IconButton onClick={onRemove} color="error">
        <Trash2 size={20} />
      </IconButton>
    </Stack>
  );
}
