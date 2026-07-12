import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const parsed = JSON.parse(input);
  return [
    {
      label: "Formatted",
      value: JSON.stringify(parsed, null, 2),
      type: "code",
      language: "json",
    },
  ];
}
