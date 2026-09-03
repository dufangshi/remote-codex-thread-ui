import { terminalPluginManifest } from '@remote-codex/plugin-terminal';
import type { FrontendPluginModule } from './plugin-types';

export const builtinFrontendPlugins: FrontendPluginModule[] = [
  {
    manifest: terminalPluginManifest,
    threadPanels: [
      {
        id: 'terminal',
        kind: 'terminal',
        label: 'Terminal',
      },
    ],
  },
];
