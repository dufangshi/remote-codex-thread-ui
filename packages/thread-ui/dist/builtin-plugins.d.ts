import { F as FrontendPluginModule, I as InlineCodeRenderContext, A as ArtifactRenderContext } from './plugin-types-DFFQFPsc.js';
import * as react from 'react';
import '@remote-codex/shared';

declare const builtinFrontendPlugins: FrontendPluginModule[];

declare function XyzArtifactRenderer({ artifact, expanded, onToggleExpanded, }: ArtifactRenderContext): react.JSX.Element;
declare function InlineXyzRenderer({ code, isIncomplete, language, }: InlineCodeRenderContext): react.JSX.Element | null;

export { InlineXyzRenderer, XyzArtifactRenderer, builtinFrontendPlugins, builtinFrontendPlugins as defaultBuiltinFrontendPlugins };
