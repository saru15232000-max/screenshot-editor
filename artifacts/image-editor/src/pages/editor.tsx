import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Download, UploadCloud, RotateCcw, RotateCw, FlipHorizontal, FlipVertical,
  Image as ImageIcon, Check, Layers, RefreshCw, Trash2, Plus,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, Eraser, Undo2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ────────────────────────────────────────────────────────────────────

interface Adjustments {
  brightness: number; contrast: number; saturation: number;
  blur: number; sepia: number; hueRotate: number; grayscale: number; invert: number;
}
const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100, contrast: 100, saturation: 100,
  blur: 0, sepia: 0, hueRotate: 0, grayscale: 0, invert: 0,
};

interface Transform { flipH: boolean; flipV: boolean; rotate: number; }
const DEFAULT_TRANSFORM: Transform = { flipH: false, flipV: false, rotate: 0 };

interface TextAnnotation {
  id: string; text: string; x: number; y: number;
  fontSize: number; fontFamily: string; color: string;
  bold: boolean; italic: boolean; align: 'left' | 'center' | 'right'; opacity: number;
}

const PRESETS = [
  { name: 'Original', filter: DEFAULT_ADJUSTMENTS },
  { name: 'Vivid',    filter: { ...DEFAULT_ADJUSTMENTS, contrast: 110, saturation: 130 } },
  { name: 'Fade',     filter: { ...DEFAULT_ADJUSTMENTS, contrast: 90,  brightness: 110 } },
  { name: 'Chrome',   filter: { ...DEFAULT_ADJUSTMENTS, contrast: 120, saturation: 110 } },
  { name: 'Matte',    filter: { ...DEFAULT_ADJUSTMENTS, contrast: 85,  brightness: 105, sepia: 10 } },
  { name: 'Noir',     filter: { ...DEFAULT_ADJUSTMENTS, grayscale: 100, contrast: 120 } },
  { name: 'Vintage',  filter: { ...DEFAULT_ADJUSTMENTS, sepia: 50,  contrast: 90 } },
  { name: 'Cool',     filter: { ...DEFAULT_ADJUSTMENTS, hueRotate: -15, saturation: 110 } },
  { name: 'Warm',     filter: { ...DEFAULT_ADJUSTMENTS, sepia: 20, hueRotate: 10, saturation: 110 } },
  { name: 'Dramatic', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 140, brightness: 90, saturation: 120 } },
];

const FONT_FAMILIES = [
  { label: 'Sans Serif', value: 'Inter, Arial, sans-serif' },
  { label: 'Serif',      value: 'Georgia, "Times New Roman", serif' },
  { label: 'Monospace',  value: '"Courier New", Courier, monospace' },
  { label: 'Impact',     value: 'Impact, Haettenschweiler, sans-serif' },
  { label: 'Cursive',    value: 'Georgia, cursive' },
];

const PRESET_COLORS = [
  '#ffffff','#000000','#f87171','#fb923c','#facc15',
  '#4ade80','#60a5fa','#a78bfa','#f472b6','#e2e8f0',
];

function genId() { return Math.random().toString(36).slice(2, 10); }

// ── Retouch helpers (pure canvas pixel ops) ──────────────────────────────────

function boxBlurPass(src: Uint8ClampedArray, dst: Uint8ClampedArray, w: number, h: number, r: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let rr = 0, gg = 0, bb = 0, aa = 0, cnt = 0;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
          const i = (ny * w + nx) * 4;
          rr += src[i]; gg += src[i+1]; bb += src[i+2]; aa += src[i+3];
          cnt++;
        }
      }
      const o = (y * w + x) * 4;
      dst[o]   = rr / cnt;
      dst[o+1] = gg / cnt;
      dst[o+2] = bb / cnt;
      dst[o+3] = aa / cnt;
    }
  }
}

