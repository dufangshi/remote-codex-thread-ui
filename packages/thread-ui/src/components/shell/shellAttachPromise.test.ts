import { describe, expect, it, vi } from 'vitest';

import { createShellAttachPromiseController } from './shellAttachPromise';

describe('shell attach promise controller', () => {
  it('joins pending attach promises and settles all waiters', async () => {
    const clearTimeout = vi.fn();
    const controller = createShellAttachPromiseController({ clearTimeout });
    const setTimeout = vi.fn(() => 42);
    const onTimeout = vi.fn();

    const first = controller.start({
      timeoutMs: 4500,
      setTimeout,
      onTimeout,
    });
    const second = controller.joinPending();

    expect(controller.hasPending()).toBe(true);
    controller.settle(true);

    await expect(first).resolves.toBe(true);
    await expect(second).resolves.toBe(true);
    expect(clearTimeout).toHaveBeenCalledWith(42);
    expect(onTimeout).not.toHaveBeenCalled();
    expect(controller.hasPending()).toBe(false);
  });

  it('ignores join attempts when no attach is pending', async () => {
    const controller = createShellAttachPromiseController({
      clearTimeout: vi.fn(),
    });
    const joined = controller.joinPending();
    let resolved = false;
    joined.then(() => {
      resolved = true;
    });

    await Promise.resolve();

    expect(resolved).toBe(false);
  });

  it('resolves false and clears pending state on timeout', async () => {
    const clearTimeout = vi.fn();
    const timeout = {
      callback: null as (() => void) | null,
    };
    const controller = createShellAttachPromiseController({ clearTimeout });
    const onTimeout = vi.fn();
    const setTimeout = vi.fn((callback: () => void) => {
      timeout.callback = callback;
      return 7;
    });

    const pending = controller.start({
      timeoutMs: 4500,
      setTimeout,
      onTimeout,
    });
    timeout.callback?.();

    await expect(pending).resolves.toBe(false);
    expect(onTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(controller.hasPending()).toBe(false);
  });

  it('clears pending timers without resolving on clear', async () => {
    const clearTimeout = vi.fn();
    const controller = createShellAttachPromiseController({ clearTimeout });
    const setTimeout = vi.fn(() => 99);
    const pending = controller.start({
      timeoutMs: 4500,
      setTimeout,
      onTimeout: vi.fn(),
    });
    let resolved = false;
    pending.then(() => {
      resolved = true;
    });

    controller.clear();
    await Promise.resolve();

    expect(clearTimeout).toHaveBeenCalledWith(99);
    expect(resolved).toBe(false);
    expect(controller.hasPending()).toBe(false);
  });
});
