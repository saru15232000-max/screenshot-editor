import React, { useRef, useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { ScreenShare } from 'lucide-react';
import { EditorContextType } from '../hooks/use-editor';
import { drawAnnotations } from '../lib/canvas-utils';

export function CanvasWorkspace({ editor, fileInputRef }: { editor: EditorContextType; fileInputRef: React.RefObject<HTMLInputElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!editor.image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = editor.image.width;
    canvas.height = editor.image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (editor.background.roundedCorners) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 12);
      ctx.clip();
      ctx.drawImage(editor.image, 0, 0);
      ctx.restore();
    } else {
      ctx.drawImage(editor.image, 0, 0);
    }
    drawAnnotations(ctx, editor.annotations.filter(a => a.isComplete !== false), editor.selectedAnnotationId);
  }, [editor.image, editor.annotations, editor.selectedAnnotationId, editor.background.roundedCorners]);

  useEffect(() => {
    if (!overlayCanvasRef.current || !editor.image) return;
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = editor.image.width;
    canvas.height = editor.image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isDrawing && currentPoints.length > 0) {
      drawAnnotations(ctx, [{ id: 'temp', type: editor.activeTool, points: currentPoints, color: editor.currentColor, size: editor.currentSize }], null);
    }
  }, [isDrawing, currentPoints, editor.image, editor.activeTool, editor.currentColor, editor.currentSize]);

  const getScaledCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = overlayCanvasRef.current?.getBoundingClientRect();
    if (!rect || !editor.image) return { x: 0, y: 0 };
    return {
      x: (e.clientX - rect.left) * (editor.image.width / rect.width),
      y: (e.clientY - rect.top) * (editor.image.height / rect.height),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!editor.image) return;
    const { x, y } = getScaledCoords(e);
    if (editor.activeTool === 'select') {
      const hit = [...editor.annotations].reverse().find(ann => {
        if (!ann.points.length) return false;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        ann.points.forEach(p => { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); });
        const pad = Math.max(10, ann.size);
        return x >= minX - pad && x <= maxX + pad && y >= minY - pad && y <= maxY + pad;
      });
      editor.setSelectedAnnotationId(hit ? hit.id : null);
      return;
    }
    if (editor.activeTool === 'text') {
      const text = window.prompt('Enter text:');
      if (text) editor.pushHistory([...editor.annotations, { id: Math.random().toString(), type: 'text', points: [{ x, y }], color: editor.currentColor, size: editor.currentSize, text, isComplete: true }]);
      return;
    }
    setIsDrawing(true);
    setStartPoint({ x, y });
    setCurrentPoints([{ x, y }]);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !editor.image) return;
    const { x, y } = getScaledCoords(e);
    if (editor.activeTool === 'pen') setCurrentPoints(prev => [...prev, { x, y }]);
    else setCurrentPoints([startPoint, { x, y }]);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    if (currentPoints.length > 1) editor.pushHistory([...editor.annotations, { id: Math.random().toString(), type: editor.activeTool, points: currentPoints, color: editor.currentColor, size: editor.currentSize, isComplete: true }]);
    setCurrentPoints([]);
    setStartPoint(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) editor.handleImageUpload(file);
  };

  if (!editor.image) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-6"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 text-primary mb-12">
            <ScreenShare className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Snapmark</h1>
          </div>
          <div
            className="border-2 border-dashed border-border rounded-xl p-12 hover:border-primary hover:bg-card transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            data-testid="upload-dropzone"
          >
            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-medium mb-2">Drop your screenshot here</h3>
            <p className="text-muted-foreground mb-6">or click to browse</p>
            <div className="flex justify-center gap-2 text-xs font-medium text-muted-foreground">
              {['JPG', 'PNG', 'WEBP', 'GIF'].map(f => <span key={f} className="bg-background px-2 py-1 rounded border border-border">{f}</span>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main
      ref={containerRef}
      className="flex-1 bg-black/40 overflow-auto relative flex items-center justify-center p-8"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div
        id="export-container"
        className="relative shadow-2xl ring-1 ring-white/10 transition-all"
        style={{
          background: editor.background.type === 'gradient' ? editor.background.gradient :
            editor.background.type === 'solid' ? editor.background.color : 'transparent',
          padding: `${editor.background.padding}px`,
          borderRadius: editor.background.padding > 0 ? '16px' : '0',
        }}
      >
        <div className={`relative overflow-hidden ${editor.background.browserChrome ? 'rounded-xl shadow-xl border border-white/10' : ''} ${editor.background.roundedCorners && !editor.background.browserChrome ? 'rounded-xl' : ''}`}>
          {editor.background.browserChrome && (
            <div className="h-10 bg-card border-b border-border flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          )}
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full object-contain block"
              style={{ maxHeight: '70vh' }}
            />
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 cursor-crosshair touch-none"
              style={{ width: '100%', height: '100%' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
