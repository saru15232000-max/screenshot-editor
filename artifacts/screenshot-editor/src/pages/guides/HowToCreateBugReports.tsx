import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-create-bug-report-screenshots';

const FAQ = [
  { q: 'What information should a bug report screenshot include?', a: 'The screenshot should clearly show the incorrect behaviour, the UI state that triggered it, and any error messages. It should also include the browser and OS version either as an annotation or in the ticket description.' },
  { q: 'Should I annotate bug screenshots or just attach the raw image?', a: 'Always annotate. A raw screenshot makes the developer hunt for the issue. An annotated screenshot with a callout pointing to the error reduces debugging time significantly.' },
  { q: 'How many screenshots should I include in a bug report?', a: 'Include one screenshot showing the problem, and optionally one showing the expected behaviour (or a reference to what it should look like). For multi-step bugs, a short sequence of 2–4 screenshots showing the steps to reproduce is very helpful.' },
  { q: 'Should I include the full page or just the affected area?', a: 'Include enough context that the developer can identify where in the application the bug occurs, then crop to focus on the actual problem. A full-page screenshot with a small annotation can be hard to read — crop to the relevant section and annotate clearly.' },
  { q: 'Is it safe to include real user data in bug report screenshots?', a: 'No. Always redact personally identifiable information before filing a bug report. Use the Retouch or Text tools in FlowNote to cover names, email addresses, and any other personal data before attaching the screenshot to a ticket.' },
];

