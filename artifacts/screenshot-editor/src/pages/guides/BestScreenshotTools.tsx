import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';
import { Check, X } from 'lucide-react';

const BASE = 'https://useflownote.online';
const SLUG = 'best-screenshot-tools';

const FAQ = [
  { q: 'What is the best free screenshot editor?', a: 'For browser-based editing with no install, FlowNote offers the most complete feature set for free — including AI font detection, smart retouch, text layers, filters, and export. For desktop apps, ShareX (Windows) and Flameshot (Linux) are strong free options.' },
  { q: 'Is Snagit worth the price?', a: 'Snagit ($63 one-time) is worth it for teams that need video capture, scrolling capture, and a shared asset library. For still-image editing only, free alternatives like FlowNote cover most of the same ground.' },
  { q: 'Do screenshot tools upload my images to their servers?', a: 'It depends. Most cloud-based tools (Markup Hero, Awesome Screenshot) upload images to their servers by design. FlowNote explicitly does not — all processing happens in your browser. Always check the privacy policy of any tool you use with sensitive screenshots.' },
  { q: 'Can I use screenshot tools on Chromebook?', a: 'Browser-based tools like FlowNote work on Chromebook because they require only a browser. Desktop apps like Snagit and CleanShot X do not run on Chromebook.' },
  { q: 'What screenshot tool is best for documentation teams?', a: 'For teams creating large volumes of documentation screenshots, a combination of a desktop capture tool (for scroll capture and video) and a browser-based editor (for quick annotation) works well. FlowNote handles the editing and annotation side without requiring a shared account or subscription.' },
];

const TOOLS = [
  {
    name: 'FlowNote',
    type: 'Browser-based editor',
    price: 'Free',
    pros: ['No install required', 'Completely private (no uploads)', 'AI font detection', 'Smart retouch brush', '21 fonts, 18 templates', 'Works on any OS'],
    cons: ['No video capture', 'No scrolling capture', 'Single image per session'],
    best: 'Privacy-conscious users, quick annotation, cross-platform',
    link: '/',
  },
  {
    name: 'Snagit',
    type: 'Desktop app (Windows/Mac)',
    price: '$63 one-time',
    pros: ['Scrolling capture', 'Video capture', 'Step tool', 'Team asset library'],
    cons: ['Paid', 'Requires install', 'Windows/Mac only', 'Heavy application'],
    best: 'Professional documentation teams, video walkthroughs',
    link: null,
  },
  {
    name: 'CleanShot X',
    type: 'Desktop app (Mac only)',
    price: '$29 one-time or $8/mo',
    pros: ['Beautiful UI', 'Quick annotation', 'Cloud upload option', 'OCR text copy'],
    cons: ['Mac only', 'Paid', 'Cloud sync has privacy implications'],
    best: 'Mac users who want a polished native experience',
    link: null,
  },
  {
    name: 'Greenshot',
    type: 'Desktop app (Windows)',
    price: 'Free',
    pros: ['Lightweight', 'Fast capture shortcuts', 'Basic annotation'],
    cons: ['Windows only', 'Outdated UI', 'Limited annotation tools'],
    best: 'Windows users wanting a lightweight free capture tool',
    link: null,
  },
  {
    name: 'ShareX',
    type: 'Desktop app (Windows)',
    price: 'Free / Open source',
    pros: ['Highly customisable', 'Scrolling capture', 'Many upload destinations', 'OCR'],
    cons: ['Windows only', 'Complex interface', 'Steep learning curve'],
    best: 'Power users on Windows who want full control',
    link: null,
  },
  {
    name: 'Lightshot',
    type: 'Browser extension + desktop',
    price: 'Free',
    pros: ['Fast capture', 'Quick sharing', 'Cross-platform'],
    cons: ['Uploads to Lightshot servers', 'Privacy concerns', 'Basic editing'],
    best: 'Quick capture and public sharing (not for sensitive content)',
    link: null,
  },
];

