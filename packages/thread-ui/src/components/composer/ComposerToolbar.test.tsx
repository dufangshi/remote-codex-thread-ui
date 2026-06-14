/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ComposerToolbar,
  type ComposerToolbarProps,
} from './ComposerToolbar';

let cleanup: (() => void) | null = null;

function baseProps(): ComposerToolbarProps {
  return {
    isShellView: false,
    canToggleShellView: true,
    isMobileShell: false,
    shellPromptLabel: null,
    openMenu: null,
    toolbarClassName: 'toolbar',
    iconButtonClassName: 'icon',
    slashToolboxProps: null,
    attachmentMenuProps: null,
    settingsToolbarProps: null,
    shellToolsPanelProps: null,
    shellControlState: null,
    onToggleView: vi.fn(),
    onDismissPromptFocus: vi.fn(),
    onSetOpenMenu: vi.fn(),
  };
}

function renderToolbar(props: ComposerToolbarProps) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  flushSync(() => {
    root.render(<ComposerToolbar {...props} />);
  });
  cleanup = () => {
    flushSync(() => {
      root.unmount();
    });
    container.remove();
  };
  return container;
}

function button(container: HTMLElement, label: string) {
  const match = Array.from(container.querySelectorAll('button')).find(
    (entry) => entry.getAttribute('aria-label') === label,
  );
  if (!match) {
    throw new Error(`Missing button: ${label}`);
  }
  return match;
}

describe('ComposerToolbar', () => {
  beforeEach(() => {
    cleanup = null;
  });

  afterEach(() => {
    cleanup?.();
    cleanup = null;
    vi.restoreAllMocks();
  });

  it('renders the shell toggle in chat mode', () => {
    const props = baseProps();
    const container = renderToolbar(props);

    button(container, 'Switch to shell').dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(props.onToggleView).toHaveBeenCalledTimes(1);
  });

  it('renders the shell prompt label in shell mode', () => {
    const container = renderToolbar({
      ...baseProps(),
      isShellView: true,
      shellPromptLabel: 'repo',
    });

    expect(container.textContent).toContain('repo');
    expect(button(container, 'Switch to chat')).toBeTruthy();
  });

  it('opens mobile shell tools through the menu callback', () => {
    const props = baseProps();
    const setOpenMenu = vi.fn();
    const container = renderToolbar({
      ...props,
      isShellView: true,
      isMobileShell: true,
      onSetOpenMenu: setOpenMenu,
      shellToolsPanelProps: {
        busy: false,
        shellControlState: null,
        onPaste: vi.fn(),
        onCopy: vi.fn(),
        onClear: vi.fn(),
        onShellControl: vi.fn(),
      },
    });

    button(container, 'Open shell tools').dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(props.onDismissPromptFocus).toHaveBeenCalledTimes(1);
    expect(setOpenMenu).toHaveBeenCalledTimes(1);
    expect(setOpenMenu.mock.calls[0]?.[0]('shellTools')).toBeNull();
  });
});
