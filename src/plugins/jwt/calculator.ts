import type { ResultItem } from "../../core/types";

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return decodeURIComponent(
    atob(padded)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function compute(input: string): ResultItem[] {
  const [headerB64, payloadB64] = input.split(".");
  const header = JSON.parse(base64UrlDecode(headerB64));
  const payload = JSON.parse(base64UrlDecode(payloadB64));

  const items: ResultItem[] = [
    {
      label: "Header",
      value: JSON.stringify(header, null, 2),
      type: "code",
      language: "json",
    },
    {
      label: "Payload",
      value: JSON.stringify(payload, null, 2),
      type: "code",
      language: "json",
    },
  ];

  if (payload.exp) {
    const exp = new Date(payload.exp * 1000);
    const expired = exp < new Date();
    items.push({
      label: "Expiration",
      value: `${exp.toISOString()} (${expired ? "EXPIRED" : "valid"})`,
      type: "text",
    });
  }

  return items;
}
