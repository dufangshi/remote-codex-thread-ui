/**
 * @vitest-environment jsdom
 */
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GraphChatCompactMessageItem } from "./GraphChatCompactMessageItem";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let cleanup: (() => void) | null = null;

afterEach(() => {
  cleanup?.();
  cleanup = null;
  vi.restoreAllMocks();
});

describe("GraphChatCompactMessageItem", () => {
  it("replaces the copy icon with a check after copying an agent reply", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => {
      root.unmount();
      container.remove();
    };

    await act(async () => {
      root.render(
        <GraphChatCompactMessageItem
          threadId="thread-1"
          item={{
            id: "agent-1",
            kind: "agentMessage",
            text: "Done",
            createdAt: null,
          }}
          scrollRootRef={{ current: null }}
        />,
      );
    });

    const copyButton = container.querySelector<HTMLButtonElement>(
      '[aria-label="Copy agent reply"]',
    );
    expect(copyButton?.querySelector(".lucide-copy")).toBeTruthy();
    await act(async () => {
      copyButton?.click();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Done");
    expect(copyButton?.querySelector(".lucide-check")).toBeTruthy();
  });
});
