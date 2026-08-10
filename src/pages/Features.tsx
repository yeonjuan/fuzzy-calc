import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const BASE = "/fuzzy-calc/";

const FEATURES = [
  {
    category: "Color",
    items: [
      {
        name: "HEX Color",
        description: "Convert HEX color to RGB and HSL.",
        examples: ["#ff6b6b", "#3a86ff", "#3a86ffcc"],
        output: "RGB, HSL (with alpha if 8-digit)",
      },
      {
        name: "RGB Color",
        description: "Convert RGB / RGBA color to HEX and HSL.",
        examples: ["rgb(255, 107, 107)", "rgba(255, 0, 0, 0.5)"],
        output: "HEX, HSL",
      },
      {
        name: "HSL Color",
        description: "Convert HSL / HSLA color to HEX and RGB.",
        examples: ["hsl(0, 100%, 50%)", "hsla(240, 100%, 50%, 0.5)"],
        output: "HEX, RGB",
      },
    ],
  },
  {
    category: "Developer",
    items: [
      {
        name: "JWT",
        description: "Decode a JWT token and show header, payload, and expiration.",
        examples: ["eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.abc"],
        output: "Header (JSON), Payload (JSON), Expiration",
      },
      {
        name: "JSON",
        description: "Format and pretty-print a JSON object or array.",
        examples: ['{"name":"fuzzy","version":1}', "[1,2,3]"],
        output: "Formatted JSON",
      },
      {
        name: "Base64",
        description: "Decode a Base64-encoded string.",
        examples: ["aGVsbG8gd29ybGQ=", "dHlwZXNjcmlwdA=="],
        output: "Decoded text",
      },
      {
        name: "URL Encode",
        description: "URL-encode or decode any text.",
        examples: ["hello world", "https://example.com/path?q=1&a=2", "hello%20world"],
        output: "URL Encoded, URL Decoded",
      },
      {
        name: "Number Base",
        description: "Convert a number between decimal, hexadecimal, binary, and octal.",
        examples: ["255", "0xff", "0b11111111", "0o377"],
        output: "DEC, HEX, BIN, OCT",
      },
    ],
  },
  {
    category: "Utilities",
    items: [
      {
        name: "Arithmetic",
        description: "Evaluate arithmetic expressions.",
        examples: ["2 + 3 * 4", "(10 - 2) / 4"],
        output: "Numeric result",
      },
      {
        name: "Unix Timestamp",
        description: "Convert a Unix timestamp (seconds or milliseconds) to human-readable time.",
        examples: ["1720000000", "1720000000000"],
        output: "UTC (ISO 8601), Local timezone",
      },
      {
        name: "Cron",
        description: "Show the next 10 scheduled execution times for a cron expression.",
        examples: ["* * * * *", "0 9 * * 1-5"],
        output: "Next 10 run times",
      },
      {
        name: "SVG",
        description: "Render SVG markup as a live preview.",
        examples: [
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#3a86ff"/></svg>',
        ],
        output: "SVG Preview",
      },
    ],
  },
  {
    category: "File",
    items: [
      {
        name: "Video to GIF",
        description: "Convert a video file to an animated GIF entirely in the browser.",
        examples: ["Attach a video file via the paperclip icon"],
        output: "Downloadable GIF",
      },
    ],
  },
];

export default function Features() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <a
          href={BASE}
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity text-indigo-500 dark:text-indigo-400"
        >
          fuzzy calc
        </a>
        <button
          onClick={toggle}
          title="Toggle theme"
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">Features</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            All conversions and calculations run locally in your browser. Nothing is sent to any
            server.
          </p>
        </div>

        {FEATURES.map((group) => (
          <section key={group.category} className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              {group.category}
            </h2>
            <div className="flex flex-col gap-6">
              {group.items.map((item) => (
                <div key={item.name} className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">{item.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                      Examples
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.examples.map((ex) => (
                        <a
                          key={ex}
                          href={`${BASE}?q=${encodeURIComponent(ex)}`}
                          className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                          {ex}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                      Output
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="mt-auto pt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <a
          href={BASE}
          className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          ← Back to fuzzy calc
        </a>
      </footer>
    </div>
  );
}
