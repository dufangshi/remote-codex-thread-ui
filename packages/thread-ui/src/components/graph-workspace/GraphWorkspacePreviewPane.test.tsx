// @vitest-environment jsdom

import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDefaultPluginContextValue } from '../../plugins/plugin-context';
import {
  GraphWorkspacePreviewPane,
  resolveWorkspaceMarkdownPath,
} from './GraphWorkspacePreviewPane';
import type { WorkspaceTreeNode } from './workspaceTree';

vi.mock('../graph-chat/graphChatShiki', () => ({
  getGraphChatHighlighter: () => new Promise(() => undefined),
}));

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function render(node: ReactNode) {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  act(() => {
    root?.render(node);
  });
  return container;
}

afterEach(() => {
  if (root) {
    act(() => {
      root?.unmount();
    });
  }
  root = null;
  container?.remove();
  container = null;
});

describe('resolveWorkspaceMarkdownPath', () => {
  it('resolves relative, parent, and workspace-absolute resources', () => {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/guides/setup.md',
        resourceUrl: './images/flow chart.png?raw=1',
      }),
    ).toBe('docs/guides/images/flow chart.png');
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: '/home/u/treer/docs/guides/setup.md',
        resourceUrl: '../assets/diagram.png',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBe('docs/assets/diagram.png');
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/guides/setup.md',
        resourceUrl: '/home/u/treer/screenshots/result.png',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBe('screenshots/result.png');
  });

  it('keeps external URLs outside the workspace adapter', () => {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/setup.md',
        resourceUrl: 'https://example.com/image.png',
      }),
    ).toBeNull();
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'README.md',
        resourceUrl: '../outside.png',
      }),
    ).toBeNull();
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: '/home/u/treer/docs/setup.md',
        resourceUrl: '/etc/passwd',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBeNull();
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: '/tmp/outside.md',
        resourceUrl: './image.png',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBeNull();
  });

  it('resolves complete same-origin workspace URLs', () => {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/setup.md',
        resourceUrl: `${window.location.origin}/home/u/treer/assets/relay.png`,
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBe('assets/relay.png');
  });
});

describe('GraphWorkspacePreviewPane', () => {
  const markdownNode: WorkspaceTreeNode = {
    id: 'workspace:docs/architecture.md',
    name: 'architecture.md',
    path: '/home/u/treer/docs/architecture.md',
    kind: 'file',
    children: [],
  };

  it('renders Markdown by default and resolves workspace images through the adapter', () => {
    const resolveWorkspaceFileUrl = vi.fn(
      (path: string) => `/relay/files/raw?path=${encodeURIComponent(path)}`,
    );
    const onOpenWorkspaceFile = vi.fn();
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content:
            '# Architecture\n\n![Diagram](../assets/system.png)\n\n[Details](./details.md)',
          language: 'markdown',
          size: 96,
          truncated: false,
          nextOffset: 96,
        }}
        resolveWorkspaceFileUrl={resolveWorkspaceFileUrl}
        onOpenWorkspaceFile={onOpenWorkspaceFile}
        workspaceRootPath="/home/u/treer"
      />,
    );

    expect(element.querySelector('h1')?.textContent).toBe('Architecture');
    expect(element.querySelector('img')?.getAttribute('src')).toBe(
      '/relay/files/raw?path=assets%2Fsystem.png',
    );
    expect(resolveWorkspaceFileUrl).toHaveBeenCalledWith('assets/system.png');
    expect(element.querySelector('[aria-label="Source code"]')).toBeNull();

    act(() => {
      element
        .querySelector<HTMLAnchorElement>('a')
        ?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true }),
        );
    });
    expect(onOpenWorkspaceFile).toHaveBeenCalledWith('docs/details.md');
  });

  it('switches Markdown to highlighted source with line numbers', () => {
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content: '# Architecture\n\nText',
          language: 'markdown',
          size: 20,
          truncated: false,
          nextOffset: 20,
        }}
      />,
    );

    const sourceButton = [...element.querySelectorAll('button')].find(
      (button) => button.textContent?.trim() === 'Source',
    );
    act(() => {
      sourceButton?.click();
    });

    expect(element.querySelector('[aria-label="Source code"]')).toBeTruthy();
    expect(
      [...element.querySelectorAll('.thread-graph-code-line-number')].map(
        (line) => line.textContent,
      ),
    ).toEqual(['1', '2', '3']);
  });
});
