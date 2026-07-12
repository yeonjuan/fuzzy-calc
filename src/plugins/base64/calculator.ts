import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const items: ResultItem[] = [];

  try {
    const decoded = atob(input);
    const isText = /^[\x20-\x7E\t\n\r]*$/.test(decoded);
    items.push({
      label: "Decoded",
      value: isText ? decoded : "(binary data)",
      type: "text",
    });
  } catch {
    // not valid base64
  }

  items.push({
    label: "Encoded",
    value: btoa(unescape(encodeURIComponent(input))),
    type: "text",
  });

  return items;
}
