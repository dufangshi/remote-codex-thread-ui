import {
  type MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  Copy,
  Download,
  Eye,
  File,
  FileArchive,
  FileCode2,
  FileImage,
  Folder,
  FolderOpen,
  RefreshCw,
  Trash2,
  Upload,
} from 'lucide-react';

import type {
  AgentRuntimeStatusDto,
  ThreadArtifactDto,
  ThreadDetailDto,
} from '@remote-codex/shared';
import type {
  ThreadWorkspaceAdapter,
  ThreadWorkspaceFilePreview,
} from '../../adapters';
import type { PluginContextValue } from '../../plugins/plugin-context';
import {
  IMAGE_EXTENSIONS,
  PDF_EXTENSIONS,
  ancestorDirectoryPaths,
  collectAncestorPaths,
  collectWorkspaceItems,
  extensionOf,
  findFirstPreviewNode,
  findFirstWorkspaceFile,
  findWorkspaceNodeByPath,
  flattenWorkspaceNodes,
  hasWorkspacePath,
  normalizeWorkspacePath,
  replaceWorkspaceNode,
  replaceWorkspaceNodeChildren,
  workspaceTreeNodeToGraphNode,
  type WorkspaceTreeNode,
} from './workspaceTree';
import {
  GraphWorkspacePreviewPane,
  graphWorkspacePreviewTargetFromNode,
} from './GraphWorkspacePreviewPane';
import { GraphEmptyGarbageDialog } from './GraphEmptyGarbageDialog';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './GraphResizablePanels';

const PREVIEW_CHUNK_BYTES = 24_000;
const EXPANDED_PATHS_STORAGE_PREFIX = 'remote-codex:graphchat:workspace:expanded:';

const explorerPanelClassName =
  'thread-graph-explorer h-full min-h-0 overflow-hidden rounded-[12px]';
const explorerHeaderClassName =
  'thread-graph-explorer-header flex h-[60px] shrink-0 items-center justify-between border-b px-4';
const explorerHeadingClassName =
  'text-[18px] font-semibold text-slate-900 dark:text-slate-100';
const explorerIconButtonClassName =
  'thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition disabled:cursor-not-allowed disabled:opacity-50';
const collapseGhostButtonClassName =
  'thread-graph-explorer-collapse-button flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100';
const workspaceLabelClassName =
  'thread-graph-workspace-label px-3 pb-1 pt-2 text-[11px] font-semibold tracking-normal text-slate-500 dark:text-slate-400';
const emptyWorkspaceClassName =
  'thread-graph-workspace-empty mx-4 mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500 dark:border-[#303642] dark:bg-[#1b1f29] dark:text-slate-400';

function expandedPathsStorageKey(input: {
  threadId: string;
  workspaceId?: string | null;
}) {
  return `${EXPANDED_PATHS_STORAGE_PREFIX}${input.workspaceId ?? 'workspace'}:${input.threadId}`;
}

function readExpandedPaths(input: {
  threadId: string;
  workspaceId?: string | null;
}) {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(expandedPathsStorageKey(input));
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === 'string')
      : [];
  } catch {
    return [];
  }
}

function writeExpandedPaths(
  input: { threadId: string; workspaceId?: string | null },
  paths: Set<string>,
) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      expandedPathsStorageKey(input),
      JSON.stringify([...paths]),
    );
  } catch {
    // Persisted explorer state is an enhancement; ignore storage failures.
  }
}

function mergeRefreshedWorkspaceTree(
  refreshed: WorkspaceTreeNode,
  previous: WorkspaceTreeNode | null,
): WorkspaceTreeNode {
  if (!previous || refreshed.path !== previous.path) {
    return refreshed;
  }

  if (refreshed.kind !== 'directory') {
    return refreshed;
  }

  const previousByPath = new Map(previous.children.map((child) => [child.path, child]));
  const children = refreshed.children.map((child) =>
    mergeRefreshedWorkspaceTree(child, previousByPath.get(child.path) ?? null),
  );
  const refreshedHasLoadedChildren =
    refreshed.childrenLoaded && refreshed.children.length > 0;

  return {
    ...refreshed,
    children:
      refreshedHasLoadedChildren || !previous.childrenLoaded
        ? children
        : previous.children,
    childrenLoaded: refreshed.childrenLoaded || previous.childrenLoaded,
    truncated: refreshed.truncated ?? previous.truncated,
  };
}

