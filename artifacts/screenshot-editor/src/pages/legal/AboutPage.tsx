import React from 'react';
import { LegalLayout } from './LegalLayout';
import { useSEO } from '@/hooks/use-seo';
import { Link } from 'wouter';
import {
  Shield, Brain, Zap, Layers, Type, Wand2, Download, Pipette, Eraser,
  ArrowRight,
} from 'lucide-react';

const BASE = 'https://useflownote.online';

const TOOLS = [
  { icon: <Wand2 className="w-4 h-4" />, name: 'Smart Adjustments', desc: 'Brightness, contrast, saturation, hue, blur, and one-click filter presets.' },
  { icon: <Type className="w-4 h-4" />, name: 'Rich Text Layers', desc: '21 fonts, 18 style templates, per-layer opacity and positioning.' },
  { icon: <Brain className="w-4 h-4" />, name: 'AI Font Analyzer', desc: 'Click any text in your screenshot to detect the closest matching font.' },
  { icon: <Pipette className="w-4 h-4" />, name: 'Colour Eyedropper', desc: 'Sample any pixel from your screenshot for perfect colour matching.' },
  { icon: <Eraser className="w-4 h-4" />, name: 'Smart Retouch', desc: 'Paint over existing text or UI elements with a background-matched fill.' },
  { icon: <Download className="w-4 h-4" />, name: 'Instant Export', desc: 'Download as JPG, PNG, or WEBP at custom or preset dimensions.' },
];

const WHO_WE_HELP = [
  {
    role: 'Developers & QA engineers',
    desc: 'Annotate bug screenshots with callouts, blur sensitive data, and add concise notes before filing tickets.',
  },
  {
    role: 'Designers & product teams',
    desc: 'Quickly mark up wireframes, highlight UI issues, and share annotated screenshots in design reviews without opening a full graphics editor.',
  },
  {
    role: 'Technical writers & educators',
    desc: 'Add numbered steps, callout boxes, and formatted text overlays to screenshot sequences for tutorials and documentation.',
  },
  {
    role: 'Customer support teams',
    desc: 'Highlight problem areas in support screenshots, blur customer PII, and prepare clear annotated responses.',
  },
  {
    role: 'Freelancers & remote workers',
    desc: 'Everything is done in the browser, instantly — no installs, no accounts, no waiting. Just drop your screenshot and get to work.',
  },
];

