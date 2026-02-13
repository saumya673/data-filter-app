"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useNameEmailFilterStore } from "@/stores/filters/nameEmailFilterStore";

export function NameEmailFilterModal() {
  const open = useNameEmailFilterStore((s) => s.open);
  const close = useNameEmailFilterStore((s) => s.closeModal);

  const draft = useNameEmailFilterStore((s) => s.draft);
  const setDraft = useNameEmailFilterStore((s) => s.setDraft);

  const apply = useNameEmailFilterStore((s) => s.apply);
  const clear = useNameEmailFilterStore((s) => s.clear);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Name / Email</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <TextField
          fullWidth
          label="Search"
          value={draft.query}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, query: e.target.value }))
          }
          placeholder="Type name or email..."
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
