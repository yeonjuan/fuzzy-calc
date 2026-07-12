import { useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="HEX color, RGB, HSL, JWT, JSON, ..."
      autoFocus
      spellCheck={false}
      autoComplete="off"
      rows={1}
      className="w-full px-4 py-3 text-sm rounded-xl border border-zinc-300 bg-white text-zinc-800 placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors resize-none overflow-y-auto max-h-64 font-mono dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-500"
    />
  );
}
