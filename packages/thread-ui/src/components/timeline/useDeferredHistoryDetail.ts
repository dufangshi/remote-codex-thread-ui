import { useCallback, useRef, useState } from 'react';

import type {
  ThreadHistoryItemDetailDto,
  ThreadHistoryItemDto,
} from '@remote-codex/shared';

export interface ExpandedTextState {
  title: string;
  text: string;
}

type HistoryItemDetailLoader = (
  itemId: string,
) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;

type SelectHistoryItemDetail = (input: {
  item: ThreadHistoryItemDto;
  detail: ThreadHistoryItemDetailDto;
}) => void;

interface DeferredHistoryDetailInput {
  loadHistoryItemDetail?: HistoryItemDetailLoader | undefined;
  onSelectHistoryItemDetail?: SelectHistoryItemDetail | undefined;
}

interface OpenDeferredDetailInput {
  item: ThreadHistoryItemDto;
  fallbackTitle: string;
  fallbackText: string;
  loadingText: string;
  errorText: string;
  useSelectionCallback: boolean;
}

function inlineDetail(
  item: ThreadHistoryItemDto,
  title: string,
  text: string,
): ThreadHistoryItemDetailDto {
  return {
    id: item.id,
    kind: item.kind,
    title,
    text,
  };
}

export function useDeferredHistoryDetail({
  loadHistoryItemDetail,
  onSelectHistoryItemDetail,
}: DeferredHistoryDetailInput) {
  const requestIdRef = useRef(0);
  const detailCacheRef = useRef<Map<string, ThreadHistoryItemDetailDto>>(
    new Map(),
  );
  const [expandedText, setExpandedText] = useState<ExpandedTextState | null>(
    null,
  );

  const openExpandedText = useCallback((title: string, text: string) => {
    setExpandedText({ title, text });
  }, []);

  const resolveDetail = useCallback(
    (
      item: ThreadHistoryItemDto,
      detail: ThreadHistoryItemDetailDto,
      useSelectionCallback: boolean,
    ) => {
      if (useSelectionCallback && onSelectHistoryItemDetail) {
        onSelectHistoryItemDetail({ item, detail });
        return;
      }
      setExpandedText({ title: detail.title, text: detail.text });
    },
    [onSelectHistoryItemDetail],
  );

  const openDeferredDetail = useCallback(
    async ({
      item,
      fallbackTitle,
      fallbackText,
      loadingText,
      errorText,
      useSelectionCallback,
    }: OpenDeferredDetailInput) => {
      if (!item.hasDeferredDetail || !loadHistoryItemDetail) {
        resolveDetail(
          item,
          inlineDetail(item, fallbackTitle, fallbackText),
          useSelectionCallback,
        );
        return;
      }

      const cached = detailCacheRef.current.get(item.id);
      if (cached) {
        resolveDetail(item, cached, useSelectionCallback);
        return;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      if (!(useSelectionCallback && onSelectHistoryItemDetail)) {
        setExpandedText({ title: fallbackTitle, text: loadingText });
      }

      try {
        const detail = await loadHistoryItemDetail(item.id);
        detailCacheRef.current.set(item.id, detail);
        if (requestIdRef.current !== requestId) {
          return;
        }
        resolveDetail(item, detail, useSelectionCallback);
      } catch (caught) {
        if (requestIdRef.current !== requestId) {
          return;
        }
        resolveDetail(
          item,
          inlineDetail(
            item,
            fallbackTitle,
            caught instanceof Error ? caught.message : errorText,
          ),
          useSelectionCallback,
        );
      }
    },
    [
      loadHistoryItemDetail,
      onSelectHistoryItemDetail,
      resolveDetail,
    ],
  );

  const openCommandDetail = useCallback(
    async (
      item: ThreadHistoryItemDto & { kind: 'commandExecution' },
      fallbackTitle: string,
    ) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText: item.detailText?.trim() || item.text || 'Command output',
        loadingText: 'Loading full command output...',
        errorText: 'Unable to load full command output.',
        useSelectionCallback: true,
      });
    },
    [openDeferredDetail],
  );

  const openToolCallDetail = useCallback(
    async (
      item: ThreadHistoryItemDto & {
        kind: 'toolCall' | 'agentToolCall' | 'skillToolCall';
      },
      fallbackTitle: string,
    ) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText: item.detailText?.trim() || item.text || 'Tool call',
        loadingText: 'Loading full tool call details...',
        errorText: 'Unable to load full tool call details.',
        useSelectionCallback: true,
      });
    },
    [openDeferredDetail],
  );

  const openDeferredHistoryItemDetail = useCallback(
    async (
      item: ThreadHistoryItemDto,
      fallbackTitle: string,
      fallbackText: string,
      loadingText: string,
      errorText: string,
    ) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText,
        loadingText,
        errorText,
        useSelectionCallback: false,
      });
    },
    [openDeferredDetail],
  );

  const closeExpandedText = useCallback(() => {
    requestIdRef.current += 1;
    setExpandedText(null);
  }, []);

  return {
    expandedText,
    openExpandedText,
    openCommandDetail,
    openToolCallDetail,
    openDeferredHistoryItemDetail,
    closeExpandedText,
  };
}
