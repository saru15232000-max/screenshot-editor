import React from 'react';
import { Layers, Type } from 'lucide-react';
import { EditorContextType } from '../hooks/use-editor';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function LayersPanel({ editor }: { editor: EditorContextType }) {
  return (
    <div className="flex flex-col h-1/2 border-t border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border bg-sidebar/50">
        <h3 className="font-medium text-sm text-sidebar-foreground flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Layers
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 flex flex-col gap-1">
          {editor.annotations.map((ann) => (
            <Button
              key={ann.id}
              variant={editor.selectedId === ann.id ? "secondary" : "ghost"}
              className="w-full justify-start text-xs h-8 px-2"
              onClick={() => editor.setSelectedId(ann.id)}
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: ann.color }}
                />
                <Type className="w-3 h-3 shrink-0 text-muted-foreground" />
                <span className="flex-1 text-left truncate">
                  {ann.text ? ann.text.slice(0, 20) : 'Text layer'}
                </span>
              </div>
            </Button>
          ))}
          {editor.annotations.length === 0 && (
            <div className="text-xs text-muted-foreground text-center py-4">
              No layers
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
