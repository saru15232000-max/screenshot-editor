import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-edit-screenshots';

const FAQ = [
  { q: 'Do I need to install software to edit screenshots?', a: 'No. FlowNote runs entirely in your web browser. Open the website, drop in your screenshot, and start editing immediately — no download, no install, no account.' },
  { q: 'What image formats can I edit?', a: 'FlowNote accepts JPG, PNG, WEBP, and GIF files. You can export your finished screenshot as JPG, PNG, or WEBP at your chosen quality level.' },
  { q: 'Will editing reduce my image quality?', a: 'Only lossy exports (JPG) involve quality reduction, and you control the compression level. Exporting as PNG preserves full quality. The editing process itself does not degrade the original image data.' },
  { q: 'Can I undo changes?', a: 'Yes. FlowNote supports multi-step undo. Press Ctrl+Z (Cmd+Z on Mac) or use the Undo button in the toolbar to step back through your editing history.' },
  { q: 'Can I edit multiple screenshots at once?', a: 'Currently FlowNote edits one screenshot per session. You can export your current image, then open a new screenshot to start a fresh session.' },
  { q: 'Are my edits saved automatically?', a: 'Because FlowNote is browser-based and privacy-first, it does not save to a server. Use the Export button to download your edited image to your device. If you close the tab, unsaved work is lost.' },
];

