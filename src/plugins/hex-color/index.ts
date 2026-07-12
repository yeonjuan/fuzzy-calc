import type { Plugin } from "../../core/types";

const HEX_RE = /^#[0-9a-f]{3}([0-9a-f]{3})?([0-9a-f]{2})?$/i;

const hexColorPlugin: Plugin = {
  id: "hex-color",
  name: "HEX Color",
  detect: (input) => HEX_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default hexColorPlugin;
