import { useRef, useEffect } from "react";
import { Paperclip } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onFileChange?: (file: File) => void;
}

export function SearchInput({ value, onChange, onFileChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileChange?.(file);
    e.target.value = "";
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="HEX color, RGB, HSL, JWT, JSON, ..."
        autoFocus
        spellCheck={false}
        autoComplete="off"
        rows={1}
        className="w-full px-4 py-3 pr-11 text-sm rounded-xl border border-zinc-300 bg-white text-zinc-800 placeholder-zinc-400 outline-none focus:border-zinc-500 transition-colors resize-none overflow-y-hidden max-h-64 font-mono dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-500"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        title="Attach file"
        className="absolute right-2 top-2.5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <Paperclip size={16} />
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
