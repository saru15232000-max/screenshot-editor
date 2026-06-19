import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'screenshot-documentation-guide';

const FAQ = [
  { q: 'How many screenshots should a documentation article include?', a: 'Use screenshots whenever text alone would be ambiguous or slow for the reader to follow. A good rule: one screenshot per distinct UI state or step that involves visual interaction. For a 5-step procedure, you might include 3–5 screenshots. Avoid screenshots of text that could be written as text — screenshots are hard to search and index.' },
  { q: 'Should documentation screenshots be light or dark mode?', a: 'Choose one mode and use it consistently throughout your documentation. Light mode is more universally accessible and prints better. If your product supports both modes prominently, provide both variants and use a toggle. Never mix light and dark screenshots within the same document.' },
  { q: 'How do I keep screenshots up to date when the UI changes?', a: 'Use descriptive filenames that include a version or date. Keep a retake checklist of all screenshots in your documentation and review it with every major UI release. Tools like Percy (visual regression testing) can flag UI changes automatically.' },
  { q: 'What size should screenshots be in documentation?', a: 'For web documentation, display screenshots at their natural width or constrained to the content column (typically 700–900px). For PDF documentation, ensure screenshots are at least 150 DPI at print size. Always export at 2x resolution to support high-density displays.' },
  { q: 'Should I use GIFs or screenshots for UI documentation?', a: 'Use screenshots for static UI states and instructions. Use GIFs or short videos for demonstrating interactions, animations, or multi-step workflows where timing matters. GIFs have no audio and are more accessible than videos for quick demonstrations.' },
];

