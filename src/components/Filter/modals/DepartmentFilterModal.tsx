"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useDepartmentFilterStore } from "@/stores/filters/departmentFilterStore";

export function DepartmentFilterModal() {
  const open = useDepartmentFilterStore((s) => s.open);
  const close = useDepartmentFilterStore((s) => s.closeModal);

  const draft = useDepartmentFilterStore((s) => s.draft);
  const setSelected = useDepartmentFilterStore((s) => s.setSelected);
  const addOption = useDepartmentFilterStore((s) => s.addOption);

  const apply = useDepartmentFilterStore((s) => s.apply);
  const clear = useDepartmentFilterStore((s) => s.clear);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Department</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Autocomplete
          multiple
          freeSolo
          options={draft.options}
          value={draft.selected}
          onChange={(_, values) => {
            values.forEach((v) => addOption(v));
            setSelected(values);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select or type to add"
              placeholder="engineering, hr..."
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clear}>Clear</Button>
        <Button variant="contained" onClick={apply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
