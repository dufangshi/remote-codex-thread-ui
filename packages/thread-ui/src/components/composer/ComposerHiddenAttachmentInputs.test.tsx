/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ComposerHiddenAttachmentInputs } from './ComposerHiddenAttachmentInputs';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderInputs(onAppendAttachments = vi.fn()) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  const photoInputRef = createRef<HTMLInputElement>();
  const fileInputRef = createRef<HTMLInputElement>();

  flushSync(() => {
    root?.render(
      <ComposerHiddenAttachmentInputs
        photoInputRef={photoInputRef}
        fileInputRef={fileInputRef}
        onAppendAttachments={onAppendAttachments}
      />,
    );
  });

  return { view: container, onAppendAttachments };
}

function setInputFiles(input: HTMLInputElement, files: File[]) {
  Object.defineProperty(input, 'files', {
    configurable: true,
    value: files,
  });
}

describe('ComposerHiddenAttachmentInputs', () => {
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

  it('forwards photo and file changes with their attachment kind', () => {
    const { view, onAppendAttachments } = renderInputs();
    const [photoInput, fileInput] = Array.from(
      view.querySelectorAll<HTMLInputElement>('input'),
    );
    const photo = new File(['photo'], 'photo.png', { type: 'image/png' });
    const file = new File(['file'], 'notes.txt', { type: 'text/plain' });

    setInputFiles(photoInput!, [photo]);
    setInputFiles(fileInput!, [file]);
    photoInput?.dispatchEvent(new Event('change', { bubbles: true }));
    fileInput?.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onAppendAttachments).toHaveBeenNthCalledWith(1, [photo], 'photo');
    expect(onAppendAttachments).toHaveBeenNthCalledWith(2, [file], 'file');
    expect(photoInput?.value).toBe('');
    expect(fileInput?.value).toBe('');
  });
});
