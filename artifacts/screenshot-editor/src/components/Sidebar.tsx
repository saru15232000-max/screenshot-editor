import React from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Trash2, Plus, RefreshCw, Layers, Bold, Italic,
  AlignLeft, AlignCenter, AlignRight,
  MousePointer2, ArrowUpRight, Square, Type, Pen, Eraser,
  Undo2, Redo2,
} from 'lucide-react';
import { DEFAULT_ADJUSTMENTS, ToolType } from '../types/editor';

// ── Constants (mirrors Lumina) ────────────────────────────────────────────────

const TOOLS: { id: ToolType; label: string; icon: React.ReactNode }[] = [
  { id: 'select', label: 'Select',    icon: <MousePointer2 className="w-5 h-5" /> },
  { id: 'arrow',  label: 'Arrow',     icon: <ArrowUpRight  className="w-5 h-5" /> },
  { id: 'rect',   label: 'Rectangle', icon: <Square        className="w-5 h-5" /> },
  { id: 'text',   label: 'Text',      icon: <Type          className="w-5 h-5" /> },
  { id: 'pen',    label: 'Pen',       icon: <Pen           className="w-5 h-5" /> },
  { id: 'blur',   label: 'Blur',      icon: <Eraser        className="w-5 h-5" /> },
];

const PRESETS = [
  { name: 'Original', filter: DEFAULT_ADJUSTMENTS },
  { name: 'Vivid',    filter: { ...DEFAULT_ADJUSTMENTS, contrast: 110, saturation: 130 } },
  { name: 'Fade',     filter: { ...DEFAULT_ADJUSTMENTS, contrast: 90,  brightness: 110 } },
  { name: 'Chrome',   filter: { ...DEFAULT_ADJUSTMENTS, contrast: 120, saturation: 110 } },
  { name: 'Matte',    filter: { ...DEFAULT_ADJUSTMENTS, contrast: 85,  brightness: 105, sepia: 10 } },
  { name: 'Noir',     filter: { ...DEFAULT_ADJUSTMENTS, grayscale: 100, contrast: 120 } },
  { name: 'Vintage',  filter: { ...DEFAULT_ADJUSTMENTS, sepia: 50,  contrast: 90 } },
  { name: 'Cool',     filter: { ...DEFAULT_ADJUSTMENTS, hueRotate: -15, saturation: 110 } },
  { name: 'Warm',     filter: { ...DEFAULT_ADJUSTMENTS, sepia: 20, hueRotate: 10, saturation: 110 } },
  { name: 'Dramatic', filter: { ...DEFAULT_ADJUSTMENTS, contrast: 140, brightness: 90, saturation: 120 } },
];

const FONT_FAMILIES: { label: string; value: string; group: string }[] = [
  { label: 'Inter',            value: 'Inter, sans-serif',         group: 'Sans-serif' },
  { label: 'Roboto',           value: 'Roboto, sans-serif',        group: 'Sans-serif' },
  { label: 'Open Sans',        value: '"Open Sans", sans-serif',   group: 'Sans-serif' },
  { label: 'Montserrat',       value: 'Montserrat, sans-serif',    group: 'Sans-serif' },
  { label: 'Poppins',          value: 'Poppins, sans-serif',       group: 'Sans-serif' },
  { label: 'Oswald',           value: 'Oswald, sans-serif',        group: 'Sans-serif' },
  { label: 'Georgia',          value: 'Georgia, serif',            group: 'Serif' },
  { label: 'Playfair Display', value: '"Playfair Display", serif', group: 'Serif' },
  { label: 'Merriweather',     value: 'Merriweather, serif',       group: 'Serif' },
  { label: 'Impact',           value: 'Impact, sans-serif',        group: 'Display' },
  { label: 'Bebas Neue',       value: '"Bebas Neue", sans-serif',  group: 'Display' },
  { label: 'Courier New',      value: '"Courier New", monospace',  group: 'Monospace' },
  { label: 'Roboto Mono',      value: '"Roboto Mono", monospace',  group: 'Monospace' },
  { label: 'Space Mono',       value: '"Space Mono", monospace',   group: 'Monospace' },
  { label: 'Pacifico',         value: 'Pacifico, cursive',         group: 'Script' },
  { label: 'Dancing Script',   value: '"Dancing Script", cursive', group: 'Script' },
  { label: 'Lobster',          value: 'Lobster, cursive',          group: 'Script' },
];

