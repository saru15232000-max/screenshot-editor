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

  // Expose refs to editor (for Sidebar undo + download)
  (editor as any)._canvasRef = canvasRef;
  (editor as any)._offCanvasRef = offCanvasRef;

  // ── Build offscreen canvas when image changes ──────────────────────────────
  useEffect(() => {
    if (!editor.image) return;
    const off = document.createElement('canvas');
    off.width  = editor.image.width;
    off.height = editor.image.height;
    off.getContext('2d')!.drawImage(editor.image, 0, 0);
    offCanvasRef.current = off;
    undoStackRef.current = [];
    (editor as any)._undoCount = 0;
    drawFromOff();
  }, [editor.image]);

  // ── Draw visible canvas from offscreen + adjustments + transform ──────────
  const drawFromOff = useCallback(() => {
    const off = offCanvasRef.current;
    if (!off || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const srcW = editor.dimensions.width  || off.width;
    const srcH = editor.dimensions.height || off.height;
    let outW = srcW, outH = srcH;
    if (editor.transform.rotate % 180 !== 0) { outW = srcH; outH = srcW; }

    canvas.width  = outW;
    canvas.height = outH;
    ctx.clearRect(0, 0, outW, outH);
    ctx.save();
    ctx.translate(outW / 2, outH / 2);
    ctx.rotate((editor.transform.rotate * Math.PI) / 180);
    ctx.scale(editor.transform.flipH ? -1 : 1, editor.transform.flipV ? -1 : 1);
    ctx.filter = buildFilter(editor.adjustments);
    ctx.drawImage(off, -srcW / 2, -srcH / 2, srcW, srcH);
    ctx.restore();
    // NOTE: text is NOT drawn here — only HTML overlays render during editing.
    // Text is baked onto canvas only at download time.
  }, [editor.dimensions, editor.adjustments, editor.transform]);

  useEffect(() => {
    const raf = requestAnimationFrame(drawFromOff);
    return () => cancelAnimationFrame(raf);
  }, [drawFromOff]);

  // Expose drawFromOff (for download in editor-page)
  (editor as any)._drawFromOff = drawFromOff;

  // ── Coordinate mapping ────────────────────────────────────────────────────
  const canvasToPixel = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width  / rect.width),
      y: (clientY - rect.top)  * (canvas.height / rect.height),
    };
  }, []);

  // ── Retouch brush ────────────────────────────────────────────────────────
  const pushUndo = useCallback(() => {
    const off = offCanvasRef.current;
    if (!off) return;
    const snap = off.getContext('2d')!.getImageData(0, 0, off.width, off.height);
    undoStackRef.current.push(snap);
    if (undoStackRef.current.length > MAX_UNDO) undoStackRef.current.shift();
    (editor as any)._undoCount = undoStackRef.current.length;
  }, [editor]);

  const applyBrush = useCallback((clientX: number, clientY: number) => {
    const off = offCanvasRef.current;
    const canvas = canvasRef.current;
    if (!off || !canvas) return;
    const offCtx = off.getContext('2d')!;
    const rect    = canvas.getBoundingClientRect();
    const scaleX  = canvas.width  / rect.width;
    const scaleY  = canvas.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top)  * scaleY;
    const offScaleX = off.width  / canvas.width;
    const offScaleY = off.height / canvas.height;
    const offCx = cx * offScaleX;
    const offCy = cy * offScaleY;
    const offRadius = editor.brushSize * Math.max(offScaleX, offScaleY);
    applyFillPatch(offCtx, offCx, offCy, offRadius, editor.fillColor);
    drawFromOff();
  }, [editor.brushSize, editor.fillColor, drawFromOff]);

  const handleRetouchMouseDown = useCallback((e: React.MouseEvent) => {
    if (!editor.retouchActive) return;
    e.stopPropagation();
    pushUndo();
    isRetouchingRef.current = true;
    applyBrush(e.clientX, e.clientY);
  }, [editor.retouchActive, pushUndo, applyBrush]);

  const handleRetouchMouseMove = useCallback((e: React.MouseEvent) => {
    if (!editor.retouchActive || !isRetouchingRef.current) return;
    applyBrush(e.clientX, e.clientY);
  }, [editor.retouchActive, applyBrush]);

  const handleRetouchMouseUp = useCallback(() => { isRetouchingRef.current = false; }, []);

  // Expose undo handler to Sidebar
  (editor as any)._handleUndo = useCallback(() => {
    const off = offCanvasRef.current;
    if (!undoStackRef.current.length || !off) return;
    const snap = undoStackRef.current.pop()!;
    off.getContext('2d')!.putImageData(snap, 0, 0);
    (editor as any)._undoCount = undoStackRef.current.length;
    drawFromOff();
  }, [drawFromOff]);

  // ── Canvas click (eyedropper / text placement) ───────────────────────────
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (editor.eyedropperActive) {
      const off = offCanvasRef.current;
      const canvas = canvasRef.current;
      if (!off || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) * (canvas.width  / rect.width);
      const cy = (e.clientY - rect.top)  * (canvas.height / rect.height);
      const offCtx = off.getContext('2d')!;
      const px = offCtx.getImageData(
        Math.round(cx * (off.width  / canvas.width)),
        Math.round(cy * (off.height / canvas.height)),
        1, 1
      ).data;
      const hex = '#' + [px[0], px[1], px[2]].map(v => v.toString(16).padStart(2, '0')).join('');
      editor.setFillColor(hex);
      editor.setEyedropperActive(false);
      return;
    }
    if (!editor.textTool) {
      editor.setSelectedId(null);
      return;
    }
    const { x, y } = canvasToPixel(e.clientX, e.clientY);
    const id = Math.random().toString(36).slice(2, 10);
    editor.setAnnotations(prev => [...prev, {
      id, text: editor.textInput || 'Your text here',
      x, y,
      fontSize: editor.fontSize, fontFamily: editor.fontFamily,
      color: editor.textColor, bold: editor.bold, italic: editor.italic,
      align: editor.textAlign, opacity: editor.textOpacity,
    }]);
    editor.setSelectedId(id);
    editor.setTextTool(false);
  }, [editor, canvasToPixel]);

  // ── Display position for text overlays ───────────────────────────────────
  const getDisplayPos = useCallback((ann: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return { left: 0, top: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      left: ann.x * (rect.width  / canvas.width),
      top:  ann.y * (rect.height / canvas.height),
    };
  }, []);

  // ── Text annotation drag (window-level, exactly like Lumina) ────────────
  const handleAnnotationMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    editor.setSelectedId(id);
    const ann = editor.annotations.find(a => a.id === id);
    if (!ann) return;
    editor.startDrag({ id, startX: e.clientX, startY: e.clientY, origX: ann.x, origY: ann.y });
  }, [editor]);

  useEffect(() => {
    if (!editor.dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const onMove = (e: MouseEvent) => {
      editor.setAnnotations(prev => prev.map(a =>
        a.id === editor.dragging!.id
          ? { ...a,
              x: editor.dragging!.origX + (e.clientX - editor.dragging!.startX) * scaleX,
              y: editor.dragging!.origY + (e.clientY - editor.dragging!.startY) * scaleY }
          : a
      ));
    };
    const onUp = () => editor.startDrag(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [editor.dragging]);

  const cursorStyle =
    editor.eyedropperActive ? 'crosshair' :
    editor.retouchActive    ? 'cell'       :
    editor.textTool         ? 'crosshair'  : 'default';

  if (!editor.image) return null;

  return (
    <main ref={containerRef}
      className="flex-1 bg-black/40 overflow-auto relative flex items-center justify-center p-8">

      {/* Canvas wrapper — same structure as Lumina */}
      <div ref={canvasWrapRef} className="relative shadow-2xl ring-1 ring-white/10"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>

        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain block"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%231a1d24\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            cursor: cursorStyle,
            maxHeight: '75vh',
          }}
          onClick={handleCanvasClick}
          onMouseDown={handleRetouchMouseDown}
          onMouseMove={handleRetouchMouseMove}
          onMouseUp={handleRetouchMouseUp}
          onMouseLeave={handleRetouchMouseUp}
        />

        {/* Text overlays — exactly like Lumina */}
        {editor.annotations.map(ann => {
          const pos = getDisplayPos(ann);
          const isSelected = ann.id === editor.selectedId;
          const displayScale = canvasRef.current
            ? canvasRef.current.getBoundingClientRect().width / canvasRef.current.width
            : 1;
          return (
            <div key={ann.id}
              style={{
                position: 'absolute',
                left: pos.left,
                top:  pos.top,
                fontSize:   `${ann.fontSize * displayScale}px`,
                fontFamily: ann.fontFamily,
                fontWeight: ann.bold   ? 'bold'   : 'normal',
                fontStyle:  ann.italic ? 'italic' : 'normal',
                color:       ann.color,
                opacity:     ann.opacity / 100,
                textAlign:   ann.align,
                whiteSpace:  'pre',
                userSelect:  'none',
                cursor:      'move',
                outline:     isSelected ? '2px dashed rgba(29,179,153,0.8)' : 'none',
                outlineOffset: '4px',
                padding:     '2px 4px',
                pointerEvents: editor.retouchActive ? 'none' : 'auto',
                lineHeight:  1.2,
              }}
              onMouseDown={e => handleAnnotationMouseDown(e, ann.id)}>
              {ann.text}
            </div>
          );
        })}
      </div>

      {/* Hint toasts — same as Lumina */}
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
