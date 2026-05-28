import React, { useCallback } from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Trash2, Plus, FlipHorizontal, FlipVertical, RotateCcw, RotateCw,
  Lock, Unlock, Pipette, Paintbrush, Undo2, Monitor, Globe,
} from 'lucide-react';

// ── Filter presets ────────────────────────────────────────────────────────────
const FILTERS = [
  { name: 'None',      css: '' },
  { name: 'Vivid',     css: 'brightness(110%) contrast(120%) saturate(140%)' },
  { name: 'Matte',     css: 'contrast(90%) saturate(80%) brightness(110%)' },
  { name: 'Cool',      css: 'hue-rotate(30deg) saturate(90%)' },
  { name: 'Warm',      css: 'hue-rotate(-20deg) saturate(120%) brightness(105%)' },
  { name: 'Mono',      css: 'grayscale(100%)' },
  { name: 'Fade',      css: 'brightness(115%) contrast(80%) saturate(70%)' },
  { name: 'Dramatic',  css: 'contrast(140%) brightness(90%) saturate(120%)' },
  { name: 'Sepia',     css: 'sepia(80%)' },
  { name: 'Invert',    css: 'invert(100%)' },
  { name: 'Haze',      css: 'blur(1px) brightness(110%) contrast(90%)' },
  { name: 'Pop',       css: 'saturate(180%) contrast(110%)' },
];

const FONT_FAMILIES = [
  { label: 'Inter',        value: 'Inter, sans-serif' },
  { label: 'Playfair',     value: 'Playfair Display, serif' },
  { label: 'Roboto Mono',  value: 'Roboto Mono, monospace' },
  { label: 'Dancing',      value: 'Dancing Script, cursive' },
  { label: 'Oswald',       value: 'Oswald, sans-serif' },
  { label: 'Lato',         value: 'Lato, sans-serif' },
  { label: 'Merriweather', value: 'Merriweather, serif' },
  { label: 'Montserrat',   value: 'Montserrat, sans-serif' },
  { label: 'Raleway',      value: 'Raleway, sans-serif' },
  { label: 'Pacifico',     value: 'Pacifico, cursive' },
];

const GRADIENTS = [
  { label: 'Ocean',  value: 'linear-gradient(to right, #4facfe, #00f2fe)' },
  { label: 'Sunset', value: 'linear-gradient(to right, #f83600, #f9d423)' },
  { label: 'Aurora', value: 'linear-gradient(to right, #43e97b, #38f9d7)' },
  { label: 'Purple', value: 'linear-gradient(to right, #a18cd1, #fbc2eb)' },
  { label: 'Night',  value: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)' },
  { label: 'Peach',  value: 'linear-gradient(to right, #ffb347, #ffcc33)' },
  { label: 'Rose',   value: 'linear-gradient(to right, #f953c6, #b91d73)' },
  { label: 'Teal',   value: 'linear-gradient(to right, #1de9b6, #1dc4e9)' },
  { label: 'Dark',   value: 'linear-gradient(to right, #232526, #414345)' },
  { label: 'Mint',   value: 'linear-gradient(to right, #a8edea, #fed6e3)' },
];

function SliderRow({ label, value, min, max, step = 1, unit = '', onChange }: {
  label: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs text-muted-foreground">{value}{unit}</span>
      </div>
      <Slider min={min} max={max} step={step} value={[value]}
        onValueChange={([v]) => onChange(v)} className="h-2" />
    </div>
  );
}