const TEXT_TEMPLATES = [
  { name: 'Bold Headline',  fontFamily: 'Impact, sans-serif',               fontSize: 80,  color: '#ffffff', bold: true,  italic: false, opacity: 100 },
  { name: 'Caption',        fontFamily: 'Inter, sans-serif',                 fontSize: 26,  color: '#ffffff', bold: false, italic: false, opacity: 95  },
  { name: 'Watermark',      fontFamily: 'Inter, sans-serif',                 fontSize: 40,  color: '#ffffff', bold: false, italic: true,  opacity: 30  },
  { name: 'Stamp',          fontFamily: 'Impact, sans-serif',               fontSize: 60,  color: '#ef4444', bold: true,  italic: false, opacity: 90  },
  { name: 'Neon Green',     fontFamily: 'Impact, sans-serif',               fontSize: 64,  color: '#4ade80', bold: true,  italic: false, opacity: 100 },
  { name: 'Code Tag',       fontFamily: '"Space Mono", monospace',           fontSize: 24,  color: '#4ade80', bold: false, italic: false, opacity: 95  },
  { name: 'Gold Serif',     fontFamily: '"Playfair Display", serif',         fontSize: 52,  color: '#facc15', bold: true,  italic: true,  opacity: 100 },
  { name: 'Warning',        fontFamily: 'Impact, sans-serif',               fontSize: 56,  color: '#fbbf24', bold: true,  italic: false, opacity: 100 },
];

const PRESET_COLORS = [
  '#ffffff', '#000000', '#f87171', '#fb923c', '#facc15',
  '#4ade80', '#60a5fa', '#a78bfa', '#f472b6', '#e2e8f0',
];

