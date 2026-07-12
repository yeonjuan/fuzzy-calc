import { Cron } from "croner";
import type { Plugin } from "../../core/types";

const CRON_RE = /^(\S+\s+){4}\S+(\s+\S+)?$/;

function isCron(input: string): boolean {
  if (!CRON_RE.test(input.trim())) return false;
  try {
    new Cron(input.trim());
    return true;
  } catch {
    return false;
  }
}

const cronPlugin: Plugin = {
  id: "cron",
  name: "Cron",
  meta: {
    description: "Show next 10 cron execution times",
    examples: ["* * * * *", "0 9 * * 1-5"],
    output: "Next 10 scheduled run times",
  },
  detect: isCron,
  calculate: async (input) => {
    try {
      const { compute } = await import("./calculator");
      return compute(input.trim());
    } catch {
      return [];
    }
  },
};

export default cronPlugin;
