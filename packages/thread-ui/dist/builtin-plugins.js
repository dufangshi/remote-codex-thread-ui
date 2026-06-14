// src/plugins/builtin-plugin-modules.tsx
import {
  xyzViewerPluginManifest
} from "@remote-codex/plugin-xyz-viewer/manifest";
import { terminalPluginManifest } from "@remote-codex/plugin-terminal";

// src/plugins/xyz-plugin-renderers.tsx
import { Suspense, lazy, useMemo, useState } from "react";
import { looksLikeMoleculeStructure } from "@remote-codex/plugin-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
var LazyXyzMoleculeViewer = lazy(async () => {
  await import("@remote-codex/plugin-xyz-viewer/styles.css");
  const module = await import("@remote-codex/plugin-xyz-viewer/frontend");
  return { default: module.XyzMoleculeViewer };
});
function XyzViewerFallback() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-full min-h-[12rem] items-center justify-center rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-4 text-sm text-[var(--theme-fg-muted)]", children: "Loading molecule viewer..." });
}
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: onToggleExpanded,
        className: "flex w-full items-center justify-between gap-3 text-left",
        children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: artifact.title }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-[var(--theme-fg-muted)]", children: artifact.summaryText ?? artifact.type })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: expanded ? "Hide" : "Open" })
        ]
      }
    ),
    expanded && source && /* @__PURE__ */ jsx("div", { className: "h-[min(56vh,34rem)] min-h-[26rem]", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(XyzViewerFallback, {}), children: /* @__PURE__ */ jsx(
      LazyXyzMoleculeViewer,
      {
        source,
        moleculeId: artifact.id,
        title: artifact.title
      }
    ) }) }),
    expanded && !source && /* @__PURE__ */ jsx("pre", { className: "max-h-80 overflow-auto rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] p-3 text-xs text-[var(--theme-fg-soft)]", children: JSON.stringify(artifact.payload, null, 2) })
  ] });
}
function InlineXyzRenderer({
  code,
  isIncomplete,
  language
}) {
  const [expanded, setExpanded] = useState(true);
  const [sourceOpen, setSourceOpen] = useState(false);
  const format = normalizedMoleculeFormat(language);
  const source = useMemo(
    () => ({
      content: [code.endsWith("\n") ? code : `${code}
`],
      format,
      name: `${format.toUpperCase()} structure`,
      uuid: `inline:${format}:${code.length}`
    }),
    [code, format]
  );
  if (isIncomplete || !looksLikeMoleculeStructure(code, format)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "my-3 overflow-hidden rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-[var(--theme-border)] px-3 py-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: [
          format.toUpperCase(),
          " molecule"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-[var(--theme-fg-muted)]", children: "Rendered from message source" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setSourceOpen((current) => !current),
            className: "rounded-full border border-[var(--theme-border)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
            children: sourceOpen ? "Hide source" : "Source"
          }
        ),
        /* @__PURE__ */ jsx(
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
    expanded && /* @__PURE__ */ jsx("div", { className: "h-[min(52vh,32rem)] min-h-[24rem]", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(XyzViewerFallback, {}), children: /* @__PURE__ */ jsx(
      LazyXyzMoleculeViewer,
      {
        source,
        moleculeId: source.uuid,
        title: `${format.toUpperCase()} molecule`
      }
    ) }) }),
    sourceOpen && /* @__PURE__ */ jsx("pre", { className: "max-h-96 overflow-auto border-t border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-3 text-xs leading-5 text-[var(--theme-fg-soft)]", children: code })
  ] });
}

// src/plugins/builtin-plugin-modules.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
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
    renderArtifact: (context) => /* @__PURE__ */ jsx2(XyzArtifactRenderer, { ...context }),
    inlineCodeRenderers: [
      {
        languages: ["xyz", "extxyz", "cif", "pdb"],
        render: (context) => /* @__PURE__ */ jsx2(InlineXyzRenderer, { ...context })
      }
    ]
  }
];
export {
  InlineXyzRenderer,
  XyzArtifactRenderer,
  builtinFrontendPlugins,
  builtinFrontendPlugins as defaultBuiltinFrontendPlugins
};
