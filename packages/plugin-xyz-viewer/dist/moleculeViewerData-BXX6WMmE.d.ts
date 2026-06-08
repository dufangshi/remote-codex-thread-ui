type MoleculeViewerSnapshot = {
    content: string[];
    format?: string | null;
    uuid?: string | null;
    name?: string | null;
};
type MoleculeViewerSource = MoleculeViewerSnapshot | string | null | undefined;
type MoleculeViewerData = {
    format: string;
    frames: string[];
    exportContent: string;
};
declare const supportedMoleculeFormats: readonly ["xyz", "extxyz", "cif", "pdb"];
declare function isMoleculeFileName(fileName: string): boolean;
declare function buildMoleculeViewerSnapshot(input: {
    content: string;
    fileName?: string | null;
    format?: string | null;
    uuid?: string | null;
}): MoleculeViewerSnapshot;
declare function readMoleculeViewerData(source: MoleculeViewerSource): MoleculeViewerData;

export { type MoleculeViewerSource as M, type MoleculeViewerData as a, type MoleculeViewerSnapshot as b, buildMoleculeViewerSnapshot as c, isMoleculeFileName as i, readMoleculeViewerData as r, supportedMoleculeFormats as s };