export function Sidebar({ editor }: { editor: EditorContextType }) {
  const tabCls = 'flex-1 rounded-none h-full text-[11px] data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary';

  const addTextLayer = useCallback(() => {
    editor.addNewTextLayer((editor as any)._canvasRef ?? { current: null });
  }, [editor]);

  const applyFilter = useCallback((css: string) => {
    if (!css) {
      editor.setAdjustments({ brightness: 100, contrast: 100, saturation: 100, blur: 0, sepia: 0, hueRotate: 0, grayscale: 0, invert: 0 });
      return;
    }
    const parse = (re: RegExp, fallback: number) => {
      const m = css.match(re); return m ? parseFloat(m[1]) : fallback;
    };
    editor.setAdjustments({
      brightness: parse(/brightness\((\d+(?:\.\d+)?)%\)/, 100),
      contrast:   parse(/contrast\((\d+(?:\.\d+)?)%\)/, 100),
      saturation: parse(/saturate\((\d+(?:\.\d+)?)%\)/, 100),
      blur:       parse(/blur\((\d+(?:\.\d+)?)px\)/, 0),
      sepia:      parse(/sepia\((\d+(?:\.\d+)?)%\)/, 0),
      hueRotate:  parse(/hue-rotate\((-?\d+(?:\.\d+)?)deg\)/, 0),
      grayscale:  parse(/grayscale\((\d+(?:\.\d+)?)%\)/, 0),
      invert:     parse(/invert\((\d+(?:\.\d+)?)%\)/, 0),
    });
  }, [editor]);

  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col overflow-hidden shrink-0">
      <Tabs defaultValue="adjust" className="flex flex-col h-full">

        {/* Tab bar — 5 tabs exactly like Lumina */}
        <TabsList className="w-full h-10 rounded-none bg-card border-b border-border grid grid-cols-5 p-0">
          <TabsTrigger value="adjust"  className={tabCls}>Adjust</TabsTrigger>
          <TabsTrigger value="filters" className={tabCls}>Filters</TabsTrigger>
          <TabsTrigger value="text"    className={tabCls}>Text</TabsTrigger>
          <TabsTrigger value="retouch" className={tabCls}>Retouch</TabsTrigger>
          <TabsTrigger value="layout"  className={tabCls}>Layout</TabsTrigger>
        </TabsList>

        {/* ── ADJUST ── */}
        <TabsContent value="adjust" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
          <SliderRow label="Brightness" value={editor.adjustments.brightness} min={0} max={200}
            onChange={v => editor.setAdjustments(a => ({ ...a, brightness: v }))} />
          <SliderRow label="Contrast"   value={editor.adjustments.contrast}   min={0} max={200}
            onChange={v => editor.setAdjustments(a => ({ ...a, contrast: v }))} />
          <SliderRow label="Saturation" value={editor.adjustments.saturation} min={0} max={200}
            onChange={v => editor.setAdjustments(a => ({ ...a, saturation: v }))} />
          <SliderRow label="Hue Rotate" value={editor.adjustments.hueRotate}  min={0} max={360} unit="°"
            onChange={v => editor.setAdjustments(a => ({ ...a, hueRotate: v }))} />
          <SliderRow label="Blur"       value={editor.adjustments.blur}       min={0} max={20} step={0.1}
            onChange={v => editor.setAdjustments(a => ({ ...a, blur: v }))} />
          <SliderRow label="Sepia"      value={editor.adjustments.sepia}      min={0} max={100}
            onChange={v => editor.setAdjustments(a => ({ ...a, sepia: v }))} />
          <SliderRow label="Grayscale"  value={editor.adjustments.grayscale}  min={0} max={100}
            onChange={v => editor.setAdjustments(a => ({ ...a, grayscale: v }))} />
          <SliderRow label="Invert"     value={editor.adjustments.invert}     min={0} max={100}
            onChange={v => editor.setAdjustments(a => ({ ...a, invert: v }))} />
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={() =>
            editor.setAdjustments({ brightness: 100, contrast: 100, saturation: 100, blur: 0, sepia: 0, hueRotate: 0, grayscale: 0, invert: 0 })}>
            Reset Adjustments
          </Button>
        </TabsContent>

        {/* ── FILTERS ── */}
        <TabsContent value="filters" className="flex-1 overflow-y-auto p-4 m-0">
          <div className="grid grid-cols-3 gap-2">
            {FILTERS.map(f => (
              <button key={f.name} onClick={() => applyFilter(f.css)}
                className="aspect-square rounded-lg border border-border overflow-hidden flex flex-col items-center justify-center gap-1.5 hover:border-primary transition-colors bg-background">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-400 to-blue-500"
                  style={{ filter: f.css || 'none' }} />
                <span className="text-[10px] text-muted-foreground">{f.name}</span>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* ── TEXT ── */}
        <TabsContent value="text" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
          <Button size="sm" className="w-full gap-2 text-xs" onClick={addTextLayer}>
            <Plus className="w-3.5 h-3.5" /> Add Text Layer
          </Button>

          {editor.annotations.length > 0 && (
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Layers</Label>
              {editor.annotations.map((ann, i) => (
                <div key={ann.id}
                  onClick={() => { editor.setSelectedId(ann.id); editor.setTextInput(ann.text); }}
                  className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-xs transition-colors ${ann.id === editor.selectedId ? 'bg-primary/20 border border-primary/40' : 'hover:bg-background border border-transparent'}`}>
                  <span className="truncate max-w-[160px]">{ann.text || `Layer ${i + 1}`}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={e => { e.stopPropagation(); editor.deleteAnnotation(ann.id); }}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {editor.selectedId && (
            <div className="space-y-3 pt-1 border-t border-border">
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Editing selected layer</Label>
              <div>
                <Label className="text-xs text-muted-foreground">Content</Label>
                <Input value={editor.textInput} onChange={e => editor.setTextInput(e.target.value)}
                  className="mt-1 text-xs h-8" placeholder="Enter text..." />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Font</Label>
                <Select value={editor.fontFamily} onValueChange={editor.setFontFamily}>
                  <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONT_FAMILIES.map(f => (
                      <SelectItem key={f.value} value={f.value} style={{ fontFamily: f.value }}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <SliderRow label="Size"    value={editor.fontSize}    min={8} max={200} onChange={editor.setFontSize} />
              <SliderRow label="Opacity" value={editor.textOpacity} min={0} max={100} unit="%" onChange={editor.setTextOpacity} />
              <div className="flex items-center gap-1.5">
                <Button size="icon" variant={editor.bold   ? 'default' : 'outline'} className="h-7 w-7"
                  onClick={() => editor.setBold(!editor.bold)}><Bold   className="w-3 h-3" /></Button>
                <Button size="icon" variant={editor.italic ? 'default' : 'outline'} className="h-7 w-7"
                  onClick={() => editor.setItalic(!editor.italic)}><Italic className="w-3 h-3" /></Button>
                <div className="w-px h-5 bg-border mx-0.5" />
                <Button size="icon" variant={editor.textAlign === 'left'   ? 'default' : 'outline'} className="h-7 w-7"
                  onClick={() => editor.setTextAlign('left')}><AlignLeft   className="w-3 h-3" /></Button>
                <Button size="icon" variant={editor.textAlign === 'center' ? 'default' : 'outline'} className="h-7 w-7"
                  onClick={() => editor.setTextAlign('center')}><AlignCenter className="w-3 h-3" /></Button>
                <Button size="icon" variant={editor.textAlign === 'right'  ? 'default' : 'outline'} className="h-7 w-7"
                  onClick={() => editor.setTextAlign('right')}><AlignRight  className="w-3 h-3" /></Button>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Color</Label>
                <input type="color" value={editor.textColor}
                  onChange={e => editor.setTextColor(e.target.value)}
                  className="h-7 w-10 rounded cursor-pointer border-0 bg-transparent" />
                <span className="text-xs text-muted-foreground font-mono">{editor.textColor}</span>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── RETOUCH ── */}
        <TabsContent value="retouch" className="flex-1 overflow-y-auto p-4 space-y-5 m-0">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Remove text or watermarks from your screenshot by painting over them with the background colour.
          </p>

          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Step 1 — Background Color</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={editor.eyedropperActive ? 'default' : 'outline'}
                size="sm" className="flex-1 gap-2 text-xs h-8"
                onClick={() => { editor.setEyedropperActive(!editor.eyedropperActive); editor.setRetouchActive(false); }}>
                <Pipette className="w-3.5 h-3.5" />
                {editor.eyedropperActive ? 'Click image to pick…' : 'Pick with Eyedropper'}
              </Button>
              {editor.fillColor && (
                <div className="w-8 h-8 rounded border border-border shrink-0 cursor-pointer"
                  style={{ background: editor.fillColor }}
                  title="Click to clear" onClick={() => editor.setFillColor(null)} />
              )}
            </div>
            {editor.fillColor ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">{editor.fillColor}</span>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-muted-foreground"
                  onClick={() => editor.setFillColor(null)}>Use Auto</Button>
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground/60 italic">
                No colour picked — brush auto-samples nearby pixels
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Step 2 — Paint Over Text</Label>
            <Button
              variant={editor.retouchActive ? 'default' : 'outline'}
              size="sm" className="w-full gap-2 text-xs h-8"
              onClick={() => { editor.setRetouchActive(!editor.retouchActive); editor.setEyedropperActive(false); }}>
              <Paintbrush className="w-3.5 h-3.5" />
              {editor.retouchActive ? 'Painting — click to exit' : 'Activate Paint Brush'}
            </Button>
            <SliderRow label="Brush Size" value={editor.brushSize} min={5} max={120}
              onChange={editor.setBrushSize} />
          </div>

          <Button variant="outline" size="sm" className="w-full gap-2 text-xs"
            onClick={() => (editor as any)._handleUndo?.()}>
            <Undo2 className="w-3.5 h-3.5" /> Undo Last Stroke
          </Button>
        </TabsContent>

        {/* ── LAYOUT ── */}
        <TabsContent value="layout" className="flex-1 overflow-y-auto p-4 space-y-5 m-0">

          {/* Transform */}
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Transform</Label>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="h-8 w-full" title="Flip Horizontal"
                onClick={() => editor.setTransform(t => ({ ...t, flipH: !t.flipH }))}>
                <FlipHorizontal className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" className="h-8 w-full" title="Flip Vertical"
                onClick={() => editor.setTransform(t => ({ ...t, flipV: !t.flipV }))}>
                <FlipVertical className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" className="h-8 w-full" title="Rotate Left"
                onClick={() => editor.setTransform(t => ({ ...t, rotate: (t.rotate - 90 + 360) % 360 }))}>
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" className="h-8 w-full" title="Rotate Right"
                onClick={() => editor.setTransform(t => ({ ...t, rotate: (t.rotate + 90) % 360 }))}>
                <RotateCw className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex gap-1 text-[10px] text-muted-foreground text-center">
              <span className="flex-1">Flip H</span><span className="flex-1">Flip V</span>
              <span className="flex-1">Rotate ←</span><span className="flex-1">Rotate →</span>
            </div>
          </div>

          {/* Resize */}
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Resize</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-1">
                <Label className="text-[10px] text-muted-foreground">W</Label>
                <Input value={editor.resizeWidth} type="number" className="h-7 text-xs"
                  onChange={e => editor.updateResize(e.target.value, editor.resizeHeight, true)} />
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 mt-4 shrink-0"
                onClick={() => editor.setAspectLock(!editor.aspectLock)}>
                {editor.aspectLock
                  ? <Lock className="w-3 h-3 text-primary" />
                  : <Unlock className="w-3 h-3 text-muted-foreground" />}
              </Button>
              <div className="flex-1 space-y-1">
                <Label className="text-[10px] text-muted-foreground">H</Label>
                <Input value={editor.resizeHeight} type="number" className="h-7 text-xs"
                  onChange={e => editor.updateResize(editor.resizeWidth, e.target.value, false)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {[
                { label: 'Instagram',  format: 'ig-post'  },
                { label: 'IG Story',   format: 'ig-story' },
                { label: 'Twitter',    format: 'tw-post'  },
                { label: 'HD 1080p',   format: 'hd'       },
              ].map(p => (
                <Button key={p.format} variant="outline" size="sm" className="text-[10px] h-7"
                  onClick={() => editor.applyPresetFormat(p.format)}>{p.label}</Button>
              ))}
            </div>
          </div>

          {/* Frame / Background */}
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Frame Background</Label>
            <div className="grid grid-cols-3 gap-1">
              {(['gradient', 'solid', 'transparent'] as const).map(t => (
                <Button key={t}
                  variant={editor.background.type === t ? 'default' : 'outline'}
                  size="sm" className="text-xs h-7"
                  onClick={() => editor.setBackground(b => ({ ...b, type: t }))}>
                  {t === 'transparent' ? 'None' : t.charAt(0).toUpperCase() + t.slice(1)}
                </Button>
              ))}
            </div>
            {editor.background.type === 'gradient' && (
              <div className="grid grid-cols-5 gap-1 mt-1">
                {GRADIENTS.map(g => (
                  <button key={g.label} title={g.label}
                    onClick={() => editor.setBackground(b => ({ ...b, gradient: g.value }))}
                    className={`h-8 rounded border transition-all ${editor.background.gradient === g.value ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                    style={{ background: g.value }} />
                ))}
              </div>
            )}
            {editor.background.type === 'solid' && (
              <div className="flex items-center gap-2 mt-1">
                <Label className="text-xs text-muted-foreground">Color</Label>
                <input type="color" value={editor.background.color}
                  onChange={e => editor.setBackground(b => ({ ...b, color: e.target.value }))}
                  className="h-7 w-10 rounded border-0 bg-transparent cursor-pointer" />
              </div>
            )}
          </div>

          <SliderRow label="Padding" value={editor.background.padding} min={0} max={128}
            onChange={v => editor.setBackground(b => ({ ...b, padding: v }))} />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
                <Label className="text-xs">Browser Chrome</Label>
              </div>
              <Switch checked={editor.background.browserChrome}
                onCheckedChange={v => editor.setBackground(b => ({ ...b, browserChrome: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Rounded Corners</Label>
              <Switch checked={editor.background.roundedCorners}
                onCheckedChange={v => editor.setBackground(b => ({ ...b, roundedCorners: v }))} />
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </aside>
  );
}
