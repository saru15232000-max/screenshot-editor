import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-take-professional-screenshots';

const FAQ = [
  { q: 'What resolution should screenshots be for documentation?', a: 'Aim for at least 1440px wide for desktop UI screenshots. This gives enough resolution for zooming in without pixelation. Retina/HiDPI displays capture at 2x resolution, which is ideal — the file is large but the quality is excellent when displayed at 1x.' },
  { q: 'Should I use a clean browser profile for screenshots?', a: 'Yes, when possible. A dedicated "screenshot" browser profile with no extensions, a clean bookmarks bar, and a neutral theme produces professional results. Browser extensions, open tabs, and personal bookmarks are distracting and unprofessional in product screenshots.' },
  { q: 'What is the best file format for professional screenshots?', a: 'PNG for UI screenshots containing text and sharp edges. PNG is lossless and preserves font rendering exactly. Use JPG only for photographic content where file size matters more than perfect sharpness.' },
  { q: 'How do I capture a full-page screenshot?', a: 'Most browsers have a built-in full-page screenshot option in DevTools (Firefox and Chrome both support this). Alternatively, browser extensions like GoFullPage capture the full scrollable page as a single image.' },
  { q: 'How do I make my screenshots look consistent across a documentation set?', a: 'Use the same browser at the same zoom level (100%), the same window size, the same OS theme (light or dark), and the same annotation style (font, colour, size) throughout. A style guide for your documentation screenshots prevents the inconsistency that makes documentation look amateurish.' },
];

export default function HowToTakeProfessionalScreenshots() {
  useSEO({
    title: 'How to Take Professional Screenshots — Quality & Composition Guide | FlowNote',
    description: 'Master screenshot quality, resolution, composition, and editing techniques that make UI screenshots look polished and professional.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'professional screenshots, high quality screenshots, screenshot composition, how to take good screenshots, screenshot tips',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'Professional Screenshots', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Take Professional Screenshots', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="Professional Screenshots" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Design Guide · 8 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Take Professional Screenshots</h1>
          <p className="text-base leading-relaxed">The difference between an amateur and a professional screenshot is not always the editing — it often starts before you press the capture button. Window size, browser profile, zoom level, system theme, and composition all shape the quality of the final image. This guide covers every stage of the professional screenshot workflow, from setup through editing in <Link href="/" className="text-indigo-600 underline">FlowNote</Link> to export.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Before You Capture: Environment Setup</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Browser and System</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Use a clean browser profile.</strong> Create a dedicated profile with no extensions, no bookmarks bar, and a neutral theme. Extensions add toolbar icons that look unprofessional and irrelevant. Bookmarks bar adds visual clutter.</li>
            <li><strong>Set zoom to 100%.</strong> Screenshots taken at non-standard zoom levels produce blurry or oddly sized text. Ctrl+0 (Cmd+0 on Mac) resets to 100%.</li>
            <li><strong>Choose your theme deliberately.</strong> Decide whether your documentation will use light or dark mode screenshots and stick to it throughout. Mixed themes in the same document look inconsistent.</li>
            <li><strong>Hide the taskbar or dock.</strong> If capturing full-screen or windowed screenshots that include the OS frame, temporarily hide the taskbar (Windows) or dock (Mac) to reduce distraction.</li>
            <li><strong>Close unnecessary windows and notifications.</strong> Disable notifications during screenshot sessions. An incoming email or Slack message appearing in a corner ruins a screenshot.</li>
          </ul>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Window Size and Resolution</h3>
          <p>For desktop UI screenshots, a standard window width of 1280px or 1440px at 100% browser zoom produces results that look good in most documentation formats. If you're targeting a specific display size (mobile, tablet, a particular documentation column width), resize your browser window accordingly before capturing.</p>
          <p className="mt-2">On Retina/HiDPI displays, screenshots are captured at 2x pixel density. This means a 1440px-wide browser window produces a 2880px-wide screenshot. This is excellent — the high density allows zooming in without pixelation. When using these images in documentation, display them at 50% (half their pixel dimensions) so they render sharply.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Composition Principles</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Show Only What Is Relevant</h3>
          <p>Every pixel in a screenshot should contribute to the reader's understanding. Crop aggressively to remove: browser tabs, window title bars (unless relevant), surrounding context that is not part of the UI being documented, and empty white space at the margins.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Centre the Subject</h3>
          <p>The UI element you are documenting should be centred or given visual prominence within the cropped frame. A button buried in the bottom-left corner of a large screenshot forces the reader to search. Crop so the relevant element has breathing room but is clearly the focus.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Consistent Margins</h3>
          <p>When creating a series of screenshots, use consistent padding around the cropped area. In FlowNote's Layout tab, you can add padding around the crop. A consistent 20–40px margin around each subject creates a professional, uniform look throughout a documentation set.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Capture the Right State</h3>
          <p>Screenshots should show the UI in the state the user will encounter it. If documenting a hover state, capture it hovered. If documenting a filled form, fill it with realistic (but fictitious) data rather than "test", "aaa", or "12345". Unrealistic placeholder data in screenshots undermines the professional appearance of the documentation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Post-Capture Editing in FlowNote</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Brightness and Contrast</h3>
          <p>Minor brightness and contrast adjustments can significantly improve screenshot legibility, especially in dark-mode UIs where text may appear grey-on-dark-grey. A slight contrast boost (5–10%) makes text sharper without looking over-processed. Use the Adjust tab sliders.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Removing Distractions</h3>
          <p>Use the Retouch tab to paint over: test data you forgot to remove, irrelevant error messages from other features, UI elements that are in scope but not yet implemented (to avoid confusing readers), and personal information.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Adding Consistent Annotations</h3>
          <p>If your documentation uses numbered steps, establish the style in your first screenshot (font size, circle size, colour) and maintain it throughout. A mismatch in annotation style — a large red "1" in one screenshot and a small blue "1" in the next — signals inconsistency and reduces trust in the documentation's quality.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Exporting</h3>
          <p>Export as PNG. Use a descriptive filename that includes the feature name, screen name, and a version or date if the UI changes frequently. Avoid screenshot.png, image1.png, or Untitled.png — these become impossible to organise at scale.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Professional Screenshot Checklist</h2>
          <div className="space-y-2">
            {[
              'Clean browser profile (no extensions, no personal bookmarks)',
              'Browser zoom set to 100%',
              'Consistent theme (light or dark) for the whole documentation set',
              'Notifications disabled during capture session',
              'Realistic placeholder data in any visible form fields',
              'Cropped to remove irrelevant chrome and context',
              'Consistent margins around the subject',
              'Personal data redacted',
              'Annotation style consistent with other screenshots in the set',
              'Exported as PNG with a descriptive filename',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <span className="w-5 h-5 rounded-full fn-gradient-bg flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </div>
            ))}
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
          <p className="font-semibold text-foreground mb-2">Edit and polish your screenshots free</p>
          <p className="mb-4">FlowNote gives you professional editing tools — adjustments, annotations, retouch — in your browser with no install.</p>
          <Link href="/free-screenshot-editor-online" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Open FlowNote Free →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
