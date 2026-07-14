// @vitest-environment jsdom

import { act } from 'react';
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
    const control = host.querySelector<HTMLButtonElement>('.thread-subscription-usage');
    const track = control?.querySelector<HTMLElement>('[data-subscription-window-track]');
    const fill = track?.firstElementChild as HTMLElement | null;
    const details = control?.querySelector<HTMLElement>('[aria-hidden]');

    expect(control?.className).toContain('h-4');
    expect(control?.className).toContain('bottom-0');
    expect(control?.className).toContain('bg-stone-950');
    expect(control?.className).toContain('opacity-95');
    expect(host.querySelector('.thread-subscription-usage')?.className).toContain('font-normal');
    expect(host.querySelector('.thread-subscription-usage .font-semibold')).toBeNull();
    expect(track?.className).toContain('w-7');
    expect(fill?.style.width).toBe('60%');
    expect(fill?.style.backgroundImage).toContain('linear-gradient');
    expect(control?.getAttribute('aria-expanded')).toBe('false');
    expect(details?.getAttribute('aria-hidden')).toBe('true');

    await act(async () => {
      control?.click();
    });

    expect(control?.getAttribute('aria-expanded')).toBe('true');
    expect(details?.getAttribute('aria-hidden')).toBe('false');
    expect(details?.className).toContain('opacity-100');
  });

  it('renders nothing for API-key authentication', async () => {
    const host = renderUsage('apiKey');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(host.textContent).toBe('');
  });
});
