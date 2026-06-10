// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/styles.css
styleInject('.thread-ui-shell,\n.thread-graph-dialog {\n  color-scheme: light;\n  --radius: 0.625rem;\n  --background: oklch(1 0 0);\n  --foreground: oklch(0.145 0 0);\n  --card: oklch(1 0 0);\n  --card-foreground: oklch(0.145 0 0);\n  --popover: oklch(1 0 0);\n  --popover-foreground: oklch(0.145 0 0);\n  --primary: oklch(0.205 0 0);\n  --primary-foreground: oklch(0.985 0 0);\n  --secondary: oklch(0.97 0 0);\n  --secondary-foreground: oklch(0.205 0 0);\n  --muted: oklch(0.97 0 0);\n  --muted-foreground: oklch(0.556 0 0);\n  --accent: oklch(0.97 0 0);\n  --accent-foreground: oklch(0.205 0 0);\n  --destructive: oklch(0.577 0.245 27.325);\n  --border: oklch(0.922 0 0);\n  --input: oklch(0.922 0 0);\n  --ring: oklch(0.708 0 0);\n  --sidebar: oklch(0.985 0 0);\n  --sidebar-foreground: oklch(0.145 0 0);\n  --sidebar-accent: oklch(0.97 0 0);\n  --sidebar-accent-foreground: oklch(0.205 0 0);\n  --sidebar-border: oklch(0.922 0 0);\n  --thread-gc-bg: #eef2f7;\n  --thread-gc-panel: #f8fafc;\n  --thread-gc-workspace: #f3f6fb;\n  --thread-gc-surface: #edf2f7;\n  --thread-gc-muted: #e6edf5;\n  --thread-gc-hover: #e8eef6;\n  --thread-gc-border: rgb(203 213 225 / 0.82);\n  --thread-gc-border-strong: rgb(174 187 204);\n  --thread-gc-border-contrast: rgb(123 139 161);\n  --thread-gc-fg: rgb(15 23 42);\n  --thread-gc-fg-soft: rgb(51 65 85);\n  --thread-gc-fg-muted: rgb(148 163 184);\n  --thread-gc-primary: rgb(2 6 23);\n  --thread-gc-primary-hover: rgb(30 41 59);\n  --thread-gc-primary-fg: #f8fafc;\n  --thread-gc-accent-soft: rgb(241 245 249);\n  --thread-gc-accent-strong: rgb(15 23 42);\n  --thread-gc-accent-border: rgb(203 213 225);\n  --thread-gc-shadow: 0 10px 30px rgb(15 23 42 / 0.04);\n  --theme-bg: var(--thread-gc-bg);\n  --theme-panel: var(--thread-gc-panel);\n  --theme-surface: var(--thread-gc-workspace);\n  --theme-surface-strong: var(--thread-gc-surface);\n  --theme-muted: var(--thread-gc-muted);\n  --theme-hover: var(--thread-gc-hover);\n  --theme-border: var(--thread-gc-border);\n  --theme-border-strong: var(--thread-gc-border-strong);\n  --theme-border-contrast: var(--thread-gc-border-contrast);\n  --theme-fg: var(--thread-gc-fg);\n  --theme-fg-soft: var(--thread-gc-fg-soft);\n  --theme-fg-muted: var(--thread-gc-fg-muted);\n  --theme-accent-solid: var(--thread-gc-primary);\n  --theme-accent-solid-hover: var(--thread-gc-primary-hover);\n  --theme-accent-solid-fg: var(--thread-gc-primary-fg);\n  --theme-accent-soft: var(--thread-gc-accent-soft);\n  --theme-accent-strong: var(--thread-gc-accent-strong);\n  --theme-accent-border: var(--thread-gc-accent-border);\n  --theme-shadow: var(--thread-gc-shadow);\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n  isolation: isolate;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    "Noto Sans CJK SC",\n    "Noto Sans SC",\n    "Microsoft YaHei",\n    "PingFang SC",\n    "Hiragino Sans GB",\n    sans-serif;\n}\n.thread-graph-dialog {\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-viewport-constrained {\n  height: 100svh;\n  max-height: 100svh;\n  min-height: 0;\n  overflow: hidden;\n  overscroll-behavior: none;\n}\n.thread-ui-shell.thread-ui-theme-dark,\n.thread-ui-shell[data-theme-effective=dark],\n:root[data-theme-effective=dark] .thread-ui-shell,\n.thread-ui-shell.dark,\n.thread-ui-shell[data-theme=dark],\n.thread-ui-shell[data-theme-mode=dark],\n.thread-ui-shell[data-theme-mode=system][data-system-theme=dark],\n.thread-graph-dialog[data-theme-effective=dark],\n.thread-graph-dialog[data-theme-mode=dark],\n.thread-graph-dialog[data-theme-mode=system][data-system-theme=dark] {\n  color-scheme: dark;\n  --background: oklch(0.145 0 0);\n  --foreground: oklch(0.985 0 0);\n  --card: oklch(0.205 0 0);\n  --card-foreground: oklch(0.985 0 0);\n  --popover: oklch(0.205 0 0);\n  --popover-foreground: oklch(0.985 0 0);\n  --primary: oklch(0.922 0 0);\n  --primary-foreground: oklch(0.205 0 0);\n  --secondary: oklch(0.269 0 0);\n  --secondary-foreground: oklch(0.985 0 0);\n  --muted: oklch(0.269 0 0);\n  --muted-foreground: oklch(0.708 0 0);\n  --accent: oklch(0.269 0 0);\n  --accent-foreground: oklch(0.985 0 0);\n  --destructive: oklch(0.704 0.191 22.216);\n  --border: oklch(1 0 0 / 10%);\n  --input: oklch(1 0 0 / 15%);\n  --ring: oklch(0.556 0 0);\n  --sidebar: oklch(0.205 0 0);\n  --sidebar-foreground: oklch(0.985 0 0);\n  --sidebar-accent: oklch(0.269 0 0);\n  --sidebar-accent-foreground: oklch(0.985 0 0);\n  --sidebar-border: oklch(1 0 0 / 10%);\n  --thread-gc-bg: #101217;\n  --thread-gc-panel: #171a22;\n  --thread-gc-workspace: #151820;\n  --thread-gc-surface: #1d222c;\n  --thread-gc-muted: #222733;\n  --thread-gc-hover: #222733;\n  --thread-gc-border: #2a2f3a;\n  --thread-gc-border-strong: #303642;\n  --thread-gc-border-contrast: #475063;\n  --thread-gc-fg: rgb(241 245 249);\n  --thread-gc-fg-soft: rgb(203 213 225);\n  --thread-gc-fg-muted: rgb(148 163 184);\n  --thread-gc-primary: rgb(241 245 249);\n  --thread-gc-primary-hover: rgb(203 213 225);\n  --thread-gc-primary-fg: #11141a;\n  --thread-gc-accent-soft: #222733;\n  --thread-gc-accent-strong: rgb(241 245 249);\n  --thread-gc-accent-border: #303642;\n  --thread-gc-shadow: 0 18px 40px rgb(0 0 0 / 0.28);\n}\n.thread-ui-shell *,\n.thread-ui-shell *::before,\n.thread-ui-shell *::after {\n  box-sizing: border-box;\n}\n.thread-ui-shell .thread-main-panel,\n.thread-ui-shell .thread-detail-surface,\n.thread-ui-shell .thread-sidebar-surface,\n.thread-ui-shell .thread-workspace-panel,\n.thread-ui-shell .thread-workspace-card {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-sidebar-surface {\n  background: color-mix(in oklch, var(--theme-panel) 92%, var(--theme-surface));\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-rooms-surface,\n.thread-ui-shell .thread-topbar-surface {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-rooms-surface,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-rooms-surface,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-graph-rooms-surface,\n.thread-ui-shell.dark .thread-graph-rooms-surface,\n.thread-ui-shell.thread-ui-theme-dark .thread-topbar-surface,\n.thread-ui-shell[data-theme-effective=dark] .thread-topbar-surface,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-topbar-surface,\n.thread-ui-shell.dark .thread-topbar-surface {\n  border-color: #2a2f3a;\n  background: #171a22;\n  color: rgb(241 245 249);\n  box-shadow: 0 18px 40px rgb(0 0 0 / 0.28);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-rooms-surface,\n:root[data-theme-effective=light] .thread-ui-shell .thread-graph-rooms-surface,\n.thread-ui-shell[data-theme-effective=light] .thread-topbar-surface,\n:root[data-theme-effective=light] .thread-ui-shell .thread-topbar-surface {\n  border-color: rgb(226 232 240 / 0.8);\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n  box-shadow: 0 10px 30px rgb(15 23 42 / 0.04);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-mobile-scrim,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-mobile-scrim,\n.thread-ui-shell.thread-ui-theme-dark .thread-mobile-scrim,\n.thread-ui-shell.dark .thread-mobile-scrim {\n  background: rgb(0 0 0 / 0.55);\n}\n.thread-ui-shell .thread-shell-frame {\n  display: block;\n  height: 100%;\n  min-height: 0;\n  width: 100%;\n}\n.thread-ui-shell .thread-rooms-rail {\n  transform: none;\n  translate: -100% 0;\n  overflow-x: hidden;\n}\n.thread-ui-shell .thread-rooms-rail.translate-x-0 {\n  transform: none;\n  translate: 0 0;\n}\n.thread-ui-shell .thread-shell-main {\n  height: 100%;\n  width: 100%;\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n.thread-ui-shell .thread-shell-card {\n  border-color: transparent;\n}\n.thread-ui-shell .thread-desktop-only-flex,\n.thread-ui-shell .thread-desktop-only-inline-flex,\n.thread-ui-shell .thread-mobile-chat-hidden,\n.thread-ui-shell .thread-mobile-workspace-hidden {\n  display: none;\n}\n.thread-ui-shell .thread-mobile-only-block {\n  display: block;\n}\n.thread-ui-shell .thread-mobile-only-grid {\n  display: grid;\n}\n.thread-ui-shell .thread-mobile-only-inline-flex {\n  display: inline-flex;\n}\n.thread-ui-shell .thread-main-panel,\n.thread-ui-shell .thread-shell-card {\n  height: 100%;\n  min-height: 0;\n}\n.thread-ui-shell .thread-topbar-surface {\n  min-height: 3.5rem;\n}\n.thread-ui-shell .thread-icon-button,\n.thread-ui-shell .thread-secondary-action {\n  border-color: var(--theme-border);\n  background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-icon-button:hover,\n.thread-ui-shell .thread-secondary-action:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-meta-row {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell button.thread-topbar-meta-row:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-meta-row[aria-expanded=true] {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-details-trigger {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-topbar-details-trigger:hover,\n.thread-ui-shell .thread-topbar-details-trigger[aria-expanded=true] {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-details-popover {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell .thread-topbar-meta-row .font-mono {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell button.thread-topbar-meta-row:hover .font-mono {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-topbar-actions {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-topbar-actions > * {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.thread-ui-shell .thread-graph-topbar-actions button,\n.thread-ui-shell .thread-graph-topbar-actions a {\n  min-width: 2rem;\n  height: 2rem;\n  border-radius: 0.375rem;\n  border-color: transparent;\n  background: transparent;\n  color: var(--theme-fg-soft);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-topbar-actions button:hover,\n.thread-ui-shell .thread-graph-topbar-actions a:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-topbar-actions button:disabled,\n.thread-ui-shell .thread-graph-topbar-actions a[aria-disabled=true] {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.thread-ui-shell .thread-graph-dialog,\n.thread-graph-dialog {\n  border-color: var(--theme-border);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-settings-dialog,\n.thread-graph-settings-dialog,\n.thread-graph-create-thread-dialog {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-settings-dialog [data-slot=dialog-description],\n.thread-graph-settings-dialog [data-slot=dialog-description],\n.thread-graph-create-thread-dialog [data-slot=dialog-description] {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-settings-dialog [data-slot=dialog-close],\n.thread-graph-settings-dialog [data-slot=dialog-close],\n.thread-graph-create-thread-dialog [data-slot=dialog-close] {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-settings-dialog [data-slot=dialog-close]:hover,\n.thread-graph-settings-dialog [data-slot=dialog-close]:hover,\n.thread-graph-create-thread-dialog [data-slot=dialog-close]:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-settings-card,\n.thread-ui-shell .thread-graph-theme-mode-group,\n.thread-ui-shell .thread-graph-settings-tabs,\n.thread-graph-settings-dialog .thread-graph-settings-card,\n.thread-graph-settings-dialog .thread-graph-theme-mode-group,\n.thread-graph-settings-dialog .thread-graph-settings-tabs {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-theme-mode-button,\n.thread-ui-shell .thread-graph-settings-tab-button,\n.thread-graph-settings-dialog .thread-graph-theme-mode-button,\n.thread-graph-settings-dialog .thread-graph-settings-tab-button {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-theme-mode-button:hover:not(:disabled),\n.thread-ui-shell .thread-graph-settings-tab-button:hover:not(:disabled),\n.thread-graph-settings-dialog .thread-graph-theme-mode-button:hover:not(:disabled),\n.thread-graph-settings-dialog .thread-graph-settings-tab-button:hover:not(:disabled) {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-theme-mode-button.is-selected,\n.thread-ui-shell .thread-graph-settings-tab-button.is-active,\n.thread-graph-settings-dialog .thread-graph-theme-mode-button.is-selected,\n.thread-graph-settings-dialog .thread-graph-settings-tab-button.is-active {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n  box-shadow: 0 1px 2px rgb(15 23 42 / 0.08);\n}\n.thread-ui-shell .thread-graph-theme-mode-button:disabled,\n.thread-ui-shell .thread-graph-settings-tab-button:disabled,\n.thread-graph-settings-dialog .thread-graph-theme-mode-button:disabled,\n.thread-graph-settings-dialog .thread-graph-settings-tab-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body {\n  max-height: min(62vh, 42rem);\n  color: var(--theme-fg);\n}\n.thread-graph-settings-dialog .thread-graph-settings-global-content {\n  color: var(--theme-fg);\n}\n.thread-graph-settings-dialog .thread-graph-settings-body dt,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-500,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-500,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-400,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-400 {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body dd,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-100,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-200,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-300,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-100,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-200,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-300 {\n  color: var(--theme-fg) !important;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-stone-950,\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-stone-900,\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-slate-950,\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-slate-900 {\n  background: var(--theme-surface-strong) !important;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body .border-stone-800,\n.thread-graph-settings-dialog .thread-graph-settings-body .border-stone-700,\n.thread-graph-settings-dialog .thread-graph-settings-body .border-slate-800,\n.thread-graph-settings-dialog .thread-graph-settings-body .border-slate-700 {\n  border-color: var(--theme-border) !important;\n}\n.thread-graph-create-thread-input {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-graph-create-thread-input::placeholder {\n  color: var(--theme-fg-muted);\n}\n.thread-graph-create-thread-input:focus {\n  border-color: var(--theme-border-contrast);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-border-contrast) 18%, transparent);\n}\n.thread-graph-create-thread-submit {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-graph-create-thread-submit:hover:not(:disabled) {\n  background: var(--theme-accent-solid-hover);\n}\n.thread-ui-shell .ui-action-danger {\n  border: 1px solid color-mix(in oklch, rgb(244 63 94) 48%, var(--theme-border));\n  background: color-mix(in oklch, rgb(244 63 94) 18%, var(--theme-panel));\n  color: color-mix(in oklch, rgb(254 226 226) 86%, var(--theme-fg));\n}\n.thread-ui-shell .ui-action-danger:hover {\n  background: color-mix(in oklch, rgb(244 63 94) 26%, var(--theme-panel));\n  color: rgb(254 226 226);\n}\n.thread-ui-shell .thread-mobile-segment {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-mobile-segment:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-mobile-segment.is-active {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-ui-shell .thread-sidebar-card {\n  border-color: transparent;\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-room-card {\n  border-color: rgb(226 232 240 / 0.9);\n  background: rgb(248 250 252);\n  color: rgb(51 65 85);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card {\n  border-color: rgb(226 232 240 / 0.9);\n  background: rgb(248 250 252);\n  color: rgb(51 65 85);\n}\n.thread-ui-shell .thread-sidebar-card:hover {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-room-card:hover {\n  border-color: rgb(203 213 225);\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card:hover {\n  border-color: rgb(203 213 225);\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell .thread-sidebar-card-active {\n  border-color: var(--theme-accent-solid);\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n  box-shadow: 0 12px 30px oklch(0.22 0.024 255 / 0.18);\n}\n.thread-ui-shell .thread-graph-room-card.is-active {\n  border-color: rgb(203 213 225);\n  background: rgb(241 245 249);\n  color: rgb(15 23 42);\n  box-shadow: 0 8px 22px rgb(15 23 42 / 0.06);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card.is-active {\n  border-color: rgb(203 213 225);\n  background: rgb(241 245 249);\n  color: rgb(15 23 42);\n  box-shadow: 0 8px 22px rgb(15 23 42 / 0.06);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card.is-active,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card.is-active,\n.thread-ui-shell.dark .thread-graph-room-card.is-active {\n  border-color: #3c4556;\n  background: #262c38;\n  color: rgb(241 245 249);\n  box-shadow: 0 10px 24px rgb(0 0 0 / 0.18);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card,\n.thread-ui-shell.dark .thread-graph-room-card {\n  border-color: transparent;\n  background: #1d222c;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card:hover,\n.thread-ui-shell.dark .thread-graph-room-card:hover {\n  border-color: #343b48;\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-sidebar-card-icon {\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-room-card-icon {\n  background: rgb(255 255 255);\n  color: rgb(100 116 139);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card-icon {\n  background: rgb(255 255 255);\n  color: rgb(100 116 139);\n}\n.thread-ui-shell .thread-sidebar-card-icon.is-active {\n  background: color-mix(in oklch, var(--theme-accent-solid-fg) 16%, transparent);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-ui-shell .thread-graph-room-card-icon.is-active {\n  background: rgb(226 232 240);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card-icon.is-active {\n  background: rgb(226 232 240);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card-icon.is-active,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card-icon.is-active,\n.thread-ui-shell.dark .thread-graph-room-card-icon.is-active {\n  background: #12151c;\n  color: rgb(226 232 240);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card-icon,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card-icon,\n.thread-ui-shell.dark .thread-graph-room-card-icon {\n  background: #12151c;\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-sidebar-card-active .thread-sidebar-card-title,\n.thread-ui-shell .thread-sidebar-card-active p,\n.thread-ui-shell .thread-sidebar-card-active span,\n.thread-ui-shell .thread-sidebar-card-active button,\n.thread-ui-shell .thread-graph-room-card.is-active .thread-graph-room-card-title,\n.thread-ui-shell .thread-graph-room-card.is-active p,\n.thread-ui-shell .thread-graph-room-card.is-active button {\n  color: inherit;\n}\n.thread-ui-shell .thread-card-quiet-button {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-card-quiet-button:hover {\n  background: color-mix(in oklch, var(--theme-hover) 80%, transparent);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-card-session-copy-button {\n  opacity: 0;\n}\n.thread-ui-shell .thread-graph-room-card:hover .thread-card-session-copy-button,\n.thread-ui-shell .thread-card-session-copy-button:focus-visible,\n.thread-ui-shell .thread-card-session-copy-button:active {\n  opacity: 1;\n}\n.thread-ui-shell .thread-card-danger-button {\n  color: oklch(0.62 0.16 25);\n}\n.thread-ui-shell .thread-card-danger-button:hover {\n  background: rgb(254 226 226);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-card-danger-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-card-danger-button:hover,\n.thread-ui-shell.dark .thread-card-danger-button:hover {\n  background: rgb(127 29 29 / 0.32);\n}\n.thread-ui-shell .thread-new-thread-button,\n.thread-ui-shell .thread-graph-new-room-button {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-new-room-strip {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-new-room-button {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n  transition: background-color 160ms ease, transform 160ms ease;\n}\n.thread-ui-shell .thread-graph-new-room-button:hover {\n  background: var(--theme-accent-solid-hover);\n  transform: translateY(-1px);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-new-room-button,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-new-room-button,\n.thread-ui-shell.dark .thread-graph-new-room-button {\n  border: 1px solid #343b48;\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-new-room-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-new-room-button:hover,\n.thread-ui-shell.dark .thread-graph-new-room-button:hover {\n  border-color: #465164;\n  background: #2b313d;\n}\n.thread-ui-shell .thread-detail-surface {\n  border-color: transparent;\n  background: var(--theme-surface);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-chat-panel {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-chat-panel,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-chat-panel,\n.thread-ui-shell.dark .thread-graph-chat-panel {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-scroll-container {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n  scrollbar-color: rgb(203 213 225) transparent;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-scroll-container,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-scroll-container,\n.thread-ui-shell.dark .thread-graph-scroll-container {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n  scrollbar-color: #374151 transparent;\n}\n.thread-ui-shell .thread-graph-scroll-content {\n  min-height: 100%;\n  padding: 0.75rem 0 max(0rem, var(--thread-graph-chat-scroll-bottom-spacer, 0px));\n}\n.thread-ui-shell .thread-graph-message-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.thread-ui-shell .thread-graph-message-section {\n  border-top: 1px solid var(--theme-border);\n}\n.thread-ui-shell .thread-graph-history-control,\n.thread-ui-shell .thread-graph-empty-state {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-button,\n.thread-ui-shell .thread-graph-turn-index,\n.thread-ui-shell .thread-graph-turn-collapse {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-button:hover,\n.thread-ui-shell .thread-graph-turn-collapse:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-turn {\n  border-radius: 0;\n}\n.thread-ui-shell .thread-graph-turn-header {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-turn-time {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell :where(.text-stone-100, .text-stone-200, .text-stone-300) {\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell :where(.text-stone-400, .text-stone-500, .text-stone-600) {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-ui-shell :where(.border-stone-600, .border-stone-700, .border-stone-700\\/90, .border-stone-800, .border-stone-800\\/80) {\n  border-color: var(--theme-border) !important;\n}\n.thread-ui-shell :where(.bg-stone-800, .bg-stone-800\\/60, .bg-stone-800\\/80, .bg-stone-900, .bg-stone-900\\/60, .bg-stone-900\\/70, .bg-stone-900\\/72, .bg-stone-900\\/80, .bg-stone-950, .bg-stone-950\\/70, .bg-stone-950\\/90) {\n  background: var(--theme-surface-strong) !important;\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-sky-100, .text-sky-50),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-sky-100, .text-sky-50) {\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-emerald-100, .text-emerald-50),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-emerald-100, .text-emerald-50) {\n  color: rgb(21 128 61);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-rose-100, .text-rose-50),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-rose-100, .text-rose-50) {\n  color: rgb(190 24 93);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-amber-100, .text-amber-50, .text-amber-200),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-amber-100, .text-amber-50, .text-amber-200) {\n  color: rgb(120 53 15);\n}\n.thread-ui-shell[data-theme-effective=light] .text-fuchsia-100,\n:root[data-theme-effective=light] .thread-ui-shell .text-fuchsia-100 {\n  color: rgb(162 28 175);\n}\n.thread-ui-shell[data-theme-effective=light] .text-violet-100,\n:root[data-theme-effective=light] .thread-ui-shell .text-violet-100 {\n  color: rgb(109 40 217);\n}\n.thread-ui-shell[data-theme-effective=light] .text-lime-100,\n:root[data-theme-effective=light] .thread-ui-shell .text-lime-100 {\n  color: rgb(77 124 15);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.bg-sky-300\\/10, .bg-sky-300\\/15, .bg-emerald-300\\/10, .bg-emerald-300\\/15, .bg-amber-300\\/10, .bg-amber-300\\/15, .bg-rose-300\\/10, .bg-rose-300\\/15, .bg-fuchsia-300\\/10, .bg-fuchsia-300\\/15, .bg-violet-300\\/10, .bg-violet-300\\/15, .bg-lime-300\\/10, .bg-lime-300\\/15),\n:root[data-theme-effective=light] .thread-ui-shell :where(.bg-sky-300\\/10, .bg-sky-300\\/15, .bg-emerald-300\\/10, .bg-emerald-300\\/15, .bg-amber-300\\/10, .bg-amber-300\\/15, .bg-rose-300\\/10, .bg-rose-300\\/15, .bg-fuchsia-300\\/10, .bg-fuchsia-300\\/15, .bg-violet-300\\/10, .bg-violet-300\\/15, .bg-lime-300\\/10, .bg-lime-300\\/15) {\n  filter: saturate(0.72) brightness(0.97);\n}\n.thread-ui-shell .thread-token-popover {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-token-popover-row {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-token-popover-text {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-token-popover-strong {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .token-badge-in {\n  border-color: rgb(22 101 52 / 0.32);\n  background: rgb(220 252 231 / 0.72);\n  color: rgb(20 83 45);\n}\n.thread-ui-shell .token-badge-cache {\n  border-color: rgb(3 105 161 / 0.32);\n  background: rgb(224 242 254 / 0.76);\n  color: rgb(7 89 133);\n}\n.thread-ui-shell .token-badge-out {\n  border-color: rgb(109 40 217 / 0.28);\n  background: rgb(237 233 254 / 0.76);\n  color: rgb(91 33 182);\n}\n.thread-ui-shell .token-badge-reason {\n  border-color: rgb(146 64 14 / 0.28);\n  background: rgb(254 243 199 / 0.72);\n  color: rgb(120 53 15);\n}\n.thread-ui-shell .token-badge-total {\n  border-color: rgb(77 124 15 / 0.3);\n  background: rgb(236 252 203 / 0.72);\n  color: rgb(63 98 18);\n}\n.thread-ui-shell .token-badge-empty {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-surface);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-token-badge-value {\n  color: currentColor;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-token-popover,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-token-popover,\n.thread-ui-shell.thread-ui-theme-dark .thread-token-popover,\n.thread-ui-shell.dark .thread-token-popover {\n  border-color: #303642;\n  background: #171a22;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-token-popover-row,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-token-popover-row,\n.thread-ui-shell.thread-ui-theme-dark .thread-token-popover-row,\n.thread-ui-shell.dark .thread-token-popover-row {\n  border-color: #303642;\n  background: #1d222c;\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-in,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-cache,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-out,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-reason,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-total,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-in,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-cache,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-out,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-reason,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-total,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-in,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-cache,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-out,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-reason,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-total,\n.thread-ui-shell.dark .token-badge-in,\n.thread-ui-shell.dark .token-badge-cache,\n.thread-ui-shell.dark .token-badge-out,\n.thread-ui-shell.dark .token-badge-reason,\n.thread-ui-shell.dark .token-badge-total {\n  background-color: color-mix(in oklch, currentColor 12%, transparent);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-in,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-in,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-in,\n.thread-ui-shell.dark .token-badge-in {\n  color: rgb(134 239 172);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-cache,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-cache,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-cache,\n.thread-ui-shell.dark .token-badge-cache {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-out,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-out,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-out,\n.thread-ui-shell.dark .token-badge-out {\n  color: rgb(196 181 253);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-reason,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-reason,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-reason,\n.thread-ui-shell.dark .token-badge-reason {\n  color: rgb(252 211 77);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-total,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-total,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-total,\n.thread-ui-shell.dark .token-badge-total {\n  color: rgb(190 242 100);\n}\n.thread-ui-shell .thread-graph-event,\n.thread-ui-shell .thread-graph-event-card,\n.thread-ui-shell .thread-graph-history-group,\n.thread-ui-shell .thread-graph-history-group-card {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-event-card,\n.thread-ui-shell .thread-graph-history-group-card {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-event-line,\n.thread-ui-shell .thread-graph-history-group-toggle {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-group-list {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-workspace-panel {\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-workspace-card {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-workspace-collapse-tab,\n.thread-ui-shell .thread-workspace-small-toggle,\n.thread-ui-shell .thread-workspace-expand-fab,\n.thread-ui-shell .thread-graph-panel-expand-fab {\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 999px;\n  background: color-mix(in oklch, var(--theme-panel) 92%, transparent);\n  color: var(--theme-fg-soft);\n  box-shadow: 0 10px 26px color-mix(in oklch, var(--theme-bg) 62%, transparent);\n  transition:\n    background-color 160ms ease,\n    border-color 160ms ease,\n    color 160ms ease,\n    transform 160ms ease,\n    box-shadow 160ms ease;\n}\n.thread-ui-shell .thread-workspace-collapse-tab:hover,\n.thread-ui-shell .thread-workspace-small-toggle:hover,\n.thread-ui-shell .thread-workspace-expand-fab:hover,\n.thread-ui-shell .thread-graph-panel-expand-fab:hover {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n  box-shadow: 0 14px 30px color-mix(in oklch, var(--theme-bg) 72%, transparent);\n}\n.thread-ui-shell .thread-workspace-collapse-tab {\n  position: absolute;\n  left: -1rem;\n  top: 50%;\n  z-index: 30;\n  transform: translateY(-50%);\n}\n.thread-ui-shell .thread-workspace-collapse-tab:hover {\n  transform: translateY(-50%) translateX(-1px);\n}\n.thread-ui-shell .thread-workspace-expand-fab {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  z-index: 30;\n  transform: translateY(-50%);\n}\n.thread-ui-shell .thread-workspace-expand-fab:hover {\n  transform: translateY(-50%) translateX(-1px);\n}\n.thread-ui-shell .thread-chat-usage-footer {\n  background: var(--theme-surface);\n  color: rgb(148 163 184);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-chat-usage-footer,\n.thread-ui-shell[data-theme-effective=dark] .thread-chat-usage-footer,\n.thread-ui-shell.dark .thread-chat-usage-footer {\n  background: var(--theme-surface);\n  color: rgb(100 116 139);\n}\n.thread-ui-shell .thread-graph-composer-host {\n  border-top: 1px solid rgb(226 232 240);\n  background: var(--theme-surface);\n  padding: 0.5rem 0.75rem calc(env(safe-area-inset-bottom) + 0.5rem);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-host,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-host,\n.thread-ui-shell.dark .thread-graph-composer-host {\n  border-top-color: #2a2f3a;\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-composer-host > .thread-composer-layer,\n.thread-ui-shell .thread-graph-composer-host > .thread-graph-composer-layer {\n  width: 100%;\n}\n.thread-ui-shell .thread-split-chat-pane,\n.thread-ui-shell .thread-split-workspace-pane {\n  width: 100%;\n  min-height: 0;\n}\n.thread-ui-shell .thread-split-chat-pane {\n  min-width: 0;\n}\n.thread-ui-shell .thread-split-region,\n.thread-ui-shell .thread-split-container {\n  height: 100%;\n  min-height: 0;\n  overflow: hidden;\n}\n.thread-ui-shell .thread-graph-shell-desktop-split {\n  display: none !important;\n}\n.thread-ui-shell .thread-graph-shell-mobile-split {\n  display: block !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split {\n  display: flex !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-mobile-split {\n  display: none !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-chat-pane,\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-workspace-pane,\n.thread-ui-shell .thread-graph-shell-desktop-split .thread-split-chat-pane,\n.thread-ui-shell .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n  min-width: 0;\n  height: 100%;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-chat-pane,\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n  flex: 1 1 0;\n  min-width: 0;\n  width: auto;\n}\n.thread-ui-shell[data-thread-layout=desktop] {\n  padding: 0.5rem;\n}\n.thread-ui-shell[data-thread-layout=desktop].thread-ui-viewport-constrained {\n  height: 100svh;\n  max-height: 100svh;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-frame {\n  display: grid;\n  grid-template-columns: 264px minmax(0, 1fr);\n  gap: 0.5rem;\n  height: 100%;\n  min-height: 0;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-desktop-only-flex {\n  display: flex !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-desktop-only-inline-flex {\n  display: inline-flex !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-only-block,\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-only-grid,\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-only-inline-flex {\n  display: none !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-chat-hidden,\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-workspace-hidden {\n  display: block !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-desktop-collapsed-hidden {\n  display: none;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-frame.is-rail-collapsed {\n  grid-template-columns: 56px minmax(0, 1fr);\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-rooms-rail {\n  position: static;\n  z-index: auto;\n  width: auto;\n  min-width: 0;\n  height: 100%;\n  transform: none;\n  translate: 0 0;\n  pointer-events: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 12px;\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-rooms-rail-header {\n  height: 4rem;\n  align-items: center;\n  padding-bottom: 0;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-card {\n  border: 1px solid var(--theme-border);\n  border-radius: 12px;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-topbar-row {\n  min-height: 4rem;\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-view-switch {\n  display: none !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-region {\n  padding: 0.5rem;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-container.has-workspace {\n  display: flex;\n  align-items: stretch;\n  min-width: 0;\n  min-height: 0;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-chat-pane {\n  flex: 0 0 var(--thread-chat-percent, 54%);\n  min-width: min(31rem, 100%);\n  width: auto;\n  height: 100%;\n  display: block;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-workspace-pane {\n  flex: 0 0 var(--thread-workspace-percent, 46%);\n  min-width: 19rem;\n  width: auto;\n  height: 100%;\n  display: block;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-resize-handle {\n  display: flex !important;\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) {\n    padding: 0.5rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]).thread-ui-viewport-constrained {\n    height: 100svh;\n    max-height: 100svh;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-frame {\n    display: grid;\n    grid-template-columns: 264px minmax(0, 1fr);\n    gap: 0.5rem;\n    height: 100%;\n    min-height: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-desktop-only-flex {\n    display: flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-desktop-only-inline-flex {\n    display: inline-flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-only-block,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-only-grid,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-only-inline-flex {\n    display: none !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-chat-hidden,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-workspace-hidden {\n    display: block !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-desktop-collapsed-hidden {\n    display: none;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-frame.is-rail-collapsed {\n    grid-template-columns: 56px minmax(0, 1fr);\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-rooms-rail {\n    position: static;\n    z-index: auto;\n    width: auto;\n    min-width: 0;\n    height: 100%;\n    transform: none;\n    translate: 0 0;\n    pointer-events: auto;\n    border: 1px solid var(--theme-border);\n    border-radius: 12px;\n    box-shadow: var(--theme-shadow);\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-rooms-rail-header {\n    height: 4rem;\n    align-items: center;\n    padding-bottom: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-card {\n    border: 1px solid var(--theme-border);\n    border-radius: 12px;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-topbar-row {\n    min-height: 4rem;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-view-switch {\n    display: none !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-region {\n    padding: 0.5rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-container.has-workspace {\n    display: flex;\n    align-items: stretch;\n    min-width: 0;\n    min-height: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-chat-pane {\n    flex: 0 0 var(--thread-chat-percent, 54%);\n    min-width: min(31rem, 100%);\n    width: auto;\n    height: 100%;\n    display: block;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-workspace-pane {\n    flex: 0 0 var(--thread-workspace-percent, 46%);\n    min-width: 19rem;\n    width: auto;\n    height: 100%;\n    display: block;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-resize-handle {\n    display: flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split {\n    display: flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-mobile-split {\n    display: none !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-chat-pane,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n    flex: 1 1 0;\n    min-width: 0;\n    width: auto;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-chat-pane {\n    min-width: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n    min-width: 0;\n  }\n}\n.thread-ui-shell .thread-resize-handle span {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-resize-handle:hover span,\n.thread-ui-shell .thread-resize-handle:focus-visible span {\n  background: var(--theme-border-strong);\n  box-shadow: 0 0 0 3px color-mix(in oklch, var(--theme-accent-border) 24%, transparent);\n}\n.thread-ui-shell .thread-graph-right-tabs {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-right-tab-secondary {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-workspace-tab,\n.thread-ui-shell .thread-graph-right-tab {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-workspace-tab:hover,\n.thread-ui-shell .thread-graph-right-tab:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-workspace-tab.is-active,\n.thread-ui-shell .thread-graph-right-tab.is-active {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-visualization-panel {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-flow {\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 12px;\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-flow-node {\n  position: relative;\n  min-width: 8rem;\n  max-width: 12rem;\n  border: 1px solid var(--theme-border-strong);\n  border-radius: 8px;\n  background: var(--theme-panel);\n  padding: 0.85rem 1rem;\n  color: var(--theme-fg);\n  text-align: center;\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell .thread-graph-flow .react-flow {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__edge-path {\n  stroke: var(--theme-border-contrast);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__background {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls {\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 8px;\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls-button {\n  border-bottom-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls-button:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls-button svg {\n  fill: currentColor;\n}\n.thread-ui-shell .thread-guide-section {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-guide-icon,\n.thread-ui-shell .thread-guide-tag {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-workspace-mobile-tabs,\n.thread-ui-shell .thread-graph-workspace-mobile-explorer {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-workspace-mobile-stack,\n.thread-ui-shell .thread-graph-workspace-mobile-viewer {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-workspace-resizable {\n  height: 100%;\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-workspace-explorer-pane {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-workspace-viewer-pane {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-workspace-resize-handle::after {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-workspace-resize-handle:hover::after,\n.thread-ui-shell .thread-graph-workspace-resize-handle:focus-visible::after {\n  background: var(--theme-border-contrast);\n}\n.thread-ui-shell .thread-graph-explorer,\n.thread-ui-shell .thread-graph-viewer {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-header,\n.thread-ui-shell .thread-graph-viewer-header {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer h2,\n.thread-ui-shell .thread-graph-viewer h2 {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-icon-button,\n.thread-ui-shell .thread-graph-explorer-collapse-button,\n.thread-ui-shell .thread-graph-viewer-header button {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-explorer-icon-button:hover,\n.thread-ui-shell .thread-graph-explorer-collapse-button:hover,\n.thread-ui-shell .thread-graph-viewer-header button:hover {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-panel-expand-fab {\n  position: absolute;\n  top: 50%;\n  z-index: 30;\n  display: inline-flex;\n  transform: translateY(-50%);\n}\n.thread-ui-shell .thread-graph-panel-expand-fab.left-3 {\n  left: 0.75rem;\n}\n.thread-ui-shell .thread-graph-panel-expand-fab.right-3 {\n  right: 0.75rem;\n}\n.thread-ui-shell .thread-graph-panel-expand-fab:hover {\n  transform: translateY(-50%) scale(1.04);\n}\n.thread-ui-shell .thread-graph-workspace-label,\n.thread-ui-shell .thread-graph-workspace-loading,\n.thread-ui-shell .thread-graph-workspace-empty,\n.thread-ui-shell .thread-graph-file-preview-header,\n.thread-ui-shell .thread-graph-file-preview-footer {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-file-preview-header,\n.thread-ui-shell .thread-graph-file-preview-footer {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-file-preview-footer,\n.thread-ui-shell .thread-graph-file-preview-frame {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-workspace-empty {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n}\n.thread-ui-shell .thread-graph-explorer button,\n.thread-ui-shell .thread-graph-viewer button {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-tree-row {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-tree-row:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected {\n  background: color-mix(in oklch, var(--theme-accent-solid) 13%, var(--theme-panel));\n  color: var(--theme-fg);\n  box-shadow: inset 3px 0 0 color-mix(in oklch, var(--theme-accent-solid) 72%, transparent);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tree-row.is-selected,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tree-row.is-selected,\n.thread-ui-shell.dark .thread-graph-tree-row.is-selected {\n  background: color-mix(in oklch, var(--theme-accent-solid) 18%, var(--theme-panel));\n  color: var(--theme-fg);\n  box-shadow: inset 3px 0 0 color-mix(in oklch, var(--theme-accent-solid) 72%, transparent);\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected svg {\n  color: currentColor;\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected .thread-graph-tree-action,\n.thread-ui-shell .thread-graph-tree-action.is-selected {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected .thread-graph-tree-action:hover,\n.thread-ui-shell .thread-graph-tree-action.is-selected:hover {\n  background: color-mix(in oklch, var(--theme-accent-solid) 12%, transparent);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tree-action {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tree-action:hover {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-preview {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-molecule-viewer {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-header,\n.thread-ui-shell .thread-graph-molecule-controls {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-body {\n  display: flex;\n  min-height: 0;\n  flex: 1;\n  flex-direction: column;\n  overflow: hidden;\n}\n.thread-ui-shell .thread-graph-molecule-header h2 {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-header p,\n.thread-ui-shell .thread-graph-molecule-header span,\n.thread-ui-shell .thread-graph-molecule-trajectory {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-controls {\n  border-top: 1px solid var(--theme-border);\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  max-height: min(42%, 18rem);\n  overflow: auto;\n  padding: 0.75rem;\n}\n.thread-ui-shell .thread-graph-molecule-control-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.thread-ui-shell .thread-graph-molecule-control-title {\n  color: var(--theme-fg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n}\n.thread-ui-shell .thread-graph-molecule-control-subtitle {\n  margin-top: 0.125rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.6875rem;\n  line-height: 1rem;\n}\n.thread-ui-shell .thread-graph-molecule-button-group {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.125rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-surface);\n  padding: 0.125rem;\n}\n.thread-ui-shell .thread-graph-molecule-button {\n  display: inline-flex;\n  min-width: 1.75rem;\n  height: 1.75rem;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid transparent;\n  border-radius: 0.375rem;\n  background: transparent;\n  color: var(--theme-fg-soft);\n  transition:\n    background-color 140ms ease,\n    border-color 140ms ease,\n    color 140ms ease,\n    opacity 140ms ease;\n}\n.thread-ui-shell .thread-graph-molecule-button:hover:not(:disabled) {\n  border-color: var(--theme-border);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-button:disabled {\n  cursor: not-allowed;\n  color: var(--theme-fg-subtle);\n  opacity: 0.45;\n}\n.thread-ui-shell .thread-graph-molecule-button-divider {\n  width: 1px;\n  align-self: stretch;\n  margin-inline: 0.25rem;\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-molecule-stage {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-molecule-error {\n  background: color-mix(in oklch, #ef4444 12%, var(--theme-surface));\n  color: var(--theme-danger);\n}\n.thread-ui-shell .thread-graph-molecule-empty {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-tooltip {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-surface) 96%, transparent);\n  color: var(--theme-fg);\n  box-shadow: 0 10px 28px color-mix(in oklch, var(--theme-bg) 72%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-tooltip div,\n.thread-ui-shell .thread-graph-molecule-tooltip span {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-molecule-trajectory input {\n  accent-color: var(--theme-accent-solid);\n}\n.thread-ui-shell .thread-graph-molecule-live-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface);\n  padding: 0.125rem 0.5rem;\n  color: var(--theme-fg-muted);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n.thread-ui-shell .thread-graph-molecule-live-button:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-camera {\n  margin-top: 0.75rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.625rem;\n}\n.thread-ui-shell .thread-graph-molecule-camera-divider {\n  width: 100%;\n  height: 1px;\n  margin-block: 0.5rem;\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin {\n  height: 100%;\n  min-height: 0;\n  border: 0;\n  border-radius: 0;\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header {\n  min-height: 60px;\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  padding: 0.75rem 1.25rem;\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header h2 {\n  color: var(--theme-fg);\n  font-size: 0.875rem;\n  font-weight: 650;\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header p,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header span {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  padding: 0.5rem 0.625rem;\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar button,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar button:hover,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button:hover {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar button:disabled,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button:disabled {\n  color: var(--theme-fg-subtle);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar-divider {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__stage {\n  min-height: 0;\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__error {\n  background: color-mix(in oklch, #ef4444 12%, var(--theme-surface));\n  color: var(--theme-danger);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__empty {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__tooltip {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-surface) 96%, transparent);\n  color: var(--theme-fg);\n  box-shadow: 0 10px 28px color-mix(in oklch, var(--theme-bg) 72%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__tooltip span {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__status {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline input {\n  accent-color: var(--theme-accent-solid);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button.is-live {\n  color: var(--theme-danger);\n}\n.thread-ui-shell .thread-graph-file-preview-header,\n.thread-ui-shell .thread-graph-file-preview-footer {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-load-more-button {\n  border: 1px solid var(--theme-border);\n  background: color-mix(in oklch, var(--theme-accent-solid) 8%, var(--theme-panel));\n  color: var(--theme-fg-soft);\n  transition:\n    background-color 140ms ease,\n    border-color 140ms ease,\n    color 140ms ease;\n}\n.thread-ui-shell .thread-graph-load-more-button:hover:not(:disabled) {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 28%, var(--theme-border));\n  background: color-mix(in oklch, var(--theme-accent-solid) 14%, var(--theme-panel));\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-code-preview {\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-code-preview pre,\n.thread-ui-shell .thread-graph-code-preview code {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    monospace !important;\n  font-size: 0.78rem;\n  line-height: 1.55;\n}\n.thread-ui-shell .thread-graph-plain-code-preview {\n  min-height: 100%;\n  margin: 0;\n  padding: 1rem;\n  background: transparent;\n  color: var(--theme-fg);\n  white-space: pre;\n}\n.thread-ui-shell .thread-tool-call {\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  overflow: hidden;\n}\n.thread-ui-shell .thread-tool-call:hover {\n  border-color: var(--theme-border-strong);\n}\n.thread-ui-shell .thread-graph-tool-call {\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n.thread-ui-shell .thread-graph-tool-call,\n.thread-ui-shell .thread-graph-tool-accordion,\n.thread-ui-shell .thread-graph-tool-trigger,\n.thread-ui-shell .thread-graph-tool-content,\n.thread-ui-shell .thread-graph-tool-json,\n.thread-ui-shell .thread-graph-tool-output {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tool-accordion {\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-panel);\n  box-shadow: 0 1px 2px color-mix(in oklch, var(--theme-bg) 65%, transparent);\n}\n.thread-ui-shell .thread-graph-tool-trigger {\n  display: flex;\n  width: 100%;\n  min-width: 0;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  border: 0;\n  background: var(--theme-panel);\n  text-align: left;\n  transition: background 160ms ease, color 160ms ease;\n}\n.thread-ui-shell .thread-graph-tool-trigger:hover {\n  background: var(--theme-hover);\n}\n.thread-ui-shell .thread-graph-tool-trigger svg {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tool-trigger > svg {\n  margin-left: auto;\n}\n.thread-ui-shell .thread-graph-tool-badge {\n  display: inline-flex;\n  min-height: 1.35rem;\n  shrink: 0;\n  align-items: center;\n  gap: 0.25rem;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  padding: 0.1rem 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 400;\n  line-height: 1rem;\n}\n.thread-ui-shell .thread-graph-tool-badge.is-completed {\n  background: oklch(0.94 0.052 155);\n  color: oklch(0.43 0.095 155);\n}\n.thread-ui-shell .thread-graph-tool-badge.is-failed {\n  background: oklch(0.94 0.04 25);\n  color: oklch(0.48 0.125 24);\n}\n.thread-ui-shell .thread-graph-tool-badge.is-pending {\n  background: oklch(0.94 0.03 235);\n  color: oklch(0.43 0.09 242);\n}\n.thread-ui-shell .thread-graph-tool-badge.is-neutral {\n  background: var(--theme-muted);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-completed,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-completed,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-completed {\n  background: oklch(0.31 0.05 155);\n  color: oklch(0.8 0.115 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-failed,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-failed,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-failed {\n  background: oklch(0.31 0.052 25);\n  color: oklch(0.78 0.12 25);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-pending,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-pending,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-pending {\n  background: oklch(0.3 0.042 235);\n  color: oklch(0.77 0.1 235);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-neutral,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-neutral,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-neutral {\n  background: #222733;\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-tool-content {\n  display: grid;\n  gap: 0.75rem;\n  border-top: 0;\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-graph-tool-content h4 {\n  margin: 0.25rem 0 0.5rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  line-height: 1rem;\n  text-transform: uppercase;\n}\n.thread-ui-shell .thread-graph-tool-json,\n.thread-ui-shell .thread-graph-tool-output {\n  overflow-x: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.75rem;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    monospace;\n  font-size: 0.78rem;\n  line-height: 1.55;\n  white-space: pre-wrap;\n}\n.thread-ui-shell .thread-graph-tool-json > div {\n  padding-left: 1rem;\n}\n.thread-ui-shell .thread-graph-tool-output {\n  margin-top: 0.5rem;\n}\n.thread-ui-shell .thread-graph-tool-key {\n  color: oklch(0.58 0.18 18);\n}\n.thread-ui-shell .thread-graph-tool-string {\n  color: oklch(0.52 0.12 155);\n}\n.thread-ui-shell .thread-graph-tool-number {\n  color: oklch(0.55 0.13 235);\n}\n.thread-ui-shell .thread-graph-tool-boolean {\n  color: oklch(0.56 0.13 302);\n}\n.thread-ui-shell .thread-graph-tool-null,\n.thread-ui-shell .thread-graph-tool-punctuation,\n.thread-ui-shell .thread-graph-tool-object {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool {\n  width: 100%;\n  min-width: 0;\n  border: 0;\n  background: transparent !important;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-tool-accordion {\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-graph-history-tool-trigger {\n  min-height: 2.75rem;\n}\n.thread-ui-shell .thread-graph-history-tool-trigger > div:first-child {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-history-tool-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool.is-command .thread-graph-history-tool-icon {\n  color: oklch(0.63 0.12 75);\n}\n.thread-ui-shell .thread-graph-history-tool.is-tool .thread-graph-history-tool-icon {\n  color: oklch(0.61 0.12 315);\n}\n.thread-ui-shell .thread-graph-history-tool.is-agent .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.11 170);\n}\n.thread-ui-shell .thread-graph-history-tool.is-skill .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.12 285);\n}\n.thread-ui-shell .thread-graph-history-tool.is-search .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.12 235);\n}\n.thread-ui-shell .thread-graph-history-tool.is-file-read .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.1 205);\n}\n.thread-ui-shell .thread-graph-history-tool-summary {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.5rem;\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.65rem 0.75rem;\n  color: var(--theme-fg-soft);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.thread-ui-shell .thread-graph-history-tool-summary > span:first-child {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-history-tool-ellipsis {\n  flex: 0 0 auto;\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  letter-spacing: 0.16em;\n}\n.thread-ui-shell .thread-graph-history-tool-open {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-tool-open:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event {\n  display: flex;\n  min-width: 0;\n  width: 100%;\n  align-items: flex-start;\n  gap: 0.625rem;\n  border: 0;\n  background: transparent !important;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-icon {\n  display: inline-flex;\n  height: 1.75rem;\n  width: 1.75rem;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--theme-border);\n  border-radius: 999px;\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-event-card {\n  min-width: 0;\n  flex: 1 1 auto;\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: 0 1px 2px color-mix(in oklch, var(--theme-bg) 65%, transparent);\n}\n.thread-ui-shell .thread-graph-history-event-header {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n}\n.thread-ui-shell .thread-graph-history-event-heading {\n  flex: 1 1 auto;\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-history-event-title {\n  flex: 0 0 auto;\n  max-width: min(14rem, 36%);\n}\n.thread-ui-shell .thread-graph-history-event-actions {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 0.5rem;\n}\n.thread-ui-shell .thread-graph-history-event-body {\n  display: grid;\n  gap: 0.625rem;\n  border-top: 1px solid var(--theme-border);\n  padding: 0.75rem 1rem 1rem;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-event-line {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-primary {\n  min-width: 0;\n  color: var(--theme-fg);\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.5;\n}\n.thread-ui-shell .thread-graph-history-event-secondary {\n  min-width: 0;\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  line-height: 1.35;\n}\n.thread-ui-shell .thread-graph-history-event-summary {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.65rem 0.75rem;\n  color: var(--theme-fg-soft);\n  font-size: 0.875rem;\n  line-height: 1.5;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-history-event-summary.is-clickable {\n  transition: background 160ms ease, color 160ms ease;\n}\n.thread-ui-shell .thread-graph-history-event-summary.is-clickable:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-prose {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-event-pre {\n  overflow-x: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.75rem;\n  color: var(--theme-fg-soft);\n  font-size: 0.8125rem;\n  line-height: 1.55;\n  white-space: pre-wrap;\n}\n.thread-ui-shell .thread-graph-history-event-action,\n.thread-ui-shell .thread-graph-history-event-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 999px;\n  background: var(--theme-surface);\n  padding: 0.25rem 0.55rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.6875rem;\n  font-weight: 500;\n  line-height: 1rem;\n  transition: background 160ms ease, color 160ms ease;\n}\n.thread-ui-shell .thread-graph-history-event-action:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-path {\n  display: block;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  line-height: 1.4;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-history-event-path:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-image {\n  max-height: 24rem;\n  width: 100%;\n  object-fit: contain;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-surface-strong);\n}\n.thread-ui-shell .thread-graph-history-event.is-plan .thread-graph-history-event-icon {\n  color: oklch(0.58 0.12 235);\n}\n.thread-ui-shell .thread-graph-history-event.is-context .thread-graph-history-event-icon {\n  color: oklch(0.58 0.11 170);\n}\n.thread-ui-shell .thread-graph-history-event.is-image .thread-graph-history-event-icon,\n.thread-ui-shell .thread-graph-history-event.is-artifact .thread-graph-history-event-icon {\n  color: oklch(0.58 0.12 285);\n}\n.thread-ui-shell .thread-graph-history-event.is-file-change .thread-graph-history-event-icon {\n  color: oklch(0.62 0.12 145);\n}\n.thread-ui-shell .thread-graph-history-event.is-hook .thread-graph-history-event-icon {\n  color: oklch(0.61 0.12 315);\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-history-event {\n    gap: 0.5rem;\n  }\n  .thread-ui-shell .thread-graph-history-event-icon {\n    height: 1.5rem;\n    width: 1.5rem;\n  }\n  .thread-ui-shell .thread-graph-history-event-header,\n  .thread-ui-shell .thread-graph-history-event-body {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n  }\n}\n.thread-ui-shell .thread-graph-history-detail-row {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-detail-row:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-detail-text {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-card {\n  border-radius: 0.4375rem;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-header {\n  min-height: 2.75rem;\n  padding-block: 0.5rem;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-heading {\n  flex: 1 1 auto;\n  min-width: 0;\n  gap: 0.375rem;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-title {\n  max-width: none;\n  font-size: 0.8125rem;\n}\n.thread-ui-shell .thread-graph-file-change-inline,\n.thread-ui-shell .thread-graph-file-change-inline-button {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-file-change-inline {\n  max-width: 100%;\n  gap: 0.375rem;\n}\n.thread-ui-shell .thread-graph-file-change-inline-button {\n  display: block;\n  flex: 1 1 auto;\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-file-change-inline-button:hover .thread-graph-history-detail-text {\n  color: var(--theme-fg);\n  text-decoration: underline;\n  text-decoration-thickness: 1px;\n  text-underline-offset: 2px;\n}\n.thread-ui-shell .thread-graph-history-detail-meta {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-delta-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  padding: 0.125rem 0.375rem;\n  font-size: 0.6875rem;\n  font-weight: 500;\n  line-height: 1rem;\n}\n.thread-ui-shell .thread-graph-history-delta-badge.is-add {\n  border-color: rgb(52 211 153 / 0.28);\n  background: rgb(52 211 153 / 0.1);\n  color: rgb(167 243 208);\n}\n.thread-ui-shell .thread-graph-history-delta-badge.is-remove {\n  border-color: rgb(251 113 133 / 0.3);\n  background: rgb(251 113 133 / 0.1);\n  color: rgb(254 205 211);\n}\n.thread-ui-shell .thread-graph-history-delta-badge.is-neutral {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-history-delta-badge.is-add {\n  border-color: rgb(16 185 129 / 0.25);\n  background: rgb(16 185 129 / 0.1);\n  color: rgb(4 120 87);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-history-delta-badge.is-remove {\n  border-color: rgb(244 63 94 / 0.25);\n  background: rgb(244 63 94 / 0.1);\n  color: rgb(190 18 60);\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-history-tool-trigger {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n  }\n  .thread-ui-shell .thread-graph-history-tool-trigger .thread-graph-tool-badge {\n    max-width: 7.5rem;\n  }\n  .thread-ui-shell .thread-graph-history-tool-content {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n  }\n}\n.thread-ui-shell .xyz-viewer-plugin {\n  border-color: var(--theme-border);\n  border-radius: 0;\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__header,\n.thread-ui-shell .xyz-viewer-plugin__toolbar,\n.thread-ui-shell .xyz-viewer-plugin__timeline,\n.thread-ui-shell .xyz-viewer-plugin__status {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .xyz-viewer-plugin__header h2 {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__header p,\n.thread-ui-shell .xyz-viewer-plugin__header span,\n.thread-ui-shell .xyz-viewer-plugin__tooltip span {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .xyz-viewer-plugin__toolbar button,\n.thread-ui-shell .xyz-viewer-plugin__timeline button {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .xyz-viewer-plugin__toolbar button:hover,\n.thread-ui-shell .xyz-viewer-plugin__timeline button:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__toolbar-divider {\n  background: var(--theme-border);\n}\n.thread-ui-shell .xyz-viewer-plugin__stage {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .xyz-viewer-plugin__tooltip {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-panel) 96%, transparent);\n  box-shadow: var(--theme-shadow);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__empty {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .xyz-viewer-plugin__error {\n  background: color-mix(in oklch, oklch(0.62 0.16 25) 14%, var(--theme-panel));\n  color: oklch(0.78 0.12 25);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-key,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-key,\n.thread-ui-shell.dark .thread-graph-tool-key {\n  color: oklch(0.78 0.12 18);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-string,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-string,\n.thread-ui-shell.dark .thread-graph-tool-string {\n  color: oklch(0.79 0.11 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-number,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-number,\n.thread-ui-shell.dark .thread-graph-tool-number {\n  color: oklch(0.77 0.1 235);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-boolean,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-boolean,\n.thread-ui-shell.dark .thread-graph-tool-boolean {\n  color: oklch(0.79 0.1 302);\n}\n.thread-ui-shell .thread-timeline-surface,\n.thread-ui-shell .thread-scroll-container {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n  scrollbar-color: var(--theme-border-strong) transparent;\n}\n.thread-ui-shell .thread-scroll-container > div > .divide-y {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .timeline-item-frame {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-agent {\n  border-color: transparent;\n  background: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-user {\n  border-color: transparent;\n  background: oklch(0.94 0.025 214);\n  color: oklch(0.24 0.027 255);\n}\n.thread-ui-shell.thread-ui-theme-dark .timeline-user,\n.thread-ui-shell[data-theme-effective=dark] .timeline-user,\n.thread-ui-shell.dark .timeline-user {\n  background: oklch(0.29 0.034 224);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-command,\n.thread-ui-shell .timeline-agent-tool,\n.thread-ui-shell .timeline-skill-tool,\n.thread-ui-shell .timeline-action,\n.thread-ui-shell .timeline-file-change,\n.thread-ui-shell .timeline-file-read,\n.thread-ui-shell .timeline-search,\n.thread-ui-shell .timeline-plan,\n.thread-ui-shell .timeline-reasoning,\n.thread-ui-shell .timeline-other,\n.thread-ui-shell .timeline-special-warning,\n.thread-ui-shell .timeline-special-info,\n.thread-ui-shell .timeline-special-file-read,\n.thread-ui-shell .timeline-special-success,\n.thread-ui-shell .timeline-mobile-dense-event,\n.thread-ui-shell .timeline-batch-inner,\n.thread-ui-shell .timeline-item-inner {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-special-warning,\n.thread-ui-shell .timeline-special-info,\n.thread-ui-shell .timeline-special-file-read,\n.thread-ui-shell .timeline-special-success {\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-mobile-dense-command,\n.thread-ui-shell .timeline-mobile-dense-search,\n.thread-ui-shell .timeline-mobile-dense-file-read,\n.thread-ui-shell .timeline-mobile-dense-file {\n  background: var(--theme-panel);\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.border-stone-700, .border-stone-700\\/90, .border-stone-800, .border-stone-800\\/80) {\n  border-color: var(--theme-border) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.bg-stone-800, .bg-stone-900, .bg-stone-900\\/60, .bg-stone-900\\/72, .bg-stone-900\\/80, .bg-stone-950, .bg-stone-950\\/35, .bg-stone-950\\/40, .bg-stone-950\\/60, .bg-stone-950\\/70, .bg-stone-950\\/90, .bg-stone-950\\/96) {\n  background: var(--theme-surface-strong) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-stone-100, .text-stone-200, .text-stone-300, .text-sky-50, .text-sky-100, .text-emerald-50, .text-emerald-100, .text-amber-100) {\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-stone-400, .text-stone-500) {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-ui-shell .timeline-kind-agent,\n.thread-ui-shell .timeline-kind-user,\n.thread-ui-shell .timeline-kind-command,\n.thread-ui-shell .timeline-kind-search,\n.thread-ui-shell .timeline-kind-file-read,\n.thread-ui-shell .timeline-kind-reasoning,\n.thread-ui-shell .timeline-kind-agent-tool,\n.thread-ui-shell .timeline-kind-skill-tool,\n.thread-ui-shell .timeline-kind-action,\n.thread-ui-shell .timeline-kind-plan,\n.thread-ui-shell .timeline-kind-file {\n  border-left-width: 1px;\n}\n.thread-ui-shell .timeline-primary-text,\n.thread-ui-shell .timeline-message-content,\n.thread-ui-shell .timeline-mobile-bubble-content,\n.thread-ui-shell .thread-message-prose,\n.thread-ui-shell .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-user .thread-message-prose,\n.thread-ui-shell .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: oklch(0.24 0.027 255);\n}\n.thread-ui-shell.thread-ui-theme-dark .timeline-user .thread-message-prose,\n.thread-ui-shell[data-theme-effective=dark] .timeline-user .thread-message-prose,\n.thread-ui-shell.dark .timeline-user .thread-message-prose,\n.thread-ui-shell.thread-ui-theme-dark .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-agent .thread-message-prose,\n.thread-ui-shell .timeline-agent .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message {\n  width: 100%;\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-message-bubble {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-bubble.is-user {\n  width: 100%;\n  max-width: 100%;\n  border-radius: 0.75rem;\n  background: #eef5f9;\n  padding: 0.5rem 0.75rem;\n  color: rgb(15 23 42);\n}\n.thread-ui-shell .thread-graph-message-bubble.is-assistant {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 0;\n  box-shadow: none;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-bubble.is-user,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-bubble.is-user,\n.thread-ui-shell.dark .thread-graph-message-bubble.is-user {\n  background: #212b35;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-message-content.is-user,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code) {\n  color: rgb(51 65 85);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user,\n.thread-ui-shell.dark .thread-graph-message-content.is-user,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code) {\n  color: rgb(226 232 240);\n}\n.thread-ui-shell .thread-graph-message-content.is-assistant,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-markdown,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-plain-text,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-markdown,\n.thread-ui-shell .thread-graph-plain-text {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-markdown {\n  max-width: none;\n  font-size: 0.875rem;\n  line-height: 1.7;\n}\n.thread-ui-shell .thread-graph-message-markdown {\n  color: inherit;\n  word-break: break-word;\n}\n.thread-ui-shell .thread-graph-show-more {\n  min-height: 1.25rem;\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-panel) 72%, transparent);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-show-more:hover,\n.thread-ui-shell .thread-graph-show-more:focus-visible {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-markdown :where(p, ul, ol, pre, blockquote, table, hr) {\n  margin-bottom: 0.75rem;\n}\n.thread-ui-shell .thread-graph-markdown :where(p:last-child, ul:last-child, ol:last-child, pre:last-child, blockquote:last-child, table:last-child, hr:last-child) {\n  margin-bottom: 0;\n}\n.thread-ui-shell .thread-graph-markdown :where(a) {\n  color: rgb(3 105 161);\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-markdown :where(a),\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-markdown :where(a),\n.thread-ui-shell.dark .thread-graph-markdown :where(a) {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell .thread-graph-markdown :where(blockquote) {\n  border-left: 3px solid var(--theme-border-strong);\n  padding-left: 0.85rem;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-markdown :where(ul, ol) {\n  padding-left: 1.25rem;\n}\n.thread-ui-shell .thread-graph-markdown :where(li) {\n  margin-top: 0.25rem;\n}\n.thread-ui-shell .thread-graph-markdown :where(table) {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.thread-ui-shell .thread-graph-markdown :where(th, td) {\n  border: 1px solid var(--theme-border);\n  padding: 0.4rem 0.55rem;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-markdown :where(th) {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-code-block {\n  border-color: rgb(226 232 240);\n  background: rgb(248 250 252);\n  color: rgb(31 41 55);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-code-block,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-code-block,\n.thread-ui-shell.dark .thread-graph-code-block {\n  border-color: #303642;\n  background: #11141a;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-code-block pre,\n.thread-ui-shell .thread-graph-code-block code {\n  margin: 0;\n  background: transparent;\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-code-copy {\n  background: rgb(255 255 255 / 0.72);\n  color: rgb(51 65 85);\n  box-shadow: 0 4px 12px rgb(15 23 42 / 0.08);\n}\n.thread-ui-shell .thread-graph-code-copy:hover {\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-code-copy,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-code-copy,\n.thread-ui-shell.dark .thread-graph-code-copy {\n  background: rgb(34 39 51 / 0.82);\n  color: rgb(226 232 240);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-code-copy:hover,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-code-copy:hover,\n.thread-ui-shell.dark .thread-graph-code-copy:hover {\n  background: #2b313d;\n  color: rgb(248 250 252);\n}\n.thread-ui-shell .thread-graph-inline-code {\n  background: rgb(241 245 249);\n  color: rgb(31 41 55);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-inline-code,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-inline-code,\n.thread-ui-shell.dark .thread-graph-inline-code {\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-message-sender {\n  background: oklch(0.96 0.025 155);\n  color: oklch(0.42 0.11 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-sender,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-sender,\n.thread-ui-shell.dark .thread-graph-message-sender {\n  background: rgb(52 211 153 / 0.1);\n  color: rgb(110 231 183);\n}\n.thread-ui-shell .thread-graph-message-copy {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-copy:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-header-actions {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-time {\n  color: var(--theme-fg-muted);\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-message-status {\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-message-status-icon {\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-message-header {\n    margin-bottom: 0.375rem;\n    flex-wrap: nowrap;\n  }\n  .thread-ui-shell .thread-graph-message-sender {\n    padding: 0.1875rem 0.5rem;\n    font-size: 0.6875rem;\n    line-height: 1rem;\n  }\n  .thread-ui-shell .thread-graph-message-header-actions {\n    gap: 0.25rem;\n  }\n  .thread-ui-shell .thread-graph-message-copy {\n    height: 1.55rem;\n    width: 1.55rem;\n    border-radius: 0.45rem;\n  }\n  .thread-ui-shell .thread-graph-message-time {\n    font-size: 0.625rem;\n  }\n  .thread-ui-shell :where(.thread-graph-message-status, .thread-graph-tool-badge) .thread-graph-status-label {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0;\n  }\n  .thread-ui-shell :where(.thread-graph-message-status, .thread-graph-tool-badge) {\n    min-width: 1.45rem;\n    justify-content: center;\n    padding-left: 0.25rem !important;\n    padding-right: 0.25rem !important;\n  }\n}\n@media (min-width: 640px) {\n  .thread-ui-shell .thread-graph-message-bubble.is-user {\n    padding: 0.375rem 1rem;\n  }\n}\n.thread-ui-shell .timeline-soft-text,\n.thread-ui-shell .thread-message-prose :where(blockquote) {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .timeline-meta-text,\n.thread-ui-shell .thread-message-prose :where(figcaption) {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .timeline-overlay-badge,\n.thread-ui-shell .ui-status-neutral,\n.thread-ui-shell .ui-status-info,\n.thread-ui-shell .ui-status-warning,\n.thread-ui-shell .ui-status-success,\n.thread-ui-shell .ui-status-danger {\n  border-color: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-command-status-complete,\n.thread-ui-shell .timeline-command-status-pending,\n.thread-ui-shell .timeline-delta-badge,\n.thread-ui-shell .timeline-live-plan-step {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .ui-status-neutral {\n  background: var(--theme-muted);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-neutral,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-neutral,\n.thread-ui-shell.dark .ui-status-neutral {\n  border-color: #303642;\n  background: #151923;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card.is-active .ui-status-neutral,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card.is-active .ui-status-neutral,\n.thread-ui-shell.dark .thread-graph-room-card.is-active .ui-status-neutral {\n  border-color: #424b5e;\n  background: #1a1f2a;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell .ui-status-info {\n  background: oklch(0.94 0.03 235);\n  color: oklch(0.43 0.09 242);\n}\n.thread-ui-shell .ui-status-warning {\n  background: oklch(0.94 0.048 84);\n  color: oklch(0.46 0.08 75);\n}\n.thread-ui-shell .ui-status-success {\n  background: oklch(0.94 0.052 155);\n  color: oklch(0.43 0.095 155);\n}\n.thread-ui-shell .ui-status-danger {\n  background: oklch(0.94 0.04 25);\n  color: oklch(0.48 0.125 24);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-info,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-info,\n.thread-ui-shell.dark .ui-status-info {\n  background: oklch(0.3 0.042 235);\n  color: oklch(0.77 0.1 235);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-warning,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-warning,\n.thread-ui-shell.dark .ui-status-warning {\n  background: oklch(0.31 0.045 75);\n  color: oklch(0.83 0.11 80);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-success,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-success,\n.thread-ui-shell.dark .ui-status-success {\n  background: oklch(0.31 0.05 155);\n  color: oklch(0.8 0.115 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-danger,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-danger,\n.thread-ui-shell.dark .ui-status-danger {\n  background: oklch(0.31 0.052 25);\n  color: oklch(0.78 0.12 25);\n}\n.thread-ui-shell .thread-message-icon-user,\n.thread-ui-shell .thread-message-icon-agent {\n  border-color: transparent;\n  background: var(--theme-muted);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-thinking-trigger {\n  display: inline-flex;\n  align-items: center;\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-thinking-trigger:hover,\n.thread-ui-shell .thread-graph-thinking-trigger[data-state=open] {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell .thread-graph-thinking-label {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-thinking-body {\n  border-color: rgb(42 47 58);\n  background: #1b1f29;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-trigger {\n  color: rgb(100 116 139);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-trigger:hover,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-trigger[data-state=open] {\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-body {\n  border-color: rgb(226 232 240);\n  background: rgb(248 250 252);\n  color: rgb(51 65 85);\n}\n.thread-ui-shell .timeline-corner-copy-visual {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-panel) 88%, transparent);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-composer-form {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-composer-toolbar,\n.thread-ui-shell .thread-composer-input,\n.thread-ui-shell .thread-composer-menu {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-composer-toolbar {\n  border-radius: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  order: 2;\n  min-height: 2.75rem;\n  padding: 0.25rem 0.75rem 0.65rem;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.thread-ui-shell .thread-composer-prompt-region {\n  order: 1;\n}\n.thread-ui-shell .thread-composer-input {\n  position: relative;\n  min-height: 5.25rem !important;\n  max-height: 12rem !important;\n  border: 0;\n  border-radius: 0;\n  background: transparent !important;\n  box-shadow: none;\n  overflow: visible;\n  padding-top: 0.7rem;\n  padding-bottom: 0.45rem;\n}\n.thread-ui-shell .thread-composer-input:focus-within {\n  border-color: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-composer-input [contenteditable],\n.thread-ui-shell .thread-composer-input textarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  background: transparent !important;\n  color: var(--theme-fg);\n  font-size: 1rem;\n  line-height: 1.55;\n}\n.thread-ui-shell .thread-composer-input [contenteditable] {\n  min-height: 4.15rem !important;\n  max-height: 9.5rem !important;\n  overflow-y: auto;\n}\n.thread-ui-shell .thread-composer-input textarea {\n  min-height: 4.15rem !important;\n  max-height: 9.5rem !important;\n  overflow-y: auto;\n  resize: none;\n}\n.thread-ui-shell .thread-composer-shell {\n  border: 1px solid var(--theme-border);\n  background: #fbfcfd;\n  box-shadow: 0 4px 18px oklch(0.22 0.024 255 / 0.04);\n}\n.thread-ui-shell .thread-composer-send-button {\n  flex: 0 0 auto;\n}\n.thread-ui-shell .thread-goal-compose-card {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 18%, var(--theme-border));\n  background: color-mix(in oklch, var(--theme-accent-solid) 7%, var(--theme-panel));\n  color: var(--theme-fg-soft);\n  box-shadow: 0 8px 18px rgb(15 23 42 / 0.05);\n}\n.thread-ui-shell .thread-goal-compose-label {\n  color: color-mix(in oklch, var(--theme-accent-solid) 68%, var(--theme-fg));\n}\n.thread-ui-shell .thread-goal-compose-field {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-goal-compose-input {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 20%, var(--theme-border));\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-goal-compose-input::placeholder {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-goal-compose-input:focus {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 48%, var(--theme-border));\n}\n.thread-ui-shell .thread-goal-compose-cancel {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-goal-compose-cancel:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-goal-compose-error {\n  color: rgb(190 18 60);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-card,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-card,\n.thread-ui-shell.dark .thread-goal-compose-card {\n  border-color: rgb(125 211 252 / 0.25);\n  background: rgb(125 211 252 / 0.07);\n  color: rgb(226 232 240);\n  box-shadow: 0 8px 18px rgb(0 0 0 / 0.18);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-label,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-label,\n.thread-ui-shell.dark .thread-goal-compose-label {\n  color: rgb(224 242 254 / 0.9);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-field,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-field,\n.thread-ui-shell.dark .thread-goal-compose-field {\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-input,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-input,\n.thread-ui-shell.dark .thread-goal-compose-input {\n  border-color: rgb(125 211 252 / 0.25);\n  background: rgb(2 6 23 / 0.46);\n  color: rgb(241 245 249);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-cancel,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-cancel,\n.thread-ui-shell.dark .thread-goal-compose-cancel {\n  border-color: #343b48;\n  background: #1d222c;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-cancel:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-cancel:hover,\n.thread-ui-shell.dark .thread-goal-compose-cancel:hover {\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-error,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-error,\n.thread-ui-shell.dark .thread-goal-compose-error {\n  color: rgb(254 205 211);\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-shell {\n    border-radius: 16px;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-input {\n    min-height: 5.75rem !important;\n    max-height: 12.5rem !important;\n    padding-top: 0.9rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-input [contenteditable],\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-input textarea {\n    min-height: 4.5rem !important;\n    max-height: 10rem !important;\n    font-size: 0.875rem;\n  }\n}\n.thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-form {\n  padding: 0.5rem 1rem 0.75rem;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-shell,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-shell,\n.thread-ui-shell.dark .thread-composer-shell {\n  border-color: #303642;\n  background: #181b23;\n  box-shadow: 0 8px 24px oklch(0 0 0 / 0.22);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-toolbar,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-toolbar,\n.thread-ui-shell.dark .thread-composer-toolbar,\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input,\n.thread-ui-shell.dark .thread-composer-input {\n  border-color: #303642 !important;\n  background: transparent !important;\n  color: rgb(241 245 249) !important;\n  box-shadow: none !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input [contenteditable],\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input [contenteditable],\n.thread-ui-shell.dark .thread-composer-input [contenteditable],\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input textarea,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input textarea,\n.thread-ui-shell.dark .thread-composer-input textarea {\n  background: transparent !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell .thread-graph-composer-form {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-form,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-form,\n.thread-ui-shell.dark .thread-graph-composer-form {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-composer-shell {\n  border: 1px solid var(--theme-border);\n  background: var(--theme-panel);\n  box-shadow: 0 4px 18px oklch(0.22 0.024 255 / 0.04);\n  overflow: visible !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-shell,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-shell,\n.thread-ui-shell.dark .thread-graph-composer-shell {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-panel);\n  box-shadow: 0 8px 24px oklch(0 0 0 / 0.22);\n}\n.thread-ui-shell .thread-graph-composer-input-group {\n  order: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: auto;\n  min-height: 0;\n  color: rgb(30 41 59);\n  overflow: visible !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-input-group,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-input-group,\n.thread-ui-shell.dark .thread-graph-composer-input-group {\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-composer-prompt-region {\n  order: 1;\n}\n.thread-ui-shell .thread-graph-composer-input {\n  position: relative;\n  border: 0;\n  background: transparent;\n  color: rgb(30 41 59);\n  box-shadow: none;\n  overflow-y: auto;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-input,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-input,\n.thread-ui-shell.dark .thread-graph-composer-input {\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-composer-input [contenteditable] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  overflow-y: auto;\n  background: transparent;\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-chip,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-chip {\n  box-sizing: border-box;\n  flex: 0 0 auto;\n  width: max-content !important;\n  max-width: min(100%, 7.25rem) !important;\n  vertical-align: middle;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-chip-photo,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-chip-photo {\n  display: inline-flex !important;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.25rem;\n  padding: 0.35rem !important;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-thumb,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-thumb {\n  display: block;\n  width: 5.75rem !important;\n  height: 3.75rem !important;\n  max-width: 100%;\n  border-radius: 0.6rem !important;\n  object-fit: cover;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-caption {\n  display: block !important;\n  width: 100%;\n  max-width: 5.75rem !important;\n  margin-left: 0 !important;\n  overflow: hidden;\n  color: rgb(3 105 161);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-input .thread-composer-attachment-caption,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell.dark .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input .thread-composer-attachment-caption,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell.dark .thread-composer-input .thread-composer-attachment-caption {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell .thread-graph-composer-toolbar {\n  order: 2;\n  width: 100%;\n  min-height: 2.75rem;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  border: 0;\n  background: transparent;\n  padding: 0 0.5rem 0.5rem;\n  color: rgb(100 116 139);\n  box-shadow: none;\n  overflow: visible !important;\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-composer-toolbar {\n    flex-wrap: nowrap;\n    padding: 0 0.75rem 0.75rem;\n  }\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-toolbar,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-toolbar,\n.thread-ui-shell.dark .thread-graph-composer-toolbar {\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-composer-send-button {\n  flex: 0 0 auto;\n}\n.thread-ui-shell .thread-graph-composer-stop-button {\n  border-color: rgb(244 63 94 / 0.28) !important;\n  box-shadow: 0 8px 18px rgb(15 23 42 / 0.14);\n}\n.thread-ui-shell .thread-graph-composer-prompt-region .thread-graph-composer-stop-button {\n  position: absolute;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-composer-form {\n    padding: 0.35rem 0.55rem calc(env(safe-area-inset-bottom) + 0.35rem) !important;\n  }\n  .thread-ui-shell .thread-graph-composer-shell {\n    border-radius: 14px !important;\n  }\n  .thread-ui-shell .thread-graph-composer-input {\n    min-height: 3.65rem !important;\n    max-height: 7.5rem !important;\n    padding: 0.65rem 0.75rem 0.2rem !important;\n  }\n  .thread-ui-shell .thread-graph-composer-input [contenteditable] {\n    min-height: 3rem !important;\n    padding-right: 2.5rem;\n  }\n  .thread-ui-shell .thread-graph-composer-toolbar {\n    min-height: 2.35rem;\n    gap: 0.3rem;\n    padding: 0 0.45rem 0.45rem;\n  }\n  .thread-ui-shell .thread-graph-composer-toolbar > .flex {\n    min-width: 0;\n    gap: 0.3rem;\n  }\n  .thread-ui-shell .thread-graph-composer-icon-button,\n  .thread-ui-shell .thread-graph-composer-send-button {\n    width: 1.95rem !important;\n    height: 1.95rem !important;\n  }\n  .thread-ui-shell .thread-graph-composer-inline-toggle {\n    height: 1.95rem;\n    max-width: 6.75rem !important;\n    padding-left: 0.5rem !important;\n    padding-right: 0.5rem !important;\n    font-size: 0.6875rem;\n  }\n  .thread-ui-shell .thread-graph-composer-stop-button {\n    top: 0.45rem !important;\n    right: 0.45rem !important;\n    width: 1.8rem !important;\n    height: 1.8rem !important;\n  }\n}\n.thread-ui-shell .thread-composer-icon-button,\n.thread-ui-shell .thread-composer-inline-toggle,\n.thread-ui-shell .thread-composer-chip-button,\n.thread-ui-shell .thread-composer-menu-item,\n.thread-ui-shell .thread-composer-panel-button,\n.thread-ui-shell .thread-graph-composer-icon-button,\n.thread-ui-shell .thread-graph-composer-inline-toggle,\n.thread-ui-shell .thread-graph-composer-chip-button,\n.thread-ui-shell .thread-graph-composer-menu-item,\n.thread-ui-shell .thread-graph-composer-panel-button {\n  border-color: var(--theme-border) !important;\n  background: transparent !important;\n  color: var(--theme-fg-soft) !important;\n}\n.thread-ui-shell .thread-composer-icon-button:hover,\n.thread-ui-shell .thread-composer-inline-toggle:hover,\n.thread-ui-shell .thread-composer-chip-button:hover,\n.thread-ui-shell .thread-composer-menu-item:hover,\n.thread-ui-shell .thread-composer-panel-button:hover,\n.thread-ui-shell .thread-graph-composer-icon-button:hover,\n.thread-ui-shell .thread-graph-composer-inline-toggle:hover,\n.thread-ui-shell .thread-graph-composer-chip-button:hover,\n.thread-ui-shell .thread-graph-composer-menu-item:hover,\n.thread-ui-shell .thread-graph-composer-panel-button:hover {\n  background: var(--theme-hover) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-composer-icon-button,\n.thread-ui-shell .thread-graph-composer-icon-button {\n  background: var(--theme-muted) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-icon-button,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-icon-button,\n.thread-ui-shell.dark .thread-composer-icon-button,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-icon-button,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-icon-button,\n.thread-ui-shell.dark .thread-graph-composer-icon-button {\n  border-color: #303642 !important;\n  background: #222733 !important;\n  color: rgb(203 213 225) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-icon-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-icon-button:hover,\n.thread-ui-shell.dark .thread-composer-icon-button:hover,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-icon-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-icon-button:hover,\n.thread-ui-shell.dark .thread-graph-composer-icon-button:hover {\n  background: #2b313d !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell .thread-composer-menu,\n.thread-ui-shell .thread-graph-composer-menu {\n  border-radius: 12px;\n  border-color: var(--theme-border) !important;\n  background: color-mix(in oklch, var(--theme-panel) 96%, transparent) !important;\n  color: var(--theme-fg) !important;\n  box-shadow: 0 16px 38px oklch(0.22 0.024 255 / 0.16);\n  z-index: 80;\n}\n.thread-ui-shell [data-composer-menu-surface=true] {\n  border-color: var(--theme-border) !important;\n  background: color-mix(in oklch, var(--theme-panel) 96%, transparent) !important;\n  color: var(--theme-fg) !important;\n  box-shadow: 0 16px 38px oklch(0.22 0.024 255 / 0.16) !important;\n}\n.thread-ui-shell .thread-graph-composer-menu {\n  max-height: min(27rem, calc(100svh - 8rem));\n  overflow: auto !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select) {\n  border-color: var(--theme-border) !important;\n  background: var(--theme-panel) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea)::placeholder {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select):focus {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 38%, var(--theme-border)) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.border-sky-300\\/35, .border-emerald-400\\/45) {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 24%, var(--theme-border)) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.bg-sky-300\\/10, .bg-sky-300\\/12, .bg-emerald-400\\/12) {\n  background: color-mix(in oklch, var(--theme-accent-solid) 8%, var(--theme-panel)) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200) {\n  color: rgb(190 18 60) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60) {\n  color: rgb(146 64 14) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-menu,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-menu,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-composer-menu,\n.thread-ui-shell.dark .thread-composer-menu,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-menu,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-menu,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-graph-composer-menu,\n.thread-ui-shell.dark .thread-graph-composer-menu,\n.thread-ui-shell.thread-ui-theme-dark [data-composer-menu-surface=true],\n.thread-ui-shell[data-theme-effective=dark] [data-composer-menu-surface=true],\n:root[data-theme-effective=dark] .thread-ui-shell [data-composer-menu-surface=true],\n.thread-ui-shell.dark [data-composer-menu-surface=true] {\n  border-color: #303642 !important;\n  background: rgb(23 26 34 / 0.96) !important;\n  color: rgb(241 245 249) !important;\n  box-shadow: 0 18px 48px rgb(0 0 0 / 0.28) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select),\n.thread-ui-shell[data-theme-effective=dark] :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select),\n:root[data-theme-effective=dark] .thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select),\n.thread-ui-shell.dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select) {\n  border-color: #303642 !important;\n  background: #11141a !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200),\n.thread-ui-shell[data-theme-effective=dark] :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200),\n:root[data-theme-effective=dark] .thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200),\n.thread-ui-shell.dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200) {\n  color: rgb(254 205 211) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60),\n.thread-ui-shell[data-theme-effective=dark] :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60),\n:root[data-theme-effective=dark] .thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60),\n.thread-ui-shell.dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60) {\n  color: rgb(253 230 138) !important;\n}\n.thread-ui-shell .thread-composer-plan-toggle-active,\n.thread-ui-shell .thread-graph-composer-plan-toggle-active {\n  background: var(--theme-accent-soft);\n  color: var(--theme-accent-strong);\n}\n.thread-ui-shell .thread-jump-latest-badge {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .ui-action-primary {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-ui-shell .ui-action-primary:hover {\n  background: var(--theme-accent-solid-hover);\n}\n.thread-ui-shell .ui-action-info {\n  background: oklch(0.46 0.1 235);\n  color: oklch(0.98 0.005 235);\n}\n.thread-ui-shell .ui-action-danger {\n  background: oklch(0.56 0.16 25);\n  color: oklch(0.98 0.005 25);\n}\n.thread-ui-shell .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell .thread-graph-composer-send-button.ui-action-danger {\n  border: 1px solid var(--theme-border) !important;\n  background: var(--theme-muted) !important;\n  color: var(--theme-fg-soft) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell.dark .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-send-button.ui-action-danger,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-send-button.ui-action-danger,\n.thread-ui-shell.dark .thread-graph-composer-send-button.ui-action-danger {\n  border-color: #303642 !important;\n  background: #222733 !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell .thread-composer-send-button.ui-action-danger:hover,\n.thread-ui-shell .thread-graph-composer-send-button.ui-action-danger:hover {\n  background: var(--theme-hover) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-empty-surface,\n.thread-ui-shell .timeline-pending-card,\n.thread-ui-shell .timeline-note-card,\n.thread-ui-shell .timeline-activity-card,\n.thread-ui-shell .timeline-live-plan-card,\n.thread-ui-shell .timeline-question-section,\n.thread-ui-shell .timeline-live-plan-step,\n.thread-ui-shell .timeline-detail-row {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .prose,\n.thread-ui-shell .prose :where(p, li, strong, code, pre, blockquote) {\n  color: inherit;\n}\n.thread-ui-shell .prose img {\n  max-width: min(28rem, 100%);\n  height: auto;\n  border-radius: 10px;\n  border: 1px solid var(--theme-border);\n  box-shadow: 0 12px 35px oklch(0.22 0.024 255 / 0.14);\n  margin-top: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.thread-ui-shell .thread-graph-plan-card {\n  border-color: rgb(42 47 58);\n  background: #1b1f29;\n  color: rgb(241 245 249);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-plan-step {\n  border-color: rgb(48 54 66);\n  background: #181b23;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-plan-explanation {\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-plan-badge {\n  border-color: transparent;\n  background: rgb(56 189 248 / 0.12);\n  color: rgb(186 230 253);\n  box-shadow: none;\n  text-transform: uppercase;\n  letter-spacing: 0.16em;\n}\n.thread-ui-shell .thread-graph-plan-status {\n  height: 1.75rem;\n  min-width: 1.75rem;\n  padding: 0;\n  border-color: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-plan-status.is-completed {\n  background: rgb(52 211 153 / 0.14);\n  color: rgb(167 243 208);\n}\n.thread-ui-shell .thread-graph-plan-status.is-running {\n  background: rgb(56 189 248 / 0.14);\n  color: rgb(186 230 253);\n}\n.thread-ui-shell .thread-graph-plan-status.is-pending,\n.thread-ui-shell .thread-graph-plan-status.is-unknown {\n  background: #2b313d;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell .thread-graph-plan-status.is-failed {\n  background: rgb(251 113 133 / 0.14);\n  color: rgb(254 205 211);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-card {\n  border-color: rgb(226 232 240);\n  background: rgb(248 250 252);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-step {\n  border-color: rgb(226 232 240);\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-explanation {\n  color: rgb(100 116 139);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-badge {\n  background: rgb(14 165 233 / 0.1);\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-completed {\n  background: rgb(16 185 129 / 0.12);\n  color: rgb(4 120 87);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-running {\n  background: rgb(14 165 233 / 0.12);\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-pending,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-unknown {\n  background: rgb(226 232 240);\n  color: rgb(71 85 105);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-failed {\n  background: rgb(244 63 94 / 0.12);\n  color: rgb(190 18 60);\n}\n.thread-ui-shell .thread-graph-event {\n  background: transparent !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-graph-event-card {\n  background: var(--theme-surface) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-graph-plan-card,\n.thread-ui-shell .thread-graph-plan-step,\n.thread-ui-shell .thread-graph-plan-step-text {\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-card,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-step,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-step-text {\n  color: rgb(15 23 42) !important;\n}\n.thread-export-dialog-root {\n  --export-bg: rgb(248 250 252);\n  --export-panel: rgb(255 255 255);\n  --export-surface: rgb(241 245 249);\n  --export-surface-strong: rgb(226 232 240);\n  --export-border: rgb(203 213 225);\n  --export-fg: rgb(15 23 42);\n  --export-fg-soft: rgb(51 65 85);\n  --export-fg-muted: rgb(100 116 139);\n  --export-accent: rgb(217 119 6);\n  --export-accent-bg: rgb(254 243 199);\n  --export-accent-border: rgb(251 191 36);\n  --export-shadow: rgb(15 23 42 / 0.16);\n  color: var(--export-fg);\n}\n.thread-export-dialog-root.thread-ui-theme-dark,\n.thread-export-dialog-root[data-theme-effective=dark] {\n  --export-bg: #12151c;\n  --export-panel: #181d25;\n  --export-surface: #1d222c;\n  --export-surface-strong: #262c38;\n  --export-border: #343b48;\n  --export-fg: rgb(241 245 249);\n  --export-fg-soft: rgb(203 213 225);\n  --export-fg-muted: rgb(148 163 184);\n  --export-accent: rgb(245 158 11);\n  --export-accent-bg: rgb(245 158 11 / 0.16);\n  --export-accent-border: rgb(245 158 11 / 0.34);\n  --export-shadow: rgb(0 0 0 / 0.36);\n}\n.thread-export-dialog-backdrop {\n  background: color-mix(in oklch, var(--export-bg) 68%, transparent);\n}\n.thread-export-dialog-root.thread-ui-theme-dark .thread-export-dialog-backdrop,\n.thread-export-dialog-root[data-theme-effective=dark] .thread-export-dialog-backdrop {\n  background: rgb(2 6 23 / 0.74);\n}\n.thread-export-dialog-panel {\n  border-color: var(--export-border);\n  background: var(--export-panel);\n  box-shadow: 0 26px 80px var(--export-shadow);\n}\n.thread-export-dialog-header,\n.thread-export-dialog-footer,\n.thread-export-dialog-box-header {\n  border-color: var(--export-border);\n}\n.thread-export-dialog-title,\n.thread-export-dialog-strong,\n.thread-export-dialog-body-text {\n  color: var(--export-fg);\n}\n.thread-export-dialog-subtitle,\n.thread-export-dialog-status-pill {\n  color: var(--export-fg-muted);\n}\n.thread-export-dialog-icon-button,\n.thread-export-dialog-secondary-button,\n.thread-export-dialog-segment,\n.thread-export-dialog-box,\n.thread-export-dialog-status-pill {\n  border-color: var(--export-border);\n  background: var(--export-surface);\n}\n.thread-export-dialog-segment,\n.thread-export-dialog-box {\n  background: color-mix(in oklch, var(--export-surface) 72%, var(--export-panel));\n}\n.thread-export-dialog-icon-button,\n.thread-export-dialog-secondary-button {\n  color: var(--export-fg-soft);\n}\n.thread-export-dialog-icon-button:hover:not(:disabled),\n.thread-export-dialog-secondary-button:hover:not(:disabled),\n.thread-export-dialog-turn-row:hover {\n  background: var(--export-surface-strong);\n  color: var(--export-fg);\n}\n.thread-export-dialog-muted-action {\n  color: var(--export-fg-muted);\n}\n.thread-export-dialog-muted-action:hover {\n  color: var(--export-fg);\n}\n.thread-export-dialog-root .ui-status-warning {\n  border: 1px solid var(--export-accent-border);\n  background: var(--export-accent-bg);\n  color: color-mix(in oklch, var(--export-accent) 72%, var(--export-fg));\n}\n.thread-export-dialog-checkbox {\n  accent-color: var(--export-accent);\n}\n.thread-export-dialog-turn-row {\n  color: var(--export-fg-soft);\n}\n');

// src/components/ThreadComposer.tsx
import {
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

// src/components/graph-ui/InputGroup.tsx
import { cva as cva2 } from "class-variance-authority";

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
import { jsx } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/graph-ui/InputGroup.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: cn(
        "group/input-group relative flex w-full min-w-0 items-center rounded-md border shadow-xs outline-none transition-[color,box-shadow]",
        "h-9 has-[>textarea]:h-auto",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        className
      ),
      ...props
    }
  );
}
var inputGroupAddonVariants = cva2(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3",
        "block-end": "order-last w-full justify-start px-3 pb-3"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": align,
      className: cn(inputGroupAddonVariants({ align }), className),
      onClick: (event) => {
        if (event.target.closest("button")) {
          return;
        }
        const control = event.currentTarget.parentElement?.querySelector(
          '[data-slot="input-group-control"] [contenteditable="true"], [data-slot="input-group-control"] textarea, [data-slot="input-group-control"] input, [data-slot="input-group-control"]'
        );
        control?.focus();
      },
      ...props
    }
  );
}
var inputGroupButtonVariants = cva2("flex items-center gap-2 text-sm shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*=size-])]:size-3.5",
      sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    Button,
    {
      type,
      "data-size": size,
      variant,
      className: cn(inputGroupButtonVariants({ size }), className),
      ...props
    }
  );
}
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: cn(
        "flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props
    }
  );
}

// src/components/ThreadComposer.tsx
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var DRAFT_SYNC_DELAY_MS = 180;
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
function draftSignature(draft) {
  return `${draft.prompt}${draft.attachments.map(
    (attachment) => `${attachment.clientId}${attachment.kind}${attachment.placeholder}${attachment.originalName}`
  ).join("")}`;
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
        /* @__PURE__ */ jsx3("path", { d: "m4 5 2 2-2 2" }),
        /* @__PURE__ */ jsx3("path", { d: "M7.75 9.5h4.25" })
      ]
    }
  );
}
function PlusIcon() {
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      children: /* @__PURE__ */ jsx3("path", { d: "M8 3.25v9.5M3.25 8h9.5" })
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
        /* @__PURE__ */ jsx3("path", { d: "M10.75 2.5 5.25 13.5" }),
        /* @__PURE__ */ jsx3("path", { d: "M4.25 5.25h2.25" }),
        /* @__PURE__ */ jsx3("path", { d: "M9.5 10.75h2.25" })
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
  return /* @__PURE__ */ jsx3(
    "span",
    {
      "aria-hidden": "true",
      className: "thread-context-progress-track pointer-events-none mt-0.5 block",
      children: /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx3("path", { d: "M3 4.5A1.75 1.75 0 0 1 4.75 2.75h6.5A1.75 1.75 0 0 1 13 4.5v4A1.75 1.75 0 0 1 11.25 10.25H8l-2.75 2v-2H4.75A1.75 1.75 0 0 1 3 8.5v-4Z" })
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
        /* @__PURE__ */ jsx3(
          "path",
          {
            fillRule: "evenodd",
            d: "M14.5 10C16.9853 10 19 7.98528 19 5.5C19 5.01783 18.9242 4.55338 18.7838 4.11791C18.6792 3.79367 18.2734 3.72683 18.0325 3.96772L15.3402 6.66002C15.2098 6.79041 15.0168 6.84163 14.8466 6.77074C14.1172 6.46695 13.5334 5.88351 13.2292 5.15431C13.1582 4.98403 13.2094 4.79088 13.3398 4.66042L16.0327 1.9676C16.2735 1.72672 16.2067 1.32092 15.8825 1.21636C15.4469 1.07588 14.9823 1 14.5 1C12.0147 1 10 3.01472 10 5.5C10 5.59783 10.0031 5.69494 10.0093 5.79122C10.065 6.66418 9.88174 7.59855 9.20974 8.15855L1.98017 14.1832C1.3591 14.7008 1 15.4674 1 16.2759C1 17.7804 2.21962 19 3.7241 19C4.53256 19 5.29925 18.6409 5.81681 18.0198L11.8414 10.7903C12.4014 10.1183 13.3358 9.93497 14.2088 9.99073C14.3051 9.99688 14.4022 10 14.5 10ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx3("path", { d: "M14.5 11.5C14.6731 11.5 14.8445 11.4927 15.0138 11.4783L18.7678 15.2323C19.7441 16.2086 19.7441 17.7915 18.7678 18.7678C17.7915 19.7441 16.2086 19.7441 15.2323 18.7678L10.8216 14.3571L12.9938 11.7505C13.0455 11.6885 13.1413 11.6131 13.3357 11.5552C13.5378 11.4951 13.805 11.468 14.1132 11.4877C14.2413 11.4959 14.3702 11.5 14.5 11.5Z" }),
        /* @__PURE__ */ jsx3("path", { d: "M6.00003 4.58582L8.33056 6.91635C8.3027 6.95627 8.27496 6.98497 8.24946 7.00622L6.79994 8.21415L4.58582 6.00003H3.30905C3.11966 6.00003 2.94653 5.89303 2.86184 5.72364L1.1612 2.32237C1.06495 2.12987 1.10268 1.89739 1.25486 1.74521L1.74521 1.25486C1.89739 1.10268 2.12987 1.06495 2.32237 1.1612L5.72364 2.86184C5.89303 2.94653 6.00003 3.11966 6.00003 3.30905V4.58582Z" })
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
        /* @__PURE__ */ jsx3("path", { d: "M5.5 3.25h5" }),
        /* @__PURE__ */ jsx3("path", { d: "M6.4 2h3.2a.9.9 0 0 1 .9.9v.35h1.3a1.2 1.2 0 0 1 1.2 1.2v7.35a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 11.8V4.45a1.2 1.2 0 0 1 1.2-1.2h1.3V2.9a.9.9 0 0 1 .9-.9Z" })
      ]
    }
  );
}
function ToolPill({
  label,
  tone = "stone"
}) {
  const toneClassName = tone === "rose" ? "border-rose-300/35 bg-rose-300/14 text-rose-50" : tone === "sky" ? "border-sky-300/35 bg-sky-300/14 text-sky-50" : "border-stone-700/90 bg-stone-900/80 text-stone-100";
  return /* @__PURE__ */ jsx3(
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
  const [localControlledDraft, setLocalControlledDraft] = useState(() => ({
    prompt: draftPrompt ?? "",
    attachments: draftAttachments ?? []
  }));
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
  const draftSyncTimerRef = useRef(null);
  const latestLocalDraftRef = useRef(localControlledDraft);
  const lastHostDraftSignatureRef = useRef(
    draftSignature(localControlledDraft)
  );
  const lastSentDraftSignatureRef = useRef(lastHostDraftSignatureRef.current);
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
  const controlledPropsSignature = isDraftControlled ? draftSignature({
    prompt: draftPrompt ?? "",
    attachments: draftAttachments ?? []
  }) : "";
  const lastRenderedControlledPropsSignatureRef = useRef(
    controlledPropsSignature
  );
  const prompt = isDraftControlled ? localControlledDraft.prompt : internalDraft.prompt;
  const attachments = isDraftControlled ? localControlledDraft.attachments : internalDraft.attachments;
  const displayedCollaborationMode = optimisticCollaborationMode ?? collaborationMode;
  useEffect(() => {
    return () => {
      sendDraftToHost(latestLocalDraftRef.current);
      if (draftSyncTimerRef.current !== null) {
        window.clearTimeout(draftSyncTimerRef.current);
      }
    };
  }, [isDraftControlled, onDraftChange]);
  useEffect(() => {
    if (!isDraftControlled) {
      lastRenderedControlledPropsSignatureRef.current = "";
      return;
    }
    const hostDraft = {
      prompt: draftPrompt ?? "",
      attachments: draftAttachments ?? []
    };
    const hostSignature = draftSignature(hostDraft);
    if (hostSignature === lastRenderedControlledPropsSignatureRef.current) {
      return;
    }
    lastRenderedControlledPropsSignatureRef.current = hostSignature;
    lastHostDraftSignatureRef.current = hostSignature;
    lastSentDraftSignatureRef.current = hostSignature;
    latestLocalDraftRef.current = hostDraft;
    if (draftSyncTimerRef.current !== null) {
      window.clearTimeout(draftSyncTimerRef.current);
      draftSyncTimerRef.current = null;
    }
    setLocalControlledDraft(hostDraft);
  }, [draftAttachments, draftPrompt, isDraftControlled]);
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
  function sendDraftToHost(nextDraft) {
    if (!isDraftControlled || !onDraftChange) {
      return;
    }
    const signature = draftSignature(nextDraft);
    if (signature === lastSentDraftSignatureRef.current) {
      return;
    }
    lastSentDraftSignatureRef.current = signature;
    lastHostDraftSignatureRef.current = signature;
    onDraftChange(() => ({
      prompt: nextDraft.prompt,
      attachments: nextDraft.attachments
    }));
  }
  function syncControlledDraftToHost(nextDraft, mode) {
    if (!isDraftControlled) {
      return;
    }
    if (draftSyncTimerRef.current !== null) {
      window.clearTimeout(draftSyncTimerRef.current);
      draftSyncTimerRef.current = null;
    }
    if (mode === "immediate") {
      sendDraftToHost(nextDraft);
      return;
    }
    draftSyncTimerRef.current = window.setTimeout(() => {
      draftSyncTimerRef.current = null;
      sendDraftToHost(latestLocalDraftRef.current);
    }, DRAFT_SYNC_DELAY_MS);
  }
  function flushControlledDraftToHost(nextDraft = latestLocalDraftRef.current) {
    syncControlledDraftToHost(nextDraft, "immediate");
  }
  function updateDraft(updater, syncMode = "immediate") {
    if (isDraftControlled) {
      const nextDraft = updater(latestLocalDraftRef.current);
      latestLocalDraftRef.current = nextDraft;
      setLocalControlledDraft(nextDraft);
      syncControlledDraftToHost(nextDraft, syncMode);
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
    const menuItemClassName2 = isShellView ? "thread-composer-menu-item" : "thread-graph-composer-menu-item";
    return `${active ? "ui-status-warning" : menuItemClassName2} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`;
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
        token.className = "thread-composer-attachment-chip mx-[0.12rem] inline-flex max-w-full align-baseline";
        if (attachment.kind === "photo") {
          token.classList.add(
            "thread-composer-attachment-chip-photo",
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
            image.className = "thread-composer-attachment-thumb h-[4.5rem] w-[6rem] rounded-[0.7rem] bg-stone-950 object-contain";
            image.draggable = false;
            token.append(image);
          } else {
            const imagePlaceholder = document.createElement("span");
            imagePlaceholder.className = "thread-composer-attachment-thumb inline-block h-[4.5rem] w-[6rem] rounded-[0.7rem] bg-stone-900/80";
            imagePlaceholder.setAttribute("aria-hidden", "true");
            token.append(imagePlaceholder);
          }
          const caption = document.createElement("span");
          caption.className = "thread-composer-attachment-caption ml-2 inline-flex max-w-[8rem] items-center text-[10px] font-medium tracking-[0.08em] text-sky-50";
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
    if (isDraftControlled) {
      flushControlledDraftToHost();
    }
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
    }), "deferred");
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
  const composerLayerBaseClassName = isShellView ? "thread-composer-layer thread-shell-composer-layer" : "thread-graph-composer-layer";
  const composerLayerClassName = openMenu ? `${composerLayerBaseClassName} relative z-[80] shrink-0` : `${composerLayerBaseClassName} relative z-20 shrink-0`;
  const composerFormBaseClassName = isShellView ? "thread-composer-form" : "thread-graph-composer-form";
  const composerFloatingFormClassName = isShellView ? "thread-composer-form-floating" : "thread-graph-composer-form-floating";
  const formClassName = isShellView ? edgeToEdgeMobile || isMobileShell ? `${composerFormBaseClassName} ${composerFloatingFormClassName} relative z-20 shrink-0 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-4 sm:py-3` : `${composerFormBaseClassName} relative z-20 shrink-0 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-4 sm:py-3` : `${composerFormBaseClassName} ${edgeToEdgeMobile ? composerFloatingFormClassName : ""} relative z-20 shrink-0 border-t px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-4 sm:py-3`;
  const composerShellClassName = isShellView ? "thread-composer-shell" : "thread-graph-composer-shell";
  const composerToolbarClassName = isShellView ? "thread-composer-toolbar" : "thread-graph-composer-toolbar";
  const composerInputClassName = isShellView ? "thread-composer-input" : "thread-graph-composer-input";
  const composerIconButtonClassName = isShellView ? "thread-composer-icon-button" : "thread-graph-composer-icon-button";
  const composerMenuClassName = isShellView ? "thread-composer-menu" : "thread-graph-composer-menu";
  const composerMenuItemClassName = isShellView ? "thread-composer-menu-item" : "thread-graph-composer-menu-item";
  const composerInlineToggleClassName = isShellView ? "thread-composer-inline-toggle" : "thread-graph-composer-inline-toggle";
  const composerPanelButtonClassName = isShellView ? "thread-composer-panel-button" : "thread-graph-composer-panel-button";
  const composerChipButtonClassName = isShellView ? "thread-composer-chip-button" : "thread-graph-composer-chip-button";
  const composerPlanToggleActiveClassName = isShellView ? "thread-composer-plan-toggle-active" : "thread-graph-composer-plan-toggle-active";
  const composerSendButtonClassName = isShellView ? "thread-composer-send-button" : "thread-graph-composer-send-button";
  const composerPromptRegionClassName = isShellView ? "thread-composer-prompt-region" : "thread-graph-composer-prompt-region";
  const promptInputClassName = `${composerInputClassName} min-h-[5.25rem] w-full px-4 pr-14 pt-3 outline-none transition sm:min-h-[5.75rem] ${isDragTargetActive ? "is-drag-target border-sky-300/80 bg-sky-300/[0.08] shadow-[0_0_0_1px_rgba(125,211,252,0.2)]" : ""}`;
  const graphChatInputGroupClassName = `thread-graph-composer-input-group relative border-0 bg-transparent shadow-none ring-0 ${busy ? "bg-amber-50/40 dark:bg-amber-400/10" : "bg-transparent"}`;
  const graphChatInputClassName = `${composerInputClassName} min-h-[68px] max-h-32 w-full overflow-y-auto px-3 pt-3 text-[16px] leading-relaxed text-slate-800 outline-none transition sm:min-h-[92px] sm:max-h-40 sm:px-4 sm:pt-4 sm:text-[14px] dark:text-slate-100 ${isDragTargetActive ? "is-drag-target bg-sky-300/[0.08] shadow-[0_0_0_1px_rgba(125,211,252,0.2)]" : ""}`;
  return /* @__PURE__ */ jsxs("div", { className: composerLayerClassName, children: [
    /* @__PURE__ */ jsx3(
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
    /* @__PURE__ */ jsx3(
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
    activeView === "chat" && /* @__PURE__ */ jsx3(
      "button",
      {
        type: "button",
        "aria-label": "Jump to latest",
        title: followTail ? "Latest turn is in view" : "Jump to the latest messages",
        onClick: () => onToggleFollow?.(),
        className: "absolute left-1/2 top-3 z-40 inline-flex h-9 min-w-[5.75rem] -translate-x-1/2 -translate-y-[62%] items-start justify-center bg-transparent pt-1 touch-manipulation sm:top-4",
        children: /* @__PURE__ */ jsx3(
          "span",
          {
            className: `thread-jump-latest-badge pointer-events-none inline-flex h-4 min-w-[3.75rem] items-center justify-center rounded-[0.7rem] border shadow-sm transition ${followTail ? "is-active border-sky-300/36 bg-sky-300/[0.03] text-sky-100/86" : "border-stone-500/70 bg-stone-950/[0.08] text-stone-200/86"}`,
            children: /* @__PURE__ */ jsx3(
              "svg",
              {
                "aria-hidden": "true",
                viewBox: "0 0 16 16",
                className: "h-3.5 w-3.5 fill-none stroke-current",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: /* @__PURE__ */ jsx3("path", { d: "m4 6 4 4 4-4" })
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      "form",
      {
        ref: menuRef,
        "data-testid": activeView === "chat" ? "chat-composer" : void 0,
        onSubmit: handleSubmit,
        className: formClassName,
        children: [
          /* @__PURE__ */ jsxs("div", { className: `${composerShellClassName} flex w-full flex-col overflow-hidden rounded-[16px] sm:rounded-[18px]`, children: [
            /* @__PURE__ */ jsxs(InputGroup, { className: graphChatInputGroupClassName, children: [
              !isShellView ? /* @__PURE__ */ jsxs(
                "div",
                {
                  "data-slot": "input-group-control",
                  className: `${composerPromptRegionClassName} relative w-full`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: graphChatInputClassName, children: [
                      prompt.length === 0 && /* @__PURE__ */ jsx3(
                        "span",
                        {
                          className: `pointer-events-none absolute left-3 top-3 truncate text-slate-500 sm:left-4 sm:top-4 dark:text-slate-400 ${canInterrupt ? "right-12" : "right-3 sm:right-4"}`,
                          children: promptPlaceholder
                        }
                      ),
                      /* @__PURE__ */ jsx3(
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
                            if (isDraftControlled) {
                              flushControlledDraftToHost();
                            }
                          },
                          onDragEnter: handlePromptDragEnter,
                          onDragOver: handlePromptDragOver,
                          onDragLeave: handlePromptDragLeave,
                          onDrop: handlePromptDrop,
                          className: `relative z-[1] min-h-[4.25rem] whitespace-pre-wrap break-words pb-2 outline-none sm:min-h-[4.25rem] ${canInterrupt ? "pr-12" : ""} ${disabled ? "cursor-not-allowed text-slate-500" : ""}`
                        }
                      )
                    ] }),
                    canInterrupt ? /* @__PURE__ */ jsx3(
                      InputGroupButton,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon-xs",
                        "aria-label": interruptLabel,
                        title: interruptLabel,
                        onClick: (event) => {
                          event.preventDefault();
                          void onInterrupt?.();
                        },
                        className: "thread-graph-composer-stop-button ui-action-danger absolute right-2 top-2 z-30 h-8 w-8 rounded-full text-sm font-medium",
                        children: /* @__PURE__ */ jsx3(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: "block h-2.5 w-2.5 rounded-[2px] bg-current"
                          }
                        )
                      }
                    ) : null
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxs(
                InputGroupAddon,
                {
                  align: "block-end",
                  className: `${composerToolbarClassName} relative z-30 mb-0 flex items-center gap-2 text-xs`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
                      !isShellView && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx3(
                          InputGroupButton,
                          {
                            type: "button",
                            variant: "ghost",
                            size: "icon-xs",
                            "data-composer-menu-trigger": "true",
                            "aria-label": "Open slash toolbox",
                            title: "Open slash toolbox",
                            onClick: () => setOpenMenu(
                              (current) => current === "slash" ? null : "slash"
                            ),
                            className: `${composerIconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`,
                            children: /* @__PURE__ */ jsx3(SlashIcon, {})
                          }
                        ),
                        openMenu === "slash" && /* @__PURE__ */ jsx3(
                          "div",
                          {
                            "data-composer-menu-surface": "true",
                            className: `${composerMenuClassName} absolute bottom-full left-0 z-40 mb-2 w-72 overflow-hidden rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20 backdrop-blur-xl`,
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
                              availableToolboxItems.map((item, index) => /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  disabled: toolboxItemDisabled(item),
                                  onClick: (event) => handleToolboxItemClick(item, event),
                                  className: `${toolboxItemClassName(item)} ${index === 0 ? "mt-0" : ""}`,
                                  title: item.description ?? item.label,
                                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                                    /* @__PURE__ */ jsx3("span", { children: item.command }),
                                    /* @__PURE__ */ jsx3("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: toolboxItemStatus(item) })
                                  ] })
                                },
                                `${item.action}:${item.command}`
                              )),
                              availableToolboxItems.length === 0 ? /* @__PURE__ */ jsx3("p", { className: "px-3 py-2 text-sm text-stone-400", children: "No backend tools are available for this thread." }) : null
                            ] }) : /* @__PURE__ */ jsx3("div", { className: "max-h-80 overflow-auto", children: slashPanelView === "fork" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                              /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  disabled: busy || forkBusy,
                                  onClick: () => void handleForkLatest(),
                                  className: `${composerMenuItemClassName} block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`,
                                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                                    /* @__PURE__ */ jsx3("span", { children: "Fork from latest" }),
                                    /* @__PURE__ */ jsx3("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: forkBusy ? "Forking" : "Run" })
                                  ] })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  disabled: busy || forkBusy,
                                  onClick: (event) => {
                                    event.stopPropagation();
                                    setSlashPanelView("forkTurns");
                                    void onOpenForkTurns?.();
                                  },
                                  className: `${composerMenuItemClassName} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`,
                                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                                    /* @__PURE__ */ jsx3("span", { children: "Fork from selected turn" }),
                                    /* @__PURE__ */ jsx3("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: "Pick" })
                                  ] })
                                }
                              ),
                              busy ? /* @__PURE__ */ jsx3("p", { className: "mt-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Fork is only available while the thread is idle." }) : null
                            ] }) : slashPanelView === "forkTurns" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                              forkTurnOptionsState.status === "loading" && !forkTurnOptionsState.data ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading turns\u2026" }) : null,
                              forkTurnOptionsState.error ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: forkTurnOptionsState.error }) : null,
                              forkTurnOptionsState.data?.length ? /* @__PURE__ */ jsx3("div", { className: "space-y-2", children: forkTurnOptionsState.data.map((turn) => /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  disabled: forkBusy,
                                  onClick: () => void handleForkTurn(turn.turnId),
                                  className: `${composerPanelButtonClassName} block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60`,
                                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                                    /* @__PURE__ */ jsxs("span", { className: "text-sm text-stone-100", children: [
                                      "Turn ",
                                      turn.turnIndex
                                    ] }),
                                    /* @__PURE__ */ jsx3("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: forkBusy ? "Forking" : turn.status })
                                  ] })
                                },
                                turn.turnId
                              )) }) : null,
                              forkTurnOptionsState.status !== "loading" && !forkTurnOptionsState.error && (forkTurnOptionsState.data?.length ?? 0) === 0 ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No turns available to fork yet." }) : null
                            ] }) : slashPanelView === "skills" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                              skillsState.status === "loading" && !skillsState.data ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading skills\u2026" }) : null,
                              skillsState.error ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: skillsState.error }) : null,
                              skillsState.data?.skills.length ? /* @__PURE__ */ jsx3("div", { className: "space-y-2", children: skillsState.data.skills.map((skill) => /* @__PURE__ */ jsx3(
                                "div",
                                {
                                  className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
                                  children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                                    /* @__PURE__ */ jsx3("p", { className: "truncate text-sm font-medium text-stone-100", children: skill.interface?.displayName ?? skill.name }),
                                    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em]", children: [
                                      /* @__PURE__ */ jsx3("span", { className: "rounded-full border border-stone-700 px-2 py-1 text-stone-400", children: skillScopeLabel(skill.scope) }),
                                      /* @__PURE__ */ jsxs(
                                        "button",
                                        {
                                          type: "button",
                                          className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 normal-case tracking-normal transition ${copiedSkillName === skill.name ? "border-emerald-400/45 bg-emerald-400/12 text-emerald-100" : `${composerChipButtonClassName} border-stone-700 text-stone-300 hover:border-stone-500`}`,
                                          onClick: () => void handleCopySkillInvokeName(
                                            skill.name
                                          ),
                                          title: `Copy $${skill.name}`,
                                          "aria-label": `Copy $${skill.name}`,
                                          children: [
                                            /* @__PURE__ */ jsx3(ClipboardIcon, {}),
                                            "$",
                                            skill.name
                                          ]
                                        }
                                      )
                                    ] }),
                                    /* @__PURE__ */ jsx3("p", { className: "text-xs leading-5 text-stone-400", children: skill.interface?.shortDescription ?? skill.shortDescription ?? skill.description })
                                  ] })
                                },
                                skill.path
                              )) }) : null,
                              skillsState.data?.errors.length ? /* @__PURE__ */ jsx3("div", { className: "mt-2 space-y-2", children: skillsState.data.errors.map((entry) => /* @__PURE__ */ jsxs(
                                "div",
                                {
                                  className: "rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/85",
                                  children: [
                                    /* @__PURE__ */ jsx3("p", { className: "font-medium", children: entry.message }),
                                    /* @__PURE__ */ jsx3("p", { className: "mt-1 break-all text-amber-100/60", children: entry.path })
                                  ]
                                },
                                `${entry.path}:${entry.message}`
                              )) }) : null,
                              skillsState.status !== "loading" && !skillsState.error && (skillsState.data?.skills.length ?? 0) === 0 && (skillsState.data?.errors.length ?? 0) === 0 ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No skills available right now." }) : null
                            ] }) : slashPanelView === "hooks" ? /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                              /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
                                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                                  /* @__PURE__ */ jsx3("p", { className: "text-xs text-stone-400", children: "Hook config sources" }),
                                  /* @__PURE__ */ jsx3("p", { className: "truncate text-[11px] text-stone-500", children: hooksState.data?.projectHooksPath ?? "<workspace hooks config>" })
                                ] }),
                                hooksPanelMode === "list" && slashCapabilities.hostConfigFiles ? /* @__PURE__ */ jsx3(
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
                              hooksState.status === "loading" && !hooksState.data ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading hooks\u2026" }) : null,
                              hooksState.error ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: hooksState.error }) : null,
                              hookConfigError ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: hookConfigError }) : null,
                              hookConfigSuccess ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100/90", children: hookConfigSuccess }) : null,
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
                                          /* @__PURE__ */ jsx3("option", { value: "project", children: "Project" }),
                                          /* @__PURE__ */ jsx3("option", { value: "global", children: "Global" })
                                        ]
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ jsxs("label", { className: "block text-xs text-stone-400", children: [
                                    "Event",
                                    /* @__PURE__ */ jsx3(
                                      "select",
                                      {
                                        "aria-label": "Hook event",
                                        value: hookEventName,
                                        onChange: (event) => setHookEventName(
                                          event.target.value
                                        ),
                                        className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50",
                                        children: HOOK_EVENT_OPTIONS.map((eventOption) => /* @__PURE__ */ jsx3(
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
                                  /* @__PURE__ */ jsx3("label", { className: "mb-1 block text-xs text-stone-400", children: "Matcher" }),
                                  /* @__PURE__ */ jsx3(
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
                                  /* @__PURE__ */ jsx3("label", { className: "mb-1 block text-xs text-stone-400", children: "Command" }),
                                  /* @__PURE__ */ jsx3(
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
                                    /* @__PURE__ */ jsx3(
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
                                    /* @__PURE__ */ jsx3(
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
                                  /* @__PURE__ */ jsx3(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => {
                                        setHooksPanelMode("list");
                                        setEditingHookTarget(null);
                                      },
                                      className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition`,
                                      children: "Back"
                                    }
                                  ),
                                  /* @__PURE__ */ jsx3(
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
                              hooksPanelMode === "list" && hooksState.data?.warnings.length ? /* @__PURE__ */ jsx3("div", { className: "mb-2 space-y-2", children: hooksState.data.warnings.map((warning) => /* @__PURE__ */ jsx3(
                                "p",
                                {
                                  className: "rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/85",
                                  children: warning
                                },
                                warning
                              )) }) : null,
                              hooksPanelMode === "list" && hooksState.data?.errors.length ? /* @__PURE__ */ jsx3("div", { className: "mb-2 space-y-2", children: hooksState.data.errors.map((entry) => /* @__PURE__ */ jsxs(
                                "div",
                                {
                                  className: "rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-100/90",
                                  children: [
                                    /* @__PURE__ */ jsx3("p", { className: "font-medium", children: entry.message }),
                                    /* @__PURE__ */ jsx3("p", { className: "mt-1 break-all text-rose-100/60", children: entry.path })
                                  ]
                                },
                                `${entry.path}:${entry.message}`
                              )) }) : null,
                              hooksPanelMode === "list" && hooksState.data?.hooks.length ? /* @__PURE__ */ jsx3("div", { className: "space-y-2", children: hooksState.data.hooks.map((hook) => /* @__PURE__ */ jsxs(
                                "div",
                                {
                                  className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
                                  children: [
                                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                                      /* @__PURE__ */ jsxs("p", { className: "truncate text-sm font-medium text-stone-100", children: [
                                        hookEventLabel(hook.eventName),
                                        hook.matcher ? ` \xB7 ${hook.matcher}` : ""
                                      ] }),
                                      /* @__PURE__ */ jsx3("p", { className: "mt-0.5 truncate font-mono text-[11px] text-stone-400", children: hook.command ?? hook.handlerType }),
                                      hook.statusMessage ? /* @__PURE__ */ jsx3("p", { className: "mt-1 truncate text-[11px] text-stone-500", children: hook.statusMessage }) : null
                                    ] }),
                                    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-stone-500", children: [
                                      editableHookTarget(hook) ? /* @__PURE__ */ jsx3(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: (event) => {
                                            event.stopPropagation();
                                            startEditingHook(hook);
                                          },
                                          className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-sky-100 transition hover:border-sky-300/35 hover:bg-sky-300/10`,
                                          children: "Edit"
                                        }
                                      ) : null,
                                      slashCapabilities.hookTrust && hook.trustStatus === "trusted" && !hook.isManaged ? /* @__PURE__ */ jsx3(
                                        "button",
                                        {
                                          type: "button",
                                          disabled: hookConfigBusy,
                                          onClick: (event) => {
                                            event.stopPropagation();
                                            void handleUntrustHook(hook);
                                          },
                                          className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-100 transition hover:border-amber-300/35 hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50`,
                                          children: "Untrust"
                                        }
                                      ) : null,
                                      (hook.trustStatus === "untrusted" || hook.trustStatus === "modified") && !hook.isManaged && slashCapabilities.hookTrust ? /* @__PURE__ */ jsx3(
                                        "button",
                                        {
                                          type: "button",
                                          disabled: hookConfigBusy || !hook.currentHash,
                                          onClick: (event) => {
                                            event.stopPropagation();
                                            void handleTrustHook(hook);
                                          },
                                          className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-emerald-100 transition hover:border-emerald-300/35 hover:bg-emerald-300/10 disabled:cursor-not-allowed disabled:opacity-50`,
                                          children: "Trust"
                                        }
                                      ) : null,
                                      /* @__PURE__ */ jsx3("span", { className: "rounded-full border border-stone-700 px-2 py-0.5 text-stone-300", children: hookTrustLabel(hook.trustStatus) })
                                    ] }),
                                    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-500", children: [
                                      /* @__PURE__ */ jsx3("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: hookSourceLabel(hook.source) }),
                                      /* @__PURE__ */ jsx3("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: hook.enabled ? "Enabled" : "Disabled" }),
                                      /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: [
                                        hook.timeoutSec,
                                        "s"
                                      ] })
                                    ] })
                                  ]
                                },
                                hook.key
                              )) }) : null,
                              hooksPanelMode === "list" && hooksState.status !== "loading" && !hooksState.error && (hooksState.data?.hooks.length ?? 0) === 0 ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No hooks configured for this workspace." }) : null
                            ] }) : /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                              /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
                                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                                  /* @__PURE__ */ jsx3("p", { className: "text-xs text-stone-400", children: "MCP config source" }),
                                  /* @__PURE__ */ jsx3("p", { className: "truncate text-[11px] text-stone-500", children: mcpConfigPath ?? "<provider config>" })
                                ] }),
                                mcpPanelMode === "list" && slashCapabilities.mcpConfigEditing ? /* @__PURE__ */ jsx3(
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
                              mcpState.status === "loading" && !mcpState.data ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading MCP servers\u2026" }) : null,
                              mcpState.error ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: mcpState.error }) : null,
                              mcpConfigError ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: mcpConfigError }) : null,
                              mcpConfigSuccess ? /* @__PURE__ */ jsx3("p", { className: "mb-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100/90", children: mcpConfigSuccess }) : null,
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
                                    className: `${composerPanelButtonClassName} block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition`,
                                    children: [
                                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                                        /* @__PURE__ */ jsx3("span", { className: "text-sm text-stone-100", children: "HTTP / Streamable HTTP" }),
                                        /* @__PURE__ */ jsx3("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: "Form" })
                                      ] }),
                                      /* @__PURE__ */ jsx3("p", { className: "mt-1 text-xs text-stone-400", children: "Add an MCP server with a name and URL, then write the matching block into provider config." })
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
                                    className: `${composerPanelButtonClassName} block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition`,
                                    children: [
                                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                                        /* @__PURE__ */ jsx3("span", { className: "text-sm text-stone-100", children: "stdio / raw block" }),
                                        /* @__PURE__ */ jsx3("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: "TOML" })
                                      ] }),
                                      /* @__PURE__ */ jsx3("p", { className: "mt-1 text-xs text-stone-400", children: "Write a single `[mcp_servers.name]` block, then save it back into provider config." })
                                    ]
                                  }
                                )
                              ] }) : null,
                              mcpPanelMode === "http" ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
                                /* @__PURE__ */ jsxs("div", { children: [
                                  /* @__PURE__ */ jsx3("label", { className: "mb-1 block text-xs text-stone-400", children: "MCP name" }),
                                  /* @__PURE__ */ jsx3(
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
                                  /* @__PURE__ */ jsx3("label", { className: "mb-1 block text-xs text-stone-400", children: "URL" }),
                                  /* @__PURE__ */ jsx3(
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
                                  /* @__PURE__ */ jsx3(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => setMcpPanelMode("add"),
                                      className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition`,
                                      children: "Back"
                                    }
                                  ),
                                  /* @__PURE__ */ jsx3(
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
                                /* @__PURE__ */ jsx3("label", { className: "block text-xs text-stone-400", children: "MCP block for provider config" }),
                                /* @__PURE__ */ jsx3(
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
                                  /* @__PURE__ */ jsx3(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => setMcpPanelMode("add"),
                                      className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition`,
                                      children: "Back"
                                    }
                                  ),
                                  /* @__PURE__ */ jsx3(
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
                              mcpPanelMode === "list" && mcpState.data?.servers.length ? /* @__PURE__ */ jsx3("div", { className: "space-y-2", children: mcpState.data.servers.map((server) => /* @__PURE__ */ jsxs(
                                "div",
                                {
                                  className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
                                  children: [
                                    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                                      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                                        /* @__PURE__ */ jsx3("p", { className: "truncate text-sm font-medium text-stone-100", children: server.name }),
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
                                      /* @__PURE__ */ jsx3("span", { className: "shrink-0 rounded-full border border-stone-700 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-stone-300", children: authStatusLabel(server.authStatus) })
                                    ] }),
                                    server.tools.length > 0 ? /* @__PURE__ */ jsx3("p", { className: "mt-2 line-clamp-2 text-xs text-stone-500", children: server.tools.slice(0, 4).map(
                                      (tool) => tool.title ?? tool.name
                                    ).join(" \xB7 ") }) : null
                                  ]
                                },
                                server.name
                              )) }) : null,
                              mcpPanelMode === "list" && mcpState.status !== "loading" && !mcpState.error && (mcpState.data?.servers.length ?? 0) === 0 ? /* @__PURE__ */ jsx3("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No MCP servers available right now." }) : null
                            ] }) })
                          }
                        )
                      ] }),
                      !isShellView && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx3(
                          InputGroupButton,
                          {
                            type: "button",
                            variant: "ghost",
                            size: "icon-xs",
                            "data-composer-menu-trigger": "true",
                            "aria-label": "Add attachment",
                            title: "Add attachment",
                            onClick: () => setOpenMenu(
                              (current) => current === "attachments" ? null : "attachments"
                            ),
                            className: `${composerIconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`,
                            children: /* @__PURE__ */ jsx3(PlusIcon, {})
                          }
                        ),
                        openMenu === "attachments" && /* @__PURE__ */ jsx3(
                          "div",
                          {
                            "data-composer-menu-surface": "true",
                            className: `${composerMenuClassName} absolute bottom-full left-0 mb-2 w-32 overflow-hidden rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20`,
                            children: /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                              /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    dismissPromptFocus();
                                    photoInputRef.current?.click();
                                  },
                                  className: `${composerMenuItemClassName} block w-full rounded-xl px-3 py-2 text-left text-sm transition`,
                                  children: "Photo"
                                }
                              ),
                              /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    dismissPromptFocus();
                                    fileInputRef.current?.click();
                                  },
                                  className: `${composerMenuItemClassName} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition`,
                                  children: "File"
                                }
                              )
                            ] })
                          }
                        )
                      ] }),
                      canToggleShellView && /* @__PURE__ */ jsx3(
                        InputGroupButton,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "icon-xs",
                          "aria-label": isShellView ? "Switch to chat" : "Switch to shell",
                          title: isShellView ? "Switch to chat" : "Switch to shell",
                          onClick: () => onToggleView?.(),
                          className: `${composerIconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`,
                          children: isShellView ? /* @__PURE__ */ jsx3(ChatIcon, {}) : /* @__PURE__ */ jsx3(TerminalIcon, {})
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center justify-end gap-1.5", children: [
                      !isShellView && /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsxs("div", { className: "relative min-w-0", children: [
                          /* @__PURE__ */ jsx3(
                            InputGroupButton,
                            {
                              type: "button",
                              variant: "ghost",
                              size: "xs",
                              "data-composer-menu-trigger": "true",
                              "aria-haspopup": "menu",
                              "aria-expanded": openMenu === "model",
                              "aria-label": model ?? "Select model",
                              disabled: modelControlsDisabled || modelOptions.length === 0,
                              onClick: () => setOpenMenu(
                                (current) => current === "model" ? null : "model"
                              ),
                              title: fastMode ? `Fast mode is on. Turn it off from the slash toolbox to edit model. ${modelContextTitle}` : modelContextTitle,
                              className: `${composerInlineToggleClassName} relative min-w-0 max-w-[8.75rem] overflow-hidden rounded-full px-2.5 text-left text-stone-300 disabled:cursor-not-allowed disabled:text-stone-600 sm:max-w-[11rem]`,
                              children: /* @__PURE__ */ jsx3("span", { className: "relative z-[1] block min-w-0 truncate whitespace-nowrap [direction:rtl]", children: model ?? "Select model" })
                            }
                          ),
                          model ? /* @__PURE__ */ jsx3(ContextProgressBar, { contextUsage }) : null,
                          openMenu === "model" && /* @__PURE__ */ jsx3(
                            "div",
                            {
                              "data-composer-menu-surface": "true",
                              className: "absolute bottom-full left-0 mb-2 w-max min-w-[9rem] max-w-[14rem] overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
                              children: /* @__PURE__ */ jsx3("div", { className: "max-h-72 overflow-auto p-2", children: modelOptions.map((entry) => /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => void handleUpdateSettings({
                                    model: entry.model,
                                    reasoningEffort: entry.defaultReasoningEffort
                                  }),
                                  className: `block w-full rounded-xl px-3 py-2 text-left transition ${entry.model === model ? "ui-status-warning" : `${composerMenuItemClassName} text-stone-300`}`,
                                  children: /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium", children: entry.model })
                                },
                                entry.id
                              )) })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsx3(
                            InputGroupButton,
                            {
                              type: "button",
                              variant: "ghost",
                              size: "xs",
                              "data-composer-menu-trigger": "true",
                              "aria-haspopup": "menu",
                              "aria-expanded": openMenu === "effort",
                              disabled: effortControlsDisabled,
                              onClick: () => setOpenMenu(
                                (current) => current === "effort" ? null : "effort"
                              ),
                              title: effortControlTitle,
                              className: `${composerInlineToggleClassName} rounded-full px-2 disabled:cursor-not-allowed disabled:text-stone-700 ${effortControlsDisabled ? "text-stone-500" : "text-stone-300 hover:text-stone-100"}`,
                              children: formatReasoningEffortLabel(reasoningEffort)
                            }
                          ),
                          openMenu === "effort" && /* @__PURE__ */ jsx3(
                            "div",
                            {
                              "data-composer-menu-surface": "true",
                              className: "absolute bottom-full left-0 mb-2 w-max min-w-[8rem] max-w-[12rem] overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
                              children: /* @__PURE__ */ jsx3("div", { className: "max-h-72 overflow-auto p-2", children: supportedEfforts.map((entry) => /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => void handleUpdateSettings({
                                    reasoningEffort: entry.reasoningEffort
                                  }),
                                  className: `block w-full rounded-xl px-3 py-2 text-left transition ${entry.reasoningEffort === reasoningEffort ? "ui-status-warning" : `${composerMenuItemClassName} text-stone-300`}`,
                                  children: /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium", children: formatReasoningEffortLabel(entry.reasoningEffort) })
                                },
                                entry.reasoningEffort
                              )) })
                            }
                          )
                        ] }),
                        slashCapabilities.planMode && /* @__PURE__ */ jsx3(
                          InputGroupButton,
                          {
                            type: "button",
                            variant: "ghost",
                            size: "xs",
                            "aria-pressed": displayedCollaborationMode === "plan",
                            disabled: settingsBusy,
                            onClick: () => void handleUpdateSettings({
                              collaborationMode: displayedCollaborationMode === "plan" ? "default" : "plan"
                            }),
                            className: `${composerInlineToggleClassName} rounded-full px-2.5 ${displayedCollaborationMode === "plan" ? composerPlanToggleActiveClassName : "text-stone-500"} disabled:cursor-not-allowed disabled:opacity-60`,
                            children: "Plan"
                          }
                        ),
                        /* @__PURE__ */ jsx3(
                          InputGroupButton,
                          {
                            type: "submit",
                            variant: "default",
                            size: "icon-xs",
                            "aria-label": goalComposeMode ? "Set goal" : "Send Prompt",
                            title: sendButtonLabel,
                            disabled: goalBusy || (activeView === "chat" ? disabled : false),
                            className: `${composerSendButtonClassName} h-9 w-9 rounded-full text-sm font-medium disabled:cursor-not-allowed sm:h-8 sm:w-8 ${sendButtonClassName}`,
                            children: /* @__PURE__ */ jsxs(
                              "svg",
                              {
                                "aria-hidden": "true",
                                viewBox: "0 0 16 16",
                                className: "h-4 w-4 fill-none stroke-current",
                                strokeWidth: "1.8",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                  /* @__PURE__ */ jsx3("path", { d: "M8 13V3" }),
                                  /* @__PURE__ */ jsx3("path", { d: "m4 7 4-4 4 4" })
                                ]
                              }
                            )
                          }
                        )
                      ] }),
                      isShellView && shellPromptLabel && /* @__PURE__ */ jsx3(
                        InputGroupText,
                        {
                          className: "min-w-0 max-w-[12rem] truncate rounded-full px-1.5 py-1 text-stone-400",
                          title: shellPromptLabel,
                          children: shellPromptLabel
                        }
                      ),
                      isMobileShell && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx3(
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
                            children: /* @__PURE__ */ jsx3(WrenchScrewdriverIcon, {})
                          }
                        ),
                        openMenu === "shellTools" && /* @__PURE__ */ jsx3(
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
                              /* @__PURE__ */ jsx3(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => void pasteClipboardIntoPrompt(),
                                  className: "inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-2 py-2 text-sky-50",
                                  children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                                    /* @__PURE__ */ jsx3(ClipboardIcon, {}),
                                    /* @__PURE__ */ jsx3("span", { className: "text-[10px] font-medium tracking-[0.12em]", children: "Paste" })
                                  ] })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                    /* @__PURE__ */ jsx3(ClipboardIcon, {}),
                                    /* @__PURE__ */ jsx3("span", { className: "text-[10px] font-medium tracking-[0.12em]", children: "Copy" })
                                  ] })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "CLEAR", tone: "sky" })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "CTRL-C", tone: "rose" })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "CTRL-D" })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "ESC" })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "TAB" })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "UP" })
                                }
                              ),
                              /* @__PURE__ */ jsx3(
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
                                  children: /* @__PURE__ */ jsx3(ToolPill, { label: "DOWN" })
                                }
                              )
                            ] })
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            goalComposeMode && !isShellView && /* @__PURE__ */ jsxs("div", { className: "thread-goal-compose-card relative z-20 mb-1.5 flex flex-wrap items-center gap-2 rounded-2xl border px-3 py-2 text-xs shadow-sm", children: [
              /* @__PURE__ */ jsx3("span", { className: "thread-goal-compose-label font-medium uppercase tracking-[0.16em]", children: "Goal" }),
              /* @__PURE__ */ jsxs("label", { className: "thread-goal-compose-field flex items-center gap-2", children: [
                /* @__PURE__ */ jsx3("span", { children: "Max tokens (k)" }),
                /* @__PURE__ */ jsx3(
                  "input",
                  {
                    "aria-label": "Goal token budget",
                    value: goalTokenBudget,
                    onChange: (event) => setGoalTokenBudget(event.target.value),
                    inputMode: "numeric",
                    placeholder: "Optional",
                    className: "thread-goal-compose-input h-7 w-24 rounded-full border px-3 text-xs outline-none"
                  }
                )
              ] }),
              goalLocalError ? /* @__PURE__ */ jsx3("span", { className: "thread-goal-compose-error min-w-0 flex-1", children: goalLocalError }) : null,
              /* @__PURE__ */ jsx3(
                "button",
                {
                  type: "button",
                  onClick: exitGoalComposeMode,
                  className: "thread-goal-compose-cancel rounded-full border px-2.5 py-1 text-[11px] transition",
                  children: "Cancel"
                }
              )
            ] }),
            isShellView ? /* @__PURE__ */ jsxs("div", { className: `${composerPromptRegionClassName} relative`, children: [
              /* @__PURE__ */ jsx3(
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
              ),
              /* @__PURE__ */ jsx3(
                "button",
                {
                  type: "button",
                  "aria-label": interruptLabel,
                  title: interruptLabel,
                  onClick: () => void onInterrupt?.(),
                  disabled: !canInterrupt,
                  className: `absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${canInterrupt ? "border-rose-300/55 bg-rose-300/[0.14] text-rose-50 shadow-lg shadow-rose-950/20 hover:bg-rose-300/[0.22]" : "cursor-not-allowed border-stone-700/30 bg-stone-400/[0.02] text-stone-500/55 opacity-55"}`,
                  children: /* @__PURE__ */ jsx3(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "block h-2.5 w-2.5 rounded-[2px] bg-current"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx3(
                "button",
                {
                  type: "submit",
                  "aria-label": "Send Shell Input",
                  onMouseDown: (event) => {
                    event.preventDefault();
                  },
                  onPointerDown: (event) => {
                    event.preventDefault();
                  },
                  onTouchStart: (event) => {
                    event.preventDefault();
                  },
                  disabled: goalBusy || busy,
                  className: `absolute bottom-2.5 right-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium shadow-lg shadow-stone-950/30 transition disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-300 ${sendButtonClassName}`,
                  children: sendButtonLabel
                }
              )
            ] }) : null
          ] }),
          error && /* @__PURE__ */ jsx3("div", { className: "mt-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200", children: error })
        ]
      }
    )
  ] });
}

// src/components/ThreadWorkspaceLayout.tsx
import { useEffect as useEffect3, useMemo as useMemo2, useRef as useRef2, useState as useState2 } from "react";
import {
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Menu,
  MessageSquare,
  Monitor,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Rows3,
  Settings,
  Sun,
  Trash2,
  X
} from "lucide-react";

// src/app-shell/AppShellNavContext.tsx
import { createContext, useContext } from "react";
var AppShellNavContext = createContext(
  null
);
function useAppShellNav() {
  return useContext(AppShellNavContext);
}

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

// src/components/RenameDialog.tsx
import { useEffect as useEffect2 } from "react";
import { createPortal } from "react-dom";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
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
      /* @__PURE__ */ jsx4(
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
                /* @__PURE__ */ jsx4("p", { className: "text-sm font-medium text-stone-100", children: title }),
                /* @__PURE__ */ jsx4("p", { className: "mt-1 text-sm text-stone-500", children: "Changes are saved only after confirmation." })
              ] }),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx4("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx4("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsx4("label", { htmlFor: "rename-dialog-input", className: "text-sm font-medium text-stone-200", children: label }),
              /* @__PURE__ */ jsx4(
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
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: busy,
                  className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx4(
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

// src/components/graph-chat/GraphChatShellLayout.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function GraphChatShellRoot({
  children,
  effectiveTheme,
  layoutMode,
  themeMode,
  viewportConstrained
}) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: `thread-ui-shell ${effectiveTheme === "dark" ? "thread-ui-theme-dark dark" : ""} ${viewportConstrained ? "thread-ui-viewport-constrained" : ""} ${viewportConstrained ? "h-[100svh] max-h-[100svh] min-h-0 overflow-hidden overscroll-none" : "min-h-[100svh] overflow-hidden"} bg-[#f6f8fb] text-slate-900 transition-colors duration-200 sm:p-2`,
      "data-theme-effective": effectiveTheme,
      "data-theme-mode": themeMode ?? effectiveTheme,
      "data-thread-layout": layoutMode,
      children
    }
  );
}
function GraphChatShellFrame({
  children,
  roomsRailCollapsed
}) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: `thread-shell-frame relative h-full min-h-0 ${roomsRailCollapsed ? "is-rail-collapsed sm:grid-cols-[56px_minmax(0,1fr)]" : "sm:grid-cols-[264px_minmax(0,1fr)]"}`,
      children
    }
  );
}
function GraphChatMobileScrim({
  onClose,
  open
}) {
  if (!open) {
    return null;
  }
  return /* @__PURE__ */ jsx5(
    "button",
    {
      type: "button",
      "aria-hidden": "true",
      tabIndex: -1,
      className: "thread-mobile-only-block thread-mobile-scrim fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px]",
      onClick: onClose
    }
  );
}
function GraphChatRoomsRailShell({
  children,
  collapsed,
  mobileOpen
}) {
  return /* @__PURE__ */ jsx5(
    "aside",
    {
      className: `thread-graph-rooms-surface thread-rooms-rail fixed inset-y-0 left-0 z-50 flex min-h-0 min-w-0 w-[min(20rem,calc(100vw-2rem))] flex-col overflow-x-hidden border-r border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-transform duration-200 ease-out sm:static sm:z-auto sm:w-auto sm:translate-x-0 sm:rounded-[12px] sm:border sm:shadow-[0_10px_30px_rgba(15,23,42,0.04)] ${mobileOpen ? "translate-x-0" : "pointer-events-none -translate-x-full sm:pointer-events-auto"} ${collapsed ? "thread-ui-rail-collapsed sm:items-center" : ""}`,
      children
    }
  );
}
function GraphChatMainShell({ children }) {
  return /* @__PURE__ */ jsx5("main", { className: "thread-shell-main h-full min-h-0 min-w-0 overflow-hidden", children: /* @__PURE__ */ jsx5("div", { className: "thread-main-panel thread-shell-card flex h-full min-h-0 flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:rounded-[12px] sm:border sm:border-slate-200/80", children }) });
}
function GraphChatTopbarShell({ children }) {
  return /* @__PURE__ */ jsx5("div", { className: "thread-topbar-surface flex shrink-0 flex-col border-b border-slate-200 bg-white pt-[env(safe-area-inset-top)] sm:pt-0", children });
}
function GraphChatSplitRegion({ children }) {
  return /* @__PURE__ */ jsx5("div", { className: "thread-split-region min-h-0 flex-1 overflow-hidden p-0 sm:p-2", children });
}

// src/components/graph-workspace/GraphResizablePanels.tsx
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx as jsx6 } from "react/jsx-runtime";
function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsx6(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    ResizablePrimitive.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: classNames(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle ? /* @__PURE__ */ jsx6("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsx6(GripVerticalIcon, { className: "size-2.5" }) }) : null
    }
  );
}

// src/components/graph-ui/Dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  children,
  className,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx7(DialogOverlay, {}),
    /* @__PURE__ */ jsxs3(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton ? /* @__PURE__ */ jsxs3(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "absolute right-4 top-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx7(XIcon, {}),
                /* @__PURE__ */ jsx7("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) : null
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg font-semibold leading-none", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ThreadWorkspaceLayout.tsx
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var THEME_MODE_OPTIONS = [
  { value: "system", label: "Follow system", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun }
];
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
  showSessionCopyButton = false,
  collapsed = false
}) {
  const [copyState, setCopyState] = useState2(
    "idle"
  );
  const resetTimerRef = useRef2(null);
  const workspaceLabel = workspaceLabels[thread.workspaceId];
  const roomMetaLabel = workspaceLabel && !currentWorkspaceId ? workspaceLabel : null;
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
  const openThread = () => onOpenThread(thread.id);
  const cardClassName = `thread-graph-room-card group flex w-full items-center gap-3 rounded-xl border text-left transition ${isCurrentThread ? "is-active" : ""} ${collapsed ? "justify-center px-2 py-2" : "px-3 py-2.5"}`;
  const cardContent = /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: `thread-graph-room-card-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isCurrentThread ? "is-active" : ""}`,
        children: /* @__PURE__ */ jsx8(MessageSquare, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxs4(
      "div",
      {
        className: `min-w-0 flex-1 ${collapsed ? "thread-desktop-collapsed-hidden" : ""}`,
        children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex min-w-0 items-center gap-1", children: [
            /* @__PURE__ */ jsx8(
              "p",
              {
                className: "thread-graph-room-card-title min-w-0 flex-1 truncate text-sm font-medium",
                title: thread.title,
                children: thread.title
              }
            ),
            onBeginRenameThread && !collapsed ? /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  onBeginRenameThread(thread);
                },
                "aria-label": `Rename thread ${thread.title}`,
                title: "Rename thread",
                className: "thread-card-quiet-button inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition",
                children: /* @__PURE__ */ jsx8(Pencil, { className: "h-3 w-3" })
              }
            ) : null,
            showSessionCopyButton && thread.providerSessionId ? /* @__PURE__ */ jsx8(
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
                className: "thread-card-quiet-button thread-card-session-copy-button inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition",
                children: /* @__PURE__ */ jsx8(Copy, { className: "h-3.5 w-3.5" })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "mt-1 flex min-w-0 items-center gap-2", children: [
            roomMetaLabel ? /* @__PURE__ */ jsx8(
              "p",
              {
                className: "thread-graph-room-card-meta min-w-0 flex-1 truncate text-[11px] text-[var(--theme-fg-muted)]",
                title: roomMetaLabel,
                children: roomMetaLabel
              }
            ) : /* @__PURE__ */ jsx8("span", { className: "min-w-0 flex-1", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx8(
              "span",
              {
                className: `shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-normal ${threadStatusClassName(thread.status)}`,
                children: threadStatusLabel(thread.status)
              }
            ),
            /* @__PURE__ */ jsx8(
              "time",
              {
                className: "shrink-0 text-[11px] text-[var(--theme-fg-muted)]",
                dateTime: thread.lastTurnStartedAt ?? thread.updatedAt,
                children: formatShortTimestamp(thread.lastTurnStartedAt ?? thread.updatedAt)
              }
            )
          ] })
        ]
      }
    ),
    showDeleteButton && onDeleteThread && !collapsed ? /* @__PURE__ */ jsx8(
      "button",
      {
        type: "button",
        onClick: (event) => {
          event.stopPropagation();
          event.preventDefault();
          onDeleteThread(thread);
        },
        "aria-label": `Delete thread ${thread.title}`,
        className: "thread-card-danger-button shrink-0 rounded-full p-1 transition",
        title: "Delete thread",
        children: /* @__PURE__ */ jsx8(Trash2, { className: "h-3.5 w-3.5" })
      }
    ) : null
  ] });
  const href = getThreadHref?.(thread.id);
  if (renderThreadLink) {
    return /* @__PURE__ */ jsx8(Fragment2, { children: renderThreadLink({
      thread,
      children: cardContent,
      className: cardClassName,
      onClick: openThread
    }) });
  }
  if (href) {
    return /* @__PURE__ */ jsx8(
      "a",
      {
        href,
        onClick: (event) => {
          event.preventDefault();
          openThread();
        },
        title: collapsed ? thread.title : void 0,
        className: cardClassName,
        children: cardContent
      }
    );
  }
  return /* @__PURE__ */ jsx8(
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
      title: collapsed ? thread.title : void 0,
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
  showSessionCopyButton = false,
  collapsed = false
}) {
  const containerClassName = scrollable ? `min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain pr-1 ${maxHeightClassName}` : "";
  return /* @__PURE__ */ jsx8("div", { className: containerClassName, children: /* @__PURE__ */ jsx8("div", { className: "min-w-0 space-y-1", children: threads.map((thread) => /* @__PURE__ */ jsx8(
    ThreadCard,
    {
      thread,
      currentThreadId,
      currentWorkspaceId,
      workspaceLabels,
      onOpenThread,
      showDeleteButton,
      showSessionCopyButton,
      collapsed,
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
  status,
  loading = false,
  error,
  viewportConstrained = false,
  layoutMode = "responsive",
  effectiveTheme: effectiveThemeProp,
  themeMode: themeModeProp,
  onThemeModeChange,
  showMobileAppMenu = false,
  showMobileThreadNavToggle = false,
  showMobileNewThreadShortcut = true,
  mobileHeaderAction,
  currentThreadId,
  currentThreadLabel = null,
  currentWorkspaceId = null,
  currentWorkspaceLabel = null,
  sessionLabel = null,
  usageLabel = null,
  topbarActions,
  metaContent,
  settingsContent,
  globalSettingsContent,
  workspaceLabels = {},
  appMenuButton,
  appNavigationMenu,
  workspaceReturnHref,
  onWorkspaceReturn,
  getThreadHref,
  onOpenThread,
  getNewThreadHref,
  newThreadHref: explicitNewThreadHref,
  newThreadLabel = "New Chat",
  onNewThread,
  onNewThreadTitle,
  renderThreadLink,
  onCloseAppNavigation,
  onRenameThread,
  onDeleteThread,
  workspaceContent,
  workspaceTitle = "Workspace",
  workspaceActions,
  children
}) {
  const shellNav = useAppShellNav();
  const [systemPrefersDark, setSystemPrefersDark] = useState2(
    () => typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );
  const themeMode = themeModeProp ?? shellNav?.themeMode ?? "system";
  const effectiveTheme = effectiveThemeProp ?? shellNav?.effectiveTheme ?? (themeMode === "system" ? systemPrefersDark ? "dark" : "light" : themeMode);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState2(false);
  const [roomsRailCollapsed, setRoomsRailCollapsed] = useState2(false);
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState2(false);
  const [isShellMobileViewport, setIsShellMobileViewport] = useState2(
    () => typeof window !== "undefined" ? window.matchMedia("(max-width: 639px)").matches : layoutMode === "mobile"
  );
  const [mobileWorkspace, setMobileWorkspace] = useState2(
    "chat"
  );
  const [editingThreadId, setEditingThreadId] = useState2(null);
  const [draftTitle, setDraftTitle] = useState2("");
  const [renamingThreadId, setRenamingThreadId] = useState2(null);
  const [createThreadDialogOpen, setCreateThreadDialogOpen] = useState2(false);
  const [newThreadTitleDraft, setNewThreadTitleDraft] = useState2("");
  const [creatingThread, setCreatingThread] = useState2(false);
  const [topbarDetailsOpen, setTopbarDetailsOpen] = useState2(false);
  const [settingsTab, setSettingsTab] = useState2(
    "session"
  );
  useEffect3(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleViewportChange = () => {
      setIsShellMobileViewport(mediaQuery.matches);
    };
    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);
  useEffect3(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      setSystemPrefersDark(mediaQuery.matches);
    };
    handleSystemThemeChange();
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);
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
  const newThreadHref = explicitNewThreadHref ?? getNewThreadHref?.(currentWorkspaceId);
  const topbarRoomLabel = currentWorkspaceLabel ?? currentWorkspaceId ?? "all";
  const topbarSessionLabel = sessionLabel ?? currentThreadLabel ?? currentThreadId ?? "default_session";
  const topbarUsageLabel = usageLabel ?? (status?.state ? `runtime ${status.state}` : "waiting for agent usage");
  const setThemeMode = onThemeModeChange ?? shellNav?.setThemeMode;
  const canUpdateThemeMode = Boolean(setThemeMode);
  const closeNavigationSurfaces = () => {
    setMobileRoomsOpen(false);
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
  function buildNewThreadHrefWithTitle(title) {
    if (!newThreadHref || !title.trim()) {
      return newThreadHref;
    }
    try {
      const url = new URL(newThreadHref, window.location.origin);
      url.searchParams.set("title", title.trim());
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      const separator = newThreadHref.includes("?") ? "&" : "?";
      return `${newThreadHref}${separator}title=${encodeURIComponent(title.trim())}`;
    }
  }
  async function handleCreateThreadFromDialog() {
    const title = newThreadTitleDraft.trim();
    setCreatingThread(true);
    try {
      if (title && onNewThreadTitle) {
        await onNewThreadTitle(title);
        setNewThreadTitleDraft("");
        setCreateThreadDialogOpen(false);
        closeNavigationSurfaces();
        return;
      }
      if (newThreadHref) {
        window.location.assign(
          buildNewThreadHrefWithTitle(title) ?? newThreadHref
        );
        return;
      }
      await onNewThread?.();
      setNewThreadTitleDraft("");
      setCreateThreadDialogOpen(false);
      closeNavigationSurfaces();
    } finally {
      setCreatingThread(false);
    }
  }
  function renderNewThreadDialogButton(className, compact = false) {
    const content = compact ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
      /* @__PURE__ */ jsx8(Plus, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx8("span", { className: "sr-only", children: newThreadLabel })
    ] }) : /* @__PURE__ */ jsxs4(Fragment2, { children: [
      /* @__PURE__ */ jsx8(Plus, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx8("span", { children: newThreadLabel })
    ] });
    return /* @__PURE__ */ jsxs4(
      Dialog,
      {
        open: createThreadDialogOpen,
        onOpenChange: (open) => {
          if (!creatingThread) {
            setCreateThreadDialogOpen(open);
          }
        },
        children: [
          /* @__PURE__ */ jsx8(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              "aria-label": compact ? newThreadLabel : void 0,
              title: newThreadLabel,
              className,
              children: content
            }
          ) }),
          /* @__PURE__ */ jsxs4(
            DialogContent,
            {
              "data-testid": "create-thread-dialog",
              "data-theme-effective": effectiveTheme,
              "data-theme-mode": themeMode,
              className: "thread-graph-create-thread-dialog thread-graph-dialog",
              children: [
                /* @__PURE__ */ jsxs4(DialogHeader, { children: [
                  /* @__PURE__ */ jsx8(DialogTitle, { children: "Create New Chat" }),
                  /* @__PURE__ */ jsx8(DialogDescription, { children: "Name the room so it is easy to find later." })
                ] }),
                /* @__PURE__ */ jsxs4("div", { className: "grid gap-3", children: [
                  /* @__PURE__ */ jsx8(
                    "input",
                    {
                      id: "thread-graph-create-thread-title",
                      name: "thread-title",
                      value: newThreadTitleDraft,
                      onChange: (event) => setNewThreadTitleDraft(event.target.value),
                      onKeyDown: (event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          void handleCreateThreadFromDialog();
                        }
                      },
                      placeholder: "Chat name",
                      "aria-label": "Chat name",
                      autoComplete: "off",
                      className: "thread-graph-create-thread-input h-10 rounded-md border px-3 text-sm outline-none transition"
                    }
                  ),
                  /* @__PURE__ */ jsx8(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleCreateThreadFromDialog(),
                      disabled: creatingThread,
                      className: "thread-graph-create-thread-submit inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: creatingThread ? "Creating..." : "Create"
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    );
  }
  function renderSettingsDialog() {
    if (!settingsContent && !metaContent && !globalSettingsContent && !canUpdateThemeMode) {
      return null;
    }
    const hasSessionSettings = Boolean(settingsContent || metaContent);
    const hasGlobalSettings = Boolean(globalSettingsContent);
    const activeSettingsTab = settingsTab === "global" && hasGlobalSettings ? "global" : !hasSessionSettings && hasGlobalSettings ? "global" : "session";
    return /* @__PURE__ */ jsxs4(Dialog, { children: [
      /* @__PURE__ */ jsx8(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          "aria-label": "Open settings",
          title: "Settings",
          className: "thread-icon-button inline-flex h-10 w-10 items-center justify-center rounded-full sm:h-9 sm:w-9",
          children: /* @__PURE__ */ jsx8(Settings, { className: "h-4 w-4" })
        }
      ) }),
      /* @__PURE__ */ jsxs4(
        DialogContent,
        {
          "data-testid": "settings-dialog",
          "data-theme-effective": effectiveTheme,
          "data-theme-mode": themeMode,
          className: "thread-graph-settings-dialog thread-graph-dialog",
          children: [
            /* @__PURE__ */ jsxs4(DialogHeader, { children: [
              /* @__PURE__ */ jsx8(DialogTitle, { children: "Settings" }),
              /* @__PURE__ */ jsx8(DialogDescription, { children: "Manage this session and host-wide preferences." })
            ] }),
            canUpdateThemeMode ? /* @__PURE__ */ jsx8("div", { className: "thread-graph-settings-card rounded-lg border p-3", children: /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
              /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx8("p", { className: "font-medium text-[var(--theme-fg)]", children: "Appearance" }),
                /* @__PURE__ */ jsxs4("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: [
                  "Current theme: ",
                  effectiveTheme
                ] })
              ] }),
              /* @__PURE__ */ jsx8(
                "div",
                {
                  className: "thread-graph-theme-mode-group grid grid-cols-3 gap-1 rounded-lg border p-1",
                  role: "group",
                  "aria-label": "Theme mode",
                  children: THEME_MODE_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = themeMode === option.value;
                    return /* @__PURE__ */ jsxs4(
                      "button",
                      {
                        type: "button",
                        "data-testid": `theme-mode-${option.value}`,
                        "aria-pressed": isSelected,
                        disabled: !canUpdateThemeMode,
                        onClick: () => setThemeMode?.(option.value),
                        className: `thread-graph-theme-mode-button inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium transition ${isSelected ? "is-selected" : ""}`,
                        children: [
                          /* @__PURE__ */ jsx8(Icon, { className: "h-3.5 w-3.5" }),
                          /* @__PURE__ */ jsx8("span", { className: "truncate", children: option.label })
                        ]
                      },
                      option.value
                    );
                  })
                }
              )
            ] }) }) : null,
            /* @__PURE__ */ jsxs4("div", { className: "thread-graph-settings-tabs grid grid-cols-2 gap-1 rounded-lg border p-1", children: [
              /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  "aria-pressed": activeSettingsTab === "session",
                  onClick: () => setSettingsTab("session"),
                  className: `thread-graph-settings-tab-button rounded-md px-3 py-2 text-sm font-medium transition ${activeSettingsTab === "session" ? "is-active" : ""}`,
                  children: "Session"
                }
              ),
              /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  "aria-pressed": activeSettingsTab === "global",
                  disabled: !hasGlobalSettings,
                  onClick: () => setSettingsTab("global"),
                  className: `thread-graph-settings-tab-button rounded-md px-3 py-2 text-sm font-medium transition ${activeSettingsTab === "global" ? "is-active" : ""}`,
                  children: "Global"
                }
              )
            ] }),
            /* @__PURE__ */ jsx8("div", { className: "thread-graph-settings-body mt-4 min-h-0 overflow-y-auto pr-1 text-sm", children: activeSettingsTab === "session" ? /* @__PURE__ */ jsxs4("div", { className: "grid gap-4", children: [
              settingsContent ? /* @__PURE__ */ jsx8("div", { className: "thread-graph-settings-card rounded-lg border p-3", children: settingsContent }) : null,
              metaContent ? /* @__PURE__ */ jsx8("div", { className: "thread-graph-settings-card rounded-lg border p-3", children: metaContent }) : null,
              !hasSessionSettings ? /* @__PURE__ */ jsx8("div", { className: "thread-graph-settings-card rounded-lg border p-3 text-[var(--theme-fg-muted)]", children: "No session settings are available." }) : null
            ] }) : /* @__PURE__ */ jsx8("div", { className: "thread-graph-settings-global-content", children: globalSettingsContent }) })
          ]
        }
      )
    ] });
  }
  function renderRoomsRailContent(collapsed = false) {
    return /* @__PURE__ */ jsx8("div", { className: "flex min-h-0 flex-1 flex-col", children: /* @__PURE__ */ jsxs4("section", { className: "flex min-h-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxs4(
        "div",
        {
          className: `mb-3 flex items-center gap-2 px-2 text-xs font-medium tracking-normal text-[var(--theme-fg-muted)] ${collapsed ? "justify-center" : ""}`,
          children: [
            /* @__PURE__ */ jsx8(Rows3, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx8("span", { className: collapsed ? "sr-only" : "", children: "Rooms" }),
            !collapsed && loading ? /* @__PURE__ */ jsx8("span", { className: "ml-auto text-xs text-[var(--theme-fg-muted)]", children: "Refreshing..." }) : null
          ]
        }
      ),
      /* @__PURE__ */ jsxs4("div", { className: "min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-1", children: [
        error ? /* @__PURE__ */ jsx8("div", { className: "rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-sm text-rose-900 dark:text-rose-100", children: error }) : null,
        !error && visibleThreads.length === 0 && !loading ? /* @__PURE__ */ jsx8("div", { className: "rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-6 text-sm text-[var(--theme-fg-muted)]", children: "No threads available in this view." }) : null,
        visibleThreads.length > 0 ? /* @__PURE__ */ jsx8(
          ThreadCards,
          {
            threads: visibleThreads,
            currentThreadId,
            currentWorkspaceId,
            workspaceLabels,
            onOpenThread: openThread,
            collapsed,
            ...onRenameThread ? { onBeginRenameThread: beginRenameThread } : {},
            showDeleteButton: Boolean(onDeleteThread),
            ...getThreadHref ? { getThreadHref } : {},
            ...renderThreadLink ? { renderThreadLink } : {},
            ...onDeleteThread ? { onDeleteThread } : {}
          }
        ) : null
      ] })
    ] }) });
  }
  function renderWorkspacePanel() {
    if (workspaceContent) {
      return /* @__PURE__ */ jsxs4("div", { className: "thread-workspace-panel relative flex h-full min-h-0 flex-col overflow-hidden rounded-[12px] border", children: [
        /* @__PURE__ */ jsx8(
          "button",
          {
            type: "button",
            onClick: () => setWorkspaceCollapsed(true),
            className: "thread-workspace-collapse-tab thread-desktop-only-inline-flex",
            title: "Collapse workspace",
            "aria-label": "Collapse workspace",
            children: /* @__PURE__ */ jsx8(ChevronsRight, { className: "h-4 w-4" })
          }
        ),
        workspaceActions ? /* @__PURE__ */ jsx8("div", { className: "pointer-events-none absolute right-12 top-2 z-20 flex items-center gap-1", children: /* @__PURE__ */ jsx8("div", { className: "pointer-events-auto", children: workspaceActions }) }) : null,
        /* @__PURE__ */ jsx8("div", { className: "min-h-0 flex-1 overflow-hidden", children: workspaceContent })
      ] });
    }
    return /* @__PURE__ */ jsxs4("div", { className: "thread-workspace-panel flex h-full min-h-0 flex-col overflow-hidden rounded-[12px] border", children: [
      /* @__PURE__ */ jsxs4("div", { className: "thread-workspace-panel-header flex h-12 shrink-0 items-center justify-between gap-3 border-b border-[var(--theme-border)] px-3 sm:h-[60px] sm:px-4", children: [
        /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx8("p", { className: "truncate text-base font-semibold text-[var(--theme-fg)] sm:text-[18px]", children: workspaceTitle }),
          /* @__PURE__ */ jsx8("p", { className: "truncate text-xs text-[var(--theme-fg-muted)]", children: currentWorkspaceLabel ?? currentWorkspaceId ?? "Current context" })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "flex shrink-0 items-center gap-1", children: [
          workspaceActions,
          /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              onClick: () => setWorkspaceCollapsed(true),
              className: "thread-workspace-small-toggle thread-desktop-only-inline-flex",
              title: "Collapse workspace",
              "aria-label": "Collapse workspace",
              children: /* @__PURE__ */ jsx8(ChevronsRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx8("div", { className: "min-h-0 flex-1 overflow-hidden", children: workspaceContent ?? /* @__PURE__ */ jsxs4("div", { className: "grid h-full min-h-0 gap-3 overflow-y-auto p-3 text-sm text-[var(--theme-fg-soft)]", children: [
        /* @__PURE__ */ jsxs4("div", { className: "thread-workspace-card rounded-lg border p-3", children: [
          /* @__PURE__ */ jsx8("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: "Runtime" }),
          /* @__PURE__ */ jsx8("p", { className: "mt-2 text-[var(--theme-fg)]", children: status?.state ?? "unknown" })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "thread-workspace-card rounded-lg border p-3", children: [
          /* @__PURE__ */ jsx8("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: "Workspace" }),
          /* @__PURE__ */ jsx8("p", { className: "mt-2 break-words text-[var(--theme-fg)]", children: currentWorkspaceLabel ?? currentWorkspaceId ?? "All threads" })
        ] })
      ] }) })
    ] });
  }
  const hasWorkspace = Boolean(workspaceContent);
  const renderMobileWorkspaceSplit = layoutMode === "mobile" || layoutMode === "responsive" && isShellMobileViewport;
  const renderMobileTopbarControls = renderMobileWorkspaceSplit;
  const shouldShowMobileRoomsButton = renderMobileTopbarControls && !mobileRoomsOpen;
  const canReturnToWorkspace = Boolean(workspaceReturnHref || onWorkspaceReturn);
  const workspaceReturnControl = canReturnToWorkspace ? /* @__PURE__ */ jsx8(
    "a",
    {
      href: workspaceReturnHref ?? "#",
      onClick: (event) => {
        if (onWorkspaceReturn) {
          event.preventDefault();
          onWorkspaceReturn();
        }
      },
      className: "thread-icon-button inline-flex h-10 w-10 items-center justify-center rounded-full sm:h-9 sm:w-9",
      title: "Back to workspace",
      "aria-label": "Back to workspace",
      children: /* @__PURE__ */ jsx8(ArrowLeft, { className: "h-4 w-4" })
    }
  ) : null;
  return /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx8(
      GraphChatShellRoot,
      {
        effectiveTheme,
        layoutMode,
        themeMode,
        viewportConstrained,
        children: /* @__PURE__ */ jsxs4(GraphChatShellFrame, { roomsRailCollapsed, children: [
          /* @__PURE__ */ jsx8(
            GraphChatMobileScrim,
            {
              open: mobileRoomsOpen,
              onClose: () => setMobileRoomsOpen(false)
            }
          ),
          /* @__PURE__ */ jsxs4(
            GraphChatRoomsRailShell,
            {
              collapsed: roomsRailCollapsed,
              mobileOpen: mobileRoomsOpen,
              children: [
                /* @__PURE__ */ jsx8(
                  "div",
                  {
                    className: `thread-rooms-rail-header flex h-[calc(3.75rem+env(safe-area-inset-top))] shrink-0 items-end border-b border-[var(--theme-border)] px-4 pb-3 sm:h-16 sm:items-center sm:pb-0 ${roomsRailCollapsed ? "sm:w-full sm:justify-center sm:px-2" : ""}`,
                    children: /* @__PURE__ */ jsxs4(
                      "div",
                      {
                        className: `flex w-full items-center gap-3 ${roomsRailCollapsed ? "sm:justify-center" : "justify-between"}`,
                        children: [
                          /* @__PURE__ */ jsxs4("div", { className: "flex min-w-0 items-center gap-3", children: [
                            /* @__PURE__ */ jsx8(
                              "button",
                              {
                                type: "button",
                                onClick: () => setRoomsRailCollapsed((current) => !current),
                                className: "thread-icon-button thread-desktop-only-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                                title: roomsRailCollapsed ? "Expand rooms" : "Collapse rooms",
                                "aria-label": roomsRailCollapsed ? "Expand rooms" : "Collapse rooms",
                                children: roomsRailCollapsed ? /* @__PURE__ */ jsx8(PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx8(PanelLeftClose, { className: "h-4 w-4" })
                              }
                            ),
                            /* @__PURE__ */ jsx8(
                              "div",
                              {
                                className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--theme-accent-solid)] text-sm font-semibold text-[var(--theme-accent-solid-fg)] ${roomsRailCollapsed ? "thread-desktop-collapsed-hidden" : ""}`,
                                children: (currentWorkspaceLabel ?? "R").charAt(0).toUpperCase()
                              }
                            ),
                            /* @__PURE__ */ jsxs4(
                              "div",
                              {
                                className: `min-w-0 ${roomsRailCollapsed ? "thread-desktop-collapsed-hidden" : ""}`,
                                children: [
                                  /* @__PURE__ */ jsx8("p", { className: "truncate text-sm font-semibold text-[var(--theme-fg)]", children: currentWorkspaceLabel ?? "Remote Codex" }),
                                  /* @__PURE__ */ jsx8("p", { className: "truncate text-xs text-[var(--theme-fg-muted)]", children: currentWorkspaceId ?? "Thread workspace" })
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs4(
                            "div",
                            {
                              className: `flex shrink-0 items-center gap-1 ${roomsRailCollapsed ? "thread-desktop-collapsed-hidden" : ""}`,
                              children: [
                                renderSettingsDialog(),
                                workspaceReturnControl,
                                /* @__PURE__ */ jsx8(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => setMobileRoomsOpen(false),
                                    "aria-label": "Close rooms",
                                    title: "Close rooms",
                                    className: "thread-icon-button thread-mobile-only-inline-flex h-10 w-10 items-center justify-center rounded-full",
                                    children: /* @__PURE__ */ jsx8(X, { className: "h-4 w-4" })
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx8(
                  "div",
                  {
                    className: `thread-graph-new-room-strip flex shrink-0 items-center border-b ${roomsRailCollapsed ? "h-12 w-full justify-center px-2 sm:h-12" : "h-[68px] px-4"}`,
                    children: renderNewThreadDialogButton(
                      `thread-graph-new-room-button inline-flex items-center justify-center rounded-xl font-medium transition ${roomsRailCollapsed ? "h-9 w-9 p-0" : "h-11 w-full gap-2 px-3 text-sm sm:h-9"}`,
                      roomsRailCollapsed
                    )
                  }
                ),
                /* @__PURE__ */ jsx8(
                  "div",
                  {
                    className: `flex min-h-0 flex-1 flex-col ${roomsRailCollapsed ? "w-full px-2 py-2" : "px-3 py-3"}`,
                    children: renderRoomsRailContent(roomsRailCollapsed)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs4(GraphChatMainShell, { children: [
            /* @__PURE__ */ jsxs4(GraphChatTopbarShell, { children: [
              /* @__PURE__ */ jsx8("div", { className: "thread-topbar-row flex min-h-12 items-center px-3 py-1.5 sm:min-h-12 sm:px-4", children: /* @__PURE__ */ jsxs4("div", { className: "flex w-full items-center justify-between gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsxs4("div", { className: "flex min-w-0 items-center gap-2 sm:gap-3", children: [
                  shouldShowMobileRoomsButton ? /* @__PURE__ */ jsx8(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMobileRoomsOpen(true),
                      "aria-label": "Open rooms",
                      title: "Open rooms",
                      className: "thread-icon-button thread-mobile-only-inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      children: /* @__PURE__ */ jsx8(Menu, { className: "h-4 w-4" })
                    }
                  ) : null,
                  /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
                    renderMobileTopbarControls ? /* @__PURE__ */ jsx8("h1", { className: "thread-mobile-only-block min-w-0 truncate text-sm font-semibold leading-none text-[var(--theme-fg)]", children: currentThreadLabel ?? "Shared Workspace" }) : null,
                    /* @__PURE__ */ jsxs4("div", { className: "relative flex min-w-0 items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxs4(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setTopbarDetailsOpen((open) => !open);
                          },
                          "aria-expanded": topbarDetailsOpen,
                          "aria-haspopup": "dialog",
                          className: "thread-topbar-meta-row flex min-w-0 max-w-full items-center gap-1 text-left text-[11px] leading-none sm:text-xs",
                          title: "Session and usage",
                          children: [
                            /* @__PURE__ */ jsx8("span", { className: "shrink-0", children: "Room" }),
                            /* @__PURE__ */ jsx8("span", { className: "truncate font-mono", children: topbarRoomLabel })
                          ]
                        }
                      ),
                      topbarDetailsOpen ? /* @__PURE__ */ jsxs4(
                        "div",
                        {
                          className: "thread-topbar-details-popover absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(26rem,calc(100vw-1.5rem))] rounded-lg border p-2.5 shadow-lg",
                          role: "dialog",
                          "aria-label": "Session and usage",
                          children: [
                            /* @__PURE__ */ jsxs4(
                              "button",
                              {
                                type: "button",
                                onClick: () => {
                                  if (!topbarRoomLabel) {
                                    return;
                                  }
                                  void navigator.clipboard?.writeText(
                                    topbarRoomLabel
                                  );
                                },
                                className: "thread-topbar-meta-row flex min-w-0 max-w-full items-center gap-2 text-left text-xs leading-5",
                                title: "Copy room ID",
                                children: [
                                  /* @__PURE__ */ jsx8("span", { className: "w-12 shrink-0", children: "Room" }),
                                  /* @__PURE__ */ jsx8("span", { className: "truncate font-mono", children: topbarRoomLabel })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxs4(
                              "button",
                              {
                                type: "button",
                                onClick: () => {
                                  if (!topbarSessionLabel) {
                                    return;
                                  }
                                  void navigator.clipboard?.writeText(
                                    topbarSessionLabel
                                  );
                                },
                                className: "thread-topbar-meta-row flex min-w-0 max-w-full items-center gap-2 text-left text-xs leading-5",
                                title: "Copy session ID",
                                children: [
                                  /* @__PURE__ */ jsx8("span", { className: "w-12 shrink-0", children: "Session" }),
                                  /* @__PURE__ */ jsx8("span", { className: "truncate font-mono", children: topbarSessionLabel })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxs4(
                              "div",
                              {
                                className: "thread-topbar-meta-row mt-1 flex min-w-0 max-w-full items-center gap-2 text-xs leading-5",
                                title: "Room token usage",
                                children: [
                                  /* @__PURE__ */ jsx8("span", { className: "w-12 shrink-0", children: "Usage" }),
                                  /* @__PURE__ */ jsx8("span", { className: "truncate font-mono", children: topbarUsageLabel })
                                ]
                              }
                            )
                          ]
                        }
                      ) : null
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("div", { className: "inline-flex shrink-0 items-center gap-2", children: [
                  topbarActions ? /* @__PURE__ */ jsx8("div", { className: "thread-graph-topbar-actions thread-desktop-only-inline-flex items-center rounded-lg border p-0.5 shadow-none", children: topbarActions }) : null,
                  renderMobileTopbarControls ? mobileHeaderAction : null,
                  renderMobileTopbarControls && showMobileNewThreadShortcut ? renderNewThreadDialogButton(
                    "thread-secondary-action inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium sm:h-9"
                  ) : null
                ] })
              ] }) }),
              renderMobileTopbarControls && hasWorkspace ? /* @__PURE__ */ jsxs4("div", { className: "thread-mobile-view-switch thread-mobile-only-grid grid-cols-2 gap-1 px-3 pb-2", children: [
                /* @__PURE__ */ jsx8(
                  "button",
                  {
                    type: "button",
                    onClick: () => setMobileWorkspace("chat"),
                    className: `thread-mobile-segment h-10 rounded-lg text-sm font-medium transition ${mobileWorkspace === "chat" ? "is-active" : ""}`,
                    children: "Chat"
                  }
                ),
                /* @__PURE__ */ jsx8(
                  "button",
                  {
                    type: "button",
                    onClick: () => setMobileWorkspace("workspace"),
                    className: `thread-mobile-segment h-10 rounded-lg text-sm font-medium transition ${mobileWorkspace === "workspace" ? "is-active" : ""}`,
                    children: "Workspace"
                  }
                )
              ] }) : null
            ] }),
            /* @__PURE__ */ jsx8(GraphChatSplitRegion, { children: hasWorkspace && !workspaceCollapsed ? renderMobileWorkspaceSplit ? /* @__PURE__ */ jsxs4("div", { className: "thread-split-container thread-graph-shell-mobile-split h-full min-h-0 overflow-hidden", children: [
              /* @__PURE__ */ jsx8(
                "div",
                {
                  className: `h-full min-h-0 overflow-hidden ${mobileWorkspace === "chat" ? "block" : "thread-mobile-chat-hidden"}`,
                  children
                }
              ),
              /* @__PURE__ */ jsx8(
                "div",
                {
                  className: `h-full min-h-0 overflow-hidden ${mobileWorkspace === "workspace" ? "block" : "thread-mobile-workspace-hidden"}`,
                  children: renderWorkspacePanel()
                }
              )
            ] }) : /* @__PURE__ */ jsxs4(
              ResizablePanelGroup,
              {
                direction: "horizontal",
                className: "thread-split-container thread-graph-shell-resizable thread-graph-shell-desktop-split h-full min-h-0 overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx8(
                    ResizablePanel,
                    {
                      defaultSize: 47,
                      minSize: 30,
                      maxSize: 75,
                      className: "thread-split-chat-pane min-w-0 overflow-hidden",
                      children
                    }
                  ),
                  /* @__PURE__ */ jsx8(ResizableHandle, { className: "thread-resize-handle w-2 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" }),
                  /* @__PURE__ */ jsx8(
                    ResizablePanel,
                    {
                      defaultSize: 53,
                      minSize: 30,
                      maxSize: 70,
                      className: "thread-split-workspace-pane min-w-0 overflow-hidden",
                      children: renderWorkspacePanel()
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxs4("div", { className: "thread-split-container relative h-full min-h-0 overflow-hidden", children: [
              hasWorkspace && workspaceCollapsed ? /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  onClick: () => setWorkspaceCollapsed(false),
                  className: "thread-workspace-expand-fab thread-desktop-only-inline-flex",
                  title: "Expand workspace",
                  "aria-label": "Expand workspace",
                  children: /* @__PURE__ */ jsx8(ChevronsLeft, { className: "h-4 w-4" })
                }
              ) : null,
              children
            ] }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx8(
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
  memo as memo5,
  useCallback as useCallback3,
  useEffect as useEffect9,
  useLayoutEffect as useLayoutEffect3,
  useMemo as useMemo7,
  useRef as useRef6,
  useState as useState9
} from "react";

// src/components/LongTextDialog.tsx
import { useEffect as useEffect4 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
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
    /* @__PURE__ */ jsxs5("div", { className: "fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          "aria-label": "Close full text",
          onClick: onClose,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs5(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: "relative z-[1] flex max-h-[min(82vh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
          children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-3 border-b border-stone-800 px-4 py-3 sm:px-5", children: [
              /* @__PURE__ */ jsx9("p", { className: "truncate text-sm font-medium text-stone-100", children: title }),
              /* @__PURE__ */ jsx9(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onClose,
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800",
                  children: /* @__PURE__ */ jsx9(
                    "svg",
                    {
                      "aria-hidden": "true",
                      viewBox: "0 0 16 16",
                      className: "h-4 w-4 fill-current",
                      children: /* @__PURE__ */ jsx9("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx9("div", { className: "min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-5", children: /* @__PURE__ */ jsx9("pre", { className: "whitespace-pre-wrap break-words text-sm leading-6 text-stone-200", children: text }) })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/graph-chat/GraphChatHistoryEntries.tsx
import { Fragment as Fragment3, jsx as jsx10 } from "react/jsx-runtime";
function GraphChatHistoryEntries({
  entries,
  expandedGroups,
  onToggleGroupedItem,
  renderCommandGroup,
  renderFileChangeGroup,
  renderFileReadGroup,
  renderItem,
  renderSearchGroup
}) {
  return /* @__PURE__ */ jsx10(Fragment3, { children: entries.map((entry) => {
    const expanded = expandedGroups[entry.key] ?? false;
    const onToggleExpanded = () => onToggleGroupedItem(entry.key);
    if (entry.kind === "commandGroup") {
      return renderCommandGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "fileChangeGroup") {
      return renderFileChangeGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "searchGroup") {
      return renderSearchGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "fileReadGroup") {
      return renderFileReadGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    return renderItem(entry);
  }) });
}

// src/components/graph-chat/GraphChatHistoryItems.tsx
import { memo as memo3, useState as useState7 } from "react";
import {
  Archive,
  Bot,
  CheckCircle2 as CheckCircle22,
  ClipboardList,
  ExternalLink,
  FilePenLine,
  FileText,
  Image as ImageIconLucide,
  Info,
  Loader2 as Loader22,
  PackageOpen,
  Search,
  Sparkles,
  Terminal,
  Webhook,
  Wrench as Wrench2,
  XCircle as XCircle2
} from "lucide-react";

// src/plugins/usePlugins.ts
import { useContext as useContext2 } from "react";

// src/plugins/plugin-context.ts
import { createContext as createContext2 } from "react";

// src/plugins/builtin-plugin-modules.tsx
import {
  xyzViewerPluginManifest
} from "@remote-codex/plugin-xyz-viewer";
import { terminalPluginManifest } from "@remote-codex/plugin-terminal";

// src/plugins/xyz-plugin-renderers.tsx
import { useMemo as useMemo3, useState as useState3 } from "react";
import { XyzMoleculeViewer } from "@remote-codex/plugin-xyz-viewer/frontend";
import "@remote-codex/plugin-xyz-viewer/styles.css";
import { looksLikeMoleculeStructure } from "@remote-codex/plugin-runtime";
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs6("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        onClick: onToggleExpanded,
        className: "flex w-full items-center justify-between gap-3 text-left",
        children: [
          /* @__PURE__ */ jsxs6("span", { children: [
            /* @__PURE__ */ jsx11("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: artifact.title }),
            /* @__PURE__ */ jsx11("span", { className: "mt-1 block text-xs text-[var(--theme-fg-muted)]", children: artifact.summaryText ?? artifact.type })
          ] }),
          /* @__PURE__ */ jsx11("span", { className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: expanded ? "Hide" : "Open" })
        ]
      }
    ),
    expanded && source && /* @__PURE__ */ jsx11("div", { className: "h-[min(56vh,34rem)] min-h-[26rem]", children: /* @__PURE__ */ jsx11(
      XyzMoleculeViewer,
      {
        source,
        moleculeId: artifact.id,
        title: artifact.title
      }
    ) }),
    expanded && !source && /* @__PURE__ */ jsx11("pre", { className: "max-h-80 overflow-auto rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] p-3 text-xs text-[var(--theme-fg-soft)]", children: JSON.stringify(artifact.payload, null, 2) })
  ] });
}
function InlineXyzRenderer({
  code,
  isIncomplete,
  language
}) {
  const [expanded, setExpanded] = useState3(true);
  const [sourceOpen, setSourceOpen] = useState3(false);
  const format = normalizedMoleculeFormat(language);
  const source = useMemo3(
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
  return /* @__PURE__ */ jsxs6("div", { className: "my-3 overflow-hidden rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)]", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-[var(--theme-border)] px-3 py-2", children: [
      /* @__PURE__ */ jsxs6("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs6("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: [
          format.toUpperCase(),
          " molecule"
        ] }),
        /* @__PURE__ */ jsx11("p", { className: "mt-0.5 text-xs text-[var(--theme-fg-muted)]", children: "Rendered from message source" })
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "inline-flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            onClick: () => setSourceOpen((current) => !current),
            className: "rounded-full border border-[var(--theme-border)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
            children: sourceOpen ? "Hide source" : "Source"
          }
        ),
        /* @__PURE__ */ jsx11(
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
    expanded && /* @__PURE__ */ jsx11("div", { className: "h-[min(52vh,32rem)] min-h-[24rem]", children: /* @__PURE__ */ jsx11(
      XyzMoleculeViewer,
      {
        source,
        moleculeId: source.uuid,
        title: `${format.toUpperCase()} molecule`
      }
    ) }),
    sourceOpen && /* @__PURE__ */ jsx11("pre", { className: "max-h-96 overflow-auto border-t border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-3 text-xs leading-5 text-[var(--theme-fg-soft)]", children: code })
  ] });
}

// src/plugins/builtin-plugin-modules.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
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
    renderArtifact: (context) => /* @__PURE__ */ jsx12(XyzArtifactRenderer, { ...context }),
    inlineCodeRenderers: [
      {
        languages: ["xyz", "extxyz", "cif", "pdb"],
        render: (context) => /* @__PURE__ */ jsx12(InlineXyzRenderer, { ...context })
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
  const renderArtifact = (context) => {
    const module = enabledModules.find(
      (entry) => entry.renderArtifact && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === context.artifact.type
      )
    );
    return module?.renderArtifact?.(context) ?? null;
  };
  const renderInlineCode = (context) => {
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
  };
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
    renderArtifact,
    renderInlineCode,
    hasRendererForArtifact: (artifact) => enabledModules.some(
      (entry) => Boolean(entry.renderArtifact) && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === artifact.type
      )
    ),
    getThreadPanels: () => enabledModules.flatMap((module) => module.threadPanels ?? [])
  };
}
var PluginContext = createContext2(createDefaultPluginContextValue());

// src/plugins/usePlugins.ts
function usePlugins() {
  return useContext2(PluginContext) ?? createDefaultPluginContextValue();
}

// src/components/graph-chat/GraphChatMessageBody.tsx
import {
  memo as memo2,
  useCallback as useCallback2,
  useEffect as useEffect7,
  useLayoutEffect as useLayoutEffect2,
  useMemo as useMemo6,
  useRef as useRef4,
  useState as useState6
} from "react";

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

// src/components/graph-chat/GraphChatMessageContent.tsx
import {
  memo,
  useEffect as useEffect6,
  isValidElement,
  useMemo as useMemo5,
  useRef as useRef3,
  useState as useState5
} from "react";
import { Copy as Copy2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// src/components/graph-chat/GraphChatToolCall.tsx
import { useEffect as useEffect5, useMemo as useMemo4, useState as useState4 } from "react";
import {
  CheckCircle2,
  Loader2,
  Wrench,
  XCircle
} from "lucide-react";

// src/components/graph-workspace/GraphAccordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
function classNames2(...values) {
  return values.filter(Boolean).join(" ");
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx13(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
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
  return /* @__PURE__ */ jsx13(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx13(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-[var(--theme-fg-muted)] transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsx13("div", { className: classNames2("pb-4 pt-0", className), children })
    }
  );
}

// src/components/graph-chat/GraphChatToolCall.tsx
import { jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function normalizeObjectEntries(value) {
  if (isRecord(value)) {
    return Object.entries(value);
  }
  if (value === void 0 || value === null || value === "") {
    return [];
  }
  return [["value", value]];
}
function formatPrimitiveValue(value) {
  if (typeof value === "string") {
    return /* @__PURE__ */ jsxs8("span", { className: "thread-graph-tool-string", children: [
      '"',
      value,
      '"'
    ] });
  }
  if (typeof value === "number") {
    return /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-number", children: value });
  }
  if (typeof value === "boolean") {
    return /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-boolean", children: String(value) });
  }
  if (value === null) {
    return /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-null", children: "null" });
  }
  if (typeof value === "object") {
    return /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-object", children: JSON.stringify(value) });
  }
  return /* @__PURE__ */ jsx14("span", { children: String(value) });
}
function renderResultValue(key, value) {
  if (typeof value === "string" && (key === "stdout" || key === "stderr" || key === "result")) {
    return /* @__PURE__ */ jsx14("pre", { className: "thread-graph-tool-output", children: value || "(empty)" });
  }
  if (typeof value === "object" && value !== null) {
    return /* @__PURE__ */ jsx14("pre", { className: "thread-graph-tool-output", children: JSON.stringify(value, null, 2) });
  }
  return formatPrimitiveValue(value);
}
function GraphChatToolCall({
  callId,
  toolName,
  status,
  parameters,
  result
}) {
  const statusConfig = useMemo4(() => {
    switch (status) {
      case "completed":
        return {
          className: "is-completed",
          icon: /* @__PURE__ */ jsx14(CheckCircle2, { className: "h-3.5 w-3.5" }),
          label: "Completed"
        };
      case "failed":
        return {
          className: "is-failed",
          icon: /* @__PURE__ */ jsx14(XCircle, { className: "h-3.5 w-3.5" }),
          label: "Failed"
        };
      default:
        return {
          className: "is-pending",
          icon: /* @__PURE__ */ jsx14(Loader2, { className: "h-3.5 w-3.5 animate-spin" }),
          label: "Running"
        };
    }
  }, [status]);
  const resultEntries = useMemo4(() => normalizeObjectEntries(result), [result]);
  const parameterEntries = useMemo4(
    () => normalizeObjectEntries(parameters),
    [parameters]
  );
  const hasTextualOutput = useMemo4(() => {
    if (typeof result === "string") {
      return result.length > 0;
    }
    if (!isRecord(result)) {
      return false;
    }
    return ["stdout", "stderr", "result"].some((key) => {
      const value = result[key];
      return typeof value === "string" && value.length > 0;
    });
  }, [result]);
  const shouldAutoOpen = status === "pending" || hasTextualOutput;
  const [openItem, setOpenItem] = useState4(
    shouldAutoOpen ? "item-1" : void 0
  );
  useEffect5(() => {
    if (shouldAutoOpen) {
      setOpenItem("item-1");
    }
  }, [callId, shouldAutoOpen]);
  return /* @__PURE__ */ jsx14("div", { className: "thread-graph-tool-call my-2 w-full font-sans not-prose", children: /* @__PURE__ */ jsx14(
    Accordion,
    {
      type: "single",
      collapsible: true,
      onValueChange: (value) => setOpenItem(value || void 0),
      className: "thread-graph-tool-accordion w-full overflow-hidden rounded-lg border",
      ...openItem !== void 0 ? { value: openItem } : {},
      children: /* @__PURE__ */ jsxs8(AccordionItem, { value: "item-1", className: "border-0", children: [
        /* @__PURE__ */ jsx14(
          AccordionTrigger,
          {
            className: "thread-graph-tool-trigger px-4 py-3 hover:no-underline",
            children: /* @__PURE__ */ jsxs8("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx14(Wrench, { className: "h-4 w-4 shrink-0" }),
              /* @__PURE__ */ jsx14("span", { className: "min-w-0 truncate font-mono text-sm font-semibold", children: toolName }),
              /* @__PURE__ */ jsxs8(
                "span",
                {
                  className: `thread-graph-tool-badge ${statusConfig.className}`,
                  title: statusConfig.label,
                  "aria-label": `Status: ${statusConfig.label}`,
                  children: [
                    statusConfig.icon,
                    /* @__PURE__ */ jsx14("span", { className: "thread-graph-status-label", children: statusConfig.label })
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxs8(AccordionContent, { className: "thread-graph-tool-content px-4 pb-4 pt-1", children: [
          /* @__PURE__ */ jsxs8("section", { children: [
            /* @__PURE__ */ jsx14("h4", { children: "Parameters" }),
            /* @__PURE__ */ jsxs8("div", { className: "thread-graph-tool-json", children: [
              "{",
              /* @__PURE__ */ jsx14("br", {}),
              parameterEntries.length > 0 ? parameterEntries.map(([key, value], index) => /* @__PURE__ */ jsxs8("div", { children: [
                /* @__PURE__ */ jsxs8("span", { className: "thread-graph-tool-key", children: [
                  '"',
                  key,
                  '"'
                ] }),
                /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-punctuation", children: ": " }),
                formatPrimitiveValue(value),
                index < parameterEntries.length - 1 ? /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-punctuation", children: "," }) : null
              ] }, key)) : /* @__PURE__ */ jsx14("div", { children: /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-null", children: "empty" }) }),
              "}"
            ] })
          ] }),
          resultEntries.length > 0 ? /* @__PURE__ */ jsxs8("section", { children: [
            /* @__PURE__ */ jsx14("h4", { children: "Result" }),
            /* @__PURE__ */ jsxs8("div", { className: "thread-graph-tool-json", children: [
              "{",
              /* @__PURE__ */ jsx14("br", {}),
              resultEntries.map(([key, value], index) => /* @__PURE__ */ jsxs8("div", { children: [
                /* @__PURE__ */ jsxs8("span", { className: "thread-graph-tool-key", children: [
                  '"',
                  key,
                  '"'
                ] }),
                /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-punctuation", children: ": " }),
                renderResultValue(key, value),
                index < resultEntries.length - 1 ? /* @__PURE__ */ jsx14("span", { className: "thread-graph-tool-punctuation", children: "," }) : null
              ] }, key)),
              "}"
            ] })
          ] }) : null
        ] })
      ] })
    }
  ) });
}

// src/components/graph-chat/graphChatShiki.ts
var graphChatHighlighterPromise = null;
function getGraphChatHighlighter() {
  graphChatHighlighterPromise ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/themes/ayu-light.mjs"),
    import("shiki/themes/ayu-dark.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/json.mjs"),
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/shellscript.mjs"),
    import("shiki/langs/yaml.mjs"),
    import("shiki/langs/toml.mjs"),
    import("shiki/langs/markdown.mjs"),
    import("shiki/langs/html.mjs"),
    import("shiki/langs/css.mjs"),
    import("shiki/langs/sql.mjs"),
    import("shiki/langs/csv.mjs")
  ]).then(
    ([
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      ayuLight,
      ayuDark,
      javascript,
      typescript,
      tsx,
      jsx51,
      python,
      json,
      bash,
      shellscript,
      yaml,
      toml,
      markdown,
      html,
      css,
      sql,
      csv
    ]) => createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      themes: [ayuLight.default, ayuDark.default],
      langs: [
        javascript.default,
        typescript.default,
        tsx.default,
        jsx51.default,
        python.default,
        json.default,
        bash.default,
        shellscript.default,
        yaml.default,
        toml.default,
        markdown.default,
        html.default,
        css.default,
        sql.default,
        csv.default
      ]
    })
  );
  return graphChatHighlighterPromise;
}

// src/components/graph-chat/graphChatToolBlocks.ts
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function reconstructGraphChatToolArgs(args) {
  if (!args) {
    return {};
  }
  if (isRecord2(args) && Object.prototype.hasOwnProperty.call(args, "0")) {
    try {
      const reconstructedString = Object.keys(args).map(Number).filter((key) => Number.isFinite(key)).sort((left, right) => left - right).map((key) => String(args[String(key)] ?? "")).join("");
      return JSON.parse(reconstructedString);
    } catch {
      return args;
    }
  }
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return args;
    }
  }
  return args;
}
function createEmptyGraphChatToolResultState() {
  return {
    finalResult: null,
    stdout: "",
    stderr: ""
  };
}
function normalizeToolResult(result) {
  return typeof result === "string" ? { result } : result;
}
function mergeGraphChatToolResultState(state) {
  const merged = isRecord2(state.finalResult) ? { ...state.finalResult } : state.finalResult != null ? { result: state.finalResult } : {};
  if (state.stdout) {
    merged.stdout = state.stdout;
  }
  if (state.stderr) {
    merged.stderr = state.stderr;
  }
  if (!("status" in merged) && (state.stdout || state.stderr)) {
    merged.status = "pending";
  }
  return merged;
}
function getGraphChatToolUiStatus(result) {
  if (!result) {
    return "pending";
  }
  if (!isRecord2(result)) {
    return "completed";
  }
  const status = result.status;
  if (status === "stream" || status === "pending" || status === "running") {
    return "pending";
  }
  if (status === "failed" || status === "error" || status === "timed_out") {
    return "failed";
  }
  if (typeof result.exit_code === "number" && result.exit_code !== 0) {
    return "failed";
  }
  return "completed";
}
function preprocessGraphChatToolBlocks(content) {
  const resultMap = /* @__PURE__ */ new Map();
  const resultRegex = /```tool-result\s*([\s\S]*?)\s*```/g;
  const contentWithoutOrphanedResults = content.replace(
    resultRegex,
    (fullMatch, jsonContent) => {
      try {
        const data = JSON.parse(jsonContent);
        const callId = data.call_id;
        if (typeof callId !== "string") {
          return fullMatch;
        }
        const normalizedResult = normalizeToolResult(data.result);
        const state = resultMap.get(callId) ?? createEmptyGraphChatToolResultState();
        if (isRecord2(normalizedResult) && normalizedResult.status === "stream" && typeof normalizedResult.chunk === "string") {
          if (normalizedResult.stream === "stderr") {
            state.stderr += normalizedResult.chunk;
          } else {
            state.stdout += normalizedResult.chunk;
          }
        } else {
          state.finalResult = normalizedResult;
        }
        resultMap.set(callId, state);
        return "";
      } catch {
        return fullMatch;
      }
    }
  );
  const callRegex = /```tool-call\s*([\s\S]*?)\s*```/g;
  const processedContent = contentWithoutOrphanedResults.replace(
    callRegex,
    (fullMatch, jsonContent) => {
      try {
        const data = JSON.parse(jsonContent);
        const callId = data.call_id;
        const tool = data.tool;
        if (typeof tool !== "string") {
          return fullMatch;
        }
        const args = reconstructGraphChatToolArgs(data.args);
        if (typeof callId === "string" && resultMap.has(callId)) {
          const resultData = mergeGraphChatToolResultState(
            resultMap.get(callId) ?? createEmptyGraphChatToolResultState()
          );
          const mergedPayload = JSON.stringify(
            {
              call: { tool, args, call_id: callId },
              result: resultData
            },
            null,
            2
          );
          return `\`\`\`tool-merged
${mergedPayload}
\`\`\``;
        }
        return fullMatch;
      } catch {
        return fullMatch;
      }
    }
  );
  return { processedContent, resultMap };
}

// src/components/graph-chat/GraphChatMessageContent.tsx
import { Fragment as Fragment4, jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
function ensureTransparentShikiBg(html) {
  return html.replace(/background-color:[^;"]+;?/g, "background-color: transparent;").replace(/background:[^;"]+;?/g, "background: transparent;");
}
function textFromReactNode(children) {
  if (Array.isArray(children)) {
    return children.map((child) => String(child)).join("");
  }
  return String(children ?? "");
}
function readMarkdownNodeLineRange(node) {
  if (!node || typeof node !== "object" || !("position" in node)) {
    return { startLine: void 0, endLine: void 0 };
  }
  const position = node.position;
  if (!position || typeof position !== "object") {
    return { startLine: void 0, endLine: void 0 };
  }
  const start = position.start;
  const end = position.end;
  const startLine = start && typeof start === "object" ? start.line : void 0;
  const endLine = end && typeof end === "object" ? end.line : void 0;
  return {
    startLine: typeof startLine === "number" ? startLine : void 0,
    endLine: typeof endLine === "number" ? endLine : void 0
  };
}
function PreRenderer({ children, ...props }) {
  if (isToolCodeElement(children)) {
    return /* @__PURE__ */ jsx15(Fragment4, { children });
  }
  return /* @__PURE__ */ jsx15("pre", { ...props, children });
}
function isToolCodeElement(value) {
  if (!value || typeof value !== "object" || !("props" in value)) {
    return false;
  }
  const className = value.props?.className;
  if (typeof className !== "string") {
    return false;
  }
  return className.includes("language-tool-call") || className.includes("language-tool-merged") || className.includes("language-tool-result");
}
var GraphChatMessageContent = memo(function GraphChatMessageContent2({
  className = "thread-graph-markdown",
  content
}) {
  const rootRef = useRef3(null);
  const plugins = usePlugins();
  const [highlighter, setHighlighter] = useState5(null);
  const [copyState, setCopyState] = useState5({});
  const [dark, setDark] = useState5(false);
  const { processedContent, resultMap } = useMemo5(
    () => preprocessGraphChatToolBlocks(content),
    [content]
  );
  useEffect6(() => {
    let alive = true;
    getGraphChatHighlighter().then((loadedHighlighter) => {
      if (alive) {
        setHighlighter(loadedHighlighter);
      }
    }).catch(() => void 0);
    return () => {
      alive = false;
    };
  }, []);
  useEffect6(() => {
    const root = rootRef.current;
    const shell = root?.closest(".thread-ui-shell");
    const readDark = () => {
      if (!shell) {
        return document.documentElement.classList.contains("dark");
      }
      return shell.getAttribute("data-theme-effective") === "dark" || shell.classList.contains("dark") || shell.classList.contains("thread-ui-theme-dark");
    };
    setDark(readDark());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setDark(readDark()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ["class", "data-theme-effective"]
    });
    return () => observer.disconnect();
  }, []);
  async function copyCode(id, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState((current) => ({ ...current, [id]: "copied" }));
      window.setTimeout(() => {
        setCopyState((current) => {
          const next = { ...current };
          delete next[id];
          return next;
        });
      }, 1200);
    } catch {
      setCopyState((current) => ({ ...current, [id]: "failed" }));
    }
  }
  const CodeBlockRenderer = ({
    children,
    className: codeClassName,
    inline,
    node,
    ...props
  }) => {
    const match = /language-(\w+(?:-\w+)*)/.exec(codeClassName || "");
    const language = match ? match[1] ?? "" : "";
    const textContent = textFromReactNode(children).replace(/\n$/, "");
    const { startLine, endLine } = readMarkdownNodeLineRange(node);
    const isFencedOrBlockCode = inline === false || Boolean(codeClassName) || textContent.includes("\n") || startLine !== endLine;
    if (language === "tool-merged") {
      let data = {
        call: { tool: "Unknown", args: {}, call_id: void 0 },
        result: null
      };
      try {
        data = JSON.parse(textContent);
      } catch {
        data = {
          call: { tool: "Error", args: { raw: textContent } },
          result: { status: "failed" }
        };
      }
      const toolName = typeof data.call.tool === "string" ? data.call.tool : "Unknown";
      const callId = typeof data.call.call_id === "string" ? data.call.call_id : void 0;
      return /* @__PURE__ */ jsx15(
        GraphChatToolCall,
        {
          callId,
          toolName,
          status: getGraphChatToolUiStatus(data.result),
          parameters: reconstructGraphChatToolArgs(data.call.args),
          result: data.result
        }
      );
    }
    if (language === "tool-call") {
      let data = {
        tool: "Unknown",
        args: {},
        call_id: void 0
      };
      try {
        data = JSON.parse(textContent);
      } catch {
        data = { tool: "Error", args: { raw: textContent } };
      }
      const callId = typeof data.call_id === "string" ? data.call_id : void 0;
      const liveResult = callId && resultMap.has(callId) ? mergeGraphChatToolResultState(
        resultMap.get(callId) ?? createEmptyGraphChatToolResultState()
      ) : void 0;
      return /* @__PURE__ */ jsx15(
        GraphChatToolCall,
        {
          callId,
          toolName: typeof data.tool === "string" ? data.tool : "Unknown",
          status: liveResult ? getGraphChatToolUiStatus(liveResult) : "pending",
          parameters: reconstructGraphChatToolArgs(data.args),
          result: liveResult
        }
      );
    }
    if (language === "tool-result") {
      return null;
    }
    if (["xyz", "extxyz", "cif", "pdb"].includes(language)) {
      const rendered = plugins.renderInlineCode({
        code: textContent,
        isIncomplete: false,
        language
      });
      if (isValidElement(rendered)) {
        return rendered;
      }
    }
    if (isFencedOrBlockCode) {
      const loadedLanguages = highlighter?.getLoadedLanguages?.() ?? [];
      const lang = loadedLanguages.includes(language) ? language : "text";
      const theme = dark ? "ayu-dark" : "ayu-light";
      const id = `${language || "text"}:${textContent.length}:${textContent.slice(
        0,
        32
      )}`;
      let html = "";
      if (highlighter) {
        try {
          html = ensureTransparentShikiBg(
            highlighter.codeToHtml(textContent, { lang, theme })
          );
        } catch {
          html = ensureTransparentShikiBg(
            highlighter.codeToHtml(textContent, { lang: "text", theme })
          );
        }
      }
      return /* @__PURE__ */ jsxs9("div", { className: "thread-graph-code-block not-prose relative my-3 overflow-auto rounded-xl border p-3 text-sm shadow-sm", children: [
        /* @__PURE__ */ jsx15(
          Button,
          {
            type: "button",
            onClick: () => void copyCode(id, textContent),
            variant: "ghost",
            size: "sm",
            className: "thread-graph-code-copy absolute right-2 top-2 z-10 rounded-md p-1.5",
            title: copyState[id] === "copied" ? "Copied" : copyState[id] === "failed" ? "Copy failed" : "Copy",
            "aria-label": "Copy code",
            children: /* @__PURE__ */ jsx15(Copy2, { className: "h-3.5 w-3.5" })
          }
        ),
        html ? /* @__PURE__ */ jsx15("div", { dangerouslySetInnerHTML: { __html: html } }) : /* @__PURE__ */ jsx15("pre", { children: /* @__PURE__ */ jsx15("code", { className: "whitespace-pre", children: textContent }) })
      ] });
    }
    const inlineDisplayText = textFromReactNode(children).replace(/`+/g, "");
    return /* @__PURE__ */ jsx15(
      "code",
      {
        className: `thread-graph-inline-code rounded px-1 py-0.5 font-mono font-normal text-[0.9em] ${codeClassName || ""}`,
        ...props,
        children: inlineDisplayText
      }
    );
  };
  return /* @__PURE__ */ jsx15("div", { ref: rootRef, className: `thread-graph-message-markdown ${className}`, children: /* @__PURE__ */ jsx15(
    ReactMarkdown,
    {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
      components: {
        code: CodeBlockRenderer,
        pre: PreRenderer
      },
      children: processedContent
    }
  ) });
});

// src/components/graph-chat/GraphChatMessageBody.tsx
import { Fragment as Fragment5, jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
var LARGE_MESSAGE_PREVIEW_CHARS = 4e3;
var PLAIN_URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"'`]+/gi;
var TRAILING_URL_PUNCTUATION_PATTERN = /[),.;:!?]+$/;
function normalizeHref(value) {
  return value.startsWith("www.") ? `https://${value}` : value;
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
function GraphChatLinkifiedPlainText({ text }) {
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
      /* @__PURE__ */ jsx16(
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
  return /* @__PURE__ */ jsx16(Fragment5, { children: parts.length > 0 ? parts : text });
}
var GraphChatMarkdownAwareBody = memo2(
  function GraphChatMarkdownAwareBody2({
    text,
    scrollRootRef,
    streaming = false,
    containerClassName = "",
    plainTextClassName = "thread-graph-plain-text whitespace-pre-wrap break-words text-[15px] leading-6",
    markdownClassName = "thread-graph-markdown",
    onBeforeResize
  }) {
    const messageRef = useRef4(null);
    const scrollAnchorRef = useRef4(null);
    const [expanded, setExpanded] = useState6(false);
    const shouldRenderMarkdown = hasLikelyMarkdownSyntax(text);
    const isLargeText = !streaming && text.length > LARGE_MESSAGE_PREVIEW_CHARS;
    const displayText = isLargeText && !expanded ? `${text.slice(0, LARGE_MESSAGE_PREVIEW_CHARS).trimEnd()}

...` : text;
    const [isActivated, setIsActivated] = useState6(
      streaming || typeof IntersectionObserver === "undefined"
    );
    const toggleExpanded = useCallback2(() => {
      const root = scrollRootRef.current;
      const message = messageRef.current;
      const previousTop = message?.getBoundingClientRect().top ?? null;
      onBeforeResize?.();
      scrollAnchorRef.current = root && previousTop !== null ? { root, top: previousTop } : null;
      setExpanded((current) => !current);
    }, [onBeforeResize, scrollRootRef]);
    useLayoutEffect2(() => {
      const anchor = scrollAnchorRef.current;
      const message = messageRef.current;
      if (!anchor || !message) {
        return;
      }
      scrollAnchorRef.current = null;
      const adjustScroll = () => {
        const nextTop = message.getBoundingClientRect().top;
        anchor.root.scrollTop += nextTop - anchor.top;
      };
      adjustScroll();
      const frame = window.requestAnimationFrame(adjustScroll);
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }, [expanded]);
    useEffect7(() => {
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
    return /* @__PURE__ */ jsxs10("div", { ref: messageRef, className: containerClassName, children: [
      isActivated && shouldRenderMarkdown ? /* @__PURE__ */ jsx16(
        GraphChatMessageContent,
        {
          content: displayText,
          className: markdownClassName
        }
      ) : /* @__PURE__ */ jsx16("p", { className: plainTextClassName, children: /* @__PURE__ */ jsx16(GraphChatLinkifiedPlainText, { text: displayText }) }),
      isLargeText ? /* @__PURE__ */ jsx16(
        "button",
        {
          type: "button",
          onClick: toggleExpanded,
          className: "thread-graph-show-more timeline-meta-text mt-1.5 flex w-full items-center justify-center rounded-md border border-[var(--theme-border)] px-2 py-0.5 text-[10px] leading-4 transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
          children: expanded ? "Show less" : `Show more (${text.length.toLocaleString()} chars)`
        }
      ) : null
    ] });
  }
);
var GraphChatAgentMessageBody = memo2(
  function GraphChatAgentMessageBody2({
    text,
    scrollRootRef,
    streaming = false,
    onBeforeResize
  }) {
    return /* @__PURE__ */ jsx16(
      GraphChatMarkdownAwareBody,
      {
        text,
        scrollRootRef,
        streaming,
        containerClassName: "thread-graph-message-prose",
        ...onBeforeResize ? { onBeforeResize } : {}
      }
    );
  }
);
var GraphChatUserMessageBody = memo2(
  function GraphChatUserMessageBody2({
    threadId,
    text,
    getImageAssetUrl
  }) {
    const segments = useMemo6(() => tokenizeUserMessageText(text), [text]);
    return /* @__PURE__ */ jsx16("div", { className: "thread-graph-message-prose whitespace-pre-wrap break-words text-[15px] leading-6", children: segments.map((segment) => {
      if (segment.type === "text") {
        return /* @__PURE__ */ jsx16("span", { children: segment.text }, segment.key);
      }
      if (segment.type === "photo") {
        const imageUrl = threadId ? getImageAssetUrl?.({ threadId, path: segment.path }) ?? null : null;
        const label = basenameFromAssetPath(segment.path) || "Attached image";
        return /* @__PURE__ */ jsx16(
          "span",
          {
            className: "mx-[0.14rem] inline-flex align-middle",
            children: /* @__PURE__ */ jsxs10("span", { className: "inline-flex max-w-full flex-col rounded-[1rem] border border-sky-300/28 bg-sky-300/[0.08] p-1.5 shadow-sm shadow-stone-950/20", children: [
              imageUrl ? /* @__PURE__ */ jsx16(
                "img",
                {
                  src: imageUrl,
                  alt: label,
                  className: "h-[4.5rem] w-[6rem] rounded-[0.75rem] bg-stone-950 object-contain",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsx16("span", { className: "inline-flex h-[4.5rem] w-[6rem] items-center justify-center rounded-[0.75rem] bg-stone-950 text-[10px] text-sky-100", children: "PHOTO" }),
              /* @__PURE__ */ jsx16(
                "span",
                {
                  className: "mt-1 max-w-[7rem] truncate text-[10px] font-medium tracking-[0.08em] text-sky-50",
                  title: segment.path,
                  children: label
                }
              )
            ] })
          },
          segment.key
        );
      }
      const fileName = basenameFromAssetPath(segment.path) || "Attached file";
      return /* @__PURE__ */ jsx16(
        "span",
        {
          className: "mx-[0.14rem] inline-flex align-middle",
          children: /* @__PURE__ */ jsxs10(
            "span",
            {
              className: "inline-flex max-w-[12rem] items-center gap-2 rounded-[0.95rem] border border-emerald-300/28 bg-emerald-300/[0.08] px-2.5 py-2 text-[10px] font-medium tracking-[0.08em] text-emerald-50 shadow-sm shadow-stone-950/20",
              title: segment.path,
              children: [
                /* @__PURE__ */ jsx16("span", { className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200/20 bg-emerald-300/12 text-[9px]", children: "FILE" }),
                /* @__PURE__ */ jsx16("span", { className: "min-w-0 truncate", children: fileName })
              ]
            }
          )
        },
        segment.key
      );
    }) });
  }
);

// src/components/graph-chat/GraphChatHistoryGroupFrame.tsx
import { jsx as jsx17, jsxs as jsxs11 } from "react/jsx-runtime";
function GraphChatHistoryGroupFrame({
  children,
  className,
  count,
  countBadgeClassName,
  desktopIconClassName,
  expanded,
  expandedListClassName,
  icon,
  onToggleExpanded,
  runningIndicator,
  summary,
  toggleAriaLabel,
  trailingSummary
}) {
  return /* @__PURE__ */ jsx17(
    "div",
    {
      className: `thread-graph-history-group ${className} relative min-w-0 w-full overflow-hidden rounded-[0.9rem] border px-3 py-2.5`,
      children: /* @__PURE__ */ jsxs11("div", { className: "flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxs11("div", { className: "thread-graph-history-group-icon mt-0.5 flex shrink-0 items-center", children: [
          /* @__PURE__ */ jsxs11(
            "span",
            {
              className: `relative inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border shadow-sm shadow-stone-950/20 ${desktopIconClassName}`,
              children: [
                icon,
                /* @__PURE__ */ jsx17(
                  "span",
                  {
                    className: `absolute -right-1 -top-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full border bg-stone-950/90 px-1 text-[9px] font-semibold leading-4 ${countBadgeClassName}`,
                    children: count
                  }
                )
              ]
            }
          ),
          runningIndicator
        ] }),
        /* @__PURE__ */ jsxs11("div", { className: "thread-graph-history-group-card min-w-0 flex-1 rounded-[0.85rem] border px-3 py-2", children: [
          /* @__PURE__ */ jsxs11(
            "button",
            {
              type: "button",
              "aria-expanded": expanded,
              "aria-label": toggleAriaLabel,
              onClick: onToggleExpanded,
              className: "thread-graph-history-group-toggle flex w-full min-w-0 items-center justify-between gap-3 text-left",
              children: [
                /* @__PURE__ */ jsx17("div", { className: "thread-graph-history-group-summary min-w-0 flex flex-1 flex-wrap items-center gap-2 pr-1", children: summary }),
                trailingSummary
              ]
            }
          ),
          expanded ? /* @__PURE__ */ jsx17(
            "div",
            {
              className: `thread-graph-history-group-list mt-3 space-y-2 border-t pt-3 ${expandedListClassName}`,
              children
            }
          ) : null
        ] })
      ] })
    }
  );
}

// src/components/graph-ui/Badge.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx18 } from "react/jsx-runtime";
var badgeVariants = cva3(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium outline-none transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  asChild = false,
  className,
  variant,
  ...props
}) {
  const Comp = asChild ? Slot2 : "span";
  return /* @__PURE__ */ jsx18(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant, className })),
      ...props
    }
  );
}

// src/components/graph-chat/GraphChatHistoryItems.tsx
import { Fragment as Fragment6, jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
function isRunningHistoryStatus(status) {
  if (!status) return false;
  const normalized = status.trim().toLowerCase();
  return normalized === "running" || normalized === "in_progress" || normalized === "in progress" || normalized === "pending";
}
function FileChangeIcon() {
  return /* @__PURE__ */ jsxs12(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx19("path", { d: "M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" }),
        /* @__PURE__ */ jsx19("path", { d: "M9 2.75v2h2" }),
        /* @__PURE__ */ jsx19("path", { d: "M6.2 8h3.6" }),
        /* @__PURE__ */ jsx19("path", { d: "M6.2 10h1.7" })
      ]
    }
  );
}
function FileReadIcon() {
  return /* @__PURE__ */ jsxs12(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx19("path", { d: "M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" }),
        /* @__PURE__ */ jsx19("path", { d: "M9 2.75v2h2" }),
        /* @__PURE__ */ jsx19("path", { d: "M6.15 7.25h3.7" }),
        /* @__PURE__ */ jsx19("path", { d: "M6.15 9.25h2.8" }),
        /* @__PURE__ */ jsx19("path", { d: "m10.4 10.7 1.2 1.2" }),
        /* @__PURE__ */ jsx19("circle", { cx: "9.25", cy: "9.55", r: "1.45" })
      ]
    }
  );
}
function CommandBatchIcon() {
  return /* @__PURE__ */ jsxs12(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx19("rect", { x: "2.75", y: "3", width: "8.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx19("rect", { x: "4.25", y: "6.5", width: "8.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx19("rect", { x: "5.75", y: "10", width: "7.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx19("path", { d: "m6.25 4.5 1 1-1 1" }),
        /* @__PURE__ */ jsx19("path", { d: "M7.9 5.5h1.7" }),
        /* @__PURE__ */ jsx19("path", { d: "m7.75 8 1 1-1 1" }),
        /* @__PURE__ */ jsx19("path", { d: "M9.4 9h1.7" })
      ]
    }
  );
}
function SearchBatchIcon() {
  return /* @__PURE__ */ jsxs12(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx19("circle", { cx: "6", cy: "6", r: "2.3" }),
        /* @__PURE__ */ jsx19("path", { d: "m8 8 1.6 1.6" }),
        /* @__PURE__ */ jsx19("circle", { cx: "9.3", cy: "8.8", r: "2" }),
        /* @__PURE__ */ jsx19("path", { d: "m10.75 10.25 1.65 1.65" }),
        /* @__PURE__ */ jsx19("circle", { cx: "11.2", cy: "4.75", r: "1.8" }),
        /* @__PURE__ */ jsx19("path", { d: "m12.45 6 1.1 1.1" })
      ]
    }
  );
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
function RunningDots({
  tone = "amber"
}) {
  const dotClassName = tone === "emerald" ? "bg-sky-200/90" : tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx19("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx19(
    "span",
    {
      className: `h-1.5 w-1.5 animate-pulse rounded-full ${dotClassName}`,
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
function normalizeLines(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  while (lines.length > 1 && lines.at(-1)?.trim() === "") {
    lines.pop();
  }
  return lines;
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
function graphHistoryStatusConfig(status) {
  const normalized = status?.trim().toLowerCase() ?? "";
  if (normalized === "completed" || normalized === "complete" || normalized === "success" || normalized === "succeeded") {
    return {
      className: "is-completed",
      icon: /* @__PURE__ */ jsx19(CheckCircle22, { className: "h-3.5 w-3.5" }),
      label: "Completed"
    };
  }
  if (normalized === "failed" || normalized === "failure" || normalized === "error" || normalized === "errored") {
    return {
      className: "is-failed",
      icon: /* @__PURE__ */ jsx19(XCircle2, { className: "h-3.5 w-3.5" }),
      label: "Failed"
    };
  }
  if (isRunningHistoryStatus(status)) {
    return {
      className: "is-pending",
      icon: /* @__PURE__ */ jsx19(Loader22, { className: "h-3.5 w-3.5 animate-spin" }),
      label: status?.trim() || "Running"
    };
  }
  return {
    className: "is-neutral",
    icon: null,
    label: status?.trim() || "Event"
  };
}
function graphHistoryToneClassName(tone) {
  switch (tone) {
    case "command":
      return "is-command";
    case "tool":
      return "is-tool";
    case "agent":
      return "is-agent";
    case "skill":
      return "is-skill";
    case "search":
      return "is-search";
    case "fileRead":
      return "is-file-read";
  }
}
function graphHistoryEventToneClassName(tone) {
  switch (tone) {
    case "plan":
      return "is-plan";
    case "context":
      return "is-context";
    case "generic":
      return "is-generic";
    case "image":
      return "is-image";
    case "fileChange":
      return "is-file-change";
    case "artifact":
      return "is-artifact";
    case "hook":
      return "is-hook";
  }
}
function GraphChatHistoryEventFrame({
  actions,
  children,
  className,
  headerMeta,
  icon,
  item,
  title,
  tone
}) {
  const statusConfig = graphHistoryStatusConfig(item.status);
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: `thread-graph-event thread-graph-history-event ${graphHistoryEventToneClassName(
        tone
      )} ${className ?? ""}`,
      children: [
        /* @__PURE__ */ jsx19("div", { className: "thread-graph-history-event-icon", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxs12("div", { className: "thread-graph-history-event-card", children: [
          /* @__PURE__ */ jsxs12("div", { className: "thread-graph-history-event-header", children: [
            /* @__PURE__ */ jsxs12("div", { className: "thread-graph-history-event-heading flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-title min-w-0 truncate font-mono text-sm font-semibold", children: title }),
              item.status ? /* @__PURE__ */ jsxs12(
                Badge,
                {
                  variant: "outline",
                  className: `thread-graph-tool-badge ${statusConfig.className} rounded-full px-2 py-0.5 text-xs font-normal`,
                  title: statusConfig.label,
                  "aria-label": `Status: ${statusConfig.label}`,
                  children: [
                    statusConfig.icon,
                    /* @__PURE__ */ jsx19("span", { className: "thread-graph-status-label", children: statusConfig.label })
                  ]
                }
              ) : null,
              headerMeta
            ] }),
            actions ? /* @__PURE__ */ jsx19("div", { className: "thread-graph-history-event-actions", children: actions }) : null
          ] }),
          children ? /* @__PURE__ */ jsx19("div", { className: "thread-graph-history-event-body", children }) : null
        ] })
      ]
    }
  );
}
function GraphChatHistoryToolFrame({
  actionLabel = "Open details",
  actionTitle,
  className,
  details,
  icon,
  item,
  onOpen,
  preview,
  title,
  tone
}) {
  const statusConfig = graphHistoryStatusConfig(item.status);
  const [openItem, setOpenItem] = useState7(
    isRunningHistoryStatus(item.status) ? "item-1" : void 0
  );
  return /* @__PURE__ */ jsx19(
    "div",
    {
      className: `thread-graph-event thread-graph-history-tool ${graphHistoryToneClassName(
        tone
      )} ${className ?? ""}`,
      children: /* @__PURE__ */ jsx19(
        Accordion,
        {
          type: "single",
          collapsible: true,
          onValueChange: (value) => setOpenItem(value || void 0),
          className: "thread-graph-tool-accordion thread-graph-history-tool-accordion w-full overflow-hidden rounded-lg border",
          ...openItem !== void 0 ? { value: openItem } : {},
          children: /* @__PURE__ */ jsxs12(AccordionItem, { value: "item-1", className: "border-0", children: [
            /* @__PURE__ */ jsx19(AccordionTrigger, { className: "thread-graph-tool-trigger thread-graph-history-tool-trigger px-4 py-3 hover:no-underline", children: /* @__PURE__ */ jsxs12("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
              /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-tool-icon shrink-0", children: icon }),
              /* @__PURE__ */ jsx19("span", { className: "min-w-0 truncate font-mono text-sm font-semibold", children: title }),
              /* @__PURE__ */ jsxs12(
                Badge,
                {
                  variant: "outline",
                  className: `thread-graph-tool-badge ${statusConfig.className} ml-1 sm:ml-2 rounded-full px-2 py-0.5 text-xs font-normal`,
                  title: statusConfig.label,
                  "aria-label": `Status: ${statusConfig.label}`,
                  children: [
                    statusConfig.icon,
                    /* @__PURE__ */ jsx19("span", { className: "thread-graph-status-label", children: statusConfig.label })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs12(AccordionContent, { className: "thread-graph-tool-content thread-graph-history-tool-content px-4 pb-4 pt-1", children: [
              /* @__PURE__ */ jsxs12("section", { children: [
                /* @__PURE__ */ jsx19("h4", { children: "Summary" }),
                /* @__PURE__ */ jsxs12("div", { className: "thread-graph-history-tool-summary", children: [
                  /* @__PURE__ */ jsx19(GraphChatLinkifiedPlainText, { text: preview.firstLine }),
                  preview.showGap ? /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-tool-ellipsis", children: "..." }) : null
                ] })
              ] }),
              details ? /* @__PURE__ */ jsx19("section", { children: details }) : null,
              /* @__PURE__ */ jsxs12(
                "button",
                {
                  type: "button",
                  "aria-label": actionLabel,
                  onClick: onOpen,
                  className: "thread-graph-history-tool-open inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition",
                  children: [
                    /* @__PURE__ */ jsx19(ExternalLink, { className: "h-3.5 w-3.5" }),
                    actionTitle
                  ]
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
var GraphChatPlanHistoryItem = memo3(function GraphChatPlanHistoryItem2({
  item,
  scrollRootRef,
  onBeforeResize
}) {
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-plan",
      icon: /* @__PURE__ */ jsx19(ClipboardList, { className: "h-4 w-4" }),
      item,
      title: "plan",
      tone: "plan",
      children: /* @__PURE__ */ jsx19("div", { className: "thread-graph-history-event-prose", children: /* @__PURE__ */ jsx19(
        GraphChatMarkdownAwareBody,
        {
          text: item.text,
          scrollRootRef,
          plainTextClassName: "thread-graph-plain-text whitespace-pre-wrap break-words text-sm leading-6",
          markdownClassName: "thread-graph-markdown text-sm",
          ...onBeforeResize ? { onBeforeResize } : {}
        }
      ) })
    }
  );
});
var GraphChatContextCompactionItem = memo3(
  function GraphChatContextCompactionItem2({
    item
  }) {
    const isRunning = isRunningHistoryStatus(item.status) || item.text === "Compacting context";
    const primaryText = isRunning ? "Compacting context" : "Context compacted";
    const secondaryText = item.detailText && item.detailText !== primaryText ? item.detailText : null;
    return /* @__PURE__ */ jsxs12(
      GraphChatHistoryEventFrame,
      {
        className: "thread-graph-event-context",
        icon: /* @__PURE__ */ jsx19(Archive, { className: "h-4 w-4" }),
        item,
        title: "context",
        tone: "context",
        children: [
          /* @__PURE__ */ jsxs12("div", { className: "thread-graph-history-event-line", children: [
            /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-primary", children: primaryText }),
            isRunning ? /* @__PURE__ */ jsx19(RunningDots, { tone: "emerald" }) : null
          ] }),
          secondaryText ? /* @__PURE__ */ jsx19(
            "p",
            {
              className: "thread-graph-history-event-secondary",
              title: secondaryText,
              children: secondaryText
            }
          ) : null
        ]
      }
    );
  }
);
var GraphChatGenericHistoryItem = memo3(
  function GraphChatGenericHistoryItem2({
    item
  }) {
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryEventFrame,
      {
        className: "thread-graph-event-generic",
        icon: /* @__PURE__ */ jsx19(Info, { className: "h-4 w-4" }),
        item,
        title: item.kind,
        tone: "generic",
        children: /* @__PURE__ */ jsx19("pre", { className: "thread-graph-history-event-pre", children: /* @__PURE__ */ jsx19(GraphChatLinkifiedPlainText, { text: item.text }) })
      }
    );
  }
);
var GraphChatCommandItem = memo3(function GraphChatCommandItem2({
  item,
  onOpen
}) {
  const summary = summarizeInlinePreviewText(item.previewText ?? item.text);
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full command",
      actionTitle: "Command Output",
      className: "thread-graph-event-command",
      icon: /* @__PURE__ */ jsx19(Terminal, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen(item, "Command Output"),
      preview: summary,
      title: "command",
      tone: "command"
    }
  );
});
var GraphChatToolCallItem = memo3(function GraphChatToolCallItem2({
  item,
  onOpen
}) {
  const summary = summarizeInlinePreviewText(item.text);
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full tool call",
      actionTitle: "Tool Call Details",
      className: "thread-graph-event-tool",
      icon: /* @__PURE__ */ jsx19(Wrench2, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen(item, "Tool Call Details"),
      preview: summary,
      title: "tool_call",
      tone: "tool"
    }
  );
});
var GraphChatAgentToolCallItem = memo3(
  function GraphChatAgentToolCallItem2({
    item,
    onOpen
  }) {
    const summary = summarizeInlinePreviewText(item.text);
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryToolFrame,
      {
        actionLabel: "Open agent details",
        actionTitle: "Agent Details",
        className: "thread-graph-event-agent-tool",
        icon: /* @__PURE__ */ jsx19(Bot, { className: "h-4 w-4" }),
        item,
        onOpen: () => onOpen(item, "Agent Details"),
        preview: summary,
        title: "agent",
        tone: "agent"
      }
    );
  }
);
var GraphChatSkillToolCallItem = memo3(
  function GraphChatSkillToolCallItem2({
    item,
    onOpen
  }) {
    const summary = summarizeInlinePreviewText(item.text);
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryToolFrame,
      {
        actionLabel: "Open skill details",
        actionTitle: "Skill Details",
        className: "thread-graph-event-skill-tool",
        icon: /* @__PURE__ */ jsx19(Sparkles, { className: "h-4 w-4" }),
        item,
        onOpen: () => onOpen(item, "Skill Details"),
        preview: summary,
        title: "skill",
        tone: "skill"
      }
    );
  }
);
var GraphChatWebSearchItem = memo3(function GraphChatWebSearchItem2({
  item,
  onOpen
}) {
  const previewText = item.previewText?.trim() || item.text || "Web search";
  const detailText = item.detailText?.trim() || item.text || "Web search";
  const summary = summarizeInlinePreviewText(previewText);
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full web search",
      actionTitle: "Web Search Details",
      className: "thread-graph-event-search",
      icon: /* @__PURE__ */ jsx19(Search, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen("Web Search Details", detailText),
      preview: summary,
      title: "web_search",
      tone: "search"
    }
  );
});
var GraphChatFileReadItem = memo3(function GraphChatFileReadItem2({
  item,
  onOpen
}) {
  const previewText = item.previewText?.trim() || item.text || "File read";
  const detailText = item.detailText?.trim() || item.text || "File read";
  const summary = summarizeInlinePreviewText(previewText);
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full file read",
      actionTitle: "File Read Details",
      className: "thread-graph-event-file-read",
      icon: /* @__PURE__ */ jsx19(FileText, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen("File Read Details", detailText),
      preview: summary,
      title: "file_read",
      tone: "fileRead"
    }
  );
});
var GraphChatImageItem = memo3(function GraphChatImageItem2({
  threadId,
  item,
  onOpen,
  getImageAssetUrl
}) {
  const assetPath = item.assetPath ?? item.detailText ?? null;
  const imageUrl = threadId && assetPath ? getImageAssetUrl?.({ threadId, path: assetPath }) ?? null : null;
  return /* @__PURE__ */ jsxs12(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-image",
      icon: /* @__PURE__ */ jsx19(ImageIconLucide, { className: "h-4 w-4" }),
      item,
      title: "image",
      tone: "image",
      children: [
        imageUrl ? /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            onClick: () => onOpen("Image Path", assetPath ?? item.text),
            className: "block w-full text-left",
            children: /* @__PURE__ */ jsx19(
              "img",
              {
                src: imageUrl,
                alt: item.text || "Image preview",
                className: "thread-graph-history-event-image",
                loading: "lazy"
              }
            )
          }
        ) : /* @__PURE__ */ jsx19("div", { className: "thread-graph-history-event-summary", children: item.text }),
        assetPath ? /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            onClick: () => onOpen("Image Path", assetPath),
            className: "thread-graph-history-event-path",
            title: assetPath,
            children: assetPath
          }
        ) : null
      ]
    }
  );
});
var GraphChatFileChangeItem = memo3(function GraphChatFileChangeItem2({
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
  const summaryContent = /* @__PURE__ */ jsxs12("div", { className: "thread-graph-event-line thread-graph-file-change-inline flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ jsx19(
      "span",
      {
        className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip text-sm",
        title: pathSummary ?? displayedPath,
        children: displayedPath
      }
    ),
    summarySegments.length > 0 && /* @__PURE__ */ jsx19("div", { className: "inline-flex shrink-0 items-center justify-end gap-1.5 text-xs", children: summarySegments.map((segment) => /* @__PURE__ */ jsx19(
      "span",
      {
        className: `thread-graph-history-delta-badge ${segment.startsWith("+") ? "is-add" : segment.startsWith("-") ? "is-remove" : "is-neutral"}`,
        children: segment
      },
      segment
    )) })
  ] });
  const inlineSummary = canOpen ? /* @__PURE__ */ jsx19(
    "button",
    {
      type: "button",
      "aria-label": "Open file change details",
      onClick: () => onOpen("File Change Details", detailText ?? item.text),
      className: "thread-graph-file-change-inline-button min-w-0 flex-1 text-left",
      title: pathSummary ?? displayedPath,
      children: summaryContent
    }
  ) : summaryContent;
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-file-change",
      headerMeta: inlineSummary,
      icon: /* @__PURE__ */ jsx19(FilePenLine, { className: "h-4 w-4" }),
      item,
      title: "file_change",
      tone: "fileChange"
    }
  );
});
var GraphChatArtifactHistoryItem = memo3(
  function GraphChatArtifactHistoryItem2({
    item,
    onSelect
  }) {
    const plugins = usePlugins();
    const [expanded, setExpanded] = useState7(false);
    const artifact = item.artifact;
    const rendered = artifact ? plugins.renderArtifact({
      artifact,
      expanded,
      onToggleExpanded: () => setExpanded((current) => !current)
    }) : null;
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryEventFrame,
      {
        actions: /* @__PURE__ */ jsxs12("span", { className: "inline-flex items-center gap-2", children: [
          artifact && !plugins.hasRendererForArtifact(artifact) ? /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-secondary", children: "No renderer" }) : null,
          artifact && onSelect ? /* @__PURE__ */ jsxs12(
            "button",
            {
              type: "button",
              "aria-label": `Open artifact inspector for ${artifact.title}`,
              onClick: () => onSelect(item, artifact),
              className: "thread-graph-history-event-action",
              children: [
                /* @__PURE__ */ jsx19(PackageOpen, { className: "h-3.5 w-3.5" }),
                "Inspect"
              ]
            }
          ) : null
        ] }),
        className: "thread-graph-event-artifact",
        icon: /* @__PURE__ */ jsx19(PackageOpen, { className: "h-4 w-4" }),
        item,
        title: artifact?.type ?? "artifact",
        tone: "artifact",
        children: rendered ?? /* @__PURE__ */ jsxs12("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs12(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((current) => !current),
              className: "thread-graph-history-event-summary is-clickable flex w-full items-center justify-between gap-3 text-left",
              children: [
                /* @__PURE__ */ jsxs12("span", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-primary block truncate", children: artifact?.title ?? item.text }),
                  /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-secondary mt-1 block truncate", children: artifact?.summaryText ?? item.previewText ?? item.text })
                ] }),
                /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-pill", children: expanded ? "Hide" : "Open" })
              ]
            }
          ),
          expanded ? /* @__PURE__ */ jsx19("pre", { className: "thread-graph-history-event-pre max-h-80 overflow-auto", children: JSON.stringify(artifact?.payload ?? item, null, 2) }) : null
        ] })
      }
    );
  }
);
var GraphChatHookItem = memo3(function GraphChatHookItem2({
  item
}) {
  const outputText = item.hookOutputEntries?.map((entry) => entry.text.trim()).filter(Boolean).join("\n").trim() ?? "";
  const hookLabel = item.hookEventLabel ? `${item.hookEventLabel} hook` : item.text;
  const fallbackText = item.hookStatusMessage?.trim() || (item.previewText && item.previewText !== item.hookStatusMessage ? item.previewText.trim() : "") || item.text.trim();
  const summaryText = outputText || (fallbackText && fallbackText !== hookLabel ? fallbackText : hookLabel);
  const summary = summarizeInlinePreviewText(summaryText);
  const showGap = Boolean(outputText && summary.showGap);
  return /* @__PURE__ */ jsx19(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-hook",
      icon: /* @__PURE__ */ jsx19(Webhook, { className: "h-4 w-4" }),
      item,
      title: item.hookEventLabel ? `${item.hookEventLabel}_hook` : "hook",
      tone: "hook",
      children: /* @__PURE__ */ jsxs12("div", { className: "thread-graph-history-event-line", children: [
        /* @__PURE__ */ jsx19("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: outputText ? /* @__PURE__ */ jsxs12(Fragment6, { children: [
          /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-event-secondary mr-2 font-sans text-[11px] uppercase", children: hookLabel }),
          /* @__PURE__ */ jsx19(GraphChatLinkifiedPlainText, { text: summary.firstLine })
        ] }) : /* @__PURE__ */ jsx19(
          GraphChatLinkifiedPlainText,
          {
            text: summary.firstLine && summary.firstLine !== hookLabel ? `${hookLabel} \xB7 ${summary.firstLine}` : hookLabel
          }
        ) }),
        showGap ? /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
      ] })
    }
  );
});
var GraphChatCommandGroupItem = memo3(
  function GraphChatCommandGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen
  }) {
    const runningCount = items.filter(
      (item) => isRunningHistoryStatus(item.status)
    ).length;
    const countLabel = items.length === 1 ? "1 command" : `${items.length} commands`;
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-command",
        count: items.length,
        countBadgeClassName: "border-amber-200/35 text-amber-100",
        desktopIconClassName: "border-amber-300/30 bg-amber-300/[0.14] text-amber-100",
        expanded,
        expandedListClassName: "border-amber-300/12",
        icon: /* @__PURE__ */ jsx19(CommandBatchIcon, {}),
        onToggleExpanded,
        runningIndicator: runningCount > 0 ? /* @__PURE__ */ jsx19(RunningDots, {}) : null,
        summary: /* @__PURE__ */ jsxs12(Fragment6, { children: [
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-amber-300/28 bg-amber-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-amber-100", children: "Batch" }),
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: countLabel }),
          runningCount > 0 ? /* @__PURE__ */ jsx19("span", { className: "inline-flex items-center text-xs text-amber-100/90", children: /* @__PURE__ */ jsx19(RunningDots, {}) }) : null
        ] }),
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} command entries`,
        children: items.map((item, index) => {
          const summary = summarizeInlinePreviewText(item.text);
          return /* @__PURE__ */ jsxs12(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped command ${index + 1}`,
              onClick: () => onOpen(item, `Command Output ${index + 1}`),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs12("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs12("span", { className: "rounded-full border border-amber-300/18 bg-amber-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-amber-100", children: [
                    "Step ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx19("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        })
      }
    );
  }
);
var GraphChatSearchGroupItem = memo3(
  function GraphChatSearchGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen
  }) {
    const countLabel = items.length === 1 ? "1 search" : `${items.length} searches`;
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-search",
        count: items.length,
        countBadgeClassName: "border-sky-200/35 text-sky-100",
        desktopIconClassName: "border-sky-300/30 bg-sky-300/[0.14] text-sky-100",
        expanded,
        expandedListClassName: "border-sky-300/12",
        icon: /* @__PURE__ */ jsx19(SearchBatchIcon, {}),
        onToggleExpanded,
        summary: /* @__PURE__ */ jsxs12(Fragment6, { children: [
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-sky-300/28 bg-sky-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-sky-100", children: "Batch" }),
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: countLabel })
        ] }),
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} web search entries`,
        children: items.map((item, index) => {
          const previewText = item.previewText?.trim() || item.text || "Web search";
          const summary = summarizeInlinePreviewText(previewText);
          const detailText = item.detailText?.trim() || item.text || "Web search";
          return /* @__PURE__ */ jsxs12(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped web search ${index + 1}`,
              onClick: () => onOpen(`Web Search ${index + 1}`, detailText),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs12("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs12("span", { className: "rounded-full border border-sky-300/18 bg-sky-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-sky-100", children: [
                    "Search ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx19("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        })
      }
    );
  }
);
var GraphChatFileReadGroupItem = memo3(
  function GraphChatFileReadGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen
  }) {
    const countLabel = items.length === 1 ? "1 file read" : `${items.length} file reads`;
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-file-read",
        count: items.length,
        countBadgeClassName: "border-cyan-200/35 text-cyan-100",
        desktopIconClassName: "border-cyan-300/30 bg-cyan-300/[0.14] text-cyan-100",
        expanded,
        expandedListClassName: "border-cyan-300/12",
        icon: /* @__PURE__ */ jsx19(FileReadIcon, {}),
        onToggleExpanded,
        summary: /* @__PURE__ */ jsxs12(Fragment6, { children: [
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-cyan-300/28 bg-cyan-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100", children: "Batch" }),
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: countLabel })
        ] }),
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} file read entries`,
        children: items.map((item, index) => {
          const previewText = item.previewText?.trim() || item.text || "File read";
          const summary = summarizeInlinePreviewText(previewText);
          const detailText = item.detailText?.trim() || item.text || "File read";
          return /* @__PURE__ */ jsxs12(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped file read ${index + 1}`,
              onClick: () => onOpen(`File Read ${index + 1}`, detailText),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs12("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs12("span", { className: "rounded-full border border-cyan-300/18 bg-cyan-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-100", children: [
                    "Read ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs12("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx19("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx19("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        })
      }
    );
  }
);
var GraphChatFileChangeGroupItem = memo3(
  function GraphChatFileChangeGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen
  }) {
    const changedFiles = items.reduce(
      (sum, item) => sum + (item.changedFiles ?? 0),
      0
    );
    const addedLines = items.reduce(
      (sum, item) => sum + (item.addedLines ?? 0),
      0
    );
    const removedLines = items.reduce(
      (sum, item) => sum + (item.removedLines ?? 0),
      0
    );
    const batchLabel = items.length === 1 ? "1 file change" : `${items.length} file changes`;
    return /* @__PURE__ */ jsx19(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-file-change",
        count: items.length,
        countBadgeClassName: "border-lime-200/35 text-lime-100",
        desktopIconClassName: "border-lime-300/30 bg-lime-300/[0.14] text-lime-100",
        expanded,
        expandedListClassName: "border-lime-300/12",
        icon: /* @__PURE__ */ jsx19(FileChangeIcon, {}),
        onToggleExpanded,
        summary: /* @__PURE__ */ jsxs12(Fragment6, { children: [
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-lime-300/28 bg-lime-300/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] text-lime-100", children: "Batch" }),
          /* @__PURE__ */ jsx19("span", { className: "rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-300", children: batchLabel }),
          changedFiles > 0 ? /* @__PURE__ */ jsxs12("span", { className: "thread-graph-history-detail-meta text-xs", children: [
            changedFiles,
            " files"
          ] }) : null
        ] }),
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} file change entries`,
        trailingSummary: /* @__PURE__ */ jsxs12("span", { className: "inline-flex shrink-0 items-center gap-1.5", children: [
          addedLines > 0 ? /* @__PURE__ */ jsxs12("span", { className: "thread-graph-history-delta-badge is-add", children: [
            "+",
            addedLines
          ] }) : null,
          removedLines > 0 ? /* @__PURE__ */ jsxs12("span", { className: "thread-graph-history-delta-badge is-remove", children: [
            "-",
            removedLines
          ] }) : null
        ] }),
        children: items.map((item, index) => {
          const detailText = item.detailText?.trim() || item.previewText?.trim() || item.text;
          const pathSummary = item.previewText?.trim() && item.text.trim() !== item.previewText.trim() ? item.text.trim() : item.previewText?.trim() || item.text;
          return /* @__PURE__ */ jsx19(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped file change ${index + 1}`,
              onClick: () => onOpen(`File Change ${index + 1}`, detailText),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: /* @__PURE__ */ jsxs12("div", { className: "flex min-w-0 items-center gap-2", children: [
                /* @__PURE__ */ jsx19(
                  "span",
                  {
                    className: "thread-graph-history-detail-text min-w-0 flex-1 text-sm leading-6",
                    title: pathSummary,
                    children: formatTrailingPathLabel(pathSummary, 34)
                  }
                ),
                /* @__PURE__ */ jsxs12("span", { className: "inline-flex shrink-0 items-center gap-1.5", children: [
                  (item.addedLines ?? 0) > 0 ? /* @__PURE__ */ jsxs12("span", { className: "thread-graph-history-delta-badge is-add", children: [
                    "+",
                    item.addedLines
                  ] }) : null,
                  (item.removedLines ?? 0) > 0 ? /* @__PURE__ */ jsxs12("span", { className: "thread-graph-history-delta-badge is-remove", children: [
                    "-",
                    item.removedLines
                  ] }) : null
                ] })
              ] })
            },
            item.id
          );
        })
      }
    );
  }
);

// src/components/graph-chat/GraphChatCompactMessageItem.tsx
import { memo as memo4, useEffect as useEffect8, useRef as useRef5, useState as useState8 } from "react";
import { Brain, Copy as Copy3 } from "lucide-react";

// src/components/graph-chat/GraphChatMessageFrame.tsx
import { CheckCircle2 as CheckCircle23, Circle, Loader2 as Loader23, XCircle as XCircle3 } from "lucide-react";
import { jsx as jsx20, jsxs as jsxs13 } from "react/jsx-runtime";
function GraphChatRunningDots() {
  return /* @__PURE__ */ jsx20("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx20(
    "span",
    {
      className: "h-1.5 w-1.5 animate-pulse rounded-full bg-sky-200/90",
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
function GraphChatMessageStatusBadge({
  status
}) {
  if (!status) {
    return null;
  }
  const normalized = status.toLowerCase();
  const isRunning = normalized.includes("running") || normalized.includes("generating") || normalized.includes("steering");
  const isFailed = normalized.includes("failed") || normalized.includes("error");
  const isCompleted = normalized.includes("accepted") || normalized.includes("complete");
  const className = isRunning ? "ui-status-warning" : isFailed ? "ui-status-danger" : isCompleted ? "ui-status-success" : "ui-status-neutral";
  const icon = isRunning ? /* @__PURE__ */ jsx20(Loader23, { className: "h-3.5 w-3.5 animate-spin" }) : isFailed ? /* @__PURE__ */ jsx20(XCircle3, { className: "h-3.5 w-3.5" }) : isCompleted ? /* @__PURE__ */ jsx20(CheckCircle23, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx20(Circle, { className: "h-3.5 w-3.5" });
  return /* @__PURE__ */ jsxs13(
    "span",
    {
      className: `thread-graph-message-status inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-normal ${className}`,
      title: status,
      "aria-label": `Status: ${status}`,
      children: [
        /* @__PURE__ */ jsx20("span", { className: "thread-graph-message-status-icon inline-flex shrink-0", children: isRunning ? /* @__PURE__ */ jsx20(GraphChatRunningDots, {}) : icon }),
        /* @__PURE__ */ jsx20("span", { className: "thread-graph-status-label", children: status })
      ]
    }
  );
}
function GraphChatMessageFrame({
  children,
  copyButton,
  kind,
  reasoning,
  status,
  timeLabel,
  timeTitle
}) {
  const isUser = kind === "userMessage";
  const timeNode = timeLabel ? /* @__PURE__ */ jsx20(
    "time",
    {
      dateTime: timeTitle ?? void 0,
      title: timeTitle ?? void 0,
      className: "thread-graph-message-time text-[10px] leading-none sm:text-[11px]",
      children: timeLabel
    }
  ) : null;
  return /* @__PURE__ */ jsx20(
    "div",
    {
      "data-testid": "chat-message",
      "data-role": isUser ? "user" : "assistant",
      className: "thread-graph-message flex justify-start",
      children: /* @__PURE__ */ jsxs13(
        "div",
        {
          className: `thread-graph-message-bubble min-w-0 w-full max-w-full ${isUser ? "is-user" : "is-assistant"}`,
          children: [
            !isUser ? /* @__PURE__ */ jsxs13("div", { className: "thread-graph-message-header mb-2 flex min-w-0 items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxs13("div", { className: "flex min-w-0 items-center gap-1.5", children: [
                /* @__PURE__ */ jsx20("span", { className: "thread-graph-message-sender rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.02em]", children: "Assistant" }),
                /* @__PURE__ */ jsx20(GraphChatMessageStatusBadge, { status: status ?? "Complete" })
              ] }),
              copyButton || timeNode ? /* @__PURE__ */ jsxs13("div", { className: "thread-graph-message-header-actions flex shrink-0 items-center gap-1.5 sm:gap-2", children: [
                copyButton,
                timeNode
              ] }) : null
            ] }) : null,
            reasoning,
            /* @__PURE__ */ jsx20(
              "div",
              {
                className: `thread-graph-message-content min-w-0 ${isUser ? "is-user" : "is-assistant"}`,
                children
              }
            ),
            isUser && (status || timeNode) ? /* @__PURE__ */ jsxs13("div", { className: "mt-1 flex items-center justify-end gap-2", children: [
              status ? /* @__PURE__ */ jsx20(GraphChatMessageStatusBadge, { status }) : null,
              timeNode
            ] }) : null
          ]
        }
      )
    }
  );
}

// src/components/graph-chat/GraphChatCompactMessageItem.tsx
import { jsx as jsx21, jsxs as jsxs14 } from "react/jsx-runtime";
function isGraphChatRunningStatus(status) {
  if (!status) {
    return false;
  }
  const normalized = status.toLowerCase();
  return normalized.includes("running") || normalized.includes("inprogress") || normalized.includes("in_progress");
}
function GraphChatRunningDots2({
  tone = "amber"
}) {
  const dotClassName = tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx21("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx21(
    "span",
    {
      className: `h-1.5 w-1.5 animate-pulse rounded-full ${dotClassName}`,
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
var GraphChatCompactMessageItem = memo4(
  function GraphChatCompactMessageItem2({
    threadId,
    item,
    scrollRootRef,
    streaming = false,
    adapter,
    timeLabel,
    timeTitle,
    onBeforeMessageResize
  }) {
    const [copyState, setCopyState] = useState8(
      "idle"
    );
    const [reasoningOpen, setReasoningOpen] = useState8(false);
    const resetTimerRef = useRef5(null);
    const reasoningItems = item.kind === "agentMessage" ? item.reasoningItems ?? [] : [];
    const reasoningText = reasoningItems.map((entry) => entry.text.trim()).filter(Boolean).join("\n\n");
    const queuedLikeStatus = item.kind === "userMessage" && (item.status === "Steering" || item.status === "Accepted" || item.status === "Awaiting response");
    useEffect8(() => {
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
    const copyButton = item.kind === "agentMessage" ? /* @__PURE__ */ jsx21(
      "button",
      {
        type: "button",
        "aria-label": "Copy agent reply",
        title: copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy agent reply",
        onClick: () => void handleCopy(),
        className: `thread-graph-message-copy inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition ${copyState === "copied" ? "ui-status-info" : copyState === "failed" ? "ui-status-danger" : ""}`,
        children: /* @__PURE__ */ jsx21(Copy3, { className: "h-3.5 w-3.5" })
      }
    ) : null;
    const reasoning = item.kind === "agentMessage" && reasoningText ? /* @__PURE__ */ jsx21("div", { className: "thread-graph-message-thinking mb-3 mt-2", children: /* @__PURE__ */ jsx21(
      Accordion,
      {
        type: "single",
        collapsible: true,
        className: "thread-graph-thinking-accordion w-full border-none",
        onValueChange: (value) => setReasoningOpen(Boolean(value)),
        ...reasoningOpen ? { value: "thoughts" } : {},
        children: /* @__PURE__ */ jsxs14(AccordionItem, { value: "thoughts", className: "border-b-0", children: [
          /* @__PURE__ */ jsx21(AccordionTrigger, { className: "thread-graph-thinking-trigger py-2 hover:no-underline", children: /* @__PURE__ */ jsxs14("div", { className: "thread-graph-thinking-label flex items-center gap-2 text-sm font-medium transition-colors", children: [
            /* @__PURE__ */ jsx21(
              Brain,
              {
                className: `h-4 w-4 ${reasoningItems.some(
                  (entry) => isGraphChatRunningStatus(entry.status)
                ) ? "animate-pulse" : ""}`
              }
            ),
            /* @__PURE__ */ jsx21("span", { children: reasoningItems.some(
              (entry) => isGraphChatRunningStatus(entry.status)
            ) ? "Thinking..." : "Thought Process" }),
            reasoningItems.some(
              (entry) => isGraphChatRunningStatus(entry.status)
            ) ? /* @__PURE__ */ jsx21(GraphChatRunningDots2, { tone: "sky" }) : null
          ] }) }),
          /* @__PURE__ */ jsx21(AccordionContent, { className: "thread-graph-thinking-content pb-0", children: /* @__PURE__ */ jsx21("pre", { className: "thread-graph-thinking-body my-1 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl border p-3 text-[12px] leading-5", children: /* @__PURE__ */ jsx21(GraphChatLinkifiedPlainText, { text: reasoningText }) }) })
        ] })
      }
    ) }) : null;
    return /* @__PURE__ */ jsx21(
      GraphChatMessageFrame,
      {
        kind: item.kind,
        status: queuedLikeStatus ? item.status : item.kind === "agentMessage" ? item.status : null,
        copyButton,
        reasoning,
        timeLabel,
        timeTitle,
        children: item.kind === "agentMessage" ? /* @__PURE__ */ jsx21(
          GraphChatAgentMessageBody,
          {
            text: item.text,
            scrollRootRef,
            streaming,
            ...onBeforeMessageResize ? { onBeforeResize: onBeforeMessageResize } : {}
          }
        ) : /* @__PURE__ */ jsx21(
          GraphChatUserMessageBody,
          {
            threadId,
            text: item.text,
            getImageAssetUrl: adapter?.getImageAssetUrl
          }
        )
      }
    );
  }
);

// src/components/graph-chat/GraphChatTurnBody.tsx
import { CheckCircle2 as CheckCircle24, Clock3, Loader2 as Loader24, XCircle as XCircle4 } from "lucide-react";
import { Fragment as Fragment7, jsx as jsx22, jsxs as jsxs15 } from "react/jsx-runtime";
function normalizeGraphChatPlanStepStatus(status) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "completed" || normalized === "done" || normalized === "complete") {
    return "completed";
  }
  if (normalized === "in_progress" || normalized === "in-progress" || normalized === "running" || normalized === "active") {
    return "in_progress";
  }
  if (normalized === "failed" || normalized === "error" || normalized === "cancelled") {
    return "failed";
  }
  if (normalized === "pending" || normalized === "todo") {
    return "pending";
  }
  return "unknown";
}
function GraphChatPlanStepStatusIcon({ status }) {
  const normalized = normalizeGraphChatPlanStepStatus(status);
  const label = normalized === "completed" ? "Plan step status: Completed" : normalized === "in_progress" ? "Plan step status: In progress" : normalized === "pending" ? "Plan step status: Pending" : normalized === "failed" ? "Plan step status: Failed" : `Plan step status: ${status}`;
  const badgeClassName = normalized === "completed" ? "thread-graph-plan-status is-completed" : normalized === "in_progress" ? "thread-graph-plan-status is-running" : normalized === "pending" ? "thread-graph-plan-status is-pending" : normalized === "failed" ? "thread-graph-plan-status is-failed" : "thread-graph-plan-status is-unknown";
  return /* @__PURE__ */ jsx22(
    Badge,
    {
      "aria-label": label,
      title: label.replace("Plan step status: ", ""),
      className: badgeClassName,
      children: normalized === "completed" ? /* @__PURE__ */ jsx22(CheckCircle24, { className: "h-3.5 w-3.5" }) : normalized === "in_progress" ? /* @__PURE__ */ jsx22(Loader24, { className: "h-3.5 w-3.5 animate-spin" }) : normalized === "pending" ? /* @__PURE__ */ jsx22(Clock3, { className: "h-3.5 w-3.5" }) : normalized === "failed" ? /* @__PURE__ */ jsx22(XCircle4, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx22("span", { className: "text-[10px] font-semibold uppercase tracking-[0.14em]", children: "?" })
    }
  );
}
function GraphChatLivePlanCard({ livePlan }) {
  return /* @__PURE__ */ jsxs15("div", { className: "thread-graph-plan-card rounded-xl border px-3 py-3", children: [
    /* @__PURE__ */ jsxs15("div", { className: "thread-graph-plan-header flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx22("p", { className: "text-sm font-semibold", children: "Plan update" }),
      /* @__PURE__ */ jsx22(Badge, { className: "thread-graph-plan-badge", children: "Live" })
    ] }),
    livePlan.explanation ? /* @__PURE__ */ jsx22("p", { className: "thread-graph-plan-explanation mt-3 text-sm", children: livePlan.explanation }) : null,
    /* @__PURE__ */ jsx22("div", { className: "mt-3 space-y-2", children: livePlan.plan.map((step, index) => /* @__PURE__ */ jsxs15(
      "div",
      {
        className: "thread-graph-plan-step flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm",
        children: [
          /* @__PURE__ */ jsx22("span", { className: "thread-graph-plan-step-text min-w-0 flex-1", children: step.step }),
          /* @__PURE__ */ jsx22(GraphChatPlanStepStatusIcon, { status: step.status })
        ]
      },
      `${livePlan.turnId}-${index}`
    )) })
  ] });
}
function GraphChatTurnBody({
  footer,
  history,
  liveHookPrompt,
  liveOutput,
  livePlan
}) {
  return /* @__PURE__ */ jsxs15(Fragment7, { children: [
    history,
    livePlan ? /* @__PURE__ */ jsx22(GraphChatLivePlanCard, { livePlan }) : null,
    liveHookPrompt ?? liveOutput ?? null,
    footer
  ] });
}

// src/components/graph-chat/GraphChatTurnFrame.tsx
import { jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
function GraphChatTurnFrame({
  absoluteIndex,
  body,
  collapsed,
  error,
  footer,
  headerStatus,
  isActive = false,
  onToggleCollapse,
  refCallback,
  startedAt,
  timeLabel,
  timeTitle,
  tokenSummary
}) {
  return /* @__PURE__ */ jsxs16(
    "article",
    {
      ref: refCallback,
      "data-testid": "chat-turn",
      "data-turn-active": isActive ? "true" : "false",
      className: "thread-graph-turn px-3 py-2 sm:px-5 sm:py-3",
      children: [
        /* @__PURE__ */ jsxs16("div", { className: "thread-graph-turn-header flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs16("div", { className: "min-w-0 flex flex-1 items-start gap-1.5", children: [
            /* @__PURE__ */ jsxs16("div", { className: "min-w-0 flex flex-1 items-center gap-1.5 overflow-hidden", children: [
              /* @__PURE__ */ jsxs16("span", { className: "thread-graph-turn-index rounded-[0.6rem] border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em]", children: [
                "Turn ",
                absoluteIndex
              ] }),
              /* @__PURE__ */ jsx23(
                "time",
                {
                  dateTime: startedAt ?? void 0,
                  title: timeTitle,
                  className: "thread-graph-turn-time shrink-0 text-[10px] sm:text-[11px]",
                  children: timeLabel
                }
              ),
              headerStatus,
              error ? /* @__PURE__ */ jsx23("p", { className: "hidden truncate text-[11px] text-rose-200 sm:block", children: error }) : null
            ] }),
            tokenSummary
          ] }),
          /* @__PURE__ */ jsx23(
            "button",
            {
              type: "button",
              "aria-label": `${collapsed ? "Expand" : "Collapse"} turn ${absoluteIndex}`,
              title: collapsed ? "Expand turn" : "Collapse turn",
              onClick: onToggleCollapse,
              className: "thread-graph-turn-collapse inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition",
              children: /* @__PURE__ */ jsx23(
                "svg",
                {
                  "aria-hidden": "true",
                  viewBox: "0 0 16 16",
                  className: "h-3.5 w-3.5 fill-none stroke-current",
                  strokeWidth: "1.6",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: collapsed ? /* @__PURE__ */ jsx23("path", { d: "m4.5 10 3.5-3.5L11.5 10" }) : /* @__PURE__ */ jsx23("path", { d: "m4.5 6 3.5 3.5L11.5 6" })
                }
              )
            }
          )
        ] }),
        error ? /* @__PURE__ */ jsx23("p", { className: "mt-1 text-[11px] text-rose-200 sm:hidden", children: error }) : null,
        !collapsed ? /* @__PURE__ */ jsxs16("div", { className: "thread-graph-turn-body mt-2 space-y-2", children: [
          body,
          footer
        ] }) : null
      ]
    }
  );
}

// src/components/ThreadTimeline.tsx
import { Fragment as Fragment8, jsx as jsx24, jsxs as jsxs17 } from "react/jsx-runtime";
var INITIAL_VISIBLE_TURNS = 10;
var LOAD_STEP = 10;
var FOLLOW_TAIL_THRESHOLD_PX = 80;
function useChangeRevision(inputs) {
  const previousInputsRef = useRef6(null);
  const revisionRef = useRef6(0);
  const previousInputs = previousInputsRef.current;
  const changed = previousInputs === null || previousInputs.length !== inputs.length || inputs.some((input, index) => !Object.is(input, previousInputs[index]));
  if (changed) {
    revisionRef.current += 1;
    previousInputsRef.current = inputs;
  }
  return revisionRef.current;
}
function decodeXmlEntities(value) {
  return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
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
function isRunningHistoryStatus2(status) {
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
function RunningDots2({
  tone = "amber"
}) {
  const dotClassName = tone === "emerald" ? "bg-sky-200/90" : tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx24("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx24(
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
      return !isRunningHistoryStatus2(item.status);
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
function TurnStatusIndicator({
  status
}) {
  const label = turnStatusLabel(status);
  if (status === "completed") {
    return /* @__PURE__ */ jsx24(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-success inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx24(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx24("path", { d: "m3.75 8.25 2.5 2.5 6-6" })
          }
        )
      }
    );
  }
  if (status === "failed") {
    return /* @__PURE__ */ jsx24(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-failed inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx24(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx24("path", { d: "m5 5 6 6M11 5l-6 6" })
          }
        )
      }
    );
  }
  if (status === "interrupted") {
    return /* @__PURE__ */ jsx24(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-warning inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx24(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx24("path", { d: "M6 4.5v7M10 4.5v7" })
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx24(
    "span",
    {
      "aria-label": label,
      title: label,
      className: "inline-flex min-w-[1.25rem] items-center justify-center text-sky-200",
      children: /* @__PURE__ */ jsx24(RunningDots2, { tone: "emerald" })
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
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        className: `flex w-full flex-col gap-1.5 rounded-[0.95rem] border px-3 py-2 text-xs ${toneClassName}`,
        children: [
          /* @__PURE__ */ jsxs17("div", { className: "flex w-full items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs17("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx24(TurnStatusIndicator, { status: turn.status }),
              /* @__PURE__ */ jsx24("span", { className: "timeline-soft-text min-w-0 truncate", children: runtimeSummary })
            ] }),
            turn.startedAt && /* @__PURE__ */ jsx24(
              "time",
              {
                dateTime: turn.startedAt,
                title: formatLongTimestamp(turn.startedAt),
                className: "timeline-meta-text shrink-0 text-[11px]",
                children: formatShortTimestamp(turn.startedAt)
              }
            )
          ] }),
          (priceBadge || tokenBadges.length > 0) && /* @__PURE__ */ jsxs17("div", { className: "flex flex-wrap items-center gap-1.5 pl-6", children: [
            priceBadge ? /* @__PURE__ */ jsx24(
              "span",
              {
                className: `inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${priceBadge.className}`,
                title: priceBadge.title,
                children: priceBadge.label
              }
            ) : null,
            tokenBadges.map((badge) => /* @__PURE__ */ jsxs17(
              "span",
              {
                className: `inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${badge.className}`,
                title: badge.title,
                children: [
                  badge.icon ? /* @__PURE__ */ jsx24("span", { className: "mr-1", children: badge.icon }) : null,
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
  return /* @__PURE__ */ jsxs17(
    "span",
    {
      className: `inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] sm:text-[11px] ${toneClassName}`,
      title,
      children: [
        /* @__PURE__ */ jsx24(TurnStatusIndicator, { status: turn.status }),
        /* @__PURE__ */ jsx24("span", { className: "timeline-meta-text min-w-0 truncate", children: runtimeSummary })
      ]
    }
  );
}
function TokenInIcon() {
  return /* @__PURE__ */ jsxs17(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx24("path", { d: "M8 2.75v8" }),
        /* @__PURE__ */ jsx24("path", { d: "m4.75 7.5 3.25 3.25L11.25 7.5" })
      ]
    }
  );
}
function TokenOutIcon() {
  return /* @__PURE__ */ jsxs17(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx24("path", { d: "M8 13.25v-8" }),
        /* @__PURE__ */ jsx24("path", { d: "m11.25 8.5-3.25-3.25L4.75 8.5" })
      ]
    }
  );
}
function TokenCacheIcon() {
  return /* @__PURE__ */ jsxs17(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx24("path", { d: "M3.25 5.25 8 2.75l4.75 2.5L8 7.75l-4.75-2.5Z" }),
        /* @__PURE__ */ jsx24("path", { d: "M3.25 8 8 10.5 12.75 8" }),
        /* @__PURE__ */ jsx24("path", { d: "M3.25 10.75 8 13.25l4.75-2.5" }),
        /* @__PURE__ */ jsx24("path", { d: "M3.25 5.25v5.5" }),
        /* @__PURE__ */ jsx24("path", { d: "M12.75 5.25v5.5" })
      ]
    }
  );
}
function TokenReasonIcon() {
  return /* @__PURE__ */ jsxs17(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx24("path", { d: "M6.2 3.2a2.3 2.3 0 0 0-2.95 3.5A2.4 2.4 0 0 0 4.5 11h.2c.25 1.1 1.1 1.8 2.3 1.8h1.8c1.2 0 2.05-.7 2.3-1.8h.2A2.4 2.4 0 0 0 12.75 6.7 2.3 2.3 0 0 0 9.8 3.2" }),
        /* @__PURE__ */ jsx24("path", { d: "M6.3 6.15c.45-.42 1.02-.65 1.7-.65s1.25.23 1.7.65" }),
        /* @__PURE__ */ jsx24("path", { d: "M8 5.5v4.75" }),
        /* @__PURE__ */ jsx24("path", { d: "M6.75 9.05 8 10.25l1.25-1.2" })
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
      icon: /* @__PURE__ */ jsx24(TokenInIcon, {})
    } : null,
    cachedInputTokens > 0 ? {
      id: "cache",
      label: "Cached input",
      tokenCompactValue: formatCompactTokenCount(cachedInputTokens),
      tokenRawValue: cachedInputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(turn.priceEstimate.cachedInputUsd) : "--",
      usdRawValue: turn.priceEstimate?.cachedInputUsd ?? null,
      className: "token-badge-cache",
      icon: /* @__PURE__ */ jsx24(TokenCacheIcon, {})
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
      icon: /* @__PURE__ */ jsx24(TokenOutIcon, {})
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
      icon: /* @__PURE__ */ jsx24(TokenReasonIcon, {})
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
  const [isMobileOpen, setIsMobileOpen] = useState9(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState9(false);
  const [mobilePopoverShift, setMobilePopoverShift] = useState9(0);
  const containerRef = useRef6(null);
  const desktopPriceRef = useRef6(null);
  const mobilePopoverRef = useRef6(null);
  useLayoutEffect3(() => {
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
  useEffect9(() => {
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
  const renderBreakdownPopover = () => /* @__PURE__ */ jsx24("div", { className: "thread-token-popover min-w-[12rem] rounded-2xl border p-2.5 shadow-2xl shadow-black/20 backdrop-blur", children: /* @__PURE__ */ jsx24("div", { className: "space-y-1", children: details.map((detail) => /* @__PURE__ */ jsxs17(
    "div",
    {
      className: "thread-token-popover-row flex items-center justify-between gap-3 rounded-xl border px-2.5 py-1.5 text-[11px]",
      title: `${detail.label}: ${detail.tokenRawValue} tokens`,
      children: [
        /* @__PURE__ */ jsxs17("span", { className: "thread-token-popover-text inline-flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsx24("span", { className: "inline-flex shrink-0", children: detail.icon }),
          /* @__PURE__ */ jsx24("span", { className: "thread-token-popover-strong font-medium", children: detail.usdCompactValue })
        ] }),
        /* @__PURE__ */ jsx24("span", { className: "thread-token-popover-text shrink-0 font-medium", children: detail.tokenCompactValue })
      ]
    },
    detail.id
  )) }) });
  return /* @__PURE__ */ jsxs17(Fragment8, { children: [
    /* @__PURE__ */ jsxs17(
      "div",
      {
        className: "hidden shrink-0 items-center gap-1.5 md:inline-flex",
        children: [
          priceBadge ? /* @__PURE__ */ jsxs17(
            "div",
            {
              ref: desktopPriceRef,
              className: "relative shrink-0",
              onMouseEnter: () => setIsDesktopOpen(true),
              onMouseLeave: () => setIsDesktopOpen(false),
              children: [
                /* @__PURE__ */ jsx24(
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
                isDesktopOpen && details.length > 0 ? /* @__PURE__ */ jsx24("div", { className: "absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2", children: renderBreakdownPopover() }) : null
              ]
            }
          ) : null,
          details.map((detail) => /* @__PURE__ */ jsxs17(
            "span",
            {
              className: `${TURN_HEADER_BADGE_CLASS_NAME} ${detail.className}`,
              title: `${detail.label}: ${detail.usdCompactValue}, ${detail.tokenRawValue} tokens`,
              children: [
                detail.icon,
                /* @__PURE__ */ jsx24("span", { className: "thread-token-badge-value font-medium", children: detail.tokenCompactValue })
              ]
            },
            detail.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxs17("div", { ref: containerRef, className: "relative shrink-0 md:hidden", children: [
      priceBadge ? /* @__PURE__ */ jsx24(
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
      isMobileOpen && details.length > 0 ? /* @__PURE__ */ jsx24(
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
function inferTurnStartedAtFromItems(items) {
  const createdAt = items.map((item) => {
    const value = item.createdAt;
    return typeof value === "string" && value.trim() ? value : null;
  }).filter((value) => Boolean(value)).sort();
  return createdAt[0] ?? null;
}
function buildSyntheticLiveTurn(turnId, items) {
  return {
    id: turnId,
    startedAt: inferTurnStartedAtFromItems(items),
    status: "inProgress",
    error: null,
    model: null,
    reasoningEffort: null,
    reasoningEffortAvailable: null,
    tokenUsage: null,
    priceEstimate: null,
    items: []
  };
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
var HistoryItemRow = memo5(function HistoryItemRow2({
  threadId,
  item,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  timeLabel,
  timeTitle
}) {
  if (isCompactChatItem(item.kind)) {
    return /* @__PURE__ */ jsx24(
      GraphChatCompactMessageItem,
      {
        threadId,
        item,
        scrollRootRef,
        timeLabel,
        timeTitle,
        ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
        ...adapter ? { adapter } : {}
      }
    );
  }
  if (item.kind === "artifact") {
    return /* @__PURE__ */ jsx24(
      GraphChatArtifactHistoryItem,
      {
        item,
        ...onSelectArtifact ? {
          onSelect: (nextItem, artifact) => onSelectArtifact({ item: nextItem, artifact })
        } : {}
      }
    );
  }
  if (item.kind === "commandExecution") {
    return /* @__PURE__ */ jsx24(
      GraphChatCommandItem,
      {
        item,
        onOpen: onOpenCommandDetail
      }
    );
  }
  if (item.kind === "toolCall") {
    return /* @__PURE__ */ jsx24(
      GraphChatToolCallItem,
      {
        item,
        onOpen: onOpenToolCallDetail
      }
    );
  }
  if (item.kind === "agentToolCall") {
    return /* @__PURE__ */ jsx24(
      GraphChatAgentToolCallItem,
      {
        item,
        onOpen: onOpenToolCallDetail
      }
    );
  }
  if (item.kind === "skillToolCall") {
    return /* @__PURE__ */ jsx24(
      GraphChatSkillToolCallItem,
      {
        item,
        onOpen: onOpenToolCallDetail
      }
    );
  }
  if (item.kind === "webSearch") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "Web search";
    return /* @__PURE__ */ jsx24(
      GraphChatWebSearchItem,
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
    return /* @__PURE__ */ jsx24(
      GraphChatFileReadItem,
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
    return /* @__PURE__ */ jsx24(
      GraphChatImageItem,
      {
        threadId,
        item,
        onOpen: onOpenExpandedText,
        getImageAssetUrl: adapter?.getImageAssetUrl
      }
    );
  }
  if (item.kind === "plan") {
    return /* @__PURE__ */ jsx24(
      GraphChatPlanHistoryItem,
      {
        item,
        scrollRootRef,
        ...onBeforeMessageResize ? { onBeforeResize: onBeforeMessageResize } : {}
      }
    );
  }
  if (item.kind === "fileChange") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "File change";
    return /* @__PURE__ */ jsx24(
      GraphChatFileChangeItem,
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
    return /* @__PURE__ */ jsx24(
      GraphChatContextCompactionItem,
      {
        item
      }
    );
  }
  if (item.kind === "hook") {
    return /* @__PURE__ */ jsx24(
      GraphChatHookItem,
      {
        item
      }
    );
  }
  return /* @__PURE__ */ jsx24(GraphChatGenericHistoryItem, { item });
});
function PendingRequestCard({
  request,
  busy = false,
  onRespond
}) {
  const [answers, setAnswers] = useState9({});
  const [customAnswers, setCustomAnswers] = useState9({});
  const [selectedPlanDecision, setSelectedPlanDecision] = useState9(null);
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
  return /* @__PURE__ */ jsxs17("div", { className: "timeline-pending-card w-full rounded-[1rem] border px-3 py-3 sm:rounded-[1.2rem] sm:px-4", children: [
    /* @__PURE__ */ jsx24("div", { className: "flex items-center justify-between gap-3", children: /* @__PURE__ */ jsxs17("div", { children: [
      /* @__PURE__ */ jsx24("p", { className: "timeline-primary-text text-sm font-medium", children: cardTitle }),
      request.kind !== "planDecision" && request.description && /* @__PURE__ */ jsx24("p", { className: "timeline-soft-text mt-1 text-[13px] leading-5", children: request.description })
    ] }) }),
    /* @__PURE__ */ jsx24("div", { className: "mt-3 space-y-3", children: request.questions.map((question) => /* @__PURE__ */ jsxs17(
      "div",
      {
        className: "timeline-question-section rounded-xl border p-2.5 sm:p-3",
        children: [
          /* @__PURE__ */ jsx24("p", { className: "timeline-meta-text text-xs uppercase tracking-[0.2em]", children: question.header }),
          /* @__PURE__ */ jsx24("p", { className: "timeline-primary-text mt-1 text-[13px] leading-5 sm:text-sm", children: question.question }),
          request.kind === "planDecision" && question.options && question.options.length > 0 ? /* @__PURE__ */ jsx24("div", { className: "mt-3 flex flex-wrap gap-2", children: question.options.map((option, index) => {
            const presentation = getOptionPresentation(option.label);
            const isImplement = presentation.displayLabel.toLowerCase() === "implement";
            return /* @__PURE__ */ jsxs17(
              "button",
              {
                type: "button",
                disabled: busy,
                onClick: () => respondWithSingleAnswer(option.label),
                className: `relative rounded-2xl border px-2.5 py-1.5 pr-6 text-[12px] leading-4 transition sm:text-[13px] ${index === 0 ? "ui-action-info" : "border-stone-700 text-stone-200 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                title: option.description,
                children: [
                  presentation.recommended ? /* @__PURE__ */ jsx24(
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
          }) }) : question.options && question.options.length > 0 ? /* @__PURE__ */ jsxs17(Fragment8, { children: [
            /* @__PURE__ */ jsxs17("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              question.options.map((option) => {
                const presentation = getOptionPresentation(option.label);
                const selectedAnswer = answers[question.id];
                return /* @__PURE__ */ jsxs17(
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
                      presentation.recommended ? /* @__PURE__ */ jsx24(
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
                return /* @__PURE__ */ jsx24(
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
              return showOtherInput ? /* @__PURE__ */ jsx24(
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
          ] }) : /* @__PURE__ */ jsx24(
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
    request.kind !== "planDecision" && /* @__PURE__ */ jsx24("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsx24(
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
  return /* @__PURE__ */ jsxs17("div", { className: "timeline-note-card w-full rounded-2xl border px-3 py-2.5", children: [
    /* @__PURE__ */ jsx24("p", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: note.title }),
    /* @__PURE__ */ jsx24("div", { className: "mt-1 space-y-1", children: note.summaryLines.map((line, index) => /* @__PURE__ */ jsxs17(
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
  return /* @__PURE__ */ jsxs17("div", { className: "timeline-activity-card w-full rounded-2xl border px-3 py-2.5", children: [
    /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx24("p", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: title }),
      /* @__PURE__ */ jsx24(
        "time",
        {
          dateTime: note.createdAt,
          title: formatLongTimestamp(note.createdAt),
          className: "timeline-meta-text text-[10px]",
          children: formatShortTimestamp(note.createdAt)
        }
      )
    ] }),
    /* @__PURE__ */ jsx24("p", { className: "timeline-primary-text mt-1 text-[13px] leading-5", children: body }),
    note.linkedThreadId ? /* @__PURE__ */ jsx24(
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
var ThreadTurnRow = memo5(function ThreadTurnRow2({
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
  onBeforeMessageResize,
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
  const mergedItems = useMemo7(
    () => mergeLiveTurnItems(turn.items, liveItems),
    [liveItems, turn.items]
  );
  const displayedLivePlan = useMemo7(
    () => deriveDisplayedLivePlan(livePlan, mergedItems, turn.status),
    [livePlan, mergedItems, turn.status]
  );
  const visibleLiveOutput = useMemo7(
    () => getLiveOutputTailForTurn(liveOutput, mergedItems),
    [liveOutput, mergedItems]
  );
  const preparedItems = useMemo7(
    () => prepareTurnItemsForRendering(mergedItems, activeForRendering),
    [activeForRendering, mergedItems]
  );
  const groupedItems = useMemo7(() => groupTimelineHistoryItems(preparedItems), [preparedItems]);
  const turnTimeLabel = formatShortTimestamp(turn.startedAt);
  const turnTimeTitle = formatLongTimestamp(turn.startedAt);
  const visibleLiveHookPrompt = useMemo7(
    () => parseHookPromptText(visibleLiveOutput),
    [visibleLiveOutput]
  );
  const [expandedGroups, setExpandedGroups] = useState9(
    {}
  );
  const toggleGroupedItem = useCallback3((groupKey) => {
    setExpandedGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey]
    }));
  }, []);
  const historyNode = /* @__PURE__ */ jsx24(
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
      ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
      timeLabel: turnTimeLabel,
      timeTitle: turnTimeTitle,
      ...onSelectArtifact ? { onSelectArtifact } : {},
      ...adapter ? { adapter } : {}
    }
  );
  const liveHookPromptNode = visibleLiveHookPrompt ? /* @__PURE__ */ jsx24(
    HistoryItemRow,
    {
      threadId,
      item: visibleLiveHookPrompt,
      scrollRootRef,
      onOpenExpandedText,
      onOpenCommandDetail,
      onOpenToolCallDetail,
      onOpenDeferredHistoryItemDetail,
      timeLabel: turnTimeLabel,
      timeTitle: turnTimeTitle,
      ...onSelectArtifact ? { onSelectArtifact } : {},
      ...adapter ? { adapter } : {}
    }
  ) : null;
  const liveOutputNode = !visibleLiveHookPrompt && visibleLiveOutput ? /* @__PURE__ */ jsx24(
    GraphChatCompactMessageItem,
    {
      item: {
        id: "live-agent-message",
        kind: "agentMessage",
        text: visibleLiveOutput
      },
      scrollRootRef,
      timeLabel: turnTimeLabel,
      timeTitle: turnTimeTitle,
      streaming: true,
      ...onBeforeMessageResize ? { onBeforeMessageResize } : {}
    }
  ) : null;
  const footerNode = activeForRendering ? /* @__PURE__ */ jsx24(TurnStatusBar, { turn: activeFooterTurn, variant: "footer" }) : null;
  const turnBody = /* @__PURE__ */ jsx24(
    GraphChatTurnBody,
    {
      footer: footerNode,
      history: historyNode,
      liveHookPrompt: liveHookPromptNode,
      liveOutput: liveOutputNode,
      livePlan: displayedLivePlan
    }
  );
  return /* @__PURE__ */ jsx24(
    GraphChatTurnFrame,
    {
      absoluteIndex,
      body: turnBody,
      collapsed: isCollapsed,
      error: turn.error,
      headerStatus: /* @__PURE__ */ jsx24(TurnStatusBar, { turn }),
      isActive: activeForRendering,
      onToggleCollapse: () => onToggleCollapse(turn.id),
      refCallback: articleRef,
      startedAt: turn.startedAt,
      timeLabel: turnTimeLabel,
      timeTitle: turnTimeTitle,
      tokenSummary: /* @__PURE__ */ jsx24(TurnTokenSummary, { turn })
    }
  );
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
  onBeforeMessageResize,
  adapter,
  timeLabel,
  timeTitle
}) {
  return /* @__PURE__ */ jsx24(
    GraphChatHistoryEntries,
    {
      entries,
      expandedGroups,
      onToggleGroupedItem,
      renderCommandGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx24(
        GraphChatCommandGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenCommandDetail
        },
        entry.key
      ),
      renderFileChangeGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx24(
        GraphChatFileChangeGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenExpandedText
        },
        entry.key
      ),
      renderSearchGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx24(
        GraphChatSearchGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenExpandedText
        },
        entry.key
      ),
      renderFileReadGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx24(
        GraphChatFileReadGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenExpandedText
        },
        entry.key
      ),
      renderItem: (entry) => /* @__PURE__ */ jsx24(
        HistoryItemRow,
        {
          threadId,
          item: entry.item,
          scrollRootRef,
          timeLabel,
          timeTitle,
          onOpenExpandedText,
          onOpenCommandDetail,
          onOpenToolCallDetail,
          onOpenDeferredHistoryItemDetail,
          ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
          ...onSelectArtifact ? { onSelectArtifact } : {},
          ...adapter ? { adapter } : {}
        },
        entry.key
      )
    }
  );
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
  const scrollContainerRef = useRef6(null);
  const scrollContentRef = useRef6(null);
  const lastHandledScrollRequestKeyRef = useRef6(scrollRequestKey);
  const previousContentRevisionRef = useRef6(null);
  const previousBottomSpacerRef = useRef6(bottomSpacer);
  const lastObservedScrollHeightRef = useRef6(0);
  const lastScrollTopRef = useRef6(0);
  const tailSentinelRef = useRef6(null);
  const topSentinelRef = useRef6(null);
  const isTailVisibleRef = useRef6(true);
  const shouldStickToBottomRef = useRef6(true);
  const userScrolledAwayFromTailRef = useRef6(false);
  const userScrolledHistoryRef = useRef6(false);
  const autoLoadedEarlierRef = useRef6(false);
  const expandedTextRequestIdRef = useRef6(0);
  const deferredDetailCacheRef = useRef6(
    /* @__PURE__ */ new Map()
  );
  const [visibleCount, setVisibleCount] = useState9(INITIAL_VISIBLE_TURNS);
  const [loadMoreClicks, setLoadMoreClicks] = useState9(0);
  const [expandedText, setExpandedText] = useState9(null);
  const [collapsedTurns, setCollapsedTurns] = useState9(
    {}
  );
  const [isTailVisible, setIsTailVisible] = useState9(true);
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
  const handleToggleCollapse = useCallback3((turnId) => {
    setCollapsedTurns((current) => ({
      ...current,
      [turnId]: !current[turnId]
    }));
  }, []);
  const handleOpenExpandedText = useCallback3((title, text) => {
    setExpandedText({ title, text });
  }, []);
  const handleResolvedHistoryItemDetail = useCallback3(
    (item, detail) => {
      if (onSelectHistoryItemDetail) {
        onSelectHistoryItemDetail({ item, detail });
        return;
      }
      setExpandedText({ title: detail.title, text: detail.text });
    },
    [onSelectHistoryItemDetail]
  );
  const handleOpenCommandDetail = useCallback3(
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
  const handleOpenToolCallDetail = useCallback3(
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
  const handleOpenDeferredHistoryItemDetail = useCallback3(
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
  const recomputeTailVisibility = useCallback3(() => {
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
  const handleScroll = useCallback3(() => {
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
  const scrollToBottom = useCallback3(() => {
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
  const preserveScrollPositionForResize = useCallback3(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    lastScrollTopRef.current = container.scrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    shouldStickToBottomRef.current = false;
    userScrolledAwayFromTailRef.current = true;
  }, []);
  useLayoutEffect3(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [threadId, scrollToBottom]);
  useEffect9(() => {
    autoLoadedEarlierRef.current = false;
    userScrolledHistoryRef.current = false;
  }, [threadId]);
  useEffect9(() => {
    setVisibleCount((current) => {
      if (current >= turns.length - 1) {
        return turns.length;
      }
      return Math.max(current, INITIAL_VISIBLE_TURNS);
    });
  }, [turns.length]);
  useEffect9(() => {
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
  useEffect9(() => {
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
  useEffect9(() => {
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
  useEffect9(() => {
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
  useEffect9(() => {
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
  useEffect9(() => {
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
  const unattachedLiveTurn = useMemo7(
    () => liveItems && liveItemsTargetTurnId === null && liveItems.items.length > 0 ? buildSyntheticLiveTurn(liveItems.turnId, liveItems.items) : null,
    [liveItems, liveItemsTargetTurnId]
  );
  const unattachedLiveTurnIndex = Math.max(
    1,
    effectiveTotalTurnCount + (optimisticTurn ? 1 : 0)
  );
  const liveOutputAttachedToOptimisticTurn = !!liveOutput && !!optimisticTurn && optimisticTurn.status !== "failed" && !optimisticLiveItems;
  const liveOutputTargetTurnId = liveOutput && visibleTurns.length > 0 ? activeTurnId && visibleTurns.some((turn) => turn.id === activeTurnId) ? activeTurnId : visibleTurns.findLast((turn) => isRunningHistoryStatus2(turn.status))?.id ?? (shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null) : null;
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
  const requestEntryAnchors = useMemo7(() => {
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
  const activityNoteAnchors = useMemo7(() => {
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
  return /* @__PURE__ */ jsxs17(Fragment8, { children: [
    /* @__PURE__ */ jsx24("section", { className: `flex min-h-0 flex-1 flex-col ${className}`.trim(), children: /* @__PURE__ */ jsx24(
      "div",
      {
        ref: scrollContainerRef,
        "data-testid": "chat-scroll-container",
        onScroll: handleScroll,
        className: "thread-graph-scroll-container min-h-0 flex-1 overflow-y-auto overscroll-contain",
        style: bottomSpacer > 0 ? { paddingBottom: bottomSpacer } : void 0,
        children: /* @__PURE__ */ jsxs17("div", { ref: scrollContentRef, className: "thread-graph-scroll-content", children: [
          /* @__PURE__ */ jsx24("div", { ref: topSentinelRef, "aria-hidden": "true", className: "h-px" }),
          turns.length > 0 && /* @__PURE__ */ jsx24("div", { className: "thread-graph-history-control px-3 pb-1 pt-2 sm:px-5 sm:pb-1.5 sm:pt-3", children: /* @__PURE__ */ jsxs17("div", { className: "flex flex-wrap items-center gap-2.5 text-xs sm:text-sm", children: [
            hiddenCount > 0 && /* @__PURE__ */ jsx24(
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
                className: "thread-graph-history-button rounded-full border px-2.5 py-1.5 transition",
                children: loadingEarlier ? "Loading earlier..." : "Load 10 earlier"
              }
            ),
            showLoadAll && /* @__PURE__ */ jsx24(
              "button",
              {
                type: "button",
                onClick: () => setVisibleCount(turns.length),
                className: "rounded-full border border-amber-300/40 px-2.5 py-1.5 text-amber-200 transition hover:bg-amber-300/10",
                children: "Load full history"
              }
            ),
            /* @__PURE__ */ jsxs17("p", { className: "timeline-meta-text", children: [
              "Showing ",
              visibleTurns.length,
              " of ",
              effectiveTotalTurnCount,
              " turns",
              hiddenCount > 0 ? ` \xB7 ${hiddenCount} earlier hidden${loadedHiddenCount > 0 && unloadedHiddenCount > 0 ? ` (${loadedHiddenCount} loaded)` : ""}` : ""
            ] })
          ] }) }),
          turns.length === 0 && !liveOutput && !optimisticTurn && /* @__PURE__ */ jsx24("div", { className: "thread-graph-empty-state px-3 py-8 text-sm sm:px-5", children: "Send the first prompt to start the thread." }),
          (visibleTurns.length > 0 || optimisticTurn || activityNoteAnchors.leading.length > 0 || activityNoteAnchors.trailing.length > 0) && /* @__PURE__ */ jsxs17("div", { className: "thread-graph-message-list", children: [
            activityNoteAnchors.leading.length > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: activityNoteAnchors.leading.map((note) => /* @__PURE__ */ jsx24(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)) }) : null,
            visibleTurns.map((turn, visibleIndex) => /* @__PURE__ */ jsxs17("div", { children: [
              (activityNoteAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: (activityNoteAnchors.beforeTurnId.get(turn.id) ?? []).map((note) => /* @__PURE__ */ jsx24(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)) }) : null,
              (requestEntryAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: (requestEntryAnchors.beforeTurnId.get(turn.id) ?? []).map(
                (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx24(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx24(
                  PendingRequestCard,
                  {
                    request: entry.request,
                    busy: respondingRequestId === entry.request.id,
                    onRespond: onRespondToRequest ?? void 0
                  },
                  entry.id
                )
              ) }) : null,
              /* @__PURE__ */ jsx24(
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
                  onBeforeMessageResize: preserveScrollPositionForResize,
                  ...onSelectArtifact ? { onSelectArtifact } : {},
                  scrollRootRef: scrollContainerRef,
                  articleRef: void 0
                }
              ),
              (activityNoteAnchors.afterTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: (activityNoteAnchors.afterTurnId.get(turn.id) ?? []).map((note) => /* @__PURE__ */ jsx24(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)) }) : null,
              notesByTurnId.get(turn.id)?.length || pendingRequestsByTurnId.get(turn.id)?.length ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: [
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
                (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx24(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx24(
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
            optimisticTurn && visibleTurns.every((turn) => turn.id !== optimisticTurn.id) && /* @__PURE__ */ jsxs17(Fragment8, { children: [
              (activityNoteAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: (activityNoteAnchors.beforeTurnId.get(optimisticTurn.id) ?? []).map(
                (note) => /* @__PURE__ */ jsx24(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)
              ) }) : null,
              (requestEntryAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: (requestEntryAnchors.beforeTurnId.get(optimisticTurn.id) ?? []).map(
                (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx24(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx24(
                  PendingRequestCard,
                  {
                    request: entry.request,
                    busy: respondingRequestId === entry.request.id,
                    onRespond: onRespondToRequest ?? void 0
                  },
                  entry.id
                )
              ) }) : null,
              /* @__PURE__ */ jsx24(
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
                  onBeforeMessageResize: preserveScrollPositionForResize,
                  ...onSelectArtifact ? { onSelectArtifact } : {},
                  scrollRootRef: scrollContainerRef
                }
              ),
              (activityNoteAnchors.afterTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: (activityNoteAnchors.afterTurnId.get(optimisticTurn.id) ?? []).map(
                (note) => /* @__PURE__ */ jsx24(ActivityNoteCard, { note, onOpenThread, onOpenLinkedThread: openLinkedThread }, note.id)
              ) }) : null
            ] })
          ] }),
          queuedSteers.length > 0 && /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: queuedSteers.map((steer) => /* @__PURE__ */ jsx24(
            GraphChatCompactMessageItem,
            {
              threadId,
              item: {
                id: steer.id,
                kind: "userMessage",
                text: steer.prompt,
                status: steer.status
              },
              scrollRootRef: scrollContainerRef,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...adapter ? { adapter } : {}
            },
            steer.id
          )) }),
          (requestEntryAnchors.trailing.length > 0 || activityNoteAnchors.trailing.length > 0) && /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: [
            ...activityNoteAnchors.trailing.map((note) => ({
              kind: "activity",
              id: note.id,
              createdAt: note.createdAt,
              note
            })),
            ...requestEntryAnchors.trailing
          ].sort((left, right) => left.createdAt.localeCompare(right.createdAt)).map(
            (entry) => entry.kind === "activity" ? /* @__PURE__ */ jsx24(ActivityNoteCard, { note: entry.note, onOpenThread, onOpenLinkedThread: openLinkedThread }, entry.id) : entry.kind === "note" ? /* @__PURE__ */ jsx24(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx24(
              PendingRequestCard,
              {
                request: entry.request,
                busy: respondingRequestId === entry.request.id,
                onRespond: onRespondToRequest ?? void 0
              },
              entry.id
            )
          ) }),
          ephemeralUserNote && /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section px-3 py-2.5 sm:px-5", children: /* @__PURE__ */ jsx24(
            GraphChatCompactMessageItem,
            {
              threadId,
              item: {
                id: "ephemeral-plan-decision-note",
                kind: "userMessage",
                text: ephemeralUserNote
              },
              scrollRootRef: scrollContainerRef,
              onBeforeMessageResize: preserveScrollPositionForResize
            }
          ) }),
          unattachedLiveTurn && unattachedLiveItems && unattachedLiveItems.length > 0 && /* @__PURE__ */ jsx24(
            ThreadTurnRow,
            {
              threadId,
              ...adapter ? { adapter } : {},
              turn: unattachedLiveTurn,
              absoluteIndex: unattachedLiveTurnIndex,
              isCollapsed: collapsedTurns[unattachedLiveTurn.id] ?? false,
              livePlan: livePlan?.turnId === unattachedLiveTurn.id ? livePlan : null,
              liveItems: unattachedLiveItems,
              liveOutput: "",
              forceActive: true,
              onToggleCollapse: handleToggleCollapse,
              onOpenExpandedText: handleOpenExpandedText,
              onOpenCommandDetail: handleOpenCommandDetail,
              onOpenToolCallDetail: handleOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              scrollRootRef: scrollContainerRef
            }
          ),
          liveOutput && !liveOutputAttachedToVisibleTurn && !liveOutputAttachedToOptimisticTurn && !hasStructuredLiveItems && /* @__PURE__ */ jsx24("div", { className: "thread-graph-message-section px-3 py-2.5 sm:px-5", children: parseHookPromptText(liveOutput) ? /* @__PURE__ */ jsx24(
            HistoryItemRow,
            {
              threadId,
              item: parseHookPromptText(liveOutput),
              scrollRootRef: scrollContainerRef,
              onOpenExpandedText: handleOpenExpandedText,
              onOpenCommandDetail: handleOpenCommandDetail,
              onOpenToolCallDetail: handleOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              ...adapter ? { adapter } : {}
            }
          ) : /* @__PURE__ */ jsx24(
            GraphChatCompactMessageItem,
            {
              threadId,
              item: {
                id: "live-agent-message-fallback",
                kind: "agentMessage",
                text: liveOutput
              },
              scrollRootRef: scrollContainerRef,
              streaming: true,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...adapter ? { adapter } : {}
            }
          ) }),
          /* @__PURE__ */ jsx24(
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
    /* @__PURE__ */ jsx24(
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
var ThreadTimeline = memo5(ThreadTimelineComponent);

// src/components/ThreadShellPanel.tsx
import {
  forwardRef,
  useCallback as useCallback4,
  useEffect as useEffect10,
  useImperativeHandle,
  useMemo as useMemo8,
  useRef as useRef7,
  useState as useState10
} from "react";
import "xterm/css/xterm.css";
import { Fragment as Fragment9, jsx as jsx25, jsxs as jsxs18 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs18(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 20 20",
      className: "h-4 w-4 fill-current",
      children: [
        /* @__PURE__ */ jsx25(
          "path",
          {
            fillRule: "evenodd",
            d: "M14.5 10C16.9853 10 19 7.98528 19 5.5C19 5.01783 18.9242 4.55338 18.7838 4.11791C18.6792 3.79367 18.2734 3.72683 18.0325 3.96772L15.3402 6.66002C15.2098 6.79041 15.0168 6.84163 14.8466 6.77074C14.1172 6.46695 13.5334 5.88351 13.2292 5.15431C13.1582 4.98403 13.2094 4.79088 13.3398 4.66042L16.0327 1.9676C16.2735 1.72672 16.2067 1.32092 15.8825 1.21636C15.4469 1.07588 14.9823 1 14.5 1C12.0147 1 10 3.01472 10 5.5C10 5.59783 10.0031 5.69494 10.0093 5.79122C10.065 6.66418 9.88174 7.59855 9.20974 8.15855L1.98017 14.1832C1.3591 14.7008 1 15.4674 1 16.2759C1 17.7804 2.21962 19 3.7241 19C4.53256 19 5.29925 18.6409 5.81681 18.0198L11.8414 10.7903C12.4014 10.1183 13.3358 9.93497 14.2088 9.99073C14.3051 9.99688 14.4022 10 14.5 10ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx25("path", { d: "M14.5 11.5C14.6731 11.5 14.8445 11.4927 15.0138 11.4783L18.7678 15.2323C19.7441 16.2086 19.7441 17.7915 18.7678 18.7678C17.7915 19.7441 16.2086 19.7441 15.2323 18.7678L10.8216 14.3571L12.9938 11.7505C13.0455 11.6885 13.1413 11.6131 13.3357 11.5552C13.5378 11.4951 13.805 11.468 14.1132 11.4877C14.2413 11.4959 14.3702 11.5 14.5 11.5Z" }),
        /* @__PURE__ */ jsx25("path", { d: "M6.00003 4.58582L8.33056 6.91635C8.3027 6.95627 8.27496 6.98497 8.24946 7.00622L6.79994 8.21415L4.58582 6.00003H3.30905C3.11966 6.00003 2.94653 5.89303 2.86184 5.72364L1.1612 2.32237C1.06495 2.12987 1.10268 1.89739 1.25486 1.74521L1.74521 1.25486C1.89739 1.10268 2.12987 1.06495 2.32237 1.1612L5.72364 2.86184C5.89303 2.94653 6.00003 3.11966 6.00003 3.30905V4.58582Z" })
      ]
    }
  );
}
function ConnectionIcon({ connected }) {
  if (!connected) {
    return /* @__PURE__ */ jsx25(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        className: "h-4.5 w-4.5 fill-none stroke-current",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /* @__PURE__ */ jsx25("path", { d: "M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" })
      }
    );
  }
  return /* @__PURE__ */ jsx25(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      className: "h-4.5 w-4.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx25("path", { d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" })
    }
  );
}
function ClipboardIcon2() {
  return /* @__PURE__ */ jsxs18(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx25("path", { d: "M5.5 3.25h5" }),
        /* @__PURE__ */ jsx25("path", { d: "M6.4 2h3.2a.9.9 0 0 1 .9.9v.35h1.3a1.2 1.2 0 0 1 1.2 1.2v7.35a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 11.8V4.45a1.2 1.2 0 0 1 1.2-1.2h1.3V2.9a.9.9 0 0 1 .9-.9Z" })
      ]
    }
  );
}
function ControlIcon({
  label,
  tone = "stone"
}) {
  const toneClassName = tone === "rose" ? "border-rose-300/35 bg-rose-300/14 text-rose-600 dark:text-rose-50" : tone === "sky" ? "border-sky-300/35 bg-sky-300/14 text-sky-600 dark:text-sky-50" : "shell-control-chip border";
  return /* @__PURE__ */ jsx25(
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
  const terminalRef = useRef7(null);
  const fitAddonRef = useRef7(null);
  const socketRef = useRef7(null);
  const viewerIdRef = useRef7(null);
  const shellIdRef = useRef7(null);
  const reconnectTimerRef = useRef7(null);
  const attachTimeoutRef = useRef7(null);
  const attachRetryTimerRef = useRef7(null);
  const intentionalDisconnectRef = useRef7(false);
  const userDisconnectedShellIdRef = useRef7(null);
  const shellSnapshotRef = useRef7("");
  const pendingCommandRef = useRef7(null);
  const lastCommandOutputRef = useRef7("");
  const resizeObserverRef = useRef7(null);
  const lastSentSizeRef = useRef7(null);
  const snapshotCursorRef = useRef7({
    cursorX: void 0,
    cursorY: void 0,
    paneHeight: void 0
  });
  const terminalInitializingRef = useRef7(false);
  const terminalInputSubscriptionRef = useRef7(null);
  const isVisibleRef = useRef7(isVisible);
  const isMobileShellRef = useRef7(isMobileShell);
  const sendShellInputRef = useRef7(() => false);
  const syncTerminalSizeRef = useRef7(
    () => null
  );
  const refreshTerminalLayoutRef = useRef7(() => {
  });
  const attachPromiseRef = useRef7(null);
  const [terminalHostNode, setTerminalHostNode] = useState10(null);
  const [terminalReady, setTerminalReady] = useState10(false);
  const [viewerId, setViewerIdState] = useState10(null);
  const [isConnecting, setIsConnecting] = useState10(false);
  const [connectionError, setConnectionError] = useState10(null);
  const [runtimePromptLabel, setRuntimePromptLabel] = useState10(null);
  const [isCommandRunning, setIsCommandRunning] = useState10(false);
  const [reconnectKey, setReconnectKey] = useState10(0);
  const shellStatus = shell?.status ?? "not_created";
  const canAttachShell = Boolean(
    shell && !workspacePathMissing && shell.status !== "exited" && shell.status !== "not_found"
  );
  const fallbackPromptLabel = useMemo8(
    () => buildPromptLabel(basenameFromPath(shell?.cwd), null),
    [shell?.cwd]
  );
  const promptLabel = runtimePromptLabel ?? fallbackPromptLabel;
  const setViewerId = useCallback4((nextViewerId) => {
    viewerIdRef.current = nextViewerId;
    setViewerIdState(nextViewerId);
  }, []);
  const settleAttachPromise = useCallback4((connected) => {
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
  useEffect10(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);
  useEffect10(() => {
    isMobileShellRef.current = isMobileShell;
  }, [isMobileShell]);
  useEffect10(() => {
    shellIdRef.current = shell?.id ?? null;
  }, [shell?.id]);
  const sendShellInput = useCallback4((data) => {
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
  useEffect10(() => {
    sendShellInputRef.current = sendShellInput;
  }, [sendShellInput]);
  const sendShellClear = useCallback4(() => {
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
  const isTerminalVisible = useCallback4(() => {
    if (!isVisible || !terminalHostNode) {
      return false;
    }
    const rect = terminalHostNode.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }, [isVisible, terminalHostNode]);
  const syncTerminalSize = useCallback4((options) => {
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
  useEffect10(() => {
    syncTerminalSizeRef.current = syncTerminalSize;
  }, [syncTerminalSize]);
  const refreshTerminalLayout = useCallback4(
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
  useEffect10(() => {
    refreshTerminalLayoutRef.current = () => refreshTerminalLayout();
  }, [refreshTerminalLayout]);
  useEffect10(() => {
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
  useEffect10(() => {
    if (!terminalHostNode || terminalRef.current || terminalInitializingRef.current) {
      return;
    }
    let cancelled = false;
    terminalInitializingRef.current = true;
    void (async () => {
      const [{ Terminal: Terminal3 }, { FitAddon }] = await Promise.all([
        import("xterm"),
        import("@xterm/addon-fit")
      ]);
      if (cancelled || !terminalHostNode) {
        terminalInitializingRef.current = false;
        return;
      }
      const terminal = new Terminal3({
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
  useEffect10(() => {
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
  useEffect10(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    terminal.options.theme = terminalThemeFor(effectiveTheme);
  }, [effectiveTheme]);
  useEffect10(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    terminal.options.disableStdin = isMobileShell;
  }, [isMobileShell]);
  useEffect10(() => {
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
  useEffect10(() => {
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
  useEffect10(() => {
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
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      className: `relative min-h-0 flex-1 overflow-hidden ${isActive ? "shell-pane-active" : ""}`,
      onMouseDown: onActivate,
      "data-pane-id": paneId,
      children: [
        /* @__PURE__ */ jsx25(
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
        isActive && /* @__PURE__ */ jsx25("div", { className: "pointer-events-none absolute right-2 top-2 rounded-md border border-sky-300/30 bg-sky-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-sky-100", children: "Active" })
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
  const primaryPaneRef = useRef7(null);
  const secondaryPaneRef = useRef7(null);
  const feedbackTimerRef = useRef7(null);
  const terminalSplitHostRef = useRef7(null);
  const dragFrameRef = useRef7(null);
  const createShellInFlightRef = useRef7(false);
  const [shellState, setShellState] = useState10(null);
  const [loading, setLoading] = useState10(true);
  const [busy, setBusy] = useState10(false);
  const [error, setError] = useState10(null);
  const [activePaneId, setActivePaneId] = useState10("primary");
  const [primaryShellId, setPrimaryShellId] = useState10(null);
  const [secondaryShellId, setSecondaryShellId] = useState10(null);
  const [splitMode, setSplitMode] = useState10("single");
  const [splitRatio, setSplitRatio] = useState10(50);
  const [renamingShellId, setRenamingShellId] = useState10(null);
  const [renameDraft, setRenameDraft] = useState10("");
  const [isMobileShell, setIsMobileShell] = useState10(false);
  const [mobileProcessListOpen, setMobileProcessListOpen] = useState10(false);
  const [toolboxOpen, setToolboxOpen] = useState10(false);
  const [paneRuntime, setPaneRuntime] = useState10({
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
  const [toolboxFeedback, setToolboxFeedback] = useState10(null);
  const status = shellState?.state ?? "not_created";
  const shells = useMemo8(() => shellState?.shells ?? [], [shellState?.shells]);
  const liveShells = useMemo8(
    () => shells.filter((shell) => shell.status !== "exited" && shell.status !== "not_found"),
    [shells]
  );
  const primaryShell = useMemo8(
    () => liveShells.find((shell) => shell.id === primaryShellId) ?? null,
    [liveShells, primaryShellId]
  );
  const secondaryShell = useMemo8(
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
  const setTransientToolboxFeedback = useCallback4(
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
  const updateShellEntry = useCallback4(
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
  const loadShellState = useCallback4(async () => {
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
  useEffect10(() => {
    void loadShellState();
  }, [loadShellState]);
  useEffect10(() => {
    const storedRatio = loadSplitRatio?.(threadId);
    if (storedRatio === null || storedRatio === void 0) {
      setSplitRatio(50);
      return;
    }
    const parsed = typeof storedRatio === "number" ? storedRatio : Number.parseFloat(String(storedRatio));
    setSplitRatio(Number.isFinite(parsed) ? clampPaneRatio(parsed) : 50);
  }, [loadSplitRatio, threadId]);
  useEffect10(() => {
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
  useEffect10(() => {
    if (splitMode === "columns") {
      return;
    }
    setActivePaneId("primary");
    setSecondaryShellId(null);
  }, [splitMode]);
  useEffect10(() => {
    if (splitMode !== "columns" || secondaryShellId || liveShells.length < 2) {
      return;
    }
    const nextSecondary = liveShells.find((shell) => shell.id !== primaryShell?.id) ?? null;
    if (nextSecondary) {
      setSecondaryShellId(nextSecondary.id);
    }
  }, [liveShells, primaryShell?.id, secondaryShellId, splitMode]);
  useEffect10(() => {
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
  useEffect10(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
      if (dragFrameRef.current !== null) {
        window.cancelAnimationFrame(dragFrameRef.current);
      }
    };
  }, []);
  const updatePaneRuntime = useCallback4(
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
  const handlePrimaryRuntimeStateChange = useCallback4(
    (nextState) => updatePaneRuntime("primary", nextState),
    [updatePaneRuntime]
  );
  const handleSecondaryRuntimeStateChange = useCallback4(
    (nextState) => updatePaneRuntime("secondary", nextState),
    [updatePaneRuntime]
  );
  const shellLabel = useCallback4(
    (shell) => {
      if (shell.label?.trim()) {
        return shell.label.trim();
      }
      const index = shells.findIndex((entry) => entry.id === shell.id);
      return `Shell ${index >= 0 ? index + 1 : ""}`.trim();
    },
    [shells]
  );
  const handleStartRenameShell = useCallback4(
    (shell) => {
      setRenamingShellId(shell.id);
      setRenameDraft(shell.label?.trim() || shellLabel(shell));
    },
    [shellLabel]
  );
  const handleCancelRenameShell = useCallback4(() => {
    setRenamingShellId(null);
    setRenameDraft("");
  }, []);
  const handleSubmitRenameShell = useCallback4(async () => {
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
  const setPaneShell = useCallback4((paneId, shellId) => {
    if (paneId === "primary") {
      setPrimaryShellId(shellId);
      setSecondaryShellId((current) => current === shellId ? null : current);
      return;
    }
    setSecondaryShellId(shellId);
    setPrimaryShellId((current) => current === shellId ? null : current);
  }, []);
  const handleClosePane = useCallback4((paneId) => {
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
  const handleSelectShell = useCallback4(
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
  const handleCreateShell = useCallback4(
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
  useEffect10(() => {
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
  const handleTerminateShell = useCallback4(
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
  const handleConnectionToggle = useCallback4(async () => {
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
  const persistSplitRatio = useCallback4(
    (nextRatio) => {
      if (typeof window === "undefined") {
        return;
      }
      saveSplitRatio?.(threadId, clampPaneRatio(nextRatio));
    },
    [saveSplitRatio, threadId]
  );
  const refreshPaneLayouts = useCallback4(() => {
    primaryPaneRef.current?.refreshLayout({ syncBackendSize: true });
    secondaryPaneRef.current?.refreshLayout({ syncBackendSize: true });
  }, []);
  const handleSplitDividerPointerDown = useCallback4(
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
  const handleAssignShellToPane = useCallback4(
    (shell, paneId) => {
      setPaneShell(paneId, shell.id);
      setActivePaneId(paneId);
    },
    [setPaneShell]
  );
  const handleCopyVisibleShellText = useCallback4(async () => {
    const copied = await activePaneRef.current?.copyLastCommandOutput();
    if (!copied) {
      setTransientToolboxFeedback("failed", "Nothing to copy");
      return false;
    }
    return true;
  }, [activePaneRef, setTransientToolboxFeedback]);
  useEffect10(() => {
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
  const renderProcessRow = (shell) => /* @__PURE__ */ jsx25(
    "div",
    {
      className: `rounded-md border px-2 py-1.5 text-xs ${shell.id === activeShell?.id ? "border-sky-300/40 bg-sky-300/12 text-sky-50" : "border-stone-800 bg-stone-900/40 text-stone-300"}`,
      children: /* @__PURE__ */ jsxs18("div", { className: "flex items-center justify-between gap-2", children: [
        renamingShellId === shell.id ? /* @__PURE__ */ jsx25(
          "form",
          {
            className: "min-w-0 flex-1",
            onSubmit: (event) => {
              event.preventDefault();
              void handleSubmitRenameShell();
            },
            children: /* @__PURE__ */ jsx25(
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
        ) : /* @__PURE__ */ jsxs18(
          "button",
          {
            type: "button",
            onClick: () => handleSelectShell(shell),
            onDoubleClick: () => handleStartRenameShell(shell),
            className: "min-w-0 flex-1 text-left",
            title: shell.tmuxSessionName,
            children: [
              /* @__PURE__ */ jsx25("span", { className: "block truncate", children: shellLabel(shell) }),
              /* @__PURE__ */ jsxs18("span", { className: "block truncate text-[10px] text-[var(--theme-fg-muted)]", children: [
                statusLabel(shell.status),
                " \xB7 ",
                basenameFromPath(shell.cwd) || shell.cwd
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs18("div", { className: "flex shrink-0 items-center gap-1", children: [
          renamingShellId === shell.id ? /* @__PURE__ */ jsxs18(Fragment9, { children: [
            /* @__PURE__ */ jsx25(
              "button",
              {
                type: "button",
                onClick: () => void handleSubmitRenameShell(),
                className: "rounded border border-sky-300/35 bg-sky-300/12 px-1.5 py-1 text-[10px] text-sky-50",
                title: "Save shell name",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsx25(
              "button",
              {
                type: "button",
                onClick: handleCancelRenameShell,
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200",
                title: "Cancel rename",
                children: "Cancel"
              }
            )
          ] }) : /* @__PURE__ */ jsx25(
            "button",
            {
              type: "button",
              onClick: () => handleStartRenameShell(shell),
              className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
              title: "Rename shell",
              children: "Rename"
            }
          ),
          splitMode === "columns" && /* @__PURE__ */ jsxs18(Fragment9, { children: [
            /* @__PURE__ */ jsx25(
              "button",
              {
                type: "button",
                onClick: () => handleAssignShellToPane(shell, "primary"),
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
                title: "Open in left pane",
                children: "L"
              }
            ),
            /* @__PURE__ */ jsx25(
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
          /* @__PURE__ */ jsx25(
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
  return /* @__PURE__ */ jsxs18("div", { className: "shell-panel flex min-h-0 flex-1 flex-col", children: [
    showHeader && /* @__PURE__ */ jsxs18("div", { className: "shell-header shrink-0 border-b px-3 py-3 sm:px-5", children: [
      /* @__PURE__ */ jsxs18("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs18("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx25("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Shell" }),
          /* @__PURE__ */ jsx25("p", { className: "mt-1 truncate text-sm text-[var(--theme-fg-soft)]", children: activeRuntime.promptLabel ?? activeShell?.cwd ?? "Create a terminal for this thread." })
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx25(
            "button",
            {
              type: "button",
              "aria-label": connectionButtonLabel,
              title: `${connectionButtonLabel} (${statusLabel(activeRuntime.status)})`,
              disabled: connectionButtonDisabled,
              onClick: () => void handleConnectionToggle(),
              className: `inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-lg shadow-stone-950/25 transition disabled:cursor-not-allowed disabled:opacity-60 ${connectionButtonClassName}`,
              children: /* @__PURE__ */ jsx25(ConnectionIcon, { connected: activeRuntime.shellInputEnabled })
            }
          ),
          activeShell && /* @__PURE__ */ jsx25(
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
      (error || loading || workspacePathMissing) && /* @__PURE__ */ jsxs18("div", { className: "shell-banner mt-3 rounded-2xl border px-3 py-3 text-sm", children: [
        loading && /* @__PURE__ */ jsx25("p", { className: "text-[var(--theme-fg-muted)]", children: "Loading shell state..." }),
        !loading && workspacePathMissing && /* @__PURE__ */ jsx25("p", { className: "text-rose-600 dark:text-rose-100", children: "Workspace path is missing on this machine. Restore the path before creating a shell." }),
        !loading && error && /* @__PURE__ */ jsx25("p", { className: "text-amber-700 dark:text-amber-100", children: error })
      ] })
    ] }),
    /* @__PURE__ */ jsx25("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ jsxs18("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsxs18("div", { className: "shell-terminal-bar flex shrink-0 items-center gap-2 border-b px-2 py-2", children: [
        /* @__PURE__ */ jsxs18("div", { className: "flex min-w-0 flex-1 items-center gap-2 px-1", children: [
          /* @__PURE__ */ jsx25("span", { className: "min-w-0 truncate text-xs text-[var(--theme-fg-soft)]", children: activeShell ? shellLabel(activeShell) : "No live shell process" }),
          activeShell && /* @__PURE__ */ jsx25("span", { className: "shrink-0 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-fg-muted)]", children: statusLabel(activeRuntime.status) })
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          /* @__PURE__ */ jsxs18("span", { className: "hidden text-xs text-[var(--theme-fg-muted)] sm:inline", children: [
            "Live ",
            liveShells.length
          ] }),
          /* @__PURE__ */ jsx25(
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
      mobileProcessListOpen && /* @__PURE__ */ jsxs18("div", { className: "shrink-0 border-b border-stone-800/80 bg-stone-950/55 p-2 sm:hidden", children: [
        /* @__PURE__ */ jsxs18("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx25("p", { className: "text-xs uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: "Processes" }),
          /* @__PURE__ */ jsxs18("span", { className: "text-[10px] text-[var(--theme-fg-muted)]", children: [
            liveShells.length,
            " live"
          ] })
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "max-h-52 space-y-1 overflow-y-auto", children: [
          liveShells.map(renderProcessRow),
          liveShells.length === 0 && /* @__PURE__ */ jsx25("p", { className: "px-2 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No live shell processes" })
        ] }),
        /* @__PURE__ */ jsx25("div", { className: "mt-2 flex justify-end border-t border-stone-800/80 pt-2", children: /* @__PURE__ */ jsx25(
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
      status === "not_created" || workspacePathMissing ? /* @__PURE__ */ jsx25("div", { className: "flex h-full items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxs18("div", { className: "shell-empty-state max-w-md rounded-[1.6rem] border px-6 py-8", children: [
        /* @__PURE__ */ jsx25("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Durable thread shell" }),
        /* @__PURE__ */ jsx25("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-muted)]", children: "The shell runs under a supervisor-managed PTY and reconnects after browser disconnects. Create it explicitly when you want to inspect or take over the workspace." }),
        !workspacePathMissing && /* @__PURE__ */ jsx25(
          "button",
          {
            type: "button",
            disabled: busy || loading,
            onClick: () => void handleCreateShell("primary"),
            className: "mt-5 rounded-md border border-sky-300/35 bg-sky-300/12 px-3 py-2 text-sm text-sky-50 disabled:cursor-not-allowed disabled:opacity-50",
            children: "New Shell"
          }
        )
      ] }) }) : /* @__PURE__ */ jsxs18("div", { className: "grid h-full min-h-0 grid-cols-1 gap-2 p-2 sm:grid-cols-[minmax(0,1fr)_16rem] sm:p-3", children: [
        /* @__PURE__ */ jsxs18("div", { className: "shell-terminal-frame relative min-h-0 overflow-hidden rounded-[1.4rem] border shadow-inner", children: [
          !showHeader && (error || loading || workspacePathMissing) && /* @__PURE__ */ jsxs18("div", { className: "shell-banner absolute left-2 right-2 top-2 z-10 rounded-2xl border px-3 py-3 text-sm backdrop-blur sm:left-3 sm:right-3 sm:top-3", children: [
            loading && /* @__PURE__ */ jsx25("p", { className: "text-[var(--theme-fg-muted)]", children: "Loading shell state..." }),
            !loading && workspacePathMissing && /* @__PURE__ */ jsx25("p", { className: "text-rose-600 dark:text-rose-100", children: "Workspace path is missing on this machine. Restore the path before creating a shell." }),
            !loading && error && /* @__PURE__ */ jsx25("p", { className: "text-amber-700 dark:text-amber-100", children: error })
          ] }),
          /* @__PURE__ */ jsxs18(
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
                /* @__PURE__ */ jsx25(
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
                splitMode === "columns" && /* @__PURE__ */ jsx25(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleClosePane("primary"),
                    className: "absolute left-2 top-2 z-10 rounded-md border border-stone-700/80 bg-stone-950/70 px-2 py-1 text-[10px] text-stone-200 hover:border-rose-300/40",
                    title: "Close left pane",
                    children: "Close"
                  }
                ),
                splitMode === "columns" && /* @__PURE__ */ jsx25(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Resize shell panes",
                    title: "Resize shell panes",
                    onPointerDown: handleSplitDividerPointerDown,
                    className: "hidden cursor-col-resize border-x border-stone-800/80 bg-stone-900/60 transition hover:border-sky-300/40 hover:bg-sky-300/10 sm:block"
                  }
                ),
                splitMode === "columns" && /* @__PURE__ */ jsxs18("div", { className: "relative min-h-0 border-t border-stone-800/80 sm:border-l sm:border-t-0", children: [
                  /* @__PURE__ */ jsx25(
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
                  /* @__PURE__ */ jsx25(
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
          showFloatingToolbox && isMobileShell && /* @__PURE__ */ jsxs18("div", { className: "pointer-events-none absolute bottom-3 right-3 z-20 flex flex-col items-end gap-2", children: [
            toolboxFeedback && /* @__PURE__ */ jsx25(
              "div",
              {
                className: `pointer-events-auto rounded-full border px-3 py-1.5 text-[11px] shadow-lg shadow-stone-950/30 backdrop-blur ${toolboxFeedbackToneClassName}`,
                children: toolboxFeedback.text
              }
            ),
            toolboxOpen && /* @__PURE__ */ jsx25("div", { className: "shell-toolbox pointer-events-auto rounded-[1.2rem] border p-2 shadow-2xl backdrop-blur", children: /* @__PURE__ */ jsxs18("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsx25(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setTransientToolboxFeedback("idle", "Use the prompt box tools to paste");
                  },
                  className: "inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-2.5 py-2 text-sky-600 dark:text-sky-50",
                  children: /* @__PURE__ */ jsxs18("span", { className: "inline-flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx25(ClipboardIcon2, {}),
                    /* @__PURE__ */ jsx25("span", { className: "text-[11px] font-medium tracking-[0.12em]", children: "Paste" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx25(
                "button",
                {
                  type: "button",
                  onClick: () => void handleCopyVisibleShellText(),
                  className: "shell-toolbox-copy inline-flex items-center justify-center rounded-full border px-2.5 py-2",
                  children: /* @__PURE__ */ jsxs18("span", { className: "inline-flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx25(ClipboardIcon2, {}),
                    /* @__PURE__ */ jsx25("span", { className: "text-[11px] font-medium tracking-[0.12em]", children: "Copy" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx25(
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
                  children: /* @__PURE__ */ jsx25(ControlIcon, { label: "CLEAR", tone: "sky" })
                }
              ),
              /* @__PURE__ */ jsx25(
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
                  children: /* @__PURE__ */ jsx25(ControlIcon, { label: "CTRL-C", tone: "rose" })
                }
              ),
              ["ctrl_d", "esc", "tab", "up", "down"].map((action) => /* @__PURE__ */ jsx25(
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
                  children: /* @__PURE__ */ jsx25(ControlIcon, { label: action.toUpperCase().replace("_", "-"), tone: "stone" })
                },
                action
              ))
            ] }) }),
            /* @__PURE__ */ jsx25(
              "button",
              {
                type: "button",
                "aria-expanded": toolboxOpen,
                "aria-label": toolboxOpen ? "Close shell tools" : "Open shell tools",
                onClick: () => setToolboxOpen((current) => !current),
                className: "shell-toolbox-trigger pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-2xl backdrop-blur transition",
                children: /* @__PURE__ */ jsx25(WrenchScrewdriverIcon2, {})
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs18("aside", { className: "hidden min-h-0 overflow-hidden rounded-[1rem] border border-stone-800/80 bg-stone-950/30 p-2 sm:flex sm:flex-col", children: [
          /* @__PURE__ */ jsxs18("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx25("p", { className: "text-xs uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: "Processes" }),
            /* @__PURE__ */ jsxs18("span", { className: "text-[10px] text-[var(--theme-fg-muted)]", children: [
              liveShells.length,
              " live"
            ] })
          ] }),
          /* @__PURE__ */ jsxs18("div", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto", children: [
            liveShells.map(renderProcessRow),
            liveShells.length === 0 && /* @__PURE__ */ jsx25("p", { className: "px-2 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No live shell processes" })
          ] }),
          /* @__PURE__ */ jsx25("div", { className: "mt-2 flex justify-end border-t border-stone-800/80 pt-2", children: /* @__PURE__ */ jsx25(
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

// src/components/ThreadGraphWorkspacePanel.tsx
import { memo as memo7, useEffect as useEffect15, useMemo as useMemo13, useState as useState14 } from "react";
import {
  BarChart2 as BarChart22,
  BookOpen,
  GitBranch,
  Paperclip,
  Terminal as Terminal2,
  Trash2 as Trash25,
  Wrench as Wrench3
} from "lucide-react";

// src/components/graph-workspace/GraphWorkspaceExplorer.tsx
import {
  useEffect as useEffect12,
  useMemo as useMemo11,
  useRef as useRef9,
  useState as useState12
} from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft as ChevronsLeft2,
  ChevronsRight as ChevronsRight3,
  Download as Download2,
  File,
  FileArchive,
  FileCode2,
  FileImage,
  Folder,
  FolderOpen,
  RefreshCw,
  Trash2 as Trash23,
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
  return {
    id: `workspace:${node.path}`,
    name: node.name,
    path: node.path,
    kind,
    ...node.size !== void 0 ? { size: node.size } : {},
    workspaceNode: node,
    children: (node.children ?? []).map(workspaceTreeNodeToGraphNode)
  };
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
import { memo as memo6 } from "react";
import { ChevronsRight as ChevronsRight2 } from "lucide-react";

// src/components/graph-workspace/GraphWorkspaceCards.tsx
import { jsx as jsx26, jsxs as jsxs19 } from "react/jsx-runtime";
function WorkspaceInfoCard({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs19("section", { className: "thread-workspace-card rounded-lg border p-3", children: [
    /* @__PURE__ */ jsx26("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: label }),
    /* @__PURE__ */ jsx26("div", { className: "mt-2 text-sm text-[var(--theme-fg)]", children })
  ] });
}

// src/components/graph-workspace/GraphMoleculeViewer.tsx
import { Pause, Play } from "lucide-react";
import { useCallback as useCallback5, useEffect as useEffect11, useMemo as useMemo10, useRef as useRef8, useState as useState11 } from "react";

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
  Trash2 as Trash22,
  Waypoints
} from "lucide-react";

// src/components/graph-ui/ButtonGroup.tsx
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { cva as cva4 } from "class-variance-authority";

// src/components/graph-ui/Separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx27 } from "react/jsx-runtime";
function Separator({
  className,
  decorative = true,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx27(
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
import { jsx as jsx28 } from "react/jsx-runtime";
var buttonGroupVariants = cva4(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
import { jsx as jsx29, jsxs as jsxs20 } from "react/jsx-runtime";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx29(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ jsx29(TooltipProvider, { children: /* @__PURE__ */ jsx29(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx29(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  children,
  className,
  sideOffset = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx29(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs20(
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
        /* @__PURE__ */ jsx29(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}

// src/components/graph-workspace/GraphMoleculeViewerControls.tsx
import { jsx as jsx30, jsxs as jsxs21 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs21(Tooltip, { children: [
    /* @__PURE__ */ jsx30(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx30(
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
    /* @__PURE__ */ jsx30(TooltipContent, { children: /* @__PURE__ */ jsx30("p", { children: label }) })
  ] });
}
function GraphMoleculeButtonGroup({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx30(ButtonGroup, { className: `thread-graph-molecule-button-group ${className}`, children });
}

// src/components/graph-workspace/GraphMoleculeViewerLowerButtonGroup.tsx
import { Fragment as Fragment10, jsx as jsx31, jsxs as jsxs22 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs22(Fragment10, { children: [
    /* @__PURE__ */ jsxs22("div", { className: "flex w-full justify-between gap-2 overflow-x-auto", children: [
      /* @__PURE__ */ jsxs22(GraphMoleculeButtonGroup, { children: [
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Distance", children: /* @__PURE__ */ jsx31(AlignVerticalDistributeCenter, { className: "size-4" }) }),
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Connectivity", children: /* @__PURE__ */ jsx31(Share2, { className: "size-4" }) }),
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Angle", children: /* @__PURE__ */ jsx31(Waypoints, { className: "size-4" }) }),
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Dihedral", children: /* @__PURE__ */ jsx31(Spline, { className: "size-4" }) }),
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Add dummy atoms", children: /* @__PURE__ */ jsx31(Bubbles, { className: "size-4" }) }),
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Delete atoms", children: /* @__PURE__ */ jsx31(CircleX, { className: "size-4" }) }),
        /* @__PURE__ */ jsx31(GraphMoleculeIconButton, { label: "Rotate", children: /* @__PURE__ */ jsx31(Rotate3d, { className: "size-4" }) })
      ] }),
      /* @__PURE__ */ jsxs22(GraphMoleculeButtonGroup, { children: [
        /* @__PURE__ */ jsx31(
          GraphMoleculeIconButton,
          {
            label: unitCellVisible ? "Hide unit cell" : "Show unit cell",
            disabled: !unitCellAvailable,
            onClick: onToggleUnitCell,
            children: /* @__PURE__ */ jsx31(Boxes, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx31(
          GraphMoleculeIconButton,
          {
            label: "Clear selection",
            disabled: !hasSelection,
            onClick: onClearSelection,
            children: /* @__PURE__ */ jsx31(Trash22, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx31(
          GraphMoleculeIconButton,
          {
            label: "Send selection",
            disabled: !hasSelection,
            onClick: onSendSelection,
            children: /* @__PURE__ */ jsx31(Send, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx31(
          GraphMoleculeIconButton,
          {
            label: "Stage current selection",
            disabled: !hasSelection,
            onClick: onStageSelection,
            children: /* @__PURE__ */ jsx31(Box, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx31(
          GraphMoleculeIconButton,
          {
            label: "Clear staged selections",
            disabled: !hasStaged,
            onClick: onClearStaged,
            children: /* @__PURE__ */ jsx31(Eraser, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx31(
          GraphMoleculeIconButton,
          {
            label: "Send staged selections",
            disabled: !hasStaged,
            onClick: onSendStaged,
            children: /* @__PURE__ */ jsx31(ArrowUpRight, { className: "size-4" })
          }
        )
      ] })
    ] }),
    cameraInfo ? /* @__PURE__ */ jsxs22("div", { className: "thread-graph-molecule-camera", children: [
      /* @__PURE__ */ jsxs22("div", { children: [
        /* @__PURE__ */ jsx31("strong", { children: "XYZ: " }),
        "x=",
        cameraInfo.position.x.toFixed(1),
        " y=",
        cameraInfo.position.y.toFixed(1),
        " z=",
        cameraInfo.position.z.toFixed(1),
        /* @__PURE__ */ jsx31("br", {}),
        /* @__PURE__ */ jsx31("strong", { children: "Quat: " }),
        "qx=",
        cameraInfo.position.qx.toFixed(2),
        " qy=",
        cameraInfo.position.qy.toFixed(2),
        " qz=",
        cameraInfo.position.qz.toFixed(2),
        " qw=",
        cameraInfo.position.qw.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx31("div", { className: "thread-graph-molecule-camera-divider" }),
      /* @__PURE__ */ jsxs22("div", { className: "flex flex-col gap-1 text-[10px]", children: [
        /* @__PURE__ */ jsxs22("div", { children: [
          "Selected atoms:",
          " ",
          selectedSerials.length > 0 ? selectedSerials.map(
            (serial) => `${selectedAtomLabels[serial] ?? "Atom"}(${serial})`
          ).join(", ") : "None"
        ] }),
        /* @__PURE__ */ jsxs22("div", { children: [
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
import { Box as Box2, Camera, Copy as Copy4, Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { jsx as jsx32, jsxs as jsxs23 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs23(GraphMoleculeButtonGroup, { className: "ml-auto justify-end", children: [
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Copy current structure",
        onClick: () => void handleCopyXYZ(),
        disabled: !xyzContent,
        children: /* @__PURE__ */ jsx32(Copy4, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Download current structure",
        onClick: handleDownloadXYZ,
        disabled: !xyzContent,
        children: /* @__PURE__ */ jsx32(Download, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Download full trajectory",
        onClick: handleDownloadAllXYZ,
        disabled: !exportContent,
        children: /* @__PURE__ */ jsx32(Box2, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Copy screenshot",
        onClick: onScreenshot,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx32(Camera, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx32(ButtonGroupSeparator, { className: "thread-graph-molecule-button-divider" }),
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Zoom in",
        onClick: handleZoomIn,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx32(ZoomIn, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Zoom out",
        onClick: handleZoomOut,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx32(ZoomOut, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx32(
      GraphMoleculeIconButton,
      {
        label: "Reset camera",
        onClick: handleReset,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx32(RotateCcw, { className: "size-3.5" })
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
import { useMemo as useMemo9 } from "react";
import { jsx as jsx33, jsxs as jsxs24 } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  max = 100,
  min = 0,
  value,
  ...props
}) {
  const values = useMemo9(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [defaultValue, max, min, value]
  );
  return /* @__PURE__ */ jsxs24(
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
        /* @__PURE__ */ jsx33(
          SliderPrimitive.Track,
          {
            "data-slot": "slider-track",
            className: "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
            children: /* @__PURE__ */ jsx33(
              SliderPrimitive.Range,
              {
                "data-slot": "slider-range",
                className: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
              }
            )
          }
        ),
        Array.from({ length: values.length }, (_, index) => /* @__PURE__ */ jsx33(
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
import { jsx as jsx34, jsxs as jsxs25 } from "react/jsx-runtime";
function GraphMoleculeViewer({
  className = "",
  moleculeId = null,
  onScreenshot,
  onSelectionChange,
  source,
  title = "PyMOL-style (PDB/CIF)"
}) {
  const viewerHostRef = useRef8(null);
  const viewerRef = useRef8(null);
  const modelRef = useRef8(null);
  const zoomedRef = useRef8(false);
  const unitCellPreferenceRef = useRef8(true);
  const [cameraInfo, setCameraInfo] = useState11(
    null
  );
  const [currentIndex, setCurrentIndex] = useState11(0);
  const [hoveredAtom, setHoveredAtom] = useState11(null);
  const [isPlaying, setIsPlaying] = useState11(false);
  const [selectedAtomLabels, setSelectedAtomLabels] = useState11({});
  const [selectedSerials, setSelectedSerials] = useState11([]);
  const [stagedSelections, setStagedSelections] = useState11({});
  const [unitCellAvailable, setUnitCellAvailable] = useState11(false);
  const [unitCellVisible, setUnitCellVisible] = useState11(false);
  const [viewerInitError, setViewerInitError] = useState11(null);
  const viewerData = useMemo10(() => readGraphMoleculeViewerData(source), [source]);
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
  useEffect11(() => {
    if (xyzArray.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(xyzArray.length - 1);
  }, [xyzArray.length]);
  useEffect11(() => {
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
  useEffect11(() => {
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
  useEffect11(() => {
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
  useEffect11(() => {
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
  useEffect11(() => {
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
  useEffect11(() => {
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
  const handleScreenshot = useCallback5(async () => {
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
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      className: `thread-graph-molecule-viewer flex h-full min-h-0 flex-col bg-white ${className}`,
      children: [
        /* @__PURE__ */ jsxs25("div", { className: "thread-graph-molecule-header flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3", children: [
          /* @__PURE__ */ jsxs25("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx34("h2", { className: "truncate text-sm font-semibold text-slate-900", children: title }),
            /* @__PURE__ */ jsx34("p", { className: "mt-1 hidden text-[11px] text-slate-400 sm:block", children: "cartoon + surface" })
          ] }),
          /* @__PURE__ */ jsx34("span", { className: "shrink-0 text-[11px] text-slate-400", children: "workspace preview" })
        ] }),
        /* @__PURE__ */ jsxs25("div", { className: "thread-graph-molecule-body min-h-0 flex-1", children: [
          /* @__PURE__ */ jsxs25(
            "div",
            {
              ref: viewerHostRef,
              "data-testid": "molecule-viewer",
              className: "thread-graph-molecule-stage relative min-h-0 flex-1 overflow-hidden",
              children: [
                viewerInitError ? /* @__PURE__ */ jsx34(
                  "div",
                  {
                    "data-testid": "molecule-viewer-error",
                    className: "thread-graph-molecule-error absolute inset-0 flex items-center justify-center bg-red-50 p-4 text-sm text-red-700",
                    children: viewerInitError
                  }
                ) : null,
                !viewerInitError && !xyzContent ? /* @__PURE__ */ jsx34("div", { className: "thread-graph-molecule-empty absolute inset-0 flex items-center justify-center p-4 text-sm text-slate-400", children: "No molecule data available." }) : null,
                hoveredAtom ? /* @__PURE__ */ jsxs25(
                  "div",
                  {
                    className: "thread-graph-molecule-tooltip pointer-events-none fixed z-[1000] rounded-md border border-gray-300 bg-white/95 px-2 py-1.5 text-[10px] text-gray-800 shadow-md",
                    style: { left: hoveredAtom.x - 20, top: hoveredAtom.y - 50 },
                    children: [
                      /* @__PURE__ */ jsx34("div", { className: "mb-0.5 font-semibold text-gray-900", children: hoveredAtom.label }),
                      /* @__PURE__ */ jsxs25("div", { className: "space-x-2 text-gray-600", children: [
                        /* @__PURE__ */ jsxs25("span", { children: [
                          "x: ",
                          hoveredAtom.coords.x
                        ] }),
                        /* @__PURE__ */ jsxs25("span", { children: [
                          "y: ",
                          hoveredAtom.coords.y
                        ] }),
                        /* @__PURE__ */ jsxs25("span", { children: [
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
          /* @__PURE__ */ jsxs25("div", { className: "thread-graph-molecule-controls shrink-0", children: [
            /* @__PURE__ */ jsxs25("div", { className: "thread-graph-molecule-control-row", children: [
              /* @__PURE__ */ jsxs25("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx34("p", { className: "thread-graph-molecule-control-title", children: "Ball & Stick" }),
                /* @__PURE__ */ jsx34("p", { className: "thread-graph-molecule-control-subtitle", children: "XYZ / PDB / CIF preview" })
              ] }),
              /* @__PURE__ */ jsx34(
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
            xyzArray.length > 1 ? /* @__PURE__ */ jsxs25("div", { className: "thread-graph-molecule-trajectory", children: [
              /* @__PURE__ */ jsxs25("div", { className: "mb-2 flex justify-between gap-3 text-xs", children: [
                /* @__PURE__ */ jsxs25("span", { className: "flex min-w-0 items-center gap-2", children: [
                  "Trajectory ",
                  currentIndex + 1,
                  " / ",
                  xyzArray.length,
                  /* @__PURE__ */ jsx34(
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
                      children: isPlaying && currentIndex !== xyzArray.length - 1 ? /* @__PURE__ */ jsx34(Pause, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx34(Play, { className: "h-3 w-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs25(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    onClick: () => setCurrentIndex(xyzArray.length - 1),
                    className: "thread-graph-molecule-live-button",
                    children: [
                      /* @__PURE__ */ jsx34(
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
              /* @__PURE__ */ jsx34(
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
            /* @__PURE__ */ jsx34(
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
import { jsx as jsx35, jsxs as jsxs26 } from "react/jsx-runtime";
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
var GraphWorkspaceCodePreview = memo6(function GraphWorkspaceCodePreview2({
  content
}) {
  return /* @__PURE__ */ jsx35("div", { className: "thread-graph-code-preview min-h-0 flex-1 overflow-auto", children: /* @__PURE__ */ jsx35("pre", { className: "thread-graph-plain-code-preview", children: /* @__PURE__ */ jsx35("code", { children: content }) }) });
});
function GraphWorkspacePreviewPane({
  error,
  imageUrl,
  loadingMore,
  onLoadMore,
  onCollapse,
  pdfUrl,
  previewFile,
  previewLoading,
  plugins,
  selectedTarget
}) {
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
  const isLiveArtifactPreview = selectedTarget?.kind === "live-molecule";
  const isArtifactPreview = Boolean(activeNode?.artifact && renderedArtifact);
  const isMoleculePreview = Boolean(moleculeSnapshot) || isArtifactPreview;
  return /* @__PURE__ */ jsxs26(
    "section",
    {
      className: "thread-graph-viewer flex h-full min-h-0 flex-col overflow-hidden rounded-[12px]",
      "data-preview-target-kind": selectedTarget?.kind ?? "none",
      children: [
        /* @__PURE__ */ jsxs26("div", { className: "thread-graph-viewer-header flex h-12 shrink-0 items-center justify-between gap-3 border-b px-3 sm:h-[60px] sm:px-5", children: [
          /* @__PURE__ */ jsxs26("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsx35("h2", { className: "text-base font-semibold text-slate-900 sm:text-[18px] dark:text-slate-100", children: "Viewer" }),
            title ? /* @__PURE__ */ jsx35("span", { className: "min-w-0 truncate text-sm font-medium text-slate-500 dark:text-slate-400", children: title }) : null
          ] }),
          onCollapse ? /* @__PURE__ */ jsx35(
            "button",
            {
              type: "button",
              onClick: onCollapse,
              "data-testid": "collapse-viewer",
              className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100",
              title: "Collapse workspace",
              "aria-label": "Collapse workspace",
              children: /* @__PURE__ */ jsx35(ChevronsRight2, { className: "h-4 w-4" })
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs26("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
          error ? /* @__PURE__ */ jsx35("div", { className: "border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200", children: error }) : null,
          !selectedTarget ? /* @__PURE__ */ jsx35("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500", children: "Pick a live molecule, workspace file, artifact, or thread event to preview it." }) : selectedTarget.kind === "workspace-file" && previewLoading ? /* @__PURE__ */ jsx35("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500", children: "Loading file preview..." }) : selectedTarget.kind === "workspace-file" && moleculeSnapshot ? /* @__PURE__ */ jsx35("div", { className: "thread-graph-molecule-preview min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ jsx35(
            GraphMoleculeViewer,
            {
              source: moleculeSnapshot,
              moleculeId: moleculeSnapshot.uuid ?? selectedTarget.node.path,
              title: "PyMOL-style (PDB/CIF)"
            }
          ) }) : selectedTarget.kind === "workspace-file" && imageUrl ? /* @__PURE__ */ jsx35("div", { className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-5", children: /* @__PURE__ */ jsx35(
            "img",
            {
              src: imageUrl,
              alt: selectedTarget.node.path || selectedTarget.node.name,
              className: "max-h-full max-w-full object-contain"
            }
          ) }) : selectedTarget.kind === "workspace-file" && pdfUrl ? /* @__PURE__ */ jsx35("div", { className: "thread-graph-file-preview-frame min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ jsx35(
            "iframe",
            {
              src: pdfUrl,
              title: `PDF preview: ${selectedTarget.node.path || selectedTarget.node.name}`,
              className: "h-full w-full border-0"
            }
          ) }) : selectedTarget.kind === "workspace-file" && previewFile ? /* @__PURE__ */ jsxs26("div", { className: "flex min-h-0 flex-1 flex-col", children: [
            /* @__PURE__ */ jsxs26("div", { className: "thread-graph-file-preview-header border-b px-4 py-3 text-xs uppercase tracking-[0.12em]", children: [
              selectedFileIsMolecule ? "molecule" : fileLanguage || extension || "text",
              " |",
              " ",
              previewFile.size.toLocaleString(),
              " bytes",
              previewFile.truncated ? /* @__PURE__ */ jsxs26("span", { className: "ml-2 text-amber-500", children: [
                "showing ",
                previewFile.nextOffset.toLocaleString(),
                " bytes"
              ] }) : null
            ] }),
            /* @__PURE__ */ jsx35(
              GraphWorkspaceCodePreview,
              {
                content: previewFile.content
              }
            ),
            previewFile.truncated && onLoadMore ? /* @__PURE__ */ jsx35("div", { className: "thread-graph-file-preview-footer flex justify-center border-t px-4 py-3", children: /* @__PURE__ */ jsx35(
              "button",
              {
                type: "button",
                onClick: onLoadMore,
                disabled: loadingMore,
                className: "thread-graph-load-more-button rounded-md px-4 py-1.5 text-xs disabled:opacity-50",
                children: loadingMore ? "Loading..." : `Load more (${(previewFile.size - previewFile.nextOffset).toLocaleString()} bytes remaining)`
              }
            ) }) : null
          ] }) : (selectedTarget.kind === "live-molecule" || selectedTarget.kind === "artifact") && selectedTarget.node.artifact ? /* @__PURE__ */ jsx35(
            "div",
            {
              className: isMoleculePreview || isLiveArtifactPreview ? "min-h-0 flex-1 overflow-hidden" : "min-h-0 flex-1 overflow-auto p-3",
              children: renderedArtifact
            }
          ) : selectedTarget.kind === "meta" ? /* @__PURE__ */ jsx35("div", { className: "min-h-0 flex-1 overflow-auto p-3", children: /* @__PURE__ */ jsx35("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx35(WorkspaceInfoCard, { label: "Workspace Data", children: /* @__PURE__ */ jsx35(
            GraphWorkspaceCodePreview,
            {
              content: selectedTarget.node.detail ?? ""
            }
          ) }) }) }) : /* @__PURE__ */ jsxs26("div", { className: "flex min-h-0 flex-1 flex-col", children: [
            /* @__PURE__ */ jsx35("div", { className: "thread-graph-file-preview-header border-b px-4 py-3 text-xs uppercase tracking-[0.12em]", children: selectedTarget.node.kind }),
            /* @__PURE__ */ jsx35(
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
import { jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
function GraphEmptyGarbageDialog({
  files,
  onCancel,
  onConfirm
}) {
  return /* @__PURE__ */ jsx36("div", { className: "thread-graph-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ jsxs27("div", { className: "thread-graph-dialog w-full max-w-sm rounded-xl border bg-[var(--theme-panel)] p-6 shadow-xl", children: [
    /* @__PURE__ */ jsx36("h3", { className: "text-base font-semibold text-[var(--theme-fg)]", children: "Empty garbage?" }),
    /* @__PURE__ */ jsxs27("p", { className: "mt-1 text-sm leading-5 text-[var(--theme-fg-muted)]", children: [
      "Permanently delete all files in the",
      " ",
      /* @__PURE__ */ jsx36("code", { className: "rounded bg-[var(--theme-muted)] px-1 text-xs text-[var(--theme-fg-soft)]", children: "garbage/" }),
      " ",
      "folder."
    ] }),
    files.length === 0 ? /* @__PURE__ */ jsx36("p", { className: "mt-3 text-sm text-[var(--theme-fg-muted)]", children: "Garbage is empty." }) : /* @__PURE__ */ jsx36("ul", { className: "mt-3 max-h-40 overflow-y-auto rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface)] p-2 text-xs text-[var(--theme-fg-soft)]", children: files.map((file) => /* @__PURE__ */ jsx36("li", { className: "truncate py-0.5", title: file, children: file }, file)) }),
    /* @__PURE__ */ jsxs27("div", { className: "mt-4 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx36(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "thread-secondary-action rounded-md px-3 py-1.5 text-sm",
          children: "Cancel"
        }
      ),
      files.length > 0 ? /* @__PURE__ */ jsx36(
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

// src/components/graph-workspace/GraphWorkspaceExplorer.tsx
import { jsx as jsx37, jsxs as jsxs28 } from "react/jsx-runtime";
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
    return expanded ? /* @__PURE__ */ jsx37(FolderOpen, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" }) : /* @__PURE__ */ jsx37(Folder, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" });
  }
  const extension = extensionOf(node.name);
  if (extension === "zip") {
    return /* @__PURE__ */ jsx37(FileArchive, { className: "h-4 w-4 text-amber-600" });
  }
  if (node.kind === "file" && ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) {
    return /* @__PURE__ */ jsx37(FileImage, { className: "h-4 w-4 text-sky-500" });
  }
  if (node.kind === "artifact" || ["xyz", "extxyz", "cif", "pdf", "json", "ts", "tsx", "js", "jsx", "md", "yaml", "yml", "py"].includes(
    extension
  )) {
    return /* @__PURE__ */ jsx37(FileCode2, { className: "h-4 w-4 text-emerald-600" });
  }
  return /* @__PURE__ */ jsx37(File, { className: "h-4 w-4 text-slate-400 dark:text-slate-500" });
}
function WorkspaceTreeRow({
  depth,
  expandedPaths,
  node,
  onDownload,
  onSelect,
  onToggle,
  selectedNodeId
}) {
  const isDirectory = node.kind === "directory";
  const expanded = isDirectory && (node.path === "" || expandedPaths.has(node.path));
  const selected = selectedNodeId === node.id;
  const paddingLeft = `${depth * 0.75 + 0.5}rem`;
  if (isDirectory) {
    return /* @__PURE__ */ jsxs28("div", { children: [
      /* @__PURE__ */ jsxs28("div", { className: "thread-graph-tree-row group flex items-center text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100", children: [
        /* @__PURE__ */ jsxs28(
          "button",
          {
            type: "button",
            onClick: () => onToggle(node.path),
            className: "flex min-h-9 min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left sm:min-h-0 sm:py-1.5",
            style: { paddingLeft },
            children: [
              expanded ? /* @__PURE__ */ jsx37(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" }) : /* @__PURE__ */ jsx37(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" }),
              iconForWorkspaceNode(node, expanded),
              /* @__PURE__ */ jsx37("span", { className: "truncate", children: node.name })
            ]
          }
        ),
        onDownload ? /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            onClick: () => onDownload(node),
            className: "thread-graph-tree-action mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-white hover:text-slate-900 sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100",
            title: node.path ? `Download ${node.name}` : "Download workspace",
            "aria-label": node.path ? `Download ${node.name}` : "Download workspace",
            children: /* @__PURE__ */ jsx37(Download2, { className: "h-3.5 w-3.5" })
          }
        ) : null
      ] }),
      expanded ? /* @__PURE__ */ jsx37("div", { children: node.children.map((child) => /* @__PURE__ */ jsx37(
        WorkspaceTreeRow,
        {
          depth: depth + 1,
          expandedPaths,
          node: child,
          ...onDownload ? { onDownload } : {},
          onSelect,
          onToggle,
          selectedNodeId
        },
        child.id
      )) }) : null
    ] });
  }
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      className: `thread-graph-tree-row group flex items-center text-sm transition ${selected ? "is-selected" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100"}`,
      children: [
        /* @__PURE__ */ jsxs28(
          "button",
          {
            type: "button",
            onClick: () => onSelect(node.id),
            className: "flex min-h-9 min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left sm:min-h-0 sm:py-1.5",
            style: { paddingLeft: `${depth * 0.75 + 2.2}rem` },
            children: [
              iconForWorkspaceNode(node, false),
              /* @__PURE__ */ jsx37("span", { className: "truncate", children: node.name })
            ]
          }
        ),
        onDownload && node.kind === "file" ? /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            onClick: () => onDownload(node),
            className: `thread-graph-tree-action mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 ${selected ? "is-selected" : "text-slate-400 hover:bg-white hover:text-slate-900 dark:text-slate-500 dark:hover:bg-[#1d222c] dark:hover:text-slate-100"}`,
            title: `Download ${node.name}`,
            "aria-label": `Download ${node.name}`,
            children: /* @__PURE__ */ jsx37(Download2, { className: "h-3.5 w-3.5" })
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
  return /* @__PURE__ */ jsxs28("div", { className: "border-b border-slate-200 py-2 dark:border-[#2a2f3a]", children: [
    /* @__PURE__ */ jsx37("div", { className: "thread-graph-workspace-label px-3 pb-1 text-[11px] font-semibold tracking-normal text-slate-500 dark:text-slate-400", children: "Live" }),
    /* @__PURE__ */ jsx37("div", { className: "space-y-0.5", children: liveNodes.map((node) => {
      const selected = selectedNodeId === node.id;
      return /* @__PURE__ */ jsxs28(
        "button",
        {
          type: "button",
          "data-testid": "live-molecule-item",
          "data-molecule-id": node.artifact?.id ?? node.id,
          onClick: () => onSelect(node.id),
          className: `thread-graph-tree-row flex min-h-9 w-full items-center gap-2 px-3 py-2 text-left text-sm transition sm:min-h-0 sm:py-1.5 ${selected ? "is-selected" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#222733] dark:hover:text-slate-100"}`,
          children: [
            /* @__PURE__ */ jsx37(
              FileCode2,
              {
                className: `h-4 w-4 shrink-0 ${selected ? "text-current" : "text-emerald-600 dark:text-emerald-300"}`
              }
            ),
            /* @__PURE__ */ jsx37("span", { className: "min-w-0 flex-1 truncate", children: node.name })
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
  const visibleTree = useMemo11(
    () => ({
      ...tree,
      children: tree.children.filter((node) => node.path !== "live")
    }),
    [tree]
  );
  return /* @__PURE__ */ jsxs28("aside", { className: `${explorerPanelClassName} flex flex-col`, children: [
    /* @__PURE__ */ jsxs28("div", { className: explorerHeaderClassName, children: [
      /* @__PURE__ */ jsx37("div", { className: "min-w-0", children: /* @__PURE__ */ jsx37("h2", { className: explorerHeadingClassName, children: "Explorer" }) }),
      /* @__PURE__ */ jsxs28("div", { className: "flex items-center gap-1", children: [
        onCollapse ? /* @__PURE__ */ jsxs28(
          "button",
          {
            type: "button",
            "data-testid": "collapse-explorer",
            onClick: onCollapse,
            className: collapseGhostButtonClassName,
            title: "Collapse Explorer",
            "aria-label": "Collapse Explorer",
            children: [
              /* @__PURE__ */ jsx37(ChevronsLeft2, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx37("span", { className: "sr-only", children: "Collapse Explorer" })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            onClick: onUpload,
            disabled: !canUpload,
            className: explorerIconButtonClassName,
            title: canUpload ? "Upload file" : "Upload is unavailable for this workspace",
            "aria-label": "Upload file",
            children: /* @__PURE__ */ jsx37(Upload, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            onClick: onRefresh,
            className: explorerIconButtonClassName,
            title: "Refresh workspace",
            "aria-label": "Refresh workspace",
            children: /* @__PURE__ */ jsx37(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` })
          }
        ),
        onEmptyGarbage ? /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            onClick: onEmptyGarbage,
            disabled: !canEmptyGarbage,
            className: explorerIconButtonClassName,
            title: canEmptyGarbage ? "Empty garbage" : "Garbage controls are unavailable",
            "aria-label": "Empty garbage",
            children: /* @__PURE__ */ jsx37(Trash23, { className: "h-4 w-4" })
          }
        ) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxs28("div", { className: "min-h-0 flex-1 overflow-y-auto py-2", children: [
      /* @__PURE__ */ jsx37(
        LiveWorkspaceSection,
        {
          liveNodes: liveNodes ?? [],
          onSelect,
          selectedNodeId
        }
      ),
      /* @__PURE__ */ jsx37("div", { className: workspaceLabelClassName, children: "Workspace" }),
      loading ? /* @__PURE__ */ jsx37("p", { className: workspaceLoadingClassName, children: "Loading workspace..." }) : null,
      /* @__PURE__ */ jsx37(
        WorkspaceTreeRow,
        {
          depth: 0,
          expandedPaths,
          node: visibleTree,
          ...onDownload ? { onDownload } : {},
          onSelect,
          onToggle,
          selectedNodeId
        }
      ),
      visibleTree.children.length === 0 ? /* @__PURE__ */ jsx37("p", { className: emptyWorkspaceClassName, children: "This workspace is empty. Agent tool runs execute inside the thread workspace, so files should appear here as the session works." }) : null
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
  const [adapterTree, setAdapterTree] = useState12(null);
  const fallbackTree = useMemo11(
    () => workspaceAdapter && adapterTree ? null : collectWorkspaceItems(detail, artifacts, status, activeView),
    [activeView, adapterTree, artifacts, detail, status, workspaceAdapter]
  );
  const tree = adapterTree ?? fallbackTree ?? collectWorkspaceItems(detail, artifacts, status, activeView);
  const nodeMap = useMemo11(() => flattenWorkspaceNodes(tree), [tree]);
  const liveNodes = useMemo11(
    () => tree.children.find((node) => node.path === "live")?.children ?? [],
    [tree]
  );
  const firstSelectableNode = findFirstPreviewNode(tree);
  const [selectedNodeId, setSelectedNodeId] = useState12(
    () => firstSelectableNode?.id ?? null
  );
  const [expandedPaths, setExpandedPaths] = useState12(
    () => /* @__PURE__ */ new Set([
      "",
      "artifacts",
      "thread-events",
      "live",
      ...collectAncestorPaths(firstSelectableNode?.path ?? "")
    ])
  );
  const [collapsedPanel, setCollapsedPanel] = useState12(null);
  const [workspaceError, setWorkspaceError] = useState12(null);
  const [loadingTree, setLoadingTree] = useState12(false);
  const [previewLoading, setPreviewLoading] = useState12(false);
  const [loadingMore, setLoadingMore] = useState12(false);
  const [showGarbageDialog, setShowGarbageDialog] = useState12(false);
  const [garbageFiles, setGarbageFiles] = useState12([]);
  const [previewFile, setPreviewFile] = useState12(null);
  const [imageUrl, setImageUrl] = useState12(null);
  const [pdfUrl, setPdfUrl] = useState12(null);
  const [workspaceVersion, setWorkspaceVersion] = useState12(0);
  const [isMobileViewport, setIsMobileViewport] = useState12(false);
  const fileInputRef = useRef9(null);
  const workspaceChangeTimerRef = useRef9(null);
  const activeNode = (selectedNodeId ? nodeMap.get(selectedNodeId) : null) ?? firstSelectableNode ?? null;
  const workspaceIdentity = {
    threadId: detail.thread.id,
    workspaceId: detail.workspace.id ?? detail.thread.workspaceId ?? null
  };
  useEffect12(() => {
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
  useEffect12(() => {
    return () => {
      if (workspaceChangeTimerRef.current !== null) {
        window.clearTimeout(workspaceChangeTimerRef.current);
      }
    };
  }, []);
  useEffect12(() => {
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
        await workspaceAdapter.listTree(workspaceIdentity)
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
  useEffect12(() => {
    setAdapterTree(null);
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
  useEffect12(() => {
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
  useEffect12(() => {
    const selectedPathCandidate = workspaceAdapter && activeNode?.kind === "file" ? activeNode.path : null;
    if (!selectedPathCandidate) {
      setPreviewFile(null);
      setImageUrl(null);
      setPdfUrl(null);
      return;
    }
    const selectedPath = selectedPathCandidate;
    let cancelled = false;
    let objectUrl = null;
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
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
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
  }
  const explorerPanel = /* @__PURE__ */ jsx37(
    WorkspaceExplorerPanel,
    {
      canEmptyGarbage: Boolean(workspaceAdapter?.emptyGarbage),
      canUpload: Boolean(workspaceAdapter?.uploadFile),
      ...!isMobileViewport ? { onCollapse: () => setCollapsedPanel("explorer") } : {},
      expandedPaths,
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
  const viewerPanel = /* @__PURE__ */ jsx37(
    GraphWorkspacePreviewPane,
    {
      error: workspaceError,
      imageUrl,
      loadingMore,
      onLoadMore: handleLoadMore,
      ...!isMobileViewport ? { onCollapse: () => setCollapsedPanel("viewer") } : {},
      pdfUrl,
      previewFile,
      previewLoading,
      plugins,
      selectedTarget: graphWorkspacePreviewTargetFromNode(activeNode)
    }
  );
  if (collapsedPanel === "explorer") {
    return /* @__PURE__ */ jsxs28(
      "div",
      {
        "data-testid": "workspace-panel",
        className: "relative h-full min-h-0 w-full overflow-hidden p-2",
        children: [
          /* @__PURE__ */ jsx37(
            "button",
            {
              type: "button",
              "data-testid": "expand-explorer",
              onClick: () => setCollapsedPanel(null),
              className: "thread-graph-panel-expand-fab left-3",
              title: "Expand Explorer",
              "aria-label": "Expand Explorer",
              children: /* @__PURE__ */ jsx37(ChevronsRight3, { className: "h-4 w-4" })
            }
          ),
          viewerPanel
        ]
      }
    );
  }
  if (collapsedPanel === "viewer") {
    return /* @__PURE__ */ jsxs28(
      "div",
      {
        "data-testid": "workspace-panel",
        className: "relative h-full min-h-0 w-full overflow-hidden p-2",
        children: [
          explorerPanel,
          /* @__PURE__ */ jsx37(
            "button",
            {
              type: "button",
              "data-testid": "expand-viewer",
              onClick: () => setCollapsedPanel(null),
              className: "thread-graph-panel-expand-fab right-3",
              title: "Expand Viewer",
              "aria-label": "Expand Viewer",
              children: /* @__PURE__ */ jsx37(ChevronsLeft2, { className: "h-4 w-4" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      "data-testid": "workspace-panel",
      className: "flex h-full min-h-0 w-full overflow-hidden bg-transparent p-2",
      children: [
        showGarbageDialog ? /* @__PURE__ */ jsx37(
          GraphEmptyGarbageDialog,
          {
            files: garbageFiles,
            onCancel: () => setShowGarbageDialog(false),
            onConfirm: () => void handleConfirmEmptyGarbage()
          }
        ) : null,
        isMobileViewport ? /* @__PURE__ */ jsxs28("div", { className: "thread-graph-workspace-mobile-stack flex h-full min-h-0 w-full flex-col", children: [
          /* @__PURE__ */ jsx37("div", { className: "thread-graph-workspace-mobile-explorer h-[34%] min-h-[11rem] shrink-0 overflow-hidden border-b", children: explorerPanel }),
          /* @__PURE__ */ jsx37("div", { className: "thread-graph-workspace-mobile-viewer min-h-0 flex-1 overflow-hidden", children: viewerPanel })
        ] }) : /* @__PURE__ */ jsxs28(
          ResizablePanelGroup,
          {
            direction: "horizontal",
            className: "thread-graph-workspace-resizable",
            children: [
              /* @__PURE__ */ jsx37(ResizablePanel, { defaultSize: 33, minSize: 20, children: /* @__PURE__ */ jsx37("div", { className: "thread-graph-workspace-explorer-pane h-full min-h-0 overflow-hidden", children: explorerPanel }) }),
              /* @__PURE__ */ jsx37(ResizableHandle, { className: "thread-graph-workspace-resize-handle w-2 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" }),
              /* @__PURE__ */ jsx37(ResizablePanel, { defaultSize: 67, minSize: 30, children: /* @__PURE__ */ jsx37("div", { className: "thread-graph-workspace-viewer-pane h-full min-h-0 overflow-hidden", children: viewerPanel }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx37(
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
  MessageSquare as MessageSquare2,
  MoveRight,
  Plus as Plus2,
  RefreshCw as RefreshCw2,
  Trash2 as Trash24,
  Upload as Upload2,
  Zap
} from "lucide-react";
import { Fragment as Fragment11, jsx as jsx38, jsxs as jsxs29 } from "react/jsx-runtime";
function GuideTag({ children }) {
  return /* @__PURE__ */ jsx38("span", { className: "thread-guide-tag inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[10px]", children });
}
function GuideBullets({ items }) {
  return /* @__PURE__ */ jsx38("ul", { className: "space-y-1 text-[12px] text-[var(--theme-fg-muted)]", children: items.map((item, index) => /* @__PURE__ */ jsxs29("li", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx38("span", { className: "mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[var(--theme-border-contrast)]" }),
    /* @__PURE__ */ jsx38("span", { children: item })
  ] }, index)) });
}
function SectionIcon({ children }) {
  return /* @__PURE__ */ jsx38("span", { className: "thread-guide-icon flex h-5 w-5 shrink-0 items-center justify-center rounded-md", children });
}
function GuideAccordionItem({
  value,
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxs29(
    AccordionItem,
    {
      value,
      className: "thread-guide-section border-b border-[var(--theme-border)] last:border-b-0",
      children: [
        /* @__PURE__ */ jsx38(AccordionTrigger, { className: "py-3 hover:no-underline [&[data-state=open]]:pb-2", children: /* @__PURE__ */ jsxs29("div", { className: "flex items-center gap-2 text-xs font-semibold text-[var(--theme-fg)]", children: [
          /* @__PURE__ */ jsx38(SectionIcon, { children: icon }),
          title
        ] }) }),
        /* @__PURE__ */ jsx38(AccordionContent, { className: "space-y-3 pb-3", children })
      ]
    }
  );
}
function GraphGuidePanel() {
  return /* @__PURE__ */ jsxs29("div", { className: "flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs29("div", { className: "shrink-0 border-b border-[var(--theme-border)] px-4 py-3", children: [
      /* @__PURE__ */ jsx38("h2", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "What can I do?" }),
      /* @__PURE__ */ jsx38("p", { className: "mt-0.5 text-[11px] text-[var(--theme-fg-muted)]", children: "Upload files, ask in plain language, get results." })
    ] }),
    /* @__PURE__ */ jsx38("div", { className: "min-h-0 flex-1 overflow-y-auto px-3 pb-6", children: /* @__PURE__ */ jsxs29(
      Accordion,
      {
        type: "multiple",
        defaultValue: ["start", "workspace", "remote-codex"],
        className: "space-y-0",
        children: [
          /* @__PURE__ */ jsxs29(
            GuideAccordionItem,
            {
              value: "start",
              title: "Getting Started",
              icon: /* @__PURE__ */ jsx38(Zap, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "graphchat connects a language model to your files and a set of tools. Each Remote Codex thread has its own isolated workspace." }),
                /* @__PURE__ */ jsx38(
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
          /* @__PURE__ */ jsxs29(
            GuideAccordionItem,
            {
              value: "workspace",
              title: "Workspace Explorer",
              icon: /* @__PURE__ */ jsx38(FolderOpen2, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(Upload2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Upload" }),
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Upload files through the Workspace panel when the host exposes workspace upload support. Composer attachments stay available for prompt context." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(Plus2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "New files and folders" }),
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Remote Codex normally creates files through tools and shell commands. They appear in Explorer after workspace refreshes." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(MoveRight, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Move and organize" }),
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Use the agent or terminal to reorganize files. Explorer keeps the GraphChat file tree and preview flow." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(Trash24, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Garbage folder" }),
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "If the host exposes garbage controls, Explorer can permanently empty unwanted workspace files." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(RefreshCw2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Refresh" }),
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Resync the file tree manually after shell commands, external changes, or agent tool runs." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs29("div", { className: "rounded-lg border border-[var(--theme-border)] p-2.5", children: [
                  /* @__PURE__ */ jsx38("p", { className: "mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "Preview surfaces" }),
                  /* @__PURE__ */ jsx38(
                    GuideBullets,
                    {
                      items: [
                        /* @__PURE__ */ jsxs29(Fragment11, { children: [
                          /* @__PURE__ */ jsx38(GuideTag, { children: ".xyz .extxyz .cif" }),
                          " use the 3D molecule plugin."
                        ] }),
                        /* @__PURE__ */ jsxs29(Fragment11, { children: [
                          /* @__PURE__ */ jsx38(GuideTag, { children: ".png .jpg .gif .svg .webp" }),
                          " use inline image preview."
                        ] }),
                        /* @__PURE__ */ jsxs29(Fragment11, { children: [
                          /* @__PURE__ */ jsx38(GuideTag, { children: ".py .json .ts .md .csv" }),
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
          /* @__PURE__ */ jsxs29(
            GuideAccordionItem,
            {
              value: "viewer",
              title: "Viewer",
              icon: /* @__PURE__ */ jsx38(FileImage2, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsx38("p", { className: "text-[11px] leading-5 text-[var(--theme-fg-muted)]", children: "Viewer is the GraphChat-style artifact surface. It opens Remote Codex artifacts through the same frontend plugin renderers used in rich message bubbles, and previews workspace files from Explorer." }),
                /* @__PURE__ */ jsx38(
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
          /* @__PURE__ */ jsxs29(
            GuideAccordionItem,
            {
              value: "usage",
              title: "Tool Usage & Chat",
              icon: /* @__PURE__ */ jsx38(BarChart2, { className: "h-3 w-3" }),
              children: [
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(BarChart2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Usage tab" }),
                    /* @__PURE__ */ jsx38(
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
                /* @__PURE__ */ jsxs29("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx38(MessageSquare2, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
                  /* @__PURE__ */ jsxs29("div", { children: [
                    /* @__PURE__ */ jsx38("p", { className: "text-[11px] font-medium text-[var(--theme-fg)]", children: "Chat controls" }),
                    /* @__PURE__ */ jsx38(
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
          /* @__PURE__ */ jsx38(
            GuideAccordionItem,
            {
              value: "remote-codex",
              title: "Remote Codex Extras",
              icon: /* @__PURE__ */ jsx38(Code2, { className: "h-3 w-3" }),
              children: /* @__PURE__ */ jsx38(
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
import { useEffect as useEffect13, useRef as useRef10, useState as useState13 } from "react";
import { RefreshCw as RefreshCw3 } from "lucide-react";
import { jsx as jsx39, jsxs as jsxs30 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs30("div", { children: [
    /* @__PURE__ */ jsx39("p", { className: "mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: label }),
    /* @__PURE__ */ jsx39("pre", { className: "max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-[var(--theme-surface-strong)] p-2 text-[11px] leading-relaxed text-[var(--theme-fg-soft)]", children: formatValue(value) })
  ] });
}
function ToolEventAccordion({ event }) {
  return /* @__PURE__ */ jsxs30(
    AccordionItem,
    {
      value: event.id,
      className: "thread-tool-call mb-2 overflow-hidden rounded-lg border border-[var(--theme-border)] last:mb-0",
      children: [
        /* @__PURE__ */ jsxs30(AccordionTrigger, { className: "px-3 py-2 text-xs font-medium text-[var(--theme-fg)] hover:bg-[var(--theme-hover)] hover:no-underline [&[data-state=open]]:bg-[var(--theme-hover)]", children: [
          /* @__PURE__ */ jsxs30("div", { className: "flex min-w-0 items-center gap-2", children: [
            /* @__PURE__ */ jsx39("span", { className: "h-2 w-2 shrink-0 rounded-full bg-[var(--theme-accent-strong)]" }),
            /* @__PURE__ */ jsx39("span", { className: "truncate font-mono text-xs font-medium text-[var(--theme-fg)]", children: event.label }),
            event.status ? /* @__PURE__ */ jsx39("span", { className: "shrink-0 rounded-full border border-[var(--theme-border)] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[var(--theme-fg-muted)]", children: event.status }) : null
          ] }),
          /* @__PURE__ */ jsx39("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: event.turnId ? /* @__PURE__ */ jsx39("span", { className: "max-w-20 truncate text-[10px] text-[var(--theme-fg-muted)]", children: event.turnId }) : null })
        ] }),
        /* @__PURE__ */ jsx39(AccordionContent, { className: "px-3 pb-3", children: /* @__PURE__ */ jsxs30("div", { className: "space-y-2 px-3 pb-3 pt-1", children: [
          /* @__PURE__ */ jsx39(CallSection, { label: "Input", value: event.preview }),
          /* @__PURE__ */ jsx39(CallSection, { label: "Output", value: event.detail })
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
  const [expandedEventId, setExpandedEventId] = useState13(
    () => toolEvents.at(-1)?.id ?? null
  );
  const bottomRef = useRef10(null);
  useEffect13(() => {
    setExpandedEventId((current) => current ?? toolEvents.at(-1)?.id ?? null);
  }, [toolEvents]);
  useEffect13(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [toolEvents.length]);
  if (!toolCounts.length) {
    return /* @__PURE__ */ jsxs30("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-sm text-[var(--theme-fg-muted)]", children: [
      /* @__PURE__ */ jsx39("span", { children: "No tool calls yet. Run the agent to see usage." }),
      /* @__PURE__ */ jsxs30("span", { className: "inline-flex items-center gap-1 rounded px-2 py-1 text-xs", children: [
        /* @__PURE__ */ jsx39(RefreshCw3, { className: "h-3 w-3" }),
        "Reload from workspace"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs30("div", { className: "flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs30("div", { className: "shrink-0 border-b border-[var(--theme-border)] p-4", children: [
      /* @__PURE__ */ jsxs30("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx39("h2", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "Calls this session" }),
        /* @__PURE__ */ jsxs30(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] text-[var(--theme-fg-muted)] opacity-60",
            disabled: true,
            title: "Remote Codex streams tool history from thread events",
            children: [
              /* @__PURE__ */ jsx39(RefreshCw3, { className: "h-3 w-3" }),
              "Reload"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx39("div", { className: "space-y-2", children: toolCounts.map(([kind, count]) => /* @__PURE__ */ jsxs30("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx39(
          "span",
          {
            className: "w-40 shrink-0 truncate text-right font-mono text-[11px] text-[var(--theme-fg-muted)]",
            title: formatToolKind2(kind),
            children: formatToolKind2(kind)
          }
        ),
        /* @__PURE__ */ jsxs30("div", { className: "flex flex-1 items-center gap-2", children: [
          /* @__PURE__ */ jsx39("div", { className: "relative h-4 flex-1 overflow-hidden rounded-sm bg-[var(--theme-muted)]", children: /* @__PURE__ */ jsx39(
            "div",
            {
              className: "h-full rounded-sm bg-[var(--theme-accent-strong)] transition-all duration-300",
              style: { width: `${count / maxToolCount * 100}%` }
            }
          ) }),
          /* @__PURE__ */ jsx39("span", { className: "w-5 shrink-0 text-right text-[11px] font-medium text-[var(--theme-fg-soft)]", children: count })
        ] })
      ] }, kind)) })
    ] }),
    /* @__PURE__ */ jsxs30("div", { className: "min-h-0 flex-1 overflow-y-auto p-4", children: [
      /* @__PURE__ */ jsx39("h2", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--theme-fg-muted)]", children: "Call log" }),
      /* @__PURE__ */ jsx39(
        Accordion,
        {
          type: "single",
          collapsible: true,
          value: expandedEventId ?? "",
          onValueChange: (value) => setExpandedEventId(value || null),
          className: "space-y-0",
          children: toolEvents.slice(-50).map((event) => /* @__PURE__ */ jsx39(ToolEventAccordion, { event }, event.id))
        }
      ),
      /* @__PURE__ */ jsx39("div", { ref: bottomRef })
    ] })
  ] });
}

// src/components/graph-chat/GraphVisualization.tsx
import { useCallback as useCallback6, useEffect as useEffect14, useMemo as useMemo12 } from "react";
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
import { jsx as jsx40, jsxs as jsxs31 } from "react/jsx-runtime";
function getNodeIntersection(intersectionNode, targetNode) {
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } = intersectionNode.measured;
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;
  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;
  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.measured.width / 2;
  const y1 = targetPosition.y + targetNode.measured.height / 2;
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
  if (px >= nx + n.measured.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.measured.height - 1) {
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
      label: /* @__PURE__ */ jsxs31("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx40("div", { className: "text-sm font-semibold", children: node.name }),
        node.description ? /* @__PURE__ */ jsx40("div", { className: "mt-1 max-w-32 overflow-hidden text-ellipsis text-xs text-slate-500 dark:text-slate-400", children: node.description }) : null
      ] })
    }
  }));
  return { nodes, edges };
}

// src/components/graph-chat/FloatingConnectionLine.tsx
import { jsx as jsx41, jsxs as jsxs32 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs32("g", { children: [
    /* @__PURE__ */ jsx41(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "animated",
        d: edgePath
      }
    ),
    /* @__PURE__ */ jsx41(
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
import { jsx as jsx42 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx42(
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
import { jsx as jsx43, jsxs as jsxs33 } from "react/jsx-runtime";
function GraphVisualization({ nodes: inputNodes }) {
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState([]);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState([]);
  const graph = useMemo12(() => buildGraph(inputNodes), [inputNodes]);
  const edgeTypes = useMemo12(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo12(
    () => ({
      styledNode: ({ data, isConnectable }) => /* @__PURE__ */ jsxs33("div", { className: "thread-graph-flow-node", children: [
        data.label,
        /* @__PURE__ */ jsx43(
          Handle,
          {
            type: "target",
            position: Position4.Top,
            isConnectable,
            style: { opacity: 0, pointerEvents: "none" }
          }
        ),
        /* @__PURE__ */ jsx43(
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
  useEffect14(() => {
    setFlowNodes(graph.nodes);
    setFlowEdges(graph.edges);
  }, [graph.edges, graph.nodes, setFlowEdges, setFlowNodes]);
  const onConnect = useCallback6(
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
  return /* @__PURE__ */ jsx43("div", { className: "thread-graph-flow h-full min-h-0", children: /* @__PURE__ */ jsx43(ReactFlowProvider, { children: /* @__PURE__ */ jsxs33(
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
        /* @__PURE__ */ jsx43(Controls, {}),
        /* @__PURE__ */ jsx43(Background, { gap: 16 })
      ]
    }
  ) }) });
}

// src/components/ThreadGraphWorkspacePanel.tsx
import { jsx as jsx44, jsxs as jsxs34 } from "react/jsx-runtime";
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
  const features = useMemo13(
    () => resolveWorkspaceFeatures(featureConfig),
    [featureConfig]
  );
  const initialTab = firstEnabledWorkspaceTab(features, featureConfig?.defaultTab);
  const [activeTab, setActiveTab] = useState14(initialTab);
  const artifacts = useMemo13(() => collectArtifacts(detail), [detail]);
  const toolEvents = useMemo13(() => collectToolEvents(detail), [detail]);
  const toolCounts = useMemo13(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const event of toolEvents) {
      counts.set(event.kind, (counts.get(event.kind) ?? 0) + 1);
    }
    return [...counts.entries()].sort((left, right) => right[1] - left[1]);
  }, [toolEvents]);
  const threadPanels = plugins.getThreadPanels();
  const maxToolCount = Math.max(...toolCounts.map(([, count]) => count), 1);
  const graphNodes = useMemo13(
    () => collectGraphNodes(detail, toolEvents),
    [detail, toolEvents]
  );
  const primaryTabs = useMemo13(() => {
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
  const secondaryTabs = useMemo13(() => {
    const tabs = [];
    if (features.threadGraph) {
      tabs.push({ id: "graph", label: "Thread graph", icon: GitBranch });
    }
    if (features.extensions) {
      tabs.push({ id: "extensions", label: "Remote Codex extensions", icon: Wrench3 });
    }
    return tabs;
  }, [features.extensions, features.threadGraph]);
  useEffect15(() => {
    if (!activeTab || !isWorkspaceTabEnabled(features, activeTab)) {
      setActiveTab(firstEnabledWorkspaceTab(features, featureConfig?.defaultTab));
    }
  }, [activeTab, featureConfig?.defaultTab, features]);
  if (!activeTab) {
    return null;
  }
  return /* @__PURE__ */ jsxs34("div", { className: "thread-graph-right-panel flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs34("div", { className: "thread-graph-right-tabs flex shrink-0 items-center gap-1 overflow-hidden border-b px-3 py-2", children: [
      primaryTabs.map((tab) => {
        const Icon = tab.icon;
        return /* @__PURE__ */ jsxs34(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `thread-graph-right-tab inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition ${activeTab === tab.id ? "is-active" : ""}`,
            children: [
              Icon ? /* @__PURE__ */ jsx44(Icon, { className: "h-3.5 w-3.5" }) : null,
              tab.label
            ]
          },
          tab.id
        );
      }),
      secondaryTabs.length ? /* @__PURE__ */ jsx44(
        "div",
        {
          className: "thread-graph-right-tab-secondary ml-auto flex min-w-0 shrink items-center gap-1 border-l pl-2",
          "aria-label": "Remote Codex workspace extensions",
          children: secondaryTabs.map((tab) => {
            const Icon = tab.icon;
            return /* @__PURE__ */ jsx44(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab.id),
                className: `thread-graph-right-tab inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-medium transition ${activeTab === tab.id ? "is-active" : ""}`,
                title: tab.label,
                "aria-label": tab.label,
                children: /* @__PURE__ */ jsx44(Icon, { className: "h-3.5 w-3.5" })
              },
              tab.id
            );
          })
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs34("div", { className: "min-h-0 flex-1 overflow-hidden", children: [
      activeTab === "workspace" ? /* @__PURE__ */ jsx44(
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
      activeTab === "tools" ? /* @__PURE__ */ jsx44(
        GraphToolUsagePanel,
        {
          formatToolKind,
          toolCounts,
          toolEvents,
          maxToolCount
        }
      ) : null,
      activeTab === "graph" ? /* @__PURE__ */ jsx44("div", { className: "thread-graph-visualization-panel h-full min-h-0 p-3", children: /* @__PURE__ */ jsx44(GraphVisualization, { nodes: graphNodes }) }) : null,
      activeTab === "extensions" ? /* @__PURE__ */ jsx44("div", { className: "h-full min-h-0 overflow-y-auto p-3", children: /* @__PURE__ */ jsxs34("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx44(WorkspaceInfoCard, { label: "Plugin Panels", children: threadPanels.length ? /* @__PURE__ */ jsx44("div", { className: "flex flex-wrap gap-2", children: threadPanels.map((panel) => /* @__PURE__ */ jsx44(
          "span",
          {
            className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]",
            children: panel.label
          },
          panel.id
        )) }) : /* @__PURE__ */ jsx44("p", { className: "text-[var(--theme-fg-muted)]", children: "No thread panels are enabled." }) }),
        /* @__PURE__ */ jsx44(WorkspaceInfoCard, { label: "Enabled Renderers", children: /* @__PURE__ */ jsx44("div", { className: "flex flex-wrap gap-2", children: plugins.plugins.filter((plugin) => plugin.enabled).map((plugin) => /* @__PURE__ */ jsx44(
          "span",
          {
            className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]",
            children: plugin.name
          },
          plugin.id
        )) }) }),
        /* @__PURE__ */ jsx44(WorkspaceInfoCard, { label: "Remote Codex Tools", children: /* @__PURE__ */ jsxs34("div", { className: "grid gap-2 text-[var(--theme-fg-muted)]", children: [
          /* @__PURE__ */ jsxs34("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx44(Terminal2, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx44("p", { children: "Terminal stays available when the Terminal plugin and shell adapter are attached." })
          ] }),
          /* @__PURE__ */ jsxs34("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx44(Paperclip, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx44("p", { children: "Composer attachments, slash panels, hooks, MCP, goals, and fork controls remain part of the chat surface." })
          ] }),
          /* @__PURE__ */ jsxs34("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx44(Trash25, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx44("p", { children: "Destructive actions stay explicit: delete thread, interrupt, compact, and hook trust controls remain host governed." })
          ] })
        ] }) }),
        metaContent ? /* @__PURE__ */ jsx44(WorkspaceInfoCard, { label: "Thread Meta", children: metaContent }) : null,
        settingsContent ? /* @__PURE__ */ jsx44(WorkspaceInfoCard, { label: "Settings", children: settingsContent }) : null
      ] }) }) : null,
      activeTab === "guide" ? /* @__PURE__ */ jsx44(GraphGuidePanel, {}) : null
    ] })
  ] });
}
var MemoizedThreadGraphWorkspacePanel = memo7(
  ThreadGraphWorkspacePanel
);

// src/components/ConfirmDialog.tsx
import { useEffect as useEffect16 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx45, jsxs as jsxs35 } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busy = false,
  onCancel,
  onConfirm
}) {
  useEffect16(() => {
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
    /* @__PURE__ */ jsxs35("div", { className: "fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx45(
        "button",
        {
          type: "button",
          "aria-label": "Close confirmation dialog",
          onClick: onCancel,
          disabled: busy,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxs35(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: "relative z-[1] w-full max-w-md rounded-[1.6rem] border border-stone-700 bg-stone-900 p-5 shadow-2xl shadow-stone-950/40 sm:p-6",
          children: [
            /* @__PURE__ */ jsxs35("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs35("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx45("p", { className: "text-sm font-medium text-stone-100", children: title }),
                /* @__PURE__ */ jsx45("p", { className: "mt-2 text-sm leading-6 text-stone-400", children: description })
              ] }),
              /* @__PURE__ */ jsx45(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx45("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx45("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs35("div", { className: "mt-5 flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx45(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: busy,
                  className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx45(
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
import { useEffect as useEffect17, useMemo as useMemo14, useState as useState15 } from "react";
import { createPortal as createPortal4 } from "react-dom";
import { jsx as jsx46, jsxs as jsxs36 } from "react/jsx-runtime";
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
  const turns = useMemo14(() => turnsState.data?.turns ?? [], [turnsState.data?.turns]);
  const latestTurnIds = useMemo14(
    () => turns.slice(0, 10).map((turn) => turn.turnId),
    [turns]
  );
  const [mode, setMode] = useState15("latest");
  const [selectedTurnIds, setSelectedTurnIds] = useState15(
    () => /* @__PURE__ */ new Set()
  );
  const [includeTokenAndPrice, setIncludeTokenAndPrice] = useState15(true);
  const [format, setFormat] = useState15("pdf");
  const [effectiveTheme, setEffectiveTheme] = useState15(
    () => typeof document !== "undefined" && !document.documentElement.classList.contains("dark") ? "light" : "dark"
  );
  useEffect17(() => {
    if (!open) {
      return;
    }
    setMode("latest");
    setFormat("pdf");
    setIncludeTokenAndPrice(true);
    void onLoadTurns();
  }, [onLoadTurns, open]);
  useEffect17(() => {
    if (open && turns.length > 0) {
      setSelectedTurnIds(new Set(latestTurnIds));
    }
  }, [latestTurnIds, open, turns.length]);
  useEffect17(() => {
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
  useEffect17(() => {
    if (!open) {
      return;
    }
    const shell = document.querySelector(".thread-ui-shell");
    const readTheme = () => {
      if (!shell) {
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
      }
      return shell.getAttribute("data-theme-effective") === "dark" || shell.classList.contains("dark") || shell.classList.contains("thread-ui-theme-dark") ? "dark" : "light";
    };
    setEffectiveTheme(readTheme());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setEffectiveTheme(readTheme()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ["class", "data-theme-effective"]
    });
    return () => observer.disconnect();
  }, [open]);
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
    /* @__PURE__ */ jsxs36(
      "div",
      {
        className: `thread-export-dialog-root thread-ui-theme-${effectiveTheme} fixed inset-0 z-[96] flex items-center justify-center p-3 sm:p-6`,
        "data-theme-effective": effectiveTheme,
        children: [
          /* @__PURE__ */ jsx46(
            "button",
            {
              type: "button",
              "aria-label": "Close export dialog",
              onClick: onCancel,
              disabled: busy,
              className: "thread-export-dialog-backdrop absolute inset-0 backdrop-blur-sm disabled:cursor-not-allowed"
            }
          ),
          /* @__PURE__ */ jsxs36(
            "div",
            {
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Export transcript",
              className: "thread-export-dialog-panel relative z-[1] flex max-h-[min(46rem,calc(100vh-2rem))] w-full max-w-2xl flex-col rounded-[1.6rem] border shadow-2xl",
              children: [
                /* @__PURE__ */ jsxs36("div", { className: "thread-export-dialog-header flex items-start justify-between gap-3 border-b px-5 py-4", children: [
                  /* @__PURE__ */ jsxs36("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx46("p", { className: "thread-export-dialog-title text-sm font-semibold", children: "Export transcript" }),
                    /* @__PURE__ */ jsx46("p", { className: "thread-export-dialog-subtitle mt-1 text-xs", children: "Default review copy summarizes command batches and file changes." })
                  ] }),
                  /* @__PURE__ */ jsx46(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Close dialog",
                      onClick: onCancel,
                      disabled: busy,
                      className: "thread-export-dialog-icon-button inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: /* @__PURE__ */ jsx46("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx46("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs36("div", { className: "min-h-0 flex-1 overflow-auto px-5 py-4", children: [
                  /* @__PURE__ */ jsx46("div", { className: "thread-export-dialog-segment inline-flex rounded-full border p-1", children: [
                    ["latest", "Latest 10"],
                    ["selected", "Custom selection"]
                  ].map(([entryMode, label]) => /* @__PURE__ */ jsx46(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMode(entryMode),
                      className: `rounded-full px-3 py-1.5 text-sm transition ${mode === entryMode ? "ui-status-warning" : "thread-export-dialog-muted-action"}`,
                      children: label
                    },
                    entryMode
                  )) }),
                  /* @__PURE__ */ jsx46("div", { className: "thread-export-dialog-segment mt-4 inline-flex rounded-full border p-1", children: [
                    ["pdf", "PDF"],
                    ["html", "HTML"]
                  ].map(([entryFormat, label]) => /* @__PURE__ */ jsx46(
                    "button",
                    {
                      type: "button",
                      onClick: () => setFormat(entryFormat),
                      className: `rounded-full px-3 py-1.5 text-sm transition ${format === entryFormat ? "ui-status-warning" : "thread-export-dialog-muted-action"}`,
                      children: label
                    },
                    entryFormat
                  )) }),
                  mode === "selected" ? /* @__PURE__ */ jsxs36("div", { className: "thread-export-dialog-box mt-4 rounded-2xl border", children: [
                    /* @__PURE__ */ jsxs36("div", { className: "thread-export-dialog-box-header flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5", children: [
                      /* @__PURE__ */ jsxs36("p", { className: "thread-export-dialog-subtitle text-xs", children: [
                        "Selected ",
                        selectedTurnIds.size,
                        " of ",
                        turnsState.data?.totalTurnCount ?? turns.length
                      ] }),
                      /* @__PURE__ */ jsxs36("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx46(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSelectedTurnIds(new Set(turns.map((turn) => turn.turnId))),
                            className: "thread-export-dialog-secondary-button rounded-full border px-2.5 py-1 text-xs transition",
                            children: "Select all"
                          }
                        ),
                        /* @__PURE__ */ jsx46(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSelectedTurnIds(/* @__PURE__ */ new Set()),
                            className: "thread-export-dialog-secondary-button rounded-full border px-2.5 py-1 text-xs transition",
                            children: "Clear"
                          }
                        )
                      ] })
                    ] }),
                    turnsState.status === "loading" ? /* @__PURE__ */ jsx46("p", { className: "thread-export-dialog-subtitle px-3 py-6 text-sm", children: "Loading turns..." }) : turnsState.status === "failed" ? /* @__PURE__ */ jsx46("p", { className: "px-3 py-6 text-sm text-rose-500 dark:text-rose-200", children: turnsState.error }) : /* @__PURE__ */ jsx46("div", { className: "max-h-80 overflow-auto p-2", children: turns.map((turn) => /* @__PURE__ */ jsxs36(
                      "label",
                      {
                        className: "thread-export-dialog-turn-row flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition",
                        children: [
                          /* @__PURE__ */ jsx46(
                            "input",
                            {
                              type: "checkbox",
                              checked: selectedTurnIds.has(turn.turnId),
                              onChange: () => toggleTurn(turn.turnId),
                              className: "thread-export-dialog-checkbox h-4 w-4"
                            }
                          ),
                          /* @__PURE__ */ jsxs36("span", { className: "thread-export-dialog-strong shrink-0 text-xs font-medium", children: [
                            "Turn ",
                            turn.turnNumber
                          ] }),
                          /* @__PURE__ */ jsx46("span", { className: "thread-export-dialog-subtitle shrink-0 text-xs", children: formatTurnTime(turn.startedAt) }),
                          /* @__PURE__ */ jsx46("span", { className: "thread-export-dialog-body-text min-w-0 flex-1 truncate text-left", children: turn.userPromptPreview }),
                          /* @__PURE__ */ jsx46("span", { className: "thread-export-dialog-status-pill hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] sm:inline", children: statusLabel2(turn.status) })
                        ]
                      },
                      turn.turnId
                    )) })
                  ] }) : /* @__PURE__ */ jsx46("p", { className: "thread-export-dialog-box thread-export-dialog-body-text mt-4 rounded-2xl border px-3 py-3 text-sm", children: "Exports the latest 10 turns in chronological order." }),
                  /* @__PURE__ */ jsxs36("div", { className: "thread-export-dialog-body-text mt-4 grid gap-2 text-sm sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsxs36("label", { className: "thread-export-dialog-box flex items-center gap-2 rounded-xl border px-3 py-2", children: [
                      /* @__PURE__ */ jsx46(
                        "input",
                        {
                          type: "checkbox",
                          checked: includeTokenAndPrice,
                          onChange: (event) => setIncludeTokenAndPrice(event.target.checked),
                          className: "thread-export-dialog-checkbox h-4 w-4"
                        }
                      ),
                      "Token and price"
                    ] }),
                    /* @__PURE__ */ jsx46("p", { className: "thread-export-dialog-box thread-export-dialog-subtitle flex items-center rounded-xl border px-3 py-2 text-xs", children: format === "html" ? "HTML keeps the chat timeline styling and omits raw command output." : "Review exports keep message text readable and omit tool activity." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs36("div", { className: "thread-export-dialog-footer flex items-center justify-between gap-3 border-t px-5 py-4", children: [
                  /* @__PURE__ */ jsxs36("p", { className: "thread-export-dialog-subtitle min-w-0 text-xs", children: [
                    selectedCount,
                    " ",
                    selectedCount === 1 ? "turn" : "turns",
                    " will be exported."
                  ] }),
                  /* @__PURE__ */ jsxs36("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx46(
                      "button",
                      {
                        type: "button",
                        onClick: onCancel,
                        disabled: busy,
                        className: "thread-export-dialog-secondary-button rounded-full border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsx46(
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
        ]
      }
    ),
    document.body
  );
}

// src/ThreadDetailSurface.tsx
import {
  useMemo as useMemo16
} from "react";

// src/components/graph-chat/GraphChatThreadChatPanel.tsx
import {
  useCallback as useCallback7,
  useEffect as useEffect18,
  useLayoutEffect as useLayoutEffect4,
  useMemo as useMemo15,
  useRef as useRef11,
  useState as useState16
} from "react";
import { jsx as jsx47, jsxs as jsxs37 } from "react/jsx-runtime";
function formatTokenCount(value) {
  if (value === void 0) {
    return "-";
  }
  if (Math.abs(value) > 1e4) {
    const maximumFractionDigits = Math.abs(value) >= 1e5 ? 0 : 1;
    return `${(value / 1e3).toLocaleString(void 0, {
      maximumFractionDigits
    })}k`;
  }
  return value.toLocaleString();
}
function formatThreadUsageParts(usage) {
  return `in ${formatTokenCount(usage.input)} / out ${formatTokenCount(
    usage.output
  )} / cache ${formatTokenCount(usage.cache)}`;
}
function buildChatContentRevision(detail, liveOutput) {
  const latestTurn = detail.turns.at(-1);
  const latestLiveItem = detail.liveItems?.items.at(-1);
  const latestPendingRequest = detail.pendingRequests.at(-1);
  return [
    detail.thread.id,
    detail.turns.length,
    latestTurn?.id ?? "",
    latestTurn?.items.length ?? 0,
    detail.liveItems?.items.length ?? 0,
    latestLiveItem?.id ?? "",
    detail.pendingRequests.length,
    latestPendingRequest?.id ?? "",
    liveOutput ? liveOutput.length : 0
  ].join(":");
}
function GraphChatThreadChatPanel({
  detail,
  adapter,
  timelineAdapter,
  TimelineComponent = ThreadTimeline,
  liveOutput = "",
  beforeTimelineContent,
  composerProps,
  timelineProps,
  threadUsageSummary,
  transcriptItemCount,
  useFloatingMobileComposer = false,
  floatingMobileComposerBottomOffset = 0,
  composerHostRef
}) {
  const [isTailVisible, setIsTailVisible] = useState16(true);
  const [isMobileViewport, setIsMobileViewport] = useState16(false);
  const [mobileComposerHeight, setMobileComposerHeight] = useState16(0);
  const [mobileComposerOverlap, setMobileComposerOverlap] = useState16(0);
  const [mobileKeyboardInset, setMobileKeyboardInset] = useState16(0);
  const [mobilePromptFocused, setMobilePromptFocused] = useState16(false);
  const lastRevisionRef = useRef11(null);
  const internalComposerHostRef = useRef11(null);
  const contentRevision = useMemo15(
    () => buildChatContentRevision(detail, liveOutput),
    [detail, liveOutput]
  );
  const timelineTailVisibilityChange = timelineProps?.onTailVisibilityChange;
  const hasPendingRequests = detail.pendingRequests.length > 0;
  useEffect18(() => {
    lastRevisionRef.current = null;
    setIsTailVisible(true);
  }, [detail.thread.id]);
  const handleTailVisibilityChange = useCallback7(
    (nextIsTailVisible) => {
      setIsTailVisible(nextIsTailVisible);
      timelineTailVisibilityChange?.(nextIsTailVisible);
    },
    [timelineTailVisibilityChange]
  );
  useEffect18(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);
  useEffect18(() => {
    if (typeof window === "undefined") {
      return;
    }
    const updateKeyboardInset = () => {
      const viewport = window.visualViewport;
      const keyboardInset = viewport ? Math.max(
        0,
        Math.round(window.innerHeight - viewport.height - viewport.offsetTop)
      ) : 0;
      const viewportDelta = viewport ? Math.max(0, Math.round(window.innerHeight - viewport.height)) : keyboardInset;
      const correctedInset = Math.min(keyboardInset, viewportDelta);
      const maxReasonableInset = Math.max(0, Math.round(window.innerHeight * 0.52));
      setMobileKeyboardInset(Math.min(correctedInset, maxReasonableInset));
    };
    updateKeyboardInset();
    window.visualViewport?.addEventListener("resize", updateKeyboardInset);
    window.visualViewport?.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("resize", updateKeyboardInset);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateKeyboardInset);
      window.visualViewport?.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("resize", updateKeyboardInset);
    };
  }, []);
  useLayoutEffect4(() => {
    const node = internalComposerHostRef.current;
    if (!node || !isMobileViewport) {
      setMobileComposerHeight(0);
      return;
    }
    const updateHeight = () => {
      setMobileComposerHeight(Math.ceil(node.getBoundingClientRect().height));
    };
    updateHeight();
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [isMobileViewport, composerProps, hasPendingRequests]);
  useLayoutEffect4(() => {
    const node = internalComposerHostRef.current;
    if (!node || !isMobileViewport) {
      setMobileComposerOverlap(0);
      return;
    }
    const updateOverlap = () => {
      const rect = node.getBoundingClientRect();
      setMobileComposerOverlap(
        Math.max(0, Math.ceil(window.innerHeight - rect.top))
      );
    };
    updateOverlap();
    window.addEventListener("resize", updateOverlap);
    window.visualViewport?.addEventListener("resize", updateOverlap);
    window.visualViewport?.addEventListener("scroll", updateOverlap);
    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateOverlap);
      observer.observe(node);
    }
    return () => {
      window.removeEventListener("resize", updateOverlap);
      window.visualViewport?.removeEventListener("resize", updateOverlap);
      window.visualViewport?.removeEventListener("scroll", updateOverlap);
      observer?.disconnect();
    };
  }, [
    isMobileViewport,
    mobileKeyboardInset,
    mobilePromptFocused,
    composerProps,
    hasPendingRequests
  ]);
  useEffect18(() => {
    if (!isMobileViewport) {
      setMobilePromptFocused(false);
      return;
    }
    const handleFocusIn = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && internalComposerHostRef.current?.contains(target)) {
        setMobilePromptFocused(true);
      }
    };
    const handleFocusOut = (event) => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof HTMLElement && internalComposerHostRef.current?.contains(nextTarget)) {
        return;
      }
      setMobilePromptFocused(false);
    };
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isMobileViewport]);
  const setComposerHostRefs = useCallback7(
    (node) => {
      internalComposerHostRef.current = node;
      if (composerHostRef) {
        composerHostRef.current = node;
      }
    },
    [composerHostRef]
  );
  const mobileComposerBottomOffset = isMobileViewport && mobilePromptFocused ? Math.max(0, mobileKeyboardInset - floatingMobileComposerBottomOffset) : 0;
  const effectiveMobileComposerHeight = Math.max(mobileComposerHeight, 144);
  const effectiveMobileComposerOverlap = Math.max(
    mobileComposerOverlap,
    effectiveMobileComposerHeight + mobileComposerBottomOffset
  );
  const chatScrollBottomSpacer = isMobileViewport ? effectiveMobileComposerOverlap + 12 : 0;
  const panelStyle = chatScrollBottomSpacer > 0 ? {
    "--thread-graph-chat-scroll-bottom-spacer": `${chatScrollBottomSpacer}px`
  } : void 0;
  const floatingComposerStyle = useFloatingMobileComposer && isMobileViewport ? {
    bottom: `${floatingMobileComposerBottomOffset + mobileComposerBottomOffset}px`,
    paddingBottom: "env(safe-area-inset-bottom)"
  } : void 0;
  return /* @__PURE__ */ jsxs37(
    "div",
    {
      "data-testid": "chat-panel",
      className: "thread-graph-chat-panel relative flex h-full min-h-0 flex-col",
      style: panelStyle,
      children: [
        beforeTimelineContent,
        /* @__PURE__ */ jsx47(
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
            onOpenThread: timelineProps?.onOpenThread ?? adapter.openThread,
            onTailVisibilityChange: handleTailVisibilityChange
          }
        ),
        /* @__PURE__ */ jsxs37("div", { className: "thread-chat-usage-footer hidden shrink-0 items-center justify-between gap-3 px-4 py-1 text-[10px] leading-4 sm:flex", children: [
          /* @__PURE__ */ jsxs37("span", { className: "min-w-0 truncate", children: [
            detail.turns.length,
            " turn",
            detail.turns.length !== 1 ? "s" : "",
            /* @__PURE__ */ jsx47("span", { className: "mx-1 text-[var(--theme-border-contrast)]", children: "|" }),
            transcriptItemCount,
            " item",
            transcriptItemCount !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxs37("span", { className: "shrink-0", children: [
            "Usage",
            " ",
            threadUsageSummary && threadUsageSummary.turns > 0 ? formatThreadUsageParts(threadUsageSummary) : "waiting for agent usage"
          ] })
        ] }),
        composerProps ? useFloatingMobileComposer ? /* @__PURE__ */ jsx47(
          "div",
          {
            ref: setComposerHostRefs,
            className: "fixed inset-x-0 bottom-0 z-50 overflow-visible sm:hidden",
            style: floatingComposerStyle ?? {
              bottom: `${floatingMobileComposerBottomOffset}px`,
              paddingBottom: "env(safe-area-inset-bottom)"
            },
            children: /* @__PURE__ */ jsx47(
              ThreadComposer,
              {
                ...composerProps,
                activeView: "chat",
                edgeToEdgeMobile: true,
                onSubmit: adapter.sendPrompt
              }
            )
          }
        ) : /* @__PURE__ */ jsx47(
          "div",
          {
            ref: setComposerHostRefs,
            className: "thread-graph-composer-host shrink-0",
            children: /* @__PURE__ */ jsx47(
              ThreadComposer,
              {
                ...composerProps,
                activeView: "chat",
                onSubmit: adapter.sendPrompt
              }
            )
          }
        ) : null
      ]
    }
  );
}

// src/ThreadDetailSurface.tsx
import { jsx as jsx48, jsxs as jsxs38 } from "react/jsx-runtime";
function summarizeThreadUsage(detail) {
  return detail.turns.reduce(
    (summary, turn) => {
      const usage = turn.tokenUsage?.total;
      if (!usage) {
        return summary;
      }
      return {
        input: summary.input + usage.inputTokens,
        output: summary.output + usage.outputTokens,
        cache: summary.cache + usage.cachedInputTokens,
        turns: summary.turns + 1
      };
    },
    { input: 0, output: 0, cache: 0, turns: 0 }
  );
}
function formatTopbarTokenCount(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return "0";
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(value >= 1e7 ? 0 : 1)}m`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(value >= 1e4 ? 0 : 1)}k`;
  }
  return String(Math.round(value));
}
function formatTopbarUsageSummary(usage) {
  if (!usage || usage.turns <= 0) {
    return "waiting for agent usage";
  }
  return `in ${formatTopbarTokenCount(usage.input)} / out ${formatTopbarTokenCount(
    usage.output
  )} / cache ${formatTopbarTokenCount(usage.cache)}`;
}
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
  globalSettingsContent,
  mobileHeaderAction,
  appMenuButton,
  appNavigationMenu,
  workspaceReturnHref,
  onWorkspaceReturn,
  surfaceActions,
  floatingPanel,
  workspaceContent,
  workspaceTitle,
  workspaceActions,
  workspaceFeatures,
  onNewThreadTitle,
  beforeTimelineContent,
  errorContent,
  workspaceMissingContent,
  dialogs,
  currentThreadId,
  currentWorkspaceId,
  currentWorkspaceLabel,
  onCloseAppNavigation,
  className = "thread-detail-surface relative flex h-full min-h-0 flex-1 flex-col overflow-hidden",
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
  shellThemeMode = shellEffectiveTheme,
  onShellThemeModeChange,
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
  const timelineAdapter = useMemo16(
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
  const threadUsageSummary = useMemo16(
    () => detail ? summarizeThreadUsage(detail) : null,
    [detail]
  );
  const topbarUsageLabel = useMemo16(
    () => formatTopbarUsageSummary(threadUsageSummary),
    [threadUsageSummary]
  );
  const transcriptItemCount = useMemo16(
    () => detail ? detail.turns.reduce(
      (count, turn) => count + turn.items.length,
      detail.liveItems?.items.length ?? 0
    ) : 0,
    [detail]
  );
  const resolvedWorkspaceContent = workspaceContent ?? (detail ? /* @__PURE__ */ jsx48(
    MemoizedThreadGraphWorkspacePanel,
    {
      detail,
      status,
      plugins,
      workspaceAdapter: adapter.workspace ?? null,
      metaContent,
      settingsContent,
      activeView,
      features: workspaceFeatures
    }
  ) : null);
  const defaultContent = loading ? loadingContent ?? /* @__PURE__ */ jsx48("div", { className: "flex flex-1 items-center justify-center px-6 py-12 text-center text-[var(--theme-fg-muted)]", children: "Loading thread detail..." }) : detail ? /* @__PURE__ */ jsxs38("div", { className, children: [
    floatingPanel ? /* @__PURE__ */ jsx48("div", { className: "fixed right-3 top-20 z-50 lg:absolute lg:right-4 lg:top-16", children: floatingPanel }) : null,
    error && !loading && (errorContent ?? /* @__PURE__ */ jsx48("div", { className: "shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 sm:px-6", children: error })),
    detail.workspacePathStatus === "missing" && (workspaceMissingContent ?? /* @__PURE__ */ jsxs38("div", { className: "shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 sm:px-6", children: [
      /* @__PURE__ */ jsx48("p", { className: "font-medium text-rose-50", children: "Workspace path missing" }),
      /* @__PURE__ */ jsx48("p", { className: "mt-1 break-words text-rose-100/90", children: detail.workspace.absPath })
    ] })),
    /* @__PURE__ */ jsx48(
      "div",
      {
        className: activeView === "chat" ? "flex min-h-0 flex-1 flex-col" : "hidden",
        children: /* @__PURE__ */ jsx48(
          GraphChatThreadChatPanel,
          {
            detail,
            adapter,
            timelineAdapter,
            TimelineComponent,
            liveOutput,
            threadUsageSummary,
            transcriptItemCount,
            useFloatingMobileComposer,
            floatingMobileComposerBottomOffset,
            ...beforeTimelineContent ? { beforeTimelineContent } : {},
            ...composerProps ? { composerProps } : {},
            ...timelineProps ? { timelineProps } : {},
            ...composerHostRef ? { composerHostRef } : {}
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs38(
      "div",
      {
        className: activeView === "shell" ? "flex min-h-0 flex-1 flex-col" : "hidden",
        children: [
          shellContent ?? (detail.thread.isLoaded && terminalPanelEnabled && adapter.shell ? /* @__PURE__ */ jsx48(
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
          ) : detail.thread.isLoaded && !terminalPanelEnabled ? shellUnavailableContent ?? /* @__PURE__ */ jsx48("div", { className: "flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs38("div", { className: "thread-empty-surface max-w-md rounded-[1.6rem] border px-6 py-8 text-center", children: [
            /* @__PURE__ */ jsx48("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Terminal plugin disabled" }),
            /* @__PURE__ */ jsx48("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-muted)]", children: "Enable the Terminal plugin in Settings to use the shell panel." })
          ] }) }) : shellDisconnectedContent ?? /* @__PURE__ */ jsx48("div", { className: "flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs38("div", { className: "thread-empty-surface max-w-md rounded-[1.6rem] border px-6 py-8 text-center", children: [
            /* @__PURE__ */ jsx48("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Thread disconnected" }),
            /* @__PURE__ */ jsx48("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-soft)]", children: "Reconnect this thread before creating or attaching a shell." })
          ] }) })),
          activeView === "shell" && shellComposerProps && !shellContent ? /* @__PURE__ */ jsx48(
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
  ] }) : emptyContent ?? /* @__PURE__ */ jsx48("div", { className: "flex flex-1 items-center justify-center px-6 py-12 text-center text-[var(--theme-fg-muted)]", children: "Select a thread to inspect." });
  const surface = /* @__PURE__ */ jsx48(
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
      sessionLabel: detail?.thread.providerSessionId ?? detail?.thread.id,
      usageLabel: topbarUsageLabel,
      topbarActions: surfaceActions,
      metaContent,
      settingsContent,
      globalSettingsContent,
      mobileHeaderAction,
      effectiveTheme: shellEffectiveTheme,
      themeMode: shellThemeMode,
      appMenuButton,
      appNavigationMenu,
      workspaceReturnHref,
      ...onWorkspaceReturn ? { onWorkspaceReturn } : {},
      showMobileAppMenu: Boolean(appMenuButton),
      showMobileThreadNavToggle: true,
      showMobileNewThreadShortcut: false,
      onOpenThread: adapter.openThread,
      workspaceContent: resolvedWorkspaceContent,
      workspaceTitle: workspaceTitle ?? "Workspace",
      workspaceActions,
      ...onNewThreadTitle ? { onNewThreadTitle } : {},
      ...onCloseAppNavigation ? { onCloseAppNavigation } : {},
      ...onShellThemeModeChange ? { onThemeModeChange: onShellThemeModeChange } : {},
      ...adapter.getThreadHref ? { getThreadHref: adapter.getThreadHref } : {},
      ...adapter.getNewThreadHref ? { getNewThreadHref: adapter.getNewThreadHref } : {},
      ...adapter.renameThread ? { onRenameThread: adapter.renameThread } : {},
      ...adapter.deleteThread ? { onDeleteThread: adapter.deleteThread } : {},
      children: defaultContent
    }
  );
  if (providedPlugins) {
    return /* @__PURE__ */ jsx48(PluginContext.Provider, { value: plugins, children: surface });
  }
  return surface;
}

// src/plugins/PluginProvider.tsx
import {
  useCallback as useCallback8,
  useEffect as useEffect19,
  useMemo as useMemo17,
  useState as useState17
} from "react";
import { jsx as jsx49 } from "react/jsx-runtime";
function PluginProvider({
  adapter = {},
  children
}) {
  const [plugins, setPlugins] = useState17(
    () => mergePluginState(builtinFrontendPlugins, [])
  );
  const [loading, setLoading] = useState17(false);
  const [error, setError] = useState17(null);
  const refresh = useCallback8(async () => {
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
  useEffect19(() => {
    void refresh();
  }, [refresh]);
  const setPluginEnabled = useCallback8(
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
  const importPluginManifest = useCallback8(
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
  const uninstallPlugin = useCallback8(
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
  const enabledModules = useMemo17(() => {
    const enabledIds = new Set(
      plugins.filter((plugin) => plugin.enabled).map((plugin) => plugin.id)
    );
    return builtinFrontendPlugins.filter(
      (module) => enabledIds.has(module.manifest.id)
    );
  }, [plugins]);
  const renderArtifact = useCallback8(
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
  const renderInlineCode = useCallback8(
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
  const hasRendererForArtifact = useCallback8(
    (artifact) => enabledModules.some(
      (entry) => Boolean(entry.renderArtifact) && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === artifact.type
      )
    ),
    [enabledModules]
  );
  const getThreadPanels = useCallback8(
    () => enabledModules.flatMap((module) => module.threadPanels ?? []),
    [enabledModules]
  );
  const value = useMemo17(
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
  return /* @__PURE__ */ jsx49(PluginContext.Provider, { value, children });
}

// src/app-shell/AppShellNavigation.tsx
import { useEffect as useEffect20, useRef as useRef12, useState as useState18 } from "react";
import { jsx as jsx50, jsxs as jsxs39 } from "react/jsx-runtime";
function MenuIcon() {
  return /* @__PURE__ */ jsx50("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx50("path", { d: "M2 3.25h12v1.5H2Zm0 4h12v1.5H2Zm0 4h12v1.5H2Z" }) });
}
function CloseIcon() {
  return /* @__PURE__ */ jsx50("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx50("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) });
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
  return /* @__PURE__ */ jsx50(
    "button",
    {
      type: "button",
      "aria-label": shellNav.navOpen ? "Close Navigation" : "Open Navigation",
      "aria-expanded": shellNav.navOpen,
      "aria-controls": "app-shell-navigation-menu",
      onClick: shellNav.toggleNav,
      className: `inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--theme-fg)] transition hover:text-[var(--theme-fg-soft)] ${className}`.trim(),
      children: shellNav.navOpen ? /* @__PURE__ */ jsx50(CloseIcon, {}) : /* @__PURE__ */ jsx50(MenuIcon, {})
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
  const menuRef = useRef12(null);
  useEffect20(() => {
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
  return /* @__PURE__ */ jsxs39(
    "div",
    {
      ref: menuRef,
      id: "app-shell-navigation-menu",
      onPointerDown: (event) => event.stopPropagation(),
      onMouseDown: (event) => event.stopPropagation(),
      onTouchStart: (event) => event.stopPropagation(),
      className: `rounded-[1.8rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] p-4 shadow-2xl shadow-black/15 backdrop-blur ${className}`.trim(),
      children: [
        /* @__PURE__ */ jsxs39("div", { children: [
          /* @__PURE__ */ jsx50("p", { className: "text-base font-semibold tracking-wide text-[var(--theme-accent-strong)]", children: "Remote Codex" }),
          /* @__PURE__ */ jsx50("p", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Navigation" })
        ] }),
        /* @__PURE__ */ jsxs39("nav", { className: "mt-4 flex flex-col gap-1.5 text-sm", children: [
          items.map((item) => {
            const active = currentPath === item.href;
            return /* @__PURE__ */ jsx50(
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
          /* @__PURE__ */ jsx50(
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
  const [pluginImportDraft, setPluginImportDraft] = useState18("");
  const [pluginImportState, setPluginImportState] = useState18({
    busy: false,
    message: null,
    error: null
  });
  const selectedThemeMode = shellNav?.themeMode ?? "system";
  const effectiveTheme = shellNav?.effectiveTheme ?? "dark";
  useEffect20(() => {
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
  return /* @__PURE__ */ jsxs39("div", { className: "fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[max(env(safe-area-inset-top),1rem)] sm:items-center", children: [
    /* @__PURE__ */ jsx50(
      "button",
      {
        type: "button",
        "aria-label": "Close Settings",
        onClick: shellNav.closeSettings,
        className: "ui-overlay-scrim absolute inset-0 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxs39(
      "section",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Settings",
        className: "relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] shadow-2xl shadow-black/20",
        children: [
          /* @__PURE__ */ jsx50("div", { className: "shrink-0 p-5 pb-0", children: /* @__PURE__ */ jsxs39("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs39("div", { children: [
              /* @__PURE__ */ jsx50("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Settings" }),
              /* @__PURE__ */ jsx50("h2", { className: "mt-2 text-xl font-semibold text-[var(--theme-fg)]", children: "Settings" }),
              /* @__PURE__ */ jsx50("p", { className: "mt-2 text-sm leading-6 text-[var(--theme-fg-soft)]", children: "Manage appearance and thread UI plugins." })
            ] }),
            /* @__PURE__ */ jsx50(
              "button",
              {
                type: "button",
                "aria-label": "Close Settings",
                onClick: shellNav.closeSettings,
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-surface-strong)] text-[var(--theme-fg)] transition hover:border-[var(--theme-border-contrast)] hover:bg-[var(--theme-hover)]",
                children: /* @__PURE__ */ jsx50(CloseIcon, {})
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx50("div", { className: "min-h-0 flex-1 overflow-y-auto p-5 pt-5", children: /* @__PURE__ */ jsxs39("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs39("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: [
              /* @__PURE__ */ jsx50("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs39("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx50("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Appearance" }),
                /* @__PURE__ */ jsxs39("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: [
                  "Choose light, dark, or follow the system setting. Active: ",
                  effectiveTheme,
                  "."
                ] })
              ] }) }),
              /* @__PURE__ */ jsx50("div", { className: "mt-3 grid gap-2 sm:grid-cols-3", children: themeOptions.map((option) => {
                const active = selectedThemeMode === option.value;
                return /* @__PURE__ */ jsxs39(
                  "button",
                  {
                    type: "button",
                    onClick: () => shellNav.setThemeMode(option.value),
                    className: `block rounded-[1rem] border px-3 py-2.5 text-left transition ${active ? "border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-strong)] hover:bg-[var(--theme-hover)]"}`,
                    children: [
                      /* @__PURE__ */ jsxs39("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx50("span", { className: "text-sm font-medium text-[var(--theme-fg)]", children: option.label }),
                        active ? /* @__PURE__ */ jsx50("span", { className: "rounded-full border border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--theme-accent-strong)]", children: "Active" }) : null
                      ] }),
                      /* @__PURE__ */ jsx50("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: option.description })
                    ]
                  },
                  option.value
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs39("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: [
              /* @__PURE__ */ jsxs39("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs39("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx50("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Plugins" }),
                  /* @__PURE__ */ jsx50("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Enable renderers and thread extensions loaded by this UI." })
                ] }),
                /* @__PURE__ */ jsx50(
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
              /* @__PURE__ */ jsxs39("div", { className: "mt-3 grid gap-2", children: [
                plugins.plugins.map((plugin) => /* @__PURE__ */ jsxs39(
                  "div",
                  {
                    className: "flex items-start justify-between gap-3 rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-2.5",
                    children: [
                      /* @__PURE__ */ jsxs39("span", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx50("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: plugin.name }),
                        /* @__PURE__ */ jsx50("span", { className: "mt-1 block text-xs leading-5 text-[var(--theme-fg-muted)]", children: plugin.description }),
                        /* @__PURE__ */ jsx50("span", { className: "mt-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: [
                          ...plugin.capabilities.artifactTypes.map((type) => type.type),
                          ...plugin.capabilities.threadPanels.map((panel) => panel.kind ?? panel.id)
                        ].join(", ") || "utility" }),
                        /* @__PURE__ */ jsx50("span", { className: "mt-1 block text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: plugin.source === "imported" ? "Imported manifest" : "Built-in module" })
                      ] }),
                      /* @__PURE__ */ jsxs39("span", { className: "flex shrink-0 items-center gap-2", children: [
                        plugin.source === "imported" ? /* @__PURE__ */ jsx50(
                          "button",
                          {
                            type: "button",
                            onClick: () => void handleUninstallPlugin(plugin.id, plugin.name),
                            className: "rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1.5 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)]",
                            children: "Uninstall"
                          }
                        ) : null,
                        /* @__PURE__ */ jsxs39("label", { className: "sr-only", htmlFor: `plugin-toggle-${plugin.id}`, children: [
                          "Toggle ",
                          plugin.name
                        ] }),
                        /* @__PURE__ */ jsx50(
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
                plugins.plugins.length === 0 && /* @__PURE__ */ jsx50("p", { className: "rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No plugins are registered." })
              ] }),
              /* @__PURE__ */ jsxs39("div", { className: "mt-3 border-t border-[var(--theme-border)] pt-3", children: [
                /* @__PURE__ */ jsx50("label", { className: "block text-xs font-medium text-[var(--theme-fg)]", children: "Import plugin" }),
                /* @__PURE__ */ jsx50(
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
                /* @__PURE__ */ jsxs39("div", { className: "mt-2 flex flex-wrap items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx50("p", { className: "max-w-[42rem] text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Imports register manifest-declared artifact types. Rendering code still needs a trusted built-in frontend module." }),
                  /* @__PURE__ */ jsx50(
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
                pluginImportState.error && /* @__PURE__ */ jsx50("p", { className: "mt-2 text-xs text-rose-300", children: pluginImportState.error }),
                pluginImportState.message && /* @__PURE__ */ jsx50("p", { className: "mt-2 text-xs text-emerald-300", children: pluginImportState.message })
              ] }),
              plugins.error && /* @__PURE__ */ jsx50("p", { className: "mt-2 text-xs text-rose-300", children: plugins.error })
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
  MemoizedThreadGraphWorkspacePanel,
  PluginContext,
  PluginProvider,
  ThreadCards,
  ThreadComposer,
  ThreadDetailSurface,
  ThreadGraphWorkspacePanel,
  ThreadShellPanel,
  ThreadTimeline,
  ThreadWorkspaceLayout,
  XyzArtifactRenderer,
  builtinFrontendPlugins,
  createDefaultPluginContextValue,
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
