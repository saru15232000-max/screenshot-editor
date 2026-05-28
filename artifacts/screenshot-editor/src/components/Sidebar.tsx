import React from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const COLORS = [
  '#ffffff', '#000000', '#ff0055', '#00cc88', '#0088ff', '#ffaa00', '#cc44ff',
  '#ff4444', '#44ff88', '#44aaff', '#ffdd44',
];

const GRADIENTS = [
  'linear-gradient(to right, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
];

export function Sidebar({ editor }: { editor: EditorContextType }) {
  const selectedAnnotation = editor.annotations.find(a => a.id === editor.selectedAnnotationId);

  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col shrink-0 z-10 shadow-2xl">
      <Tabs defaultValue="annotate" className="flex-1 flex flex-col">
        <TabsList className="w-full h-12 p-0 bg-transparent border-b border-border rounded-none shrink-0 flex">
          {[
            { value: 'annotate', label: 'Annotate' },
            { value: 'frame',    label: 'Frame'    },
            { value: 'layers',   label: 'Layers'   },
          ].map(t => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="flex-1 rounded-none h-full text-xs data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 overflow-y-auto p-5">

          {/* ── Annotate ── */}
          <TabsContent value="annotate" className="space-y-6 mt-0">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Color</h3>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(color => (
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
                  <input
                    type="color"
                    value={editor.currentColor}
                    onChange={e => editor.setCurrentColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                </label>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-medium">Stroke Size</span>
                <span className="text-muted-foreground">{editor.currentSize}px</span>
              </div>
              <Slider
                value={[editor.currentSize]}
                onValueChange={([v]) => editor.setCurrentSize(v)}
                min={1}
                max={40}
                step={1}
              />
            </div>

            {selectedAnnotation && (
              <>
                <div className="h-px bg-border" />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Selected Layer</h3>
                  <div className="flex items-center justify-between px-3 py-2 rounded-md bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedAnnotation.color }} />
                      <span className="text-sm capitalize text-primary">{selectedAnnotation.type}</span>
                      {selectedAnnotation.text && (
                        <span className="text-xs text-muted-foreground truncate max-w-[80px]">— {selectedAnnotation.text}</span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        editor.pushHistory(editor.annotations.filter(a => a.id !== editor.selectedAnnotationId));
                        editor.setSelectedAnnotationId(null);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* ── Frame ── */}
          <TabsContent value="frame" className="space-y-6 mt-0">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-medium">Padding</span>
                <span className="text-muted-foreground">{editor.background.padding}px</span>
              </div>
              <Slider
                value={[editor.background.padding]}
                onValueChange={([padding]) => editor.setBackground(prev => ({ ...prev, padding }))}
                min={0}
                max={128}
                step={8}
              />
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Background</h3>
              <div className="grid grid-cols-4 gap-2">
                <button
                  className={`h-10 rounded-lg border-2 flex items-center justify-center transition-transform hover:scale-105 ${editor.background.type === 'transparent' ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  onClick={() => editor.setBackground(prev => ({ ...prev, type: 'transparent' }))}
                  title="Transparent"
                >
                  <div className="w-full h-full rounded-md opacity-50" style={{ backgroundImage: 'conic-gradient(#555 25%, transparent 25%, transparent 50%, #555 50%, #555 75%, transparent 75%, transparent)', backgroundSize: '8px 8px' }} />
                </button>
                {GRADIENTS.map(gradient => (
                  <button
                    key={gradient}
                    className={`h-10 rounded-lg border-2 transition-transform hover:scale-105 ${editor.background.gradient === gradient && editor.background.type === 'gradient' ? 'border-primary' : 'border-transparent hover:border-border'}`}
                    style={{ background: gradient }}
                    onClick={() => editor.setBackground(prev => ({ ...prev, type: 'gradient', gradient }))}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Options</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm cursor-pointer" htmlFor="browser-chrome">Browser Chrome</Label>
                  <Switch
                    id="browser-chrome"
                    checked={editor.background.browserChrome}
                    onCheckedChange={browserChrome => editor.setBackground(prev => ({ ...prev, browserChrome }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm cursor-pointer" htmlFor="rounded">Rounded Corners</Label>
                  <Switch
                    id="rounded"
                    checked={editor.background.roundedCorners}
                    onCheckedChange={roundedCorners => editor.setBackground(prev => ({ ...prev, roundedCorners }))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Layers ── */}
          <TabsContent value="layers" className="mt-0">
            {editor.annotations.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">No layers yet. Use the annotation tools to add shapes, arrows, or text.</p>
            ) : (
              <div className="space-y-1">
                {[...editor.annotations].reverse().map((ann, i) => (
                  <div
                    key={ann.id}
                    onClick={() => editor.setSelectedAnnotationId(ann.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${editor.selectedAnnotationId === ann.id ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-background border border-border hover:border-primary/30'}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ann.color }} />
                      <span className="capitalize">{ann.type}</span>
                      {ann.text && <span className="text-xs text-muted-foreground truncate max-w-[80px]">— {ann.text}</span>}
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        editor.pushHistory(editor.annotations.filter(a => a.id !== ann.id));
                        if (editor.selectedAnnotationId === ann.id) editor.setSelectedAnnotationId(null);
                      }}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-2 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

        </div>
      </Tabs>
    </aside>
  );
}