function applyHealPatch(
  offCtx: CanvasRenderingContext2D,
  cx: number, cy: number,
  radius: number,
  passes: number,
) {
  const x0 = Math.max(0, Math.floor(cx - radius));
  const y0 = Math.max(0, Math.floor(cy - radius));
  const x1 = Math.min(offCtx.canvas.width,  Math.ceil(cx + radius));
  const y1 = Math.min(offCtx.canvas.height, Math.ceil(cy + radius));
  const w = x1 - x0, h = y1 - y0;
  if (w <= 0 || h <= 0) return;

  const imageData = offCtx.getImageData(x0, y0, w, h);
  let src = new Uint8ClampedArray(imageData.data);
  let dst = new Uint8ClampedArray(imageData.data.length);

  for (let p = 0; p < passes; p++) {
    boxBlurPass(src, dst, w, h, Math.min(radius, 8));
    // Only blend inside the circle
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const px = x0 + x - cx, py = y0 + y - cy;
        const dist = Math.sqrt(px * px + py * py);
        const t = Math.max(0, Math.min(1, 1 - dist / radius));
        const i = (y * w + x) * 4;
        dst[i]   = src[i]   * (1 - t) + dst[i]   * t;
        dst[i+1] = src[i+1] * (1 - t) + dst[i+1] * t;
        dst[i+2] = src[i+2] * (1 - t) + dst[i+2] * t;
        dst[i+3] = src[i+3];
      }
    }
    [src, dst] = [dst, src];
  }

  imageData.data.set(src);
  offCtx.putImageData(imageData, x0, y0);
}

// ── Component ────────────────────────────────────────────────────────────────

const MAX_UNDO = 20;

