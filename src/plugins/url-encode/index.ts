import type { Plugin } from "../../core/types";

const urlEncodePlugin: Plugin = {
  id: "url-encode",
  name: "URL Encode",
  meta: {
    description: "URL-encode or decode text",
    examples: ["hello world", "https://example.com/path?q=1&a=2", "hello%20world"],
    output: "URL Encoded, URL Decoded",
  },
  detect: () => true,
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default urlEncodePlugin;
