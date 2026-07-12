import type { Plugin } from "../../core/types";

const ARITH_RE = /^[\d\s()+\-*/.]+$/;
const HAS_OP_RE = /[+\-*/]/;

const arithmeticPlugin: Plugin = {
  id: "arithmetic",
  name: "Arithmetic",
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
