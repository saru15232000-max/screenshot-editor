import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-blur-sensitive-information';

const FAQ = [
  { q: 'Is blurring enough to protect sensitive data?', a: 'Blurring is generally sufficient to prevent casual viewing, but it can sometimes be partially reversed with image-processing techniques. For highly sensitive data (passwords, social security numbers, financial details), use the retouch/paint-over method to completely cover the content with a solid fill rather than blurring it.' },
  { q: 'Does FlowNote upload my images when I blur them?', a: 'No. All blurring and editing in FlowNote happens entirely in your browser using the Canvas API. Your image never leaves your device.' },
  { q: 'What is the difference between blur and redaction?', a: 'Blur applies a Gaussian softening effect that obscures but does not remove the underlying content. Redaction (using a solid paint-over) replaces the content entirely with another colour, making recovery impossible. Redaction is more secure for highly sensitive information.' },
  { q: 'Can I blur just part of a screenshot?', a: 'Yes. In FlowNote, the retouch brush lets you paint over specific regions. For a blurred-background effect in a specific area, sample the background colour with the eyedropper and paint with a low-opacity brush to create a soft, blended cover.' },
  { q: 'What format should I use when exporting a screenshot with blurred content?', a: 'Use PNG. JPG compression can partially reconstruct image data around heavily compressed regions, which theoretically could make blurred text easier to read. PNG uses lossless compression that preserves the blur effect exactly as applied.' },
];

