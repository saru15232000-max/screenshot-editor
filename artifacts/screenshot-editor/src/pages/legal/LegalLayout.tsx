import React from 'react';
import { Link } from 'wouter';
import { Layers } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

const LEGAL_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export function LegalLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 fn-glass border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="fn-gradient-text">FlowNote</span>
            </a>
          </Link>
          <Link href="/">
            <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Editor
            </a>
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        {children}
      </main>

      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.9)' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center mb-6">
            {LEGAL_LINKS.map(l => (
              <Link key={l.href} href={l.href}>
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlowNote. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
