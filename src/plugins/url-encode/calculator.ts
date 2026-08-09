import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const items: ResultItem[] = [];

  const encoded = encodeURIComponent(input);
  items.push({ label: "URL Encoded", value: encoded, type: "text" });

  try {
    const decoded = decodeURIComponent(input);
    if (decoded !== input) {
      items.push({ label: "URL Decoded", value: decoded, type: "text" });
    }
  } catch {
    // input is not valid percent-encoded string
  }

  return items;
}
