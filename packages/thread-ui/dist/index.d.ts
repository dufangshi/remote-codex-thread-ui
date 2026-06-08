import * as _remote_codex_shared from '@remote-codex/shared';
import { PromptAttachmentManifestEntryDto, ShellEventEnvelope, ThreadDto, UpdateThreadSettingsInput, ThreadHistoryItemDetailDto, ThreadShellStateDto, ShellSessionDto, UpdateShellInput, ReasoningEffortDto, CollaborationModeDto, ModelOptionDto, ThreadContextUsageDto, AgentProviderCapabilitiesDto, AgentBackendToolboxItemSchemaDto, AgentBackendHookCommandTemplateDto, AgentBackendManagementSchemaDto, ThreadSkillsDto, ThreadMcpServersDto, ThreadHooksDto, ThreadForkTurnOptionDto, ThreadGoalDto, CreateThreadHookInput, UpdateThreadHookInput, ThreadGoalStatusDto, ProviderHostFileDto, AgentRuntimeStatusDto, ThreadTurnDto, ThreadActionRequestDto, ThreadHistoryItemDto, RespondThreadActionRequestInput, ThreadActivityNoteDto, ThreadPendingSteerDto, ShellStatusDto, ThreadExportTurnOptionsDto, ExportThreadPdfInput, ThreadArtifactDto, PluginManifestDto, PluginDto, ImportPluginInput, ThreadDetailDto, UpdatePluginInput, AgentBackendIdDto } from '@remote-codex/shared';
import * as react from 'react';
import { Dispatch, SetStateAction, ReactNode, RefObject, Ref, ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

interface PromptAttachmentUpload extends PromptAttachmentManifestEntryDto {
    file: File;
}
type SendPromptInput = {
    prompt: string;
    attachments?: PromptAttachmentUpload[];
};
interface ThreadShellControlState$1 {
    status: _remote_codex_shared.ShellStatusDto;
    connectionButtonDisabled: boolean;
    connectionButtonLabel: string;
    shellInputEnabled: boolean;
    isConnecting: boolean;
    isCommandRunning: boolean;
    promptLabel: string | null;
    isMobileShell: boolean;
    hasShell: boolean;
    busy: boolean;
    loading: boolean;
    error: string | null;
}

interface ThreadTimelineAdapter {
    getImageAssetUrl?: (input: {
        threadId: string;
        path: string;
    }) => string;
    onOpenLinkedThread?: (threadId: string) => void;
    onLoadHistoryItemDetail?: (itemId: string) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
}
interface ShellSocketHandlers {
    onConnected?: (event: unknown) => void;
    onShellEvent?: (event: ShellEventEnvelope) => void;
}
interface ShellSocketConnection {
    socket: WebSocket;
    send(message: unknown): void;
    close?: () => void;
}
interface ThreadShellAdapter {
    fetchState(threadId: string): Promise<ThreadShellStateDto>;
    createShell(threadId: string, input?: {
        cols?: number;
        rows?: number;
        label?: string;
    }): Promise<ThreadShellStateDto>;
    terminateShell(shellId: string): Promise<ShellSessionDto>;
    updateShell(shellId: string, input: UpdateShellInput): Promise<ShellSessionDto>;
    connectSocket(handlers: ShellSocketHandlers): ShellSocketConnection;
}
interface ThreadDetailUiAdapter {
    openThread(threadId: string): void;
    getThreadHref?: (threadId: string) => string;
    getNewThreadHref?: (workspaceId?: string | null) => string;
    renameThread?: (threadId: string, title: string) => Promise<void> | void;
    deleteThread?: (thread: ThreadDto) => Promise<void> | void;
    sendPrompt(input: SendPromptInput): Promise<boolean | void> | boolean | void;
    interrupt?: () => Promise<void> | void;
    compact?: () => Promise<void> | void;
    updateSettings?: (input: UpdateThreadSettingsInput) => Promise<void> | void;
    loadHistoryItemDetail?: (itemId: string) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
    getImageAssetUrl?: (path: string) => string;
    shell?: ThreadShellAdapter | null;
}

interface ThreadComposerProps {
    activeView: 'chat' | 'shell';
    edgeToEdgeMobile?: boolean;
    busy?: boolean;
    settingsBusy?: boolean;
    compactBusy?: boolean;
    error?: string | null;
    model?: string | null;
    reasoningEffort?: ReasoningEffortDto | null;
    fastMode?: boolean;
    collaborationMode?: CollaborationModeDto;
    modelOptions?: ModelOptionDto[];
    contextUsage?: ThreadContextUsageDto | null | undefined;
    capabilities?: AgentProviderCapabilitiesDto | null | undefined;
    toolboxItems?: AgentBackendToolboxItemSchemaDto[] | null | undefined;
    hookCommandTemplates?: AgentBackendHookCommandTemplateDto[] | null | undefined;
    mcpConfigFormat?: AgentBackendManagementSchemaDto['mcpConfigFormat'] | null | undefined;
    followTail?: boolean;
    threadConnected?: boolean;
    shellAvailable?: boolean;
    disabled?: boolean;
    disabledPlaceholder?: string | undefined;
    shellControlState?: ThreadShellControlState$1 | null;
    draftPrompt?: string | undefined;
    draftAttachments?: PromptAttachmentUpload[] | undefined;
    skillsState?: SlashPanelState<ThreadSkillsDto>;
    mcpState?: SlashPanelState<ThreadMcpServersDto>;
    hooksState?: SlashPanelState<ThreadHooksDto>;
    forkTurnOptionsState?: SlashPanelState<ThreadForkTurnOptionDto[]>;
    goalState?: SlashPanelState<ThreadGoalDto | null | undefined>;
    onDraftChange?: Dispatch<SetStateAction<{
        prompt: string;
        attachments: PromptAttachmentUpload[];
    }>> | undefined;
    onSubmit: (input: {
        prompt: string;
        attachments?: PromptAttachmentUpload[];
    }) => Promise<boolean | void> | boolean | void;
    onInterrupt?: () => Promise<void> | void;
    onCompact?: () => Promise<void> | void;
    onOpenSkills?: () => Promise<void> | void;
    onOpenMcp?: () => Promise<void> | void;
    onOpenHooks?: () => Promise<void> | void;
    onCreateHook?: (input: CreateThreadHookInput) => Promise<void> | void;
    onUpdateHook?: (input: UpdateThreadHookInput) => Promise<void> | void;
    onTrustHook?: (input: {
        key: string;
        currentHash: string;
    }) => Promise<void> | void;
    onUntrustHook?: (input: {
        key: string;
    }) => Promise<void> | void;
    onOpenGoal?: () => Promise<void> | void;
    onUpdateGoal?: (input: {
        objective?: string | null;
        status?: ThreadGoalStatusDto | null;
        tokenBudget?: number | null;
    }) => Promise<void> | void;
    onOpenForkTurns?: () => Promise<void> | void;
    onForkLatest?: () => Promise<void> | void;
    onForkTurn?: (turnId: string) => Promise<void> | void;
    onReadProviderConfig?: (() => Promise<ProviderHostFileDto> | ProviderHostFileDto) | undefined;
    onWriteProviderConfig?: ((content: string) => Promise<ProviderHostFileDto> | ProviderHostFileDto) | undefined;
    onToggleFollow?: () => void;
    onUpdateSettings?: (input: UpdateThreadSettingsInput) => Promise<void> | void;
    onToggleView?: () => void;
    onShellCopy?: () => Promise<void> | void;
    onShellControl?: (action: 'ctrl_c' | 'ctrl_d' | 'esc' | 'tab' | 'up' | 'down' | 'clear') => Promise<void> | void;
    canInterrupt?: boolean;
}
interface SlashPanelState<T> {
    status: 'idle' | 'loading' | 'ready' | 'failed';
    data: T | null;
    error: string | null;
}
declare function ThreadComposer({ activeView, edgeToEdgeMobile, busy, settingsBusy, compactBusy, error, model, reasoningEffort, fastMode, collaborationMode, modelOptions, contextUsage, capabilities, toolboxItems, hookCommandTemplates, mcpConfigFormat, followTail, threadConnected, shellAvailable, disabled, disabledPlaceholder, shellControlState, draftPrompt, draftAttachments, skillsState, mcpState, hooksState, goalState, forkTurnOptionsState, onDraftChange, onSubmit, onInterrupt, onCompact, onOpenSkills, onOpenMcp, onOpenHooks, onCreateHook, onUpdateHook, onTrustHook, onUntrustHook, onOpenGoal, onUpdateGoal, onOpenForkTurns, onForkLatest, onForkTurn, onReadProviderConfig, onWriteProviderConfig, onToggleFollow, onUpdateSettings, onToggleView, onShellCopy, onShellControl, canInterrupt, }: ThreadComposerProps): react.JSX.Element;

interface ThreadWorkspaceLayoutProps {
    threads: ThreadDto[];
    status: AgentRuntimeStatusDto | null;
    loading?: boolean;
    error?: string | null;
    viewportConstrained?: boolean;
    showMobileAppMenu?: boolean;
    showMobileThreadNavToggle?: boolean;
    showMobileNewThreadShortcut?: boolean;
    mobileHeaderAction?: ReactNode;
    currentThreadId?: string | undefined;
    currentThreadLabel?: string | null | undefined;
    currentWorkspaceId?: string | null | undefined;
    currentWorkspaceLabel?: string | null | undefined;
    workspaceLabels?: Record<string, string>;
    metaContent?: ReactNode;
    settingsContent?: ReactNode;
    appMenuButton?: ReactNode;
    appNavigationMenu?: ReactNode;
    getThreadHref?: (threadId: string) => string;
    onOpenThread?: (threadId: string) => void;
    getNewThreadHref?: (workspaceId?: string | null) => string;
    newThreadHref?: string;
    newThreadLabel?: string;
    onNewThread?: () => void;
    renderThreadLink?: (input: {
        thread: ThreadDto;
        children: ReactNode;
        className: string;
        onClick: () => void;
    }) => ReactNode;
    onCloseAppNavigation?: () => void;
    onRenameThread?: ((threadId: string, title: string) => Promise<void> | void) | undefined;
    onDeleteThread?: ((thread: ThreadDto) => void) | undefined;
    children: ReactNode;
}
interface ThreadCardsProps {
    threads: ThreadDto[];
    currentThreadId?: string | undefined;
    currentWorkspaceId?: string | null | undefined;
    workspaceLabels?: Record<string, string>;
    onOpenThread: (threadId: string) => void;
    getThreadHref?: ((threadId: string) => string) | undefined;
    renderThreadLink?: ThreadWorkspaceLayoutProps['renderThreadLink'] | undefined;
    onBeginRenameThread?: ((thread: ThreadDto) => void) | undefined;
    onDeleteThread?: ((thread: ThreadDto) => void) | undefined;
    scrollable?: boolean;
    maxHeightClassName?: string;
    showDeleteButton?: boolean;
    showSessionCopyButton?: boolean;
}
declare function ThreadCards({ threads, currentThreadId, currentWorkspaceId, workspaceLabels, onOpenThread, getThreadHref, renderThreadLink, onBeginRenameThread, onDeleteThread, scrollable, maxHeightClassName, showDeleteButton, showSessionCopyButton, }: ThreadCardsProps): react.JSX.Element;
declare function ThreadWorkspaceLayout({ threads, loading, error, viewportConstrained, showMobileAppMenu, showMobileThreadNavToggle, showMobileNewThreadShortcut, mobileHeaderAction, currentThreadId, currentThreadLabel, currentWorkspaceId, currentWorkspaceLabel, workspaceLabels, metaContent, settingsContent, appMenuButton, appNavigationMenu, getThreadHref, onOpenThread, getNewThreadHref, newThreadHref: explicitNewThreadHref, newThreadLabel, onNewThread, renderThreadLink, onCloseAppNavigation, onRenameThread, onDeleteThread, children, }: ThreadWorkspaceLayoutProps): react.JSX.Element;

interface ThreadTimelineProps {
    threadId?: string | undefined;
    turns: ThreadTurnDto[];
    totalTurnCount?: number;
    pendingRequests?: ThreadActionRequestDto[];
    activeTurnId?: string | null;
    threadRunning?: boolean;
    livePlan?: {
        turnId: string;
        explanation: string | null;
        plan: Array<{
            step: string;
            status: string;
        }>;
    } | null;
    liveItems?: {
        turnId: string;
        items: ThreadHistoryItemDto[];
    } | null;
    respondingRequestId?: string | null;
    onRespondToRequest?: (requestId: string, input: RespondThreadActionRequestInput) => Promise<void> | void;
    liveOutput: string;
    scrollRequestKey?: number;
    bottomSpacer?: number;
    className?: string;
    onTailVisibilityChange?: (isVisible: boolean) => void;
    loadingEarlier?: boolean;
    onLoadEarlier?: () => void;
    ephemeralUserNote?: string | null;
    answeredRequestNotes?: Array<{
        id: string;
        turnId?: string | null;
        title: string;
        summaryLines: string[];
        createdAt?: string;
    }>;
    activityNotes?: ThreadActivityNoteDto[];
    pendingSteers?: ThreadPendingSteerDto[];
    optimisticSteers?: Array<{
        id: string;
        clientRequestId: string;
        turnId: string;
        prompt: string;
        createdAt: string;
        status: 'steering' | 'accepted';
    }>;
    optimisticTurn?: TimelineTurn | null;
    onLoadHistoryItemDetail?: (itemId: string) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
    onOpenThread?: (threadId: string) => void;
    onSelectArtifact?: (input: {
        item: ThreadHistoryItemDto & {
            kind: 'artifact';
        };
        artifact: NonNullable<ThreadHistoryItemDto['artifact']>;
    }) => void;
    onSelectHistoryItemDetail?: (input: {
        item: ThreadHistoryItemDto;
        detail: ThreadHistoryItemDetailDto;
    }) => void;
    adapter?: ThreadTimelineAdapter | undefined;
}
type TimelineTurn = Omit<ThreadTurnDto, 'status'> & {
    status: ThreadTurnDto['status'] | 'sending';
};
declare function ThreadTimelineComponent({ threadId, turns, totalTurnCount, pendingRequests, activeTurnId, threadRunning, pendingSteers, livePlan, liveItems, respondingRequestId, onRespondToRequest, liveOutput, scrollRequestKey, bottomSpacer, className, onTailVisibilityChange, loadingEarlier, onLoadEarlier, ephemeralUserNote, answeredRequestNotes, activityNotes, optimisticSteers, optimisticTurn, onLoadHistoryItemDetail, onOpenThread, onSelectArtifact, onSelectHistoryItemDetail, adapter, }: ThreadTimelineProps): react.JSX.Element;
declare const ThreadTimeline: react.MemoExoticComponent<typeof ThreadTimelineComponent>;

interface ThreadShellPanelProps {
    threadId: string;
    shellAdapter: ThreadShellAdapter;
    isVisible?: boolean;
    showHeader?: boolean;
    showFloatingToolbox?: boolean;
    effectiveTheme?: 'light' | 'dark';
    loadSplitRatio?: (threadId: string) => number | null | undefined;
    saveSplitRatio?: (threadId: string, ratio: number) => void;
    onStateChange?: (state: ThreadShellControlState) => void;
}
interface ThreadShellControlState {
    status: ShellStatusDto;
    connectionButtonDisabled: boolean;
    connectionButtonLabel: string;
    shellInputEnabled: boolean;
    isConnecting: boolean;
    isCommandRunning: boolean;
    promptLabel: string | null;
    isMobileShell: boolean;
    hasShell: boolean;
    busy: boolean;
    loading: boolean;
    error: string | null;
}
interface ThreadShellPanelHandle {
    toggleConnection: () => Promise<void>;
    sendInput: (data: string) => boolean;
    sendCommand: (command: string) => boolean;
    sendControl: (action: 'ctrl_c' | 'ctrl_d' | 'esc' | 'tab' | 'up' | 'down' | 'clear') => boolean;
    copyLastCommandOutput: () => Promise<boolean>;
    terminate: () => Promise<void>;
    focus: () => void;
    refreshLayout: (options?: {
        focus?: boolean;
        syncBackendSize?: boolean;
    }) => void;
}
declare const ThreadShellPanel: react.ForwardRefExoticComponent<ThreadShellPanelProps & react.RefAttributes<ThreadShellPanelHandle>>;

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    busy?: boolean;
    onCancel: () => void;
    onConfirm: () => void | Promise<void>;
}
declare function ConfirmDialog({ open, title, description, confirmLabel, busy, onCancel, onConfirm, }: ConfirmDialogProps): react.ReactPortal | null;

