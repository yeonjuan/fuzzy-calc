import type { Plugin } from "../../core/types";

// 9~13 digits: seconds (year ~2001–2286) or milliseconds (year ~2001–2286)
const UNIX_RE = /^\d{9,13}$/;

const unixTimePlugin: Plugin = {
  id: "unix-time",
  name: "Unix Timestamp",
  detect: (input) => UNIX_RE.test(input.trim()),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input.trim());
  },
};

export default unixTimePlugin;
