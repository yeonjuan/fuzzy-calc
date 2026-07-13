import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { ResultItem } from "../core/types";

interface Props {
  item: ResultItem;
}

function TextValue({ value }: { value: string }) {
  return <div className="text-sm text-zinc-700 break-all dark:text-zinc-200">{value}</div>;
}

function CodeValue({ value }: { value: string }) {
  return (
    <pre className="text-sm text-emerald-700 font-mono whitespace-pre-wrap break-all m-0 dark:text-green-400">
      <code>{value}</code>
    </pre>
  );
}

function ColorValue({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-7 h-7 rounded shrink-0 border border-zinc-300 dark:border-zinc-700"
        style={{ background: value }}
      />
      <span className="text-sm text-zinc-700 break-all dark:text-zinc-200">{value}</span>
    </div>
  );
}

function SvgValue({ value }: { value: string }) {
  return (
    <div
      className="rounded overflow-hidden w-50 h-50"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(value)}`}
        alt="SVG Preview"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

const valueRenderers: Record<ResultItem["type"], (value: string) => React.ReactNode> = {
  text: (value) => <TextValue value={value} />,
  code: (value) => <CodeValue value={value} />,
  color: (value) => <ColorValue value={value} />,
  svg: (value) => <SvgValue value={value} />,
};

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
    <div className="relative bg-white border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 transition-colors group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600">
      <div className="text-xs uppercase tracking-widest text-zinc-400 mb-2 dark:text-zinc-500">
        {item.label}
      </div>

      {valueRenderers[item.type](item.value)}

      <button
        onClick={handleCopy}
        title="Copy"
        className="absolute top-3 right-3 p-1 rounded text-zinc-400 hover:text-zinc-700 opacity-0 group-hover:opacity-100 transition-all cursor-pointer dark:text-zinc-600 dark:hover:text-zinc-300"
      >
        <Icon
          size={14}
          strokeWidth={copied ? 2.5 : 1.8}
          className={copied ? "text-green-500 dark:text-green-400" : ""}
        />
      </button>
    </div>
  );
}
