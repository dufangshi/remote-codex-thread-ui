export type ShellControlAction =
  | 'ctrl_c'
  | 'ctrl_d'
  | 'esc'
  | 'tab'
  | 'up'
  | 'down';

export function controlSequenceForLetter(key: string) {
  if (!/^[a-z]$/i.test(key)) {
    return null;
  }

  return String.fromCharCode(key.toUpperCase().charCodeAt(0) - 64);
}

export function normalizeShellSnapshot(snapshot: string) {
  return snapshot.replace(/\r\n/g, '\n');
}

export function splitShellSnapshotLines(snapshot: string) {
  const normalized = normalizeShellSnapshot(snapshot);
  const lines = normalized.split('\n');
  if (normalized.endsWith('\n') && lines.at(-1) === '') {
    lines.pop();
  }
  return lines;
}

export function looksLikePromptLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }

  return /(?:[$%#>])\s*$/.test(trimmed);
}

export function stripEchoedCommandLine(lines: string[], command: string) {
  const commandText = command.trim();
  if (!commandText || lines.length === 0) {
    return lines;
  }

  const [firstLine, ...rest] = lines;
  if (firstLine === undefined) {
    return lines;
  }
  const normalizedFirstLine = firstLine.trim();
  if (
    normalizedFirstLine === commandText ||
    normalizedFirstLine.endsWith(` ${commandText}`) ||
    normalizedFirstLine.endsWith(`$ ${commandText}`) ||
    normalizedFirstLine.endsWith(`% ${commandText}`) ||
    normalizedFirstLine.endsWith(`# ${commandText}`) ||
    normalizedFirstLine.endsWith(`> ${commandText}`)
  ) {
    return rest;
  }

  return lines;
}

export function extractCommandOutput(
  beforeSnapshot: string,
  afterSnapshot: string,
  command: string,
) {
  const beforeLines = splitShellSnapshotLines(beforeSnapshot);
  const afterLines = splitShellSnapshotLines(afterSnapshot);

  let prefix = 0;
  while (
    prefix < beforeLines.length &&
    prefix < afterLines.length &&
    beforeLines[prefix] === afterLines[prefix]
  ) {
    prefix += 1;
  }

  let suffix = 0;
  while (
    suffix < beforeLines.length - prefix &&
    suffix < afterLines.length - prefix &&
    beforeLines[beforeLines.length - 1 - suffix] ===
      afterLines[afterLines.length - 1 - suffix]
  ) {
    suffix += 1;
  }

  let addedLines = afterLines.slice(prefix, afterLines.length - suffix);
  addedLines = stripEchoedCommandLine(addedLines, command);

  while (addedLines.length > 0 && addedLines[0]?.trim() === '') {
    addedLines.shift();
  }

  while (
    addedLines.length > 0 &&
    (addedLines.at(-1)?.trim() === '' ||
      looksLikePromptLine(addedLines.at(-1) ?? ''))
  ) {
    addedLines.pop();
  }

  return addedLines.join('\n').trimEnd();
}

export function shellControlSequence(action: ShellControlAction) {
  switch (action) {
    case 'ctrl_c':
      return '\u0003';
    case 'ctrl_d':
      return '\u0004';
    case 'esc':
      return '\u001b';
    case 'tab':
      return '\t';
    case 'up':
      return '\u001b[A';
    case 'down':
      return '\u001b[B';
  }
}
