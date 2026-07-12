import { useState, useEffect, useTransition } from "react";
import { Sun, Moon, Share2, Check } from "lucide-react";
import { SearchInput } from "./components/SearchInput";
import { ResultList } from "./components/ResultList";
import { calculate } from "./core/engine";
import { useTheme } from "./hooks/useTheme";
import type { PluginResult } from "./core/types";
import "./plugins";
import "./App.css";

const REPO_URL = "https://github.com/yeonjuan/fuzzy-calc";
const SHARE_MAX_LENGTH = 500;

function getInitialInput(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("q") ?? "";
}

export default function App() {
  const { theme, toggle } = useTheme();
  const [input, setInput] = useState(getInitialInput);
  const [results, setResults] = useState<PluginResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (input) {
      url.searchParams.set("q", input);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState(null, "", url);
  }, [input]);

  useEffect(() => {
    if (!input.trim()) {
      setResults([]);
      return;
    }
    startTransition(() => {
      calculate(input).then(setResults);
    });
  }, [input]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 1500);
    });
  }

  const canShare = input.length > 0 && input.length <= SHARE_MAX_LENGTH;

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">
      <header className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            fuzzy-calc
          </h1>
          <p className="text-sm text-zinc-400 mt-1 dark:text-zinc-500">
            paste anything. get everything.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {canShare && (
            <button
              onClick={handleShare}
              title="Copy shareable link"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
            >
              {shared ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
            </button>
          )}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={toggle}
            title="Toggle theme"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <SearchInput value={input} onChange={setInput} />
      <ResultList results={results} loading={isPending && input.trim().length > 0} />
      <footer className="mt-auto pt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
        Want more features?{" "}
        <a
          href={`${REPO_URL}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          Leave an issue on GitHub
        </a>
      </footer>
    </div>
  );
}
