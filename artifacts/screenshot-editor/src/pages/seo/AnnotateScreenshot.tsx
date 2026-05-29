import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Type, Layers, ScanSearch, Palette, Pipette, Move } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function AnnotateScreenshot() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Annotate Screenshot Online Free — FlowNote',
    description: 'Add text callouts, labels and annotations to screenshots online. 21 fonts, 18 templates, AI font detection. Free, no signup, no download.',
    canonical: `${BASE}/annotate-screenshot-online`,
    keywords: 'annotate screenshot online, screenshot annotation tool, add text to screenshot, screenshot markup tool, online screenshot annotation',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FlowNote — Annotate Screenshot Online',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: `${BASE}/annotate-screenshot-online`,
      description: 'Free screenshot annotation tool with 21 fonts, 18 templates and AI font detection.',
    },
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Annotate Screenshot Online — Free"
      tagline="Callouts, labels and text overlays. In seconds."
      intro="Annotated screenshots do more work than plain ones. A callout pointing to a button, a label naming a UI section, a step number in the corner — these small additions make documentation clearer, bug reports more actionable, and tutorials easier to follow. FlowNote gives you the typography tools to do this properly, without forcing you through a sign-up flow first."
      ctaLabel="Annotate Screenshot Free"
      stats={[
        { value: '21', label: 'Font families' },
        { value: '18', label: 'Style templates' },
        { value: '∞', label: 'Annotation layers' },
        { value: '0', label: 'Uploads required' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Drop your screenshot', desc: 'Drag it in or paste from clipboard. The canvas loads instantly — no processing delay.' },
        { num: '2', title: 'Add a text layer', desc: 'Open the Text tab and click Add Text. Type your annotation. Choose from 18 style templates or configure manually with font, size, color and weight.' },
        { num: '3', title: 'Drag it into position', desc: 'Grab the text layer and drag it to exactly where it needs to be on the canvas. Adjust opacity if you want it to sit lighter on the image.' },
        { num: '4', title: 'Add more layers and export', desc: 'Stack as many layers as you need. Each is independently editable until export. Download when done — all annotations baked in.' },
      ]}
      sections={[
        {
          heading: 'Good annotations make the difference in documentation',
          body: 'There\'s a specific frustration with documentation that has screenshots but no annotations. You\'re reading a help article, looking at a screenshot of a settings panel, and trying to figure out which setting the article is actually referring to. A single callout label eliminates that ambiguity. The problem has always been the friction of adding those labels — opening an image editor, choosing a font, placing text, dealing with file formats. FlowNote removes the friction without removing the control.',
        },
        {
          heading: 'Typography matters more than most people realize',
          body: 'The font choice for a screenshot annotation signals something about the product it\'s documenting. A rough sans-serif callout on a polished SaaS app screenshot looks inconsistent. FlowNote\'s font categories help you match the annotation style to the product: Inter or Roboto for modern product documentation, a monospace font when you\'re annotating developer tools, display fonts for tutorial thumbnails and marketing materials. The AI font analyzer goes further — click on existing text in your screenshot and it identifies the font, so your annotations can match exactly.',
        },
        {
          heading: 'When you need consistency across multiple screenshots',
          body: 'Single annotations are easy. The challenge is producing twenty annotated screenshots that all look like they belong together — same font, same size, same style. FlowNote\'s 18 pre-built style templates solve this. Choose a template once, and every text layer you add uses the same visual treatment. The "Neon Green" template, "Code Block" style, "Watermark" treatment, "Step Number" format — each is designed to be consistent and ready to use without manual styling.',
        },
      ]}
      useCases={[
        {
          role: 'Product Designer',
          scenario: 'I was handing off a set of UI mockup screenshots to engineering with feedback notes. I needed each annotation to be positioned over the element it referred to, with enough visual weight to be noticed but not so heavy it obscured the design.',
          outcome: 'Ten annotated mockups with consistent style, shared in under an hour.',
        },
        {
          role: 'Technical Writer',
          scenario: 'I was writing a step-by-step tutorial for a web app and needed numbered callouts on each screenshot. The numbers had to be visible against both dark and light background sections of the UI.',
          outcome: 'Step numbers added with the "Neon" template — high contrast, consistent across all screenshots.',
        },
        {
          role: 'QA Engineer',
          scenario: 'I needed to annotate a bug screenshot before filing a Jira ticket — pointing to the specific element that was broken and adding a label with the expected vs. actual behavior.',
          outcome: 'Bug report screenshot with precise callout. Less back-and-forth on the ticket.',
        },
      ]}
      features={[
        { icon: <Type className="w-5 h-5" />, title: 'Rich Text Engine', desc: '21 font families spanning Sans-serif, Serif, Monospace, Display and Handwriting. Full control over size, weight, color, opacity and alignment.' },
        { icon: <Palette className="w-5 h-5" />, title: '18 Style Templates', desc: 'Neon Green, Movie Title, Watermark, Subtitle, Code Block, Warning, Step Number — each a pre-designed combination ready to apply in one click.' },
        { icon: <Move className="w-5 h-5" />, title: 'Drag-to-Position Layers', desc: 'Every text layer is independently draggable. No coordinate entry, no grid snapping unless you want it. Position it visually.' },
        { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Annotation Layers', desc: 'Add as many text layers as the screenshot needs. Each is independently styled, positioned, and editable up until the moment you export.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click on any text in your screenshot to identify the font. The analyzer scores against 21 built-in font profiles using stroke width, ink density and serif detection.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel in the screenshot and use that exact color as your annotation text color. Useful when you want annotations that feel like they belong to the UI.' },
      ]}
      faq={[
        { q: 'How do I add a text annotation to a screenshot?', a: 'Open FlowNote, drop your screenshot, click the Text tab, then click Add Text. Type your annotation, choose a style template or configure manually, then drag the layer to position it. Export when done.' },
        { q: 'Can I add multiple annotations to one screenshot?', a: 'Yes — you can add unlimited text layers, each with independent styling, position, and opacity.' },
        { q: 'How does the AI font analyzer work?', a: 'Click any text region in your screenshot. The analyzer samples a 30×30 pixel area, measures stroke-to-background ratio (weight), detects vertical vs. horizontal ink patterns (serif/sans), and scores against 21 font profiles to surface the top 3 matches.' },
        { q: 'Are annotations baked into the exported file?', a: 'Yes. When you export, all text layers are rendered into the final image canvas. There are no separate layers in the output file.' },
        { q: 'Can I change an annotation after adding it?', a: 'Yes — before export, all layers remain editable. Click any text layer to select it, then modify font, color, size or position. Click export only when everything looks right.' },
        { q: 'What\'s the easiest way to get consistent annotations across multiple screenshots?', a: 'Pick a style template when adding your first text layer. Every subsequent layer will default to the same template, giving you visual consistency without re-configuring each time.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/add-text-to-screenshot-online', label: 'Add Text to Screenshot' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
        { href: '/screenshot-editor-for-developers', label: 'For Developers' },
        { href: '/screenshot-editor-for-documentation', label: 'For Documentation' },
      ]}
      keywords={['annotate screenshot online', 'screenshot annotation tool', 'screenshot markup tool', 'add callout to screenshot', 'annotate screenshot free']}
    />
  );
}
