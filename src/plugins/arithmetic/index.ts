import type { Plugin } from "../../core/types";

const ARITH_RE = /^[\d\s()+\-*/.]+$/;
const HAS_OP_RE = /[+\-*/]/;

const arithmeticPlugin: Plugin = {
  id: "arithmetic",
  name: "Arithmetic",
  meta: {
    description: "Evaluate arithmetic expressions",
    examples: ["2 + 3 * 4", "(10 - 2) / 4"],
    output: "Numeric result",
  },
  detect: (input) => ARITH_RE.test(input) && HAS_OP_RE.test(input),
  calculate: async (input) => {
    try {
      const { compute } = await import("./calculator");
      return compute(input);
    } catch {
      return [];
    }
  },
};

export default arithmeticPlugin;
