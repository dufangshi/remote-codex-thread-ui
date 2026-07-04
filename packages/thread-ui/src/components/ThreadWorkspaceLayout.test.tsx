/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThreadWorkspaceLayout } from './ThreadWorkspaceLayout';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function mockViewport(mobile: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query.includes('max-width') ? mobile : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function render(node: ReactNode) {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => {
    root?.render(node);
  });
  return container;
}

function renderLayout() {
  return render(
    <ThreadWorkspaceLayout
      threads={[]}
      status={{
        state: 'ready',
        transport: 'sdk',
        lastStartedAt: null,
        lastError: null,
        restartCount: 0,
      }}
      workspaceContent={<div data-testid="workspace-content">Workspace</div>}
    >
      <div data-testid="chat-content">Chat</div>
    </ThreadWorkspaceLayout>,
  );
}

function renderLayoutWithActions() {
  return render(
    <ThreadWorkspaceLayout
      threads={[]}
      status={{
        state: 'ready',
        transport: 'sdk',
        lastStartedAt: null,
        lastError: null,
        restartCount: 0,
      }}
      threadActionsButton={<button type="button" aria-label="Thread actions">Actions</button>}
      workspaceContent={<div data-testid="workspace-content">Workspace</div>}
    >
      <div data-testid="chat-content">Chat</div>
    </ThreadWorkspaceLayout>,
  );
}

describe('ThreadWorkspaceLayout', () => {
  beforeEach(() => {
    mockViewport(false);
  });

  afterEach(() => {
    if (root) {
      flushSync(() => {
        root?.unmount();
      });
    }
    root = null;
    container?.remove();
    container = null;
    vi.restoreAllMocks();
  });

  it('defaults desktop thread entry to chat with workspace collapsed', () => {
    const element = renderLayout();

    expect(element.querySelector('[data-testid="chat-content"]')).toBeTruthy();
    expect(element.querySelector('[data-testid="workspace-content"]')).toBeNull();
    expect(element.querySelector('[aria-label="Expand workspace"]')).toBeTruthy();
  });

  it('defaults mobile thread entry to chat while keeping workspace switchable', () => {
    mockViewport(true);
    const element = renderLayout();

    expect(element.querySelector('[data-testid="chat-content"]')).toBeTruthy();
    expect(element.querySelector('[data-testid="workspace-content"]')).toBeTruthy();
    expect(element.querySelector('.thread-mobile-chat-hidden')).toBeNull();
    expect(element.querySelector('.thread-mobile-workspace-hidden')).toBeTruthy();
    expect(element.querySelector('[aria-label="Show workspace"]')).toBeTruthy();
  });

  it('renders thread actions in the mobile topbar', () => {
    mockViewport(true);
    const element = renderLayoutWithActions();

    expect(element.querySelector('[aria-label="Thread actions"]')).toBeTruthy();
  });

  it('renders host-provided new chat dialog content', () => {
    const element = render(
      <ThreadWorkspaceLayout
        threads={[]}
        status={{
          state: 'ready',
          transport: 'sdk',
          lastStartedAt: null,
          lastError: null,
          restartCount: 0,
        }}
        currentWorkspaceId="workspace-1"
        workspaceContent={<div data-testid="workspace-content">Workspace</div>}
        renderNewThreadDialogContent={({ currentWorkspaceId }) => (
          <div data-testid="host-new-thread-form">
            Host form for {currentWorkspaceId}
          </div>
        )}
      >
        <div data-testid="chat-content">Chat</div>
      </ThreadWorkspaceLayout>,
    );

    const button = element.querySelector('[title="New Chat"]');
    expect(button).toBeTruthy();
    flushSync(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(document.querySelector('[data-testid="host-new-thread-form"]')?.textContent)
      .toContain('workspace-1');
    expect(document.querySelector('[aria-label="Chat name"]')).toBeNull();
  });
});
