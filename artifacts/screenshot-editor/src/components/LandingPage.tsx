import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScreenShare, UploadCloud, Wand2, Type, Pipette,
  ScanSearch, Download, Eraser, ChevronDown, Github,
  Twitter, Sparkles, Zap, Shield, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onFileSelected: (file: File) => void;
}

// ── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: 'What image formats are supported?',
    a: 'Snapmark accepts JPG, PNG, WEBP, and GIF files. You can export your edited screenshot as JPG, PNG, or WEBP.',
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
    a: 'Click "Analyze from image" in the Text tab, then click on any text in your screenshot. Snapmark samples the pixel region, measures stroke width, ink density, and serif characteristics, then scores all 21 built-in fonts and shows the top 3 matches with confidence percentages.',
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
    q: 'Does Snapmark work offline?',
    a: 'Yes. Once the page is loaded, all editing features work without an internet connection because everything runs locally in your browser.',
  },
];

// ── Feature cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'Adjust & Filter',
    desc: 'Fine-tune brightness, contrast, saturation, hue, and blur. Apply one-click presets like Vivid, Matte, Noir, Vintage, and more.',
  },
  {
    icon: <Type className="w-6 h-6" />,
    title: 'Text Overlays',
    desc: '21 fonts across 5 categories, 18 style templates, per-layer opacity and alignment. Drag layers anywhere on the canvas.',
  },
  {
    icon: <ScanSearch className="w-6 h-6" />,
    title: 'Font Analyzer',
    desc: 'Click on any text in your screenshot. Snapmark detects stroke width, serifs, and ink density to suggest the 3 best matching fonts.',
  },
  {
    icon: <Pipette className="w-6 h-6" />,
    title: 'Color Eyedropper',
    desc: 'Sample any pixel from your screenshot to use as a text colour or retouch fill. Pixel-perfect colour matching, every time.',
  },
  {
    icon: <Eraser className="w-6 h-6" />,
    title: 'Text Removal',
    desc: 'Paint over existing text with a smart fill brush. Sample the background first for a seamless result, or let Auto mode handle it.',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Export Anywhere',
    desc: 'Download as JPG, PNG, or WEBP. Resize to Instagram, Twitter, HD, or custom dimensions before exporting.',
  },
];

// ── Stat pills ────────────────────────────────────────────────────────────────
const STATS = [
  { value: '21', label: 'Fonts' },
  { value: '18', label: 'Templates' },
  { value: '10', label: 'Presets' },
  { value: '100%', label: 'Private' },
];

// ── FAQ item (accordion) ──────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-card/60 transition-colors gap-4">
        <span className="font-medium text-base leading-snug">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}>
            <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-border pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main landing page ─────────────────────────────────────────────────────────
export function LandingPage({ onFileSelected }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef      = useRef<HTMLDivElement>(null);

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
    { label: 'FAQ',      onClick: () => scrollTo(faqRef) },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange} />

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-primary font-bold text-xl tracking-tight">
            <ScreenShare className="w-6 h-6" />
            Snapmark
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={l.onClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => fileInputRef.current?.click()}
            className="gap-2 font-semibold">
            <UploadCloud className="w-4 h-4" /> Open Screenshot
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden"
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleFileDrop}>

        {/* background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl w-full space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            100% free · No sign-in · Runs in your browser
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Edit screenshots<br />
            <span className="text-primary">like a pro</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Adjust, annotate, retouch, and export your screenshots in seconds. 
            No uploads. No accounts. Everything runs locally in your browser.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-4">
            {STATS.map(s => (
              <div key={s.label} className="bg-card border border-border rounded-lg px-5 py-3 text-center">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-200 group
              ${dragging
                ? 'border-primary bg-primary/10 scale-[1.01]'
                : 'border-border hover:border-primary hover:bg-card'
              }`}>
            <UploadCloud className={`w-14 h-14 mx-auto mb-4 transition-colors ${dragging ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
            <h3 className="text-xl font-semibold mb-1">
              {dragging ? 'Drop it!' : 'Drop your screenshot here'}
            </h3>
            <p className="text-muted-foreground mb-5 text-sm">or click to browse files</p>
            <div className="flex justify-center gap-2">
              {['JPG', 'PNG', 'WEBP', 'GIF'].map(f => (
                <span key={f} className="bg-background border border-border text-xs font-medium px-3 py-1 rounded-full text-muted-foreground">{f}</span>
              ))}
            </div>
          </div>

          <button onClick={() => scrollTo(featuresRef)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto">
            See all features <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section ref={featuresRef} className="py-24 px-6 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
              <Zap className="w-3.5 h-3.5" /> Everything you need
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Powerful tools, zero friction</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              From basic adjustments to advanced font detection — all tools load instantly in your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-base">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy banner ── */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Your screenshots never leave your device</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Snapmark runs entirely in your browser using the Canvas API. No files are uploaded to any server.
                No analytics. No tracking. Your screenshots stay private — always.
              </p>
            </div>
            <Button onClick={() => fileInputRef.current?.click()} className="shrink-0 gap-2 font-semibold px-6">
              <UploadCloud className="w-4 h-4" /> Try it now
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="py-24 px-6 border-t border-border bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-4xl font-bold tracking-tight">Frequently asked questions</h2>
            <p className="text-muted-foreground">Everything you need to know about Snapmark.</p>
          </div>
          <div className="space-y-3">
            {FAQ.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-primary font-bold text-lg tracking-tight">
                <ScreenShare className="w-5 h-5" /> Snapmark
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                A free, privacy-first screenshot editor that runs entirely in your browser.
              </p>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Product</p>
                <button onClick={() => scrollTo(featuresRef)} className="block text-muted-foreground hover:text-foreground transition-colors">Features</button>
                <button onClick={() => scrollTo(faqRef)} className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
                <button onClick={() => fileInputRef.current?.click()} className="block text-muted-foreground hover:text-foreground transition-colors">Open Screenshot</button>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Tools</p>
                {['Adjust & Filter', 'Text Overlays', 'Font Analyzer', 'Text Removal', 'Resize & Export'].map(t => (
                  <p key={t} className="text-muted-foreground text-sm">{t}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Snapmark. All rights reserved.</p>
            <p className="text-xs">Built with React · Runs 100% in your browser · No data collected</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
