import * as react from 'react';

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

interface MoleculeScreenshot {
    moleculeId: string | null;
    image: string;
}
interface MoleculeAtomSelection {
    moleculeId: string | null;
    atoms: number[];
}
interface XyzMoleculeViewerProps {
    source: MoleculeViewerSource;
    moleculeId?: string | null;
    title?: string | null;
    className?: string;
    onScreenshot?: (screenshot: MoleculeScreenshot) => void;
    onSelectionChange?: (selection: MoleculeAtomSelection) => void;
}
declare function XyzMoleculeViewer({ source, moleculeId, title, className, onScreenshot, onSelectionChange, }: XyzMoleculeViewerProps): react.JSX.Element;

export { type MoleculeAtomSelection as M, XyzMoleculeViewer as X, type MoleculeScreenshot as a, type MoleculeViewerData as b, type MoleculeViewerSnapshot as c, type MoleculeViewerSource as d, type XyzMoleculeViewerProps as e, buildMoleculeViewerSnapshot as f, isMoleculeFileName as i, readMoleculeViewerData as r, supportedMoleculeFormats as s };
