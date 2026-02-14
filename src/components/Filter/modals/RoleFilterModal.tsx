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
import { useRoleFilterStore } from "@/stores/filters/roleFilterStore";

export function RoleFilterModal() {
  const open = useRoleFilterStore((s) => s.open);
  const close = useRoleFilterStore((s) => s.closeModal);

  const draft = useRoleFilterStore((s) => s.draft);
  const setSelected = useRoleFilterStore((s) => s.setSelected);
  const addOption = useRoleFilterStore((s) => s.addOption);

  const apply = useRoleFilterStore((s) => s.apply);
  const clear = useRoleFilterStore((s) => s.clear);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Role</DialogTitle>
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
              placeholder="Frontend Developer..."
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
