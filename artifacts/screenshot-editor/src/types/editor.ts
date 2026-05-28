export type ToolType = 'select' | 'arrow' | 'rect' | 'text' | 'pen' | 'blur' | 'crop';

export type Point = { x: number; y: number };

export type Annotation = {
  id: string;
  type: ToolType;
  points: Point[];
  color: string;
  size: number;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  opacity?: number;
  isComplete?: boolean;
};

export type Adjustments = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
  hueRotate: number;
  grayscale: number;
  invert: number;
};

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
  hueRotate: 0,
  grayscale: 0,
  invert: 0,
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
  adjustments: Adjustments;
};
