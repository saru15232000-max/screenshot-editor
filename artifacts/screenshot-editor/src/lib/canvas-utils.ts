import { Annotation } from '../types/editor';

export function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string, size: number) {
  const headlen = size * 3;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.lineTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

export function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, size: number) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.rect(x, y, w, h);
  ctx.stroke();
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size: number) {
  ctx.font = `bold ${size * 4}px Inter, sans-serif`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
}

export function drawPen(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], color: string, size: number) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

export function drawAnnotations(ctx: CanvasRenderingContext2D, annotations: Annotation[], selectedId: string | null) {
  for (const ann of annotations) {
    if (ann.points.length === 0) continue;
    
    ctx.save();
    if (ann.id === selectedId) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
    }

    if (ann.type === 'arrow' && ann.points.length >= 2) {
      drawArrow(ctx, ann.points[0].x, ann.points[0].y, ann.points[1].x, ann.points[1].y, ann.color, ann.size);
    } else if (ann.type === 'rect' && ann.points.length >= 2) {
      const x = Math.min(ann.points[0].x, ann.points[1].x);
      const y = Math.min(ann.points[0].y, ann.points[1].y);
      const w = Math.abs(ann.points[1].x - ann.points[0].x);
      const h = Math.abs(ann.points[1].y - ann.points[0].y);
      drawRect(ctx, x, y, w, h, ann.color, ann.size);
    } else if (ann.type === 'text' && ann.text) {
      drawText(ctx, ann.text, ann.points[0].x, ann.points[0].y, ann.color, ann.size);
    } else if (ann.type === 'pen') {
      drawPen(ctx, ann.points, ann.color, ann.size);
    } else if (ann.type === 'blur' && ann.points.length >= 2) {
      // Basic blur representation using semi-transparent overlay since standard blur is complex on pure canvas
      const x = Math.min(ann.points[0].x, ann.points[1].x);
      const y = Math.min(ann.points[0].y, ann.points[1].y);
      const w = Math.abs(ann.points[1].x - ann.points[0].x);
      const h = Math.abs(ann.points[1].y - ann.points[0].y);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.backdropFilter = 'blur(10px)'; // May not work in all canvas implementations
      ctx.fillRect(x, y, w, h);
    }
    
    ctx.restore();
  }
}
