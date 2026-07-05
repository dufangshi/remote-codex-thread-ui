import type { ThreadHistoryItemDto, ThreadTurnDto } from '@remote-codex/shared';

export interface CommandHistoryItem extends ThreadHistoryItemDto {
  kind: 'commandExecution';
}

export interface FileChangeHistoryItem extends ThreadHistoryItemDto {
  kind: 'fileChange';
}

export interface SearchHistoryItem extends ThreadHistoryItemDto {
  kind: 'webSearch';
}

export interface FileReadHistoryItem extends ThreadHistoryItemDto {
  kind: 'fileRead';
}

export type TimelineHistoryEntry =
  | {
      kind: 'item';
      key: string;
      item: ThreadHistoryItemDto;
    }
  | {
      kind: 'commandGroup';
      key: string;
      items: CommandHistoryItem[];
    }
  | {
      kind: 'fileChangeGroup';
      key: string;
      items: FileChangeHistoryItem[];
    }
  | {
      kind: 'searchGroup';
      key: string;
      items: SearchHistoryItem[];
    }
  | {
      kind: 'fileReadGroup';
      key: string;
      items: FileReadHistoryItem[];
    };

export type TimelineTurn = Omit<ThreadTurnDto, 'status'> & {
  status: ThreadTurnDto['status'] | 'sending';
};

function decodeXmlEntities(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
}

export function parseHookPromptText(text: string): ThreadHistoryItemDto | null {
  const match = text
    .trim()
    .match(/^<hook_prompt(?:\s+hook_run_id="([^"]+)")?>([\s\S]*)<\/hook_prompt>$/);
  if (!match) {
    return null;
  }

  const hookRunId = match[1] ? decodeXmlEntities(match[1]) : null;
  const output = decodeXmlEntities(match[2] ?? '').trim();
  const eventName = hookRunId?.split(':')[0] ?? 'hook';
  const eventLabel = eventName === 'stop' ? 'Stop' : eventName;
  const sourcePath = hookRunId?.split(':').slice(2).join(':') || null;

  return {
    id: `live-hook-prompt:${hookRunId ?? 'unknown'}`,
    kind: 'hook',
    text: `${eventLabel} hook`,
    previewText: output || `${eventLabel} hook`,
    detailText: output || null,
    status: 'Completed',
    hookEventName: eventName,
    hookEventLabel: eventLabel,
    hookHandlerType: 'command',
    hookScope: 'turn',
    hookSource: sourcePath ? 'project' : null,
    hookSourcePath: sourcePath,
    hookStatusMessage: null,
    hookOutputEntries: output ? [{ kind: 'warning', text: output }] : [],
  };
}

export function isCompactChatItem(kind: ThreadHistoryItemDto['kind']) {
  return kind === 'userMessage' || kind === 'agentMessage';
}

function isSteerTailHistoryItem(kind: ThreadHistoryItemDto['kind']) {
  return (
    kind === 'commandExecution' ||
    kind === 'webSearch' ||
    kind === 'fileRead' ||
    kind === 'fileChange' ||
    kind === 'image' ||
    kind === 'contextCompaction'
  );
}

function isSteerConsumptionHistoryItem(kind: ThreadHistoryItemDto['kind']) {
  return (
    kind === 'agentMessage' ||
    kind === 'reasoning' ||
    kind === 'agentToolCall' ||
    kind === 'skillToolCall' ||
    kind === 'toolCall' ||
    kind === 'plan'
  );
}

export function prepareTurnItemsForRendering(
  items: ThreadHistoryItemDto[],
  active: boolean,
) {
  if (!active) {
    return items;
  }

  const prepared = [...items];
  const firstUserIndex = prepared.findIndex((item) => item.kind === 'userMessage');
  if (firstUserIndex < 0) {
    return prepared;
  }

  for (let index = firstUserIndex + 1; index < prepared.length; index += 1) {
    const item = prepared[index];
    if (!item || item.kind !== 'userMessage') {
      continue;
    }

    let tailEnd = index + 1;
    while (
      tailEnd < prepared.length &&
      isSteerTailHistoryItem(prepared[tailEnd]!.kind)
    ) {
      tailEnd += 1;
    }

    if (tailEnd === index + 1) {
      continue;
    }

    const [steerItem] = prepared.splice(index, 1);
    prepared.splice(tailEnd - 1, 0, steerItem!);
    index = tailEnd - 1;
  }

  let seenPrimaryUserMessage = false;
  return prepared.map((item, index) => {
    if (item.kind !== 'userMessage') {
      return item;
    }

    if (!seenPrimaryUserMessage) {
      seenPrimaryUserMessage = true;
      return item;
    }

    const hasConsumptionAfter = prepared
      .slice(index + 1)
      .some((nextItem) => isSteerConsumptionHistoryItem(nextItem.kind));

    if (hasConsumptionAfter) {
      return item;
    }

    return {
      ...item,
      status: 'Awaiting response',
    };
  });
}

