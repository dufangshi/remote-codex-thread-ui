/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';

import { getVisibleTerminalText, renderShellSnapshot } from './shellTerminal';

describe('shell terminal helpers', () => {
  it('reads visible xterm row text and trims trailing blank rows', () => {
    const host = document.createElement('div');
    host.innerHTML = [
      '<div class="xterm-rows">',
      '<div>first</div>',
      '<div></div>',
      '<div>third</div>',
      '<div></div>',
      '</div>',
    ].join('');

    expect(getVisibleTerminalText(host)).toBe('first\n\nthird');
    expect(getVisibleTerminalText(null)).toBe('');
  });

  it('renders normalized snapshots and positions the cursor', () => {
    const writes: string[] = [];
    const terminal = {
      reset() {
        writes.push('reset');
      },
      write(value: string, callback?: () => void) {
        writes.push(value);
        callback?.();
      },
      scrollToBottom() {
        writes.push('bottom');
      },
    };

    renderShellSnapshot(
      terminal as Parameters<typeof renderShellSnapshot>[0],
      'one\r\ntwo\r\nthree\n',
      2,
      1,
      2,
    );

    expect(writes).toEqual(['reset', 'one\r\ntwo\r\nthree\r\x1b[3G', 'bottom']);
  });
});
