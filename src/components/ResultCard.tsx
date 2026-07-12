import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { ResultItem } from "../core/types";

interface Props {
  item: ResultItem;
}

export function ResultCard({ item }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(item.value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const Icon = copied ? Check : Copy;

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors group">
      <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
        {item.label}
      </div>

      {item.type === "color" ? (
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded shrink-0 border border-zinc-700"
            style={{ background: item.value }}
          />
          <span className="text-sm text-zinc-200 break-all">{item.value}</span>
        </div>
      ) : item.type === "code" ? (
        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap break-all m-0">
          <code>{item.value}</code>
        </pre>
      ) : (
        <div className="text-sm text-zinc-200 break-all">{item.value}</div>
      )}

      <button
        onClick={handleCopy}
        title="Copy"
        className="absolute top-3 right-3 p-1 rounded text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        <Icon size={14} strokeWidth={copied ? 2.5 : 1.8} className={copied ? "text-green-400" : ""} />
      </button>
    </div>
  );
}
