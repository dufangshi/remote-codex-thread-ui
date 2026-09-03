import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import type { TimelineTurn } from './timelineItems';
import { TurnStatusBar } from './turnStatus';

function activeTurn(overrides: Partial<TimelineTurn> = {}): TimelineTurn {
  return {
    id: 'turn-1',
    status: 'inProgress',
    startedAt: '2026-09-02T15:20:00.000Z',
    error: null,
    model: 'gpt-5.4',
    reasoningEffort: 'medium',
    reasoningEffortAvailable: true,
    tokenUsage: null,
    priceEstimate: null,
    items: [],
    ...overrides,
  };
}

describe('TurnStatusBar footer', () => {
  it('renders a compact transparent summary without unavailable cost or tokens', () => {
    const now = Date.now();
    const html = renderToStaticMarkup(
      <TurnStatusBar
        turn={activeTurn({
          startedAt: new Date(now - 72_000).toISOString(),
        })}
        variant="footer"
        lastActivityAt="2026-09-02T15:20:48.000Z"
      />,
    );

    expect(html).toContain('thread-graph-turn-footer');
    expect(html).toContain('gpt-5.4 · medium');
    expect(html).toContain('1m 12s');
    expect(html.match(/animate-pulse/g)).toHaveLength(3);
    expect(html).not.toContain('token-badge');
    expect(html).not.toContain('--');
  });

  it('shows cost only when the estimate is greater than zero', () => {
    const priceEstimate: NonNullable<TimelineTurn['priceEstimate']> = {
      pricingModelKey: 'gpt-5.4',
      pricingTierKey: 'standard',
      currency: 'USD',
      inputUsd: 0.01,
      cachedInputUsd: 0,
      outputUsd: 0.02,
      totalUsd: 0.03,
    };
    const pricedHtml = renderToStaticMarkup(
      <TurnStatusBar
        turn={activeTurn({ priceEstimate })}
        variant="footer"
      />,
    );
    const zeroHtml = renderToStaticMarkup(
      <TurnStatusBar
        turn={activeTurn({
          priceEstimate: { ...priceEstimate, totalUsd: 0 },
        })}
        variant="footer"
      />,
    );

    expect(pricedHtml).toContain('$0.030');
    expect(zeroHtml).not.toContain('$0');
  });
});
