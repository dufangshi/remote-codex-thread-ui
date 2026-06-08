// src/manifest.ts
var TERMINAL_PLUGIN_ID = "remote-codex.terminal";
var terminalPluginManifest = {
  id: TERMINAL_PLUGIN_ID,
  name: "Terminal",
  version: "0.1.0",
  description: "Built-in durable terminal panel backed by the supervisor PTY host.",
  remoteCodex: "^0.11.0",
  capabilities: {
    artifactTypes: [],
    timelineRenderers: [],
    threadPanels: [
      {
        id: "terminal",
        label: "Terminal",
        kind: "terminal",
        artifactTypes: []
      }
    ],
    frontend: {
      entry: "./dist/index.js"
    },
    backend: {
      entry: "./dist/backend.js"
    }
  }
};
export {
  TERMINAL_PLUGIN_ID,
  terminalPluginManifest
};
