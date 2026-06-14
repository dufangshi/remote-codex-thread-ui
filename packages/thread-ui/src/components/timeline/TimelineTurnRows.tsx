import {
  memo,
  useCallback,
  useMemo,
  useState,
  type RefCallback,
  type RefObject,
} from 'react';

import type { ThreadHistoryItemDto } from '@remote-codex/shared';

import type { ThreadTimelineAdapter } from '../../adapters';
import {
  formatLongTimestamp,
  formatShortTimestamp,
} from '../threadPresentation';
import { GraphChatHistoryEntries } from '../graph-chat/GraphChatHistoryEntries';
import {
  GraphChatAgentToolCallItem as AgentToolCallItem,
  GraphChatArtifactHistoryItem as ArtifactHistoryItem,
  GraphChatCommandGroupItem as CommandGroupItem,
  GraphChatCommandItem as CommandItem,
  GraphChatContextCompactionItem as ContextCompactionItem,
  GraphChatFileChangeGroupItem as FileChangeGroupItem,
  GraphChatFileChangeItem as FileChangeItem,
  GraphChatFileReadGroupItem as FileReadGroupItem,
  GraphChatFileReadItem as FileReadItem,
  GraphChatGenericHistoryItem as GenericHistoryItem,
  GraphChatHookItem as HookItem,
  GraphChatImageItem as ImageItem,
  GraphChatPlanHistoryItem as PlanHistoryItem,
  GraphChatSearchGroupItem as SearchGroupItem,
  GraphChatSkillToolCallItem as SkillToolCallItem,
  GraphChatToolCallItem as ToolCallItem,
  GraphChatWebSearchItem as WebSearchItem,
} from '../graph-chat/GraphChatHistoryItems';
import { GraphChatCompactMessageItem as CompactMessageItem } from '../graph-chat/GraphChatCompactMessageItem';
import { GraphChatTurnBody } from '../graph-chat/GraphChatTurnBody';
import { GraphChatTurnFrame } from '../graph-chat/GraphChatTurnFrame';
import {
  getLiveOutputTailForTurn,
  groupTimelineHistoryItems,
  isActiveTurnStatus,
  isCompactChatItem,
  mergeLiveTurnItems,
  parseHookPromptText,
  prepareTurnItemsForRendering,
  type TimelineHistoryEntry,
  type TimelineTurn,
} from './timelineItems';
import { TurnTokenSummary } from './tokenFormatting';
import {
  deriveDisplayedLivePlan,
  TurnStatusBar,
} from './turnStatus';

type LivePlan = {
  turnId: string;
  explanation: string | null;
  plan: Array<{ step: string; status: string }>;
};

type SelectArtifactHandler = (input: {
  item: ThreadHistoryItemDto & { kind: 'artifact' };
  artifact: NonNullable<ThreadHistoryItemDto['artifact']>;
}) => void;

type OpenExpandedTextHandler = (title: string, text: string) => void;

type OpenCommandDetailHandler = (
  item: ThreadHistoryItemDto & { kind: 'commandExecution' },
  title: string,
) => void;

type OpenToolCallDetailHandler = (
  item: ThreadHistoryItemDto & {
    kind: 'toolCall' | 'agentToolCall' | 'skillToolCall';
  },
  title: string,
) => void;

type OpenDeferredHistoryItemDetailHandler = (
  item: ThreadHistoryItemDto,
  title: string,
  fallbackText: string,
  loadingText: string,
  errorText: string,
) => void;

function timestampForHistoryItem(item: ThreadHistoryItemDto, fallback: string | null) {
  return item.createdAt ?? fallback;
}

interface HistoryItemRowProps {
  threadId: string | undefined;
  item: ThreadHistoryItemDto;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  timeLabel?: string | null | undefined;
  timeTitle?: string | null | undefined;
  onOpenExpandedText: OpenExpandedTextHandler;
  onOpenCommandDetail: OpenCommandDetailHandler;
  onOpenToolCallDetail: OpenToolCallDetailHandler;
  onOpenDeferredHistoryItemDetail: OpenDeferredHistoryItemDetailHandler;
  onSelectArtifact?: SelectArtifactHandler;
  onBeforeMessageResize?: () => void;
  adapter?: ThreadTimelineAdapter | undefined;
}

