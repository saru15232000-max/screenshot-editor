import { useCallback } from 'react';
import { useLocation, useParams } from 'wouter';
import {
  Wand2, Type, ScanSearch, Pipette, Eraser, Download,
  Brain, Layers, Shield, Zap, EyeOff, Lock, Globe,
  Move, Palette, AlignCenter, Clock, Star,
} from 'lucide-react';
import { SEOLandingPage, FeatureItem } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';
import { getPageBySlug, PageCategory } from '@/data/seo-pages';
import NotFound from '@/pages/not-found';

const BASE = 'https://useflownote.online';

const CATEGORY_FEATURES: Record<PageCategory, FeatureItem[]> = {
  core: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation, hue & blur. One-click presets: Vivid, Noir, Vintage, Chrome, Dramatic.' },
    { icon: <Type className="w-5 h-5" />, title: 'Text Overlays', desc: '21 fonts, 18 style templates, per-layer opacity & draggable layers. Pro typography, zero effort.' },
    { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click any text in your screenshot to get top 3 font matches with confidence scores.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel from your screenshot for pixel-perfect color matching.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Smart Retouch', desc: 'Paint over content with AI auto-patch or solid fill. Seamless, clean results every time.' },
    { icon: <Download className="w-5 h-5" />, title: 'Export Anywhere', desc: 'Download as PNG, JPG, or WEBP. Resize for social media or custom dimensions.' },
  ],
  annotation: [
    { icon: <Type className="w-5 h-5" />, title: '21 Font Families', desc: 'Sans-serif, Serif, Monospace, Display, and Handwriting. Professional typography for every context.' },
    { icon: <Palette className="w-5 h-5" />, title: '18 Style Templates', desc: 'One-click annotation styles: Neon, Movie Title, Watermark, Subtitle, Code Block, and more.' },
    { icon: <Move className="w-5 h-5" />, title: 'Drag to Position', desc: 'Drag any text layer freely. Precise placement without pixel-pushing.' },
    { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Layers', desc: 'Add as many annotation layers as you need, each independently styled and positioned.' },
    { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click any text in your screenshot to detect and match its font automatically.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any color from the screenshot to use as your text color for perfect matching.' },
  ],
  blur: [
    { icon: <EyeOff className="w-5 h-5" />, title: 'Global Blur Slider', desc: 'Apply gaussian blur to the entire screenshot with a simple slider control.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Precision Retouch Brush', desc: 'Paint over specific sensitive areas with solid fill or AI auto-patch.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Background Color Match', desc: 'Sample your background color for seamless, natural-looking redaction fills.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Local Processing Only', desc: 'All blur and retouch is done in your browser. Nothing is uploaded to any server.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Auto-Patch', desc: 'Smart mode samples surrounding pixels to generate context-aware fills automatically.' },
    { icon: <Download className="w-5 h-5" />, title: 'Permanent Export', desc: 'All redaction is permanently baked into the exported image. Unrecoverable for maximum privacy.' },
  ],
  ai: [
    { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Analyzes stroke width, ink density & serif characteristics to identify fonts in your screenshots.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Auto-Patch Retouch', desc: 'Samples surrounding pixels to generate seamless, context-aware background fills.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Smart Color Sampling', desc: 'Intelligent pixel analysis finds the most representative color in a region.' },
    { icon: <Wand2 className="w-5 h-5" />, title: 'AI Filter Presets', desc: 'Curated presets (Vivid, Noir, Vintage, Chrome) that optimize multiple parameters at once.' },
    { icon: <Lock className="w-5 h-5" />, title: 'Private AI Processing', desc: 'All AI features run locally in your browser. No cloud APIs, no data uploads.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Instant Results', desc: 'Client-side AI means instant processing — no round-trip to a server, no waiting.' },
  ],
  audience: [
    { icon: <Zap className="w-5 h-5" />, title: 'Instant Access', desc: 'No account, no software to install. Open the URL and start editing immediately.' },
    { icon: <Type className="w-5 h-5" />, title: 'Rich Annotations', desc: '21 fonts, 18 templates, and unlimited layers for clear, professional callouts.' },
    { icon: <EyeOff className="w-5 h-5" />, title: 'Blur & Redact', desc: 'Protect sensitive data before sharing. Precise brush control with AI auto-patch.' },
    { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation, and filter presets for polished output.' },
    { icon: <Shield className="w-5 h-5" />, title: '100% Private', desc: 'All processing happens locally. Your screenshots never leave your device.' },
    { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'PNG, JPG, WEBP — no watermarks, no branding, just your screenshot.' },
  ],
  alternative: [
    { icon: <Zap className="w-5 h-5" />, title: 'Instant — No Install', desc: 'Unlike desktop tools, FlowNote opens in seconds with no download or installation.' },
    { icon: <Lock className="w-5 h-5" />, title: 'No Account Required', desc: 'No email, no password, no trial activation. Every feature is immediately available.' },
    { icon: <Type className="w-5 h-5" />, title: 'Rich Text Overlays', desc: '21 fonts, 18 templates, draggable layers — matching the annotation depth of paid tools.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Font Detection', desc: 'A feature not available in most alternatives. Identifies fonts in your screenshots automatically.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Smart Retouch', desc: 'AI auto-patch retouch for seamless content removal — cleaner than basic blur tools.' },
    { icon: <Download className="w-5 h-5" />, title: 'No Watermarks. Ever.', desc: 'Export at full resolution with zero watermarks — no paid plan required.' },
  ],
  action: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Adjust & Filter', desc: 'Brightness, contrast, saturation, hue, blur and 5 filter presets.' },
    { icon: <Type className="w-5 h-5" />, title: 'Add Text', desc: '21 font families, 18 style templates, per-layer opacity and drag-to-position.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Retouch & Redact', desc: 'AI auto-patch and solid fill brush for seamless content removal.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel for exact color matching on text or retouch fills.' },
    { icon: <AlignCenter className="w-5 h-5" />, title: 'Crop & Resize', desc: 'Custom dimensions, social media presets, aspect ratio lock and flip/rotate.' },
    { icon: <Download className="w-5 h-5" />, title: 'Export', desc: 'PNG, JPG, or WEBP. No watermarks, no size limits, no account needed.' },
  ],
  platform: [
    { icon: <Globe className="w-5 h-5" />, title: 'Works in Any Browser', desc: 'Chrome, Firefox, Safari, Edge — full feature support across all modern browsers.' },
    { icon: <Lock className="w-5 h-5" />, title: 'No Extension Needed', desc: 'Works as a pure web app. No browser extensions, plugins or add-ons required.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Instant Load', desc: 'Opens immediately with no splash screens, loading bars or onboarding flows.' },
    { icon: <Shield className="w-5 h-5" />, title: 'No Permissions Needed', desc: 'No admin rights, no system permissions, no disk space required.' },
    { icon: <Type className="w-5 h-5" />, title: 'Full Feature Parity', desc: 'Every feature works identically on Windows, Mac, Linux and Chromebook.' },
    { icon: <Download className="w-5 h-5" />, title: 'No Install Export', desc: 'Download your edited screenshot directly from the browser. No file manager gymnastics.' },
  ],
  feature: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Fine-tune every visual parameter with sliders and one-click filter presets.' },
    { icon: <Type className="w-5 h-5" />, title: 'Rich Text Layers', desc: '21 fonts, 18 templates, draggable layers with full opacity and alignment control.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Retouch Brush', desc: 'AI auto-patch and solid fill modes with adjustable brush size and 20-step undo.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample exact pixel colors for perfect text color and background fill matching.' },
    { icon: <AlignCenter className="w-5 h-5" />, title: 'Crop & Resize', desc: 'Social media presets, custom dimensions, aspect ratio lock, flip and rotate.' },
    { icon: <Download className="w-5 h-5" />, title: 'Multi-Format Export', desc: 'PNG, JPG, WEBP at full resolution. No watermarks, no branding added.' },
  ],
  collaboration: [
    { icon: <Zap className="w-5 h-5" />, title: 'Zero Friction Access', desc: 'No accounts for any team member. Share the URL and everyone is ready to edit.' },
    { icon: <Type className="w-5 h-5" />, title: 'Clear Annotations', desc: '18 style templates create consistent, professional-looking annotations across your team.' },
    { icon: <EyeOff className="w-5 h-5" />, title: 'Privacy Protection', desc: 'Blur sensitive data before sharing screenshots in Slack, Jira or email.' },
    { icon: <Download className="w-5 h-5" />, title: 'Share-Ready Export', desc: 'Export in the right format for any collaboration platform your team uses.' },
    { icon: <Shield className="w-5 h-5" />, title: 'No Data Stored', desc: 'Screenshots processed locally. No file storage, no cloud sync, no data retention.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Works Everywhere', desc: 'Any browser, any OS, any location. Perfect for distributed and remote teams.' },
  ],
  software: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Software-Level Features', desc: 'Filters, AI tools, text layers, retouch and export — everything desktop software offers.' },
    { icon: <Zap className="w-5 h-5" />, title: 'No Install Overhead', desc: 'Open a URL and you\'re editing. No installers, no updates, no compatibility issues.' },
    { icon: <Lock className="w-5 h-5" />, title: 'No Licensing Costs', desc: 'Free forever. No per-seat fees, no annual renewals, no feature tier upgrades.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Built In', desc: 'Font analyzer and auto-patch retouch — features most paid software doesn\'t include.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Data Stays Local', desc: 'No cloud processing. Your screenshots are processed and stored only in your browser.' },
    { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'Full resolution PNG, JPG or WEBP export. No watermarks, no branding.' },
  ],
};

const COMMON_FAQ = [
  { q: 'Is FlowNote completely free?', a: 'Yes — 100% free with no feature limits, no watermarks, and no hidden tiers. Every tool is available to every user at no cost.' },
  { q: 'Do I need to create an account?', a: 'No account required. Open the page and every feature is immediately available.' },
  { q: 'Are my screenshots uploaded to a server?', a: 'Never. All processing happens locally in your browser via the Canvas API. Your screenshots never leave your device.' },
  { q: 'What file formats are supported?', a: 'FlowNote accepts JPG, PNG, WEBP, and GIF as input and exports JPG, PNG, or WEBP.' },
  { q: 'Does it work without an internet connection?', a: 'Yes — once the page is loaded, all editing features work offline.' },
];

export default function DynamicSEOPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const editor = useEditor();

  const page = getPageBySlug(params.slug);

  useSEO(page ? {
    title: page.title,
    description: page.description,
    canonical: `${BASE}/${page.slug}`,
    keywords: page.keywords.join(', '),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `FlowNote — ${page.h1}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: `${BASE}/${page.slug}`,
      description: page.description,
    },
  } : {
    title: 'FlowNote — Free Screenshot Editor Online',
    description: 'Free online screenshot editor. No signup required.',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  if (!page) return <NotFound />;

  const features = CATEGORY_FEATURES[page.category] ?? CATEGORY_FEATURES.core;
  const faq = [...COMMON_FAQ, ...(page.faqExtra ?? [])];
  const relatedLinks = (page.relatedSlugs ?? []).map(s => ({
    href: `/${s}`,
    label: s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  }));

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1={page.h1}
      tagline={page.tagline}
      intro={page.intro}
      features={features}
      faq={faq}
      relatedLinks={relatedLinks}
      sections={page.sections}
      keywords={page.keywords}
    />
  );
}
