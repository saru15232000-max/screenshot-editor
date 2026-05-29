import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  UploadCloud, Layers, Zap, Shield, ChevronRight, ArrowRight,
  Check, Star,
} from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface SEOPageProps {
  onFileSelected: (file: File) => void;
  h1: string;
  tagline: string;
  intro: string;
  ctaLabel?: string;
  features: FeatureItem[];
  faq: FAQItem[];
  relatedLinks?: { href: string; label: string }[];
  sections?: { heading: string; body: string }[];
  keywords?: string[];
}

function FaqItem({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-white/[0.03] transition-colors">
        <span className="font-medium text-base leading-snug text-white">{q}</span>
        <ChevronRight className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-white/[0.06] pt-4">
          {a}
        </p>
      )}
    </div>
  );
}

export function SEOLandingPage({
  onFileSelected,
  h1,
  tagline,
  intro,
  ctaLabel = 'Start Editing — Free',
  features,
  faq,
  relatedLinks = [],
  sections = [],
  keywords = [],
}: SEOPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) onFileSelected(file);
  }, [onFileSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  }, [onFileSelected]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 fn-glass border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-white transition-colors">Features</button>
            <button onClick={() => faqRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-white transition-colors">FAQ</button>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
          <button onClick={() => fileInputRef.current?.click()}
            className="fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02]"
            style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
            <UploadCloud className="w-4 h-4" /> Open Screenshot
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden"
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)} onDrop={handleFileDrop}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.5) 0%, transparent 70%)' }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="relative z-10 max-w-3xl w-full space-y-7">

          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#a5b4fc' }}>
            <Zap className="w-3.5 h-3.5" /> Free · No signup · Browser-based
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
            {h1}
          </h1>
          <p className="text-lg md:text-xl fn-gradient-text font-semibold">{tagline}</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">{intro}</p>

          {/* Drop zone */}
          <div onClick={() => fileInputRef.current?.click()}
            className="relative rounded-3xl p-12 cursor-pointer transition-all duration-300"
            style={{
              background: dragging ? 'rgba(79,70,229,0.15)' : 'rgba(17,24,39,0.5)',
              border: dragging ? '2px dashed rgba(79,70,229,0.8)' : '2px dashed rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
              boxShadow: dragging ? '0 0 40px rgba(79,70,229,0.3)' : 'none',
            }}>
            <div className="w-14 h-14 rounded-2xl fn-gradient-bg flex items-center justify-center mx-auto mb-4"
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold mb-1.5 text-white">
              {dragging ? 'Drop to start editing' : 'Drop your screenshot here'}
            </h2>
            <p className="text-muted-foreground text-sm mb-5">or click to browse · JPG, PNG, WEBP, GIF</p>
            <button className="fn-gradient-bg text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02]"
              style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              {ctaLabel}
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            {['100% free forever', 'No account needed', 'Private — no uploads', 'Works offline'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-400" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content sections */}
      {sections.length > 0 && (
        <section className="py-20 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section ref={featuresRef} className="py-24 px-6 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Powerful features, <span className="fn-gradient-text">zero friction</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-light">
              Professional-grade tools that run entirely in your browser — no install, no signup.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl p-6 space-y-4 fn-card-glow transition-all duration-300"
                style={{ background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>
                <div className="w-10 h-10 rounded-xl fn-gradient-bg flex items-center justify-center text-white"
                  style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy CTA */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(124,58,237,0.12) 100%)', border: '1px solid rgba(79,70,229,0.25)', backdropFilter: 'blur(16px)' }}>
            <div className="w-14 h-14 rounded-2xl fn-gradient-bg flex items-center justify-center shrink-0"
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1.5">Private by design. Free forever.</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                FlowNote processes everything in your browser. No server uploads, no accounts, no ads. Your screenshots stay yours.
              </p>
            </div>
            <button onClick={() => fileInputRef.current?.click()}
              className="shrink-0 fn-gradient-bg text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all"
              style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-4 h-4" /> {ctaLabel}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Frequently asked <span className="fn-gradient-text">questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* Related tools / internal links */}
      {relatedLinks.length > 0 && (
        <section className="py-16 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related tools by FlowNote</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.25)', color: '#a5b4fc' }}>
                  {l.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Keywords (hidden, semantic) */}
      {keywords.length > 0 && (
        <div className="sr-only" aria-hidden="true">
          {keywords.join(', ')}
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,16,32,0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="w-6 h-6 rounded-md fn-gradient-bg flex items-center justify-center">
              <Layers className="w-3 h-3 text-white" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </Link>
          <p>© {new Date().getFullYear()} FlowNote · useflownote.online · All rights reserved.</p>
          <p className="text-xs">100% browser-based · No uploads · No tracking</p>
        </div>
      </footer>
    </div>
  );
}
