import type { ResultItem } from "../../core/types";

function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const hex = [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  if (a !== undefined) {
    const ah = Math.round(a * 255).toString(16).padStart(2, "0");
    return `#${hex}${ah}`.toUpperCase();
  }
  return `#${hex}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function compute(input: string): ResultItem[] {
  const match = input.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i
  );
  if (!match) return [];

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

  const [h, s, l] = rgbToHsl(r, g, b);

  return [
    { label: "HEX", value: rgbToHex(r, g, b, a), type: "text" },
    {
      label: "HSL",
      value: a !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`,
      type: "text",
    },
  ];
}
