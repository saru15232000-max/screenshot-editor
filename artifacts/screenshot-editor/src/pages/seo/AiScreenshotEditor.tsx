import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Brain, ScanSearch, Sparkles, Wand2, Pipette, Eraser, Layers, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowNote — AI Screenshot Editor',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: `${BASE}/ai-screenshot-editor`,
  description: 'AI-powered screenshot editor. AI font analyzer, smart retouch, auto-patch, and intelligent editing tools — free, no signup.',
  featureList: ['AI Font Analyzer', 'Smart Auto-Patch Retouch', 'Intelligent color sampling', 'AI-powered filter presets'],
};

export default function AiScreenshotEditor() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'AI Screenshot Editor Free — FlowNote',
    description: 'AI-powered screenshot editor with font analyzer, smart retouch & auto-patch tools. Edit smarter, not harder. Free, no signup. Try FlowNote.',
    canonical: `${BASE}/ai-screenshot-editor`,
    keywords: 'AI screenshot editor, AI powered screenshot editing, smart screenshot editor, AI font analyzer, AI screenshot annotation, AI screenshot tool',
    jsonLd,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="AI Screenshot Editor — Smart Editing Tools"
      tagline="Font detection, smart retouch & AI-powered editing."
      intro="FlowNote brings AI-powered intelligence to screenshot editing. Detect fonts from any screenshot automatically, use smart auto-patch retouch to remove content seamlessly, and get intelligent color suggestions — all running locally in your browser with zero uploads."
      ctaLabel="Try AI Screenshot Editor"
      features={[
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click any text in your screenshot. FlowNote\'s AI analyzes stroke width, ink density, and serif characteristics to identify the top 3 matching font families with confidence scores.' },
        { icon: <Eraser className="w-5 h-5" />, title: 'Smart Auto-Patch Retouch', desc: 'AI-powered auto mode samples surrounding pixels to generate seamless, context-aware fills when removing text or objects from screenshots.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Intelligent Color Sampling', desc: 'The smart eyedropper analyzes the pixel region around your click point to suggest the most representative color for perfect background matching.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Smart Filter Presets', desc: 'One-click AI-curated presets (Vivid, Noir, Vintage, Chrome, Dramatic) automatically adjust multiple parameters for optimal screenshot presentation.' },
        { icon: <Brain className="w-5 h-5" />, title: 'Intelligent Annotation', desc: '18 AI-designed style templates with pre-optimized font/size/color combinations for professional-looking annotations with zero design effort.' },
        { icon: <Sparkles className="w-5 h-5" />, title: 'Local AI Processing', desc: 'All AI features run entirely in your browser using client-side algorithms. No cloud API calls, no data uploads, complete privacy.' },
      ]}
      sections={[
        { heading: 'AI tools that run entirely in your browser', body: 'FlowNote\'s AI features are powered by client-side algorithms running in your browser via the Canvas API. The font analyzer uses statistical analysis of stroke characteristics. The auto-patch system uses pixel sampling and interpolation. No OpenAI API, no cloud processing — just smart in-browser intelligence that\'s private by design.' },
        { heading: 'Font detection: how the AI works', body: 'When you activate the Font Analyzer and click on text in your screenshot, FlowNote samples a 30×30 pixel region around your click. It analyzes the stroke-to-background ratio (measuring font weight), detects vertical and horizontal strokes (identifying serif vs. sans-serif), and measures ink distribution (detecting monospaced fonts). These metrics are scored against 21 built-in font profiles to surface your top 3 matches.' },
        { heading: 'Smart retouch: AI-powered content removal', body: 'The auto-patch retouch mode examines a 10-pixel border around your brush stroke to sample the surrounding background texture. It creates a weighted average of those neighboring pixels to fill the painted area with a blend that matches the background — reducing visible edit marks and producing cleaner results than a flat solid fill.' },
      ]}
      faq={[
        { q: 'What AI features does FlowNote have?', a: 'FlowNote includes an AI font analyzer that detects fonts from your screenshot, a smart auto-patch retouch tool that generates context-aware fills, and an intelligent color sampler.' },
        { q: 'Does the AI send my screenshot to a server?', a: 'No. All AI processing is done locally in your browser. Nothing is uploaded. FlowNote has no backend AI API.' },
        { q: 'How accurate is the font analyzer?', a: 'The font analyzer works best on clean, high-contrast text. It analyzes stroke width, serif characteristics, and ink density to match against 21 font profiles, typically identifying common UI fonts (Inter, Roboto, etc.) with high confidence.' },
        { q: 'What is auto-patch retouch?', a: 'Auto-patch samples the pixels surrounding your brush stroke and creates a blended fill that matches the background. This produces smoother, less visible edits compared to a flat color fill.' },
        { q: 'Is the AI screenshot editor free?', a: 'Yes, completely free. All AI features are included with no account or payment required.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
      ]}
      keywords={['AI screenshot editor', 'AI font analyzer', 'smart screenshot editor', 'AI powered screenshot tool', 'intelligent screenshot editing']}
    />
  );
}
