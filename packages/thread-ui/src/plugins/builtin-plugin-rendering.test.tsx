/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { ThreadArtifactDto } from '@remote-codex/shared';
import { builtinFrontendPlugins } from '../builtin-plugins';
import { createDefaultPluginContextValue } from './plugin-context';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderNode(node: ReactNode) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(<>{node}</>);
  });

  return container;
}

function moleculeArtifact(): ThreadArtifactDto {
  return {
    id: 'artifact-ethanol',
    pluginId: 'remote-codex.xyz-viewer',
    type: 'chemistry.molecule3d',
    title: 'Ethanol',
    summaryText: 'Small XYZ structure used for renderer smoke checks.',
    payload: {
      content: [
        [
          '3',
          'water',
          'O 0 0 0',
          'H 0.76 0.58 0',
          'H -0.76 0.58 0',
        ].join('\n'),
      ],
      format: 'xyz',
      name: 'water.xyz',
      uuid: 'artifact-water',
    },
    assets: null,
    sourceTurnId: 'turn-1',
    sourceItemId: 'item-artifact-1',
    createdAt: '2026-06-10T00:00:00.000Z',
  };
}

describe('built-in plugin rendering', () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    if (root) {
      flushSync(() => {
        root?.unmount();
      });
    }
    container?.remove();
    root = null;
    container = null;
  });

  it('routes molecule artifacts to the XYZ artifact renderer without loading WebGL', () => {
    const plugins = createDefaultPluginContextValue(builtinFrontendPlugins);
    const artifact = moleculeArtifact();

    expect(plugins.hasRendererForArtifact(artifact)).toBe(true);

    const view = renderNode(
      plugins.renderArtifact({
        artifact,
        expanded: false,
        onToggleExpanded: () => {},
      }),
    );

    expect(view.textContent).toContain('Ethanol');
    expect(view.textContent).toContain(
      'Small XYZ structure used for renderer smoke checks.',
    );
    expect(view.textContent).toContain('Open');
    expect(view.textContent).not.toContain('Loading molecule viewer');
  });

  it('renders inline XYZ molecule controls only for valid molecule code', () => {
    const plugins = createDefaultPluginContextValue(builtinFrontendPlugins);
    const validXyz = ['3', 'water', 'O 0 0 0', 'H 0.76 0.58 0', 'H -0.76 0.58 0'].join(
      '\n',
    );

    const view = renderNode(
      <>
        {plugins.renderInlineCode({
          code: validXyz,
          language: 'xyz',
          isIncomplete: false,
        })}
        {plugins.renderInlineCode({
          code: 'not molecule data',
          language: 'xyz',
          isIncomplete: false,
        })}
      </>,
    );

    expect(view.textContent).toContain('XYZ molecule');
    expect(view.textContent).toContain('Rendered from message source');
    expect(view.textContent).toContain('Source');
    expect(view.textContent).toContain('Collapse');
    expect(view.textContent).toContain('Loading molecule viewer');
    expect(view.textContent).not.toContain('not molecule data');
  });
});
