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
      themeMode: 'light',
      setThemeMode: () => {},
      effectiveTheme: 'light',
      defaultBackend: 'codex',
      setDefaultBackend: () => {},
    }),
    [menuOpen, settingsOpen],
  );

  return (
    <AppShellNavContext.Provider value={navContext}>
      <PluginProvider>
        <div className="flex h-[100svh] min-h-0 overflow-hidden bg-[#f6f8fb] p-0 text-slate-900 sm:p-2">
          <aside className="hidden w-[264px] shrink-0 flex-col overflow-hidden rounded-[12px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] lg:flex">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  G
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    GraphChat UI
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    Thread workspace
                  </p>
                </div>
              </div>
              <AppShellMenuButton />
            </div>
            <div className="flex h-[68px] shrink-0 items-center border-b border-slate-200 px-4">
              <button
                type="button"
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 text-sm font-medium text-white transition hover:bg-slate-800"
                onClick={() => adapter.openThread('new-thread')}
              >
                <span aria-hidden="true">+</span>
                New Chat
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              <div className="mb-3 flex items-center gap-2 px-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                Rooms
              </div>
              {mockThreads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  className={`mb-1 flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    thread.id === mockDetail.thread.id
                      ? 'border-slate-950 bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]'
                      : 'border-transparent bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-white'
                  }`}
                  onClick={() => adapter.openThread(thread.id)}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      thread.id === mockDetail.thread.id
                        ? 'bg-white/15 text-white'
                        : 'bg-white text-slate-500'
                    }`}
                  >
                    #
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {thread.title}
                    </span>
                    <span
                      className={`mt-1 block truncate text-[11px] ${
                        thread.id === mockDetail.thread.id
                          ? 'text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {thread.summaryText}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-400">
              Standalone package playground
            </div>
          </aside>

          <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:rounded-[12px] sm:border sm:border-slate-200/80 lg:ml-2">
            <header className="flex min-h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2 sm:min-h-16 sm:px-5">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="lg:hidden">
                  <AppShellMenuButton />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-base font-semibold leading-none text-slate-900">
                    {mockDetail.thread.title}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    Room {mockDetail.workspace.id} / Session {mockDetail.thread.providerSessionId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-none transition hover:bg-slate-50 hover:text-slate-900"
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

            <div className="relative min-h-0 flex-1 overflow-hidden bg-white p-0 sm:p-2">
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
                  <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
                    Shell is intentionally mocked out in this UI-only playground.
                  </div>
                }
                onShellStateChange={setShellState}
                metaContent={
                  <div className="space-y-2 text-xs text-slate-500">
                    <p>Runtime: {mockStatus.state}</p>
                    <p>Shell: {shellState?.status ?? 'mocked'}</p>
                  </div>
                }
                floatingPanel={
                  log.length ? (
                    <div className="w-72 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow-lg">
                      <p className="mb-2 font-medium text-slate-900">Adapter log</p>
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
