export interface ResultItemAction {
  label: string;
  onClick: () => void | Promise<void>;
}

export interface ResultItem {
  label: string;
  value: string;
  type: "text" | "code" | "color" | "svg";
  language?: string;
  actions?: ResultItemAction[];
}

export interface FilePlugin {
  id: string;
  name: string;
  detectFile: (file: File) => boolean;
  calculateFile: (file: File) => Promise<ResultItem[]>;
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
