import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Type, Pipette,
  ScanSearch, Download, Eraser, ChevronDown,
  Sparkles, Zap, Shield, ArrowRight, UploadCloud,
  Layers, Brain, Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onFileSelected: (file: File) => void;
}

const FAQ = [
  {
    q: 'What image formats are supported?',
    a: 'FlowNote accepts JPG, PNG, WEBP, and GIF files. You can export your edited screenshot as JPG, PNG, or WEBP.',
  },
  {
    q: 'Are my screenshots uploaded to a server?',
    a: 'No. Everything happens entirely in your browser. Your screenshots never leave your device — no uploads, no accounts, no storage.',
  },
  {
    q: "How do I remove text that's already in my screenshot?",
    a: 'Open the Retouch tab. Use the Eyedropper to sample your background colour, then activate the Paint Brush and paint over the text. It fills with the exact colour you sampled. Use Undo if needed.',
  },
  {
    q: 'How does the Font Analyzer work?',
    a: 'Click "Analyze from image" in the Text tab, then click on any text in your screenshot. FlowNote samples the pixel region, measures stroke width, ink density, and serif characteristics, then scores all 21 built-in fonts and shows the top 3 matches with confidence percentages.',
  },
  {
    q: 'Can I add multiple text layers?',
    a: 'Yes. Click "Add Text" as many times as you like. Each layer can have its own font, size, colour, opacity, and position. Drag layers freely on the canvas.',
  },
  {
    q: 'Can I pick a colour from the image for my text?',
    a: 'Yes. Select a text layer, then click "Pick from image" in the Color section. Your cursor becomes a crosshair — click anywhere on the screenshot to sample that exact colour.',
  },
  {
    q: 'Does FlowNote work offline?',
    a: 'Yes. Once the page is loaded, all editing features work without an internet connection because everything runs locally in your browser.',
  },
];

const FEATURES = [
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: 'Smart Adjustments',
    desc: 'Fine-tune brightness, contrast, saturation, hue, and blur. Apply one-click presets like Vivid, Matte, Noir, Vintage, and more.',
  },
  {
    icon: <Type className="w-5 h-5" />,
    title: 'Rich Text Layers',
    desc: '21 fonts across 5 categories, 18 style templates, per-layer opacity and alignment. Drag layers anywhere on the canvas.',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'Font Analyzer',
    desc: 'Click on any text in your screenshot. FlowNote detects stroke width, serifs, and ink density to suggest the 3 best matching fonts.',
  },
  {
    icon: <Pipette className="w-5 h-5" />,
    title: 'Color Eyedropper',
    desc: 'Sample any pixel from your screenshot to use as a text colour or retouch fill. Pixel-perfect colour matching, every time.',
  },
  {
    icon: <Eraser className="w-5 h-5" />,
    title: 'Smart Retouch',
    desc: 'Paint over existing text with a smart fill brush. Sample the background first for a seamless result, or let Auto mode handle it.',
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: 'Instant Export',
    desc: 'Download as JPG, PNG, or WEBP. Resize to Instagram, Twitter, HD, or custom dimensions before exporting.',
  },
];

