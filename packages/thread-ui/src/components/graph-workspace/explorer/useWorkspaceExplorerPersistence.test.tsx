// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  readWorkspaceExplorerState,
  writeWorkspaceExplorerState,
} from './useWorkspaceExplorerPersistence';

const identity = { threadId: 'thread-1', workspaceId: 'workspace-1' };
const key = 'remote-codex:graphchat:workspace:expanded:workspace-1:thread-1';

describe('workspace explorer persistence', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('migrates the existing expanded-path array', () => {
    window.localStorage.setItem(key, JSON.stringify(['src', 42, 'docs']));
    expect(readWorkspaceExplorerState(identity)).toEqual({
      version: 2,
      expandedPaths: ['src', 'docs'],
    });
  });

  it('round-trips version-two state and removes duplicate root paths', () => {
    writeWorkspaceExplorerState(identity, {
      expandedPaths: ['', 'src', 'src', 'docs'],
      selectedPath: 'src/index.ts',
      filterMode: 'filter',
    });
    expect(readWorkspaceExplorerState(identity)).toEqual({
      version: 2,
      expandedPaths: ['src', 'docs'],
      selectedPath: 'src/index.ts',
      filterMode: 'filter',
    });
  });

  it('ignores malformed data and unavailable storage', () => {
    window.localStorage.setItem(key, '{bad');
    expect(readWorkspaceExplorerState(identity)).toEqual({
      version: 2,
      expandedPaths: [],
    });

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() =>
      writeWorkspaceExplorerState(identity, { expandedPaths: ['src'] }),
    ).not.toThrow();
  });

  it('caps persisted expanded paths', () => {
    writeWorkspaceExplorerState(identity, {
      expandedPaths: Array.from({ length: 700 }, (_, index) => `dir-${index}`),
    });
    expect(readWorkspaceExplorerState(identity).expandedPaths).toHaveLength(
      500,
    );
  });
});