export default function HowToEditScreenshots() {
  useSEO({
    title: 'How to Edit Screenshots Online — Complete Guide | FlowNote',
    description: 'Learn how to edit screenshots in your browser: adjust brightness, add text, apply filters, retouch, and export. Step-by-step guide for beginners and pros.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'how to edit screenshots, edit screenshot online, screenshot editing guide, adjust screenshot brightness, add text to screenshot',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'How to Edit Screenshots', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [
      buildFAQSchema(FAQ),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Edit Screenshots Online — Complete Guide',
        description: 'A complete guide to editing screenshots in your browser using FlowNote.',
        url: `${BASE}/guides/${SLUG}`,
        author: { '@type': 'Organization', name: 'FlowNote' },
        publisher: { '@type': 'Organization', name: 'FlowNote', url: BASE },
      },
    ],
  });

  return (
    <GuideLayout breadcrumb="How to Edit Screenshots" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Beginner Guide · 8 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Edit Screenshots Online</h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Editing a screenshot used to mean opening Photoshop, Paint, or a desktop app. Today you can do everything — brightness, contrast, text overlays, filters, retouching, and export — entirely in a browser tab. This guide walks through the complete screenshot editing workflow using <Link href="/" className="text-indigo-600 underline">FlowNote</Link>, a free, privacy-first editor that processes images locally without uploading them to any server.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Why Edit Screenshots in a Browser?</h2>
          <p>Browser-based screenshot editors offer three advantages over desktop software: they require no installation, they work on any operating system, and the best ones — like FlowNote — keep your images entirely on your device. This matters when your screenshots contain sensitive information such as passwords, personal data, or confidential work.</p>
          <p className="mt-3">Traditional tools like GIMP or Photoshop are powerful but heavyweight. For the everyday task of annotating a bug report, blurring a password, or adding a label before sending a screenshot to a colleague, a browser editor is faster and simpler.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Step-by-Step: Editing a Screenshot in FlowNote</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Step 1 — Open Your Screenshot</h3>
          <p>Navigate to <Link href="/" className="text-indigo-600 underline">useflownote.online</Link>. You will see a drop zone on the homepage. Drag your screenshot directly onto the page, or click <strong>Open Screenshot</strong> to browse for a file. FlowNote accepts JPG, PNG, WEBP, and GIF. The image loads instantly — no upload progress bar, because nothing leaves your device.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Step 2 — Adjust Exposure and Colour</h3>
          <p>Once your image is loaded, open the <strong>Adjust</strong> tab in the left sidebar. You will find sliders for:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Brightness</strong> — lighten or darken the entire image</li>
            <li><strong>Contrast</strong> — increase the difference between light and dark areas</li>
            <li><strong>Saturation</strong> — boost or reduce colour intensity</li>
            <li><strong>Hue</strong> — shift all colours around the colour wheel</li>
            <li><strong>Blur</strong> — apply a global Gaussian blur (useful for creating depth-of-field effects or softening backgrounds)</li>
          </ul>
          <p className="mt-3">Below the sliders, you will find one-click <strong>Presets</strong>: Vivid, Matte, Noir, Vintage, Cool, Warm, and more. These apply a combination of adjustments in a single click and are a fast starting point when you want a consistent visual style.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Step 3 — Apply Filters</h3>
          <p>The <strong>Filters</strong> tab offers artistic processing options. Filters are applied on top of your adjustments and include options like Grayscale, Sepia, Invert, and High Contrast. These are useful for accessibility testing (to simulate what a UI looks like in greyscale) or for creating screenshots with a particular visual tone.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Step 4 — Add Text Overlays</h3>
          <p>Open the <strong>Text</strong> tab. Click <strong>Add Text</strong> to create a new text layer. Each layer is independently configurable:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Choose from 21 fonts across 5 categories (sans-serif, serif, monospace, display, handwriting)</li>
            <li>Set font size, colour, and opacity independently per layer</li>
            <li>Use the <strong>Pick from image</strong> colour tool to sample any pixel from your screenshot for exact colour matching</li>
            <li>Apply one of 18 style templates (Label, Caption, Code Block, Warning, Highlight, and more)</li>
            <li>Drag each layer to any position on the canvas</li>
          </ul>
          <p className="mt-3">The <strong>Font Analyzer</strong> is a standout feature. Click <strong>Analyze from image</strong>, then click on any text already in your screenshot. FlowNote samples the pixel region, measures stroke characteristics, and recommends the 3 closest matching fonts from its library — with confidence percentages.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Step 5 — Retouch Existing Content</h3>
          <p>The <strong>Retouch</strong> tab is where you remove or cover existing content in your screenshot. The workflow is:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Select the <strong>Eyedropper</strong> and click on your screenshot's background to sample its colour</li>
            <li>Switch to the <strong>Paint Brush</strong></li>
            <li>Paint over the area you want to remove — text, UI elements, or anything else</li>
            <li>The brush fills with the sampled background colour, creating a seamless cover</li>
          </ol>
          <p className="mt-3">For more complex backgrounds, use multiple eyedropper samples in different areas. Combine Retouch with the Blur slider for a blurred-background fill that blends more naturally.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Step 6 — Resize and Crop</h3>
          <p>Open the <strong>Layout</strong> tab to crop your screenshot or resize it to standard dimensions. Preset sizes include Instagram square (1080×1080), Twitter card (1200×628), Full HD (1920×1080), and custom width/height. Cropping removes unwanted borders and focuses attention on the relevant area.</p>

          <h3 className="text-base font-bold text-foreground mt-5 mb-2">Step 7 — Export</h3>
          <p>Click <strong>Download</strong> in the toolbar. Choose your format (JPG for smaller file size, PNG for lossless quality, WEBP for the best balance), adjust quality if exporting as JPG, and click <strong>Save</strong>. The file downloads directly to your device. Nothing is stored on any server.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Common Screenshot Editing Scenarios</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Annotating for a Bug Report</h3>
          <p>Add a red text label reading "Error here" above the relevant UI element. Use the <strong>Label</strong> template for a pre-styled callout box. See our full guide: <Link href="/guides/how-to-create-bug-report-screenshots" className="text-indigo-600 underline">How to Create Bug Report Screenshots</Link>.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Hiding Sensitive Data</h3>
          <p>Use the Blur slider for a global softening effect, or use the Retouch brush to cover specific fields like email addresses, phone numbers, or API keys. For detailed instructions, read <Link href="/guides/how-to-blur-sensitive-information" className="text-indigo-600 underline">How to Blur Sensitive Information</Link>.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Creating Tutorial Images</h3>
          <p>Use numbered text layers (1, 2, 3) at each step in a UI flow. Apply the <strong>Numbered Step</strong> template for a consistent style. See <Link href="/guides/how-to-annotate-screenshots" className="text-indigo-600 underline">How to Annotate Screenshots</Link>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Tips for Better Screenshot Editing</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Start with the highest-resolution screenshot available.</strong> Editing reduces effective resolution slightly due to rendering; starting large gives you more headroom.</li>
            <li><strong>Use PNG for screenshots with text.</strong> Text edges compress poorly as JPG — PNG preserves sharp edges.</li>
            <li><strong>Keep annotations minimal.</strong> One or two callouts communicate more clearly than a screenshot covered in arrows and labels.</li>
            <li><strong>Crop aggressively.</strong> Remove all UI chrome (window title bars, taskbars, browser tabs) unless they're relevant. The reader's attention should go to the content, not the frame.</li>
            <li><strong>Maintain consistent annotation styles.</strong> If you're creating a series of screenshots for documentation, use the same font, colour, and label style throughout.</li>
            <li><strong>Test at the display size.</strong> A font that looks fine at 100% zoom can become illegible when displayed at 50% in a document or wiki.</li>
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

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Related Guides</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/guides/how-to-annotate-screenshots', label: 'Annotate Screenshots' },
              { href: '/guides/how-to-blur-sensitive-information', label: 'Blur Sensitive Info' },
              { href: '/guides/how-to-take-professional-screenshots', label: 'Professional Screenshots' },
              { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
            ].map(l => (
              <Link key={l.href} href={l.href}>
                <a className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)', color: '#4f46e5' }}>
                  {l.label}
                </a>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </GuideLayout>
  );
}
