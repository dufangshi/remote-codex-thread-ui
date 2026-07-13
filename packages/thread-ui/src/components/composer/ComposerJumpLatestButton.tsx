export function ComposerJumpLatestButton({
  activeView,
  followTail,
  onToggleFollow,
  canJumpToPreviousTurn,
  onJumpToPreviousTurn,
  canJumpToNextTurn,
  onJumpToNextTurn,
}: {
  activeView: 'chat' | 'shell';
  followTail: boolean;
  onToggleFollow?: (() => void) | undefined;
  canJumpToPreviousTurn?: boolean | undefined;
  onJumpToPreviousTurn?: (() => void) | undefined;
  canJumpToNextTurn?: boolean | undefined;
  onJumpToNextTurn?: (() => void) | undefined;
}) {
  if (activeView !== 'chat') {
    return null;
  }

  return (
    <div className="absolute left-1/2 top-0 z-[90] inline-flex h-11 min-w-[9rem] -translate-x-1/2 -translate-y-full items-end justify-center bg-transparent pb-1 touch-manipulation sm:h-10">
      <span className={`thread-jump-latest-badge inline-flex h-5 min-w-[7.5rem] overflow-hidden rounded-[0.7rem] border shadow-sm transition ${
          followTail
            ? 'is-active border-sky-300/36 bg-sky-300/[0.03] text-sky-100/86'
            : 'border-stone-500/70 bg-stone-950/[0.08] text-stone-200/86'
        }`}>
        <button
          type="button"
          aria-label="Jump to previous turn"
          title={canJumpToPreviousTurn ? 'Jump to the start of the previous turn' : 'No earlier turn'}
          disabled={!canJumpToPreviousTurn}
          onClick={() => onJumpToPreviousTurn?.()}
          className="inline-flex w-10 items-center justify-center transition hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sky-200/70 disabled:cursor-default disabled:opacity-35"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 12h9M8 10V5M6 7l2-2 2 2" />
          </svg>
        </button>
        <span aria-hidden="true" className="w-px bg-current opacity-20" />
        <button
          type="button"
          aria-label="Jump to latest"
          title={followTail ? 'Latest messages are in view' : 'Jump to the bottom'}
          onClick={() => onToggleFollow?.()}
          className="inline-flex w-10 items-center justify-center transition hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sky-200/70"
        >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 fill-none stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 5.5 4 4 4-4M3.5 12.5h9" />
        </svg>
        </button>
        <span aria-hidden="true" className="w-px bg-current opacity-20" />
        <button
          type="button"
          aria-label="Jump to next turn"
          title={canJumpToNextTurn ? 'Jump to the start of the next turn' : 'No later turn'}
          disabled={!canJumpToNextTurn}
          onClick={() => onJumpToNextTurn?.()}
          className="inline-flex w-10 items-center justify-center transition hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sky-200/70 disabled:cursor-default disabled:opacity-35"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 4h9M8 6v5m-2-2 2 2 2-2" />
          </svg>
        </button>
      </span>
    </div>
  );
}
