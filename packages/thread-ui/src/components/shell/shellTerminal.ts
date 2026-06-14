import type { Terminal } from 'xterm';

export function renderShellSnapshot(
  terminal: Terminal,
  snapshot: string,
  cursorX?: number,
  cursorY?: number,
  paneHeight?: number,
) {
  const normalizedSnapshot = snapshot.replace(/\r\n/g, '\n');
  const lines = normalizedSnapshot.split('\n');
  if (normalizedSnapshot.endsWith('\n') && lines.at(-1) === '') {
    lines.pop();
  }
  const serializedSnapshot = lines.join('\r\n');
  let frame = serializedSnapshot;

  if (cursorX !== undefined && cursorY !== undefined) {
    const historyOffset =
      paneHeight !== undefined ? Math.max(0, lines.length - paneHeight) : 0;
    const cursorLineIndex = historyOffset + cursorY;
    const linesBelowCursor = Math.max(0, lines.length - cursorLineIndex - 1);

    if (linesBelowCursor > 0) {
      frame += `\x1b[${linesBelowCursor}A`;
    }

    frame += `\r\x1b[${cursorX + 1}G`;
  }

  terminal.reset();
  terminal.write(frame, () => {
    terminal.scrollToBottom();
  });
}

export function getVisibleTerminalText(hostNode: HTMLDivElement | null) {
  if (!hostNode) {
    return '';
  }

  const rows = Array.from(hostNode.querySelectorAll('.xterm-rows > div'))
    .map((row) => row.textContent ?? '')
    .filter((line, index, items) => line.length > 0 || index < items.length - 1);

  return rows.join('\n').trimEnd();
}
