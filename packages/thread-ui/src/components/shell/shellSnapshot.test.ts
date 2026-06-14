import { describe, expect, it } from 'vitest';

import {
  controlSequenceForLetter,
  extractCommandOutput,
  looksLikePromptLine,
  normalizeShellSnapshot,
  shellControlSequence,
  splitShellSnapshotLines,
  stripEchoedCommandLine,
} from './shellSnapshot';

describe('shellSnapshot utilities', () => {
  it('normalizes CRLF snapshots and trims a final empty line', () => {
    expect(normalizeShellSnapshot('one\r\ntwo\r\n')).toBe('one\ntwo\n');
    expect(splitShellSnapshotLines('one\r\ntwo\r\n')).toEqual(['one', 'two']);
  });

  it('detects common shell prompt lines', () => {
    expect(looksLikePromptLine('$')).toBe(true);
    expect(looksLikePromptLine('~/repo %')).toBe(true);
    expect(looksLikePromptLine('root@host #')).toBe(true);
    expect(looksLikePromptLine('output >')).toBe(true);
    expect(looksLikePromptLine('plain output')).toBe(false);
    expect(looksLikePromptLine('')).toBe(false);
  });

  it('strips echoed command lines with common prompt prefixes', () => {
    expect(stripEchoedCommandLine(['$ pnpm test', 'ok'], 'pnpm test')).toEqual([
      'ok',
    ]);
    expect(stripEchoedCommandLine(['repo % ls', 'a.txt'], 'ls')).toEqual([
      'a.txt',
    ]);
    expect(stripEchoedCommandLine(['actual output'], 'ls')).toEqual([
      'actual output',
    ]);
  });

  it('extracts new command output between snapshots', () => {
    const before = ['~/repo $', ''].join('\n');
    const after = ['~/repo $', '$ npm test', '', 'pass', '', '~/repo $'].join(
      '\n',
    );

    expect(extractCommandOutput(before, after, 'npm test')).toBe('pass');
  });

  it('preserves multiline command output and removes trailing prompt', () => {
    const before = 'prompt $';
    const after = [
      'prompt $',
      'git status',
      ' M src/file.ts',
      '?? docs/',
      'prompt $',
    ].join('\n');

    expect(extractCommandOutput(before, after, 'git status')).toBe(
      ' M src/file.ts\n?? docs/',
    );
  });

  it('maps control letters and shell control actions', () => {
    expect(controlSequenceForLetter('c')).toBe('\u0003');
    expect(controlSequenceForLetter('D')).toBe('\u0004');
    expect(controlSequenceForLetter('Enter')).toBeNull();

    expect(shellControlSequence('ctrl_c')).toBe('\u0003');
    expect(shellControlSequence('ctrl_d')).toBe('\u0004');
    expect(shellControlSequence('esc')).toBe('\u001b');
    expect(shellControlSequence('tab')).toBe('\t');
    expect(shellControlSequence('up')).toBe('\u001b[A');
    expect(shellControlSequence('down')).toBe('\u001b[B');
  });
});
