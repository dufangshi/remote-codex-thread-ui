/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import type { KeyboardEventHandler } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ComposerShellPromptInput } from './ComposerShellPromptInput';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderInput({
  prompt = '',
  canInterrupt = true,
  sendDisabled = false,
  onPromptChange = vi.fn(),
  onPromptKeyDown = vi.fn(),
  onInterrupt = vi.fn(),
}: {
  prompt?: string;
  canInterrupt?: boolean;
  sendDisabled?: boolean;
  onPromptChange?: (value: string) => void;
  onPromptKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  onInterrupt?: () => void;
} = {}) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(
      <ComposerShellPromptInput
        prompt={prompt}
        promptPlaceholder="Send shell input..."
        promptRegionClassName="prompt-region"
        promptInputClassName="prompt-input"
        interruptLabel="Send Ctrl-C"
        canInterrupt={canInterrupt}
        sendButtonLabel="Send"
        sendButtonClassName="send-state"
        sendDisabled={sendDisabled}
        onPromptChange={onPromptChange}
        onPromptKeyDown={onPromptKeyDown}
        onInterrupt={onInterrupt}
      />,
    );
  });

  return container;
}

describe('ComposerShellPromptInput', () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    if (root) {
      flushSync(() => {
        root?.unmount();
      });
    }
    container?.remove();
    root = null;
    container = null;
  });

  it('renders prompt text and forwards changes and keydown events', () => {
    const onPromptChange = vi.fn();
    const onPromptKeyDown = vi.fn();
    const view = renderInput({
      prompt: 'ls',
      onPromptChange,
      onPromptKeyDown,
    });
    const textarea = view.querySelector<HTMLTextAreaElement>('textarea');

    expect(textarea?.value).toBe('ls');
    flushSync(() => {
      if (textarea) {
        const valueSetter = Object.getOwnPropertyDescriptor(
          HTMLTextAreaElement.prototype,
          'value',
        )?.set;
        valueSetter?.call(textarea, 'pwd');
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
        textarea.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Enter',
            ctrlKey: true,
            bubbles: true,
          }),
        );
      }
    });

    expect(onPromptChange).toHaveBeenCalledWith('pwd');
    expect(onPromptKeyDown).toHaveBeenCalledTimes(1);
  });

  it('invokes interrupt only when enabled', () => {
    const onInterrupt = vi.fn();
    const view = renderInput({ canInterrupt: true, onInterrupt });

    view.querySelector<HTMLButtonElement>('[aria-label="Send Ctrl-C"]')?.click();

    expect(onInterrupt).toHaveBeenCalledTimes(1);
  });

  it('disables interrupt and send actions from props', () => {
    const view = renderInput({
      canInterrupt: false,
      sendDisabled: true,
    });

    expect(
      view.querySelector<HTMLButtonElement>('[aria-label="Send Ctrl-C"]')
        ?.disabled,
    ).toBe(true);
    expect(
      view.querySelector<HTMLButtonElement>('[aria-label="Send Shell Input"]')
        ?.disabled,
    ).toBe(true);
  });

  it('prevents pointer focus stealing on the send button', () => {
    const view = renderInput();
    const sendButton = view.querySelector<HTMLButtonElement>(
      '[aria-label="Send Shell Input"]',
    );
    const mouseDown = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    const pointerDown = new Event('pointerdown', {
      bubbles: true,
      cancelable: true,
    });

    sendButton?.dispatchEvent(mouseDown);
    sendButton?.dispatchEvent(pointerDown);

    expect(mouseDown.defaultPrevented).toBe(true);
    expect(pointerDown.defaultPrevented).toBe(true);
  });
});