export const HistoryItemRow = memo(function HistoryItemRow({
  threadId,
  item,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  timeLabel,
  timeTitle,
}: HistoryItemRowProps) {
  if (isCompactChatItem(item.kind)) {
    return (
      <CompactMessageItem
        threadId={threadId}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'userMessage' | 'agentMessage';
          }
        }
        scrollRootRef={scrollRootRef}
        timeLabel={timeLabel}
        timeTitle={timeTitle}
        {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
        {...(adapter ? { adapter } : {})}
      />
    );
  }

  if (item.kind === 'artifact') {
    return (
      <ArtifactHistoryItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'artifact';
          }
        }
        {...(onSelectArtifact
          ? {
              onSelect: (nextItem, artifact) =>
                onSelectArtifact({ item: nextItem, artifact }),
            }
          : {})}
      />
    );
  }

  if (item.kind === 'commandExecution') {
    return (
      <CommandItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'commandExecution';
          }
        }
        onOpen={onOpenCommandDetail}
      />
    );
  }

  if (item.kind === 'toolCall') {
    return (
      <ToolCallItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'toolCall';
          }
        }
        onOpen={onOpenToolCallDetail}
      />
    );
  }

  if (item.kind === 'agentToolCall') {
    return (
      <AgentToolCallItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'agentToolCall';
          }
        }
        onOpen={onOpenToolCallDetail}
      />
    );
  }

  if (item.kind === 'skillToolCall') {
    return (
      <SkillToolCallItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'skillToolCall';
          }
        }
        onOpen={onOpenToolCallDetail}
      />
    );
  }

  if (item.kind === 'webSearch') {
    const typedItem = item as ThreadHistoryItemDto & {
      kind: 'webSearch';
    };
    const detailText = typedItem.detailText?.trim() || typedItem.text || 'Web search';
    return (
      <WebSearchItem
        item={typedItem}
        onOpen={() =>
          onOpenDeferredHistoryItemDetail(
            typedItem,
            'Web Search Details',
            detailText,
            'Loading full web search details...',
            'Unable to load full web search details.',
          )
        }
      />
    );
  }

  if (item.kind === 'fileRead') {
    const typedItem = item as ThreadHistoryItemDto & {
      kind: 'fileRead';
    };
    const detailText = typedItem.detailText?.trim() || typedItem.text || 'File read';
    return (
      <FileReadItem
        item={typedItem}
        onOpen={() =>
          onOpenDeferredHistoryItemDetail(
            typedItem,
            'File Read Details',
            detailText,
            'Loading full file read details...',
            'Unable to load full file read details.',
          )
        }
      />
    );
  }

  if (item.kind === 'image') {
    return (
      <ImageItem
        threadId={threadId}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'image';
          }
        }
        onOpen={onOpenExpandedText}
        getImageAssetUrl={adapter?.getImageAssetUrl}
      />
    );
  }

  if (item.kind === 'plan') {
    return (
      <PlanHistoryItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'plan';
          }
        }
        scrollRootRef={scrollRootRef}
        {...(onBeforeMessageResize
          ? { onBeforeResize: onBeforeMessageResize }
          : {})}
      />
    );
  }

  if (item.kind === 'fileChange') {
    const typedItem = item as ThreadHistoryItemDto & {
      kind: 'fileChange';
    };
    const detailText = typedItem.detailText?.trim() || typedItem.text || 'File change';
    return (
      <FileChangeItem
        item={typedItem}
        onOpen={() =>
          onOpenDeferredHistoryItemDetail(
            typedItem,
            'File Change Details',
            detailText,
            'Loading full file change details...',
            'Unable to load full file change details.',
          )
        }
      />
    );
  }

  if (item.kind === 'contextCompaction') {
    return (
      <ContextCompactionItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'contextCompaction';
          }
        }
      />
    );
  }

  if (item.kind === 'hook') {
    return (
      <HookItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'hook';
          }
        }
      />
    );
  }

  return <GenericHistoryItem item={item} />;
});

