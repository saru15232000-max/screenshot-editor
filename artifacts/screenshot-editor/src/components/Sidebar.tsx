import React, { useCallback } from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Trash2, Plus, FlipHorizontal, FlipVertical, RotateCcw, RotateCw,
  Check, Pipette, Eraser, Undo2, Layers, RefreshCw, ScanSearch,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ── Filter presets (matches Lumina's preset list exactly) ────────────────────
const PRESETS = [
  { name: 'None',      filter: { brightness:100, contrast:100, saturation:100, blur:0, sepia:0, hueRotate:0, grayscale:0, invert:0 } },
  { name: 'Vivid',     filter: { brightness:110, contrast:120, saturation:140, blur:0, sepia:0, hueRotate:0,  grayscale:0, invert:0 } },
  { name: 'Matte',     filter: { brightness:110, contrast:90,  saturation:80,  blur:0, sepia:0, hueRotate:0,  grayscale:0, invert:0 } },
  { name: 'Cool',      filter: { brightness:100, contrast:100, saturation:90,  blur:0, sepia:0, hueRotate:30, grayscale:0, invert:0 } },
  { name: 'Warm',      filter: { brightness:105, contrast:100, saturation:120, blur:0, sepia:0, hueRotate:-20,grayscale:0, invert:0 } },
  { name: 'Mono',      filter: { brightness:100, contrast:100, saturation:100, blur:0, sepia:0, hueRotate:0,  grayscale:100, invert:0 } },
  { name: 'Fade',      filter: { brightness:115, contrast:80,  saturation:70,  blur:0, sepia:0, hueRotate:0,  grayscale:0, invert:0 } },
  { name: 'Dramatic',  filter: { brightness:90,  contrast:140, saturation:120, blur:0, sepia:0, hueRotate:0,  grayscale:0, invert:0 } },
  { name: 'Sepia',     filter: { brightness:100, contrast:100, saturation:100, blur:0, sepia:80, hueRotate:0, grayscale:0, invert:0 } },
  { name: 'Invert',    filter: { brightness:100, contrast:100, saturation:100, blur:0, sepia:0, hueRotate:0,  grayscale:0, invert:100 } },
];

// ── Text style templates ──────────────────────────────────────────────────────
const TEXT_TEMPLATES = [
  { name: 'Big Title',    fontFamily: 'Montserrat, sans-serif', fontSize: 72,  color: '#ffffff', bold: true,  italic: false, opacity: 100 },
  { name: 'Subtitle',     fontFamily: 'Inter, sans-serif',      fontSize: 36,  color: '#e2e8f0', bold: false, italic: false, opacity: 90  },
  { name: 'Caption',      fontFamily: 'Lato, sans-serif',       fontSize: 20,  color: '#94a3b8', bold: false, italic: false, opacity: 80  },
  { name: 'Quote',        fontFamily: 'Playfair Display, serif',fontSize: 40,  color: '#fbbf24', bold: false, italic: true,  opacity: 95  },
  { name: 'Code Label',   fontFamily: 'Roboto Mono, monospace', fontSize: 18,  color: '#34d399', bold: false, italic: false, opacity: 100 },
  { name: 'Brand',        fontFamily: 'Pacifico, cursive',      fontSize: 52,  color: '#a78bfa', bold: false, italic: false, opacity: 100 },
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

const PRESET_COLORS = ['#ffffff','#000000','#f87171','#fbbf24','#34d399','#60a5fa','#a78bfa','#f472b6'];

const DEFAULT_ADJ = { brightness:100, contrast:100, saturation:100, blur:0, sepia:0, hueRotate:0, grayscale:0, invert:0 };

export function Sidebar({ editor }: { editor: EditorContextType }) {
  const tabCls = 'flex-1 rounded-none h-full text-[11px] data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none';

  const addTextLayer = useCallback(() => {
    editor.addNewTextLayer((editor as any)._canvasRef ?? { current: null });
  }, [editor]);

  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col shrink-0 z-10 shadow-2xl">
      <Tabs defaultValue="adjust" className="flex-1 flex flex-col">

        {/* Tab bar — 5 tabs, identical to Lumina */}
        <TabsList className="w-full h-12 p-0 bg-transparent border-b border-border rounded-none shrink-0 flex">
          {[
            { value: 'adjust',  label: 'Adjust'  },
            { value: 'filters', label: 'Filters' },
            { value: 'text',    label: 'Text'    },
            { value: 'retouch', label: 'Retouch' },
            { value: 'layout',  label: 'Layout'  },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value} className={tabCls}>{t.label}</TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 overflow-y-auto p-5">

          {/* ── ADJUST ── */}
          <TabsContent value="adjust" className="space-y-6 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic</h3>
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => editor.setAdjustments(DEFAULT_ADJ)}>
                <RefreshCw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>
            <div className="space-y-4">
              {([
                { label: 'Brightness', key: 'brightness', min: 0, max: 200, unit: '%' },
                { label: 'Contrast',   key: 'contrast',   min: 0, max: 200, unit: '%' },
                { label: 'Saturation', key: 'saturation', min: 0, max: 200, unit: '%' },
              ] as const).map(({ label, key, min, max, unit }) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{editor.adjustments[key]}{unit}</span>
                  </div>
                  <Slider value={[editor.adjustments[key]]} min={min} max={max} step={1}
                    onValueChange={([v]) => editor.setAdjustments(a => ({ ...a, [key]: v }))} />
                </div>
              ))}
            </div>
            <div className="h-px bg-border my-4" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Details</h3>
            <div className="space-y-4">
              {([
                { label: 'Temperature', key: 'sepia',     min: 0, max: 100, unit: '%' },
                { label: 'Hue',         key: 'hueRotate', min: 0, max: 360, unit: '°' },
                { label: 'Blur',        key: 'blur',      min: 0, max: 20,  unit: 'px', step: 0.5 },
              ] as const).map(({ label, key, min, max, unit, step }) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{editor.adjustments[key]}{unit}</span>
                  </div>
                  <Slider value={[editor.adjustments[key]]} min={min} max={max} step={step ?? 1}
                    onValueChange={([v]) => editor.setAdjustments(a => ({ ...a, [key]: v }))} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── FILTERS ── */}
          <TabsContent value="filters" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map(preset => (
                <motion.button key={preset.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => editor.setAdjustments(preset.filter)}
                  className="bg-background border border-border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:text-primary transition-colors text-sm">
                  <Layers className="w-5 h-5 opacity-70" />
                  {preset.name}
                </motion.button>
              ))}
            </div>
          </TabsContent>

          {/* ── TEXT ── */}
          <TabsContent value="text" className="mt-0 space-y-5">
            {/* Style Templates */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Style Templates</h3>
              <div className="grid grid-cols-2 gap-2">
                {TEXT_TEMPLATES.map(tpl => (
                  <button key={tpl.name} onClick={() => {
                    editor.setFontFamily(tpl.fontFamily);
                    editor.setFontSize(tpl.fontSize);
                    editor.setTextColor(tpl.color);
                    editor.setBold(tpl.bold);
                    editor.setItalic(tpl.italic);
                    editor.setTextOpacity(tpl.opacity);
                  }}
                    className="bg-background border border-border rounded-lg px-3 py-2.5 text-left hover:border-primary hover:text-primary transition-colors">
                    <span className="block truncate text-sm"
                      style={{ fontFamily: tpl.fontFamily, fontWeight: tpl.bold ? 'bold' : 'normal', fontStyle: tpl.italic ? 'italic' : 'normal', color: tpl.color === '#000000' ? 'hsl(var(--foreground))' : tpl.color }}>
                      {tpl.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {tpl.fontSize}px · {tpl.opacity < 100 ? `${tpl.opacity}% opacity` : tpl.bold ? 'Bold' : tpl.italic ? 'Italic' : 'Regular'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Text Layers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Text Layers</h3>
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={addTextLayer}>
                  <Plus className="w-3 h-3" /> Add Text
                </Button>
              </div>
              {editor.annotations.length === 0 && (
                <p className="text-xs text-muted-foreground py-3 text-center">
                  No text layers yet. Click "Add Text" to start.
                </p>
              )}
              <div className="space-y-1">
                {editor.annotations.map(ann => (
                  <div key={ann.id} onClick={() => editor.setSelectedId(ann.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${editor.selectedId === ann.id ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-background border border-border hover:border-primary/30'}`}>
                    <span className="truncate max-w-[180px]">{ann.text}</span>
                    <button onClick={e => { e.stopPropagation(); editor.deleteAnnotation(ann.id); }}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-2 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {editor.selectedId && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-1">Edit Selected</h3>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Content</label>
                  <textarea value={editor.textInput} onChange={e => editor.setTextInput(e.target.value)} rows={3}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter your text..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Font</label>
                  <Select value={editor.fontFamily} onValueChange={editor.setFontFamily}>
                    <SelectTrigger className="h-9 bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {FONT_FAMILIES.map(f => (
                        <SelectItem key={f.value} value={f.value} style={{ fontFamily: f.value }}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Size</span>
                    <span className="text-muted-foreground">{editor.fontSize}px</span>
                  </div>
                  <Slider value={[editor.fontSize]} min={8} max={200} step={1}
                    onValueChange={([v]) => editor.setFontSize(v)} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Opacity</span>
                    <span className="text-xs text-muted-foreground">{editor.textOpacity}%</span>
                  </div>
                  <Slider value={[editor.textOpacity]} min={10} max={100} step={1}
                    onValueChange={([v]) => editor.setTextOpacity(v)} />
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {[
                      { icon: <Bold className="w-4 h-4" />,        active: editor.bold,              toggle: () => editor.setBold(!editor.bold) },
                      { icon: <Italic className="w-4 h-4" />,      active: editor.italic,            toggle: () => editor.setItalic(!editor.italic) },
                      { icon: <AlignLeft className="w-4 h-4" />,   active: editor.textAlign==='left',   toggle: () => editor.setTextAlign('left') },
                      { icon: <AlignCenter className="w-4 h-4" />, active: editor.textAlign==='center', toggle: () => editor.setTextAlign('center') },
                      { icon: <AlignRight className="w-4 h-4" />,  active: editor.textAlign==='right',  toggle: () => editor.setTextAlign('right') },
                    ].map(({ icon, active, toggle }, i) => (
                      <Button key={i} variant={active ? 'default' : 'outline'} size="sm" className="flex-1 h-9" onClick={toggle}>
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Color</label>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full border-2 shrink-0"
                      style={{ backgroundColor: editor.textColor, borderColor: 'hsl(var(--border))' }} />
                    <span className="text-xs font-mono text-muted-foreground">{editor.textColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map(c => (
                      <button key={c} onClick={() => editor.setTextColor(c)}
                        className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                        style={{ backgroundColor: c, borderColor: editor.textColor === c ? 'hsl(var(--primary))' : 'hsl(var(--border))' }} />
                    ))}
                    <label className="w-7 h-7 rounded-full border-2 border-border overflow-hidden cursor-pointer hover:scale-110 transition-transform relative">
                      <input type="color" value={editor.textColor} onChange={e => editor.setTextColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="w-full h-full" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                    </label>
                  </div>
                </div>
                <Button variant="destructive" size="sm" className="w-full" onClick={() => editor.deleteAnnotation(editor.selectedId!)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Remove Layer
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* ── RETOUCH ── */}
          <TabsContent value="retouch" className="mt-0 space-y-5">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Remove Text from Image</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pick the background colour first with the eyedropper, then paint over the text — it fills with the exact colour you picked.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 1 — Pick background colour</p>
              <div className="flex gap-2">
                <Button variant={editor.eyedropperActive ? 'default' : 'outline'}
                  className="flex-1 h-10 gap-2 text-sm"
                  onClick={() => { editor.setEyedropperActive(v => !v); editor.setRetouchActive(false); }}>
                  <Pipette className="w-4 h-4" />
                  {editor.eyedropperActive ? 'Click on image…' : 'Eyedropper'}
                </Button>
                <div className="w-10 h-10 rounded-md border-2 flex items-center justify-center shrink-0 cursor-pointer"
                  style={{ backgroundColor: editor.fillColor ?? 'transparent', borderColor: editor.fillColor ?? 'hsl(var(--border))' }}
                  onClick={() => editor.setFillColor(null)}>
                  {!editor.fillColor && <span className="text-[10px] text-muted-foreground leading-none text-center">Auto</span>}
                </div>
              </div>
              {editor.fillColor
                ? <p className="text-[11px] text-muted-foreground">Locked to <span className="font-mono">{editor.fillColor}</span> — click the swatch to reset to Auto</p>
                : <p className="text-[11px] text-muted-foreground">Auto mode samples far outside the brush. Use Eyedropper for best results.</p>
              }
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 2 — Paint over text</p>
              <Button variant={editor.retouchActive ? 'default' : 'outline'}
                className="w-full h-10 gap-2 font-medium"
                onClick={() => { editor.setRetouchActive(v => !v); editor.setEyedropperActive(false); }}>
                <Eraser className="w-4 h-4" />
                {editor.retouchActive ? 'Exit Paint Mode' : 'Activate Paint Brush'}
              </Button>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Brush Size</span>
                  <span className="text-muted-foreground">{editor.brushSize}px</span>
                </div>
                <Slider value={[editor.brushSize]} min={5} max={200} step={1}
                  onValueChange={([v]) => editor.setBrushSize(v)} />
              </div>
            </div>

            <div className="h-px bg-border" />

            <Button variant="outline" className="w-full h-9 gap-2 text-sm"
              onClick={() => (editor as any)._handleUndo?.()}>
              <Undo2 className="w-4 h-4" />
              Undo Last Stroke
            </Button>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-1">
              <p className="text-xs text-primary font-medium">Workflow tip</p>
              <p className="text-xs text-muted-foreground">Eyedropper on background → Paint over text → switch to Text tab → add new text on top.</p>
            </div>
          </TabsContent>

          {/* ── LAYOUT ── (mirrors Lumina's Layout tab exactly) */}
          <TabsContent value="layout" className="space-y-8 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transform</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-12"
                  onClick={() => editor.setTransform(t => ({ ...t, flipH: !t.flipH }))}>
                  <FlipHorizontal className="w-4 h-4 mr-2" /> Flip H
                </Button>
                <Button variant="outline" className="h-12"
                  onClick={() => editor.setTransform(t => ({ ...t, flipV: !t.flipV }))}>
                  <FlipVertical className="w-4 h-4 mr-2" /> Flip V
                </Button>
                <Button variant="outline" className="h-12"
                  onClick={() => editor.setTransform(t => ({ ...t, rotate: t.rotate - 90 }))}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Left
                </Button>
                <Button variant="outline" className="h-12"
                  onClick={() => editor.setTransform(t => ({ ...t, rotate: t.rotate + 90 }))}>
                  <RotateCw className="w-4 h-4 mr-2" /> Right
                </Button>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resize</h3>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs text-muted-foreground">Width</label>
                  <Input value={editor.resizeWidth}
                    onChange={e => editor.updateResize(e.target.value, editor.resizeHeight, true)}
                    className="h-9 bg-background" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs text-muted-foreground">Height</label>
                  <Input value={editor.resizeHeight}
                    onChange={e => editor.updateResize(editor.resizeWidth, e.target.value, false)}
                    className="h-9 bg-background" />
                </div>
              </div>
              <Button variant="outline" className={`w-full h-9 text-xs justify-start ${editor.aspectLock ? 'border-primary text-primary' : ''}`}
                onClick={() => editor.setAspectLock(!editor.aspectLock)}>
                {editor.aspectLock && <Check className="w-3 h-3 mr-2" />} Lock Aspect Ratio
              </Button>
              <div className="space-y-1.5 pt-2">
                <label className="text-xs text-muted-foreground">Presets</label>
                <Select onValueChange={editor.applyPresetFormat}>
                  <SelectTrigger className="h-9 bg-background"><SelectValue placeholder="Fit to…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ig-post">Instagram Post (1080×1080)</SelectItem>
                    <SelectItem value="ig-story">Instagram Story (1080×1920)</SelectItem>
                    <SelectItem value="tw-post">Twitter Post (1200×628)</SelectItem>
                    <SelectItem value="hd">HD Screen (1920×1080)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </aside>
  );
}
