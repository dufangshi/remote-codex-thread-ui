// src/moleculeViewerData.ts
var supportedMoleculeFormats = ["xyz", "extxyz", "cif", "pdb"];
var supportedMoleculeFormatSet = new Set(supportedMoleculeFormats);
function isMoleculeFileName(fileName) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return supportedMoleculeFormatSet.has(extension);
}
function buildMoleculeViewerSnapshot(input) {
  const format = input.format ?? input.fileName?.split(".").pop()?.toLowerCase() ?? "xyz";
  return {
    content: [input.content],
    format,
    uuid: input.uuid ?? input.fileName ?? null,
    name: input.fileName ?? null
  };
}
function normalizeFormat(format) {
  const normalized = format?.trim().toLowerCase();
  if (!normalized || normalized === "extxyz") {
    return "xyz";
  }
  return normalized;
}
function splitXyzTrajectory(content) {
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const frames = [];
  let cursor = 0;
  while (cursor < lines.length) {
    while (cursor < lines.length && lines[cursor]?.trim() === "") {
      cursor += 1;
    }
    if (cursor >= lines.length) {
      break;
    }
    const atomCount = Number.parseInt(lines[cursor]?.trim() ?? "", 10);
    if (!Number.isFinite(atomCount) || atomCount < 0) {
      return [content];
    }
    const frameLineCount = atomCount + 2;
    if (cursor + frameLineCount > lines.length) {
      return [content];
    }
    frames.push(`${lines.slice(cursor, cursor + frameLineCount).join("\n")}
`);
    cursor += frameLineCount;
  }
  return frames.length > 0 ? frames : [content];
}
function normalizeSnapshotFrames(content, format) {
  if (format !== "xyz") {
    return content;
  }
  return content.flatMap((frame) => splitXyzTrajectory(frame));
}
function joinFramesForExport(content) {
  return content.map((frame) => `${frame.replace(/\s+$/g, "")}
`).join("");
}
function readMoleculeViewerData(source) {
  if (!source) {
    return {
      format: "xyz",
      frames: [],
      exportContent: ""
    };
  }
  if (typeof source === "string") {
    const frames = normalizeSnapshotFrames([source], "xyz");
    return {
      frames,
      format: "xyz",
      exportContent: joinFramesForExport(frames)
    };
  }
  const format = normalizeFormat(source.format);
  const content = source.content.filter((frame) => frame.trim().length > 0);
  return {
    frames: normalizeSnapshotFrames(content, format),
    format,
    exportContent: joinFramesForExport(content)
  };
}

export {
  supportedMoleculeFormats,
  isMoleculeFileName,
  buildMoleculeViewerSnapshot,
  readMoleculeViewerData
};
