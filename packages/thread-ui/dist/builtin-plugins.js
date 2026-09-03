// src/plugins/builtin-plugin-modules.tsx
import { terminalPluginManifest } from "@remote-codex/plugin-terminal";
var builtinFrontendPlugins = [
  {
    manifest: terminalPluginManifest,
    threadPanels: [
      {
        id: "terminal",
        kind: "terminal",
        label: "Terminal"
      }
    ]
  }
];
export {
  builtinFrontendPlugins,
  builtinFrontendPlugins as defaultBuiltinFrontendPlugins
};
