import { useState, useCallback, useEffect } from 'react';
import { Annotation, BackgroundOptions, ToolType, Adjustments, DEFAULT_ADJUSTMENTS } from '../types/editor';

const INITIAL_BACKGROUND: BackgroundOptions = {
  type: 'gradient',
  color: '#ffffff',
  gradient: 'linear-gradient(to right, #4facfe, #00f2fe)',
  padding: 64,
  browserChrome: true,
  roundedCorners: true,
};

export function useEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeTool, setActiveTool] = useState<ToolType>('select');
  const [currentColor, setCurrentColor] = useState<string>('#ff0055');
  const [currentSize, setCurrentSize] = useState<number>(4);
  const [background, setBackground] = useState<BackgroundOptions>(INITIAL_BACKGROUND);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const [history, setHistory] = useState<Annotation[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);

  // Text tool state
  const [fontSize, setFontSize] = useState<number>(32);
  const [fontFamily, setFontFamily] = useState<string>('Inter, sans-serif');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [textOpacity, setTextOpacity] = useState<number>(100);

  const pushHistory = useCallback((newAnnotations: Annotation[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newAnnotations);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
    setAnnotations(newAnnotations);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(i => i - 1);
      setAnnotations(history[historyIndex - 1]);
      setSelectedAnnotationId(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(i => i + 1);
      setAnnotations(history[historyIndex + 1]);
      setSelectedAnnotationId(null);
    }
  }, [history, historyIndex]);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => setImage(img);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback(() => {
    setImage(null);
    setAnnotations([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setSelectedAnnotationId(null);
    setActiveTool('select');
    setBackground(INITIAL_BACKGROUND);
    setAdjustments(DEFAULT_ADJUSTMENTS);
  }, []);

  const addTextLayer = useCallback((x: number, y: number) => {
    const id = Math.random().toString(36).slice(2, 10);
    const newAnn: Annotation = {
      id,
      type: 'text',
      points: [{ x, y }],
      color: textColor,
      size: fontSize,
      text: 'Your text here',
      fontFamily,
      fontSize,
      bold,
      italic,
      align: textAlign,
      opacity: textOpacity,
      isComplete: true,
    };
    const next = [...annotations, newAnn];
    pushHistory(next);
    setSelectedAnnotationId(id);
    return id;
  }, [annotations, pushHistory, textColor, fontSize, fontFamily, bold, italic, textAlign, textOpacity]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) redo(); else undo();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedAnnotationId) {
        pushHistory(annotations.filter(a => a.id !== selectedAnnotationId));
        setSelectedAnnotationId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedAnnotationId, annotations, pushHistory]);

  return {
    image, setImage,
    annotations, setAnnotations,
    activeTool, setActiveTool,
    currentColor, setCurrentColor,
    currentSize, setCurrentSize,
    background, setBackground,
    selectedAnnotationId, setSelectedAnnotationId,
    adjustments, setAdjustments,
    fontSize, setFontSize,
    fontFamily, setFontFamily,
    textColor, setTextColor,
    bold, setBold,
    italic, setItalic,
    textAlign, setTextAlign,
    textOpacity, setTextOpacity,
    pushHistory,
    undo, redo, reset,
    addTextLayer,
    handleImageUpload,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
}

export type EditorContextType = ReturnType<typeof useEditor>;
