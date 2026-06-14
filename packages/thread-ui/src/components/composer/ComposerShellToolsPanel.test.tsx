/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ThreadShellControlState } from '../../types';
import { ComposerShellToolsPanel } from './ComposerShellToolsPanel';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderNode(node: React.ReactNode) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(node);
  });

  return container;
}

function buttonByText(view: HTMLElement, text: string) {
  return Array.from(view.querySelectorAll<HTMLButtonElement>('button')).find(
    (button) => button.textContent?.includes(text),
  );
}

function shellControlState(
  overrides: Partial<ThreadShellControlState> = {},
): ThreadShellControlState {
  return {
    status: 'running',
    connectionButtonDisabled: false,
    connectionButtonLabel: 'Connected',
    shellInputEnabled: true,
    isConnecting: false,
    isCommandRunning: false,
    promptLabel: '$',
    isMobileShell: true,
    hasShell: true,
    busy: false,
    loading: false,
    error: null,
    ...overrides,
  };
}

describe('ComposerShellToolsPanel', () => {
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

  it('invokes paste, copy, clear, and shell control actions', () => {
    const onPaste = vi.fn();
    const onCopy = vi.fn();
    const onClear = vi.fn();
    const onShellControl = vi.fn();
    const view = renderNode(
      <ComposerShellToolsPanel
        busy={false}
        shellControlState={shellControlState({
          shellInputEnabled: true,
          isCommandRunning: true,
        })}
        onPaste={onPaste}
        onCopy={onCopy}
        onClear={onClear}
        onShellControl={onShellControl}
      />,
    );

    buttonByText(view, 'Paste')?.click();
    buttonByText(view, 'Copy')?.click();
    buttonByText(view, 'CLEAR')?.click();
    buttonByText(view, 'CTRL-C')?.click();
    buttonByText(view, 'CTRL-D')?.click();
    buttonByText(view, 'ESC')?.click();
    buttonByText(view, 'TAB')?.click();
    buttonByText(view, 'UP')?.click();
    buttonByText(view, 'DOWN')?.click();

    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onShellControl.mock.calls).toEqual([
      ['ctrl_c'],
      ['ctrl_d'],
      ['esc'],
      ['tab'],
      ['up'],
      ['down'],
    ]);
  });

  it('disables unavailable shell controls', () => {
    const view = renderNode(
      <ComposerShellToolsPanel
        busy={true}
        shellControlState={shellControlState({
          shellInputEnabled: false,
          isCommandRunning: false,
        })}
        onPaste={vi.fn()}
        onCopy={vi.fn()}
        onClear={vi.fn()}
        onShellControl={vi.fn()}
      />,
    );

    expect(buttonByText(view, 'Paste')?.disabled).toBe(false);
    expect(buttonByText(view, 'Copy')?.disabled).toBe(false);
    expect(buttonByText(view, 'CLEAR')?.disabled).toBe(true);
    expect(buttonByText(view, 'CTRL-C')?.disabled).toBe(true);
    expect(buttonByText(view, 'CTRL-D')?.disabled).toBe(true);
    expect(buttonByText(view, 'ESC')?.disabled).toBe(true);
    expect(buttonByText(view, 'TAB')?.disabled).toBe(true);
    expect(buttonByText(view, 'UP')?.disabled).toBe(true);
    expect(buttonByText(view, 'DOWN')?.disabled).toBe(true);
  });

  it('keeps ctrl-c disabled when no command is running', () => {
    const view = renderNode(
      <ComposerShellToolsPanel
        busy={false}
        shellControlState={shellControlState({
          shellInputEnabled: true,
          isCommandRunning: false,
        })}
        onPaste={vi.fn()}
        onCopy={vi.fn()}
        onClear={vi.fn()}
        onShellControl={vi.fn()}
      />,
    );

    expect(buttonByText(view, 'CTRL-C')?.disabled).toBe(true);
    expect(buttonByText(view, 'CTRL-D')?.disabled).toBe(false);
  });
});
