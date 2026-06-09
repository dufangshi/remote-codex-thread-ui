import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type {
  AppShellNavContextValue,
  ThreadDetailUiAdapter,
  ThreadShellControlState,
} from '@remote-codex/thread-ui';
import {
  AppShellNavContext,
  AppShellNavigationMenu,
  AppShellMenuButton,
  PluginProvider,
  ThreadDetailSurface,
} from '@remote-codex/thread-ui';

import {
  mockCapabilities,
  mockDetail,
  mockStatus,
  mockThreads,
} from './mockData';
import './styles.css';

function PlaygroundApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'shell'>('chat');
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
    }),
    [menuOpen, settingsOpen],
  );

  return (
    <AppShellNavContext.Provider value={navContext}>
      <PluginProvider>
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
          composerProps={{
            disabled: false,
            draftPrompt: '',
            model: mockDetail.thread.model,
            reasoningEffort: mockDetail.thread.reasoningEffort,
            collaborationMode: mockDetail.thread.collaborationMode,
            canInterrupt: true,
            onInterrupt: adapter.interrupt,
          }}
          shellComposerProps={{
            disabled: true,
            disabledPlaceholder: 'Shell adapter is not connected in playground',
          }}
          shellUnavailableContent={
            <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
              Shell is intentionally mocked out in this UI-only playground.
            </div>
          }
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
      </PluginProvider>
    </AppShellNavContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlaygroundApp />
  </StrictMode>,
);
