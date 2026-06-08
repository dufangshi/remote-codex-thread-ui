export { M as MoleculeAtomSelection, a as MoleculeScreenshot, b as MoleculeViewerData, c as MoleculeViewerSnapshot, d as MoleculeViewerSource, X as XyzMoleculeViewer, e as XyzMoleculeViewerProps, f as buildMoleculeViewerSnapshot, i as isMoleculeFileName, r as readMoleculeViewerData, s as supportedMoleculeFormats } from './frontend-DvBuSv6m.js';
import 'react';

declare const XYZ_MOLECULE_ARTIFACT_TYPE = "chemistry.molecule3d";
interface XyzViewerPluginManifest {
    id: 'remote-codex.xyz-viewer';
    name: string;
    version: string;
    description: string;
    remoteCodex: string;
    capabilities: {
        artifactTypes: Array<{
            type: typeof XYZ_MOLECULE_ARTIFACT_TYPE;
            title: string;
            fileExtensions: string[];
        }>;
        timelineRenderers: Array<typeof XYZ_MOLECULE_ARTIFACT_TYPE>;
        threadPanels: Array<{
            id: string;
            label: string;
            artifactTypes: Array<typeof XYZ_MOLECULE_ARTIFACT_TYPE>;
        }>;
        modelHints: Array<{
            id: string;
            text: string;
        }>;
        mcpServers: Array<{
            id: string;
            name: string;
            command: string;
            args: string[];
        }>;
        frontend: {
            entry: string;
            style: string;
        };
    };
}
declare const xyzViewerPluginManifest: XyzViewerPluginManifest;

export { XYZ_MOLECULE_ARTIFACT_TYPE, type XyzViewerPluginManifest, xyzViewerPluginManifest };
