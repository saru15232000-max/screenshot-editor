import React, { useCallback } from 'react';
import { useEditor } from '../hooks/use-editor';
import { Toolbar } from '../components/Toolbar';
import { Sidebar } from '../components/Sidebar';
import { CanvasWorkspace } from '../components/CanvasWorkspace';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

export default function EditorPage() {
  const editor = useEditor();

  const handleDownload = useCallback(async () => {
    const el = document.getElementById('export-container');
    if (!el) return;
    
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 2,
      });
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
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 2,
      });
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          toast.success('Copied to clipboard!');
        }
      }, 'image/png');
    } catch (e) {
      console.error(e);
      toast.error('Failed to copy to clipboard.');
    }
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Toolbar editor={editor} onDownload={handleDownload} onCopy={handleCopy} />
      <CanvasWorkspace editor={editor} />
      <Sidebar editor={editor} />
    </div>
  );
}
