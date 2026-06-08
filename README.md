# Remote Codex Thread UI

Standalone workspace for the Remote Codex thread surface, app shell, and built-in UI plugins.

This repository is intentionally scoped to UI packages. Runtime integrations such as Codex sandboxes,
Claude Code, OpenCode, GraphChat compatibility, and Pydantic AI adapters should translate their events
into the shared thread DTOs consumed by `@remote-codex/thread-ui`.

## Packages

- `@remote-codex/thread-ui`: React thread/chat/artifact/settings surface.
- `@remote-codex/shared`: Current DTO contract source copied from Remote Codex. This should be narrowed
  into a dedicated `@remote-codex/thread-ui-contracts` package before publishing externally.
- `@remote-codex/plugin-runtime`: Shared plugin/artifact helpers.
- `@remote-codex/plugin-terminal`: Built-in terminal plugin manifest.
- `@remote-codex/plugin-xyz-viewer`: Built-in molecule viewer plugin and frontend renderer.

## Apps

- `apps/playground`: Vite playground with mock thread data for visual iteration.

## Development

```bash
pnpm install
pnpm build
pnpm dev
```

The playground is the default place to redesign the UI toward a GraphChat-like product surface without
pulling in the full Remote Codex control-plane runtime.

## Boundary

Keep this workspace UI-only:

- Do not add sandbox router, control-plane auth, database, or deployment logic here.
- Keep backend-specific behavior in adapters outside the core thread UI.
- Prefer typed DTO/event inputs over direct runtime coupling.

