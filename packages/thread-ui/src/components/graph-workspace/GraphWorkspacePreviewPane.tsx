import {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';
import { createPortal } from 'react-dom';
import {
  BookOpen,
  ChevronRight,
  Code2,
  Minus,
  Pencil,
  PanelLeftOpen,
  PanelRightClose,
  Plus,
  RotateCcw,
  Save,
  X,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { HighlighterCore } from 'shiki/core';

import type { ThreadWorkspaceFilePreview } from '../../adapters';
import type { PluginContextValue } from '../../plugins/plugin-context';
import { getGraphChatHighlighter } from '../graph-chat/graphChatShiki';
import {
  MOLECULAR_EXTENSIONS,
  buildMoleculePreviewSnapshot,
  extensionOf,
  languageForPath,
  type WorkspaceTreeNode,
} from './workspaceTree';
import { WorkspaceInfoCard } from './GraphWorkspaceCards';
import { GraphMoleculeViewer } from './GraphMoleculeViewer';
import {
  WorkspaceFileTabs,
  type WorkspaceFileTab,
} from './WorkspaceFileTabs';

const GraphWorkspaceMonacoEditor = lazy(
  () => import('./GraphWorkspaceMonacoEditor'),
);

export type GraphWorkspacePreviewTarget =
  | { kind: 'live-molecule'; node: WorkspaceTreeNode }
  | { kind: 'workspace-file'; node: WorkspaceTreeNode }
  | { kind: 'artifact'; node: WorkspaceTreeNode }
  | { kind: 'event'; node: WorkspaceTreeNode }
  | { kind: 'meta'; node: WorkspaceTreeNode }
  | null;

const SMALL_TEXT_FILE_MAX_BYTES = 50 * 1024;
const SMALL_TEXT_FILE_MAX_LINES = 1000;
const MARKDOWN_EXTENSIONS = new Set(['md', 'markdown']);
const IMAGE_LIGHTBOX_MIN_SCALE = 0.5;
const IMAGE_LIGHTBOX_MAX_SCALE = 5;
const IMAGE_LIGHTBOX_SCALE_STEP = 0.25;
const CODE_LANGUAGE_ALIASES: Record<string, string> = {
  cs: 'csharp',
  jsonl: 'json',
  md: 'markdown',
  rb: 'ruby',
  rs: 'rust',
  sh: 'bash',
  yml: 'yaml',
};

function transparentHighlightBackground(html: string) {
  return html
    .replace(/background-color:[^;"]+;?/g, 'background-color: transparent;')
    .replace(/background:[^;"]+;?/g, 'background: transparent;');
}

function decodeWorkspaceResourcePath(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeWorkspaceResourceSegments(value: string) {
  const segments: string[] = [];
  for (const segment of value.replace(/\\/g, '/').split('/')) {
    if (!segment || segment === '.') {
      continue;
    }
    if (segment === '..') {
      if (segments.length === 0) {
        return null;
      }
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  return segments.join('/');
}

export function resolveWorkspaceMarkdownPath({
  markdownPath,
  resourceUrl,
  workspaceRootPath = '',
}: {
  markdownPath: string;
  resourceUrl: string;
  workspaceRootPath?: string;
}) {
  const trimmed = resourceUrl.trim();
  const windowsAbsolutePath = /^[a-zA-Z]:[\\/]/.test(trimmed);
  if (
    !trimmed ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('//') ||
    (!windowsAbsolutePath && /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed))
  ) {
    if (!/^https?:/i.test(trimmed) || typeof window === 'undefined') {
      return null;
    }
    try {
      const parsed = new URL(trimmed);
      if (parsed.origin !== window.location.origin) {
        return null;
      }
      resourceUrl = parsed.pathname;
    } catch {
      return null;
    }
  }

  const rawPath = decodeWorkspaceResourcePath(
    resourceUrl.trim().split(/[?#]/, 1)[0] ?? '',
  );
  if (!rawPath) {
    return null;
  }

  const normalizedRoot = workspaceRootPath
    .trim()
    .replace(/\\/g, '/')
    .replace(/\/+$/, '');
  const normalizedRawPath = rawPath.replace(/\\/g, '/');
  const absolutePath =
    normalizedRawPath.startsWith('/') || /^[a-zA-Z]:\//.test(normalizedRawPath);
  if (absolutePath) {
    if (
      normalizedRoot &&
      normalizedRawPath !== normalizedRoot &&
      !normalizedRawPath.startsWith(`${normalizedRoot}/`)
    ) {
      return null;
    }
    const rootMatches =
      normalizedRoot &&
      (normalizedRawPath === normalizedRoot ||
        normalizedRawPath.startsWith(`${normalizedRoot}/`));
    const rootRelativePath = rootMatches
      ? normalizedRawPath.slice(normalizedRoot.length)
      : normalizedRawPath;
    return normalizeWorkspaceResourceSegments(rootRelativePath);
  }

  const normalizedMarkdownPath = markdownPath.replace(/\\/g, '/');
  const markdownPathIsAbsolute =
    normalizedMarkdownPath.startsWith('/') ||
    /^[a-zA-Z]:\//.test(normalizedMarkdownPath);
  if (
    markdownPathIsAbsolute &&
    normalizedRoot &&
    normalizedMarkdownPath !== normalizedRoot &&
    !normalizedMarkdownPath.startsWith(`${normalizedRoot}/`)
  ) {
    return null;
  }
  const workspaceRelativeMarkdownPath =
    markdownPathIsAbsolute && normalizedRoot
      ? normalizedMarkdownPath.slice(normalizedRoot.length).replace(/^\/+/, '')
      : normalizedMarkdownPath.replace(/^\/+/, '');
  const lastSlash = workspaceRelativeMarkdownPath.lastIndexOf('/');
  const directory =
    lastSlash >= 0 ? workspaceRelativeMarkdownPath.slice(0, lastSlash) : '';
  return normalizeWorkspaceResourceSegments(
    directory ? `${directory}/${rawPath}` : rawPath,
  );
}

function isSmallEditableTextFile(file: ThreadWorkspaceFilePreview) {
  return (
    !file.truncated &&
    file.size <= SMALL_TEXT_FILE_MAX_BYTES &&
    file.content.split('\n').length <= SMALL_TEXT_FILE_MAX_LINES
  );
}

function previewTargetTitle(target: GraphWorkspacePreviewTarget) {
  if (!target) {
    return null;
  }
  return target.node.path || target.node.name || null;
}

function clampImageLightboxScale(scale: number) {
  return Math.min(
    IMAGE_LIGHTBOX_MAX_SCALE,
    Math.max(IMAGE_LIGHTBOX_MIN_SCALE, scale),
  );
}

function GraphWorkspaceImageLightbox({
  alt,
  onClose,
  src,
}: {
  alt: string;
  onClose: () => void;
  src: string;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function resetView() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  function updateScale(nextScale: number, clientX?: number, clientY?: number) {
    const clampedScale = clampImageLightboxScale(nextScale);
    if (clampedScale === scale) {
      return;
    }
    if (
      typeof clientX === 'number' &&
      typeof clientY === 'number' &&
      viewportRef.current
    ) {
      const rect = viewportRef.current.getBoundingClientRect();
      const anchorX = clientX - (rect.left + rect.width / 2);
      const anchorY = clientY - (rect.top + rect.height / 2);
      const ratio = clampedScale / scale;
      setOffset((current) => ({
        x: anchorX - (anchorX - current.x) * ratio,
        y: anchorY - (anchorY - current.y) * ratio,
      }));
    }
    setScale(clampedScale);
  }

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    updateScale(
      scale + direction * IMAGE_LIGHTBOX_SCALE_STEP,
      event.clientX,
      event.clientY,
    );
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLImageElement>) {
    if (scale <= 1 || event.button !== 0) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
    };
    setDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLImageElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    setOffset({
      x: drag.startOffsetX + event.clientX - drag.startClientX,
      y: drag.startOffsetY + event.clientY - drag.startClientY,
    });
  }

  function handlePointerEnd(event: ReactPointerEvent<HTMLImageElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return;
    }
    dragRef.current = null;
    setDragging(false);
  }

  return createPortal(
    <div
      className="thread-graph-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${alt || 'workspace image'}`}
    >
      <div
        className="thread-graph-image-lightbox-toolbar"
        role="toolbar"
        aria-label="Image zoom controls"
      >
        <button
          type="button"
          onClick={() => updateScale(scale - IMAGE_LIGHTBOX_SCALE_STEP)}
          disabled={scale <= IMAGE_LIGHTBOX_MIN_SCALE}
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={resetView}
          className="thread-graph-image-lightbox-scale"
          title="Reset zoom"
          aria-label={`Reset zoom, currently ${Math.round(scale * 100)}%`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{Math.round(scale * 100)}%</span>
        </button>
        <button
          type="button"
          onClick={() => updateScale(scale + IMAGE_LIGHTBOX_SCALE_STEP)}
          disabled={scale >= IMAGE_LIGHTBOX_MAX_SCALE}
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <span
          className="thread-graph-image-lightbox-divider"
          aria-hidden="true"
        />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          title="Close image preview"
          aria-label="Close image preview"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={viewportRef}
        className="thread-graph-image-lightbox-viewport"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={dragging ? 'is-dragging' : ''}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

function GraphWorkspaceZoomableImage({
  alt,
  className,
  loading,
  src,
}: {
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  src: string;
}) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  function closeLightbox() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="thread-graph-zoomable-image-trigger"
        onClick={() => setOpen(true)}
        title="Open image preview"
        aria-label={`Open image preview: ${alt || 'workspace image'}`}
      >
        <img src={src} alt={alt} className={className} loading={loading} />
      </button>
      {open ? (
        <GraphWorkspaceImageLightbox
          src={src}
          alt={alt}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}

export function graphWorkspacePreviewTargetFromNode(
  node: WorkspaceTreeNode | null,
): GraphWorkspacePreviewTarget {
  if (!node) {
    return null;
  }

  switch (node.kind) {
    case 'live-artifact':
      return { kind: 'live-molecule', node };
    case 'file':
      return { kind: 'workspace-file', node };
    case 'artifact':
      return { kind: 'artifact', node };
    case 'event':
      return { kind: 'event', node };
    case 'meta':
      return { kind: 'meta', node };
    case 'directory':
      return null;
  }
}

const GraphWorkspaceCodePreview = memo(function GraphWorkspaceCodePreview({
  content,
  focusLine,
  language = 'text',
}: {
  content: string;
  focusLine?: number | null;
  language?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let alive = true;
    getGraphChatHighlighter()
      .then((loadedHighlighter) => {
        if (alive) {
          setHighlighter(loadedHighlighter);
        }
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const shell = rootRef.current?.closest<HTMLElement>('.thread-ui-shell');
    const readDark = () =>
      shell
        ? shell.getAttribute('data-theme-effective') === 'dark' ||
          shell.classList.contains('dark') ||
          shell.classList.contains('thread-ui-theme-dark')
        : document.documentElement.classList.contains('dark');

    setDark(readDark());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setDark(readDark()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ['class', 'data-theme-effective'],
    });
    return () => observer.disconnect();
  }, []);

  const highlightedHtml = useMemo(() => {
    if (!highlighter) {
      return '';
    }
    const loadedLanguages = highlighter.getLoadedLanguages?.() ?? [];
    const normalizedLanguage = CODE_LANGUAGE_ALIASES[language] ?? language;
    const resolvedLanguage = loadedLanguages.includes(normalizedLanguage)
      ? normalizedLanguage
      : 'text';
    try {
      return transparentHighlightBackground(
        highlighter.codeToHtml(content, {
          lang: resolvedLanguage,
          theme: dark ? 'ayu-dark' : 'ayu-light',
        }),
      );
    } catch {
      return transparentHighlightBackground(
        highlighter.codeToHtml(content, {
          lang: 'text',
          theme: dark ? 'ayu-dark' : 'ayu-light',
        }),
      );
    }
  }, [content, dark, highlighter, language]);

  useEffect(() => {
    const root = rootRef.current;
    root
      ?.querySelectorAll('.is-focused-line')
      .forEach((element) => element.classList.remove('is-focused-line'));
    if (!root || !focusLine || focusLine < 1) {
      return;
    }
    const target =
      root.querySelector<HTMLElement>(`[data-line="${focusLine}"]`) ??
      root.querySelector<HTMLElement>(`.line:nth-child(${focusLine})`);
    target?.classList.add('is-focused-line');
    target?.scrollIntoView?.({ block: 'center' });
  }, [focusLine, highlightedHtml]);

  const lines = content.split('\n');
  return (
    <div
      ref={rootRef}
      className="thread-graph-code-preview min-h-0 flex-1 overflow-auto"
      role="region"
      aria-label="Source code"
    >
      {highlightedHtml ? (
        <div
          className="thread-graph-highlighted-code-preview"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="thread-graph-plain-code-preview">
          <code>
            {lines.map((line, index) => (
              <span
                className={`thread-graph-code-line ${
                  focusLine === index + 1 ? 'is-focused-line' : ''
                }`}
                data-line={index + 1}
                key={index}
              >
                <span
                  className="thread-graph-code-line-number"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span>{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      )}
    </div>
  );
});

const GraphWorkspaceMarkdownPreview = memo(
  function GraphWorkspaceMarkdownPreview({
    content,
    markdownPath,
    onOpenWorkspaceFile,
    resolveWorkspaceFileUrl,
    workspaceRootPath,
  }: {
    content: string;
    markdownPath: string;
    onOpenWorkspaceFile?: (path: string) => void;
    resolveWorkspaceFileUrl?: (path: string) => string | null;
    workspaceRootPath?: string;
  }) {
    const resolvePath = (resourceUrl: string | undefined) =>
      resourceUrl
        ? resolveWorkspaceMarkdownPath({
            markdownPath,
            resourceUrl,
            workspaceRootPath: workspaceRootPath ?? '',
          })
        : null;

    return (
      <div className="thread-graph-markdown thread-graph-markdown-preview min-h-0 flex-1 overflow-auto px-5 py-4 sm:px-7 sm:py-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a({ href, children, ...props }) {
              const workspacePath = resolvePath(href);
              if (workspacePath && onOpenWorkspaceFile) {
                return (
                  <a
                    {...props}
                    href={resolveWorkspaceFileUrl?.(workspacePath) ?? href}
                    onClick={(event) => {
                      event.preventDefault();
                      onOpenWorkspaceFile(workspacePath);
                    }}
                  >
                    {children}
                  </a>
                );
              }
              return (
                <a {...props} href={href}>
                  {children}
                </a>
              );
            },
            img({ src, alt, ...props }) {
              const workspacePath = resolvePath(src);
              const resolvedSrc = workspacePath
                ? (resolveWorkspaceFileUrl?.(workspacePath) ?? src)
                : src;
              if (!resolvedSrc) {
                return null;
              }
              return (
                <GraphWorkspaceZoomableImage
                  src={resolvedSrc}
                  alt={alt ?? ''}
                  loading="lazy"
                  className={props.className}
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
);

export function GraphWorkspacePreviewPane({
  activeFilePath,
  dirtyFilePaths = new Set(),
  error,
  fileTabs = [],
  focusLine,
  imageUrl,
  loadingMore,
  onSaveFile,
  onCloseFileTab,
  onDirtyChange,
  onExpandExplorer,
  onOpenWorkspaceFile,
  onLoadMore,
  onSelectFileTab,
  onCollapse,
  pdfUrl,
  previewFile,
  previewLoading,
  plugins,
  resolveWorkspaceFileUrl,
  selectedTarget,
  workspaceRootPath,
}: {
  activeFilePath?: string | null;
  dirtyFilePaths?: ReadonlySet<string>;
  error?: string | null;
  fileTabs?: WorkspaceFileTab[];
  focusLine?: number | null;
  imageUrl?: string | null;
  loadingMore?: boolean;
  onSaveFile?: (input: {
    path: string;
    content: string;
  }) => Promise<void> | void;
  onCloseFileTab?: (path: string) => void;
  onDirtyChange?: (path: string, dirty: boolean) => void;
  onExpandExplorer?: () => void;
  onOpenWorkspaceFile?: (path: string) => void;
  onLoadMore?: () => void;
  onSelectFileTab?: (path: string) => void;
  onCollapse?: () => void;
  pdfUrl?: string | null;
  previewFile?: ThreadWorkspaceFilePreview | null;
  previewLoading?: boolean;
  plugins: PluginContextValue;
  resolveWorkspaceFileUrl?: (path: string) => string | null;
  selectedTarget: GraphWorkspacePreviewTarget;
  workspaceRootPath?: string;
}) {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [markdownView, setMarkdownView] = useState<'preview' | 'source'>(
    'preview',
  );
  const [compactViewer, setCompactViewer] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(max-width: 639px)').matches,
  );
  const [dark, setDark] = useState(false);
  const activeNode = selectedTarget?.node ?? null;
  const renderedArtifact = activeNode?.artifact
    ? plugins.renderArtifact({
        artifact: activeNode.artifact,
        expanded: true,
        onToggleExpanded: () => undefined,
      })
    : null;
  const moleculeSnapshot = buildMoleculePreviewSnapshot(previewFile ?? null);
  const fileLanguage =
    previewFile?.language || languageForPath(previewFile?.path ?? '');
  const extension = previewFile ? extensionOf(previewFile.path) : '';
  const isMarkdownFile = MARKDOWN_EXTENSIONS.has(extension);
  const title = previewTargetTitle(selectedTarget);
  const canEditFile =
    Boolean(previewFile && onSaveFile) &&
    !(previewFile && MOLECULAR_EXTENSIONS.has(extension)) &&
    isSmallEditableTextFile(previewFile!);
  const isLiveArtifactPreview = selectedTarget?.kind === 'live-molecule';
  const isArtifactPreview = Boolean(activeNode?.artifact && renderedArtifact);
  const isMoleculePreview = Boolean(moleculeSnapshot) || isArtifactPreview;

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setCompactViewer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const shell = surfaceRef.current?.closest<HTMLElement>('.thread-ui-shell');
    const update = () =>
      setDark(
        shell?.getAttribute('data-theme-effective') === 'dark' ||
          shell?.classList.contains('dark') ||
          shell?.classList.contains('thread-ui-theme-dark') ||
          false,
      );
    update();
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(update);
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ['class', 'data-theme-effective'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setEditing(false);
    setDraftContent(previewFile?.content ?? '');
    setSaveError(null);
    setMarkdownView('preview');
  }, [previewFile?.path, previewFile?.content]);

  useEffect(() => {
    if (!previewFile) {
      return;
    }
    onDirtyChange?.(
      previewFile.path,
      editing && draftContent !== previewFile.content,
    );
  }, [draftContent, editing, onDirtyChange, previewFile]);

  async function handleSaveFile() {
    if (!previewFile || !onSaveFile) {
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      await onSaveFile({
        path: previewFile.path,
        content: draftContent,
      });
      setEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to save file.',
      );
    } finally {
      setSaving(false);
    }
  }

  const breadcrumbSegments = previewFile
    ? previewFile.path
        .replace(workspaceRootPath ?? '', '')
        .split('/')
        .filter(Boolean)
    : [];
  const fileToolbar =
    previewFile && (isMarkdownFile || canEditFile) ? (
      <div className="flex shrink-0 items-center gap-1">
        {isMarkdownFile && !editing ? (
          <div
            className="thread-graph-markdown-view-switch inline-flex items-center rounded border p-px"
            role="group"
            aria-label="Markdown view"
          >
            <button
              type="button"
              onClick={() => setMarkdownView('preview')}
              className={`inline-flex h-5 w-5 items-center justify-center rounded transition ${
                markdownView === 'preview' ? 'is-active' : ''
              }`}
              aria-pressed={markdownView === 'preview'}
              title="Markdown preview"
              aria-label="Markdown preview"
            >
              <BookOpen className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setMarkdownView('source')}
              className={`inline-flex h-5 w-5 items-center justify-center rounded transition ${
                markdownView === 'source' ? 'is-active' : ''
              }`}
              aria-pressed={markdownView === 'source'}
              title="Markdown source"
              aria-label="Markdown source"
            >
              <Code2 className="h-3 w-3" />
            </button>
          </div>
        ) : null}
        {canEditFile ? (
          <div className="flex shrink-0 items-center gap-0.5">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setDraftContent(previewFile.content);
                    setEditing(false);
                    setSaveError(null);
                  }}
                  disabled={saving}
                  className="thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40"
                  title="Cancel edits"
                  aria-label="Cancel edits"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleSaveFile()}
                  disabled={saving || draftContent === previewFile.content}
                  className="thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40"
                  title="Save file"
                  aria-label="Save file"
                >
                  <Save className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDraftContent(previewFile.content);
                  setMarkdownView('source');
                  setEditing(true);
                  setSaveError(null);
                }}
                className="thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition"
                title="Edit file"
                aria-label="Edit file"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ) : null}
      </div>
    ) : null;
  const viewerPaneToggle = onExpandExplorer ? (
    <button
      type="button"
      onClick={onExpandExplorer}
      data-testid="expand-explorer"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]"
      title="Show Explorer"
      aria-label="Show Explorer"
    >
      <PanelLeftOpen className="h-3.5 w-3.5" />
    </button>
  ) : onCollapse ? (
    <button
      type="button"
      onClick={onCollapse}
      data-testid="collapse-viewer"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]"
      title="Hide Editor"
      aria-label="Hide Editor"
    >
      <PanelRightClose className="h-3.5 w-3.5" />
    </button>
  ) : null;

  return (
    <section
      ref={surfaceRef}
      className="thread-graph-viewer flex h-full min-h-0 flex-col overflow-hidden rounded-md"
      data-preview-target-kind={selectedTarget?.kind ?? 'none'}
    >
      {selectedTarget?.kind !== 'workspace-file' ? (
        <div className="thread-graph-viewer-header flex h-9 shrink-0 items-center justify-between gap-2 border-b px-2.5">
          <span className="min-w-0 truncate text-xs font-medium text-[var(--theme-fg)]">
            {title ?? 'Preview'}
          </span>
          {viewerPaneToggle}
        </div>
      ) : null}
      {fileTabs.length > 0 && onCloseFileTab && onSelectFileTab ? (
        <WorkspaceFileTabs
          activePath={activeFilePath ?? null}
          dirtyPaths={dirtyFilePaths}
          onClose={onCloseFileTab}
          onSelect={onSelectFileTab}
          tabs={fileTabs}
          trailingAction={
            fileToolbar || viewerPaneToggle ? (
              <>
                {fileToolbar}
                {viewerPaneToggle}
              </>
            ) : null
          }
        />
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {error ? (
          <div className="border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200">
            {error}
          </div>
        ) : null}
        {!selectedTarget ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500">
            Pick a live molecule, workspace file, artifact, or thread event to
            preview it.
          </div>
        ) : selectedTarget.kind === 'workspace-file' && previewLoading ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500">
            Loading file preview...
          </div>
        ) : selectedTarget.kind === 'workspace-file' && moleculeSnapshot ? (
          <div className="thread-graph-molecule-preview min-h-0 flex-1 overflow-hidden">
            <GraphMoleculeViewer
              source={moleculeSnapshot}
              moleculeId={moleculeSnapshot.uuid ?? selectedTarget.node.path}
              title="PyMOL-style (PDB/CIF)"
            />
          </div>
        ) : selectedTarget.kind === 'workspace-file' && imageUrl ? (
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-5">
            <GraphWorkspaceZoomableImage
              src={imageUrl}
              alt={selectedTarget.node.path || selectedTarget.node.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : selectedTarget.kind === 'workspace-file' && pdfUrl ? (
          <div className="thread-graph-file-preview-frame min-h-0 flex-1 overflow-hidden">
            <iframe
              src={pdfUrl}
              title={`PDF preview: ${
                selectedTarget.node.path || selectedTarget.node.name
              }`}
              className="h-full w-full border-0"
            />
          </div>
        ) : selectedTarget.kind === 'workspace-file' && previewFile ? (
          <div className="flex min-h-0 flex-1 flex-col">
            {breadcrumbSegments.length > 1 ||
            (fileTabs.length === 0 && fileToolbar) ? (
              <div className="thread-graph-editor-breadcrumbs flex h-7 shrink-0 items-center border-b px-2 text-[11px]">
                <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
                  {breadcrumbSegments.map((segment, index, segments) => (
                    <span
                      key={`${segment}:${index}`}
                      className="flex shrink-0 items-center gap-0.5"
                    >
                      <span
                        className={
                          index === segments.length - 1
                            ? 'text-[var(--theme-fg)]'
                            : ''
                        }
                      >
                        {segment}
                      </span>
                      {index < segments.length - 1 ? (
                        <ChevronRight
                          aria-hidden="true"
                          className="h-3 w-3 text-[var(--theme-fg-muted)]"
                        />
                      ) : null}
                    </span>
                  ))}
                </div>
                {fileTabs.length === 0 ? fileToolbar : null}
              </div>
            ) : null}
            {saveError ? (
              <div className="border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200">
                {saveError}
              </div>
            ) : null}
            {editing && compactViewer ? (
              <textarea
                value={draftContent}
                onChange={(event) => setDraftContent(event.currentTarget.value)}
                spellCheck={false}
                aria-label="Workspace file editor"
                className="thread-graph-file-editor min-h-0 flex-1 resize-none border-0 bg-transparent p-4 font-mono text-[12px] leading-5 text-slate-900 outline-none dark:text-slate-100"
              />
            ) : isMarkdownFile && markdownView === 'preview' && !editing ? (
              <GraphWorkspaceMarkdownPreview
                content={previewFile.content}
                markdownPath={previewFile.path}
                {...(onOpenWorkspaceFile ? { onOpenWorkspaceFile } : {})}
                {...(resolveWorkspaceFileUrl
                  ? { resolveWorkspaceFileUrl }
                  : {})}
                {...(workspaceRootPath ? { workspaceRootPath } : {})}
              />
            ) : compactViewer ? (
              <GraphWorkspaceCodePreview
                content={previewFile.content}
                focusLine={focusLine}
                language={fileLanguage}
              />
            ) : (
              <Suspense
                fallback={
                  <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-[var(--theme-fg-muted)]">
                    Loading editor...
                  </div>
                }
              >
                <GraphWorkspaceMonacoEditor
                  key={previewFile.path}
                  content={editing ? draftContent : previewFile.content}
                  dark={dark}
                  focusLine={focusLine}
                  language={fileLanguage}
                  onChange={setDraftContent}
                  onSave={() => void handleSaveFile()}
                  path={previewFile.path}
                  readOnly={!editing}
                />
              </Suspense>
            )}
            {previewFile.truncated && onLoadMore ? (
              <div className="thread-graph-file-preview-footer flex justify-center border-t px-4 py-3">
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  title="Load more workspace preview"
                  aria-label="Load more workspace preview"
                  className="thread-graph-load-more-button rounded-md px-4 py-1.5 text-xs disabled:opacity-50"
                >
                  {loadingMore
                    ? 'Loading...'
                    : `Load more (${(
                        previewFile.size - previewFile.nextOffset
                      ).toLocaleString()} bytes remaining)`}
                </button>
              </div>
            ) : null}
          </div>
        ) : (selectedTarget.kind === 'live-molecule' ||
            selectedTarget.kind === 'artifact') &&
          selectedTarget.node.artifact ? (
          <div
            className={
              isMoleculePreview || isLiveArtifactPreview
                ? 'min-h-0 flex-1 overflow-hidden'
                : 'min-h-0 flex-1 overflow-auto p-3'
            }
          >
            {renderedArtifact}
          </div>
        ) : selectedTarget.kind === 'meta' ? (
          <div className="min-h-0 flex-1 overflow-auto p-3">
            <div className="grid gap-3">
              <WorkspaceInfoCard label="Workspace Data">
                <GraphWorkspaceCodePreview
                  content={selectedTarget.node.detail ?? ''}
                />
              </WorkspaceInfoCard>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="thread-graph-file-preview-header border-b px-4 py-3 text-xs uppercase tracking-[0.12em]">
              {selectedTarget.node.kind}
            </div>
            <GraphWorkspaceCodePreview
              content={
                selectedTarget.node.detail ??
                selectedTarget.node.preview ??
                selectedTarget.node.name
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
