/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  useComposerSettingsActions,
  type UseComposerSettingsActionsInput,
  type UseComposerSettingsActionsResult,
} from './useComposerSettingsActions';

let latestResult: UseComposerSettingsActionsResult | null = null;

function HookHarness(props: UseComposerSettingsActionsInput) {
  latestResult = useComposerSettingsActions(props);
  return null;
}

function renderHookHarness(
  input: Partial<UseComposerSettingsActionsInput> = {},
) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const closeMenu = input.closeMenu ?? vi.fn();
  const props: UseComposerSettingsActionsInput = {
    collaborationMode: 'default',
    closeMenu,
    ...input,
  };

  flushSync(() => {
    root.render(<HookHarness {...props} />);
  });

  return {
    closeMenu,
    rerender(nextInput: Partial<UseComposerSettingsActionsInput>) {
      Object.assign(props, nextInput);
      flushSync(() => {
        root.render(<HookHarness {...props} />);
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

async function runAsyncAction(action: () => Promise<void> | undefined) {
  let actionPromise: Promise<void> | undefined;
  flushSync(() => {
    actionPromise = action();
  });

  await actionPromise;
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  flushSync(() => {});
}

describe('useComposerSettingsActions', () => {
  beforeEach(() => {
    latestResult = null;
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

  it('optimistically displays a collaboration mode update and closes the menu', async () => {
    const onUpdateSettings = vi.fn();
    const harness = renderHookHarness({ onUpdateSettings });

    await runAsyncAction(() =>
      latestResult?.updateSettings({ collaborationMode: 'plan' }),
    );

    expect(onUpdateSettings).toHaveBeenCalledWith({
      collaborationMode: 'plan',
    });
    expect(latestResult?.displayedCollaborationMode).toBe('plan');
    expect(harness.closeMenu).toHaveBeenCalledTimes(1);
    harness.unmount();
  });

  it('keeps the current collaboration mode for non-mode updates', async () => {
    const onUpdateSettings = vi.fn();
    const harness = renderHookHarness({
      collaborationMode: 'plan',
      onUpdateSettings,
    });

    await runAsyncAction(() =>
      latestResult?.updateSettings({ fastMode: true }),
    );

    expect(onUpdateSettings).toHaveBeenCalledWith({ fastMode: true });
    expect(latestResult?.displayedCollaborationMode).toBe('plan');
    expect(harness.closeMenu).toHaveBeenCalledTimes(1);
    harness.unmount();
  });

  it('rolls back the optimistic collaboration mode when the update fails', async () => {
    const onUpdateSettings = vi.fn(async () => {
      throw new Error('settings failed');
    });
    const harness = renderHookHarness({ onUpdateSettings });

    await expect(
      runAsyncAction(() =>
        latestResult?.updateSettings({ collaborationMode: 'plan' }),
      ),
    ).rejects.toThrow('settings failed');
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    flushSync(() => {});

    expect(latestResult?.displayedCollaborationMode).toBe('default');
    expect(harness.closeMenu).not.toHaveBeenCalled();
    harness.unmount();
  });

  it('resets the optimistic mode when the host collaboration mode changes', async () => {
    const harness = renderHookHarness();

    await runAsyncAction(() =>
      latestResult?.updateSettings({ collaborationMode: 'plan' }),
    );
    expect(latestResult?.displayedCollaborationMode).toBe('plan');

    harness.rerender({ collaborationMode: 'plan' });
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    flushSync(() => {});

    harness.rerender({ collaborationMode: 'default' });
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    flushSync(() => {});

    expect(latestResult?.displayedCollaborationMode).toBe('default');
    harness.unmount();
  });
});
