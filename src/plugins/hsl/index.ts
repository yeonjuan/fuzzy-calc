import type { Plugin } from "../../core/types";

const HSL_RE = /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+)?\s*\)$/i;

const hslPlugin: Plugin = {
  id: "hsl",
  name: "HSL Color",
  meta: {
    description: "HSL / HSLA color to RGB and HEX",
    examples: ["hsl(0, 100%, 50%)", "hsla(240, 100%, 50%, 0.5)"],
    output: "RGB, HEX (with alpha if hsla)",
  },
  detect: (input) => HSL_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default hslPlugin;