function iconForWorkspaceNode(node: WorkspaceTreeNode, expanded: boolean) {
  if (node.kind === 'directory') {
    return expanded ? (
      <FolderOpen className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    ) : (
      <Folder className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    );
  }

  const extension = extensionOf(node.name);
  if (extension === 'zip') {
    return <FileArchive className="h-4 w-4 text-amber-600" />;
  }
  if (
    node.kind === 'file' &&
    ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)
  ) {
    return <FileImage className="h-4 w-4 text-sky-500" />;
  }
  if (
    node.kind === 'artifact' ||
    ['xyz', 'extxyz', 'cif', 'pdf', 'json', 'ts', 'tsx', 'js', 'jsx', 'md', 'yaml', 'yml', 'py'].includes(
      extension,
    )
  ) {
    return <FileCode2 className="h-4 w-4 text-emerald-600" />;
  }
  return <File className="h-4 w-4 text-slate-400 dark:text-slate-500" />;
}

function WorkspaceTreeRow({
  depth,
  expandedPaths,
  loadingPaths,
  node,
  onCopyPath,
  onDownload,
  onPreview,
  onSelect,
  onToggle,
  selectedNodeId,
}: {
  depth: number;
  expandedPaths: Set<string>;
  loadingPaths: Set<string>;
  node: WorkspaceTreeNode;
  onCopyPath?: ((node: WorkspaceTreeNode) => void) | undefined;
  onDownload?: ((node: WorkspaceTreeNode) => void) | undefined;
  onPreview?: ((node: WorkspaceTreeNode) => void) | undefined;
  onSelect: (nodeId: string) => void;
  onToggle: (path: string) => void;
  selectedNodeId: string | null;
}) {
  const isDirectory = node.kind === 'directory';
  const expanded =
    isDirectory && (node.path === '' || expandedPaths.has(node.path));
  const loadingChildren = isDirectory && loadingPaths.has(node.path);
  const selected = selectedNodeId === node.id;
  const paddingLeft = `${depth * 0.75 + 0.5}rem`;

  if (isDirectory) {
    return (
      <div>
        <div className="thread-graph-tree-row group flex items-center text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100">
          <button
            type="button"
            onClick={() => onToggle(node.path)}
            className="flex min-h-9 min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left sm:min-h-0 sm:py-1.5"
            style={{ paddingLeft }}
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
            )}
            {iconForWorkspaceNode(node, expanded)}
            <span className="truncate">{node.name}</span>
            {loadingChildren ? (
              <span className="ml-auto shrink-0 text-xs text-slate-400 dark:text-slate-500">
                Loading
              </span>
            ) : null}
          </button>
          {onDownload ? (
            <button
              type="button"
              onClick={() => onDownload(node)}
              className="thread-graph-tree-action mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-white hover:text-slate-900 sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100"
              title={node.path ? `Download ${node.name}` : 'Download workspace'}
              aria-label={
                node.path ? `Download ${node.name}` : 'Download workspace'
              }
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {onCopyPath && node.path ? (
            <button
              type="button"
              onClick={() => onCopyPath(node)}
              className="thread-graph-tree-action mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-white hover:text-slate-900 sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100"
              title={`Copy path for ${node.name}`}
              aria-label={`Copy path for ${node.name}`}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
        {expanded ? (
          <div>
            {node.children.map((child) => (
              <WorkspaceTreeRow
                key={child.id}
                depth={depth + 1}
                expandedPaths={expandedPaths}
                loadingPaths={loadingPaths}
                node={child}
                {...(onCopyPath ? { onCopyPath } : {})}
                {...(onDownload ? { onDownload } : {})}
                {...(onPreview ? { onPreview } : {})}
                onSelect={onSelect}
                onToggle={onToggle}
                selectedNodeId={selectedNodeId}
              />
            ))}
            {node.truncated ? (
              <div
                className="px-2 py-1 text-xs text-slate-400 dark:text-slate-500"
                style={{ paddingLeft: `${(depth + 1) * 0.75 + 0.5}rem` }}
              >
                More items not shown
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`thread-graph-tree-row group flex items-center text-sm transition ${
        selected
          ? 'is-selected'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className="flex min-h-9 min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left sm:min-h-0 sm:py-1.5"
        style={{ paddingLeft: `${depth * 0.75 + 2.2}rem` }}
      >
        {iconForWorkspaceNode(node, false)}
        <span className="truncate">{node.name}</span>
      </button>
      {node.kind === 'file' && (onPreview || onDownload || onCopyPath) ? (
        <div className="mr-1 flex shrink-0 items-center gap-0.5">
          {onPreview ? (
            <button
              type="button"
              onClick={() => onPreview(node)}
              className={`thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 ${
                selected
                  ? 'is-selected'
                  : 'text-slate-400 hover:bg-white hover:text-slate-900 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100'
              }`}
              title={`Preview ${node.name}`}
              aria-label={`Preview ${node.name}`}
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {onDownload ? (
            <button
              type="button"
              onClick={() => onDownload(node)}
              className={`thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 ${
                selected
                  ? 'is-selected'
                  : 'text-slate-400 hover:bg-white hover:text-slate-900 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100'
              }`}
              title={`Download ${node.name}`}
              aria-label={`Download ${node.name}`}
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {onCopyPath ? (
            <button
              type="button"
              onClick={() => onCopyPath(node)}
              className={`thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 ${
                selected
                  ? 'is-selected'
                  : 'text-slate-400 hover:bg-white hover:text-slate-900 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100'
              }`}
              title={`Copy path for ${node.name}`}
              aria-label={`Copy path for ${node.name}`}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function LiveWorkspaceSection({
  liveNodes,
  onSelect,
  selectedNodeId,
}: {
  liveNodes: WorkspaceTreeNode[];
  onSelect: (nodeId: string) => void;
  selectedNodeId: string | null;
}) {
  if (liveNodes.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-slate-200 py-2 dark:border-[#2a2f3a]">
      <div className="thread-graph-workspace-label px-3 pb-1 text-[11px] font-semibold tracking-normal text-slate-500 dark:text-slate-400">
        Live
      </div>
      <div className="space-y-0.5">
        {liveNodes.map((node) => {
          const selected = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              data-testid="live-molecule-item"
              data-molecule-id={node.artifact?.id ?? node.id}
              onClick={() => onSelect(node.id)}
              className={`thread-graph-tree-row flex min-h-9 w-full items-center gap-2 px-3 py-2 text-left text-sm transition sm:min-h-0 sm:py-1.5 ${
                selected
                  ? 'is-selected'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100'
              }`}
            >
              <FileCode2
                className={`h-4 w-4 shrink-0 ${
                  selected
                    ? 'text-current'
                    : 'text-emerald-600 dark:text-emerald-300'
                }`}
              />
              <span className="min-w-0 flex-1 truncate">{node.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorkspaceExplorerPanel({
  canEmptyGarbage,
  canUpload,
  onCollapse,
  expandedPaths,
  loadingPaths,
  loading,
  onDownload,
  onCopyPath,
  onEmptyGarbage,
  onPreview,
  onRefresh,
  onSelect,
  onToggle,
  onUpload,
  explorerScrollTopRef,
  explorerScrollerRef,
  selectedNodeId,
  tree,
  liveNodes,
}: {
  canEmptyGarbage?: boolean;
  canUpload?: boolean;
  onCollapse?: (() => void) | undefined;
  expandedPaths: Set<string>;
  loadingPaths: Set<string>;
  loading?: boolean;
  onDownload?: ((node: WorkspaceTreeNode) => void) | undefined;
  onCopyPath?: ((node: WorkspaceTreeNode) => void) | undefined;
  onEmptyGarbage?: (() => void) | undefined;
  onPreview?: ((node: WorkspaceTreeNode) => void) | undefined;
  onRefresh?: (() => void) | undefined;
  onSelect: (nodeId: string) => void;
  onToggle: (path: string) => void;
  onUpload?: () => void;
  explorerScrollTopRef: MutableRefObject<number>;
  explorerScrollerRef: MutableRefObject<HTMLDivElement | null>;
  selectedNodeId: string | null;
  tree: WorkspaceTreeNode;
  liveNodes?: WorkspaceTreeNode[];
}) {
  const visibleTree = useMemo(
    () => ({
      ...tree,
      children: tree.children.filter((node) => node.path !== 'live'),
    }),
    [tree],
  );
  useLayoutEffect(() => {
    const scroller = explorerScrollerRef.current;
    if (!scroller) {
      return;
    }
    scroller.scrollTop = explorerScrollTopRef.current;
  }, [explorerScrollerRef, explorerScrollTopRef]);

  return (
    <aside className={`${explorerPanelClassName} flex flex-col`}>
      <div className={explorerHeaderClassName}>
        <div className="min-w-0">
          <h2 className={explorerHeadingClassName}>Explorer</h2>
        </div>
        <div className="flex items-center gap-1">
          {onCollapse ? (
            <button
              type="button"
              data-testid="collapse-explorer"
              onClick={onCollapse}
              className={collapseGhostButtonClassName}
              title="Collapse Explorer"
              aria-label="Collapse Explorer"
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">Collapse Explorer</span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={onUpload}
            disabled={!canUpload}
            className={explorerIconButtonClassName}
            title={
              canUpload
                ? 'Upload file'
                : 'Upload is unavailable for this workspace'
            }
            aria-label="Upload file"
          >
            <Upload className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onRefresh}
            className={explorerIconButtonClassName}
            title="Refresh workspace"
            aria-label="Refresh workspace"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {onEmptyGarbage ? (
            <button
              type="button"
              onClick={onEmptyGarbage}
              disabled={!canEmptyGarbage}
              className={explorerIconButtonClassName}
              title={
                canEmptyGarbage
                  ? 'Empty garbage'
                  : 'Garbage controls are unavailable'
              }
              aria-label="Empty garbage"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
      <div
        ref={explorerScrollerRef}
        className="thread-graph-workspace-tree-scroll min-h-0 flex-1 overflow-y-auto py-2"
        onScroll={(event) => {
          explorerScrollTopRef.current = event.currentTarget.scrollTop;
        }}
      >
        <LiveWorkspaceSection
          liveNodes={liveNodes ?? []}
          onSelect={onSelect}
          selectedNodeId={selectedNodeId}
        />
        <div className={workspaceLabelClassName}>Workspace</div>
        <WorkspaceTreeRow
          depth={0}
          expandedPaths={expandedPaths}
          loadingPaths={loadingPaths}
          node={visibleTree}
          {...(onCopyPath ? { onCopyPath } : {})}
          {...(onDownload ? { onDownload } : {})}
          {...(onPreview ? { onPreview } : {})}
          onSelect={onSelect}
          onToggle={onToggle}
          selectedNodeId={selectedNodeId}
        />
        {visibleTree.children.length === 0 ? (
          <p className={emptyWorkspaceClassName}>
            This workspace is empty. Agent tool runs execute inside the thread
            workspace, so files should appear here as the session works.
          </p>
        ) : null}
      </div>
    </aside>
  );
}

export function GraphWorkspaceExplorer({
  activeView,
  detail,
  artifacts,
  plugins,
  status,
  focusPathRequest,
  workspaceAdapter,
}: {
  activeView: 'chat' | 'shell';
  detail: ThreadDetailDto;
  artifacts: ThreadArtifactDto[];
  plugins: PluginContextValue;
  status: AgentRuntimeStatusDto | null;
  focusPathRequest?: { path: string; line?: number; requestId: number } | null;
  workspaceAdapter?: ThreadWorkspaceAdapter | null;
}) {
  const [adapterTree, setAdapterTree] = useState<WorkspaceTreeNode | null>(null);
  const fallbackTree = useMemo(
    () =>
      workspaceAdapter && adapterTree
        ? null
        : collectWorkspaceItems(detail, artifacts, status, activeView),
    [activeView, adapterTree, artifacts, detail, status, workspaceAdapter],
  );
  const tree =
    adapterTree ??
    fallbackTree ??
    collectWorkspaceItems(detail, artifacts, status, activeView);
  const nodeMap = useMemo(() => flattenWorkspaceNodes(tree), [tree]);
  const liveNodes = useMemo(
    () => tree.children.find((node) => node.path === 'live')?.children ?? [],
    [tree],
  );
  const firstSelectableNode = findFirstPreviewNode(tree);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    () => firstSelectableNode?.id ?? null,
  );
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    () =>
      new Set([
        '',
        'artifacts',
        'thread-events',
        'live',
        ...collectAncestorPaths(firstSelectableNode?.path ?? ''),
      ]),
  );
  const [collapsedPanel, setCollapsedPanel] = useState<
    'explorer' | 'viewer' | null
  >(() =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 639px)').matches
      ? 'viewer'
      : null,
  );
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingDirectoryPaths, setLoadingDirectoryPaths] = useState<Set<string>>(
    () => new Set(),
  );
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showGarbageDialog, setShowGarbageDialog] = useState(false);
  const [garbageFiles, setGarbageFiles] = useState<string[]>([]);
  const [previewFile, setPreviewFile] =
    useState<ThreadWorkspaceFilePreview | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const explorerScrollerRef = useRef<HTMLDivElement | null>(null);
  const explorerScrollTopRef = useRef(0);
  const pendingExplorerScrollRestoreRef = useRef<number | null>(null);
  const workspaceAdapterAvailable = Boolean(workspaceAdapter);
  const activeNode =
    (selectedNodeId ? nodeMap.get(selectedNodeId) : null) ??
    firstSelectableNode ??
    null;
  const workspaceIdentity = {
    threadId: detail.thread.id,
    workspaceId: detail.workspace.id ?? detail.thread.workspaceId ?? null,
  };

  useEffect(() => {
    explorerScrollTopRef.current = 0;
    pendingExplorerScrollRestoreRef.current = null;
    setExpandedPaths(
      new Set([
        '',
        'artifacts',
        'thread-events',
        'live',
        ...readExpandedPaths(workspaceIdentity),
        ...collectAncestorPaths(firstSelectableNode?.path ?? ''),
      ]),
    );
    // firstSelectableNode should only seed state for this identity change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceIdentity.threadId, workspaceIdentity.workspaceId]);

  function rememberExplorerScroll() {
    const currentScrollTop =
      explorerScrollerRef.current?.scrollTop ?? explorerScrollTopRef.current;
    explorerScrollTopRef.current = currentScrollTop;
    pendingExplorerScrollRestoreRef.current = currentScrollTop;
  }

  function restoreExplorerScroll() {
    const target =
      pendingExplorerScrollRestoreRef.current ?? explorerScrollTopRef.current;
    const scroller = explorerScrollerRef.current;
    if (!scroller) {
      return;
    }

    let frame = 0;
    const restore = () => {
      const current = explorerScrollerRef.current;
      if (!current) {
        return;
      }
      current.scrollTop = Math.min(
        target,
        Math.max(0, current.scrollHeight - current.clientHeight),
      );
      explorerScrollTopRef.current = current.scrollTop;
      frame += 1;
      if (frame < 8) {
        window.requestAnimationFrame(restore);
      } else {
        pendingExplorerScrollRestoreRef.current = null;
      }
    };
    window.requestAnimationFrame(restore);
  }

  useLayoutEffect(() => {
    if (collapsedPanel === 'explorer') {
      return;
    }
    restoreExplorerScroll();
    // Restore after panel changes and tree mutations. These transitions can
    // remount the scroller or let WebView apply delayed scroll anchoring.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsedPanel, tree]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobileViewport(mediaQuery.matches);
    update();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  async function refreshWorkspaceTree(preferredPath?: string | null) {
    if (!workspaceAdapter) {
      return;
    }
    const currentSelectedPath = preferredPath ?? activeNode?.path ?? null;
    setLoadingTree(true);
    setWorkspaceError(null);
    try {
      const refreshedTree = workspaceTreeNodeToGraphNode(
        await workspaceAdapter.listTree({ ...workspaceIdentity, path: '' }),
      );
      let nextTree = adapterTree
        ? mergeRefreshedWorkspaceTree(refreshedTree, adapterTree)
        : refreshedTree;
      if (adapterTree) {
        const expandedDirectories = [...expandedPaths]
          .filter((path) => path)
          .sort((left, right) => left.split('/').length - right.split('/').length);
        for (const path of expandedDirectories) {
          const previousNode = findWorkspaceNodeByPath(adapterTree, path);
          if (previousNode?.kind !== 'directory' || !previousNode.childrenLoaded) {
            continue;
          }
          const refreshedNode = workspaceTreeNodeToGraphNode(
            await workspaceAdapter.listTree({ ...workspaceIdentity, path }),
          );
          nextTree = replaceWorkspaceNode(
            nextTree,
            path,
            mergeRefreshedWorkspaceTree(refreshedNode, previousNode),
          );
        }
      }
      setAdapterTree(nextTree);
      const firstFile = findFirstWorkspaceFile(nextTree);
      setSelectedNodeId((current) => {
        const fallbackPath =
          currentSelectedPath ?? (current ? nodeMap.get(current)?.path : null);
        if (fallbackPath && hasWorkspacePath(nextTree, fallbackPath)) {
          return `workspace:${fallbackPath}`;
        }
        return firstFile?.id ?? current;
      });
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : 'Failed to load workspace',
      );
      setAdapterTree(null);
    } finally {
      setLoadingTree(false);
    }
  }

  async function loadDirectoryChildren(path: string) {
    if (!workspaceAdapter || !adapterTree) {
      return;
    }

    setLoadingDirectoryPaths((current) => {
      if (current.has(path)) {
        return current;
      }
      const next = new Set(current);
      next.add(path);
      return next;
    });
    setWorkspaceError(null);

    try {
      const loadedNode = workspaceTreeNodeToGraphNode(
        await workspaceAdapter.listTree({ ...workspaceIdentity, path }),
      );
      setAdapterTree((current) =>
        current
          ? replaceWorkspaceNodeChildren(current, path, loadedNode.children, {
              truncated: loadedNode.truncated,
            })
          : current,
      );
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : 'Failed to load directory',
      );
    } finally {
      setLoadingDirectoryPaths((current) => {
        if (!current.has(path)) {
          return current;
        }
        const next = new Set(current);
        next.delete(path);
        return next;
      });
    }
  }

  async function focusWorkspacePath(path: string) {
    const targetPath = normalizeWorkspacePath(path);
    if (!targetPath) {
      return;
    }

    const ancestors = ancestorDirectoryPaths(targetPath);
    setCollapsedPanel(null);
    setExpandedPaths((current) => {
      const next = new Set(current);
      next.add('');
      for (const ancestor of ancestors) {
        next.add(ancestor);
      }
      writeExpandedPaths(workspaceIdentity, next);
      return next;
    });

    if (!workspaceAdapter) {
      if (hasWorkspacePath(tree, targetPath)) {
        setSelectedNodeId(`workspace:${targetPath}`);
      }
      return;
    }

    setLoadingTree(true);
    setWorkspaceError(null);
    try {
      let nextTree =
        adapterTree ??
        workspaceTreeNodeToGraphNode(
          await workspaceAdapter.listTree({ ...workspaceIdentity, path: '' }),
        );

      for (const ancestor of ancestors) {
        const existing = findWorkspaceNodeByPath(nextTree, ancestor);
        if (existing?.kind === 'directory' && existing.childrenLoaded) {
          continue;
        }
        const loadedNode = workspaceTreeNodeToGraphNode(
          await workspaceAdapter.listTree({ ...workspaceIdentity, path: ancestor }),
        );
        nextTree = replaceWorkspaceNode(nextTree, ancestor, loadedNode);
      }

      setAdapterTree(nextTree);
      setSelectedNodeId(`workspace:${targetPath}`);
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : `Failed to open ${targetPath}`,
      );
    } finally {
      setLoadingTree(false);
    }
  }

  useEffect(() => {
    if (!workspaceAdapter || !adapterTree) {
      return;
    }
    for (const node of nodeMap.values()) {
      if (
        node.path &&
        node.kind === 'directory' &&
        expandedPaths.has(node.path) &&
        node.hasChildren &&
        !node.childrenLoaded &&
        !loadingDirectoryPaths.has(node.path)
      ) {
        void loadDirectoryChildren(node.path);
      }
    }
    // loadDirectoryChildren is intentionally omitted; this effect reacts to the
    // current tree snapshot and expanded path set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adapterTree, expandedPaths, nodeMap, workspaceAdapter]);

  useEffect(() => {
    setAdapterTree(null);
    setLoadingDirectoryPaths(new Set());
    setPreviewFile(null);
    setImageUrl(null);
    setPdfUrl(null);
    setWorkspaceError(null);
    void refreshWorkspaceTree();
    // nodeMap is intentionally omitted; refreshWorkspaceTree uses current
    // selection opportunistically and should not refetch just because tree maps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    workspaceAdapterAvailable,
    detail.thread.id,
    detail.workspace.id,
    detail.thread.workspaceId,
  ]);

  useEffect(() => {
    if (!focusPathRequest) {
      return;
    }
    void focusWorkspacePath(focusPathRequest.path);
    // focusWorkspacePath is intentionally omitted; requestId is the trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusPathRequest?.requestId]);

  useEffect(() => {
    if (!workspaceAdapter?.subscribeWorkspaceChanged) {
      return;
    }
    // Workspace change events can be noisy while agents write files. Auto-refreshing
    // the lazy tree resets expanded nodes and scroll position, so the explorer now
    // leaves refresh under explicit user control.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceAdapter, workspaceIdentity.threadId, workspaceIdentity.workspaceId]);

  useEffect(() => {
    const selectedPathCandidate =
      workspaceAdapter && activeNode?.kind === 'file' ? activeNode.path : null;
    if (!selectedPathCandidate) {
      setPreviewFile(null);
      setImageUrl(null);
      setPdfUrl(null);
      return;
    }
    const selectedPath = selectedPathCandidate;

    let cancelled = false;
    async function loadPreview() {
      if (!workspaceAdapter) {
        return;
      }
      setPreviewLoading(true);
      setWorkspaceError(null);
      setPreviewFile(null);
      setImageUrl(null);
      setPdfUrl(null);
      try {
        const extension = extensionOf(selectedPath);
        const rawUrl = workspaceAdapter.getRawFileUrl?.({
          ...workspaceIdentity,
          path: selectedPath,
        });
        if (rawUrl && IMAGE_EXTENSIONS.has(extension)) {
          if (!cancelled) {
            setImageUrl(rawUrl);
          }
          return;
        }
        if (rawUrl && PDF_EXTENSIONS.has(extension)) {
          if (!cancelled) {
            setPdfUrl(rawUrl);
          }
          return;
        }
        const file = await workspaceAdapter.readFile({
          ...workspaceIdentity,
          path: selectedPath,
          limit: PREVIEW_CHUNK_BYTES,
        });
        if (!cancelled) {
          setPreviewFile(file);
        }
      } catch (error) {
        if (!cancelled) {
          setWorkspaceError(
            error instanceof Error ? error.message : 'Failed to read file',
          );
        }
      } finally {
        if (!cancelled) {
          setPreviewLoading(false);
        }
      }
    }
    void loadPreview();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceAdapter, activeNode?.id]);

  async function handleLoadMore() {
    if (!workspaceAdapter || !previewFile?.truncated) {
      return;
    }
    setLoadingMore(true);
    try {
      const chunk = await workspaceAdapter.readFile({
        ...workspaceIdentity,
        path: previewFile.path,
        offset: previewFile.nextOffset,
        limit: PREVIEW_CHUNK_BYTES,
      });
      setPreviewFile((current) =>
        current
          ? {
              ...current,
              content: current.content + chunk.content,
              truncated: chunk.truncated,
              nextOffset: chunk.nextOffset,
              size: chunk.size,
            }
          : current,
      );
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleSaveFile(input: { path: string; content: string }) {
    if (!workspaceAdapter?.writeFile) {
      return;
    }

    setWorkspaceError(null);
    await workspaceAdapter.writeFile({
      ...workspaceIdentity,
      path: input.path,
      content: input.content,
    });
    await refreshWorkspaceTree(input.path);
    const file = await workspaceAdapter.readFile({
      ...workspaceIdentity,
      path: input.path,
      limit: PREVIEW_CHUNK_BYTES,
    });
    setPreviewFile(file);
  }

  async function uploadWorkspaceFile(file: File) {
    if (!workspaceAdapter?.uploadFile || !file) {
      return;
    }
    setLoadingTree(true);
    setWorkspaceError(null);
    try {
      const result = await workspaceAdapter.uploadFile({
        ...workspaceIdentity,
        path: file.name,
        file,
      });
      const preferredPath =
        result.kind === 'archive' ? result.paths[0] ?? null : result.file.path;
      await refreshWorkspaceTree(preferredPath);
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : 'Failed to upload file',
      );
    } finally {
      setLoadingTree(false);
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) {
      await uploadWorkspaceFile(file);
    }
  }

  function pickUploadFile() {
    if (!workspaceAdapter?.uploadFile) {
      return;
    }
    const defaultPick = () => fileInputRef.current?.click();
    if (workspaceAdapter.pickUploadFile) {
      void workspaceAdapter.pickUploadFile({
        ...workspaceIdentity,
        defaultPick,
        upload: uploadWorkspaceFile,
      });
      return;
    }
    defaultPick();
  }

  function handleDownload(node: WorkspaceTreeNode) {
    void workspaceAdapter?.downloadNode?.({
      ...workspaceIdentity,
      path: node.path,
      kind: node.kind === 'directory' ? 'directory' : 'file',
    });
  }

  function handleCopyPath(node: WorkspaceTreeNode) {
    if (!node.path || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    const workspaceRoot = detail.workspace.absPath.replace(/\/+$/, '');
    const copyPath = node.path.startsWith('/')
      ? node.path
      : workspaceRoot
        ? `${workspaceRoot}/${node.path.replace(/^\/+/, '')}`
        : node.path;
    void navigator.clipboard.writeText(copyPath).catch((error) => {
      setWorkspaceError(
        error instanceof Error ? error.message : 'Failed to copy file path',
      );
    });
  }

  function handlePreview(node: WorkspaceTreeNode) {
    if (node.kind !== 'file') {
      return;
    }
    rememberExplorerScroll();
    setSelectedNodeId(node.id);
    setCollapsedPanel('explorer');
  }

  async function handleOpenGarbage() {
    if (!workspaceAdapter?.emptyGarbage) {
      return;
    }
    setWorkspaceError(null);
    if (!workspaceAdapter.listGarbage) {
      setGarbageFiles([]);
      setShowGarbageDialog(true);
      return;
    }
    try {
      const files = await workspaceAdapter.listGarbage(workspaceIdentity);
      setGarbageFiles(files.map((file) => `garbage/${file}`));
    } catch (error) {
      setGarbageFiles([]);
      setWorkspaceError(
        error instanceof Error ? error.message : 'Failed to list garbage files',
      );
    } finally {
      setShowGarbageDialog(true);
    }
  }

  async function handleConfirmEmptyGarbage() {
    if (!workspaceAdapter?.emptyGarbage) {
      return;
    }
    setShowGarbageDialog(false);
    setWorkspaceError(null);
    try {
      await workspaceAdapter.emptyGarbage(workspaceIdentity);
      await refreshWorkspaceTree(activeNode?.path ?? null);
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : 'Failed to empty garbage',
      );
    }
  }

  const explorerActions = {
    onCopyPath: handleCopyPath,
    ...(workspaceAdapter?.downloadNode
      ? { onDownload: handleDownload }
      : {}),
    ...(workspaceAdapter?.emptyGarbage
      ? { onEmptyGarbage: handleOpenGarbage }
      : {}),
    ...(workspaceAdapter
      ? { onRefresh: () => void refreshWorkspaceTree(activeNode?.path ?? null) }
      : {}),
    ...(workspaceAdapter?.uploadFile ? { onUpload: pickUploadFile } : {}),
  };

  function toggleDirectory(path: string) {
    if (!path) {
      return;
    }
    const node = nodeMap.get(`workspace:${path}`);
    const shouldLoad =
      node?.kind === 'directory' &&
      node.hasChildren &&
      !node.childrenLoaded &&
      !loadingDirectoryPaths.has(path);
    setExpandedPaths((current) => {
      const next = new Set(current);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      writeExpandedPaths(workspaceIdentity, next);
      return next;
    });
    if (!expandedPaths.has(path) && shouldLoad) {
      void loadDirectoryChildren(path);
    }
  }

  const explorerPanel = (
    <WorkspaceExplorerPanel
      canEmptyGarbage={Boolean(workspaceAdapter?.emptyGarbage)}
      canUpload={Boolean(workspaceAdapter?.uploadFile)}
      onCollapse={() => {
        rememberExplorerScroll();
        setCollapsedPanel('explorer');
      }}
      expandedPaths={expandedPaths}
      loadingPaths={loadingDirectoryPaths}
      loading={loadingTree}
      explorerScrollTopRef={explorerScrollTopRef}
      explorerScrollerRef={explorerScrollerRef}
      {...explorerActions}
      onPreview={handlePreview}
      onSelect={(nodeId) => {
        setSelectedNodeId(nodeId);
      }}
      onToggle={toggleDirectory}
      selectedNodeId={activeNode?.id ?? null}
      tree={tree}
      liveNodes={liveNodes}
    />
  );

  const viewerPanel = (
    <GraphWorkspacePreviewPane
      error={workspaceError}
      imageUrl={imageUrl}
      loadingMore={loadingMore}
      onLoadMore={handleLoadMore}
      {...(workspaceAdapter?.writeFile
        ? { onSaveFile: handleSaveFile }
        : {})}
      onCollapse={() => {
        rememberExplorerScroll();
        setCollapsedPanel('viewer');
      }}
      pdfUrl={pdfUrl}
      previewFile={previewFile}
      previewLoading={previewLoading}
      plugins={plugins}
      selectedTarget={graphWorkspacePreviewTargetFromNode(activeNode)}
    />
  );

  if (collapsedPanel === 'explorer') {
    return (
      <div
        data-testid="workspace-panel"
        className="relative h-full min-h-0 w-full overflow-hidden p-2"
      >
        {viewerPanel}
      </div>
    );
  }

  if (collapsedPanel === 'viewer') {
    return (
      <div
        data-testid="workspace-panel"
        className="relative h-full min-h-0 w-full overflow-hidden p-2"
      >
        {explorerPanel}
      </div>
    );
  }

  return (
    <div
      data-testid="workspace-panel"
      className="flex h-full min-h-0 w-full overflow-hidden bg-transparent p-2"
    >
      {showGarbageDialog ? (
        <GraphEmptyGarbageDialog
          files={garbageFiles}
          onCancel={() => setShowGarbageDialog(false)}
          onConfirm={() => void handleConfirmEmptyGarbage()}
        />
      ) : null}
      {isMobileViewport ? (
        <ResizablePanelGroup
          direction="vertical"
          className="thread-graph-workspace-mobile-stack"
        >
          <ResizablePanel defaultSize={42} minSize={18}>
            <div className="thread-graph-workspace-mobile-explorer h-full min-h-0 overflow-hidden">
            {explorerPanel}
            </div>
          </ResizablePanel>
          <ResizableHandle className="thread-graph-workspace-resize-handle h-2 bg-transparent after:h-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" />
          <ResizablePanel defaultSize={58} minSize={18}>
            <div className="thread-graph-workspace-mobile-viewer h-full min-h-0 overflow-hidden">
            {viewerPanel}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="thread-graph-workspace-resizable"
        >
          <ResizablePanel defaultSize={33} minSize={20}>
            <div className="thread-graph-workspace-explorer-pane h-full min-h-0 overflow-hidden">
            {explorerPanel}
            </div>
          </ResizablePanel>
          <ResizableHandle className="thread-graph-workspace-resize-handle w-2 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" />
          <ResizablePanel defaultSize={67} minSize={30}>
            <div className="thread-graph-workspace-viewer-pane h-full min-h-0 overflow-hidden">
            {viewerPanel}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
      <input
        ref={fileInputRef}
        type="file"
        aria-label="Workspace upload file input"
        data-testid="workspace-upload-file-input"
        className="hidden"
        onChange={(event) => void handleUpload(event)}
      />
    </div>
  );
}
