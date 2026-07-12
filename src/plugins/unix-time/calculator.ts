import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const ts = parseInt(input);
  const ms = ts > 1e10 ? ts : ts * 1000;
  const date = new Date(ms);

  return [
    {
      label: "UTC",
      value: date.toISOString(),
      type: "text",
    },
    {
      label: `Local (${Intl.DateTimeFormat().resolvedOptions().timeZone})`,
      value: date.toLocaleString(),
      type: "text",
    },
  ];
}