export default function HowToCreateBugReports() {
  useSEO({
    title: 'How to Create Bug Report Screenshots That Developers Love | FlowNote',
    description: 'Learn to annotate, crop, and structure bug report screenshots that help developers reproduce and fix issues faster. Practical guide with step-by-step techniques.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'bug report screenshot, annotate bug screenshot, screenshot for bug report, QA screenshot guide, developer bug screenshot',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'Bug Report Screenshots', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Create Bug Report Screenshots', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="Bug Report Screenshots" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Developer Guide · 9 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Create Bug Report Screenshots That Developers Love</h1>
          <p className="text-base leading-relaxed">A poorly prepared bug report wastes developer time. A well-annotated screenshot, paired with clear reproduction steps, can reduce the time to fix a bug by 50% or more — because the developer spends zero time asking clarifying questions. This guide covers the art and science of creating bug report screenshots that communicate precisely, using <Link href="/" className="text-indigo-600 underline">FlowNote</Link>'s annotation tools.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">What Makes a Good Bug Report Screenshot?</h2>
          <p>The ideal bug report screenshot answers four questions at a glance:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li><strong>Where is the bug?</strong> — Which page, component, or UI element is affected.</li>
            <li><strong>What is wrong?</strong> — The exact incorrect behaviour, error message, or visual glitch.</li>
            <li><strong>What should happen instead?</strong> — Either annotated or described in the ticket text.</li>
            <li><strong>How was it triggered?</strong> — The UI state at the time of the bug.</li>
          </ol>
          <p className="mt-3">A screenshot that answers all four questions in a single image allows a developer to reproduce the bug without back-and-forth discussion, understand the expected behaviour without guessing, and verify the fix against the original screenshot.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Step-by-Step: Preparing a Bug Report Screenshot</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Step 1 — Capture the Right Moment</h3>
          <p>Capture the screenshot when the bug is visible. If the bug is a transient state (a flash, a hover effect, a loading state), use your operating system's delayed screenshot feature, or reproduce the bug consistently and capture at the right moment. On Windows: Win+Shift+S (Snipping Tool). On Mac: Cmd+Shift+4 for region capture.</p>
          <p className="mt-2">Capture enough context — at minimum the component and its immediate surrounding UI — so the developer can identify the page and state without reading the ticket description.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Step 2 — Open in FlowNote and Crop</h3>
          <p>Open your screenshot in <Link href="/" className="text-indigo-600 underline">FlowNote</Link>. Go to the <strong>Layout</strong> tab and crop to focus on the relevant area. Remove browser chrome (tabs, address bar, bookmarks bar) unless the bug involves the browser itself. Keep enough context for the developer to identify the page, but cut down to the essential region.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Step 3 — Highlight the Problem</h3>
          <p>Open the <strong>Text</strong> tab and add an annotation pointing to the exact problem. Use the <strong>Error</strong> template (red background, white text) for error states, or the <strong>Warning</strong> template (amber) for unexpected but non-critical behaviour. A short, specific label is ideal:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><em>Good:</em> "Button disabled — should be active"</li>
            <li><em>Good:</em> "Error: 404 on submit"</li>
            <li><em>Too vague:</em> "This is wrong"</li>
            <li><em>Too long:</em> "This button should be enabled when all required fields are filled but it stays grey even after filling everything in"</li>
          </ul>
          <p className="mt-2">Save the long explanation for the ticket description. The annotation should be a concise pointer, not a full explanation.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Step 4 — Add Context Annotations if Needed</h3>
          <p>If the bug requires understanding the state of other UI elements, add secondary annotations. For example: "1 — Filled all required fields" pointing to the form, "2 — Submit still disabled" pointing to the button. Use numbered steps to show the relationship between actions and outcomes.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Step 5 — Redact Personal Data</h3>
          <p>Before attaching the screenshot to a bug report, check every visible field for personal data. Cover names, email addresses, phone numbers, and any customer identifiers using the Retouch brush. See <Link href="/guides/how-to-redact-personal-data" className="text-indigo-600 underline">How to Redact Personal Data</Link> for the full technique.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Step 6 — Export as PNG</h3>
          <p>Export as PNG to preserve sharp text edges and clear annotation colours. JPG compression blurs fine text and can make error messages hard to read at smaller sizes. Name the file descriptively: <code>bug-checkout-submit-disabled-v2.3.png</code> rather than <code>screenshot.png</code>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Annotation Templates for Bug Reports</h2>
          <div className="space-y-3">
            {[
              { template: 'Error (Red)', use: 'Error messages, failed states, broken UI elements' },
              { template: 'Warning (Amber)', use: 'Unexpected behaviour that does not cause a full error' },
              { template: 'Numbered Step', use: 'Showing the sequence of actions that triggered the bug' },
              { template: 'Code Block', use: 'Annotating console errors, API responses, or stack traces visible in the screenshot' },
              { template: 'Label', use: 'Naming a UI element whose identity may not be obvious to the developer' },
            ].map(item => (
              <div key={item.template} className="rounded-2xl p-4 flex gap-4" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <span className="font-semibold text-foreground shrink-0 w-36">{item.template}</span>
                <span>{item.use}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">A Complete Bug Report Template</h2>
          <div className="rounded-2xl p-5 font-mono text-xs leading-loose" style={{ background: 'rgba(17,24,39,0.9)', color: '#a5b4fc', border: '1px solid rgba(79,70,229,0.3)' }}>
            <p><span style={{ color: '#6ee7b7' }}>## Bug:</span> [Short description — what is wrong]</p>
            <p><span style={{ color: '#6ee7b7' }}>**Environment:**</span> Chrome 125 / macOS 14.4 / App v2.3.1</p>
            <p><span style={{ color: '#6ee7b7' }}>**Steps to Reproduce:**</span></p>
            <p>1. Navigate to [URL]</p>
            <p>2. Fill in [fields]</p>
            <p>3. Click [button]</p>
            <p><span style={{ color: '#6ee7b7' }}>**Expected:**</span> [What should happen]</p>
            <p><span style={{ color: '#6ee7b7' }}>**Actual:**</span> [What happens instead]</p>
            <p><span style={{ color: '#6ee7b7' }}>**Screenshot:**</span> [Attach annotated PNG]</p>
            <p><span style={{ color: '#6ee7b7' }}>**Severity:**</span> [Critical / High / Medium / Low]</p>
          </div>
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
          <p className="font-semibold text-foreground mb-2">Annotate bug screenshots for free</p>
          <p className="mb-4">FlowNote's annotation tools work in any browser, no install required.</p>
          <Link href="/annotate-screenshot-online" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Open Annotation Tool →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
