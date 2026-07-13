import type { AgentSubscriptionUsageDto } from '@remote-codex/shared';

function resetLabel(value: string | null) {
  if (!value) return 'reset time unavailable';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'reset time unavailable'
    : `resets ${date.toLocaleString()}`;
}

export function ComposerSubscriptionUsage({
  usage,
}: {
  usage?: AgentSubscriptionUsageDto | null;
}) {
  if (
    !usage ||
    usage.authKind !== 'subscription' ||
    usage.windows.length === 0
  ) {
    return null;
  }

  const windows = usage.windows.slice(0, 2);
  const description = windows
    .map((window) => {
      const remaining = Math.max(0, 100 - window.usedPercent);
      return `${window.label}: ${remaining}% remaining, ${resetLabel(window.resetsAt)}`;
    })
    .join('. ');

  return (
    <button
      type="button"
      className="thread-subscription-usage pointer-events-auto absolute bottom-1 right-2 inline-flex h-4 items-center gap-1 rounded-[0.55rem] border border-stone-500/50 bg-stone-950/20 px-1 text-[8px] font-normal leading-none text-stone-200/90 opacity-80 shadow-sm transition hover:border-sky-300/45 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-200/70 sm:right-3"
      aria-label={`${usage.provider} subscription usage. ${description}`}
      title={`${description}${usage.stale ? '. Last known values.' : ''}`}
    >
      {windows.map((window) => {
        const remaining = Math.max(0, Math.min(100, 100 - window.usedPercent));
        const tone = remaining <= 10
          ? 'bg-rose-400'
          : remaining <= 25
            ? 'bg-amber-300'
            : 'bg-sky-300';
        return (
          <span key={window.id} className="inline-flex items-center gap-0.5">
            <span>{window.label}</span>
            <span className="h-0.5 w-3.5 overflow-hidden rounded-full bg-stone-600/60">
              <span
                className={`block h-full rounded-full ${tone}`}
                style={{ width: `${remaining}%` }}
              />
            </span>
            <span className="tabular-nums">{Math.round(remaining)}%</span>
          </span>
        );
      })}
    </button>
  );
}
