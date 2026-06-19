import React from 'react';
import { Link } from 'wouter';
import { Layers, ArrowRight, BookOpen } from 'lucide-react';

const GUIDES = [
  { href: '/guides/how-to-edit-screenshots', label: 'How to Edit Screenshots' },
  { href: '/guides/how-to-annotate-screenshots', label: 'How to Annotate Screenshots' },
  { href: '/guides/how-to-blur-sensitive-information', label: 'How to Blur Sensitive Info' },
  { href: '/guides/how-to-redact-personal-data', label: 'How to Redact Personal Data' },
  { href: '/guides/how-to-create-bug-report-screenshots', label: 'Bug Report Screenshots' },
  { href: '/guides/how-to-take-professional-screenshots', label: 'Professional Screenshots' },
  { href: '/guides/how-to-share-screenshots-safely', label: 'Share Screenshots Safely' },
  { href: '/guides/best-screenshot-tools', label: 'Best Screenshot Tools' },
  { href: '/guides/screenshot-documentation-guide', label: 'Documentation Guide' },
  { href: '/guides/social-media-screenshot-guide', label: 'Social Media Guide' },
];

const LEGAL_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

interface Props {
  children: React.ReactNode;
  breadcrumb?: string;
  currentSlug?: string;
}

export function GuideLayout({ children, breadcrumb, currentSlug }: Props) {
  const related = GUIDES.filter(g => !g.href.endsWith(currentSlug ?? ''));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 fn-glass border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg fn-gradient-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="fn-gradient-text">FlowNote</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/guides" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Guides
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">Editor</Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-black/[0.06]" style={{ background: 'rgba(248,249,252,0.9)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ArrowRight className="w-3.5 h-3.5" />
          <Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link>
          {breadcrumb && (
            <>
              <ArrowRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-xs">{breadcrumb}</span>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
        <main className="min-w-0">{children}</main>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">All Guides</p>
              <div className="space-y-1">
                {GUIDES.map(g => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className={`block px-3 py-2 rounded-xl text-sm transition-colors ${g.href.endsWith(currentSlug ?? '') ? 'fn-gradient-bg text-white font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.04]'}`}
                  >
                    {g.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)' }}>
              <p className="text-sm font-semibold text-foreground mb-2">Try FlowNote Free</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Everything in these guides works right now — no install, no signup.</p>
              <Link
                href="/"
                className="block text-center fn-gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all"
                style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
              >
                Open the Editor
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="border-t border-black/[0.06] py-12 px-6" style={{ background: 'rgba(248,249,252,0.9)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-foreground mb-5">More guides</h2>
            <div className="flex flex-wrap gap-2">
              {related.slice(0, 6).map(g => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)', color: '#4f46e5' }}
                >
                  {g.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,249,252,0.9)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center mb-6">
            {LEGAL_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} FlowNote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
