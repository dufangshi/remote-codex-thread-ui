/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ThreadTurnDto } from '@remote-codex/shared';

import { ThreadTimeline } from './ThreadTimeline';
import { formatShortTimestamp } from './threadPresentation';

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
  it('loads deferred turn activity only after the Worked summary is expanded', async () => {
    let resolveDetail!: (turn: ThreadTurnDto) => void;
    const detailPromise = new Promise<ThreadTurnDto>((resolve) => {
      resolveDetail = resolve;
    });
    const onLoadTurnDetail = vi.fn(() => detailPromise);
    const user = {
      id: 'user-1',
      kind: 'userMessage' as const,
      text: 'Keep prompt visible.',
      createdAt: '2026-07-03T20:10:00.000Z',
    };
    const finalAgent = {
      id: 'agent-final',
      kind: 'agentMessage' as const,
      text: 'Final reply stays visible.',
      createdAt: '2026-07-03T20:11:00.000Z',
    };
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={true}
        liveOutput=""
        adapter={{ onLoadTurnDetail }}
        turns={[{
          ...completedTurn([user, finalAgent]),
          hasDeferredItems: true,
          deferredItemCount: 1,
        }]}
      />,
    );

    expect(element.textContent).toContain('Keep prompt visible.');
    expect(element.textContent).toContain('Final reply stays visible.');
    expect(element.textContent).not.toContain('Fetched process detail.');
    const expandButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label')?.includes('Expand turn 1'),
    );
    flushSync(() => expandButton?.click());

    expect(onLoadTurnDetail).toHaveBeenCalledTimes(1);
    expect(onLoadTurnDetail).toHaveBeenCalledWith('turn-1');
    expect(element.textContent).toContain('Loading activity...');

    resolveDetail({
      ...completedTurn([
        user,
        {
          id: 'agent-progress',
          kind: 'agentMessage',
          text: 'Fetched process detail.',
          createdAt: '2026-07-03T20:10:30.000Z',
        },
        finalAgent,
      ]),
      hasDeferredItems: false,
      deferredItemCount: 0,
    });
    await detailPromise;
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    flushSync(() => {});

    expect(element.textContent).toContain('Fetched process detail.');
    expect(element.textContent).not.toContain('Loading activity...');
  });

  it('replaces a failed image preview with a stable attachment placeholder', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        threadId="thread-1"
        adapter={{
          getImageAssetUrl: () => '/api/image.png?token=demo',
        }}
        turns={[completedTurn([{
          id: 'user-photo',
          kind: 'userMessage',
          text: 'Inspect [PHOTO image.png]',
        }])]}
      />,
    );
    const image = element.querySelector('img[alt="image.png"]');
    expect(image).toBeTruthy();

    flushSync(() => {
      image?.dispatchEvent(new Event('error'));
    });

    expect(element.querySelector('img[alt="image.png"]')).toBeNull();
    expect(
      element.querySelector('[role="img"]')?.getAttribute('aria-label'),
    ).toBe('image.png, preview unavailable');
    expect(element.textContent).toContain('PHOTO');
  });

  it('shows Worked when reasoning is the collapsed middle agent bubble', () => {
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
    expect(element.textContent).toContain('Worked');
    expect(element.textContent).not.toContain('The user asked for the exact number 3.');
    expect(
      Array.from(element.querySelectorAll('button')).some((button) =>
        button.getAttribute('aria-label')?.includes('Expand turn 1'),
      ),
    ).toBe(true);
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

  it('keeps the Worked control available after expanding so the turn can collapse again', () => {
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
              text: 'Intermediate note can be toggled.',
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

    const expandWorkedButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label')?.includes('Expand turn 1'),
    );
    expect(expandWorkedButton).toBeTruthy();
    flushSync(() => {
      expandWorkedButton?.click();
    });

    expect(element.textContent).toContain('Intermediate note can be toggled.');
    const collapseWorkedButton = Array.from(element.querySelectorAll('button')).find(
      (button) =>
        button.getAttribute('aria-label')?.includes('Collapse turn 1') &&
        button.textContent?.includes('Worked'),
    );
    expect(collapseWorkedButton?.textContent).toContain('Worked');

    flushSync(() => {
      collapseWorkedButton?.click();
    });

    expect(element.textContent).toContain('Worked');
    expect(element.textContent).not.toContain('Intermediate note can be toggled.');
  });

  it('shows relative timestamps for agent and tool events', () => {
    const startedAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString();
    const agentAt = new Date(Date.UTC(2026, 6, 3, 20, 11, 21)).toISOString();
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[
          {
            ...completedTurn([
              {
                id: 'user-1',
                kind: 'userMessage',
                text: 'Inspect.',
                createdAt: startedAt,
              },
              {
                id: 'command-1',
                kind: 'commandExecution',
                text: 'pwd',
                createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 5)).toISOString(),
                status: 'completed',
              },
              {
                id: 'agent-1',
                kind: 'agentMessage',
                text: 'Done.',
                createdAt: agentAt,
              },
            ]),
            startedAt,
          },
        ]}
      />,
    );

    expect(element.textContent).toContain('5s');
    expect(element.textContent).toContain('1m 21s');
    expect(element.textContent).not.toContain(formatShortTimestamp(agentAt));

    const agentTime = Array.from(element.querySelectorAll('[role="button"]')).find(
      (node) => node.textContent === '1m 21s',
    );
    expect(agentTime).toBeTruthy();
    flushSync(() => {
      (agentTime as HTMLElement | undefined)?.click();
    });
    expect(element.textContent).toContain(formatShortTimestamp(agentAt));
  });

  it('renders a command batch without redundant activity or batch labels', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[
          completedTurn([
            ...['pwd', 'pnpm test', 'git status'].map((text, index) => ({
              id: `command-${index + 1}`,
              kind: 'commandExecution' as const,
              text,
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, index + 1),
              ).toISOString(),
              status: 'completed',
            })),
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: 'All commands completed.',
              createdAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 5)).toISOString(),
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('3 commands');
    expect(element.textContent).not.toContain('Agent activity');
    expect(element.textContent).not.toContain('Batch');
    expect(element.textContent).toContain('All commands completed.');
  });

  it('auto-collapses a single tool item after newer live history arrives', () => {
    const startedAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString();
    const fileReadAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 5)).toISOString();
    const laterAgentAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 8)).toISOString();
    const activeTurn: ThreadTurnDto = {
      ...completedTurn([
        {
          id: 'user-1',
          kind: 'userMessage',
          text: 'Inspect the source.',
          createdAt: startedAt,
        },
        {
          id: 'file-read-1',
          kind: 'fileRead',
          text: 'Read file: src/agent-runtime.ts',
          previewText: 'Read file: src/agent-runtime.ts',
          createdAt: fileReadAt,
          status: 'running',
        },
      ]),
      startedAt,
      status: 'inProgress',
    };
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[activeTurn]}
      />,
    );

    expect(element.textContent).toContain('file_read');
    expect(element.textContent).toContain('Read file: src/agent-runtime.ts');
    expect(
      Array.from(element.querySelectorAll('button')).find((button) =>
        button.getAttribute('aria-label')?.includes('file_read history item'),
      )?.getAttribute('aria-expanded'),
    ).toBe('true');

    flushSync(() => {
      root?.render(
        <ThreadTimeline
          autoCollapseCompletedTurns={false}
          liveOutput=""
          turns={[
            {
              ...activeTurn,
              items: [
                ...activeTurn.items.map((item) =>
                  item.id === 'file-read-1'
                    ? { ...item, status: 'completed' }
                    : item,
                ),
                {
                  id: 'agent-1',
                  kind: 'agentMessage',
                  text: 'I found the next step.',
                  createdAt: laterAgentAt,
                },
              ],
            },
          ]}
        />,
      );
    });

    expect(element.textContent).toContain('file_read');
    expect(
      Array.from(element.querySelectorAll('button')).find((button) =>
        button.getAttribute('aria-label')?.includes('file_read history item'),
      )?.getAttribute('aria-expanded'),
    ).toBe('false');
    expect(element.textContent).toContain('I found the next step.');
  });

  it('advances across turns on repeated clicks while smooth scrolling is pending', () => {
    const turns = [1, 2, 3].map((index) => ({
      ...completedTurn([
        { id: `user-${index}`, kind: 'userMessage' as const, text: `Prompt ${index}` },
      ]),
      id: `turn-${index}`,
    }));
    const element = render(
      <ThreadTimeline liveOutput="" turns={turns} nextTurnScrollRequestKey={0} />,
    );
    const scrollContainer = element.querySelector<HTMLElement>(
      '[data-testid="thread-scroll-container"]',
    )!;
    Object.defineProperty(scrollContainer, 'scrollTop', { configurable: true, value: 0 });
    scrollContainer.getBoundingClientRect = () =>
      ({ top: 0, bottom: 300, height: 300 } as DOMRect);
    const turnElements = Array.from(
      element.querySelectorAll<HTMLElement>('[data-timeline-turn]'),
    );
    turnElements.forEach((turn, index) => {
      turn.getBoundingClientRect = () =>
        ({ top: index * 200, bottom: index * 200 + 100, height: 100 } as DOMRect);
    });
    const scrollTo = vi.fn();
    scrollContainer.scrollTo = scrollTo;

    flushSync(() => {
      root?.render(
        <ThreadTimeline liveOutput="" turns={turns} nextTurnScrollRequestKey={1} />,
      );
    });
    flushSync(() => {
      root?.render(
        <ThreadTimeline liveOutput="" turns={turns} nextTurnScrollRequestKey={2} />,
      );
    });

    expect(scrollTo).toHaveBeenNthCalledWith(1, { top: 192, behavior: 'smooth' });
    expect(scrollTo).toHaveBeenNthCalledWith(2, { top: 392, behavior: 'smooth' });
  });

  it('moves backward across turns on repeated clicks while smooth scrolling is pending', () => {
    const turns = [1, 2, 3].map((index) => ({
      ...completedTurn([
        { id: `user-${index}`, kind: 'userMessage' as const, text: `Prompt ${index}` },
      ]),
      id: `turn-${index}`,
    }));
    const element = render(
      <ThreadTimeline liveOutput="" turns={turns} previousTurnScrollRequestKey={0} />,
    );
    const scrollContainer = element.querySelector<HTMLElement>(
      '[data-testid="thread-scroll-container"]',
    )!;
    Object.defineProperty(scrollContainer, 'scrollTop', { configurable: true, value: 600 });
    scrollContainer.getBoundingClientRect = () =>
      ({ top: 0, bottom: 300, height: 300 } as DOMRect);
    const turnElements = Array.from(
      element.querySelectorAll<HTMLElement>('[data-timeline-turn]'),
    );
    turnElements.forEach((turn, index) => {
      turn.getBoundingClientRect = () =>
        ({ top: -400 + index * 200, bottom: -300 + index * 200, height: 100 } as DOMRect);
    });
    const scrollTo = vi.fn();
    scrollContainer.scrollTo = scrollTo;

    flushSync(() => {
      root?.render(
        <ThreadTimeline liveOutput="" turns={turns} previousTurnScrollRequestKey={1} />,
      );
    });
    flushSync(() => {
      root?.render(
        <ThreadTimeline liveOutput="" turns={turns} previousTurnScrollRequestKey={2} />,
      );
    });

    expect(scrollTo).toHaveBeenNthCalledWith(1, { top: 392, behavior: 'smooth' });
    expect(scrollTo).toHaveBeenNthCalledWith(2, { top: 192, behavior: 'smooth' });
  });
});
