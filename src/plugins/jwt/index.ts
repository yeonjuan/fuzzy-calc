import type { Plugin } from "../../core/types";

const JWT_RE = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;

const jwtPlugin: Plugin = {
  id: "jwt",
  name: "JWT",
  detect: (input) => JWT_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default jwtPlugin;
