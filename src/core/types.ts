export interface ResultItem {
  label: string;
  value: string;
  type: "text" | "code" | "color";
  language?: string;
}

export interface PluginResult {
  pluginId: string;
  pluginName: string;
  items: ResultItem[];
}

export interface PluginMeta {
  description: string;
  examples: string[];
  output: string;
}

export interface Plugin {
  id: string;
  name: string;
  meta: PluginMeta;
  detect: (input: string) => boolean;
  calculate: (input: string) => Promise<ResultItem[]>;
}
