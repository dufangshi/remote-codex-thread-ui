// src/components/ThreadGraphWorkspacePanel.tsx
import { memo as memo2, useEffect as useEffect6, useMemo as useMemo5, useState as useState5 } from "react";
import {
  BarChart2 as BarChart22,
  BookOpen,
  GitBranch,
  Paperclip,
  Terminal,
  Trash2 as Trash24,
  Wrench
} from "lucide-react";

// src/components/graph-workspace/GraphWorkspaceExplorer.tsx
import {
  useEffect as useEffect3,
  useMemo as useMemo3,
  useRef as useRef2,
  useState as useState3
} from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight as ChevronsRight2,
  Download as Download2,
  File,
  FileArchive,
  FileCode2,
  FileImage,
  Folder,
  FolderOpen,
  RefreshCw,
  Trash2 as Trash22,
  Upload
} from "lucide-react";

// src/components/graph-workspace/workspaceTree.ts
var MOLECULAR_EXTENSIONS = /* @__PURE__ */ new Set(["xyz", "extxyz", "cif", "pdb"]);
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "svg"
]);
var PDF_EXTENSIONS = /* @__PURE__ */ new Set(["pdf"]);
function collectArtifacts(detail) {
  const artifacts = [];
  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (item.kind === "artifact" && item.artifact) {
        artifacts.push(item.artifact);
      }
    }
  }
  for (const item of detail.liveItems?.items ?? []) {
    if (item.kind === "artifact" && item.artifact) {
      artifacts.push(item.artifact);
    }
  }
  return artifacts;
}
function sanitizePathSegment(value) {
  return value.trim().replace(/^\/+|\/+$/g, "").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
function extensionOf(path) {
  return path.split(".").pop()?.toLowerCase() || "";
}
function fileNameFromPath(path) {
  return path.split("/").filter(Boolean).at(-1) ?? path;
}
function workspaceTreeNodeToGraphNode(node) {
  const kind = node.kind === "directory" ? "directory" : "file";
  const children = (node.children ?? []).map(workspaceTreeNodeToGraphNode);
  return {
    id: `workspace:${node.path}`,
    name: node.name,
    path: node.path,
    kind,
    ...node.size !== void 0 ? { size: node.size } : {},
    ...node.hasChildren !== void 0 ? { hasChildren: node.hasChildren } : kind === "directory" ? { hasChildren: children.length > 0 } : {},
    ...node.childrenLoaded !== void 0 ? { childrenLoaded: node.childrenLoaded } : kind === "directory" ? { childrenLoaded: node.children !== void 0 } : {},
    ...node.truncated !== void 0 ? { truncated: node.truncated } : {},
    workspaceNode: node,
    children
  };
}
function replaceWorkspaceNodeChildren(node, targetPath, children, options = {}) {
  if (node.path === targetPath) {
    return {
      ...node,
      children,
      hasChildren: children.length > 0,
      childrenLoaded: true,
      truncated: options.truncated ?? node.truncated
    };
  }
  if (node.children.length === 0) {
    return node;
  }
  let changed = false;
  const nextChildren = node.children.map((child) => {
    const nextChild = replaceWorkspaceNodeChildren(
      child,
      targetPath,
      children,
      options
    );
    if (nextChild !== child) {
      changed = true;
    }
    return nextChild;
  });
  return changed ? { ...node, children: nextChildren } : node;
}
function findFirstWorkspaceFile(node) {
  if (node.kind === "file") {
    return node;
  }
  for (const child of node.children) {
    const found = findFirstWorkspaceFile(child);
    if (found) {
      return found;
    }
  }
  return null;
}
function hasWorkspacePath(node, targetPath) {
  if (!node || !targetPath) {
    return false;
  }
  if (node.path === targetPath) {
    return true;
  }
  return node.children.some((child) => hasWorkspacePath(child, targetPath));
}
function buildMoleculePreviewSnapshot(file) {
  if (!file) {
    return null;
  }
  const extension = extensionOf(file.path);
  if (!MOLECULAR_EXTENSIONS.has(extension)) {
    return null;
  }
  return {
    content: [file.content.endsWith("\n") ? file.content : `${file.content}
`],
    format: extension === "extxyz" ? "xyz" : extension,
    name: file.name,
    uuid: file.path
  };
}
function languageForPath(path) {
  const extension = extensionOf(path);
  if (extension === "tsx" || extension === "jsx") {
    return "tsx";
  }
  if (extension === "yml") {
    return "yaml";
  }
  return extension || "text";
}
function ensureDirectory(root, segments) {
  let current = root;
  let path = "";
  for (const segment of segments) {
    path = path ? `${path}/${segment}` : segment;
    let child = current.children.find(
      (node) => node.kind === "directory" && node.name === segment
    );
    if (!child) {
      child = {
        id: `dir:${path}`,
        name: segment,
        path,
        kind: "directory",
        children: []
      };
      current.children.push(child);
    }
    current = child;
  }
  return current;
}
function addPathNode(root, path, node) {
  const segments = path.split("/").filter(Boolean);
  const fileName = segments.pop() ?? node.name;
  const parent = ensureDirectory(root, segments);
  parent.children.push({
    ...node,
    name: node.name || fileName,
    path
  });
}
function compareWorkspaceNodes(left, right) {
  if (left.kind === "directory" && right.kind !== "directory") {
    return -1;
  }
  if (left.kind !== "directory" && right.kind === "directory") {
    return 1;
  }
  return left.name.localeCompare(right.name);
}
function sortWorkspaceTree(node) {
  node.children.sort(compareWorkspaceNodes);
  for (const child of node.children) {
    sortWorkspaceTree(child);
  }
  return node;
}
function collectWorkspaceItems(detail, artifacts, status, activeView) {
  const root = {
    id: "root",
    name: detail.workspace.label ?? "Workspace",
    path: "",
    kind: "directory",
    children: []
  };
  const artifactRoot = {
    id: "artifacts",
    name: "artifacts",
    path: "artifacts",
    kind: "directory",
    children: []
  };
  for (const artifact of artifacts) {
    const title = artifact.title || artifact.id;
    const safeName = sanitizePathSegment(title) || artifact.id;
    artifactRoot.children.push({
      id: `artifact:${artifact.id}`,
      name: `${safeName}.artifact`,
      path: `artifacts/${safeName}.artifact`,
      kind: "artifact",
      artifact,
      preview: artifact.summaryText ?? artifact.type,
      detail: JSON.stringify(artifact.payload, null, 2),
      children: []
    });
  }
  const eventRoot = {
    id: "thread-events",
    name: "thread-events",
    path: "thread-events",
    kind: "directory",
    children: []
  };
  const liveRoot = {
    id: "live",
    name: "live",
    path: "live",
    kind: "directory",
    children: []
  };
  let sequence = 0;
  const addEventNode = (turnId, item, live = false) => {
    sequence += 1;
    const label = item.kind.replace(/([A-Z])/g, "-$1").toLowerCase();
    const eventPath = `${live ? "live" : `thread-events/${turnId}`}/${String(
      sequence
    ).padStart(3, "0")}-${label}.json`;
    const preview = "text" in item && typeof item.text === "string" ? item.text.slice(0, 160) : item.kind;
    const artifact = item.kind === "artifact" && item.artifact ? item.artifact : null;
    const node = artifact && live ? {
      id: `live-artifact:${artifact.id}`,
      name: artifact.title || artifact.id,
      path: eventPath,
      kind: "live-artifact",
      artifact,
      item,
      preview: artifact.summaryText ?? artifact.type,
      detail: JSON.stringify(artifact.payload, null, 2),
      children: []
    } : {
      id: `event:${item.id}`,
      name: fileNameFromPath(eventPath),
      path: eventPath,
      kind: "event",
      item,
      preview,
      detail: JSON.stringify(item, null, 2),
      children: []
    };
    if (live) {
      liveRoot.children.push(node);
      return;
    }
    addPathNode(eventRoot, eventPath.replace(/^thread-events\//, ""), node);
  };
  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (item.kind === "commandExecution" || item.kind === "webSearch" || item.kind === "fileRead" || item.kind === "fileChange" || item.kind === "agentToolCall" || item.kind === "skillToolCall" || item.kind === "toolCall" || item.kind === "hook" || item.kind === "plan" || item.kind === "reasoning") {
        addEventNode(turn.id, item);
      }
    }
  }
  for (const item of detail.liveItems?.items ?? []) {
    addEventNode(detail.thread.activeTurnId ?? "live", item, true);
  }
  void status;
  void activeView;
  root.children.push(artifactRoot, eventRoot, liveRoot);
  return sortWorkspaceTree(root);
}
function flattenWorkspaceNodes(root) {
  const map = /* @__PURE__ */ new Map();
  const visit = (node) => {
    map.set(node.id, node);
    for (const child of node.children) {
      visit(child);
    }
  };
  visit(root);
  return map;
}
function findFirstPreviewNode(node) {
  if (node.kind === "artifact" || node.kind === "live-artifact" || node.kind === "event" || node.kind === "file") {
    return node;
  }
  for (const child of node.children) {
    const found = findFirstPreviewNode(child);
    if (found) {
      return found;
    }
  }
  return null;
}
function collectAncestorPaths(path) {
  const segments = path.split("/").filter(Boolean);
  const paths = [];
  for (let index = 1; index <= segments.length; index += 1) {
    paths.push(segments.slice(0, index).join("/"));
  }
  return paths;
}

// src/components/graph-workspace/GraphWorkspacePreviewPane.tsx
import {
  memo,
  useEffect as useEffect2,
  useState as useState2
} from "react";
import {
  ChevronsRight,
  Pencil,
  Save,
  X
} from "lucide-react";

// src/components/graph-workspace/GraphWorkspaceCards.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function WorkspaceInfoCard({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { className: "thread-workspace-card rounded-lg border p-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: label }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-[var(--theme-fg)]", children })
  ] });
}

// src/components/graph-workspace/GraphMoleculeViewer.tsx
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo as useMemo2, useRef, useState } from "react";

// src/components/graph-workspace/GraphMoleculeViewerLowerButtonGroup.tsx
import {
  AlignVerticalDistributeCenter,
  ArrowUpRight,
  Box,
  Boxes,
  Bubbles,
  CircleX,
  Eraser,
  Rotate3d,
  Send,
  Share2,
  Spline,
  Trash2,
  Waypoints
} from "lucide-react";

// src/components/graph-ui/Button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/components/graph-ui/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/graph-ui/Button.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx2(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/graph-ui/ButtonGroup.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";

// src/components/graph-ui/Separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx3 } from "react/jsx-runtime";
function Separator({
  className,
  decorative = true,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}

// src/components/graph-ui/ButtonGroup.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var buttonGroupVariants = cva2(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(buttonGroupVariants({ orientation }), className),
      ...props
    }
  );
}
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    Separator,
    {
      "data-slot": "button-group-separator",
      orientation,
      className: cn(
        "relative !m-0 self-stretch bg-input data-[orientation=vertical]:h-auto",
        className
      ),
      ...props
    }
  );
}

// src/components/graph-ui/Tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ jsx5(TooltipProvider, { children: /* @__PURE__ */ jsx5(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx5(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  children,
  className,
  sideOffset = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx5(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs2(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-balance text-xs text-background animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx5(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}

// src/components/graph-workspace/GraphMoleculeViewerControls.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function moleculeSlug(value) {
  const normalized = value?.trim().replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || "molecule";
}
function downloadTextFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
function GraphMoleculeIconButton({
  children,
  disabled,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxs3(Tooltip, { children: [
    /* @__PURE__ */ jsx6(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx6(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "icon",
        className: "thread-graph-molecule-button size-8",
        disabled,
        onClick,
        title: label,
        "aria-label": label,
        children
      }
    ) }),
    /* @__PURE__ */ jsx6(TooltipContent, { children: /* @__PURE__ */ jsx6("p", { children: label }) })
  ] });
}
function GraphMoleculeButtonGroup({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx6(ButtonGroup, { className: `thread-graph-molecule-button-group ${className}`, children });
}

// src/components/graph-workspace/GraphMoleculeViewerLowerButtonGroup.tsx
import { Fragment, jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function GraphMoleculeViewerLowerButtonGroup({
  cameraInfo,
  onClearSelection,
  onClearStaged,
  onSendSelection,
  onSendStaged,
  onStageSelection,
  onToggleUnitCell,
  selectedAtomLabels,
  selectedSerials,
  stagedAtoms,
  stagedMolecules,
  unitCellAvailable,
  unitCellVisible
}) {
  const hasSelection = selectedSerials.length > 0;
  const hasStaged = stagedAtoms > 0;
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex w-full justify-between gap-2 overflow-x-auto", children: [
      /* @__PURE__ */ jsxs4(GraphMoleculeButtonGroup, { children: [
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Distance", children: /* @__PURE__ */ jsx7(AlignVerticalDistributeCenter, { className: "size-4" }) }),
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Connectivity", children: /* @__PURE__ */ jsx7(Share2, { className: "size-4" }) }),
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Angle", children: /* @__PURE__ */ jsx7(Waypoints, { className: "size-4" }) }),
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Dihedral", children: /* @__PURE__ */ jsx7(Spline, { className: "size-4" }) }),
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Add dummy atoms", children: /* @__PURE__ */ jsx7(Bubbles, { className: "size-4" }) }),
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Delete atoms", children: /* @__PURE__ */ jsx7(CircleX, { className: "size-4" }) }),
        /* @__PURE__ */ jsx7(GraphMoleculeIconButton, { label: "Rotate", children: /* @__PURE__ */ jsx7(Rotate3d, { className: "size-4" }) })
      ] }),
      /* @__PURE__ */ jsxs4(GraphMoleculeButtonGroup, { children: [
        /* @__PURE__ */ jsx7(
          GraphMoleculeIconButton,
          {
            label: unitCellVisible ? "Hide unit cell" : "Show unit cell",
            disabled: !unitCellAvailable,
            onClick: onToggleUnitCell,
            children: /* @__PURE__ */ jsx7(Boxes, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          GraphMoleculeIconButton,
          {
            label: "Clear selection",
            disabled: !hasSelection,
            onClick: onClearSelection,
            children: /* @__PURE__ */ jsx7(Trash2, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          GraphMoleculeIconButton,
          {
            label: "Send selection",
            disabled: !hasSelection,
            onClick: onSendSelection,
            children: /* @__PURE__ */ jsx7(Send, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          GraphMoleculeIconButton,
          {
            label: "Stage current selection",
            disabled: !hasSelection,
            onClick: onStageSelection,
            children: /* @__PURE__ */ jsx7(Box, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          GraphMoleculeIconButton,
          {
            label: "Clear staged selections",
            disabled: !hasStaged,
            onClick: onClearStaged,
            children: /* @__PURE__ */ jsx7(Eraser, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx7(
          GraphMoleculeIconButton,
          {
            label: "Send staged selections",
            disabled: !hasStaged,
            onClick: onSendStaged,
            children: /* @__PURE__ */ jsx7(ArrowUpRight, { className: "size-4" })
          }
        )
      ] })
    ] }),
    cameraInfo ? /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-camera", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx7("strong", { children: "XYZ: " }),
        "x=",
        cameraInfo.position.x.toFixed(1),
        " y=",
        cameraInfo.position.y.toFixed(1),
        " z=",
        cameraInfo.position.z.toFixed(1),
        /* @__PURE__ */ jsx7("br", {}),
        /* @__PURE__ */ jsx7("strong", { children: "Quat: " }),
        "qx=",
        cameraInfo.position.qx.toFixed(2),
        " qy=",
        cameraInfo.position.qy.toFixed(2),
        " qz=",
        cameraInfo.position.qz.toFixed(2),
        " qw=",
        cameraInfo.position.qw.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "thread-graph-molecule-camera-divider" }),
      /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-1 text-[10px]", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          "Selected atoms:",
          " ",
          selectedSerials.length > 0 ? selectedSerials.map(
            (serial) => `${selectedAtomLabels[serial] ?? "Atom"}(${serial})`
          ).join(", ") : "None"
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          "Staged: ",
          stagedMolecules,
          " molecule(s), ",
          stagedAtoms,
          " atom(s)"
        ] })
      ] })
    ] }) : null
  ] });
}

