import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO } from '@/hooks/use-seo';
import { BookOpen, ArrowRight } from 'lucide-react';

const BASE = 'https://useflownote.online';

const GUIDES = [
  {
    href: '/guides/how-to-edit-screenshots',
    title: 'How to Edit Screenshots',
    desc: 'A complete walkthrough of the screenshot editing workflow — adjustments, text, filters, and export.',
    time: '8 min read',
    category: 'Beginner',
  },
  {
    href: '/guides/how-to-annotate-screenshots',
    title: 'How to Annotate Screenshots',
    desc: 'Add callouts, labels, arrows, and highlights to communicate clearly in bug reports and tutorials.',
    time: '7 min read',
    category: 'Beginner',
  },
  {
    href: '/guides/how-to-blur-sensitive-information',
    title: 'How to Blur Sensitive Information',
    desc: 'Protect passwords, emails, and personal data before sharing screenshots with blur and redaction tools.',
    time: '6 min read',
    category: 'Privacy',
  },
  {
    href: '/guides/how-to-redact-personal-data',
    title: 'How to Redact Personal Data in Screenshots',
    desc: 'GDPR-aware techniques for permanently removing personal information from screenshots.',
    time: '7 min read',
    category: 'Privacy',
  },
  {
    href: '/guides/how-to-create-bug-report-screenshots',
    title: 'How to Create Bug Report Screenshots',
    desc: 'Capture and annotate bug screenshots that developers can act on immediately.',
    time: '9 min read',
    category: 'Developer',
  },
  {
    href: '/guides/how-to-take-professional-screenshots',
    title: 'How to Take Professional Screenshots',
    desc: 'Composition, resolution, and editing techniques that make screenshots look polished.',
    time: '8 min read',
    category: 'Design',
  },
  {
    href: '/guides/how-to-share-screenshots-safely',
    title: 'How to Share Screenshots Safely',
    desc: 'Best practices for removing metadata, redacting private details, and choosing the right format.',
    time: '6 min read',
    category: 'Privacy',
  },
  {
    href: '/guides/best-screenshot-tools',
    title: 'Best Screenshot Tools in 2025',
    desc: 'An honest comparison of the top screenshot editing tools — free and paid — with pros and cons.',
    time: '10 min read',
    category: 'Comparison',
  },
  {
    href: '/guides/screenshot-documentation-guide',
    title: 'Screenshot Documentation Guide',
    desc: 'How to use screenshots effectively in technical documentation, wikis, and knowledge bases.',
    time: '9 min read',
    category: 'Documentation',
  },
  {
    href: '/guides/social-media-screenshot-guide',
    title: 'Social Media Screenshot Guide',
    desc: 'Optimal sizing, formatting, and annotation for screenshots on Twitter, LinkedIn, and Instagram.',
    time: '7 min read',
    category: 'Social Media',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Beginner: 'rgba(34,197,94,0.15)',
  Privacy: 'rgba(79,70,229,0.15)',
  Developer: 'rgba(239,68,68,0.15)',
  Design: 'rgba(245,158,11,0.15)',
  Comparison: 'rgba(14,165,233,0.15)',
  Documentation: 'rgba(168,85,247,0.15)',
  'Social Media': 'rgba(236,72,153,0.15)',
};

export default function GuidesIndex() {
  useSEO({
    title: 'Screenshot Guides & Tutorials — FlowNote Learning Center',
    description: 'Free screenshot editing guides and tutorials. Learn how to annotate, blur, redact, and edit screenshots like a professional — all in your browser.',
    canonical: `${BASE}/guides`,
    keywords: 'screenshot guides, screenshot tutorials, how to edit screenshots, screenshot tips',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'FlowNote Screenshot Guides',
      description: 'Free screenshot editing guides and tutorials covering annotation, privacy, bug reports, and professional techniques.',
      url: `${BASE}/guides`,
      publisher: { '@type': 'Organization', name: 'FlowNote', url: BASE },
    },
  });

  return (
    <GuideLayout>
      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Learning Center</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">
            Screenshot Guides & Tutorials
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">
            Everything you need to know about editing, annotating, and sharing screenshots professionally.
            All techniques in these guides work directly in{' '}
            <Link href="/" className="text-indigo-600 underline">FlowNote</Link>{' '}
            — free, browser-based, no install required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {GUIDES.map(g => (
            <Link key={g.href} href={g.href}>
              <a className="block rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:scale-[1.01] group"
                style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: CATEGORY_COLORS[g.category] ?? 'rgba(0,0,0,0.08)', color: 'currentColor' }}>
                    {g.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{g.time}</span>
                </div>
                <h2 className="font-bold text-base text-foreground mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                  {g.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.desc}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-indigo-600">
                  Read guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)' }}>
          <h2 className="font-bold text-foreground mb-2">Ready to try it yourself?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            FlowNote is free, runs entirely in your browser, and requires no account. Open your first screenshot now.
          </p>
          <Link href="/">
            <a className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all"
              style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
              Open FlowNote Editor <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </div>
    </GuideLayout>
  );
}