export default function AboutPage() {
  useSEO({
    title: 'About FlowNote — Free Browser-Based Screenshot Editor',
    description: 'Learn about FlowNote, the free privacy-first screenshot editor that runs entirely in your browser. No sign-up, no uploads, no tracking.',
    canonical: `${BASE}/about`,
    keywords: 'about FlowNote, screenshot editor, browser-based image editor, privacy first tool',
    breadcrumbs: [{ name: 'About', url: `${BASE}/about` }],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'FlowNote',
        url: BASE,
        logo: `${BASE}/favicon.svg`,
        description: 'FlowNote is a free, privacy-first, browser-based screenshot editor with AI-powered tools.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: `${BASE}/contact`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'FlowNote',
        url: BASE,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  });

  return (
    <LegalLayout>
      <div className="space-y-16">

        <section>
          <h1 className="text-3xl font-extrabold tracking-tight mb-5 text-foreground">About FlowNote</h1>
          <p className="text-muted-foreground leading-relaxed text-sm mb-4">
            FlowNote is a free, professional-grade screenshot editor that runs entirely inside your web browser.
            There is nothing to install, no account to create, and no subscription to manage. Open the website,
            drop in a screenshot, edit it, and download it — all without your image ever leaving your device.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm mb-4">
            We built FlowNote because the existing options for quick screenshot editing were either too complex
            (full desktop apps like Photoshop), too limited (basic crop-and-arrow tools), or required you to
            upload your images to a third-party server — a serious privacy concern for anyone editing screenshots
            that contain sensitive information like API keys, customer data, or private conversations.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            FlowNote solves all three problems. It offers a genuinely powerful editing toolkit, handles the
            full range of common screenshot editing tasks, and keeps your images private by processing
            everything locally using the browser&rsquo;s built-in Canvas API.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">What FlowNote Does</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            FlowNote provides a complete screenshot editing workflow from a single browser tab:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map(t => (
              <div key={t.name} className="rounded-2xl p-5 flex gap-4"
                style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center shrink-0 text-white"
                  style={{ boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
                  {t.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">{t.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">How Screenshot Editing Works in FlowNote</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            When you open a screenshot in FlowNote, the image is read directly from your device into the
            browser&rsquo;s memory using the File API. From that point on, all editing — adjustments,
            text layers, retouching, filters — takes place on an HTML5 Canvas element rendered in your
            browser tab.
          </p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The Canvas API gives FlowNote pixel-level access to your image data. This is what enables
            features like the Colour Eyedropper (which reads the exact RGB value of any pixel you click),
            the Font Analyzer (which samples a region of pixels, measures stroke characteristics, and
            compares them against known font metrics), and the Smart Retouch brush (which paints using a
            sampled background colour for seamless text removal).
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When you click &ldquo;Download&rdquo;, the canvas is exported to a file in your chosen format
            (JPG, PNG, or WEBP) and offered as a browser download — again, entirely locally. At no point
            is any image data sent to a server.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Who FlowNote Helps</h2>
          <div className="space-y-4">
            {WHO_WE_HELP.map(item => (
              <div key={item.role} className="flex gap-4 rounded-2xl p-5"
                style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">{item.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.07) 0%, rgba(124,58,237,0.07) 100%)',
              border: '1px solid rgba(79,70,229,0.2)',
            }}>
            <div className="w-14 h-14 rounded-2xl fn-gradient-bg flex items-center justify-center shrink-0"
              style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.4)' }}>
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">Privacy by Architecture</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Privacy is not a feature we added on top — it is a consequence of how FlowNote is built.
                Because everything happens in the browser, there is no server to send your images to,
                no database to store them in, and no engineer who could ever access them. Your screenshots
                are yours, always.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Why FlowNote Exists</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The core belief behind FlowNote is simple: powerful software tools should be accessible to
            everyone, without subscription fees, without account creation friction, and without compromising
            user privacy.
          </p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Professional screenshot editing tools either cost money (Snagit, CleanShot X), require macOS
            (CleanShot X), or are basic web tools that upload your images to external servers. FlowNote
            fills the gap: a feature-rich, professional-quality tool that is free, cross-platform, and
            private by design.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe the browser is the most accessible platform in the world — it runs on every operating
            system, requires no installation, and is always up to date. FlowNote is built entirely for it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-5">Trust Signals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-5 h-5" />, label: '100% Private', sub: 'No server uploads' },
              { icon: <Zap className="w-5 h-5" />, label: 'Instant', sub: 'No install needed' },
              { icon: <Layers className="w-5 h-5" />, label: 'Free forever', sub: 'No subscription' },
              { icon: <Brain className="w-5 h-5" />, label: 'AI-powered', sub: 'Smart font & fill tools' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl p-5 text-center space-y-2"
                style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)' }}>
                <div className="flex justify-center text-indigo-500">{item.icon}</div>
                <p className="font-bold text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">More Information</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms-of-service', label: 'Terms of Service' },
              { href: '/cookie-policy', label: 'Cookie Policy' },
              { href: '/disclaimer', label: 'Disclaimer' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
              { href: '/annotate-screenshot-online', label: 'Annotate Screenshots' },
              { href: '/blur-screenshot-online', label: 'Blur Screenshots' },
            ].map(l => (
              <Link key={l.href} href={l.href}>
                <a className="flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all hover:scale-[1.02] text-sm font-medium"
                  style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)', color: '#4f46e5' }}>
                  {l.label} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </LegalLayout>
  );
}