const GRADIENTS = [
  'linear-gradient(to right, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
];

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function Sidebar({ editor }: { editor: EditorContextType }) {
  const selectedAnnotation = editor.annotations.find(a => a.id === editor.selectedAnnotationId);

  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col shrink-0 z-10 shadow-2xl">
      <Tabs defaultValue="annotate" className="flex-1 flex flex-col">
        <TabsList className="w-full h-12 p-0 bg-transparent border-b border-border rounded-none shrink-0 flex">
          {[
            { value: 'annotate', label: 'Annotate' },
            { value: 'adjust',   label: 'Adjust'   },
            { value: 'filters',  label: 'Filters'  },
            { value: 'text',     label: 'Text'     },
            { value: 'frame',    label: 'Frame'    },
          ].map(t => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="flex-1 rounded-none h-full text-[10px] data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 overflow-y-auto p-5">

          {/* ── Annotate ── */}
          <TabsContent value="annotate" className="space-y-6 mt-0">

            {/* Tool grid — same style as Lumina's filter grid */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Tool</h3>
              <div className="grid grid-cols-2 gap-3">
                {TOOLS.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => editor.setActiveTool(tool.id)}
                    data-testid={`tool-${tool.id}`}
                    className={`border rounded-lg p-3 flex flex-col items-center gap-2 transition-colors text-sm
                      ${editor.activeTool === tool.id
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-background border-border hover:border-primary hover:text-primary'
                      }`}
                  >
                    {tool.icon}
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Undo / Redo */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2" onClick={editor.undo} disabled={!editor.canUndo}>
                <Undo2 className="w-4 h-4" /> Undo
              </Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={editor.redo} disabled={!editor.canRedo}>
                <Redo2 className="w-4 h-4" /> Redo
              </Button>
            </div>

            <div className="h-px bg-border" />

            {/* Color */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Color</h3>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: editor.currentColor === color ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      boxShadow: editor.currentColor === color ? '0 0 0 2px hsl(var(--primary)/0.3)' : 'none',
                    }}
                    onClick={() => editor.setCurrentColor(color)}
                  />
                ))}
                <label className="w-7 h-7 rounded-full border-2 border-border overflow-hidden cursor-pointer hover:scale-110 transition-transform relative" title="Custom color">
                  <input type="color" value={editor.currentColor} onChange={e => editor.setCurrentColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-full h-full" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                </label>
              </div>
            </div>

            {/* Stroke Size */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-medium">Stroke Size</span>
                <span className="text-muted-foreground">{editor.currentSize}px</span>
              </div>
              <Slider value={[editor.currentSize]} onValueChange={([v]) => editor.setCurrentSize(v)} min={1} max={40} step={1} />
            </div>

            {/* Selected annotation info */}
            {selectedAnnotation && selectedAnnotation.type !== 'text' && (
              <>
                <div className="h-px bg-border" />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Selected</h3>
                  <div className="flex items-center justify-between px-3 py-2 rounded-md bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedAnnotation.color }} />
                      <span className="text-sm capitalize text-primary">{selectedAnnotation.type}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => { editor.pushHistory(editor.annotations.filter(a => a.id !== editor.selectedAnnotationId)); editor.setSelectedAnnotationId(null); }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* ── Adjust ── */}
          <TabsContent value="adjust" className="space-y-6 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic</h3>
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => editor.setAdjustments(DEFAULT_ADJUSTMENTS)}>
                <RefreshCw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>
            <div className="space-y-4">
              {([
                { label: 'Brightness', key: 'brightness', min: 0, max: 200, unit: '%', step: 1 },
                { label: 'Contrast',   key: 'contrast',   min: 0, max: 200, unit: '%', step: 1 },
                { label: 'Saturation', key: 'saturation', min: 0, max: 200, unit: '%', step: 1 },
              ] as const).map(({ label, key, min, max, unit, step }) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{editor.adjustments[key]}{unit}</span>
                  </div>
                  <Slider value={[editor.adjustments[key]]} min={min} max={max} step={step}
                    onValueChange={([v]) => editor.setAdjustments(a => ({ ...a, [key]: v }))} />
                </div>
              ))}
            </div>
            <div className="h-px bg-border my-4" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Details</h3>
            <div className="space-y-4">
              {([
                { label: 'Temperature', key: 'sepia',     min: 0, max: 100, unit: '%',  step: 1   },
                { label: 'Hue',         key: 'hueRotate', min: 0, max: 360, unit: '°',  step: 1   },
                { label: 'Blur',        key: 'blur',      min: 0, max: 20,  unit: 'px', step: 0.5 },
              ] as const).map(({ label, key, min, max, unit, step }) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{editor.adjustments[key]}{unit}</span>
                  </div>
                  <Slider value={[editor.adjustments[key]]} min={min} max={max} step={step}
                    onValueChange={([v]) => editor.setAdjustments(a => ({ ...a, [key]: v }))} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Filters ── */}
          <TabsContent value="filters" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map((preset) => (
                <button key={preset.name} onClick={() => editor.setAdjustments(preset.filter)}
                  className="bg-background border border-border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:text-primary transition-colors text-sm">
                  <Layers className="w-5 h-5 opacity-70" />
                  {preset.name}
                </button>
              ))}
            </div>
          </TabsContent>

          {/* ── Text ── */}
          <TabsContent value="text" className="mt-0 space-y-5">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Style Templates</h3>
              <div className="grid grid-cols-2 gap-2">
                {TEXT_TEMPLATES.map(tpl => (
                  <button key={tpl.name}
                    onClick={() => { editor.setFontFamily(tpl.fontFamily); editor.setFontSize(tpl.fontSize); editor.setTextColor(tpl.color); editor.setBold(tpl.bold); editor.setItalic(tpl.italic); editor.setTextOpacity(tpl.opacity); }}
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Text Layers</h3>
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                  onClick={() => { editor.setActiveTool('text'); editor.addTextLayer(100, 100); }}>
                  <Plus className="w-3 h-3" /> Add Text
                </Button>
              </div>
              {editor.annotations.filter(a => a.type === 'text').length === 0 && (
                <p className="text-xs text-muted-foreground py-3 text-center">No text layers yet. Click "Add Text" or select the Text tool and click on the canvas.</p>
              )}
              <div className="space-y-1">
                {editor.annotations.filter(a => a.type === 'text').map(ann => (
                  <div key={ann.id} onClick={() => editor.setSelectedAnnotationId(ann.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${editor.selectedAnnotationId === ann.id ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-background border border-border hover:border-primary/30'}`}>
                    <span className="truncate max-w-[180px]">{ann.text}</span>
                    <button onClick={e => { e.stopPropagation(); editor.pushHistory(editor.annotations.filter(a => a.id !== ann.id)); if (editor.selectedAnnotationId === ann.id) editor.setSelectedAnnotationId(null); }}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-2 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {selectedAnnotation?.type === 'text' && (
              <div className="space-y-4 pt-2 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-1">Edit Selected</h3>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Content</label>
                  <textarea value={selectedAnnotation.text ?? ''} rows={3}
                    onChange={e => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, text: e.target.value } : a))}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter your text..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Font</label>
                  <Select value={selectedAnnotation.fontFamily ?? 'Inter, sans-serif'}
                    onValueChange={v => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, fontFamily: v } : a))}>
                    <SelectTrigger className="h-9 bg-background text-sm">
                      <SelectValue><span style={{ fontFamily: selectedAnnotation.fontFamily }}>{FONT_FAMILIES.find(f => f.value === selectedAnnotation.fontFamily)?.label ?? 'Inter'}</span></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {['Sans-serif', 'Serif', 'Display', 'Monospace', 'Script'].map(group => (
                        <React.Fragment key={group}>
                          <div className="px-2 py-1 text-xs text-muted-foreground font-semibold uppercase tracking-wider border-b border-border mt-1">{group}</div>
                          {FONT_FAMILIES.filter(f => f.group === group).map(f => (
                            <SelectItem key={f.value} value={f.value}><span style={{ fontFamily: f.value }}>{f.label}</span></SelectItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-muted-foreground">Size</span><span className="text-xs text-muted-foreground">{selectedAnnotation.fontSize ?? 32}px</span></div>
                  <Slider value={[selectedAnnotation.fontSize ?? 32]} min={10} max={300} step={1}
                    onValueChange={([v]) => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, fontSize: v, size: v } : a))} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Style</label>
                  <div className="flex gap-2">
                    {[
                      { icon: <Bold className="w-4 h-4" />,        active: !!selectedAnnotation.bold,           update: { bold: !selectedAnnotation.bold } },
                      { icon: <Italic className="w-4 h-4" />,      active: !!selectedAnnotation.italic,         update: { italic: !selectedAnnotation.italic } },
                      { icon: <AlignLeft className="w-4 h-4" />,   active: selectedAnnotation.align === 'left', update: { align: 'left' as const } },
                      { icon: <AlignCenter className="w-4 h-4" />, active: selectedAnnotation.align === 'center', update: { align: 'center' as const } },
                      { icon: <AlignRight className="w-4 h-4" />,  active: selectedAnnotation.align === 'right', update: { align: 'right' as const } },
                    ].map(({ icon, active, update }, i) => (
                      <Button key={i} variant={active ? 'default' : 'outline'} size="sm" className="flex-1 h-9"
                        onClick={() => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, ...update } : a))}>
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-muted-foreground">Opacity</span><span className="text-xs text-muted-foreground">{selectedAnnotation.opacity ?? 100}%</span></div>
                  <Slider value={[selectedAnnotation.opacity ?? 100]} min={10} max={100} step={1}
                    onValueChange={([v]) => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, opacity: v } : a))} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map(c => (
                      <button key={c} className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                        style={{ backgroundColor: c, borderColor: selectedAnnotation.color === c ? 'hsl(var(--primary))' : 'hsl(var(--border))', boxShadow: selectedAnnotation.color === c ? '0 0 0 2px hsl(var(--primary)/0.3)' : 'none' }}
                        onClick={() => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, color: c } : a))} />
                    ))}
                    <label className="w-7 h-7 rounded-full border-2 border-border overflow-hidden cursor-pointer hover:scale-110 transition-transform relative">
                      <input type="color" value={selectedAnnotation.color}
                        onChange={e => editor.pushHistory(editor.annotations.map(a => a.id === editor.selectedAnnotationId ? { ...a, color: e.target.value } : a))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="w-full h-full" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                    </label>
                  </div>
                </div>
                <Button variant="destructive" size="sm" className="w-full"
                  onClick={() => { editor.pushHistory(editor.annotations.filter(a => a.id !== editor.selectedAnnotationId)); editor.setSelectedAnnotationId(null); }}>
                  <Trash2 className="w-4 h-4 mr-2" /> Remove Layer
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ── Frame ── */}
          <TabsContent value="frame" className="space-y-6 mt-0">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-medium">Padding</span>
                <span className="text-muted-foreground">{editor.background.padding}px</span>
              </div>
              <Slider value={[editor.background.padding]} onValueChange={([padding]) => editor.setBackground(prev => ({ ...prev, padding }))} min={0} max={128} step={8} />
            </div>
            <div className="h-px bg-border" />
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Background</h3>
              <div className="grid grid-cols-4 gap-2">
                <button
                  className={`h-10 rounded-lg border-2 flex items-center justify-center transition-transform hover:scale-105 ${editor.background.type === 'transparent' ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  onClick={() => editor.setBackground(prev => ({ ...prev, type: 'transparent' }))} title="Transparent">
                  <div className="w-full h-full rounded-md opacity-50" style={{ backgroundImage: 'conic-gradient(#555 25%, transparent 25%, transparent 50%, #555 50%, #555 75%, transparent 75%, transparent)', backgroundSize: '8px 8px' }} />
                </button>
                {GRADIENTS.map(gradient => (
                  <button key={gradient}
                    className={`h-10 rounded-lg border-2 transition-transform hover:scale-105 ${editor.background.gradient === gradient && editor.background.type === 'gradient' ? 'border-primary' : 'border-transparent hover:border-border'}`}
                    style={{ background: gradient }}
                    onClick={() => editor.setBackground(prev => ({ ...prev, type: 'gradient', gradient }))} />
                ))}
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Options</h3>
              <div className="flex items-center justify-between">
                <Label className="text-sm cursor-pointer" htmlFor="browser-chrome">Browser Chrome</Label>
                <Switch id="browser-chrome" checked={editor.background.browserChrome}
                  onCheckedChange={browserChrome => editor.setBackground(prev => ({ ...prev, browserChrome }))} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm cursor-pointer" htmlFor="rounded">Rounded Corners</Label>
                <Switch id="rounded" checked={editor.background.roundedCorners}
                  onCheckedChange={roundedCorners => editor.setBackground(prev => ({ ...prev, roundedCorners }))} />
              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </aside>
  );
}
