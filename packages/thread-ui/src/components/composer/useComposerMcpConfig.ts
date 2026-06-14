import { useCallback, useState } from 'react';

import type { ProviderHostFileDto } from '@remote-codex/shared';
import {
  parseMcpServerName,
  parseMcpServerNameFromBlock,
  renderHttpMcpBlock,
  upsertMcpServerBlock,
} from './composerUtils';
import type { McpPanelMode } from './types';

const DEFAULT_RAW_MCP_BLOCK =
  '[mcp_servers.example_stdio]\ncommand = "npx"\nargs = ["-y", "your-mcp-server"]\n';
const MCP_CONFIG_SUCCESS_MESSAGE =
  'MCP entry written to provider config. Restart the backend if it does not appear immediately.';

export interface UseComposerMcpConfigInput {
  hostConfigFilesAvailable: boolean;
  onReadProviderConfig?:
    | (() => Promise<ProviderHostFileDto> | ProviderHostFileDto)
    | undefined;
  onWriteProviderConfig?:
    | ((content: string) => Promise<ProviderHostFileDto> | ProviderHostFileDto)
    | undefined;
  setMcpPanelMode: (mode: McpPanelMode) => void;
  onOpenMcp?: () => Promise<void> | void;
}

export interface UseComposerMcpConfigResult {
  mcpHttpName: string;
  mcpHttpUrl: string;
  mcpRawBlock: string;
  mcpConfigPath: string | null;
  mcpConfigBusy: boolean;
  mcpConfigError: string | null;
  mcpConfigSuccess: string | null;
  setMcpHttpName: (value: string) => void;
  setMcpHttpUrl: (value: string) => void;
  setMcpRawBlock: (value: string) => void;
  clearMcpConfigStatus: () => void;
  prepareRawMcpBlock: () => Promise<void>;
  saveHttpMcp: () => Promise<void>;
  saveRawMcpBlock: () => Promise<void>;
}

export function useComposerMcpConfig({
  hostConfigFilesAvailable,
  onReadProviderConfig,
  onWriteProviderConfig,
  setMcpPanelMode,
  onOpenMcp,
}: UseComposerMcpConfigInput): UseComposerMcpConfigResult {
  const [mcpHttpName, setMcpHttpName] = useState('');
  const [mcpHttpUrl, setMcpHttpUrl] = useState('');
  const [mcpRawBlock, setMcpRawBlock] = useState('');
  const [mcpConfigPath, setMcpConfigPath] = useState<string | null>(null);
  const [mcpConfigBusy, setMcpConfigBusy] = useState(false);
  const [mcpConfigError, setMcpConfigError] = useState<string | null>(null);
  const [mcpConfigSuccess, setMcpConfigSuccess] = useState<string | null>(null);

  const clearMcpConfigStatus = useCallback(() => {
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
  }, []);

  const loadProviderConfig = useCallback(async () => {
    if (!hostConfigFilesAvailable || !onReadProviderConfig) {
      throw new Error(
        'Provider config editing is unavailable for this thread.',
      );
    }

    const file = await onReadProviderConfig();
    setMcpConfigPath(file.path);
    return file;
  }, [hostConfigFilesAvailable, onReadProviderConfig]);

  const writeMcpConfig = useCallback(
    async (nextContent: string) => {
      if (!hostConfigFilesAvailable || !onWriteProviderConfig) {
        throw new Error(
          'Provider config editing is unavailable for this thread.',
        );
      }

      const updated = await onWriteProviderConfig(nextContent);
      setMcpConfigPath(updated.path);
      return updated;
    },
    [hostConfigFilesAvailable, onWriteProviderConfig],
  );

  const saveHttpMcp = useCallback(async () => {
    const name = parseMcpServerName(mcpHttpName);
    const url = mcpHttpUrl.trim();
    if (!name) {
      setMcpConfigError(
        'MCP name must use only letters, numbers, underscore, or hyphen.',
      );
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      setMcpConfigError('HTTP MCP URL must start with http:// or https://');
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
        renderHttpMcpBlock(name, url),
      );
      await writeMcpConfig(nextContent);
      setMcpConfigSuccess(MCP_CONFIG_SUCCESS_MESSAGE);
      setMcpPanelMode('list');
      setMcpHttpName('');
      setMcpHttpUrl('');
      void onOpenMcp?.();
    } catch (error) {
      setMcpConfigError(
        error instanceof Error
          ? error.message
          : 'Unable to update provider config.',
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }, [
    loadProviderConfig,
    mcpHttpName,
    mcpHttpUrl,
    onOpenMcp,
    setMcpPanelMode,
    writeMcpConfig,
  ]);

  const prepareRawMcpBlock = useCallback(async () => {
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);

    try {
      await loadProviderConfig();
      setMcpRawBlock((current) => current || DEFAULT_RAW_MCP_BLOCK);
      setMcpPanelMode('stdio');
    } catch (error) {
      setMcpConfigError(
        error instanceof Error
          ? error.message
          : 'Unable to load provider config.',
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }, [loadProviderConfig, setMcpPanelMode]);

  const saveRawMcpBlock = useCallback(async () => {
    const serverName = parseMcpServerNameFromBlock(mcpRawBlock);
    if (!serverName) {
      setMcpConfigError(
        'The raw MCP block must start with a header like [mcp_servers.name].',
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
        mcpRawBlock,
      );
      await writeMcpConfig(nextContent);
      setMcpConfigSuccess(MCP_CONFIG_SUCCESS_MESSAGE);
      setMcpPanelMode('list');
      void onOpenMcp?.();
    } catch (error) {
      setMcpConfigError(
        error instanceof Error
          ? error.message
          : 'Unable to update provider config.',
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }, [
    loadProviderConfig,
    mcpRawBlock,
    onOpenMcp,
    setMcpPanelMode,
    writeMcpConfig,
  ]);

  return {
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    mcpConfigPath,
    mcpConfigBusy,
    mcpConfigError,
    mcpConfigSuccess,
    setMcpHttpName,
    setMcpHttpUrl,
    setMcpRawBlock,
    clearMcpConfigStatus,
    prepareRawMcpBlock,
    saveHttpMcp,
    saveRawMcpBlock,
  };
}
