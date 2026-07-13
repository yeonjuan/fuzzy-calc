import type { Plugin } from "../../core/types";

const SVG_RE = /^\s*<svg[\s>]/i;

const svgPlugin: Plugin = {
  id: "svg",
  name: "SVG",
  meta: {
    description: "Render SVG markup as a preview",
    examples: ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>'],
    output: "SVG Preview",
  },
  detect: (input) => SVG_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default svgPlugin;
