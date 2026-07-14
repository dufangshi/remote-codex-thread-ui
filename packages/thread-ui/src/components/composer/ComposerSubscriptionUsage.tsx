import { useState } from 'react';
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
  const [detailsVisible, setDetailsVisible] = useState(false);

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
      className={`thread-subscription-usage group pointer-events-auto absolute bottom-1 right-2 inline-flex h-5 items-center gap-1.5 rounded-full border border-stone-500/45 bg-stone-950/20 px-1.5 text-[8px] font-normal leading-none text-stone-200/90 shadow-sm transition-[border-color,background-color,opacity] duration-200 hover:border-stone-400/70 hover:bg-stone-900/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-200/70 sm:right-3 ${usage.stale ? 'opacity-60' : 'opacity-90'}`}
      aria-label={`${usage.provider} subscription usage. ${description}`}
      aria-expanded={detailsVisible}
      onClick={() => setDetailsVisible((current) => !current)}
    >
      {windows.map((window) => {
        const remaining = Math.max(0, Math.min(100, 100 - window.usedPercent));
        const hue = Math.round(18 + (remaining / 100) * 190);
        return (
          <span key={window.id} className="inline-flex items-center gap-1">
            <span>{window.label}</span>
            <span
              data-subscription-window-track="true"
              className="h-[3px] w-8 overflow-hidden rounded-full bg-stone-600/55 sm:w-10"
            >
              <span
                className="block h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${remaining}%`,
                  backgroundImage: `linear-gradient(90deg, oklch(68% 0.17 ${hue}), oklch(82% 0.13 ${Math.min(hue + 18, 235)}))`,
                }}
              />
            </span>
          </span>
        );
      })}
      <span
        aria-hidden={!detailsVisible}
        className={`pointer-events-none absolute right-0 bottom-full mb-1 whitespace-nowrap rounded-md border border-stone-600/65 bg-stone-950/95 px-1.5 py-1 text-[9px] font-normal leading-none text-stone-100 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${detailsVisible ? 'translate-y-0 opacity-100' : 'translate-y-0.5 opacity-0'}`}
      >
        {windows.map((window, index) => (
          <span key={window.id}>
            {index > 0 ? ' · ' : ''}
            {window.label} {Math.round(100 - window.usedPercent)}%
          </span>
        ))}
        {usage.stale ? ' · last known' : ''}
      </span>
    </button>
  );
}
