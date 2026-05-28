import React, { useRef, useEffect, useCallback } from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { motion, AnimatePresence } from 'framer-motion';

function buildFilter(adj: EditorContextType['adjustments']) {
  return `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%) blur(${adj.blur}px) sepia(${adj.sepia}%) hue-rotate(${adj.hueRotate}deg) grayscale(${adj.grayscale}%) invert(${adj.invert}%)`;
}

function applyFillPatch(
  offCtx: CanvasRenderingContext2D,
  cx: number, cy: number,
  radius: number,
  overrideColor: string | null,
) {
  let fillStyle: string;
  if (overrideColor) {
    fillStyle = overrideColor;
  } else {
    const W = offCtx.canvas.width, H = offCtx.canvas.height;
    const steps = Math.max(32, Math.round(2 * Math.PI * radius));
    let rr = 0, gg = 0, bb = 0, cnt = 0;
    for (const mult of [2, 2.5, 3]) {
      const sampleR = radius * mult;
      for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * 2 * Math.PI;
        const sx = Math.round(cx + sampleR * Math.cos(angle));
        const sy = Math.round(cy + sampleR * Math.sin(angle));
        if (sx < 0 || sx >= W || sy < 0 || sy >= H) continue;
        const px = offCtx.getImageData(sx, sy, 1, 1).data;
        rr += px[0]; gg += px[1]; bb += px[2]; cnt++;
      }
    }
    if (cnt === 0) return;
    fillStyle = `rgb(${Math.round(rr / cnt)},${Math.round(gg / cnt)},${Math.round(bb / cnt)})`;
  }
  offCtx.save();
  offCtx.beginPath();
  offCtx.arc(cx, cy, radius, 0, 2 * Math.PI);
  offCtx.clip();
  offCtx.fillStyle = fillStyle;
  offCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  offCtx.restore();
}

const MAX_UNDO = 20;

