import React from 'react';
import { MousePointer2, ArrowUpRight, Square, Type, Pen, Eraser, Crop, Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EditorContextType } from '../hooks/use-editor';

const tools = [
  { id: 'select', icon: MousePointer2, label: 'Select (V)' },
  { id: 'arrow',  icon: ArrowUpRight,  label: 'Arrow (A)' },
  { id: 'rect',   icon: Square,        label: 'Rectangle (R)' },
  { id: 'text',   icon: Type,          label: 'Text (T)' },
  { id: 'pen',    icon: Pen,           label: 'Pen (P)' },
  { id: 'blur',   icon: Eraser,        label: 'Blur (B)' },
  { id: 'crop',   icon: Crop,          label: 'Crop (C)' },
] as const;

export function Toolbar({ editor }: { editor: EditorContextType }) {
  return (
    <div className="w-14 bg-card border-r border-border flex flex-col items-center py-3 gap-1 shrink-0 z-10">
      <div className="flex flex-col gap-1 w-full px-2">
        {tools.map((tool) => (
          <Tooltip key={tool.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={editor.activeTool === tool.id ? 'default' : 'ghost'}
                size="icon"
                className="w-10 h-10 rounded-lg"
                onClick={() => editor.setActiveTool(tool.id)}
                data-testid={`tool-${tool.id}`}
              >
                <tool.icon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs font-medium">
              {tool.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex-1" />

      <div className="w-8 h-px bg-border my-1" />

      <div className="flex flex-col gap-1 w-full px-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-lg"
              onClick={editor.undo}
              disabled={!editor.canUndo}
              data-testid="button-undo"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-lg"
              onClick={editor.redo}
              disabled={!editor.canRedo}
              data-testid="button-redo"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">Redo (Ctrl+Shift+Z)</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