export function hasHistoryItemSequence(item: ThreadHistoryItemDto) {
  return typeof item.sequence === 'number' && Number.isFinite(item.sequence);
}

function historyItemSequence(item: ThreadHistoryItemDto) {
  return hasHistoryItemSequence(item) ? item.sequence! : Number.POSITIVE_INFINITY;
}

export function sortTurnItemsByRecordedSequence(items: ThreadHistoryItemDto[]) {
  const leadingItems: ThreadHistoryItemDto[] = [];
  let index = 0;

  while (
    index < items.length &&
    items[index]?.kind === 'userMessage' &&
    !hasHistoryItemSequence(items[index]!)
  ) {
    leadingItems.push(items[index]!);
    index += 1;
  }

  const trailingItems = items.slice(index);
  if (!trailingItems.some(hasHistoryItemSequence)) {
    return items;
  }

  const sequenceValues = trailingItems
    .map((item) => historyItemSequence(item))
    .filter(Number.isFinite);
  const maxSequence = sequenceValues.length > 0 ? Math.max(...sequenceValues) : 0;
  const orderedItems: Array<{
    item: ThreadHistoryItemDto;
    index: number;
    order: number;
  }> = [];

  let cursor = 0;
  while (cursor < trailingItems.length) {
    const item = trailingItems[cursor]!;
    if (hasHistoryItemSequence(item)) {
      orderedItems.push({ item, index: cursor, order: historyItemSequence(item) });
      cursor += 1;
      continue;
    }

    const blockStart = cursor;
    while (
      cursor < trailingItems.length &&
      !hasHistoryItemSequence(trailingItems[cursor]!)
    ) {
      cursor += 1;
    }

    const block = trailingItems.slice(blockStart, cursor);
    const previousSequenced = [...trailingItems.slice(0, blockStart)]
      .reverse()
      .find(hasHistoryItemSequence);
    const nextSequenced = trailingItems.slice(cursor).find(hasHistoryItemSequence);
    const previousSequence = previousSequenced
      ? historyItemSequence(previousSequenced)
      : null;
    const nextSequence = nextSequenced ? historyItemSequence(nextSequenced) : null;

    block.forEach((blockItem, blockIndex) => {
      let order: number;
      if (previousSequence === null && nextSequence !== null) {
        order = nextSequence - (block.length - blockIndex) / (block.length + 1);
      } else if (
        previousSequence !== null &&
        nextSequence !== null &&
        nextSequence > previousSequence
      ) {
        const span = nextSequence - previousSequence;
        order = previousSequence + ((blockIndex + 1) / (block.length + 1)) * span;
      } else {
        order = maxSequence + 1 + blockIndex / (block.length + 1);
      }
      orderedItems.push({
        item: blockItem,
        index: blockStart + blockIndex,
        order,
      });
    });
  }

  const sortedTrailingItems = orderedItems
    .sort((left, right) => {
      const orderDelta = left.order - right.order;
      return orderDelta === 0 ? left.index - right.index : orderDelta;
    })
    .map((entry) => entry.item);

  return [...leadingItems, ...sortedTrailingItems];
}

export function mergeLiveTurnItems(
  items: ThreadHistoryItemDto[],
  liveItems: ThreadHistoryItemDto[] | null | undefined,
) {
  if (!liveItems || liveItems.length === 0) {
    return sortTurnItemsByRecordedSequence(items);
  }

  const liveItemsById = new Map(liveItems.map((item) => [item.id, item]));
  const mergedItems: ThreadHistoryItemDto[] = items.map((item) => {
    const liveItem = liveItemsById.get(item.id);
    if (!liveItem) {
      return item;
    }

    liveItemsById.delete(item.id);
    const mergedItem: ThreadHistoryItemDto = {
      ...item,
      ...liveItem,
      text: liveItem.text || item.text,
    };
    const detailText = liveItem.detailText ?? item.detailText;
    const previewText = liveItem.previewText ?? item.previewText;
    const status = liveItem.status ?? item.status;
    const sequence = liveItem.sequence ?? item.sequence;
    if (detailText !== undefined) {
      mergedItem.detailText = detailText;
    }
    if (previewText !== undefined) {
      mergedItem.previewText = previewText;
    }
    if (status !== undefined) {
      mergedItem.status = status;
    }
    if (sequence !== undefined) {
      mergedItem.sequence = sequence;
    }
    return mergedItem;
  });
  const uniqueLiveItems = [...liveItemsById.values()];
  if (uniqueLiveItems.length === 0 && !mergedItems.some(hasHistoryItemSequence)) {
    return mergedItems;
  }

  mergedItems.push(...uniqueLiveItems);
  if (
    !mergedItems.some(
      (item) => typeof item.sequence === 'number' && Number.isFinite(item.sequence),
    )
  ) {
    return mergedItems;
  }

  return sortTurnItemsByRecordedSequence(mergedItems);
}

