"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { useJoinDateFilterStore } from "@/stores/filters/joinDateFilterStore";
import { presetToRangeMs, DatePreset } from "@/stores/filters/dateUtils";

function msToDayjs(ms?: number): Dayjs | null {
  return typeof ms === "number" ? dayjs(ms) : null;
}
function dayjsToMs(d: Dayjs | null): number | undefined {
  return d ? d.valueOf() : undefined;
}

export function JoinDateFilterModal() {
  const open = useJoinDateFilterStore((s) => s.open);
  const close = useJoinDateFilterStore((s) => s.closeModal);

  const draft = useJoinDateFilterStore((s) => s.draft);
  const setDraft = useJoinDateFilterStore((s) => s.setDraft);

  const apply = useJoinDateFilterStore((s) => s.apply);
  const clear = useJoinDateFilterStore((s) => s.clear);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
        <DialogTitle>Joining Date</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Preset</InputLabel>
            <Select
              label="Preset"
              value={draft.preset}
              onChange={(e) => {
                const p = e.target.value as DatePreset;
                setDraft((prev) => ({
                  ...prev,
                  preset: p,
                  ...presetToRangeMs(p),
                }));
              }}
            >
              <MenuItem value="last2weeks">Last 2 weeks</MenuItem>
              <MenuItem value="last1month">Last 1 month</MenuItem>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>

          {draft.preset === "custom" && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ mt: 2 }}
            >
              <DatePicker
                label="From"
                value={msToDayjs(draft.fromMs)}
                onChange={(d) =>
                  setDraft((p) => ({ ...p, fromMs: dayjsToMs(d) }))
                }
              />
              <DatePicker
                label="To"
                value={msToDayjs(draft.toMs)}
                onChange={(d) =>
                  setDraft((p) => ({ ...p, toMs: dayjsToMs(d) }))
                }
              />
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={clear}>Clear</Button>
          <Button variant="contained" onClick={apply}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
