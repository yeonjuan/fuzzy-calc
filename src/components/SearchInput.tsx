import { useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="HEX color, JWT, ..."
      autoFocus
      spellCheck={false}
      autoComplete="off"
      className="w-full px-4 py-3 text-lg rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
    />
  );
}
