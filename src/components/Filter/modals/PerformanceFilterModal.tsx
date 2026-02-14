"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Stack,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { usePerformanceFilterStore } from "@/stores/filters/performanceFilterStore";

export function PerformanceFilterModal() {
  const open = usePerformanceFilterStore((s) => s.open);
  const close = usePerformanceFilterStore((s) => s.closeModal);

  const draft = usePerformanceFilterStore((s) => s.draft);
  const setDraft = usePerformanceFilterStore((s) => s.setDraft);

  const apply = usePerformanceFilterStore((s) => s.apply);
  const clear = usePerformanceFilterStore((s) => s.clear);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Performance Rating</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <ToggleButtonGroup
          value={draft.mode}
          exclusive
          onChange={(_, v) => v && setDraft((p) => ({ ...p, mode: v }))}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="range">Range</ToggleButton>
          <ToggleButton value="exact">Exact</ToggleButton>
        </ToggleButtonGroup>

        {draft.mode === "exact" ? (
          <TextField
            fullWidth
            label="Exact rating (decimal allowed)"
            type="number"
            inputProps={{ step: "0.1", min: 1, max: 5 }}
            value={draft.exact ?? ""}
            onChange={(e) =>
              setDraft((p) => ({
                ...p,
                exact:
                  e.target.value === "" ? undefined : Number(e.target.value),
              }))
            }
          />
        ) : (
          <>
            <Slider
              value={[draft.min, draft.max]}
              onChange={(_, v) => {
                const [a, b] = v as number[];
                setDraft((p) => ({ ...p, min: a, max: b }));
              }}
              min={1}
              max={5}
              step={0.1}
              valueLabelDisplay="auto"
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <TextField
                label="Min"
                type="number"
                inputProps={{ step: "0.1", min: 1, max: 5 }}
                value={draft.min}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, min: Number(e.target.value) }))
                }
                fullWidth
              />
              <TextField
                label="Max"
                type="number"
                inputProps={{ step: "0.1", min: 1, max: 5 }}
                value={draft.max}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, max: Number(e.target.value) }))
                }
                fullWidth
              />
            </Stack>
          </>
        )}
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
