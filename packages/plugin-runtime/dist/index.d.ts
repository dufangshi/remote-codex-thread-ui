type ReasoningEffortDto = 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
interface ThreadHistoryItemDto {
    id: string;
    kind: 'userMessage' | 'agentMessage' | 'artifact' | 'image' | 'plan' | 'contextCompaction' | 'reasoning' | 'commandExecution' | 'webSearch' | 'fileRead' | 'fileChange' | 'hook' | 'agentToolCall' | 'skillToolCall' | 'toolCall' | 'other';
    text: string;
    previewText?: string;
    detailText?: string | null;
    hasDeferredDetail?: boolean | null;
    sequence?: number | null;
    transcriptOrder?: number | null;
    sourceTurnId?: string | null;
    status?: string | null;
    assetPath?: string | null;
    changedFiles?: number | null;
    addedLines?: number | null;
    removedLines?: number | null;
    hookEventName?: string | null;
    hookEventLabel?: string | null;
    hookHandlerType?: string | null;
    hookScope?: string | null;
    hookSource?: string | null;
    hookSourcePath?: string | null;
    hookStatusMessage?: string | null;
    hookOutputEntries?: Array<{
        kind: string;
        text: string;
    }> | null;
    artifact?: ThreadArtifactDto | null;
}
interface ThreadArtifactDto {
    id: string;
    pluginId: string;
    type: string;
    title: string;
    summaryText?: string | null;
    payload: unknown;
    assets?: Array<{
        id: string;
        mediaType: string;
        url: string;
        name?: string | null;
    }> | null;
    sourceTurnId?: string | null;
    sourceItemId?: string | null;
    createdAt: string;
}
interface PluginArtifactTypeDto {
    type: string;
    title: string;
    fileExtensions?: string[];
}
interface PluginThreadPanelDto {
    id: string;
    label: string;
    kind?: 'artifact' | 'terminal' | string;
    artifactTypes: string[];
}
interface PluginModelHintDto {
    id: string;
    text: string;
}
interface PluginMcpServerDto {
    id: string;
    name: string;
    command: string;
    args?: string[];
    env?: Record<string, string>;
}
interface PluginCapabilitiesDto {
    artifactTypes: PluginArtifactTypeDto[];
    timelineRenderers: string[];
    threadPanels: PluginThreadPanelDto[];
    modelHints?: PluginModelHintDto[];
    mcpServers?: PluginMcpServerDto[];
    frontend?: {
        entry?: string;
        style?: string;
    };
    backend?: {
        entry?: string;
    };
}
interface PluginManifestDto {
    id: string;
    name: string;
    version: string;
    description: string;
    remoteCodex: string;
    capabilities: PluginCapabilitiesDto;
}
interface PluginDto extends PluginManifestDto {
    enabled: boolean;
    source?: 'builtin' | 'imported' | null;
}
interface ThreadTurnTokenBreakdownDto {
    totalTokens: number;
    inputTokens: number;
    cachedInputTokens: number;
    outputTokens: number;
    reasoningOutputTokens: number;
}
interface ThreadTurnTokenUsageDto {
    total: ThreadTurnTokenBreakdownDto;
    last: ThreadTurnTokenBreakdownDto;
    modelContextWindow: number | null;
}
type ThreadTurnPricingTierDto = 'standard' | 'fast';
interface ThreadTurnPriceEstimateDto {
    pricingModelKey: string;
    pricingTierKey: ThreadTurnPricingTierDto;
    currency: 'USD';
    inputUsd: number;
    cachedInputUsd: number;
    outputUsd: number;
    totalUsd: number;
}
interface ThreadTurnDto {
    id: string;
    startedAt: string | null;
    status: 'completed' | 'interrupted' | 'failed' | 'inProgress';
    error: string | null;
    model?: string | null;
    reasoningEffort?: ReasoningEffortDto | null;
    reasoningEffortAvailable?: boolean | null;
    tokenUsage?: ThreadTurnTokenUsageDto | null;
    priceEstimate?: ThreadTurnPriceEstimateDto | null;
    items: ThreadHistoryItemDto[];
}

type RemoteCodexPluginManifest = PluginManifestDto;
interface RegisteredPlugin {
    manifest: RemoteCodexPluginManifest;
    enabledByDefault?: boolean;
    source?: 'builtin' | 'imported';
}
interface PluginRegistrySnapshot {
    plugins: PluginDto[];
}
interface ArtifactExtractionContext {
    threadId: string;
    workspacePath: string;
    now: string;
}
interface ArtifactExtractionResult {
    sourceItem: ThreadHistoryItemDto;
    artifacts: ThreadArtifactDto[];
}
interface ArtifactExtractor {
    extractFromTurn(turn: ThreadTurnDto, context: ArtifactExtractionContext): ArtifactExtractionResult[];
}

declare class PluginRegistry {
    private readonly plugins;
    private readonly enabled;
    constructor(plugins?: RegisteredPlugin[]);
    register(plugin: RegisteredPlugin): void;
    updateImported(plugin: RegisteredPlugin): void;
    list(): PluginDto[];
    get(pluginId: string): PluginDto | null;
    getManifest(pluginId: string): PluginManifestDto | null;
    getRegistered(pluginId: string): RegisteredPlugin | null;
    isEnabled(pluginId: string): boolean;
    setEnabled(pluginId: string, enabled: boolean): PluginDto;
    enabledManifests(): PluginManifestDto[];
    private toDto;
}

declare function looksLikeXyzMolecule(content: string): boolean;
declare function looksLikePdbMolecule(content: string): boolean;
declare function looksLikeCifMolecule(content: string): boolean;
declare function looksLikeMoleculeStructure(content: string, format: string): boolean;
declare class ManifestArtifactExtractor implements ArtifactExtractor {
    private readonly manifests;
    constructor(manifests: PluginManifestDto[]);
    extractFromTurn(turn: ThreadTurnDto, context: ArtifactExtractionContext): ArtifactExtractionResult[];
    private extractFromItem;
    private extractJsonArtifacts;
    private hasArtifactType;
    private pluginIdForArtifactType;
}
declare function appendArtifactItemsToTurns(turns: ThreadTurnDto[], extractor: ArtifactExtractor, context: ArtifactExtractionContext): ThreadTurnDto[];

declare function parsePluginManifest(value: unknown): PluginManifestDto;

export { type ArtifactExtractionContext, type ArtifactExtractionResult, type ArtifactExtractor, ManifestArtifactExtractor, PluginRegistry, type PluginRegistrySnapshot, type RegisteredPlugin, type RemoteCodexPluginManifest, appendArtifactItemsToTurns, looksLikeCifMolecule, looksLikeMoleculeStructure, looksLikePdbMolecule, looksLikeXyzMolecule, parsePluginManifest };
