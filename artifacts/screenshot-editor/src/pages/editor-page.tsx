import React, { useCallback, useRef } from 'react';
import { useEditor } from '../hooks/use-editor';
import { Toolbar } from '../components/Toolbar';
import { Sidebar } from '../components/Sidebar';
import { CanvasWorkspace } from '../components/CanvasWorkspace';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { ScreenShare, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditorPage() {
  const editor = useEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = useCallback(async () => {
    const el = document.getElementById('export-container');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'screenshot-edited.png';
      a.click();
      toast.success('Downloaded successfully!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to export image.');
    }
  }, []);

  const handleCopy = useCallback(async () => {
    const el = document.getElementById('export-container');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          toast.success('Copied to clipboard!');
        }
      }, 'image/png');
    } catch (e) {
      console.error(e);
      toast.error('Failed to copy to clipboard.');
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden"
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith('image/')) editor.handleImageUpload(file);
      }}
    >
      {/* Top Bar — matches Lumina exactly */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-xl">
          <ScreenShare className="w-6 h-6" /> Snapmark
        </div>

        {editor.image && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.reset()}
              data-testid="button-new-image"
            >
              New Screenshot
            </Button>
            <div className="flex items-center gap-2 bg-background rounded-md border border-border p-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-2 text-sm"
                onClick={handleCopy}
                data-testid="button-copy"
              >
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <div className="w-px h-4 bg-border mx-1" />
              <Button
                size="sm"
                className="h-8 font-semibold gap-2"
                onClick={handleDownload}
                data-testid="button-download"
              >
                <Download className="w-4 h-4" /> Download
              </Button>
            </div>
          </div>
        )}
      </header>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) editor.handleImageUpload(file);
        }}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {editor.image && (
          <Toolbar editor={editor} />
        )}
        <CanvasWorkspace editor={editor} fileInputRef={fileInputRef} />
        {editor.image && (
          <Sidebar editor={editor} />
        )}
      </div>
    </div>
  );
}
