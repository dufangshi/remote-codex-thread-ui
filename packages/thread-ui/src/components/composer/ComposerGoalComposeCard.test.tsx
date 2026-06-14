/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ComposerGoalComposeCard } from './ComposerGoalComposeCard';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderCard({
  tokenBudget = '',
  error = null,
  onTokenBudgetChange = vi.fn(),
  onCancel = vi.fn(),
}: {
  tokenBudget?: string;
  error?: string | null;
  onTokenBudgetChange?: (value: string) => void;
  onCancel?: () => void;
} = {}) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(
      <ComposerGoalComposeCard
        tokenBudget={tokenBudget}
        error={error}
        onTokenBudgetChange={onTokenBudgetChange}
        onCancel={onCancel}
      />,
    );
  });

  return container;
}

describe('ComposerGoalComposeCard', () => {
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

  it('renders the token budget input without an error by default', () => {
    const view = renderCard({ tokenBudget: '24' });
    const input = view.querySelector<HTMLInputElement>(
      '[aria-label="Goal token budget"]',
    );

    expect(view.textContent).toContain('Goal');
    expect(input?.value).toBe('24');
    expect(view.querySelector('.thread-goal-compose-error')).toBeNull();
  });

  it('forwards token budget changes', () => {
    const onTokenBudgetChange = vi.fn();
    const view = renderCard({ onTokenBudgetChange });
    const input = view.querySelector<HTMLInputElement>(
      '[aria-label="Goal token budget"]',
    );

    flushSync(() => {
      if (input) {
        const valueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value',
        )?.set;
        valueSetter?.call(input, '32');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    expect(onTokenBudgetChange).toHaveBeenCalledWith('32');
  });

  it('renders local errors and cancel action', () => {
    const onCancel = vi.fn();
    const view = renderCard({
      error: 'Token budget must be positive.',
      onCancel,
    });

    expect(view.textContent).toContain('Token budget must be positive.');
    view.querySelector<HTMLButtonElement>('button')?.click();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
