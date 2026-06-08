// src/agent-providers.ts
var agentBackendIds = ["codex", "claude", "opencode"];
var defaultAgentBackendId = "codex";
var agentBackendMetadata = {
  codex: {
    displayName: "Codex",
    description: "Local Codex app-server runtime.",
    defaultTransport: "stdio",
    homeEnvVar: "CODEX_HOME",
    commandEnvVar: "CODEX_COMMAND",
    defaultHomeDir: ".codex",
    defaultCommand: "codex"
  },
  claude: {
    displayName: "Claude Code",
    description: "Local Claude Code Agent SDK runtime.",
    defaultTransport: "sdk",
    homeEnvVar: "CLAUDE_HOME",
    commandEnvVar: "CLAUDE_COMMAND",
    defaultHomeDir: ".claude",
    defaultCommand: "claude"
  },
  opencode: {
    displayName: "OpenCode",
    description: "Local OpenCode runtime.",
    defaultTransport: "sdk",
    homeEnvVar: "OPENCODE_HOME",
    commandEnvVar: "OPENCODE_COMMAND",
    defaultHomeDir: ".opencode",
    defaultCommand: "opencode"
  }
};
function isAgentBackendId(value) {
  return typeof value === "string" && agentBackendIds.includes(value);
}
function normalizeAgentBackendId(value) {
  return isAgentBackendId(value) ? value : null;
}

// src/index.ts
var AUTO_THREAD_TITLE_MAX_CHARS = 15;
function normalizeAutoThreadTitleWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}
function truncateAutoThreadTitle(value) {
  const normalized = normalizeAutoThreadTitleWhitespace(value);
  if (!normalized) {
    return "";
  }
  const characters = Array.from(normalized);
  if (characters.length <= AUTO_THREAD_TITLE_MAX_CHARS) {
    return normalized;
  }
  return `${characters.slice(0, AUTO_THREAD_TITLE_MAX_CHARS).join("")}...`;
}
export {
  agentBackendIds,
  agentBackendMetadata,
  defaultAgentBackendId,
  isAgentBackendId,
  normalizeAgentBackendId,
  truncateAutoThreadTitle
};
