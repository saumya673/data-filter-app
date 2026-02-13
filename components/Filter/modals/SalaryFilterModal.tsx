"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Slider,
  Typography,
} from "@mui/material";
import { useSalaryFilterStore } from "@/stores/filters/salaryFilterStore";

export function SalaryFilterModal() {
  const open = useSalaryFilterStore((s) => s.open);
  const close = useSalaryFilterStore((s) => s.closeModal);

  const draft = useSalaryFilterStore((s) => s.draft);
  const setDraft = useSalaryFilterStore((s) => s.setDraft);

  const apply = useSalaryFilterStore((s) => s.apply);
  const clear = useSalaryFilterStore((s) => s.clear);

  const min = draft.min ?? draft.sliderMin;
  const max = draft.max ?? draft.sliderMax;

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Salary</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Range
        </Typography>

        <Slider
          value={[min, max]}
          onChange={(_, v) => {
            const [a, b] = v as number[];
            setDraft((p) => ({ ...p, min: a, max: b }));
          }}
          min={draft.sliderMin}
          max={draft.sliderMax}
          step={draft.step}
          valueLabelDisplay="auto"
        />

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <TextField
            label="Min"
            type="number"
            value={draft.min ?? ""}
            onChange={(e) =>
              setDraft((p) => ({
                ...p,
                min: e.target.value === "" ? undefined : Number(e.target.value),
              }))
            }
            fullWidth
          />
          <TextField
            label="Max"
            type="number"
            value={draft.max ?? ""}
            onChange={(e) =>
              setDraft((p) => ({
                ...p,
                max: e.target.value === "" ? undefined : Number(e.target.value),
              }))
            }
            fullWidth
          />
        </Stack>
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
