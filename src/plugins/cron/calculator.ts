import { Cron } from "croner";
import type { ResultItem } from "../../core/types";

export function compute(input: string): ResultItem[] {
  const job = new Cron(input, { maxRuns: 10 });
  const runs: Date[] = [];
  let next = job.nextRun();
  while (next && runs.length < 10) {
    runs.push(next);
    next = job.nextRun(next);
  }

  return [
    {
      label: "Next 10 runs",
      value: runs.map((date, i) => `${i + 1}.  ${date.toLocaleString()}`).join("\n"),
      type: "code",
    },
  ];
}
