export type DatePreset = "last2weeks" | "last1month" | "all" | "custom";

export function presetToRangeMs(preset: DatePreset): { fromMs?: number; toMs?: number } {
  if (preset === "all") return {};
  const toMs = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const fromMs =
    preset === "last2weeks" ? toMs - 14 * day :
    preset === "last1month" ? toMs - 30 * day :
    undefined;
  return { fromMs, toMs };
}

export function parseDateMs(s: string): number | null {
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : null;
}
