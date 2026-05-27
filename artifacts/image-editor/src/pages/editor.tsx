import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, UploadCloud, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, Image as ImageIcon, Check, Crop, Type, Layers, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- State Types ---
interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
  hueRotate: number;
  grayscale: number;
  invert: number;
}

const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
  hueRotate: 0,
  grayscale: 0,
  invert: 0,
};

interface Transform {
  flipH: boolean;
  flipV: boolean;
  rotate: number;
}

const DEFAULT_TRANSFORM: Transform = {
  flipH: false,
  flipV: false,
  rotate: 0,
};

const PRESETS = [
  { name: 'Original', filter: DEFAULT_ADJUSTMENTS },
  { name: 'Vivid', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 110, saturation: 130 } },
  { name: 'Fade', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 90, brightness: 110 } },
  { name: 'Chrome', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 120, saturation: 110 } },
  { name: 'Matte', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 85, brightness: 105, sepia: 10 } },
  { name: 'Noir', filter: { ...DEFAULT_ADJUSTMENTS, grayscale: 100, contrast: 120 } },
  { name: 'Vintage', filter: { ...DEFAULT_ADJUSTMENTS, sepia: 50, contrast: 90 } },
  { name: 'Cool', filter: { ...DEFAULT_ADJUSTMENTS, hueRotate: -15, saturation: 110 } },
  { name: 'Warm', filter: { ...DEFAULT_ADJUSTMENTS, sepia: 20, hueRotate: 10, saturation: 110 } },
  { name: 'Dramatic', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 140, brightness: 90, saturation: 120 } },
];

