import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  return [
    {
      label: "SVG Preview",
      value: input.trim(),
      type: "svg",
    },
  ];
}
