import type { ReactNode } from 'react';
import { Button } from '../graph-ui/Button';
import { ButtonGroup } from '../graph-ui/ButtonGroup';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../graph-ui/Tooltip';

export type GraphMoleculeCameraInfo = {
  position: {
    x: number;
    y: number;
    z: number;
    qx: number;
    qy: number;
    qz: number;
    qw: number;
  };
  lookAt: { x: number; y: number; z: number };
  zoom: number;
};

export function moleculeSlug(value: string | null | undefined) {
  const normalized = value
    ?.trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || 'molecule';
}

export function downloadTextFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function GraphMoleculeIconButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="thread-graph-molecule-button size-8"
          disabled={disabled}
          onClick={onClick}
          title={label}
          aria-label={label}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function GraphMoleculeButtonGroup({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ButtonGroup className={`thread-graph-molecule-button-group ${className}`}>
      {children}
    </ButtonGroup>
  );
}
