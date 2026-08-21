import { describe, expect, it } from 'vitest';

import { workspaceRelativeFocusPath } from './workspaceTree';

describe('workspaceRelativeFocusPath', () => {
  it('converts absolute Unix and Windows paths to workspace-relative paths', () => {
    expect(
      workspaceRelativeFocusPath(
        '/home/u/treer/docs/architecture.md',
        '/home/u/treer',
      ),
    ).toBe('docs/architecture.md');
    expect(
      workspaceRelativeFocusPath(
        'C:\\Users\\treer\\docs\\architecture.md',
        'C:\\Users\\treer',
      ),
    ).toBe('docs/architecture.md');
  });

  it('preserves paths that are already relative to the workspace', () => {
    expect(
      workspaceRelativeFocusPath('docs/architecture.md', '/home/u/treer'),
    ).toBe('docs/architecture.md');
  });
});
