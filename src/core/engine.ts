import type { Plugin, FilePlugin, PluginResult } from "./types";

const plugins: Plugin[] = [];
const filePlugins: FilePlugin[] = [];

export function registerPlugin(plugin: Plugin) {
  plugins.push(plugin);
}

export function getPlugins(): readonly Plugin[] {
  return plugins;
}

export function registerFilePlugin(plugin: FilePlugin) {
  filePlugins.push(plugin);
}

export async function calculateFile(file: File): Promise<PluginResult[]> {
  const matched = filePlugins.filter((p) => p.detectFile(file));

  const results = await Promise.allSettled(
    matched.map(async (p) => {
      const items = await p.calculateFile(file);
      return { pluginId: p.id, pluginName: p.name, items } satisfies PluginResult;
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<PluginResult> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((r) => r.items.length > 0);
}

export async function calculate(input: string): Promise<PluginResult[]> {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const matched = plugins.filter((p) => p.detect(trimmed));

  const results = await Promise.allSettled(
    matched.map(async (p) => {
      const items = await p.calculate(trimmed);
      return { pluginId: p.id, pluginName: p.name, items } satisfies PluginResult;
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<PluginResult> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((r) => r.items.length > 0);
}
