import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const t = input.trim().toLowerCase();
  let value: number;

  if (t.startsWith("0x")) value = parseInt(t.slice(2), 16);
  else if (t.startsWith("0b")) value = parseInt(t.slice(2), 2);
  else if (t.startsWith("0o")) value = parseInt(t.slice(2), 8);
  else value = parseInt(t, 10);

  if (!Number.isFinite(value) || Number.isNaN(value)) return [];

  return [
    { label: "DEC", value: value.toString(10), type: "text" },
    { label: "HEX", value: "0x" + value.toString(16).toUpperCase(), type: "text" },
    { label: "BIN", value: "0b" + value.toString(2), type: "text" },
    { label: "OCT", value: "0o" + value.toString(8), type: "text" },
  ];
}
