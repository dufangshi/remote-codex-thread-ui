// src/components/ThreadComposer.tsx
import {
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var HOOK_EVENT_OPTIONS = [
  { value: "preToolUse", label: "PreToolUse", matcherHint: "Bash" },
  {
    value: "permissionRequest",
    label: "PermissionRequest",
    matcherHint: "Bash"
  },
  { value: "postToolUse", label: "PostToolUse", matcherHint: "Bash" },
  {
    value: "sessionStart",
    label: "SessionStart",
    matcherHint: "startup|resume"
  },
  { value: "userPromptSubmit", label: "UserPromptSubmit", matcherHint: "" },
  { value: "stop", label: "Stop", matcherHint: "" },
  { value: "preCompact", label: "PreCompact", matcherHint: "" },
  { value: "postCompact", label: "PostCompact", matcherHint: "" }
];
var FALLBACK_HOOK_COMMAND = `node -e "process.stdin.resume(); process.stdin.on('end', () => console.error('hook ran'))"`;
function normalizePromptText(value) {
  return value.replace(/\u00a0/g, " ");
}
function textFromClipboardHtml(value) {
  if (!value) {
    return "";
  }
  const container = document.createElement("div");
  container.innerHTML = value;
  return container.textContent ?? "";
}
function editorContainsStyledRichText(editor) {
  return Boolean(editor.querySelector("[style], font"));
}
function tokenizePrompt(prompt, attachments) {
  if (!prompt) {
    return [];
  }
  const segments = [];
  const placeholders = [...attachments].sort(
    (left, right) => right.placeholder.length - left.placeholder.length
  );
  let cursor = 0;
  let textIndex = 0;
  while (cursor < prompt.length) {
    const matchingAttachment = placeholders.find(
      (attachment) => prompt.startsWith(attachment.placeholder, cursor)
    );
    if (matchingAttachment) {
      segments.push({
        type: "attachment",
        key: `${matchingAttachment.clientId}-${cursor}`,
        attachment: matchingAttachment
      });
      cursor += matchingAttachment.placeholder.length;
      continue;
    }
    let nextTokenIndex = prompt.length;
    for (const attachment of placeholders) {
      const candidateIndex = prompt.indexOf(attachment.placeholder, cursor);
      if (candidateIndex !== -1 && candidateIndex < nextTokenIndex) {
        nextTokenIndex = candidateIndex;
      }
    }
    const text = prompt.slice(cursor, nextTokenIndex);
    if (text) {
      segments.push({
        type: "text",
        key: `text-${textIndex}`,
        text
      });
      textIndex += 1;
    }
    cursor = nextTokenIndex;
  }
  return segments;
}
function formatReasoningEffortLabel(value) {
  if (!value) {
    return "Auto";
  }
  switch (value) {
    case "xhigh":
      return "xhigh";
    default:
      return value;
  }
}
function TerminalIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "m4 5 2 2-2 2" }),
        /* @__PURE__ */ jsx("path", { d: "M7.75 9.5h4.25" })
      ]
    }
  );
}
function PlusIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M8 3.25v9.5M3.25 8h9.5" })
    }
  );
}
function SlashIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M10.75 2.5 5.25 13.5" }),
        /* @__PURE__ */ jsx("path", { d: "M4.25 5.25h2.25" }),
        /* @__PURE__ */ jsx("path", { d: "M9.5 10.75h2.25" })
      ]
    }
  );
}
function authStatusLabel(value) {
  switch (value) {
    case "bearerToken":
      return "Token";
    case "oAuth":
      return "OAuth";
    case "notLoggedIn":
      return "Login";
    case "unsupported":
      return "Public";
    default:
      return "Unknown";
  }
}
function skillScopeLabel(value) {
  switch (value) {
    case "repo":
      return "Repo";
    case "system":
      return "System";
    case "admin":
      return "Admin";
    case "user":
    default:
      return "User";
  }
}
function hookEventLabel(value) {
  return HOOK_EVENT_OPTIONS.find((entry) => entry.value === value)?.label ?? value;
}
function hookSourceLabel(value) {
  switch (value) {
    case "cloudRequirements":
      return "Cloud";
    case "legacyManagedConfigFile":
    case "legacyManagedConfigMdm":
      return "Managed";
    case "sessionFlags":
      return "Session";
    default:
      return value[0]?.toUpperCase() + value.slice(1);
  }
}
function hookTrustLabel(value) {
  switch (value) {
    case "managed":
      return "Managed";
    case "modified":
      return "Modified";
    case "trusted":
      return "Trusted";
    case "untrusted":
      return "Review";
  }
}
function hookEventJsonKey(value) {
  switch (value) {
    case "preToolUse":
      return "PreToolUse";
    case "permissionRequest":
      return "PermissionRequest";
    case "postToolUse":
      return "PostToolUse";
    case "preCompact":
      return "PreCompact";
    case "postCompact":
      return "PostCompact";
    case "sessionStart":
      return "SessionStart";
    case "userPromptSubmit":
      return "UserPromptSubmit";
    case "stop":
      return "Stop";
  }
}
function hookScopeFromRecord(hook) {
  if (hook.source === "user") {
    return "global";
  }
  if (hook.source === "project") {
    return "project";
  }
  return null;
}
function editableHookTarget(hook) {
  const scope = hookScopeFromRecord(hook);
  if (!scope || hook.handlerType !== "command" || !hook.command || hook.isManaged) {
    return null;
  }
  return {
    scope,
    eventName: hook.eventName,
    matcher: hook.matcher,
    command: hook.command,
    timeoutSec: hook.timeoutSec,
    statusMessage: hook.statusMessage
  };
}
function goalStatusLabel(value) {
  switch (value) {
    case "active":
      return "Active";
    case "paused":
      return "Paused";
    case "budgetLimited":
      return "Budget";
    case "complete":
      return "Complete";
    default:
      return value;
  }
}
function parseGoalTokenBudgetThousands(value) {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  const thousands = Number(normalized);
  if (!Number.isFinite(thousands) || thousands <= 0) {
    return Number.NaN;
  }
  return Math.round(thousands * 1e3);
}
function formatGoalTokenBudgetThousands(value) {
  if (!value) {
    return "";
  }
  const thousands = value / 1e3;
  return Number.isInteger(thousands) ? String(thousands) : String(Number(thousands.toFixed(1)));
}
function normalizeTomlContent(value) {
  return value.replace(/\r\n/g, "\n");
}
function parseMcpServerName(value) {
  const normalized = value.trim();
  if (!/^[A-Za-z0-9_-]+$/.test(normalized)) {
    return null;
  }
  return normalized;
}
function parseMcpServerNameFromBlock(value) {
  const lines = normalizeTomlContent(value).split("\n").map((line) => line.trim()).filter(Boolean);
  const header = lines.find((line) => /^\[mcp_servers\.[^\]]+\]$/.test(line));
  if (!header) {
    return null;
  }
  const match = header.match(/^\[mcp_servers\.([A-Za-z0-9_-]+)\]$/);
  return match?.[1] ?? null;
}
function renderHttpMcpBlock(name, url) {
  return `[mcp_servers.${name}]
url = ${JSON.stringify(url.trim())}
`;
}
function upsertMcpServerBlock(configContent, serverName, blockContent) {
  const normalizedConfig = normalizeTomlContent(configContent);
  const trimmedBlock = `${normalizeTomlContent(blockContent).trim()}
`;
  const lines = normalizedConfig.split("\n");
  const exactHeader = `[mcp_servers.${serverName}]`;
  const nestedPrefix = `[mcp_servers.${serverName}.`;
  let start = -1;
  let end = lines.length;
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index]?.trim() ?? "";
    if (trimmed === exactHeader) {
      start = index;
      break;
    }
  }
  if (start >= 0) {
    for (let index = start + 1; index < lines.length; index += 1) {
      const trimmed = lines[index]?.trim() ?? "";
      if (!trimmed.startsWith("[")) {
        continue;
      }
      if (trimmed === exactHeader || trimmed.startsWith(nestedPrefix)) {
        continue;
      }
      end = index;
      break;
    }
    const before = lines.slice(0, start).join("\n").trimEnd();
    const after = lines.slice(end).join("\n").trim();
    return [before, trimmedBlock.trimEnd(), after].filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").concat("\n");
  }
  const base = normalizedConfig.trimEnd();
  return base ? `${base}

${trimmedBlock}` : trimmedBlock;
}
function clampPercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(value)));
}
function formatContextTokenKilocount(value) {
  const thousands = value / 1e3;
  return Number.isInteger(thousands) ? `${thousands}k` : `${Number(thousands.toFixed(1))}k`;
}
function formatModelContextTitle(model, contextUsage) {
  if (!model) {
    return "Select model";
  }
  if (contextUsage?.availability !== "available" || typeof contextUsage.tokensInContextWindow !== "number" || typeof contextUsage.modelContextWindow !== "number") {
    return `${model} \xB7 context unavailable`;
  }
  const usedTokens = Math.max(contextUsage.tokensInContextWindow, 0);
  const contextTokens = Math.max(contextUsage.modelContextWindow, 0);
  const remainingTokens = Math.max(contextTokens - usedTokens, 0);
  return [
    model,
    `${formatContextTokenKilocount(usedTokens)} used / ${formatContextTokenKilocount(contextTokens)}`,
    `${formatContextTokenKilocount(remainingTokens)} left`,
    `${clampPercent(contextUsage.remainingPercent)}% context left`
  ].join(" \xB7 ");
}
function ContextProgressBar({
  contextUsage
}) {
  const availability = contextUsage?.availability ?? "unavailable";
  const percent = clampPercent(contextUsage?.remainingPercent);
  if (availability !== "available") return null;
  const fillColor = percent <= 20 ? "rgba(251,113,133,0.90)" : percent <= 40 ? "rgba(252,211,77,0.85)" : "rgba(125,211,252,0.80)";
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "thread-context-progress-track pointer-events-none mt-0.5 block",
      children: /* @__PURE__ */ jsx(
        "span",
        {
          className: "thread-context-progress-fill block",
          style: {
            width: `${percent}%`,
            backgroundColor: fillColor
          }
        }
      )
    }
  );
}
function normalizedAttachmentFileName(file, kind) {
  const trimmed = file.name.trim();
  if (trimmed) {
    return trimmed;
  }
  const fallbackExtension = kind === "photo" ? file.type.includes("png") ? ".png" : file.type.includes("heic") ? ".heic" : file.type.includes("heif") ? ".heif" : file.type.includes("webp") ? ".webp" : ".jpg" : "";
  return `${kind === "photo" ? "photo" : "file"}-${Date.now()}${fallbackExtension}`;
}
function normalizeAttachmentLabel(name) {
  const sanitized = name.replace(/[\r\n[\]]+/g, " ").replace(/\s+/g, " ").trim();
  return sanitized || "attachment";
}
function classifyAttachmentKind(file) {
  return file.type.startsWith("image/") ? "photo" : "file";
}
function extractFilesFromTransfer(items, files) {
  const extractedFiles = [];
  if (items) {
    for (const item of Array.from(items)) {
      if (item.kind !== "file") {
        continue;
      }
      const file = item.getAsFile();
      if (file) {
        extractedFiles.push(file);
      }
    }
  }
  if (extractedFiles.length > 0) {
    return extractedFiles;
  }
  if (files) {
    return Array.from(files);
  }
  return [];
}
function hasTransferFiles(items, files) {
  return extractFilesFromTransfer(items, files).length > 0;
}
function segmentNodeText(child) {
  if (child instanceof HTMLElement && child.dataset.segmentType === "attachment" && child.dataset.placeholder) {
    return child.dataset.placeholder;
  }
  return child.textContent ?? "";
}
function basenameFromAttachmentPath(value) {
  const normalized = value.replace(/[\\/]+$/, "").trim();
  if (!normalized) {
    return "";
  }
  const segments = normalized.split(/[\\/]/).filter(Boolean);
  return segments.at(-1) ?? normalized;
}
function attachmentDisplayLabel(attachment) {
  const placeholderMatch = attachment.placeholder.match(
    /^\[(?:PHOTO|FILE)\s+(.+)\]$/
  );
  if (placeholderMatch?.[1]) {
    return placeholderMatch[1];
  }
  return basenameFromAttachmentPath(attachment.originalName);
}
function ChatIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M3 4.5A1.75 1.75 0 0 1 4.75 2.75h6.5A1.75 1.75 0 0 1 13 4.5v4A1.75 1.75 0 0 1 11.25 10.25H8l-2.75 2v-2H4.75A1.75 1.75 0 0 1 3 8.5v-4Z" })
    }
  );
}
function WrenchScrewdriverIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 20 20",
      className: "h-3.5 w-3.5 fill-current",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M14.5 10C16.9853 10 19 7.98528 19 5.5C19 5.01783 18.9242 4.55338 18.7838 4.11791C18.6792 3.79367 18.2734 3.72683 18.0325 3.96772L15.3402 6.66002C15.2098 6.79041 15.0168 6.84163 14.8466 6.77074C14.1172 6.46695 13.5334 5.88351 13.2292 5.15431C13.1582 4.98403 13.2094 4.79088 13.3398 4.66042L16.0327 1.9676C16.2735 1.72672 16.2067 1.32092 15.8825 1.21636C15.4469 1.07588 14.9823 1 14.5 1C12.0147 1 10 3.01472 10 5.5C10 5.59783 10.0031 5.69494 10.0093 5.79122C10.065 6.66418 9.88174 7.59855 9.20974 8.15855L1.98017 14.1832C1.3591 14.7008 1 15.4674 1 16.2759C1 17.7804 2.21962 19 3.7241 19C4.53256 19 5.29925 18.6409 5.81681 18.0198L11.8414 10.7903C12.4014 10.1183 13.3358 9.93497 14.2088 9.99073C14.3051 9.99688 14.4022 10 14.5 10ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M14.5 11.5C14.6731 11.5 14.8445 11.4927 15.0138 11.4783L18.7678 15.2323C19.7441 16.2086 19.7441 17.7915 18.7678 18.7678C17.7915 19.7441 16.2086 19.7441 15.2323 18.7678L10.8216 14.3571L12.9938 11.7505C13.0455 11.6885 13.1413 11.6131 13.3357 11.5552C13.5378 11.4951 13.805 11.468 14.1132 11.4877C14.2413 11.4959 14.3702 11.5 14.5 11.5Z" }),
        /* @__PURE__ */ jsx("path", { d: "M6.00003 4.58582L8.33056 6.91635C8.3027 6.95627 8.27496 6.98497 8.24946 7.00622L6.79994 8.21415L4.58582 6.00003H3.30905C3.11966 6.00003 2.94653 5.89303 2.86184 5.72364L1.1612 2.32237C1.06495 2.12987 1.10268 1.89739 1.25486 1.74521L1.74521 1.25486C1.89739 1.10268 2.12987 1.06495 2.32237 1.1612L5.72364 2.86184C5.89303 2.94653 6.00003 3.11966 6.00003 3.30905V4.58582Z" })
      ]
    }
  );
}
function ClipboardIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M5.5 3.25h5" }),
        /* @__PURE__ */ jsx("path", { d: "M6.4 2h3.2a.9.9 0 0 1 .9.9v.35h1.3a1.2 1.2 0 0 1 1.2 1.2v7.35a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 11.8V4.45a1.2 1.2 0 0 1 1.2-1.2h1.3V2.9a.9.9 0 0 1 .9-.9Z" })
      ]
    }
  );
}
function ToolPill({
  label,
  tone = "stone"
}) {
  const toneClassName = tone === "rose" ? "border-rose-300/35 bg-rose-300/14 text-rose-50" : tone === "sky" ? "border-sky-300/35 bg-sky-300/14 text-sky-50" : "border-stone-700/90 bg-stone-900/80 text-stone-100";
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `inline-flex min-w-[3rem] items-center justify-center rounded-full border px-2 py-1.5 text-[10px] font-medium tracking-[0.12em] ${toneClassName}`,
      children: label
    }
  );
}
function ThreadComposer({
  activeView,
  edgeToEdgeMobile = false,
  busy = false,
  settingsBusy = false,
  compactBusy = false,
  error,
  model = null,
  reasoningEffort = null,
  fastMode = false,
  collaborationMode = "default",
  modelOptions = [],
  contextUsage = null,
  capabilities = null,
  toolboxItems = null,
  hookCommandTemplates = null,
  mcpConfigFormat = "none",
  followTail = false,
  threadConnected = true,
  shellAvailable = true,
  disabled = false,
  disabledPlaceholder,
  shellControlState = null,
  draftPrompt,
  draftAttachments,
  skillsState = {
    status: "idle",
    data: null,
    error: null
  },
  mcpState = {
    status: "idle",
    data: null,
    error: null
  },
  hooksState = {
    status: "idle",
    data: null,
    error: null
  },
  goalState = {
    status: "idle",
    data: null,
    error: null
  },
  forkTurnOptionsState = {
    status: "idle",
    data: null,
    error: null
  },
  onDraftChange,
  onSubmit,
  onInterrupt,
  onCompact,
  onOpenSkills,
  onOpenMcp,
  onOpenHooks,
  onCreateHook,
  onUpdateHook,
  onTrustHook,
  onUntrustHook,
  onOpenGoal,
  onUpdateGoal,
  onOpenForkTurns,
  onForkLatest,
  onForkTurn,
  onReadProviderConfig,
  onWriteProviderConfig,
  onToggleFollow,
  onUpdateSettings,
  onToggleView,
  onShellCopy,
  onShellControl,
  canInterrupt = false
}) {
  const [internalDraft, setInternalDraft] = useState({
    prompt: "",
    attachments: []
  });
  const [openMenu, setOpenMenu] = useState(null);
  const [slashPanelView, setSlashPanelView] = useState("root");
  const [mcpPanelMode, setMcpPanelMode] = useState("list");
  const [hooksPanelMode, setHooksPanelMode] = useState("list");
  const [hookScope, setHookScope] = useState("project");
  const slashCapabilities = useMemo(
    () => ({
      fast: capabilities?.controls.performanceMode ?? false,
      compact: capabilities?.turns.compact ?? false,
      goal: capabilities?.controls.goals ?? false,
      fork: capabilities?.branching.fork ?? false,
      skills: capabilities?.management.skills ?? false,
      mcp: capabilities?.management.mcpStatus ?? false,
      hooks: capabilities?.management.hooks ?? false,
      hostConfigFiles: capabilities?.management.hostConfigFiles ?? false,
      mcpConfigEditing: mcpConfigFormat === "codex-toml" && Boolean(capabilities?.management.hostConfigFiles) && Boolean(onReadProviderConfig) && Boolean(onWriteProviderConfig),
      hookTrust: capabilities?.management.hookTrust ?? false,
      planMode: capabilities?.controls.planMode ?? false
    }),
    [
      capabilities,
      mcpConfigFormat,
      onReadProviderConfig,
      onWriteProviderConfig
    ]
  );
  const availableToolboxItems = useMemo(
    () => (toolboxItems ?? []).filter((item) => {
      switch (item.action) {
        case "fast":
          return slashCapabilities.fast;
        case "compact":
          return slashCapabilities.compact;
        case "goal":
          return slashCapabilities.goal;
        case "fork":
          return slashCapabilities.fork;
        case "skills":
          return slashCapabilities.skills;
        case "mcp":
          return slashCapabilities.mcp;
        case "hooks":
          return slashCapabilities.hooks;
        default:
          return false;
      }
    }),
    [slashCapabilities, toolboxItems]
  );
  const hookCommandTemplateByEvent = useMemo(() => {
    const templates = /* @__PURE__ */ new Map();
    for (const template of hookCommandTemplates ?? []) {
      templates.set(template.eventName, template.command);
    }
    return templates;
  }, [hookCommandTemplates]);
  const defaultHookCommand = useMemo(
    () => (eventName) => hookCommandTemplateByEvent.get(eventName) ?? hookCommandTemplateByEvent.get("preToolUse") ?? FALLBACK_HOOK_COMMAND,
    [hookCommandTemplateByEvent]
  );
  const defaultHookCommands = useMemo(
    () => /* @__PURE__ */ new Set([FALLBACK_HOOK_COMMAND, ...hookCommandTemplateByEvent.values()]),
    [hookCommandTemplateByEvent]
  );
  const [hookEventName, setHookEventName] = useState("preToolUse");
  const [hookMatcher, setHookMatcher] = useState("Bash");
  const [hookCommand, setHookCommand] = useState(FALLBACK_HOOK_COMMAND);
  const [hookTimeoutSec, setHookTimeoutSec] = useState("30");
  const [hookStatusMessage, setHookStatusMessage] = useState("Running hook");
  const [editingHookTarget, setEditingHookTarget] = useState(null);
  const [hookConfigBusy, setHookConfigBusy] = useState(false);
  const [hookConfigError, setHookConfigError] = useState(null);
  const [hookConfigSuccess, setHookConfigSuccess] = useState(
    null
  );
  const [mcpHttpName, setMcpHttpName] = useState("");
  const [mcpHttpUrl, setMcpHttpUrl] = useState("");
  const [mcpRawBlock, setMcpRawBlock] = useState("");
  const [mcpConfigPath, setMcpConfigPath] = useState(null);
  const [mcpConfigBusy, setMcpConfigBusy] = useState(false);
  const [mcpConfigError, setMcpConfigError] = useState(null);
  const [mcpConfigSuccess, setMcpConfigSuccess] = useState(null);
  const [copiedSkillName, setCopiedSkillName] = useState(null);
  const [forkBusy, setForkBusy] = useState(false);
  const [goalComposeMode, setGoalComposeMode] = useState(false);
  const [goalTokenBudget, setGoalTokenBudget] = useState("");
  const [goalBusy, setGoalBusy] = useState(false);
  const [goalLocalError, setGoalLocalError] = useState(null);
  const [optimisticCollaborationMode, setOptimisticCollaborationMode] = useState(null);
  const menuRef = useRef(null);
  const promptRef = useRef(null);
  const photoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const pendingSelectionRef = useRef(
    null
  );
  const pendingInsertedAttachmentIdsRef = useRef([]);
  const selectionSnapshotRef = useRef(
    null
  );
  const previewUrlCacheRef = useRef(/* @__PURE__ */ new Map());
  const renderedPreviewSignatureRef = useRef("");
  const renderedSanitizeNonceRef = useRef(0);
  const isShellView = activeView === "shell";
  const canToggleShellView = shellAvailable || isShellView;
  const isMobileShell = Boolean(
    isShellView && shellControlState?.isMobileShell
  );
  const shellPromptLabel = shellControlState?.promptLabel ?? null;
  const [attachmentPreviewUrls, setAttachmentPreviewUrls] = useState({});
  const [isDragTargetActive, setIsDragTargetActive] = useState(false);
  const [editorSanitizeNonce, setEditorSanitizeNonce] = useState(0);
  const isDraftControlled = !isShellView && draftPrompt !== void 0 && draftAttachments !== void 0 && typeof onDraftChange === "function";
  const prompt = isDraftControlled ? draftPrompt : internalDraft.prompt;
  const attachments = isDraftControlled ? draftAttachments : internalDraft.attachments;
  const displayedCollaborationMode = optimisticCollaborationMode ?? collaborationMode;
  useEffect(() => {
    setOptimisticCollaborationMode(null);
  }, [collaborationMode]);
  useEffect(() => {
    if (openMenu !== "slash") {
      setSlashPanelView("root");
      setMcpPanelMode("list");
      setMcpConfigError(null);
      setMcpConfigSuccess(null);
      setHooksPanelMode("list");
      setHookConfigError(null);
      setHookConfigSuccess(null);
    }
  }, [openMenu]);
  useEffect(() => {
    if (slashPanelView !== "mcp") {
      setMcpPanelMode("list");
      setMcpConfigError(null);
      setMcpConfigSuccess(null);
    }
  }, [slashPanelView]);
  useEffect(() => {
    if (slashPanelView !== "forkTurns") {
      setForkBusy(false);
    }
  }, [slashPanelView]);
  useEffect(() => {
    if (slashPanelView !== "hooks") {
      setHooksPanelMode("list");
      setHookConfigError(null);
      setHookConfigSuccess(null);
    }
  }, [slashPanelView]);
  useEffect(() => {
    const selected = HOOK_EVENT_OPTIONS.find(
      (entry) => entry.value === hookEventName
    );
    setHookMatcher((current) => {
      const trimmed = current.trim();
      const knownHints = new Set(
        HOOK_EVENT_OPTIONS.map((entry) => entry.matcherHint).filter(Boolean)
      );
      if (trimmed && !knownHints.has(trimmed)) {
        return current;
      }
      return selected?.matcherHint ?? "";
    });
    setHookCommand(
      (current) => defaultHookCommands.has(current.trim()) ? defaultHookCommand(hookEventName) : current
    );
  }, [
    defaultHookCommand,
    defaultHookCommands,
    hookEventName,
    hookCommandTemplateByEvent
  ]);
  useEffect(() => {
    if (!copiedSkillName) {
      return;
    }
    const timer = window.setTimeout(() => {
      setCopiedSkillName(
        (current) => current === copiedSkillName ? null : current
      );
    }, 1400);
    return () => {
      window.clearTimeout(timer);
    };
  }, [copiedSkillName]);
  function updateDraft(updater) {
    if (isDraftControlled) {
      onDraftChange?.(
        (current) => updater({
          prompt: current.prompt,
          attachments: current.attachments
        })
      );
      return;
    }
    setInternalDraft((current) => updater(current));
  }
  function setPrompt(next) {
    updateDraft((current) => {
      if (typeof next === "function") {
        const resolved = next(current.prompt, current.attachments);
        return {
          prompt: resolved.prompt,
          attachments: resolved.attachments ?? current.attachments
        };
      }
      return {
        prompt: next,
        attachments: current.attachments
      };
    });
  }
  async function handleCopySkillInvokeName(skillName) {
    try {
      await navigator.clipboard.writeText(`$${skillName}`);
      setCopiedSkillName(skillName);
    } catch {
      setCopiedSkillName(null);
    }
  }
  async function handleForkLatest() {
    if (!onForkLatest) {
      return;
    }
    setForkBusy(true);
    try {
      await onForkLatest();
      setOpenMenu(null);
    } finally {
      setForkBusy(false);
    }
  }
  async function handleForkTurn(turnId) {
    if (!onForkTurn) {
      return;
    }
    setForkBusy(true);
    try {
      await onForkTurn(turnId);
      setOpenMenu(null);
    } finally {
      setForkBusy(false);
    }
  }
  async function handleSetGoal() {
    const objective = prompt.trim();
    if (!objective) {
      setGoalLocalError("Goal objective cannot be empty.");
      return;
    }
    const normalizedBudget = goalTokenBudget.trim();
    const tokenBudget = parseGoalTokenBudgetThousands(normalizedBudget);
    if (normalizedBudget.length > 0 && (tokenBudget === null || !Number.isInteger(tokenBudget) || tokenBudget <= 0)) {
      setGoalLocalError("Token budget must be a positive number in thousands.");
      return;
    }
    if (!onUpdateGoal) {
      setGoalLocalError("/goal is unavailable in this view.");
      return;
    }
    setGoalBusy(true);
    setGoalLocalError(null);
    try {
      await onUpdateGoal({
        objective,
        status: "active",
        tokenBudget
      });
      setGoalTokenBudget("");
      setGoalComposeMode(false);
      updateDraft(() => ({
        prompt: "",
        attachments: []
      }));
    } catch (error2) {
      setGoalLocalError(
        error2 instanceof Error ? error2.message : "Unable to set goal."
      );
    } finally {
      setGoalBusy(false);
    }
  }
  function enterGoalComposeMode() {
    setOpenMenu(null);
    setSlashPanelView("root");
    setGoalComposeMode(true);
    setGoalTokenBudget(
      formatGoalTokenBudgetThousands(goalState.data?.tokenBudget)
    );
    setGoalLocalError(null);
    void onOpenGoal?.();
    requestAnimationFrame(() => {
      promptRef.current?.focus();
    });
  }
  function exitGoalComposeMode() {
    setGoalComposeMode(false);
    setGoalLocalError(null);
  }
  const currentModel = useMemo(
    () => modelOptions.find((entry) => entry.model === model) ?? null,
    [model, modelOptions]
  );
  const modelContextTitle = formatModelContextTitle(model, contextUsage);
  const supportedEfforts = currentModel?.supportedReasoningEfforts ?? [];
  const promptSegments = useMemo(
    () => tokenizePrompt(prompt, attachments),
    [attachments, prompt]
  );
  const previewSignature = useMemo(
    () => Object.entries(attachmentPreviewUrls).sort(([leftId], [rightId]) => leftId.localeCompare(rightId)).map(([clientId, previewUrl]) => `${clientId}:${previewUrl}`).join("|"),
    [attachmentPreviewUrls]
  );
  async function loadProviderConfig() {
    if (!slashCapabilities.hostConfigFiles || !onReadProviderConfig) {
      throw new Error(
        "Provider config editing is unavailable for this thread."
      );
    }
    const file = await onReadProviderConfig();
    setMcpConfigPath(file.path);
    return file;
  }
  async function writeMcpConfig(nextContent) {
    if (!slashCapabilities.hostConfigFiles || !onWriteProviderConfig) {
      throw new Error(
        "Provider config editing is unavailable for this thread."
      );
    }
    const updated = await onWriteProviderConfig(nextContent);
    setMcpConfigPath(updated.path);
    return updated;
  }
  function toolboxItemStatus(item) {
    switch (item.action) {
      case "fast":
        return fastMode ? "On" : "Off";
      case "compact":
        return compactBusy ? "Busy" : "Run";
      case "goal":
        return goalComposeMode ? "Composing" : goalState.data ? goalStatusLabel(goalState.data.status) : "Open";
      case "fork":
        return busy ? "Idle only" : "Open";
      case "skills":
      case "mcp":
      case "hooks":
        return "View";
      default:
        return "";
    }
  }
  function toolboxItemDisabled(item) {
    switch (item.action) {
      case "fast":
        return settingsBusy;
      case "compact":
        return compactBusy || busy;
      case "fork":
        return busy || forkBusy;
      default:
        return false;
    }
  }
  function toolboxItemClassName(item) {
    const active = item.action === "fast" && fastMode || item.action === "goal" && (goalComposeMode || goalState.data?.status === "active");
    return `${active ? "ui-status-warning" : "thread-composer-menu-item"} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`;
  }
  function handleToolboxItemClick(item, event) {
    event.stopPropagation();
    switch (item.action) {
      case "fast":
        void handleUpdateSettings({
          fastMode: !fastMode
        });
        break;
      case "compact":
        setOpenMenu(null);
        void onCompact?.();
        break;
      case "goal":
        if (goalComposeMode) {
          exitGoalComposeMode();
          setOpenMenu(null);
        } else {
          enterGoalComposeMode();
        }
        break;
      case "fork":
        setSlashPanelView("fork");
        break;
      case "skills":
        setSlashPanelView("skills");
        void onOpenSkills?.();
        break;
      case "mcp":
        setSlashPanelView("mcp");
        void onOpenMcp?.();
        break;
      case "hooks":
        setSlashPanelView("hooks");
        void onOpenHooks?.();
        break;
      default:
        break;
    }
  }
  function resetHookForm() {
    setEditingHookTarget(null);
    setHookScope("project");
    setHookEventName("preToolUse");
    setHookMatcher("Bash");
    setHookCommand(defaultHookCommand("preToolUse"));
    setHookTimeoutSec("30");
    setHookStatusMessage("Running hook");
  }
  function startEditingHook(hook) {
    const target = editableHookTarget(hook);
    if (!target) {
      setHookConfigError(
        "Only command hooks in global or project hooks.json can be edited here."
      );
      return;
    }
    setEditingHookTarget(target);
    setHookScope(target.scope);
    setHookEventName(target.eventName);
    setHookMatcher(target.matcher ?? "");
    setHookCommand(target.command);
    setHookTimeoutSec(target.timeoutSec ? String(target.timeoutSec) : "");
    setHookStatusMessage(target.statusMessage ?? "");
    setHookConfigError(null);
    setHookConfigSuccess(null);
    setHooksPanelMode("edit");
  }
  async function handleSaveHttpMcp() {
    const name = parseMcpServerName(mcpHttpName);
    const url = mcpHttpUrl.trim();
    if (!name) {
      setMcpConfigError(
        "MCP name must use only letters, numbers, underscore, or hyphen."
      );
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      setMcpConfigError("HTTP MCP URL must start with http:// or https://");
      return;
    }
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
    try {
      const file = await loadProviderConfig();
      const nextContent = upsertMcpServerBlock(
        file.content,
        name,
        renderHttpMcpBlock(name, url)
      );
      await writeMcpConfig(nextContent);
      setMcpConfigSuccess(
        "MCP entry written to provider config. Restart the backend if it does not appear immediately."
      );
      setMcpPanelMode("list");
      setMcpHttpName("");
      setMcpHttpUrl("");
      void onOpenMcp?.();
    } catch (error2) {
      setMcpConfigError(
        error2 instanceof Error ? error2.message : "Unable to update provider config."
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }
  async function handlePrepareRawMcpBlock() {
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
    try {
      await loadProviderConfig();
      if (!mcpRawBlock.trim()) {
        setMcpRawBlock(
          '[mcp_servers.example_stdio]\ncommand = "npx"\nargs = ["-y", "your-mcp-server"]\n'
        );
      }
      setMcpPanelMode("stdio");
    } catch (error2) {
      setMcpConfigError(
        error2 instanceof Error ? error2.message : "Unable to load provider config."
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }
  async function handleSaveRawMcpBlock() {
    const serverName = parseMcpServerNameFromBlock(mcpRawBlock);
    if (!serverName) {
      setMcpConfigError(
        "The raw MCP block must start with a header like [mcp_servers.name]."
      );
      return;
    }
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
    try {
      const file = await loadProviderConfig();
      const nextContent = upsertMcpServerBlock(
        file.content,
        serverName,
        mcpRawBlock
      );
      await writeMcpConfig(nextContent);
      setMcpConfigSuccess(
        "MCP entry written to provider config. Restart the backend if it does not appear immediately."
      );
      setMcpPanelMode("list");
      void onOpenMcp?.();
    } catch (error2) {
      setMcpConfigError(
        error2 instanceof Error ? error2.message : "Unable to update provider config."
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }
  async function handleSaveHook() {
    if (hooksPanelMode === "edit" && !onUpdateHook) {
      setHookConfigError("Hook editing is unavailable in this view.");
      return;
    }
    if (hooksPanelMode !== "edit" && !onCreateHook) {
      setHookConfigError("Hook editing is unavailable in this view.");
      return;
    }
    if (hooksPanelMode === "edit" && !editingHookTarget) {
      setHookConfigError("Select a hook to edit first.");
      return;
    }
    const command = hookCommand.trim();
    if (!command) {
      setHookConfigError("Hook command cannot be empty.");
      return;
    }
    const normalizedTimeout = hookTimeoutSec.trim();
    const timeoutSec = normalizedTimeout ? Number(normalizedTimeout) : null;
    if (normalizedTimeout && (timeoutSec === null || !Number.isInteger(timeoutSec) || timeoutSec <= 0)) {
      setHookConfigError("Timeout must be a positive number of seconds.");
      return;
    }
    setHookConfigBusy(true);
    setHookConfigError(null);
    setHookConfigSuccess(null);
    try {
      const payload = {
        scope: hookScope,
        eventName: hookEventName,
        matcher: hookMatcher.trim() || null,
        command,
        timeoutSec,
        statusMessage: hookStatusMessage.trim() || null
      };
      if (hooksPanelMode === "edit") {
        await onUpdateHook?.({
          ...payload,
          target: editingHookTarget
        });
      } else {
        await onCreateHook?.(payload);
      }
      setHookConfigSuccess(
        `${hookScope === "project" ? "Project" : "Global"} hook ${hooksPanelMode === "edit" ? "updated" : "written"} in hooks.json and trusted.`
      );
      setHooksPanelMode("list");
      setEditingHookTarget(null);
    } catch (error2) {
      setHookConfigError(
        error2 instanceof Error ? error2.message : "Unable to write hooks.json."
      );
    } finally {
      setHookConfigBusy(false);
    }
  }
  async function handleTrustHook(hook) {
    if (!onTrustHook || !hook.currentHash) {
      setHookConfigError("Hook trust is unavailable in this view.");
      return;
    }
    setHookConfigBusy(true);
    setHookConfigError(null);
    setHookConfigSuccess(null);
    try {
      await onTrustHook({
        key: hook.key,
        currentHash: hook.currentHash
      });
      setHookConfigSuccess("Hook trusted.");
    } catch (error2) {
      setHookConfigError(
        error2 instanceof Error ? error2.message : "Unable to trust hook."
      );
    } finally {
      setHookConfigBusy(false);
    }
  }
  async function handleUntrustHook(hook) {
    if (!onUntrustHook) {
      setHookConfigError("Hook trust is unavailable in this view.");
      return;
    }
    setHookConfigBusy(true);
    setHookConfigError(null);
    setHookConfigSuccess(null);
    try {
      await onUntrustHook({
        key: hook.key
      });
      setHookConfigSuccess("Hook untrusted.");
    } catch (error2) {
      setHookConfigError(
        error2 instanceof Error ? error2.message : "Unable to untrust hook."
      );
    } finally {
      setHookConfigBusy(false);
    }
  }
  useEffect(() => {
    if (isShellView) {
      setAttachmentPreviewUrls({});
      return;
    }
    const nextPreviewUrls = {};
    const activeClientIds = /* @__PURE__ */ new Set();
    for (const attachment of attachments) {
      if (attachment.kind !== "photo") {
        continue;
      }
      activeClientIds.add(attachment.clientId);
      let previewUrl = previewUrlCacheRef.current.get(attachment.clientId);
      if (!previewUrl) {
        previewUrl = URL.createObjectURL(attachment.file);
        previewUrlCacheRef.current.set(attachment.clientId, previewUrl);
      }
      nextPreviewUrls[attachment.clientId] = previewUrl;
    }
    for (const [clientId, previewUrl] of previewUrlCacheRef.current.entries()) {
      if (activeClientIds.has(clientId)) {
        continue;
      }
      URL.revokeObjectURL(previewUrl);
      previewUrlCacheRef.current.delete(clientId);
    }
    setAttachmentPreviewUrls(nextPreviewUrls);
  }, [attachments, isShellView]);
  useEffect(() => {
    const previewUrlCache = previewUrlCacheRef.current;
    return () => {
      for (const previewUrl of previewUrlCache.values()) {
        URL.revokeObjectURL(previewUrl);
      }
      previewUrlCache.clear();
    };
  }, []);
  function snapshotSelection() {
    const editor = promptRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) {
      return null;
    }
    const range = selection.getRangeAt(0);
    if (!editor.contains(range.startContainer) || !editor.contains(range.endContainer)) {
      return null;
    }
    return {
      start: measureSelectionOffset(
        editor,
        range.startContainer,
        range.startOffset
      ),
      end: measureSelectionOffset(editor, range.endContainer, range.endOffset)
    };
  }
  function measureSelectionOffset(root, container, offset) {
    let resolvedChild = null;
    let offsetWithinChild = offset;
    if (container === root) {
      const childNodes2 = Array.from(root.childNodes);
      let total2 = 0;
      for (let index = 0; index < Math.min(offset, childNodes2.length); index += 1) {
        const child = childNodes2[index];
        if (child) {
          total2 += segmentNodeText(child).length;
        }
      }
      return total2;
    }
    if (container.nodeType === Node.TEXT_NODE) {
      resolvedChild = container;
    } else {
      const nearestChild = Array.from(root.childNodes).find(
        (child) => child.contains(container)
      );
      if (!nearestChild) {
        return serializeEditorPrompt().length;
      }
      resolvedChild = nearestChild;
      if (nearestChild instanceof HTMLElement && nearestChild.dataset.segmentType === "attachment") {
        const range = document.createRange();
        range.selectNodeContents(nearestChild);
        const placeholderLength = segmentNodeText(nearestChild).length;
        try {
          range.setEnd(container, offset);
          const visibleOffset = range.toString().length;
          const attachmentTextLength = nearestChild.textContent?.length ?? 0;
          if (attachmentTextLength === 0) {
            offsetWithinChild = placeholderLength;
          } else {
            offsetWithinChild = Math.round(
              Math.min(1, visibleOffset / attachmentTextLength) * placeholderLength
            );
          }
        } catch {
          offsetWithinChild = placeholderLength;
        }
      } else {
        const range = document.createRange();
        range.selectNodeContents(nearestChild);
        try {
          range.setEnd(container, offset);
          offsetWithinChild = range.toString().length;
        } catch {
          offsetWithinChild = segmentNodeText(nearestChild).length;
        }
      }
    }
    const childNodes = Array.from(root.childNodes);
    let total = 0;
    for (const child of childNodes) {
      if (child === resolvedChild) {
        if (child.nodeType === Node.TEXT_NODE) {
          return total + offsetWithinChild;
        }
        return total + Math.min(offsetWithinChild, segmentNodeText(child).length);
      }
      total += segmentNodeText(child).length;
    }
    return total;
  }
  function resolveOffsetToDomPosition(root, targetOffset) {
    let remaining = Math.max(0, targetOffset);
    const childNodes = Array.from(root.childNodes);
    for (const [index, child] of childNodes.entries()) {
      const childText = segmentNodeText(child);
      const childLength = childText.length;
      if (child.nodeType === Node.TEXT_NODE) {
        if (remaining <= childLength) {
          return {
            node: child,
            offset: remaining
          };
        }
        remaining -= childLength;
        continue;
      }
      if (child instanceof HTMLElement && child.dataset.segmentType === "attachment") {
        if (remaining === 0) {
          return {
            node: root,
            offset: index
          };
        }
        if (remaining <= childLength) {
          const nextChild = childNodes[index + 1];
          if (remaining === childLength && nextChild?.nodeType === Node.TEXT_NODE) {
            return {
              node: nextChild,
              offset: 0
            };
          }
          return {
            node: root,
            offset: index + 1
          };
        }
        remaining -= childLength;
        continue;
      }
      if (remaining <= childLength) {
        return {
          node: root,
          offset: index + 1
        };
      }
      remaining -= childLength;
    }
    return {
      node: root,
      offset: root.childNodes.length
    };
  }
  const restoreSelection = useCallback(
    (selection) => {
      const editor = promptRef.current;
      if (!editor || !selection) {
        return;
      }
      const startPosition = resolveOffsetToDomPosition(editor, selection.start);
      const endPosition = resolveOffsetToDomPosition(editor, selection.end);
      const range = document.createRange();
      range.setStart(startPosition.node, startPosition.offset);
      range.setEnd(endPosition.node, endPosition.offset);
      const currentSelection = window.getSelection();
      currentSelection?.removeAllRanges();
      currentSelection?.addRange(range);
    },
    []
  );
  function restoreSelectionAfterInsertedAttachments(editor) {
    const insertedClientIds = pendingInsertedAttachmentIdsRef.current;
    if (insertedClientIds.length === 0) {
      return false;
    }
    const lastInsertedClientId = insertedClientIds.at(-1);
    if (!lastInsertedClientId) {
      return false;
    }
    const attachmentNode = Array.from(editor.childNodes).find(
      (child) => child instanceof HTMLElement && child.dataset.segmentType === "attachment" && child.dataset.clientId === lastInsertedClientId
    );
    if (!(attachmentNode instanceof HTMLElement)) {
      return false;
    }
    const range = document.createRange();
    const trailingNode = attachmentNode.nextSibling;
    if (trailingNode?.nodeType === Node.TEXT_NODE) {
      range.setStart(trailingNode, 0);
    } else {
      range.setStartAfter(attachmentNode);
    }
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return true;
  }
  const serializeEditorPrompt = useCallback(() => {
    const editor = promptRef.current;
    if (!editor) {
      return prompt;
    }
    let nextPrompt = "";
    for (const child of Array.from(editor.childNodes)) {
      nextPrompt += segmentNodeText(child);
    }
    return normalizePromptText(nextPrompt);
  }, [prompt]);
  function buildAttachmentPlaceholder(kind, name, usedPlaceholders) {
    const token = kind === "photo" ? "PHOTO" : "FILE";
    let suffix = 0;
    while (true) {
      const label = suffix === 0 ? name : `${name} (${suffix + 1})`;
      const placeholder = `[${token} ${label}]`;
      if (!usedPlaceholders.has(placeholder)) {
        return placeholder;
      }
      suffix += 1;
    }
  }
  function buildClientId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `attachment-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
  function buildAttachmentInsertionText(basePrompt, insertionPoint, placeholders) {
    const beforeChar = insertionPoint.start > 0 ? basePrompt[insertionPoint.start - 1] : "";
    const afterChar = insertionPoint.end < basePrompt.length ? basePrompt[insertionPoint.end] : "";
    const needsLeadingSpace = Boolean(beforeChar && !/\s/.test(beforeChar));
    const needsTrailingSpace = !afterChar || !/\s/.test(afterChar);
    return `${needsLeadingSpace ? " " : ""}${placeholders.join(" ")}${needsTrailingSpace ? " " : ""}`;
  }
  function appendAttachments(files, kind) {
    if (!files || files.length === 0) {
      return;
    }
    const nextFiles = Array.from(files);
    const usedPlaceholders = new Set(
      attachments.map((entry) => entry.placeholder)
    );
    const nextAttachments = nextFiles.map((file) => {
      const originalName = normalizedAttachmentFileName(file, kind);
      const placeholder = buildAttachmentPlaceholder(
        kind,
        normalizeAttachmentLabel(originalName),
        usedPlaceholders
      );
      usedPlaceholders.add(placeholder);
      return {
        clientId: buildClientId(),
        kind,
        originalName,
        placeholder,
        file
      };
    });
    const selection = snapshotSelection() ?? selectionSnapshotRef.current;
    const insertionPoint = selection ? {
      start: selection.start,
      end: selection.end
    } : {
      start: prompt.length,
      end: prompt.length
    };
    const insertionText = buildAttachmentInsertionText(
      prompt,
      insertionPoint,
      nextAttachments.map((entry) => entry.placeholder)
    );
    const nextPrompt = `${prompt.slice(0, insertionPoint.start)}${insertionText}${prompt.slice(
      insertionPoint.end
    )}`;
    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: [...current.attachments, ...nextAttachments]
    }));
    const trailingSpacerOffset = insertionText.endsWith(" ") ? 1 : 0;
    const nextCaret = insertionPoint.start + insertionText.length - trailingSpacerOffset;
    pendingSelectionRef.current = {
      start: nextCaret,
      end: nextCaret
    };
    selectionSnapshotRef.current = {
      start: nextCaret,
      end: nextCaret
    };
    pendingInsertedAttachmentIdsRef.current = nextAttachments.map(
      (attachment) => attachment.clientId
    );
    setOpenMenu(null);
  }
  function appendDroppedAttachments(files) {
    if (files.length === 0) {
      return;
    }
    const groupedFiles = {
      photo: files.filter((file) => classifyAttachmentKind(file) === "photo"),
      file: files.filter((file) => classifyAttachmentKind(file) === "file")
    };
    const nextFiles = [...groupedFiles.photo, ...groupedFiles.file];
    const usedPlaceholders = new Set(
      attachments.map((entry) => entry.placeholder)
    );
    const nextAttachments = nextFiles.map((file) => {
      const kind = classifyAttachmentKind(file);
      const originalName = normalizedAttachmentFileName(file, kind);
      const placeholder = buildAttachmentPlaceholder(
        kind,
        normalizeAttachmentLabel(originalName),
        usedPlaceholders
      );
      usedPlaceholders.add(placeholder);
      return {
        clientId: buildClientId(),
        kind,
        originalName,
        placeholder,
        file
      };
    });
    const selection = snapshotSelection() ?? selectionSnapshotRef.current;
    const insertionPoint = selection ? { start: selection.start, end: selection.end } : { start: prompt.length, end: prompt.length };
    const insertionText = buildAttachmentInsertionText(
      prompt,
      insertionPoint,
      nextAttachments.map((entry) => entry.placeholder)
    );
    const nextPrompt = `${prompt.slice(0, insertionPoint.start)}${insertionText}${prompt.slice(
      insertionPoint.end
    )}`;
    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: [...current.attachments, ...nextAttachments]
    }));
    const trailingSpacerOffset = insertionText.endsWith(" ") ? 1 : 0;
    const nextCaret = insertionPoint.start + insertionText.length - trailingSpacerOffset;
    pendingSelectionRef.current = { start: nextCaret, end: nextCaret };
    selectionSnapshotRef.current = { start: nextCaret, end: nextCaret };
    pendingInsertedAttachmentIdsRef.current = nextAttachments.map(
      (attachment) => attachment.clientId
    );
    setOpenMenu(null);
  }
  function insertPlainTextIntoPrompt(text) {
    if (!text) {
      return;
    }
    const selection = snapshotSelection() ?? selectionSnapshotRef.current;
    const start = selection?.start ?? prompt.length;
    const end = selection?.end ?? start;
    const normalizedText = normalizePromptText(text);
    const nextPrompt = `${prompt.slice(0, start)}${normalizedText}${prompt.slice(end)}`;
    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: current.attachments
    }));
    const nextCaret = start + normalizedText.length;
    pendingSelectionRef.current = {
      start: nextCaret,
      end: nextCaret
    };
    selectionSnapshotRef.current = {
      start: nextCaret,
      end: nextCaret
    };
  }
  useEffect(() => {
    function handleWindowPointerDown(event) {
      const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [];
      const clickedInsideInteractiveMenu = eventPath.some(
        (node) => node instanceof HTMLElement && (node.dataset.composerMenuSurface === "true" || node.dataset.composerMenuTrigger === "true")
      );
      if (clickedInsideInteractiveMenu) {
        return;
      }
      if (openMenu) {
        setOpenMenu(null);
      }
    }
    if (openMenu) {
      window.addEventListener("pointerdown", handleWindowPointerDown);
      return () => {
        window.removeEventListener("pointerdown", handleWindowPointerDown);
      };
    }
  }, [openMenu]);
  useLayoutEffect(() => {
    const editor = promptRef.current;
    if (!editor || isShellView) {
      return;
    }
    const pendingSelection = pendingSelectionRef.current;
    const shouldSyncDom = serializeEditorPrompt() !== prompt || renderedPreviewSignatureRef.current !== previewSignature || renderedSanitizeNonceRef.current !== editorSanitizeNonce;
    if (shouldSyncDom) {
      const fragment = document.createDocumentFragment();
      for (const segment of promptSegments) {
        if (segment.type === "text") {
          fragment.append(
            document.createTextNode(
              segment.text === " " ? "\xA0" : segment.text
            )
          );
          continue;
        }
        const attachment = segment.attachment;
        const token = document.createElement("span");
        token.dataset.segmentType = "attachment";
        token.dataset.clientId = attachment.clientId;
        token.dataset.placeholder = attachment.placeholder;
        token.contentEditable = "false";
        token.className = "mx-[0.12rem] inline-flex max-w-full align-baseline";
        if (attachment.kind === "photo") {
          token.classList.add(
            "rounded-[0.95rem]",
            "border",
            "border-sky-300/35",
            "bg-sky-300/10",
            "p-1",
            "shadow-sm",
            "shadow-stone-950/20"
          );
          const previewUrl = attachmentPreviewUrls[attachment.clientId];
          if (previewUrl) {
            const image = document.createElement("img");
            image.src = previewUrl;
            image.alt = attachment.originalName || "Pasted image";
            image.className = "h-[4.5rem] w-[6rem] rounded-[0.7rem] bg-stone-950 object-contain";
            image.draggable = false;
            token.append(image);
          } else {
            const imagePlaceholder = document.createElement("span");
            imagePlaceholder.className = "inline-block h-[4.5rem] w-[6rem] rounded-[0.7rem] bg-stone-900/80";
            imagePlaceholder.setAttribute("aria-hidden", "true");
            token.append(imagePlaceholder);
          }
          const caption = document.createElement("span");
          caption.className = "ml-2 inline-flex max-w-[8rem] items-center text-[10px] font-medium tracking-[0.08em] text-sky-50";
          caption.textContent = attachmentDisplayLabel(attachment);
          token.append(caption);
        } else {
          token.classList.add(
            "items-center",
            "gap-2",
            "rounded-[0.95rem]",
            "border",
            "border-emerald-300/35",
            "bg-emerald-300/10",
            "px-2.5",
            "py-2",
            "text-[10px]",
            "font-medium",
            "tracking-[0.08em]",
            "text-emerald-50",
            "shadow-sm",
            "shadow-stone-950/20"
          );
          const icon = document.createElement("span");
          icon.className = "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200/25 bg-emerald-300/12 text-[9px]";
          icon.textContent = "FILE";
          const label = document.createElement("span");
          label.className = "inline-flex max-w-[10rem] truncate";
          label.textContent = attachmentDisplayLabel(attachment);
          token.append(icon, label);
        }
        fragment.append(token);
      }
      editor.replaceChildren(fragment);
      renderedPreviewSignatureRef.current = previewSignature;
      renderedSanitizeNonceRef.current = editorSanitizeNonce;
    }
    if (pendingSelection !== null) {
      editor.focus();
      if (!restoreSelectionAfterInsertedAttachments(editor)) {
        restoreSelection(pendingSelection);
      }
      selectionSnapshotRef.current = pendingSelection;
    } else if (document.activeElement === editor && shouldSyncDom) {
      restoreSelection(selectionSnapshotRef.current);
    }
    pendingSelectionRef.current = null;
    pendingInsertedAttachmentIdsRef.current = [];
  }, [
    attachmentPreviewUrls,
    editorSanitizeNonce,
    isShellView,
    previewSignature,
    prompt,
    promptSegments,
    restoreSelection,
    serializeEditorPrompt
  ]);
  function dismissPromptFocus() {
    promptRef.current?.blur();
    if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  }
  async function pasteClipboardIntoPrompt() {
    dismissPromptFocus();
    setOpenMenu(null);
    if (!navigator.clipboard?.readText) {
      return;
    }
    try {
      const clipboardText = await navigator.clipboard.readText();
      insertPlainTextIntoPrompt(clipboardText);
    } catch {
      return;
    }
  }
  async function submitPrompt() {
    if (goalComposeMode && !isShellView) {
      await handleSetGoal();
      return;
    }
    if (!isShellView && !prompt.trim()) {
      return;
    }
    const normalizedPrompt = isShellView ? prompt : prompt.trim();
    const activeAttachments = isShellView ? [] : attachments.filter(
      (attachment) => normalizedPrompt.includes(attachment.placeholder)
    );
    const submitted = await onSubmit(
      activeAttachments.length > 0 ? { prompt: normalizedPrompt, attachments: activeAttachments } : { prompt: normalizedPrompt }
    );
    if (submitted === false) {
      return;
    }
    updateDraft(() => ({
      prompt: "",
      attachments: []
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await submitPrompt();
  }
  function handlePromptInput() {
    const nextPrompt = serializeEditorPrompt();
    const nextSelection = snapshotSelection();
    selectionSnapshotRef.current = nextSelection;
    const editor = promptRef.current;
    const needsPlainTextDomSync = editor ? editorContainsStyledRichText(editor) : false;
    if (needsPlainTextDomSync) {
      pendingSelectionRef.current = nextSelection;
      setEditorSanitizeNonce((current) => current + 1);
    }
    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: current.attachments.filter(
        (attachment) => nextPrompt.includes(attachment.placeholder)
      )
    }));
  }
  function handlePromptPaste(event) {
    const files = extractFilesFromTransfer(
      event.clipboardData?.items,
      event.clipboardData?.files
    );
    if (files.length === 0) {
      const plainText = event.clipboardData?.getData("text/plain") ?? "";
      const htmlText = event.clipboardData?.getData("text/html") ?? "";
      const clipboardText = plainText || textFromClipboardHtml(htmlText);
      if (!clipboardText && !htmlText) {
        return;
      }
      event.preventDefault();
      insertPlainTextIntoPrompt(clipboardText);
      return;
    }
    event.preventDefault();
    appendDroppedAttachments(files);
  }
  function handlePromptDragEnter(event) {
    if (!hasTransferFiles(event.dataTransfer?.items, event.dataTransfer?.files)) {
      return;
    }
    event.preventDefault();
    setIsDragTargetActive(true);
  }
  function handlePromptDragOver(event) {
    if (!hasTransferFiles(event.dataTransfer?.items, event.dataTransfer?.files)) {
      return;
    }
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
    setIsDragTargetActive(true);
  }
  function handlePromptDragLeave(event) {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setIsDragTargetActive(false);
  }
  function handlePromptDrop(event) {
    const files = extractFilesFromTransfer(
      event.dataTransfer?.items,
      event.dataTransfer?.files
    );
    if (files.length === 0) {
      return;
    }
    event.preventDefault();
    setIsDragTargetActive(false);
    appendDroppedAttachments(files);
  }
  function handlePromptKeyDown(event) {
    if (event.key !== "Enter") {
      return;
    }
    if (!event.metaKey && !event.ctrlKey) {
      return;
    }
    event.preventDefault();
    if (busy || disabled) {
      return;
    }
    void submitPrompt();
  }
  async function handleUpdateSettings(input) {
    const previousOptimisticMode = optimisticCollaborationMode;
    if (input.collaborationMode) {
      setOptimisticCollaborationMode(input.collaborationMode);
    }
    try {
      await onUpdateSettings?.(input);
      setOpenMenu(null);
    } catch (error2) {
      if (input.collaborationMode) {
        setOptimisticCollaborationMode(previousOptimisticMode);
      }
      throw error2;
    }
  }
  const promptPlaceholder = goalComposeMode ? "Describe the goal the backend should continue working toward..." : disabledPlaceholder ?? (isShellView ? "Send shell input to the attached terminal..." : "Ask the backend to inspect, modify, or explain code...");
  const interruptLabel = isShellView ? "Send Ctrl-C" : "Stop Current Turn";
  const sendButtonLabel = goalComposeMode ? goalBusy ? "Setting..." : "Set goal" : !threadConnected && busy ? "Connecting..." : !threadConnected ? "Send" : busy && !isShellView ? "Sending..." : "Send";
  const sendButtonClassName = !threadConnected ? "ui-action-danger" : goalComposeMode ? "ui-action-info" : "ui-action-primary";
  const modelControlsDisabled = settingsBusy;
  const effortControlsDisabled = modelControlsDisabled || supportedEfforts.length === 0;
  const effortControlTitle = fastMode ? "Fast mode is on. Turn it off from the slash toolbox to edit reasoning." : supportedEfforts.length === 0 ? "The selected model does not expose adjustable reasoning effort." : "Select reasoning effort";
  const composerLayerClassName = openMenu ? "relative z-[80] shrink-0" : "relative z-20 shrink-0";
  const formClassName = edgeToEdgeMobile || isMobileShell ? "relative z-20 shrink-0 bg-transparent px-3 pb-3 pt-2 sm:p-4" : "relative z-20 shrink-0 bg-transparent px-3 pb-3 pt-0 sm:px-4 sm:pb-4 sm:pt-0";
  const promptInputClassName = `thread-composer-input min-h-[5.75rem] w-full rounded-[1.25rem] border px-4 pr-14 pt-2.5 outline-none transition sm:min-h-[5.5rem] ${isDragTargetActive ? "is-drag-target border-sky-300/80 bg-sky-300/[0.08] shadow-[0_0_0_1px_rgba(125,211,252,0.2)]" : "border-stone-700 focus-within:border-[var(--theme-accent-border)]"}`;
  return /* @__PURE__ */ jsxs("div", { className: composerLayerClassName, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: photoInputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        tabIndex: -1,
        className: "sr-only",
        onChange: (event) => {
          appendAttachments(event.target.files, "photo");
          event.target.value = "";
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        tabIndex: -1,
        className: "sr-only",
        onChange: (event) => {
          appendAttachments(event.target.files, "file");
          event.target.value = "";
        }
      }
    ),
    activeView === "chat" && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Jump to latest",
        title: followTail ? "Latest turn is in view" : "Jump to the latest messages",
        onClick: () => onToggleFollow?.(),
        className: "absolute left-1/2 top-3 z-40 inline-flex h-9 min-w-[5.75rem] -translate-x-1/2 -translate-y-[62%] items-start justify-center bg-transparent pt-1 touch-manipulation sm:top-4",
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `thread-jump-latest-badge pointer-events-none inline-flex h-4 min-w-[3.75rem] items-center justify-center rounded-[0.7rem] border shadow-sm transition ${followTail ? "is-active border-sky-300/36 bg-sky-300/[0.03] text-sky-100/86" : "border-stone-500/70 bg-stone-950/[0.08] text-stone-200/86"}`,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                "aria-hidden": "true",
                viewBox: "0 0 16 16",
                className: "h-3.5 w-3.5 fill-none stroke-current",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: /* @__PURE__ */ jsx("path", { d: "m4 6 4 4 4-4" })
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("form", { ref: menuRef, onSubmit: handleSubmit, className: formClassName, children: [
      /* @__PURE__ */ jsxs("div", { className: "thread-composer-toolbar relative z-30 mb-0 flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs shadow-lg shadow-stone-950/8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          !isShellView && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-composer-menu-trigger": "true",
                "aria-label": "Open slash toolbox",
                title: "Open slash toolbox",
                onClick: () => setOpenMenu(
                  (current) => current === "slash" ? null : "slash"
                ),
                className: "thread-composer-icon-button inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-700 bg-stone-900/92 text-stone-200 transition hover:bg-stone-800",
                children: /* @__PURE__ */ jsx(SlashIcon, {})
              }
            ),
            openMenu === "slash" && /* @__PURE__ */ jsx(
              "div",
              {
                "data-composer-menu-surface": "true",
                className: "thread-composer-menu absolute bottom-full left-0 z-40 mb-2 w-72 overflow-hidden rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20 backdrop-blur-xl",
                onClick: (event) => {
                  event.stopPropagation();
                },
                onMouseDown: (event) => {
                  event.stopPropagation();
                },
                onPointerDown: (event) => {
                  event.stopPropagation();
                },
                onTouchStart: (event) => {
                  event.stopPropagation();
                },
                children: slashPanelView === "root" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  availableToolboxItems.map((item, index) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: toolboxItemDisabled(item),
                      onClick: (event) => handleToolboxItemClick(item, event),
                      className: `${toolboxItemClassName(item)} ${index === 0 ? "mt-0" : ""}`,
                      title: item.description ?? item.label,
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx("span", { children: item.command }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: toolboxItemStatus(item) })
                      ] })
                    },
                    `${item.action}:${item.command}`
                  )),
                  availableToolboxItems.length === 0 ? /* @__PURE__ */ jsx("p", { className: "px-3 py-2 text-sm text-stone-400", children: "No backend tools are available for this thread." }) : null
                ] }) : /* @__PURE__ */ jsx("div", { className: "max-h-80 overflow-auto", children: slashPanelView === "fork" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: busy || forkBusy,
                      onClick: () => void handleForkLatest(),
                      className: "thread-composer-menu-item block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx("span", { children: "Fork from latest" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: forkBusy ? "Forking" : "Run" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: busy || forkBusy,
                      onClick: (event) => {
                        event.stopPropagation();
                        setSlashPanelView("forkTurns");
                        void onOpenForkTurns?.();
                      },
                      className: "thread-composer-menu-item mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx("span", { children: "Fork from selected turn" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: "Pick" })
                      ] })
                    }
                  ),
                  busy ? /* @__PURE__ */ jsx("p", { className: "mt-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Fork is only available while the thread is idle." }) : null
                ] }) : slashPanelView === "forkTurns" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  forkTurnOptionsState.status === "loading" && !forkTurnOptionsState.data ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading turns\u2026" }) : null,
                  forkTurnOptionsState.error ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: forkTurnOptionsState.error }) : null,
                  forkTurnOptionsState.data?.length ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: forkTurnOptionsState.data.map((turn) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: forkBusy,
                      onClick: () => void handleForkTurn(turn.turnId),
                      className: "thread-composer-panel-button block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-sm text-stone-100", children: [
                          "Turn ",
                          turn.turnIndex
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: forkBusy ? "Forking" : turn.status })
                      ] })
                    },
                    turn.turnId
                  )) }) : null,
                  forkTurnOptionsState.status !== "loading" && !forkTurnOptionsState.error && (forkTurnOptionsState.data?.length ?? 0) === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No turns available to fork yet." }) : null
                ] }) : slashPanelView === "skills" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  skillsState.status === "loading" && !skillsState.data ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading skills\u2026" }) : null,
                  skillsState.error ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: skillsState.error }) : null,
                  skillsState.data?.skills.length ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: skillsState.data.skills.map((skill) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
                      children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-stone-100", children: skill.interface?.displayName ?? skill.name }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em]", children: [
                          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-stone-700 px-2 py-1 text-stone-400", children: skillScopeLabel(skill.scope) }),
                          /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 normal-case tracking-normal transition ${copiedSkillName === skill.name ? "border-emerald-400/45 bg-emerald-400/12 text-emerald-100" : "thread-composer-chip-button border-stone-700 text-stone-300 hover:border-stone-500"}`,
                              onClick: () => void handleCopySkillInvokeName(
                                skill.name
                              ),
                              title: `Copy $${skill.name}`,
                              "aria-label": `Copy $${skill.name}`,
                              children: [
                                /* @__PURE__ */ jsx(ClipboardIcon, {}),
                                "$",
                                skill.name
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs leading-5 text-stone-400", children: skill.interface?.shortDescription ?? skill.shortDescription ?? skill.description })
                      ] })
                    },
                    skill.path
                  )) }) : null,
                  skillsState.data?.errors.length ? /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: skillsState.data.errors.map((entry) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/85",
                      children: [
                        /* @__PURE__ */ jsx("p", { className: "font-medium", children: entry.message }),
                        /* @__PURE__ */ jsx("p", { className: "mt-1 break-all text-amber-100/60", children: entry.path })
                      ]
                    },
                    `${entry.path}:${entry.message}`
                  )) }) : null,
                  skillsState.status !== "loading" && !skillsState.error && (skillsState.data?.skills.length ?? 0) === 0 && (skillsState.data?.errors.length ?? 0) === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No skills available right now." }) : null
                ] }) : slashPanelView === "hooks" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-stone-400", children: "Hook config sources" }),
                      /* @__PURE__ */ jsx("p", { className: "truncate text-[11px] text-stone-500", children: hooksState.data?.projectHooksPath ?? "<workspace hooks config>" })
                    ] }),
                    hooksPanelMode === "list" && slashCapabilities.hostConfigFiles ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (event) => {
                          event.stopPropagation();
                          resetHookForm();
                          setHooksPanelMode("add");
                          setHookConfigError(null);
                          setHookConfigSuccess(null);
                        },
                        className: "shrink-0 rounded-full border border-sky-300/35 px-3 py-1.5 text-xs text-sky-100 transition hover:bg-sky-300/10",
                        children: "Add Hook"
                      }
                    ) : null
                  ] }),
                  hooksState.status === "loading" && !hooksState.data ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading hooks\u2026" }) : null,
                  hooksState.error ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: hooksState.error }) : null,
                  hookConfigError ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: hookConfigError }) : null,
                  hookConfigSuccess ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100/90", children: hookConfigSuccess }) : null,
                  hooksPanelMode === "add" || hooksPanelMode === "edit" ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
                    hooksPanelMode === "edit" ? /* @__PURE__ */ jsxs("p", { className: "rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-[11px] text-stone-400", children: [
                      "Editing",
                      " ",
                      hookEventJsonKey(
                        editingHookTarget?.eventName ?? hookEventName
                      ),
                      " ",
                      "in",
                      " ",
                      editingHookTarget?.scope === "global" ? "global" : "project",
                      " ",
                      "hooks.json"
                    ] }) : null,
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                      /* @__PURE__ */ jsxs("label", { className: "block text-xs text-stone-400", children: [
                        "Scope",
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            "aria-label": "Hook scope",
                            value: hookScope,
                            onChange: (event) => setHookScope(
                              event.target.value
                            ),
                            disabled: hooksPanelMode === "edit",
                            className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50",
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "project", children: "Project" }),
                              /* @__PURE__ */ jsx("option", { value: "global", children: "Global" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "block text-xs text-stone-400", children: [
                        "Event",
                        /* @__PURE__ */ jsx(
                          "select",
                          {
                            "aria-label": "Hook event",
                            value: hookEventName,
                            onChange: (event) => setHookEventName(
                              event.target.value
                            ),
                            className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50",
                            children: HOOK_EVENT_OPTIONS.map((eventOption) => /* @__PURE__ */ jsx(
                              "option",
                              {
                                value: eventOption.value,
                                children: eventOption.label
                              },
                              eventOption.value
                            ))
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs text-stone-400", children: "Matcher" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          "aria-label": "Hook matcher",
                          value: hookMatcher,
                          onChange: (event) => setHookMatcher(event.target.value),
                          placeholder: "Bash",
                          className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs text-stone-400", children: "Command" }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          "aria-label": "Hook command",
                          value: hookCommand,
                          onChange: (event) => setHookCommand(event.target.value),
                          rows: 3,
                          className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 font-mono text-xs text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                      /* @__PURE__ */ jsxs("label", { className: "block text-xs text-stone-400", children: [
                        "Timeout",
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            "aria-label": "Hook timeout seconds",
                            value: hookTimeoutSec,
                            onChange: (event) => setHookTimeoutSec(event.target.value),
                            inputMode: "numeric",
                            className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "block text-xs text-stone-400", children: [
                        "Status message",
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            "aria-label": "Hook status message",
                            value: hookStatusMessage,
                            onChange: (event) => setHookStatusMessage(event.target.value),
                            className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setHooksPanelMode("list");
                            setEditingHookTarget(null);
                          },
                          className: "thread-composer-chip-button rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition",
                          children: "Back"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => void handleSaveHook(),
                          disabled: hookConfigBusy,
                          className: "ui-status-info rounded-full px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
                          children: hookConfigBusy ? "Saving\u2026" : hooksPanelMode === "edit" ? "Update Hook" : "Write Hook"
                        }
                      )
                    ] })
                  ] }) : null,
                  hooksPanelMode === "list" && hooksState.data?.warnings.length ? /* @__PURE__ */ jsx("div", { className: "mb-2 space-y-2", children: hooksState.data.warnings.map((warning) => /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/85",
                      children: warning
                    },
                    warning
                  )) }) : null,
                  hooksPanelMode === "list" && hooksState.data?.errors.length ? /* @__PURE__ */ jsx("div", { className: "mb-2 space-y-2", children: hooksState.data.errors.map((entry) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-100/90",
                      children: [
                        /* @__PURE__ */ jsx("p", { className: "font-medium", children: entry.message }),
                        /* @__PURE__ */ jsx("p", { className: "mt-1 break-all text-rose-100/60", children: entry.path })
                      ]
                    },
                    `${entry.path}:${entry.message}`
                  )) }) : null,
                  hooksPanelMode === "list" && hooksState.data?.hooks.length ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: hooksState.data.hooks.map((hook) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxs("p", { className: "truncate text-sm font-medium text-stone-100", children: [
                            hookEventLabel(hook.eventName),
                            hook.matcher ? ` \xB7 ${hook.matcher}` : ""
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate font-mono text-[11px] text-stone-400", children: hook.command ?? hook.handlerType }),
                          hook.statusMessage ? /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-[11px] text-stone-500", children: hook.statusMessage }) : null
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-stone-500", children: [
                          editableHookTarget(hook) ? /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: (event) => {
                                event.stopPropagation();
                                startEditingHook(hook);
                              },
                              className: "thread-composer-chip-button rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-sky-100 transition hover:border-sky-300/35 hover:bg-sky-300/10",
                              children: "Edit"
                            }
                          ) : null,
                          slashCapabilities.hookTrust && hook.trustStatus === "trusted" && !hook.isManaged ? /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              disabled: hookConfigBusy,
                              onClick: (event) => {
                                event.stopPropagation();
                                void handleUntrustHook(hook);
                              },
                              className: "thread-composer-chip-button rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-100 transition hover:border-amber-300/35 hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50",
                              children: "Untrust"
                            }
                          ) : null,
                          (hook.trustStatus === "untrusted" || hook.trustStatus === "modified") && !hook.isManaged && slashCapabilities.hookTrust ? /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              disabled: hookConfigBusy || !hook.currentHash,
                              onClick: (event) => {
                                event.stopPropagation();
                                void handleTrustHook(hook);
                              },
                              className: "thread-composer-chip-button rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-emerald-100 transition hover:border-emerald-300/35 hover:bg-emerald-300/10 disabled:cursor-not-allowed disabled:opacity-50",
                              children: "Trust"
                            }
                          ) : null,
                          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-stone-700 px-2 py-0.5 text-stone-300", children: hookTrustLabel(hook.trustStatus) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-500", children: [
                          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: hookSourceLabel(hook.source) }),
                          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: hook.enabled ? "Enabled" : "Disabled" }),
                          /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: [
                            hook.timeoutSec,
                            "s"
                          ] })
                        ] })
                      ]
                    },
                    hook.key
                  )) }) : null,
                  hooksPanelMode === "list" && hooksState.status !== "loading" && !hooksState.error && (hooksState.data?.hooks.length ?? 0) === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No hooks configured for this workspace." }) : null
                ] }) : /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-stone-400", children: "MCP config source" }),
                      /* @__PURE__ */ jsx("p", { className: "truncate text-[11px] text-stone-500", children: mcpConfigPath ?? "<provider config>" })
                    ] }),
                    mcpPanelMode === "list" && slashCapabilities.mcpConfigEditing ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (event) => {
                          event.stopPropagation();
                          setMcpPanelMode("add");
                          setMcpConfigError(null);
                          setMcpConfigSuccess(null);
                        },
                        className: "shrink-0 rounded-full border border-sky-300/35 px-3 py-1.5 text-xs text-sky-100 transition hover:bg-sky-300/10",
                        children: "Add MCP"
                      }
                    ) : null
                  ] }),
                  mcpState.status === "loading" && !mcpState.data ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading MCP servers\u2026" }) : null,
                  mcpState.error ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: mcpState.error }) : null,
                  mcpConfigError ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: mcpConfigError }) : null,
                  mcpConfigSuccess ? /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100/90", children: mcpConfigSuccess }) : null,
                  mcpPanelMode === "add" ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: (event) => {
                          event.stopPropagation();
                          setMcpPanelMode("http");
                          setMcpConfigError(null);
                          setMcpConfigSuccess(null);
                        },
                        className: "thread-composer-panel-button block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-sm text-stone-100", children: "HTTP / Streamable HTTP" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: "Form" })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-stone-400", children: "Add an MCP server with a name and URL, then write the matching block into provider config." })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: (event) => {
                          event.stopPropagation();
                          void handlePrepareRawMcpBlock();
                        },
                        className: "thread-composer-panel-button block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-sm text-stone-100", children: "stdio / raw block" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: "TOML" })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-stone-400", children: "Write a single `[mcp_servers.name]` block, then save it back into provider config." })
                        ]
                      }
                    )
                  ] }) : null,
                  mcpPanelMode === "http" ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs text-stone-400", children: "MCP name" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          "aria-label": "MCP name",
                          value: mcpHttpName,
                          onChange: (event) => setMcpHttpName(event.target.value),
                          placeholder: "openaiDeveloperDocs",
                          className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs text-stone-400", children: "URL" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          "aria-label": "URL",
                          value: mcpHttpUrl,
                          onChange: (event) => setMcpHttpUrl(event.target.value),
                          placeholder: "https://developers.openai.com/mcp",
                          className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setMcpPanelMode("add"),
                          className: "thread-composer-chip-button rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition",
                          children: "Back"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => void handleSaveHttpMcp(),
                          disabled: mcpConfigBusy,
                          className: "ui-status-info rounded-full px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
                          children: mcpConfigBusy ? "Saving\u2026" : "Write HTTP MCP"
                        }
                      )
                    ] })
                  ] }) : null,
                  mcpPanelMode === "stdio" ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs text-stone-400", children: "MCP block for provider config" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        "aria-label": "MCP block for provider config",
                        value: mcpRawBlock,
                        onChange: (event) => setMcpRawBlock(event.target.value),
                        rows: 8,
                        className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setMcpPanelMode("add"),
                          className: "thread-composer-chip-button rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition",
                          children: "Back"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => void handleSaveRawMcpBlock(),
                          disabled: mcpConfigBusy,
                          className: "ui-status-info rounded-full px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
                          children: mcpConfigBusy ? "Saving\u2026" : "Write raw block"
                        }
                      )
                    ] })
                  ] }) : null,
                  mcpPanelMode === "list" && mcpState.data?.servers.length ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: mcpState.data.servers.map((server) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-stone-100", children: server.name }),
                            /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-stone-400", children: [
                              server.tools.length,
                              " tools \xB7",
                              " ",
                              server.resourceCount,
                              " resources \xB7",
                              " ",
                              server.resourceTemplateCount,
                              " ",
                              "templates"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full border border-stone-700 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-stone-300", children: authStatusLabel(server.authStatus) })
                        ] }),
                        server.tools.length > 0 ? /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-xs text-stone-500", children: server.tools.slice(0, 4).map(
                          (tool) => tool.title ?? tool.name
                        ).join(" \xB7 ") }) : null
                      ]
                    },
                    server.name
                  )) }) : null,
                  mcpPanelMode === "list" && mcpState.status !== "loading" && !mcpState.error && (mcpState.data?.servers.length ?? 0) === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No MCP servers available right now." }) : null
                ] }) })
              }
            )
          ] }),
          !isShellView && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-composer-menu-trigger": "true",
                "aria-label": "Add attachment",
                title: "Add attachment",
                onClick: () => setOpenMenu(
                  (current) => current === "attachments" ? null : "attachments"
                ),
                className: "thread-composer-icon-button inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-700 bg-stone-900/92 text-stone-200 transition hover:bg-stone-800",
                children: /* @__PURE__ */ jsx(PlusIcon, {})
              }
            ),
            openMenu === "attachments" && /* @__PURE__ */ jsx(
              "div",
              {
                "data-composer-menu-surface": "true",
                className: "thread-composer-menu absolute left-0 top-full mt-2 w-32 overflow-hidden rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20",
                children: /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        dismissPromptFocus();
                        photoInputRef.current?.click();
                      },
                      className: "thread-composer-menu-item block w-full rounded-xl px-3 py-2 text-left text-sm transition",
                      children: "Photo"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        dismissPromptFocus();
                        fileInputRef.current?.click();
                      },
                      className: "thread-composer-menu-item mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition",
                      children: "File"
                    }
                  )
                ] })
              }
            )
          ] }),
          canToggleShellView && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": isShellView ? "Switch to chat" : "Switch to shell",
              title: isShellView ? "Switch to chat" : "Switch to shell",
              onClick: () => onToggleView?.(),
              className: "thread-composer-icon-button inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-700 bg-stone-900/92 text-stone-200 transition hover:bg-stone-800",
              children: isShellView ? /* @__PURE__ */ jsx(ChatIcon, {}) : /* @__PURE__ */ jsx(TerminalIcon, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center justify-end gap-1.5", children: [
          isShellView && shellPromptLabel && /* @__PURE__ */ jsx(
            "span",
            {
              className: "min-w-0 max-w-[12rem] truncate rounded-full px-1.5 py-1 text-stone-400",
              title: shellPromptLabel,
              children: shellPromptLabel
            }
          ),
          isMobileShell && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-composer-menu-trigger": "true",
                "aria-label": openMenu === "shellTools" ? "Close shell tools" : "Open shell tools",
                "aria-haspopup": "menu",
                "aria-expanded": openMenu === "shellTools",
                title: openMenu === "shellTools" ? "Close shell tools" : "Open shell tools",
                onClick: () => {
                  dismissPromptFocus();
                  setOpenMenu(
                    (current) => current === "shellTools" ? null : "shellTools"
                  );
                },
                className: "inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-700 bg-stone-900/92 text-stone-200 transition hover:bg-stone-800",
                children: /* @__PURE__ */ jsx(WrenchScrewdriverIcon, {})
              }
            ),
            openMenu === "shellTools" && /* @__PURE__ */ jsx(
              "div",
              {
                "data-composer-menu-surface": "true",
                className: "absolute right-0 top-full z-40 mt-2 w-[11.5rem] max-w-[calc(100vw-1.5rem)] rounded-[1rem] border border-stone-700/90 bg-stone-950/96 p-2 shadow-2xl shadow-stone-950/40 sm:w-48",
                onMouseDown: (event) => {
                  event.stopPropagation();
                },
                onPointerDown: (event) => {
                  event.stopPropagation();
                },
                onTouchStart: (event) => {
                  event.stopPropagation();
                },
                children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void pasteClipboardIntoPrompt(),
                      className: "inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-2 py-2 text-sky-50",
                      children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx(ClipboardIcon, {}),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium tracking-[0.12em]", children: "Paste" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellCopy?.();
                      },
                      className: "inline-flex items-center justify-center rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-2 text-stone-100",
                      children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx(ClipboardIcon, {}),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium tracking-[0.12em]", children: "Copy" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: busy,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onSubmit({ prompt: "clear" });
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "CLEAR", tone: "sky" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: !shellControlState?.shellInputEnabled || !shellControlState?.isCommandRunning,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellControl?.("ctrl_c");
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "CTRL-C", tone: "rose" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: !shellControlState?.shellInputEnabled,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellControl?.("ctrl_d");
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "CTRL-D" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: !shellControlState?.shellInputEnabled,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellControl?.("esc");
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "ESC" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: !shellControlState?.shellInputEnabled,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellControl?.("tab");
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "TAB" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: !shellControlState?.shellInputEnabled,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellControl?.("up");
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "UP" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: !shellControlState?.shellInputEnabled,
                      onClick: () => {
                        dismissPromptFocus();
                        setOpenMenu(null);
                        void onShellControl?.("down");
                      },
                      className: "disabled:cursor-not-allowed disabled:opacity-45",
                      children: /* @__PURE__ */ jsx(ToolPill, { label: "DOWN" })
                    }
                  )
                ] })
              }
            )
          ] })
        ] })
      ] }),
      goalComposeMode && !isShellView && /* @__PURE__ */ jsxs("div", { className: "relative z-20 mb-1.5 flex flex-wrap items-center gap-2 rounded-2xl border border-sky-300/25 bg-sky-300/[0.07] px-3 py-2 text-xs text-sky-50 shadow-sm shadow-stone-950/10", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium uppercase tracking-[0.16em] text-sky-100/90", children: "Goal" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-stone-300", children: [
          /* @__PURE__ */ jsx("span", { children: "Max tokens (k)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              "aria-label": "Goal token budget",
              value: goalTokenBudget,
              onChange: (event) => setGoalTokenBudget(event.target.value),
              inputMode: "numeric",
              placeholder: "Optional",
              className: "h-7 w-24 rounded-full border border-sky-300/25 bg-stone-950/60 px-3 text-xs text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/70"
            }
          )
        ] }),
        goalLocalError ? /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 text-rose-200", children: goalLocalError }) : null,
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: exitGoalComposeMode,
            className: "rounded-full border border-stone-700/80 px-2.5 py-1 text-[11px] text-stone-300 transition hover:bg-stone-800",
            children: "Cancel"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        isShellView ? /* @__PURE__ */ jsx(
          "textarea",
          {
            "aria-label": "Prompt",
            disabled: false,
            value: prompt,
            onChange: (event) => setPrompt(event.target.value),
            onKeyDown: handlePromptKeyDown,
            rows: 2,
            placeholder: promptPlaceholder,
            className: `${promptInputClassName} resize-y pb-10`
          }
        ) : /* @__PURE__ */ jsxs("div", { className: promptInputClassName, children: [
          prompt.length === 0 && /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-4 top-2.5 text-stone-500", children: promptPlaceholder }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: promptRef,
              role: "textbox",
              "aria-label": "Prompt",
              "aria-multiline": "true",
              contentEditable: !disabled,
              suppressContentEditableWarning: true,
              onInput: () => handlePromptInput(),
              onPaste: handlePromptPaste,
              onKeyDown: handlePromptKeyDown,
              onKeyUp: () => {
                selectionSnapshotRef.current = snapshotSelection();
              },
              onMouseUp: () => {
                selectionSnapshotRef.current = snapshotSelection();
              },
              onBlur: () => {
                selectionSnapshotRef.current = snapshotSelection();
                setIsDragTargetActive(false);
              },
              onDragEnter: handlePromptDragEnter,
              onDragOver: handlePromptDragOver,
              onDragLeave: handlePromptDragLeave,
              onDrop: handlePromptDrop,
              className: `relative z-[1] min-h-[3.75rem] whitespace-pre-wrap break-words pb-10 outline-none sm:min-h-[3.75rem] ${disabled ? "cursor-not-allowed text-stone-500" : ""}`
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": interruptLabel,
            title: interruptLabel,
            onClick: () => void onInterrupt?.(),
            disabled: !canInterrupt,
            className: `absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${canInterrupt ? "border-rose-300/55 bg-rose-300/[0.14] text-rose-50 shadow-lg shadow-rose-950/20 hover:bg-rose-300/[0.22]" : "cursor-not-allowed border-stone-700/30 bg-stone-400/[0.02] text-stone-500/55 opacity-55"}`,
            children: /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "block h-2.5 w-2.5 rounded-[2px] bg-current"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            "aria-label": goalComposeMode && !isShellView ? "Set goal" : isShellView ? "Send Shell Input" : "Send Prompt",
            onMouseDown: (event) => {
              event.preventDefault();
            },
            onPointerDown: (event) => {
              event.preventDefault();
            },
            onTouchStart: (event) => {
              event.preventDefault();
            },
            disabled: goalBusy || busy || (activeView === "chat" ? disabled : false),
            className: `absolute bottom-2.5 right-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium shadow-lg shadow-stone-950/30 transition disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-300 ${sendButtonClassName}`,
            children: sendButtonLabel
          }
        ),
        !isShellView && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2.5 left-3 z-30 flex max-w-[calc(100%-7rem)] items-center gap-1.5 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative min-w-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-composer-menu-trigger": "true",
                "aria-haspopup": "menu",
                "aria-expanded": openMenu === "model",
                "aria-label": model ?? "Select model",
                disabled: modelControlsDisabled || modelOptions.length === 0,
                onClick: () => setOpenMenu(
                  (current) => current === "model" ? null : "model"
                ),
                title: fastMode ? `Fast mode is on. Turn it off from the slash toolbox to edit model. ${modelContextTitle}` : modelContextTitle,
                className: "thread-composer-inline-toggle relative inline-flex min-w-0 max-w-[8.75rem] items-center overflow-hidden rounded-full px-2.5 py-1 text-left text-stone-300 transition disabled:cursor-not-allowed disabled:text-stone-600 sm:max-w-[11rem]",
                children: /* @__PURE__ */ jsx("span", { className: "relative z-[1] block min-w-0 truncate whitespace-nowrap [direction:rtl]", children: model ?? "Select model" })
              }
            ),
            model ? /* @__PURE__ */ jsx(ContextProgressBar, { contextUsage }) : null,
            openMenu === "model" && /* @__PURE__ */ jsx(
              "div",
              {
                "data-composer-menu-surface": "true",
                className: "absolute bottom-full left-0 mb-2 w-max min-w-[9rem] max-w-[14rem] overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
                children: /* @__PURE__ */ jsx("div", { className: "max-h-72 overflow-auto p-2", children: modelOptions.map((entry) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleUpdateSettings({
                      model: entry.model,
                      reasoningEffort: entry.defaultReasoningEffort
                    }),
                    className: `block w-full rounded-xl px-3 py-2 text-left transition ${entry.model === model ? "ui-status-warning" : "thread-composer-menu-item text-stone-300"}`,
                    children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: entry.model })
                  },
                  entry.id
                )) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-composer-menu-trigger": "true",
                "aria-haspopup": "menu",
                "aria-expanded": openMenu === "effort",
                disabled: effortControlsDisabled,
                onClick: () => setOpenMenu(
                  (current) => current === "effort" ? null : "effort"
                ),
                title: effortControlTitle,
                className: `thread-composer-inline-toggle rounded-full px-2 py-1 transition disabled:cursor-not-allowed disabled:text-stone-700 ${effortControlsDisabled ? "text-stone-500" : "text-stone-300 hover:text-stone-100"}`,
                children: formatReasoningEffortLabel(reasoningEffort)
              }
            ),
            openMenu === "effort" && /* @__PURE__ */ jsx(
              "div",
              {
                "data-composer-menu-surface": "true",
                className: "absolute bottom-full left-0 mb-2 w-max min-w-[8rem] max-w-[12rem] overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
                children: /* @__PURE__ */ jsx("div", { className: "max-h-72 overflow-auto p-2", children: supportedEfforts.map((entry) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleUpdateSettings({
                      reasoningEffort: entry.reasoningEffort
                    }),
                    className: `block w-full rounded-xl px-3 py-2 text-left transition ${entry.reasoningEffort === reasoningEffort ? "ui-status-warning" : "thread-composer-menu-item text-stone-300"}`,
                    children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: formatReasoningEffortLabel(entry.reasoningEffort) })
                  },
                  entry.reasoningEffort
                )) })
              }
            )
          ] }),
          slashCapabilities.planMode && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-pressed": displayedCollaborationMode === "plan",
              disabled: settingsBusy,
              onClick: () => void handleUpdateSettings({
                collaborationMode: displayedCollaborationMode === "plan" ? "default" : "plan"
              }),
              className: `thread-composer-inline-toggle rounded-full px-2.5 py-1 transition ${displayedCollaborationMode === "plan" ? "thread-composer-plan-toggle-active" : "text-stone-500"} disabled:cursor-not-allowed disabled:opacity-60`,
              children: "Plan"
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200", children: error })
    ] })
  ] });
}

// src/components/ThreadWorkspaceLayout.tsx
import { useEffect as useEffect3, useMemo as useMemo2, useRef as useRef2, useState as useState2 } from "react";

// src/components/threadPresentation.ts
function formatShortTimestamp(value) {
  if (!value) {
    return "Time unavailable";
  }
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function formatLongTimestamp(value) {
  if (!value) {
    return "Time unavailable";
  }
  return new Date(value).toLocaleString();
}
function threadStatusLabel(status) {
  switch (status) {
    case "idle":
      return "Idle";
    case "running":
      return "Running";
    case "interrupted":
      return "Interrupted";
    case "failed":
      return "Failed";
    case "not_loaded":
      return "Not Loaded";
    case "system_error":
      return "System Error";
  }
}
function threadStatusClassName(status) {
  switch (status) {
    case "idle":
      return "ui-status-neutral";
    case "running":
      return "ui-status-info";
    case "interrupted":
      return "ui-status-warning";
    case "failed":
    case "system_error":
      return "ui-status-danger";
    case "not_loaded":
      return "ui-status-neutral";
  }
}
function turnStatusLabel(status) {
  switch (status) {
    case "sending":
      return "Sending";
    case "completed":
      return "Completed";
    case "interrupted":
      return "Interrupted";
    case "failed":
      return "Failed";
    case "inProgress":
      return "Running";
  }
}
function historyItemAccentClassName(kind) {
  switch (kind) {
    case "userMessage":
      return "timeline-kind-user";
    case "agentMessage":
      return "timeline-kind-agent";
    case "artifact":
      return "timeline-kind-action";
    case "image":
      return "timeline-kind-action";
    case "contextCompaction":
      return "timeline-kind-action";
    case "commandExecution":
      return "timeline-kind-command";
    case "webSearch":
      return "timeline-kind-search";
    case "fileRead":
      return "timeline-kind-file-read";
    case "reasoning":
      return "timeline-kind-reasoning";
    case "agentToolCall":
      return "timeline-kind-agent-tool";
    case "skillToolCall":
      return "timeline-kind-skill-tool";
    case "toolCall":
      return "timeline-kind-action";
    case "plan":
      return "timeline-kind-plan";
    case "fileChange":
      return "timeline-kind-file";
    case "hook":
      return "timeline-kind-action";
    case "other":
      return "ui-status-neutral";
  }
}
function historyItemLabel(kind) {
  switch (kind) {
    case "userMessage":
      return "User";
    case "agentMessage":
      return "Agent";
    case "artifact":
      return "Artifact";
    case "image":
      return "Image";
    case "contextCompaction":
      return "Context";
    case "commandExecution":
      return "Command";
    case "webSearch":
      return "Web Search";
    case "fileRead":
      return "File Read";
    case "reasoning":
      return "Reasoning";
    case "agentToolCall":
      return "Agent";
    case "skillToolCall":
      return "Skill";
    case "toolCall":
      return "Tool";
    case "plan":
      return "Plan";
    case "fileChange":
      return "File Change";
    case "hook":
      return "Hook";
    case "other":
      return "Other";
  }
}
function isScrollableHistoryItem(kind) {
  return kind === "commandExecution" || kind === "reasoning";
}

// src/components/RenameDialog.tsx
import { useEffect as useEffect2 } from "react";
import { createPortal } from "react-dom";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function RenameDialog({
  open,
  title,
  label,
  value,
  busy = false,
  onChange,
  onCancel,
  onSubmit
}) {
  useEffect2(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, onCancel, open]);
  if (!open) {
    return null;
  }
  function handleSubmit(event) {
    event.preventDefault();
    void onSubmit();
  }
  return createPortal(
    /* @__PURE__ */ jsxs2("div", { className: "fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "button",
          "aria-label": "Close rename dialog",
          onClick: onCancel,
          disabled: busy,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxs2(
        "form",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          onSubmit: handleSubmit,
          className: "relative z-[1] w-full max-w-md rounded-[1.6rem] border border-stone-700 bg-stone-900 p-5 shadow-2xl shadow-stone-950/40 sm:p-6",
          children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs2("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium text-stone-100", children: title }),
                /* @__PURE__ */ jsx2("p", { className: "mt-1 text-sm text-stone-500", children: "Changes are saved only after confirmation." })
              ] }),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx2("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx2("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsx2("label", { htmlFor: "rename-dialog-input", className: "text-sm font-medium text-stone-200", children: label }),
              /* @__PURE__ */ jsx2(
                "input",
                {
                  id: "rename-dialog-input",
                  "aria-label": label,
                  autoFocus: true,
                  value,
                  onChange: (event) => onChange(event.target.value),
                  className: "mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-300"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "mt-5 flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx2(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: busy,
                  className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  type: "submit",
                  disabled: busy || !value.trim(),
                  className: "ui-action-success rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
                  children: "Save"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/ThreadWorkspaceLayout.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function NewThreadIcon() {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      children: /* @__PURE__ */ jsx3("path", { d: "M8 3.25v9.5M3.25 8h9.5" })
    }
  );
}
function CopyIcon() {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-current",
      children: /* @__PURE__ */ jsx3("path", { d: "M5.75 1.75c-.97 0-1.75.78-1.75 1.75v.25H3.5c-.97 0-1.75.78-1.75 1.75v6c0 .97.78 1.75 1.75 1.75h4.75c.97 0 1.75-.78 1.75-1.75v-.25h.5c.97 0 1.75-.78 1.75-1.75v-6c0-.97-.78-1.75-1.75-1.75h-4.75Zm-.5 2V3.5c0-.28.22-.5.5-.5h4.75c.28 0 .5.22.5.5v6a.5.5 0 0 1-.5.5H10v-4.5c0-.97-.78-1.75-1.75-1.75h-3Zm-1.75 1.25h4.75c.28 0 .5.22.5.5v6a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-6c0-.28.22-.5.5-.5Z" })
    }
  );
}
function TrashIcon() {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3 w-3 fill-current",
      children: /* @__PURE__ */ jsx3("path", { d: "M6.1 1.75h3.8c.75 0 1.4.52 1.57 1.25h2.03c.35 0 .63.28.63.63 0 .34-.28.62-.63.62h-.66l-.62 8.03c-.08 1.09-.99 1.97-2.08 1.97H5.86c-1.09 0-2-.88-2.08-1.97l-.62-8.03H2.5a.62.62 0 1 1 0-1.25h2.03c.17-.73.82-1.25 1.57-1.25Zm0 1.25c-.07 0-.14.03-.19.08A.26.26 0 0 0 5.84 3h4.32a.26.26 0 0 0-.07-.17.26.26 0 0 0-.19-.08H6.1Zm-1.07 1.25.61 7.93c.03.44.4.79.84.79h3.04c.44 0 .81-.35.84-.79l.61-7.93H5.03Z" })
    }
  );
}
function SidebarSection({
  title,
  defaultOpen = false,
  children
}) {
  const [open, setOpen] = useState2(defaultOpen);
  return /* @__PURE__ */ jsxs3("section", { className: "border-t border-[var(--theme-border)] pt-4 first:border-t-0 first:pt-0", children: [
    /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        onClick: () => setOpen((current) => !current),
        "aria-expanded": open,
        className: "flex w-full items-center justify-between gap-3 text-left",
        children: [
          /* @__PURE__ */ jsx3("span", { className: "text-xs uppercase tracking-[0.28em] text-[var(--theme-fg-muted)]", children: title }),
          /* @__PURE__ */ jsx3("span", { className: "text-xs text-[var(--theme-fg-muted)]", children: open ? "Hide" : "Show" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx3("div", { className: "mt-3", children })
  ] });
}
function ThreadCard({
  thread,
  currentThreadId,
  currentWorkspaceId,
  workspaceLabels = {},
  onOpenThread,
  getThreadHref,
  renderThreadLink,
  onBeginRenameThread,
  onDeleteThread,
  showDeleteButton = false,
  showSessionCopyButton = false
}) {
  const [copyState, setCopyState] = useState2(
    "idle"
  );
  const resetTimerRef = useRef2(null);
  const workspaceLabel = workspaceLabels[thread.workspaceId];
  const isCurrentThread = currentThreadId === thread.id;
  useEffect3(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);
  async function handleCopySessionId() {
    const sessionId = thread.providerSessionId;
    if (!sessionId) {
      return;
    }
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopyState("copied");
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(
        () => setCopyState("idle"),
        1200
      );
    } catch {
      setCopyState("failed");
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(
        () => setCopyState("idle"),
        1600
      );
    }
  }
  const cardClassName = `thread-sidebar-card relative block rounded-[1.2rem] border px-3 py-2.5 transition ${isCurrentThread ? "thread-sidebar-card-active shadow-lg shadow-stone-950/12" : ""} ${showSessionCopyButton && thread.providerSessionId ? "pb-4" : ""}`;
  const openThread = () => onOpenThread(thread.id);
  const cardContent = /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs3("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx3(
            "p",
            {
              className: "min-w-0 w-fit max-w-[calc(100%-2rem)] truncate text-[13px] font-medium leading-5 text-[var(--theme-fg)]",
              title: thread.title,
              children: thread.title
            }
          ),
          onBeginRenameThread && /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              onClick: (event) => {
                event.stopPropagation();
                event.preventDefault();
                onBeginRenameThread(thread);
              },
              "aria-label": `Rename thread ${thread.title}`,
              className: "inline-flex h-4 w-4 shrink-0 items-center justify-center text-[var(--theme-fg-muted)] transition hover:text-[var(--theme-fg)]",
              children: /* @__PURE__ */ jsx3(
                "svg",
                {
                  "aria-hidden": "true",
                  viewBox: "0 0 16 16",
                  className: "h-3 w-3 fill-current",
                  children: /* @__PURE__ */ jsx3("path", { d: "m11.9 1.6 2.5 2.5-8.2 8.2-3.3.7.7-3.3 8.3-8.1Zm-7.3 8.7-.3 1.3 1.3-.3 6.9-6.9-1-1-6.9 6.9Zm8.8-7.8-1-1-1 1 1 1 1-1Z" })
                }
              )
            }
          ),
          showDeleteButton && onDeleteThread && /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              onClick: (event) => {
                event.stopPropagation();
                event.preventDefault();
                onDeleteThread(thread);
              },
              "aria-label": `Delete thread ${thread.title}`,
              className: "inline-flex h-4 w-4 shrink-0 items-center justify-center text-rose-300/90 transition hover:text-rose-200",
              children: /* @__PURE__ */ jsx3(TrashIcon, {})
            }
          )
        ] }),
        workspaceLabel && !currentWorkspaceId && /* @__PURE__ */ jsx3("p", { className: "mt-1 truncate text-xs text-[var(--theme-fg-muted)]", children: workspaceLabel })
      ] }),
      /* @__PURE__ */ jsx3(
        "span",
        {
          className: `rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] ${threadStatusClassName(thread.status)}`,
          children: threadStatusLabel(thread.status)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs3(
      "div",
      {
        className: `mt-2 flex items-center justify-between gap-3 text-[11px] text-[var(--theme-fg-muted)] ${showSessionCopyButton && thread.providerSessionId ? "pr-9" : ""}`,
        children: [
          /* @__PURE__ */ jsx3("time", { dateTime: thread.lastTurnStartedAt ?? thread.updatedAt, children: formatShortTimestamp(thread.lastTurnStartedAt ?? thread.updatedAt) }),
          /* @__PURE__ */ jsx3("span", { children: thread.model ?? "No model" })
        ]
      }
    ),
    showSessionCopyButton && thread.providerSessionId && /* @__PURE__ */ jsx3(
      "button",
      {
        type: "button",
        "aria-label": "Copy session ID",
        title: copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy session ID",
        onClick: (event) => {
          event.stopPropagation();
          event.preventDefault();
          void handleCopySessionId();
        },
        className: `absolute bottom-2.5 right-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full border shadow-sm shadow-stone-950/25 backdrop-blur transition ${copyState === "copied" ? "border-sky-300/40 bg-sky-300/16 text-sky-100" : copyState === "failed" ? "border-rose-300/35 bg-rose-300/12 text-rose-100" : "border-[var(--theme-border-strong)] bg-[var(--theme-surface-strong)] text-[var(--theme-fg-soft)] hover:bg-[var(--theme-hover)]"}`,
        children: /* @__PURE__ */ jsx3(CopyIcon, {})
      }
    )
  ] });
  const href = getThreadHref?.(thread.id);
  if (renderThreadLink) {
    return /* @__PURE__ */ jsx3(Fragment, { children: renderThreadLink({
      thread,
      children: cardContent,
      className: cardClassName,
      onClick: openThread
    }) });
  }
  if (href) {
    return /* @__PURE__ */ jsx3(
      "a",
      {
        href,
        onClick: (event) => {
          event.preventDefault();
          openThread();
        },
        className: cardClassName,
        children: cardContent
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    "div",
    {
      role: "link",
      tabIndex: 0,
      onClick: openThread,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openThread();
        }
      },
      className: cardClassName,
      children: cardContent
    }
  );
}
function ThreadCards({
  threads,
  currentThreadId,
  currentWorkspaceId,
  workspaceLabels = {},
  onOpenThread,
  getThreadHref,
  renderThreadLink,
  onBeginRenameThread,
  onDeleteThread,
  scrollable = false,
  maxHeightClassName = "max-h-full",
  showDeleteButton = false,
  showSessionCopyButton = false
}) {
  const containerClassName = scrollable ? `min-h-0 overflow-y-auto overscroll-contain pr-1 ${maxHeightClassName}` : "";
  return /* @__PURE__ */ jsx3("div", { className: containerClassName, children: /* @__PURE__ */ jsx3("div", { className: "space-y-1.5", children: threads.map((thread) => /* @__PURE__ */ jsx3(
    ThreadCard,
    {
      thread,
      currentThreadId,
      currentWorkspaceId,
      workspaceLabels,
      onOpenThread,
      showDeleteButton,
      showSessionCopyButton,
      ...getThreadHref ? { getThreadHref } : {},
      ...renderThreadLink ? { renderThreadLink } : {},
      ...onBeginRenameThread ? { onBeginRenameThread } : {},
      ...onDeleteThread ? { onDeleteThread } : {}
    },
    thread.id
  )) }) });
}
function ThreadWorkspaceLayout({
  threads,
  loading = false,
  error,
  viewportConstrained = false,
  showMobileAppMenu = true,
  showMobileThreadNavToggle = true,
  showMobileNewThreadShortcut = true,
  mobileHeaderAction,
  currentThreadId,
  currentThreadLabel = null,
  currentWorkspaceId = null,
  currentWorkspaceLabel = null,
  workspaceLabels = {},
  metaContent,
  settingsContent,
  appMenuButton,
  appNavigationMenu,
  getThreadHref,
  onOpenThread,
  getNewThreadHref,
  newThreadHref: explicitNewThreadHref,
  newThreadLabel = "New Thread",
  onNewThread,
  renderThreadLink,
  onCloseAppNavigation,
  onRenameThread,
  onDeleteThread,
  children
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState2(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState2(false);
  const [editingThreadId, setEditingThreadId] = useState2(null);
  const [draftTitle, setDraftTitle] = useState2("");
  const [renamingThreadId, setRenamingThreadId] = useState2(null);
  const visibleThreads = useMemo2(() => {
    const scopedThreads = currentWorkspaceId ? threads.filter((thread) => thread.workspaceId === currentWorkspaceId) : threads;
    return [...scopedThreads].sort((left, right) => {
      if (left.id === currentThreadId) {
        return -1;
      }
      if (right.id === currentThreadId) {
        return 1;
      }
      const leftTimestamp = Date.parse(
        left.lastTurnStartedAt ?? left.updatedAt
      );
      const rightTimestamp = Date.parse(
        right.lastTurnStartedAt ?? right.updatedAt
      );
      return rightTimestamp - leftTimestamp;
    });
  }, [currentThreadId, currentWorkspaceId, threads]);
  const baseThreadScopeLabel = currentWorkspaceLabel ?? (currentWorkspaceId ? "Current workspace" : "All threads");
  const threadScopeLabel = currentThreadLabel && currentThreadLabel.trim() ? `${baseThreadScopeLabel} / ${currentThreadLabel.trim()}` : baseThreadScopeLabel;
  const newThreadHref = explicitNewThreadHref ?? getNewThreadHref?.(currentWorkspaceId);
  const closeNavigationSurfaces = () => {
    setMobileSidebarOpen(false);
    onCloseAppNavigation?.();
  };
  async function handleRenameThread(threadId) {
    if (!onRenameThread) {
      return;
    }
    const normalizedTitle = draftTitle.trim();
    if (!normalizedTitle) {
      return;
    }
    setRenamingThreadId(threadId);
    try {
      await onRenameThread(threadId, normalizedTitle);
      setEditingThreadId(null);
      setDraftTitle("");
    } finally {
      setRenamingThreadId(null);
    }
  }
  function beginRenameThread(thread) {
    setEditingThreadId(thread.id);
    setDraftTitle(thread.title);
  }
  function cancelRenameThread() {
    setEditingThreadId(null);
    setDraftTitle("");
  }
  function openThread(threadId) {
    onOpenThread?.(threadId);
    closeNavigationSurfaces();
  }
  function handleNewThreadClick() {
    onNewThread?.();
    closeNavigationSurfaces();
  }
  function renderNewThreadButton(className, compact = false) {
    const content = compact ? /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx3(NewThreadIcon, {}),
      /* @__PURE__ */ jsx3("span", { className: "hidden sm:inline", children: "New" })
    ] }) : newThreadLabel;
    if (newThreadHref) {
      return /* @__PURE__ */ jsx3(
        "a",
        {
          href: newThreadHref,
          onClick: (event) => {
            if (onNewThread) {
              event.preventDefault();
            }
            handleNewThreadClick();
          },
          "aria-label": compact ? newThreadLabel : void 0,
          className,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx3(
      "button",
      {
        type: "button",
        onClick: handleNewThreadClick,
        "aria-label": compact ? newThreadLabel : void 0,
        className,
        children: content
      }
    );
  }
  function renderSidebarContent() {
    return /* @__PURE__ */ jsxs3("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsxs3("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs3("p", { className: "flex items-center gap-2 text-xs font-medium text-[var(--theme-fg-muted)]", children: [
            /* @__PURE__ */ jsx3("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--theme-border-strong)]" }),
            "Rooms"
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2", children: [
            loading && /* @__PURE__ */ jsx3("span", { className: "text-xs text-[var(--theme-fg-muted)]", children: "Refreshing..." }),
            renderNewThreadButton(
              "inline-flex h-7 items-center rounded-full bg-[var(--theme-accent-solid)] px-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-accent-solid-fg)] transition hover:bg-[var(--theme-accent-solid-hover)]"
            )
          ] })
        ] }),
        error && /* @__PURE__ */ jsx3("div", { className: "rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-sm text-rose-100", children: error }),
        !error && visibleThreads.length === 0 && !loading && /* @__PURE__ */ jsx3("div", { className: "rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-6 text-sm text-[var(--theme-fg-muted)]", children: "No threads available in this view." }),
        visibleThreads.length > 0 && /* @__PURE__ */ jsx3(
          ThreadCards,
          {
            threads: visibleThreads,
            currentThreadId,
            currentWorkspaceId,
            workspaceLabels,
            onOpenThread: openThread,
            ...onRenameThread ? { onBeginRenameThread: beginRenameThread } : {},
            showDeleteButton: Boolean(onDeleteThread),
            ...getThreadHref ? { getThreadHref } : {},
            ...renderThreadLink ? { renderThreadLink } : {},
            ...onDeleteThread ? { onDeleteThread } : {}
          }
        )
      ] }),
      /* @__PURE__ */ jsx3(SidebarSection, { title: "Thread Meta", defaultOpen: true, children: metaContent ?? /* @__PURE__ */ jsx3("p", { className: "text-sm text-[var(--theme-fg-muted)]", children: "Select a thread to inspect metadata." }) }),
      /* @__PURE__ */ jsx3(SidebarSection, { title: "Settings", children: settingsContent ?? /* @__PURE__ */ jsx3("p", { className: "text-sm text-[var(--theme-fg-muted)]", children: "No thread settings available." }) })
    ] });
  }
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(
      "div",
      {
        className: viewportConstrained ? `flex h-full max-h-full min-h-0 flex-col gap-2 overflow-hidden overscroll-none sm:gap-2 lg:grid ${desktopSidebarCollapsed ? "lg:grid-cols-[0_minmax(0,1fr)]" : "lg:grid-cols-[264px_minmax(0,1fr)]"}` : `flex min-h-[calc(100dvh-2rem)] flex-col gap-4 lg:grid ${desktopSidebarCollapsed ? "lg:grid-cols-[0_minmax(0,1fr)]" : "lg:grid-cols-[264px_minmax(0,1fr)]"}`,
        children: [
          /* @__PURE__ */ jsx3("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxs3("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs3(
              "div",
              {
                className: `thread-topbar-surface grid h-10 items-center gap-1.5 border-b px-2.5 backdrop-blur ${showMobileAppMenu && (showMobileNewThreadShortcut || mobileHeaderAction) ? "grid-cols-[2.5rem_minmax(0,1fr)_auto]" : showMobileAppMenu ? "grid-cols-[2.5rem_minmax(0,1fr)]" : "grid-cols-[minmax(0,1fr)]"}`,
                children: [
                  showMobileAppMenu && appMenuButton,
                  showMobileThreadNavToggle ? /* @__PURE__ */ jsxs3(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMobileSidebarOpen((current) => !current),
                      "aria-expanded": mobileSidebarOpen,
                      "aria-label": mobileSidebarOpen ? "Collapse thread navigation" : "Expand thread navigation",
                      className: "inline-flex min-w-0 items-center justify-center gap-1 px-1 text-center text-sm font-medium text-[var(--theme-fg)]",
                      title: threadScopeLabel,
                      children: [
                        /* @__PURE__ */ jsx3("span", { className: "min-w-0 truncate", children: threadScopeLabel }),
                        /* @__PURE__ */ jsx3(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: `inline-flex h-4 w-4 shrink-0 items-center justify-center text-[var(--theme-fg-muted)] transition ${mobileSidebarOpen ? "rotate-180" : ""}`,
                            children: /* @__PURE__ */ jsx3(
                              "svg",
                              {
                                viewBox: "0 0 16 16",
                                className: "h-3.5 w-3.5 fill-none stroke-current",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /* @__PURE__ */ jsx3("path", { d: "m4.5 6.25 3.5 3.5 3.5-3.5" })
                              }
                            )
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ jsx3(
                    "p",
                    {
                      className: "min-w-0 truncate px-1 text-center text-sm font-medium text-[var(--theme-fg)]",
                      title: threadScopeLabel,
                      children: threadScopeLabel
                    }
                  ),
                  showMobileAppMenu && (mobileHeaderAction ? mobileHeaderAction : showMobileNewThreadShortcut ? renderNewThreadButton(
                    "inline-flex h-8 min-w-0 shrink-0 items-center justify-center gap-1 rounded-full bg-[var(--theme-accent-solid)] px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-accent-solid-fg)] transition hover:bg-[var(--theme-accent-solid-hover)]",
                    true
                  ) : null)
                ]
              }
            ),
            showMobileAppMenu && appNavigationMenu && /* @__PURE__ */ jsx3("div", { className: "absolute left-2 top-[calc(100%+0.45rem)] z-20 w-[min(18rem,calc(100vw-1rem))]", children: appNavigationMenu }),
            showMobileThreadNavToggle && mobileSidebarOpen && /* @__PURE__ */ jsx3("aside", { className: "thread-sidebar-surface absolute inset-x-2 top-[calc(100%+0.35rem)] z-50 max-h-[min(70dvh,34rem)] overflow-y-auto overscroll-contain rounded-[12px] border p-3 shadow-2xl shadow-stone-950/18 backdrop-blur", children: renderSidebarContent() })
          ] }) }),
          /* @__PURE__ */ jsxs3(
            "aside",
            {
              className: `relative hidden min-h-0 lg:block ${desktopSidebarCollapsed ? "pointer-events-none overflow-visible" : ""}`,
              children: [
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDesktopSidebarCollapsed((current) => !current),
                    "aria-label": desktopSidebarCollapsed ? "Expand thread list" : "Collapse thread list",
                    title: desktopSidebarCollapsed ? "Expand thread list" : "Collapse thread list",
                    className: `pointer-events-auto absolute top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-surface-strong)] text-[var(--theme-fg-soft)] shadow-lg shadow-stone-950/20 transition hover:bg-[var(--theme-hover)] ${desktopSidebarCollapsed ? "left-2" : "right-[-0.9rem]"}`,
                    children: /* @__PURE__ */ jsx3(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 16 16",
                        className: `h-4 w-4 fill-none stroke-current transition ${desktopSidebarCollapsed ? "rotate-180" : ""}`,
                        strokeWidth: "1.7",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: /* @__PURE__ */ jsx3("path", { d: "m9.75 4.25-3.5 3.75 3.5 3.75" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx3(
                  "div",
                  {
                    "aria-hidden": desktopSidebarCollapsed,
                    className: `thread-sidebar-surface sticky top-2 rounded-[12px] border p-3 shadow-[var(--theme-shadow)] backdrop-blur transition-opacity ${viewportConstrained ? "h-full max-h-full overflow-y-auto" : ""} ${desktopSidebarCollapsed ? "pointer-events-none opacity-0" : "opacity-100"}`,
                    children: renderSidebarContent()
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx3(
            "section",
            {
              className: viewportConstrained ? "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden" : "min-w-0",
              children
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx3(
      RenameDialog,
      {
        open: editingThreadId !== null,
        title: "Rename Thread",
        label: "Thread Title",
        value: draftTitle,
        busy: renamingThreadId !== null,
        onChange: setDraftTitle,
        onCancel: cancelRenameThread,
        onSubmit: () => editingThreadId ? handleRenameThread(editingThreadId) : void 0
      }
    )
  ] });
}

// src/components/ThreadTimeline.tsx
import {
  memo,
  useCallback as useCallback2,
  useEffect as useEffect5,
  useLayoutEffect as useLayoutEffect2,
  useMemo as useMemo4,
  useRef as useRef3,
  useState as useState4
} from "react";
import { code } from "@streamdown/code";
import { Streamdown, defaultRemarkPlugins } from "streamdown";

// src/components/LongTextDialog.tsx
import { useEffect as useEffect4 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function LongTextDialog({
  open,
  title,
  text,
  onClose
}) {
  useEffect4(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);
  if (!open) {
    return null;
  }
  return createPortal2(
    /* @__PURE__ */ jsxs4("div", { className: "fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          "aria-label": "Close full text",
          onClick: onClose,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs4(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: "relative z-[1] flex max-h-[min(82vh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
          children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between gap-3 border-b border-stone-800 px-4 py-3 sm:px-5", children: [
              /* @__PURE__ */ jsx4("p", { className: "truncate text-sm font-medium text-stone-100", children: title }),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onClose,
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800",
                  children: /* @__PURE__ */ jsx4(
                    "svg",
                    {
                      "aria-hidden": "true",
                      viewBox: "0 0 16 16",
                      className: "h-4 w-4 fill-current",
                      children: /* @__PURE__ */ jsx4("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx4("div", { className: "min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-5", children: /* @__PURE__ */ jsx4("pre", { className: "whitespace-pre-wrap break-words text-sm leading-6 text-stone-200", children: text }) })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/markdownHeuristics.ts
var BLOCK_MARKDOWN_PATTERNS = [
  /^(?: {0,3})#{1,6}\s+\S/m,
  /^(?: {0,3})>{1,}\s*\S/m,
  /^(?: {0,3})(?:[-+*]|\d{1,9}[.)])\s+(?:\[[ xX]\]\s+)?\S/m,
  /^(?: {0,3})(?:```|~~~)/m,
  /^(?: {0,3})(?:[-*_]\s*){3,}$/m
];
var TABLE_MARKDOWN_PATTERN = /^(?:\|?[^|\n]+\|[^|\n]+(?:\|[^|\n]+)*\|?\s*\n\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$)/m;
var INLINE_LINK_PATTERN = /!?\[[^\]\n]+\]\([^)]+\)/;
var INLINE_CODE_PATTERN = /`[^`\n]+`/;
var STRONG_EMPHASIS_PATTERN = /(?:\*\*[^*\n]+\*\*|__[^_\n]+__)/;
var EMPHASIS_PATTERN = /(^|[^\w])(?:\*[^*\n]+\*|_[^_\n]+_)(?=[^\w]|$)/;
var STRIKETHROUGH_PATTERN = /~~[^~\n]+~~/;
function hasLikelyMarkdownSyntax(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }
  if (BLOCK_MARKDOWN_PATTERNS.some((pattern) => pattern.test(trimmed)) || TABLE_MARKDOWN_PATTERN.test(trimmed)) {
    return true;
  }
  if (!/[`[\]*_~!]/.test(trimmed)) {
    return false;
  }
  return INLINE_LINK_PATTERN.test(trimmed) || INLINE_CODE_PATTERN.test(trimmed) || STRONG_EMPHASIS_PATTERN.test(trimmed) || EMPHASIS_PATTERN.test(trimmed) || STRIKETHROUGH_PATTERN.test(trimmed);
}

// src/plugins/usePlugins.ts
import { useContext } from "react";

// src/plugins/plugin-context.ts
import { createContext } from "react";

// src/plugins/builtin-plugin-modules.tsx
import {
  xyzViewerPluginManifest
} from "@remote-codex/plugin-xyz-viewer";
import { terminalPluginManifest } from "@remote-codex/plugin-terminal";

// src/plugins/xyz-plugin-renderers.tsx
import { useMemo as useMemo3, useState as useState3 } from "react";
import {
  XyzMoleculeViewer
} from "@remote-codex/plugin-xyz-viewer";
import "@remote-codex/plugin-xyz-viewer/styles.css";
import { looksLikeMoleculeStructure } from "@remote-codex/plugin-runtime";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function isMoleculeViewerSnapshot(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value;
  return Array.isArray(record.content);
}
function normalizedMoleculeFormat(language) {
  return language.trim().toLowerCase() === "extxyz" ? "xyz" : language.trim().toLowerCase();
}
function XyzArtifactRenderer({
  artifact,
  expanded,
  onToggleExpanded
}) {
  const source = isMoleculeViewerSnapshot(artifact.payload) ? artifact.payload : null;
  return /* @__PURE__ */ jsxs5("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        type: "button",
        onClick: onToggleExpanded,
        className: "flex w-full items-center justify-between gap-3 text-left",
        children: [
          /* @__PURE__ */ jsxs5("span", { children: [
            /* @__PURE__ */ jsx5("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: artifact.title }),
            /* @__PURE__ */ jsx5("span", { className: "mt-1 block text-xs text-[var(--theme-fg-muted)]", children: artifact.summaryText ?? artifact.type })
          ] }),
          /* @__PURE__ */ jsx5("span", { className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: expanded ? "Hide" : "Open" })
        ]
      }
    ),
    expanded && source && /* @__PURE__ */ jsx5("div", { className: "h-[min(56vh,34rem)] min-h-[26rem]", children: /* @__PURE__ */ jsx5(
      XyzMoleculeViewer,
      {
        source,
        moleculeId: artifact.id,
        title: artifact.title
      }
    ) }),
    expanded && !source && /* @__PURE__ */ jsx5("pre", { className: "max-h-80 overflow-auto rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] p-3 text-xs text-[var(--theme-fg-soft)]", children: JSON.stringify(artifact.payload, null, 2) })
  ] });
}
function InlineXyzRenderer({
  code: code2,
  isIncomplete,
  language
}) {
  const [expanded, setExpanded] = useState3(true);
  const [sourceOpen, setSourceOpen] = useState3(false);
  const format = normalizedMoleculeFormat(language);
  const source = useMemo3(
    () => ({
      content: [code2.endsWith("\n") ? code2 : `${code2}
`],
      format,
      name: `${format.toUpperCase()} structure`,
      uuid: `inline:${format}:${code2.length}`
    }),
    [code2, format]
  );
  if (isIncomplete || !looksLikeMoleculeStructure(code2, format)) {
    return null;
  }
  return /* @__PURE__ */ jsxs5("div", { className: "my-3 overflow-hidden rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)]", children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-[var(--theme-border)] px-3 py-2", children: [
      /* @__PURE__ */ jsxs5("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs5("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: [
          format.toUpperCase(),
          " molecule"
        ] }),
        /* @__PURE__ */ jsx5("p", { className: "mt-0.5 text-xs text-[var(--theme-fg-muted)]", children: "Rendered from message source" })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "inline-flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsx5(
          "button",
          {
            type: "button",
            onClick: () => setSourceOpen((current) => !current),
            className: "rounded-full border border-[var(--theme-border)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
            children: sourceOpen ? "Hide source" : "Source"
          }
        ),
        /* @__PURE__ */ jsx5(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((current) => !current),
            className: "rounded-full border border-[var(--theme-border)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
            children: expanded ? "Collapse" : "Open"
          }
        )
      ] })
    ] }),
    expanded && /* @__PURE__ */ jsx5("div", { className: "h-[min(52vh,32rem)] min-h-[24rem]", children: /* @__PURE__ */ jsx5(
      XyzMoleculeViewer,
      {
        source,
        moleculeId: source.uuid,
        title: `${format.toUpperCase()} molecule`
      }
    ) }),
    sourceOpen && /* @__PURE__ */ jsx5("pre", { className: "max-h-96 overflow-auto border-t border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-3 text-xs leading-5 text-[var(--theme-fg-soft)]", children: code2 })
  ] });
}

// src/plugins/builtin-plugin-modules.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var builtinFrontendPlugins = [
  {
    manifest: terminalPluginManifest,
    threadPanels: [
      {
        id: "terminal",
        kind: "terminal",
        label: "Terminal"
      }
    ]
  },
  {
    manifest: xyzViewerPluginManifest,
    renderArtifact: (context) => /* @__PURE__ */ jsx6(XyzArtifactRenderer, { ...context }),
    inlineCodeRenderers: [
      {
        languages: ["xyz", "extxyz", "cif", "pdb"],
        render: (context) => /* @__PURE__ */ jsx6(InlineXyzRenderer, { ...context })
      }
    ]
  }
];

// src/plugins/plugin-context.ts
function mergePluginState(modules, serverPlugins) {
  const byId = new Map(serverPlugins.map((plugin) => [plugin.id, plugin]));
  const merged = modules.map((module) => ({
    ...module.manifest,
    enabled: byId.get(module.manifest.id)?.enabled ?? true,
    source: byId.get(module.manifest.id)?.source ?? "builtin"
  }));
  const moduleIds = new Set(modules.map((module) => module.manifest.id));
  for (const plugin of serverPlugins) {
    if (!moduleIds.has(plugin.id)) {
      merged.push(plugin);
    }
  }
  return merged;
}
function createDefaultPluginContextValue() {
  const plugins = mergePluginState(builtinFrontendPlugins, []);
  const enabledModules = builtinFrontendPlugins;
  return {
    plugins,
    loading: false,
    error: null,
    async refresh() {
    },
    async importPluginManifest() {
    },
    async setPluginEnabled() {
    },
    async uninstallPlugin() {
    },
    renderArtifact: () => null,
    renderInlineCode: () => null,
    hasRendererForArtifact: () => false,
    getThreadPanels: () => enabledModules.flatMap((module) => module.threadPanels ?? [])
  };
}
var PluginContext = createContext(createDefaultPluginContextValue());

// src/plugins/usePlugins.ts
function usePlugins() {
  return useContext(PluginContext) ?? createDefaultPluginContextValue();
}

// src/components/ThreadTimeline.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var INITIAL_VISIBLE_TURNS = 10;
var LOAD_STEP = 10;
var FOLLOW_TAIL_THRESHOLD_PX = 80;
var LARGE_MESSAGE_PREVIEW_CHARS = 4e3;
function useChangeRevision(inputs) {
  const previousInputsRef = useRef3(null);
  const revisionRef = useRef3(0);
  const previousInputs = previousInputsRef.current;
  const changed = previousInputs === null || previousInputs.length !== inputs.length || inputs.some((input, index) => !Object.is(input, previousInputs[index]));
  if (changed) {
    revisionRef.current += 1;
    previousInputsRef.current = inputs;
  }
  return revisionRef.current;
}
function itemSurfaceClassName(kind) {
  switch (kind) {
    case "userMessage":
      return "timeline-user";
    case "agentMessage":
      return "timeline-agent";
    case "artifact":
      return "timeline-action";
    case "image":
      return "timeline-action";
    case "contextCompaction":
      return "timeline-action";
    case "commandExecution":
      return "timeline-command";
    case "webSearch":
      return "timeline-search";
    case "fileRead":
      return "timeline-file-read";
    case "reasoning":
      return "timeline-reasoning";
    case "agentToolCall":
      return "timeline-agent-tool";
    case "skillToolCall":
      return "timeline-skill-tool";
    case "toolCall":
      return "timeline-action";
    case "plan":
      return "timeline-plan";
    case "fileChange":
      return "timeline-file-change";
    case "hook":
      return "timeline-action";
    case "other":
      return "timeline-other";
  }
}
function overlayBadgeClassName(tone) {
  switch (tone) {
    case "user":
      return "timeline-overlay-badge timeline-overlay-badge-user";
    case "agent":
      return "timeline-overlay-badge timeline-overlay-badge-agent";
    case "command":
      return "timeline-overlay-badge timeline-overlay-badge-command";
    case "search":
      return "timeline-overlay-badge timeline-overlay-badge-search";
    case "fileRead":
      return "timeline-overlay-badge timeline-overlay-badge-file-read";
    case "agentTool":
      return "timeline-overlay-badge timeline-overlay-badge-agent-tool";
    case "skillTool":
      return "timeline-overlay-badge timeline-overlay-badge-skill-tool";
    case "action":
      return "timeline-overlay-badge timeline-overlay-badge-action";
  }
}
function ContextCompactionIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M3.5 5.25h9" }),
        /* @__PURE__ */ jsx7("path", { d: "M5 8h6" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.5 10.75h3" })
      ]
    }
  );
}
function normalizeLines(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  while (lines.length > 1 && lines.at(-1)?.trim() === "") {
    lines.pop();
  }
  return lines;
}
function decodeXmlEntities(value) {
  return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}
function summarizeInlinePreviewText(text) {
  const lines = normalizeLines(text);
  if (lines.length === 1) {
    return {
      firstLine: lines[0] ?? "",
      showGap: false,
      isTruncated: false
    };
  }
  return {
    firstLine: lines[0] ?? "",
    showGap: true,
    isTruncated: true
  };
}
function parseHookPromptText(text) {
  const match = text.trim().match(/^<hook_prompt(?:\s+hook_run_id="([^"]+)")?>([\s\S]*)<\/hook_prompt>$/);
  if (!match) {
    return null;
  }
  const hookRunId = match[1] ? decodeXmlEntities(match[1]) : null;
  const output = decodeXmlEntities(match[2] ?? "").trim();
  const eventName = hookRunId?.split(":")[0] ?? "hook";
  const eventLabel = eventName === "stop" ? "Stop" : eventName;
  const sourcePath = hookRunId?.split(":").slice(2).join(":") || null;
  return {
    id: `live-hook-prompt:${hookRunId ?? "unknown"}`,
    kind: "hook",
    text: `${eventLabel} hook`,
    previewText: output || `${eventLabel} hook`,
    detailText: output || null,
    status: "Completed",
    hookEventName: eventName,
    hookEventLabel: eventLabel,
    hookHandlerType: "command",
    hookScope: "turn",
    hookSource: sourcePath ? "project" : null,
    hookSourcePath: sourcePath,
    hookStatusMessage: null,
    hookOutputEntries: output ? [{ kind: "warning", text: output }] : []
  };
}
function basenameFromAssetPath(value) {
  const normalized = value.replace(/[\\/]+$/, "").trim();
  if (!normalized) {
    return "";
  }
  const segments = normalized.split(/[\\/]/).filter(Boolean);
  return segments.at(-1) ?? normalized;
}
function tokenizeUserMessageText(text) {
  if (!text) {
    return [];
  }
  const matcher = /\[(PHOTO|FILE)\s+([^\]]+)\]/g;
  const segments = [];
  let cursor = 0;
  let index = 0;
  for (const match of text.matchAll(matcher)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      segments.push({
        type: "text",
        key: `text-${index}`,
        text: text.slice(cursor, start)
      });
      index += 1;
    }
    const kind = match[1];
    const path = match[2]?.trim() ?? "";
    if (kind === "PHOTO" && path) {
      segments.push({ type: "photo", key: `photo-${index}`, path });
    } else if (kind === "FILE" && path) {
      segments.push({ type: "file", key: `file-${index}`, path });
    } else {
      segments.push({
        type: "text",
        key: `text-${index}`,
        text: match[0]
      });
    }
    index += 1;
    cursor = start + match[0].length;
  }
  if (cursor < text.length) {
    segments.push({
      type: "text",
      key: `text-${index}`,
      text: text.slice(cursor)
    });
  }
  return segments;
}
function formatTrailingPathLabel(label, maxLength = 42) {
  const normalized = projectRelativePathLabel(label);
  if (!normalized) {
    return "";
  }
  const suffixMatch = normalized.match(/(, \+\d+ more.*)$/);
  const suffix = suffixMatch?.[1] ?? "";
  const base = suffix ? normalized.slice(0, -suffix.length) : normalized;
  if (base.length <= maxLength) {
    return `${base}${suffix}`;
  }
  const normalizedSeparators = base.replace(/\\/g, "/");
  const segments = normalizedSeparators.split("/").filter(Boolean);
  if (segments.length > 1) {
    const keptSegments = [];
    let currentLength = suffix.length + 4;
    for (let index = segments.length - 1; index >= 0; index -= 1) {
      const candidate = segments[index];
      const nextLength = currentLength + candidate.length + (keptSegments.length > 0 ? 1 : 0);
      if (keptSegments.length > 0 && nextLength > maxLength) {
        break;
      }
      keptSegments.unshift(candidate);
      currentLength = nextLength;
    }
    if (keptSegments.length > 0) {
      return `.../${keptSegments.join("/")}${suffix}`;
    }
  }
  return `...${base.slice(-(maxLength - suffix.length - 3))}${suffix}`;
}
function projectRelativePathLabel(label) {
  const normalized = label.trim();
  if (!normalized) {
    return "";
  }
  const suffixMatch = normalized.match(/(, \+\d+ more.*)$/);
  const suffix = suffixMatch?.[1] ?? "";
  const base = suffix ? normalized.slice(0, -suffix.length) : normalized;
  const slashNormalized = base.replace(/\\/g, "/");
  if (!slashNormalized.startsWith("/")) {
    return `${slashNormalized.replace(/^\.\//, "")}${suffix}`;
  }
  const markers = [
    "/apps/",
    "/packages/",
    "/src/",
    "/test/",
    "/tests/",
    "/docs/",
    "/config/",
    "/scripts/",
    "/e2e/",
    "/.agents/",
    "/.codex/"
  ];
  for (const marker of markers) {
    const markerIndex = slashNormalized.indexOf(marker);
    if (markerIndex >= 0) {
      return `${slashNormalized.slice(markerIndex + 1)}${suffix}`;
    }
  }
  return normalized;
}
function fileChangeSummarySegments(item) {
  const segments = [];
  if (typeof item.changedFiles === "number" && item.changedFiles > 0) {
    segments.push(`${item.changedFiles} ${item.changedFiles === 1 ? "file" : "files"}`);
  }
  if (typeof item.addedLines === "number" && item.addedLines > 0) {
    segments.push(`+${item.addedLines}`);
  }
  if (typeof item.removedLines === "number" && item.removedLines > 0) {
    segments.push(`-${item.removedLines}`);
  }
  if (segments.length > 0) {
    return segments;
  }
  const fallback = item.previewText?.trim();
  if (!fallback) {
    return [];
  }
  return fallback.replace(/\bfiles changed\b/gi, "files").replace(/\bfile changed\b/gi, "file").split("\xB7").map((segment) => segment.trim()).filter(Boolean);
}
function isCompactChatItem(kind) {
  return kind === "userMessage" || kind === "agentMessage";
}
function isSteerTailHistoryItem(kind) {
  return kind === "commandExecution" || kind === "webSearch" || kind === "fileRead" || kind === "fileChange" || kind === "image" || kind === "contextCompaction";
}
function isSteerConsumptionHistoryItem(kind) {
  return kind === "agentMessage" || kind === "reasoning" || kind === "agentToolCall" || kind === "skillToolCall" || kind === "toolCall" || kind === "plan";
}
function prepareTurnItemsForRendering(items, active) {
  if (!active) {
    return items;
  }
  const prepared = [...items];
  const firstUserIndex = prepared.findIndex((item) => item.kind === "userMessage");
  if (firstUserIndex < 0) {
    return prepared;
  }
  for (let index = firstUserIndex + 1; index < prepared.length; index += 1) {
    const item = prepared[index];
    if (!item || item.kind !== "userMessage") {
      continue;
    }
    let tailEnd = index + 1;
    while (tailEnd < prepared.length && isSteerTailHistoryItem(prepared[tailEnd].kind)) {
      tailEnd += 1;
    }
    if (tailEnd === index + 1) {
      continue;
    }
    const [steerItem] = prepared.splice(index, 1);
    prepared.splice(tailEnd - 1, 0, steerItem);
    index = tailEnd - 1;
  }
  let seenPrimaryUserMessage = false;
  return prepared.map((item, index) => {
    if (item.kind !== "userMessage") {
      return item;
    }
    if (!seenPrimaryUserMessage) {
      seenPrimaryUserMessage = true;
      return item;
    }
    const hasConsumptionAfter = prepared.slice(index + 1).some((nextItem) => isSteerConsumptionHistoryItem(nextItem.kind));
    if (hasConsumptionAfter) {
      return item;
    }
    return {
      ...item,
      status: "Awaiting response"
    };
  });
}
function hasHistoryItemSequence(item) {
  return typeof item.sequence === "number" && Number.isFinite(item.sequence);
}
function historyItemSequence(item) {
  return hasHistoryItemSequence(item) ? item.sequence : Number.POSITIVE_INFINITY;
}
function sortTurnItemsByRecordedSequence(items) {
  const leadingItems = [];
  let index = 0;
  while (index < items.length && items[index]?.kind === "userMessage" && !hasHistoryItemSequence(items[index])) {
    leadingItems.push(items[index]);
    index += 1;
  }
  const trailingItems = items.slice(index);
  if (!trailingItems.some(hasHistoryItemSequence)) {
    return items;
  }
  const sequenceValues = trailingItems.map((item) => historyItemSequence(item)).filter(Number.isFinite);
  const maxSequence = sequenceValues.length > 0 ? Math.max(...sequenceValues) : 0;
  const orderedItems = [];
  let cursor = 0;
  while (cursor < trailingItems.length) {
    const item = trailingItems[cursor];
    if (hasHistoryItemSequence(item)) {
      orderedItems.push({ item, index: cursor, order: historyItemSequence(item) });
      cursor += 1;
      continue;
    }
    const blockStart = cursor;
    while (cursor < trailingItems.length && !hasHistoryItemSequence(trailingItems[cursor])) {
      cursor += 1;
    }
    const block = trailingItems.slice(blockStart, cursor);
    const previousSequenced = [...trailingItems.slice(0, blockStart)].reverse().find(hasHistoryItemSequence);
    const nextSequenced = trailingItems.slice(cursor).find(hasHistoryItemSequence);
    const previousSequence = previousSequenced ? historyItemSequence(previousSequenced) : null;
    const nextSequence = nextSequenced ? historyItemSequence(nextSequenced) : null;
    block.forEach((blockItem, blockIndex) => {
      let order;
      if (previousSequence === null && nextSequence !== null) {
        order = nextSequence - (block.length - blockIndex) / (block.length + 1);
      } else if (previousSequence !== null && nextSequence !== null && nextSequence > previousSequence) {
        const span = nextSequence - previousSequence;
        order = previousSequence + (blockIndex + 1) / (block.length + 1) * span;
      } else {
        order = maxSequence + 1 + blockIndex / (block.length + 1);
      }
      orderedItems.push({
        item: blockItem,
        index: blockStart + blockIndex,
        order
      });
    });
  }
  const sortedTrailingItems = orderedItems.sort((left, right) => {
    const orderDelta = left.order - right.order;
    return orderDelta === 0 ? left.index - right.index : orderDelta;
  }).map((entry) => entry.item);
  return [...leadingItems, ...sortedTrailingItems];
}
function mergeLiveTurnItems(items, liveItems) {
  if (!liveItems || liveItems.length === 0) {
    return sortTurnItemsByRecordedSequence(items);
  }
  const liveItemsById = new Map(liveItems.map((item) => [item.id, item]));
  const mergedItems = items.map((item) => {
    const liveItem = liveItemsById.get(item.id);
    if (!liveItem) {
      return item;
    }
    liveItemsById.delete(item.id);
    const mergedItem = {
      ...item,
      ...liveItem,
      text: liveItem.text || item.text
    };
    const detailText = liveItem.detailText ?? item.detailText;
    const previewText = liveItem.previewText ?? item.previewText;
    const status = liveItem.status ?? item.status;
    const sequence = liveItem.sequence ?? item.sequence;
    if (detailText !== void 0) {
      mergedItem.detailText = detailText;
    }
    if (previewText !== void 0) {
      mergedItem.previewText = previewText;
    }
    if (status !== void 0) {
      mergedItem.status = status;
    }
    if (sequence !== void 0) {
      mergedItem.sequence = sequence;
    }
    return mergedItem;
  });
  const uniqueLiveItems = [...liveItemsById.values()];
  if (uniqueLiveItems.length === 0 && !mergedItems.some(hasHistoryItemSequence)) {
    return mergedItems;
  }
  mergedItems.push(...uniqueLiveItems);
  if (!mergedItems.some(
    (item) => typeof item.sequence === "number" && Number.isFinite(item.sequence)
  )) {
    return mergedItems;
  }
  return sortTurnItemsByRecordedSequence(mergedItems);
}
function getLiveOutputTailForTurn(liveOutput, items) {
  if (!liveOutput) {
    return "";
  }
  const materializedAgentTexts = items.filter(
    (item) => item.kind === "agentMessage"
  ).map((item) => item.text).filter((text) => text.length > 0);
  const lastMaterializedAgentText = materializedAgentTexts.at(-1) ?? "";
  if (lastMaterializedAgentText) {
    const anchorIndex = liveOutput.lastIndexOf(lastMaterializedAgentText);
    if (anchorIndex >= 0) {
      const anchoredTail = liveOutput.slice(
        anchorIndex + lastMaterializedAgentText.length
      );
      if (!anchoredTail.trim()) {
        return "";
      }
      return anchoredTail;
    }
  }
  const materializedAgentText = materializedAgentTexts.join("");
  if (!materializedAgentText) {
    return liveOutput;
  }
  const sharedPrefixLength = Math.min(
    liveOutput.length,
    materializedAgentText.length
  );
  let consumedLength = 0;
  while (consumedLength < sharedPrefixLength && liveOutput[consumedLength] === materializedAgentText[consumedLength]) {
    consumedLength += 1;
  }
  if (consumedLength === 0) {
    return liveOutput;
  }
  const remainingOutput = liveOutput.slice(consumedLength);
  return remainingOutput.trim() ? remainingOutput : "";
}
function isRunningHistoryStatus(status) {
  if (!status) {
    return false;
  }
  const normalized = status.toLowerCase();
  return normalized.includes("running") || normalized.includes("inprogress") || normalized.includes("in_progress");
}
function isActiveTurnStatus(status) {
  return status === "inProgress" || status === "sending";
}
function isNearBottom(container, threshold = FOLLOW_TAIL_THRESHOLD_PX) {
  const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
  return distanceFromBottom <= threshold;
}
function isElementVisible(container, element) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const visibleTop = Math.max(containerRect.top, elementRect.top);
  const visibleBottom = Math.min(containerRect.bottom, elementRect.bottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return visibleHeight > 0;
}
function groupTimelineHistoryItems(items) {
  const entries = [];
  let index = 0;
  const attachedReasoningIds = /* @__PURE__ */ new Set();
  const pendingReasoningItems = [];
  function lastAgentMessageEntry() {
    const lastEntry = entries.at(-1);
    if (lastEntry?.kind !== "item" || lastEntry.item.kind !== "agentMessage") {
      return null;
    }
    return lastEntry;
  }
  function attachReasoningToAgentMessage(entry, reasoningItems) {
    if (reasoningItems.length === 0) {
      return;
    }
    entry.item = {
      ...entry.item,
      reasoningItems: [
        ...entry.item.reasoningItems ?? [],
        ...reasoningItems
      ]
    };
    for (const reasoningItem of reasoningItems) {
      attachedReasoningIds.add(reasoningItem.id);
    }
  }
  function flushPendingReasoningItems() {
    const reasoningItems = pendingReasoningItems.splice(0);
    for (const reasoningItem of reasoningItems) {
      entries.push({
        kind: "item",
        key: reasoningItem.id,
        item: reasoningItem
      });
    }
  }
  while (index < items.length) {
    const current = items[index];
    if (!current) {
      break;
    }
    if (attachedReasoningIds.has(current.id)) {
      index += 1;
      continue;
    }
    if (current.kind === "reasoning") {
      let cursor = index;
      const reasoningItems = [];
      while (cursor < items.length && items[cursor]?.kind === "reasoning") {
        reasoningItems.push(items[cursor]);
        cursor += 1;
      }
      const previousAgentMessage = lastAgentMessageEntry();
      if (previousAgentMessage) {
        attachReasoningToAgentMessage(previousAgentMessage, reasoningItems);
      } else {
        pendingReasoningItems.push(...reasoningItems);
      }
      index = cursor;
      continue;
    }
    if (current.kind === "agentMessage") {
      const reasoningItems = pendingReasoningItems.splice(0);
      const entry = {
        kind: "item",
        key: current.id,
        item: current
      };
      attachReasoningToAgentMessage(entry, reasoningItems);
      entries.push(entry);
      index += 1;
      continue;
    }
    if (current.kind !== "commandExecution" && current.kind !== "fileChange" && current.kind !== "webSearch" && current.kind !== "fileRead") {
      entries.push({
        kind: "item",
        key: current.id,
        item: current
      });
      index += 1;
      continue;
    }
    const groupedItems = [];
    while (index < items.length && items[index]?.kind === current.kind) {
      groupedItems.push(items[index]);
      index += 1;
    }
    if (groupedItems.length === 1) {
      entries.push({
        kind: "item",
        key: groupedItems[0].id,
        item: groupedItems[0]
      });
      continue;
    }
    const groupKey = groupedItems.map((item) => item.id).join(":");
    if (current.kind === "commandExecution") {
      entries.push({
        kind: "commandGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "fileChange") {
      entries.push({
        kind: "fileChangeGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "fileRead") {
      entries.push({
        kind: "fileReadGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    entries.push({
      kind: "searchGroup",
      key: groupKey,
      items: groupedItems
    });
  }
  flushPendingReasoningItems();
  return entries;
}
function CompactMessageIcon({
  kind
}) {
  if (kind === "userMessage") {
    return /* @__PURE__ */ jsxs6(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 16 16",
        className: "h-3.5 w-3.5 fill-none stroke-current",
        strokeWidth: "1.35",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          /* @__PURE__ */ jsx7("path", { d: "M8 8a2.75 2.75 0 1 0 0-5.5A2.75 2.75 0 0 0 8 8Z" }),
          /* @__PURE__ */ jsx7("path", { d: "M3.5 13.25a4.5 4.5 0 0 1 9 0" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("rect", { x: "3.25", y: "3", width: "9.5", height: "7.5", rx: "2" }),
        /* @__PURE__ */ jsx7("path", { d: "M5.5 6.75h.01M10.5 6.75h.01M6.5 12.25h3" }),
        /* @__PURE__ */ jsx7("path", { d: "M6 10.5v1.75M10 10.5v1.75" })
      ]
    }
  );
}
function CommandIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "m4 5 2 2-2 2" }),
        /* @__PURE__ */ jsx7("path", { d: "M7.75 9.5h4.25" })
      ]
    }
  );
}
function ToolCallIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M6.25 4.25 3.5 7l2.75 2.75" }),
        /* @__PURE__ */ jsx7("path", { d: "M9.75 4.25 12.5 7 9.75 9.75" }),
        /* @__PURE__ */ jsx7("path", { d: "M8.9 3.5 7.1 10.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M3 12.25h10" })
      ]
    }
  );
}
function AgentToolIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("rect", { x: "3.25", y: "3", width: "9.5", height: "6.5", rx: "2" }),
        /* @__PURE__ */ jsx7("path", { d: "M5.5 6.25h.01M10.5 6.25h.01" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.25 11.25h3.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M6 13h4" }),
        /* @__PURE__ */ jsx7("path", { d: "M5.25 9.5v1.75M10.75 9.5v1.75" })
      ]
    }
  );
}
function SkillToolIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M5 3.25h6a1.5 1.5 0 0 1 1.5 1.5v6.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-6.5A1.5 1.5 0 0 1 5 3.25Z" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.25 6.25h3.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.25 8.25h2.25" }),
        /* @__PURE__ */ jsx7("path", { d: "M10.75 8.5v2.25" }),
        /* @__PURE__ */ jsx7("path", { d: "M9.62 9.62h2.26" })
      ]
    }
  );
}
function HookIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M6.25 4.5v4.25a2.75 2.75 0 1 0 2.75 2.75V7.25" }),
        /* @__PURE__ */ jsx7("path", { d: "M9 7.25a2.75 2.75 0 1 0-2.75-2.75" })
      ]
    }
  );
}
function CommandBatchIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("rect", { x: "2.75", y: "3", width: "8.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx7("rect", { x: "4.25", y: "6.5", width: "8.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx7("rect", { x: "5.75", y: "10", width: "7.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx7("path", { d: "m6.25 4.5 1 1-1 1" }),
        /* @__PURE__ */ jsx7("path", { d: "M7.9 5.5h1.7" }),
        /* @__PURE__ */ jsx7("path", { d: "m7.75 8 1 1-1 1" }),
        /* @__PURE__ */ jsx7("path", { d: "M9.4 9h1.7" })
      ]
    }
  );
}
function SearchIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("circle", { cx: "7", cy: "7", r: "3.75" }),
        /* @__PURE__ */ jsx7("path", { d: "m10.25 10.25 3 3" })
      ]
    }
  );
}
function SearchBatchIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("circle", { cx: "6", cy: "6", r: "2.3" }),
        /* @__PURE__ */ jsx7("path", { d: "m8 8 1.6 1.6" }),
        /* @__PURE__ */ jsx7("circle", { cx: "9.3", cy: "8.8", r: "2" }),
        /* @__PURE__ */ jsx7("path", { d: "m10.75 10.25 1.65 1.65" }),
        /* @__PURE__ */ jsx7("circle", { cx: "11.2", cy: "4.75", r: "1.8" }),
        /* @__PURE__ */ jsx7("path", { d: "m12.45 6 1.1 1.1" })
      ]
    }
  );
}
function ImageIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("rect", { x: "2.75", y: "3", width: "10.5", height: "9.5", rx: "1.5" }),
        /* @__PURE__ */ jsx7("circle", { cx: "6.1", cy: "6.1", r: "1.1" }),
        /* @__PURE__ */ jsx7("path", { d: "m4.5 10 2.2-2.2 1.9 1.9 1.1-1.1 1.8 1.8" })
      ]
    }
  );
}
function FileChangeIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" }),
        /* @__PURE__ */ jsx7("path", { d: "M9 2.75v2h2" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.2 8h3.6" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.2 10h1.7" })
      ]
    }
  );
}
function FileReadIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" }),
        /* @__PURE__ */ jsx7("path", { d: "M9 2.75v2h2" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.15 7.25h3.7" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.15 9.25h2.8" }),
        /* @__PURE__ */ jsx7("path", { d: "m10.4 10.7 1.2 1.2" }),
        /* @__PURE__ */ jsx7("circle", { cx: "9.25", cy: "9.55", r: "1.45" })
      ]
    }
  );
}
function PlanIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M4.25 4.75h7.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M4.25 8h7.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M4.25 11.25h4.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M2.25 4.75h.01M2.25 8h.01M2.25 11.25h.01" })
      ]
    }
  );
}
function BrainIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M6.55 3.05a2.15 2.15 0 0 0-3.3 1.8 2.05 2.05 0 0 0 .28 1.03A2.25 2.25 0 0 0 3 9.77a2.2 2.2 0 0 0 2.14 2.73h1.41V3.05Z" }),
        /* @__PURE__ */ jsx7("path", { d: "M9.45 3.05a2.15 2.15 0 0 1 3.3 1.8 2.05 2.05 0 0 1-.28 1.03A2.25 2.25 0 0 1 13 9.77a2.2 2.2 0 0 1-2.14 2.73H9.45V3.05Z" }),
        /* @__PURE__ */ jsx7("path", { d: "M5.1 6.55h1.45" }),
        /* @__PURE__ */ jsx7("path", { d: "M9.45 6.55h1.45" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.55 9.15H5.1" }),
        /* @__PURE__ */ jsx7("path", { d: "M9.45 9.15h1.45" })
      ]
    }
  );
}
function ExpandIcon() {
  return /* @__PURE__ */ jsx7(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 20 20",
      className: "h-3.5 w-3.5 fill-current",
      children: /* @__PURE__ */ jsx7("path", { d: "m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z" })
    }
  );
}
function CopyIcon2() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("rect", { x: "5.25", y: "3.25", width: "7.5", height: "9", rx: "1.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M10.75 12.75H4.5a1.25 1.25 0 0 1-1.25-1.25V4.75A1.25 1.25 0 0 1 4.5 3.5h.75" })
      ]
    }
  );
}
function RunningDots({
  tone = "amber"
}) {
  const dotClassName = tone === "emerald" ? "bg-sky-200/90" : tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx7("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx7(
    "span",
    {
      className: `h-1.5 w-1.5 rounded-full animate-pulse ${dotClassName}`,
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
function normalizePlanStepStatus(status) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "completed" || normalized === "done" || normalized === "complete") {
    return "completed";
  }
  if (normalized === "in_progress" || normalized === "in progress" || normalized === "inprogress" || normalized === "running" || normalized === "active") {
    return "in_progress";
  }
  if (normalized === "pending" || normalized === "todo" || normalized === "not_started" || normalized === "not started" || normalized === "queued") {
    return "pending";
  }
  if (normalized === "failed" || normalized === "error") {
    return "failed";
  }
  return "other";
}
function isLivePlanExecutionEvidence(item) {
  switch (item.kind) {
    case "fileChange":
    case "webSearch":
    case "image":
    case "contextCompaction":
      return true;
    case "commandExecution":
    case "toolCall":
      return !isRunningHistoryStatus(item.status);
    default:
      return false;
  }
}
function deriveDisplayedLivePlan(livePlan, items, turnStatus) {
  if (!livePlan || !isActiveTurnStatus(turnStatus)) {
    return livePlan;
  }
  const firstInProgressIndex = livePlan.plan.findIndex(
    (step) => normalizePlanStepStatus(step.status) === "in_progress"
  );
  if (firstInProgressIndex < 0) {
    return livePlan;
  }
  const nextPendingIndex = livePlan.plan.findIndex(
    (step, index) => index > firstInProgressIndex && normalizePlanStepStatus(step.status) === "pending"
  );
  if (nextPendingIndex < 0) {
    return livePlan;
  }
  const hasExecutionEvidence = items.some(
    (item) => isLivePlanExecutionEvidence(item)
  );
  if (!hasExecutionEvidence) {
    return livePlan;
  }
  const nextPlan = livePlan.plan.map((step, index) => {
    if (index === firstInProgressIndex) {
      return { ...step, status: "completed" };
    }
    if (index === nextPendingIndex) {
      return { ...step, status: "in_progress" };
    }
    return step;
  });
  return {
    ...livePlan,
    plan: nextPlan
  };
}
function ClockIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("circle", { cx: "8", cy: "8", r: "4.75" }),
        /* @__PURE__ */ jsx7("path", { d: "M8 5.25v2.9l2.05 1.2" })
      ]
    }
  );
}
function PlanStepStatusIcon({
  status
}) {
  const normalized = normalizePlanStepStatus(status);
  const label = normalized === "completed" ? "Plan step status: Completed" : normalized === "in_progress" ? "Plan step status: In progress" : normalized === "pending" ? "Plan step status: Pending" : normalized === "failed" ? "Plan step status: Failed" : `Plan step status: ${status}`;
  const className = normalized === "completed" ? "ui-status-success" : normalized === "in_progress" ? "ui-status-info" : normalized === "pending" ? "border-stone-700/90 bg-stone-900/80 text-stone-300" : normalized === "failed" ? "border-rose-300/30 bg-rose-300/10 text-rose-100" : "border-stone-700/90 bg-stone-900/80 text-stone-300";
  return /* @__PURE__ */ jsx7(
    "span",
    {
      "aria-label": label,
      title: label.replace("Plan step status: ", ""),
      className: `inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${className}`,
      children: normalized === "completed" ? /* @__PURE__ */ jsx7(
        "svg",
        {
          "aria-hidden": "true",
          viewBox: "0 0 16 16",
          className: "h-3.5 w-3.5 fill-none stroke-current",
          strokeWidth: "1.8",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx7("path", { d: "m3.75 8.25 2.5 2.5 6-6" })
        }
      ) : normalized === "in_progress" ? /* @__PURE__ */ jsx7(RunningDots, { tone: "sky" }) : normalized === "pending" ? /* @__PURE__ */ jsx7(ClockIcon, {}) : normalized === "failed" ? /* @__PURE__ */ jsx7(
        "svg",
        {
          "aria-hidden": "true",
          viewBox: "0 0 16 16",
          className: "h-3.5 w-3.5 fill-none stroke-current",
          strokeWidth: "1.7",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx7("path", { d: "m5 5 6 6M11 5l-6 6" })
        }
      ) : /* @__PURE__ */ jsx7("span", { className: "text-[10px] font-semibold uppercase tracking-[0.14em]", children: "?" })
    }
  );
}
function TurnStatusIndicator({
  status
}) {
  const label = turnStatusLabel(status);
  if (status === "completed") {
    return /* @__PURE__ */ jsx7(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-success inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx7(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx7("path", { d: "m3.75 8.25 2.5 2.5 6-6" })
          }
        )
      }
    );
  }
  if (status === "failed") {
    return /* @__PURE__ */ jsx7(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-failed inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx7(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx7("path", { d: "m5 5 6 6M11 5l-6 6" })
          }
        )
      }
    );
  }
  if (status === "interrupted") {
    return /* @__PURE__ */ jsx7(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-warning inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx7(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx7("path", { d: "M6 4.5v7M10 4.5v7" })
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx7(
    "span",
    {
      "aria-label": label,
      title: label,
      className: "inline-flex min-w-[1.25rem] items-center justify-center text-sky-200",
      children: /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" })
    }
  );
}
function TurnStatusBar({
  turn,
  variant = "header"
}) {
  const label = turnStatusLabel(turn.status);
  const runtimeSummary = formatTurnRuntimeSummary(turn);
  const tokenBadges = buildTurnTokenBadges(turn);
  const priceBadge = buildTurnPriceBadge(turn);
  const active = isActiveTurnStatus(turn.status);
  const toneClassName = turn.status === "failed" ? "border-rose-300/20 bg-rose-300/[0.06] text-rose-100" : active ? "border-sky-300/22 bg-sky-300/[0.08] text-sky-100" : "border-stone-700/90 bg-stone-900/70 text-stone-200";
  if (variant === "footer") {
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        className: `flex w-full flex-col gap-1.5 rounded-[0.95rem] border px-3 py-2 text-xs ${toneClassName}`,
        children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex w-full items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs6("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx7(TurnStatusIndicator, { status: turn.status }),
              /* @__PURE__ */ jsx7("span", { className: "timeline-soft-text min-w-0 truncate", children: runtimeSummary })
            ] }),
            turn.startedAt && /* @__PURE__ */ jsx7(
              "time",
              {
                dateTime: turn.startedAt,
                title: formatLongTimestamp(turn.startedAt),
                className: "timeline-meta-text shrink-0 text-[11px]",
                children: formatShortTimestamp(turn.startedAt)
              }
            )
          ] }),
          (priceBadge || tokenBadges.length > 0) && /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center gap-1.5 pl-6", children: [
            priceBadge ? /* @__PURE__ */ jsx7(
              "span",
              {
                className: `inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${priceBadge.className}`,
                title: priceBadge.title,
                children: priceBadge.label
              }
            ) : null,
            tokenBadges.map((badge) => /* @__PURE__ */ jsxs6(
              "span",
              {
                className: `inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${badge.className}`,
                title: badge.title,
                children: [
                  badge.icon ? /* @__PURE__ */ jsx7("span", { className: "mr-1", children: badge.icon }) : null,
                  badge.label
                ]
              },
              badge.id
            ))
          ] })
        ]
      }
    );
  }
  const title = `${label} \xB7 ${runtimeSummary}`;
  return /* @__PURE__ */ jsxs6(
    "span",
    {
      className: `inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] sm:text-[11px] ${toneClassName}`,
      title,
      children: [
        /* @__PURE__ */ jsx7(TurnStatusIndicator, { status: turn.status }),
        /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text min-w-0 truncate", children: runtimeSummary })
      ]
    }
  );
}
function TokenInIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M8 2.75v8" }),
        /* @__PURE__ */ jsx7("path", { d: "m4.75 7.5 3.25 3.25L11.25 7.5" })
      ]
    }
  );
}
function TokenOutIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M8 13.25v-8" }),
        /* @__PURE__ */ jsx7("path", { d: "m11.25 8.5-3.25-3.25L4.75 8.5" })
      ]
    }
  );
}
function TokenCacheIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M3.25 5.25 8 2.75l4.75 2.5L8 7.75l-4.75-2.5Z" }),
        /* @__PURE__ */ jsx7("path", { d: "M3.25 8 8 10.5 12.75 8" }),
        /* @__PURE__ */ jsx7("path", { d: "M3.25 10.75 8 13.25l4.75-2.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M3.25 5.25v5.5" }),
        /* @__PURE__ */ jsx7("path", { d: "M12.75 5.25v5.5" })
      ]
    }
  );
}
function TokenReasonIcon() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx7("path", { d: "M6.2 3.2a2.3 2.3 0 0 0-2.95 3.5A2.4 2.4 0 0 0 4.5 11h.2c.25 1.1 1.1 1.8 2.3 1.8h1.8c1.2 0 2.05-.7 2.3-1.8h.2A2.4 2.4 0 0 0 12.75 6.7 2.3 2.3 0 0 0 9.8 3.2" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.3 6.15c.45-.42 1.02-.65 1.7-.65s1.25.23 1.7.65" }),
        /* @__PURE__ */ jsx7("path", { d: "M8 5.5v4.75" }),
        /* @__PURE__ */ jsx7("path", { d: "M6.75 9.05 8 10.25l1.25-1.2" })
      ]
    }
  );
}
function formatCompactTokenCount(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0";
  }
  if (value >= 1e6) {
    const rounded = value >= 1e7 ? Math.round(value / 1e6) : value / 1e6;
    return `${String(rounded.toFixed(1)).replace(/\.0$/, "")}m`;
  }
  if (value >= 1e3) {
    const rounded = value >= 1e4 ? Math.round(value / 1e3) : value / 1e3;
    return `${String(rounded.toFixed(1)).replace(/\.0$/, "")}k`;
  }
  return String(Math.round(value));
}
function formatCompactUsd(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "$0";
  }
  if (value >= 100) {
    return `$${Math.round(value)}`;
  }
  if (value >= 10) {
    return `$${String(value.toFixed(1)).replace(/\.0$/, "")}`;
  }
  if (value >= 1) {
    return `$${String(value.toFixed(2)).replace(/0$/, "").replace(/\.$/, "")}`;
  }
  if (value >= 0.1) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 0.01) {
    return `$${value.toFixed(3)}`;
  }
  if (value >= 1e-3) {
    return `$${value.toFixed(4)}`;
  }
  return "<$0.001";
}
function formatDetailedUsd(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "$0.0000";
  }
  return `$${value.toFixed(4)}`;
}
function proportionalOutputUsd(totalOutputUsd, outputTokens, sliceTokens) {
  const outputUsdValue = totalOutputUsd ?? null;
  if (!Number.isFinite(outputUsdValue ?? NaN) || outputUsdValue === null || outputTokens <= 0 || sliceTokens <= 0) {
    return null;
  }
  return outputUsdValue * sliceTokens / outputTokens;
}
function buildTurnTokenDetails(turn) {
  const usage = turn.tokenUsage?.total;
  if (!usage) {
    return [];
  }
  const nonCachedInputTokens = Math.max(
    usage.inputTokens - usage.cachedInputTokens,
    0
  );
  const cachedInputTokens = Math.max(usage.cachedInputTokens, 0);
  const reasoningOutputTokens = Math.max(usage.reasoningOutputTokens, 0);
  const nonReasoningOutputTokens = Math.max(
    usage.outputTokens - reasoningOutputTokens,
    0
  );
  const details = [
    nonCachedInputTokens > 0 ? {
      id: "in",
      label: "Input",
      tokenCompactValue: formatCompactTokenCount(nonCachedInputTokens),
      tokenRawValue: nonCachedInputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(turn.priceEstimate.inputUsd) : "--",
      usdRawValue: turn.priceEstimate?.inputUsd ?? null,
      className: "token-badge-in",
      icon: /* @__PURE__ */ jsx7(TokenInIcon, {})
    } : null,
    cachedInputTokens > 0 ? {
      id: "cache",
      label: "Cached input",
      tokenCompactValue: formatCompactTokenCount(cachedInputTokens),
      tokenRawValue: cachedInputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(turn.priceEstimate.cachedInputUsd) : "--",
      usdRawValue: turn.priceEstimate?.cachedInputUsd ?? null,
      className: "token-badge-cache",
      icon: /* @__PURE__ */ jsx7(TokenCacheIcon, {})
    } : null,
    nonReasoningOutputTokens > 0 ? {
      id: "out",
      label: "Output",
      tokenCompactValue: formatCompactTokenCount(nonReasoningOutputTokens),
      tokenRawValue: nonReasoningOutputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(
        proportionalOutputUsd(
          turn.priceEstimate.outputUsd,
          Math.max(usage.outputTokens, 0),
          nonReasoningOutputTokens
        ) ?? 0
      ) : "--",
      usdRawValue: proportionalOutputUsd(
        turn.priceEstimate?.outputUsd,
        Math.max(usage.outputTokens, 0),
        nonReasoningOutputTokens
      ),
      className: "token-badge-out",
      icon: /* @__PURE__ */ jsx7(TokenOutIcon, {})
    } : null,
    reasoningOutputTokens > 0 ? {
      id: "reason",
      label: "Reasoning",
      tokenCompactValue: formatCompactTokenCount(reasoningOutputTokens),
      tokenRawValue: reasoningOutputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(
        proportionalOutputUsd(
          turn.priceEstimate.outputUsd,
          Math.max(usage.outputTokens, 0),
          reasoningOutputTokens
        ) ?? 0
      ) : "--",
      usdRawValue: proportionalOutputUsd(
        turn.priceEstimate?.outputUsd,
        Math.max(usage.outputTokens, 0),
        reasoningOutputTokens
      ),
      className: "token-badge-reason",
      icon: /* @__PURE__ */ jsx7(TokenReasonIcon, {})
    } : null
  ];
  return details.filter((detail) => detail !== null);
}
function buildTurnTokenBadges(turn) {
  return buildTurnTokenDetails(turn).map((detail) => ({
    id: detail.id,
    label: detail.tokenCompactValue,
    title: `${detail.label}: ${detail.tokenRawValue} tokens`,
    className: detail.className,
    icon: detail.icon
  }));
}
function buildTurnPriceBadge(turn) {
  return {
    label: turn.priceEstimate ? formatCompactUsd(turn.priceEstimate.totalUsd) : "--",
    title: turn.priceEstimate === null || turn.priceEstimate === void 0 ? "Price estimate unavailable for this model." : `Estimated cost: ${formatDetailedUsd(turn.priceEstimate.totalUsd)}`,
    className: turn.priceEstimate ? "token-badge-total" : "token-badge-empty"
  };
}
var TURN_HEADER_BADGE_CLASS_NAME = "inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-normal leading-none sm:text-[11px]";
function TurnTokenSummary({ turn }) {
  const details = buildTurnTokenDetails(turn);
  const priceBadge = buildTurnPriceBadge(turn);
  const [isMobileOpen, setIsMobileOpen] = useState4(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState4(false);
  const [mobilePopoverShift, setMobilePopoverShift] = useState4(0);
  const containerRef = useRef3(null);
  const desktopPriceRef = useRef3(null);
  const mobilePopoverRef = useRef3(null);
  useLayoutEffect2(() => {
    if (!isMobileOpen || details.length === 0) {
      setMobilePopoverShift(0);
      return;
    }
    const updatePopoverShift = () => {
      const anchor = containerRef.current;
      const popover = mobilePopoverRef.current;
      if (!anchor || !popover) {
        return;
      }
      const anchorRect = anchor.getBoundingClientRect();
      const popoverWidth = popover.offsetWidth || popover.getBoundingClientRect().width;
      if (popoverWidth <= 0) {
        return;
      }
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportPadding = 12;
      const desiredLeft = anchorRect.left + anchorRect.width / 2 - popoverWidth / 2;
      const minLeft = viewportPadding;
      const maxLeft = Math.max(minLeft, viewportWidth - viewportPadding - popoverWidth);
      const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
      setMobilePopoverShift(Math.round(clampedLeft - desiredLeft));
    };
    updatePopoverShift();
    window.addEventListener("resize", updatePopoverShift);
    return () => {
      window.removeEventListener("resize", updatePopoverShift);
    };
  }, [details.length, isMobileOpen]);
  useEffect5(() => {
    if (!isMobileOpen && !isDesktopOpen) {
      return;
    }
    const handlePointerDown = (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsMobileOpen(false);
      }
      if (desktopPriceRef.current && !desktopPriceRef.current.contains(event.target)) {
        setIsDesktopOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isDesktopOpen, isMobileOpen]);
  if (!priceBadge && details.length === 0) {
    return null;
  }
  const renderBreakdownPopover = () => /* @__PURE__ */ jsx7("div", { className: "thread-token-popover min-w-[12rem] rounded-2xl border p-2.5 shadow-2xl shadow-black/20 backdrop-blur", children: /* @__PURE__ */ jsx7("div", { className: "space-y-1", children: details.map((detail) => /* @__PURE__ */ jsxs6(
    "div",
    {
      className: "thread-token-popover-row flex items-center justify-between gap-3 rounded-xl border px-2.5 py-1.5 text-[11px]",
      title: `${detail.label}: ${detail.tokenRawValue} tokens`,
      children: [
        /* @__PURE__ */ jsxs6("span", { className: "thread-token-popover-text inline-flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsx7("span", { className: "inline-flex shrink-0", children: detail.icon }),
          /* @__PURE__ */ jsx7("span", { className: "thread-token-popover-strong font-medium", children: detail.usdCompactValue })
        ] }),
        /* @__PURE__ */ jsx7("span", { className: "thread-token-popover-text shrink-0 font-medium", children: detail.tokenCompactValue })
      ]
    },
    detail.id
  )) }) });
  return /* @__PURE__ */ jsxs6(Fragment2, { children: [
    /* @__PURE__ */ jsxs6(
      "div",
      {
        className: "hidden shrink-0 items-center gap-1.5 md:inline-flex",
        children: [
          priceBadge ? /* @__PURE__ */ jsxs6(
            "div",
            {
              ref: desktopPriceRef,
              className: "relative shrink-0",
              onMouseEnter: () => setIsDesktopOpen(true),
              onMouseLeave: () => setIsDesktopOpen(false),
              children: [
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Show token and price details",
                    "aria-expanded": isDesktopOpen,
                    onFocus: () => setIsDesktopOpen(true),
                    onBlur: () => setIsDesktopOpen(false),
                    className: `${TURN_HEADER_BADGE_CLASS_NAME} appearance-none whitespace-nowrap bg-transparent !text-[10px] !font-normal !leading-none transition hover:bg-[var(--theme-hover)] sm:!text-[11px] ${priceBadge.className}`,
                    title: priceBadge.title,
                    children: priceBadge.label
                  }
                ),
                isDesktopOpen && details.length > 0 ? /* @__PURE__ */ jsx7("div", { className: "absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2", children: renderBreakdownPopover() }) : null
              ]
            }
          ) : null,
          details.map((detail) => /* @__PURE__ */ jsxs6(
            "span",
            {
              className: `${TURN_HEADER_BADGE_CLASS_NAME} ${detail.className}`,
              title: `${detail.label}: ${detail.usdCompactValue}, ${detail.tokenRawValue} tokens`,
              children: [
                detail.icon,
                /* @__PURE__ */ jsx7("span", { className: "font-medium text-stone-100", children: detail.tokenCompactValue })
              ]
            },
            detail.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxs6("div", { ref: containerRef, className: "relative shrink-0 md:hidden", children: [
      priceBadge ? /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          "aria-label": "Show token and price details",
          "aria-expanded": isMobileOpen,
          onClick: () => setIsMobileOpen((current) => !current),
          className: `${TURN_HEADER_BADGE_CLASS_NAME} appearance-none whitespace-nowrap bg-transparent !text-[10px] !font-normal !leading-none transition hover:bg-[var(--theme-hover)] sm:!text-[11px] ${priceBadge.className}`,
          title: priceBadge.title,
          children: priceBadge.label
        }
      ) : null,
      isMobileOpen && details.length > 0 ? /* @__PURE__ */ jsx7(
        "div",
        {
          ref: mobilePopoverRef,
          className: "absolute left-1/2 top-full z-30 mt-1.5",
          style: { transform: `translateX(${mobilePopoverShift}px) translateX(-50%)` },
          children: renderBreakdownPopover()
        }
      ) : null
    ] })
  ] });
}
function formatTurnRuntimeSummary(turn) {
  const modelLabel = turn.model?.trim() ? turn.model.trim() : "--";
  let reasoningLabel = "--";
  if (turn.reasoningEffortAvailable === null || turn.reasoningEffortAvailable === void 0) {
    reasoningLabel = "--";
  } else if (turn.reasoningEffortAvailable === false) {
    reasoningLabel = "-";
  } else {
    reasoningLabel = turn.reasoningEffort ?? "--";
  }
  return [modelLabel, reasoningLabel].join(" \xB7 ");
}
var MarkdownContent = memo(function MarkdownContent2({
  text,
  className = "agent-markdown"
}) {
  const plugins = usePlugins();
  const inlineCodeRenderers = useMemo4(
    () => [
      {
        language: ["xyz", "extxyz", "cif", "pdb"],
        component: function InlinePluginCodeRenderer({
          code: sourceCode,
          isIncomplete,
          language,
          meta
        }) {
          const rendered = plugins.renderInlineCode({
            code: sourceCode,
            isIncomplete,
            language,
            ...meta === void 0 ? {} : { meta }
          });
          return rendered ?? /* @__PURE__ */ jsx7("code", { className: "whitespace-pre-wrap break-words text-xs", children: sourceCode });
        }
      }
    ],
    [plugins]
  );
  return /* @__PURE__ */ jsx7(
    Streamdown,
    {
      mode: "static",
      plugins: { code, renderers: inlineCodeRenderers },
      controls: false,
      lineNumbers: false,
      remarkPlugins: MARKDOWN_REMARK_PLUGINS,
      className,
      children: text
    }
  );
});
function remarkPreserveSoftBreaks() {
  return (tree) => {
    preserveSoftBreaksInNode(tree);
  };
}
var MARKDOWN_REMARK_PLUGINS = [
  ...Object.values(defaultRemarkPlugins),
  remarkPreserveSoftBreaks
];
function preserveSoftBreaksInNode(node) {
  if (!Array.isArray(node.children)) {
    return;
  }
  const nextChildren = [];
  for (const child of node.children) {
    if (child.type === "text" && typeof child.value === "string" && child.value.includes("\n")) {
      const lines = child.value.split("\n");
      lines.forEach((line, index) => {
        if (index > 0) {
          nextChildren.push({ type: "break" });
        }
        if (line) {
          nextChildren.push({ ...child, value: line });
        }
      });
      continue;
    }
    preserveSoftBreaksInNode(child);
    nextChildren.push(child);
  }
  node.children = nextChildren;
}
var PLAIN_URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"'`]+/gi;
var TRAILING_URL_PUNCTUATION_PATTERN = /[),.;:!?]+$/;
function normalizeHref(value) {
  return value.startsWith("www.") ? `https://${value}` : value;
}
function LinkifiedPlainText({ text }) {
  const parts = [];
  let cursor = 0;
  for (const match of text.matchAll(PLAIN_URL_PATTERN)) {
    const rawMatch = match[0];
    const index = match.index ?? 0;
    const trailingPunctuation = rawMatch.match(TRAILING_URL_PUNCTUATION_PATTERN)?.[0] ?? "";
    const urlText = trailingPunctuation ? rawMatch.slice(0, -trailingPunctuation.length) : rawMatch;
    if (!urlText) {
      continue;
    }
    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }
    parts.push(
      /* @__PURE__ */ jsx7(
        "a",
        {
          href: normalizeHref(urlText),
          target: "_blank",
          rel: "noreferrer",
          className: "thread-inline-link",
          children: urlText
        },
        `${index}-${urlText}`
      )
    );
    if (trailingPunctuation) {
      parts.push(trailingPunctuation);
    }
    cursor = index + rawMatch.length;
  }
  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }
  return /* @__PURE__ */ jsx7(Fragment2, { children: parts.length > 0 ? parts : text });
}
var MarkdownAwareBody = memo(function MarkdownAwareBody2({
  text,
  scrollRootRef,
  streaming = false,
  containerClassName = "",
  plainTextClassName = "whitespace-pre-wrap break-words text-[15px] leading-6 text-stone-100",
  markdownClassName = "agent-markdown"
}) {
  const messageRef = useRef3(null);
  const [expanded, setExpanded] = useState4(false);
  const shouldRenderMarkdown = hasLikelyMarkdownSyntax(text);
  const isLargeText = !streaming && text.length > LARGE_MESSAGE_PREVIEW_CHARS;
  const displayText = isLargeText && !expanded ? `${text.slice(0, LARGE_MESSAGE_PREVIEW_CHARS).trimEnd()}

...` : text;
  const [isActivated, setIsActivated] = useState4(
    streaming || typeof IntersectionObserver === "undefined"
  );
  useEffect5(() => {
    if (streaming || typeof IntersectionObserver === "undefined") {
      setIsActivated(true);
      return;
    }
    if (isActivated || !messageRef.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsActivated(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        root: scrollRootRef.current,
        threshold: 0
      }
    );
    observer.observe(messageRef.current);
    return () => {
      observer.disconnect();
    };
  }, [isActivated, scrollRootRef, streaming]);
  return /* @__PURE__ */ jsxs6("div", { ref: messageRef, className: containerClassName, children: [
    isActivated && shouldRenderMarkdown ? /* @__PURE__ */ jsx7(MarkdownContent, { text: displayText, className: markdownClassName }) : /* @__PURE__ */ jsx7("p", { className: plainTextClassName, children: /* @__PURE__ */ jsx7(LinkifiedPlainText, { text: displayText }) }),
    isLargeText ? /* @__PURE__ */ jsx7(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((current) => !current),
        className: "timeline-meta-text mt-2 inline-flex rounded-full border border-[var(--theme-border)] px-2.5 py-1 text-xs transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
        children: expanded ? "Show less" : `Show full message (${text.length.toLocaleString()} chars)`
      }
    ) : null
  ] });
});
var AgentMessageBody = memo(function AgentMessageBody2({
  text,
  scrollRootRef,
  streaming = false
}) {
  return /* @__PURE__ */ jsx7(
    MarkdownAwareBody,
    {
      text,
      scrollRootRef,
      streaming,
      containerClassName: "thread-message-prose"
    }
  );
});
var UserMessageBody = memo(function UserMessageBody2({
  threadId,
  text,
  getImageAssetUrl
}) {
  const segments = useMemo4(() => tokenizeUserMessageText(text), [text]);
  return /* @__PURE__ */ jsx7("div", { className: "thread-message-prose whitespace-pre-wrap break-words text-[15px] leading-6 text-stone-300", children: segments.map((segment) => {
    if (segment.type === "text") {
      return /* @__PURE__ */ jsx7("span", { children: segment.text }, segment.key);
    }
    if (segment.type === "photo") {
      const imageUrl = threadId ? getImageAssetUrl?.({ threadId, path: segment.path }) ?? null : null;
      const label = basenameFromAssetPath(segment.path) || "Attached image";
      return /* @__PURE__ */ jsx7("span", { className: "mx-[0.14rem] inline-flex align-middle", children: /* @__PURE__ */ jsxs6("span", { className: "inline-flex max-w-full flex-col rounded-[1rem] border border-sky-300/28 bg-sky-300/[0.08] p-1.5 shadow-sm shadow-stone-950/20", children: [
        imageUrl ? /* @__PURE__ */ jsx7(
          "img",
          {
            src: imageUrl,
            alt: label,
            className: "h-[4.5rem] w-[6rem] rounded-[0.75rem] bg-stone-950 object-contain",
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsx7("span", { className: "inline-flex h-[4.5rem] w-[6rem] items-center justify-center rounded-[0.75rem] bg-stone-950 text-[10px] text-sky-100", children: "PHOTO" }),
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: "mt-1 max-w-[7rem] truncate text-[10px] font-medium tracking-[0.08em] text-sky-50",
            title: segment.path,
            children: label
          }
        )
      ] }) }, segment.key);
    }
    const fileName = basenameFromAssetPath(segment.path) || "Attached file";
    return /* @__PURE__ */ jsx7("span", { className: "mx-[0.14rem] inline-flex align-middle", children: /* @__PURE__ */ jsxs6(
      "span",
      {
        className: "inline-flex max-w-[12rem] items-center gap-2 rounded-[0.95rem] border border-emerald-300/28 bg-emerald-300/[0.08] px-2.5 py-2 text-[10px] font-medium tracking-[0.08em] text-emerald-50 shadow-sm shadow-stone-950/20",
        title: segment.path,
        children: [
          /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200/20 bg-emerald-300/12 text-[9px]", children: "FILE" }),
          /* @__PURE__ */ jsx7("span", { className: "min-w-0 truncate", children: fileName })
        ]
      }
    ) }, segment.key);
  }) });
});
function commandStatusBadgeClassName(status) {
  if (status === "completed") {
    return "timeline-command-status-complete";
  }
  return "timeline-command-status-pending";
}
function CommandStatusIcon({
  status
}) {
  if (status === "completed") {
    return /* @__PURE__ */ jsx7(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 16 16",
        className: "h-3.5 w-3.5 fill-none stroke-current",
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /* @__PURE__ */ jsx7("path", { d: "m3.75 8.25 2.5 2.5 6-6" })
      }
    );
  }
  return /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" });
}
var CompactMessageItem = memo(function CompactMessageItem2({
  threadId,
  item,
  scrollRootRef,
  streaming = false,
  adapter
}) {
  const [copyState, setCopyState] = useState4("idle");
  const [reasoningOpen, setReasoningOpen] = useState4(false);
  const resetTimerRef = useRef3(null);
  const reasoningItems = item.kind === "agentMessage" ? item.reasoningItems ?? [] : [];
  const reasoningText = reasoningItems.map((entry) => entry.text.trim()).filter(Boolean).join("\n\n");
  const iconToneClassName = item.kind === "userMessage" ? "thread-message-icon thread-message-icon-user" : "thread-message-icon thread-message-icon-agent";
  const queuedLikeStatus = item.kind === "userMessage" && (item.status === "Steering" || item.status === "Accepted" || item.status === "Awaiting response");
  const queuedBadgeClassName = item.status === "Steering" ? "ui-status-warning" : item.status === "Accepted" ? "ui-status-success" : "ui-status-info";
  useEffect5(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopyState("copied");
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => setCopyState("idle"), 1200);
    } catch {
      setCopyState("failed");
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => setCopyState("idle"), 1600);
    }
  }
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame ${item.kind === "agentMessage" ? "timeline-has-corner-copy" : ""} relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        queuedLikeStatus && /* @__PURE__ */ jsxs6("span", { className: `absolute right-2.5 top-2.5 z-[1] inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium tracking-[0.12em] shadow-sm shadow-stone-950/20 ${queuedBadgeClassName}`, children: [
          /* @__PURE__ */ jsxs6(
            "svg",
            {
              "aria-hidden": "true",
              viewBox: "0 0 16 16",
              className: "h-3.5 w-3.5 fill-none stroke-current",
              strokeWidth: "1.45",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx7("path", { d: "M3.25 8A4.75 4.75 0 0 1 8 3.25h2.75" }),
                /* @__PURE__ */ jsx7("path", { d: "m9.5 1.75 1.75 1.5-1.75 1.5" }),
                /* @__PURE__ */ jsx7("path", { d: "M12.75 8A4.75 4.75 0 0 1 8 12.75H5.25" }),
                /* @__PURE__ */ jsx7("path", { d: "m6.5 14.25-1.75-1.5 1.75-1.5" })
              ]
            }
          ),
          /* @__PURE__ */ jsx7("span", { children: item.status })
        ] }),
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${iconToneClassName}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(CompactMessageIcon, { kind: item.kind }) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "timeline-message-content timeline-mobile-bubble-content flex min-w-0 items-start gap-0 pt-2 sm:gap-2.5 sm:pt-0", children: [
          /* @__PURE__ */ jsxs6("div", { className: "hidden", children: [
            /* @__PURE__ */ jsx7(
              "span",
              {
                className: `hidden h-6 w-6 items-center justify-center rounded-full border sm:inline-flex ${iconToneClassName}`,
                children: /* @__PURE__ */ jsx7(CompactMessageIcon, { kind: item.kind })
              }
            ),
            streaming && item.kind === "agentMessage" && /* @__PURE__ */ jsx7("span", { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" }) })
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "min-w-0 flex-1", children: [
            item.kind === "agentMessage" ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
              reasoningText ? /* @__PURE__ */ jsxs6("div", { className: "timeline-attached-reasoning mb-2", children: [
                /* @__PURE__ */ jsxs6(
                  "button",
                  {
                    type: "button",
                    "aria-expanded": reasoningOpen,
                    onClick: () => setReasoningOpen((current) => !current),
                    className: "timeline-attached-reasoning-toggle",
                    children: [
                      /* @__PURE__ */ jsx7(
                        "span",
                        {
                          "aria-hidden": "true",
                          className: "timeline-attached-reasoning-chevron inline-flex h-5 w-5 items-center justify-center rounded-full",
                          children: /* @__PURE__ */ jsx7(
                            "svg",
                            {
                              viewBox: "0 0 16 16",
                              className: `h-3.5 w-3.5 fill-none stroke-current transition ${reasoningOpen ? "rotate-90" : ""}`,
                              strokeWidth: "1.65",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              children: /* @__PURE__ */ jsx7("path", { d: "m6 4.75 3.25 3.25L6 11.25" })
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx7(
                        "span",
                        {
                          "aria-hidden": "true",
                          className: "timeline-attached-reasoning-icon inline-flex h-5 w-5 items-center justify-center rounded-full",
                          children: /* @__PURE__ */ jsx7(BrainIcon, {})
                        }
                      ),
                      /* @__PURE__ */ jsx7("span", { className: "timeline-attached-reasoning-label", children: "Thinking" }),
                      reasoningItems.some((entry) => isRunningHistoryStatus(entry.status)) ? /* @__PURE__ */ jsx7(RunningDots, { tone: "sky" }) : null
                    ]
                  }
                ),
                reasoningOpen ? /* @__PURE__ */ jsx7("pre", { className: "timeline-attached-reasoning-body mt-1.5 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-[0.7rem] px-3 py-2 text-[12px] leading-5", children: /* @__PURE__ */ jsx7(LinkifiedPlainText, { text: reasoningText }) }) : null
              ] }) : null,
              /* @__PURE__ */ jsx7(
                AgentMessageBody,
                {
                  text: item.text,
                  scrollRootRef,
                  streaming
                }
              )
            ] }) : /* @__PURE__ */ jsx7(
              UserMessageBody,
              {
                threadId,
                text: item.text,
                getImageAssetUrl: adapter?.getImageAssetUrl
              }
            ),
            item.status && !queuedLikeStatus && /* @__PURE__ */ jsx7("p", { className: "timeline-meta-text mt-1 text-xs", children: item.status })
          ] })
        ] }),
        streaming && item.kind === "agentMessage" && /* @__PURE__ */ jsx7("span", { className: "absolute left-5 top-0 inline-flex sm:hidden", children: /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" }) }),
        item.kind === "agentMessage" && /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            "aria-label": "Copy agent reply",
            title: copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy agent reply",
            onClick: () => void handleCopy(),
            className: "timeline-corner-copy absolute bottom-0 right-0 inline-flex h-5 w-5 items-center justify-center transition",
            children: /* @__PURE__ */ jsx7(
              "span",
              {
                className: `timeline-corner-copy-visual inline-flex items-center justify-center border shadow-sm shadow-stone-950/25 backdrop-blur transition ${copyState === "copied" ? "ui-status-info" : copyState === "failed" ? "ui-status-danger" : "border-stone-700/90 bg-stone-900/60 text-stone-300 hover:bg-stone-800/92"}`,
                children: /* @__PURE__ */ jsx7(CopyIcon2, {})
              }
            )
          }
        )
      ]
    }
  );
});
var CommandItem = memo(function CommandItem2({
  item,
  onOpen
}) {
  const summary = summarizeInlinePreviewText(item.previewText ?? item.text);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event timeline-mobile-dense-command relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("command")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(CommandIcon, {}) })
          }
        ),
        isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7("span", { className: "absolute left-5 top-0 inline-flex sm:hidden", children: /* @__PURE__ */ jsx7(RunningDots, {}) }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxs6("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: [
            /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-200", children: /* @__PURE__ */ jsx7(CommandIcon, {}) }),
            isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7(RunningDots, {})
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 pt-6 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": item.status ? `Command status: ${item.status}` : "Command status",
                title: item.status ?? "Command status",
                onClick: () => onOpen(item, "Command Output"),
                className: `absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-[0.7rem] rounded-tr-[0.9rem] border shadow-sm shadow-stone-950/25 transition sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:rounded-full ${commandStatusBadgeClassName(item.status)} hover:brightness-110`,
                children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.72] sm:scale-100", children: /* @__PURE__ */ jsx7(CommandStatusIcon, { status: item.status }) })
              }
            ),
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Open full command",
                onClick: () => onOpen(item, "Command Output"),
                className: "block w-full text-left",
                children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-line flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
var ToolCallItem = memo(function ToolCallItem2({
  item,
  onOpen
}) {
  const summary = summarizeInlinePreviewText(item.text);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("action")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(ToolCallIcon, {}) })
          }
        ),
        isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7("span", { className: "absolute left-5 top-0 inline-flex sm:hidden", children: /* @__PURE__ */ jsx7(RunningDots, {}) }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxs6("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: [
            /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 text-fuchsia-100", children: /* @__PURE__ */ jsx7(ToolCallIcon, {}) }),
            isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7(RunningDots, {})
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 pt-6 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": item.status ? `Tool status: ${item.status}` : "Tool status",
                title: item.status ?? "Tool status",
                onClick: () => onOpen(item, "Tool Call Details"),
                className: `absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-[0.7rem] rounded-tr-[0.9rem] border shadow-sm shadow-stone-950/25 transition sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:rounded-full ${commandStatusBadgeClassName(item.status)} hover:brightness-110`,
                children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.72] sm:scale-100", children: /* @__PURE__ */ jsx7(CommandStatusIcon, { status: item.status }) })
              }
            ),
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Open full tool call",
                onClick: () => onOpen(item, "Tool Call Details"),
                className: "block w-full text-left",
                children: /* @__PURE__ */ jsxs6("div", { className: "flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
var AgentToolCallItem = memo(function AgentToolCallItem2({
  item,
  onOpen
}) {
  const summary = summarizeInlinePreviewText(item.text);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("agentTool")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(AgentToolIcon, {}) })
          }
        ),
        isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7("span", { className: "absolute left-5 top-0 inline-flex sm:hidden", children: /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" }) }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxs6("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: [
            /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-teal-300/25 bg-teal-300/10 text-teal-100", children: /* @__PURE__ */ jsx7(AgentToolIcon, {}) }),
            isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" })
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 pt-6 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": item.status ? `Agent status: ${item.status}` : "Agent status",
                title: item.status ?? "Agent status",
                onClick: () => onOpen(item, "Agent Details"),
                className: `absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-[0.7rem] rounded-tr-[0.9rem] border shadow-sm shadow-stone-950/25 transition sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:rounded-full ${commandStatusBadgeClassName(item.status)} hover:brightness-110`,
                children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.72] sm:scale-100", children: /* @__PURE__ */ jsx7(CommandStatusIcon, { status: item.status }) })
              }
            ),
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Open agent details",
                onClick: () => onOpen(item, "Agent Details"),
                className: "block w-full text-left",
                children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-line flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
var SkillToolCallItem = memo(function SkillToolCallItem2({
  item,
  onOpen
}) {
  const summary = summarizeInlinePreviewText(item.text);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("skillTool")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(SkillToolIcon, {}) })
          }
        ),
        isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7("span", { className: "absolute left-5 top-0 inline-flex sm:hidden", children: /* @__PURE__ */ jsx7(RunningDots, { tone: "sky" }) }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxs6("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: [
            /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-indigo-300/25 bg-indigo-300/10 text-indigo-100", children: /* @__PURE__ */ jsx7(SkillToolIcon, {}) }),
            isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7(RunningDots, { tone: "sky" })
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 pt-6 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": item.status ? `Skill status: ${item.status}` : "Skill status",
                title: item.status ?? "Skill status",
                onClick: () => onOpen(item, "Skill Details"),
                className: `absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-[0.7rem] rounded-tr-[0.9rem] border shadow-sm shadow-stone-950/25 transition sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:rounded-full ${commandStatusBadgeClassName(item.status)} hover:brightness-110`,
                children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.72] sm:scale-100", children: /* @__PURE__ */ jsx7(CommandStatusIcon, { status: item.status }) })
              }
            ),
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Open skill details",
                onClick: () => onOpen(item, "Skill Details"),
                className: "block w-full text-left",
                children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-line flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
var CommandGroupItem = memo(function CommandGroupItem2({
  items,
  expanded,
  onToggleExpanded,
  onOpen
}) {
  const runningCount = items.filter((item) => isRunningHistoryStatus(item.status)).length;
  const countLabel = items.length === 1 ? "1 command" : `${items.length} commands`;
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-event timeline-mobile-dense-command relative min-w-0 w-full overflow-hidden rounded-[1rem] border timeline-special-warning px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3", children: [
    /* @__PURE__ */ jsx7(
      "span",
      {
        className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("command")}`,
        children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(CommandBatchIcon, {}) })
      }
    ),
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsxs6("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: [
        /* @__PURE__ */ jsxs6("span", { className: "relative inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border border-amber-300/30 bg-amber-300/[0.14] text-amber-100 shadow-sm shadow-stone-950/20", children: [
          /* @__PURE__ */ jsx7(CommandBatchIcon, {}),
          /* @__PURE__ */ jsx7("span", { className: "absolute -right-1 -top-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full border border-amber-200/35 bg-stone-950/90 px-1 text-[9px] font-semibold leading-4 text-amber-100", children: items.length })
        ] }),
        runningCount > 0 && /* @__PURE__ */ jsx7(RunningDots, {})
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "timeline-batch-inner timeline-mobile-dense-batch timeline-mobile-bubble-content min-w-0 flex-1 rounded-[0.9rem] border px-2 py-1.5 sm:rounded-xl sm:px-3 sm:py-2", children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            "aria-expanded": expanded,
            "aria-label": `${expanded ? "Collapse" : "Expand"} ${items.length} command entries`,
            onClick: onToggleExpanded,
            className: "timeline-mobile-dense-toggle flex w-full min-w-0 items-center justify-between gap-3 text-left",
            children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-summary min-w-0 flex flex-1 flex-wrap items-center gap-2 pr-1", children: [
              /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-amber-300/28 bg-amber-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-amber-100", children: "Batch" }),
              /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: countLabel }),
              runningCount > 0 && /* @__PURE__ */ jsx7("span", { className: "inline-flex items-center text-xs text-amber-100/90", children: /* @__PURE__ */ jsx7(RunningDots, {}) })
            ] })
          }
        ),
        expanded && /* @__PURE__ */ jsx7("div", { className: "timeline-mobile-section-list mt-3 space-y-0 border-t border-amber-300/12 pt-3 sm:space-y-2", children: items.map((item, index) => {
          const summary = summarizeInlinePreviewText(item.text);
          return /* @__PURE__ */ jsxs6(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped command ${index + 1}`,
              onClick: () => onOpen(item, `Command Output ${index + 1}`),
              className: "timeline-detail-row block w-full rounded-xl border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs6("span", { className: "rounded-full border border-amber-300/18 bg-amber-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-amber-100", children: [
                    "Step ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs6("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        }) })
      ] })
    ] })
  ] });
});
var SearchGroupItem = memo(function SearchGroupItem2({
  items,
  expanded,
  onToggleExpanded,
  onOpen
}) {
  const countLabel = items.length === 1 ? "1 search" : `${items.length} searches`;
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-event timeline-mobile-dense-search relative min-w-0 w-full overflow-hidden rounded-[1rem] border timeline-special-info px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3", children: [
    /* @__PURE__ */ jsx7(
      "span",
      {
        className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("search")}`,
        children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(SearchBatchIcon, {}) })
      }
    ),
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsxs6("span", { className: "relative inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border border-sky-300/30 bg-sky-300/[0.14] text-sky-100 shadow-sm shadow-stone-950/20", children: [
        /* @__PURE__ */ jsx7(SearchBatchIcon, {}),
        /* @__PURE__ */ jsx7("span", { className: "absolute -right-1 -top-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full border border-sky-200/35 bg-stone-950/90 px-1 text-[9px] font-semibold leading-4 text-sky-100", children: items.length })
      ] }) }),
      /* @__PURE__ */ jsxs6("div", { className: "timeline-batch-inner timeline-mobile-dense-batch timeline-mobile-bubble-content min-w-0 flex-1 rounded-[0.9rem] border px-2 py-1.5 sm:rounded-xl sm:px-3 sm:py-2", children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            "aria-expanded": expanded,
            "aria-label": `${expanded ? "Collapse" : "Expand"} ${items.length} web search entries`,
            onClick: onToggleExpanded,
            className: "timeline-mobile-dense-toggle flex w-full min-w-0 items-center justify-between gap-3 text-left",
            children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-summary min-w-0 flex flex-1 flex-wrap items-center gap-2 pr-1", children: [
              /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-sky-300/28 bg-sky-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-sky-100", children: "Batch" }),
              /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: countLabel })
            ] })
          }
        ),
        expanded && /* @__PURE__ */ jsx7("div", { className: "timeline-mobile-section-list mt-3 space-y-0 border-t border-sky-300/12 pt-3 sm:space-y-2", children: items.map((item, index) => {
          const previewText = item.previewText?.trim() || item.text || "Web search";
          const summary = summarizeInlinePreviewText(previewText);
          const detailText = item.detailText?.trim() || item.text || "Web search";
          return /* @__PURE__ */ jsxs6(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped web search ${index + 1}`,
              onClick: () => onOpen(`Web Search ${index + 1}`, detailText),
              className: "timeline-detail-row block w-full rounded-xl border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs6("span", { className: "rounded-full border border-sky-300/18 bg-sky-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-sky-100", children: [
                    "Search ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs6("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        }) })
      ] })
    ] })
  ] });
});
var FileReadGroupItem = memo(function FileReadGroupItem2({
  items,
  expanded,
  onToggleExpanded,
  onOpen
}) {
  const countLabel = items.length === 1 ? "1 file read" : `${items.length} file reads`;
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-event timeline-mobile-dense-file-read relative min-w-0 w-full overflow-hidden rounded-[1rem] border timeline-special-file-read px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3", children: [
    /* @__PURE__ */ jsx7(
      "span",
      {
        className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("fileRead")}`,
        children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(FileReadIcon, {}) })
      }
    ),
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsxs6("span", { className: "relative inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border border-cyan-300/30 bg-cyan-300/[0.14] text-cyan-100 shadow-sm shadow-stone-950/20", children: [
        /* @__PURE__ */ jsx7(FileReadIcon, {}),
        /* @__PURE__ */ jsx7("span", { className: "absolute -right-1 -top-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full border border-cyan-200/35 bg-stone-950/90 px-1 text-[9px] font-semibold leading-4 text-cyan-100", children: items.length })
      ] }) }),
      /* @__PURE__ */ jsxs6("div", { className: "timeline-batch-inner timeline-mobile-dense-batch timeline-mobile-bubble-content min-w-0 flex-1 rounded-[0.9rem] border px-2 py-1.5 sm:rounded-xl sm:px-3 sm:py-2", children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            "aria-expanded": expanded,
            "aria-label": `${expanded ? "Collapse" : "Expand"} ${items.length} file read entries`,
            onClick: onToggleExpanded,
            className: "timeline-mobile-dense-toggle flex w-full min-w-0 items-center justify-between gap-3 text-left",
            children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-summary min-w-0 flex flex-1 flex-wrap items-center gap-2 pr-1", children: [
              /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-cyan-300/28 bg-cyan-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100", children: "Batch" }),
              /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: countLabel })
            ] })
          }
        ),
        expanded && /* @__PURE__ */ jsx7("div", { className: "timeline-mobile-section-list mt-3 space-y-0 border-t border-cyan-300/12 pt-3 sm:space-y-2", children: items.map((item, index) => {
          const previewText = item.previewText?.trim() || item.text || "File read";
          const summary = summarizeInlinePreviewText(previewText);
          const detailText = item.detailText?.trim() || item.text || "File read";
          return /* @__PURE__ */ jsxs6(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped file read ${index + 1}`,
              onClick: () => onOpen(`File Read ${index + 1}`, detailText),
              className: "timeline-detail-row block w-full rounded-xl border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs6("span", { className: "rounded-full border border-cyan-300/18 bg-cyan-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-100", children: [
                    "Read ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs6("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        }) })
      ] })
    ] })
  ] });
});
var PlanHistoryItem = memo(function PlanHistoryItem2({
  item,
  scrollRootRef
}) {
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame relative min-w-0 w-full overflow-hidden rounded-[1rem] border border-stone-800/80 ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("search")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(PlanIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: historyItemLabel(item.kind) }),
          item.status && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-xs", children: item.status })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "mt-1.5", children: /* @__PURE__ */ jsx7(
          MarkdownAwareBody,
          {
            text: item.text,
            scrollRootRef,
            plainTextClassName: "whitespace-pre-wrap break-words text-sm leading-6 text-stone-300",
            markdownClassName: "agent-markdown text-sm"
          }
        ) })
      ]
    }
  );
});
var ContextCompactionItem = memo(function ContextCompactionItem2({
  item
}) {
  const isRunning = isRunningHistoryStatus(item.status) || item.text === "Compacting context";
  const primaryText = isRunning ? "Compacting context" : "Context compacted";
  const secondaryText = item.detailText && item.detailText !== primaryText ? item.detailText : null;
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame relative min-w-0 w-full overflow-hidden rounded-[1rem] border border-stone-800/80 ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: "absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border border-teal-300/30 bg-teal-300/12 text-[10px] text-teal-100 shadow-sm shadow-stone-950/20 sm:hidden",
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(ContextCompactionIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex min-w-0 items-center gap-2 pt-2 sm:pt-0", children: [
          /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 sm:flex", children: /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-teal-300/25 bg-teal-300/10 text-teal-100", children: /* @__PURE__ */ jsx7(ContextCompactionIcon, {}) }) }),
          /* @__PURE__ */ jsxs6("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs6("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text truncate text-[13px] font-medium sm:text-sm", children: primaryText }),
              isRunning ? /* @__PURE__ */ jsx7(RunningDots, { tone: "emerald" }) : null
            ] }),
            secondaryText ? /* @__PURE__ */ jsx7(
              "p",
              {
                className: "timeline-meta-text mt-0.5 truncate text-[11px] sm:text-xs",
                title: secondaryText,
                children: secondaryText
              }
            ) : null
          ] })
        ] })
      ]
    }
  );
});
var WebSearchItem = memo(function WebSearchItem2({
  item,
  onOpen
}) {
  const previewText = item.previewText?.trim() || item.text || "Web search";
  const detailText = item.detailText?.trim() || item.text || "Web search";
  const summary = summarizeInlinePreviewText(previewText);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event timeline-mobile-dense-search relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("search")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(SearchIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-300/25 bg-sky-300/10 text-sky-100", children: /* @__PURE__ */ jsx7(SearchIcon, {}) }) }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 pt-6 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Expand web search",
                title: "Expand web search",
                onClick: () => onOpen("Web Search Details", detailText),
                className: `absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-[0.7rem] rounded-tr-[0.9rem] border shadow-sm shadow-stone-950/25 transition sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:rounded-full ${overlayBadgeClassName("action")} hover:bg-stone-800`,
                children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.72] sm:scale-100", children: /* @__PURE__ */ jsx7(ExpandIcon, {}) })
              }
            ),
            item.status && /* @__PURE__ */ jsx7("p", { className: "timeline-meta-text pr-8 text-xs sm:pr-10", children: item.status }),
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Open full web search",
                onClick: () => onOpen("Web Search Details", detailText),
                className: "block w-full text-left",
                children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-line flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
var FileReadItem = memo(function FileReadItem2({
  item,
  onOpen
}) {
  const previewText = item.previewText?.trim() || item.text || "File read";
  const detailText = item.detailText?.trim() || item.text || "File read";
  const summary = summarizeInlinePreviewText(previewText);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event timeline-mobile-dense-file-read relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("fileRead")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(FileReadIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100", children: /* @__PURE__ */ jsx7(FileReadIcon, {}) }) }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Expand file read",
                title: "Expand file read",
                onClick: () => onOpen("File Read Details", detailText),
                className: `absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-bl-[0.7rem] rounded-tr-[0.9rem] border shadow-sm shadow-stone-950/25 transition sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:rounded-full ${overlayBadgeClassName("action")} hover:bg-stone-800`,
                children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.72] sm:scale-100", children: /* @__PURE__ */ jsx7(ExpandIcon, {}) })
              }
            ),
            /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": "Open full file read",
                onClick: () => onOpen("File Read Details", detailText),
                className: "block w-full pr-8 text-left sm:pr-10",
                children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-line flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
var ImageItem = memo(function ImageItem2({
  threadId,
  item,
  onOpen,
  getImageAssetUrl
}) {
  const assetPath = item.assetPath ?? item.detailText ?? null;
  const imageUrl = threadId && assetPath ? getImageAssetUrl?.({ threadId, path: assetPath }) ?? null : null;
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("search")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(ImageIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-indigo-300/25 bg-indigo-300/10 text-indigo-100", children: /* @__PURE__ */ jsx7(ImageIcon, {}) }) }),
          /* @__PURE__ */ jsxs6("div", { className: "min-w-0 w-full flex-1", children: [
            imageUrl ? /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                onClick: () => onOpen("Image Path", assetPath ?? item.text),
                className: "block w-full text-left",
                children: /* @__PURE__ */ jsx7(
                  "img",
                  {
                    src: imageUrl,
                    alt: item.text || "Image preview",
                    className: "max-h-[24rem] w-full rounded-xl border border-stone-700/80 bg-stone-950 object-contain",
                    loading: "lazy"
                  }
                )
              }
            ) : /* @__PURE__ */ jsx7("div", { className: "timeline-item-inner rounded-xl border px-3 py-3 text-sm", children: item.text }),
            assetPath && /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                onClick: () => onOpen("Image Path", assetPath),
                className: "timeline-meta-text mt-2 block max-w-full truncate text-left text-xs hover:text-[var(--theme-fg)]",
                title: assetPath,
                children: assetPath
              }
            ),
            item.status && /* @__PURE__ */ jsx7("p", { className: "timeline-meta-text mt-1 text-xs", children: item.status })
          ] })
        ] })
      ]
    }
  );
});
var FileChangeItem = memo(function FileChangeItem2({
  item,
  onOpen
}) {
  const pathSummary = item.previewText?.trim() && item.text.trim() !== item.previewText.trim() ? item.text.trim() : null;
  const detailText = item.detailText?.trim() || null;
  const displayedPath = formatTrailingPathLabel(
    pathSummary ?? item.previewText?.trim() ?? item.text,
    48
  );
  const summarySegments = fileChangeSummarySegments(item);
  const canOpen = Boolean(detailText || item.hasDeferredDetail);
  const ContainerTag = canOpen ? "button" : "div";
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event timeline-mobile-dense-file relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("action")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(FileChangeIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-lime-300/25 bg-lime-300/10 text-lime-100", children: /* @__PURE__ */ jsx7(FileChangeIcon, {}) }) }),
          /* @__PURE__ */ jsx7(
            ContainerTag,
            {
              ...canOpen ? {
                type: "button",
                "aria-label": "Open file change details",
                onClick: () => onOpen("File Change Details", detailText ?? item.text)
              } : {},
              className: `timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content min-w-0 flex-1 rounded-[0.9rem] border px-2.5 py-2 text-left sm:rounded-xl sm:px-3 ${canOpen ? "transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]" : ""}`,
              children: /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-file-line flex min-w-0 items-center gap-2", children: [
                /* @__PURE__ */ jsx7(
                  "span",
                  {
                    className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip text-sm",
                    title: pathSummary ?? displayedPath,
                    children: displayedPath
                  }
                ),
                summarySegments.length > 0 && /* @__PURE__ */ jsx7("div", { className: "inline-flex shrink-0 items-center justify-end gap-1.5 text-xs", children: summarySegments.map((segment) => /* @__PURE__ */ jsx7(
                  "span",
                  {
                    className: `timeline-delta-badge border ${segment.startsWith("+") ? "timeline-delta-badge-add text-emerald-300" : segment.startsWith("-") ? "timeline-delta-badge-remove text-rose-300" : "timeline-delta-badge-neutral"}`,
                    children: segment
                  },
                  segment
                )) })
              ] })
            }
          )
        ] })
      ]
    }
  );
});
var FileChangeGroupItem = memo(function FileChangeGroupItem2({
  items,
  expanded,
  onToggleExpanded,
  onOpen
}) {
  const changedFiles = items.reduce(
    (sum, item) => sum + (item.changedFiles ?? 0),
    0
  );
  const addedLines = items.reduce((sum, item) => sum + (item.addedLines ?? 0), 0);
  const removedLines = items.reduce((sum, item) => sum + (item.removedLines ?? 0), 0);
  const batchLabel = items.length === 1 ? "1 file change" : `${items.length} file changes`;
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-event timeline-mobile-dense-file relative min-w-0 w-full overflow-hidden rounded-[1rem] border timeline-special-success px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3", children: [
    /* @__PURE__ */ jsx7(
      "span",
      {
        className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("action")}`,
        children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(FileChangeIcon, {}) })
      }
    ),
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsx7("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: /* @__PURE__ */ jsxs6("span", { className: "relative inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border border-lime-300/30 bg-lime-300/[0.14] text-lime-100 shadow-sm shadow-stone-950/20", children: [
        /* @__PURE__ */ jsx7(FileChangeIcon, {}),
        /* @__PURE__ */ jsx7("span", { className: "absolute -right-1 -top-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full border border-lime-200/35 bg-stone-950/90 px-1 text-[9px] font-semibold leading-4 text-lime-100", children: items.length })
      ] }) }),
      /* @__PURE__ */ jsxs6("div", { className: "timeline-batch-inner timeline-mobile-dense-batch timeline-mobile-bubble-content min-w-0 flex-1 rounded-[0.9rem] border px-2 py-1.5 sm:rounded-xl sm:px-3 sm:py-2", children: [
        /* @__PURE__ */ jsxs6(
          "button",
          {
            type: "button",
            "aria-expanded": expanded,
            "aria-label": `${expanded ? "Collapse" : "Expand"} ${items.length} file change entries`,
            onClick: onToggleExpanded,
            className: "timeline-mobile-dense-toggle flex w-full min-w-0 items-center justify-between gap-3 text-left",
            children: [
              /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-summary min-w-0 flex flex-1 flex-wrap items-center gap-2 pr-1", children: [
                /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-lime-300/28 bg-lime-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-lime-100", children: "Batch" }),
                /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: batchLabel }),
                changedFiles > 0 && /* @__PURE__ */ jsxs6("span", { className: "timeline-meta-text text-xs", children: [
                  changedFiles,
                  " files"
                ] })
              ] }),
              /* @__PURE__ */ jsxs6("span", { className: "inline-flex shrink-0 items-center gap-1.5", children: [
                addedLines > 0 && /* @__PURE__ */ jsxs6("span", { className: "timeline-delta-badge timeline-delta-badge-add rounded-full border px-1.5 py-0.5 text-[11px] font-medium", children: [
                  "+",
                  addedLines
                ] }),
                removedLines > 0 && /* @__PURE__ */ jsxs6("span", { className: "timeline-delta-badge timeline-delta-badge-remove rounded-full border px-1.5 py-0.5 text-[11px] font-medium", children: [
                  "-",
                  removedLines
                ] })
              ] })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsx7("div", { className: "timeline-mobile-section-list mt-3 space-y-0 border-t border-lime-300/12 pt-3 sm:space-y-2", children: items.map((item, index) => {
          const detailText = item.detailText?.trim() || item.previewText?.trim() || item.text;
          const pathSummary = item.previewText?.trim() && item.text.trim() !== item.previewText.trim() ? item.text.trim() : item.previewText?.trim() || item.text;
          return /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped file change ${index + 1}`,
              onClick: () => onOpen(`File Change ${index + 1}`, detailText),
              className: "timeline-detail-row block w-full rounded-xl border px-3 py-2 text-left transition",
              children: /* @__PURE__ */ jsxs6("div", { className: "flex min-w-0 items-center gap-2", children: [
                /* @__PURE__ */ jsx7("span", { className: "timeline-primary-text min-w-0 flex-1 text-sm leading-6", title: pathSummary, children: formatTrailingPathLabel(pathSummary, 34) }),
                /* @__PURE__ */ jsxs6("span", { className: "inline-flex shrink-0 items-center gap-1.5", children: [
                  (item.addedLines ?? 0) > 0 && /* @__PURE__ */ jsxs6("span", { className: "timeline-delta-badge timeline-delta-badge-add rounded-full border px-1.5 py-0.5 text-[11px] font-medium", children: [
                    "+",
                    item.addedLines
                  ] }),
                  (item.removedLines ?? 0) > 0 && /* @__PURE__ */ jsxs6("span", { className: "timeline-delta-badge timeline-delta-badge-remove rounded-full border px-1.5 py-0.5 text-[11px] font-medium", children: [
                    "-",
                    item.removedLines
                  ] })
                ] })
              ] })
            },
            item.id
          );
        }) })
      ] })
    ] })
  ] });
});
var GenericHistoryItem = memo(function GenericHistoryItem2({
  item
}) {
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame relative min-w-0 w-full overflow-hidden rounded-[1rem] border border-stone-800/80 ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("action")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(ToolCallIcon, {}) })
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center justify-between gap-1.5 leading-none", children: [
          /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-[10px] uppercase tracking-[0.16em]", children: historyItemLabel(item.kind) }),
          item.status && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-[10px]", children: item.status })
        ] }),
        /* @__PURE__ */ jsx7(
          "pre",
          {
            className: `timeline-soft-text mt-1 whitespace-pre-wrap break-words text-[13px] leading-5 ${isScrollableHistoryItem(item.kind) ? "max-h-56 overflow-auto" : ""}`,
            children: /* @__PURE__ */ jsx7(LinkifiedPlainText, { text: item.text })
          }
        )
      ]
    }
  );
});
var ArtifactHistoryItem = memo(function ArtifactHistoryItem2({
  item,
  onSelect
}) {
  const plugins = usePlugins();
  const [expanded, setExpanded] = useState4(false);
  const artifact = item.artifact;
  const rendered = artifact ? plugins.renderArtifact({
    artifact,
    expanded,
    onToggleExpanded: () => setExpanded((current) => !current)
  }) : null;
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center justify-between gap-1.5 leading-none", children: [
          /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-[10px] uppercase tracking-[0.16em]", children: artifact?.type ?? historyItemLabel(item.kind) }),
          /* @__PURE__ */ jsxs6("span", { className: "inline-flex items-center gap-2", children: [
            artifact && !plugins.hasRendererForArtifact(artifact) && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-[10px]", children: "No renderer" }),
            artifact && onSelect ? /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                "aria-label": `Open artifact inspector for ${artifact.title}`,
                onClick: () => onSelect(item, artifact),
                className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
                children: "Inspect"
              }
            ) : null
          ] })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "mt-2", children: rendered ?? /* @__PURE__ */ jsxs6("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs6(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((current) => !current),
              className: "flex w-full items-center justify-between gap-3 text-left",
              children: [
                /* @__PURE__ */ jsxs6("span", { children: [
                  /* @__PURE__ */ jsx7("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: artifact?.title ?? item.text }),
                  /* @__PURE__ */ jsx7("span", { className: "mt-1 block text-xs text-[var(--theme-fg-muted)]", children: artifact?.summaryText ?? item.previewText ?? item.text })
                ] }),
                /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: expanded ? "Hide" : "Open" })
              ]
            }
          ),
          expanded && /* @__PURE__ */ jsx7("pre", { className: "max-h-80 overflow-auto rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] p-3 text-xs text-[var(--theme-fg-soft)]", children: JSON.stringify(artifact?.payload ?? item, null, 2) })
        ] }) })
      ]
    }
  );
});
var HookItem = memo(function HookItem2({
  item
}) {
  const outputText = item.hookOutputEntries?.map((entry) => entry.text.trim()).filter(Boolean).join("\n").trim() ?? "";
  const hookLabel = item.hookEventLabel ? `${item.hookEventLabel} hook` : item.text;
  const fallbackText = item.hookStatusMessage?.trim() || (item.previewText && item.previewText !== item.hookStatusMessage ? item.previewText.trim() : "") || item.text.trim();
  const summaryText = outputText || (fallbackText && fallbackText !== hookLabel ? fallbackText : hookLabel);
  const summary = summarizeInlinePreviewText(summaryText);
  const showGap = Boolean(outputText && summary.showGap);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `timeline-item-frame timeline-mobile-dense-event relative min-w-0 w-full overflow-hidden rounded-[1rem] border ${historyItemAccentClassName(item.kind)} ${itemSurfaceClassName(item.kind)} px-2.5 py-2.5 sm:rounded-[1.2rem] sm:px-3`,
      children: [
        /* @__PURE__ */ jsx7(
          "span",
          {
            className: `absolute left-0 top-0 z-[1] inline-flex h-5 w-5 items-center justify-center rounded-br-[0.7rem] rounded-tl-[0.95rem] border text-[10px] shadow-sm shadow-stone-950/20 sm:hidden ${overlayBadgeClassName("action")}`,
            children: /* @__PURE__ */ jsx7("span", { className: "scale-[0.78]", children: /* @__PURE__ */ jsx7(HookIcon, {}) })
          }
        ),
        isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7("span", { className: "absolute left-5 top-0 inline-flex sm:hidden", children: /* @__PURE__ */ jsx7(RunningDots, {}) }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxs6("div", { className: "mt-0.5 hidden shrink-0 items-center sm:flex", children: [
            /* @__PURE__ */ jsx7("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 text-fuchsia-200", children: /* @__PURE__ */ jsx7(HookIcon, {}) }),
            isRunningHistoryStatus(item.status) && /* @__PURE__ */ jsx7(RunningDots, {})
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "timeline-item-inner timeline-mobile-dense-inner timeline-mobile-bubble-content relative min-w-0 w-full flex-1 rounded-[0.9rem] border px-2.5 py-2.5 pt-6 sm:rounded-xl sm:px-3 sm:py-2", children: [
            /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center justify-between gap-1.5 leading-none", children: [
              /* @__PURE__ */ jsxs6("span", { className: "timeline-meta-text min-w-0 truncate text-[10px] uppercase tracking-[0.16em]", children: [
                "Hook \xB7 ",
                item.hookEventLabel ?? item.text
              ] }),
              item.status && /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text text-[10px]", children: item.status })
            ] }),
            /* @__PURE__ */ jsxs6("div", { className: "timeline-mobile-dense-line mt-1.5 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
              /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: outputText ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
                /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text mr-2 font-sans text-[11px] uppercase tracking-[0.12em]", children: hookLabel }),
                /* @__PURE__ */ jsx7(LinkifiedPlainText, { text: summary.firstLine })
              ] }) : /* @__PURE__ */ jsx7(
                LinkifiedPlainText,
                {
                  text: summary.firstLine && summary.firstLine !== hookLabel ? `${hookLabel} \xB7 ${summary.firstLine}` : hookLabel
                }
              ) }),
              showGap ? /* @__PURE__ */ jsx7("span", { className: "timeline-meta-text shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
            ] })
          ] })
        ] })
      ]
    }
  );
});
var HistoryItemRow = memo(function HistoryItemRow2({
  threadId,
  item,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  adapter
}) {
  if (isCompactChatItem(item.kind)) {
    return /* @__PURE__ */ jsx7(
      CompactMessageItem,
      {
        threadId,
        item,
        scrollRootRef,
        ...adapter ? { adapter } : {}
      }
    );
  }
  if (item.kind === "artifact") {
    return /* @__PURE__ */ jsx7(
      ArtifactHistoryItem,
      {
        item,
        ...onSelectArtifact ? {
          onSelect: (nextItem, artifact) => onSelectArtifact({ item: nextItem, artifact })
        } : {}
      }
    );
  }
  if (item.kind === "commandExecution") {
    return /* @__PURE__ */ jsx7(
      CommandItem,
      {
        item,
        onOpen: onOpenCommandDetail
      }
    );
  }
  if (item.kind === "toolCall") {
    return /* @__PURE__ */ jsx7(
      ToolCallItem,
      {
        item,
        onOpen: onOpenToolCallDetail
      }
    );
  }
  if (item.kind === "agentToolCall") {
    return /* @__PURE__ */ jsx7(
      AgentToolCallItem,
      {
        item,
        onOpen: onOpenToolCallDetail
      }
    );
  }
  if (item.kind === "skillToolCall") {
    return /* @__PURE__ */ jsx7(
      SkillToolCallItem,
      {
        item,
        onOpen: onOpenToolCallDetail
      }
    );
  }
  if (item.kind === "webSearch") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "Web search";
    return /* @__PURE__ */ jsx7(
      WebSearchItem,
      {
        item: typedItem,
        onOpen: () => onOpenDeferredHistoryItemDetail(
          typedItem,
          "Web Search Details",
          detailText,
          "Loading full web search details...",
          "Unable to load full web search details."
        )
      }
    );
  }
  if (item.kind === "fileRead") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "File read";
    return /* @__PURE__ */ jsx7(
      FileReadItem,
      {
        item: typedItem,
        onOpen: () => onOpenDeferredHistoryItemDetail(
          typedItem,
          "File Read Details",
          detailText,
          "Loading full file read details...",
          "Unable to load full file read details."
        )
      }
    );
  }
  if (item.kind === "image") {
    return /* @__PURE__ */ jsx7(
      ImageItem,
      {
        threadId,
        item,
        onOpen: onOpenExpandedText,
        getImageAssetUrl: adapter?.getImageAssetUrl
      }
    );
  }
  if (item.kind === "plan") {
    return /* @__PURE__ */ jsx7(
      PlanHistoryItem,
      {
        item,
        scrollRootRef
      }
    );
  }
  if (item.kind === "fileChange") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "File change";
    return /* @__PURE__ */ jsx7(
      FileChangeItem,
      {
        item: typedItem,
        onOpen: () => onOpenDeferredHistoryItemDetail(
          typedItem,
          "File Change Details",
          detailText,
          "Loading full file change details...",
          "Unable to load full file change details."
        )
      }
    );
  }
  if (item.kind === "contextCompaction") {
    return /* @__PURE__ */ jsx7(
      ContextCompactionItem,
      {
        item
      }
    );
  }
  if (item.kind === "hook") {
    return /* @__PURE__ */ jsx7(
      HookItem,
      {
        item
      }
    );
  }
  return /* @__PURE__ */ jsx7(GenericHistoryItem, { item });
});
function PendingRequestCard({
  request,
  busy = false,
  onRespond
}) {
  const [answers, setAnswers] = useState4({});
  const [customAnswers, setCustomAnswers] = useState4({});
  const [selectedPlanDecision, setSelectedPlanDecision] = useState4(null);
  const primaryQuestion = request.questions[0] ?? null;
  const OTHER_SENTINEL = "__other__";
  const cardTitle = request.kind === "planDecision" ? "Plan" : request.kind === "requestUserInput" ? "Answer Required" : request.title;
  function getOptionPresentation(label) {
    const recommended = /\s*\(recommended\)\s*$/i.test(label);
    return {
      rawLabel: label,
      displayLabel: label.replace(/\s*\(recommended\)\s*$/i, "").trim(),
      recommended
    };
  }
  function respondWithSingleAnswer(answer) {
    if (!primaryQuestion) {
      return;
    }
    setSelectedPlanDecision(answer);
    void onRespond?.(request.id, {
      answers: {
        [primaryQuestion.id]: {
          answers: [answer]
        }
      }
    });
  }
  function currentAnswerForQuestion(question) {
    const selected = answers[question.id] ?? "";
    if (Array.isArray(selected)) {
      return selected.map(
        (answer) => answer === OTHER_SENTINEL ? (customAnswers[question.id] ?? "").trim() : answer.trim()
      ).filter(Boolean).join(", ");
    }
    if (selected === OTHER_SENTINEL) {
      return (customAnswers[question.id] ?? "").trim();
    }
    return selected.trim();
  }
  function currentAnswersForQuestion(question) {
    const selected = answers[question.id] ?? "";
    if (Array.isArray(selected)) {
      return selected.map(
        (answer) => answer === OTHER_SENTINEL ? (customAnswers[question.id] ?? "").trim() : answer.trim()
      ).filter(Boolean);
    }
    if (selected === OTHER_SENTINEL) {
      const customAnswer = (customAnswers[question.id] ?? "").trim();
      return customAnswer ? [customAnswer] : [];
    }
    const singleAnswer = selected.trim();
    return singleAnswer ? [singleAnswer] : [];
  }
  function toggleMultiSelectAnswer(questionId, label) {
    setAnswers((current) => {
      const currentAnswers = current[questionId];
      const selectedAnswers = Array.isArray(currentAnswers) ? currentAnswers : [];
      const nextAnswers = selectedAnswers.includes(label) ? selectedAnswers.filter((entry) => entry !== label) : [...selectedAnswers, label];
      return {
        ...current,
        [questionId]: nextAnswers
      };
    });
  }
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-pending-card w-full rounded-[1rem] border px-3 py-3 sm:rounded-[1.2rem] sm:px-4", children: [
    /* @__PURE__ */ jsx7("div", { className: "flex items-center justify-between gap-3", children: /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text text-sm font-medium", children: cardTitle }),
      request.kind !== "planDecision" && request.description && /* @__PURE__ */ jsx7("p", { className: "timeline-soft-text mt-1 text-[13px] leading-5", children: request.description })
    ] }) }),
    /* @__PURE__ */ jsx7("div", { className: "mt-3 space-y-3", children: request.questions.map((question) => /* @__PURE__ */ jsxs6(
      "div",
      {
        className: "timeline-question-section rounded-xl border p-2.5 sm:p-3",
        children: [
          /* @__PURE__ */ jsx7("p", { className: "timeline-meta-text text-xs uppercase tracking-[0.2em]", children: question.header }),
          /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text mt-1 text-[13px] leading-5 sm:text-sm", children: question.question }),
          request.kind === "planDecision" && question.options && question.options.length > 0 ? /* @__PURE__ */ jsx7("div", { className: "mt-3 flex flex-wrap gap-2", children: question.options.map((option, index) => {
            const presentation = getOptionPresentation(option.label);
            const isImplement = presentation.displayLabel.toLowerCase() === "implement";
            return /* @__PURE__ */ jsxs6(
              "button",
              {
                type: "button",
                disabled: busy,
                onClick: () => respondWithSingleAnswer(option.label),
                className: `relative rounded-2xl border px-2.5 py-1.5 pr-6 text-[12px] leading-4 transition sm:text-[13px] ${index === 0 ? "ui-action-info" : "border-stone-700 text-stone-200 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                title: option.description,
                children: [
                  presentation.recommended ? /* @__PURE__ */ jsx7(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "absolute right-1.5 top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/18 text-[10px] leading-none text-current",
                      children: "\u2726"
                    }
                  ) : null,
                  busy && selectedPlanDecision === option.label ? isImplement ? "Starting..." : "Saving..." : presentation.displayLabel
                ]
              },
              option.label
            );
          }) }) : question.options && question.options.length > 0 ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
            /* @__PURE__ */ jsxs6("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              question.options.map((option) => {
                const presentation = getOptionPresentation(option.label);
                const selectedAnswer = answers[question.id];
                return /* @__PURE__ */ jsxs6(
                  "button",
                  {
                    type: "button",
                    disabled: busy,
                    onClick: () => question.multiSelect ? toggleMultiSelectAnswer(question.id, option.label) : setAnswers((current) => ({
                      ...current,
                      [question.id]: option.label
                    })),
                    className: `relative rounded-2xl border px-3 py-1.5 pr-6 text-[12px] leading-4 transition sm:text-[13px] ${(question.multiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option.label) : selectedAnswer === option.label) ? "ui-status-warning" : "border-stone-700 text-stone-300 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                    title: option.description,
                    children: [
                      presentation.recommended ? /* @__PURE__ */ jsx7(
                        "span",
                        {
                          "aria-hidden": "true",
                          className: "absolute right-1.5 top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/10 text-[10px] leading-none text-amber-100/90",
                          children: "\u2726"
                        }
                      ) : null,
                      presentation.displayLabel
                    ]
                  },
                  option.label
                );
              }),
              question.isOther && (() => {
                const selectedAnswer = answers[question.id];
                return /* @__PURE__ */ jsx7(
                  "button",
                  {
                    type: "button",
                    disabled: busy,
                    onClick: () => question.multiSelect ? toggleMultiSelectAnswer(question.id, OTHER_SENTINEL) : setAnswers((current) => ({
                      ...current,
                      [question.id]: OTHER_SENTINEL
                    })),
                    className: `rounded-2xl border px-3 py-1.5 text-[12px] leading-4 transition sm:text-[13px] ${(question.multiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.includes(OTHER_SENTINEL) : selectedAnswer === OTHER_SENTINEL) ? "ui-status-info" : "border-stone-700 text-stone-300 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                    children: "Not from above"
                  }
                );
              })()
            ] }),
            question.isOther && (() => {
              const selectedAnswer = answers[question.id];
              const showOtherInput = question.multiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.includes(OTHER_SENTINEL) : selectedAnswer === OTHER_SENTINEL;
              return showOtherInput ? /* @__PURE__ */ jsx7(
                "input",
                {
                  "aria-label": `${question.header} custom answer`,
                  value: customAnswers[question.id] ?? "",
                  onChange: (event) => setCustomAnswers((current) => ({
                    ...current,
                    [question.id]: event.target.value
                  })),
                  placeholder: "Enter a custom answer",
                  className: "mt-3 w-full rounded-xl border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-sky-300"
                }
              ) : null;
            })()
          ] }) : /* @__PURE__ */ jsx7(
            "input",
            {
              "aria-label": question.header,
              value: answers[question.id] ?? "",
              onChange: (event) => setAnswers((current) => ({
                ...current,
                [question.id]: event.target.value
              })),
              className: "mt-3 w-full rounded-xl border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-amber-300"
            }
          )
        ]
      },
      question.id
    )) }),
    request.kind !== "planDecision" && /* @__PURE__ */ jsx7("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsx7(
      "button",
      {
        type: "button",
        disabled: busy || request.questions.some((question) => !currentAnswerForQuestion(question)),
        onClick: () => void onRespond?.(request.id, {
          answers: Object.fromEntries(
            request.questions.map((question) => [
              question.id,
              {
                answers: currentAnswersForQuestion(question)
              }
            ])
          )
        }),
        className: "ui-action-info rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
        children: busy ? "Submitting..." : "Submit"
      }
    ) })
  ] });
}
function AnsweredRequestNote({
  note
}) {
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-note-card w-full rounded-2xl border px-3 py-2.5", children: [
    /* @__PURE__ */ jsx7("p", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: note.title }),
    /* @__PURE__ */ jsx7("div", { className: "mt-1 space-y-1", children: note.summaryLines.map((line, index) => /* @__PURE__ */ jsxs6(
      "p",
      {
        className: "timeline-primary-text text-[13px] leading-5",
        children: [
          "You selected ",
          line
        ]
      },
      `${note.id}-${index}`
    )) })
  ] });
}
function ActivityNoteCard({
  note,
  onOpenThread,
  onOpenLinkedThread
}) {
  const title = note.kind === "forkCreated" ? "Fork" : note.kind === "forkSource" ? "Fork source" : "System";
  const body = note.kind === "forkCreated" ? `Thread forked from Turn ${note.turnIndex ?? "?"}` : note.kind === "forkSource" ? `Forked from ${note.linkedThreadTitle ?? "source thread"} at Turn ${note.turnIndex ?? "?"}` : note.text ?? "";
  return /* @__PURE__ */ jsxs6("div", { className: "timeline-activity-card w-full rounded-2xl border px-3 py-2.5", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx7("p", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: title }),
      /* @__PURE__ */ jsx7(
        "time",
        {
          dateTime: note.createdAt,
          title: formatLongTimestamp(note.createdAt),
          className: "timeline-meta-text text-[10px]",
          children: formatShortTimestamp(note.createdAt)
        }
      )
    ] }),
    /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text mt-1 text-[13px] leading-5", children: body }),
    note.linkedThreadId ? /* @__PURE__ */ jsx7(
      "button",
      {
        type: "button",
        onClick: () => {
          const linkedThreadId = note.linkedThreadId;
          if (!linkedThreadId) {
            return;
          }
          onOpenLinkedThread?.(linkedThreadId);
          onOpenThread?.(linkedThreadId);
        },
        className: "relative z-10 mt-2 inline-flex cursor-pointer rounded-full border border-amber-300/30 px-3 py-1.5 text-xs text-amber-100 transition hover:bg-amber-300/10",
        children: note.kind === "forkCreated" ? "Open fork" : "Back to source"
      }
    ) : null
  ] });
}
var ThreadTurnRow = memo(function ThreadTurnRow2({
  threadId,
  adapter,
  turn,
  absoluteIndex,
  isCollapsed,
  livePlan,
  liveItems,
  liveOutput,
  forceActive = false,
  onToggleCollapse,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  scrollRootRef,
  articleRef,
  isLatestVisibleTurn = false
}) {
  const hasLiveActivity = Boolean(livePlan) || Boolean(liveOutput) || Boolean(liveItems && liveItems.length > 0);
  const activeForRendering = forceActive || isActiveTurnStatus(turn.status) || hasLiveActivity || isLatestVisibleTurn;
  const activeFooterTurn = activeForRendering && !isActiveTurnStatus(turn.status) ? {
    ...turn,
    status: "inProgress"
  } : turn;
  const mergedItems = useMemo4(
    () => mergeLiveTurnItems(turn.items, liveItems),
    [liveItems, turn.items]
  );
  const displayedLivePlan = useMemo4(
    () => deriveDisplayedLivePlan(livePlan, mergedItems, turn.status),
    [livePlan, mergedItems, turn.status]
  );
  const visibleLiveOutput = useMemo4(
    () => getLiveOutputTailForTurn(liveOutput, mergedItems),
    [liveOutput, mergedItems]
  );
  const preparedItems = useMemo4(
    () => prepareTurnItemsForRendering(mergedItems, activeForRendering),
    [activeForRendering, mergedItems]
  );
  const groupedItems = useMemo4(() => groupTimelineHistoryItems(preparedItems), [preparedItems]);
  const visibleLiveHookPrompt = useMemo4(
    () => parseHookPromptText(visibleLiveOutput),
    [visibleLiveOutput]
  );
  const [expandedGroups, setExpandedGroups] = useState4(
    {}
  );
  const toggleGroupedItem = useCallback2((groupKey) => {
    setExpandedGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey]
    }));
  }, []);
  return /* @__PURE__ */ jsxs6("article", { ref: articleRef, className: "px-2 py-1.5 sm:px-6 sm:py-2", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxs6("div", { className: "min-w-0 flex flex-1 items-start gap-1.5", children: [
        /* @__PURE__ */ jsxs6("div", { className: "min-w-0 flex flex-1 items-center gap-1.5 overflow-hidden", children: [
          /* @__PURE__ */ jsxs6("span", { className: "timeline-meta-text rounded-[0.6rem] border border-stone-700 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em]", children: [
            "Turn ",
            absoluteIndex
          ] }),
          /* @__PURE__ */ jsx7(
            "time",
            {
              dateTime: turn.startedAt ?? void 0,
              title: formatLongTimestamp(turn.startedAt),
              className: "timeline-meta-text shrink-0 text-[10px] sm:text-[11px]",
              children: formatShortTimestamp(turn.startedAt)
            }
          ),
          /* @__PURE__ */ jsx7(TurnStatusBar, { turn }),
          turn.error && /* @__PURE__ */ jsx7("p", { className: "hidden truncate text-[11px] text-rose-200 sm:block", children: turn.error })
        ] }),
        /* @__PURE__ */ jsx7(TurnTokenSummary, { turn })
      ] }),
      /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          "aria-label": `${isCollapsed ? "Expand" : "Collapse"} turn ${absoluteIndex}`,
          title: isCollapsed ? "Expand turn" : "Collapse turn",
          onClick: () => onToggleCollapse(turn.id),
          className: "timeline-compact-action timeline-meta-text inline-flex h-5 w-5 shrink-0 items-center justify-center transition hover:text-[var(--theme-fg)]",
          children: /* @__PURE__ */ jsx7(
            "svg",
            {
              "aria-hidden": "true",
              viewBox: "0 0 16 16",
              className: "h-3.5 w-3.5 fill-none stroke-current",
              strokeWidth: "1.6",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: isCollapsed ? /* @__PURE__ */ jsx7("path", { d: "m4.5 10 3.5-3.5L11.5 10" }) : /* @__PURE__ */ jsx7("path", { d: "m4.5 6 3.5 3.5L11.5 6" })
            }
          )
        }
      )
    ] }),
    turn.error && /* @__PURE__ */ jsx7("p", { className: "mt-1 text-[11px] text-rose-200 sm:hidden", children: turn.error }),
    !isCollapsed && /* @__PURE__ */ jsxs6("div", { className: "mt-1.5 space-y-1.5", children: [
      /* @__PURE__ */ jsx7(
        TimelineHistoryEntries,
        {
          entries: groupedItems,
          expandedGroups,
          onToggleGroupedItem: toggleGroupedItem,
          threadId,
          scrollRootRef,
          onOpenExpandedText,
          onOpenCommandDetail,
          onOpenToolCallDetail,
          onOpenDeferredHistoryItemDetail,
          ...onSelectArtifact ? { onSelectArtifact } : {},
          ...adapter ? { adapter } : {}
        }
      ),
      displayedLivePlan && /* @__PURE__ */ jsxs6("div", { className: "timeline-live-plan-card rounded-[1rem] border px-3 py-3 sm:rounded-[1.2rem]", children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx7("p", { className: "timeline-primary-text text-sm font-medium", children: "Plan update" }),
          /* @__PURE__ */ jsx7("span", { className: "rounded-full border border-sky-300/40 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-200", children: "Live" })
        ] }),
        displayedLivePlan.explanation && /* @__PURE__ */ jsx7("p", { className: "timeline-soft-text mt-3 text-sm", children: displayedLivePlan.explanation }),
        /* @__PURE__ */ jsx7("div", { className: "mt-3 space-y-2", children: displayedLivePlan.plan.map((step, index) => /* @__PURE__ */ jsxs6(
          "div",
          {
            className: "timeline-live-plan-step flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm",
            children: [
              /* @__PURE__ */ jsx7("span", { className: "timeline-primary-text min-w-0 flex-1", children: step.step }),
              /* @__PURE__ */ jsx7(PlanStepStatusIcon, { status: step.status })
            ]
          },
          `${displayedLivePlan.turnId}-${index}`
        )) })
      ] }),
      visibleLiveHookPrompt ? /* @__PURE__ */ jsx7(
        HistoryItemRow,
        {
          threadId,
          item: visibleLiveHookPrompt,
          scrollRootRef,
          onOpenExpandedText,
          onOpenCommandDetail,
          onOpenToolCallDetail,
          onOpenDeferredHistoryItemDetail,
          ...onSelectArtifact ? { onSelectArtifact } : {},
          ...adapter ? { adapter } : {}
        }
      ) : visibleLiveOutput ? /* @__PURE__ */ jsx7(
        CompactMessageItem,
        {
          item: {
            id: "live-agent-message",
            kind: "agentMessage",
            text: visibleLiveOutput
          },
          scrollRootRef,
          streaming: true
        }
      ) : null,
      activeForRendering && /* @__PURE__ */ jsx7(TurnStatusBar, { turn: activeFooterTurn, variant: "footer" })
    ] })
  ] });
});
function TimelineHistoryEntries({
  entries,
  expandedGroups,
  onToggleGroupedItem,
  threadId,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  adapter
}) {
  return /* @__PURE__ */ jsx7(Fragment2, { children: entries.map(
    (entry) => entry.kind === "commandGroup" ? /* @__PURE__ */ jsx7(
      CommandGroupItem,
      {
        items: entry.items,
        expanded: expandedGroups[entry.key] ?? false,
        onToggleExpanded: () => onToggleGroupedItem(entry.key),
        onOpen: onOpenCommandDetail
      },
      entry.key
    ) : entry.kind === "fileChangeGroup" ? /* @__PURE__ */ jsx7(
      FileChangeGroupItem,
      {
        items: entry.items,
        expanded: expandedGroups[entry.key] ?? false,
        onToggleExpanded: () => onToggleGroupedItem(entry.key),
        onOpen: onOpenExpandedText
      },
      entry.key
    ) : entry.kind === "searchGroup" ? /* @__PURE__ */ jsx7(
      SearchGroupItem,
      {
        items: entry.items,
        expanded: expandedGroups[entry.key] ?? false,
        onToggleExpanded: () => onToggleGroupedItem(entry.key),
        onOpen: onOpenExpandedText
      },
      entry.key
    ) : entry.kind === "fileReadGroup" ? /* @__PURE__ */ jsx7(
      FileReadGroupItem,
      {
        items: entry.items,
        expanded: expandedGroups[entry.key] ?? false,
        onToggleExpanded: () => onToggleGroupedItem(entry.key),
        onOpen: onOpenExpandedText
      },
      entry.key
    ) : /* @__PURE__ */ jsx7(
      HistoryItemRow,
      {
        threadId,
        item: entry.item,
        scrollRootRef,
        onOpenExpandedText,
        onOpenCommandDetail,
        onOpenToolCallDetail,
        onOpenDeferredHistoryItemDetail,
        ...onSelectArtifact ? { onSelectArtifact } : {},
        ...adapter ? { adapter } : {}
      },
      entry.key
    )
  ) });
}
function ThreadTimelineComponent({
  threadId,
  turns,
  totalTurnCount,
  pendingRequests = [],
  activeTurnId = null,
  threadRunning = false,
  pendingSteers = [],
  livePlan = null,
  liveItems = null,
  respondingRequestId = null,
  onRespondToRequest,
  liveOutput,
  scrollRequestKey = 0,
  bottomSpacer = 0,
  className = "",
  onTailVisibilityChange,
  loadingEarlier = false,
  onLoadEarlier,
  ephemeralUserNote = null,
  answeredRequestNotes = [],
  activityNotes = [],
  optimisticSteers = [],
  optimisticTurn = null,
  onLoadHistoryItemDetail,
  onOpenThread,
  onSelectArtifact,
  onSelectHistoryItemDetail,
  adapter
}) {
  const scrollContainerRef = useRef3(null);
  const scrollContentRef = useRef3(null);
  const lastHandledScrollRequestKeyRef = useRef3(scrollRequestKey);
  const previousContentRevisionRef = useRef3(null);
  const previousBottomSpacerRef = useRef3(bottomSpacer);
  const lastObservedScrollHeightRef = useRef3(0);
  const lastScrollTopRef = useRef3(0);
  const tailSentinelRef = useRef3(null);
  const topSentinelRef = useRef3(null);
  const isTailVisibleRef = useRef3(true);
  const shouldStickToBottomRef = useRef3(true);
  const userScrolledAwayFromTailRef = useRef3(false);
  const userScrolledHistoryRef = useRef3(false);
  const autoLoadedEarlierRef = useRef3(false);
  const expandedTextRequestIdRef = useRef3(0);
  const deferredDetailCacheRef = useRef3(
    /* @__PURE__ */ new Map()
  );
  const [visibleCount, setVisibleCount] = useState4(INITIAL_VISIBLE_TURNS);
  const [loadMoreClicks, setLoadMoreClicks] = useState4(0);
  const [expandedText, setExpandedText] = useState4(null);
  const [collapsedTurns, setCollapsedTurns] = useState4(
    {}
  );
  const [expandedLooseGroups, setExpandedLooseGroups] = useState4(
    {}
  );
  const [isTailVisible, setIsTailVisible] = useState4(true);
  const loadHistoryItemDetail = adapter?.onLoadHistoryItemDetail ?? onLoadHistoryItemDetail;
  const openLinkedThread = adapter?.onOpenLinkedThread;
  const contentRevision = useChangeRevision([
    turns,
    pendingRequests,
    pendingSteers,
    optimisticSteers,
    liveOutput,
    livePlan,
    liveItems,
    optimisticTurn,
    answeredRequestNotes,
    activityNotes,
    ephemeralUserNote,
    bottomSpacer
  ]);
  const serverManagedHistory = typeof onLoadEarlier === "function" || totalTurnCount !== void 0;
  const handleToggleCollapse = useCallback2((turnId) => {
    setCollapsedTurns((current) => ({
      ...current,
      [turnId]: !current[turnId]
    }));
  }, []);
  const handleToggleLooseGroup = useCallback2((groupKey) => {
    setExpandedLooseGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey]
    }));
  }, []);
  const handleOpenExpandedText = useCallback2((title, text) => {
    setExpandedText({ title, text });
  }, []);
  const handleResolvedHistoryItemDetail = useCallback2(
    (item, detail) => {
      if (onSelectHistoryItemDetail) {
        onSelectHistoryItemDetail({ item, detail });
        return;
      }
      setExpandedText({ title: detail.title, text: detail.text });
    },
    [onSelectHistoryItemDetail]
  );
  const handleOpenCommandDetail = useCallback2(
    async (item, fallbackTitle) => {
      const inlineText = item.detailText?.trim() || item.text || "Command output";
      if (!item.hasDeferredDetail || !loadHistoryItemDetail) {
        handleResolvedHistoryItemDetail(item, {
          id: item.id,
          kind: item.kind,
          title: fallbackTitle,
          text: inlineText
        });
        return;
      }
      const cached = deferredDetailCacheRef.current.get(item.id);
      if (cached) {
        handleResolvedHistoryItemDetail(item, cached);
        return;
      }
      const requestId = expandedTextRequestIdRef.current + 1;
      expandedTextRequestIdRef.current = requestId;
      if (!onSelectHistoryItemDetail) {
        setExpandedText({ title: fallbackTitle, text: "Loading full command output..." });
      }
      try {
        const detail = await loadHistoryItemDetail(item.id);
        deferredDetailCacheRef.current.set(item.id, detail);
        if (expandedTextRequestIdRef.current !== requestId) {
          return;
        }
        handleResolvedHistoryItemDetail(item, detail);
      } catch (caught) {
        if (expandedTextRequestIdRef.current !== requestId) {
          return;
        }
        const text = caught instanceof Error ? caught.message : "Unable to load full command output.";
        handleResolvedHistoryItemDetail(item, {
          id: item.id,
          kind: item.kind,
          title: fallbackTitle,
          text
        });
      }
    },
    [handleResolvedHistoryItemDetail, loadHistoryItemDetail, onSelectHistoryItemDetail]
  );
  const handleOpenToolCallDetail = useCallback2(
    async (item, fallbackTitle) => {
      const inlineText = item.detailText?.trim() || item.text || "Tool call";
      if (!item.hasDeferredDetail || !loadHistoryItemDetail) {
        handleResolvedHistoryItemDetail(item, {
          id: item.id,
          kind: item.kind,
          title: fallbackTitle,
          text: inlineText
        });
        return;
      }
      const cached = deferredDetailCacheRef.current.get(item.id);
      if (cached) {
        handleResolvedHistoryItemDetail(item, cached);
        return;
      }
      const requestId = expandedTextRequestIdRef.current + 1;
      expandedTextRequestIdRef.current = requestId;
      if (!onSelectHistoryItemDetail) {
        setExpandedText({ title: fallbackTitle, text: "Loading full tool call details..." });
      }
      try {
        const detail = await loadHistoryItemDetail(item.id);
        deferredDetailCacheRef.current.set(item.id, detail);
        if (expandedTextRequestIdRef.current !== requestId) {
          return;
        }
        handleResolvedHistoryItemDetail(item, detail);
      } catch (caught) {
        if (expandedTextRequestIdRef.current !== requestId) {
          return;
        }
        const text = caught instanceof Error ? caught.message : "Unable to load full tool call details.";
        handleResolvedHistoryItemDetail(item, {
          id: item.id,
          kind: item.kind,
          title: fallbackTitle,
          text
        });
      }
    },
    [handleResolvedHistoryItemDetail, loadHistoryItemDetail, onSelectHistoryItemDetail]
  );
  const handleOpenDeferredHistoryItemDetail = useCallback2(
    async (item, fallbackTitle, fallbackText, loadingText, errorText) => {
      if (!item.hasDeferredDetail || !loadHistoryItemDetail) {
        setExpandedText({ title: fallbackTitle, text: fallbackText });
        return;
      }
      const cached = deferredDetailCacheRef.current.get(item.id);
      if (cached) {
        setExpandedText({ title: cached.title, text: cached.text });
        return;
      }
      const requestId = expandedTextRequestIdRef.current + 1;
      expandedTextRequestIdRef.current = requestId;
      setExpandedText({ title: fallbackTitle, text: loadingText });
      try {
        const detail = await loadHistoryItemDetail(item.id);
        deferredDetailCacheRef.current.set(item.id, detail);
        if (expandedTextRequestIdRef.current !== requestId) {
          return;
        }
        setExpandedText({ title: detail.title, text: detail.text });
      } catch (caught) {
        if (expandedTextRequestIdRef.current !== requestId) {
          return;
        }
        setExpandedText({
          title: fallbackTitle,
          text: caught instanceof Error ? caught.message : errorText
        });
      }
    },
    [loadHistoryItemDetail]
  );
  const recomputeTailVisibility = useCallback2(() => {
    const container = scrollContainerRef.current;
    const tailSentinel = tailSentinelRef.current;
    if (!container) {
      return;
    }
    const nextIsTailVisible = tailSentinel ? isElementVisible(container, tailSentinel) : isNearBottom(container);
    isTailVisibleRef.current = nextIsTailVisible;
    setIsTailVisible(
      (current) => current === nextIsTailVisible ? current : nextIsTailVisible
    );
  }, []);
  const handleScroll = useCallback2(() => {
    const container = scrollContainerRef.current;
    if (container) {
      userScrolledHistoryRef.current = true;
      const nextScrollTop = container.scrollTop;
      const previousScrollTop = lastScrollTopRef.current;
      const delta = nextScrollTop - previousScrollTop;
      lastScrollTopRef.current = nextScrollTop;
      if (isNearBottom(container, 1)) {
        userScrolledAwayFromTailRef.current = false;
        shouldStickToBottomRef.current = true;
      } else if (delta < -1) {
        userScrolledAwayFromTailRef.current = true;
        shouldStickToBottomRef.current = false;
      } else if (delta > 1) {
        shouldStickToBottomRef.current = !userScrolledAwayFromTailRef.current && isNearBottom(container, FOLLOW_TAIL_THRESHOLD_PX);
      }
    }
    recomputeTailVisibility();
  }, [recomputeTailVisibility]);
  const scrollToBottom = useCallback2(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    container.scrollTop = container.scrollHeight;
    lastScrollTopRef.current = container.scrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    isTailVisibleRef.current = true;
    setIsTailVisible((current) => current ? current : true);
    userScrolledAwayFromTailRef.current = false;
    shouldStickToBottomRef.current = true;
  }, []);
  useLayoutEffect2(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [threadId, scrollToBottom]);
  useEffect5(() => {
    autoLoadedEarlierRef.current = false;
    userScrolledHistoryRef.current = false;
  }, [threadId]);
  useEffect5(() => {
    setVisibleCount((current) => {
      if (current >= turns.length - 1) {
        return turns.length;
      }
      return Math.max(current, INITIAL_VISIBLE_TURNS);
    });
  }, [turns.length]);
  useEffect5(() => {
    const container = scrollContainerRef.current;
    if (container) {
      lastObservedScrollHeightRef.current = container.scrollHeight;
      lastScrollTopRef.current = container.scrollTop;
      if (isNearBottom(container, 1)) {
        userScrolledAwayFromTailRef.current = false;
        shouldStickToBottomRef.current = true;
      } else if (userScrolledAwayFromTailRef.current || !isNearBottom(container, FOLLOW_TAIL_THRESHOLD_PX)) {
        shouldStickToBottomRef.current = false;
      }
    }
    recomputeTailVisibility();
  }, [
    bottomSpacer,
    answeredRequestNotes,
    ephemeralUserNote,
    liveOutput,
    liveItems,
    livePlan,
    pendingRequests.length,
    recomputeTailVisibility,
    turns.length,
    visibleCount
  ]);
  useEffect5(() => {
    const shouldForceScroll = scrollRequestKey !== lastHandledScrollRequestKeyRef.current;
    const contentChanged = previousContentRevisionRef.current !== contentRevision;
    previousContentRevisionRef.current = contentRevision;
    const shouldAutoScroll = shouldForceScroll || contentChanged && shouldStickToBottomRef.current && !userScrolledAwayFromTailRef.current;
    if (!shouldAutoScroll) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    if (scrollRequestKey !== lastHandledScrollRequestKeyRef.current) {
      lastHandledScrollRequestKeyRef.current = scrollRequestKey;
    }
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [
    contentRevision,
    isTailVisible,
    scrollToBottom,
    scrollRequestKey
  ]);
  useEffect5(() => {
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content || typeof ResizeObserver === "undefined") {
      return;
    }
    lastObservedScrollHeightRef.current = container.scrollHeight;
    const observer = new ResizeObserver(() => {
      const nextScrollHeight = container.scrollHeight;
      const previousScrollHeight = lastObservedScrollHeightRef.current;
      lastObservedScrollHeightRef.current = nextScrollHeight;
      if (nextScrollHeight <= previousScrollHeight) {
        return;
      }
      const wasAtBottomBeforeResize = previousScrollHeight > 0 && previousScrollHeight - container.scrollTop - container.clientHeight <= 1;
      if (userScrolledAwayFromTailRef.current || !(shouldStickToBottomRef.current || wasAtBottomBeforeResize || isTailVisibleRef.current)) {
        return;
      }
      window.requestAnimationFrame(() => {
        scrollToBottom();
      });
    });
    observer.observe(content);
    return () => {
      observer.disconnect();
    };
  }, [scrollToBottom]);
  useEffect5(() => {
    if (!shouldStickToBottomRef.current || userScrolledAwayFromTailRef.current) {
      previousBottomSpacerRef.current = bottomSpacer;
      return;
    }
    if (bottomSpacer === previousBottomSpacerRef.current) {
      return;
    }
    previousBottomSpacerRef.current = bottomSpacer;
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [bottomSpacer, scrollToBottom]);
  useEffect5(() => {
    onTailVisibilityChange?.(isTailVisible);
  }, [isTailVisible, onTailVisibilityChange]);
  const effectiveTotalTurnCount = totalTurnCount ?? turns.length;
  const startIndex = serverManagedHistory ? 0 : Math.max(0, turns.length - visibleCount);
  const loadedTurnAbsoluteOffset = serverManagedHistory ? Math.max(0, effectiveTotalTurnCount - turns.length) : 0;
  const visibleTurns = serverManagedHistory ? turns : turns.slice(startIndex);
  const visibleTurnAbsoluteOffset = loadedTurnAbsoluteOffset + startIndex;
  const optimisticAbsoluteIndex = effectiveTotalTurnCount + 1;
  const loadedHiddenCount = serverManagedHistory ? 0 : turns.length - visibleTurns.length;
  const unloadedHiddenCount = serverManagedHistory ? Math.max(0, effectiveTotalTurnCount - turns.length) : 0;
  const hiddenCount = serverManagedHistory ? unloadedHiddenCount + loadedHiddenCount : loadedHiddenCount;
  const showLoadAll = !serverManagedHistory && hiddenCount > 0 && loadMoreClicks >= 2;
  const canLoadEarlierFromServer = serverManagedHistory && unloadedHiddenCount > 0 && loadedHiddenCount === 0 && typeof onLoadEarlier === "function";
  useEffect5(() => {
    const container = scrollContainerRef.current;
    const topSentinel = topSentinelRef.current;
    if (!container || !topSentinel || !canLoadEarlierFromServer || loadingEarlier || autoLoadedEarlierRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!userScrolledHistoryRef.current || loadingEarlier || autoLoadedEarlierRef.current || !entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        autoLoadedEarlierRef.current = true;
        onLoadEarlier?.();
      },
      {
        root: container,
        threshold: 0.01
      }
    );
    observer.observe(topSentinel);
    return () => {
      observer.disconnect();
    };
  }, [canLoadEarlierFromServer, loadingEarlier, onLoadEarlier]);
  const forceLatestTurnActive = threadRunning && (!activeTurnId || !visibleTurns.some((turn) => turn.id === activeTurnId) && optimisticTurn?.id !== activeTurnId);
  const latestVisibleTurnId = optimisticTurn?.id ?? visibleTurns.at(-1)?.id ?? null;
  const shouldForceLatestVisibleTurnActive = forceLatestTurnActive && latestVisibleTurnId !== null;
  const liveItemsAttachedToVisibleTurn = !!liveItems && (visibleTurns.some((turn) => turn.id === liveItems.turnId) || optimisticTurn?.id === liveItems.turnId);
  const liveItemsTargetTurnId = liveItems && liveItemsAttachedToVisibleTurn ? liveItems.turnId : liveItems && shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null;
  const optimisticLiveItems = optimisticTurn && liveItemsTargetTurnId === optimisticTurn.id ? liveItems?.items ?? null : null;
  const hasStructuredLiveItems = (liveItems?.items.length ?? 0) > 0;
  const unattachedLiveItems = liveItems && liveItemsTargetTurnId === null ? liveItems.items : null;
  const unattachedLiveEntries = useMemo4(
    () => groupTimelineHistoryItems(unattachedLiveItems ?? []),
    [unattachedLiveItems]
  );
  const liveOutputAttachedToOptimisticTurn = !!liveOutput && !!optimisticTurn && optimisticTurn.status !== "failed" && !optimisticLiveItems;
  const liveOutputTargetTurnId = liveOutput && visibleTurns.length > 0 ? activeTurnId && visibleTurns.some((turn) => turn.id === activeTurnId) ? activeTurnId : visibleTurns.findLast((turn) => isRunningHistoryStatus(turn.status))?.id ?? (shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null) : null;
  const liveOutputAttachedToVisibleTurn = Boolean(liveOutputTargetTurnId);
  const visibleTurnIds = new Set(visibleTurns.map((turn) => turn.id));
  const notesByTurnId = answeredRequestNotes.reduce(
    (map, note) => {
      if (!note.turnId || !visibleTurnIds.has(note.turnId)) {
        return map;
      }
      const current = map.get(note.turnId) ?? [];
      current.push(note);
      map.set(note.turnId, current);
      return map;
    },
    /* @__PURE__ */ new Map()
  );
  const pendingRequestsByTurnId = pendingRequests.reduce(
    (map, request) => {
      if (!request.turnId || !visibleTurnIds.has(request.turnId)) {
        return map;
      }
      const current = map.get(request.turnId) ?? [];
      current.push(request);
      map.set(request.turnId, current);
      return map;
    },
    /* @__PURE__ */ new Map()
  );
  const queuedSteers = [
    ...pendingSteers.map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: "Accepted",
      createdAt: steer.createdAt
    })),
    ...optimisticSteers.map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: steer.status === "steering" ? "Steering" : null,
      createdAt: steer.createdAt
    }))
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  const unanchoredAnsweredNotes = answeredRequestNotes.filter(
    (note) => !note.turnId || !visibleTurnIds.has(note.turnId)
  );
  const unanchoredPendingRequests = pendingRequests.filter(
    (request) => !request.turnId || !visibleTurnIds.has(request.turnId)
  );
  const requestEntryAnchors = useMemo4(() => {
    const turnSequence = [
      ...visibleTurns.map((turn) => ({
        id: turn.id,
        startedAt: turn.startedAt ?? ""
      })),
      ...optimisticTurn ? [
        {
          id: optimisticTurn.id,
          startedAt: optimisticTurn.startedAt ?? ""
        }
      ] : []
    ];
    const beforeTurnId = /* @__PURE__ */ new Map();
    const trailing = [];
    const entries = [
      ...unanchoredAnsweredNotes.map((note) => ({
        kind: "note",
        id: note.id,
        createdAt: note.createdAt ?? "",
        note
      })),
      ...unanchoredPendingRequests.map((request) => ({
        kind: "request",
        id: request.id,
        createdAt: request.createdAt,
        request
      }))
    ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    for (const entry of entries) {
      const anchor = turnSequence.find(
        (turn) => entry.createdAt && turn.startedAt && entry.createdAt.localeCompare(turn.startedAt) <= 0
      );
      if (!anchor) {
        trailing.push(entry);
        continue;
      }
      const current = beforeTurnId.get(anchor.id) ?? [];
      current.push(entry);
      beforeTurnId.set(anchor.id, current);
    }
    return {
      beforeTurnId,
      trailing
    };
  }, [
    optimisticTurn,
    unanchoredAnsweredNotes,
    unanchoredPendingRequests,
    visibleTurns
  ]);
  const activityNoteAnchors = useMemo4(() => {
    const sortedNotes = [...activityNotes].sort(
      (left, right) => left.createdAt.localeCompare(right.createdAt)
    );
    const turnSequence = [
      ...visibleTurns.map((turn) => ({
        id: turn.id,
        startedAt: turn.startedAt ?? ""
      })),
      ...optimisticTurn ? [
        {
          id: optimisticTurn.id,
          startedAt: optimisticTurn.startedAt ?? ""
        }
      ] : []
    ];
    const leading = [];
    const beforeTurnId = /* @__PURE__ */ new Map();
    const afterTurnId = /* @__PURE__ */ new Map();
    const trailing = [];
    const knownTurnTimes = turnSequence.map((turn) => turn.startedAt).filter((startedAt) => Boolean(startedAt)).sort();
    const latestKnownTurnTime = knownTurnTimes.at(-1) ?? null;
    for (const note of sortedNotes) {
      if (note.anchorTurnId === "__leading__") {
        leading.push(note);
        continue;
      }
      if (note.anchorTurnId) {
        if (turnSequence.some((turn) => turn.id === note.anchorTurnId)) {
          const current2 = afterTurnId.get(note.anchorTurnId) ?? [];
          current2.push(note);
          afterTurnId.set(note.anchorTurnId, current2);
        } else {
          leading.push(note);
        }
        continue;
      }
      const anchor = turnSequence.find(
        (turn) => turn.startedAt && note.createdAt.localeCompare(turn.startedAt) <= 0
      );
      if (!anchor) {
        if (!latestKnownTurnTime || note.createdAt.localeCompare(latestKnownTurnTime) <= 0) {
          leading.push(note);
        } else {
          trailing.push(note);
        }
        continue;
      }
      const current = beforeTurnId.get(anchor.id) ?? [];
      current.push(note);
      beforeTurnId.set(anchor.id, current);
    }
    return {
      leading,
      beforeTurnId,
      afterTurnId,
      trailing
    };
  }, [activityNotes, optimisticTurn, visibleTurns]);
  return /* @__PURE__ */ jsxs6(Fragment2, { children: [
    /* @__PURE__ */ jsx7("section", { className: `flex min-h-0 flex-1 flex-col ${className}`.trim(), children: /* @__PURE__ */ jsx7(
      "div",
      {
        ref: scrollContainerRef,
        "data-testid": "thread-scroll-container",
        onScroll: handleScroll,
        className: "thread-scroll-container min-h-0 flex-1 overflow-y-auto overscroll-contain",
        style: bottomSpacer > 0 ? { paddingBottom: bottomSpacer } : void 0,
        children: /* @__PURE__ */ jsxs6("div", { ref: scrollContentRef, children: [
          /* @__PURE__ */ jsx7("div", { ref: topSentinelRef, "aria-hidden": "true", className: "h-px" }),
          turns.length > 0 && /* @__PURE__ */ jsx7("div", { className: "px-2.5 pb-1 pt-2 sm:px-6 sm:pb-1.5 sm:pt-3", children: /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center gap-2.5 text-xs sm:text-sm", children: [
            hiddenCount > 0 && /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (serverManagedHistory && loadedHiddenCount === 0) {
                    onLoadEarlier?.();
                    return;
                  }
                  setVisibleCount(
                    (current) => Math.min(turns.length, current + LOAD_STEP)
                  );
                  setLoadMoreClicks((current) => current + 1);
                },
                disabled: loadingEarlier,
                className: "rounded-full border border-stone-700 px-2.5 py-1.5 text-stone-300 transition hover:bg-stone-800",
                children: loadingEarlier ? "Loading earlier..." : "Load 10 earlier"
              }
            ),
            showLoadAll && /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                onClick: () => setVisibleCount(turns.length),
                className: "rounded-full border border-amber-300/40 px-2.5 py-1.5 text-amber-200 transition hover:bg-amber-300/10",
                children: "Load full history"
              }
            ),
            /* @__PURE__ */ jsxs6("p", { className: "timeline-meta-text", children: [
              "Showing ",
              visibleTurns.length,
              " of ",
              effectiveTotalTurnCount,
              " turns",
              hiddenCount > 0 ? ` \xB7 ${hiddenCount} earlier hidden${loadedHiddenCount > 0 && unloadedHiddenCount > 0 ? ` (${loadedHiddenCount} loaded)` : ""}` : ""
            ] })
          ] }) }),
          turns.length === 0 && !liveOutput && !optimisticTurn && /* @__PURE__ */ jsx7("div", { className: "timeline-meta-text px-2.5 py-8 text-sm sm:px-6", children: "Send the first prompt to start the thread." }),
          (visibleTurns.length > 0 || optimisticTurn || activityNoteAnchors.leading.length > 0 || activityNoteAnchors.trailing.length > 0) && /* @__PURE__ */ jsxs6("div", { className: "divide-y divide-stone-800/80", children: [
            activityNoteAnchors.leading.length > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-b border-stone-800/80 px-2.5 py-4 sm:px-6", children: activityNoteAnchors.leading.map((note) => /* @__PURE__ */ jsx7(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)) }) : null,
            visibleTurns.map((turn, visibleIndex) => /* @__PURE__ */ jsxs6("div", { children: [
              (activityNoteAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-b border-stone-800/80 px-2.5 py-4 sm:px-6", children: (activityNoteAnchors.beforeTurnId.get(turn.id) ?? []).map((note) => /* @__PURE__ */ jsx7(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)) }) : null,
              (requestEntryAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-b border-stone-800/80 px-2.5 py-4 sm:px-6", children: (requestEntryAnchors.beforeTurnId.get(turn.id) ?? []).map(
                (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx7(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx7(
                  PendingRequestCard,
                  {
                    request: entry.request,
                    busy: respondingRequestId === entry.request.id,
                    onRespond: onRespondToRequest ?? void 0
                  },
                  entry.id
                )
              ) }) : null,
              /* @__PURE__ */ jsx7(
                ThreadTurnRow,
                {
                  threadId,
                  ...adapter ? { adapter } : {},
                  turn,
                  absoluteIndex: visibleTurnAbsoluteOffset + visibleIndex + 1,
                  isCollapsed: collapsedTurns[turn.id] ?? false,
                  livePlan: livePlan?.turnId === turn.id ? livePlan : null,
                  liveItems: liveItemsTargetTurnId === turn.id ? liveItems?.items ?? null : null,
                  liveOutput: liveOutputTargetTurnId === turn.id ? liveOutput : "",
                  forceActive: activeTurnId === turn.id || shouldForceLatestVisibleTurnActive && latestVisibleTurnId === turn.id,
                  onToggleCollapse: handleToggleCollapse,
                  onOpenExpandedText: handleOpenExpandedText,
                  onOpenCommandDetail: handleOpenCommandDetail,
                  onOpenToolCallDetail: handleOpenToolCallDetail,
                  onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
                  ...onSelectArtifact ? { onSelectArtifact } : {},
                  scrollRootRef: scrollContainerRef,
                  articleRef: void 0
                }
              ),
              (activityNoteAnchors.afterTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-t border-stone-800/80 px-2.5 py-4 sm:px-6", children: (activityNoteAnchors.afterTurnId.get(turn.id) ?? []).map((note) => /* @__PURE__ */ jsx7(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)) }) : null,
              notesByTurnId.get(turn.id)?.length || pendingRequestsByTurnId.get(turn.id)?.length ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-t border-stone-800/80 px-2.5 py-4 sm:px-6", children: [
                ...(notesByTurnId.get(turn.id) ?? []).map((note) => ({
                  kind: "note",
                  id: note.id,
                  createdAt: note.createdAt ?? "",
                  note
                })),
                ...(pendingRequestsByTurnId.get(turn.id) ?? []).map((request) => ({
                  kind: "request",
                  id: request.id,
                  createdAt: request.createdAt,
                  request
                }))
              ].sort(
                (left, right) => left.createdAt.localeCompare(right.createdAt)
              ).map(
                (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx7(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx7(
                  PendingRequestCard,
                  {
                    request: entry.request,
                    busy: respondingRequestId === entry.request.id,
                    onRespond: onRespondToRequest ?? void 0
                  },
                  entry.id
                )
              ) }) : null
            ] }, turn.id)),
            optimisticTurn && visibleTurns.every((turn) => turn.id !== optimisticTurn.id) && /* @__PURE__ */ jsxs6(Fragment2, { children: [
              (activityNoteAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-b border-stone-800/80 px-2.5 py-4 sm:px-6", children: (activityNoteAnchors.beforeTurnId.get(optimisticTurn.id) ?? []).map(
                (note) => /* @__PURE__ */ jsx7(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)
              ) }) : null,
              (requestEntryAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-b border-stone-800/80 px-2.5 py-4 sm:px-6", children: (requestEntryAnchors.beforeTurnId.get(optimisticTurn.id) ?? []).map(
                (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx7(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx7(
                  PendingRequestCard,
                  {
                    request: entry.request,
                    busy: respondingRequestId === entry.request.id,
                    onRespond: onRespondToRequest ?? void 0
                  },
                  entry.id
                )
              ) }) : null,
              /* @__PURE__ */ jsx7(
                ThreadTurnRow,
                {
                  threadId,
                  ...adapter ? { adapter } : {},
                  turn: optimisticTurn,
                  absoluteIndex: optimisticAbsoluteIndex,
                  isCollapsed: collapsedTurns[optimisticTurn.id] ?? false,
                  livePlan: null,
                  liveItems: optimisticLiveItems,
                  liveOutput: liveOutputAttachedToOptimisticTurn ? liveOutput : "",
                  forceActive: activeTurnId === optimisticTurn.id || shouldForceLatestVisibleTurnActive && latestVisibleTurnId === optimisticTurn.id,
                  onToggleCollapse: handleToggleCollapse,
                  onOpenExpandedText: handleOpenExpandedText,
                  onOpenCommandDetail: handleOpenCommandDetail,
                  onOpenToolCallDetail: handleOpenToolCallDetail,
                  onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
                  ...onSelectArtifact ? { onSelectArtifact } : {},
                  scrollRootRef: scrollContainerRef
                }
              ),
              (activityNoteAnchors.afterTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-t border-stone-800/80 px-2.5 py-4 sm:px-6", children: (activityNoteAnchors.afterTurnId.get(optimisticTurn.id) ?? []).map(
                (note) => /* @__PURE__ */ jsx7(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)
              ) }) : null
            ] })
          ] }),
          queuedSteers.length > 0 && /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-t border-stone-800/80 px-2.5 py-4 sm:px-6", children: queuedSteers.map((steer) => /* @__PURE__ */ jsx7(
            CompactMessageItem,
            {
              threadId,
              item: {
                id: steer.id,
                kind: "userMessage",
                text: steer.prompt,
                status: steer.status
              },
              scrollRootRef: scrollContainerRef,
              ...adapter ? { adapter } : {}
            },
            steer.id
          )) }),
          (requestEntryAnchors.trailing.length > 0 || activityNoteAnchors.trailing.length > 0) && /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-t border-stone-800/80 px-2.5 py-4 sm:px-6", children: [
            ...activityNoteAnchors.trailing.map((note) => ({
              kind: "activity",
              id: note.id,
              createdAt: note.createdAt,
              note
            })),
            ...requestEntryAnchors.trailing
          ].sort((left, right) => left.createdAt.localeCompare(right.createdAt)).map(
            (entry) => entry.kind === "activity" ? /* @__PURE__ */ jsx7(ActivityNoteCard, { note: entry.note, onOpenThread, onOpenLinkedThread: openLinkedThread }, entry.id) : entry.kind === "note" ? /* @__PURE__ */ jsx7(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx7(
              PendingRequestCard,
              {
                request: entry.request,
                busy: respondingRequestId === entry.request.id,
                onRespond: onRespondToRequest ?? void 0
              },
              entry.id
            )
          ) }),
          ephemeralUserNote && /* @__PURE__ */ jsx7("div", { className: "border-t border-stone-800/80 px-2.5 py-2.5 sm:px-6", children: /* @__PURE__ */ jsx7(
            CompactMessageItem,
            {
              threadId,
              item: {
                id: "ephemeral-plan-decision-note",
                kind: "userMessage",
                text: ephemeralUserNote
              },
              scrollRootRef: scrollContainerRef
            }
          ) }),
          unattachedLiveItems && unattachedLiveItems.length > 0 && /* @__PURE__ */ jsx7("div", { className: "space-y-3 border-t border-stone-800/80 px-2.5 py-2.5 sm:px-6", children: /* @__PURE__ */ jsx7(
            TimelineHistoryEntries,
            {
              entries: unattachedLiveEntries,
              expandedGroups: expandedLooseGroups,
              onToggleGroupedItem: handleToggleLooseGroup,
              threadId,
              scrollRootRef: scrollContainerRef,
              onOpenExpandedText: handleOpenExpandedText,
              onOpenCommandDetail: handleOpenCommandDetail,
              onOpenToolCallDetail: handleOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              ...adapter ? { adapter } : {}
            }
          ) }),
          liveOutput && !liveOutputAttachedToVisibleTurn && !liveOutputAttachedToOptimisticTurn && !hasStructuredLiveItems && /* @__PURE__ */ jsx7("div", { className: "border-t border-stone-800/80 px-2.5 py-2.5 sm:px-6", children: parseHookPromptText(liveOutput) ? /* @__PURE__ */ jsx7(
            HistoryItemRow,
            {
              threadId,
              item: parseHookPromptText(liveOutput),
              scrollRootRef: scrollContainerRef,
              onOpenExpandedText: handleOpenExpandedText,
              onOpenCommandDetail: handleOpenCommandDetail,
              onOpenToolCallDetail: handleOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              ...adapter ? { adapter } : {}
            }
          ) : /* @__PURE__ */ jsx7(
            CompactMessageItem,
            {
              threadId,
              item: {
                id: "live-agent-message-fallback",
                kind: "agentMessage",
                text: liveOutput
              },
              scrollRootRef: scrollContainerRef,
              streaming: true,
              ...adapter ? { adapter } : {}
            }
          ) }),
          /* @__PURE__ */ jsx7(
            "div",
            {
              ref: tailSentinelRef,
              "aria-hidden": "true",
              className: "h-px w-full"
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx7(
      LongTextDialog,
      {
        open: expandedText !== null,
        title: expandedText?.title ?? "Full text",
        text: expandedText?.text ?? "",
        onClose: () => {
          expandedTextRequestIdRef.current += 1;
          setExpandedText(null);
        }
      }
    )
  ] });
}
var ThreadTimeline = memo(ThreadTimelineComponent);

// src/components/ThreadShellPanel.tsx
import {
  forwardRef,
  useCallback as useCallback3,
  useEffect as useEffect6,
  useImperativeHandle,
  useMemo as useMemo5,
  useRef as useRef4,
  useState as useState5
} from "react";
import "xterm/css/xterm.css";
import { Fragment as Fragment3, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function terminalThemeFor(effectiveTheme) {
  return {
    background: effectiveTheme === "light" ? "#f2ede5" : "#0c1117",
    foreground: effectiveTheme === "light" ? "#3f3a36" : "#d6dde6",
    cursor: effectiveTheme === "light" ? "#3f3a36" : "#d6dde6",
    black: effectiveTheme === "light" ? "#d8cfc2" : "#0f1720",
    brightBlack: effectiveTheme === "light" ? "#8a7f73" : "#475569",
    red: "#f87171",
    brightRed: "#fb7185",
    green: effectiveTheme === "light" ? "#16a34a" : "#86efac",
    brightGreen: effectiveTheme === "light" ? "#22c55e" : "#4ade80",
    yellow: "#fbbf24",
    brightYellow: "#fcd34d",
    blue: effectiveTheme === "light" ? "#2563eb" : "#93c5fd",
    brightBlue: effectiveTheme === "light" ? "#3b82f6" : "#60a5fa",
    magenta: effectiveTheme === "light" ? "#7c3aed" : "#c4b5fd",
    brightMagenta: effectiveTheme === "light" ? "#8b5cf6" : "#a78bfa",
    cyan: effectiveTheme === "light" ? "#0891b2" : "#67e8f9",
    brightCyan: effectiveTheme === "light" ? "#06b6d4" : "#22d3ee",
    white: effectiveTheme === "light" ? "#5b5148" : "#e2e8f0",
    brightWhite: effectiveTheme === "light" ? "#2c2723" : "#f8fafc"
  };
}
function statusLabel(status) {
  switch (status) {
    case "not_created":
      return "Not created";
    case "creating":
      return "Creating";
    case "running":
      return "Running";
    case "attached":
      return "Attached";
    case "detached":
      return "Detached";
    case "exited":
      return "Exited";
    case "not_found":
      return "Missing";
    case "workspace_missing":
      return "Workspace missing";
  }
}
function renderShellSnapshot(terminal, snapshot, cursorX, cursorY, paneHeight) {
  const normalizedSnapshot = snapshot.replace(/\r\n/g, "\n");
  const lines = normalizedSnapshot.split("\n");
  if (normalizedSnapshot.endsWith("\n") && lines.at(-1) === "") {
    lines.pop();
  }
  const serializedSnapshot = lines.join("\r\n");
  let frame = serializedSnapshot;
  if (cursorX !== void 0 && cursorY !== void 0) {
    const historyOffset = paneHeight !== void 0 ? Math.max(0, lines.length - paneHeight) : 0;
    const cursorLineIndex = historyOffset + cursorY;
    const linesBelowCursor = Math.max(0, lines.length - cursorLineIndex - 1);
    if (linesBelowCursor > 0) {
      frame += `\x1B[${linesBelowCursor}A`;
    }
    frame += `\r\x1B[${cursorX + 1}G`;
  }
  terminal.reset();
  terminal.write(frame, () => {
    terminal.scrollToBottom();
  });
}
function controlSequenceForLetter(key) {
  if (!/^[a-z]$/i.test(key)) {
    return null;
  }
  return String.fromCharCode(key.toUpperCase().charCodeAt(0) - 64);
}
function getVisibleTerminalText(hostNode) {
  if (!hostNode) {
    return "";
  }
  const rows = Array.from(hostNode.querySelectorAll(".xterm-rows > div")).map((row) => row.textContent ?? "").filter((line, index, items) => line.length > 0 || index < items.length - 1);
  return rows.join("\n").trimEnd();
}
function normalizeShellSnapshot(snapshot) {
  return snapshot.replace(/\r\n/g, "\n");
}
function splitShellSnapshotLines(snapshot) {
  const normalized = normalizeShellSnapshot(snapshot);
  const lines = normalized.split("\n");
  if (normalized.endsWith("\n") && lines.at(-1) === "") {
    lines.pop();
  }
  return lines;
}
function looksLikePromptLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }
  return /(?:[$%#>])\s*$/.test(trimmed);
}
function stripEchoedCommandLine(lines, command) {
  const commandText = command.trim();
  if (!commandText || lines.length === 0) {
    return lines;
  }
  const [firstLine, ...rest] = lines;
  if (firstLine === void 0) {
    return lines;
  }
  const normalizedFirstLine = firstLine.trim();
  if (normalizedFirstLine === commandText || normalizedFirstLine.endsWith(` ${commandText}`) || normalizedFirstLine.endsWith(`$ ${commandText}`) || normalizedFirstLine.endsWith(`% ${commandText}`) || normalizedFirstLine.endsWith(`# ${commandText}`) || normalizedFirstLine.endsWith(`> ${commandText}`)) {
    return rest;
  }
  return lines;
}
function extractCommandOutput(beforeSnapshot, afterSnapshot, command) {
  const beforeLines = splitShellSnapshotLines(beforeSnapshot);
  const afterLines = splitShellSnapshotLines(afterSnapshot);
  let prefix = 0;
  while (prefix < beforeLines.length && prefix < afterLines.length && beforeLines[prefix] === afterLines[prefix]) {
    prefix += 1;
  }
  let suffix = 0;
  while (suffix < beforeLines.length - prefix && suffix < afterLines.length - prefix && beforeLines[beforeLines.length - 1 - suffix] === afterLines[afterLines.length - 1 - suffix]) {
    suffix += 1;
  }
  let addedLines = afterLines.slice(prefix, afterLines.length - suffix);
  addedLines = stripEchoedCommandLine(addedLines, command);
  while (addedLines.length > 0 && addedLines[0]?.trim() === "") {
    addedLines.shift();
  }
  while (addedLines.length > 0 && (addedLines.at(-1)?.trim() === "" || looksLikePromptLine(addedLines.at(-1) ?? ""))) {
    addedLines.pop();
  }
  return addedLines.join("\n").trimEnd();
}
function basenameFromPath(filePath) {
  if (!filePath) {
    return "";
  }
  const normalized = filePath.replace(/[\\/]+$/, "");
  if (!normalized) {
    return "";
  }
  const segments = normalized.split(/[\\/]/).filter(Boolean);
  return segments.at(-1) ?? normalized;
}
function buildPromptLabel(cwdBaseName, envPrefix) {
  const parts = [envPrefix?.trim(), cwdBaseName?.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}
function clampPaneRatio(value) {
  return Math.min(75, Math.max(25, value));
}
function WrenchScrewdriverIcon2() {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 20 20",
      className: "h-4 w-4 fill-current",
      children: [
        /* @__PURE__ */ jsx8(
          "path",
          {
            fillRule: "evenodd",
            d: "M14.5 10C16.9853 10 19 7.98528 19 5.5C19 5.01783 18.9242 4.55338 18.7838 4.11791C18.6792 3.79367 18.2734 3.72683 18.0325 3.96772L15.3402 6.66002C15.2098 6.79041 15.0168 6.84163 14.8466 6.77074C14.1172 6.46695 13.5334 5.88351 13.2292 5.15431C13.1582 4.98403 13.2094 4.79088 13.3398 4.66042L16.0327 1.9676C16.2735 1.72672 16.2067 1.32092 15.8825 1.21636C15.4469 1.07588 14.9823 1 14.5 1C12.0147 1 10 3.01472 10 5.5C10 5.59783 10.0031 5.69494 10.0093 5.79122C10.065 6.66418 9.88174 7.59855 9.20974 8.15855L1.98017 14.1832C1.3591 14.7008 1 15.4674 1 16.2759C1 17.7804 2.21962 19 3.7241 19C4.53256 19 5.29925 18.6409 5.81681 18.0198L11.8414 10.7903C12.4014 10.1183 13.3358 9.93497 14.2088 9.99073C14.3051 9.99688 14.4022 10 14.5 10ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx8("path", { d: "M14.5 11.5C14.6731 11.5 14.8445 11.4927 15.0138 11.4783L18.7678 15.2323C19.7441 16.2086 19.7441 17.7915 18.7678 18.7678C17.7915 19.7441 16.2086 19.7441 15.2323 18.7678L10.8216 14.3571L12.9938 11.7505C13.0455 11.6885 13.1413 11.6131 13.3357 11.5552C13.5378 11.4951 13.805 11.468 14.1132 11.4877C14.2413 11.4959 14.3702 11.5 14.5 11.5Z" }),
        /* @__PURE__ */ jsx8("path", { d: "M6.00003 4.58582L8.33056 6.91635C8.3027 6.95627 8.27496 6.98497 8.24946 7.00622L6.79994 8.21415L4.58582 6.00003H3.30905C3.11966 6.00003 2.94653 5.89303 2.86184 5.72364L1.1612 2.32237C1.06495 2.12987 1.10268 1.89739 1.25486 1.74521L1.74521 1.25486C1.89739 1.10268 2.12987 1.06495 2.32237 1.1612L5.72364 2.86184C5.89303 2.94653 6.00003 3.11966 6.00003 3.30905V4.58582Z" })
      ]
    }
  );
}
function ConnectionIcon({ connected }) {
  if (!connected) {
    return /* @__PURE__ */ jsx8(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        className: "h-4.5 w-4.5 fill-none stroke-current",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /* @__PURE__ */ jsx8("path", { d: "M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" })
      }
    );
  }
  return /* @__PURE__ */ jsx8(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      className: "h-4.5 w-4.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx8("path", { d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" })
    }
  );
}
function ClipboardIcon2() {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx8("path", { d: "M5.5 3.25h5" }),
        /* @__PURE__ */ jsx8("path", { d: "M6.4 2h3.2a.9.9 0 0 1 .9.9v.35h1.3a1.2 1.2 0 0 1 1.2 1.2v7.35a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 11.8V4.45a1.2 1.2 0 0 1 1.2-1.2h1.3V2.9a.9.9 0 0 1 .9-.9Z" })
      ]
    }
  );
}
function ControlIcon({
  label,
  tone = "stone"
}) {
  const toneClassName = tone === "rose" ? "border-rose-300/35 bg-rose-300/14 text-rose-600 dark:text-rose-50" : tone === "sky" ? "border-sky-300/35 bg-sky-300/14 text-sky-600 dark:text-sky-50" : "shell-control-chip border";
  return /* @__PURE__ */ jsx8(
    "span",
    {
      className: `inline-flex min-w-[3.45rem] items-center justify-center rounded-full border px-2.5 py-1.5 text-[11px] font-medium tracking-[0.12em] ${toneClassName}`,
      children: label
    }
  );
}
function shellControlSequence(action) {
  switch (action) {
    case "ctrl_c":
      return "";
    case "ctrl_d":
      return "";
    case "esc":
      return "\x1B";
    case "tab":
      return "	";
    case "up":
      return "\x1B[A";
    case "down":
      return "\x1B[B";
  }
}
var ShellPane = forwardRef(function ShellPane2({
  paneId,
  shell,
  isActive,
  isVisible,
  isMobileShell,
  effectiveTheme,
  workspacePathMissing,
  shellAdapter,
  onActivate,
  onShellUpdate,
  onRuntimeStateChange,
  onFeedback
}, ref) {
  const terminalRef = useRef4(null);
  const fitAddonRef = useRef4(null);
  const socketRef = useRef4(null);
  const viewerIdRef = useRef4(null);
  const shellIdRef = useRef4(null);
  const reconnectTimerRef = useRef4(null);
  const attachTimeoutRef = useRef4(null);
  const attachRetryTimerRef = useRef4(null);
  const intentionalDisconnectRef = useRef4(false);
  const userDisconnectedShellIdRef = useRef4(null);
  const shellSnapshotRef = useRef4("");
  const pendingCommandRef = useRef4(null);
  const lastCommandOutputRef = useRef4("");
  const resizeObserverRef = useRef4(null);
  const lastSentSizeRef = useRef4(null);
  const snapshotCursorRef = useRef4({
    cursorX: void 0,
    cursorY: void 0,
    paneHeight: void 0
  });
  const terminalInitializingRef = useRef4(false);
  const terminalInputSubscriptionRef = useRef4(null);
  const isVisibleRef = useRef4(isVisible);
  const isMobileShellRef = useRef4(isMobileShell);
  const sendShellInputRef = useRef4(() => false);
  const syncTerminalSizeRef = useRef4(
    () => null
  );
  const refreshTerminalLayoutRef = useRef4(() => {
  });
  const attachPromiseRef = useRef4(null);
  const [terminalHostNode, setTerminalHostNode] = useState5(null);
  const [terminalReady, setTerminalReady] = useState5(false);
  const [viewerId, setViewerIdState] = useState5(null);
  const [isConnecting, setIsConnecting] = useState5(false);
  const [connectionError, setConnectionError] = useState5(null);
  const [runtimePromptLabel, setRuntimePromptLabel] = useState5(null);
  const [isCommandRunning, setIsCommandRunning] = useState5(false);
  const [reconnectKey, setReconnectKey] = useState5(0);
  const shellStatus = shell?.status ?? "not_created";
  const canAttachShell = Boolean(
    shell && !workspacePathMissing && shell.status !== "exited" && shell.status !== "not_found"
  );
  const fallbackPromptLabel = useMemo5(
    () => buildPromptLabel(basenameFromPath(shell?.cwd), null),
    [shell?.cwd]
  );
  const promptLabel = runtimePromptLabel ?? fallbackPromptLabel;
  const setViewerId = useCallback3((nextViewerId) => {
    viewerIdRef.current = nextViewerId;
    setViewerIdState(nextViewerId);
  }, []);
  const settleAttachPromise = useCallback3((connected) => {
    const pending = attachPromiseRef.current;
    if (!pending) {
      return;
    }
    attachPromiseRef.current = null;
    if (pending.timer !== null) {
      window.clearTimeout(pending.timer);
    }
    for (const resolve of pending.waiters) {
      resolve(connected);
    }
  }, []);
  useEffect6(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);
  useEffect6(() => {
    isMobileShellRef.current = isMobileShell;
  }, [isMobileShell]);
  useEffect6(() => {
    shellIdRef.current = shell?.id ?? null;
  }, [shell?.id]);
  const sendShellInput = useCallback3((data) => {
    const socket = socketRef.current;
    const shellId = shellIdRef.current;
    const currentViewerId = viewerIdRef.current;
    if (!socket || !shellId || !currentViewerId) {
      return false;
    }
    socket.send({
      type: "shell.input",
      shellId,
      viewerId: currentViewerId,
      data
    });
    return true;
  }, []);
  useEffect6(() => {
    sendShellInputRef.current = sendShellInput;
  }, [sendShellInput]);
  const sendShellClear = useCallback3(() => {
    const socket = socketRef.current;
    const shellId = shellIdRef.current;
    const currentViewerId = viewerIdRef.current;
    if (!socket || !shellId || !currentViewerId) {
      return false;
    }
    socket.send({
      type: "shell.clear",
      shellId,
      viewerId: currentViewerId
    });
    return true;
  }, []);
  const isTerminalVisible = useCallback3(() => {
    if (!isVisible || !terminalHostNode) {
      return false;
    }
    const rect = terminalHostNode.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }, [isVisible, terminalHostNode]);
  const syncTerminalSize = useCallback3((options) => {
    const terminal = terminalRef.current;
    const fitAddon = fitAddonRef.current;
    if (!terminal || !fitAddon || !isTerminalVisible()) {
      return null;
    }
    fitAddon.fit();
    if (terminal.cols <= 0 || terminal.rows <= 0) {
      return null;
    }
    const size = { cols: terminal.cols, rows: terminal.rows };
    if (options?.syncBackendSize === false) {
      return size;
    }
    const previous = lastSentSizeRef.current;
    if (previous?.cols === size.cols && previous.rows === size.rows) {
      return size;
    }
    lastSentSizeRef.current = size;
    if (socketRef.current && shellIdRef.current && viewerIdRef.current) {
      socketRef.current.send({
        type: "shell.resize",
        shellId: shellIdRef.current,
        viewerId: viewerIdRef.current,
        cols: size.cols,
        rows: size.rows
      });
    }
    return size;
  }, [isTerminalVisible]);
  useEffect6(() => {
    syncTerminalSizeRef.current = syncTerminalSize;
  }, [syncTerminalSize]);
  const refreshTerminalLayout = useCallback3(
    (options) => {
      const terminal = terminalRef.current;
      if (!terminal || !isTerminalVisible()) {
        return;
      }
      syncTerminalSize(
        options?.syncBackendSize === void 0 ? void 0 : { syncBackendSize: options.syncBackendSize }
      );
      if (shellSnapshotRef.current && !getVisibleTerminalText(terminalHostNode)) {
        renderShellSnapshot(
          terminal,
          shellSnapshotRef.current,
          snapshotCursorRef.current.cursorX,
          snapshotCursorRef.current.cursorY,
          snapshotCursorRef.current.paneHeight
        );
      } else {
        terminal.scrollToBottom();
      }
      if (options?.focus && !isMobileShell) {
        terminal.focus();
      }
    },
    [isMobileShell, isTerminalVisible, syncTerminalSize, terminalHostNode]
  );
  useEffect6(() => {
    refreshTerminalLayoutRef.current = () => refreshTerminalLayout();
  }, [refreshTerminalLayout]);
  useEffect6(() => {
    onRuntimeStateChange({
      status: viewerId ? "attached" : shellStatus,
      shellInputEnabled: Boolean(viewerId && shell),
      isConnecting,
      isCommandRunning,
      promptLabel,
      error: connectionError,
      hasShell: Boolean(shell)
    });
  }, [
    connectionError,
    isConnecting,
    isCommandRunning,
    onRuntimeStateChange,
    promptLabel,
    shell,
    shellStatus,
    viewerId
  ]);
  useEffect6(() => {
    if (!terminalHostNode || terminalRef.current || terminalInitializingRef.current) {
      return;
    }
    let cancelled = false;
    terminalInitializingRef.current = true;
    void (async () => {
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import("xterm"),
        import("@xterm/addon-fit")
      ]);
      if (cancelled || !terminalHostNode) {
        terminalInitializingRef.current = false;
        return;
      }
      const terminal = new Terminal({
        cursorBlink: true,
        disableStdin: isMobileShellRef.current,
        fontFamily: "IBM Plex Mono, SFMono-Regular, Menlo, monospace",
        fontSize: 13,
        lineHeight: 1.25,
        scrollback: 3e3,
        theme: terminalThemeFor(effectiveTheme)
      });
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.open(terminalHostNode);
      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      syncTerminalSizeRef.current();
      terminal.attachCustomKeyEventHandler((event) => {
        if (isMobileShellRef.current || event.type !== "keydown") {
          return true;
        }
        if (event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey) {
          const sequence = controlSequenceForLetter(event.key);
          if (!sequence) {
            return true;
          }
          if (sendShellInputRef.current(sequence)) {
            event.preventDefault();
            return false;
          }
        }
        return true;
      });
      setTerminalReady(true);
      terminalInitializingRef.current = false;
      resizeObserverRef.current = new ResizeObserver(() => {
        refreshTerminalLayoutRef.current();
      });
      resizeObserverRef.current.observe(terminalHostNode);
      terminalInputSubscriptionRef.current = terminal.onData((data) => {
        if (isMobileShellRef.current) {
          return;
        }
        sendShellInputRef.current(data);
      });
    })();
    return () => {
      cancelled = true;
      terminalInitializingRef.current = false;
      terminalInputSubscriptionRef.current?.dispose();
      terminalInputSubscriptionRef.current = null;
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      setTerminalReady(false);
      terminalRef.current?.dispose();
      terminalRef.current = null;
      fitAddonRef.current = null;
      lastSentSizeRef.current = null;
    };
  }, [effectiveTheme, terminalHostNode]);
  useEffect6(() => {
    if (shell) {
      return;
    }
    setViewerId(null);
    setIsConnecting(false);
    settleAttachPromise(false);
    setConnectionError(null);
    setRuntimePromptLabel(null);
    setIsCommandRunning(false);
    shellSnapshotRef.current = "";
    lastCommandOutputRef.current = "";
    pendingCommandRef.current = null;
    terminalRef.current?.reset();
  }, [setViewerId, settleAttachPromise, shell]);
  useEffect6(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    terminal.options.theme = terminalThemeFor(effectiveTheme);
  }, [effectiveTheme]);
  useEffect6(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    terminal.options.disableStdin = isMobileShell;
  }, [isMobileShell]);
  useEffect6(() => {
    if (!isVisible || !terminalReady) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      refreshTerminalLayout({ focus: isActive, syncBackendSize: false });
      if (!socketRef.current && shell?.id && userDisconnectedShellIdRef.current !== shell.id) {
        setReconnectKey((current) => current + 1);
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isActive, isVisible, refreshTerminalLayout, shell?.id, terminalReady]);
  useEffect6(() => {
    const shellId = shell?.id;
    if (!shellId || !terminalReady || !isVisibleRef.current || !canAttachShell) {
      return;
    }
    if (userDisconnectedShellIdRef.current === shellId) {
      return;
    }
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    const attachSize = syncTerminalSizeRef.current();
    if (!attachSize) {
      if (attachRetryTimerRef.current === null) {
        attachRetryTimerRef.current = window.setTimeout(() => {
          attachRetryTimerRef.current = null;
          setReconnectKey((current) => current + 1);
        }, 120);
      }
      return;
    }
    if (attachRetryTimerRef.current !== null) {
      window.clearTimeout(attachRetryTimerRef.current);
      attachRetryTimerRef.current = null;
    }
    if (socketRef.current && shellIdRef.current === shellId) {
      return;
    }
    if (reconnectTimerRef.current !== null) {
      window.clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    shellIdRef.current = shellId;
    terminal.reset();
    setConnectionError(null);
    setViewerId(null);
    setIsConnecting(true);
    intentionalDisconnectRef.current = false;
    const shellSocket = shellAdapter.connectSocket({
      onConnected: () => {
        if (socketRef.current?.socket !== shellSocket.socket) {
          return;
        }
        shellSocket.send({
          type: "shell.attach",
          shellId,
          cols: attachSize.cols,
          rows: attachSize.rows
        });
        if (attachTimeoutRef.current !== null) {
          window.clearTimeout(attachTimeoutRef.current);
        }
        attachTimeoutRef.current = window.setTimeout(() => {
          attachTimeoutRef.current = null;
          if (shellSocket.socket && socketRef.current?.socket !== shellSocket.socket) {
            return;
          }
          if (viewerIdRef.current) {
            return;
          }
          setConnectionError("Shell connection timed out. Reconnecting...");
          setIsConnecting(false);
          settleAttachPromise(false);
          shellSocket.close?.();
          shellSocket.socket?.close();
        }, 4e3);
      },
      onShellEvent: (event) => {
        if (shellSocket.socket && socketRef.current?.socket !== shellSocket.socket) {
          return;
        }
        if (event.shellId !== shellId) {
          return;
        }
        if (event.type === "shell.connected") {
          if (attachTimeoutRef.current !== null) {
            window.clearTimeout(attachTimeoutRef.current);
            attachTimeoutRef.current = null;
          }
          const nextViewerId = String(event.payload.viewerId ?? "");
          setViewerId(nextViewerId || null);
          setIsConnecting(false);
          settleAttachPromise(Boolean(nextViewerId));
          onShellUpdate(
            shellId,
            (entry) => ({
              ...entry,
              status: "attached",
              attachedViewerId: nextViewerId
            }),
            "attached"
          );
          return;
        }
        if (event.type === "shell.output") {
          const data = typeof event.payload.data === "string" ? event.payload.data : "";
          const replace = event.payload.replace === true;
          const cursorX = typeof event.payload.cursorX === "number" ? event.payload.cursorX : void 0;
          const cursorY = typeof event.payload.cursorY === "number" ? event.payload.cursorY : void 0;
          const paneHeight = typeof event.payload.paneHeight === "number" ? event.payload.paneHeight : void 0;
          const cwdBaseName = typeof event.payload.cwdBaseName === "string" ? event.payload.cwdBaseName : null;
          const envPrefix = typeof event.payload.envPrefix === "string" ? event.payload.envPrefix : null;
          const nextPromptLabel = buildPromptLabel(
            cwdBaseName ?? basenameFromPath(shell?.cwd),
            envPrefix
          );
          const nextIsCommandRunning = event.payload.isCommandRunning === true;
          snapshotCursorRef.current = {
            cursorX,
            cursorY,
            paneHeight
          };
          setRuntimePromptLabel(nextPromptLabel);
          setIsCommandRunning(nextIsCommandRunning);
          if (data) {
            if (replace) {
              const nextSnapshot = normalizeShellSnapshot(data);
              shellSnapshotRef.current = nextSnapshot;
              renderShellSnapshot(terminal, data, cursorX, cursorY, paneHeight);
              if (!nextIsCommandRunning && pendingCommandRef.current) {
                lastCommandOutputRef.current = extractCommandOutput(
                  pendingCommandRef.current.beforeSnapshot,
                  nextSnapshot,
                  pendingCommandRef.current.command
                );
                pendingCommandRef.current = null;
              }
            } else {
              shellSnapshotRef.current = normalizeShellSnapshot(
                `${shellSnapshotRef.current}${data}`
              );
              terminal.write(data);
            }
          }
          return;
        }
        if (event.type === "shell.error") {
          setConnectionError(String(event.payload.message ?? "Shell connection failed."));
          setIsConnecting(false);
          settleAttachPromise(false);
          if (event.payload.code === "viewer_conflict") {
            onShellUpdate(
              shellId,
              (entry) => ({ ...entry, status: "detached", attachedViewerId: null }),
              "detached"
            );
          }
          return;
        }
        if (event.type === "shell.detached") {
          const detachedViewerId = String(event.payload.viewerId ?? "");
          const detachedReason = String(event.payload.reason ?? "");
          if (detachedViewerId && detachedViewerId === viewerIdRef.current) {
            setViewerId(null);
            setIsConnecting(false);
            settleAttachPromise(false);
            onShellUpdate(
              shellId,
              (entry) => ({ ...entry, status: "detached", attachedViewerId: null }),
              "detached"
            );
            if (detachedReason === "replaced") {
              intentionalDisconnectRef.current = true;
              setConnectionError("This shell connection was taken over by another pane or device.");
            } else {
              setConnectionError(null);
            }
            setIsCommandRunning(false);
            shellSocket.socket.close();
          }
          return;
        }
        if (event.type === "shell.exited") {
          setViewerId(null);
          setIsCommandRunning(false);
          setIsConnecting(false);
          settleAttachPromise(false);
          intentionalDisconnectRef.current = true;
          const nextState2 = event.payload.state === "exited" ? "exited" : "not_found";
          onShellUpdate(
            shellId,
            (entry) => ({
              ...entry,
              status: nextState2,
              attachedViewerId: null
            }),
            nextState2
          );
          shellSocket.socket.close();
          return;
        }
        const nextState = event.payload.state;
        if (nextState) {
          if (nextState !== "attached") {
            setViewerId(null);
            setIsCommandRunning(false);
            setIsConnecting(false);
            settleAttachPromise(false);
          }
          onShellUpdate(
            shellId,
            (entry) => ({
              ...entry,
              status: nextState === "attached" || nextState === "detached" ? nextState : entry.status,
              attachedViewerId: nextState === "attached" ? entry.attachedViewerId : null
            }),
            nextState
          );
        }
      }
    });
    socketRef.current = shellSocket;
    shellSocket.socket.addEventListener("close", () => {
      if (socketRef.current?.socket !== shellSocket.socket) {
        return;
      }
      if (attachTimeoutRef.current !== null) {
        window.clearTimeout(attachTimeoutRef.current);
        attachTimeoutRef.current = null;
      }
      socketRef.current = null;
      const hadViewer = Boolean(viewerIdRef.current);
      setViewerId(null);
      setIsConnecting(false);
      settleAttachPromise(false);
      if (hadViewer) {
        onShellUpdate(
          shellId,
          (entry) => ({
            ...entry,
            status: entry.status === "attached" ? "detached" : entry.status,
            attachedViewerId: null
          }),
          "detached"
        );
      }
      if (!intentionalDisconnectRef.current && userDisconnectedShellIdRef.current !== shellId) {
        reconnectTimerRef.current = window.setTimeout(() => {
          reconnectTimerRef.current = null;
          setReconnectKey((current) => current + 1);
        }, 800);
      }
    });
    return () => {
      const currentViewerId = viewerIdRef.current;
      intentionalDisconnectRef.current = true;
      if (attachRetryTimerRef.current !== null) {
        window.clearTimeout(attachRetryTimerRef.current);
        attachRetryTimerRef.current = null;
      }
      if (currentViewerId && shellSocket.socket.readyState === WebSocket.OPEN) {
        shellSocket.send({
          type: "shell.detach",
          shellId,
          viewerId: currentViewerId
        });
      }
      setViewerId(null);
      setIsConnecting(false);
      settleAttachPromise(false);
      if (attachTimeoutRef.current !== null) {
        window.clearTimeout(attachTimeoutRef.current);
        attachTimeoutRef.current = null;
      }
      shellSocket.socket.close();
      if (socketRef.current?.socket === shellSocket.socket) {
        socketRef.current = null;
      }
    };
  }, [
    canAttachShell,
    onShellUpdate,
    reconnectKey,
    setViewerId,
    settleAttachPromise,
    shell?.cwd,
    shell?.id,
    terminalReady
  ]);
  useEffect6(() => {
    return () => {
      if (reconnectTimerRef.current !== null) {
        window.clearTimeout(reconnectTimerRef.current);
      }
      if (attachTimeoutRef.current !== null) {
        window.clearTimeout(attachTimeoutRef.current);
      }
      if (attachRetryTimerRef.current !== null) {
        window.clearTimeout(attachRetryTimerRef.current);
      }
      settleAttachPromise(false);
    };
  }, [settleAttachPromise]);
  useImperativeHandle(
    ref,
    () => ({
      disconnect() {
        const socket = socketRef.current;
        const shellId = shellIdRef.current;
        const currentViewerId = viewerIdRef.current;
        userDisconnectedShellIdRef.current = shellId;
        intentionalDisconnectRef.current = true;
        if (socket && shellId && currentViewerId) {
          socket.send({
            type: "shell.detach",
            shellId,
            viewerId: currentViewerId
          });
        }
        setViewerId(null);
        setIsConnecting(false);
        settleAttachPromise(false);
        socket?.socket.close();
        socketRef.current = null;
        lastSentSizeRef.current = null;
        if (shellId) {
          onShellUpdate(
            shellId,
            (entry) => ({ ...entry, status: "detached", attachedViewerId: null }),
            "detached"
          );
        }
      },
      reconnect() {
        if (!shellIdRef.current || !terminalReady || workspacePathMissing) {
          return Promise.resolve(false);
        }
        if (viewerIdRef.current) {
          return Promise.resolve(true);
        }
        if (attachPromiseRef.current) {
          return new Promise((resolve) => {
            attachPromiseRef.current?.waiters.push(resolve);
          });
        }
        const attachPromise = new Promise((resolve) => {
          const timer = window.setTimeout(() => {
            setIsConnecting(false);
            attachPromiseRef.current = null;
            resolve(false);
          }, 4500);
          attachPromiseRef.current = { waiters: [resolve], timer };
        });
        if (userDisconnectedShellIdRef.current === shellIdRef.current) {
          userDisconnectedShellIdRef.current = null;
        }
        intentionalDisconnectRef.current = false;
        setConnectionError(null);
        setIsConnecting(true);
        setReconnectKey((current) => current + 1);
        return attachPromise;
      },
      sendInput(data) {
        return sendShellInput(data);
      },
      sendCommand(command) {
        const pendingCommand = {
          command,
          beforeSnapshot: shellSnapshotRef.current
        };
        pendingCommandRef.current = pendingCommand;
        if (command.trim() === "clear") {
          const sent2 = sendShellClear();
          if (!sent2 && pendingCommandRef.current === pendingCommand) {
            pendingCommandRef.current = null;
          }
          return sent2;
        }
        const normalized = command.endsWith("\n") ? command : `${command}
`;
        const sent = sendShellInput(normalized);
        if (!sent && pendingCommandRef.current === pendingCommand) {
          pendingCommandRef.current = null;
        }
        return sent;
      },
      sendControl(action) {
        if (action === "clear") {
          return sendShellClear();
        }
        return sendShellInput(shellControlSequence(action));
      },
      async copyLastCommandOutput() {
        const output = lastCommandOutputRef.current.trim() || getVisibleTerminalText(terminalHostNode);
        if (!output) {
          onFeedback?.("failed", "Nothing to copy");
          return false;
        }
        try {
          await navigator.clipboard.writeText(output);
          onFeedback?.("done", "Copied");
          return true;
        } catch {
          onFeedback?.("failed", "Copy failed");
          return false;
        }
      },
      focus() {
        terminalRef.current?.focus();
      },
      refreshLayout(options) {
        refreshTerminalLayout(options);
      }
    }),
    [
      onFeedback,
      onShellUpdate,
      refreshTerminalLayout,
      sendShellClear,
      sendShellInput,
      setViewerId,
      settleAttachPromise,
      terminalHostNode,
      terminalReady,
      workspacePathMissing
    ]
  );
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      className: `relative min-h-0 flex-1 overflow-hidden ${isActive ? "shell-pane-active" : ""}`,
      onMouseDown: onActivate,
      "data-pane-id": paneId,
      children: [
        /* @__PURE__ */ jsx8(
          "div",
          {
            ref: setTerminalHostNode,
            className: `h-full w-full px-2 py-2 sm:px-3 sm:py-3 ${isMobileShell ? "mobile-shell-selectable" : ""}`,
            onMouseDown: () => {
              onActivate();
              terminalRef.current?.focus();
            }
          }
        ),
        isActive && /* @__PURE__ */ jsx8("div", { className: "pointer-events-none absolute right-2 top-2 rounded-md border border-sky-300/30 bg-sky-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-sky-100", children: "Active" })
      ]
    }
  );
});
var ThreadShellPanel = forwardRef(function ThreadShellPanel2({
  threadId,
  shellAdapter,
  isVisible = true,
  showHeader = true,
  showFloatingToolbox = true,
  effectiveTheme = "dark",
  loadSplitRatio,
  saveSplitRatio,
  onStateChange
}, ref) {
  const primaryPaneRef = useRef4(null);
  const secondaryPaneRef = useRef4(null);
  const feedbackTimerRef = useRef4(null);
  const terminalSplitHostRef = useRef4(null);
  const dragFrameRef = useRef4(null);
  const createShellInFlightRef = useRef4(false);
  const [shellState, setShellState] = useState5(null);
  const [loading, setLoading] = useState5(true);
  const [busy, setBusy] = useState5(false);
  const [error, setError] = useState5(null);
  const [activePaneId, setActivePaneId] = useState5("primary");
  const [primaryShellId, setPrimaryShellId] = useState5(null);
  const [secondaryShellId, setSecondaryShellId] = useState5(null);
  const [splitMode, setSplitMode] = useState5("single");
  const [splitRatio, setSplitRatio] = useState5(50);
  const [renamingShellId, setRenamingShellId] = useState5(null);
  const [renameDraft, setRenameDraft] = useState5("");
  const [isMobileShell, setIsMobileShell] = useState5(false);
  const [mobileProcessListOpen, setMobileProcessListOpen] = useState5(false);
  const [toolboxOpen, setToolboxOpen] = useState5(false);
  const [paneRuntime, setPaneRuntime] = useState5({
    primary: {
      status: "not_created",
      shellInputEnabled: false,
      isConnecting: false,
      isCommandRunning: false,
      promptLabel: null,
      error: null,
      hasShell: false
    },
    secondary: {
      status: "not_created",
      shellInputEnabled: false,
      isConnecting: false,
      isCommandRunning: false,
      promptLabel: null,
      error: null,
      hasShell: false
    }
  });
  const [toolboxFeedback, setToolboxFeedback] = useState5(null);
  const status = shellState?.state ?? "not_created";
  const shells = useMemo5(() => shellState?.shells ?? [], [shellState?.shells]);
  const liveShells = useMemo5(
    () => shells.filter((shell) => shell.status !== "exited" && shell.status !== "not_found"),
    [shells]
  );
  const primaryShell = useMemo5(
    () => liveShells.find((shell) => shell.id === primaryShellId) ?? null,
    [liveShells, primaryShellId]
  );
  const secondaryShell = useMemo5(
    () => liveShells.find((shell) => shell.id === secondaryShellId) ?? null,
    [liveShells, secondaryShellId]
  );
  const activeShell = activePaneId === "secondary" ? secondaryShell : primaryShell;
  const activeRuntime = paneRuntime[activePaneId];
  const workspacePathMissing = shellState?.workspacePathStatus === "missing";
  const connectionButtonDisabled = busy || loading || status === "creating" || workspacePathMissing;
  const activePaneRef = activePaneId === "secondary" ? secondaryPaneRef : primaryPaneRef;
  const connectionButtonLabel = activeRuntime.shellInputEnabled ? "Disconnect shell" : activeShell && (activeShell.status === "exited" || activeShell.status === "not_found") ? "Restart shell" : activeShell ? "Connect shell" : "Create shell";
  const connectionButtonClassName = activeRuntime.shellInputEnabled ? "border-emerald-300/45 bg-emerald-300/18 text-emerald-50 ring-1 ring-emerald-300/20 hover:bg-emerald-300/24" : activeShell?.status === "exited" || activeShell?.status === "not_found" ? "border-stone-600 bg-stone-800/90 text-stone-100 hover:border-stone-500 hover:bg-stone-800" : workspacePathMissing ? "border-rose-300/35 bg-rose-300/12 text-rose-100" : "border-stone-600 bg-stone-800/90 text-stone-100 hover:border-stone-500 hover:bg-stone-800";
  const toolboxFeedbackToneClassName = toolboxFeedback?.tone === "done" ? "shell-floating-feedback shell-floating-feedback-done" : toolboxFeedback?.tone === "failed" ? "shell-floating-feedback shell-floating-feedback-failed" : "shell-floating-feedback";
  const setTransientToolboxFeedback = useCallback3(
    (tone, text) => {
      setToolboxFeedback({ tone, text });
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
      feedbackTimerRef.current = window.setTimeout(() => {
        setToolboxFeedback(null);
        feedbackTimerRef.current = null;
      }, 1800);
    },
    []
  );
  const updateShellEntry = useCallback3(
    (shellId, updater, nextState) => {
      setShellState((current) => {
        if (!current) {
          return current;
        }
        const nextShells = current.shells.map(
          (shell) => shell.id === shellId ? updater(shell) : shell
        );
        const nextShell = current.shell?.id === shellId ? updater(current.shell) : nextShells.find((shell) => shell.id === current.shell?.id) ?? current.shell;
        return {
          ...current,
          ...nextState ? { state: nextState } : {},
          shell: nextShell,
          shells: nextShells
        };
      });
    },
    []
  );
  const loadShellState = useCallback3(async () => {
    setLoading(true);
    try {
      const response = await shellAdapter.fetchState(threadId);
      setShellState(response);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load shell state.");
    } finally {
      setLoading(false);
    }
  }, [shellAdapter, threadId]);
  useEffect6(() => {
    void loadShellState();
  }, [loadShellState]);
  useEffect6(() => {
    const storedRatio = loadSplitRatio?.(threadId);
    if (storedRatio === null || storedRatio === void 0) {
      setSplitRatio(50);
      return;
    }
    const parsed = typeof storedRatio === "number" ? storedRatio : Number.parseFloat(String(storedRatio));
    setSplitRatio(Number.isFinite(parsed) ? clampPaneRatio(parsed) : 50);
  }, [loadSplitRatio, threadId]);
  useEffect6(() => {
    if (!shellState) {
      setPrimaryShellId(null);
      setSecondaryShellId(null);
      return;
    }
    const isLiveShell = (shell) => shell.status !== "exited" && shell.status !== "not_found";
    const nextActiveShell = (shellState.activeShellId ? shellState.shells.find((shell) => shell.id === shellState.activeShellId && isLiveShell(shell)) : null) ?? (shellState.shell && isLiveShell(shellState.shell) ? shellState.shell : null) ?? shellState.shells.find(isLiveShell) ?? null;
    setPrimaryShellId((current) => {
      if (current && shellState.shells.some((shell) => shell.id === current && isLiveShell(shell))) {
        return current;
      }
      return nextActiveShell?.id ?? null;
    });
    setSecondaryShellId((current) => {
      if (splitMode !== "columns") {
        return null;
      }
      if (current && shellState.shells.some((shell) => shell.id === current && isLiveShell(shell))) {
        return current;
      }
      const fallback = shellState.shells.find(
        (shell) => isLiveShell(shell) && shell.id !== nextActiveShell?.id
      );
      return fallback?.id ?? null;
    });
  }, [shellState, splitMode]);
  useEffect6(() => {
    if (splitMode === "columns") {
      return;
    }
    setActivePaneId("primary");
    setSecondaryShellId(null);
  }, [splitMode]);
  useEffect6(() => {
    if (splitMode !== "columns" || secondaryShellId || liveShells.length < 2) {
      return;
    }
    const nextSecondary = liveShells.find((shell) => shell.id !== primaryShell?.id) ?? null;
    if (nextSecondary) {
      setSecondaryShellId(nextSecondary.id);
    }
  }, [liveShells, primaryShell?.id, secondaryShellId, splitMode]);
  useEffect6(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)");
    const update = () => {
      setIsMobileShell(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setToolboxOpen(false);
        setMobileProcessListOpen(false);
      }
    };
    update();
    mediaQuery.addEventListener("change", update);
    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);
  useEffect6(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
      if (dragFrameRef.current !== null) {
        window.cancelAnimationFrame(dragFrameRef.current);
      }
    };
  }, []);
  const updatePaneRuntime = useCallback3(
    (paneId, nextState) => {
      setPaneRuntime((current) => {
        const previous = current[paneId];
        if (previous.status === nextState.status && previous.shellInputEnabled === nextState.shellInputEnabled && previous.isConnecting === nextState.isConnecting && previous.isCommandRunning === nextState.isCommandRunning && previous.promptLabel === nextState.promptLabel && previous.error === nextState.error && previous.hasShell === nextState.hasShell) {
          return current;
        }
        return {
          ...current,
          [paneId]: nextState
        };
      });
    },
    []
  );
  const handlePrimaryRuntimeStateChange = useCallback3(
    (nextState) => updatePaneRuntime("primary", nextState),
    [updatePaneRuntime]
  );
  const handleSecondaryRuntimeStateChange = useCallback3(
    (nextState) => updatePaneRuntime("secondary", nextState),
    [updatePaneRuntime]
  );
  const shellLabel = useCallback3(
    (shell) => {
      if (shell.label?.trim()) {
        return shell.label.trim();
      }
      const index = shells.findIndex((entry) => entry.id === shell.id);
      return `Shell ${index >= 0 ? index + 1 : ""}`.trim();
    },
    [shells]
  );
  const handleStartRenameShell = useCallback3(
    (shell) => {
      setRenamingShellId(shell.id);
      setRenameDraft(shell.label?.trim() || shellLabel(shell));
    },
    [shellLabel]
  );
  const handleCancelRenameShell = useCallback3(() => {
    setRenamingShellId(null);
    setRenameDraft("");
  }, []);
  const handleSubmitRenameShell = useCallback3(async () => {
    if (!renamingShellId) {
      return;
    }
    setBusy(true);
    try {
      const label = renameDraft.trim();
      const updated = await shellAdapter.updateShell(renamingShellId, {
        label: label.length > 0 ? label : null
      });
      setShellState(
        (current) => current ? {
          ...current,
          state: current.activeShellId === updated.id ? updated.status : current.state,
          shell: current.shell?.id === updated.id ? updated : current.shell,
          shells: current.shells.map(
            (shell) => shell.id === updated.id ? updated : shell
          )
        } : current
      );
      setRenamingShellId(null);
      setRenameDraft("");
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to rename shell.");
    } finally {
      setBusy(false);
    }
  }, [renameDraft, renamingShellId, shellAdapter]);
  const setPaneShell = useCallback3((paneId, shellId) => {
    if (paneId === "primary") {
      setPrimaryShellId(shellId);
      setSecondaryShellId((current) => current === shellId ? null : current);
      return;
    }
    setSecondaryShellId(shellId);
    setPrimaryShellId((current) => current === shellId ? null : current);
  }, []);
  const handleClosePane = useCallback3((paneId) => {
    if (paneId === "primary") {
      primaryPaneRef.current?.disconnect();
      setPrimaryShellId(null);
      if (splitMode === "columns") {
        setActivePaneId("secondary");
      }
      return;
    }
    secondaryPaneRef.current?.disconnect();
    setSecondaryShellId(null);
    setActivePaneId("primary");
    setSplitMode("single");
  }, [splitMode]);
  const handleSelectShell = useCallback3(
    (shell, paneId = activePaneId) => {
      const targetPaneId = splitMode === "columns" ? paneId : "primary";
      setPaneShell(targetPaneId, shell.id);
      if (splitMode !== "columns") {
        setSecondaryShellId(null);
      }
      setActivePaneId(targetPaneId);
    },
    [activePaneId, setPaneShell, splitMode]
  );
  const handleCreateShell = useCallback3(
    async (paneId = activePaneId) => {
      if (createShellInFlightRef.current) {
        return;
      }
      createShellInFlightRef.current = true;
      setBusy(true);
      try {
        const response = await shellAdapter.createShell(threadId);
        setShellState(response);
        const shellId = response.activeShellId ?? response.shell?.id ?? null;
        if (shellId) {
          const targetPaneId = splitMode === "columns" ? paneId : "primary";
          setPaneShell(targetPaneId, shellId);
          if (splitMode !== "columns") {
            setSecondaryShellId(null);
          }
          setActivePaneId(targetPaneId);
        }
        setError(null);
      } catch (caught) {
        setError(
          caught instanceof Error ? caught.message : "Unable to create shell."
        );
      } finally {
        createShellInFlightRef.current = false;
        setBusy(false);
      }
    },
    [activePaneId, setPaneShell, shellAdapter, splitMode, threadId]
  );
  useEffect6(() => {
    if (!isVisible || !shellState || loading || busy || workspacePathMissing || status === "creating" || liveShells.length > 0) {
      return;
    }
    void handleCreateShell("primary");
  }, [
    busy,
    handleCreateShell,
    isVisible,
    liveShells.length,
    loading,
    shellState,
    status,
    workspacePathMissing
  ]);
  const handleTerminateShell = useCallback3(
    async (shellId = activeShell?.id ?? "") => {
      if (!shellId) {
        return;
      }
      setBusy(true);
      try {
        await shellAdapter.terminateShell(shellId);
        setPrimaryShellId((current) => current === shellId ? null : current);
        setSecondaryShellId((current) => current === shellId ? null : current);
        await loadShellState();
        setError(null);
      } catch (caught) {
        setError(
          caught instanceof Error ? caught.message : "Unable to terminate shell."
        );
      } finally {
        setBusy(false);
      }
    },
    [activeShell?.id, loadShellState, shellAdapter]
  );
  const handleConnectionToggle = useCallback3(async () => {
    if (connectionButtonDisabled) {
      return;
    }
    if (activeRuntime.shellInputEnabled) {
      activePaneRef.current?.disconnect();
      return;
    }
    if (!activeShell || activeShell.status === "exited" || activeShell.status === "not_found") {
      await handleCreateShell(activePaneId);
      return;
    }
    await activePaneRef.current?.reconnect();
  }, [
    activePaneId,
    activePaneRef,
    activeRuntime.shellInputEnabled,
    activeShell,
    connectionButtonDisabled,
    handleCreateShell
  ]);
  const persistSplitRatio = useCallback3(
    (nextRatio) => {
      if (typeof window === "undefined") {
        return;
      }
      saveSplitRatio?.(threadId, clampPaneRatio(nextRatio));
    },
    [saveSplitRatio, threadId]
  );
  const refreshPaneLayouts = useCallback3(() => {
    primaryPaneRef.current?.refreshLayout({ syncBackendSize: true });
    secondaryPaneRef.current?.refreshLayout({ syncBackendSize: true });
  }, []);
  const handleSplitDividerPointerDown = useCallback3(
    (event) => {
      if (splitMode !== "columns") {
        return;
      }
      const host = terminalSplitHostRef.current;
      if (!host) {
        return;
      }
      event.preventDefault();
      event.currentTarget.setPointerCapture?.(event.pointerId);
      const updateRatioFromClientX = (clientX) => {
        const rect = host.getBoundingClientRect();
        if (rect.width <= 0) {
          return;
        }
        const nextRatio = clampPaneRatio((clientX - rect.left) / rect.width * 100);
        setSplitRatio(nextRatio);
        if (dragFrameRef.current !== null) {
          window.cancelAnimationFrame(dragFrameRef.current);
        }
        dragFrameRef.current = window.requestAnimationFrame(() => {
          dragFrameRef.current = null;
          refreshPaneLayouts();
        });
      };
      const handlePointerMove = (moveEvent) => {
        updateRatioFromClientX(moveEvent.clientX);
      };
      const handlePointerUp = (upEvent) => {
        updateRatioFromClientX(upEvent.clientX);
        const rect = host.getBoundingClientRect();
        if (rect.width > 0) {
          persistSplitRatio((upEvent.clientX - rect.left) / rect.width * 100);
        }
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp, { once: true });
    },
    [persistSplitRatio, refreshPaneLayouts, splitMode]
  );
  const handleAssignShellToPane = useCallback3(
    (shell, paneId) => {
      setPaneShell(paneId, shell.id);
      setActivePaneId(paneId);
    },
    [setPaneShell]
  );
  const handleCopyVisibleShellText = useCallback3(async () => {
    const copied = await activePaneRef.current?.copyLastCommandOutput();
    if (!copied) {
      setTransientToolboxFeedback("failed", "Nothing to copy");
      return false;
    }
    return true;
  }, [activePaneRef, setTransientToolboxFeedback]);
  useEffect6(() => {
    onStateChange?.({
      status: activeRuntime.status,
      connectionButtonDisabled,
      connectionButtonLabel,
      shellInputEnabled: activeRuntime.shellInputEnabled,
      isConnecting: activeRuntime.isConnecting,
      isCommandRunning: activeRuntime.isCommandRunning,
      promptLabel: activeRuntime.promptLabel ?? (activeShell ? buildPromptLabel(basenameFromPath(activeShell.cwd), null) : null),
      isMobileShell,
      hasShell: Boolean(activeShell),
      busy,
      loading,
      error: activeRuntime.error ?? error
    });
  }, [
    activeRuntime,
    activeShell,
    busy,
    connectionButtonDisabled,
    connectionButtonLabel,
    error,
    isMobileShell,
    loading,
    onStateChange
  ]);
  useImperativeHandle(
    ref,
    () => ({
      async toggleConnection() {
        await handleConnectionToggle();
      },
      sendInput(data) {
        return activePaneRef.current?.sendInput(data) ?? false;
      },
      sendCommand(command) {
        return activePaneRef.current?.sendCommand(command) ?? false;
      },
      sendControl(action) {
        return activePaneRef.current?.sendControl(action) ?? false;
      },
      async copyLastCommandOutput() {
        return await activePaneRef.current?.copyLastCommandOutput() ?? false;
      },
      async terminate() {
        await handleTerminateShell();
      },
      focus() {
        activePaneRef.current?.focus();
      },
      refreshLayout(options) {
        primaryPaneRef.current?.refreshLayout(options);
        if (splitMode === "columns") {
          secondaryPaneRef.current?.refreshLayout(options);
        }
      }
    }),
    [activePaneRef, handleConnectionToggle, handleTerminateShell, splitMode]
  );
  const renderProcessRow = (shell) => /* @__PURE__ */ jsx8(
    "div",
    {
      className: `rounded-md border px-2 py-1.5 text-xs ${shell.id === activeShell?.id ? "border-sky-300/40 bg-sky-300/12 text-sky-50" : "border-stone-800 bg-stone-900/40 text-stone-300"}`,
      children: /* @__PURE__ */ jsxs7("div", { className: "flex items-center justify-between gap-2", children: [
        renamingShellId === shell.id ? /* @__PURE__ */ jsx8(
          "form",
          {
            className: "min-w-0 flex-1",
            onSubmit: (event) => {
              event.preventDefault();
              void handleSubmitRenameShell();
            },
            children: /* @__PURE__ */ jsx8(
              "input",
              {
                value: renameDraft,
                onChange: (event) => setRenameDraft(event.currentTarget.value),
                onKeyDown: (event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    handleCancelRenameShell();
                  }
                },
                autoFocus: true,
                className: "w-full rounded border border-sky-300/35 bg-stone-950/70 px-2 py-1 text-xs text-stone-100 outline-none",
                "aria-label": "Shell name"
              }
            )
          }
        ) : /* @__PURE__ */ jsxs7(
          "button",
          {
            type: "button",
            onClick: () => handleSelectShell(shell),
            onDoubleClick: () => handleStartRenameShell(shell),
            className: "min-w-0 flex-1 text-left",
            title: shell.tmuxSessionName,
            children: [
              /* @__PURE__ */ jsx8("span", { className: "block truncate", children: shellLabel(shell) }),
              /* @__PURE__ */ jsxs7("span", { className: "block truncate text-[10px] text-[var(--theme-fg-muted)]", children: [
                statusLabel(shell.status),
                " \xB7 ",
                basenameFromPath(shell.cwd) || shell.cwd
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs7("div", { className: "flex shrink-0 items-center gap-1", children: [
          renamingShellId === shell.id ? /* @__PURE__ */ jsxs7(Fragment3, { children: [
            /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                onClick: () => void handleSubmitRenameShell(),
                className: "rounded border border-sky-300/35 bg-sky-300/12 px-1.5 py-1 text-[10px] text-sky-50",
                title: "Save shell name",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                onClick: handleCancelRenameShell,
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200",
                title: "Cancel rename",
                children: "Cancel"
              }
            )
          ] }) : /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              onClick: () => handleStartRenameShell(shell),
              className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
              title: "Rename shell",
              children: "Rename"
            }
          ),
          splitMode === "columns" && /* @__PURE__ */ jsxs7(Fragment3, { children: [
            /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                onClick: () => handleAssignShellToPane(shell, "primary"),
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
                title: "Open in left pane",
                children: "L"
              }
            ),
            /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                onClick: () => handleAssignShellToPane(shell, "secondary"),
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
                title: "Open in right pane",
                children: "R"
              }
            )
          ] }),
          /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              disabled: busy,
              onClick: () => void handleTerminateShell(shell.id),
              className: "rounded border border-rose-300/35 bg-rose-300/12 px-1.5 py-1 text-[10px] text-rose-100 disabled:cursor-not-allowed disabled:opacity-50",
              title: "Kill shell process",
              children: "Kill"
            }
          )
        ] })
      ] })
    },
    shell.id
  );
  return /* @__PURE__ */ jsxs7("div", { className: "shell-panel flex min-h-0 flex-1 flex-col", children: [
    showHeader && /* @__PURE__ */ jsxs7("div", { className: "shell-header shrink-0 border-b px-3 py-3 sm:px-5", children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs7("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx8("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Shell" }),
          /* @__PURE__ */ jsx8("p", { className: "mt-1 truncate text-sm text-[var(--theme-fg-soft)]", children: activeRuntime.promptLabel ?? activeShell?.cwd ?? "Create a terminal for this thread." })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              "aria-label": connectionButtonLabel,
              title: `${connectionButtonLabel} (${statusLabel(activeRuntime.status)})`,
              disabled: connectionButtonDisabled,
              onClick: () => void handleConnectionToggle(),
              className: `inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-lg shadow-stone-950/25 transition disabled:cursor-not-allowed disabled:opacity-60 ${connectionButtonClassName}`,
              children: /* @__PURE__ */ jsx8(ConnectionIcon, { connected: activeRuntime.shellInputEnabled })
            }
          ),
          activeShell && /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              disabled: busy,
              onClick: () => void handleTerminateShell(activeShell.id),
              className: "rounded-full border border-rose-300/35 bg-rose-300/12 px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-300/18 dark:text-rose-100 disabled:cursor-not-allowed disabled:opacity-60",
              children: "Terminate"
            }
          )
        ] })
      ] }),
      (error || loading || workspacePathMissing) && /* @__PURE__ */ jsxs7("div", { className: "shell-banner mt-3 rounded-2xl border px-3 py-3 text-sm", children: [
        loading && /* @__PURE__ */ jsx8("p", { className: "text-[var(--theme-fg-muted)]", children: "Loading shell state..." }),
        !loading && workspacePathMissing && /* @__PURE__ */ jsx8("p", { className: "text-rose-600 dark:text-rose-100", children: "Workspace path is missing on this machine. Restore the path before creating a shell." }),
        !loading && error && /* @__PURE__ */ jsx8("p", { className: "text-amber-700 dark:text-amber-100", children: error })
      ] })
    ] }),
    /* @__PURE__ */ jsx8("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ jsxs7("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsxs7("div", { className: "shell-terminal-bar flex shrink-0 items-center gap-2 border-b px-2 py-2", children: [
        /* @__PURE__ */ jsxs7("div", { className: "flex min-w-0 flex-1 items-center gap-2 px-1", children: [
          /* @__PURE__ */ jsx8("span", { className: "min-w-0 truncate text-xs text-[var(--theme-fg-soft)]", children: activeShell ? shellLabel(activeShell) : "No live shell process" }),
          activeShell && /* @__PURE__ */ jsx8("span", { className: "shrink-0 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-fg-muted)]", children: statusLabel(activeRuntime.status) })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          /* @__PURE__ */ jsxs7("span", { className: "hidden text-xs text-[var(--theme-fg-muted)] sm:inline", children: [
            "Live ",
            liveShells.length
          ] }),
          /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              "aria-expanded": mobileProcessListOpen,
              "aria-label": mobileProcessListOpen ? "Hide shell processes" : "Show shell processes",
              onClick: () => setMobileProcessListOpen((current) => !current),
              className: "rounded-md border border-stone-700/80 bg-stone-900/50 px-2.5 py-1.5 text-xs text-stone-200 sm:hidden",
              children: "Processes"
            }
          )
        ] })
      ] }),
      mobileProcessListOpen && /* @__PURE__ */ jsxs7("div", { className: "shrink-0 border-b border-stone-800/80 bg-stone-950/55 p-2 sm:hidden", children: [
        /* @__PURE__ */ jsxs7("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx8("p", { className: "text-xs uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: "Processes" }),
          /* @__PURE__ */ jsxs7("span", { className: "text-[10px] text-[var(--theme-fg-muted)]", children: [
            liveShells.length,
            " live"
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "max-h-52 space-y-1 overflow-y-auto", children: [
          liveShells.map(renderProcessRow),
          liveShells.length === 0 && /* @__PURE__ */ jsx8("p", { className: "px-2 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No live shell processes" })
        ] }),
        /* @__PURE__ */ jsx8("div", { className: "mt-2 flex justify-end border-t border-stone-800/80 pt-2", children: /* @__PURE__ */ jsx8(
          "button",
          {
            type: "button",
            "aria-label": "New shell",
            title: "New shell",
            disabled: busy || loading || workspacePathMissing,
            onClick: () => void handleCreateShell(activePaneId),
            className: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-sky-300/35 bg-sky-300/12 text-base leading-none text-sky-50 disabled:cursor-not-allowed disabled:opacity-50",
            children: "+"
          }
        ) })
      ] }),
      status === "not_created" || workspacePathMissing ? /* @__PURE__ */ jsx8("div", { className: "flex h-full items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxs7("div", { className: "shell-empty-state max-w-md rounded-[1.6rem] border px-6 py-8", children: [
        /* @__PURE__ */ jsx8("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Durable thread shell" }),
        /* @__PURE__ */ jsx8("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-muted)]", children: "The shell runs under a supervisor-managed PTY and reconnects after browser disconnects. Create it explicitly when you want to inspect or take over the workspace." }),
        !workspacePathMissing && /* @__PURE__ */ jsx8(
          "button",
          {
            type: "button",
            disabled: busy || loading,
            onClick: () => void handleCreateShell("primary"),
            className: "mt-5 rounded-md border border-sky-300/35 bg-sky-300/12 px-3 py-2 text-sm text-sky-50 disabled:cursor-not-allowed disabled:opacity-50",
            children: "New Shell"
          }
        )
      ] }) }) : /* @__PURE__ */ jsxs7("div", { className: "grid h-full min-h-0 grid-cols-1 gap-2 p-2 sm:grid-cols-[minmax(0,1fr)_16rem] sm:p-3", children: [
        /* @__PURE__ */ jsxs7("div", { className: "shell-terminal-frame relative min-h-0 overflow-hidden rounded-[1.4rem] border shadow-inner", children: [
          !showHeader && (error || loading || workspacePathMissing) && /* @__PURE__ */ jsxs7("div", { className: "shell-banner absolute left-2 right-2 top-2 z-10 rounded-2xl border px-3 py-3 text-sm backdrop-blur sm:left-3 sm:right-3 sm:top-3", children: [
            loading && /* @__PURE__ */ jsx8("p", { className: "text-[var(--theme-fg-muted)]", children: "Loading shell state..." }),
            !loading && workspacePathMissing && /* @__PURE__ */ jsx8("p", { className: "text-rose-600 dark:text-rose-100", children: "Workspace path is missing on this machine. Restore the path before creating a shell." }),
            !loading && error && /* @__PURE__ */ jsx8("p", { className: "text-amber-700 dark:text-amber-100", children: error })
          ] }),
          /* @__PURE__ */ jsxs7(
            "div",
            {
              ref: terminalSplitHostRef,
              className: `relative grid h-full min-h-0 ${splitMode === "columns" ? "grid-cols-1 sm:grid-cols-[var(--shell-left)_0.35rem_var(--shell-right)]" : "grid-cols-1"}`,
              style: splitMode === "columns" ? {
                "--shell-left": `${splitRatio}fr`,
                "--shell-right": `${100 - splitRatio}fr`
              } : void 0,
              "data-shell-split-ratio": splitRatio,
              children: [
                /* @__PURE__ */ jsx8(
                  ShellPane,
                  {
                    ref: primaryPaneRef,
                    paneId: "primary",
                    shell: primaryShell,
                    isActive: activePaneId === "primary",
                    isVisible,
                    isMobileShell,
                    effectiveTheme,
                    workspacePathMissing,
                    shellAdapter,
                    onActivate: () => setActivePaneId("primary"),
                    onShellUpdate: updateShellEntry,
                    onRuntimeStateChange: handlePrimaryRuntimeStateChange,
                    onFeedback: setTransientToolboxFeedback
                  }
                ),
                splitMode === "columns" && /* @__PURE__ */ jsx8(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleClosePane("primary"),
                    className: "absolute left-2 top-2 z-10 rounded-md border border-stone-700/80 bg-stone-950/70 px-2 py-1 text-[10px] text-stone-200 hover:border-rose-300/40",
                    title: "Close left pane",
                    children: "Close"
                  }
                ),
                splitMode === "columns" && /* @__PURE__ */ jsx8(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Resize shell panes",
                    title: "Resize shell panes",
                    onPointerDown: handleSplitDividerPointerDown,
                    className: "hidden cursor-col-resize border-x border-stone-800/80 bg-stone-900/60 transition hover:border-sky-300/40 hover:bg-sky-300/10 sm:block"
                  }
                ),
                splitMode === "columns" && /* @__PURE__ */ jsxs7("div", { className: "relative min-h-0 border-t border-stone-800/80 sm:border-l sm:border-t-0", children: [
                  /* @__PURE__ */ jsx8(
                    ShellPane,
                    {
                      ref: secondaryPaneRef,
                      paneId: "secondary",
                      shell: secondaryShell,
                      isActive: activePaneId === "secondary",
                      isVisible,
                      isMobileShell,
                      effectiveTheme,
                      workspacePathMissing,
                      shellAdapter,
                      onActivate: () => setActivePaneId("secondary"),
                      onShellUpdate: updateShellEntry,
                      onRuntimeStateChange: handleSecondaryRuntimeStateChange,
                      onFeedback: setTransientToolboxFeedback
                    }
                  ),
                  /* @__PURE__ */ jsx8(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleClosePane("secondary"),
                      className: "absolute left-2 top-2 z-10 rounded-md border border-stone-700/80 bg-stone-950/70 px-2 py-1 text-[10px] text-stone-200 hover:border-rose-300/40",
                      title: "Close right pane",
                      children: "Close"
                    }
                  )
                ] })
              ]
            }
          ),
          showFloatingToolbox && isMobileShell && /* @__PURE__ */ jsxs7("div", { className: "pointer-events-none absolute bottom-3 right-3 z-20 flex flex-col items-end gap-2", children: [
            toolboxFeedback && /* @__PURE__ */ jsx8(
              "div",
              {
                className: `pointer-events-auto rounded-full border px-3 py-1.5 text-[11px] shadow-lg shadow-stone-950/30 backdrop-blur ${toolboxFeedbackToneClassName}`,
                children: toolboxFeedback.text
              }
            ),
            toolboxOpen && /* @__PURE__ */ jsx8("div", { className: "shell-toolbox pointer-events-auto rounded-[1.2rem] border p-2 shadow-2xl backdrop-blur", children: /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setTransientToolboxFeedback("idle", "Use the prompt box tools to paste");
                  },
                  className: "inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-2.5 py-2 text-sky-600 dark:text-sky-50",
                  children: /* @__PURE__ */ jsxs7("span", { className: "inline-flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx8(ClipboardIcon2, {}),
                    /* @__PURE__ */ jsx8("span", { className: "text-[11px] font-medium tracking-[0.12em]", children: "Paste" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  onClick: () => void handleCopyVisibleShellText(),
                  className: "shell-toolbox-copy inline-flex items-center justify-center rounded-full border px-2.5 py-2",
                  children: /* @__PURE__ */ jsxs7("span", { className: "inline-flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx8(ClipboardIcon2, {}),
                    /* @__PURE__ */ jsx8("span", { className: "text-[11px] font-medium tracking-[0.12em]", children: "Copy" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  disabled: !activeRuntime.shellInputEnabled,
                  onClick: () => {
                    if (activePaneRef.current?.sendControl("clear")) {
                      setTransientToolboxFeedback("done", "Cleared");
                    } else {
                      setTransientToolboxFeedback("failed", "Connect the shell first");
                    }
                  },
                  className: "disabled:opacity-45",
                  children: /* @__PURE__ */ jsx8(ControlIcon, { label: "CLEAR", tone: "sky" })
                }
              ),
              /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  disabled: !activeRuntime.shellInputEnabled || !activeRuntime.isCommandRunning,
                  onClick: () => {
                    if (activePaneRef.current?.sendInput("")) {
                      setTransientToolboxFeedback("done", "Sent Ctrl-C");
                    } else {
                      setTransientToolboxFeedback("failed", "Connect the shell first");
                    }
                  },
                  className: "disabled:opacity-45",
                  children: /* @__PURE__ */ jsx8(ControlIcon, { label: "CTRL-C", tone: "rose" })
                }
              ),
              ["ctrl_d", "esc", "tab", "up", "down"].map((action) => /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  disabled: !activeRuntime.shellInputEnabled,
                  onClick: () => {
                    if (activePaneRef.current?.sendControl(action)) {
                      setTransientToolboxFeedback("done", `Sent ${action.toUpperCase().replace("_", "-")}`);
                    } else {
                      setTransientToolboxFeedback("failed", "Connect the shell first");
                    }
                  },
                  className: "disabled:opacity-45",
                  children: /* @__PURE__ */ jsx8(ControlIcon, { label: action.toUpperCase().replace("_", "-"), tone: "stone" })
                },
                action
              ))
            ] }) }),
            /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                "aria-expanded": toolboxOpen,
                "aria-label": toolboxOpen ? "Close shell tools" : "Open shell tools",
                onClick: () => setToolboxOpen((current) => !current),
                className: "shell-toolbox-trigger pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-2xl backdrop-blur transition",
                children: /* @__PURE__ */ jsx8(WrenchScrewdriverIcon2, {})
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("aside", { className: "hidden min-h-0 overflow-hidden rounded-[1rem] border border-stone-800/80 bg-stone-950/30 p-2 sm:flex sm:flex-col", children: [
          /* @__PURE__ */ jsxs7("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx8("p", { className: "text-xs uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: "Processes" }),
            /* @__PURE__ */ jsxs7("span", { className: "text-[10px] text-[var(--theme-fg-muted)]", children: [
              liveShells.length,
              " live"
            ] })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto", children: [
            liveShells.map(renderProcessRow),
            liveShells.length === 0 && /* @__PURE__ */ jsx8("p", { className: "px-2 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No live shell processes" })
          ] }),
          /* @__PURE__ */ jsx8("div", { className: "mt-2 flex justify-end border-t border-stone-800/80 pt-2", children: /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              "aria-label": "New shell",
              title: "New shell",
              disabled: busy || loading || workspacePathMissing,
              onClick: () => void handleCreateShell(activePaneId),
              className: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-sky-300/35 bg-sky-300/12 text-base leading-none text-sky-50 disabled:cursor-not-allowed disabled:opacity-50",
              children: "+"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
});

// src/components/ConfirmDialog.tsx
import { useEffect as useEffect7 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busy = false,
  onCancel,
  onConfirm
}) {
  useEffect7(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, onCancel, open]);
  if (!open) {
    return null;
  }
  return createPortal3(
    /* @__PURE__ */ jsxs8("div", { className: "fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          "aria-label": "Close confirmation dialog",
          onClick: onCancel,
          disabled: busy,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxs8(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: "relative z-[1] w-full max-w-md rounded-[1.6rem] border border-stone-700 bg-stone-900 p-5 shadow-2xl shadow-stone-950/40 sm:p-6",
          children: [
            /* @__PURE__ */ jsxs8("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs8("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx9("p", { className: "text-sm font-medium text-stone-100", children: title }),
                /* @__PURE__ */ jsx9("p", { className: "mt-2 text-sm leading-6 text-stone-400", children: description })
              ] }),
              /* @__PURE__ */ jsx9(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx9("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx9("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs8("div", { className: "mt-5 flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx9(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: busy,
                  className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx9(
                "button",
                {
                  type: "button",
                  onClick: () => void onConfirm(),
                  disabled: busy,
                  className: "ui-action-danger rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
                  children: busy ? "Deleting..." : confirmLabel
                }
              )
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/ExportTranscriptDialog.tsx
import { useEffect as useEffect8, useMemo as useMemo6, useState as useState6 } from "react";
import { createPortal as createPortal4 } from "react-dom";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function formatTurnTime(value) {
  if (!value) {
    return "No time";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function statusLabel2(status) {
  switch (status) {
    case "inProgress":
      return "running";
    case "completed":
      return "completed";
    case "interrupted":
      return "interrupted";
    case "failed":
      return "failed";
  }
}
function ExportTranscriptDialog({
  open,
  busy = false,
  turnsState,
  onCancel,
  onLoadTurns,
  onExport
}) {
  const turns = useMemo6(() => turnsState.data?.turns ?? [], [turnsState.data?.turns]);
  const latestTurnIds = useMemo6(
    () => turns.slice(0, 10).map((turn) => turn.turnId),
    [turns]
  );
  const [mode, setMode] = useState6("latest");
  const [selectedTurnIds, setSelectedTurnIds] = useState6(
    () => /* @__PURE__ */ new Set()
  );
  const [includeTokenAndPrice, setIncludeTokenAndPrice] = useState6(true);
  const [format, setFormat] = useState6("pdf");
  useEffect8(() => {
    if (!open) {
      return;
    }
    setMode("latest");
    setFormat("pdf");
    setIncludeTokenAndPrice(true);
    void onLoadTurns();
  }, [onLoadTurns, open]);
  useEffect8(() => {
    if (open && turns.length > 0) {
      setSelectedTurnIds(new Set(latestTurnIds));
    }
  }, [latestTurnIds, open, turns.length]);
  useEffect8(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [busy, onCancel, open]);
  if (!open) {
    return null;
  }
  const selectedCount = mode === "latest" ? Math.min(10, turnsState.data?.totalTurnCount ?? 10) : selectedTurnIds.size;
  const canExport = !busy && (mode === "latest" || selectedTurnIds.size > 0);
  function toggleTurn(turnId) {
    setSelectedTurnIds((current) => {
      const next = new Set(current);
      if (next.has(turnId)) {
        next.delete(turnId);
      } else {
        next.add(turnId);
      }
      return next;
    });
  }
  function handleExport() {
    const input = {
      format,
      mode,
      ...mode === "latest" ? { limit: 10 } : { turnIds: [...selectedTurnIds] },
      profile: "review",
      options: {
        includeTokenAndPrice
      }
    };
    void onExport(input);
  }
  return createPortal4(
    /* @__PURE__ */ jsxs9("div", { className: "fixed inset-0 z-[96] flex items-center justify-center p-3 sm:p-6", children: [
      /* @__PURE__ */ jsx10(
        "button",
        {
          type: "button",
          "aria-label": "Close export dialog",
          onClick: onCancel,
          disabled: busy,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxs9(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Export transcript",
          className: "relative z-[1] flex max-h-[min(46rem,calc(100vh-2rem))] w-full max-w-2xl flex-col rounded-[1.6rem] border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
          children: [
            /* @__PURE__ */ jsxs9("div", { className: "flex items-start justify-between gap-3 border-b border-stone-800 px-5 py-4", children: [
              /* @__PURE__ */ jsxs9("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx10("p", { className: "text-sm font-semibold text-stone-100", children: "Export transcript" }),
                /* @__PURE__ */ jsx10("p", { className: "mt-1 text-xs text-stone-500", children: "Default review copy summarizes command batches and file changes." })
              ] }),
              /* @__PURE__ */ jsx10(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx10("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx10("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs9("div", { className: "min-h-0 flex-1 overflow-auto px-5 py-4", children: [
              /* @__PURE__ */ jsx10("div", { className: "inline-flex rounded-full border border-stone-700 bg-stone-950/60 p-1", children: [
                ["latest", "Latest 10"],
                ["selected", "Custom selection"]
              ].map(([entryMode, label]) => /* @__PURE__ */ jsx10(
                "button",
                {
                  type: "button",
                  onClick: () => setMode(entryMode),
                  className: `rounded-full px-3 py-1.5 text-sm transition ${mode === entryMode ? "ui-status-warning" : "text-stone-400 hover:text-stone-100"}`,
                  children: label
                },
                entryMode
              )) }),
              /* @__PURE__ */ jsx10("div", { className: "mt-4 inline-flex rounded-full border border-stone-700 bg-stone-950/60 p-1", children: [
                ["pdf", "PDF"],
                ["html", "HTML"]
              ].map(([entryFormat, label]) => /* @__PURE__ */ jsx10(
                "button",
                {
                  type: "button",
                  onClick: () => setFormat(entryFormat),
                  className: `rounded-full px-3 py-1.5 text-sm transition ${format === entryFormat ? "ui-status-warning" : "text-stone-400 hover:text-stone-100"}`,
                  children: label
                },
                entryFormat
              )) }),
              mode === "selected" ? /* @__PURE__ */ jsxs9("div", { className: "mt-4 rounded-2xl border border-stone-800 bg-stone-950/40", children: [
                /* @__PURE__ */ jsxs9("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 px-3 py-2.5", children: [
                  /* @__PURE__ */ jsxs9("p", { className: "text-xs text-stone-400", children: [
                    "Selected ",
                    selectedTurnIds.size,
                    " of ",
                    turnsState.data?.totalTurnCount ?? turns.length
                  ] }),
                  /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx10(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedTurnIds(new Set(turns.map((turn) => turn.turnId))),
                        className: "rounded-full border border-stone-700 px-2.5 py-1 text-xs text-stone-300 transition hover:bg-stone-800",
                        children: "Select all"
                      }
                    ),
                    /* @__PURE__ */ jsx10(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedTurnIds(/* @__PURE__ */ new Set()),
                        className: "rounded-full border border-stone-700 px-2.5 py-1 text-xs text-stone-300 transition hover:bg-stone-800",
                        children: "Clear"
                      }
                    )
                  ] })
                ] }),
                turnsState.status === "loading" ? /* @__PURE__ */ jsx10("p", { className: "px-3 py-6 text-sm text-stone-400", children: "Loading turns..." }) : turnsState.status === "failed" ? /* @__PURE__ */ jsx10("p", { className: "px-3 py-6 text-sm text-rose-100", children: turnsState.error }) : /* @__PURE__ */ jsx10("div", { className: "max-h-80 overflow-auto p-2", children: turns.map((turn) => /* @__PURE__ */ jsxs9(
                  "label",
                  {
                    className: "flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition hover:bg-stone-800/70",
                    children: [
                      /* @__PURE__ */ jsx10(
                        "input",
                        {
                          type: "checkbox",
                          checked: selectedTurnIds.has(turn.turnId),
                          onChange: () => toggleTurn(turn.turnId),
                          className: "h-4 w-4 accent-amber-300"
                        }
                      ),
                      /* @__PURE__ */ jsxs9("span", { className: "shrink-0 text-xs font-medium text-stone-300", children: [
                        "Turn ",
                        turn.turnNumber
                      ] }),
                      /* @__PURE__ */ jsx10("span", { className: "shrink-0 text-xs text-stone-500", children: formatTurnTime(turn.startedAt) }),
                      /* @__PURE__ */ jsx10("span", { className: "min-w-0 flex-1 truncate text-left text-stone-200", children: turn.userPromptPreview }),
                      /* @__PURE__ */ jsx10("span", { className: "hidden shrink-0 rounded-full border border-stone-700 px-2 py-0.5 text-[10px] text-stone-400 sm:inline", children: statusLabel2(turn.status) })
                    ]
                  },
                  turn.turnId
                )) })
              ] }) : /* @__PURE__ */ jsx10("p", { className: "mt-4 rounded-2xl border border-stone-800 bg-stone-950/40 px-3 py-3 text-sm text-stone-300", children: "Exports the latest 10 turns in chronological order." }),
              /* @__PURE__ */ jsxs9("div", { className: "mt-4 grid gap-2 text-sm text-stone-300 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs9("label", { className: "flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-950/35 px-3 py-2", children: [
                  /* @__PURE__ */ jsx10(
                    "input",
                    {
                      type: "checkbox",
                      checked: includeTokenAndPrice,
                      onChange: (event) => setIncludeTokenAndPrice(event.target.checked),
                      className: "h-4 w-4 accent-amber-300"
                    }
                  ),
                  "Token and price"
                ] }),
                /* @__PURE__ */ jsx10("p", { className: "flex items-center rounded-xl border border-stone-800 bg-stone-950/35 px-3 py-2 text-xs text-stone-500", children: format === "html" ? "HTML keeps the chat timeline styling and omits raw command output." : "Review exports keep message text readable and omit tool activity." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs9("div", { className: "flex items-center justify-between gap-3 border-t border-stone-800 px-5 py-4", children: [
              /* @__PURE__ */ jsxs9("p", { className: "min-w-0 text-xs text-stone-500", children: [
                selectedCount,
                " ",
                selectedCount === 1 ? "turn" : "turns",
                " will be exported."
              ] }),
              /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx10(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    disabled: busy,
                    className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx10(
                  "button",
                  {
                    type: "button",
                    onClick: handleExport,
                    disabled: !canExport,
                    className: "ui-status-warning rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                    children: busy ? "Exporting..." : `Export ${format.toUpperCase()}`
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/ThreadDetailSurface.tsx
import {
  useMemo as useMemo7
} from "react";
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function ThreadDetailSurface({
  threads,
  detail,
  loading,
  error,
  status = null,
  plugins: providedPlugins,
  adapter,
  metaContent,
  settingsContent,
  mobileHeaderAction,
  appMenuButton,
  appNavigationMenu,
  surfaceActions,
  floatingPanel,
  beforeTimelineContent,
  errorContent,
  workspaceMissingContent,
  dialogs,
  currentThreadId,
  currentWorkspaceId,
  currentWorkspaceLabel,
  onCloseAppNavigation,
  className = "thread-detail-surface relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-none border-y sm:flex-none sm:rounded-[12px] sm:border",
  activeView = "chat",
  liveOutput = "",
  timelineProps,
  composerProps,
  shellComposerProps,
  useFloatingMobileComposer = false,
  floatingMobileComposerBottomOffset = 0,
  composerHostRef,
  shellPanelRef,
  shellEffectiveTheme = "dark",
  onShellStateChange,
  shellUnavailableContent,
  shellDisconnectedContent,
  timelineComponent: TimelineComponent = ThreadTimeline,
  shellPanelComponent: ShellPanelComponent = ThreadShellPanel,
  shellContent,
  loadingContent,
  emptyContent
}) {
  const contextPlugins = usePlugins();
  const plugins = providedPlugins ?? contextPlugins ?? createDefaultPluginContextValue();
  const timelineAdapter = useMemo7(
    () => ({
      ...adapter.getImageAssetUrl ? {
        getImageAssetUrl: (input) => adapter.getImageAssetUrl?.(input.path) ?? ""
      } : {},
      onOpenLinkedThread: adapter.openThread,
      ...adapter.loadHistoryItemDetail ? { onLoadHistoryItemDetail: adapter.loadHistoryItemDetail } : {}
    }),
    [
      adapter.getImageAssetUrl,
      adapter.loadHistoryItemDetail,
      adapter.openThread
    ]
  );
  const terminalPanelEnabled = plugins.getThreadPanels().some((panel) => panel.kind === "terminal");
  const defaultContent = loading ? loadingContent ?? /* @__PURE__ */ jsx11("div", { className: "flex flex-1 items-center justify-center px-6 py-12 text-center text-[var(--theme-fg-muted)]", children: "Loading thread detail..." }) : detail ? /* @__PURE__ */ jsxs10("div", { className, children: [
    surfaceActions ? /* @__PURE__ */ jsx11("div", { className: "pointer-events-none absolute right-4 top-4 z-30 hidden lg:block", children: /* @__PURE__ */ jsx11("div", { className: "pointer-events-auto flex flex-col items-end gap-2", children: surfaceActions }) }) : null,
    floatingPanel ? /* @__PURE__ */ jsx11("div", { className: "fixed right-3 top-20 z-50 lg:absolute lg:right-4 lg:top-16", children: floatingPanel }) : null,
    error && !loading && (errorContent ?? /* @__PURE__ */ jsx11("div", { className: "shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 sm:px-6", children: error })),
    detail.workspacePathStatus === "missing" && (workspaceMissingContent ?? /* @__PURE__ */ jsxs10("div", { className: "shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 sm:px-6", children: [
      /* @__PURE__ */ jsx11("p", { className: "font-medium text-rose-50", children: "Workspace path missing" }),
      /* @__PURE__ */ jsx11("p", { className: "mt-1 break-words text-rose-100/90", children: detail.workspace.absPath })
    ] })),
    beforeTimelineContent,
    /* @__PURE__ */ jsxs10(
      "div",
      {
        className: activeView === "chat" ? "flex min-h-0 flex-1 flex-col" : "hidden",
        children: [
          /* @__PURE__ */ jsx11(
            TimelineComponent,
            {
              threadId: detail.thread.id,
              turns: detail.turns,
              totalTurnCount: detail.totalTurnCount ?? detail.turns.length,
              pendingRequests: detail.pendingRequests,
              activeTurnId: detail.thread.activeTurnId,
              threadRunning: detail.thread.status === "running" || detail.thread.activeTurnId !== null,
              liveOutput,
              className: "thread-timeline-surface min-h-0 flex-1",
              ...timelineProps,
              adapter: timelineAdapter,
              onOpenThread: timelineProps?.onOpenThread ?? adapter.openThread
            }
          ),
          composerProps ? useFloatingMobileComposer ? /* @__PURE__ */ jsx11(
            "div",
            {
              ref: composerHostRef,
              className: "fixed inset-x-0 bottom-0 z-50 overflow-visible sm:hidden",
              style: {
                bottom: `${floatingMobileComposerBottomOffset}px`,
                paddingBottom: "env(safe-area-inset-bottom)"
              },
              children: /* @__PURE__ */ jsx11(
                ThreadComposer,
                {
                  ...composerProps,
                  activeView: "chat",
                  edgeToEdgeMobile: true,
                  onSubmit: adapter.sendPrompt
                }
              )
            }
          ) : /* @__PURE__ */ jsx11("div", { ref: composerHostRef, children: /* @__PURE__ */ jsx11(
            ThreadComposer,
            {
              ...composerProps,
              activeView: "chat",
              onSubmit: adapter.sendPrompt
            }
          ) }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsxs10(
      "div",
      {
        className: activeView === "shell" ? "flex min-h-0 flex-1 flex-col" : "hidden",
        children: [
          shellContent ?? (detail.thread.isLoaded && terminalPanelEnabled && adapter.shell ? /* @__PURE__ */ jsx11(
            ShellPanelComponent,
            {
              ref: shellPanelRef,
              threadId: detail.thread.id,
              shellAdapter: adapter.shell,
              effectiveTheme: shellEffectiveTheme,
              isVisible: activeView === "shell",
              showHeader: false,
              showFloatingToolbox: false,
              ...onShellStateChange ? { onStateChange: onShellStateChange } : {}
            }
          ) : detail.thread.isLoaded && !terminalPanelEnabled ? shellUnavailableContent ?? /* @__PURE__ */ jsx11("div", { className: "flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs10("div", { className: "thread-empty-surface max-w-md rounded-[1.6rem] border px-6 py-8 text-center", children: [
            /* @__PURE__ */ jsx11("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Terminal plugin disabled" }),
            /* @__PURE__ */ jsx11("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-muted)]", children: "Enable the Terminal plugin in Settings to use the shell panel." })
          ] }) }) : shellDisconnectedContent ?? /* @__PURE__ */ jsx11("div", { className: "flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs10("div", { className: "thread-empty-surface max-w-md rounded-[1.6rem] border px-6 py-8 text-center", children: [
            /* @__PURE__ */ jsx11("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Thread disconnected" }),
            /* @__PURE__ */ jsx11("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-soft)]", children: "Reconnect this thread before creating or attaching a shell." })
          ] }) })),
          activeView === "shell" && shellComposerProps && !shellContent ? /* @__PURE__ */ jsx11(
            ThreadComposer,
            {
              ...shellComposerProps,
              activeView: "shell",
              onSubmit: adapter.sendPrompt
            }
          ) : null
        ]
      }
    ),
    dialogs
  ] }) : emptyContent ?? /* @__PURE__ */ jsx11("div", { className: "flex flex-1 items-center justify-center px-6 py-12 text-center text-[var(--theme-fg-muted)]", children: "Select a thread to inspect." });
  return /* @__PURE__ */ jsx11(
    ThreadWorkspaceLayout,
    {
      threads,
      status,
      loading,
      error: loading ? null : error,
      viewportConstrained: true,
      currentThreadId: currentThreadId ?? detail?.thread.id,
      currentThreadLabel: detail?.thread.title,
      currentWorkspaceId: currentWorkspaceId ?? detail?.thread.workspaceId,
      currentWorkspaceLabel: currentWorkspaceLabel ?? detail?.workspace.label,
      metaContent,
      settingsContent,
      mobileHeaderAction,
      appMenuButton,
      appNavigationMenu,
      showMobileNewThreadShortcut: false,
      onOpenThread: adapter.openThread,
      ...onCloseAppNavigation ? { onCloseAppNavigation } : {},
      ...adapter.getThreadHref ? { getThreadHref: adapter.getThreadHref } : {},
      ...adapter.getNewThreadHref ? { getNewThreadHref: adapter.getNewThreadHref } : {},
      ...adapter.renameThread ? { onRenameThread: adapter.renameThread } : {},
      ...adapter.deleteThread ? { onDeleteThread: adapter.deleteThread } : {},
      children: defaultContent
    }
  );
}

// src/plugins/PluginProvider.tsx
import {
  useCallback as useCallback4,
  useEffect as useEffect9,
  useMemo as useMemo8,
  useState as useState7
} from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
function PluginProvider({
  adapter = {},
  children
}) {
  const [plugins, setPlugins] = useState7(
    () => mergePluginState(builtinFrontendPlugins, [])
  );
  const [loading, setLoading] = useState7(false);
  const [error, setError] = useState7(null);
  const refresh = useCallback4(async () => {
    setLoading(true);
    setError(null);
    try {
      const serverPlugins = adapter.fetchPlugins ? await adapter.fetchPlugins() : [];
      setPlugins(mergePluginState(builtinFrontendPlugins, serverPlugins));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load plugins.");
    } finally {
      setLoading(false);
    }
  }, [adapter]);
  useEffect9(() => {
    void refresh();
  }, [refresh]);
  const setPluginEnabled = useCallback4(
    async (pluginId, enabled) => {
      if (adapter.updatePlugin) {
        const updated = await adapter.updatePlugin(pluginId, { enabled });
        setPlugins(
          (current) => current.map((plugin) => plugin.id === updated.id ? updated : plugin)
        );
        return;
      }
      setPlugins(
        (current) => current.map(
          (plugin) => plugin.id === pluginId ? { ...plugin, enabled } : plugin
        )
      );
    },
    [adapter]
  );
  const importPluginManifest = useCallback4(
    async (input) => {
      if (!adapter.importPlugin) {
        throw new Error("Plugin import is not available.");
      }
      const imported = await adapter.importPlugin(input);
      setPlugins((current) => {
        const next = current.filter((plugin) => plugin.id !== imported.id);
        return [...next, imported];
      });
    },
    [adapter]
  );
  const uninstallPlugin = useCallback4(
    async (pluginId) => {
      if (!adapter.deletePlugin) {
        throw new Error("Plugin uninstall is not available.");
      }
      const removed = await adapter.deletePlugin(pluginId);
      setPlugins(
        (current) => current.filter((plugin) => plugin.id !== removed.id)
      );
    },
    [adapter]
  );
  const enabledModules = useMemo8(() => {
    const enabledIds = new Set(
      plugins.filter((plugin) => plugin.enabled).map((plugin) => plugin.id)
    );
    return builtinFrontendPlugins.filter(
      (module) => enabledIds.has(module.manifest.id)
    );
  }, [plugins]);
  const renderArtifact = useCallback4(
    (context) => {
      const module = enabledModules.find(
        (entry) => entry.renderArtifact && entry.manifest.capabilities.artifactTypes.some(
          (type) => type.type === context.artifact.type
        )
      );
      return module?.renderArtifact?.(context) ?? null;
    },
    [enabledModules]
  );
  const renderInlineCode = useCallback4(
    (context) => {
      for (const module of enabledModules) {
        for (const renderer of module.inlineCodeRenderers ?? []) {
          if (!renderer.languages.includes(context.language.trim().toLowerCase())) {
            continue;
          }
          const rendered = renderer.render(context);
          if (rendered) {
            return rendered;
          }
        }
      }
      return null;
    },
    [enabledModules]
  );
  const hasRendererForArtifact = useCallback4(
    (artifact) => enabledModules.some(
      (entry) => Boolean(entry.renderArtifact) && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === artifact.type
      )
    ),
    [enabledModules]
  );
  const getThreadPanels = useCallback4(
    () => enabledModules.flatMap((module) => module.threadPanels ?? []),
    [enabledModules]
  );
  const value = useMemo8(
    () => ({
      plugins,
      loading,
      error,
      refresh,
      importPluginManifest,
      setPluginEnabled,
      uninstallPlugin,
      renderArtifact,
      renderInlineCode,
      hasRendererForArtifact,
      getThreadPanels
    }),
    [
      error,
      getThreadPanels,
      hasRendererForArtifact,
      importPluginManifest,
      loading,
      plugins,
      refresh,
      renderArtifact,
      renderInlineCode,
      setPluginEnabled,
      uninstallPlugin
    ]
  );
  return /* @__PURE__ */ jsx12(PluginContext.Provider, { value, children });
}

// src/app-shell/AppShellNavContext.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
var AppShellNavContext = createContext2(
  null
);
function useAppShellNav() {
  return useContext2(AppShellNavContext);
}

// src/app-shell/AppShellNavigation.tsx
import { useEffect as useEffect10, useRef as useRef5, useState as useState8 } from "react";
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function MenuIcon() {
  return /* @__PURE__ */ jsx13("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx13("path", { d: "M2 3.25h12v1.5H2Zm0 4h12v1.5H2Zm0 4h12v1.5H2Z" }) });
}
function CloseIcon() {
  return /* @__PURE__ */ jsx13("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx13("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) });
}
function menuItemClassName(disabled = false) {
  return `flex w-full items-center rounded-[0.95rem] px-3 py-2 text-left text-sm transition ${disabled ? "cursor-not-allowed bg-[var(--theme-muted)] text-[var(--theme-fg-muted)]" : "text-[var(--theme-fg)] hover:bg-[var(--theme-hover)]"}`;
}
var themeOptions = [
  {
    value: "light",
    label: "Light",
    description: "Always use the bright theme."
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use the dark theme."
  },
  {
    value: "system",
    label: "System",
    description: "Follow the operating system appearance."
  }
];
function AppShellMenuButton({ className = "" }) {
  const shellNav = useAppShellNav();
  if (!shellNav) {
    return null;
  }
  return /* @__PURE__ */ jsx13(
    "button",
    {
      type: "button",
      "aria-label": shellNav.navOpen ? "Close Navigation" : "Open Navigation",
      "aria-expanded": shellNav.navOpen,
      "aria-controls": "app-shell-navigation-menu",
      onClick: shellNav.toggleNav,
      className: `inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--theme-fg)] transition hover:text-[var(--theme-fg-soft)] ${className}`.trim(),
      children: shellNav.navOpen ? /* @__PURE__ */ jsx13(CloseIcon, {}) : /* @__PURE__ */ jsx13(MenuIcon, {})
    }
  );
}
function AppShellNavigationMenu({
  className = "",
  currentPath = "",
  items = [{ label: "Workspaces", href: "/workspaces" }],
  onNavigate
}) {
  const shellNav = useAppShellNav();
  const menuRef = useRef5(null);
  useEffect10(() => {
    if (!shellNav?.navOpen) {
      return;
    }
    const activeNav = shellNav;
    function handlePointerDown(event) {
      const target = event.target;
      if (!target) {
        return;
      }
      const menuNode = menuRef.current;
      if (menuNode?.contains(target)) {
        return;
      }
      const trigger = target instanceof Element ? target.closest('[aria-controls="app-shell-navigation-menu"]') : null;
      if (trigger) {
        return;
      }
      activeNav.closeNav();
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [shellNav]);
  if (!shellNav?.navOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      ref: menuRef,
      id: "app-shell-navigation-menu",
      onPointerDown: (event) => event.stopPropagation(),
      onMouseDown: (event) => event.stopPropagation(),
      onTouchStart: (event) => event.stopPropagation(),
      className: `rounded-[1.8rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] p-4 shadow-2xl shadow-black/15 backdrop-blur ${className}`.trim(),
      children: [
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx13("p", { className: "text-base font-semibold tracking-wide text-[var(--theme-accent-strong)]", children: "Remote Codex" }),
          /* @__PURE__ */ jsx13("p", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Navigation" })
        ] }),
        /* @__PURE__ */ jsxs11("nav", { className: "mt-4 flex flex-col gap-1.5 text-sm", children: [
          items.map((item) => {
            const active = currentPath === item.href;
            return /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                disabled: active,
                onClick: () => {
                  if (active) {
                    return;
                  }
                  shellNav.closeNav();
                  onNavigate?.(item.href);
                },
                className: menuItemClassName(active),
                children: item.label
              },
              item.href
            );
          }),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              onClick: shellNav.openSettings,
              className: menuItemClassName(),
              children: "Settings"
            }
          )
        ] })
      ]
    }
  );
}
function defaultImportPluginInput(draft) {
  const trimmed = draft.trim();
  const isManifestJson = trimmed.startsWith("{") || trimmed.startsWith("[");
  return {
    ...isManifestJson ? { manifestJson: trimmed } : { manifestUrl: trimmed },
    enabled: true
  };
}
function AppShellSettingsDialog({
  extraContent,
  importPluginInput = defaultImportPluginInput
} = {}) {
  const shellNav = useAppShellNav();
  const plugins = usePlugins();
  const [pluginImportDraft, setPluginImportDraft] = useState8("");
  const [pluginImportState, setPluginImportState] = useState8({
    busy: false,
    message: null,
    error: null
  });
  const selectedThemeMode = shellNav?.themeMode ?? "system";
  const effectiveTheme = shellNav?.effectiveTheme ?? "dark";
  useEffect10(() => {
    if (!shellNav?.settingsOpen) {
      return;
    }
    const activeNav = shellNav;
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        activeNav.closeSettings();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shellNav]);
  async function handleImportPlugin() {
    const draft = pluginImportDraft.trim();
    if (!draft || pluginImportState.busy) {
      return;
    }
    setPluginImportState({
      busy: true,
      message: null,
      error: null
    });
    try {
      await plugins.importPluginManifest(importPluginInput(draft));
      setPluginImportDraft("");
      setPluginImportState({
        busy: false,
        message: "Plugin imported.",
        error: null
      });
    } catch (error) {
      setPluginImportState({
        busy: false,
        message: null,
        error: error instanceof Error ? error.message : "Unable to import plugin."
      });
    }
  }
  async function handleUninstallPlugin(pluginId, pluginName) {
    const confirmed = window.confirm(`Uninstall ${pluginName}?`);
    if (!confirmed) {
      return;
    }
    try {
      await plugins.uninstallPlugin(pluginId);
    } catch (error) {
      setPluginImportState({
        busy: false,
        message: null,
        error: error instanceof Error ? error.message : "Unable to uninstall plugin."
      });
    }
  }
  if (!shellNav?.settingsOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs11("div", { className: "fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[max(env(safe-area-inset-top),1rem)] sm:items-center", children: [
    /* @__PURE__ */ jsx13(
      "button",
      {
        type: "button",
        "aria-label": "Close Settings",
        onClick: shellNav.closeSettings,
        className: "ui-overlay-scrim absolute inset-0 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxs11(
      "section",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Settings",
        className: "relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] shadow-2xl shadow-black/20",
        children: [
          /* @__PURE__ */ jsx13("div", { className: "shrink-0 p-5 pb-0", children: /* @__PURE__ */ jsxs11("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsx13("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Settings" }),
              /* @__PURE__ */ jsx13("h2", { className: "mt-2 text-xl font-semibold text-[var(--theme-fg)]", children: "Settings" }),
              /* @__PURE__ */ jsx13("p", { className: "mt-2 text-sm leading-6 text-[var(--theme-fg-soft)]", children: "Manage appearance and thread UI plugins." })
            ] }),
            /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                "aria-label": "Close Settings",
                onClick: shellNav.closeSettings,
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-surface-strong)] text-[var(--theme-fg)] transition hover:border-[var(--theme-border-contrast)] hover:bg-[var(--theme-hover)]",
                children: /* @__PURE__ */ jsx13(CloseIcon, {})
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx13("div", { className: "min-h-0 flex-1 overflow-y-auto p-5 pt-5", children: /* @__PURE__ */ jsxs11("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs11("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: [
              /* @__PURE__ */ jsx13("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs11("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx13("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Appearance" }),
                /* @__PURE__ */ jsxs11("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: [
                  "Choose light, dark, or follow the system setting. Active: ",
                  effectiveTheme,
                  "."
                ] })
              ] }) }),
              /* @__PURE__ */ jsx13("div", { className: "mt-3 grid gap-2 sm:grid-cols-3", children: themeOptions.map((option) => {
                const active = selectedThemeMode === option.value;
                return /* @__PURE__ */ jsxs11(
                  "button",
                  {
                    type: "button",
                    onClick: () => shellNav.setThemeMode(option.value),
                    className: `block rounded-[1rem] border px-3 py-2.5 text-left transition ${active ? "border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-strong)] hover:bg-[var(--theme-hover)]"}`,
                    children: [
                      /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx13("span", { className: "text-sm font-medium text-[var(--theme-fg)]", children: option.label }),
                        active ? /* @__PURE__ */ jsx13("span", { className: "rounded-full border border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--theme-accent-strong)]", children: "Active" }) : null
                      ] }),
                      /* @__PURE__ */ jsx13("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: option.description })
                    ]
                  },
                  option.value
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs11("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: [
              /* @__PURE__ */ jsxs11("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs11("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx13("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Plugins" }),
                  /* @__PURE__ */ jsx13("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Enable renderers and thread extensions loaded by this UI." })
                ] }),
                /* @__PURE__ */ jsx13(
                  "button",
                  {
                    type: "button",
                    onClick: () => void plugins.refresh(),
                    disabled: plugins.loading,
                    className: "rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-1.5 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:text-[var(--theme-fg-muted)]",
                    children: plugins.loading ? "Loading..." : "Refresh"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs11("div", { className: "mt-3 grid gap-2", children: [
                plugins.plugins.map((plugin) => /* @__PURE__ */ jsxs11(
                  "div",
                  {
                    className: "flex items-start justify-between gap-3 rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-2.5",
                    children: [
                      /* @__PURE__ */ jsxs11("span", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx13("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: plugin.name }),
                        /* @__PURE__ */ jsx13("span", { className: "mt-1 block text-xs leading-5 text-[var(--theme-fg-muted)]", children: plugin.description }),
                        /* @__PURE__ */ jsx13("span", { className: "mt-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: [
                          ...plugin.capabilities.artifactTypes.map((type) => type.type),
                          ...plugin.capabilities.threadPanels.map((panel) => panel.kind ?? panel.id)
                        ].join(", ") || "utility" }),
                        /* @__PURE__ */ jsx13("span", { className: "mt-1 block text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: plugin.source === "imported" ? "Imported manifest" : "Built-in module" })
                      ] }),
                      /* @__PURE__ */ jsxs11("span", { className: "flex shrink-0 items-center gap-2", children: [
                        plugin.source === "imported" ? /* @__PURE__ */ jsx13(
                          "button",
                          {
                            type: "button",
                            onClick: () => void handleUninstallPlugin(plugin.id, plugin.name),
                            className: "rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1.5 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)]",
                            children: "Uninstall"
                          }
                        ) : null,
                        /* @__PURE__ */ jsxs11("label", { className: "sr-only", htmlFor: `plugin-toggle-${plugin.id}`, children: [
                          "Toggle ",
                          plugin.name
                        ] }),
                        /* @__PURE__ */ jsx13(
                          "input",
                          {
                            id: `plugin-toggle-${plugin.id}`,
                            type: "checkbox",
                            checked: plugin.enabled,
                            onChange: (event) => void plugins.setPluginEnabled(plugin.id, event.currentTarget.checked),
                            className: "h-4 w-4 accent-[var(--theme-accent-solid)]"
                          }
                        )
                      ] })
                    ]
                  },
                  plugin.id
                )),
                plugins.plugins.length === 0 && /* @__PURE__ */ jsx13("p", { className: "rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No plugins are registered." })
              ] }),
              /* @__PURE__ */ jsxs11("div", { className: "mt-3 border-t border-[var(--theme-border)] pt-3", children: [
                /* @__PURE__ */ jsx13("label", { className: "block text-xs font-medium text-[var(--theme-fg)]", children: "Import plugin" }),
                /* @__PURE__ */ jsx13(
                  "textarea",
                  {
                    value: pluginImportDraft,
                    onChange: (event) => {
                      setPluginImportDraft(event.currentTarget.value);
                      if (pluginImportState.message || pluginImportState.error) {
                        setPluginImportState({ busy: false, message: null, error: null });
                      }
                    },
                    placeholder: "Paste plugin.json or manifest URL",
                    rows: 4,
                    className: "mt-2 min-h-28 w-full resize-y rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-2 font-mono text-xs leading-5 text-[var(--theme-fg)] outline-none transition placeholder:text-[var(--theme-fg-muted)] focus:border-[var(--theme-accent-border)]"
                  }
                ),
                /* @__PURE__ */ jsxs11("div", { className: "mt-2 flex flex-wrap items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx13("p", { className: "max-w-[42rem] text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Imports register manifest-declared artifact types. Rendering code still needs a trusted built-in frontend module." }),
                  /* @__PURE__ */ jsx13(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleImportPlugin(),
                      disabled: !pluginImportDraft.trim() || pluginImportState.busy,
                      className: "rounded-full border border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--theme-accent-strong)] transition hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--theme-fg-muted)]",
                      children: pluginImportState.busy ? "Importing..." : "Import"
                    }
                  )
                ] }),
                pluginImportState.error && /* @__PURE__ */ jsx13("p", { className: "mt-2 text-xs text-rose-300", children: pluginImportState.error }),
                pluginImportState.message && /* @__PURE__ */ jsx13("p", { className: "mt-2 text-xs text-emerald-300", children: pluginImportState.message })
              ] }),
              plugins.error && /* @__PURE__ */ jsx13("p", { className: "mt-2 text-xs text-rose-300", children: plugins.error })
            ] }),
            extraContent
          ] }) })
        ]
      }
    )
  ] });
}
export {
  AppShellMenuButton,
  AppShellNavContext,
  AppShellNavigationMenu,
  AppShellSettingsDialog,
  ConfirmDialog,
  ExportTranscriptDialog,
  InlineXyzRenderer,
  LongTextDialog,
  PluginContext,
  PluginProvider,
  ThreadCards,
  ThreadComposer,
  ThreadDetailSurface,
  ThreadShellPanel,
  ThreadTimeline,
  ThreadWorkspaceLayout,
  XyzArtifactRenderer,
  builtinFrontendPlugins,
  formatLongTimestamp,
  formatShortTimestamp,
  hasLikelyMarkdownSyntax,
  historyItemAccentClassName,
  historyItemLabel,
  mergePluginState,
  threadStatusClassName,
  threadStatusLabel,
  turnStatusLabel,
  useAppShellNav,
  usePlugins
};
