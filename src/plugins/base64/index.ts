import type { Plugin } from "../../core/types";

const BASE64_RE = /^[A-Za-z0-9+/]*={0,2}$/;

function isBase64(input: string): boolean {
  return BASE64_RE.test(input) && input.length % 4 === 0 && input.length >= 4;
}

const base64Plugin: Plugin = {
  id: "base64",
  name: "Base64",
  meta: {
    description: "Decode Base64 string",
    examples: ["aGVsbG8gd29ybGQ=", "dHlwZXNjcmlwdA=="],
    output: "Decoded text, Base64 encoded",
  },
  detect: isBase64,
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default base64Plugin;
