import { useMemo, useState } from 'react';
import type {
  ExportThreadPdfInput,
  ShellEventEnvelope,
  ThreadShellStateDto,
} from '@remote-codex/shared';
import type {
  AppShellNavContextValue,
  ThreadDetailUiAdapter,
  ThreadShellAdapter,
  ThreadShellControlState,
} from '@remote-codex/thread-ui';
import {
  AppShellMenuButton,
  AppShellNavContext,
  AppShellNavigationMenu,
  PluginProvider,
  ThreadActionsDialog,
  ThreadDetailSurface,
} from '@remote-codex/thread-ui';

import {
  mockCapabilities,
  mockDetail,
  mockStatus,
  mockThreads,
} from './mockData';
import { builtinFrontendPlugins } from '@remote-codex/thread-ui/builtin-plugins';

const mockShellSession = {
  id: 'shell-playground-1',
  threadId: mockDetail.thread.id,
  workspaceId: mockDetail.workspace.id,
  label: 'Playground shell',
  tmuxSessionName: 'tmux-playground-1',
  backend: 'pty' as const,
  cwd: mockDetail.workspace.absPath,
  status: 'running' as const,
  attachedViewerId: null,
  createdAt: '2026-06-08T14:19:00.000Z',
  updatedAt: '2026-06-08T14:19:00.000Z',
  lastActivityAt: null,
};

const mockExportTurnsState = {
  status: 'ready' as const,
  error: null,
  data: {
    totalTurnCount: 4,
    turns: [
      {
        turnId: 'playground-turn-4',
        turnNumber: 4,
        startedAt: '2026-06-08T14:22:00.000Z',
        status: 'completed' as const,
        userPromptPreview: 'Summarize the safety plan',
      },
      {
        turnId: 'playground-turn-3',
        turnNumber: 3,
        startedAt: '2026-06-08T14:20:00.000Z',
        status: 'completed' as const,
        userPromptPreview: 'Check the solvent notes',
      },
      {
        turnId: 'playground-turn-2',
        turnNumber: 2,
        startedAt: '2026-06-08T14:18:00.000Z',
        status: 'completed' as const,
        userPromptPreview: 'Inspect the workspace artifacts',
      },
      {
        turnId: 'playground-turn-1',
        turnNumber: 1,
        startedAt: '2026-06-08T14:16:00.000Z',
        status: 'failed' as const,
        userPromptPreview: 'Review Grignard setup risks',
      },
    ],
  },
};

function mockShellState(
  shells: typeof mockShellSession[],
): ThreadShellStateDto {
  return {
    threadId: mockDetail.thread.id,
    workspaceId: mockDetail.workspace.id,
    state: shells[0]?.status ?? 'not_created',
    shell: shells[0] ?? null,
    shells,
    activeShellId: shells[0]?.id ?? null,
    workspacePathStatus: 'present',
  };
}

function createPlaygroundShellAdapter(): ThreadShellAdapter {
  return {
    async fetchState() {
      return mockShellState([]);
    },
    async createShell() {
      return mockShellState([mockShellSession]);
    },
    async terminateShell() {
      return {
        ...mockShellSession,
        status: 'exited',
      };
    },
    async updateShell(_shellId, input) {
      return {
        ...mockShellSession,
        label: input.label ?? mockShellSession.label,
      };
    },
    connectSocket(handlers) {
      const socket = new EventTarget() as WebSocket;
      Object.defineProperty(socket, 'readyState', {
        configurable: true,
        value: WebSocket.OPEN,
      });
      Object.defineProperty(socket, 'close', {
        configurable: true,
        value: () => {
          socket.dispatchEvent(new Event('close'));
        },
      });
      window.setTimeout(() => {
        handlers.onConnected?.({});
      }, 0);

      return {
        socket,
        send(message) {
          if (
            typeof message === 'object' &&
            message !== null &&
            'type' in message &&
            message.type === 'shell.attach'
          ) {
            window.setTimeout(() => {
              const connectedEvent: ShellEventEnvelope = {
                type: 'shell.connected',
                shellId: mockShellSession.id,
                timestamp: new Date(
                  '2026-06-08T14:19:01.000Z',
                ).toISOString(),
                payload: {
                  viewerId: 'playground-viewer-1',
                },
              };
              handlers.onShellEvent?.(connectedEvent);
              handlers.onShellEvent?.({
                type: 'shell.output',
                shellId: mockShellSession.id,
                timestamp: new Date(
                  '2026-06-08T14:19:02.000Z',
                ).toISOString(),
                payload: {
                  data: 'playground shell ready\n',
                  cwdBaseName: 'computational-chemistry',
                  isCommandRunning: false,
                },
              });
            }, 0);
          }
        },
        close() {
          socket.dispatchEvent(new Event('close'));
        },
      };
    },
  };
}

