import React, { useCallback, useRef } from 'react';
import { useEditor } from '../hooks/use-editor';
import { Sidebar } from '../components/Sidebar';
import { CanvasWorkspace } from '../components/CanvasWorkspace';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { ScreenShare, Download, Copy, UploadCloud } from 'lucide-react';
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

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) editor.handleImageUpload(file);
  }, [editor]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) editor.handleImageUpload(file);
  }, [editor]);

  // ── Hidden file input (shared) ─────────────────────────────────────────────
  const fileInput = (
    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      accept="image/*"
      onChange={handleFileChange}
    />
  );

  // ── Landing screen (mirrors Lumina exactly — no header, full-screen) ────────
  if (!editor.image) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-6"
        onDragOver={e => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        {fileInput}
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 text-primary mb-12">
            <ScreenShare className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Snapmark</h1>
          </div>
          <div
            className="border-2 border-dashed border-border rounded-xl p-12 hover:border-primary hover:bg-card transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-medium mb-2">Drop your screenshot here</h3>
            <p className="text-muted-foreground mb-6">or click to browse</p>
            <div className="flex justify-center gap-2 text-xs font-medium text-muted-foreground">
              {['JPG', 'PNG', 'WEBP', 'GIF'].map(f => (
                <span key={f} className="bg-background px-2 py-1 rounded">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Editor (mirrors Lumina exactly — header + canvas + right sidebar) ───────
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden"
      onDragOver={e => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      {fileInput}

      {/* Top Bar — identical to Lumina's header */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-xl">
          <ScreenShare className="w-6 h-6" /> Snapmark
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => editor.reset()}>
            New Screenshot
          </Button>
          <div className="flex items-center gap-2 bg-background rounded-md border border-border p-1">
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" /> Copy
            </Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button size="sm" className="h-8 font-semibold gap-2" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        </div>
      </header>

      {/* Body: canvas area + right sidebar (no left toolbar — matches Lumina) */}
      <div className="flex flex-1 overflow-hidden relative">
        <CanvasWorkspace editor={editor} fileInputRef={fileInputRef} />
        <Sidebar editor={editor} />
      </div>
    </div>
  );
}