// src/components/graph-workspace/GraphMoleculeViewerUpperButtonGroup.tsx
import { Box as Box2, Camera, Copy, Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
function GraphMoleculeViewerUpperButtonGroup({
  currentIndex,
  exportContent,
  moleculeId,
  onScreenshot,
  viewerRef,
  xyzContent,
  xyzFormat
}) {
  const slug = moleculeSlug(moleculeId);
  async function handleCopyXYZ() {
    if (!xyzContent) {
      return;
    }
    await navigator.clipboard.writeText(xyzContent);
  }
  function handleDownloadXYZ() {
    if (!xyzContent) {
      return;
    }
    downloadTextFile(
      xyzContent,
      `${slug}_step_${currentIndex + 1}.${xyzFormat || "xyz"}`
    );
  }
  function handleDownloadAllXYZ() {
    if (!exportContent) {
      return;
    }
    downloadTextFile(exportContent, `${slug}_trajectory.${xyzFormat || "xyz"}`);
  }
  function handleZoomIn() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoom(1.2);
    viewerRef.current.render();
  }
  function handleZoomOut() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoom(0.8);
    viewerRef.current.render();
  }
  function handleReset() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoomTo();
    viewerRef.current.setCameraParameters({});
    viewerRef.current.render();
  }
  return /* @__PURE__ */ jsxs5(GraphMoleculeButtonGroup, { className: "ml-auto justify-end", children: [
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Copy current structure",
        onClick: () => void handleCopyXYZ(),
        disabled: !xyzContent,
        children: /* @__PURE__ */ jsx8(Copy, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Download current structure",
        onClick: handleDownloadXYZ,
        disabled: !xyzContent,
        children: /* @__PURE__ */ jsx8(Download, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Download full trajectory",
        onClick: handleDownloadAllXYZ,
        disabled: !exportContent,
        children: /* @__PURE__ */ jsx8(Box2, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Copy screenshot",
        onClick: onScreenshot,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx8(Camera, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx8(ButtonGroupSeparator, { className: "thread-graph-molecule-button-divider" }),
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Zoom in",
        onClick: handleZoomIn,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx8(ZoomIn, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Zoom out",
        onClick: handleZoomOut,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx8(ZoomOut, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx8(
      GraphMoleculeIconButton,
      {
        label: "Reset camera",
        onClick: handleReset,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx8(RotateCcw, { className: "size-3.5" })
      }
    )
  ] });
}

// src/components/graph-workspace/load3Dmol.ts
var threeDmolPromise = null;
async function load3Dmol() {
  if (typeof window === "undefined") {
    throw new Error("3Dmol is only available in a browser environment.");
  }
  if (window["3Dmol"]) {
    return window["3Dmol"];
  }
  if (!threeDmolPromise) {
    threeDmolPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[data-remote-codex-3dmol="true"]'
      );
      const handleLoad = () => {
        if (window["3Dmol"]) {
          resolve(window["3Dmol"]);
          return;
        }
        reject(new Error("3Dmol loaded without exposing the expected global."));
      };
      if (existingScript) {
        existingScript.addEventListener("load", handleLoad, { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Unable to load 3Dmol viewer runtime.")),
          { once: true }
        );
        return;
      }
      const script = document.createElement("script");
      script.src = "/vendor/3Dmol-min.js";
      script.async = true;
      script.dataset.remoteCodex3dmol = "true";
      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Unable to load 3Dmol viewer runtime.")),
        { once: true }
      );
      document.head.appendChild(script);
    });
  }
  return threeDmolPromise;
}

// src/components/graph-ui/Slider.tsx
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useMemo } from "react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  max = 100,
  min = 0,
  value,
  ...props
}) {
  const values = useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [defaultValue, max, min, value]
  );
  return /* @__PURE__ */ jsxs6(
    SliderPrimitive.Root,
    {
      "data-slot": "slider",
      ...defaultValue !== void 0 ? { defaultValue } : {},
      ...value !== void 0 ? { value } : {},
      min,
      max,
      className: cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx9(
          SliderPrimitive.Track,
          {
            "data-slot": "slider-track",
            className: "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
            children: /* @__PURE__ */ jsx9(
              SliderPrimitive.Range,
              {
                "data-slot": "slider-range",
                className: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
              }
            )
          }
        ),
        Array.from({ length: values.length }, (_, index) => /* @__PURE__ */ jsx9(
          SliderPrimitive.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
          },
          index
        ))
      ]
    }
  );
}

// src/components/graph-workspace/GraphMoleculeViewerData.ts
function normalizeFormat(format) {
  const normalized = format?.trim().toLowerCase();
  if (!normalized || normalized === "extxyz") {
    return "xyz";
  }
  return normalized;
}
function splitXyzTrajectory(content) {
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const frames = [];
  let cursor = 0;
  while (cursor < lines.length) {
    while (cursor < lines.length && lines[cursor]?.trim() === "") {
      cursor += 1;
    }
    if (cursor >= lines.length) {
      break;
    }
    const atomCount = Number.parseInt(lines[cursor]?.trim() ?? "", 10);
    if (!Number.isFinite(atomCount) || atomCount < 0) {
      return [content];
    }
    const frameLineCount = atomCount + 2;
    if (cursor + frameLineCount > lines.length) {
      return [content];
    }
    frames.push(`${lines.slice(cursor, cursor + frameLineCount).join("\n")}
`);
    cursor += frameLineCount;
  }
  return frames.length > 0 ? frames : [content];
}
function normalizeSnapshotFrames(content, format) {
  if (format !== "xyz") {
    return content;
  }
  return content.flatMap((frame) => splitXyzTrajectory(frame));
}
function joinFramesForExport(content) {
  return content.map((frame) => `${frame.replace(/\s+$/g, "")}
`).join("");
}
function readGraphMoleculeViewerData(source) {
  if (!source) {
    return {
      format: "xyz",
      frames: [],
      exportContent: ""
    };
  }
  if (typeof source === "string") {
    const frames2 = normalizeSnapshotFrames([source], "xyz");
    return {
      frames: frames2,
      format: "xyz",
      exportContent: joinFramesForExport(frames2)
    };
  }
  const format = normalizeFormat(source.format);
  const content = source.content.filter((frame) => frame.trim().length > 0);
  const frames = normalizeSnapshotFrames(content, format);
  return {
    frames,
    format,
    exportContent: joinFramesForExport(content)
  };
}

