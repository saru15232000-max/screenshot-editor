import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Type, Palette, Move, Layers, Pipette, ScanSearch } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function AddTextToScreenshot() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Add Text to Screenshot Online Free — FlowNote',
    description: 'Add text to any screenshot online. 21 fonts, 18 style templates, draggable layers, color picker and opacity control. Free, no signup, no watermarks.',
    canonical: `${BASE}/add-text-to-screenshot-online`,
    keywords: 'add text to screenshot online, add text to screenshot free, screenshot text editor, type on screenshot online, add caption to screenshot',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FlowNote — Add Text to Screenshot Online',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: `${BASE}/add-text-to-screenshot-online`,
      description: 'Add text to screenshots online. 21 fonts, 18 templates, draggable layers.',
    },
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Add Text to Screenshot Online — Free"
      tagline="21 fonts. 18 templates. Drag anywhere. Export clean."
      intro="Adding text to a screenshot should take thirty seconds, not ten minutes. FlowNote gives you proper typography tools — not just a text field with one font — so you can add callouts, captions, labels, watermarks, and step numbers that actually look good. The AI font analyzer helps you match what's already in the screenshot when you need consistency."
      ctaLabel="Add Text to Screenshot"
      stats={[
        { value: '21', label: 'Font families' },
        { value: '18', label: 'Style templates' },
        { value: '∞', label: 'Text layers' },
        { value: '20', label: 'Undo steps' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open your screenshot', desc: 'Drop it in or paste from clipboard. FlowNote accepts JPG, PNG, WEBP and GIF.' },
        { num: '2', title: 'Add a text layer', desc: 'Click the Text tab, then Add Text. Type your label, caption or callout.' },
        { num: '3', title: 'Style it', desc: 'Pick a font from 21 families, choose a style template for instant formatting, or configure size, weight and color manually. Use the eyedropper to sample a color from the screenshot itself.' },
        { num: '4', title: 'Position and export', desc: 'Drag the layer to exactly where it needs to be. Add more layers if needed. Download when done — all text baked permanently into the export.' },
      ]}
      sections={[
        {
          heading: 'Typography on screenshots: why it matters',
          body: 'When you add text to a screenshot with the wrong font or at the wrong size, it makes the whole thing look unprofessional — even if the underlying screenshot is clean. A chunky system font pasted over a polished SaaS UI looks wrong. A thin decorative font on a dark background becomes unreadable. FlowNote\'s 18 pre-built style templates handle the pairing problem: they\'re designed combinations that work across common screenshot contexts. "Code Block" for developer documentation, "Warning" for error state callouts, "Subtitle" for instructional captions, "Neon Green" for high-contrast annotations on dark UIs. One click gets you to something that looks intentional.',
        },
        {
          heading: 'What each text-adding use case actually needs',
          body: 'Documentation callouts need high contrast and precision placement. Tutorial step numbers need consistency across screenshots — the same font, same size, same position logic. Social media captions need large text that works at thumbnail size. Watermarks need low opacity and a specific positional treatment. Bug report annotations need to be legible without obscuring the bug itself. FlowNote\'s layer system handles all of these differently. Each layer is independent — you can have a large Neon callout on one part of the screenshot and a small Subtitle label somewhere else, each with separate opacity and size settings.',
        },
        {
          heading: 'The AI font analyzer for matching existing text',
          body: 'This comes up more than you\'d expect. You\'re adding annotation text to a screenshot that already contains product UI text, and you want your annotation to feel like part of the same design language. Or you\'re creating a comparison document and want both sides to use the same typography. The font analyzer lets you click on any existing text in the screenshot and get a ranked list of font matches. It\'s not always exact — particularly with fonts that have been slightly blurred by JPEG compression or rendered at small sizes — but it\'s usually close enough to use as a starting point.',
        },
      ]}
      useCases={[
        {
          role: 'Content Creator',
          scenario: 'I needed to add step numbers and captions to a set of tutorial screenshots for a YouTube video. The numbers had to be large, visible against both light and dark parts of the UI, and consistent across twelve screenshots.',
          outcome: 'Step numbers added with the "Neon Green" template. Consistent across the full set.',
        },
        {
          role: 'Designer',
          scenario: 'I was annotating UI mockups for a client presentation. The client needed to see which elements were interactive and which were static. I used different text styles for each type of annotation to create a visual hierarchy.',
          outcome: 'Two-tier annotation system created with different templates. Presentation landed cleanly.',
        },
        {
          role: 'Developer',
          scenario: 'I needed to add a "DEPRECATED" watermark to documentation screenshots for an old API that was being retired, so users would know at a glance that the content was outdated.',
          outcome: 'Watermark applied with low opacity using the "Watermark" template. Applied consistently across twenty screenshots.',
        },
      ]}
      features={[
        { icon: <Type className="w-5 h-5" />, title: '21 Font Families', desc: 'Inter, Roboto, Georgia, Mono, Display, Handwriting — organized by category. The right font for every screenshot context.' },
        { icon: <Palette className="w-5 h-5" />, title: '18 Style Templates', desc: 'Pre-designed combinations covering the most common annotation needs. One click sets font, size, weight, color and opacity together.' },
        { icon: <Move className="w-5 h-5" />, title: 'Drag-to-Position', desc: 'Grab any text layer and drag it anywhere on the canvas. No coordinate entry. Works on mobile too.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel from the screenshot for use as your text color. Useful when you want annotations that feel native to the UI.' },
        { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Independent Layers', desc: 'Add as many text layers as the screenshot needs. Each has independent font, size, color, opacity, alignment and position.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Matching', desc: 'Click any text in your screenshot to identify its font family. Use that as your annotation font for visual consistency.' },
      ]}
      faq={[
        { q: 'How do I add text to a screenshot online for free?', a: 'Open FlowNote, drop your screenshot, click the Text tab, click Add Text, type your text, choose a font and style, drag it into position, and click Download.' },
        { q: 'Can I add multiple text layers?', a: 'Yes — unlimited layers, each independently styled, positioned, and editable before export.' },
        { q: 'How do I make the text a specific color?', a: 'Use the color picker in the text settings, enter a hex value, or use the eyedropper to sample a color directly from your screenshot.' },
        { q: 'Can I control text transparency?', a: 'Yes. Each text layer has an opacity slider from 0 to 100%. Use low opacity for watermarks, full opacity for callouts.' },
        { q: 'Will the text be part of the downloaded image?', a: 'Yes. All text layers are permanently rendered into the image canvas at export time. The downloaded file is a flat image with no editable layers.' },
        { q: 'Can I match the font that\'s already in my screenshot?', a: 'Yes — use the AI font analyzer. Click on any text in the screenshot and FlowNote identifies the top 3 matching fonts by analyzing stroke characteristics.' },
      ]}
      relatedLinks={[
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
        { href: '/screenshot-editor-for-documentation', label: 'For Documentation' },
      ]}
      keywords={['add text to screenshot', 'add text to screenshot online', 'screenshot text editor', 'add caption to screenshot online free']}
    />
  );
}
