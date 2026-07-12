import type { PluginResult } from "../core/types";
import { ResultCard } from "./ResultCard";

interface Props {
  results: PluginResult[];
  loading: boolean;
}

export function ResultList({ results, loading }: Props) {
  if (loading) {
    return <div className="text-center text-zinc-500 py-5">Calculating...</div>;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      {results.map((r) => (
        <section key={r.pluginId}>
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            {r.pluginName}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
            {r.items.map((item) => (
              <ResultCard key={item.label} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
