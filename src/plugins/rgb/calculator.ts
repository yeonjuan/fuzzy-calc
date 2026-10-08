import { rgbToHex, rgbToHsl } from "@library/color";
import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const match = input.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i);
  if (!match) return [];

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

  const rgb = a !== undefined ? { r, g, b, a } : { r, g, b };
  const { h, s, l } = rgbToHsl(rgb);

  return [
    { label: "HEX", value: rgbToHex(rgb).toUpperCase(), type: "text" },
    {
      label: "HSL",
      value: a !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`,
      type: "text",
    },
  ];
}
