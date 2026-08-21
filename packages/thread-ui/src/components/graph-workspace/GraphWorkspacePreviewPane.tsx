import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, ChevronsRight, Code2, Pencil, Save, X } from 'lucide-react';
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
  language = 'text',
}: {
  content: string;
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
              <span className="thread-graph-code-line" key={index}>
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
              return (
                <img
                  {...props}
                  src={resolvedSrc}
                  alt={alt ?? ''}
                  loading="lazy"
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
  error,
  imageUrl,
  loadingMore,
  onSaveFile,
  onOpenWorkspaceFile,
  onLoadMore,
  onCollapse,
  pdfUrl,
  previewFile,
  previewLoading,
  plugins,
  resolveWorkspaceFileUrl,
  selectedTarget,
  workspaceRootPath,
}: {
  error?: string | null;
  imageUrl?: string | null;
  loadingMore?: boolean;
  onSaveFile?: (input: {
    path: string;
    content: string;
  }) => Promise<void> | void;
  onOpenWorkspaceFile?: (path: string) => void;
  onLoadMore?: () => void;
  onCollapse?: () => void;
  pdfUrl?: string | null;
  previewFile?: ThreadWorkspaceFilePreview | null;
  previewLoading?: boolean;
  plugins: PluginContextValue;
  resolveWorkspaceFileUrl?: (path: string) => string | null;
  selectedTarget: GraphWorkspacePreviewTarget;
  workspaceRootPath?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [markdownView, setMarkdownView] = useState<'preview' | 'source'>(
    'preview',
  );
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
  const selectedFileIsMolecule =
    previewFile !== null && MOLECULAR_EXTENSIONS.has(extension);
  const canEditFile =
    Boolean(previewFile && onSaveFile) &&
    !selectedFileIsMolecule &&
    isSmallEditableTextFile(previewFile!);
  const isLiveArtifactPreview = selectedTarget?.kind === 'live-molecule';
  const isArtifactPreview = Boolean(activeNode?.artifact && renderedArtifact);
  const isMoleculePreview = Boolean(moleculeSnapshot) || isArtifactPreview;

  useEffect(() => {
    setEditing(false);
    setDraftContent(previewFile?.content ?? '');
    setSaveError(null);
    setMarkdownView('preview');
  }, [previewFile?.path, previewFile?.content]);

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

  return (
    <section
      className="thread-graph-viewer flex h-full min-h-0 flex-col overflow-hidden rounded-[12px]"
      data-preview-target-kind={selectedTarget?.kind ?? 'none'}
    >
      <div className="thread-graph-viewer-header flex h-12 shrink-0 items-center justify-between gap-3 border-b px-3 sm:h-[60px] sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <h2 className="text-base font-semibold text-slate-900 sm:text-[18px] dark:text-slate-100">
            Viewer
          </h2>
          {title ? (
            <span className="min-w-0 truncate text-sm font-medium text-slate-500 dark:text-slate-400">
              {title}
            </span>
          ) : null}
        </div>
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            data-testid="collapse-viewer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100"
            title="Collapse workspace"
            aria-label="Collapse workspace"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
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
            <img
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
            <div className="thread-graph-file-preview-header flex min-h-12 flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
              <div className="min-w-0 text-xs uppercase tracking-[0.12em]">
                {selectedFileIsMolecule
                  ? 'molecule'
                  : fileLanguage || extension || 'text'}{' '}
                | {previewFile.size.toLocaleString()} bytes
                {previewFile.truncated ? (
                  <span className="ml-2 text-amber-500">
                    showing {previewFile.nextOffset.toLocaleString()} bytes
                  </span>
                ) : null}
              </div>
              {isMarkdownFile || canEditFile ? (
                <div className="flex shrink-0 items-center gap-1.5">
                  {isMarkdownFile && !editing ? (
                    <div
                      className="thread-graph-markdown-view-switch inline-flex items-center rounded-md border p-0.5"
                      role="group"
                      aria-label="Markdown view"
                    >
                      <button
                        type="button"
                        onClick={() => setMarkdownView('preview')}
                        className={`inline-flex h-7 items-center gap-1 rounded px-2 text-xs transition ${
                          markdownView === 'preview' ? 'is-active' : ''
                        }`}
                        aria-pressed={markdownView === 'preview'}
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMarkdownView('source')}
                        className={`inline-flex h-7 items-center gap-1 rounded px-2 text-xs transition ${
                          markdownView === 'source' ? 'is-active' : ''
                        }`}
                        aria-pressed={markdownView === 'source'}
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        <span>Source</span>
                      </button>
                    </div>
                  ) : null}
                  {canEditFile ? (
                    <div className="flex shrink-0 items-center gap-1">
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
                            className="thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition disabled:cursor-not-allowed disabled:opacity-50"
                            title="Cancel edits"
                            aria-label="Cancel edits"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleSaveFile()}
                            disabled={
                              saving || draftContent === previewFile.content
                            }
                            className="thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition disabled:cursor-not-allowed disabled:opacity-50"
                            title="Save file"
                            aria-label="Save file"
                          >
                            <Save className="h-4 w-4" />
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
                          className="thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition"
                          title="Edit file"
                          aria-label="Edit file"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {saveError ? (
              <div className="border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200">
                {saveError}
              </div>
            ) : null}
            {editing ? (
              <textarea
                value={draftContent}
                onChange={(event) => setDraftContent(event.currentTarget.value)}
                spellCheck={false}
                aria-label="Workspace file editor"
                className="thread-graph-file-editor min-h-0 flex-1 resize-none border-0 bg-transparent p-4 font-mono text-[12px] leading-5 text-slate-900 outline-none dark:text-slate-100"
              />
            ) : isMarkdownFile && markdownView === 'preview' ? (
              <GraphWorkspaceMarkdownPreview
                content={previewFile.content}
                markdownPath={previewFile.path}
                {...(onOpenWorkspaceFile ? { onOpenWorkspaceFile } : {})}
                {...(resolveWorkspaceFileUrl
                  ? { resolveWorkspaceFileUrl }
                  : {})}
                {...(workspaceRootPath ? { workspaceRootPath } : {})}
              />
            ) : (
              <GraphWorkspaceCodePreview
                content={previewFile.content}
                language={fileLanguage}
              />
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
