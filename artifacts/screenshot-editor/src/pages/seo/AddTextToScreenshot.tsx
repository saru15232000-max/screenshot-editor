import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Type, Palette, Move, AlignCenter, ScanSearch, Layers, Pipette, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowNote — Add Text to Screenshot Online',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: `${BASE}/add-text-to-screenshot-online`,
  description: 'Add text to screenshots online for free. 21 fonts, 18 style templates, draggable layers, color picker & opacity control. No signup required.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I add text to a screenshot online?', acceptedAnswer: { '@type': 'Answer', text: 'Upload your screenshot to FlowNote, click the Text tab, hit "Add Text", type your text, pick a font and style, then drag it anywhere on the canvas. Click Download when done.' } },
    { '@type': 'Question', name: 'Can I add multiple lines of text?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Add as many text layers as you like, each with its own font, color, size and position.' } },
  ],
};

export default function AddTextToScreenshot() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Add Text to Screenshot Online Free — FlowNote',
    description: 'Add text to any screenshot online. 21 fonts, 18 style templates, draggable layers & color picker. Free, no signup, no watermarks. Try FlowNote.',
    canonical: `${BASE}/add-text-to-screenshot-online`,
    keywords: 'add text to screenshot online, add text to screenshot free, screenshot text editor, type on screenshot online, add caption to screenshot',
    jsonLd: [jsonLd, faqSchema] as any,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Add Text to Screenshot Online — Free"
      tagline="21 fonts. 18 templates. Unlimited layers."
      intro="FlowNote makes it effortless to add text to any screenshot directly in your browser. Choose from 21 font families, 18 pre-built style templates, and full color/opacity control. Drag your text anywhere, stack unlimited layers, and export without watermarks — free, no account needed."
      ctaLabel="Add Text to Screenshot"
      features={[
        { icon: <Type className="w-5 h-5" />, title: '21 Font Families', desc: 'Sans-serif (Inter, Roboto), Serif (Georgia), Monospace (Mono), Display, and Handwriting fonts. Pro-quality typography at your fingertips.' },
        { icon: <Palette className="w-5 h-5" />, title: '18 Style Templates', desc: 'One-click styles: Neon Green, Movie Title, Watermark, Subtitle, Warning, Code Block, and 12 more. Perfect results with zero effort.' },
        { icon: <Move className="w-5 h-5" />, title: 'Drag to Position', desc: 'Drag any text layer freely across the canvas. Precise positioning without pixel-pushing — works on mobile too.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any color directly from your screenshot to use as your text color. Pixel-perfect color matching every time.' },
        { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Layers', desc: 'Add as many text layers as you need. Each has independent font, size, color, opacity, alignment, and position.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'Font Analyzer', desc: 'Click on existing text in your screenshot to detect its font. Match the original typography exactly with AI-powered analysis.' },
      ]}
      sections={[
        { heading: 'Add captions, callouts, labels & watermarks', body: 'FlowNote handles every text-on-screenshot use case. Add instructional captions to tutorial screenshots, use callout-style text to point out UI elements, label sections in documentation images, stamp a watermark on your work, or add subtitles to a product demo screengrab. Each text layer is fully independent.' },
        { heading: 'Professional typography for screenshot annotations', body: 'Choosing the right font makes your screenshot annotations look intentional rather than amateur. FlowNote\'s font categories help you match the context: use Inter or Roboto for modern UI annotations, Georgia for editorial captions, a monospace font for code references, or a display font for titles. The style templates handle the size, weight, and color combination automatically.' },
        { heading: 'Better than adding text in Paint or Word', body: 'Tools like MS Paint or Word aren\'t built for screenshot annotation. They lack font variety, layer control, and proper export options. FlowNote is purpose-built for adding text to screenshots, with a canvas-native workflow that produces clean, professional results without the workarounds.' },
      ]}
      faq={[
        { q: 'How do I add text to a screenshot online for free?', a: 'Open FlowNote, drop your screenshot, click the Text tab, click "Add Text", type your message, choose a font and style template, drag it into position, and click Download.' },
        { q: 'Can I change the font color of my text?', a: 'Yes — use the color picker to choose any hex color, select from presets, or use the eyedropper to sample a color from your screenshot.' },
        { q: 'How do I control the size of my text?', a: 'Use the font size slider in the Text tab. You can also adjust from small captions to large display headings.' },
        { q: 'Can I make text transparent?', a: 'Yes. Each text layer has an opacity slider from 0–100%. Use low opacity for watermarks, higher for callouts.' },
        { q: 'Will the text be embedded in the downloaded image?', a: 'Yes. When you click Download, all text layers are permanently baked into the image canvas before export.' },
      ]}
      relatedLinks={[
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
      ]}
      keywords={['add text to screenshot', 'add text to screenshot online', 'screenshot text editor', 'type on screenshot', 'add caption to screenshot online free']}
    />
  );
}
