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
import { useProjectsFilterStore } from "@/stores/filters/projectsFilterStore";

export function ProjectsFilterModal() {
  const open = useProjectsFilterStore((s) => s.open);
  const close = useProjectsFilterStore((s) => s.closeModal);

  const draft = useProjectsFilterStore((s) => s.draft);
  const setDraft = useProjectsFilterStore((s) => s.setDraft);

  const apply = useProjectsFilterStore((s) => s.apply);
  const clear = useProjectsFilterStore((s) => s.clear);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Projects Delivered</DialogTitle>
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
            label="Exact projects"
            type="number"
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
              max={100}
              step={1}
              valueLabelDisplay="auto"
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <TextField
                label="Min"
                type="number"
                value={draft.min}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, min: Number(e.target.value) }))
                }
                fullWidth
              />
              <TextField
                label="Max"
                type="number"
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
