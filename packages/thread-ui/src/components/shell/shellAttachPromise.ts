export interface PendingShellAttachPromise {
  waiters: Array<(connected: boolean) => void>;
  timer: number | null;
}

export type ShellTimerScheduler = (
  callback: () => void,
  delayMs: number,
) => number;

export type ShellTimerClearer = (timer: number) => void;

export interface ShellAttachPromiseController {
  hasPending: () => boolean;
  joinPending: () => Promise<boolean>;
  start: (options: {
    timeoutMs: number;
    setTimeout: ShellTimerScheduler;
    onTimeout: () => void;
  }) => Promise<boolean>;
  settle: (connected: boolean) => void;
  clear: () => void;
}

export function createShellAttachPromiseController({
  clearTimeout,
}: {
  clearTimeout: ShellTimerClearer;
}): ShellAttachPromiseController {
  let pending: PendingShellAttachPromise | null = null;

  const clearPendingTimer = (entry: PendingShellAttachPromise | null) => {
    if (entry?.timer !== null && entry?.timer !== undefined) {
      clearTimeout(entry.timer);
    }
  };

  const settle = (connected: boolean) => {
    const current = pending;
    if (!current) {
      return;
    }
    pending = null;
    clearPendingTimer(current);
    for (const resolve of current.waiters) {
      resolve(connected);
    }
  };

  return {
    hasPending: () => Boolean(pending),
    joinPending: () =>
      new Promise<boolean>((resolve) => {
        pending?.waiters.push(resolve);
      }),
    start: ({ timeoutMs, setTimeout, onTimeout }) =>
      new Promise<boolean>((resolve) => {
        const timer = setTimeout(() => {
          pending = null;
          onTimeout();
          resolve(false);
        }, timeoutMs);
        pending = { waiters: [resolve], timer };
      }),
    settle,
    clear: () => {
      const current = pending;
      pending = null;
      clearPendingTimer(current);
    },
  };
}
