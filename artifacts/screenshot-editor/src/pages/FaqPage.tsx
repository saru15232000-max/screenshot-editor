import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Layers, UploadCloud, ArrowRight, Menu, X } from 'lucide-react';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';
import { FAQ_ITEMS } from '@/components/LandingPage';

const BASE = 'https://useflownote.online';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-black/[0.03] transition-colors">
        <span className="font-medium text-base leading-snug text-foreground">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
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

export default function FaqPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO({
    title: 'FAQ — FlowNote Screenshot Editor',
    description: 'Answers to common questions about FlowNote: is it free, are screenshots stored, what formats are supported, does it work on mobile, and more.',
    canonical: `${BASE}/faq`,
    keywords: 'FlowNote FAQ, screenshot editor questions, is FlowNote free, screenshot privacy, FlowNote mobile, screenshot file formats',
    jsonLd: buildFAQSchema(FAQ_ITEMS.map(i => ({ q: i.q, a: i.a }))),
    breadcrumbs: [{ name: 'FAQ', url: `${BASE}/faq` }],
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
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" aria-label="FlowNote home" className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="/"
              className="hidden sm:flex fn-gradient-bg text-white text-sm font-semibold px-4 py-2 rounded-xl items-center gap-1.5 hover:opacity-90 transition-all hover:scale-[1.02]"
              style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }}>
              <UploadCloud className="w-4 h-4" aria-hidden="true" /> Open Editor
            </a>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-black/[0.06] transition-colors"
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
              className="md:hidden overflow-hidden border-t border-black/[0.06]"
              style={{ background: 'rgba(248,249,252,0.98)', backdropFilter: 'blur(20px)' }}>
              <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
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

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <div className="mb-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">FAQ</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Everything you need to know about FlowNote — privacy, formats, pricing, mobile support, and how the editor works.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map(item => <FaqItem key={item.q} {...item} />)}
        </div>

        <div className="mt-14 rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.07) 0%, rgba(124,58,237,0.07) 100%)',
            border: '1px solid rgba(79,70,229,0.2)',
          }}>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-2">Still have a question?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Can't find the answer you're looking for? Reach out to us directly — we respond within 1–2 business days.
            </p>
          </div>
          <a href="/contact"
            className="shrink-0 fn-gradient-bg text-white text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02]"
            style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}>
            Contact Us <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 pt-8 border-t border-black/[0.06]">
          <h2 className="text-lg font-bold text-foreground mb-4">Related pages</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              { href: '/about', label: 'About FlowNote' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/features', label: 'All Features' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
              { href: '/annotate-screenshot-online', label: 'Annotate Screenshots' },
              { href: '/blur-screenshot-online', label: 'Blur Screenshots' },
            ].map(l => (
              <a key={l.href} href={l.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all hover:scale-[1.02] text-sm font-medium"
                style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)', color: '#4f46e5' }}>
                {l.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.9)' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
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
