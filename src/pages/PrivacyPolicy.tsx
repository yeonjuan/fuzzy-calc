import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const BASE = "/fuzzy-calc/";
const CONTACT_EMAIL = "yeonjuan93@gmail.com";
const EFFECTIVE_DATE = "July 13, 2026";

export default function PrivacyPolicy() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <a
          href={BASE}
          className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 hover:opacity-80 transition-opacity"
        >
          fuzzy-calc
        </a>
        <button
          onClick={toggle}
          title="Toggle theme"
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main className="flex flex-col gap-6 text-zinc-700 dark:text-zinc-300">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>

        <p>
          fuzzy-calc is a free, client-side developer tool. This page explains what data is
          collected when you use the service.
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Data We Collect
          </h2>
          <p>
            We use <strong>Google Analytics 4</strong> to understand how visitors use the site. It
            automatically collects:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Pages visited and time spent</li>
            <li>General geographic location (country / city level)</li>
            <li>Browser and device type</li>
            <li>Referring URLs</li>
          </ul>
          <p className="text-sm">
            This data is collected via cookies and is processed by Google. See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Google's Privacy Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Data We Do NOT Collect
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>The text you type or paste into the calculator input</li>
            <li>Account or registration information (there is no account system)</li>
            <li>Payment information</li>
          </ul>
          <p className="text-sm">
            All calculations run entirely in your browser. Input values are never sent to any
            server.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Cookies</h2>
          <p className="text-sm">
            Google Analytics sets cookies (e.g.{" "}
            <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
              _ga
            </code>
            ,{" "}
            <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
              _ga_*
            </code>
            ) to distinguish users and sessions. You can opt out by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Third-Party Services
          </h2>
          <p className="text-sm">
            The only third-party service used is Google Analytics. No data is sold or shared with
            any other party.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Contact</h2>
          <p className="text-sm">
            Questions about this policy:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </main>

      <footer className="mt-auto pt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <a
          href={BASE}
          className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          ← Back to fuzzy-calc
        </a>
      </footer>
    </div>
  );
}
