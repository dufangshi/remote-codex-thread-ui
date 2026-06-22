import { memo, useCallback, useMemo, useState } from 'react';

import type {
  RespondThreadActionRequestInput,
  ThreadActionRequestDto,
  ThreadActivityNoteDto,
  ThreadAnsweredRequestNoteDto,
  ThreadHistoryItemDetailDto,
  ThreadHistoryItemDto,
  ThreadPendingSteerDto,
  ThreadTurnDto,
} from '@remote-codex/shared';
import { useAppShellNav } from '../app-shell/AppShellNavContext';
import { LongTextDialog } from './LongTextDialog';
import type { ThreadTimelineAdapter } from '../adapters';
import { GraphChatCompactMessageItem as CompactMessageItem } from './graph-chat/GraphChatCompactMessageItem';
import {
  isRunningHistoryStatus,
  parseHookPromptText,
  type TimelineTurn,
} from './timeline/timelineItems';
import {
  buildActivityNoteAnchors,
  buildRequestEntryAnchors,
} from './timeline/timelineAnchors';
import {
  ActivityNoteSection,
  ActivityRequestEntrySection,
  RequestEntrySection,
  RequestEntrySectionForTurn,
} from './timeline/TimelineRequestCards';
import {
  HistoryItemRow,
  ThreadTurnRow,
} from './timeline/TimelineTurnRows';
import {
  buildSyntheticLiveTurn,
} from './timeline/timelineScroll';
import { useDeferredHistoryDetail } from './timeline/useDeferredHistoryDetail';
import { useTimelineScroll } from './timeline/useTimelineScroll';

export interface ThreadTimelineProps {
  threadId?: string | undefined;
  turns: ThreadTurnDto[];
  totalTurnCount?: number;
  pendingRequests?: ThreadActionRequestDto[];
  activeTurnId?: string | null;
  threadRunning?: boolean;
  livePlan?: {
    turnId: string;
    explanation: string | null;
    plan: Array<{ step: string; status: string }>;
  } | null;
  liveItems?: {
    turnId: string;
    items: ThreadHistoryItemDto[];
  } | null;
  respondingRequestId?: string | null;
  onRespondToRequest?: (
    requestId: string,
    input: RespondThreadActionRequestInput,
  ) => Promise<void> | void;
  liveOutput: string;
  scrollRequestKey?: number;
  bottomSpacer?: number;
  className?: string;
  onTailVisibilityChange?: (isVisible: boolean) => void;
  loadingEarlier?: boolean;
  onLoadEarlier?: () => void;
  ephemeralUserNote?: string | null;
  answeredRequestNotes?: ThreadAnsweredRequestNoteDto[];
  activityNotes?: ThreadActivityNoteDto[];
  pendingSteers?: ThreadPendingSteerDto[];
  optimisticSteers?: Array<{
    id: string;
    clientRequestId: string;
    turnId: string;
    prompt: string;
    createdAt: string;
    status: 'steering' | 'accepted';
  }>;
  optimisticTurn?: TimelineTurn | null;
  onLoadHistoryItemDetail?: (
    itemId: string,
  ) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
  onOpenThread?: (threadId: string) => void;
  onSelectArtifact?: (input: {
    item: ThreadHistoryItemDto & { kind: 'artifact' };
    artifact: NonNullable<ThreadHistoryItemDto['artifact']>;
  }) => void;
  onSelectHistoryItemDetail?: (input: {
    item: ThreadHistoryItemDto;
    detail: ThreadHistoryItemDetailDto;
  }) => void;
  adapter?: ThreadTimelineAdapter | undefined;
  autoCollapseCompletedTurns?: boolean;
}

function isTerminalTurnStatus(status: TimelineTurn['status']) {
  return status === 'completed' || status === 'failed' || status === 'interrupted';
}