interface ThreadTurnRowProps {
  threadId: string | undefined;
  adapter?: ThreadTimelineAdapter | undefined;
  turn: TimelineTurn;
  absoluteIndex: number;
  isCollapsed: boolean;
  livePlan: LivePlan | null;
  liveItems: ThreadHistoryItemDto[] | null;
  liveOutput: string;
  forceActive?: boolean;
  onToggleCollapse: (turnId: string) => void;
  onOpenExpandedText: OpenExpandedTextHandler;
  onOpenCommandDetail: OpenCommandDetailHandler;
  onOpenToolCallDetail: OpenToolCallDetailHandler;
  onOpenDeferredHistoryItemDetail: OpenDeferredHistoryItemDetailHandler;
  onSelectArtifact?: SelectArtifactHandler;
  onBeforeMessageResize?: () => void;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  articleRef?: RefCallback<HTMLElement> | undefined;
  isLatestVisibleTurn?: boolean;
}

export const ThreadTurnRow = memo(function ThreadTurnRow({
  threadId,
  adapter,
  turn,
  absoluteIndex,
  isCollapsed,
  livePlan,
  liveItems,
  liveOutput,
  forceActive = false,
  onToggleCollapse,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  scrollRootRef,
  articleRef,
  isLatestVisibleTurn = false,
}: ThreadTurnRowProps) {
  const hasLiveActivity =
    Boolean(livePlan) ||
    Boolean(liveOutput) ||
    Boolean(liveItems && liveItems.length > 0);
  const activeForRendering =
    forceActive || isActiveTurnStatus(turn.status) || hasLiveActivity || isLatestVisibleTurn;
  const activeFooterTurn: TimelineTurn =
    activeForRendering && !isActiveTurnStatus(turn.status)
      ? {
          ...turn,
          status: 'inProgress',
        }
      : turn;
  const mergedItems = useMemo(
    () => mergeLiveTurnItems(turn.items, liveItems),
    [liveItems, turn.items],
  );
  const displayedLivePlan = useMemo(
    () => deriveDisplayedLivePlan(livePlan, mergedItems, turn.status),
    [livePlan, mergedItems, turn.status],
  );
  const visibleLiveOutput = useMemo(
    () => getLiveOutputTailForTurn(liveOutput, mergedItems),
    [liveOutput, mergedItems],
  );
  const preparedItems = useMemo(
    () => prepareTurnItemsForRendering(mergedItems, activeForRendering),
    [activeForRendering, mergedItems],
  );
  const groupedItems = useMemo(() => groupTimelineHistoryItems(preparedItems), [preparedItems]);
  const turnTimeLabel = formatShortTimestamp(turn.startedAt);
  const turnTimeTitle = formatLongTimestamp(turn.startedAt);
  const visibleLiveHookPrompt = useMemo(
    () => parseHookPromptText(visibleLiveOutput),
    [visibleLiveOutput],
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

  const toggleGroupedItem = useCallback((groupKey: string) => {
    setExpandedGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey],
    }));
  }, []);

  const historyNode = (
    <TimelineHistoryEntries
      entries={groupedItems}
      expandedGroups={expandedGroups}
      onToggleGroupedItem={toggleGroupedItem}
      threadId={threadId}
      scrollRootRef={scrollRootRef}
      onOpenExpandedText={onOpenExpandedText}
      onOpenCommandDetail={onOpenCommandDetail}
      onOpenToolCallDetail={onOpenToolCallDetail}
      onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
      {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
      fallbackTimestamp={turn.startedAt}
      fallbackTimeLabel={turnTimeLabel}
      fallbackTimeTitle={turnTimeTitle}
      {...(onSelectArtifact ? { onSelectArtifact } : {})}
      {...(adapter ? { adapter } : {})}
    />
  );
  const liveHookPromptNode = visibleLiveHookPrompt ? (
    <HistoryItemRow
      threadId={threadId}
      item={visibleLiveHookPrompt}
      scrollRootRef={scrollRootRef}
      onOpenExpandedText={onOpenExpandedText}
      onOpenCommandDetail={onOpenCommandDetail}
      onOpenToolCallDetail={onOpenToolCallDetail}
      onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
      timeLabel={turnTimeLabel}
      timeTitle={turnTimeTitle}
      {...(onSelectArtifact ? { onSelectArtifact } : {})}
      {...(adapter ? { adapter } : {})}
    />
  ) : null;
  const liveOutputNode =
    !visibleLiveHookPrompt && visibleLiveOutput ? (
      <CompactMessageItem
        item={{
          id: 'live-agent-message',
          kind: 'agentMessage',
          text: visibleLiveOutput,
        }}
        scrollRootRef={scrollRootRef}
        timeLabel={turnTimeLabel}
        timeTitle={turnTimeTitle}
        streaming
        {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
      />
    ) : null;
  const footerNode = activeForRendering ? (
    <TurnStatusBar turn={activeFooterTurn} variant="footer" />
  ) : null;
  const turnBody = (
    <GraphChatTurnBody
      footer={footerNode}
      history={historyNode}
      liveHookPrompt={liveHookPromptNode}
      liveOutput={liveOutputNode}
      livePlan={displayedLivePlan}
    />
  );

  return (
    <GraphChatTurnFrame
      absoluteIndex={absoluteIndex}
      body={turnBody}
      collapsed={isCollapsed}
      error={turn.error}
      headerStatus={<TurnStatusBar turn={turn} />}
      isActive={activeForRendering}
      onToggleCollapse={() => onToggleCollapse(turn.id)}
      refCallback={articleRef}
      startedAt={turn.startedAt}
      timeLabel={turnTimeLabel}
      timeTitle={turnTimeTitle}
      tokenSummary={<TurnTokenSummary turn={turn} />}
    />
  );
});

