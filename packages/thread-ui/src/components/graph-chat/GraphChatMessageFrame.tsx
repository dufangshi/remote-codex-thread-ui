import type { ReactNode } from 'react';
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

type GraphChatMessageKind = 'userMessage' | 'agentMessage';

function GraphChatRunningDots() {
  return (
    <span className="ml-1.5 inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-200/90"
          style={{ animationDelay: `${index * 180}ms` }}
        />
      ))}
    </span>
  );
}

export function GraphChatMessageStatusBadge({
  status,
}: {
  status: string | null | undefined;
}) {
  if (!status) {
    return null;
  }

  const normalized = status.toLowerCase();
  const isRunning =
    normalized.includes('running') ||
    normalized.includes('generating') ||
    normalized.includes('steering');
  const isFailed = normalized.includes('failed') || normalized.includes('error');
  const isCompleted =
    normalized.includes('accepted') || normalized.includes('complete');
  const className = isRunning
    ? 'ui-status-warning'
    : isFailed
      ? 'ui-status-danger'
      : isCompleted
        ? 'ui-status-success'
        : 'ui-status-neutral';
  const icon = isRunning ? (
    <Loader2 className="h-3.5 w-3.5 animate-spin" />
  ) : isFailed ? (
    <XCircle className="h-3.5 w-3.5" />
  ) : isCompleted ? (
    <CheckCircle2 className="h-3.5 w-3.5" />
  ) : (
    <Circle className="h-3.5 w-3.5" />
  );

  return (
    <span
      className={`thread-graph-message-status inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-normal ${className}`}
      title={status}
      aria-label={`Status: ${status}`}
    >
      <span className="thread-graph-message-status-icon inline-flex shrink-0">
        {isRunning ? <GraphChatRunningDots /> : icon}
      </span>
      <span className="thread-graph-status-label">{status}</span>
    </span>
  );
}

export function GraphChatMessageFrame({
  children,
  copyButton,
  kind,
  reasoning,
  status,
  timeLabel,
  timeTitle,
}: {
  children: ReactNode;
  copyButton?: ReactNode;
  kind: GraphChatMessageKind;
  reasoning?: ReactNode;
  status?: string | null | undefined;
  timeLabel?: string | null | undefined;
  timeTitle?: string | null | undefined;
}) {
  const isUser = kind === 'userMessage';
  const timeNode = timeLabel ? (
    <time
      dateTime={timeTitle ?? undefined}
      title={timeTitle ?? undefined}
      className="thread-graph-message-time text-[10px] leading-none sm:text-[11px]"
    >
      {timeLabel}
    </time>
  ) : null;

  return (
    <div
      data-testid="chat-message"
      data-role={isUser ? 'user' : 'assistant'}
      className="thread-graph-message flex justify-start"
    >
      <div
        className={`thread-graph-message-bubble min-w-0 w-full max-w-full ${
          isUser ? 'is-user' : 'is-assistant'
        }`}
      >
        {!isUser ? (
          <div className="thread-graph-message-header mb-2 flex min-w-0 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="thread-graph-message-sender rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.02em]">
                Assistant
              </span>
              <GraphChatMessageStatusBadge status={status ?? 'Complete'} />
            </div>
            {copyButton || timeNode ? (
              <div className="thread-graph-message-header-actions flex shrink-0 items-center gap-1.5 sm:gap-2">
                {copyButton}
                {timeNode}
              </div>
            ) : null}
          </div>
        ) : null}
        {reasoning}
        <div
          className={`thread-graph-message-content min-w-0 ${
            isUser ? 'is-user' : 'is-assistant'
          }`}
        >
          {children}
        </div>
        {isUser && (status || timeNode) ? (
          <div className="mt-1 flex items-center justify-end gap-2">
            {status ? <GraphChatMessageStatusBadge status={status} /> : null}
            {timeNode}
          </div>
        ) : null}
      </div>
    </div>
  );
}