export default function HowToBlurSensitiveInfo() {
  useSEO({
    title: 'How to Blur Sensitive Information in Screenshots | FlowNote',
    description: 'Learn how to blur passwords, emails, and personal data in screenshots before sharing. Privacy-safe techniques using free browser-based tools.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'blur screenshot, blur sensitive information, hide password screenshot, blur email screenshot, redact screenshot',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'How to Blur Sensitive Information', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Blur Sensitive Information in Screenshots', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="How to Blur Sensitive Information" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Privacy Guide · 6 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Blur Sensitive Information in Screenshots</h1>
          <p className="text-base leading-relaxed">
            Screenshots are one of the most common ways sensitive information is accidentally exposed. A screenshot shared in a Slack channel, a bug report, or a support ticket can contain passwords, email addresses, API keys, customer names, phone numbers, financial data, and more — all visible to anyone who can view the image. This guide covers the techniques to blur or remove sensitive information from screenshots before sharing, using <Link href="/" className="text-indigo-600 underline">FlowNote</Link>'s privacy-first, browser-based editor.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">What Counts as Sensitive Information?</h2>
          <p>Before sharing any screenshot, scan it for:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Passwords, PINs, or authentication tokens</li>
            <li>API keys, secret keys, or environment variables</li>
            <li>Email addresses (yours or others')</li>
            <li>Phone numbers and home addresses</li>
            <li>Financial information (account numbers, balances, card details)</li>
            <li>Customer names or personally identifiable information (PII)</li>
            <li>Internal company data (revenue figures, employee details, unreleased product names)</li>
            <li>Session cookies or authentication headers visible in browser devtools</li>
            <li>Database connection strings</li>
          </ul>
          <p className="mt-3">Many of these are easy to miss on a quick glance — especially in screenshots of browser devtools, terminal windows, or admin dashboards where sensitive values appear as small text in the background.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Two Methods: Blur vs. Paint Over</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Method 1 — Global Blur (Adjust Tab)</h3>
          <p>The simplest approach: open the <strong>Adjust</strong> tab in FlowNote and increase the <strong>Blur</strong> slider. This applies a Gaussian blur to the entire image. It works well when the sensitive content is spread across the screenshot (for example, a dashboard where customer names appear throughout), but it also obscures the rest of the content, making the screenshot less useful.</p>
          <p className="mt-2">Use global blur when: the entire screenshot is sensitive, you only need to demonstrate a general layout rather than specific content, or you plan to annotate over the blurred areas to explain what was there.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Method 2 — Targeted Retouch (Retouch Tab)</h3>
          <p>This is the recommended approach for most cases. The Retouch brush lets you paint over specific regions with a solid colour, completely covering the sensitive content:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>Open the <strong>Retouch</strong> tab in FlowNote.</li>
            <li>Select the <strong>Eyedropper</strong> tool and click on the background colour near the sensitive area (for example, the white background of a form field, or the grey of a terminal window).</li>
            <li>Switch to the <strong>Paint Brush</strong> tool.</li>
            <li>Adjust the brush size to cover the sensitive content. A larger brush covers more area per stroke; a smaller brush offers more precision.</li>
            <li>Paint over the sensitive text or data. The brush fills with the sampled background colour, creating a seamless-looking cover.</li>
            <li>Use Undo (Ctrl+Z) if you over-paint and need to correct.</li>
            <li>For areas with multiple background colours (gradients, images), take multiple eyedropper samples and paint in sections.</li>
          </ol>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Method 3 — Cover with a Label (Text Tab)</h3>
          <p>For situations where you want to indicate that something was redacted (rather than hiding it silently), add a text layer with a solid background that covers the sensitive area. Type "REDACTED" or "████████" and apply a dark background colour. This is the method used in legal documents and official disclosures — it makes the redaction visible and intentional rather than appearing to be an accidental blur.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Which Method Is Most Secure?</h2>
          <div className="space-y-3">
            {[
              { method: 'Paint Over (Solid Fill)', security: 'Highest', note: 'The pixel data is replaced entirely. Cannot be reversed in the exported image.' },
              { method: 'Redaction Label (Opaque Text Layer)', security: 'High', note: 'The underlying pixels are covered by the label rendering. In the exported PNG, the covered area is opaque.' },
              { method: 'Global Blur', security: 'Medium', note: 'Blur can theoretically be partially reversed with deconvolution algorithms. For passwords and highly sensitive data, prefer paint-over.' },
            ].map(item => (
              <div key={item.method} className="rounded-2xl p-4 grid grid-cols-[1fr_auto] gap-4" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div>
                  <p className="font-semibold text-foreground">{item.method}</p>
                  <p className="mt-1">{item.note}</p>
                </div>
                <span className="text-xs font-semibold self-start px-2.5 py-1 rounded-full h-fit" style={{ background: item.security === 'Highest' ? 'rgba(34,197,94,0.15)' : item.security === 'High' ? 'rgba(79,70,229,0.15)' : 'rgba(245,158,11,0.15)' }}>{item.security}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Privacy Best Practices When Sharing Screenshots</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Review before sending.</strong> After editing, zoom in on every part of the screenshot before downloading to verify all sensitive content is covered.</li>
            <li><strong>Use PNG, not JPG.</strong> JPG compression can partially reconstruct nearby pixel values, potentially making blurred content more legible. PNG is lossless and preserves your redactions exactly.</li>
            <li><strong>Edit a copy, never the original.</strong> Keep the original screenshot archived securely. The edited version is what you share.</li>
            <li><strong>Check file metadata.</strong> Some screenshots embed metadata (device name, GPS coordinates, creation timestamp). FlowNote's exported files contain no metadata from the original — the export is a fresh canvas render.</li>
            <li><strong>Establish a team policy.</strong> If screenshots are shared regularly within a team, standardise the redaction approach. A consistent "[REDACTED]" label is clearer than inconsistent blurs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">GDPR and Data Protection Considerations</h2>
          <p>Under GDPR and similar data protection regulations, sharing screenshots containing personal data (names, email addresses, phone numbers) of EU residents without consent or a legal basis may be a compliance issue. Before sharing any screenshot that contains customer data:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Remove all names, email addresses, and identifiers from the screenshot</li>
            <li>Consider whether the recipient needs to see the personal data to understand the issue</li>
            <li>Use anonymised or synthetic test data in your development and staging environments to avoid real customer data appearing in screenshots at all</li>
          </ul>
          <p className="mt-3">For more on this topic, see our guide: <Link href="/guides/how-to-redact-personal-data" className="text-indigo-600 underline">How to Redact Personal Data in Screenshots</Link>.</p>
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
          <p className="font-semibold text-foreground mb-2">Blur and redact screenshots privately</p>
          <p className="mb-4">FlowNote processes everything in your browser. Your sensitive images never leave your device.</p>
          <Link href="/blur-screenshot-online" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Blur Screenshots Free →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
