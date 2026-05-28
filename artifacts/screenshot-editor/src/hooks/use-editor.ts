import { useState, useRef, useCallback, useEffect } from 'react';
import { Annotation, BackgroundOptions, EditorState, ToolType, Point } from '../types/editor';

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

  const pushHistory = useCallback((newAnnotations: Annotation[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations(newAnnotations);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnnotations(history[historyIndex - 1]);
      setSelectedAnnotationId(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedAnnotationId) {
          pushHistory(annotations.filter(a => a.id !== selectedAnnotationId));
          setSelectedAnnotationId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedAnnotationId, annotations, pushHistory]);

  return {
    image,
    setImage,
    annotations,
    setAnnotations,
    activeTool,
    setActiveTool,
    currentColor,
    setCurrentColor,
    currentSize,
    setCurrentSize,
    background,
    setBackground,
    selectedAnnotationId,
    setSelectedAnnotationId,
    pushHistory,
    undo,
    redo,
    handleImageUpload,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
}

export type EditorContextType = ReturnType<typeof useEditor>;
