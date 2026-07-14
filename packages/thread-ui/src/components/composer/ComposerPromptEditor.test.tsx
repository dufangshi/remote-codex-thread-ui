// @vitest-environment jsdom

import { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ComposerPromptEditor } from './ComposerPromptEditor';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderEditor(disabled = false) {
  const host = document.createElement('div');
  document.body.append(host);
  const promptRef = createRef<HTMLDivElement>();
  createRoot(host).render(
    <ComposerPromptEditor
      promptRef={promptRef}
      prompt=""
      disabled={disabled}
      promptPlaceholder="Ask Codex"
      canInterrupt={false}
      interruptLabel="Stop"
      composerPromptRegionClassName="prompt-region"
      graphChatInputClassName="prompt-input"
      onInput={vi.fn()}
      onPaste={vi.fn()}
      onKeyDown={vi.fn()}
      onKeyUp={vi.fn()}
      onMouseUp={vi.fn()}
      onBlur={vi.fn()}
      onDragEnter={vi.fn()}
      onDragOver={vi.fn()}
      onDragLeave={vi.fn()}
      onDrop={vi.fn()}
    />,
  );
  return { host, promptRef };
}

describe('ComposerPromptEditor', () => {
  it('focuses synchronously on pointer down for mobile WebViews', async () => {
    const { promptRef } = renderEditor();
    await new Promise((resolve) => setTimeout(resolve, 0));
    promptRef.current?.dispatchEvent(new Event('pointerdown', { bubbles: true }));

    expect(document.activeElement).toBe(promptRef.current);
    expect(promptRef.current?.getAttribute('inputmode')).toBe('text');
  });

  it('does not focus a disabled editor', async () => {
    const { promptRef } = renderEditor(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    promptRef.current?.dispatchEvent(new Event('pointerdown', { bubbles: true }));

    expect(document.activeElement).not.toBe(promptRef.current);
  });
});
