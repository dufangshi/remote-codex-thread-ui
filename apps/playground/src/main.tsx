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
  const [log, setLog] = useState<string[]>([]);
  const [shellState, setShellState] =
    useState<ThreadShellControlState | null>(null);

  const adapter = useMemo<ThreadDetailUiAdapter>(
    () => ({
      openThread(threadId) {
        setLog((current) => [`openThread(${threadId})`, ...current].slice(0, 6));
      },
      getThreadHref(threadId) {
        return `#${threadId}`;
      },
      getNewThreadHref(workspaceId) {
        return `#new-${workspaceId ?? 'workspace'}`;
      },
      sendPrompt(input) {
        setLog((current) =>
          [`sendPrompt(${input.prompt.slice(0, 48)})`, ...current].slice(0, 6),
        );
      },
      interrupt() {
        setLog((current) => ['interrupt()', ...current].slice(0, 6));
      },
      compact() {
        setLog((current) => ['compact()', ...current].slice(0, 6));
      },
      updateSettings(input) {
        setLog((current) =>
          [`updateSettings(${JSON.stringify(input)})`, ...current].slice(0, 6),
        );
      },
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
        <div className="flex h-screen min-h-0 bg-[#0b0d10] text-zinc-100">
          <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#111418] lg:flex lg:flex-col">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/80">
                Thread UI
              </p>
              <h1 className="mt-2 text-lg font-semibold text-white">
                GraphChat-style lab
              </h1>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              {mockThreads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  className="mb-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                  onClick={() => adapter.openThread(thread.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-medium text-white">
                      {thread.title}
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-200">
                      {thread.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">
                    {thread.summaryText}
                  </p>
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 px-4 py-3 text-xs text-zinc-500">
              Standalone package playground
            </div>
          </aside>

          <main className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#101317]/95 px-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <AppShellMenuButton />
                <div>
                  <p className="text-sm font-medium text-white">
                    {mockDetail.thread.title}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {mockDetail.workspace.label} / {mockDetail.thread.model}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-white/10"
                  onClick={() =>
                    setActiveView((current) =>
                      current === 'chat' ? 'shell' : 'chat',
                    )
                  }
                >
                  {activeView === 'chat' ? 'Shell' : 'Chat'}
                </button>
              </div>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden p-0 lg:p-4">
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
                  disabledPlaceholder:
                    'Shell adapter is not connected in playground',
                }}
                shellUnavailableContent={
                  <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
                    Shell is intentionally mocked out in this UI-only playground.
                  </div>
                }
                onShellStateChange={setShellState}
                metaContent={
                  <div className="space-y-2 text-xs text-zinc-400">
                    <p>Runtime: {mockStatus.state}</p>
                    <p>Shell: {shellState?.status ?? 'mocked'}</p>
                  </div>
                }
                floatingPanel={
                  log.length ? (
                    <div className="w-72 rounded-lg border border-white/10 bg-black/70 p-3 text-xs text-zinc-300 shadow-2xl backdrop-blur">
                      <p className="mb-2 font-medium text-zinc-100">Adapter log</p>
                      {log.map((entry, index) => (
                        <p key={`${entry}-${index}`} className="truncate">
                          {entry}
                        </p>
                      ))}
                    </div>
                  ) : null
                }
              />
            </div>
          </main>
        </div>
      </PluginProvider>
    </AppShellNavContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlaygroundApp />
  </StrictMode>,
);