export default function Editor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });
  
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download state
  const [downloadFormat, setDownloadFormat] = useState('image/jpeg');
  const [downloadQuality, setDownloadQuality] = useState(0.9);

  // Resize state
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [aspectLock, setAspectLock] = useState(true);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      const img = new Image();
      img.onload = () => {
        setImageSrc(url);
        setNaturalDimensions({ width: img.width, height: img.height });
        setDimensions({ width: img.width, height: img.height });
        setResizeWidth(img.width.toString());
        setResizeHeight(img.height.toString());
      };
      img.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const drawImage = useCallback(() => {
    if (!imageSrc || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Calculate output size
      let outWidth = dimensions.width;
      let outHeight = dimensions.height;

      if (transform.rotate % 180 !== 0) {
        outWidth = dimensions.height;
        outHeight = dimensions.width;
      }

      canvas.width = outWidth;
      canvas.height = outHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Move to center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Apply transforms
      ctx.rotate((transform.rotate * Math.PI) / 180);
      ctx.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1);

      // Apply filters
      const filterString = `
        brightness(${adjustments.brightness}%)
        contrast(${adjustments.contrast}%)
        saturate(${adjustments.saturation}%)
        blur(${adjustments.blur}px)
        sepia(${adjustments.sepia}%)
        hue-rotate(${adjustments.hueRotate}deg)
        grayscale(${adjustments.grayscale}%)
        invert(${adjustments.invert}%)
      `.replace(/\s+/g, ' ').trim();
      
      ctx.filter = filterString;

      // Draw image from center
      ctx.drawImage(
        img,
        -dimensions.width / 2,
        -dimensions.height / 2,
        dimensions.width,
        dimensions.height
      );

      ctx.restore();
    };
    img.src = imageSrc;
  }, [imageSrc, dimensions, adjustments, transform]);

  useEffect(() => {
    let animationFrameId: number;
    const debouncedDraw = () => {
      animationFrameId = requestAnimationFrame(drawImage);
    };
    debouncedDraw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [drawImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current || !imageFile) return;
    
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const ext = downloadFormat.split('/')[1] === 'jpeg' ? 'jpg' : downloadFormat.split('/')[1];
      const baseName = imageFile.name.split('.').slice(0, -1).join('.');
      a.download = `${baseName}-edited.${ext}`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, downloadFormat, downloadQuality);
  };

  const updateResize = (w: string, h: string, fromWidth: boolean) => {
    const numW = parseInt(w) || 0;
    const numH = parseInt(h) || 0;
    
    if (aspectLock) {
      const ratio = naturalDimensions.width / naturalDimensions.height;
      if (fromWidth) {
        const newH = Math.round(numW / ratio);
        setResizeWidth(w);
        setResizeHeight(newH.toString());
        if (numW > 0) setDimensions({ width: numW, height: newH });
      } else {
        const newW = Math.round(numH * ratio);
        setResizeHeight(h);
        setResizeWidth(newW.toString());
        if (numH > 0) setDimensions({ width: newW, height: numH });
      }
    } else {
      setResizeWidth(w);
      setResizeHeight(h);
      if (numW > 0 && numH > 0) setDimensions({ width: numW, height: numH });
    }
  };

  const applyPresetFormat = (format: string) => {
    let w = 0, h = 0;
    switch (format) {
      case 'ig-post': w = 1080; h = 1080; break;
      case 'ig-story': w = 1080; h = 1920; break;
      case 'tw-post': w = 1200; h = 628; break;
      case 'hd': w = 1920; h = 1080; break;
      default: return;
    }
    setAspectLock(false);
    setResizeWidth(w.toString());
    setResizeHeight(h.toString());
    setDimensions({ width: w, height: h });
  };

  if (!imageFile) {
    return (
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 text-primary mb-12">
            <ImageIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Lumina</h1>
          </div>
          
          <div 
            className="border-2 border-dashed border-border rounded-xl p-12 hover:border-primary hover:bg-card transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-medium mb-2">Drop your image here</h3>
            <p className="text-muted-foreground mb-6">or click to browse</p>
            <div className="flex justify-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="bg-background px-2 py-1 rounded">JPG</span>
              <span className="bg-background px-2 py-1 rounded">PNG</span>
              <span className="bg-background px-2 py-1 rounded">WEBP</span>
              <span className="bg-background px-2 py-1 rounded">GIF</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept="image/jpeg,image/png,image/webp,image/gif" 
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-xl">
          <ImageIcon className="w-6 h-6" />
          Lumina
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden md:flex items-center gap-2">
            <span>{imageFile.name}</span>
            <span>•</span>
            <span>{dimensions.width} &times; {dimensions.height}</span>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setImageFile(null)}>
            New Image
          </Button>
          
          <div className="flex items-center gap-2 bg-background rounded-md border border-border p-1">
            <Select value={downloadFormat} onValueChange={setDownloadFormat}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none w-24 text-xs font-medium focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image/jpeg">JPG</SelectItem>
                <SelectItem value="image/png">PNG</SelectItem>
                <SelectItem value="image/webp">WEBP</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-4 bg-border mx-1" />
            <Button size="sm" onClick={handleDownload} className="h-8 font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Canvas Area */}
        <main 
          ref={containerRef}
          className="flex-1 bg-black/40 overflow-auto relative flex items-center justify-center p-8"
        >
          <div className="relative shadow-2xl ring-1 ring-white/10" style={{
            // Constrain visual size of canvas to fit container but keep actual resolution
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <canvas 
              ref={canvasRef}
              className="max-w-full max-h-full object-contain"
              style={{
                // Checkerboard pattern for transparent images
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%231a1d24\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              }}
            />
          </div>
        </main>

        {/* Sidebar Controls */}
        <aside className="w-80 border-l border-border bg-card flex flex-col shrink-0 z-10 shadow-2xl">
          <Tabs defaultValue="adjust" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start h-14 p-0 bg-transparent border-b border-border rounded-none shrink-0">
              <TabsTrigger value="adjust" className="flex-1 rounded-none h-full data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                Adjust
              </TabsTrigger>
              <TabsTrigger value="filters" className="flex-1 rounded-none h-full data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                Filters
              </TabsTrigger>
              <TabsTrigger value="transform" className="flex-1 rounded-none h-full data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                Layout
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto p-5">
              <TabsContent value="adjust" className="space-y-6 mt-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic</h3>
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setAdjustments(DEFAULT_ADJUSTMENTS)}>
                    <RefreshCw className="w-3 h-3 mr-1" /> Reset
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Brightness</span>
                      <span className="text-muted-foreground">{adjustments.brightness}%</span>
                    </div>
                    <Slider 
                      value={[adjustments.brightness]} 
                      min={0} max={200} step={1}
                      onValueChange={([v]) => setAdjustments(a => ({...a, brightness: v}))}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Contrast</span>
                      <span className="text-muted-foreground">{adjustments.contrast}%</span>
                    </div>
                    <Slider 
                      value={[adjustments.contrast]} 
                      min={0} max={200} step={1}
                      onValueChange={([v]) => setAdjustments(a => ({...a, contrast: v}))}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Saturation</span>
                      <span className="text-muted-foreground">{adjustments.saturation}%</span>
                    </div>
                    <Slider 
                      value={[adjustments.saturation]} 
                      min={0} max={200} step={1}
                      onValueChange={([v]) => setAdjustments(a => ({...a, saturation: v}))}
                    />
                  </div>
                </div>

                <div className="h-px bg-border my-6" />
                
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Details</h3>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Temperature</span>
                      <span className="text-muted-foreground">{adjustments.sepia}%</span>
                    </div>
                    <Slider 
                      value={[adjustments.sepia]} 
                      min={0} max={100} step={1}
                      onValueChange={([v]) => setAdjustments(a => ({...a, sepia: v}))}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Hue</span>
                      <span className="text-muted-foreground">{adjustments.hueRotate}°</span>
                    </div>
                    <Slider 
                      value={[adjustments.hueRotate]} 
                      min={0} max={360} step={1}
                      onValueChange={([v]) => setAdjustments(a => ({...a, hueRotate: v}))}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Blur</span>
                      <span className="text-muted-foreground">{adjustments.blur}px</span>
                    </div>
                    <Slider 
                      value={[adjustments.blur]} 
                      min={0} max={20} step={0.5}
                      onValueChange={([v]) => setAdjustments(a => ({...a, blur: v}))}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="filters" className="mt-0">
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.map((preset) => (
                    <motion.button
                      key={preset.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAdjustments(preset.filter)}
                      className="bg-background border border-border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      <Layers className="w-5 h-5 opacity-70" />
                      {preset.name}
                    </motion.button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transform" className="space-y-8 mt-0">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transform</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({...t, flipH: !t.flipH}))}>
                      <FlipHorizontal className="w-4 h-4 mr-2" /> Flip H
                    </Button>
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({...t, flipV: !t.flipV}))}>
                      <FlipVertical className="w-4 h-4 mr-2" /> Flip V
                    </Button>
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({...t, rotate: t.rotate - 90}))}>
                      <RotateCcw className="w-4 h-4 mr-2" /> Left
                    </Button>
                    <Button variant="outline" className="h-12" onClick={() => setTransform(t => ({...t, rotate: t.rotate + 90}))}>
                      <RotateCw className="w-4 h-4 mr-2" /> Right
                    </Button>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resize</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-1.5">
                        <label className="text-xs text-muted-foreground">Width</label>
                        <Input 
                          value={resizeWidth} 
                          onChange={(e) => updateResize(e.target.value, resizeHeight, true)}
                          className="h-9 bg-background"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <label className="text-xs text-muted-foreground">Height</label>
                        <Input 
                          value={resizeHeight} 
                          onChange={(e) => updateResize(resizeWidth, e.target.value, false)}
                          className="h-9 bg-background"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className={`w-full h-9 text-xs justify-start ${aspectLock ? 'border-primary text-primary' : ''}`}
                      onClick={() => setAspectLock(!aspectLock)}
                    >
                      {aspectLock && <Check className="w-3 h-3 mr-2" />}
                      Lock Aspect Ratio
                    </Button>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs text-muted-foreground">Presets</label>
                      <Select onValueChange={applyPresetFormat}>
                        <SelectTrigger className="h-9 bg-background">
                          <SelectValue placeholder="Fit to..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ig-post">Instagram Post (1080x1080)</SelectItem>
                          <SelectItem value="ig-story">Instagram Story (1080x1920)</SelectItem>
                          <SelectItem value="tw-post">Twitter Post (1200x628)</SelectItem>
                          <SelectItem value="hd">HD Screen (1920x1080)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </aside>
      </div>
      
      {/* Hidden file input for dragging onto app */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/jpeg,image/png,image/webp,image/gif" 
      />
    </div>
  );
}
