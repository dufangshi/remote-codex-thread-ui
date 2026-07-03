/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import type { ThreadTurnDto } from '@remote-codex/shared';

import { ThreadTimeline } from './ThreadTimeline';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function render(node: ReactNode) {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => {
    root?.render(node);
  });
  return container;
}

afterEach(() => {
  if (root) {
    flushSync(() => {
      root?.unmount();
    });
  }
  root = null;
  container?.remove();
  container = null;
});

function completedTurn(items: ThreadTurnDto['items']): ThreadTurnDto {
  return {
    id: 'turn-1',
    startedAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 59)).toISOString(),
    status: 'completed',
    error: null,
    items,
  };
}

describe('ThreadTimeline', () => {
  it('does not show Worked when only reasoning would be hidden', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={true}
        liveOutput=""
        turns={[
          completedTurn([
            {
              id: 'user-1',
              kind: 'userMessage',
              text: 'reply me a 3',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 59)).toISOString(),
            },
            {
              id: 'reasoning-1',
              kind: 'reasoning',
              text: 'The user asked for the exact number 3.',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 59)).toISOString(),
            },
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: '3',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 59)).toISOString(),
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('reply me a 3');
    expect(element.textContent).toContain('3');
    expect(element.textContent).not.toContain('Worked');
    expect(
      Array.from(element.querySelectorAll('button')).some((button) =>
        button.getAttribute('aria-label')?.includes('Expand turn 1'),
      ),
    ).toBe(false);
  });

  it('shows Worked when an actual middle message bubble is collapsed', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={true}
        liveOutput=""
        turns={[
          completedTurn([
            {
              id: 'user-1',
              kind: 'userMessage',
              text: 'Keep prompt visible.',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString(),
            },
            {
              id: 'agent-intermediate-1',
              kind: 'agentMessage',
              text: 'Intermediate note should collapse.',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 20)).toISOString(),
            },
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: 'Final reply stays visible.',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 11, 21)).toISOString(),
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('Keep prompt visible.');
    expect(element.textContent).toContain('Final reply stays visible.');
    expect(element.textContent).toContain('Worked');
    expect(element.textContent).not.toContain('Intermediate note should collapse.');
  });
});
