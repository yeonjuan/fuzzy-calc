import type { Plugin } from "../../core/types";

const HSL_RE = /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+)?\s*\)$/i;

const hslPlugin: Plugin = {
  id: "hsl",
  name: "HSL Color",
  detect: (input) => HSL_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default hslPlugin;
