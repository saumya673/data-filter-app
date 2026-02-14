"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useActiveFilterStore } from "@/stores/filters/activeFilterStore";

export function ActiveFilterModal() {
  const open = useActiveFilterStore((s) => s.open);
  const close = useActiveFilterStore((s) => s.closeModal);

  const draft = useActiveFilterStore((s) => s.draft);
  const setDraft = useActiveFilterStore((s) => s.setDraft);

  const apply = useActiveFilterStore((s) => s.apply);
  const clear = useActiveFilterStore((s) => s.clear);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
      <DialogTitle>Active Status</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <ToggleButtonGroup
          value={draft.value}
          exclusive
          onChange={(_, v) => v && setDraft((p) => ({ ...p, value: v }))}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="inactive">Inactive</ToggleButton>
        </ToggleButtonGroup>
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
