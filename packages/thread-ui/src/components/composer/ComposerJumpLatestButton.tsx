export function ComposerJumpLatestButton({
  activeView,
  followTail,
  onToggleFollow,
}: {
  activeView: 'chat' | 'shell';
  followTail: boolean;
  onToggleFollow?: (() => void) | undefined;
}) {
  if (activeView !== 'chat') {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Jump to latest"
      title={followTail ? 'Latest turn is in view' : 'Jump to the latest messages'}
      onClick={() => onToggleFollow?.()}
      className="absolute left-1/2 top-0 z-[90] inline-flex h-11 min-w-[7rem] -translate-x-1/2 -translate-y-full items-end justify-center bg-transparent pb-1 touch-manipulation sm:h-10"
    >
      <span
        className={`thread-jump-latest-badge pointer-events-none inline-flex h-4 min-w-[3.75rem] items-center justify-center rounded-[0.7rem] border shadow-sm transition ${
          followTail
            ? 'is-active border-sky-300/36 bg-sky-300/[0.03] text-sky-100/86'
            : 'border-stone-500/70 bg-stone-950/[0.08] text-stone-200/86'
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 fill-none stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </span>
    </button>
  );
}
