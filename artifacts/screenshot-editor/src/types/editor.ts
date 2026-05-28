export type Point = { x: number; y: number };

export type TextAnnotation = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
  opacity: number;
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

export type Transform = { flipH: boolean; flipV: boolean; rotate: number };
export const DEFAULT_TRANSFORM: Transform = { flipH: false, flipV: false, rotate: 0 };

export type BackgroundOptions = {
  type: 'transparent' | 'solid' | 'gradient';
  color: string;
  gradient: string;
  padding: number;
  browserChrome: boolean;
  roundedCorners: boolean;
};
