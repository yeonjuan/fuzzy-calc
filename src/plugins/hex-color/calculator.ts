import { hexToRgb, rgbToCssString, rgbToHsl } from "@library/color";
import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const hasAlpha = input.replace("#", "").length === 8;
  const { r, g, b, a } = hexToRgb(input);
  const rgb = hasAlpha ? { r, g, b, a } : { r, g, b };
  const { h, s, l } = rgbToHsl(rgb);

  return [
    { label: "RGB", value: rgbToCssString(rgb), type: "color" },
    {
      label: "HSL",
      value: hasAlpha ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`,
      type: "color",
    },
  ];
}
