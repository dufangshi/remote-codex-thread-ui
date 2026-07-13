// @vitest-environment jsdom

import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { ComposerSubscriptionUsage } from './ComposerSubscriptionUsage';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderUsage(authKind: 'subscription' | 'apiKey') {
  const host = document.createElement('div');
  document.body.append(host);
  createRoot(host).render(
    <ComposerSubscriptionUsage
      usage={{
        provider: 'codex',
        authKind,
        observedAt: new Date().toISOString(),
        stale: false,
        windows: [
          {
            id: 'primary',
            durationMinutes: 300,
            label: '5h',
            usedPercent: 40,
            resetsAt: '2030-01-01T00:00:00.000Z',
          },
        ],
      }}
    />,
  );
  return host;
}

describe('ComposerSubscriptionUsage', () => {
  it('shows the remaining subscription window compactly', async () => {
    const host = renderUsage('subscription');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(host.textContent).toContain('5h');
    expect(host.textContent).toContain('60%');
    expect(host.querySelector('.thread-subscription-usage')?.className).toContain('opacity-80');
    expect(host.querySelector('.thread-subscription-usage')?.className).toContain('font-normal');
    expect(host.querySelector('.thread-subscription-usage .font-semibold')).toBeNull();
  });

  it('renders nothing for API-key authentication', async () => {
    const host = renderUsage('apiKey');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(host.textContent).toBe('');
  });
});
