# fuzzy-calc

> **paste anything. get everything.**

One box. No buttons. Instant results.

Type a hex color, a JWT, a cron expression, a Unix timestamp — fuzzy-calc figures out what you pasted and shows every useful transformation, on the fly.

---

## Plugins

<!-- PLUGINS:START -->
| Plugin | Description | Example Input | Output |
|--------|-------------|---------------|--------|
| HEX Color | HEX color to RGB and HSL | `#ff6b6b`, `#3a86ffcc` | RGB, HSL (with alpha if 8-digit) |
| RGB Color | RGB / RGBA color to HEX and HSL | `rgb(255, 107, 107)`, `rgba(255, 0, 0, 0.5)` | HEX, HSL (with alpha if rgba) |
| HSL Color | HSL / HSLA color to RGB and HEX | `hsl(0, 100%, 50%)`, `hsla(240, 100%, 50%, 0.5)` | RGB, HEX (with alpha if hsla) |
| JWT | Decode JWT token | `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.abc` | Header, Payload (JSON), Expiration |
| JSON | Format and pretty-print JSON | `{"name":"fuzzy","version":1}`, `[1,2,3]` | Formatted JSON |
| Arithmetic | Evaluate arithmetic expressions | `2 + 3 * 4`, `(10 - 2) / 4` | Numeric result |
| Cron | Show next 10 cron execution times | `* * * * *`, `0 9 * * 1-5` | Next 10 scheduled run times |
| Unix Timestamp | Convert Unix timestamp to UTC and local time | `1720000000`, `1720000000000` | UTC (ISO 8601), Local timezone |
<!-- PLUGINS:END -->

> New plugins are added to `src/plugins/`. Run `npm run sync-readme` to update this table.

---

## Stack

- **React 19** + TypeScript
- **Vite 8** + `@tailwindcss/vite` (Tailwind v4)
- **lucide-react** icons
- **croner** for cron expression parsing
- Dynamic imports — each plugin's calculator is a separate chunk, loaded on demand

---

## Dev

```bash
npm install
npm run dev          # dev server
npm run build        # production build
npm run lint         # oxlint
npm test             # vitest (single pass)
npm run test:watch   # vitest watch
npm run sync-readme  # regenerate plugins table from source
```

---

## Adding a plugin

1. `src/plugins/{name}/calculator.ts` — export `compute(input: string): ResultItem[]`
2. `src/plugins/{name}/index.ts` — export default `Plugin` with `meta`, sync `detect`, and dynamic import of calculator
3. `src/plugins/index.ts` — `registerPlugin(yourPlugin)`
4. `npm run sync-readme` — update README table

The calculator module is lazy-loaded (separate Vite chunk). Keep `detect` fast and sync — it runs on every keystroke.
