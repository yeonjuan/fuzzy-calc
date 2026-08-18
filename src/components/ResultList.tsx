import type { PluginResult } from "../core/types";
import { ResultCard } from "./ResultCard";

interface Props {
  results: PluginResult[];
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-3 animate-pulse" />
      <div className="h-4 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
    </div>
  );
}

function SkeletonSection() {
  return (
    <section>
      <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded mb-3 animate-pulse" />
      <div className="flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
}

export function ResultList({ results, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <SkeletonSection />
      </div>
    );
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
          <div className="flex flex-col gap-3">
            {r.items.map((item) => (
              <ResultCard key={item.label} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
