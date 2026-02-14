import { useDynamicFilterStore } from "@/stores/dynamicFilterStore";
import { useEmployeeDataStore } from "@/stores/employeeDataStore";
import { FilterRow } from "./FilterRow";
import { Button, Stack, Typography, Box } from "@mui/material";
import { Plus } from "lucide-react";

export function FilterBuilder() {
  const {
    conditions,
    addCondition,
    removeCondition,
    updateCondition,
    clearAll,
  } = useDynamicFilterStore();
  const { employees } = useEmployeeDataStore();

  // Compute unique skills from employee data for dynamic filter options
  const skillOptions = Array.from(
    new Set(employees.flatMap((e) => e.skills || [])),
  ).sort();

  const dynamicOptions: Record<string, string[]> = {
    skills: skillOptions,
  };

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        bgcolor: "rgba(145, 162, 209, 0.66)",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">Dynamic Filters</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<Plus size={16} />}
            variant="contained"
            onClick={addCondition}
            sx={{ backgroundColor: "black" }}
          >
            Add Filter
          </Button>
          {conditions.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={clearAll}
              sx={{
                backgroundColor: "white",
                color: "black",
                borderColor: "black",
              }}
            >
              Clear All
            </Button>
          )}
        </Stack>
      </Stack>

      {conditions.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No filters applied. Click &quot;Add Filter&quot; to start.
        </Typography>
      ) : (
        conditions.map((c) => (
          <FilterRow
            key={c.id}
            condition={c}
            dynamicOptions={dynamicOptions}
            onUpdate={(patch) => updateCondition(c.id, patch)}
            onRemove={() => removeCondition(c.id)}
          />
        ))
      )}
    </Box>
  );
}
