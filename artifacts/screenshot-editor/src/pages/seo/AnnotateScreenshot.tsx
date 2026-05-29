import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Type, Layers, ScanSearch, Palette, Pipette, Download, Move, AlignLeft } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowNote — Annotate Screenshot Online',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: `${BASE}/annotate-screenshot-online`,
  description: 'Free screenshot annotation tool. Add text, callouts, highlights, and style templates directly on your screenshots — no signup required.',
  featureList: ['Text annotations', '18 style templates', '21 font families', 'Draggable layers', 'Opacity control', 'Color eyedropper'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I annotate a screenshot online?', acceptedAnswer: { '@type': 'Answer', text: 'Upload your screenshot to FlowNote, open the Text tab, click Add Text, type your annotation, style it, and drag it into position. Export when done.' } },
    { '@type': 'Question', name: 'Can I add multiple annotations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Add as many text layers as you need. Each layer has independent font, size, colour, opacity and position.' } },
  ],
};

export default function AnnotateScreenshot() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Annotate Screenshot Online Free — FlowNote',
    description: 'Add text, callouts & annotations to screenshots online. 21 fonts, 18 templates, draggable layers. No signup required. Try FlowNote free.',
    canonical: `${BASE}/annotate-screenshot-online`,
    keywords: 'annotate screenshot online, screenshot annotation tool, add text to screenshot, screenshot markup tool, online screenshot annotation',
    jsonLd: [jsonLd, faqSchema] as any,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Annotate Screenshots Online — Free"
      tagline="Add text, callouts & highlights in seconds."
      intro="FlowNote's screenshot annotation tool lets you add rich text overlays, callouts, and style templates to any screenshot directly in your browser. 21 font families, 18 pre-built templates, draggable layers, and per-layer opacity — no design skills needed."
      ctaLabel="Annotate Screenshot Free"
      features={[
        { icon: <Type className="w-5 h-5" />, title: 'Rich Text Annotations', desc: 'Add text in any font, size, weight, or style. Choose from 18 pre-built templates like Neon, Movie Title, Watermark, and more.' },
        { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Layers', desc: 'Stack as many annotation layers as you need. Each layer is independently draggable and editable at any time.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click on existing text in your screenshot to detect its font family, weight, and style — then match it perfectly.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Pixel-Perfect Colors', desc: 'Use the eyedropper to sample any color from your screenshot for exact-match annotations and callouts.' },
        { icon: <Move className="w-5 h-5" />, title: 'Drag & Position', desc: 'Drag any annotation anywhere on the canvas. Align text precisely with full positional control.' },
        { icon: <Download className="w-5 h-5" />, title: 'Export & Share', desc: 'All annotations are baked into the exported image. Download as PNG, JPG, or WEBP at full resolution.' },
      ]}
      sections={[
        { heading: 'Why annotate screenshots online?', body: 'Screenshot annotations communicate context that words alone cannot. Whether you\'re creating software documentation, writing bug reports, building tutorials, or providing visual feedback — annotated screenshots convey your message instantly. FlowNote makes annotation fast, free, and private.' },
        { heading: 'Perfect for developers, designers & teams', body: 'Developers use FlowNote to annotate bug screenshots with text callouts pointing to specific UI issues. Designers mark up wireframes and mockups with feedback notes. Customer support teams add instructional overlays to help users navigate software. All without downloading any tools.' },
        { heading: 'Best annotation alternative to Markup Hero & Awesome Screenshot', body: 'FlowNote offers the same annotation power as Markup Hero, Awesome Screenshot, and Monosnap — without the account, subscription, or watermark. 100% browser-based with your data staying fully private.' },
      ]}
      faq={[
        { q: 'How do I annotate a screenshot online for free?', a: 'Upload your screenshot to FlowNote, open the Text tab, click "Add Text", type your annotation, choose a style template, and drag it into position. Export when ready.' },
        { q: 'Can I add multiple text annotations to one screenshot?', a: 'Yes — add unlimited annotation layers. Each layer is independently styled and draggable.' },
        { q: 'What fonts are available for annotations?', a: 'FlowNote includes 21 font families across 5 categories: Sans-serif, Serif, Monospace, Display, and Handwriting.' },
        { q: 'Can I match the font in my screenshot?', a: 'Yes — use the AI Font Analyzer. Click on any text in your screenshot and FlowNote will suggest the top 3 matching fonts.' },
        { q: 'Are my annotations saved?', a: 'Annotations are baked into the exported image. The editing session is local and does not persist after you close the tab.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/add-text-to-screenshot-online', label: 'Add Text to Screenshot' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
      ]}
      keywords={['annotate screenshot online', 'screenshot annotation tool', 'screenshot markup tool', 'add text to screenshot online', 'free annotation tool']}
    />
  );
}
