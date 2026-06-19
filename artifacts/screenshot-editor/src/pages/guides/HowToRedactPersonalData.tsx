import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-redact-personal-data';

const FAQ = [
  { q: 'What is the difference between blurring and redacting?', a: 'Blurring applies a softening effect that obscures content but leaves the underlying pixels modified, not removed. Redaction replaces content with a solid cover — paint, a black bar, or the word "REDACTED" — making it impossible to recover the original. Redaction is more secure for personal and sensitive data.' },
  { q: 'Is it safe to share a screenshot after redacting it in FlowNote?', a: 'Yes. When you export a screenshot from FlowNote, the output is a freshly rendered canvas image. Any area covered with a solid paint layer is genuinely gone in the exported file — it is not hidden behind a transparent layer or metadata. PNG exports are fully lossless and do not introduce compression artefacts that might expose covered content.' },
  { q: 'Does FlowNote store any copies of my screenshots?', a: 'No. FlowNote is entirely browser-based. Your image is loaded into browser memory, edited locally, and exported directly to your device. No copy is ever sent to a server.' },
  { q: 'What types of personal data should I redact before sharing a screenshot?', a: 'Names, email addresses, phone numbers, postal addresses, dates of birth, national ID numbers, passport details, financial account numbers, and any other information that could identify a specific individual. Also consider business-sensitive data: revenue figures, employee counts, internal project names.' },
  { q: 'How do I redact data in a screenshot that has a complex or textured background?', a: 'For complex backgrounds, take multiple eyedropper samples at different points near the sensitive content and paint in small sections, matching each area to its nearest background colour. For very complex backgrounds (photographs, gradients), a visible [REDACTED] label with a solid background colour is more reliable than attempting to match the background.' },
];

export default function HowToRedactPersonalData() {
  useSEO({
    title: 'How to Redact Personal Data in Screenshots — GDPR Guide | FlowNote',
    description: 'Learn how to permanently redact names, emails, and personal data from screenshots. GDPR-aware techniques using free, private, browser-based tools.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'redact screenshot, remove personal data screenshot, GDPR screenshot, redact personal information, remove name from screenshot',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'How to Redact Personal Data', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Redact Personal Data in Screenshots', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="How to Redact Personal Data" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Privacy Guide · 7 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Redact Personal Data in Screenshots</h1>
          <p className="text-base leading-relaxed">Screenshots of production systems, customer dashboards, or support tools almost always contain personal data. Sharing these screenshots without redaction — even internally — creates privacy risks and potential compliance violations under GDPR, CCPA, HIPAA, and similar regulations. This guide explains how to permanently redact personal information from screenshots before sharing, using techniques that leave no recoverable trace of the original data.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Why Redaction Matters More Than Blurring</h2>
          <p>Many people reach for blur as their first tool for hiding sensitive data. Blur has a real weakness: Gaussian blur is a mathematically reversible operation in many cases. Researchers and tools like SmartDeblur can partially reconstruct blurred text, particularly when the original font is known or the blur radius is small. For casual viewers, blur is sufficient. For sensitive personal or financial data, it is not.</p>
          <p className="mt-3">True redaction — covering content with an opaque, solid fill — eliminates the original pixel data from the exported image entirely. When you paint over a name with a solid black or white rectangle and export as PNG, the file contains only the fill colour at those coordinates. The original text cannot be recovered from the file.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">How to Redact Screenshots in FlowNote</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Method 1 — Paint Over (Seamless Redaction)</h3>
          <p>This method makes the redaction invisible — the covered area looks like plain background.</p>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>Open <Link href="/" className="text-indigo-600 underline">FlowNote</Link> and drop in your screenshot.</li>
            <li>Open the <strong>Retouch</strong> tab.</li>
            <li>Click the <strong>Eyedropper</strong> and sample the background colour immediately next to the personal data (e.g., the white background of a table cell, the grey of a form field).</li>
            <li>Switch to the <strong>Paint Brush</strong>. Increase the brush size to comfortably cover the target text.</li>
            <li>Paint over every piece of personal data. Work in steady strokes to avoid gaps.</li>
            <li>Zoom in (browser zoom: Ctrl/Cmd +) to check for any remaining characters at the edges of your strokes.</li>
            <li>Repeat the eyedropper + paint process for any areas with a different background colour.</li>
            <li>Export as PNG.</li>
          </ol>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Method 2 — Labelled Redaction (Explicit)</h3>
          <p>This method makes the redaction visible and intentional, which is the standard in legal, compliance, and official documentation contexts.</p>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>Open the <strong>Text</strong> tab and click <strong>Add Text</strong>.</li>
            <li>Type <strong>[REDACTED]</strong> or use a solid block character string (████████).</li>
            <li>Set the background colour to black or dark grey, and the text colour to white.</li>
            <li>Increase the font size until the label covers the personal data completely.</li>
            <li>Position the layer over the data.</li>
            <li>Add additional layers for other instances of personal data in the screenshot.</li>
            <li>Export as PNG.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">What to Redact: A Checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Full names', 'Email addresses', 'Phone numbers', 'Home/work addresses',
              'Date of birth', 'National ID / passport numbers', 'Financial account numbers',
              'Credit/debit card details', 'IP addresses (may be personal data under GDPR)',
              'Session tokens and cookies', 'API keys and secrets', 'Medical information',
              'Salary or financial data', 'Internal usernames or employee IDs',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <span className="w-2 h-2 rounded-full fn-gradient-bg shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">GDPR and Compliance Context</h2>
          <p>Under the General Data Protection Regulation (GDPR), personal data includes any information that can identify a living individual. Sharing screenshots containing personal data may constitute a data transfer and requires either the consent of the data subject or another lawful basis.</p>
          <p className="mt-3">Practical implications for teams:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Bug reports:</strong> Never include real customer data in bug reports filed in Jira, GitHub Issues, or Linear. Use anonymised data or synthetic records in your staging environment.</li>
            <li><strong>Support tickets:</strong> When sharing screenshots to illustrate a support issue, redact the customer's name, email, and account details before attaching to a ticket.</li>
            <li><strong>Design reviews:</strong> Replace real user data in prototypes and mockups with fictional data before sharing with your design team.</li>
            <li><strong>Social media:</strong> Never share screenshots from production systems on social media, even in a "look what happened" context, without full redaction of all personal identifiers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Verifying Your Redaction</h2>
          <p>After exporting, open the file and zoom in to 200–400% on each redacted area. Verify:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>No characters or partial characters are visible at the edges of the redacted area</li>
            <li>The fill is solid and there are no transparent or semi-transparent gaps</li>
            <li>Adjacent areas of similar background colour match the redacted fill colour closely enough that the cover is not obvious</li>
          </ul>
          <p className="mt-3">For critical documents, have a second person review the redacted version before distribution.</p>
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
          <p className="font-semibold text-foreground mb-2">Redact screenshots privately — no uploads</p>
          <p className="mb-4">FlowNote processes images entirely in your browser. Sensitive screenshots never touch a server.</p>
          <Link href="/" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Open FlowNote Free →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
