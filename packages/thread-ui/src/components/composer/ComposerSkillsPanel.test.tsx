/**
 * @vitest-environment jsdom
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ComposerSkillsPanel } from './ComposerSkillsPanel';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function renderNode(node: React.ReactNode) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  flushSync(() => {
    root?.render(node);
  });

  return container;
}

describe('ComposerSkillsPanel', () => {
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

  it('renders skills and copies invoke names', () => {
    const onCopySkillInvokeName = vi.fn();
    const view = renderNode(
      <ComposerSkillsPanel
        skillsState={{
          status: 'ready',
          error: null,
          data: {
            cwd: '/repo',
            skills: [
              {
                name: 'reviewer',
                path: '/skills/reviewer/SKILL.md',
                scope: 'repo',
                enabled: true,
                description: 'Review code',
                shortDescription: 'Review code succinctly',
                interface: {
                  displayName: 'Code Reviewer',
                  shortDescription: 'Review changed code',
                },
              },
            ],
            errors: [],
          },
        }}
        copiedSkillName={null}
        composerChipButtonClassName="chip"
        onCopySkillInvokeName={onCopySkillInvokeName}
      />,
    );

    expect(view.textContent).toContain('Code Reviewer');
    expect(view.textContent).toContain('Repo');
    expect(view.textContent).toContain('Review changed code');

    view.querySelector<HTMLButtonElement>('button')?.click();
    expect(onCopySkillInvokeName).toHaveBeenCalledWith('reviewer');
  });

  it('renders loading, empty, and error states', () => {
    const view = renderNode(
      <ComposerSkillsPanel
        skillsState={{
          status: 'loading',
          error: null,
          data: null,
        }}
        copiedSkillName={null}
        composerChipButtonClassName="chip"
        onCopySkillInvokeName={vi.fn()}
      />,
    );

    expect(view.textContent).toContain('Loading skills...');

    flushSync(() => {
      root?.render(
        <ComposerSkillsPanel
          skillsState={{
            status: 'ready',
            error: null,
            data: { cwd: '/repo', skills: [], errors: [] },
          }}
          copiedSkillName={null}
          composerChipButtonClassName="chip"
          onCopySkillInvokeName={vi.fn()}
        />,
      );
    });

    expect(view.textContent).toContain('No skills available right now.');

    flushSync(() => {
      root?.render(
        <ComposerSkillsPanel
          skillsState={{
            status: 'failed',
            error: 'Unable to load skills',
            data: {
              cwd: '/repo',
              skills: [],
              errors: [
                {
                  path: '/broken/SKILL.md',
                  message: 'Invalid front matter',
                },
              ],
            },
          }}
          copiedSkillName={null}
          composerChipButtonClassName="chip"
          onCopySkillInvokeName={vi.fn()}
        />,
      );
    });

    expect(view.textContent).toContain('Unable to load skills');
    expect(view.textContent).toContain('Invalid front matter');
    expect(view.textContent).toContain('/broken/SKILL.md');
  });
});
