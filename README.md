# fuzzy-calc

> paste anything. get everything.

Single search box that detects what you typed and shows every useful transformation — instantly.

## What it does

| Input | Output |
|---|---|
| `#ff6b6b` | RGB, HSL (with alpha if `#RRGGBBAA`) |
| JWT token | Decoded header, payload, expiration |
| more coming | plugin-based, easy to extend |

## Stack

- React 19 + TypeScript
- Vite 8 + `@tailwindcss/vite`
- lucide-react

## Dev

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Adding a plugin

1. `src/plugins/{name}/calculator.ts` — export `compute(input: string): ResultItem[]`
2. `src/plugins/{name}/index.ts` — export default `Plugin` with sync `detect` and dynamic import of calculator
3. `src/plugins/index.ts` — `registerPlugin(yourPlugin)`

The calculator module is loaded on demand (separate Vite chunk).
