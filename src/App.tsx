import { useState, useEffect, useTransition } from "react";
import { SearchInput } from "./components/SearchInput";
import { ResultList } from "./components/ResultList";
import { calculate } from "./core/engine";
import type { PluginResult } from "./core/types";
import "./plugins";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<PluginResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!input.trim()) {
      setResults([]);
      return;
    }
    startTransition(() => {
      calculate(input).then(setResults);
    });
  }, [input]);

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">fuzzy-calc</h1>
        <p className="text-sm text-zinc-500 mt-1">paste anything. get everything.</p>
      </header>
      <SearchInput value={input} onChange={setInput} />
      <ResultList results={results} loading={isPending && input.trim().length > 0} />
    </div>
  );
}
