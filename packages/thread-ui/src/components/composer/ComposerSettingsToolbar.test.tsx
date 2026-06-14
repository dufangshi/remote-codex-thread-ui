/**
 * @vitest-environment jsdom
 */
import { useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type {
  CollaborationModeDto,
  ModelOptionDto,
  ReasoningEffortDto,
  UpdateThreadSettingsInput,
} from '@remote-codex/shared';

import type { SettingsMenu } from './types';
import { ComposerSettingsToolbar } from './ComposerSettingsToolbar';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

const modelOptions: ModelOptionDto[] = [
  {
    id: 'gpt-5',
    model: 'gpt-5',
    displayName: 'GPT-5',
    description: '',
    isDefault: true,
    hidden: false,
    supportedReasoningEfforts: [
      { reasoningEffort: 'low', description: '' },
      { reasoningEffort: 'medium', description: '' },
    ],
    defaultReasoningEffort: 'medium',
  },
  {
    id: 'gpt-5-mini',
    model: 'gpt-5-mini',
    displayName: 'GPT-5 mini',
    description: '',
    isDefault: false,
    hidden: false,
    supportedReasoningEfforts: [
      { reasoningEffort: 'minimal', description: '' },
    ],
    defaultReasoningEffort: 'minimal',
  },
];

function renderNode(node: ReactNode) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(node);
  });

  return container;
}

function renderToolbar({
  initialOpenMenu = null,
  displayedCollaborationMode = 'default',
  reasoningEffort = 'medium',
  disabled = false,
  goalBusy = false,
  activeView = 'chat',
  planModeAvailable = true,
  onUpdateSettings = vi.fn(),
}: {
  initialOpenMenu?: SettingsMenu;
  displayedCollaborationMode?: CollaborationModeDto;
  reasoningEffort?: ReasoningEffortDto | null;
  disabled?: boolean;
  goalBusy?: boolean;
  activeView?: 'chat' | 'shell';
  planModeAvailable?: boolean;
  onUpdateSettings?: (input: UpdateThreadSettingsInput) => void;
} = {}) {
  function Harness() {
    const [openMenu, setOpenMenu] = useState<SettingsMenu>(initialOpenMenu);

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <ComposerSettingsToolbar
          openMenu={openMenu}
          model="gpt-5"
          modelOptions={modelOptions}
          modelContextTitle="1k / 8k tokens"
          contextUsage={null}
          reasoningEffort={reasoningEffort}
          supportedEfforts={modelOptions[0]?.supportedReasoningEfforts ?? []}
          displayedCollaborationMode={displayedCollaborationMode}
          planModeAvailable={planModeAvailable}
          settingsBusy={false}
          goalComposeMode={false}
          goalBusy={goalBusy}
          activeView={activeView}
          disabled={disabled}
          fastMode={false}
          sendButtonLabel="Send"
          sendButtonClassName="send-state"
          modelControlsDisabled={false}
          effortControlsDisabled={false}
          effortControlTitle="Select reasoning effort"
          inlineToggleClassName="inline-toggle"
          menuItemClassName="menu-item"
          planToggleActiveClassName="plan-active"
          sendButtonBaseClassName="send-base"
          onSetOpenMenu={setOpenMenu}
          onUpdateSettings={onUpdateSettings}
        />
      </form>
    );
  }

  return renderNode(<Harness />);
}

function buttonByText(view: HTMLElement, text: string) {
  return Array.from(view.querySelectorAll<HTMLButtonElement>('button')).find(
    (button) => button.textContent?.includes(text),
  );
}

describe('ComposerSettingsToolbar', () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    if (root) {
      flushSync(() => {
        root?.unmount();
      });
    }
    container?.remove();
    root = null;
    container = null;
  });

  it('opens the model menu and selects a model with its default effort', () => {
    const onUpdateSettings = vi.fn();
    const view = renderToolbar({ onUpdateSettings });

    flushSync(() => {
      view.querySelector<HTMLButtonElement>('[aria-label="gpt-5"]')?.click();
    });
    expect(view.querySelector('[data-composer-menu-surface="true"]')).not.toBeNull();
    buttonByText(view, 'gpt-5-mini')?.click();

    expect(onUpdateSettings).toHaveBeenCalledWith({
      model: 'gpt-5-mini',
      reasoningEffort: 'minimal',
    });
  });

  it('selects reasoning effort from the effort menu', () => {
    const onUpdateSettings = vi.fn();
    const view = renderToolbar({
      initialOpenMenu: 'effort',
      onUpdateSettings,
    });

    buttonByText(view, 'low')?.click();

    expect(onUpdateSettings).toHaveBeenCalledWith({
      reasoningEffort: 'low',
    });
  });

  it('toggles plan mode through settings updates', () => {
    const onUpdateSettings = vi.fn();
    const view = renderToolbar({ onUpdateSettings });

    buttonByText(view, 'Plan')?.click();

    expect(onUpdateSettings).toHaveBeenCalledWith({
      collaborationMode: 'plan',
    });
  });

  it('marks active plan mode and can switch it back to default', () => {
    const onUpdateSettings = vi.fn();
    const view = renderToolbar({
      displayedCollaborationMode: 'plan',
      onUpdateSettings,
    });
    const planButton = buttonByText(view, 'Plan');

    expect(planButton?.getAttribute('aria-pressed')).toBe('true');
    planButton?.click();
    expect(onUpdateSettings).toHaveBeenCalledWith({
      collaborationMode: 'default',
    });
  });

  it('keeps the chat send button disabled when composer input is disabled', () => {
    const view = renderToolbar({ disabled: true });

    expect(view.querySelector<HTMLButtonElement>('[aria-label="Send Prompt"]')?.disabled)
      .toBe(true);
  });

  it('does not disable the shell send button from chat prompt disabled state', () => {
    const view = renderToolbar({ activeView: 'shell', disabled: true });

    expect(view.querySelector<HTMLButtonElement>('[aria-label="Send Prompt"]')?.disabled)
      .toBe(false);
  });
});