interface TimelineHistoryEntriesProps {
  entries: TimelineHistoryEntry[];
  expandedGroups: Record<string, boolean>;
  onToggleGroupedItem: (groupKey: string) => void;
  threadId: string | undefined;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  fallbackTimestamp?: string | null | undefined;
  fallbackTimeLabel?: string | null | undefined;
  fallbackTimeTitle?: string | null | undefined;
  onOpenExpandedText: OpenExpandedTextHandler;
  onOpenCommandDetail: OpenCommandDetailHandler;
  onOpenToolCallDetail: OpenToolCallDetailHandler;
  onOpenDeferredHistoryItemDetail: OpenDeferredHistoryItemDetailHandler;
  onSelectArtifact?: SelectArtifactHandler;
  onBeforeMessageResize?: () => void;
  adapter?: ThreadTimelineAdapter | undefined;
}

function TimelineHistoryEntries({
  entries,
  expandedGroups,
  onToggleGroupedItem,
  threadId,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  fallbackTimestamp,
  fallbackTimeLabel,
  fallbackTimeTitle,
}: TimelineHistoryEntriesProps) {
  return (
    <GraphChatHistoryEntries<TimelineHistoryEntry>
      entries={entries}
      expandedGroups={expandedGroups}
      onToggleGroupedItem={onToggleGroupedItem}
      renderCommandGroup={(entry, expanded, onToggleExpanded) => (
        <CommandGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenCommandDetail}
        />
      )}
      renderFileChangeGroup={(entry, expanded, onToggleExpanded) => (
        <FileChangeGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenExpandedText}
        />
      )}
      renderSearchGroup={(entry, expanded, onToggleExpanded) => (
        <SearchGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenExpandedText}
        />
      )}
      renderFileReadGroup={(entry, expanded, onToggleExpanded) => (
        <FileReadGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenExpandedText}
        />
      )}
      renderItem={(entry) => {
        const timestamp = timestampForHistoryItem(entry.item, fallbackTimestamp ?? null);
        return (
          <HistoryItemRow
            key={entry.key}
            threadId={threadId}
            item={entry.item}
            scrollRootRef={scrollRootRef}
            timeLabel={
              entry.item.createdAt
                ? formatShortTimestamp(timestamp)
                : fallbackTimeLabel
            }
            timeTitle={
              entry.item.createdAt
                ? formatLongTimestamp(timestamp)
                : fallbackTimeTitle
            }
            onOpenExpandedText={onOpenExpandedText}
            onOpenCommandDetail={onOpenCommandDetail}
            onOpenToolCallDetail={onOpenToolCallDetail}
            onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
            {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
            {...(onSelectArtifact ? { onSelectArtifact } : {})}
            {...(adapter ? { adapter } : {})}
          />
        );
      }}
    />
  );
}
