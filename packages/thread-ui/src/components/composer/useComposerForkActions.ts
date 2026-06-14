import { useCallback, useEffect, useState } from 'react';

import type { SlashPanelView } from './types';

export interface UseComposerForkActionsInput {
  slashPanelView: SlashPanelView;
  onForkLatest?: () => Promise<void> | void;
  onForkTurn?: (turnId: string) => Promise<void> | void;
  closeMenu: () => void;
}

export interface UseComposerForkActionsResult {
  forkBusy: boolean;
  forkLatest: () => Promise<void>;
  forkTurn: (turnId: string) => Promise<void>;
}

export function useComposerForkActions({
  slashPanelView,
  onForkLatest,
  onForkTurn,
  closeMenu,
}: UseComposerForkActionsInput): UseComposerForkActionsResult {
  const [forkBusy, setForkBusy] = useState(false);

  useEffect(() => {
    if (slashPanelView !== 'forkTurns') {
      setForkBusy(false);
    }
  }, [slashPanelView]);

  const forkLatest = useCallback(async () => {
    if (!onForkLatest) {
      return;
    }

    setForkBusy(true);
    try {
      await onForkLatest();
      closeMenu();
    } finally {
      setForkBusy(false);
    }
  }, [closeMenu, onForkLatest]);

  const forkTurn = useCallback(
    async (turnId: string) => {
      if (!onForkTurn) {
        return;
      }

      setForkBusy(true);
      try {
        await onForkTurn(turnId);
        closeMenu();
      } finally {
        setForkBusy(false);
      }
    },
    [closeMenu, onForkTurn],
  );

  return {
    forkBusy,
    forkLatest,
    forkTurn,
  };
}
