export type ToolType = 'select' | 'arrow' | 'rect' | 'text' | 'pen' | 'blur' | 'crop';

export type Point = { x: number; y: number };

export type Annotation = {
  id: string;
  type: ToolType;
  points: Point[];
  color: string;
  size: number;
  text?: string;
  isComplete?: boolean;
};

export type BackgroundOptions = {
  type: 'transparent' | 'solid' | 'gradient';
  color: string;
  gradient: string;
  padding: number;
  browserChrome: boolean;
  roundedCorners: boolean;
};

export type EditorState = {
  image: HTMLImageElement | null;
  annotations: Annotation[];
  activeTool: ToolType;
  currentColor: string;
  currentSize: number;
  background: BackgroundOptions;
  selectedAnnotationId: string | null;
  history: Annotation[][];
  historyIndex: number;
};
