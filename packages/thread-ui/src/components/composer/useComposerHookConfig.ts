import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  AgentBackendHookCommandTemplateDto,
  AgentHookDto,
  AgentHookEventNameDto,
  CreateThreadHookInput,
  UpdateThreadHookInput,
} from '@remote-codex/shared';
import {
  editableHookTarget,
  HOOK_EVENT_OPTIONS,
} from './composerPresentation';
import type {
  HookScope,
  HooksPanelMode,
  SlashPanelView,
} from './types';

export const FALLBACK_HOOK_COMMAND =
  "node -e \"process.stdin.resume(); process.stdin.on('end', () => console.error('hook ran'))\"";

export interface UseComposerHookConfigInput {
  slashPanelView: SlashPanelView;
  hookCommandTemplates?:
    | AgentBackendHookCommandTemplateDto[]
    | null
    | undefined;
  onCreateHook?: (input: CreateThreadHookInput) => Promise<void> | void;
  onUpdateHook?: (input: UpdateThreadHookInput) => Promise<void> | void;
  onTrustHook?: (input: {
    key: string;
    currentHash: string;
  }) => Promise<void> | void;
  onUntrustHook?: (input: { key: string }) => Promise<void> | void;
}

export interface UseComposerHookConfigResult {
  hooksPanelMode: HooksPanelMode;
  hookScope: HookScope;
  hookEventName: AgentHookEventNameDto;
  hookMatcher: string;
  hookCommand: string;
  hookTimeoutSec: string;
  hookStatusMessage: string;
  editingHookTarget: UpdateThreadHookInput['target'] | null;
  hookConfigBusy: boolean;
  hookConfigError: string | null;
  hookConfigSuccess: string | null;
  setHooksPanelMode: (mode: HooksPanelMode) => void;
  setEditingHookTarget: (
    target: UpdateThreadHookInput['target'] | null,
  ) => void;
  setHookScope: (scope: HookScope) => void;
  setHookEventName: (eventName: AgentHookEventNameDto) => void;
  setHookMatcher: (matcher: string) => void;
  setHookCommand: (command: string) => void;
  setHookTimeoutSec: (timeoutSec: string) => void;
  setHookStatusMessage: (statusMessage: string) => void;
  clearHookConfigStatus: () => void;
  resetHookForm: () => void;
  startEditingHook: (hook: AgentHookDto) => void;
  saveHook: () => Promise<void>;
  trustHook: (hook: AgentHookDto) => Promise<void>;
  untrustHook: (hook: AgentHookDto) => Promise<void>;
}

function buildHookCommandTemplateMap(
  hookCommandTemplates:
    | AgentBackendHookCommandTemplateDto[]
    | null
    | undefined,
) {
  const templates = new Map<AgentHookEventNameDto, string>();
  for (const template of hookCommandTemplates ?? []) {
    templates.set(template.eventName, template.command);
  }
  return templates;
}

