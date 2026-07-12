import type { ResultItem } from "../../core/types";

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100, ln = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function toHex(r: number, g: number, b: number, a?: number): string {
  const hex = [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  if (a !== undefined) {
    const ah = Math.round(a * 255).toString(16).padStart(2, "0");
    return `#${hex}${ah}`.toUpperCase();
  }
  return `#${hex}`.toUpperCase();
}

export function compute(input: string): ResultItem[] {
  const match = input.match(
    /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/i
  );
  if (!match) return [];

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

  const [r, g, b] = hslToRgb(h, s, l);

  return [
    {
      label: "RGB",
      value: a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`,
      type: "text",
    },
    { label: "HEX", value: toHex(r, g, b, a), type: "text" },
  ];
}
