// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import type { ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { GraphChatMessageContent } from './GraphChatMessageContent';

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

describe('GraphChatMessageContent', () => {
  it('opens root-relative file links through the workspace callback', () => {
    const onOpenWorkspaceFile = vi.fn();
    const element = render(
      <GraphChatMessageContent
        content="[tool-calling.js](/home/u/dev/gemma4/third_party/SillyTavern/public/scripts/tool-calling.js:400)"
        onOpenWorkspaceFile={onOpenWorkspaceFile}
      />,
    );

    const link = element.querySelector('a');
    expect(link).not.toBeNull();

    act(() => {
      link?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(onOpenWorkspaceFile).toHaveBeenCalledWith({
      path: '/home/u/dev/gemma4/third_party/SillyTavern/public/scripts/tool-calling.js',
      line: 400,
    });
  });

  it('opens complete same-origin file URLs through the workspace callback', () => {
    const onOpenWorkspaceFile = vi.fn();
    const href = `${window.location.origin}/home/u/treer/docs/architecture.md:44`;
    const element = render(
      <GraphChatMessageContent
        content={`[${href}](${href})`}
        onOpenWorkspaceFile={onOpenWorkspaceFile}
      />,
    );

    const link = element.querySelector('a');
    act(() => {
      link?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(onOpenWorkspaceFile).toHaveBeenCalledWith({
      path: '/home/u/treer/docs/architecture.md',
      line: 44,
    });
  });

  it('leaves normal external links as browser links', () => {
    const onOpenWorkspaceFile = vi.fn();
    const element = render(
      <GraphChatMessageContent
        content="[docs](https://example.com/docs)"
        onOpenWorkspaceFile={onOpenWorkspaceFile}
      />,
    );

    const link = element.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://example.com/docs');

    act(() => {
      link?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(onOpenWorkspaceFile).not.toHaveBeenCalled();
  });

  it('lets embedded hosts resolve links against their proxy base', () => {
    const resolveHref = vi.fn((href: string) => `https://treer.test/proxy${href}`);
    const element = render(
      <GraphChatMessageContent
        content="[agent docs](/docs)"
        resolveHref={resolveHref}
      />,
    );

    expect(resolveHref).toHaveBeenCalledWith('/docs');
    expect(element.querySelector('a')?.getAttribute('href')).toBe(
      'https://treer.test/proxy/docs',
    );
  });
});
