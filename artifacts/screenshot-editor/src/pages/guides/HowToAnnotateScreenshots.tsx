import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-annotate-screenshots';

const FAQ = [
  { q: 'What is screenshot annotation?', a: 'Screenshot annotation means adding visual elements — text labels, callouts, arrows, numbered steps — to a screenshot to explain or highlight specific areas. It is widely used in bug reports, tutorials, UX reviews, and documentation.' },
  { q: 'What makes a good annotation?', a: 'A good annotation is specific, minimal, and consistent. It points to exactly the right element, uses as few words as possible to convey the meaning, and matches the style of other annotations in the same document.' },
  { q: 'Can I use multiple colours in my annotations?', a: 'Yes. In FlowNote, each text layer has its own colour setting. Use the colour picker or the eyedropper to sample colours from the screenshot itself for harmonious results.' },
  { q: 'How do I add arrows to a screenshot?', a: 'FlowNote uses styled text annotations rather than drawn shapes. The Arrow template creates a label with a directional indicator. For complex annotation needs, the text layer system supports callout styles that visually connect labels to interface elements.' },
  { q: 'How many text layers can I add?', a: 'There is no hard limit. You can add as many text layers as needed. Each layer is independently positioned and styled.' },
];

export default function HowToAnnotateScreenshots() {
  useSEO({
    title: 'How to Annotate Screenshots — Labels, Callouts & Arrows | FlowNote',
    description: 'Learn how to annotate screenshots with text labels, callouts, numbered steps, and highlights. A complete guide for developers, designers, and technical writers.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'how to annotate screenshots, add labels to screenshot, screenshot callouts, annotate screenshot online',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'How to Annotate Screenshots', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Annotate Screenshots', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="How to Annotate Screenshots" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Beginner Guide · 7 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Annotate Screenshots</h1>
          <p className="text-base leading-relaxed">
            A screenshot without annotation is a picture. A screenshot with the right annotation is communication. Whether you're filing a bug report, writing a tutorial, reviewing a design, or explaining a process to a colleague, well-placed labels and callouts turn a raw screenshot into an immediately actionable document. This guide covers the principles and practice of effective screenshot annotation using <Link href="/" className="text-indigo-600 underline">FlowNote</Link>.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Why Annotation Matters</h2>
          <p>Unannotated screenshots force the viewer to search for the relevant detail. In a bug report, this delays the developer. In a tutorial, it frustrates the learner. In a design review, it creates ambiguity about which element is being discussed.</p>
          <p className="mt-3">Annotation solves this by directing attention precisely. A single numbered callout ("1. Click here") reduces cognitive load dramatically compared to a paragraph of text describing a UI element's location. Studies of technical documentation consistently show that annotated screenshots reduce task completion time and error rates compared to text-only instructions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Types of Screenshot Annotations</h2>

          <h3 className="text-base font-bold text-foreground mb-2">1. Text Labels</h3>
          <p>The most basic annotation: a short text string positioned near the element being described. Best used for naming UI components ("Save button", "Error message", "Navigation menu"). Keep labels to 1–4 words. In FlowNote, use the <strong>Label</strong> template for a pre-styled pill shape that stands out against any background.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">2. Numbered Steps</h3>
          <p>For tutorial and workflow screenshots showing a multi-step process, number each action in sequence. FlowNote's <strong>Numbered Step</strong> template creates a consistent circular badge with a number inside. Place these at each point the user should interact with. Keep the sequence visible from left to right or top to bottom to match natural reading direction.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">3. Callout Boxes</h3>
          <p>A callout combines a label with a visual container (border, background colour) that frames the annotation distinctly from the screenshot content. Use callouts for longer explanations (up to one sentence) or to highlight errors and warnings. The <strong>Warning</strong> and <strong>Error</strong> templates in FlowNote apply red or amber styling automatically.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">4. Highlights</h3>
          <p>Sometimes you want to draw attention without adding text. A coloured overlay or border around a UI element serves this purpose. In FlowNote, use a transparent text layer with a background colour to create a highlight effect, or use the <strong>Highlight</strong> template.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">5. Code or Technical Annotations</h3>
          <p>For developer-focused screenshots, the <strong>Code Block</strong> template renders text in a monospace font with a dark background — useful for annotating screenshots of terminals, code editors, or API responses with technical detail.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Step-by-Step Annotation Workflow in FlowNote</h2>

          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <strong>Open your screenshot.</strong> Go to <Link href="/" className="text-indigo-600 underline">useflownote.online</Link> and drop in your image or click <em>Open Screenshot</em>.
            </li>
            <li>
              <strong>Open the Text tab.</strong> Click the Text icon in the left sidebar to access annotation tools.
            </li>
            <li>
              <strong>Add a text layer.</strong> Click <em>Add Text</em>. A new draggable layer appears on the canvas with default styling.
            </li>
            <li>
              <strong>Type your annotation.</strong> Click into the text field and type your label, number, or callout text.
            </li>
            <li>
              <strong>Choose a style template.</strong> Select from the 18 built-in templates: Label, Caption, Code Block, Warning, Error, Highlight, Numbered Step, and more. The template sets font, colour, background, and border in one click.
            </li>
            <li>
              <strong>Set the colour.</strong> Use the colour picker for a custom colour, or click <em>Pick from image</em> to use the eyedropper and sample a colour from your screenshot. Sampling the primary brand colour from a UI screenshot creates harmonious annotations.
            </li>
            <li>
              <strong>Position the layer.</strong> Drag the text layer to the correct position on the canvas. Annotations should be close to but not obscuring the element they describe.
            </li>
            <li>
              <strong>Add more layers.</strong> Repeat for each annotation. Each layer is fully independent and can be edited or repositioned at any time.
            </li>
            <li>
              <strong>Export.</strong> Click Download, choose PNG (recommended for annotated screenshots), and save to your device.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Annotation Best Practices</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Colour and Contrast</h3>
          <p>Annotations must be readable against the screenshot background. For light screenshots, use dark labels. For dark screenshots, use light labels. Avoid colours that blend with the UI being annotated — red on a red-themed app, for example, will be hard to spot. Use the eyedropper to identify the dominant colours in your screenshot, then choose a contrasting annotation colour.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Placement</h3>
          <p>Place annotations as close as possible to the element they describe, without overlapping the critical part of the UI. If the element is small, consider zooming the screenshot (crop to the relevant area and export at higher resolution) so the annotation has room to breathe. Annotations in a corner connected by a line to their target are clearer than annotations overlaid directly on the element.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Consistency Across a Series</h3>
          <p>If you are annotating multiple screenshots for a document or tutorial, establish a style guide: one font, one colour, one size. Inconsistent annotation styles signal unprofessionalism and make documents harder to read. In FlowNote, choosing a style template and then duplicating those settings across each session creates consistent results.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Economy of Labels</h3>
          <p>Annotate only what matters. A screenshot with 12 callouts is visually overwhelming and undermines all of them. Aim for 1–4 annotations per screenshot. If you need more, split the content into multiple screenshots covering different aspects of the same UI.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Use Cases by Profession</h2>
          <div className="space-y-3">
            {[
              { role: 'Developers & QA', use: 'Annotate bug screenshots with error location, expected vs. actual behaviour labels, and version numbers. See the full guide: How to Create Bug Report Screenshots.' },
              { role: 'Technical writers', use: 'Number each step in a procedural screenshot. Use callouts to name UI elements that may be unfamiliar to the reader.' },
              { role: 'Designers', use: 'Mark up design review screenshots with specific feedback labels ("Increase padding here", "This font weight is too light").' },
              { role: 'Customer support', use: 'Annotate support response screenshots to guide customers through the exact clicks needed to solve their issue.' },
              { role: 'Sales and marketing', use: 'Highlight key features in product screenshots for presentations and landing pages.' },
            ].map(item => (
              <div key={item.role} className="rounded-2xl p-4" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="font-semibold text-foreground">{item.role}</p>
                <p className="mt-1">{item.use}</p>
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
          <p className="font-semibold text-foreground mb-2">Annotate screenshots free, right now</p>
          <p className="mb-4">FlowNote's annotation tools are completely free and work in any modern browser. No account required.</p>
          <Link href="/annotate-screenshot-online" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Start Annotating →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