export function getLiveOutputTailForTurn(
  liveOutput: string,
  items: ThreadHistoryItemDto[],
) {
  if (!liveOutput) {
    return '';
  }

  const materializedAgentTexts = items
    .filter(
      (
        item,
      ): item is ThreadHistoryItemDto & {
        kind: 'agentMessage';
      } => item.kind === 'agentMessage',
    )
    .map((item) => item.text)
    .filter((text) => text.length > 0);

  const lastMaterializedAgentText = materializedAgentTexts.at(-1) ?? '';
  if (lastMaterializedAgentText) {
    const anchorIndex = liveOutput.lastIndexOf(lastMaterializedAgentText);
    if (anchorIndex >= 0) {
      const anchoredTail = liveOutput.slice(
        anchorIndex + lastMaterializedAgentText.length,
      );
      if (!anchoredTail.trim()) {
        return '';
      }
      return anchoredTail;
    }
  }

  const materializedAgentText = materializedAgentTexts.join('');
  if (!materializedAgentText) {
    return liveOutput;
  }

  const sharedPrefixLength = Math.min(
    liveOutput.length,
    materializedAgentText.length,
  );
  let consumedLength = 0;
  while (
    consumedLength < sharedPrefixLength &&
    liveOutput[consumedLength] === materializedAgentText[consumedLength]
  ) {
    consumedLength += 1;
  }

  if (consumedLength === 0) {
    return liveOutput;
  }

  const remainingOutput = liveOutput.slice(consumedLength);
  return remainingOutput.trim() ? remainingOutput : '';
}

export function isRunningHistoryStatus(status?: string | null) {
  if (!status) {
    return false;
  }

  const normalized = status.toLowerCase();
  return (
    normalized.includes('running') ||
    normalized.includes('inprogress') ||
    normalized.includes('in_progress')
  );
}

export function isActiveTurnStatus(status: TimelineTurn['status']) {
  return status === 'inProgress' || status === 'sending';
}

export function groupTimelineHistoryItems(items: ThreadHistoryItemDto[]) {
  const entries: TimelineHistoryEntry[] = [];
  let index = 0;

  while (index < items.length) {
    const current = items[index];
    if (!current) {
      break;
    }

    if (
      current.kind !== 'commandExecution' &&
      current.kind !== 'fileChange' &&
      current.kind !== 'webSearch' &&
      current.kind !== 'fileRead'
    ) {
      entries.push({
        kind: 'item',
        key: current.id,
        item: current,
      });
      index += 1;
      continue;
    }

    const groupedItems: ThreadHistoryItemDto[] = [];
    while (index < items.length && items[index]?.kind === current.kind) {
      groupedItems.push(items[index]!);
      index += 1;
    }

    if (groupedItems.length === 1) {
      entries.push({
        kind: 'item',
        key: groupedItems[0]!.id,
        item: groupedItems[0]!,
      });
      continue;
    }

    const groupKey = groupedItems.map((item) => item.id).join(':');

    if (current.kind === 'commandExecution') {
      entries.push({
        kind: 'commandGroup',
        key: groupKey,
        items: groupedItems as CommandHistoryItem[],
      });
      continue;
    }

    if (current.kind === 'fileChange') {
      entries.push({
        kind: 'fileChangeGroup',
        key: groupKey,
        items: groupedItems as FileChangeHistoryItem[],
      });
      continue;
    }

    if (current.kind === 'fileRead') {
      entries.push({
        kind: 'fileReadGroup',
        key: groupKey,
        items: groupedItems as FileReadHistoryItem[],
      });
      continue;
    }

    entries.push({
      kind: 'searchGroup',
      key: groupKey,
      items: groupedItems as SearchHistoryItem[],
    });
  }

  return entries;
}
