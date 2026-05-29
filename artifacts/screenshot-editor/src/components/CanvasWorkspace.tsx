import React, { useRef, useEffect, useCallback } from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { motion, AnimatePresence } from 'framer-motion';
import { Pipette, ScanSearch } from 'lucide-react';

// ── Font families (same as Lumina — needed for analyzer scoring) ──────────────
const FONT_FAMILIES_META: { label: string; value: string; group: string; traits: string[] }[] = [
  { label: 'Inter',            value: 'Inter, sans-serif',                  group: 'Sans-serif', traits: ['sans', 'regular'] },
  { label: 'Roboto',           value: 'Roboto, sans-serif',                 group: 'Sans-serif', traits: ['sans', 'regular'] },
  { label: 'Open Sans',        value: '"Open Sans", sans-serif',            group: 'Sans-serif', traits: ['sans', 'regular'] },
  { label: 'Lato',             value: 'Lato, sans-serif',                   group: 'Sans-serif', traits: ['sans', 'light'] },
  { label: 'Montserrat',       value: 'Montserrat, sans-serif',             group: 'Sans-serif', traits: ['sans', 'bold'] },
  { label: 'Poppins',          value: 'Poppins, sans-serif',                group: 'Sans-serif', traits: ['sans', 'rounded', 'bold'] },
  { label: 'Nunito',           value: 'Nunito, sans-serif',                 group: 'Sans-serif', traits: ['sans', 'rounded'] },
  { label: 'Raleway',          value: 'Raleway, sans-serif',                group: 'Sans-serif', traits: ['sans', 'light'] },
  { label: 'Oswald',           value: 'Oswald, sans-serif',                 group: 'Sans-serif', traits: ['sans', 'condensed', 'bold'] },
  { label: 'Georgia',          value: 'Georgia, serif',                     group: 'Serif',      traits: ['serif', 'regular'] },
  { label: 'Playfair Display', value: '"Playfair Display", serif',          group: 'Serif',      traits: ['serif', 'elegant'] },
  { label: 'Merriweather',     value: 'Merriweather, serif',                group: 'Serif',      traits: ['serif', 'bold'] },
  { label: 'Lora',             value: 'Lora, serif',                        group: 'Serif',      traits: ['serif', 'regular'] },
  { label: 'Impact',           value: 'Impact, sans-serif',                 group: 'Display',    traits: ['display', 'condensed', 'bold'] },
  { label: 'Bebas Neue',       value: '"Bebas Neue", sans-serif',           group: 'Display',    traits: ['display', 'condensed', 'bold'] },
  { label: 'Courier New',      value: '"Courier New", monospace',           group: 'Monospace',  traits: ['mono', 'serif', 'regular'] },
  { label: 'Roboto Mono',      value: '"Roboto Mono", monospace',           group: 'Monospace',  traits: ['mono', 'sans', 'regular'] },
  { label: 'Space Mono',       value: '"Space Mono", monospace',            group: 'Monospace',  traits: ['mono', 'bold'] },
  { label: 'Pacifico',         value: 'Pacifico, cursive',                  group: 'Script',     traits: ['script', 'rounded', 'bold'] },
  { label: 'Dancing Script',   value: '"Dancing Script", cursive',          group: 'Script',     traits: ['script', 'light'] },
  { label: 'Lobster',          value: 'Lobster, cursive',                   group: 'Script',     traits: ['script', 'bold'] },
];