const STATS = [
  { value: '21', label: 'Fonts' },
  { value: '18', label: 'Templates' },
  { value: '10', label: 'Presets' },
  { value: '100%', label: 'Private' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-white/[0.03] transition-colors">
        <span className="font-medium text-base leading-snug text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}>
            <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-white/[0.06] pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LandingPage({ onFileSelected }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) onFileSelected(file);
  }, [onFileSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  }, [onFileSelected]);

  const NAV_LINKS = [
    { label: 'Features', onClick: () => scrollTo(featuresRef) },
    { label: 'FAQ', onClick: () => scrollTo(faqRef) },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange} />

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-50 fn-glass border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={l.onClick}
                className="text-sm text-muted-foreground hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
            <UploadCloud className="w-4 h-4" /> Open Screenshot
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-28 text-center relative overflow-hidden"
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleFileDrop}>

        {/* Ambient glow circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.4) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.5) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.4) 0%, transparent 70%)' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 max-w-3xl w-full space-y-8">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#a5b4fc' }}>
            <Sparkles className="w-3.5 h-3.5" />
            100% free · No sign-in · Runs in your browser
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Capture.<br />
              <span className="fn-gradient-text">Organize. Flow.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
              A premium screenshot editor with AI-powered tools. Annotate, retouch, and export your screenshots in seconds — entirely in your browser.
            </p>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                className="rounded-xl px-5 py-3 text-center fn-glass">
                <p className="text-2xl font-bold fn-gradient-text">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Drop zone */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-3xl p-14 cursor-pointer transition-all duration-300 group ${dragging ? 'scale-[1.01]' : ''}`}
            style={{
              background: dragging
                ? 'rgba(79,70,229,0.15)'
                : 'rgba(17,24,39,0.5)',
              border: dragging
                ? '2px dashed rgba(79,70,229,0.8)'
                : '2px dashed rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
              boxShadow: dragging ? '0 0 40px rgba(79,70,229,0.3)' : 'none',
            }}>
            <div className={`w-16 h-16 rounded-2xl fn-gradient-bg flex items-center justify-center mx-auto mb-5 transition-transform duration-300 ${dragging ? 'scale-110' : 'group-hover:scale-105'}`}
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              {dragging ? 'Drop to start editing' : 'Drop your screenshot here'}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">or click to browse files</p>
            <div className="flex justify-center gap-2">
              {['JPG', 'PNG', 'WEBP', 'GIF'].map(f => (
                <span key={f} className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.25)', color: '#a5b4fc' }}>
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          <button onClick={() => scrollTo(featuresRef)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mx-auto group">
            Explore all features
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section ref={featuresRef} className="py-28 px-6 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.5) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#a5b4fc' }}>
              <Zap className="w-3.5 h-3.5" /> Powerful tools
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Everything you need,<br /><span className="fn-gradient-text">zero friction</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base font-light">
              From basic adjustments to advanced font detection — all tools load instantly in your browser, no install required.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-2xl p-6 space-y-4 fn-card-glow transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(17,24,39,0.6)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                }}>
                <div className="w-10 h-10 rounded-xl fn-gradient-bg flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }}>
                  <span className="text-white">{f.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white mb-1.5">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy banner ── */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(124,58,237,0.12) 100%)',
              border: '1px solid rgba(79,70,229,0.25)',
              backdropFilter: 'blur(16px)',
            }}>
            <div className="w-14 h-14 rounded-2xl fn-gradient-bg flex items-center justify-center shrink-0"
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1.5 text-white">Your screenshots never leave your device</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                FlowNote runs entirely in your browser using the Canvas API. No files are uploaded to any server.
                No analytics. No tracking. Your screenshots stay private — always.
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 fn-gradient-bg text-white text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-4 h-4" /> Try it now
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="py-28 px-6 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-15"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.6) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-14 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Frequently asked <span className="fn-gradient-text">questions</span>
            </h2>
            <p className="text-muted-foreground font-light">Everything you need to know about FlowNote.</p>
          </div>
          <div className="space-y-3">
            {FAQ.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,16,32,0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
                <div className="w-7 h-7 rounded-lg fn-gradient-bg flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="fn-gradient-text">FlowNote</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                A premium, privacy-first screenshot editor that runs entirely in your browser.
              </p>
              <p className="text-xs" style={{ color: '#a5b4fc' }}>Capture. Organize. Flow.</p>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Product</p>
                <button onClick={() => scrollTo(featuresRef)} className="block text-muted-foreground hover:text-white transition-colors">Features</button>
                <button onClick={() => scrollTo(faqRef)} className="block text-muted-foreground hover:text-white transition-colors">FAQ</button>
                <button onClick={() => fileInputRef.current?.click()} className="block text-muted-foreground hover:text-white transition-colors">Open Screenshot</button>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Tools</p>
                {['Smart Adjustments', 'Rich Text Layers', 'Font Analyzer', 'Smart Retouch', 'Instant Export'].map(t => (
                  <p key={t} className="text-muted-foreground text-sm">{t}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p>© {new Date().getFullYear()} FlowNote. All rights reserved.</p>
            <p className="text-xs">Built with React · Runs 100% in your browser · No data collected</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
