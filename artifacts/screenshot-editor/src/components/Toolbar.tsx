import React from 'react';
import { MousePointer2, ArrowUpRight, Square, Type, Pen, Eraser, Crop, Undo, Redo, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EditorContextType } from '../hooks/use-editor';

type ToolbarProps = {
  editor: EditorContextType;
  onDownload: () => void;
  onCopy: () => void;
};

export function Toolbar({ editor, onDownload, onCopy }: ToolbarProps) {
  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'arrow', icon: ArrowUpRight, label: 'Arrow' },
    { id: 'rect', icon: Square, label: 'Rectangle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'blur', icon: Eraser, label: 'Blur' },
    { id: 'crop', icon: Crop, label: 'Crop' },
  ] as const;

  return (
    <div className="flex flex-col gap-4 p-2 bg-sidebar border-r border-sidebar-border w-16 items-center py-6">
      <div className="flex flex-col gap-2 w-full">
        {tools.map((tool) => (
          <Tooltip key={tool.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={editor.activeTool === tool.id ? 'default' : 'ghost'}
                size="icon"
                className="w-10 h-10 rounded-xl"
                onClick={() => editor.setActiveTool(tool.id)}
              >
                <tool.icon className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-semibold">
              {tool.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-2 w-full">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl"
              onClick={editor.undo}
              disabled={!editor.canUndo}
            >
              <Undo className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl"
              onClick={editor.redo}
              disabled={!editor.canRedo}
            >
              <Redo className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Redo (Ctrl+Shift+Z)</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-8 h-px bg-sidebar-border my-2" />

      <div className="flex flex-col gap-2 w-full">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl hover:bg-primary/10 hover:text-primary"
              onClick={onCopy}
            >
              <Copy className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Copy to Clipboard</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="w-10 h-10 rounded-xl shadow-lg"
              onClick={onDownload}
            >
              <Download className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Download PNG</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
