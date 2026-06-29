import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Type, Brain, Pipette, Eraser, Download,
  Square, Slash, Crop, Palette, Shield, Zap, Layers,
  UploadCloud, ArrowRight, Menu, X, Check,
} from 'lucide-react';
import { useSEO, buildSoftwareAppSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';

const FEATURES = [
  {
    icon: <Square className="w-6 h-6" />,
    name: 'Annotate Screenshots',
    slug: 'annotate-screenshot-online',
    headline: 'Draw shapes, boxes, and callouts',
    desc: 'Add rectangles, circles, lines, and callout bubbles to highlight specific areas in your screenshot. Control colour, stroke width, fill opacity, and corner radius. Great for bug reports, design reviews, and tutorials.',
    bullets: ['Rectangle, ellipse, and line tools', 'Adjustable stroke and fill', 'Callout bubble shapes', 'Arrow connectors between elements'],
  },
  {
    icon: <Slash className="w-6 h-6" />,
    name: 'Add Arrows',
    slug: 'add-arrow-to-screenshot-online',
    headline: 'Point to exactly what matters',
    desc: 'Draw directional arrows on any part of your screenshot. Choose from straight, curved, or angled arrows. Adjust colour, stroke weight, and arrowhead size to match your annotation style.',
    bullets: ['Straight and angled arrows', 'Custom arrowhead styles', 'Full colour and stroke control', 'Works on any background'],
  },
  {
    icon: <Type className="w-6 h-6" />,
    name: 'Add Text to Screenshots',
    slug: 'add-text-to-screenshot-online',
    headline: '21 fonts, 18 style templates',
    desc: 'Place styled text anywhere on your screenshot. Choose from 21 font families across 5 categories (sans-serif, serif, mono, display, handwritten), apply one of 18 preset style templates, and fine-tune size, colour, opacity, and alignment. Each text layer is independently draggable.',
    bullets: ['21 font families across 5 categories', '18 one-click style templates', 'Per-layer opacity and alignment', 'AI Font Analyzer to match existing text'],
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    name: 'Blur Sensitive Data',
    slug: 'blur-screenshot-online',
    headline: 'Protect privacy before sharing',
    desc: "Apply a blur effect over any region of your screenshot to hide sensitive information — email addresses, API keys, personal names, financial data, or any content you don't want visible. Select a region and set blur intensity.",
    bullets: ['Region-select blur tool', 'Adjustable blur intensity', 'Pixel-mosaic and gaussian blur modes', 'Perfect for privacy-safe screenshots'],
  },
  {
    icon: <Eraser className="w-6 h-6" />,
    name: 'Smart Retouch',
    slug: 'screenshot-redaction-tool',
    headline: 'Seamlessly paint over unwanted content',
    desc: 'The Smart Retouch brush lets you paint over existing text or UI elements with a colour sampled directly from the screenshot background. Use the Eyedropper to pick the exact background colour, then paint — the result blends invisibly.',
    bullets: ['Background-matched fill brush', 'Eyedropper for pixel-perfect colour sampling', 'Adjustable brush size', 'Undo/redo support'],
  },
  {
    icon: <Crop className="w-6 h-6" />,
    name: 'Crop & Resize',
    slug: 'screenshot-crop-tool',
    headline: 'Trim and resize before exporting',
    desc: 'Crop your screenshot to remove unnecessary borders or focus on a specific region. Resize to exact pixel dimensions or choose from presets: Instagram square, Twitter banner, Full HD (1920×1080), and more.',
    bullets: ['Free-form crop with drag handles', 'Preset dimensions (Instagram, Twitter, HD)', 'Custom width × height input', 'Maintains pixel-perfect quality'],
  },
  {
    icon: <Palette className="w-6 h-6" />,
    name: 'Filters & Adjustments',
    slug: 'free-screenshot-editor-online',
    headline: '10 one-click presets + manual controls',
    desc: 'Fine-tune your screenshot with manual sliders for brightness, contrast, saturation, hue, and blur. Or apply one of 10 one-click filter presets: Vivid, Matte, Noir, Vintage, Cool, Warm, Fade, Sharp, Soft, and Auto-Enhance.',
    bullets: ['Brightness, contrast, saturation, hue sliders', '10 one-click filter presets', 'Non-destructive — revert at any time', 'Instant canvas preview'],
  },
  {
    icon: <Brain className="w-6 h-6" />,
    name: 'AI Font Analyzer',
    slug: 'ai-screenshot-editor',
    headline: 'Detect fonts from your screenshot',
    desc: 'Click on any text in your screenshot and FlowNote\'s Font Analyzer samples the pixel region, measures stroke width, ink density, and serif characteristics, then returns the top 3 matching fonts with confidence percentages. Instantly apply the match to a new text layer.',
    bullets: ['One-click pixel region sampling', 'Scores all 21 built-in font families', 'Returns top 3 matches with confidence %', 'Instantly apply to a new text layer'],
  },
  {
    icon: <Pipette className="w-6 h-6" />,
    name: 'Color Eyedropper',
    slug: 'free-screenshot-editor-online',
    headline: 'Sample any pixel for perfect colour matching',
    desc: 'Activate the Eyedropper, then click anywhere on your screenshot to sample that pixel\'s exact colour. Use the sampled colour for text layers, shape fills, or the Retouch brush. No guessing or hex-code hunting required.',
    bullets: ['One-click pixel colour sampling', 'Works across the entire canvas', 'Use for text, shapes, or retouch fill', 'Displays hex and RGB values'],
  },
  {
    icon: <Download className="w-6 h-6" />,
    name: 'Export & Download',
    slug: 'free-screenshot-editor-online',
    headline: 'PNG, JPG, or WEBP — no watermarks',
    desc: 'Export your edited screenshot in any of three formats: PNG (lossless, best for UI screenshots), JPG (smaller file size, great for sharing), or WEBP (modern format with excellent compression). No watermarks, no sign-up gate, no file size limit.',
    bullets: ['PNG, JPG, and WEBP export', 'Custom or preset output dimensions', 'Zero watermarks — ever', '100% browser-based, no server upload'],
  },
];

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO({
    title: 'Features — FlowNote Free Screenshot Editor',
    description: 'Explore all FlowNote features: annotate, blur, crop, add arrows & text, smart retouch, AI font analyzer, color eyedropper, filters, and export. Free, no signup.',
    canonical: `${BASE}/features`,
    keywords: 'screenshot editor features, annotate screenshot, blur screenshot, crop screenshot, add text screenshot, screenshot arrows, screenshot retouch, AI font analyzer',
    jsonLd: [
      buildSoftwareAppSchema({
        name: 'FlowNote — Free Online Screenshot Editor',
        description: 'Free browser-based screenshot editor with annotate, blur, crop, text, arrows, retouch, AI font analyzer, color eyedropper, filters, and export tools.',
        url: BASE,
        rating: 4.9,
        reviewCount: 1240,
        features: FEATURES.map(f => f.name),
      }),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'FlowNote Features',
        description: 'All features of the FlowNote free online screenshot editor.',
        url: `${BASE}/features`,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Features', item: `${BASE}/features` },
          ],
        },
      },
    ],
  });

  const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy' },
    { href: '/terms-of-service', label: 'Terms' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 fn-glass border-b border-black/[0.06]" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" aria-label="FlowNote home" className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="/"
              className="fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hidden sm:flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02]"
              style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-4 h-4" aria-hidden="true" />
              <span className="hidden md:inline">Open Editor</span>
            </a>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-black/[0.06] transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-black/[0.06]"
              style={{ background: 'rgba(248,249,252,0.98)', backdropFilter: 'blur(20px)' }}>
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-black/[0.05] last:border-0 block">
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 px-6 text-center relative overflow-hidden"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-10"
              style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.4) 0%, transparent 70%)' }} />
          </div>
          <div className="max-w-3xl mx-auto relative">
            <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium" aria-current="page">Features</li>
              </ol>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
              style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#a5b4fc' }}>
              <Zap className="w-3.5 h-3.5" aria-hidden="true" /> 10 powerful tools
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-foreground">
              All FlowNote <span className="fn-gradient-text">Features</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">
              Every tool you need to annotate, blur, crop, and polish screenshots — free, no signup, runs 100% in your browser.
            </p>
            <a href="/"
              className="inline-flex fn-gradient-bg text-white font-semibold px-8 py-3.5 rounded-xl items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              <UploadCloud className="w-5 h-5" aria-hidden="true" /> Try it Free — No Signup
            </a>
          </div>
        </section>

        {/* Feature list */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            {FEATURES.map((f, i) => (
              <motion.article key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}>
                <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-start`}>
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl fn-gradient-bg flex items-center justify-center shrink-0 text-white"
                        style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }} aria-hidden="true">
                        {f.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">{f.name}</h2>
                        <p className="text-sm text-indigo-500 font-medium">{f.headline}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
                    <a href={`/${f.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors group">
                      Learn more about {f.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="md:w-1/2">
                    <div className="rounded-2xl p-6"
                      style={{ background: 'rgba(79,70,229,0.04)', border: '1px solid rgba(79,70,229,0.12)' }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">What's included</p>
                      <ul className="space-y-3">
                        {f.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                            <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="py-16 px-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.5)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              style={{
                background: 'linear-gradient(135deg, rgba(79,70,229,0.07) 0%, rgba(124,58,237,0.07) 100%)',
                border: '1px solid rgba(79,70,229,0.2)',
              }}>
              <div className="w-14 h-14 rounded-2xl fn-gradient-bg flex items-center justify-center shrink-0"
                style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
                <Shield className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-2">100% private — no uploads, ever</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every feature listed on this page runs entirely in your browser using the HTML5 Canvas API.
                  No screenshot is ever sent to a server. No account needed. No watermarks.{' '}
                  <a href="/privacy-policy" className="text-indigo-500 hover:underline">Read our Privacy Policy →</a>
                </p>
              </div>
              <a href="/"
                className="shrink-0 fn-gradient-bg text-white text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02]"
                style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
                <UploadCloud className="w-4 h-4" aria-hidden="true" /> Open Editor
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.9)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center mb-6">
            {[
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
              { href: '/features', label: 'Features' },
              { href: '/faq', label: 'FAQ' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms-of-service', label: 'Terms of Service' },
              { href: '/cookie-policy', label: 'Cookie Policy' },
              { href: '/disclaimer', label: 'Disclaimer' },
            ].map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlowNote. All rights reserved. · All image processing is 100% client-side — no images are stored on any server.
          </p>
        </div>
      </footer>
    </div>
  );
}
