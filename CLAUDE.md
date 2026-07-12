# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Formatting

Prettier runs automatically via PostToolUse hook on every Edit/Write. Config in `.prettierrc`. Manual run: `npm run format`.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin. Base styles in `src/index.css` (`@import "tailwindcss"`). No config file — use utility classes directly. oxlint warns on deprecated class names (e.g. `flex-shrink-0` → `shrink-0`).

## Commands

```bash
npm run dev        # dev server (Vite)
npm run build      # tsc -b && vite build
npm run lint       # oxlint
npm run preview    # preview production build
npm test           # vitest run (single pass)
npm run test:watch # vitest watch mode
```

## Architecture

Single-input web calculator. User types → engine detects matching plugins → each plugin computes results → UI renders cards.

### Core (`src/core/`)

**`types.ts`** — shared interfaces:
- `Plugin` — `{ id, name, detect(input): boolean, calculate(input): Promise<ResultItem[]> }`
- `ResultItem` — `{ label, value, type: "text"|"code"|"color", language? }`
- `PluginResult` — `{ pluginId, pluginName, items: ResultItem[] }`

**`engine.ts`** — plugin registry + orchestration:
- `registerPlugin(plugin)` — adds to module-level array
- `calculate(input)` — runs `detect()` on all plugins (sync, fast), then `Promise.allSettled` on matched ones (async, dynamic imports)

### Plugins (`src/plugins/`)

Each plugin lives in its own directory with two files:

- **`index.ts`** — exports default `Plugin`. `detect` is a fast sync regex check. `calculate` does `await import('./calculator')` so the heavy logic is a separate Vite chunk.
- **`calculator.ts`** — exports `compute(input): ResultItem[]`. This is the dynamically imported chunk.

Register plugins in **`src/plugins/index.ts`**. This file is imported once in `App.tsx` as a side-effect.

**Current plugins:**
- `hex-color` — detects `#RGB` / `#RRGGBB` / `#RRGGBBAA`, outputs HEX / RGB / HSL / CSS
- `jwt` — detects 3-part base64url token, outputs decoded header / payload / expiration

### Adding a plugin

1. Create `src/plugins/{name}/calculator.ts` — export `compute(input): ResultItem[]`
2. Create `src/plugins/{name}/index.ts` — export default `Plugin` with `detect` regex and `calculate` doing dynamic import of calculator
3. Add `registerPlugin(yourPlugin)` to `src/plugins/index.ts`

### UI (`src/components/`)

- `SearchInput` — controlled input, autofocus
- `ResultList` — maps `PluginResult[]` to sections
- `ResultCard` — renders one `ResultItem`, click-to-copy via `navigator.clipboard`

`App.tsx` uses `useTransition` so typing stays responsive while async plugin calculations run.