export function PlaygroundApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [threadActionsOpen, setThreadActionsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'shell'>('chat');
  const [followTail, setFollowTail] = useState(true);
  const [autoCollapseCompletedTurns, setAutoCollapseCompletedTurns] = useState(true);
  const [scrollRequestKey, setScrollRequestKey] = useState(0);
  const [shellState, setShellState] = useState<ThreadShellControlState | null>(
    null,
  );

  const adapter = useMemo<ThreadDetailUiAdapter>(
    () => ({
      openThread() {},
      getThreadHref(threadId) {
        return `#${threadId}`;
      },
      getNewThreadHref(workspaceId) {
        return `#new-${workspaceId ?? 'workspace'}`;
      },
      sendPrompt() {},
      interrupt() {},
      compact() {},
      updateSettings() {},
      loadHistoryItemDetail(itemId) {
        return {
          id: itemId,
          kind: 'toolCall',
          title: 'Deferred detail',
          text: 'This is mock deferred detail for the standalone playground.',
        };
      },
      shell: createPlaygroundShellAdapter(),
    }),
    [],
  );

  const navContext = useMemo<AppShellNavContextValue>(
    () => ({
      navOpen: menuOpen,
      openNav: () => setMenuOpen(true),
      toggleNav: () => setMenuOpen((current) => !current),
      closeNav: () => setMenuOpen(false),
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      themeMode: 'dark',
      setThemeMode: () => {},
      effectiveTheme: 'dark',
      defaultBackend: 'codex',
      setDefaultBackend: () => {},
      autoCollapseCompletedTurns,
      setAutoCollapseCompletedTurns,
    }),
    [autoCollapseCompletedTurns, menuOpen, settingsOpen],
  );

  const threadActionsButton = (
    <button
      type="button"
      aria-label="Thread actions"
      title="Thread actions"
      className="thread-icon-button h-10 w-10 shrink-0 rounded-full text-sm font-semibold"
      onClick={() => setThreadActionsOpen(true)}
    >
      ...
    </button>
  );

  return (
    <AppShellNavContext.Provider value={navContext}>
      <PluginProvider builtinPlugins={builtinFrontendPlugins}>
        <ThreadDetailSurface
          threads={mockThreads}
          detail={mockDetail}
          loading={false}
          error={null}
          status={mockStatus}
          capabilities={mockCapabilities}
          adapter={adapter}
          currentThreadId={mockDetail.thread.id}
          currentWorkspaceId={mockDetail.workspace.id}
          currentWorkspaceLabel={mockDetail.workspace.label}
          activeView={activeView}
          appMenuButton={<AppShellMenuButton />}
          threadActionsButton={threadActionsButton}
          appNavigationMenu={
            <AppShellNavigationMenu
              items={[
                {
                  label: 'Threads',
                  href: '#threads',
                },
                {
                  label: 'Artifacts',
                  href: '#artifacts',
                },
              ]}
            />
          }
          onCloseAppNavigation={() => setMenuOpen(false)}
          timelineProps={{
            scrollRequestKey,
            onTailVisibilityChange: setFollowTail,
          }}
          composerProps={{
            disabled: false,
            draftPrompt: '',
            model: mockDetail.thread.model,
            reasoningEffort: mockDetail.thread.reasoningEffort,
            collaborationMode: mockDetail.thread.collaborationMode,
            canInterrupt: true,
            onInterrupt: adapter.interrupt,
            followTail,
            onToggleFollow: () => {
              setFollowTail(true);
              setScrollRequestKey((current) => current + 1);
            },
          }}
          shellComposerProps={{
            disabled: true,
            disabledPlaceholder: 'Shell adapter is not connected in playground',
          }}
          onShellStateChange={setShellState}
          metaContent={
            <div className="space-y-2 text-xs text-[var(--theme-fg-muted)]">
              <p>Runtime: {mockStatus.state}</p>
              <p>Shell: {shellState?.status ?? 'mocked'}</p>
              <button
                type="button"
                className="mt-2 h-8 rounded-lg border border-[var(--theme-border)] px-3 text-xs font-medium text-[var(--theme-fg-soft)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]"
                onClick={() =>
                  setActiveView((current) =>
                    current === 'chat' ? 'shell' : 'chat',
                  )
                }
              >
                {activeView === 'chat' ? 'Open Shell' : 'Open Chat'}
              </button>
            </div>
          }
        />
        <ThreadActionsDialog
          open={threadActionsOpen}
          turnsState={mockExportTurnsState}
          shareAvailable
          shareState={{
            status: 'ready',
            error: null,
            shares: [
              {
                id: 'playground-share-1',
                targetUsername: 'alice',
                label: 'Review',
                threadAccess: 'read',
                workspaceAccess: 'read',
                createdAt: '2026-06-08T14:25:00.000Z',
              },
            ],
          }}
          onCancel={() => setThreadActionsOpen(false)}
          onLoadTurns={() => {}}
          onExport={(_input: ExportThreadPdfInput) => {
            setThreadActionsOpen(false);
          }}
          onCreateShare={() => {}}
          onRevokeShare={() => {}}
        />
      </PluginProvider>
    </AppShellNavContext.Provider>
  );
}
