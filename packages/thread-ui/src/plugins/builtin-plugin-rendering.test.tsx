/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';

import { builtinFrontendPlugins } from '../builtin-plugins';
import { createDefaultPluginContextValue } from './plugin-context';

describe('built-in plugin rendering', () => {
  it('registers only the terminal built-in plugin', () => {
    const plugins = createDefaultPluginContextValue(builtinFrontendPlugins);
    expect(plugins.plugins.map((plugin) => plugin.id)).toEqual([
      'remote-codex.terminal',
    ]);
    expect(plugins.getThreadPanels()).toEqual([
      { id: 'terminal', kind: 'terminal', label: 'Terminal' },
    ]);
    expect(
      plugins.renderInlineCode({
        code: '3\nwater\nO 0 0 0',
        language: 'xyz',
        isIncomplete: false,
      }),
    ).toBeNull();
  });
});
