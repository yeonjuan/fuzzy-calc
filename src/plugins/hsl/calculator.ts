import { hslToRgb, rgbToCssString, rgbToHex } from "@library/color";
import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const match = input.match(
    /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/i
  );
  if (!match) return [];

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

  const rgb = hslToRgb(a !== undefined ? { h, s, l, a } : { h, s, l });

  return [
    { label: "RGB", value: rgbToCssString(rgb), type: "text" },
    { label: "HEX", value: rgbToHex(rgb).toUpperCase(), type: "text" },
  ];
}
