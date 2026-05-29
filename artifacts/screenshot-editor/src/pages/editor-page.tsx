import React, { useCallback, useRef } from 'react';
import { useEditor } from '../hooks/use-editor';
import { Sidebar } from '../components/Sidebar';
import { CanvasWorkspace } from '../components/CanvasWorkspace';
import { toast } from 'sonner';
import { ScreenShare, Download, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditorPage() {
  const editor = useEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download: bake text annotations onto canvas then export (same as Lumina)
  const handleDownload = useCallback(() => {
    const canvasRef: React.RefObject<HTMLCanvasElement | null> = (editor as any)._canvasRef;
    const canvas = canvasRef?.current;
    if (!canvas || !editor.image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Bake text onto canvas
    editor.annotations.forEach(ann => {
      ctx.save();
      ctx.globalAlpha = ann.opacity / 100;
      ctx.font = `${ann.italic ? 'italic ' : ''}${ann.bold ? 'bold ' : ''}${ann.fontSize}px ${ann.fontFamily}`;
      ctx.fillStyle = ann.color;
      ctx.textAlign = ann.align;
      ctx.textBaseline = 'top';
      ctx.fillText(ann.text, ann.x, ann.y);
      ctx.restore();
    });

    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = editor.downloadFormat.split('/')[1] === 'jpeg' ? 'jpg' : editor.downloadFormat.split('/')[1];
      a.download = `screenshot-edited.${ext}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      // Redraw canvas without baked text (back to clean state)
      (editor as any)._drawFromOff?.();
      toast.success('Downloaded!');
    }, editor.downloadFormat);
  }, [editor]);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) editor.handleImageUpload(file);
  }, [editor]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) editor.handleImageUpload(file);
  }, [editor]);

  const fileInput = (
    <input type="file" ref={fileInputRef} className="hidden"
      accept="image/jpeg,image/png,image/webp,image/gif"
      onChange={handleFileChange} />
  );

  // ── Landing screen (full-screen, no header — identical to Lumina) ──────────
  if (!editor.image) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-6"
        onDragOver={e => e.preventDefault()} onDrop={handleFileDrop}>
        {fileInput}
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 text-primary mb-12">
            <ScreenShare className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">Snapmark</h1>
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-12 hover:border-primary hover:bg-card transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}>
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

  // ── Editor (header + canvas + sidebar — identical to Lumina) ─────────────
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden"
      onDragOver={e => e.preventDefault()} onDrop={handleFileDrop}>
      {fileInput}

      {/* Top bar */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-xl">
          <ScreenShare className="w-6 h-6" /> Snapmark
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden md:flex items-center gap-2">
            <span>{editor.dimensions.width} × {editor.dimensions.height}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => editor.reset()}>
            New Screenshot
          </Button>
          <div className="flex items-center gap-2 bg-background rounded-md border border-border p-1">
            <Select value={editor.downloadFormat} onValueChange={editor.setDownloadFormat}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none w-24 text-xs font-medium focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image/jpeg">JPG</SelectItem>
                <SelectItem value="image/png">PNG</SelectItem>
                <SelectItem value="image/webp">WEBP</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-4 bg-border mx-1" />
            <Button size="sm" className="h-8 font-semibold" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <CanvasWorkspace editor={editor} />
        <Sidebar editor={editor} />
      </div>
    </div>
  );
}