// ── Font analyzer (ported from Lumina exactly) ────────────────────────────────
function analyzeFontFromImage(
  off: HTMLCanvasElement,
  canvas: HTMLCanvasElement,
  clickX: number,
  clickY: number,
): Array<{ value: string; label: string; confidence: number }> {
  const scaleX = off.width / canvas.width;
  const scaleY = off.height / canvas.height;
  const cx = Math.round(clickX * scaleX);
  const cy = Math.round(clickY * scaleY);
  const W = 240, H = 90;
  const x0 = Math.max(0, cx - W / 2);
  const y0 = Math.max(0, cy - H / 2);
  const x1 = Math.min(off.width,  x0 + W);
  const y1 = Math.min(off.height, y0 + H);
  const w  = x1 - x0, h = y1 - y0;
  if (w < 10 || h < 10) return [];
  const offCtx = off.getContext('2d')!;
  const raw    = offCtx.getImageData(x0, y0, w, h).data;
  const gray   = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    gray[i] = Math.round(0.299 * raw[i*4] + 0.587 * raw[i*4+1] + 0.114 * raw[i*4+2]);
  }
  const mean  = gray.reduce((a, v) => a + v, 0) / gray.length;
  const isInk = (v: number) => (mean > 128 ? v < mean - 30 : v > mean + 30);
  let inkCount = 0, hRunTotal = 0, hRunCount = 0, vRunTotal = 0, vRunCount = 0, serifEdges = 0;
  const topBand = Math.floor(h * 0.2), botBand = Math.floor(h * 0.8);
  for (let row = 0; row < h; row++) {
    let inRun = false, runLen = 0;
    for (let col = 0; col < w; col++) {
      if (isInk(gray[row * w + col])) {
        inkCount++; if (!inRun) { inRun = true; runLen = 1; } else runLen++;
      } else { if (inRun) { hRunTotal += runLen; hRunCount++; inRun = false; } }
    }
    if (inRun) { hRunTotal += runLen; hRunCount++; }
    if (row < topBand || row > botBand) {
      inRun = false; runLen = 0;
      for (let col = 0; col < w; col++) {
        if (isInk(gray[row * w + col])) {
          if (!inRun) { inRun = true; runLen = 1; } else runLen++;
        } else { if (inRun) { if (runLen >= 2 && runLen <= 8) serifEdges++; inRun = false; } }
      }
    }
  }
  for (let col = 0; col < w; col++) {
    let inRun = false, runLen = 0;
    for (let row = 0; row < h; row++) {
      if (isInk(gray[row * w + col])) {
        if (!inRun) { inRun = true; runLen = 1; } else runLen++;
      } else { if (inRun) { vRunTotal += runLen; vRunCount++; inRun = false; } }
    }
    if (inRun) { vRunTotal += runLen; vRunCount++; }
  }
  const inkRatio    = inkCount / (w * h);
  const avgH        = hRunCount > 0 ? hRunTotal / hRunCount : 1;
  const avgV        = vRunCount > 0 ? vRunTotal / vRunCount : 1;
  const serifScore  = serifEdges / Math.max(1, hRunCount + vRunCount);
  const condensed   = avgH / Math.max(1, avgV);
  const isBold      = inkRatio > 0.22 || avgH > 6;
  const isLight     = inkRatio < 0.10;
  const isSerif     = serifScore > 0.06;
  const isCondensed = condensed < 0.55;
  const isScript    = serifScore < 0.03 && inkRatio > 0.12 && !isCondensed && avgH > 3;
  const isMono      = Math.abs(condensed - 0.5) < 0.12;
  const scored = FONT_FAMILIES_META.map(f => {
    let s = 0;
    if (isSerif  && f.traits.includes('serif'))                                  s += 3;
    if (!isSerif && !f.traits.includes('serif') && !f.traits.includes('mono') && !f.traits.includes('script')) s += 2;
    if (isBold   && (f.traits.includes('bold') || f.traits.includes('display'))) s += 2;
    if (isLight  && f.traits.includes('light'))                                  s += 2;
    if (isCondensed && f.traits.includes('condensed'))                           s += 3;
    if (isScript && f.traits.includes('script'))                                 s += 4;
    if (isMono   && f.traits.includes('mono'))                                   s += 3;
    if (isScript && f.traits.includes('serif'))                                  s -= 2;
    if (!isSerif && f.traits.includes('serif'))                                  s -= 1;
    if (isCondensed && f.traits.includes('rounded'))                             s -= 1;
    return { value: f.value, label: f.label, score: s };
  });
  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, 3);
  const maxS = top3[0]?.score ?? 1;
  return top3.map((f, i) => ({
    value: f.value, label: f.label,
    confidence: Math.round(Math.max(20, maxS > 0 ? (f.score / maxS) * (75 - i * 15) : 35)),
  }));
}

// ── Retouch fill patch (ported from Lumina) ───────────────────────────────────
function applyFillPatch(offCtx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, overrideColor: string | null) {
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
    fillStyle = `rgb(${Math.round(rr/cnt)},${Math.round(gg/cnt)},${Math.round(bb/cnt)})`;
  }
  offCtx.save();
  offCtx.beginPath();
  offCtx.arc(cx, cy, radius, 0, 2 * Math.PI);
  offCtx.clip();
  offCtx.fillStyle = fillStyle;
  offCtx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  offCtx.restore();
}

function buildFilter(adj: EditorContextType['adjustments']) {
  return `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%) blur(${adj.blur}px) sepia(${adj.sepia}%) hue-rotate(${adj.hueRotate}deg) grayscale(${adj.grayscale}%) invert(${adj.invert}%)`;
}

const MAX_UNDO = 20;

