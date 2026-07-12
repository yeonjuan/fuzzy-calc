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

export interface Plugin {
  id: string;
  name: string;
  detect: (input: string) => boolean;
  calculate: (input: string) => Promise<ResultItem[]>;
}
