/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ComposerDraft } from './composerUtils';
import {
  useComposerGoal,
  type UseComposerGoalResult,
} from './useComposerGoal';

let latestResult: UseComposerGoalResult | null = null;
const promptHost = document.createElement('div');

function HookHarness(
  props: Parameters<typeof useComposerGoal>[0],
) {
  latestResult = useComposerGoal(props);
  return null;
}

function renderHookHarness(
  input: Partial<Parameters<typeof useComposerGoal>[0]> & {
    prompt: string;
  },
) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const updateDraft = input.updateDraft ?? vi.fn();
  const closeMenu = input.closeMenu ?? vi.fn();
  const resetSlashPanel = input.resetSlashPanel ?? vi.fn();
  const props: Parameters<typeof useComposerGoal>[0] = {
    goalTokenBudgetSource: null,
    promptRef: { current: promptHost },
    updateDraft,
    closeMenu,
    resetSlashPanel,
    ...input,
  };

  flushSync(() => {
    root.render(<HookHarness {...props} />);
  });

  return {
    updateDraft,
    closeMenu,
    resetSlashPanel,
    rerender(nextInput: Partial<Parameters<typeof useComposerGoal>[0]>) {
      flushSync(() => {
        root.render(<HookHarness {...props} {...nextInput} />);
      });
    },
    unmount() {
      flushSync(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

function applyDraftUpdate(
  current: ComposerDraft,
  updater: (current: ComposerDraft) => ComposerDraft,
) {
  return updater(current);
}

async function submitLatestGoal() {
  let submitPromise: Promise<boolean> | undefined;
  flushSync(() => {
    submitPromise = latestResult?.submitGoal();
  });

  const submitted = (await submitPromise) ?? false;
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  flushSync(() => {});
  return submitted;
}

describe('useComposerGoal', () => {
  beforeEach(() => {
    latestResult = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    latestResult = null;
    vi.restoreAllMocks();
  });

  it('enters compose mode, seeds the budget, closes menus, and focuses the prompt', () => {
    const onOpenGoal = vi.fn();
    const focus = vi.spyOn(promptHost, 'focus');
    const harness = renderHookHarness({
      prompt: '',
      goalTokenBudgetSource: {
        threadId: 'thread-1',
        localGoalId: 'goal-1',
        objective: 'ship',
        status: 'active',
        tokenBudget: 12500,
        tokensUsed: 1000,
        timeUsedSeconds: 0,
        createdAt: '2026-06-10T00:00:00.000Z',
        updatedAt: '2026-06-10T00:00:00.000Z',
      },
      onOpenGoal,
    });

    flushSync(() => {
      latestResult?.enterGoalComposeMode();
    });

    expect(latestResult?.goalComposeMode).toBe(true);
    expect(latestResult?.goalTokenBudget).toBe('12.5');
    expect(harness.closeMenu).toHaveBeenCalled();
    expect(harness.resetSlashPanel).toHaveBeenCalled();
    expect(onOpenGoal).toHaveBeenCalled();
    expect(focus).toHaveBeenCalled();
    harness.unmount();
  });

  it('rejects empty objectives before calling the updater', async () => {
    const onUpdateGoal = vi.fn();
    const harness = renderHookHarness({
      prompt: '   ',
      onUpdateGoal,
    });

    await submitLatestGoal();

    expect(onUpdateGoal).not.toHaveBeenCalled();
    expect(latestResult?.goalLocalError).toBe('Goal objective cannot be empty.');
    harness.unmount();
  });

  it('rejects invalid token budgets', async () => {
    const onUpdateGoal = vi.fn();
    const harness = renderHookHarness({
      prompt: 'ship it',
      onUpdateGoal,
    });

    flushSync(() => {
      latestResult?.setGoalTokenBudget('abc');
    });
    await submitLatestGoal();

    expect(onUpdateGoal).not.toHaveBeenCalled();
    expect(latestResult?.goalLocalError).toBe(
      'Token budget must be a positive number in thousands.',
    );
    harness.unmount();
  });

  it('submits the goal, clears compose state, and resets the draft on success', async () => {
    let draft: ComposerDraft = { prompt: 'ship it', attachments: [] };
    const updateDraft = vi.fn((updater: (current: ComposerDraft) => ComposerDraft) => {
      draft = applyDraftUpdate(draft, updater);
    });
    const onUpdateGoal = vi.fn();
    const harness = renderHookHarness({
      prompt: ' ship it ',
      updateDraft,
      onUpdateGoal,
    });

    flushSync(() => {
      latestResult?.enterGoalComposeMode();
      latestResult?.setGoalTokenBudget('42');
    });
    let submitted = false;
    submitted = await submitLatestGoal();

    expect(submitted).toBe(true);
    expect(onUpdateGoal).toHaveBeenCalledWith({
      objective: 'ship it',
      status: 'active',
      tokenBudget: 42000,
    });
    expect(latestResult?.goalComposeMode).toBe(false);
    expect(latestResult?.goalTokenBudget).toBe('');
    expect(draft).toEqual({ prompt: '', attachments: [] });
    harness.unmount();
  });

  it('keeps compose mode open and shows the thrown error on failure', async () => {
    const harness = renderHookHarness({
      prompt: 'ship it',
      onUpdateGoal: vi.fn(async () => {
        throw new Error('backend rejected');
      }),
    });

    flushSync(() => {
      latestResult?.enterGoalComposeMode();
    });
    let submitted = true;
    submitted = await submitLatestGoal();

    expect(submitted).toBe(false);
    expect(latestResult?.goalComposeMode).toBe(true);
    expect(latestResult?.goalBusy).toBe(false);
    expect(latestResult?.goalLocalError).toBe('backend rejected');
    harness.unmount();
  });
});
