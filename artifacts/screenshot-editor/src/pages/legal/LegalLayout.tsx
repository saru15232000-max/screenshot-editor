import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Menu, X } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms-of-service', label: 'Terms' },
];

const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export function LegalLayout({ children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 fn-glass border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </a>

          {/* Desktop nav */}
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
              ← Open Editor
            </a>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-black/[0.06] transition-colors"
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
              className="md:hidden overflow-hidden border-t border-black/[0.06]"
              style={{ background: 'rgba(248,249,252,0.98)', backdropFilter: 'blur(20px)' }}>
              <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-black/[0.05] last:border-0 block">
                    {l.label}
                  </a>
                ))}
                <a href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-indigo-600 py-2.5 block">
                  ← Open Editor
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        {children}
      </main>

      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.9)' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center mb-6">
            {FOOTER_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlowNote. All rights reserved. · All image processing is 100% client-side — no images are ever uploaded or stored on any server.
          </p>
        </div>
      </footer>
    </div>
  );
}
