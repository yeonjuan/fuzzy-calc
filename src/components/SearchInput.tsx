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
      className="w-full px-4 py-3 text-sm rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-none overflow-y-auto max-h-64 font-mono"
    />
  );
}
