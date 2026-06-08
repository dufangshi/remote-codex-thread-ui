declare const TERMINAL_PLUGIN_ID = "remote-codex.terminal";
interface TerminalPluginManifest {
    id: typeof TERMINAL_PLUGIN_ID;
    name: string;
    version: string;
    description: string;
    remoteCodex: string;
    capabilities: {
        artifactTypes: [];
        timelineRenderers: [];
        threadPanels: Array<{
            id: 'terminal';
            label: string;
            kind: 'terminal';
            artifactTypes: [];
        }>;
        frontend: {
            entry: string;
        };
        backend: {
            entry: string;
        };
    };
}
declare const terminalPluginManifest: TerminalPluginManifest;

export { TERMINAL_PLUGIN_ID, type TerminalPluginManifest, terminalPluginManifest };
