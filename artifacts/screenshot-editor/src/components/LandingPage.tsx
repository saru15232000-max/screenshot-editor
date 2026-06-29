import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Type, Pipette,
  ScanSearch, Download, Eraser, ChevronDown,
  Sparkles, Zap, Shield, ArrowRight, UploadCloud,
  Layers, Brain, Palette, Menu, X,
  MousePointer, Crop, PenTool, Square, Slash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onFileSelected: (file: File) => void;
}

const FAQ = [
  {
    q: 'Is my screenshot stored anywhere?',
    a: 'No. FlowNote processes everything entirely inside your browser using the HTML5 Canvas API. Your screenshot is never uploaded to any server — it never leaves your device. There is no database, no cloud storage, and no third party that can access your images.',
  },
  {
    q: 'What file formats are supported?',
    a: 'FlowNote accepts JPG, PNG, WEBP, and GIF files. You can export your edited screenshot as JPG, PNG, or WEBP.',
  },
  {
    q: 'Is this free to use?',
    a: 'Yes, FlowNote is completely free. There is no subscription, no premium tier, no watermark, and no sign-up required. All features are available to every visitor with no limitations.',
  },
  {
    q: 'Can I use FlowNote on mobile?',
    a: 'Yes. FlowNote is fully responsive and works on smartphones and tablets. You can open a screenshot from your camera roll, edit it directly in your mobile browser, and download the result — no app installation needed.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'FlowNote has no enforced file size limit. Very large images (above 20 MB or larger than 8000×8000 pixels) may be slow to process depending on your device\'s RAM and browser capabilities. For best performance, images under 10 MB work smoothly on all devices.',
  },
  {
    q: 'How do I remove text that\'s already in my screenshot?',
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

const EDITING_TOOLS = [
  { icon: <Square className="w-4 h-4" />, name: 'Annotate', desc: 'Draw boxes, circles, and callout shapes to highlight areas of interest.' },
  { icon: <Slash className="w-4 h-4" />, name: 'Arrows', desc: 'Add directional arrows to point at specific elements in your screenshot.' },
  { icon: <Type className="w-4 h-4" />, name: 'Text Overlay', desc: 'Place styled text anywhere — 21 fonts, 18 templates, full colour control.' },
  { icon: <Wand2 className="w-4 h-4" />, name: 'Blur / Redact', desc: 'Blur or paint over sensitive data like names, emails, or passwords.' },
  { icon: <Crop className="w-4 h-4" />, name: 'Crop & Resize', desc: 'Crop to any region and resize to standard or custom dimensions for export.' },
  { icon: <Palette className="w-4 h-4" />, name: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation, hue, and one-click filter presets.' },
  { icon: <Pipette className="w-4 h-4" />, name: 'Color Eyedropper', desc: 'Sample any pixel colour from your image for perfect matching.' },
  { icon: <Eraser className="w-4 h-4" />, name: 'Smart Retouch', desc: 'Paint over unwanted content with a background-matched fill brush.' },
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
      style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-black/[0.03] transition-colors">
        <span className="font-medium text-base leading-snug text-foreground">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}>
            <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-black/[0.06] pt-4">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    { label: 'Home', onClick: () => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Features', onClick: () => scrollTo(featuresRef) },
    { label: 'About', href: '/about' },
    { label: 'FAQ', onClick: () => scrollTo(faqRef) },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-of-service' },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange} />

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-50 fn-glass border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              l.href ? (
                <a key={l.label} href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </a>
              ) : (
                <button key={l.label} onClick={l.onClick}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </button>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">Open Screenshot</span>
              <span className="sm:hidden">Open</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-black/[0.06] transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-black/[0.06]"
              style={{ background: 'rgba(248,249,252,0.98)', backdropFilter: 'blur(20px)' }}>
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(l => (
                  l.href ? (
                    <a key={l.label} href={l.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-black/[0.05] last:border-0">
                      {l.label}
                    </a>
                  ) : (
                    <button key={l.label} onClick={l.onClick}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-black/[0.05] last:border-0 text-left">
                      {l.label}
                    </button>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-28 text-center relative overflow-hidden"
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleFileDrop}>

        {/* Ambient glow circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.25) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.25) 0%, transparent 70%)' }} />
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
                ? 'rgba(79,70,229,0.08)'
                : 'rgba(248,249,252,0.8)',
              border: dragging
                ? '2px dashed rgba(79,70,229,0.8)'
                : '2px dashed rgba(0,0,0,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: dragging ? '0 0 40px rgba(79,70,229,0.15)' : 'none',
            }}>
            <div className={`w-16 h-16 rounded-2xl fn-gradient-bg flex items-center justify-center mx-auto mb-5 transition-transform duration-300 ${dragging ? 'scale-110' : 'group-hover:scale-105'}`}
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">
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
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto group">
            Explore all features
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section ref={featuresRef} id="features" className="py-28 px-6 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.4) 0%, transparent 70%)' }} />
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
                  background: 'rgba(248,249,252,0.9)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  backdropFilter: 'blur(12px)',
                }}>
                <div className="w-10 h-10 rounded-xl fn-gradient-bg flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }}>
                  <span className="text-white">{f.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Editing tools quick list */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-center text-foreground mb-8">
              All editing tools at a glance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EDITING_TOOLS.map((t, i) => (
                <motion.div key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="rounded-xl p-4 flex gap-3 items-start"
                  style={{ background: 'rgba(79,70,229,0.05)', border: '1px solid rgba(79,70,229,0.12)' }}>
                  <div className="w-7 h-7 rounded-lg fn-gradient-bg flex items-center justify-center shrink-0 text-white mt-0.5"
                    style={{ boxShadow: '0 2px 8px rgba(79,70,229,0.3)' }}>
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{t.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About / How it works ── */}
      <section ref={aboutRef} id="about" className="py-28 px-6 relative"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.5)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="text-center mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#a5b4fc' }}>
                <MousePointer className="w-3.5 h-3.5" /> How it works
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                What is <span className="fn-gradient-text">FlowNote</span>?
              </h2>
            </div>

            {/* Written description */}
            <div className="prose prose-neutral max-w-none mb-14 space-y-4 text-muted-foreground leading-relaxed text-base">
              <p>
                FlowNote is a free, professional-grade screenshot editor that runs entirely inside your web browser.
                It is designed for anyone who needs to quickly annotate, redact, or polish a screenshot —
                developers filing bug reports, designers sharing feedback, writers creating tutorials, support agents
                clarifying issues, or anyone who just wants to draw an arrow on an image without installing a desktop application.
              </p>
              <p>
                Unlike most online image editors, FlowNote never uploads your screenshots to a server.
                Every operation — adjustments, text layers, blur, retouch, export — happens locally on your device
                using the browser's built-in HTML5 Canvas API. This means your images stay completely private,
                the editor works offline once loaded, and there are no file size quotas enforced by a remote server.
              </p>
              <p>
                FlowNote is built around a simple belief: powerful creative tools should be accessible to everyone,
                without subscriptions, without accounts, and without compromising your privacy. It is free forever,
                works on any operating system with a modern browser, and requires zero setup. Drop your screenshot in,
                edit it, download it — that's the entire workflow.
              </p>
            </div>

            {/* Step-by-step instructions */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">How to use FlowNote — step by step</h3>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Open your screenshot',
                    desc: 'Click the "Open Screenshot" button in the top-right corner, or drag and drop an image file directly onto the upload zone. FlowNote accepts JPG, PNG, WEBP, and GIF files. Your image is loaded directly into the browser — nothing is sent to a server.',
                  },
                  {
                    step: '2',
                    title: 'Choose your editing tools',
                    desc: 'Once your screenshot loads, you will see the editing sidebar on the right. Select from five tabs: Adjust (brightness, contrast, filters), Annotate (shapes, arrows), Text (add styled text layers), Retouch (blur or paint over sensitive content), and Export (resize and download).',
                  },
                  {
                    step: '3',
                    title: 'Annotate and mark up',
                    desc: 'Use the Annotate tab to draw boxes, circles, or arrows on your screenshot. Click and drag on the canvas to create shapes. Change colours, stroke widths, and fill settings in the sidebar. Use the Text tab to add labels, callouts, or numbered steps.',
                  },
                  {
                    step: '4',
                    title: 'Blur or redact sensitive data',
                    desc: 'Switch to the Retouch tab to hide private information. Use the Eyedropper to sample a background colour, then paint over any text, names, emails, or passwords you want to remove. The Smart Fill brush blends seamlessly with the surrounding area.',
                  },
                  {
                    step: '5',
                    title: 'Download your edited screenshot',
                    desc: 'When you are satisfied, click the "Download" button at the top of the page. Choose your format (JPG, PNG, or WEBP), optionally resize to a preset (Instagram, Twitter, HD) or enter custom pixel dimensions, then save the file to your device.',
                  },
                ].map((item, i) => (
                  <motion.div key={item.step}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex gap-5 rounded-2xl p-6"
                    style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                    <div className="w-9 h-9 rounded-xl fn-gradient-bg flex items-center justify-center shrink-0 text-white font-bold text-sm"
                      style={{ boxShadow: '0 4px 14px rgba(79,70,229,0.35)' }}>
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1.5">{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="fn-gradient-bg text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] mx-auto"
                style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
                <UploadCloud className="w-5 h-5" /> Start Editing Now — It's Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Privacy banner ── */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.07) 0%, rgba(124,58,237,0.07) 100%)',
              border: '1px solid rgba(79,70,229,0.2)',
              backdropFilter: 'blur(16px)',
            }}>
            <div className="w-14 h-14 rounded-2xl fn-gradient-bg flex items-center justify-center shrink-0"
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1.5 text-foreground">Your screenshots never leave your device</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                FlowNote runs entirely in your browser using the Canvas API. No files are uploaded to any server.
                No analytics. No tracking. Your screenshots stay private — always.
                <a href="/privacy-policy" className="ml-1 text-indigo-500 hover:underline">Read our Privacy Policy →</a>
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
      <section ref={faqRef} id="faq" className="py-28 px-6 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)' }} />
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
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.9)' }}>
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Product</p>
                <button onClick={() => scrollTo(featuresRef)} className="block text-muted-foreground hover:text-foreground transition-colors">Features</button>
                <button onClick={() => scrollTo(faqRef)} className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
                <button onClick={() => fileInputRef.current?.click()} className="block text-muted-foreground hover:text-foreground transition-colors">Open Screenshot</button>
                <a href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Tools</p>
                {[
                  { href: '/free-screenshot-editor-online', label: 'Free Editor' },
                  { href: '/annotate-screenshot-online', label: 'Annotate' },
                  { href: '/blur-screenshot-online', label: 'Blur' },
                  { href: '/add-text-to-screenshot-online', label: 'Add Text' },
                  { href: '/ai-screenshot-editor', label: 'AI Editor' },
                ].map(t => (
                  <a key={t.href} href={t.href} className="block text-muted-foreground hover:text-foreground transition-colors text-sm">{t.label}</a>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Guides</p>
                <a href="/guides" className="block text-muted-foreground hover:text-foreground transition-colors">Learning Center</a>
                <a href="/guides/how-to-edit-screenshots" className="block text-muted-foreground hover:text-foreground transition-colors">Edit Screenshots</a>
                <a href="/guides/how-to-annotate-screenshots" className="block text-muted-foreground hover:text-foreground transition-colors">Annotate Screenshots</a>
                <a href="/guides/how-to-blur-sensitive-information" className="block text-muted-foreground hover:text-foreground transition-colors">Blur Sensitive Info</a>
                <a href="/guides/best-screenshot-tools" className="block text-muted-foreground hover:text-foreground transition-colors">Best Tools 2025</a>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Legal</p>
                <a href="/privacy-policy" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="block text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
                <a href="/cookie-policy" className="block text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
                <a href="/disclaimer" className="block text-muted-foreground hover:text-foreground transition-colors">Disclaimer</a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <p>© {new Date().getFullYear()} FlowNote. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="/about" className="hover:text-foreground transition-colors">About</a>
              <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-xs">Built with React · Runs 100% in your browser · No data collected</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