export function CanvasWorkspace({ editor }: { editor: EditorContextType }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const offCanvasRef  = useRef<HTMLCanvasElement | null>(null);
  const undoStackRef  = useRef<ImageData[]>([]);
  const isRetouchingRef = useRef(false);

  // Expose refs to editor (for Sidebar + download)
  (editor as any)._canvasRef    = canvasRef;
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
    drawFromOff();
  }, [editor.image]);

  // ── Draw from offscreen canvas ────────────────────────────────────────────
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
    // Text is NOT drawn here — only HTML overlays during editing; baked at download time.
  }, [editor.dimensions, editor.adjustments, editor.transform]);

  useEffect(() => {
    const raf = requestAnimationFrame(drawFromOff);
    return () => cancelAnimationFrame(raf);
  }, [drawFromOff]);

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

  // ── Pixel sampler (shared by retouch, text color, and font analyzer) ──────
  const samplePixel = useCallback((clientX: number, clientY: number) => {
    const off = offCanvasRef.current;
    const canvas = canvasRef.current;
    if (!off || !canvas) return null;
    const rect    = canvas.getBoundingClientRect();
    const scaleX  = canvas.width  / rect.width;
    const scaleY  = canvas.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top)  * scaleY;
    const offCtx  = off.getContext('2d')!;
    const px = offCtx.getImageData(
      Math.round(cx * (off.width  / canvas.width)),
      Math.round(cy * (off.height / canvas.height)),
      1, 1
    ).data;
    return { cx, cy, hex: '#' + [px[0], px[1], px[2]].map(v => v.toString(16).padStart(2, '0')).join('') };
  }, []);

  // ── Retouch brush ────────────────────────────────────────────────────────
  const pushUndo = useCallback(() => {
    const off = offCanvasRef.current;
    if (!off) return;
    const snap = off.getContext('2d')!.getImageData(0, 0, off.width, off.height);
    undoStackRef.current.push(snap);
    if (undoStackRef.current.length > MAX_UNDO) undoStackRef.current.shift();
  }, []);

  const applyBrush = useCallback((clientX: number, clientY: number) => {
    const off = offCanvasRef.current;
    const canvas = canvasRef.current;
    if (!off || !canvas) return;
    const offCtx  = off.getContext('2d')!;
    const rect    = canvas.getBoundingClientRect();
    const scaleX  = canvas.width  / rect.width;
    const scaleY  = canvas.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top)  * scaleY;
    const offScaleX = off.width  / canvas.width;
    const offScaleY = off.height / canvas.height;
    applyFillPatch(offCtx, cx * offScaleX, cy * offScaleY, editor.brushSize * Math.max(offScaleX, offScaleY), editor.fillColor);
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

  // Expose undo to Sidebar
  (editor as any)._handleUndo = useCallback(() => {
    const off = offCanvasRef.current;
    if (!undoStackRef.current.length || !off) return;
    const snap = undoStackRef.current.pop()!;
    off.getContext('2d')!.putImageData(snap, 0, 0);
    drawFromOff();
  }, [drawFromOff]);

  // ── Canvas click handler (all active modes) ───────────────────────────────
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // 1. Retouch eyedropper
    if (editor.eyedropperActive) {
      const s = samplePixel(e.clientX, e.clientY);
      if (s) { editor.setFillColor(s.hex); editor.setEyedropperActive(false); }
      return;
    }
    // 2. Text color eyedropper
    if (editor.textColorEyedropper) {
      const s = samplePixel(e.clientX, e.clientY);
      if (s) { editor.setTextColor(s.hex); }
      editor.setTextColorEyedropper(false);
      return;
    }
    // 3. Font analyzer
    if (editor.fontAnalyzerActive) {
      const off = offCanvasRef.current;
      const canvas = canvasRef.current;
      if (off && canvas) {
        const rect = canvas.getBoundingClientRect();
        const cx   = (e.clientX - rect.left) * (canvas.width  / rect.width);
        const cy   = (e.clientY - rect.top)  * (canvas.height / rect.height);
        const results = analyzeFontFromImage(off, canvas, cx, cy);
        editor.setFontSuggestions(results);
      }
      editor.setFontAnalyzerActive(false);
      return;
    }
    // 4. Text placement
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
  }, [editor, canvasToPixel, samplePixel]);

  // ── Display position for text overlays ───────────────────────────────────
  const getDisplayPos = useCallback((ann: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return { left: 0, top: 0 };
    const rect = canvas.getBoundingClientRect();
    return { left: ann.x * (rect.width / canvas.width), top: ann.y * (rect.height / canvas.height) };
  }, []);

  // ── Text drag (window-level, same as Lumina) ──────────────────────────────
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
    editor.eyedropperActive    || editor.textColorEyedropper || editor.fontAnalyzerActive ? 'crosshair' :
    editor.retouchActive                                                                   ? 'cell'      :
    editor.textTool                                                                        ? 'crosshair' : 'default';

  if (!editor.image) return null;

  return (
    <main ref={containerRef} className="flex-1 bg-black/40 overflow-auto relative flex items-center justify-center p-8">
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

        {/* Text overlays — draggable, same as Lumina */}
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
                fontSize:    `${ann.fontSize * displayScale}px`,
                fontFamily:  ann.fontFamily,
                fontWeight:  ann.bold   ? 'bold'   : 'normal',
                fontStyle:   ann.italic ? 'italic' : 'normal',
                color:       ann.color,
                opacity:     ann.opacity / 100,
                textAlign:   ann.align,
                whiteSpace:  'pre',
                userSelect:  'none',
                cursor:      'move',
                outline:     isSelected ? '2px dashed rgba(99,102,241,0.8)' : 'none',
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
        {editor.textColorEyedropper && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-primary/40 rounded-full px-4 py-2 text-sm text-primary shadow-lg flex items-center gap-2">
            <Pipette className="w-4 h-4" />
            Click on any colour in the image to use it for your text
          </motion.div>
        )}
        {editor.fontAnalyzerActive && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-primary/40 rounded-full px-4 py-2 text-sm text-primary shadow-lg flex items-center gap-2">
            <ScanSearch className="w-4 h-4" />
            Click directly on the text in the image to analyze its style
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
