import type {
  CollaborationModeDto,
  ModelOptionDto,
  ReasoningEffortDto,
  ThreadContextUsageDto,
  UpdateThreadSettingsInput,
} from '@remote-codex/shared';

import { InputGroupButton } from '../graph-ui/InputGroup';
import type { SettingsMenu } from './types';
import {
  formatReasoningEffortLabel,
} from './composerUtils';
import {
  ContextProgressBar,
} from './composerPresentation';

export function ComposerSettingsToolbar({
  openMenu,
  model,
  modelOptions,
  modelContextTitle,
  contextUsage,
  reasoningEffort,
  supportedEfforts,
  displayedCollaborationMode,
  planModeAvailable,
  settingsBusy,
  goalComposeMode,
  goalBusy,
  activeView,
  disabled,
  fastMode,
  sendButtonLabel,
  sendButtonClassName,
  modelControlsDisabled,
  effortControlsDisabled,
  effortControlTitle,
  inlineToggleClassName,
  menuItemClassName,
  planToggleActiveClassName,
  sendButtonBaseClassName,
  onSetOpenMenu,
  onUpdateSettings,
}: {
  openMenu: SettingsMenu;
  model: string | null | undefined;
  modelOptions: ModelOptionDto[];
  modelContextTitle: string;
  contextUsage: ThreadContextUsageDto | null | undefined;
  reasoningEffort: ReasoningEffortDto | null | undefined;
  supportedEfforts: ModelOptionDto['supportedReasoningEfforts'];
  displayedCollaborationMode: CollaborationModeDto;
  planModeAvailable: boolean;
  settingsBusy: boolean;
  goalComposeMode: boolean;
  goalBusy: boolean;
  activeView: 'chat' | 'shell';
  disabled: boolean;
  fastMode: boolean;
  sendButtonLabel: string;
  sendButtonClassName: string;
  modelControlsDisabled: boolean;
  effortControlsDisabled: boolean;
  effortControlTitle: string;
  inlineToggleClassName: string;
  menuItemClassName: string;
  planToggleActiveClassName: string;
  sendButtonBaseClassName: string;
  onSetOpenMenu: (updater: (current: SettingsMenu) => SettingsMenu) => void;
  onUpdateSettings: (input: UpdateThreadSettingsInput) => void;
}) {
  return (
    <>
      <div className="relative min-w-0">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="xs"
          data-composer-menu-trigger="true"
          aria-haspopup="menu"
          aria-expanded={openMenu === 'model'}
          aria-label={model ?? 'Select model'}
          disabled={modelControlsDisabled || modelOptions.length === 0}
          onClick={() =>
            onSetOpenMenu((current) =>
              current === 'model' ? null : 'model',
            )
          }
          title={
            fastMode
              ? `Fast mode is on. Turn it off from the slash toolbox to edit model. ${modelContextTitle}`
              : modelContextTitle
          }
          className={`${inlineToggleClassName} relative min-w-0 max-w-[8.75rem] overflow-hidden rounded-full px-2.5 text-left text-stone-300 disabled:cursor-not-allowed disabled:text-stone-600 sm:max-w-[11rem]`}
        >
          <span className="relative z-[1] block min-w-0 truncate whitespace-nowrap [direction:rtl]">
            {model ?? 'Select model'}
          </span>
        </InputGroupButton>
        {model ? <ContextProgressBar contextUsage={contextUsage} /> : null}
        {openMenu === 'model' && (
          <div
            data-composer-menu-surface="true"
            className="absolute bottom-full left-0 mb-2 w-max min-w-[9rem] max-w-[14rem] overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40"
          >
            <div className="max-h-72 overflow-auto p-2">
              {modelOptions.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      model: entry.model,
                      reasoningEffort: entry.defaultReasoningEffort,
                    })
                  }
                  className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                    entry.model === model
                      ? 'ui-status-warning'
                      : `${menuItemClassName} text-stone-300`
                  }`}
                >
                  <p className="text-sm font-medium">{entry.model}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="xs"
          data-composer-menu-trigger="true"
          aria-haspopup="menu"
          aria-expanded={openMenu === 'effort'}
          disabled={effortControlsDisabled}
          onClick={() =>
            onSetOpenMenu((current) =>
              current === 'effort' ? null : 'effort',
            )
          }
          title={effortControlTitle}
          className={`${inlineToggleClassName} rounded-full px-2 disabled:cursor-not-allowed disabled:text-stone-700 ${
            effortControlsDisabled
              ? 'text-stone-500'
              : 'text-stone-300 hover:text-stone-100'
          }`}
        >
          {formatReasoningEffortLabel(reasoningEffort)}
        </InputGroupButton>
        {openMenu === 'effort' && (
          <div
            data-composer-menu-surface="true"
            className="absolute bottom-full left-0 mb-2 w-max min-w-[8rem] max-w-[12rem] overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40"
          >
            <div className="max-h-72 overflow-auto p-2">
              {supportedEfforts.map((entry) => (
                <button
                  key={entry.reasoningEffort}
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      reasoningEffort: entry.reasoningEffort,
                    })
                  }
                  className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                    entry.reasoningEffort === reasoningEffort
                      ? 'ui-status-warning'
                      : `${menuItemClassName} text-stone-300`
                  }`}
                >
                  <p className="text-sm font-medium">
                    {formatReasoningEffortLabel(entry.reasoningEffort)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {planModeAvailable && (
        <InputGroupButton
          type="button"
          variant="ghost"
          size="xs"
          aria-pressed={displayedCollaborationMode === 'plan'}
          disabled={settingsBusy}
          onClick={() =>
            onUpdateSettings({
              collaborationMode:
                displayedCollaborationMode === 'plan' ? 'default' : 'plan',
            })
          }
          className={`${inlineToggleClassName} rounded-full px-2.5 ${
            displayedCollaborationMode === 'plan'
              ? planToggleActiveClassName
              : 'text-stone-500'
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          Plan
        </InputGroupButton>
      )}

      <InputGroupButton
        type="submit"
        variant="default"
        size="icon-xs"
        aria-label={goalComposeMode ? 'Set goal' : 'Send Prompt'}
        title={sendButtonLabel}
        disabled={goalBusy || (activeView === 'chat' ? disabled : false)}
        className={`${sendButtonBaseClassName} h-9 w-9 rounded-full text-sm font-medium disabled:cursor-not-allowed sm:h-8 sm:w-8 ${sendButtonClassName}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 fill-none stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 13V3" />
          <path d="m4 7 4-4 4 4" />
        </svg>
      </InputGroupButton>
    </>
  );
}
