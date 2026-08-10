# fuzzy-calc

> **paste anything. get everything.**

**[https://yeonjuan.github.io/fuzzy-calc/](https://yeonjuan.github.io/fuzzy-calc/)**

One box. No buttons. Instant results.

Type a hex color, a JWT, a cron expression, a Unix timestamp — fuzzy-calc figures out what you pasted and shows every useful transformation, on the fly.

---

## Supported features

<!-- PLUGINS:START -->

| What you type                                | Example                                                                   | What you get                       |
| -------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| Render SVG markup as a preview               | `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>` | SVG Preview                        |
| HEX color to RGB and HSL                     | `#ff6b6b`, `#3a86ffcc`                                                    | RGB, HSL (with alpha if 8-digit)   |
| RGB / RGBA color to HEX and HSL              | `rgb(255, 107, 107)`, `rgba(255, 0, 0, 0.5)`                              | HEX, HSL (with alpha if rgba)      |
| HSL / HSLA color to RGB and HEX              | `hsl(0, 100%, 50%)`, `hsla(240, 100%, 50%, 0.5)`                          | RGB, HEX (with alpha if hsla)      |
| Decode JWT token                             | `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.abc`                            | Header, Payload (JSON), Expiration |
| Format and pretty-print JSON                 | `{"name":"fuzzy","version":1}`, `[1,2,3]`                                 | Formatted JSON                     |
| Evaluate arithmetic expressions              | `2 + 3 * 4`, `(10 - 2) / 4`                                               | Numeric result                     |
| Show next 10 cron execution times            | `* * * * *`, `0 9 * * 1-5`                                                | Next 10 scheduled run times        |
| Convert Unix timestamp to UTC and local time | `1720000000`, `1720000000000`                                             | UTC (ISO 8601), Local timezone     |
| Decode Base64 string                         | `aGVsbG8gd29ybGQ=`, `dHlwZXNjcmlwdA==`                                    | Decoded text, Base64 encoded       |
| Convert between number bases                 | `255`, `0xff`, `0b11111111`, `0o377`                                      | DEC, HEX, BIN, OCT                 |
| URL-encode or decode text                    | `hello world`, `https://example.com/path?q=1&a=2`, `hello%20world`        | URL Encoded, URL Decoded           |

<!-- PLUGINS:END -->

> Run `npm run sync-readme` to keep this table in sync with the codebase.

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
