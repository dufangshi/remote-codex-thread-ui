# Migration Notes

This workspace was split from `/home/u/dev/remoteCodex-main` on branch `main` at
commit `66b2317`, including the local uncommitted package changes present in that
worktree at extraction time.

## Current State

- The workspace builds independently with `pnpm build`.
- `apps/playground` runs a standalone Vite surface at `http://localhost:5174/`.
- Built-in terminal and XYZ viewer plugin packages are included.
- The playground uses mock thread data, mock adapter callbacks, app shell navigation,
  plugin settings context, and an expandable molecule artifact.

## Intentional Temporary Compromise

`@remote-codex/shared` is still copied in as the DTO source. This keeps the first
extraction behavior-compatible and avoids changing thread UI contracts while preparing
for visual work.

Before publishing this as a durable external package, narrow it into a UI-specific
contract package such as:

```text
@remote-codex/thread-ui-contracts
```

That package should contain only the DTOs required by:

- thread list/detail
- timeline items
- artifacts
- plugin manifests
- composer settings
- shell panel status
- app shell settings

## Integration Plan

1. Redesign `packages/thread-ui` in this workspace against `apps/playground`.
2. Keep runtime-specific adapters outside this package.
3. Build and smoke-test:

```bash
pnpm build
pnpm dev
```

4. Publish packages or consume them from a git/tagged dependency.
5. Update `/home/u/dev/remoteCodex` on `sandbox-worker-control-plane` to consume the
   released `@remote-codex/thread-ui` package instead of patching source in-place.

## Boundary Rules

- Do not add control-plane auth, router, sandbox worker, database, or Railway deploy
  code to this repository.
- Keep GraphChat, Pydantic AI, Codex, Claude Code, and OpenCode support as adapter
  concerns that produce the thread UI DTOs.
- Keep plugin enablement and settings state explicit through props/context adapters.