interface ExportTranscriptDialogProps {
    open: boolean;
    busy?: boolean;
    turnsState: {
        status: 'idle' | 'loading' | 'ready' | 'failed';
        data: ThreadExportTurnOptionsDto | null;
        error: string | null;
    };
    onCancel: () => void;
    onLoadTurns: () => void | Promise<void>;
    onExport: (input: ExportThreadPdfInput) => void | Promise<void>;
}
declare function ExportTranscriptDialog({ open, busy, turnsState, onCancel, onLoadTurns, onExport, }: ExportTranscriptDialogProps): react.ReactPortal | null;

interface LongTextDialogProps {
    open: boolean;
    title: string;
    text: string;
    onClose: () => void;
}
declare function LongTextDialog({ open, title, text, onClose, }: LongTextDialogProps): react.ReactPortal | null;

declare function formatShortTimestamp(value: string | null): string;
declare function formatLongTimestamp(value: string | null): string;
declare function threadStatusLabel(status: ThreadDto['status']): "Idle" | "Running" | "Interrupted" | "Failed" | "Not Loaded" | "System Error";
declare function threadStatusClassName(status: ThreadDto['status']): "ui-status-warning" | "ui-status-neutral" | "ui-status-info" | "ui-status-danger";
declare function turnStatusLabel(status: ThreadTurnDto['status'] | 'sending'): "Running" | "Interrupted" | "Failed" | "Sending" | "Completed";
declare function historyItemAccentClassName(kind: ThreadHistoryItemDto['kind']): "ui-status-neutral" | "timeline-kind-user" | "timeline-kind-agent" | "timeline-kind-action" | "timeline-kind-command" | "timeline-kind-search" | "timeline-kind-file-read" | "timeline-kind-reasoning" | "timeline-kind-agent-tool" | "timeline-kind-skill-tool" | "timeline-kind-plan" | "timeline-kind-file";
declare function historyItemLabel(kind: ThreadHistoryItemDto['kind']): "User" | "Agent" | "Artifact" | "Image" | "Context" | "Command" | "Web Search" | "File Read" | "Reasoning" | "Skill" | "Tool" | "Plan" | "File Change" | "Hook" | "Other";

