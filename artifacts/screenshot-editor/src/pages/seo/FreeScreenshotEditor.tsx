import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Wand2, Type, ScanSearch, Pipette, Eraser, Download, Layers, Zap } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowNote — Free Screenshot Editor Online',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: `${BASE}/free-screenshot-editor-online`,
  description: 'Free online screenshot editor. Add text, annotations, blur sensitive data, and export in PNG, JPG or WEBP — no signup required.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1240' },
  featureList: ['Text overlays', 'Image filters', 'Font analyzer', 'Color eyedropper', 'Retouch brush', 'Export PNG/JPG/WEBP'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is FlowNote really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. FlowNote is 100% free with no hidden plans, watermarks, or limits.' } },
    { '@type': 'Question', name: 'Do I need to create an account?', acceptedAnswer: { '@type': 'Answer', text: 'No account needed. Open your screenshot and start editing instantly.' } },
    { '@type': 'Question', name: 'Does FlowNote upload my screenshots?', acceptedAnswer: { '@type': 'Answer', text: 'Never. All processing happens in your browser using the Canvas API.' } },
  ],
};

export default function FreeScreenshotEditor() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Free Screenshot Editor Online — FlowNote',
    description: 'Edit screenshots for free in your browser. Add text, blur, annotations & filters. No signup, no download, no watermarks. Try FlowNote free today.',
    canonical: `${BASE}/free-screenshot-editor-online`,
    keywords: 'free screenshot editor online, screenshot editor free, edit screenshot online free, free screenshot editing tool, screenshot editor no watermark',
    jsonLd: [jsonLd, faqSchema] as any,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Free Screenshot Editor Online"
      tagline="No signup. No watermarks. No limits."
      intro="FlowNote is the best free screenshot editor that runs entirely in your browser. Add text overlays, annotations, blur sensitive information, apply filters, and export in seconds — completely free, forever."
      ctaLabel="Edit Screenshot Free"
      features={[
        { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation, hue & blur. One-click presets including Vivid, Noir, Vintage and Chrome.' },
        { icon: <Type className="w-5 h-5" />, title: 'Text Overlays', desc: '21 fonts, 18 style templates, draggable layers with per-layer opacity. Style your annotations like a pro.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'Font Analyzer', desc: 'AI-powered font detection. Click any text in your screenshot and get the top 3 matching fonts instantly.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel from your screenshot for pixel-perfect colour matching on text or retouch fills.' },
        { icon: <Eraser className="w-5 h-5" />, title: 'Smart Retouch', desc: 'Paint over sensitive text or elements with background-matched fill. No Photoshop needed.' },
        { icon: <Download className="w-5 h-5" />, title: 'Export Anywhere', desc: 'Download as PNG, JPG, or WEBP. Resize to social media presets or custom dimensions.' },
      ]}
      sections={[
        { heading: 'Why choose a free online screenshot editor?', body: 'Desktop screenshot editors require downloads, installations, and often subscriptions. FlowNote gives you the same professional tools in any browser — on Windows, Mac, Linux, or Chromebook — without installing a single file. Open a screenshot, make your edits, and download the result in under a minute.' },
        { heading: 'What can you do with FlowNote?', body: 'FlowNote covers every screenshot editing task you encounter: highlighting UI elements with text overlays, blurring passwords or personal information, adjusting colours and brightness, removing unwanted elements with the retouch brush, and exporting in the right format for your platform.' },
        { heading: 'The best free Snagit & Lightshot alternative', body: 'Looking for a free Snagit alternative or a Lightshot replacement? FlowNote brings advanced annotation and editing tools to your browser without the cost. No download, no subscription — just open your screenshot and start editing.' },
      ]}
      faq={[
        { q: 'Is FlowNote really 100% free?', a: 'Yes. FlowNote is completely free with no hidden tiers, no watermarks, and no feature limits.' },
        { q: 'Do I need to create an account to use it?', a: 'No account, no sign-up. Just open the page, drop in your screenshot, and start editing.' },
        { q: 'Will my screenshots be uploaded to a server?', a: 'Never. All editing happens locally in your browser via the Canvas API. Your files never leave your device.' },
        { q: 'What file formats does FlowNote support?', a: 'FlowNote accepts JPG, PNG, WEBP, and GIF as input, and exports JPG, PNG, or WEBP.' },
        { q: 'Does it work on Mac and Windows?', a: 'Yes — FlowNote works on any operating system with a modern browser including Chrome, Firefox, Safari, and Edge.' },
      ]}
      relatedLinks={[
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
        { href: '/add-text-to-screenshot-online', label: 'Add Text to Screenshot' },
      ]}
      keywords={['free screenshot editor', 'screenshot editor online free', 'best free screenshot editor', 'screenshot editor no watermark', 'snagit alternative free']}
    />
  );
}