// src/components/graph-workspace/GraphMoleculeViewer.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
function GraphMoleculeViewer({
  className = "",
  moleculeId = null,
  onScreenshot,
  onSelectionChange,
  source,
  title = "PyMOL-style (PDB/CIF)"
}) {
  const viewerHostRef = useRef(null);
  const viewerRef = useRef(null);
  const modelRef = useRef(null);
  const zoomedRef = useRef(false);
  const unitCellPreferenceRef = useRef(true);
  const [cameraInfo, setCameraInfo] = useState(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredAtom, setHoveredAtom] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAtomLabels, setSelectedAtomLabels] = useState({});
  const [selectedSerials, setSelectedSerials] = useState([]);
  const [stagedSelections, setStagedSelections] = useState({});
  const [unitCellAvailable, setUnitCellAvailable] = useState(false);
  const [unitCellVisible, setUnitCellVisible] = useState(false);
  const [viewerInitError, setViewerInitError] = useState(null);
  const viewerData = useMemo2(() => readGraphMoleculeViewerData(source), [source]);
  const xyzArray = viewerData.frames;
  const xyzFormat = viewerData.format;
  const xyzContent = xyzArray[currentIndex] ?? null;
  const isLive = xyzArray.length > 0 && currentIndex === xyzArray.length - 1;
  const moleculeKey = moleculeId ?? "current";
  const stagedAtoms = Object.values(stagedSelections).reduce(
    (sum, atoms) => sum + atoms.length,
    0
  );
  const stagedMolecules = Object.keys(stagedSelections).length;
  useEffect(() => {
    if (xyzArray.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(xyzArray.length - 1);
  }, [xyzArray.length]);
  useEffect(() => {
    if (!isPlaying || xyzArray.length <= 1) {
      return;
    }
    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => {
        if (previous >= xyzArray.length - 1) {
          window.clearInterval(interval);
          setIsPlaying(false);
          return previous;
        }
        return previous + 1;
      });
    }, 200);
    return () => window.clearInterval(interval);
  }, [isPlaying, xyzArray.length]);
  useEffect(() => {
    const host = viewerHostRef.current;
    if (!host || viewerRef.current) {
      return;
    }
    let cancelled = false;
    try {
      const canvas = document.createElement("canvas");
      const webGl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!webGl) {
        setViewerInitError(
          "WebGL is unavailable in this browser environment. Unable to render 3D viewer."
        );
        return;
      }
    } catch {
      setViewerInitError(
        "WebGL is unavailable in this browser environment. Unable to render 3D viewer."
      );
      return;
    }
    const resizeViewer = () => {
      viewerRef.current?.resize();
      viewerRef.current?.render();
    };
    load3Dmol().then(($3Dmol) => {
      if (cancelled || viewerRef.current) {
        return;
      }
      try {
        const viewer = $3Dmol.createViewer(host, {});
        viewerRef.current = viewer;
        viewer.setBackgroundColor("#f8fafc", 0.8);
        window.addEventListener("resize", resizeViewer);
        window.setTimeout(resizeViewer, 100);
      } catch (error) {
        console.error("Failed to initialize 3Dmol viewer:", error);
        setViewerInitError(
          "Failed to initialize 3D viewer. Please refresh or try another browser."
        );
      }
    }).catch((error) => {
      console.error("Failed to load 3Dmol viewer runtime:", error);
      setViewerInitError(
        "Failed to load 3D viewer runtime. Please refresh or try another browser."
      );
    });
    return () => {
      cancelled = true;
      window.removeEventListener("resize", resizeViewer);
      viewerRef.current = null;
      modelRef.current = null;
    };
  }, []);
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !xyzContent) {
      return;
    }
    try {
      viewer.removeAllModels();
      viewer.removeAllShapes();
      viewer.removeAllLabels();
      const model = viewer.addModel(xyzContent, xyzFormat || "xyz");
      modelRef.current = model;
      model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
      const crystalData = model.getCrystData();
      const hasUnitCell = Boolean(
        crystalData && typeof crystalData === "object" && Object.keys(crystalData).length
      );
      setUnitCellAvailable(hasUnitCell);
      setUnitCellVisible(hasUnitCell ? unitCellPreferenceRef.current : false);
      setSelectedSerials([]);
      setSelectedAtomLabels({});
      const frameAtomLabels = xyzContent.split("\n").slice(2).map((line) => line.trim()).filter(Boolean).map((line) => line.split(/\s+/)[0] ?? "Atom");
      if (!zoomedRef.current) {
        viewer.zoomTo();
        zoomedRef.current = true;
      }
      model.setClickable(
        {},
        true,
        (atom, _viewer, event) => {
          const serial = atom.serial ?? atom.index;
          if (serial === void 0) {
            return;
          }
          const label = atom.atom || atom.elem || frameAtomLabels[serial] || "Atom";
          setSelectedSerials((previous) => {
            const isMulti = Boolean(
              event?.shiftKey || event?.metaKey || event?.ctrlKey
            );
            const next = !isMulti ? previous.length === 1 && previous[0] === serial ? [] : [serial] : previous.includes(serial) ? previous.filter((entry) => entry !== serial) : [...previous, serial];
            setSelectedAtomLabels((current) => {
              if (next.length === 0) {
                return {};
              }
              const labelsBySerial = {};
              next.forEach((entry) => {
                labelsBySerial[entry] = current[entry] || frameAtomLabels[entry] || label;
              });
              return labelsBySerial;
            });
            return next;
          });
        }
      );
      model.setHoverable(
        {},
        true,
        (atom, _viewer, event) => {
          if (!event || !atom) {
            return;
          }
          setHoveredAtom({
            x: event.clientX,
            y: event.clientY,
            label: `${atom.atom || atom.elem || "Atom"} (${atom.serial ?? atom.index ?? "?"})`,
            coords: {
              x: atom.x.toFixed(2),
              y: atom.y.toFixed(2),
              z: atom.z.toFixed(2)
            }
          });
        },
        () => setHoveredAtom(null)
      );
      viewer.render();
    } catch (error) {
      console.error("Failed to render molecule:", error);
      setViewerInitError("Unable to render this molecular structure.");
    }
  }, [xyzContent, xyzFormat]);
  useEffect(() => {
    const viewer = viewerRef.current;
    const model = modelRef.current;
    if (!viewer || !model) {
      return;
    }
    try {
      viewer.removeUnitCell(model);
    } catch {
    }
    if (unitCellVisible && unitCellAvailable) {
      try {
        viewer.addUnitCell(model, {
          box: { color: "black", opacity: 1, linewidth: 5 },
          astyle: { radius: 0.12, mid: 0.85, color: "red", opacity: 0.6 },
          bstyle: { radius: 0.12, mid: 0.85, color: "green", opacity: 0.6 },
          cstyle: { radius: 0.12, mid: 0.85, color: "blue", opacity: 0.6 },
          alabel: "a",
          blabel: "b",
          clabel: "c"
        });
      } catch {
        setUnitCellAvailable(false);
        setUnitCellVisible(false);
      }
    }
    viewer.render();
  }, [unitCellAvailable, unitCellVisible, xyzContent, xyzFormat]);
  useEffect(() => {
    const viewer = viewerRef.current;
    const model = modelRef.current;
    if (!viewer || !model || !xyzContent) {
      return;
    }
    model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
    if (selectedSerials.length > 0) {
      model.setStyle(
        { serial: selectedSerials },
        {
          stick: { radius: 0.3, color: "yellow" },
          sphere: { scale: 0.4, color: "yellow" }
        }
      );
    }
    viewer.render();
    onSelectionChange?.({ moleculeId, atoms: selectedSerials });
  }, [moleculeId, onSelectionChange, selectedSerials, xyzContent]);
  useEffect(() => {
    if (!xyzContent) {
      return;
    }
    let animationFrame = 0;
    const tick = () => {
      const view = viewerRef.current?.getView?.();
      if (Array.isArray(view) && view.length >= 8) {
        const [x, y, z, zoom, qx, qy, qz, qw] = view;
        if (typeof x === "number" && typeof y === "number" && typeof z === "number" && typeof zoom === "number" && typeof qx === "number" && typeof qy === "number" && typeof qz === "number" && typeof qw === "number") {
          const magnitude = Math.sqrt(qx * qx + qy * qy + qz * qz);
          const lookAt = magnitude > 0 ? { x: qx / magnitude, y: qy / magnitude, z: qz / magnitude } : { x: 0, y: 0, z: 0 };
          setCameraInfo({
            position: { x, y, z, qx, qy, qz, qw },
            lookAt,
            zoom
          });
        }
      }
      animationFrame = window.requestAnimationFrame(tick);
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [xyzContent]);
  const handleScreenshot = useCallback(async () => {
    const viewer = viewerRef.current;
    if (!viewer?.pngURI) {
      return;
    }
    viewer.render();
    const image = viewer.pngURI();
    if (!image) {
      return;
    }
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({
        [blob.type || "image/png"]: blob
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch {
    }
    onScreenshot?.({ moleculeId, image });
  }, [moleculeId, onScreenshot]);
  function handleToggleUnitCell() {
    if (!unitCellAvailable) {
      return;
    }
    setUnitCellVisible((previous) => {
      const next = !previous;
      unitCellPreferenceRef.current = next;
      return next;
    });
  }
  function handleStageSelection() {
    if (selectedSerials.length === 0) {
      return;
    }
    setStagedSelections((current) => {
      const existing = current[moleculeKey] ?? [];
      return {
        ...current,
        [moleculeKey]: Array.from(/* @__PURE__ */ new Set([...existing, ...selectedSerials]))
      };
    });
  }
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      className: `thread-graph-molecule-viewer flex h-full min-h-0 flex-col bg-white ${className}`,
      children: [
        /* @__PURE__ */ jsxs7("div", { className: "thread-graph-molecule-header flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3", children: [
          /* @__PURE__ */ jsxs7("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx10("h2", { className: "truncate text-sm font-semibold text-slate-900", children: title }),
            /* @__PURE__ */ jsx10("p", { className: "mt-1 hidden text-[11px] text-slate-400 sm:block", children: "cartoon + surface" })
          ] }),
          /* @__PURE__ */ jsx10("span", { className: "shrink-0 text-[11px] text-slate-400", children: "workspace preview" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "thread-graph-molecule-body min-h-0 flex-1", children: [
          /* @__PURE__ */ jsxs7(
            "div",
            {
              ref: viewerHostRef,
              "data-testid": "molecule-viewer",
              className: "thread-graph-molecule-stage relative min-h-0 flex-1 overflow-hidden",
              children: [
                viewerInitError ? /* @__PURE__ */ jsx10(
                  "div",
                  {
                    "data-testid": "molecule-viewer-error",
                    className: "thread-graph-molecule-error absolute inset-0 flex items-center justify-center bg-red-50 p-4 text-sm text-red-700",
                    children: viewerInitError
                  }
                ) : null,
                !viewerInitError && !xyzContent ? /* @__PURE__ */ jsx10("div", { className: "thread-graph-molecule-empty absolute inset-0 flex items-center justify-center p-4 text-sm text-slate-400", children: "No molecule data available." }) : null,
                hoveredAtom ? /* @__PURE__ */ jsxs7(
                  "div",
                  {
                    className: "thread-graph-molecule-tooltip pointer-events-none fixed z-[1000] rounded-md border border-gray-300 bg-white/95 px-2 py-1.5 text-[10px] text-gray-800 shadow-md",
                    style: { left: hoveredAtom.x - 20, top: hoveredAtom.y - 50 },
                    children: [
                      /* @__PURE__ */ jsx10("div", { className: "mb-0.5 font-semibold text-gray-900", children: hoveredAtom.label }),
                      /* @__PURE__ */ jsxs7("div", { className: "space-x-2 text-gray-600", children: [
                        /* @__PURE__ */ jsxs7("span", { children: [
                          "x: ",
                          hoveredAtom.coords.x
                        ] }),
                        /* @__PURE__ */ jsxs7("span", { children: [
                          "y: ",
                          hoveredAtom.coords.y
                        ] }),
                        /* @__PURE__ */ jsxs7("span", { children: [
                          "z: ",
                          hoveredAtom.coords.z
                        ] })
                      ] })
                    ]
                  }
                ) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxs7("div", { className: "thread-graph-molecule-controls shrink-0", children: [
            /* @__PURE__ */ jsxs7("div", { className: "thread-graph-molecule-control-row", children: [
              /* @__PURE__ */ jsxs7("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx10("p", { className: "thread-graph-molecule-control-title", children: "Ball & Stick" }),
                /* @__PURE__ */ jsx10("p", { className: "thread-graph-molecule-control-subtitle", children: "XYZ / PDB / CIF preview" })
              ] }),
              /* @__PURE__ */ jsx10(
                GraphMoleculeViewerUpperButtonGroup,
                {
                  currentIndex,
                  exportContent: viewerData.exportContent,
                  moleculeId,
                  onScreenshot: () => void handleScreenshot(),
                  viewerRef,
                  xyzContent,
                  xyzFormat
                }
              )
            ] }),
            xyzArray.length > 1 ? /* @__PURE__ */ jsxs7("div", { className: "thread-graph-molecule-trajectory", children: [
              /* @__PURE__ */ jsxs7("div", { className: "mb-2 flex justify-between gap-3 text-xs", children: [
                /* @__PURE__ */ jsxs7("span", { className: "flex min-w-0 items-center gap-2", children: [
                  "Trajectory ",
                  currentIndex + 1,
                  " / ",
                  xyzArray.length,
                  /* @__PURE__ */ jsx10(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "thread-graph-molecule-button h-5 w-5",
                      onClick: () => {
                        setIsPlaying((previous) => {
                          const next = !previous;
                          if (next && currentIndex === xyzArray.length - 1) {
                            setCurrentIndex(0);
                          }
                          return next;
                        });
                      },
                      "aria-label": isPlaying ? "Pause trajectory" : "Play trajectory",
                      title: isPlaying ? "Pause trajectory" : "Play trajectory",
                      children: isPlaying && currentIndex !== xyzArray.length - 1 ? /* @__PURE__ */ jsx10(Pause, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx10(Play, { className: "h-3 w-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs7(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    onClick: () => setCurrentIndex(xyzArray.length - 1),
                    className: "thread-graph-molecule-live-button",
                    children: [
                      /* @__PURE__ */ jsx10(
                        "span",
                        {
                          className: `h-2.5 w-2.5 rounded-full ${isLive ? "animate-pulse bg-red-600" : "bg-gray-300"}`
                        }
                      ),
                      "Live"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx10(
                Slider,
                {
                  value: [currentIndex],
                  max: xyzArray.length - 1,
                  step: 1,
                  onValueChange: (value) => setCurrentIndex(value[0] ?? 0),
                  "aria-label": "Trajectory frame"
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsx10(
              GraphMoleculeViewerLowerButtonGroup,
              {
                cameraInfo,
                onClearSelection: () => setSelectedSerials([]),
                onClearStaged: () => setStagedSelections({}),
                onSendSelection: () => onSelectionChange?.({ moleculeId, atoms: selectedSerials }),
                onSendStaged: () => {
                  Object.entries(stagedSelections).forEach(([key, atoms]) => {
                    onSelectionChange?.({
                      moleculeId: key === "current" ? moleculeId : key,
                      atoms
                    });
                  });
                },
                onStageSelection: handleStageSelection,
                onToggleUnitCell: handleToggleUnitCell,
                selectedAtomLabels,
                selectedSerials,
                stagedAtoms,
                stagedMolecules,
                unitCellAvailable,
                unitCellVisible
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// src/components/graph-workspace/GraphWorkspacePreviewPane.tsx
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var SMALL_TEXT_FILE_MAX_BYTES = 50 * 1024;
var SMALL_TEXT_FILE_MAX_LINES = 1e3;
function isSmallEditableTextFile(file) {
  return !file.truncated && file.size <= SMALL_TEXT_FILE_MAX_BYTES && file.content.split("\n").length <= SMALL_TEXT_FILE_MAX_LINES;
}
function previewTargetTitle(target) {
  if (!target) {
    return null;
  }
  return target.node.path || target.node.name || null;
}
function graphWorkspacePreviewTargetFromNode(node) {
  if (!node) {
    return null;
  }
  switch (node.kind) {
    case "live-artifact":
      return { kind: "live-molecule", node };
    case "file":
      return { kind: "workspace-file", node };
    case "artifact":
      return { kind: "artifact", node };
    case "event":
      return { kind: "event", node };
    case "meta":
      return { kind: "meta", node };
    case "directory":
      return null;
  }
}
var GraphWorkspaceCodePreview = memo(function GraphWorkspaceCodePreview2({
  content
}) {
  return /* @__PURE__ */ jsx11("div", { className: "thread-graph-code-preview min-h-0 flex-1 overflow-auto", children: /* @__PURE__ */ jsx11("pre", { className: "thread-graph-plain-code-preview", children: /* @__PURE__ */ jsx11("code", { children: content }) }) });
});
function GraphWorkspacePreviewPane({
  error,
  imageUrl,
  loadingMore,
  onSaveFile,
  onLoadMore,
  onCollapse,
  pdfUrl,
  previewFile,
  previewLoading,
  plugins,
  selectedTarget
}) {
  const [editing, setEditing] = useState2(false);
  const [draftContent, setDraftContent] = useState2("");
  const [saveError, setSaveError] = useState2(null);
  const [saving, setSaving] = useState2(false);
  const activeNode = selectedTarget?.node ?? null;
  const renderedArtifact = activeNode?.artifact ? plugins.renderArtifact({
    artifact: activeNode.artifact,
    expanded: true,
    onToggleExpanded: () => void 0
  }) : null;
  const moleculeSnapshot = buildMoleculePreviewSnapshot(previewFile ?? null);
  const fileLanguage = previewFile?.language || languageForPath(previewFile?.path ?? "");
  const extension = previewFile ? extensionOf(previewFile.path) : "";
  const title = previewTargetTitle(selectedTarget);
  const selectedFileIsMolecule = previewFile !== null && MOLECULAR_EXTENSIONS.has(extension);
  const canEditFile = Boolean(previewFile && onSaveFile) && !selectedFileIsMolecule && isSmallEditableTextFile(previewFile);
  const isLiveArtifactPreview = selectedTarget?.kind === "live-molecule";
  const isArtifactPreview = Boolean(activeNode?.artifact && renderedArtifact);
  const isMoleculePreview = Boolean(moleculeSnapshot) || isArtifactPreview;
  useEffect2(() => {
    setEditing(false);
    setDraftContent(previewFile?.content ?? "");
    setSaveError(null);
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
        content: draftContent
      });
      setEditing(false);
    } catch (error2) {
      setSaveError(error2 instanceof Error ? error2.message : "Failed to save file.");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxs8(
    "section",
    {
      className: "thread-graph-viewer flex h-full min-h-0 flex-col overflow-hidden rounded-[12px]",
      "data-preview-target-kind": selectedTarget?.kind ?? "none",
      children: [
        /* @__PURE__ */ jsxs8("div", { className: "thread-graph-viewer-header flex h-12 shrink-0 items-center justify-between gap-3 border-b px-3 sm:h-[60px] sm:px-5", children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsx11("h2", { className: "text-base font-semibold text-slate-900 sm:text-[18px] dark:text-slate-100", children: "Viewer" }),
            title ? /* @__PURE__ */ jsx11("span", { className: "min-w-0 truncate text-sm font-medium text-slate-500 dark:text-slate-400", children: title }) : null
          ] }),
          onCollapse ? /* @__PURE__ */ jsx11(
            "button",
            {
              type: "button",
              onClick: onCollapse,
              "data-testid": "collapse-viewer",
              className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100",
              title: "Collapse workspace",
              "aria-label": "Collapse workspace",
              children: /* @__PURE__ */ jsx11(ChevronsRight, { className: "h-4 w-4" })
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs8("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
          error ? /* @__PURE__ */ jsx11("div", { className: "border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200", children: error }) : null,
          !selectedTarget ? /* @__PURE__ */ jsx11("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500", children: "Pick a live molecule, workspace file, artifact, or thread event to preview it." }) : selectedTarget.kind === "workspace-file" && previewLoading ? /* @__PURE__ */ jsx11("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500", children: "Loading file preview..." }) : selectedTarget.kind === "workspace-file" && moleculeSnapshot ? /* @__PURE__ */ jsx11("div", { className: "thread-graph-molecule-preview min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ jsx11(
            GraphMoleculeViewer,
            {
              source: moleculeSnapshot,
              moleculeId: moleculeSnapshot.uuid ?? selectedTarget.node.path,
              title: "PyMOL-style (PDB/CIF)"
            }
          ) }) : selectedTarget.kind === "workspace-file" && imageUrl ? /* @__PURE__ */ jsx11("div", { className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-5", children: /* @__PURE__ */ jsx11(
            "img",
            {
              src: imageUrl,
              alt: selectedTarget.node.path || selectedTarget.node.name,
              className: "max-h-full max-w-full object-contain"
            }
          ) }) : selectedTarget.kind === "workspace-file" && pdfUrl ? /* @__PURE__ */ jsx11("div", { className: "thread-graph-file-preview-frame min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ jsx11(
            "iframe",
            {
              src: pdfUrl,
              title: `PDF preview: ${selectedTarget.node.path || selectedTarget.node.name}`,
              className: "h-full w-full border-0"
            }
          ) }) : selectedTarget.kind === "workspace-file" && previewFile ? /* @__PURE__ */ jsxs8("div", { className: "flex min-h-0 flex-1 flex-col", children: [
            /* @__PURE__ */ jsxs8("div", { className: "thread-graph-file-preview-header flex min-h-12 items-center justify-between gap-3 border-b px-4 py-2", children: [
              /* @__PURE__ */ jsxs8("div", { className: "min-w-0 text-xs uppercase tracking-[0.12em]", children: [
                selectedFileIsMolecule ? "molecule" : fileLanguage || extension || "text",
                " |",
                " ",
                previewFile.size.toLocaleString(),
                " bytes",
                previewFile.truncated ? /* @__PURE__ */ jsxs8("span", { className: "ml-2 text-amber-500", children: [
                  "showing ",
                  previewFile.nextOffset.toLocaleString(),
                  " bytes"
                ] }) : null
              ] }),
              canEditFile ? /* @__PURE__ */ jsx11("div", { className: "flex shrink-0 items-center gap-1", children: editing ? /* @__PURE__ */ jsxs8(Fragment2, { children: [
                /* @__PURE__ */ jsx11(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setDraftContent(previewFile.content);
                      setEditing(false);
                      setSaveError(null);
                    },
                    disabled: saving,
                    className: "thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition disabled:cursor-not-allowed disabled:opacity-50",
                    title: "Cancel edits",
                    "aria-label": "Cancel edits",
                    children: /* @__PURE__ */ jsx11(X, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx11(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleSaveFile(),
                    disabled: saving || draftContent === previewFile.content,
                    className: "thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition disabled:cursor-not-allowed disabled:opacity-50",
                    title: "Save file",
                    "aria-label": "Save file",
                    children: /* @__PURE__ */ jsx11(Save, { className: "h-4 w-4" })
                  }
                )
              ] }) : /* @__PURE__ */ jsx11(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setDraftContent(previewFile.content);
                    setEditing(true);
                    setSaveError(null);
                  },
                  className: "thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition",
                  title: "Edit file",
                  "aria-label": "Edit file",
                  children: /* @__PURE__ */ jsx11(Pencil, { className: "h-4 w-4" })
                }
              ) }) : null
            ] }),
            saveError ? /* @__PURE__ */ jsx11("div", { className: "border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200", children: saveError }) : null,
            editing ? /* @__PURE__ */ jsx11(
              "textarea",
              {
                value: draftContent,
                onChange: (event) => setDraftContent(event.currentTarget.value),
                spellCheck: false,
                className: "thread-graph-file-editor min-h-0 flex-1 resize-none border-0 bg-transparent p-4 font-mono text-[12px] leading-5 text-slate-900 outline-none dark:text-slate-100"
              }
            ) : /* @__PURE__ */ jsx11(
              GraphWorkspaceCodePreview,
              {
                content: previewFile.content
              }
            ),
            previewFile.truncated && onLoadMore ? /* @__PURE__ */ jsx11("div", { className: "thread-graph-file-preview-footer flex justify-center border-t px-4 py-3", children: /* @__PURE__ */ jsx11(
              "button",
              {
                type: "button",
                onClick: onLoadMore,
                disabled: loadingMore,
                className: "thread-graph-load-more-button rounded-md px-4 py-1.5 text-xs disabled:opacity-50",
                children: loadingMore ? "Loading..." : `Load more (${(previewFile.size - previewFile.nextOffset).toLocaleString()} bytes remaining)`
              }
            ) }) : null
          ] }) : (selectedTarget.kind === "live-molecule" || selectedTarget.kind === "artifact") && selectedTarget.node.artifact ? /* @__PURE__ */ jsx11(
            "div",
            {
              className: isMoleculePreview || isLiveArtifactPreview ? "min-h-0 flex-1 overflow-hidden" : "min-h-0 flex-1 overflow-auto p-3",
              children: renderedArtifact
            }
          ) : selectedTarget.kind === "meta" ? /* @__PURE__ */ jsx11("div", { className: "min-h-0 flex-1 overflow-auto p-3", children: /* @__PURE__ */ jsx11("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx11(WorkspaceInfoCard, { label: "Workspace Data", children: /* @__PURE__ */ jsx11(
            GraphWorkspaceCodePreview,
            {
              content: selectedTarget.node.detail ?? ""
            }
          ) }) }) }) : /* @__PURE__ */ jsxs8("div", { className: "flex min-h-0 flex-1 flex-col", children: [
            /* @__PURE__ */ jsx11("div", { className: "thread-graph-file-preview-header border-b px-4 py-3 text-xs uppercase tracking-[0.12em]", children: selectedTarget.node.kind }),
            /* @__PURE__ */ jsx11(
              GraphWorkspaceCodePreview,
              {
                content: selectedTarget.node.detail ?? selectedTarget.node.preview ?? selectedTarget.node.name
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// src/components/graph-workspace/GraphEmptyGarbageDialog.tsx
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
function GraphEmptyGarbageDialog({
  files,
  onCancel,
  onConfirm
}) {
  return /* @__PURE__ */ jsx12("div", { className: "thread-graph-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ jsxs9("div", { className: "thread-graph-dialog w-full max-w-sm rounded-xl border bg-[var(--theme-panel)] p-6 shadow-xl", children: [
    /* @__PURE__ */ jsx12("h3", { className: "text-base font-semibold text-[var(--theme-fg)]", children: "Empty garbage?" }),
    /* @__PURE__ */ jsxs9("p", { className: "mt-1 text-sm leading-5 text-[var(--theme-fg-muted)]", children: [
      "Permanently delete all files in the",
      " ",
      /* @__PURE__ */ jsx12("code", { className: "rounded bg-[var(--theme-muted)] px-1 text-xs text-[var(--theme-fg-soft)]", children: "garbage/" }),
      " ",
      "folder."
    ] }),
    files.length === 0 ? /* @__PURE__ */ jsx12("p", { className: "mt-3 text-sm text-[var(--theme-fg-muted)]", children: "Garbage is empty." }) : /* @__PURE__ */ jsx12("ul", { className: "mt-3 max-h-40 overflow-y-auto rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface)] p-2 text-xs text-[var(--theme-fg-soft)]", children: files.map((file) => /* @__PURE__ */ jsx12("li", { className: "truncate py-0.5", title: file, children: file }, file)) }),
    /* @__PURE__ */ jsxs9("div", { className: "mt-4 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "thread-secondary-action rounded-md px-3 py-1.5 text-sm",
          children: "Cancel"
        }
      ),
      files.length > 0 ? /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          onClick: onConfirm,
          className: "ui-action-danger rounded-md px-3 py-1.5 text-sm font-medium",
          children: "Yes, empty garbage"
        }
      ) : null
    ] })
  ] }) });
}

// src/components/graph-workspace/GraphResizablePanels.tsx
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx as jsx13 } from "react/jsx-runtime";
function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    ResizablePrimitive.PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: classNames(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
function ResizablePanel({
  ...props
}) {
  return /* @__PURE__ */ jsx13(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    ResizablePrimitive.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: classNames(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle ? /* @__PURE__ */ jsx13("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsx13(GripVerticalIcon, { className: "size-2.5" }) }) : null
    }
  );
}

// src/components/graph-workspace/GraphWorkspaceExplorer.tsx
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
var PREVIEW_CHUNK_BYTES = 24e3;
var EXPANDED_PATHS_STORAGE_PREFIX = "remote-codex:graphchat:workspace:expanded:";
var explorerPanelClassName = "thread-graph-explorer h-full min-h-0 overflow-hidden rounded-[12px]";
var explorerHeaderClassName = "thread-graph-explorer-header flex h-[60px] shrink-0 items-center justify-between border-b px-4";
var explorerHeadingClassName = "text-[18px] font-semibold text-slate-900 dark:text-slate-100";
var explorerIconButtonClassName = "thread-graph-explorer-icon-button flex h-8 w-8 items-center justify-center rounded-lg border shadow-none transition disabled:cursor-not-allowed disabled:opacity-50";
var collapseGhostButtonClassName = "thread-graph-explorer-collapse-button flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100";
var workspaceLabelClassName = "thread-graph-workspace-label px-3 pb-1 pt-2 text-[11px] font-semibold tracking-normal text-slate-500 dark:text-slate-400";
var workspaceLoadingClassName = "thread-graph-workspace-loading px-4 text-sm text-slate-400 dark:text-slate-500";
var emptyWorkspaceClassName = "thread-graph-workspace-empty mx-4 mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500 dark:border-[#303642] dark:bg-[#1b1f29] dark:text-slate-400";
function expandedPathsStorageKey(input) {
  return `${EXPANDED_PATHS_STORAGE_PREFIX}${input.workspaceId ?? "workspace"}:${input.threadId}`;
}
function readExpandedPaths(input) {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(expandedPathsStorageKey(input));
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
}
function writeExpandedPaths(input, paths) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      expandedPathsStorageKey(input),
      JSON.stringify([...paths])
    );
  } catch {
  }
}
function iconForWorkspaceNode(node, expanded) {
  if (node.kind === "directory") {
    return expanded ? /* @__PURE__ */ jsx14(FolderOpen, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" }) : /* @__PURE__ */ jsx14(Folder, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" });
  }
  const extension = extensionOf(node.name);
  if (extension === "zip") {
    return /* @__PURE__ */ jsx14(FileArchive, { className: "h-4 w-4 text-amber-600" });
  }
  if (node.kind === "file" && ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) {
    return /* @__PURE__ */ jsx14(FileImage, { className: "h-4 w-4 text-sky-500" });
  }
  if (node.kind === "artifact" || ["xyz", "extxyz", "cif", "pdf", "json", "ts", "tsx", "js", "jsx", "md", "yaml", "yml", "py"].includes(
    extension
  )) {
    return /* @__PURE__ */ jsx14(FileCode2, { className: "h-4 w-4 text-emerald-600" });
  }
  return /* @__PURE__ */ jsx14(File, { className: "h-4 w-4 text-slate-400 dark:text-slate-500" });
}
function WorkspaceTreeRow({
  depth,
  expandedPaths,
  loadingPaths,
  node,
  onDownload,
  onSelect,
  onToggle,
  selectedNodeId
}) {
  const isDirectory = node.kind === "directory";
  const expanded = isDirectory && (node.path === "" || expandedPaths.has(node.path));
  const loadingChildren = isDirectory && loadingPaths.has(node.path);
  const selected = selectedNodeId === node.id;
  const paddingLeft = `${depth * 0.75 + 0.5}rem`;
  if (isDirectory) {
    return /* @__PURE__ */ jsxs10("div", { children: [
      /* @__PURE__ */ jsxs10("div", { className: "thread-graph-tree-row group flex items-center text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100", children: [
        /* @__PURE__ */ jsxs10(
          "button",
          {
            type: "button",
            onClick: () => onToggle(node.path),
            className: "flex min-h-9 min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left sm:min-h-0 sm:py-1.5",
            style: { paddingLeft },
            children: [
              expanded ? /* @__PURE__ */ jsx14(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" }) : /* @__PURE__ */ jsx14(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" }),
              iconForWorkspaceNode(node, expanded),
              /* @__PURE__ */ jsx14("span", { className: "truncate", children: node.name }),
              loadingChildren ? /* @__PURE__ */ jsx14("span", { className: "ml-auto shrink-0 text-xs text-slate-400 dark:text-slate-500", children: "Loading" }) : null
            ]
          }
        ),
        onDownload ? /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            onClick: () => onDownload(node),
            className: "thread-graph-tree-action mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-white hover:text-slate-900 sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100",
            title: node.path ? `Download ${node.name}` : "Download workspace",
            "aria-label": node.path ? `Download ${node.name}` : "Download workspace",
            children: /* @__PURE__ */ jsx14(Download2, { className: "h-3.5 w-3.5" })
          }
        ) : null
      ] }),
      expanded ? /* @__PURE__ */ jsxs10("div", { children: [
        node.children.map((child) => /* @__PURE__ */ jsx14(
          WorkspaceTreeRow,
          {
            depth: depth + 1,
            expandedPaths,
            loadingPaths,
            node: child,
            ...onDownload ? { onDownload } : {},
            onSelect,
            onToggle,
            selectedNodeId
          },
          child.id
        )),
        node.truncated ? /* @__PURE__ */ jsx14(
          "div",
          {
            className: "px-2 py-1 text-xs text-slate-400 dark:text-slate-500",
            style: { paddingLeft: `${(depth + 1) * 0.75 + 0.5}rem` },
            children: "More items not shown"
          }
        ) : null
      ] }) : null
    ] });
  }
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      className: `thread-graph-tree-row group flex items-center text-sm transition ${selected ? "is-selected" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100"}`,
      children: [
        /* @__PURE__ */ jsxs10(
          "button",
          {
            type: "button",
            onClick: () => onSelect(node.id),
            className: "flex min-h-9 min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left sm:min-h-0 sm:py-1.5",
            style: { paddingLeft: `${depth * 0.75 + 2.2}rem` },
            children: [
              iconForWorkspaceNode(node, false),
              /* @__PURE__ */ jsx14("span", { className: "truncate", children: node.name })
            ]
          }
        ),
        onDownload && node.kind === "file" ? /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            onClick: () => onDownload(node),
            className: `thread-graph-tree-action mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 ${selected ? "is-selected" : "text-slate-400 hover:bg-white hover:text-slate-900 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100"}`,
            title: `Download ${node.name}`,
            "aria-label": `Download ${node.name}`,
            children: /* @__PURE__ */ jsx14(Download2, { className: "h-3.5 w-3.5" })
          }
        ) : null
      ]
    }
  );
}
function LiveWorkspaceSection({
  liveNodes,
  onSelect,
  selectedNodeId
}) {
  if (liveNodes.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs10("div", { className: "border-b border-slate-200 py-2 dark:border-[#2a2f3a]", children: [
    /* @__PURE__ */ jsx14("div", { className: "thread-graph-workspace-label px-3 pb-1 text-[11px] font-semibold tracking-normal text-slate-500 dark:text-slate-400", children: "Live" }),
    /* @__PURE__ */ jsx14("div", { className: "space-y-0.5", children: liveNodes.map((node) => {
      const selected = selectedNodeId === node.id;
      return /* @__PURE__ */ jsxs10(
        "button",
        {
          type: "button",
          "data-testid": "live-molecule-item",
          "data-molecule-id": node.artifact?.id ?? node.id,
          onClick: () => onSelect(node.id),
          className: `thread-graph-tree-row flex min-h-9 w-full items-center gap-2 px-3 py-2 text-left text-sm transition sm:min-h-0 sm:py-1.5 ${selected ? "is-selected" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100"}`,
          children: [
            /* @__PURE__ */ jsx14(
              FileCode2,
              {
                className: `h-4 w-4 shrink-0 ${selected ? "text-current" : "text-emerald-600 dark:text-emerald-300"}`
              }
            ),
            /* @__PURE__ */ jsx14("span", { className: "min-w-0 flex-1 truncate", children: node.name })
          ]
        },
        node.id
      );
    }) })
  ] });
}
function WorkspaceExplorerPanel({
  canEmptyGarbage,
  canUpload,
  onCollapse,
  expandedPaths,
  loadingPaths,
  loading,
  onDownload,
  onEmptyGarbage,
  onRefresh,
  onSelect,
  onToggle,
  onUpload,
  selectedNodeId,
  tree,
  liveNodes
}) {
  const visibleTree = useMemo3(
    () => ({
      ...tree,
      children: tree.children.filter((node) => node.path !== "live")
    }),
    [tree]
  );
  return /* @__PURE__ */ jsxs10("aside", { className: `${explorerPanelClassName} flex flex-col`, children: [
    /* @__PURE__ */ jsxs10("div", { className: explorerHeaderClassName, children: [
      /* @__PURE__ */ jsx14("div", { className: "min-w-0", children: /* @__PURE__ */ jsx14("h2", { className: explorerHeadingClassName, children: "Explorer" }) }),
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-1", children: [
        onCollapse ? /* @__PURE__ */ jsxs10(
          "button",
          {
            type: "button",
            "data-testid": "collapse-explorer",
            onClick: onCollapse,
            className: collapseGhostButtonClassName,
            title: "Collapse Explorer",
            "aria-label": "Collapse Explorer",
            children: [
              /* @__PURE__ */ jsx14(ChevronsLeft, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx14("span", { className: "sr-only", children: "Collapse Explorer" })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            onClick: onUpload,
            disabled: !canUpload,
            className: explorerIconButtonClassName,
            title: canUpload ? "Upload file" : "Upload is unavailable for this workspace",
            "aria-label": "Upload file",
            children: /* @__PURE__ */ jsx14(Upload, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            onClick: onRefresh,
            className: explorerIconButtonClassName,
            title: "Refresh workspace",
            "aria-label": "Refresh workspace",
            children: /* @__PURE__ */ jsx14(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` })
          }
        ),
        onEmptyGarbage ? /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            onClick: onEmptyGarbage,
            disabled: !canEmptyGarbage,
            className: explorerIconButtonClassName,
            title: canEmptyGarbage ? "Empty garbage" : "Garbage controls are unavailable",
            "aria-label": "Empty garbage",
            children: /* @__PURE__ */ jsx14(Trash22, { className: "h-4 w-4" })
          }
        ) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("div", { className: "min-h-0 flex-1 overflow-y-auto py-2", children: [
      /* @__PURE__ */ jsx14(
        LiveWorkspaceSection,
        {
          liveNodes: liveNodes ?? [],
          onSelect,
          selectedNodeId
        }
      ),
      /* @__PURE__ */ jsx14("div", { className: workspaceLabelClassName, children: "Workspace" }),
      loading ? /* @__PURE__ */ jsx14("p", { className: workspaceLoadingClassName, children: "Loading workspace..." }) : null,
      /* @__PURE__ */ jsx14(
        WorkspaceTreeRow,
        {
          depth: 0,
          expandedPaths,
          loadingPaths,
          node: visibleTree,
          ...onDownload ? { onDownload } : {},
          onSelect,
          onToggle,
          selectedNodeId
        }
      ),
      visibleTree.children.length === 0 ? /* @__PURE__ */ jsx14("p", { className: emptyWorkspaceClassName, children: "This workspace is empty. Agent tool runs execute inside the thread workspace, so files should appear here as the session works." }) : null
    ] })
  ] });
}
function GraphWorkspaceExplorer({
  activeView,
  detail,
  artifacts,
  plugins,
  status,
  workspaceAdapter
}) {
  const [adapterTree, setAdapterTree] = useState3(null);
  const fallbackTree = useMemo3(
    () => workspaceAdapter && adapterTree ? null : collectWorkspaceItems(detail, artifacts, status, activeView),
    [activeView, adapterTree, artifacts, detail, status, workspaceAdapter]
  );
  const tree = adapterTree ?? fallbackTree ?? collectWorkspaceItems(detail, artifacts, status, activeView);
  const nodeMap = useMemo3(() => flattenWorkspaceNodes(tree), [tree]);
  const liveNodes = useMemo3(
    () => tree.children.find((node) => node.path === "live")?.children ?? [],
    [tree]
  );
  const firstSelectableNode = findFirstPreviewNode(tree);
  const [selectedNodeId, setSelectedNodeId] = useState3(
    () => firstSelectableNode?.id ?? null
  );
  const [expandedPaths, setExpandedPaths] = useState3(
    () => /* @__PURE__ */ new Set([
      "",
      "artifacts",
      "thread-events",
      "live",
      ...collectAncestorPaths(firstSelectableNode?.path ?? "")
    ])
  );
  const [collapsedPanel, setCollapsedPanel] = useState3(null);
  const [workspaceError, setWorkspaceError] = useState3(null);
  const [loadingTree, setLoadingTree] = useState3(false);
  const [loadingDirectoryPaths, setLoadingDirectoryPaths] = useState3(
    () => /* @__PURE__ */ new Set()
  );
  const [previewLoading, setPreviewLoading] = useState3(false);
  const [loadingMore, setLoadingMore] = useState3(false);
  const [showGarbageDialog, setShowGarbageDialog] = useState3(false);
  const [garbageFiles, setGarbageFiles] = useState3([]);
  const [previewFile, setPreviewFile] = useState3(null);
  const [imageUrl, setImageUrl] = useState3(null);
  const [pdfUrl, setPdfUrl] = useState3(null);
  const [workspaceVersion, setWorkspaceVersion] = useState3(0);
  const [isMobileViewport, setIsMobileViewport] = useState3(false);
  const fileInputRef = useRef2(null);
  const workspaceChangeTimerRef = useRef2(null);
  const activeNode = (selectedNodeId ? nodeMap.get(selectedNodeId) : null) ?? firstSelectableNode ?? null;
  const workspaceIdentity = {
    threadId: detail.thread.id,
    workspaceId: detail.workspace.id ?? detail.thread.workspaceId ?? null
  };
  useEffect3(() => {
    setExpandedPaths(
      /* @__PURE__ */ new Set([
        "",
        "artifacts",
        "thread-events",
        "live",
        ...readExpandedPaths(workspaceIdentity),
        ...collectAncestorPaths(firstSelectableNode?.path ?? "")
      ])
    );
  }, [workspaceIdentity.threadId, workspaceIdentity.workspaceId]);
  useEffect3(() => {
    return () => {
      if (workspaceChangeTimerRef.current !== null) {
        window.clearTimeout(workspaceChangeTimerRef.current);
      }
    };
  }, []);
  useEffect3(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileViewport(mediaQuery.matches);
    update();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);
  async function refreshWorkspaceTree(preferredPath) {
    if (!workspaceAdapter) {
      return;
    }
    setLoadingTree(true);
    setWorkspaceError(null);
    try {
      const nextTree = workspaceTreeNodeToGraphNode(
        await workspaceAdapter.listTree({ ...workspaceIdentity, path: "" })
      );
      setAdapterTree(nextTree);
      const firstFile = findFirstWorkspaceFile(nextTree);
      setSelectedNodeId((current) => {
        const currentNode = current ? nodeMap.get(current) : null;
        if (preferredPath && hasWorkspacePath(nextTree, preferredPath)) {
          return `workspace:${preferredPath}`;
        }
        if (currentNode?.path && hasWorkspacePath(nextTree, currentNode.path)) {
          return `workspace:${currentNode.path}`;
        }
        return firstFile?.id ?? current;
      });
      setWorkspaceVersion((version) => version + 1);
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : "Failed to load workspace"
      );
      setAdapterTree(null);
    } finally {
      setLoadingTree(false);
    }
  }
  async function loadDirectoryChildren(path) {
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
        await workspaceAdapter.listTree({ ...workspaceIdentity, path })
      );
      setAdapterTree(
        (current) => current ? replaceWorkspaceNodeChildren(current, path, loadedNode.children, {
          truncated: loadedNode.truncated
        }) : current
      );
      setWorkspaceVersion((version) => version + 1);
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : "Failed to load directory"
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
  useEffect3(() => {
    if (!workspaceAdapter || !adapterTree) {
      return;
    }
    for (const node of nodeMap.values()) {
      if (node.path && node.kind === "directory" && expandedPaths.has(node.path) && node.hasChildren && !node.childrenLoaded && !loadingDirectoryPaths.has(node.path)) {
        void loadDirectoryChildren(node.path);
      }
    }
  }, [adapterTree, expandedPaths, nodeMap, workspaceAdapter]);
  useEffect3(() => {
    setAdapterTree(null);
    setLoadingDirectoryPaths(/* @__PURE__ */ new Set());
    setPreviewFile(null);
    setImageUrl(null);
    setPdfUrl(null);
    setWorkspaceError(null);
    void refreshWorkspaceTree();
  }, [
    workspaceAdapter,
    detail.thread.id,
    detail.workspace.id,
    detail.thread.workspaceId
  ]);
  useEffect3(() => {
    if (!workspaceAdapter?.subscribeWorkspaceChanged) {
      return;
    }
    const unsubscribe = workspaceAdapter.subscribeWorkspaceChanged(
      workspaceIdentity,
      () => {
        if (workspaceChangeTimerRef.current !== null) {
          window.clearTimeout(workspaceChangeTimerRef.current);
        }
        workspaceChangeTimerRef.current = window.setTimeout(() => {
          workspaceChangeTimerRef.current = null;
          void refreshWorkspaceTree(activeNode?.path ?? null);
        }, 240);
      }
    );
    return () => {
      if (workspaceChangeTimerRef.current !== null) {
        window.clearTimeout(workspaceChangeTimerRef.current);
        workspaceChangeTimerRef.current = null;
      }
      unsubscribe?.();
    };
  }, [
    workspaceAdapter,
    workspaceIdentity.threadId,
    workspaceIdentity.workspaceId,
    activeNode?.path
  ]);
  useEffect3(() => {
    const selectedPathCandidate = workspaceAdapter && activeNode?.kind === "file" ? activeNode.path : null;
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
          path: selectedPath
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
          limit: PREVIEW_CHUNK_BYTES
        });
        if (!cancelled) {
          setPreviewFile(file);
        }
      } catch (error) {
        if (!cancelled) {
          setWorkspaceError(
            error instanceof Error ? error.message : "Failed to read file"
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
  }, [workspaceAdapter, activeNode?.id, workspaceVersion]);
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
        limit: PREVIEW_CHUNK_BYTES
      });
      setPreviewFile(
        (current) => current ? {
          ...current,
          content: current.content + chunk.content,
          truncated: chunk.truncated,
          nextOffset: chunk.nextOffset,
          size: chunk.size
        } : current
      );
    } finally {
      setLoadingMore(false);
    }
  }
  async function handleSaveFile(input) {
    if (!workspaceAdapter?.writeFile) {
      return;
    }
    setWorkspaceError(null);
    await workspaceAdapter.writeFile({
      ...workspaceIdentity,
      path: input.path,
      content: input.content
    });
    await refreshWorkspaceTree(input.path);
    const file = await workspaceAdapter.readFile({
      ...workspaceIdentity,
      path: input.path,
      limit: PREVIEW_CHUNK_BYTES
    });
    setPreviewFile(file);
  }
  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!workspaceAdapter?.uploadFile || !file) {
      return;
    }
    setLoadingTree(true);
    setWorkspaceError(null);
    try {
      const result = await workspaceAdapter.uploadFile({
        ...workspaceIdentity,
        path: file.name,
        file
      });
      const preferredPath = result.kind === "archive" ? result.paths[0] ?? null : result.file.path;
      await refreshWorkspaceTree(preferredPath);
    } catch (error) {
      setWorkspaceError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    } finally {
      setLoadingTree(false);
    }
  }
  function handleDownload(node) {
    void workspaceAdapter?.downloadNode?.({
      ...workspaceIdentity,
      path: node.path,
      kind: node.kind === "directory" ? "directory" : "file"
    });
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
        error instanceof Error ? error.message : "Failed to list garbage files"
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
        error instanceof Error ? error.message : "Failed to empty garbage"
      );
    }
  }
  const explorerActions = {
    ...workspaceAdapter?.downloadNode ? { onDownload: handleDownload } : {},
    ...workspaceAdapter?.emptyGarbage ? { onEmptyGarbage: handleOpenGarbage } : {},
    ...workspaceAdapter ? { onRefresh: () => void refreshWorkspaceTree(activeNode?.path ?? null) } : {},
    ...workspaceAdapter?.uploadFile ? { onUpload: () => fileInputRef.current?.click() } : {}
  };
  function toggleDirectory(path) {
    if (!path) {
      return;
    }
    const node = nodeMap.get(`workspace:${path}`);
    const shouldLoad = node?.kind === "directory" && node.hasChildren && !node.childrenLoaded && !loadingDirectoryPaths.has(path);
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
  const explorerPanel = /* @__PURE__ */ jsx14(
    WorkspaceExplorerPanel,
    {
      canEmptyGarbage: Boolean(workspaceAdapter?.emptyGarbage),
      canUpload: Boolean(workspaceAdapter?.uploadFile),
      ...!isMobileViewport ? { onCollapse: () => setCollapsedPanel("explorer") } : {},
      expandedPaths,
      loadingPaths: loadingDirectoryPaths,
      loading: loadingTree,
      ...explorerActions,
      onSelect: (nodeId) => {
        setSelectedNodeId(nodeId);
      },
      onToggle: toggleDirectory,
      selectedNodeId: activeNode?.id ?? null,
      tree,
      liveNodes
    }
  );
  const viewerPanel = /* @__PURE__ */ jsx14(
    GraphWorkspacePreviewPane,
    {
      error: workspaceError,
      imageUrl,
      loadingMore,
      onLoadMore: handleLoadMore,
      ...workspaceAdapter?.writeFile ? { onSaveFile: handleSaveFile } : {},
      ...!isMobileViewport ? { onCollapse: () => setCollapsedPanel("viewer") } : {},
      pdfUrl,
      previewFile,
      previewLoading,
      plugins,
      selectedTarget: graphWorkspacePreviewTargetFromNode(activeNode)
    }
  );
  if (collapsedPanel === "explorer") {
    return /* @__PURE__ */ jsxs10(
      "div",
      {
        "data-testid": "workspace-panel",
        className: "relative h-full min-h-0 w-full overflow-hidden p-2",
        children: [
          /* @__PURE__ */ jsx14(
            "button",
            {
              type: "button",
              "data-testid": "expand-explorer",
              onClick: () => setCollapsedPanel(null),
              className: "thread-graph-panel-expand-fab left-3",
              title: "Expand Explorer",
              "aria-label": "Expand Explorer",
              children: /* @__PURE__ */ jsx14(ChevronsRight2, { className: "h-4 w-4" })
            }
          ),
          viewerPanel
        ]
      }
    );
  }
  if (collapsedPanel === "viewer") {
    return /* @__PURE__ */ jsxs10(
      "div",
      {
        "data-testid": "workspace-panel",
        className: "relative h-full min-h-0 w-full overflow-hidden p-2",
        children: [
          explorerPanel,
          /* @__PURE__ */ jsx14(
            "button",
            {
              type: "button",
              "data-testid": "expand-viewer",
              onClick: () => setCollapsedPanel(null),
              className: "thread-graph-panel-expand-fab right-3",
              title: "Expand Viewer",
              "aria-label": "Expand Viewer",
              children: /* @__PURE__ */ jsx14(ChevronsLeft, { className: "h-4 w-4" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      "data-testid": "workspace-panel",
      className: "flex h-full min-h-0 w-full overflow-hidden bg-transparent p-2",
      children: [
        showGarbageDialog ? /* @__PURE__ */ jsx14(
          GraphEmptyGarbageDialog,
          {
            files: garbageFiles,
            onCancel: () => setShowGarbageDialog(false),
            onConfirm: () => void handleConfirmEmptyGarbage()
          }
        ) : null,
        isMobileViewport ? /* @__PURE__ */ jsxs10("div", { className: "thread-graph-workspace-mobile-stack flex h-full min-h-0 w-full flex-col", children: [
          /* @__PURE__ */ jsx14("div", { className: "thread-graph-workspace-mobile-explorer h-[34%] min-h-[11rem] shrink-0 overflow-hidden border-b", children: explorerPanel }),
          /* @__PURE__ */ jsx14("div", { className: "thread-graph-workspace-mobile-viewer min-h-0 flex-1 overflow-hidden", children: viewerPanel })
        ] }) : /* @__PURE__ */ jsxs10(
          ResizablePanelGroup,
          {
            direction: "horizontal",
            className: "thread-graph-workspace-resizable",
            children: [
              /* @__PURE__ */ jsx14(ResizablePanel, { defaultSize: 33, minSize: 20, children: /* @__PURE__ */ jsx14("div", { className: "thread-graph-workspace-explorer-pane h-full min-h-0 overflow-hidden", children: explorerPanel }) }),
              /* @__PURE__ */ jsx14(ResizableHandle, { className: "thread-graph-workspace-resize-handle w-2 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" }),
              /* @__PURE__ */ jsx14(ResizablePanel, { defaultSize: 67, minSize: 30, children: /* @__PURE__ */ jsx14("div", { className: "thread-graph-workspace-viewer-pane h-full min-h-0 overflow-hidden", children: viewerPanel }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx14(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            className: "hidden",
            onChange: (event) => void handleUpload(event)
          }
        )
      ]
    }
  );
}

// src/components/graph-workspace/GraphGuidePanel.tsx
import {
  BarChart2,
  Code2,
  FileImage as FileImage2,
  FolderOpen as FolderOpen2,
  MessageSquare,
  MoveRight,
  Plus,
  RefreshCw as RefreshCw2,
  Trash2 as Trash23,
  Upload as Upload2,
  Zap
} from "lucide-react";

// src/components/graph-workspace/GraphAccordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
function classNames2(...values) {
  return values.filter(Boolean).join(" ");
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx15(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: classNames2("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx15(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs11(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: classNames2(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx15(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-[var(--theme-fg-muted)] transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsx15("div", { className: classNames2("pb-4 pt-0", className), children })
    }
  );
}

// src/components/graph-workspace/GraphGuidePanel.tsx
import { Fragment as Fragment3, jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
function GuideTag({ children }) {
  return /* @__PURE__ */ jsx16("span", { className: "thread-guide-tag inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[10px]", children });
}
function GuideBullets({ items }) {
  return /* @__PURE__ */ jsx16("ul", { className: "space-y-1 text-[12px] text-[var(--theme-fg-muted)]", children: items.map((item, index) => /* @__PURE__ */ jsxs12("li", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx16("span", { className: "mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[var(--theme-border-contrast)]" }),
    /* @__PURE__ */ jsx16("span", { children: item })
  ] }, index)) });
}
function SectionIcon({ children }) {
  return /* @__PURE__ */ jsx16("span", { className: "thread-guide-icon flex h-5 w-5 shrink-0 items-center justify-center rounded-md", children });
}
function GuideAccordionItem({
  value,
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxs12(
    AccordionItem,
    {
      value,
      className: "thread-guide-section border-b border-[var(--theme-border)] last:border-b-0",
      children: [
        /* @__PURE__ */ jsx16(AccordionTrigger, { className: "py-3 hover:no-underline [&[data-state=open]]:pb-2", children: /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-2 text-xs font-semibold text-[var(--theme-fg)]", children: [
          /* @__PURE__ */ jsx16(SectionIcon, { children: icon }),
          title
        ] }) }),
        /* @__PURE__ */ jsx16(AccordionContent, { className: "space-y-3 pb-3", children })
      ]
    }
  );
}
function GraphGuidePanel() {
  return /* @__PURE__ */ jsxs12("div", { className: "flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs12("div", { className: "shrink-0 border-b border-[var(--theme-border)] px-4 py-3", children: [
      /* @__PURE__ */ jsx16("h2", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "What can I do?" }),
      /* @__PURE__ */ jsx16("p", { className: "mt-0.5 text-[11px] text-[var(--theme-fg-muted)]", children: "Upload files, ask in plain language, get results." })
    ] }),
    /* @__PURE__ */ jsx16("div", { className: "min-h-0 flex-1 overflow-y-auto px-3 pb-6", children: /* @__PURE__ */ jsxs12(
      Accordion,
      {
        type: "multiple",
        defaultValue: ["start", "workspace", "remote-codex"],
        className: "space-y-0",
        children: [
          /* @__PURE__ */ jsxs12(
            GuideAccordionItem,
            {
              value: "start",
              title: "Getting Started",
              icon: /* @__PURE__ */ jsx16(Zap, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "graphchat connects a language model to your files and a set of tools. Each Remote Codex thread has its own isolated workspace." }),
                /* @__PURE__ */ jsx16(
                  GuideBullets,
                  {
                    items: [
                      "Upload data files via the Workspace panel",
                      "Type a question or task in plain language",
                      "The agent calls tools, writes results to the workspace, and explains what it found",
                      "Agent-produced files appear in the workspace automatically when the host reports changes"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs12(
            GuideAccordionItem,
            {
              value: "workspace",
              title: "Workspace Explorer",
              icon: /* @__PURE__ */ jsx16(FolderOpen2, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(Upload2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Upload" }),
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Upload files through the Workspace panel when the host exposes workspace upload support. Composer attachments stay available for prompt context." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(Plus, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "New files and folders" }),
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Remote Codex normally creates files through tools and shell commands. They appear in Explorer after workspace refreshes." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(MoveRight, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Move and organize" }),
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Use the agent or terminal to reorganize files. Explorer keeps the GraphChat file tree and preview flow." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(Trash23, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Garbage folder" }),
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "If the host exposes garbage controls, Explorer can permanently empty unwanted workspace files." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(RefreshCw2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Refresh" }),
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Resync the file tree manually after shell commands, external changes, or agent tool runs." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "rounded-lg border border-[var(--theme-border)] p-2.5", children: [
                  /* @__PURE__ */ jsx16("p", { className: "mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "Preview surfaces" }),
                  /* @__PURE__ */ jsx16(
                    GuideBullets,
                    {
                      items: [
                        /* @__PURE__ */ jsxs12(Fragment3, { children: [
                          /* @__PURE__ */ jsx16(GuideTag, { children: ".xyz .extxyz .cif" }),
                          " use the 3D molecule plugin."
                        ] }),
                        /* @__PURE__ */ jsxs12(Fragment3, { children: [
                          /* @__PURE__ */ jsx16(GuideTag, { children: ".png .jpg .gif .svg .webp" }),
                          " use inline image preview."
                        ] }),
                        /* @__PURE__ */ jsxs12(Fragment3, { children: [
                          /* @__PURE__ */ jsx16(GuideTag, { children: ".py .json .ts .md .csv" }),
                          " use text/code preview."
                        ] }),
                        "Large files load in chunks when the workspace adapter supports it."
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs12(
            GuideAccordionItem,
            {
              value: "viewer",
              title: "Viewer",
              icon: /* @__PURE__ */ jsx16(FileImage2, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsx16("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Viewer is the GraphChat-style artifact surface. It opens Remote Codex artifacts through the same frontend plugin renderers used in rich message bubbles, and previews workspace files from Explorer." }),
                /* @__PURE__ */ jsx16(
                  GuideBullets,
                  {
                    items: [
                      "Expand one artifact at a time for inspection",
                      "Fallback JSON preview is available for unknown artifact types",
                      "3D molecule artifacts remain interactive when the XYZ plugin is enabled"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs12(
            GuideAccordionItem,
            {
              value: "usage",
              title: "Tool Usage & Chat",
              icon: /* @__PURE__ */ jsx16(BarChart2, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(BarChart2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Usage tab" }),
                    /* @__PURE__ */ jsx16(
                      GuideBullets,
                      {
                        items: [
                          "Bar chart of tool and command counts for this thread",
                          "Expandable call log: inspect every input and output",
                          "Recent live events appear with persisted history"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx16(MessageSquare, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs12("div", { children: [
                    /* @__PURE__ */ jsx16("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Chat controls" }),
                    /* @__PURE__ */ jsx16(
                      GuideBullets,
                      {
                        items: [
                          "New Chat creates a fresh Remote Codex thread with its own workspace",
                          "Interrupt, compact, goal controls, and model controls remain in the composer",
                          "Shell view stays available when a shell adapter is attached"
                        ]
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx16(
            GuideAccordionItem,
            {
              value: "remote-codex",
              title: "Remote Codex Extras",
              icon: /* @__PURE__ */ jsx16(Code2, { className: "h-3 w-3" }),
              children: /* @__PURE__ */ jsx16(
                GuideBullets,
                {
                  items: [
                    "Slash toolbox: skills, MCP, hooks, goals, forks, model controls, provider settings",
                    "Rich message bubbles: reasoning, commands, searches, file reads, file changes, plans, action requests, artifacts",
                    "Plugin surfaces: terminal, XYZ molecule viewer, inline code renderers, and imported plugin panels",
                    "Thread metadata stays in the left rail and Workspace tab instead of replacing chat"
                  ]
                }
              )
            }
          )
        ]
      }
    ) })
  ] });
}

// src/components/graph-workspace/GraphToolUsagePanel.tsx
import { useEffect as useEffect4, useRef as useRef3, useState as useState4 } from "react";
import { RefreshCw as RefreshCw3 } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
function formatValue(value) {
  if (value === null || value === void 0) {
    return "\u2014";
  }
  if (typeof value === "string") {
    return value.length > 2e3 ? `${value.slice(0, 2e3)}
...(truncated)` : value;
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
function CallSection({ label, value }) {
  return /* @__PURE__ */ jsxs13("div", { children: [
    /* @__PURE__ */ jsx17("p", { className: "mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: label }),
    /* @__PURE__ */ jsx17("pre", { className: "max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-[var(--theme-surface-strong)] p-2 text-[11px] leading-relaxed text-[var(--theme-fg-soft)]", children: formatValue(value) })
  ] });
}
function ToolEventAccordion({ event }) {
  return /* @__PURE__ */ jsxs13(
    AccordionItem,
    {
      value: event.id,
      className: "thread-tool-call mb-2 overflow-hidden rounded-lg border border-[var(--theme-border)] last:mb-0",
      children: [
        /* @__PURE__ */ jsxs13(AccordionTrigger, { className: "px-3 py-2 text-xs font-medium text-[var(--theme-fg)] hover:bg-[var(--theme-hover)] hover:no-underline [&[data-state=open]]:bg-[var(--theme-hover)]", children: [
          /* @__PURE__ */ jsxs13("div", { className: "flex min-w-0 items-center gap-2", children: [
            /* @__PURE__ */ jsx17("span", { className: "h-2 w-2 shrink-0 rounded-full bg-[var(--theme-accent-strong)]" }),
            /* @__PURE__ */ jsx17("span", { className: "truncate font-mono text-xs font-medium text-[var(--theme-fg)]", children: event.label }),
            event.status ? /* @__PURE__ */ jsx17("span", { className: "shrink-0 rounded-full border border-[var(--theme-border)] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[var(--theme-fg-muted)]", children: event.status }) : null
          ] }),
          /* @__PURE__ */ jsx17("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: event.turnId ? /* @__PURE__ */ jsx17("span", { className: "max-w-20 truncate text-[10px] text-[var(--theme-fg-muted)]", children: event.turnId }) : null })
        ] }),
        /* @__PURE__ */ jsx17(AccordionContent, { className: "px-3 pb-3", children: /* @__PURE__ */ jsxs13("div", { className: "space-y-2 px-3 pb-3 pt-1", children: [
          /* @__PURE__ */ jsx17(CallSection, { label: "Input", value: event.preview }),
          /* @__PURE__ */ jsx17(CallSection, { label: "Output", value: event.detail })
        ] }) })
      ]
    }
  );
}
function GraphToolUsagePanel({
  formatToolKind: formatToolKind2,
  toolCounts,
  toolEvents,
  maxToolCount
}) {
  const [expandedEventId, setExpandedEventId] = useState4(
    () => toolEvents.at(-1)?.id ?? null
  );
  const bottomRef = useRef3(null);
  useEffect4(() => {
    setExpandedEventId((current) => current ?? toolEvents.at(-1)?.id ?? null);
  }, [toolEvents]);
  useEffect4(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [toolEvents.length]);
  if (!toolCounts.length) {
    return /* @__PURE__ */ jsxs13("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-sm text-[var(--theme-fg-muted)]", children: [
      /* @__PURE__ */ jsx17("span", { children: "No tool calls yet. Run the agent to see usage." }),
      /* @__PURE__ */ jsxs13("span", { className: "inline-flex items-center gap-1 rounded px-2 py-1 text-xs", children: [
        /* @__PURE__ */ jsx17(RefreshCw3, { className: "h-3 w-3" }),
        "Reload from workspace"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs13("div", { className: "flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs13("div", { className: "shrink-0 border-b border-[var(--theme-border)] p-4", children: [
      /* @__PURE__ */ jsxs13("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx17("h2", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "Calls this session" }),
        /* @__PURE__ */ jsxs13(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] text-[var(--theme-fg-muted)] opacity-60",
            disabled: true,
            title: "Remote Codex streams tool history from thread events",
            children: [
              /* @__PURE__ */ jsx17(RefreshCw3, { className: "h-3 w-3" }),
              "Reload"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx17("div", { className: "space-y-2", children: toolCounts.map(([kind, count]) => /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx17(
          "span",
          {
            className: "w-40 shrink-0 truncate text-right font-mono text-[11px] text-[var(--theme-fg-muted)]",
            title: formatToolKind2(kind),
            children: formatToolKind2(kind)
          }
        ),
        /* @__PURE__ */ jsxs13("div", { className: "flex flex-1 items-center gap-2", children: [
          /* @__PURE__ */ jsx17("div", { className: "relative h-4 flex-1 overflow-hidden rounded-sm bg-[var(--theme-muted)]", children: /* @__PURE__ */ jsx17(
            "div",
            {
              className: "h-full rounded-sm bg-[var(--theme-accent-strong)] transition-all duration-300",
              style: { width: `${count / maxToolCount * 100}%` }
            }
          ) }),
          /* @__PURE__ */ jsx17("span", { className: "w-5 shrink-0 text-right text-[11px] font-medium text-[var(--theme-fg-soft)]", children: count })
        ] })
      ] }, kind)) })
    ] }),
    /* @__PURE__ */ jsxs13("div", { className: "min-h-0 flex-1 overflow-y-auto p-4", children: [
      /* @__PURE__ */ jsx17("h2", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "Call log" }),
      /* @__PURE__ */ jsx17(
        Accordion,
        {
          type: "single",
          collapsible: true,
          value: expandedEventId ?? "",
          onValueChange: (value) => setExpandedEventId(value || null),
          className: "space-y-0",
          children: toolEvents.slice(-50).map((event) => /* @__PURE__ */ jsx17(ToolEventAccordion, { event }, event.id))
        }
      ),
      /* @__PURE__ */ jsx17("div", { ref: bottomRef })
    ] })
  ] });
}

// src/components/graph-chat/GraphVisualization.tsx
import { useCallback as useCallback2, useEffect as useEffect5, useMemo as useMemo4 } from "react";
import {
  addEdge,
  Background,
  Controls,
  Handle,
  MarkerType as MarkerType2,
  Position as Position4,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// src/components/graph-chat/FloatingConnectionLine.tsx
import { getBezierPath } from "@xyflow/react";

// src/components/graph-chat/FloatingHelper.tsx
import { MarkerType, Position } from "@xyflow/react";
import { jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
function getNodeIntersection(intersectionNode, targetNode) {
  const intersectionNodeWidth = Math.max(intersectionNode.measured.width ?? 1, 1);
  const intersectionNodeHeight = Math.max(
    intersectionNode.measured.height ?? 1,
    1
  );
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;
  const targetNodeWidth = Math.max(targetNode.measured.width ?? 1, 1);
  const targetNodeHeight = Math.max(targetNode.measured.height ?? 1, 1);
  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;
  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNodeWidth / 2;
  const y1 = targetPosition.y + targetNodeHeight / 2;
  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;
  return { x, y };
}
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);
  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (node.measured.width ?? 1) - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (node.measured.height ?? 1) - 1) {
    return Position.Bottom;
  }
  return Position.Top;
}
function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);
  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);
  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos
  };
}
function buildGraph(inputNodes, width = 900, height = 620) {
  if (!inputNodes || !Array.isArray(inputNodes)) {
    return { nodes: [], edges: [] };
  }
  const forceLayout = (nodes2, edges2, layoutWidth, layoutHeight) => {
    const nodePositions = /* @__PURE__ */ new Map();
    const nodeCount = nodes2.length;
    nodes2.forEach((node, index) => {
      const hash = node.id.split("").reduce((value, character) => {
        const nextValue = (value << 5) - value + character.charCodeAt(0);
        return nextValue & nextValue;
      }, 0);
      nodePositions.set(node.id, {
        x: Math.abs(hash) % layoutWidth + index * 100 % layoutWidth,
        y: Math.abs(hash >> 16) % layoutHeight + index * 150 % layoutHeight,
        vx: 0,
        vy: 0
      });
    });
    for (let iteration = 0; iteration < 200; iteration += 1) {
      for (let i = 0; i < nodeCount; i += 1) {
        for (let j = i + 1; j < nodeCount; j += 1) {
          const firstNode = nodes2[i];
          const secondNode = nodes2[j];
          if (!firstNode || !secondNode) {
            continue;
          }
          const pos1 = nodePositions.get(firstNode.id);
          const pos2 = nodePositions.get(secondNode.id);
          if (!pos1 || !pos2) {
            continue;
          }
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const optimalDistance = 200;
          const force = (optimalDistance - distance) * 0.5;
          const fx = dx / distance * force;
          const fy = dy / distance * force;
          pos1.vx += fx;
          pos1.vy += fy;
          pos2.vx -= fx;
          pos2.vy -= fy;
        }
      }
      edges2.forEach((edge) => {
        const pos1 = nodePositions.get(edge.source);
        const pos2 = nodePositions.get(edge.target);
        if (!pos1 || !pos2) {
          return;
        }
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetLength = 120;
        const springForce = (distance - targetLength) * 0.3;
        const fx = dx / distance * springForce;
        const fy = dy / distance * springForce;
        pos1.vx += fx;
        pos1.vy += fy;
        pos2.vx -= fx;
        pos2.vy -= fy;
      });
      nodePositions.forEach((position) => {
        position.x += position.vx * 0.1;
        position.y += position.vy * 0.1;
        position.vx *= 0.9;
        position.vy *= 0.9;
        position.x = Math.max(80, Math.min(layoutWidth - 80, position.x));
        position.y = Math.max(80, Math.min(layoutHeight - 80, position.y));
      });
    }
    return nodePositions;
  };
  const inputIds = new Set(inputNodes.map((node) => node.id));
  const edges = [];
  inputNodes.forEach((node) => {
    if (!node.out_node_id) {
      return;
    }
    const outNodes = Array.isArray(node.out_node_id) ? node.out_node_id : [node.out_node_id];
    outNodes.forEach((outNodeId) => {
      if (!inputIds.has(outNodeId)) {
        return;
      }
      edges.push({
        id: `${node.id}-${outNodeId}`,
        source: node.id,
        target: outNodeId,
        type: "floating",
        sourceHandle: null,
        targetHandle: null,
        markerEnd: { type: MarkerType.Arrow }
      });
    });
  });
  const positions = forceLayout(inputNodes, edges, width, height);
  const nodes = inputNodes.map((node) => ({
    id: node.id,
    type: "styledNode",
    position: positions.get(node.id) ?? { x: 100, y: 100 },
    data: {
      label: /* @__PURE__ */ jsxs14("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx18("div", { className: "text-sm font-semibold", children: node.name }),
        node.description ? /* @__PURE__ */ jsx18("div", { className: "mt-1 max-w-32 overflow-hidden text-ellipsis text-xs text-slate-500 dark:text-slate-400", children: node.description }) : null
      ] })
    }
  }));
  return { nodes, edges };
}

// src/components/graph-chat/FloatingConnectionLine.tsx
import { jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
function FloatingConnectionLine({
  toX,
  toY,
  fromPosition,
  toPosition,
  fromNode
}) {
  if (!fromNode) {
    return null;
  }
  const targetNode = {
    id: "connection-target",
    measured: {
      width: 1,
      height: 1
    },
    internals: {
      positionAbsolute: { x: toX, y: toY }
    }
  };
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    fromNode,
    targetNode
  );
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos || fromPosition,
    targetPosition: targetPos || toPosition,
    targetX: tx || toX,
    targetY: ty || toY
  });
  return /* @__PURE__ */ jsxs15("g", { children: [
    /* @__PURE__ */ jsx19(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "animated",
        d: edgePath
      }
    ),
    /* @__PURE__ */ jsx19(
      "circle",
      {
        cx: tx || toX,
        cy: ty || toY,
        fill: "var(--theme-panel)",
        r: 3,
        stroke: "currentColor",
        strokeWidth: 1.5
      }
    )
  ] });
}

// src/components/graph-chat/FloatingEdge.tsx
import { getBezierPath as getBezierPath2, useInternalNode } from "@xyflow/react";
import { jsx as jsx20 } from "react/jsx-runtime";
function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style
}) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) {
    return null;
  }
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );
  const [edgePath] = getBezierPath2({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  });
  return /* @__PURE__ */ jsx20(
    "path",
    {
      id,
      className: "react-flow__edge-path",
      d: edgePath,
      markerEnd,
      style
    }
  );
}

// src/components/graph-chat/GraphVisualization.tsx
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
function GraphVisualization({ nodes: inputNodes }) {
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState([]);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState([]);
  const graph = useMemo4(() => buildGraph(inputNodes), [inputNodes]);
  const edgeTypes = useMemo4(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo4(
    () => ({
      styledNode: ({ data, isConnectable }) => /* @__PURE__ */ jsxs16("div", { className: "thread-graph-flow-node", children: [
        data.label,
        /* @__PURE__ */ jsx21(
          Handle,
          {
            type: "target",
            position: Position4.Top,
            isConnectable,
            style: { opacity: 0, pointerEvents: "none" }
          }
        ),
        /* @__PURE__ */ jsx21(
          Handle,
          {
            type: "source",
            position: Position4.Bottom,
            isConnectable,
            style: { opacity: 0, pointerEvents: "none" }
          }
        )
      ] })
    }),
    []
  );
  useEffect5(() => {
    setFlowNodes(graph.nodes);
    setFlowEdges(graph.edges);
  }, [graph.edges, graph.nodes, setFlowEdges, setFlowNodes]);
  const onConnect = useCallback2(
    (params) => setFlowEdges(
      (edges) => addEdge(
        {
          ...params,
          type: "floating",
          sourceHandle: null,
          targetHandle: null,
          markerEnd: { type: MarkerType2.Arrow }
        },
        edges
      )
    ),
    [setFlowEdges]
  );
  return /* @__PURE__ */ jsx21("div", { className: "thread-graph-flow h-full min-h-0", children: /* @__PURE__ */ jsx21(ReactFlowProvider, { children: /* @__PURE__ */ jsxs16(
    ReactFlow,
    {
      nodes: flowNodes,
      edges: flowEdges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      fitView: true,
      nodeTypes,
      edgeTypes,
      connectionLineComponent: FloatingConnectionLine,
      children: [
        /* @__PURE__ */ jsx21(Controls, {}),
        /* @__PURE__ */ jsx21(Background, { gap: 16 })
      ]
    }
  ) }) });
}

// src/components/ThreadGraphWorkspacePanel.tsx
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
var DEFAULT_WORKSPACE_FEATURES = {
  workspace: true,
  toolUsage: true,
  guide: true,
  threadGraph: true,
  extensions: true
};
function resolveWorkspaceFeatures(features) {
  return {
    ...DEFAULT_WORKSPACE_FEATURES,
    ...features
  };
}
function firstEnabledWorkspaceTab(features, preferred) {
  const isEnabled = (tab) => {
    switch (tab) {
      case "workspace":
        return features.workspace;
      case "tools":
        return features.toolUsage;
      case "guide":
        return features.guide;
      case "graph":
        return features.threadGraph;
      case "extensions":
        return features.extensions;
    }
  };
  if (preferred && isEnabled(preferred)) {
    return preferred;
  }
  return [
    "workspace",
    "tools",
    "guide",
    "graph",
    "extensions"
  ].find(isEnabled) ?? null;
}
function isWorkspaceTabEnabled(features, tab) {
  switch (tab) {
    case "workspace":
      return features.workspace;
    case "tools":
      return features.toolUsage;
    case "guide":
      return features.guide;
    case "graph":
      return features.threadGraph;
    case "extensions":
      return features.extensions;
  }
}
function collectToolEvents(detail) {
  const events = [];
  const toolKinds = /* @__PURE__ */ new Set([
    "toolCall",
    "commandExecution",
    "webSearch",
    "fileRead",
    "fileChange",
    "agentToolCall",
    "skillToolCall",
    "hook"
  ]);
  let sequence = 0;
  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (!toolKinds.has(item.kind)) {
        continue;
      }
      events.push({
        id: item.id,
        kind: item.kind,
        label: formatToolKind(item.kind),
        preview: item.previewText ?? item.text ?? item.kind,
        detail: item.detailText ?? item.text ?? item.previewText ?? item.kind,
        turnId: item.sourceTurnId ?? turn.id,
        status: item.status ?? null,
        sequence
      });
      sequence += 1;
    }
  }
  for (const item of detail.liveItems?.items ?? []) {
    if (!toolKinds.has(item.kind)) {
      continue;
    }
    events.push({
      id: item.id,
      kind: item.kind,
      label: formatToolKind(item.kind),
      preview: item.previewText ?? item.text ?? item.kind,
      detail: item.detailText ?? item.text ?? item.previewText ?? item.kind,
      turnId: item.sourceTurnId ?? null,
      status: item.status ?? null,
      sequence
    });
    sequence += 1;
  }
  return events;
}
function formatToolKind(value) {
  switch (value) {
    case "toolCall":
      return "Tool call";
    case "agentToolCall":
      return "Agent tool";
    case "skillToolCall":
      return "Skill tool";
    case "commandExecution":
      return "Command";
    case "webSearch":
      return "Search";
    case "fileRead":
      return "File read";
    case "fileChange":
      return "File change";
    case "hook":
      return "Hook";
    default:
      return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
  }
}
function itemGraphLabel(item) {
  switch (item.kind) {
    case "userMessage":
      return "User";
    case "agentMessage":
      return "Agent";
    default:
      return formatToolKind(item.kind);
  }
}
function itemGraphDescription(item) {
  const source = item.previewText ?? item.text ?? item.detailText ?? item.kind;
  return source.replace(/\s+/g, " ").slice(0, 96);
}
function collectGraphNodes(detail, toolEvents) {
  const nodes = [
    {
      id: `thread:${detail.thread.id}`,
      name: detail.thread.title || "Thread",
      description: detail.thread.model ?? detail.thread.status
    },
    {
      id: `workspace:${detail.workspace.id}`,
      name: detail.workspace.label ?? "Workspace",
      description: detail.workspace.absPath,
      out_node_id: `thread:${detail.thread.id}`
    }
  ];
  let previousTurnId = null;
  for (const turn of detail.turns) {
    const turnId = `turn:${turn.id}`;
    nodes.push({
      id: turnId,
      name: `Turn ${nodes.filter((node) => node.id.startsWith("turn:")).length + 1}`,
      description: turn.status,
      out_node_id: previousTurnId ? [`thread:${detail.thread.id}`, previousTurnId] : `thread:${detail.thread.id}`
    });
    previousTurnId = turnId;
    let previousItemId = null;
    for (const item of turn.items) {
      const itemId = `item:${item.id}`;
      const outNodeIds = [turnId];
      if (previousItemId) {
        outNodeIds.push(previousItemId);
      }
      nodes.push({
        id: itemId,
        name: itemGraphLabel(item),
        description: itemGraphDescription(item),
        out_node_id: outNodeIds
      });
      previousItemId = itemId;
      if (item.kind === "artifact" && item.artifact) {
        nodes.push({
          id: `artifact:${item.artifact.id}`,
          name: item.artifact.title || item.artifact.type,
          description: item.artifact.summaryText ?? item.artifact.type,
          out_node_id: itemId
        });
      }
    }
  }
  const toolNodeIds = new Set(nodes.map((node) => node.id));
  for (const event of toolEvents) {
    const eventId = `tool:${event.id}`;
    if (toolNodeIds.has(eventId) || toolNodeIds.has(`item:${event.id}`)) {
      continue;
    }
    nodes.push({
      id: eventId,
      name: event.label,
      description: event.preview,
      out_node_id: event.turnId ? `turn:${event.turnId}` : `thread:${detail.thread.id}`
    });
  }
  return nodes.slice(0, 120);
}
function ThreadGraphWorkspacePanel({
  detail,
  status,
  plugins,
  workspaceAdapter,
  metaContent,
  settingsContent,
  activeView = "chat",
  features: featureConfig
}) {
  const features = useMemo5(
    () => resolveWorkspaceFeatures(featureConfig),
    [featureConfig]
  );
  const initialTab = firstEnabledWorkspaceTab(features, featureConfig?.defaultTab);
  const [activeTab, setActiveTab] = useState5(initialTab);
  const artifacts = useMemo5(() => collectArtifacts(detail), [detail]);
  const toolEvents = useMemo5(() => collectToolEvents(detail), [detail]);
  const toolCounts = useMemo5(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const event of toolEvents) {
      counts.set(event.kind, (counts.get(event.kind) ?? 0) + 1);
    }
    return [...counts.entries()].sort((left, right) => right[1] - left[1]);
  }, [toolEvents]);
  const threadPanels = plugins.getThreadPanels();
  const maxToolCount = Math.max(...toolCounts.map(([, count]) => count), 1);
  const graphNodes = useMemo5(
    () => collectGraphNodes(detail, toolEvents),
    [detail, toolEvents]
  );
  const primaryTabs = useMemo5(() => {
    const tabs = [];
    if (features.workspace) {
      tabs.push({ id: "workspace", label: "Workspace", icon: null });
    }
    if (features.toolUsage) {
      tabs.push({ id: "tools", label: "Tool Usage", icon: BarChart22 });
    }
    if (features.guide) {
      tabs.push({ id: "guide", label: "Guide", icon: BookOpen });
    }
    return tabs;
  }, [features.guide, features.toolUsage, features.workspace]);
  const secondaryTabs = useMemo5(() => {
    const tabs = [];
    if (features.threadGraph) {
      tabs.push({ id: "graph", label: "Thread graph", icon: GitBranch });
    }
    if (features.extensions) {
      tabs.push({ id: "extensions", label: "Remote Codex extensions", icon: Wrench });
    }
    return tabs;
  }, [features.extensions, features.threadGraph]);
  useEffect6(() => {
    if (!activeTab || !isWorkspaceTabEnabled(features, activeTab)) {
      setActiveTab(firstEnabledWorkspaceTab(features, featureConfig?.defaultTab));
    }
  }, [activeTab, featureConfig?.defaultTab, features]);
  if (!activeTab) {
    return null;
  }
  return /* @__PURE__ */ jsxs17("div", { className: "thread-graph-right-panel flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs17("div", { className: "thread-graph-right-tabs flex shrink-0 items-center gap-1 overflow-hidden border-b px-3 py-2", children: [
      primaryTabs.map((tab) => {
        const Icon = tab.icon;
        return /* @__PURE__ */ jsxs17(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `thread-graph-right-tab inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition ${activeTab === tab.id ? "is-active" : ""}`,
            children: [
              Icon ? /* @__PURE__ */ jsx22(Icon, { className: "h-3.5 w-3.5" }) : null,
              tab.label
            ]
          },
          tab.id
        );
      }),
      secondaryTabs.length ? /* @__PURE__ */ jsx22(
        "div",
        {
          className: "thread-graph-right-tab-secondary ml-auto flex min-w-0 shrink items-center gap-1 border-l pl-2",
          "aria-label": "Remote Codex workspace extensions",
          children: secondaryTabs.map((tab) => {
            const Icon = tab.icon;
            return /* @__PURE__ */ jsx22(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab.id),
                className: `thread-graph-right-tab inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-medium transition ${activeTab === tab.id ? "is-active" : ""}`,
                title: tab.label,
                "aria-label": tab.label,
                children: /* @__PURE__ */ jsx22(Icon, { className: "h-3.5 w-3.5" })
              },
              tab.id
            );
          })
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs17("div", { className: "min-h-0 flex-1 overflow-hidden", children: [
      activeTab === "workspace" ? /* @__PURE__ */ jsx22(
        GraphWorkspaceExplorer,
        {
          activeView,
          detail,
          artifacts,
          plugins,
          status,
          workspaceAdapter: workspaceAdapter ?? null
        }
      ) : null,
      activeTab === "tools" ? /* @__PURE__ */ jsx22(
        GraphToolUsagePanel,
        {
          formatToolKind,
          toolCounts,
          toolEvents,
          maxToolCount
        }
      ) : null,
      activeTab === "graph" ? /* @__PURE__ */ jsx22("div", { className: "thread-graph-visualization-panel h-full min-h-0 p-3", children: /* @__PURE__ */ jsx22(GraphVisualization, { nodes: graphNodes }) }) : null,
      activeTab === "extensions" ? /* @__PURE__ */ jsx22("div", { className: "h-full min-h-0 overflow-y-auto p-3", children: /* @__PURE__ */ jsxs17("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx22(WorkspaceInfoCard, { label: "Plugin Panels", children: threadPanels.length ? /* @__PURE__ */ jsx22("div", { className: "flex flex-wrap gap-2", children: threadPanels.map((panel) => /* @__PURE__ */ jsx22(
          "span",
          {
            className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]",
            children: panel.label
          },
          panel.id
        )) }) : /* @__PURE__ */ jsx22("p", { className: "text-[var(--theme-fg-muted)]", children: "No thread panels are enabled." }) }),
        /* @__PURE__ */ jsx22(WorkspaceInfoCard, { label: "Enabled Renderers", children: /* @__PURE__ */ jsx22("div", { className: "flex flex-wrap gap-2", children: plugins.plugins.filter((plugin) => plugin.enabled).map((plugin) => /* @__PURE__ */ jsx22(
          "span",
          {
            className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]",
            children: plugin.name
          },
          plugin.id
        )) }) }),
        /* @__PURE__ */ jsx22(WorkspaceInfoCard, { label: "Remote Codex Tools", children: /* @__PURE__ */ jsxs17("div", { className: "grid gap-2 text-[var(--theme-fg-muted)]", children: [
          /* @__PURE__ */ jsxs17("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx22(Terminal, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx22("p", { children: "Terminal stays available when the Terminal plugin and shell adapter are attached." })
          ] }),
          /* @__PURE__ */ jsxs17("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx22(Paperclip, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx22("p", { children: "Composer attachments, slash panels, hooks, MCP, goals, and fork controls remain part of the chat surface." })
          ] }),
          /* @__PURE__ */ jsxs17("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx22(Trash24, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx22("p", { children: "Destructive actions stay explicit: delete thread, interrupt, compact, and hook trust controls remain host governed." })
          ] })
        ] }) }),
        metaContent ? /* @__PURE__ */ jsx22(WorkspaceInfoCard, { label: "Thread Meta", children: metaContent }) : null,
        settingsContent ? /* @__PURE__ */ jsx22(WorkspaceInfoCard, { label: "Settings", children: settingsContent }) : null
      ] }) }) : null,
      activeTab === "guide" ? /* @__PURE__ */ jsx22(GraphGuidePanel, {}) : null
    ] })
  ] });
}
var MemoizedThreadGraphWorkspacePanel = memo2(
  ThreadGraphWorkspacePanel
);
export {
  MemoizedThreadGraphWorkspacePanel,
  ThreadGraphWorkspacePanel
};
