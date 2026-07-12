import type { Plugin } from "../../core/types";

const JWT_RE = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;

const jwtPlugin: Plugin = {
  id: "jwt",
  name: "JWT",
  meta: {
    description: "Decode JWT token",
    examples: ["eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.abc"],
    output: "Header, Payload (JSON), Expiration",
  },
  detect: (input) => JWT_RE.test(input),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default jwtPlugin;
