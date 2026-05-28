import React from 'react';
import { EditorContextType } from '../hooks/use-editor';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayersPanel } from './LayersPanel';

const COLORS = [
  '#ffffff', '#000000', '#ff0055', '#00ffaa', '#00aaff', '#ffaa00', '#aa00ff'
];

const GRADIENTS = [
  'linear-gradient(to right, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
];

export function Sidebar({ editor }: { editor: EditorContextType }) {
  return (
    <div className="w-72 bg-sidebar border-l border-sidebar-border flex flex-col h-full shrink-0">
      <ScrollArea className="flex-1">
        <div className="p-6 flex flex-col gap-8">
          {/* Tool Settings */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm tracking-tight">Tool Settings</h3>
            
            <div className="flex flex-col gap-3">
              <Label className="text-xs text-muted-foreground">Color</Label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(color => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${editor.currentColor === color ? 'border-primary' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => editor.setCurrentColor(color)}
                  />
                ))}
                <div className="w-px h-6 bg-border mx-1" />
                <input
                  type="color"
                  value={editor.currentColor}
                  onChange={(e) => editor.setCurrentColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer p-0 border-0 overflow-hidden"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Label className="text-xs text-muted-foreground">Size / Stroke</Label>
                <span className="text-xs font-mono">{editor.currentSize}px</span>
              </div>
              <Slider
                value={[editor.currentSize]}
                onValueChange={([v]) => editor.setCurrentSize(v)}
                min={1}
                max={40}
                step={1}
              />
            </div>
          </div>

          <div className="w-full h-px bg-sidebar-border" />

          {/* Background Settings */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm tracking-tight">Frame</h3>
            
            <div className="flex flex-col gap-3">
              <Label className="text-xs text-muted-foreground">Padding</Label>
              <Slider
                value={[editor.background.padding]}
                onValueChange={([padding]) => editor.setBackground(prev => ({ ...prev, padding }))}
                min={0}
                max={128}
                step={8}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-xs text-muted-foreground">Gradients</Label>
              <div className="grid grid-cols-5 gap-2">
                <button
                  className={`w-8 h-8 rounded-md border-2 ${editor.background.type === 'transparent' ? 'border-primary' : 'border-transparent'} flex items-center justify-center`}
                  onClick={() => editor.setBackground(prev => ({ ...prev, type: 'transparent' }))}
                >
                  <div className="w-full h-full rounded-sm opacity-50" style={{ backgroundImage: 'conic-gradient(#ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%, transparent)' }} />
                </button>
                {GRADIENTS.map(gradient => (
                  <button
                    key={gradient}
                    className={`w-8 h-8 rounded-md border-2 transition-transform hover:scale-110 ${editor.background.gradient === gradient && editor.background.type === 'gradient' ? 'border-primary' : 'border-transparent'}`}
                    style={{ background: gradient }}
                    onClick={() => editor.setBackground(prev => ({ ...prev, type: 'gradient', gradient }))}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <Label className="text-xs cursor-pointer" htmlFor="browser-chrome">Browser Chrome</Label>
              <Switch
                id="browser-chrome"
                checked={editor.background.browserChrome}
                onCheckedChange={(browserChrome) => editor.setBackground(prev => ({ ...prev, browserChrome }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs cursor-pointer" htmlFor="rounded">Rounded Corners</Label>
              <Switch
                id="rounded"
                checked={editor.background.roundedCorners}
                onCheckedChange={(roundedCorners) => editor.setBackground(prev => ({ ...prev, roundedCorners }))}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      <LayersPanel editor={editor} />
    </div>
  );
}