export function useComposerHookConfig({
  slashPanelView,
  hookCommandTemplates,
  onCreateHook,
  onUpdateHook,
  onTrustHook,
  onUntrustHook,
}: UseComposerHookConfigInput): UseComposerHookConfigResult {
  const [hooksPanelMode, setHooksPanelMode] =
    useState<HooksPanelMode>('list');
  const [hookScope, setHookScope] = useState<HookScope>('project');
  const [hookEventName, setHookEventName] =
    useState<AgentHookEventNameDto>('preToolUse');
  const [hookMatcher, setHookMatcher] = useState('Bash');
  const [hookCommand, setHookCommand] = useState(FALLBACK_HOOK_COMMAND);
  const [hookTimeoutSec, setHookTimeoutSec] = useState('30');
  const [hookStatusMessage, setHookStatusMessage] = useState('Running hook');
  const [editingHookTarget, setEditingHookTarget] = useState<
    UpdateThreadHookInput['target'] | null
  >(null);
  const [hookConfigBusy, setHookConfigBusy] = useState(false);
  const [hookConfigError, setHookConfigError] = useState<string | null>(null);
  const [hookConfigSuccess, setHookConfigSuccess] = useState<string | null>(
    null,
  );
  const hookCommandTemplateByEvent = useMemo(
    () => buildHookCommandTemplateMap(hookCommandTemplates),
    [hookCommandTemplates],
  );
  const defaultHookCommand = useCallback(
    (eventName: AgentHookEventNameDto) =>
      hookCommandTemplateByEvent.get(eventName) ??
      hookCommandTemplateByEvent.get('preToolUse') ??
      FALLBACK_HOOK_COMMAND,
    [hookCommandTemplateByEvent],
  );
  const defaultHookCommands = useMemo(
    () =>
      new Set([FALLBACK_HOOK_COMMAND, ...hookCommandTemplateByEvent.values()]),
    [hookCommandTemplateByEvent],
  );

  const clearHookConfigStatus = useCallback(() => {
    setHookConfigError(null);
    setHookConfigSuccess(null);
  }, []);

  useEffect(() => {
    if (slashPanelView !== 'hooks') {
      setHooksPanelMode('list');
      clearHookConfigStatus();
    }
  }, [clearHookConfigStatus, slashPanelView]);

  useEffect(() => {
    const selected = HOOK_EVENT_OPTIONS.find(
      (entry) => entry.value === hookEventName,
    );
    setHookMatcher((current) => {
      const trimmed = current.trim();
      const knownHints = new Set(
        HOOK_EVENT_OPTIONS.map((entry) => entry.matcherHint).filter(Boolean),
      );
      if (trimmed && !knownHints.has(trimmed)) {
        return current;
      }
      return selected?.matcherHint ?? '';
    });
    setHookCommand((current) =>
      defaultHookCommands.has(current.trim())
        ? defaultHookCommand(hookEventName)
        : current,
    );
  }, [defaultHookCommand, defaultHookCommands, hookEventName]);

  const resetHookForm = useCallback(() => {
    setEditingHookTarget(null);
    setHookScope('project');
    setHookEventName('preToolUse');
    setHookMatcher('Bash');
    setHookCommand(defaultHookCommand('preToolUse'));
    setHookTimeoutSec('30');
    setHookStatusMessage('Running hook');
  }, [defaultHookCommand]);

  const startEditingHook = useCallback((hook: AgentHookDto) => {
    const target = editableHookTarget(hook);
    if (!target) {
      setHookConfigError(
        'Only command hooks in global or project hooks.json can be edited here.',
      );
      return;
    }
    setEditingHookTarget(target);
    setHookScope(target.scope);
    setHookEventName(target.eventName);
    setHookMatcher(target.matcher ?? '');
    setHookCommand(target.command);
    setHookTimeoutSec(target.timeoutSec ? String(target.timeoutSec) : '');
    setHookStatusMessage(target.statusMessage ?? '');
    setHookConfigError(null);
    setHookConfigSuccess(null);
    setHooksPanelMode('edit');
  }, []);

  const saveHook = useCallback(async () => {
    if (hooksPanelMode === 'edit' && !onUpdateHook) {
      setHookConfigError('Hook editing is unavailable in this view.');
      return;
    }
    if (hooksPanelMode !== 'edit' && !onCreateHook) {
      setHookConfigError('Hook editing is unavailable in this view.');
      return;
    }
    if (hooksPanelMode === 'edit' && !editingHookTarget) {
      setHookConfigError('Select a hook to edit first.');
      return;
    }

    const command = hookCommand.trim();
    if (!command) {
      setHookConfigError('Hook command cannot be empty.');
      return;
    }

    const normalizedTimeout = hookTimeoutSec.trim();
    const timeoutSec = normalizedTimeout ? Number(normalizedTimeout) : null;
    if (
      normalizedTimeout &&
      (timeoutSec === null || !Number.isInteger(timeoutSec) || timeoutSec <= 0)
    ) {
      setHookConfigError('Timeout must be a positive number of seconds.');
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
        statusMessage: hookStatusMessage.trim() || null,
      };
      if (hooksPanelMode === 'edit') {
        await onUpdateHook?.({
          ...payload,
          target: editingHookTarget!,
        });
      } else {
        await onCreateHook?.(payload);
      }
      setHookConfigSuccess(
        `${hookScope === 'project' ? 'Project' : 'Global'} hook ${
          hooksPanelMode === 'edit' ? 'updated' : 'written'
        } in hooks.json and trusted.`,
      );
      setHooksPanelMode('list');
      setEditingHookTarget(null);
    } catch (error) {
      setHookConfigError(
        error instanceof Error ? error.message : 'Unable to write hooks.json.',
      );
    } finally {
      setHookConfigBusy(false);
    }
  }, [
    editingHookTarget,
    hookCommand,
    hookEventName,
    hookMatcher,
    hookScope,
    hookStatusMessage,
    hookTimeoutSec,
    hooksPanelMode,
    onCreateHook,
    onUpdateHook,
  ]);

  const trustHook = useCallback(
    async (hook: AgentHookDto) => {
      if (!onTrustHook || !hook.currentHash) {
        setHookConfigError('Hook trust is unavailable in this view.');
        return;
      }

      setHookConfigBusy(true);
      setHookConfigError(null);
      setHookConfigSuccess(null);

      try {
        await onTrustHook({
          key: hook.key,
          currentHash: hook.currentHash,
        });
        setHookConfigSuccess('Hook trusted.');
      } catch (error) {
        setHookConfigError(
          error instanceof Error ? error.message : 'Unable to trust hook.',
        );
      } finally {
        setHookConfigBusy(false);
      }
    },
    [onTrustHook],
  );

  const untrustHook = useCallback(
    async (hook: AgentHookDto) => {
      if (!onUntrustHook) {
        setHookConfigError('Hook trust is unavailable in this view.');
        return;
      }

      setHookConfigBusy(true);
      setHookConfigError(null);
      setHookConfigSuccess(null);

      try {
        await onUntrustHook({
          key: hook.key,
        });
        setHookConfigSuccess('Hook untrusted.');
      } catch (error) {
        setHookConfigError(
          error instanceof Error ? error.message : 'Unable to untrust hook.',
        );
      } finally {
        setHookConfigBusy(false);
      }
    },
    [onUntrustHook],
  );

  return {
    hooksPanelMode,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    editingHookTarget,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    setHooksPanelMode,
    setEditingHookTarget,
    setHookScope,
    setHookEventName,
    setHookMatcher,
    setHookCommand,
    setHookTimeoutSec,
    setHookStatusMessage,
    clearHookConfigStatus,
    resetHookForm,
    startEditingHook,
    saveHook,
    trustHook,
    untrustHook,
  };
}
