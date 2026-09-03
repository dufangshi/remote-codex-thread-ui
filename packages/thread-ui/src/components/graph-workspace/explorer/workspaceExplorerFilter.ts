import type { WorkspaceExplorerNodeRecord } from './workspaceExplorerTypes';

export interface WorkspaceExplorerMatch {
  score: number;
  ranges: Array<{ start: number; end: number }>;
}

function mergeMatchIndexes(indexes: number[]) {
  const ranges: Array<{ start: number; end: number }> = [];
  for (const index of indexes) {
    const previous = ranges.at(-1);
    if (previous && previous.end === index) {
      previous.end = index + 1;
    } else {
      ranges.push({ start: index, end: index + 1 });
    }
  }
  return ranges;
}

export function matchWorkspaceExplorerNode(
  node: Pick<WorkspaceExplorerNodeRecord, 'name' | 'path'>,
  rawQuery: string,
): WorkspaceExplorerMatch | null {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) {
    return { score: 0, ranges: [] };
  }
  const candidate = (
    query.includes('/') ? node.path : node.name
  ).toLocaleLowerCase();
  const indexes: number[] = [];
  let cursor = 0;
  let consecutive = 0;
  let segmentStarts = 0;
  for (const character of query) {
    const index = candidate.indexOf(character, cursor);
    if (index < 0) {
      return null;
    }
    indexes.push(index);
    if (indexes.length > 1 && index === indexes[indexes.length - 2]! + 1) {
      consecutive += 1;
    }
    if (
      index === 0 ||
      candidate[index - 1] === '/' ||
      candidate[index - 1] === '-'
    ) {
      segmentStarts += 1;
    }
    cursor = index + 1;
  }
  const first = indexes[0] ?? 0;
  const prefixBonus = first === 0 ? 200 : 0;
  const exactBonus = candidate === query ? 500 : 0;
  return {
    score:
      exactBonus +
      prefixBonus +
      consecutive * 20 +
      segmentStarts * 30 -
      first -
      candidate.length,
    ranges: mergeMatchIndexes(indexes),
  };
}