export default function Editor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc]   = useState<string | null>(null);
  const [dimensions, setDimensions]             = useState({ width: 0, height: 0 });
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });

  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [transform, setTransform]     = useState<Transform>(DEFAULT_TRANSFORM);

  // Text
  const [annotations, setAnnotations] = useState<TextAnnotation[]>([]);
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [textTool, setTextTool]       = useState(false);
  const [dragging, setDragging]       = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [textInput, setTextInput]     = useState('Your text here');
  const [fontSize, setFontSize]       = useState(48);
  const [fontFamily, setFontFamily]   = useState(FONT_FAMILIES[0].value);
  const [textColor, setTextColor]     = useState('#ffffff');
  const [bold, setBold]               = useState(false);
  const [italic, setItalic]           = useState(false);
  const [textAlign, setTextAlign]     = useState<'left' | 'center' | 'right'>('left');
  const [textOpacity, setTextOpacity] = useState(100);

  // Retouch
  const [retouchActive, setRetouchActive] = useState(false);
  const [brushSize, setBrushSize]         = useState(40);
  const [brushStrength, setBrushStrength] = useState(5);   // blur passes
  const [isRetouching, setIsRetouching]   = useState(false);
  const [undoCount, setUndoCount]         = useState(0);    // triggers UI refresh

  // Offscreen canvas holds pixel-edited image (retouch strokes baked in)
  const offCanvasRef  = useRef<HTMLCanvasElement | null>(null);
  const undoStackRef  = useRef<ImageData[]>([]);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const fileInputRef  = useRef<HTMLInputElement>(null);

  const [downloadFormat, setDownloadFormat] = useState('image/jpeg');
  const [downloadQuality, setDownloadQuality] = useState(0.9);
  const [resizeWidth, setResizeWidth]   = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [aspectLock, setAspectLock]     = useState(true);

  // ── Load image into offscreen canvas ──────────────────────────────────────
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    const img = new Image();
    img.onload = () => {
      setImageSrc(url);
      setNaturalDimensions({ width: img.width, height: img.height });
      setDimensions({ width: img.width, height: img.height });
      setResizeWidth(img.width.toString());
      setResizeHeight(img.height.toString());
      setAnnotations([]);
      setSelectedId(null);
      undoStackRef.current = [];
      setUndoCount(0);

      // Initialise offscreen canvas
      const off = document.createElement('canvas');
      off.width  = img.width;
      off.height = img.height;
      const offCtx = off.getContext('2d')!;
      offCtx.drawImage(img, 0, 0);
      offCanvasRef.current = off;
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // ── Draw visible canvas from offscreen canvas + adjustments ───────────────
  const buildFilterString = useCallback((adj: Adjustments) =>
    `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%) blur(${adj.blur}px) sepia(${adj.sepia}%) hue-rotate(${adj.hueRotate}deg) grayscale(${adj.grayscale}%) invert(${adj.invert}%)`,
  []);

  const drawFromOff = useCallback(() => {
    const off = offCanvasRef.current;
    if (!off || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const srcW = dimensions.width  || off.width;
    const srcH = dimensions.height || off.height;
    let outWidth = srcW, outHeight = srcH;
    if (transform.rotate % 180 !== 0) { outWidth = srcH; outHeight = srcW; }

    canvas.width  = outWidth;
    canvas.height = outHeight;
    ctx.clearRect(0, 0, outWidth, outHeight);
    ctx.save();
    ctx.translate(outWidth / 2, outHeight / 2);
    ctx.rotate((transform.rotate * Math.PI) / 180);
    ctx.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1);
    ctx.filter = buildFilterString(adjustments);
    ctx.drawImage(off, -srcW / 2, -srcH / 2, srcW, srcH);
    ctx.restore();
  }, [dimensions, adjustments, transform, buildFilterString]);

  useEffect(() => {
    const raf = requestAnimationFrame(drawFromOff);
    return () => cancelAnimationFrame(raf);
  }, [drawFromOff]);

  // ── File handling ─────────────────────────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setImageFile(e.dataTransfer.files[0]);
  };

  // ── Canvas ↔ pixel coord mapping ─────────────────────────────────────────
  const canvasToPixel = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top)  * (canvas.height / rect.height),
    };
  }, []);

  // ── Retouch mouse handlers ────────────────────────────────────────────────
  const pushUndo = () => {
    const off = offCanvasRef.current;
    if (!off) return;
    const ctx = off.getContext('2d')!;
    const snap = ctx.getImageData(0, 0, off.width, off.height);
    const stack = undoStackRef.current;
    stack.push(snap);
    if (stack.length > MAX_UNDO) stack.shift();
    setUndoCount(stack.length);
  };

  const applyBrush = useCallback((clientX: number, clientY: number) => {
    const off = offCanvasRef.current;
    if (!off) return;
    const offCtx = off.getContext('2d');
    if (!offCtx) return;

    // Map display coords → offscreen canvas coords
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top)  * scaleY;

    // Scale brush radius to offscreen canvas space (which might differ from display canvas if rotated/resized)
    const offScaleX = off.width  / canvas.width;
    const offScaleY = off.height / canvas.height;
    const offCx = cx * offScaleX;
    const offCy = cy * offScaleY;
    const offRadius = brushSize * Math.max(offScaleX, offScaleY);

    applyHealPatch(offCtx, offCx, offCy, offRadius, brushStrength);
    drawFromOff();
  }, [brushSize, brushStrength, drawFromOff]);

  const handleRetouchMouseDown = (e: React.MouseEvent) => {
    if (!retouchActive) return;
    e.stopPropagation();
    pushUndo();
    setIsRetouching(true);
    applyBrush(e.clientX, e.clientY);
  };

  const handleRetouchMouseMove = (e: React.MouseEvent) => {
    if (!retouchActive || !isRetouching) return;
    applyBrush(e.clientX, e.clientY);
  };

  const handleRetouchMouseUp = () => setIsRetouching(false);

  const handleUndo = () => {
    const stack = undoStackRef.current;
    const off   = offCanvasRef.current;
    if (!stack.length || !off) return;
    const snap = stack.pop()!;
    const ctx  = off.getContext('2d')!;
    ctx.putImageData(snap, 0, 0);
    setUndoCount(stack.length);
    drawFromOff();
  };

  // ── Text helpers ──────────────────────────────────────────────────────────
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!textTool) return;
    const { x, y } = canvasToPixel(e.clientX, e.clientY);
    const id = genId();
    setAnnotations(prev => [...prev, {
      id, text: textInput || 'Text', x, y,
      fontSize, fontFamily, color: textColor,
      bold, italic, align: textAlign, opacity: textOpacity,
    }]);
    setSelectedId(id);
    setTextTool(false);
  };

  const handleAnnotationMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    const ann = annotations.find(a => a.id === id);
    if (!ann) return;
    setDragging({ id, startX: e.clientX, startY: e.clientY, origX: ann.x, origY: ann.y });
  };

  useEffect(() => {
    if (!dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const onMove = (e: MouseEvent) => {
      setAnnotations(prev => prev.map(a =>
        a.id === dragging.id
          ? { ...a, x: dragging.origX + (e.clientX - dragging.startX) * scaleX,
                    y: dragging.origY + (e.clientY - dragging.startY) * scaleY }
          : a
      ));
    };
    const onUp = () => setDragging(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  // Sync form ↔ selected annotation
  useEffect(() => {
    if (!selectedId) return;
    const ann = annotations.find(a => a.id === selectedId);
    if (ann) {
      setTextInput(ann.text); setFontSize(ann.fontSize); setFontFamily(ann.fontFamily);
      setTextColor(ann.color); setBold(ann.bold); setItalic(ann.italic);
      setTextAlign(ann.align); setTextOpacity(ann.opacity);
    }
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    setAnnotations(prev => prev.map(a =>
      a.id === selectedId
        ? { ...a, text: textInput, fontSize, fontFamily, color: textColor, bold, italic, align: textAlign, opacity: textOpacity }
        : a
    ));
  }, [textInput, fontSize, fontFamily, textColor, bold, italic, textAlign, textOpacity]);

  const addNewTextLayer = () => {
    const canvas = canvasRef.current;
    const id = genId();
    const cx = canvas ? canvas.width / 2 : 200;
    const cy = canvas ? canvas.height / 2 : 200;
    const newAnn: TextAnnotation = { id, text: 'Your text here', x: cx, y: cy, fontSize, fontFamily, color: textColor, bold, italic, align: textAlign, opacity: textOpacity };
    setAnnotations(prev => [...prev, newAnn]);
    setSelectedId(id);
    setTextInput('Your text here');
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // ── Download ──────────────────────────────────────────────────────────────
  const handleDownload = () => {
    if (!canvasRef.current || !imageFile) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    annotations.forEach(ann => {
      ctx.save();
      ctx.globalAlpha = ann.opacity / 100;
      ctx.font = `${ann.italic ? 'italic ' : ''}${ann.bold ? 'bold ' : ''}${ann.fontSize}px ${ann.fontFamily}`;
      ctx.fillStyle = ann.color;
      ctx.textAlign = ann.align;
      ctx.textBaseline = 'top';
      ctx.fillText(ann.text, ann.x, ann.y);
      ctx.restore();
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = downloadFormat.split('/')[1] === 'jpeg' ? 'jpg' : downloadFormat.split('/')[1];
      const baseName = imageFile.name.split('.').slice(0, -1).join('.');
      a.download = `${baseName}-edited.${ext}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      drawFromOff();
    }, downloadFormat, downloadQuality);
  };

  // ── Resize ────────────────────────────────────────────────────────────────
  const updateResize = (w: string, h: string, fromWidth: boolean) => {
    const numW = parseInt(w) || 0, numH = parseInt(h) || 0;
    if (aspectLock) {
      const ratio = naturalDimensions.width / naturalDimensions.height;
      if (fromWidth) {
        const newH = Math.round(numW / ratio);
        setResizeWidth(w); setResizeHeight(newH.toString());
        if (numW > 0) setDimensions({ width: numW, height: newH });
      } else {
        const newW = Math.round(numH * ratio);
        setResizeHeight(h); setResizeWidth(newW.toString());
        if (numH > 0) setDimensions({ width: newW, height: numH });
      }
    } else {
      setResizeWidth(w); setResizeHeight(h);
      if (numW > 0 && numH > 0) setDimensions({ width: numW, height: numH });
    }
  };

  const applyPresetFormat = (format: string) => {
    let w = 0, h = 0;
    switch (format) {
      case 'ig-post':  w = 1080; h = 1080; break;
      case 'ig-story': w = 1080; h = 1920; break;
      case 'tw-post':  w = 1200; h = 628;  break;
      case 'hd':       w = 1920; h = 1080; break;
      default: return;
    }
    setAspectLock(false); setResizeWidth(w.toString()); setResizeHeight(h.toString());
    setDimensions({ width: w, height: h });
  };

  const getDisplayPos = (ann: TextAnnotation) => {
    const canvas = canvasRef.current;
    if (!canvas) return { left: 0, top: 0 };
    const rect = canvas.getBoundingClientRect();
    return { left: ann.x * (rect.width / canvas.width), top: ann.y * (rect.height / canvas.height) };
  };

  // ── Cursor for retouch mode ───────────────────────────────────────────────
  const canvasCursor = retouchActive ? 'crosshair' : textTool ? 'crosshair' : 'default';

  // ── Landing screen ────────────────────────────────────────────────────────
  if (!imageFile) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-6"
        onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 text-primary mb-12">
            <ImageIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Lumina</h1>
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-12 hover:border-primary hover:bg-card transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-medium mb-2">Drop your image here</h3>
            <p className="text-muted-foreground mb-6">or click to browse</p>
            <div className="flex justify-center gap-2 text-xs font-medium text-muted-foreground">
              {['JPG','PNG','WEBP','GIF'].map(f => <span key={f} className="bg-background px-2 py-1 rounded">{f}</span>)}
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif" />
        </div>
      </div>
    );
  }

  // ── Editor ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden"
      onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>

      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-xl">
          <ImageIcon className="w-6 h-6" /> Lumina
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden md:flex items-center gap-2">
            <span>{imageFile.name}</span><span>•</span>
            <span>{dimensions.width} &times; {dimensions.height}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setImageFile(null)} data-testid="button-new-image">
            New Image
          </Button>
          <div className="flex items-center gap-2 bg-background rounded-md border border-border p-1">
            <Select value={downloadFormat} onValueChange={setDownloadFormat}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none w-24 text-xs font-medium focus:ring-0" data-testid="select-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image/jpeg">JPG</SelectItem>
                <SelectItem value="image/png">PNG</SelectItem>
                <SelectItem value="image/webp">WEBP</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-4 bg-border mx-1" />
            <Button size="sm" onClick={handleDownload} className="h-8 font-semibold" data-testid="button-download">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Canvas Area */}
        <main ref={containerRef}
          className="flex-1 bg-black/40 overflow-auto relative flex items-center justify-center p-8">
          <div ref={canvasWrapRef} className="relative shadow-2xl ring-1 ring-white/10"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>

            <canvas ref={canvasRef}
              className="max-w-full max-h-full object-contain block"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%231a1d24\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                cursor: canvasCursor,
              }}
              onClick={handleCanvasClick}
              onMouseDown={handleRetouchMouseDown}
              onMouseMove={handleRetouchMouseMove}
              onMouseUp={handleRetouchMouseUp}
              onMouseLeave={handleRetouchMouseUp}
              data-testid="canvas-preview"
            />

            {/* Text overlays */}
            {annotations.map(ann => {
              const pos = getDisplayPos(ann);
              const isSelected = ann.id === selectedId;
              const displayScale = canvasRef.current
                ? canvasRef.current.getBoundingClientRect().width / canvasRef.current.width
                : 1;
              return (
                <div key={ann.id} data-testid={`text-annotation-${ann.id}`}
                  style={{
                    position: 'absolute', left: pos.left, top: pos.top,
                    fontSize: `${ann.fontSize * displayScale}px`,
                    fontFamily: ann.fontFamily,
                    fontWeight: ann.bold ? 'bold' : 'normal',
                    fontStyle: ann.italic ? 'italic' : 'normal',
                    color: ann.color, opacity: ann.opacity / 100,
                    textAlign: ann.align, whiteSpace: 'pre',
                    userSelect: 'none', cursor: 'move',
                    outline: isSelected ? '2px dashed rgba(99,102,241,0.8)' : 'none',
                    outlineOffset: '4px', padding: '2px 4px',
                    pointerEvents: retouchActive ? 'none' : 'auto',
                    lineHeight: 1.2,
                  }}
                  onMouseDown={(e) => handleAnnotationMouseDown(e, ann.id)}>
                  {ann.text}
                </div>
              );
            })}
          </div>

          {/* Hint toasts */}
          <AnimatePresence>
            {textTool && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground shadow-lg">
                Click anywhere on the image to place text
              </motion.div>
            )}
            {retouchActive && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-primary/40 rounded-full px-4 py-2 text-sm text-primary shadow-lg">
                Paint over text to remove it — click Retouch again to exit
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Sidebar */}
        <aside className="w-80 border-l border-border bg-card flex flex-col shrink-0 z-10 shadow-2xl">
          <Tabs defaultValue="adjust" className="flex-1 flex flex-col">
            <TabsList className="w-full h-12 p-0 bg-transparent border-b border-border rounded-none shrink-0 flex">
              {[
                { value: 'adjust',   label: 'Adjust'   },
                { value: 'filters',  label: 'Filters'  },
                { value: 'text',     label: 'Text'     },
                { value: 'retouch',  label: 'Retouch'  },
                { value: 'layout',   label: 'Layout'   },
              ].map(t => (
                <TabsTrigger key={t.value} value={t.value}
                  className="flex-1 rounded-none h-full text-[11px] data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                  data-testid={`tab-${t.value}`}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto p-5">

              {/* ── Adjust ── */}
              <TabsContent value="adjust" className="space-y-6 mt-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic</h3>
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setAdjustments(DEFAULT_ADJUSTMENTS)} data-testid="button-reset-adjustments">
                    <RefreshCw className="w-3 h-3 mr-1" /> Reset
                  </Button>
                </div>
                <div className="space-y-4">
                  {([
                    { label: 'Brightness', key: 'brightness', min: 0,   max: 200, unit: '%' },
                    { label: 'Contrast',   key: 'contrast',   min: 0,   max: 200, unit: '%' },
                    { label: 'Saturation', key: 'saturation', min: 0,   max: 200, unit: '%' },
                  ] as const).map(({ label, key, min, max, unit }) => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>{label}</span>
                        <span className="text-muted-foreground">{adjustments[key]}{unit}</span>
                      </div>
                      <Slider value={[adjustments[key]]} min={min} max={max} step={1}
                        onValueChange={([v]) => setAdjustments(a => ({ ...a, [key]: v }))}
                        data-testid={`slider-${key}`} />
                    </div>
                  ))}
                </div>
                <div className="h-px bg-border my-4" />
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Details</h3>
                <div className="space-y-4">
                  {([
                    { label: 'Temperature', key: 'sepia',     min: 0,   max: 100, unit: '%' },
                    { label: 'Hue',         key: 'hueRotate', min: 0,   max: 360, unit: '°' },
                    { label: 'Blur',        key: 'blur',      min: 0,   max: 20,  unit: 'px', step: 0.5 },
                  ] as const).map(({ label, key, min, max, unit, step }) => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>{label}</span>
                        <span className="text-muted-foreground">{adjustments[key]}{unit}</span>
                      </div>
                      <Slider value={[adjustments[key]]} min={min} max={max} step={step ?? 1}
                        onValueChange={([v]) => setAdjustments(a => ({ ...a, [key]: v }))}
                        data-testid={`slider-${key}`} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* ── Filters ── */}
              <TabsContent value="filters" className="mt-0">
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.map((preset) => (
                    <motion.button key={preset.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setAdjustments(preset.filter)}
                      className="bg-background border border-border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:text-primary transition-colors text-sm"
                      data-testid={`filter-${preset.name.toLowerCase()}`}>
                      <Layers className="w-5 h-5 opacity-70" />
                      {preset.name}
                    </motion.button>
                  ))}
                </div>
              </TabsContent>

              {/* ── Text ── */}
              <TabsContent value="text" className="mt-0 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Text Layers</h3>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={addNewTextLayer} data-testid="button-add-text">
                      <Plus className="w-3 h-3" /> Add Text
                    </Button>
                  </div>
                  {annotations.length === 0 && (
                    <p className="text-xs text-muted-foreground py-3 text-center">No text layers yet. Click "Add Text" to start.</p>
                  )}
                  <div className="space-y-1">
                    {annotations.map(ann => (
                      <div key={ann.id} onClick={() => setSelectedId(ann.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${selectedId === ann.id ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-background border border-border hover:border-primary/30'}`}
                        data-testid={`layer-${ann.id}`}>
                        <span className="truncate max-w-[180px]">{ann.text}</span>
                        <button onClick={(e) => { e.stopPropagation(); deleteAnnotation(ann.id); }}
                          className="text-muted-foreground hover:text-destructive transition-colors ml-2 shrink-0"
                          data-testid={`button-delete-layer-${ann.id}`}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedId && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-2 border-t border-border">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-1">Edit Selected</h3>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">Content</label>
                      <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} rows={3}
                        className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter your text..." data-testid="input-text-content" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">Font</label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger className="h-9 bg-background text-sm" data-testid="select-font-family"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {FONT_FAMILIES.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-xs text-muted-foreground">Size</span><span className="text-xs text-muted-foreground">{fontSize}px</span></div>
                      <Slider value={[fontSize]} min={10} max={300} step={1} onValueChange={([v]) => setFontSize(v)} data-testid="slider-font-size" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">Style</label>
                      <div className="flex gap-2">
                        {[
                          { icon: <Bold className="w-4 h-4" />, active: bold, toggle: () => setBold(!bold), testId: 'button-bold' },
                          { icon: <Italic className="w-4 h-4" />, active: italic, toggle: () => setItalic(!italic), testId: 'button-italic' },
                          { icon: <AlignLeft className="w-4 h-4" />, active: textAlign === 'left', toggle: () => setTextAlign('left'), testId: 'button-align-left' },
                          { icon: <AlignCenter className="w-4 h-4" />, active: textAlign === 'center', toggle: () => setTextAlign('center'), testId: 'button-align-center' },
                          { icon: <AlignRight className="w-4 h-4" />, active: textAlign === 'right', toggle: () => setTextAlign('right'), testId: 'button-align-right' },
                        ].map(({ icon, active, toggle, testId }) => (
                          <Button key={testId} variant={active ? 'default' : 'outline'} size="sm" className="flex-1 h-9" onClick={toggle} data-testid={testId}>
                            {icon}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-xs text-muted-foreground">Opacity</span><span className="text-xs text-muted-foreground">{textOpacity}%</span></div>
                      <Slider value={[textOpacity]} min={10} max={100} step={1} onValueChange={([v]) => setTextOpacity(v)} data-testid="slider-text-opacity" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Color</label>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_COLORS.map(c => (
                          <button key={c} onClick={() => setTextColor(c)}
                            className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                            style={{ backgroundColor: c, borderColor: textColor === c ? 'hsl(var(--primary))' : 'hsl(var(--border))', boxShadow: textColor === c ? '0 0 0 2px hsl(var(--primary)/0.3)' : 'none' }}
                            data-testid={`color-${c.replace('#', '')}`} />
                        ))}
                        <label className="w-7 h-7 rounded-full border-2 border-border overflow-hidden cursor-pointer hover:scale-110 transition-transform relative" title="Custom color">
                          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" data-testid="input-custom-color" />
                          <div className="w-full h-full" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                        </label>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" className="w-full" onClick={() => deleteAnnotation(selectedId)} data-testid="button-delete-selected">
                      <Trash2 className="w-4 h-4 mr-2" /> Remove Layer
                    </Button>
                  </motion.div>
                )}
              </TabsContent>

              {/* ── Retouch ── */}
              <TabsContent value="retouch" className="mt-0 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Remove Text from Image</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Use the heal brush to paint over unwanted text or watermarks. The tool blends surrounding pixels to fill the area naturally.
                  </p>
                </div>

                {/* Activate / deactivate */}
                <Button
                  variant={retouchActive ? 'default' : 'outline'}
                  className="w-full h-11 gap-2 font-medium"
                  onClick={() => setRetouchActive(v => !v)}
                  data-testid="button-retouch-activate"
                >
                  <Eraser className="w-4 h-4" />
                  {retouchActive ? 'Exit Retouch Mode' : 'Activate Heal Brush'}
                </Button>

                {/* Undo */}
                <Button variant="outline" className="w-full h-9 gap-2 text-sm"
                  onClick={handleUndo} disabled={undoCount === 0} data-testid="button-undo">
                  <Undo2 className="w-4 h-4" />
                  Undo  {undoCount > 0 && <span className="text-muted-foreground text-xs">({undoCount} step{undoCount !== 1 ? 's' : ''})</span>}
                </Button>

                <div className="h-px bg-border" />

                <div className="space-y-5">
                  {/* Brush size */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Brush Size</span>
                      <span className="text-muted-foreground">{brushSize}px</span>
                    </div>
                    <Slider value={[brushSize]} min={5} max={200} step={1}
                      onValueChange={([v]) => setBrushSize(v)} data-testid="slider-brush-size" />
                  </div>

                  {/* Strength */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Strength</span>
                      <span className="text-muted-foreground">{brushStrength === 1 ? 'Light' : brushStrength <= 3 ? 'Medium' : brushStrength <= 6 ? 'Strong' : 'Max'}</span>
                    </div>
                    <Slider value={[brushStrength]} min={1} max={10} step={1}
                      onValueChange={([v]) => setBrushStrength(v)} data-testid="slider-brush-strength" />
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-3 space-y-1.5">
                  <p className="text-xs font-medium text-foreground">Tips for best results</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Use a brush slightly larger than the text</li>
                    <li>Paint with multiple short strokes</li>
                    <li>Works best on simple / uniform backgrounds</li>
                    <li>Increase Strength for stubborn text</li>
                    <li>Use Undo if the result looks wrong</li>
                  </ul>
                </div>
              </TabsContent>

              {/* ── Layout ── */}
              <TabsContent value="layout" className="space-y-8 mt-0">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transform</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({ ...t, flipH: !t.flipH }))} data-testid="button-flip-h"><FlipHorizontal className="w-4 h-4 mr-2" /> Flip H</Button>
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({ ...t, flipV: !t.flipV }))} data-testid="button-flip-v"><FlipVertical className="w-4 h-4 mr-2" /> Flip V</Button>
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({ ...t, rotate: t.rotate - 90 }))} data-testid="button-rotate-left"><RotateCcw className="w-4 h-4 mr-2" /> Left</Button>
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({ ...t, rotate: t.rotate + 90 }))} data-testid="button-rotate-right"><RotateCw className="w-4 h-4 mr-2" /> Right</Button>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resize</h3>
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1.5">
                      <label className="text-xs text-muted-foreground">Width</label>
                      <Input value={resizeWidth} onChange={(e) => updateResize(e.target.value, resizeHeight, true)} className="h-9 bg-background" data-testid="input-width" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="text-xs text-muted-foreground">Height</label>
                      <Input value={resizeHeight} onChange={(e) => updateResize(resizeWidth, e.target.value, false)} className="h-9 bg-background" data-testid="input-height" />
                    </div>
                  </div>
                  <Button variant="outline" className={`w-full h-9 text-xs justify-start ${aspectLock ? 'border-primary text-primary' : ''}`}
                    onClick={() => setAspectLock(!aspectLock)} data-testid="button-aspect-lock">
                    {aspectLock && <Check className="w-3 h-3 mr-2" />} Lock Aspect Ratio
                  </Button>
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs text-muted-foreground">Presets</label>
                    <Select onValueChange={applyPresetFormat}>
                      <SelectTrigger className="h-9 bg-background" data-testid="select-preset-format"><SelectValue placeholder="Fit to..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ig-post">Instagram Post (1080×1080)</SelectItem>
                        <SelectItem value="ig-story">Instagram Story (1080×1920)</SelectItem>
                        <SelectItem value="tw-post">Twitter Post (1200×628)</SelectItem>
                        <SelectItem value="hd">HD Screen (1920×1080)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

            </div>
          </Tabs>
        </aside>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif" />
    </div>
  );
}
