import { Annotation } from '../types/editor';

export function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string, size: number) {
  const headlen = Math.max(size * 4, 16);
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
  ctx.fillStyle = color;
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

export function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, size: number) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeRect(x, y, w, h);
}

export function drawText(ctx: CanvasRenderingContext2D, ann: Annotation) {
  if (!ann.text || !ann.points[0]) return;
  const { x, y } = ann.points[0];
  const fontStyle = ann.italic ? 'italic ' : '';
  const fontWeight = ann.bold ? 'bold ' : '';
  const fs = ann.fontSize ?? ann.size * 4;
  const ff = ann.fontFamily ?? 'Inter, sans-serif';
  ctx.save();
  ctx.globalAlpha = (ann.opacity ?? 100) / 100;
  ctx.font = `${fontStyle}${fontWeight}${fs}px ${ff}`;
  ctx.fillStyle = ann.color;
  ctx.textAlign = ann.align ?? 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(ann.text, x, y);
  ctx.restore();
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
      ctx.shadowColor = 'rgba(29, 179, 153, 0.8)';
      ctx.shadowBlur = 12;
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
      drawText(ctx, ann);
    } else if (ann.type === 'pen') {
      drawPen(ctx, ann.points, ann.color, ann.size);
    } else if (ann.type === 'blur' && ann.points.length >= 2) {
      const x = Math.min(ann.points[0].x, ann.points[1].x);
      const y = Math.min(ann.points[0].y, ann.points[1].y);
      const w = Math.abs(ann.points[1].x - ann.points[0].x);
      const h = Math.abs(ann.points[1].y - ann.points[0].y);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i < 8; i++) {
        ctx.fillRect(x + Math.random() * w, y + Math.random() * h, w / 3, h / 3);
      }
    }
    ctx.restore();
  }
}

export function adjustmentsToFilter(adj: { brightness: number; contrast: number; saturation: number; blur: number; sepia: number; hueRotate: number; grayscale: number; invert: number }) {
  return [
    `brightness(${adj.brightness}%)`,
    `contrast(${adj.contrast}%)`,
    `saturate(${adj.saturation}%)`,
    adj.blur > 0 ? `blur(${adj.blur}px)` : '',
    adj.sepia > 0 ? `sepia(${adj.sepia}%)` : '',
    adj.hueRotate !== 0 ? `hue-rotate(${adj.hueRotate}deg)` : '',
    adj.grayscale > 0 ? `grayscale(${adj.grayscale}%)` : '',
    adj.invert > 0 ? `invert(${adj.invert}%)` : '',
  ].filter(Boolean).join(' ');
}