function mergeOptimisticTurnItems(
  turn: TimelineTurn,
  optimisticTurn: TimelineTurn | null,
) {
  if (!optimisticTurn || optimisticTurn.id !== turn.id || optimisticTurn.items.length === 0) {
    return turn;
  }

  const materializedItemIds = new Set(turn.items.map((item) => item.id));
  const optimisticOnlyItems = optimisticTurn.items.filter(
    (item) => !materializedItemIds.has(item.id),
  );

  if (optimisticOnlyItems.length === 0) {
    return turn;
  }

  return {
    ...turn,
    items: [...optimisticOnlyItems, ...turn.items],
  };
}

function ThreadTimelineComponent({
  threadId,
  turns,
  totalTurnCount,
  pendingRequests = [],
  activeTurnId = null,
  threadRunning = false,
  pendingSteers = [],
  livePlan = null,
  liveItems = null,
  respondingRequestId = null,
  onRespondToRequest,
  liveOutput,
  scrollRequestKey = 0,
  bottomSpacer = 0,
  className = '',
  onTailVisibilityChange,
  loadingEarlier = false,
  onLoadEarlier,
  ephemeralUserNote = null,
  answeredRequestNotes = [],
  activityNotes = [],
  optimisticSteers = [],
  optimisticTurn = null,
  onLoadHistoryItemDetail,
  onOpenThread,
  onSelectArtifact,
  onSelectHistoryItemDetail,
  adapter,
  autoCollapseCompletedTurns,
}: ThreadTimelineProps) {
  const shellNav = useAppShellNav();
  const effectiveAutoCollapseCompletedTurns =
    autoCollapseCompletedTurns ??
    shellNav?.autoCollapseCompletedTurns ??
    false;
  const [collapsedTurnOverrides, setCollapsedTurnOverrides] = useState<Record<string, boolean>>(
    {},
  );
  const loadHistoryItemDetail =
    adapter?.onLoadHistoryItemDetail ?? onLoadHistoryItemDetail;
  const openLinkedThread = adapter?.onOpenLinkedThread;
  const {
    expandedText,
    openExpandedText: handleOpenExpandedText,
    openCommandDetail: handleOpenCommandDetail,
    openToolCallDetail: handleOpenToolCallDetail,
    openDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
    closeExpandedText,
  } = useDeferredHistoryDetail({
    loadHistoryItemDetail,
    onSelectHistoryItemDetail,
  });
  const {
    scrollContainerRef,
    scrollContentRef,
    tailSentinelRef,
    topSentinelRef,
    handleScroll,
    preserveScrollPositionForResize,
    serverManagedHistory,
    effectiveTotalTurnCount,
    startIndex,
    visibleTurnAbsoluteOffset,
    hiddenCount,
    loadedHiddenCount,
    unloadedHiddenCount,
    showLoadAll,
    handleLoadEarlierClick,
    handleLoadAllClick,
  } = useTimelineScroll({
    threadId,
    turnsLength: turns.length,
    totalTurnCount,
    loadingEarlier,
    onLoadEarlier,
    scrollRequestKey,
    bottomSpacer,
    onTailVisibilityChange,
    contentRevisionInputs: [
      turns,
      pendingRequests,
      pendingSteers,
      optimisticSteers,
      liveOutput,
      livePlan,
      liveItems,
      optimisticTurn,
      answeredRequestNotes,
      activityNotes,
      ephemeralUserNote,
      bottomSpacer,
    ],
  });

  const handleToggleCollapse = useCallback((turnId: string, currentCollapsed: boolean) => {
    setCollapsedTurnOverrides((current) => ({
      ...current,
      [turnId]: !currentCollapsed,
    }));
  }, []);

  const collapsedStateForTurn = useCallback((
    turn: TimelineTurn,
    input: {
      forceActive: boolean;
      hasLiveActivity: boolean;
    },
  ) => {
    const override = collapsedTurnOverrides[turn.id];
    if (override !== undefined) {
      return override;
    }

    return Boolean(
      effectiveAutoCollapseCompletedTurns &&
      isTerminalTurnStatus(turn.status) &&
      !input.forceActive &&
      !input.hasLiveActivity,
    );
  }, [collapsedTurnOverrides, effectiveAutoCollapseCompletedTurns]);

  const visibleTurns = serverManagedHistory ? turns : turns.slice(startIndex);
  const optimisticAbsoluteIndex = effectiveTotalTurnCount + 1;
  const forceLatestTurnActive =
    threadRunning &&
    (
      !activeTurnId ||
      (
        !visibleTurns.some((turn) => turn.id === activeTurnId) &&
        optimisticTurn?.id !== activeTurnId
      )
    );
  const latestVisibleTurnId =
    optimisticTurn?.id ?? visibleTurns.at(-1)?.id ?? null;
  const shouldForceLatestVisibleTurnActive =
    forceLatestTurnActive && latestVisibleTurnId !== null;
  const liveItemsAttachedToVisibleTurn =
    !!liveItems &&
    (visibleTurns.some((turn) => turn.id === liveItems.turnId) ||
      optimisticTurn?.id === liveItems.turnId);
  const liveItemsTargetTurnId =
    liveItems && liveItemsAttachedToVisibleTurn
      ? liveItems.turnId
      : liveItems && shouldForceLatestVisibleTurnActive
        ? latestVisibleTurnId
        : null;
  const optimisticLiveItems =
    optimisticTurn && liveItemsTargetTurnId === optimisticTurn.id
      ? liveItems?.items ?? null
      : null;
  const hasStructuredLiveItems = (liveItems?.items.length ?? 0) > 0;
  const unattachedLiveItems =
    liveItems && liveItemsTargetTurnId === null ? liveItems.items : null;
  const unattachedLiveTurn = useMemo(
    () =>
      liveItems && liveItemsTargetTurnId === null && liveItems.items.length > 0
        ? buildSyntheticLiveTurn(liveItems.turnId, liveItems.items)
        : null,
    [liveItems, liveItemsTargetTurnId],
  );
  const unattachedLiveTurnIndex = Math.max(
    1,
    effectiveTotalTurnCount + (optimisticTurn ? 1 : 0),
  );
  const liveOutputAttachedToOptimisticTurn =
    !!liveOutput &&
    !!optimisticTurn &&
    optimisticTurn.status !== 'failed' &&
    !optimisticLiveItems;
  const liveOutputTargetTurnId =
    liveOutput && visibleTurns.length > 0
      ? (
          activeTurnId && visibleTurns.some((turn) => turn.id === activeTurnId)
            ? activeTurnId
            : visibleTurns.findLast((turn) => isRunningHistoryStatus(turn.status))?.id ??
              (shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null)
        )
      : null;
  const liveOutputAttachedToVisibleTurn = Boolean(liveOutputTargetTurnId);
  const unattachedLiveHookPromptItem = useMemo(
    () => parseHookPromptText(liveOutput),
    [liveOutput],
  );
  const queuedSteers = [
    ...pendingSteers.map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: 'Accepted',
      createdAt: steer.createdAt,
    })),
    ...optimisticSteers.map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: steer.status === 'steering' ? 'Steering' : null,
      createdAt: steer.createdAt,
    })),
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  const requestEntryAnchors = useMemo(
    () =>
      buildRequestEntryAnchors({
        answeredRequestNotes,
        pendingRequests,
        visibleTurns,
        optimisticTurn,
      }),
    [answeredRequestNotes, optimisticTurn, pendingRequests, visibleTurns],
  );
  const activityNoteAnchors = useMemo(
    () =>
      buildActivityNoteAnchors({
        activityNotes,
        visibleTurns,
        optimisticTurn,
      }),
    [activityNotes, optimisticTurn, visibleTurns],
  );

  return (
    <>
      <section className={`flex min-h-0 flex-1 flex-col ${className}`.trim()}>
        <div
          ref={scrollContainerRef}
          data-testid="thread-scroll-container"
          onScroll={handleScroll}
          className="thread-graph-scroll-container min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={bottomSpacer > 0 ? { paddingBottom: bottomSpacer } : undefined}
        >
          <div ref={scrollContentRef} className="thread-graph-scroll-content">
          <div ref={topSentinelRef} aria-hidden="true" className="h-px" />
          {turns.length > 0 && (
            <div className="thread-graph-history-control px-3 pb-1 pt-2 sm:px-5 sm:pb-1.5 sm:pt-3">
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={handleLoadEarlierClick}
                    disabled={loadingEarlier}
                    className="thread-graph-history-button rounded-full border px-2.5 py-1.5 transition"
                  >
                    {loadingEarlier ? 'Loading earlier...' : 'Load 10 earlier'}
                  </button>
                )}
                {showLoadAll && (
                  <button
                    type="button"
                    onClick={handleLoadAllClick}
                    className="rounded-full border border-amber-300/40 px-2.5 py-1.5 text-amber-200 transition hover:bg-amber-300/10"
                  >
                    Load full history
                  </button>
                )}
                <p className="timeline-meta-text">
                  Showing {visibleTurns.length} of {effectiveTotalTurnCount} turns
                  {hiddenCount > 0
                    ? ` · ${hiddenCount} earlier hidden${
                        loadedHiddenCount > 0 && unloadedHiddenCount > 0
                          ? ` (${loadedHiddenCount} loaded)`
                          : ''
                      }`
                    : ''}
                </p>
              </div>
            </div>
          )}

          {turns.length === 0 && !liveOutput && !optimisticTurn && (
            <div className="thread-graph-empty-state px-3 py-8 text-sm sm:px-5">
              Send the first prompt to start the thread.
            </div>
          )}

          {(visibleTurns.length > 0 ||
            optimisticTurn ||
            activityNoteAnchors.leading.length > 0 ||
            activityNoteAnchors.trailing.length > 0) && (
            <div className="thread-graph-message-list">
              {activityNoteAnchors.leading.length > 0 ? (
                <ActivityNoteSection
                  notes={activityNoteAnchors.leading}
                  onOpenThread={onOpenThread}
                  onOpenLinkedThread={openLinkedThread}
                />
              ) : null}
              {visibleTurns.map((turn, visibleIndex) => (
                <div key={turn.id}>
                  {(activityNoteAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.beforeTurnId.get(turn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                  {(requestEntryAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? (
                    <RequestEntrySection
                      entries={requestEntryAnchors.beforeTurnId.get(turn.id) ?? []}
                      respondingRequestId={respondingRequestId}
                      onRespondToRequest={onRespondToRequest ?? undefined}
                    />
                  ) : null}
                  {(() => {
                    const displayTurn = mergeOptimisticTurnItems(turn, optimisticTurn);
                    const rowLivePlan = livePlan?.turnId === turn.id ? livePlan : null;
                    const rowLiveItems =
                      liveItemsTargetTurnId === turn.id ? liveItems?.items ?? null : null;
                    const rowLiveOutput =
                      liveOutputTargetTurnId === turn.id ? liveOutput : '';
                    const rowForceActive =
                      activeTurnId === turn.id ||
                      (
                        shouldForceLatestVisibleTurnActive &&
                        latestVisibleTurnId === turn.id
                      );
                    const rowHasLiveActivity =
                      Boolean(rowLivePlan) ||
                      Boolean(rowLiveOutput) ||
                      Boolean(rowLiveItems && rowLiveItems.length > 0);
                    const rowCollapsed = collapsedStateForTurn(displayTurn, {
                      forceActive: rowForceActive,
                      hasLiveActivity: rowHasLiveActivity,
                    });

                    return (
                  <ThreadTurnRow
                    threadId={threadId}
                    {...(adapter ? { adapter } : {})}
                    turn={displayTurn}
                    absoluteIndex={visibleTurnAbsoluteOffset + visibleIndex + 1}
                    isCollapsed={rowCollapsed}
                    livePlan={rowLivePlan}
                    liveItems={rowLiveItems}
                    liveOutput={rowLiveOutput}
                    forceActive={rowForceActive}
                    onToggleCollapse={handleToggleCollapse}
                    onOpenExpandedText={handleOpenExpandedText}
                    onOpenCommandDetail={handleOpenCommandDetail}
                    onOpenToolCallDetail={handleOpenToolCallDetail}
                    onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
                    onBeforeMessageResize={preserveScrollPositionForResize}
                    {...(onSelectArtifact ? { onSelectArtifact } : {})}
                    scrollRootRef={scrollContainerRef}
                    articleRef={undefined}
                  />
                    );
                  })()}
                  {(activityNoteAnchors.afterTurnId.get(turn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.afterTurnId.get(turn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                  {(requestEntryAnchors.notesByTurnId.get(turn.id)?.length || requestEntryAnchors.pendingRequestsByTurnId.get(turn.id)?.length) ? (
                    <RequestEntrySectionForTurn
                      notes={requestEntryAnchors.notesByTurnId.get(turn.id) ?? []}
                      requests={requestEntryAnchors.pendingRequestsByTurnId.get(turn.id) ?? []}
                      respondingRequestId={respondingRequestId}
                      onRespondToRequest={onRespondToRequest ?? undefined}
                    />
                  ) : null}
                </div>
              ))}
              {optimisticTurn && visibleTurns.every((turn) => turn.id !== optimisticTurn.id) && (
                <>
                  {(activityNoteAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.beforeTurnId.get(optimisticTurn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                  {(requestEntryAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? (
                    <RequestEntrySection
                      entries={
                        requestEntryAnchors.beforeTurnId.get(optimisticTurn.id) ??
                        []
                      }
                      respondingRequestId={respondingRequestId}
                      onRespondToRequest={onRespondToRequest ?? undefined}
                    />
                  ) : null}
                  {(() => {
                    const rowLiveOutput = liveOutputAttachedToOptimisticTurn ? liveOutput : '';
                    const rowForceActive =
                      activeTurnId === optimisticTurn.id ||
                      (
                        shouldForceLatestVisibleTurnActive &&
                        latestVisibleTurnId === optimisticTurn.id
                      );
                    const rowHasLiveActivity =
                      Boolean(optimisticLiveItems && optimisticLiveItems.length > 0) ||
                      Boolean(rowLiveOutput);
                    const rowCollapsed = collapsedStateForTurn(optimisticTurn, {
                      forceActive: rowForceActive,
                      hasLiveActivity: rowHasLiveActivity,
                    });

                    return (
                  <ThreadTurnRow
                    threadId={threadId}
                    {...(adapter ? { adapter } : {})}
                    turn={optimisticTurn}
                    absoluteIndex={optimisticAbsoluteIndex}
                    isCollapsed={rowCollapsed}
                    livePlan={null}
                    liveItems={optimisticLiveItems}
                    liveOutput={rowLiveOutput}
                    forceActive={rowForceActive}
                    onToggleCollapse={handleToggleCollapse}
                    onOpenExpandedText={handleOpenExpandedText}
                    onOpenCommandDetail={handleOpenCommandDetail}
                    onOpenToolCallDetail={handleOpenToolCallDetail}
                    onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
                    onBeforeMessageResize={preserveScrollPositionForResize}
                    {...(onSelectArtifact ? { onSelectArtifact } : {})}
                    scrollRootRef={scrollContainerRef}
                  />
                    );
                  })()}
                  {(activityNoteAnchors.afterTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.afterTurnId.get(optimisticTurn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                </>
              )}
            </div>
          )}

          {queuedSteers.length > 0 && (
            <div className="thread-graph-message-section space-y-3 px-3 py-4 sm:px-5">
              {queuedSteers.map((steer) => (
                <CompactMessageItem
                  key={steer.id}
                  threadId={threadId}
                  item={{
                    id: steer.id,
                    kind: 'userMessage',
                    text: steer.prompt,
                    status: steer.status,
                  }}
                  scrollRootRef={scrollContainerRef}
                  onBeforeMessageResize={preserveScrollPositionForResize}
                  {...(adapter ? { adapter } : {})}
                />
              ))}
            </div>
          )}

          {(requestEntryAnchors.trailing.length > 0 ||
            activityNoteAnchors.trailing.length > 0) && (
            <ActivityRequestEntrySection
              entries={[
                ...activityNoteAnchors.trailing.map((note) => ({
                  kind: 'activity' as const,
                  id: note.id,
                  createdAt: note.createdAt,
                  note,
                })),
                ...requestEntryAnchors.trailing,
              ]}
              respondingRequestId={respondingRequestId}
              onRespondToRequest={onRespondToRequest ?? undefined}
              onOpenThread={onOpenThread}
              onOpenLinkedThread={openLinkedThread}
            />
          )}

          {ephemeralUserNote && (
            <div className="thread-graph-message-section px-3 py-2.5 sm:px-5">
              <CompactMessageItem
                threadId={threadId}
                item={{
                  id: 'ephemeral-plan-decision-note',
                  kind: 'userMessage',
                  text: ephemeralUserNote,
                }}
                scrollRootRef={scrollContainerRef}
                onBeforeMessageResize={preserveScrollPositionForResize}
              />
            </div>
          )}

          {unattachedLiveTurn && unattachedLiveItems && unattachedLiveItems.length > 0 && (
            <ThreadTurnRow
              threadId={threadId}
              {...(adapter ? { adapter } : {})}
              turn={unattachedLiveTurn}
              absoluteIndex={unattachedLiveTurnIndex}
              isCollapsed={collapsedTurnOverrides[unattachedLiveTurn.id] ?? false}
              livePlan={livePlan?.turnId === unattachedLiveTurn.id ? livePlan : null}
              liveItems={unattachedLiveItems}
              liveOutput=""
              forceActive
              onToggleCollapse={handleToggleCollapse}
              onOpenExpandedText={handleOpenExpandedText}
              onOpenCommandDetail={handleOpenCommandDetail}
              onOpenToolCallDetail={handleOpenToolCallDetail}
              onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
              onBeforeMessageResize={preserveScrollPositionForResize}
              {...(onSelectArtifact ? { onSelectArtifact } : {})}
              scrollRootRef={scrollContainerRef}
            />
          )}

          {liveOutput &&
            !liveOutputAttachedToVisibleTurn &&
            !liveOutputAttachedToOptimisticTurn &&
            !hasStructuredLiveItems && (
            <div className="thread-graph-message-section px-3 py-2.5 sm:px-5">
              {unattachedLiveHookPromptItem ? (
                <HistoryItemRow
                  threadId={threadId}
                  item={unattachedLiveHookPromptItem}
                  scrollRootRef={scrollContainerRef}
                  onOpenExpandedText={handleOpenExpandedText}
                  onOpenCommandDetail={handleOpenCommandDetail}
                  onOpenToolCallDetail={handleOpenToolCallDetail}
                  onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
                  onBeforeMessageResize={preserveScrollPositionForResize}
                  {...(onSelectArtifact ? { onSelectArtifact } : {})}
                  {...(adapter ? { adapter } : {})}
                />
              ) : (
                <CompactMessageItem
                  threadId={threadId}
                  item={{
                    id: 'live-agent-message-fallback',
                    kind: 'agentMessage',
                    text: liveOutput,
                  }}
                  scrollRootRef={scrollContainerRef}
                  streaming
                  onBeforeMessageResize={preserveScrollPositionForResize}
                  {...(adapter ? { adapter } : {})}
                />
              )}
            </div>
          )}

          <div
            ref={tailSentinelRef}
            aria-hidden="true"
            className="h-px w-full"
          />
          </div>
        </div>
      </section>

      <LongTextDialog
        open={expandedText !== null}
        title={expandedText?.title ?? 'Full text'}
        text={expandedText?.text ?? ''}
        onClose={closeExpandedText}
      />
    </>
  );
}

export const ThreadTimeline = memo(ThreadTimelineComponent);