export default function ScreenshotDocumentationGuide() {
  useSEO({
    title: 'Screenshot Documentation Guide — Best Practices for Technical Writers | FlowNote',
    description: 'How to use screenshots effectively in technical documentation, wikis, and knowledge bases. Best practices for quality, consistency, and maintainability.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'screenshot documentation, technical documentation screenshots, wiki screenshots, knowledge base screenshots, documentation best practices',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'Documentation Guide', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'Screenshot Documentation Guide', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="Screenshot Documentation Guide" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Documentation Guide · 9 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">Screenshot Documentation Guide</h1>
          <p className="text-base leading-relaxed">Screenshots are the backbone of technical documentation. When done well, they reduce support requests, speed up onboarding, and make complex procedures immediately understandable. When done poorly, they become outdated liabilities that confuse users and erode trust in the documentation. This guide covers the principles, workflow, and standards for using screenshots effectively in product documentation, wikis, and knowledge bases.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">When to Use Screenshots in Documentation</h2>
          <p>Not every instruction needs a screenshot. Overuse is as damaging as underuse — too many images slow page loading, become outdated quickly, and can overwhelm readers. Use screenshots when:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>The UI element is hard to describe in words.</strong> "Click the icon in the top-right corner of the card" is ambiguous — a screenshot makes it unambiguous.</li>
            <li><strong>The step involves a state change.</strong> Show the before and after when a user action produces a visible UI change.</li>
            <li><strong>The expected result needs visual confirmation.</strong> "Your settings are saved when you see this confirmation" is clearer with a screenshot of the confirmation.</li>
            <li><strong>The user needs to navigate to an unfamiliar area.</strong> Screenshots reduce the cognitive effort of locating the right panel, tab, or menu.</li>
          </ul>
          <p className="mt-3">Do not use screenshots to replace text that can be written as text. Error messages, command outputs, and code should be formatted as text in documentation — it is searchable, copyable, and does not require a screenshot to maintain.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Creating a Documentation Screenshot Style Guide</h2>
          <p>A style guide for screenshots prevents the inconsistency that accumulates when multiple team members contribute to documentation. Document and enforce:</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Capture Standards</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Browser: [specify Chrome/Firefox version]</li>
            <li>Window width: 1280px at 100% zoom</li>
            <li>Theme: Light (or dark — be consistent)</li>
            <li>Profile: Dedicated clean browser profile</li>
            <li>Capture tool: [specify OS screenshot tool]</li>
            <li>Format: PNG (lossless)</li>
          </ul>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Annotation Standards</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Annotation tool: FlowNote</li>
            <li>Primary annotation colour: #4F46E5 (indigo)</li>
            <li>Font: [specify — e.g., Inter, 14px]</li>
            <li>Template for steps: Numbered Step</li>
            <li>Template for errors: Error (red)</li>
            <li>Template for callouts: Label</li>
          </ul>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">File Naming Convention</h3>
          <p>Use a consistent naming pattern: <code>feature-screen-action-v[version].png</code>. Examples:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><code>settings-profile-save-button-v3.2.png</code></li>
            <li><code>dashboard-filter-dropdown-open-v3.2.png</code></li>
            <li><code>onboarding-step2-email-confirm-v3.2.png</code></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">The Documentation Screenshot Workflow</h2>
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <strong>Set up the environment.</strong> Open your dedicated browser profile. Navigate to the feature being documented in its correct state (the state the user will encounter in the flow being documented).
            </li>
            <li>
              <strong>Prepare the UI state.</strong> Fill any required fields with realistic fictional data. Trigger any hover states or menu expansions that need to be captured. Close any unrelated modals or notifications.
            </li>
            <li>
              <strong>Capture.</strong> Use your operating system's region capture tool to capture the relevant portion of the UI, or capture the full window and crop in FlowNote.
            </li>
            <li>
              <strong>Edit in FlowNote.</strong> Open the capture in <Link href="/" className="text-indigo-600 underline">FlowNote</Link>. Crop to the correct area (Layout tab). Adjust brightness/contrast if needed (Adjust tab). Redact any personal data or test credentials (Retouch tab). Add annotations per your style guide (Text tab).
            </li>
            <li>
              <strong>Export.</strong> Export as PNG with a descriptive filename following your naming convention.
            </li>
            <li>
              <strong>Review.</strong> Open the exported file and zoom in to 200%. Check that annotations are readable, redactions are complete, and the cropping focuses on the right element.
            </li>
            <li>
              <strong>Add to documentation.</strong> Insert the screenshot at the appropriate point in the document. Add an alt text description for accessibility. Add a caption if the screenshot requires additional context not clear from the surrounding text.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Writing Good Alt Text for Screenshots</h2>
          <p>Alt text serves two purposes: accessibility (screen reader users hear the alt text instead of seeing the image) and SEO (search engines index alt text). For documentation screenshots, alt text should describe what the screenshot shows, not just label it.</p>
          <div className="space-y-3 mt-3">
            {[
              { label: 'Too vague', text: 'alt="Screenshot"', color: 'rgba(239,68,68,0.1)' },
              { label: 'Too literal', text: 'alt="A screenshot of the settings page"', color: 'rgba(245,158,11,0.1)' },
              { label: 'Good', text: 'alt="The Profile Settings page with the Save button highlighted in the bottom-right corner"', color: 'rgba(34,197,94,0.1)' },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4" style={{ background: item.color, border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <code className="text-xs">{item.text}</code>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Maintaining Screenshots Over Time</h2>
          <p>Outdated screenshots are the most common documentation failure. A screenshot that shows an old UI state actively misleads users and creates support tickets. To maintain screenshot freshness:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Tag screenshots with the app version.</strong> Include the version in the filename or as metadata in your documentation system. When a new version ships, review all screenshots tagged with older versions.</li>
            <li><strong>Keep a screenshot inventory.</strong> Maintain a spreadsheet or documentation page listing every screenshot in your docs, the feature it covers, and the last time it was verified.</li>
            <li><strong>Assign screenshot ownership.</strong> Each feature area's screenshots should have an owner who is responsible for updating them when the feature changes.</li>
            <li><strong>Run a quarterly review.</strong> Walk through each section of your documentation and compare screenshots to the current product. Re-capture any that have drifted.</li>
          </ul>
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
          <p className="font-semibold text-foreground mb-2">Create documentation screenshots in your browser</p>
          <p className="mb-4">FlowNote gives you all the annotation and editing tools you need — free, private, no install.</p>
          <Link href="/annotate-screenshot-online" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Start Annotating →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
