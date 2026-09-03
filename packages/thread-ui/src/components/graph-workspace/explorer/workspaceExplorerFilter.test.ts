import { describe, expect, it } from 'vitest';

import { matchWorkspaceExplorerNode } from './workspaceExplorerFilter';

describe('matchWorkspaceExplorerNode', () => {
  it('matches names case-insensitively and returns highlight ranges', () => {
    expect(
      matchWorkspaceExplorerNode(
        { name: 'GraphWorkspace.tsx', path: 'src/GraphWorkspace.tsx' },
        'gws',
      ),
    ).toEqual({
      score: 212,
      ranges: [
        { start: 0, end: 1 },
        { start: 5, end: 6 },
        { start: 9, end: 10 },
      ],
    });
  });

  it('matches paths when the query contains a slash', () => {
    expect(
      matchWorkspaceExplorerNode(
        { name: 'index.ts', path: 'src/components/index.ts' },
        'components/index',
      ),
    ).not.toBeNull();
  });

  it('prefers exact and consecutive matches and rejects missing characters', () => {
    const exact = matchWorkspaceExplorerNode(
      { name: 'readme', path: 'readme' },
      'readme',
    );
    const fuzzy = matchWorkspaceExplorerNode(
      { name: 'remote-editor', path: 'remote-editor' },
      're',
    );
    expect(exact!.score).toBeGreaterThan(fuzzy!.score);
    expect(
      matchWorkspaceExplorerNode(
        { name: 'README.md', path: 'README.md' },
        'xyz',
      ),
    ).toBeNull();
  });
});
