import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Register all plugins (side-effect import)
await import("../src/plugins/index.ts");

const { getPlugins } = await import("../src/core/engine.ts");

const plugins = getPlugins();

const rows = plugins
  .map((p) => {
    const examples = p.meta.examples.map((e) => `\`${e}\``).join(", ");
    return `| ${p.meta.description} | ${examples} | ${p.meta.output} |`;
  })
  .join("\n");

const table = `| What you type | Example | What you get |
|---------------|---------|--------------|
${rows}`;

const marker = {
  start: "<!-- PLUGINS:START -->",
  end: "<!-- PLUGINS:END -->",
};

const readmePath = resolve(import.meta.dirname, "../README.md");
const readme = readFileSync(readmePath, "utf-8");

const replaced = readme.replace(
  new RegExp(`${marker.start}[\\s\\S]*?${marker.end}`),
  `${marker.start}\n${table}\n${marker.end}`
);

writeFileSync(readmePath, replaced);
console.log(`Updated README.md with ${plugins.length} features.`);
