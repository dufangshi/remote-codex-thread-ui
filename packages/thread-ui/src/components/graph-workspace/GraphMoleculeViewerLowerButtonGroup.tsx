import {
  AlignVerticalDistributeCenter,
  ArrowUpRight,
  Box,
  Boxes,
  Bubbles,
  CircleX,
  Eraser,
  Rotate3d,
  Send,
  Share2,
  Spline,
  Trash2,
  Waypoints,
} from 'lucide-react';

import {
  GraphMoleculeButtonGroup,
  type GraphMoleculeCameraInfo,
  GraphMoleculeIconButton,
} from './GraphMoleculeViewerControls';

export default function GraphMoleculeViewerLowerButtonGroup({
  cameraInfo,
  onClearSelection,
  onClearStaged,
  onSendSelection,
  onSendStaged,
  onStageSelection,
  onToggleUnitCell,
  selectedAtomLabels,
  selectedSerials,
  stagedAtoms,
  stagedMolecules,
  unitCellAvailable,
  unitCellVisible,
}: {
  cameraInfo: GraphMoleculeCameraInfo | null;
  onClearSelection: () => void;
  onClearStaged: () => void;
  onSendSelection: () => void;
  onSendStaged: () => void;
  onStageSelection: () => void;
  onToggleUnitCell: () => void;
  selectedAtomLabels: Record<number, string>;
  selectedSerials: number[];
  stagedAtoms: number;
  stagedMolecules: number;
  unitCellAvailable: boolean;
  unitCellVisible: boolean;
}) {
  const hasSelection = selectedSerials.length > 0;
  const hasStaged = stagedAtoms > 0;

  return (
    <>
      <div className="flex w-full justify-between gap-2 overflow-x-auto">
        <GraphMoleculeButtonGroup>
          <GraphMoleculeIconButton label="Distance">
            <AlignVerticalDistributeCenter className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton label="Connectivity">
            <Share2 className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton label="Angle">
            <Waypoints className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton label="Dihedral">
            <Spline className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton label="Add dummy atoms">
            <Bubbles className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton label="Delete atoms">
            <CircleX className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton label="Rotate">
            <Rotate3d className="size-4" />
          </GraphMoleculeIconButton>
        </GraphMoleculeButtonGroup>

        <GraphMoleculeButtonGroup>
          <GraphMoleculeIconButton
            label={unitCellVisible ? 'Hide unit cell' : 'Show unit cell'}
            disabled={!unitCellAvailable}
            onClick={onToggleUnitCell}
          >
            <Boxes className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Clear selection"
            disabled={!hasSelection}
            onClick={onClearSelection}
          >
            <Trash2 className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Send selection"
            disabled={!hasSelection}
            onClick={onSendSelection}
          >
            <Send className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Stage current selection"
            disabled={!hasSelection}
            onClick={onStageSelection}
          >
            <Box className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Clear staged selections"
            disabled={!hasStaged}
            onClick={onClearStaged}
          >
            <Eraser className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Send staged selections"
            disabled={!hasStaged}
            onClick={onSendStaged}
          >
            <ArrowUpRight className="size-4" />
          </GraphMoleculeIconButton>
        </GraphMoleculeButtonGroup>
      </div>

      {cameraInfo ? (
        <div className="thread-graph-molecule-camera">
          <div>
            <strong>XYZ: </strong>x={cameraInfo.position.x.toFixed(1)} y=
            {cameraInfo.position.y.toFixed(1)} z=
            {cameraInfo.position.z.toFixed(1)}
            <br />
            <strong>Quat: </strong>qx=
            {cameraInfo.position.qx.toFixed(2)} qy=
            {cameraInfo.position.qy.toFixed(2)} qz=
            {cameraInfo.position.qz.toFixed(2)} qw=
            {cameraInfo.position.qw.toFixed(2)}
          </div>
          <div className="thread-graph-molecule-camera-divider" />
          <div className="flex flex-col gap-1 text-[10px]">
            <div>
              Selected atoms:{' '}
              {selectedSerials.length > 0
                ? selectedSerials
                    .map(
                      (serial) =>
                        `${selectedAtomLabels[serial] ?? 'Atom'}(${serial})`,
                    )
                    .join(', ')
                : 'None'}
            </div>
            <div>
              Staged: {stagedMolecules} molecule(s), {stagedAtoms} atom(s)
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