export default function BestScreenshotTools() {
  useSEO({
    title: 'Best Screenshot Tools in 2025 — Free & Paid Comparison | FlowNote',
    description: 'An honest comparison of the best screenshot editing tools in 2025. Compare FlowNote, Snagit, CleanShot X, Greenshot, ShareX, and Lightshot — free and paid options.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'best screenshot tools 2025, screenshot editor comparison, Snagit alternative, free screenshot editor, screenshot tool review',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'Best Screenshot Tools', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Screenshot Tools in 2025', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="Best Screenshot Tools" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Comparison Guide · 10 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">Best Screenshot Tools in 2025</h1>
          <p className="text-base leading-relaxed">The market for screenshot tools spans from free browser extensions to professional desktop suites costing $60+. Choosing the right tool depends on your platform, privacy requirements, feature needs, and budget. This guide compares the leading options honestly — including <Link href="/" className="text-indigo-600 underline">FlowNote</Link>, Snagit, CleanShot X, Greenshot, ShareX, and Lightshot — with real pros and cons for each.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">How to Choose a Screenshot Tool</h2>
          <p>Before comparing specific tools, clarify what you actually need:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Capture type:</strong> Do you need region capture only, or also full-page scrolling capture and video recording?</li>
            <li><strong>Platform:</strong> Windows, Mac, Linux, or all three? Browser-only? Chromebook?</li>
            <li><strong>Privacy:</strong> Do your screenshots contain sensitive data that must not leave your device?</li>
            <li><strong>Annotation complexity:</strong> Simple arrows and labels, or rich multi-layer text, shapes, and effects?</li>
            <li><strong>Team sharing:</strong> Do you need shared libraries, team access, or collaborative annotation?</li>
            <li><strong>Budget:</strong> Free only, or willing to pay for a one-time or subscription price?</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-5">Tool-by-Tool Comparison</h2>
          <div className="space-y-6">
            {TOOLS.map(tool => (
              <div key={tool.name} className="rounded-2xl p-6" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-foreground">{tool.price}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Pros</p>
                    <ul className="space-y-1">
                      {tool.pros.map(p => (
                        <li key={p} className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /><span>{p}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">Cons</p>
                    <ul className="space-y-1">
                      {tool.cons.map(c => (
                        <li key={c} className="flex items-start gap-2"><X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" /><span>{c}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-xs"><span className="font-semibold text-foreground">Best for: </span>{tool.best}</p>
                {tool.link && (
                  <div className="mt-4">
                    <Link href={tool.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">Try {tool.name} free →</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Feature Comparison Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Feature</th>
                  {['FlowNote', 'Snagit', 'CleanShot X', 'Greenshot', 'ShareX', 'Lightshot'].map(t => (
                    <th key={t} className="text-center py-3 px-2 font-semibold text-foreground">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Free', vals: [true, false, false, true, true, true] },
                  { feature: 'No install needed', vals: [true, false, false, false, false, false] },
                  { feature: 'Mac support', vals: [true, true, true, false, false, true] },
                  { feature: 'Windows support', vals: [true, true, false, true, true, true] },
                  { feature: 'Linux support', vals: [true, false, false, false, true, false] },
                  { feature: 'Privacy (no uploads)', vals: [true, true, false, true, true, false] },
                  { feature: 'Rich annotation', vals: [true, true, true, false, true, false] },
                  { feature: 'AI font detection', vals: [true, false, false, false, false, false] },
                  { feature: 'Smart retouch', vals: [true, false, false, false, false, false] },
                  { feature: 'Scrolling capture', vals: [false, true, true, false, true, false] },
                  { feature: 'Video capture', vals: [false, true, true, false, true, false] },
                ].map(row => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td className="py-2.5 pr-4 font-medium text-foreground">{row.feature}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="text-center py-2.5 px-2">
                        {v ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-300 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Our Recommendation</h2>
          <p>For the majority of users — developers, designers, technical writers, support teams — <strong>FlowNote is the best starting point</strong>. It is free, requires no installation, works on every platform with a browser, and processes images entirely locally for maximum privacy.</p>
          <p className="mt-3">If you need scrolling capture or video recording, add a dedicated capture tool: Snagit (Windows/Mac), ShareX (Windows), or your OS's built-in tool. Use FlowNote for all post-capture editing and annotation.</p>
          <p className="mt-3">If you are on Mac and want a premium all-in-one experience with native OS integration, CleanShot X is the best option — but be aware that its cloud sync feature sends images to CleanShot's servers.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <div key={item.q} className="rounded-2xl p-5" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)' }}>
          <p className="font-semibold text-foreground mb-2">Try the best free screenshot editor</p>
          <p className="mb-4">FlowNote is free, private, and works in any browser. No account, no install, no uploads.</p>
          <Link href="/" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Open FlowNote Free →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
