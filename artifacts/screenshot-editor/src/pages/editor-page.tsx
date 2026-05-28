import React, { useCallback } from 'react';
import { useEditor } from '../hooks/use-editor';
import { Toolbar } from '../components/Toolbar';
import { Sidebar } from '../components/Sidebar';
import { CanvasWorkspace } from '../components/CanvasWorkspace';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { ScreenShare } from 'lucide-react';

export default function EditorPage() {
  const editor = useEditor();

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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 h-14 border-b border-sidebar-border bg-sidebar shrink-0">
        <div className="flex items-center gap-2.5">
          <ScreenShare className="w-5 h-5 text-primary" strokeWidth={2} />
          <span className="text-base font-semibold text-foreground tracking-tight">Snapmark</span>
        </div>
      </header>

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">
        <Toolbar editor={editor} onDownload={handleDownload} onCopy={handleCopy} />
        <CanvasWorkspace editor={editor} />
        <Sidebar editor={editor} />
      </div>
    </div>
  );
}
