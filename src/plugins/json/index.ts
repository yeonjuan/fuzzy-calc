import type { Plugin } from "../../core/types";

function isJson(input: string): boolean {
  const t = input.trim();
  if (!t.startsWith("{") && !t.startsWith("[")) return false;
  try {
    JSON.parse(t);
    return true;
  } catch {
    return false;
  }
}

const jsonPlugin: Plugin = {
  id: "json",
  name: "JSON",
  meta: {
    description: "Format and pretty-print JSON",
    examples: ['{"name":"fuzzy","version":1}', "[1,2,3]"],
    output: "Formatted JSON",
  },
  detect: isJson,
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input.trim());
  },
};

export default jsonPlugin;
