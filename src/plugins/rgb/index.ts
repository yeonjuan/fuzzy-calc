import type { Plugin } from "../../core/types";

const RGB_RE = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+)?\s*\)$/i;

const rgbPlugin: Plugin = {
  id: "rgb",
  name: "RGB Color",
  detect: (input) => RGB_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default rgbPlugin;
