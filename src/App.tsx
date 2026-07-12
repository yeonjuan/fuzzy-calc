import { useState, useEffect, useTransition } from "react";
import { Sun, Moon } from "lucide-react";
import { SearchInput } from "./components/SearchInput";
import { ResultList } from "./components/ResultList";
import { calculate } from "./core/engine";
import { useTheme } from "./hooks/useTheme";
import type { PluginResult } from "./core/types";
import "./plugins";
import "./App.css";

export default function App() {
  const { theme, toggle } = useTheme();
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
      <header className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">fuzzy-calc</h1>
          <p className="text-sm text-zinc-400 mt-1 dark:text-zinc-500">paste anything. get everything.</p>
        </div>
        <button
          onClick={toggle}
          title="Toggle theme"
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>
      <SearchInput value={input} onChange={setInput} />
      <ResultList results={results} loading={isPending && input.trim().length > 0} />
    </div>
  );
}
