/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ComposerJumpLatestButton } from './ComposerJumpLatestButton';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderButton({
  activeView,
  followTail = false,
  onToggleFollow = vi.fn(),
}: {
  activeView: 'chat' | 'shell';
  followTail?: boolean;
  onToggleFollow?: () => void;
}) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(
      <ComposerJumpLatestButton
        activeView={activeView}
        followTail={followTail}
        onToggleFollow={onToggleFollow}
      />,
    );
  });

  return { view: container, onToggleFollow };
}

describe('ComposerJumpLatestButton', () => {
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

  it('renders only in chat view and forwards clicks', () => {
    const { view, onToggleFollow } = renderButton({ activeView: 'chat' });
    const button = view.querySelector<HTMLButtonElement>(
      '[aria-label="Jump to latest"]',
    );

    expect(button).not.toBeNull();
    button?.click();
    expect(onToggleFollow).toHaveBeenCalledTimes(1);
  });

  it('is hidden in shell view', () => {
    const { view } = renderButton({ activeView: 'shell' });

    expect(view.querySelector('[aria-label="Jump to latest"]')).toBeNull();
  });

  it('marks the badge active when following the tail', () => {
    const { view } = renderButton({ activeView: 'chat', followTail: true });

    expect(view.querySelector('.thread-jump-latest-badge')?.className).toContain(
      'is-active',
    );
  });
});
