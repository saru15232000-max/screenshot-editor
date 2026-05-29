import { useState, useCallback, useEffect } from 'react';
import { TextAnnotation, Adjustments, DEFAULT_ADJUSTMENTS, Transform, DEFAULT_TRANSFORM } from '../types/editor';

function genId() { return Math.random().toString(36).slice(2, 10); }

export function useEditor() {
  // Image
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  // Adjustments
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);

  // Transform (Layout tab)
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [aspectLock, setAspectLock] = useState(true);

  // Retouch
  const [retouchActive, setRetouchActive] = useState(false);
  const [eyedropperActive, setEyedropperActive] = useState(false);
  const [fillColor, setFillColor] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(40);

  // Text annotations (Text tab)
  const [annotations, setAnnotations] = useState<TextAnnotation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textTool, setTextTool] = useState(false);
  const [dragging, setDragging] = useState<{
    id: string; startX: number; startY: number; origX: number; origY: number;
  } | null>(null);

  const [textInput, setTextInput] = useState('Your text here');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');
  const [textColor, setTextColor] = useState('#ffffff');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [textOpacity, setTextOpacity] = useState(100);

  // Download format
  const [downloadFormat, setDownloadFormat] = useState('image/png');

  // Sync textInput when selected annotation changes
  useEffect(() => {
    if (!selectedId) return;
    const ann = annotations.find(a => a.id === selectedId);
    if (ann) {
      setTextInput(ann.text);
      setFontSize(ann.fontSize);
      setFontFamily(ann.fontFamily);
      setTextColor(ann.color);
      setBold(ann.bold);
      setItalic(ann.italic);
      setTextAlign(ann.align);
      setTextOpacity(ann.opacity);
    }
  }, [selectedId]);

  // Live-sync form controls → selected annotation
  useEffect(() => {
    if (!selectedId) return;
    setAnnotations(prev => prev.map(a =>
      a.id === selectedId
        ? { ...a, text: textInput, fontSize, fontFamily, color: textColor, bold, italic, align: textAlign, opacity: textOpacity }
        : a
    ));
  }, [textInput, fontSize, fontFamily, textColor, bold, italic, textAlign, textOpacity]);

  const addNewTextLayer = useCallback((canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const canvas = canvasRef.current;
    const id = genId();
    const cx = canvas ? canvas.width  / 2 : 200;
    const cy = canvas ? canvas.height / 2 : 200;
    const newAnn: TextAnnotation = {
      id, text: 'Your text here',
      x: cx, y: cy,
      fontSize, fontFamily, color: textColor,
      bold, italic, align: textAlign, opacity: textOpacity,
    };
    setAnnotations(prev => [...prev, newAnn]);
    setSelectedId(id);
    setTextInput('Your text here');
  }, [fontSize, fontFamily, textColor, bold, italic, textAlign, textOpacity]);

  const deleteAnnotation = useCallback((id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const startDrag = useCallback((d: typeof dragging) => {
    setDragging(d);
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setDimensions({ width: img.width, height: img.height });
        setNaturalDimensions({ width: img.width, height: img.height });
        setResizeWidth(img.width.toString());
        setResizeHeight(img.height.toString());
        setAnnotations([]);
        setSelectedId(null);
        setRetouchActive(false);
        setEyedropperActive(false);
        setFillColor(null);
        setTransform(DEFAULT_TRANSFORM);
        setAdjustments(DEFAULT_ADJUSTMENTS);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback(() => {
    setImage(null);
    setAnnotations([]);
    setSelectedId(null);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setTransform(DEFAULT_TRANSFORM);
    setRetouchActive(false);
    setEyedropperActive(false);
    setFillColor(null);
  }, []);

  const updateResize = useCallback((w: string, h: string, fromWidth: boolean) => {
    const numW = parseInt(w) || 0;
    const numH = parseInt(h) || 0;
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
  }, [aspectLock, naturalDimensions]);

  const applyPresetFormat = useCallback((format: string) => {
    let w = 0, h = 0;
    switch (format) {
      case 'ig-post':  w = 1080; h = 1080; break;
      case 'ig-story': w = 1080; h = 1920; break;
      case 'tw-post':  w = 1200; h = 628;  break;
      case 'hd':       w = 1920; h = 1080; break;
      default: return;
    }
    setAspectLock(false);
    setResizeWidth(w.toString()); setResizeHeight(h.toString());
    setDimensions({ width: w, height: h });
  }, []);

  return {
    image, setImage,
    adjustments, setAdjustments,
    transform, setTransform,
    dimensions, setDimensions,
    naturalDimensions,
    resizeWidth, resizeHeight,
    aspectLock, setAspectLock,
    updateResize, applyPresetFormat,
    retouchActive, setRetouchActive,
    eyedropperActive, setEyedropperActive,
    fillColor, setFillColor,
    brushSize, setBrushSize,
    annotations, setAnnotations,
    selectedId, setSelectedId,
    textTool, setTextTool,
    dragging, startDrag,
    textInput, setTextInput,
    fontSize, setFontSize,
    fontFamily, setFontFamily,
    textColor, setTextColor,
    bold, setBold,
    italic, setItalic,
    textAlign, setTextAlign,
    textOpacity, setTextOpacity,
    downloadFormat, setDownloadFormat,
    addNewTextLayer, deleteAnnotation,
    handleImageUpload, reset,
  };
}

export type EditorContextType = ReturnType<typeof useEditor>;
