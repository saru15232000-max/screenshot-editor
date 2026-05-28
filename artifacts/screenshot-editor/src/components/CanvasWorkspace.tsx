import React, { useRef, useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { EditorContextType } from '../hooks/use-editor';
import { drawAnnotations } from '../lib/canvas-utils';

export function CanvasWorkspace({ editor }: { editor: EditorContextType }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{x: number, y: number} | null>(null);
  const [currentPoints, setCurrentPoints] = useState<{x: number, y: number}[]>([]);

  // Draw main canvas
  useEffect(() => {
    if (!editor.image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set real size based on image
    canvas.width = editor.image.width;
    canvas.height = editor.image.height;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
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

    // Draw annotations
    drawAnnotations(ctx, editor.annotations.filter(a => a.isComplete !== false), editor.selectedAnnotationId);
    
  }, [editor.image, editor.annotations, editor.selectedAnnotationId, editor.background.roundedCorners]);

  // Draw overlay (active drawing)
  useEffect(() => {
    if (!overlayCanvasRef.current || !editor.image) return;
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = editor.image.width;
    canvas.height = editor.image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isDrawing && currentPoints.length > 0) {
      const activeAnnotation = {
        id: 'temp',
        type: editor.activeTool,
        points: currentPoints,
        color: editor.currentColor,
        size: editor.currentSize,
      };
      drawAnnotations(ctx, [activeAnnotation], null);
    }
  }, [isDrawing, currentPoints, editor.image, editor.activeTool, editor.currentColor, editor.currentSize]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!editor.image) return;
    const rect = overlayCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate scale between real canvas size and display size
    const scaleX = editor.image.width / rect.width;
    const scaleY = editor.image.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (editor.activeTool === 'select') {
      // Basic hit detection (bounding box)
      const hit = [...editor.annotations].reverse().find(ann => {
        if (ann.points.length === 0) return false;
        // simplistic bounding box check
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        ann.points.forEach(p => {
          minX = Math.min(minX, p.x);
          maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y);
          maxY = Math.max(maxY, p.y);
        });
        const pad = Math.max(10, ann.size);
        return x >= minX - pad && x <= maxX + pad && y >= minY - pad && y <= maxY + pad;
      });
      editor.setSelectedAnnotationId(hit ? hit.id : null);
      return;
    }

    if (editor.activeTool === 'text') {
      const text = window.prompt('Enter text:');
      if (text) {
        editor.pushHistory([...editor.annotations, {
          id: Math.random().toString(),
          type: 'text',
          points: [{ x, y }],
          color: editor.currentColor,
          size: editor.currentSize,
          text,
          isComplete: true
        }]);
      }
      return;
    }

    setIsDrawing(true);
    setStartPoint({ x, y });
    setCurrentPoints([{ x, y }]);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !editor.image) return;
    const rect = overlayCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const scaleX = editor.image.width / rect.width;
    const scaleY = editor.image.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (editor.activeTool === 'pen') {
      setCurrentPoints(prev => [...prev, { x, y }]);
    } else {
      setCurrentPoints([startPoint, { x, y }]);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if (currentPoints.length > 1) {
      editor.pushHistory([...editor.annotations, {
        id: Math.random().toString(),
        type: editor.activeTool,
        points: currentPoints,
        color: editor.currentColor,
        size: editor.currentSize,
        isComplete: true
      }]);
    }
    setCurrentPoints([]);
    setStartPoint(null);
  };

  // Upload handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      editor.handleImageUpload(file);
    }
  };

  if (!editor.image) {
    return (
      <div 
        className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-sidebar-border rounded-3xl m-8 bg-card/30 hover:bg-card/50 transition-colors"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Drop an image here</h2>
        <p className="text-muted-foreground mb-6">or click to browse</p>
        <label className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium cursor-pointer hover:bg-primary/90 transition-colors">
          Browse Files
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) editor.handleImageUpload(file);
            }} 
          />
        </label>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-auto bg-black/90 relative flex items-center justify-center p-16"
      style={{
        backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      <div 
        id="export-container"
        className="relative shadow-2xl transition-all"
        style={{
          background: editor.background.type === 'gradient' ? editor.background.gradient : 
                     editor.background.type === 'solid' ? editor.background.color : 'transparent',
          padding: `${editor.background.padding}px`,
          borderRadius: editor.background.padding > 0 ? '16px' : '0',
        }}
      >
        <div className={`relative bg-background overflow-hidden ${editor.background.browserChrome ? 'rounded-xl shadow-xl border border-border/10' : ''} ${editor.background.roundedCorners && !editor.background.browserChrome ? 'rounded-xl' : ''}`}>
          
          {editor.background.browserChrome && (
            <div className="h-10 bg-sidebar border-b border-sidebar-border flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          )}
          
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              className="block"
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain'
              }}
            />
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 cursor-crosshair touch-none"
              style={{
                width: '100%',
                height: '100%'
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
