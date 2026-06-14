/**
 * @vitest-environment jsdom
 */
import { createRef, type MutableRefObject, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type {
  ComposerDraft,
  PromptSelectionRange,
} from './composerUtils';
import {
  orderDroppedAttachmentFiles,
  useComposerAttachments,
  type UseComposerAttachmentsInput,
} from './useComposerAttachments';

type HookResult = ReturnType<typeof useComposerAttachments>;

let latestResult: HookResult | null = null;

function file(name: string, type: string) {
  return new File(['content'], name, { type });
}

function attachment(clientId: string, placeholder: string) {
  return {
    clientId,
    kind: 'file' as const,
    originalName: `${clientId}.txt`,
    placeholder,
    file: file(`${clientId}.txt`, 'text/plain'),
  };
}

function makeSelectionRef(
  value: PromptSelectionRange | null,
): RefObject<PromptSelectionRange | null> {
  const ref = createRef<PromptSelectionRange | null>();
  ref.current = value;
  return ref;
}

function makeStringArrayRef(value: string[]) {
  const ref = createRef<string[]>() as MutableRefObject<string[]>;
  ref.current = value;
  return ref;
}

function makeFileList(files: File[]) {
  const fileList = files.reduce<Record<number, File>>((result, entry, index) => {
    result[index] = entry;
    return result;
  }, {});
  return Object.assign(fileList, {
    length: files.length,
    item: (index: number) => files[index] ?? null,
    [Symbol.iterator]: files[Symbol.iterator].bind(files),
  }) as FileList;
}

function HookHarness(props: UseComposerAttachmentsInput) {
  latestResult = useComposerAttachments(props);
  return null;
}

function renderHookHarness(input: UseComposerAttachmentsInput) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  flushSync(() => {
    root.render(<HookHarness {...input} />);
  });

  return {
    rerender(nextInput: UseComposerAttachmentsInput) {
      flushSync(() => {
        root.render(<HookHarness {...nextInput} />);
      });
    },
    unmount() {
      flushSync(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

describe('useComposerAttachments', () => {
  beforeEach(() => {
    latestResult = null;
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    latestResult = null;
  });

  it('orders dropped photos before non-photo files', () => {
    const textFile = file('notes.txt', 'text/plain');
    const imageFile = file('image.png', 'image/png');

    expect(orderDroppedAttachmentFiles([textFile, imageFile])).toEqual([
      imageFile,
      textFile,
    ]);
  });

  it('appends picker files and updates draft plus selection refs', () => {
    let draft: ComposerDraft = {
      prompt: 'attach here',
      attachments: [attachment('old', '[FILE old.txt]')],
    };
    const updateDraft = vi.fn((update: (current: ComposerDraft) => ComposerDraft) => {
      draft = update(draft);
    });
    const getSelection = vi.fn(() => ({ start: 7, end: 11 }));
    const selectionSnapshotRef = makeSelectionRef(null);
    const pendingSelectionRef = makeSelectionRef(null);
    const pendingInsertedAttachmentIdsRef = makeStringArrayRef([]);
    const onInserted = vi.fn();
    const harness = renderHookHarness({
      prompt: draft.prompt,
      attachments: draft.attachments,
      updateDraft,
      getSelection,
      selectionSnapshotRef,
      pendingSelectionRef,
      pendingInsertedAttachmentIdsRef,
      onInserted,
      buildClientId: () => 'new-file',
    });

    flushSync(() => {
      latestResult?.appendAttachments(
        makeFileList([file('report.txt', 'text/plain')]),
        'file',
      );
    });

    expect(updateDraft).toHaveBeenCalledTimes(1);
    expect(draft.prompt).toBe('attach [FILE report.txt] ');
    expect(draft.attachments.map((entry) => entry.clientId)).toEqual([
      'old',
      'new-file',
    ]);
    expect(selectionSnapshotRef.current).toEqual({
      start: 'attach [FILE report.txt]'.length,
      end: 'attach [FILE report.txt]'.length,
    });
    expect(pendingSelectionRef.current).toEqual(selectionSnapshotRef.current);
    expect(pendingInsertedAttachmentIdsRef.current).toEqual(['new-file']);
    expect(onInserted).toHaveBeenCalledTimes(1);
    harness.unmount();
  });

  it('uses saved selection for dropped files when the live editor selection is absent', () => {
    let nextId = 0;
    let draft: ComposerDraft = {
      prompt: 'drop files',
      attachments: [],
    };
    const updateDraft = vi.fn((update: (current: ComposerDraft) => ComposerDraft) => {
      draft = update(draft);
    });
    const selectionSnapshotRef = makeSelectionRef({ start: 0, end: 10 });
    const pendingSelectionRef = makeSelectionRef(null);
    const pendingInsertedAttachmentIdsRef = makeStringArrayRef([]);
    const harness = renderHookHarness({
      prompt: draft.prompt,
      attachments: draft.attachments,
      updateDraft,
      getSelection: () => null,
      selectionSnapshotRef,
      pendingSelectionRef,
      pendingInsertedAttachmentIdsRef,
      buildClientId: () => {
        nextId += 1;
        return `drop-${nextId}`;
      },
    });

    flushSync(() => {
      latestResult?.appendDroppedAttachments([
        file('notes.txt', 'text/plain'),
        file('image.png', 'image/png'),
      ]);
    });

    expect(draft.prompt).toBe('[PHOTO image.png] [FILE notes.txt] ');
    expect(draft.attachments.map((entry) => entry.kind)).toEqual([
      'photo',
      'file',
    ]);
    expect(pendingInsertedAttachmentIdsRef.current).toEqual([
      'drop-1',
      'drop-2',
    ]);
    expect(selectionSnapshotRef.current).toEqual({
      start: '[PHOTO image.png] [FILE notes.txt]'.length,
      end: '[PHOTO image.png] [FILE notes.txt]'.length,
    });
    harness.unmount();
  });
});