export function CanvasWorkspace({ editor }: { editor: EditorContextType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const undoStackRef = useRef<ImageData[]>([]);
  const isRetouchingRef = useRef(false);

  // Expose canvas ref for download / text positioning
  (editor as any)._canvasRef = canvasRef;

  // Build offscreen canvas when image changes
  useEffect(() => {
    if (!editor.image) return;
    const off = document.createElement('canvas');
    off.width = editor.image.width;
    off.height = editor.image.height;
    const ctx = off.getContext('2d')!;
    ctx.drawImage(editor.image, 0, 0);
    offCanvasRef.current = off;
    undoStackRef.current = [];
    drawFromOff();
  }, [editor.image]);

  const drawFromOff = useCallback(() => {
    const off = offCanvasRef.current;
    if (!off || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const srcW = editor.dimensions.width || off.width;
    const srcH = editor.dimensions.height || off.height;
    let outW = srcW, outH = srcH;
    if (editor.transform.rotate % 180 !== 0) { outW = srcH; outH = srcW; }

    canvas.width = outW;
    canvas.height = outH;
    ctx.clearRect(0, 0, outW, outH);
    ctx.save();
    ctx.translate(outW / 2, outH / 2);
    ctx.rotate((editor.transform.rotate * Math.PI) / 180);
    ctx.scale(editor.transform.flipH ? -1 : 1, editor.transform.flipV ? -1 : 1);
    ctx.filter = buildFilter(editor.adjustments);
    ctx.drawImage(off, -srcW / 2, -srcH / 2, srcW, srcH);
    ctx.restore();

    // Draw text annotations on top
    editor.annotations.forEach(ann => {
      const displayScale = canvas.getBoundingClientRect().width / canvas.width || 1;
      ctx.save();
      ctx.globalAlpha = ann.opacity / 100;
      ctx.font = `${ann.italic ? 'italic ' : ''}${ann.bold ? 'bold ' : ''}${ann.fontSize}px ${ann.fontFamily}`;
      ctx.fillStyle = ann.color;
      ctx.textAlign = ann.align;
      ctx.textBaseline = 'top';
      ctx.fillText(ann.text, ann.x, ann.y);
      ctx.restore();
    });
  }, [editor.dimensions, editor.adjustments, editor.transform, editor.annotations]);

  useEffect(() => {
    const raf = requestAnimationFrame(drawFromOff);
    return () => cancelAnimationFrame(raf);
  }, [drawFromOff]);

  // Canvas coordinate mapping
  const canvasToPixel = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.round((clientX - rect.left) * (canvas.width / rect.width)),
      y: Math.round((clientY - rect.top) * (canvas.height / rect.height)),
    };
  }, []);

  // Eyedropper — sample pixel from offscreen canvas
  const handleEyedropper = useCallback((clientX: number, clientY: number) => {
    const off = offCanvasRef.current;
    if (!off) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = Math.round((clientX - rect.left) * (off.width / rect.width));
    const py = Math.round((clientY - rect.top) * (off.height / rect.height));
    const offCtx = off.getContext('2d')!;
    const data = offCtx.getImageData(px, py, 1, 1).data;
    const hex = `#${[data[0], data[1], data[2]].map(v => v.toString(16).padStart(2, '0')).join('')}`;
    editor.setFillColor(hex);
    editor.setEyedropperActive(false);
  }, [editor]);

  // Retouch brush
  const handleRetouchMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editor.retouchActive) return;
    const off = offCanvasRef.current;
    if (!off) return;
    isRetouchingRef.current = true;
    // Save undo snapshot
    const offCtx = off.getContext('2d')!;
    if (undoStackRef.current.length >= MAX_UNDO) undoStackRef.current.shift();
    undoStackRef.current.push(offCtx.getImageData(0, 0, off.width, off.height));

    const { x, y } = canvasToPixel(e.clientX, e.clientY);
    const scaleX = off.width / (canvasRef.current?.getBoundingClientRect().width ?? 1);
    const radius = editor.brushSize * scaleX;
    applyFillPatch(offCtx, x, y, radius, editor.fillColor);
    drawFromOff();
  }, [editor, canvasToPixel, drawFromOff]);

  const handleRetouchMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isRetouchingRef.current || !editor.retouchActive) return;
    const off = offCanvasRef.current;
    if (!off) return;
    const offCtx = off.getContext('2d')!;
    const { x, y } = canvasToPixel(e.clientX, e.clientY);
    const scaleX = off.width / (canvasRef.current?.getBoundingClientRect().width ?? 1);
    const radius = editor.brushSize * scaleX;
    applyFillPatch(offCtx, x, y, radius, editor.fillColor);
    drawFromOff();
  }, [editor, canvasToPixel, drawFromOff]);

  const handleRetouchMouseUp = useCallback(() => {
    isRetouchingRef.current = false;
  }, []);

  // Text click placement
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (editor.eyedropperActive) {
      handleEyedropper(e.clientX, e.clientY);
      return;
    }
    if (editor.textTool) {
      const { x, y } = canvasToPixel(e.clientX, e.clientY);
      const id = Math.random().toString(36).slice(2, 10);
      editor.setAnnotations(prev => [...prev, {
        id, text: 'Your text here',
        x, y,
        fontSize: editor.fontSize,
        fontFamily: editor.fontFamily,
        color: editor.textColor,
        bold: editor.bold,
        italic: editor.italic,
        align: editor.textAlign,
        opacity: editor.textOpacity,
      }]);
      editor.setSelectedId(id);
      editor.setTextInput('Your text here');
    }
  }, [editor, canvasToPixel, handleEyedropper]);

  // Undo retouch
  const handleUndo = useCallback(() => {
    const off = offCanvasRef.current;
    if (!off || undoStackRef.current.length === 0) return;
    const offCtx = off.getContext('2d')!;
    const prev = undoStackRef.current.pop()!;
    offCtx.putImageData(prev, 0, 0);
    drawFromOff();
  }, [drawFromOff]);

  // Expose undo and canvas for sidebar + download
  (editor as any)._handleUndo = handleUndo;
  (editor as any)._undoCount = undoStackRef.current.length;
  (editor as any)._canvasRef = canvasRef;
  (editor as any)._drawFromOff = drawFromOff;

  const cursorStyle =
    editor.eyedropperActive ? 'crosshair' :
    editor.retouchActive ? 'cell' :
    editor.textTool ? 'crosshair' : 'default';

  if (!editor.image) return null;

  return (
    <main ref={containerRef} className="flex-1 bg-black/40 overflow-auto relative flex items-center justify-center p-8">
      <div
        id="export-container"
        ref={canvasWrapRef}
        className="relative shadow-2xl ring-1 ring-white/10"
        style={{
          background:
            editor.background.type === 'gradient' ? editor.background.gradient :
            editor.background.type === 'solid' ? editor.background.color : 'transparent',
          padding: `${editor.background.padding}px`,
          borderRadius: editor.background.padding > 0 ? '16px' : '0',
        }}
      >
        <div className={`relative overflow-hidden ${editor.background.browserChrome ? 'rounded-xl shadow-xl border border-white/10' : ''} ${editor.background.roundedCorners && !editor.background.browserChrome ? 'rounded-xl' : ''}`}>
          {editor.background.browserChrome && (
            <div className="h-10 bg-[#1e1e1e] border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain block"
            style={{ maxHeight: '70vh', cursor: cursorStyle }}
            onClick={handleCanvasClick}
            onMouseDown={handleRetouchMouseDown}
            onMouseMove={handleRetouchMouseMove}
            onMouseUp={handleRetouchMouseUp}
            onMouseLeave={handleRetouchMouseUp}
          />

          {/* Text overlays */}
          {editor.annotations.map(ann => {
            const canvas = canvasRef.current;
            if (!canvas) return null;
            const rect = canvas.getBoundingClientRect();
            const displayScale = rect.width / canvas.width;
            const isSelected = ann.id === editor.selectedId;
            return (
              <div
                key={ann.id}
                style={{
                  position: 'absolute',
                  left: ann.x * displayScale,
                  top: ann.y * displayScale,
                  fontSize: `${ann.fontSize * displayScale}px`,
                  fontFamily: ann.fontFamily,
                  fontWeight: ann.bold ? 'bold' : 'normal',
                  fontStyle: ann.italic ? 'italic' : 'normal',
                  color: ann.color,
                  opacity: ann.opacity / 100,
                  textAlign: ann.align,
                  whiteSpace: 'pre',
                  userSelect: 'none',
                  cursor: 'move',
                  outline: isSelected ? '2px dashed rgba(29,179,153,0.8)' : 'none',
                  outlineOffset: '4px',
                  padding: '2px 4px',
                  lineHeight: 1.2,
                }}
                onClick={e => { e.stopPropagation(); editor.setSelectedId(ann.id); }}
              >
                {ann.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint toasts */}
      <AnimatePresence>
        {editor.textTool && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground shadow-lg">
            Click anywhere on the image to place text
          </motion.div>
        )}
        {editor.retouchActive && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-primary/40 rounded-full px-4 py-2 text-sm text-primary shadow-lg">
            Paint over text to remove it — click the button again to exit
          </motion.div>
        )}
        {editor.eyedropperActive && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-primary/40 rounded-full px-4 py-2 text-sm text-primary shadow-lg">
            Click on any colour in the image to use it for painting
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
