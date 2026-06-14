/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  INITIAL_VISIBLE_TURNS,
  LOAD_STEP,
} from './timelineScroll';
import { useTimelineScroll } from './useTimelineScroll';

type TimelineScrollResult = ReturnType<typeof useTimelineScroll>;

let latestResult: TimelineScrollResult | null = null;

function HookHarness(
  props: Parameters<typeof useTimelineScroll>[0] & {
    renderNodes?: boolean;
  },
) {
  latestResult = useTimelineScroll(props);

  if (!props.renderNodes) {
    return null;
  }

  return (
    <div
      ref={latestResult.scrollContainerRef}
      data-testid="scroll-container"
      onScroll={latestResult.handleScroll}
    >
      <div ref={latestResult.scrollContentRef}>
        <div ref={latestResult.topSentinelRef} />
        <div ref={latestResult.tailSentinelRef} />
      </div>
    </div>
  );
}

function renderHookHarness(
  input: Parameters<typeof useTimelineScroll>[0] & {
    renderNodes?: boolean;
  },
) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  flushSync(() => {
    root.render(<HookHarness {...input} />);
  });

  return {
    container,
    rerender(
      nextInput: Parameters<typeof useTimelineScroll>[0] & {
        renderNodes?: boolean;
      },
    ) {
      flushSync(() => {
        root.render(<HookHarness {...nextInput} />);
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

function baseInput(
  overrides: Partial<Parameters<typeof useTimelineScroll>[0]> = {},
): Parameters<typeof useTimelineScroll>[0] {
  return {
    threadId: 'thread-1',
    turnsLength: 25,
    loadingEarlier: false,
    scrollRequestKey: 0,
    bottomSpacer: 0,
    contentRevisionInputs: [],
    ...overrides,
  };
}

describe('useTimelineScroll', () => {
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
  });

  it('derives local hidden counts and loads earlier turns in fixed steps', () => {
    const harness = renderHookHarness(baseInput({ turnsLength: 35 }));

    expect(latestResult?.serverManagedHistory).toBe(false);
    expect(latestResult?.startIndex).toBe(25);
    expect(latestResult?.hiddenCount).toBe(25);
    expect(latestResult?.showLoadAll).toBe(false);

    flushSync(() => {
      latestResult?.handleLoadEarlierClick();
    });
    expect(latestResult?.startIndex).toBe(
      35 - (INITIAL_VISIBLE_TURNS + LOAD_STEP),
    );

    flushSync(() => {
      latestResult?.handleLoadEarlierClick();
    });
    expect(latestResult?.showLoadAll).toBe(true);

    flushSync(() => {
      latestResult?.handleLoadAllClick();
    });
    expect(latestResult?.startIndex).toBe(0);
    expect(latestResult?.hiddenCount).toBe(0);
    harness.unmount();
  });

  it('delegates earlier loading to the server when history is server-managed', () => {
    const onLoadEarlier = vi.fn();
    const harness = renderHookHarness(
      baseInput({
        turnsLength: 10,
        totalTurnCount: 30,
        onLoadEarlier,
      }),
    );

    expect(latestResult?.serverManagedHistory).toBe(true);
    expect(latestResult?.hiddenCount).toBe(20);
    expect(latestResult?.unloadedHiddenCount).toBe(20);

    flushSync(() => {
      latestResult?.handleLoadEarlierClick();
    });

    expect(onLoadEarlier).toHaveBeenCalledTimes(1);
    expect(latestResult?.startIndex).toBe(0);
    harness.unmount();
  });

  it('notifies tail visibility changes from scroll geometry', async () => {
    const onTailVisibilityChange = vi.fn();
    const harness = renderHookHarness({
      ...baseInput({
        onTailVisibilityChange,
      }),
      renderNodes: true,
    });
    const scrollContainer = harness.container.querySelector<HTMLDivElement>(
      '[data-testid="scroll-container"]',
    );
    if (!scrollContainer) {
      throw new Error('Expected scroll container to render.');
    }

    Object.defineProperties(scrollContainer, {
      scrollHeight: {
        configurable: true,
        value: 1000,
      },
      clientHeight: {
        configurable: true,
        value: 100,
      },
      scrollTop: {
        configurable: true,
        writable: true,
        value: 900,
      },
    });

    flushSync(() => {
      latestResult?.handleScroll();
    });

    await vi.waitFor(() => {
      expect(onTailVisibilityChange).toHaveBeenCalledWith(true);
    });

    scrollContainer.scrollTop = 100;
    flushSync(() => {
      latestResult?.handleScroll();
    });

    await vi.waitFor(() => {
      expect(onTailVisibilityChange).toHaveBeenCalledWith(false);
    });
    harness.unmount();
  });
});
