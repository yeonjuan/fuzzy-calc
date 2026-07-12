import type { PluginResult } from "../core/types";
import { ResultCard } from "./ResultCard";

interface Props {
  results: PluginResult[];
  loading: boolean;
}

export function ResultList({ results, loading }: Props) {
  if (loading) {
    return <div className="text-center text-zinc-400 py-5 dark:text-zinc-500">Calculating...</div>;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      {results.map((r) => (
        <section key={r.pluginId}>
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-3 dark:text-zinc-500">
            {r.pluginName}
          </h2>
          <div className={`grid gap-3 ${r.items.length === 1 ? "grid-cols-1" : r.items.length === 2 ? "grid-cols-2" : "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"}`}>
            {r.items.map((item) => (
              <ResultCard key={item.label} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
