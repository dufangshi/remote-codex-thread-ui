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

// src/XyzMoleculeViewer.tsx
import {
  Pause,
  Play,
  RotateCcw,
  Camera,
  Copy,
  Download,
  Box,
  Boxes,
  Trash2,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as $3Dmol from "3dmol";
import { jsx, jsxs } from "react/jsx-runtime";
function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}
function downloadTextFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
function moleculeSlug(value) {
  const normalized = value?.trim().replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || "molecule";
}
function XyzMoleculeViewer({
  source,
  moleculeId = null,
  title = "Molecule Viewer",
  className = "",
  onScreenshot,
  onSelectionChange
}) {
  const viewerHostRef = useRef(null);
  const viewerRef = useRef(null);
  const modelRef = useRef(null);
  const zoomedRef = useRef(false);
  const unitCellPreferenceRef = useRef(true);
  const [viewerInitError, setViewerInitError] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSerials, setSelectedSerials] = useState([]);
  const [atomLabels, setAtomLabels] = useState([]);
  const [hoveredAtom, setHoveredAtom] = useState(null);
  const [cameraInfo, setCameraInfo] = useState(null);
  const [unitCellVisible, setUnitCellVisible] = useState(false);
  const [unitCellAvailable, setUnitCellAvailable] = useState(false);
  const viewerData = useMemo(() => readMoleculeViewerData(source), [source]);
  const frames = viewerData.frames;
  const currentFrame = frames[currentFrameIndex] ?? "";
  const currentSlug = moleculeSlug(moleculeId);
  const isLive = frames.length > 0 && currentFrameIndex === frames.length - 1;
  useEffect(() => {
    if (frames.length === 0) {
      setCurrentFrameIndex(0);
      return;
    }
    setCurrentFrameIndex(frames.length - 1);
  }, [frames.length]);
  useEffect(() => {
    if (!isPlaying || frames.length <= 1) {
      return;
    }
    const interval = window.setInterval(() => {
      setCurrentFrameIndex((previous) => {
        if (previous >= frames.length - 1) {
          window.clearInterval(interval);
          setIsPlaying(false);
          return previous;
        }
        return previous + 1;
      });
    }, 200);
    return () => window.clearInterval(interval);
  }, [frames.length, isPlaying]);
  useEffect(() => {
    const host = viewerHostRef.current;
    if (!host || viewerRef.current) {
      return;
    }
    if (!hasWebGLSupport()) {
      setViewerInitError(
        "WebGL is unavailable in this browser environment. Unable to render the 3D viewer."
      );
      return;
    }
    try {
      const viewer = $3Dmol.createViewer(host, {});
      viewerRef.current = viewer;
      viewer.setBackgroundColor("#fbfbfb", 1);
    } catch (error) {
      console.error("Failed to initialize 3Dmol viewer:", error);
      setViewerInitError("Failed to initialize the 3D molecule viewer.");
      return;
    }
    const resizeViewer = () => {
      viewerRef.current?.resize();
      viewerRef.current?.render();
    };
    window.addEventListener("resize", resizeViewer);
    window.setTimeout(resizeViewer, 100);
    return () => {
      window.removeEventListener("resize", resizeViewer);
      viewerRef.current = null;
      modelRef.current = null;
    };
  }, []);
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !currentFrame) {
      return;
    }
    try {
      viewer.removeAllModels();
      viewer.removeAllShapes();
      viewer.removeAllLabels();
      const model = viewer.addModel(currentFrame, viewerData.format);
      modelRef.current = model;
      model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
      const crystalData = model.getCrystData();
      const hasUnitCell = Boolean(
        crystalData && typeof crystalData === "object" && Object.keys(crystalData).length > 0
      );
      setUnitCellAvailable(hasUnitCell);
      setUnitCellVisible(hasUnitCell ? unitCellPreferenceRef.current : false);
      const labels = currentFrame.split("\n").slice(2).map((line) => line.trim()).filter(Boolean).map((line) => line.split(/\s+/)[0] ?? "Atom");
      setAtomLabels(labels);
      setSelectedSerials([]);
      if (!zoomedRef.current) {
        viewer.zoomTo();
        zoomedRef.current = true;
      }
      model.setClickable({}, true, (atom, _viewer, event) => {
        const serial = atom.serial ?? atom.index;
        if (serial === void 0) {
          return;
        }
        setSelectedSerials((previous) => {
          const isMulti = Boolean(event?.shiftKey || event?.metaKey || event?.ctrlKey);
          if (!isMulti) {
            return previous.length === 1 && previous[0] === serial ? [] : [serial];
          }
          return previous.includes(serial) ? previous.filter((entry) => entry !== serial) : [...previous, serial];
        });
      });
      model.setHoverable(
        {},
        true,
        (atom, _viewer, event) => {
          if (!event) {
            return;
          }
          setHoveredAtom({
            x: event.clientX,
            y: event.clientY,
            label: `${atom.atom || atom.elem || "Atom"} (${atom.serial ?? atom.index ?? "?"})`,
            coords: {
              x: atom.x.toFixed(2),
              y: atom.y.toFixed(2),
              z: atom.z.toFixed(2)
            }
          });
        },
        () => setHoveredAtom(null)
      );
      viewer.render();
    } catch (error) {
      console.error("Failed to render molecule:", error);
      setViewerInitError("Unable to render this molecular structure.");
    }
  }, [currentFrame, viewerData.format]);
  useEffect(() => {
    const viewer = viewerRef.current;
    const model = modelRef.current;
    if (!viewer || !model) {
      return;
    }
    try {
      viewer.removeUnitCell(model);
    } catch {
    }
    if (unitCellVisible && unitCellAvailable) {
      try {
        viewer.addUnitCell(model, {
          box: {
            color: "black",
            opacity: 1,
            linewidth: 5
          },
          astyle: { radius: 0.12, mid: 0.85, color: "red", opacity: 0.6 },
          bstyle: { radius: 0.12, mid: 0.85, color: "green", opacity: 0.6 },
          cstyle: { radius: 0.12, mid: 0.85, color: "blue", opacity: 0.6 },
          alabel: "a",
          blabel: "b",
          clabel: "c"
        });
      } catch {
        setUnitCellAvailable(false);
        setUnitCellVisible(false);
      }
    }
    viewer.render();
  }, [unitCellAvailable, unitCellVisible, currentFrame]);
  useEffect(() => {
    const viewer = viewerRef.current;
    const model = modelRef.current;
    if (!viewer || !model || !currentFrame) {
      return;
    }
    model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
    if (selectedSerials.length > 0) {
      model.setStyle(
        { serial: selectedSerials },
        {
          stick: { radius: 0.3, color: "yellow" },
          sphere: { scale: 0.4, color: "yellow" }
        }
      );
    }
    viewer.render();
    onSelectionChange?.({ moleculeId, atoms: selectedSerials });
  }, [currentFrame, moleculeId, onSelectionChange, selectedSerials]);
  useEffect(() => {
    if (!currentFrame) {
      return;
    }
    let animationFrame = 0;
    const tick = () => {
      const view = viewerRef.current?.getView?.();
      if (Array.isArray(view) && view.length >= 8) {
        const [x, y, z, zoom, qx, qy, qz, qw] = view;
        if (typeof x === "number" && typeof y === "number" && typeof z === "number" && typeof zoom === "number" && typeof qx === "number" && typeof qy === "number" && typeof qz === "number" && typeof qw === "number") {
          setCameraInfo({ x, y, z, zoom, qx, qy, qz, qw });
        }
      }
      animationFrame = window.requestAnimationFrame(tick);
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [currentFrame]);
  const copyCurrentFrame = useCallback(async () => {
    if (!currentFrame) {
      return;
    }
    await navigator.clipboard.writeText(currentFrame);
  }, [currentFrame]);
  const captureScreenshot = useCallback(async () => {
    const viewer = viewerRef.current;
    if (!viewer?.pngURI) {
      return;
    }
    viewer.render();
    const image = viewer.pngURI();
    if (!image) {
      return;
    }
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const clipboardItemInput = {
        [blob.type || "image/png"]: blob
      };
      const clipboardItem = new ClipboardItem(clipboardItemInput);
      await navigator.clipboard.write([clipboardItem]);
    } catch {
    }
    onScreenshot?.({ moleculeId, image });
  }, [moleculeId, onScreenshot]);
  const resetCamera = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) {
      return;
    }
    viewer.zoomTo();
    viewer.setCameraParameters({});
    viewer.render();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `xyz-viewer-plugin ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { className: "xyz-viewer-plugin__header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: title }),
        /* @__PURE__ */ jsxs("p", { children: [
          viewerData.format.toUpperCase(),
          " structure preview"
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { children: frames.length > 1 ? `${frames.length} frames` : "single frame" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "xyz-viewer-plugin__toolbar", "aria-label": "Molecule controls", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: copyCurrentFrame, disabled: !currentFrame, title: "Copy current frame", children: /* @__PURE__ */ jsx(Copy, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => downloadTextFile(
            currentFrame,
            `${currentSlug}_frame_${currentFrameIndex + 1}.${viewerData.format}`
          ),
          disabled: !currentFrame,
          title: "Download current frame",
          children: /* @__PURE__ */ jsx(Download, { "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => downloadTextFile(
            viewerData.exportContent,
            `${currentSlug}_trajectory.${viewerData.format}`
          ),
          disabled: !viewerData.exportContent,
          title: "Download all frames",
          children: /* @__PURE__ */ jsx(Box, { "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: captureScreenshot, disabled: !currentFrame, title: "Capture screenshot", children: /* @__PURE__ */ jsx(Camera, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx("span", { className: "xyz-viewer-plugin__toolbar-divider", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => viewerRef.current?.zoom(1.2), disabled: !currentFrame, title: "Zoom in", children: /* @__PURE__ */ jsx(ZoomIn, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => viewerRef.current?.zoom(0.8), disabled: !currentFrame, title: "Zoom out", children: /* @__PURE__ */ jsx(ZoomOut, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: resetCamera, disabled: !currentFrame, title: "Reset camera", children: /* @__PURE__ */ jsx(RotateCcw, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setUnitCellVisible((previous) => {
            const next = !previous;
            unitCellPreferenceRef.current = next;
            return next;
          }),
          disabled: !unitCellAvailable,
          title: unitCellVisible ? "Hide unit cell" : "Show unit cell",
          children: /* @__PURE__ */ jsx(Boxes, { "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedSerials([]),
          disabled: selectedSerials.length === 0,
          title: "Clear selection",
          children: /* @__PURE__ */ jsx(Trash2, { "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "xyz-viewer-plugin__stage", children: [
      /* @__PURE__ */ jsx("div", { ref: viewerHostRef, className: "xyz-viewer-plugin__canvas" }),
      viewerInitError && /* @__PURE__ */ jsx("div", { className: "xyz-viewer-plugin__error", children: viewerInitError }),
      !viewerInitError && !currentFrame && /* @__PURE__ */ jsx("div", { className: "xyz-viewer-plugin__empty", children: "No molecule data available." }),
      hoveredAtom && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "xyz-viewer-plugin__tooltip",
          style: {
            left: hoveredAtom.x - 20,
            top: hoveredAtom.y - 50
          },
          children: [
            /* @__PURE__ */ jsx("strong", { children: hoveredAtom.label }),
            /* @__PURE__ */ jsxs("span", { children: [
              "x: ",
              hoveredAtom.coords.x,
              " y: ",
              hoveredAtom.coords.y,
              " z:",
              " ",
              hoveredAtom.coords.z
            ] })
          ]
        }
      )
    ] }),
    frames.length > 1 && /* @__PURE__ */ jsxs("div", { className: "xyz-viewer-plugin__timeline", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setIsPlaying((previous) => {
              const next = !previous;
              if (next && currentFrameIndex === frames.length - 1) {
                setCurrentFrameIndex(0);
              }
              return next;
            });
          },
          title: isPlaying ? "Pause trajectory" : "Play trajectory",
          children: isPlaying && currentFrameIndex !== frames.length - 1 ? /* @__PURE__ */ jsx(Pause, { "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Play, { "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: frames.length - 1,
          step: 1,
          value: currentFrameIndex,
          onChange: (event) => setCurrentFrameIndex(Number(event.currentTarget.value)),
          "aria-label": "Trajectory frame"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: isLive ? "is-live" : "",
          onClick: () => setCurrentFrameIndex(frames.length - 1),
          children: "Live"
        }
      ),
      /* @__PURE__ */ jsxs("span", { children: [
        currentFrameIndex + 1,
        " / ",
        frames.length
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "xyz-viewer-plugin__status", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Selected atoms:",
        " ",
        selectedSerials.length > 0 ? selectedSerials.map((serial) => `${atomLabels[serial] ?? "Atom"}(${serial})`).join(", ") : "None"
      ] }),
      cameraInfo && /* @__PURE__ */ jsxs("span", { children: [
        "Camera x=",
        cameraInfo.x.toFixed(1),
        " y=",
        cameraInfo.y.toFixed(1),
        " z=",
        cameraInfo.z.toFixed(1)
      ] })
    ] })
  ] });
}

export {
  supportedMoleculeFormats,
  isMoleculeFileName,
  buildMoleculeViewerSnapshot,
  readMoleculeViewerData,
  XyzMoleculeViewer
};