declare function hasLikelyMarkdownSyntax(text: string): boolean;

interface ArtifactRenderContext {
    artifact: ThreadArtifactDto;
    expanded: boolean;
    onToggleExpanded: () => void;
}
interface InlineCodeRenderContext {
    code: string;
    isIncomplete: boolean;
    language: string;
    meta?: string;
}
interface ThreadPanelContribution {
    id: string;
    kind: string;
    label: string;
}
interface FrontendPluginModule {
    manifest: PluginManifestDto;
    threadPanels?: ThreadPanelContribution[];
    renderArtifact?: (context: ArtifactRenderContext) => ReactNode;
    inlineCodeRenderers?: Array<{
        languages: string[];
        render: (context: InlineCodeRenderContext) => ReactNode | null;
    }>;
}

interface PluginContextValue {
    plugins: PluginDto[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    importPluginManifest: (input: ImportPluginInput) => Promise<void>;
    setPluginEnabled: (pluginId: string, enabled: boolean) => Promise<void>;
    uninstallPlugin: (pluginId: string) => Promise<void>;
    renderArtifact: (context: ArtifactRenderContext) => ReactNode | null;
    renderInlineCode: (context: InlineCodeRenderContext) => ReactNode | null;
    hasRendererForArtifact: (artifact: ThreadArtifactDto) => boolean;
    getThreadPanels: () => ThreadPanelContribution[];
}
declare function mergePluginState(modules: FrontendPluginModule[], serverPlugins: PluginDto[]): PluginDto[];
declare const PluginContext: react.Context<PluginContextValue>;

interface ThreadDetailSurfaceProps {
    threads: ThreadDto[];
    detail: ThreadDetailDto | null;
    loading: boolean;
    error: string | null;
    status?: AgentRuntimeStatusDto | null;
    capabilities?: AgentProviderCapabilitiesDto | null;
    managementSchema?: AgentBackendManagementSchemaDto | null;
    plugins?: PluginContextValue;
    adapter: ThreadDetailUiAdapter;
    metaContent?: ReactNode;
    settingsContent?: ReactNode;
    mobileHeaderAction?: ReactNode;
    appMenuButton?: ReactNode;
    appNavigationMenu?: ReactNode;
    surfaceActions?: ReactNode;
    floatingPanel?: ReactNode;
    beforeTimelineContent?: ReactNode;
    errorContent?: ReactNode;
    workspaceMissingContent?: ReactNode;
    dialogs?: ReactNode;
    currentThreadId?: string;
    currentWorkspaceId?: string | null;
    currentWorkspaceLabel?: string | null;
    onCloseAppNavigation?: () => void;
    className?: string;
    activeView?: 'chat' | 'shell';
    liveOutput?: string;
    timelineProps?: Partial<Omit<ThreadTimelineProps, 'threadId' | 'turns' | 'liveOutput' | 'adapter'>>;
    composerProps?: Omit<ThreadComposerProps, 'activeView' | 'onSubmit'>;
    shellComposerProps?: Omit<ThreadComposerProps, 'activeView' | 'onSubmit'>;
    useFloatingMobileComposer?: boolean;
    floatingMobileComposerBottomOffset?: number;
    composerHostRef?: RefObject<HTMLDivElement | null>;
    shellPanelRef?: Ref<ThreadShellPanelHandle>;
    shellEffectiveTheme?: 'light' | 'dark';
    onShellStateChange?: (state: ThreadShellControlState) => void;
    shellUnavailableContent?: ReactNode;
    shellDisconnectedContent?: ReactNode;
    timelineComponent?: ComponentType<ThreadTimelineProps>;
    shellPanelComponent?: ForwardRefExoticComponent<{
        threadId: string;
        shellAdapter: NonNullable<ThreadDetailUiAdapter['shell']>;
        isVisible?: boolean;
        showHeader?: boolean;
        showFloatingToolbox?: boolean;
        effectiveTheme?: 'light' | 'dark';
        onStateChange?: (state: ThreadShellControlState) => void;
    } & RefAttributes<ThreadShellPanelHandle>>;
    shellContent?: ReactNode;
    loadingContent?: ReactNode;
    emptyContent?: ReactNode;
}
declare function ThreadDetailSurface({ threads, detail, loading, error, status, plugins: providedPlugins, adapter, metaContent, settingsContent, mobileHeaderAction, appMenuButton, appNavigationMenu, surfaceActions, floatingPanel, beforeTimelineContent, errorContent, workspaceMissingContent, dialogs, currentThreadId, currentWorkspaceId, currentWorkspaceLabel, onCloseAppNavigation, className, activeView, liveOutput, timelineProps, composerProps, shellComposerProps, useFloatingMobileComposer, floatingMobileComposerBottomOffset, composerHostRef, shellPanelRef, shellEffectiveTheme, onShellStateChange, shellUnavailableContent, shellDisconnectedContent, timelineComponent: TimelineComponent, shellPanelComponent: ShellPanelComponent, shellContent, loadingContent, emptyContent, }: ThreadDetailSurfaceProps): react.JSX.Element;

declare const builtinFrontendPlugins: FrontendPluginModule[];

interface PluginProviderAdapter {
    fetchPlugins?: () => Promise<PluginDto[]> | PluginDto[];
    importPlugin?: (input: ImportPluginInput) => Promise<PluginDto> | PluginDto;
    updatePlugin?: (pluginId: string, input: UpdatePluginInput) => Promise<PluginDto> | PluginDto;
    deletePlugin?: (pluginId: string) => Promise<PluginDto> | PluginDto;
}
declare function PluginProvider({ adapter, children, }: {
    adapter?: PluginProviderAdapter;
    children: ReactNode;
}): react.JSX.Element;

declare function usePlugins(): PluginContextValue;

declare function XyzArtifactRenderer({ artifact, expanded, onToggleExpanded, }: ArtifactRenderContext): react.JSX.Element;
declare function InlineXyzRenderer({ code, isIncomplete, language, }: InlineCodeRenderContext): react.JSX.Element | null;

type ThemeMode = 'system' | 'light' | 'dark';
type AgentBackendId = AgentBackendIdDto;
interface AppShellNavContextValue {
    navOpen: boolean;
    openNav: () => void;
    toggleNav: () => void;
    closeNav: () => void;
    settingsOpen: boolean;
    openSettings: () => void;
    closeSettings: () => void;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    effectiveTheme: 'light' | 'dark';
    defaultBackend: AgentBackendId;
    setDefaultBackend: (backend: AgentBackendId) => void;
}
declare const AppShellNavContext: react.Context<AppShellNavContextValue | null>;
declare function useAppShellNav(): AppShellNavContextValue | null;

interface AppShellNavigationItem {
    label: string;
    href: string;
}
interface AppShellNavigationMenuProps {
    className?: string;
    currentPath?: string;
    items?: AppShellNavigationItem[];
    onNavigate?: (href: string) => void;
}
declare function AppShellMenuButton({ className }: {
    className?: string;
}): react.JSX.Element | null;
declare function AppShellNavigationMenu({ className, currentPath, items, onNavigate, }: AppShellNavigationMenuProps): react.JSX.Element | null;
interface AppShellSettingsDialogProps {
    extraContent?: ReactNode;
    importPluginInput?: (draft: string) => ImportPluginInput;
}
declare function AppShellSettingsDialog({ extraContent, importPluginInput, }?: AppShellSettingsDialogProps): react.JSX.Element | null;

export { type AgentBackendId, AppShellMenuButton, AppShellNavContext, type AppShellNavContextValue, type AppShellNavigationItem, AppShellNavigationMenu, type AppShellNavigationMenuProps, AppShellSettingsDialog, type AppShellSettingsDialogProps, type ArtifactRenderContext, ConfirmDialog, ExportTranscriptDialog, type FrontendPluginModule, type InlineCodeRenderContext, InlineXyzRenderer, LongTextDialog, PluginContext, type PluginContextValue, PluginProvider, type PromptAttachmentUpload, type SendPromptInput, type ShellSocketConnection, type ShellSocketHandlers, type ThemeMode, ThreadCards, ThreadComposer, type ThreadComposerProps, ThreadDetailSurface, type ThreadDetailSurfaceProps, type ThreadDetailUiAdapter, type ThreadPanelContribution, type ThreadShellAdapter, type ThreadShellControlState$1 as ThreadShellControlState, ThreadShellPanel, type ThreadShellPanelHandle, ThreadTimeline, type ThreadTimelineAdapter, type ThreadTimelineProps, ThreadWorkspaceLayout, XyzArtifactRenderer, builtinFrontendPlugins, formatLongTimestamp, formatShortTimestamp, hasLikelyMarkdownSyntax, historyItemAccentClassName, historyItemLabel, mergePluginState, threadStatusClassName, threadStatusLabel, turnStatusLabel, useAppShellNav, usePlugins };
