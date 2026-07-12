import type { Plugin } from "../../core/types";

const RGB_RE = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+)?\s*\)$/i;

const rgbPlugin: Plugin = {
  id: "rgb",
  name: "RGB Color",
  meta: {
    description: "RGB / RGBA color to HEX and HSL",
    examples: ["rgb(255, 107, 107)", "rgba(255, 0, 0, 0.5)"],
    output: "HEX, HSL (with alpha if rgba)",
  },
  detect: (input) => RGB_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default rgbPlugin;
