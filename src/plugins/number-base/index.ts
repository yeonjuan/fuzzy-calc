import type { Plugin } from "../../core/types";

// prefixed forms always match; plain decimal avoids 9–13 digits (unix-time range)
const PREFIXED_RE = /^(0x[0-9a-f]+|0b[01]+|0o[0-7]+)$/i;
const DECIMAL_RE = /^\d+$/;

function isNumberBase(input: string): boolean {
  const t = input.trim();
  if (PREFIXED_RE.test(t)) return true;
  if (DECIMAL_RE.test(t)) {
    const len = t.replace(/^0+/, "").length || 1;
    return len < 9 || len > 13; // exclude unix-time range
  }
  return false;
}

const numberBasePlugin: Plugin = {
  id: "number-base",
  name: "Number Base",
  meta: {
    description: "Convert between number bases",
    examples: ["255", "0xff", "0b11111111", "0o377"],
    output: "DEC, HEX, BIN, OCT",
  },
  detect: isNumberBase,
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default numberBasePlugin;
