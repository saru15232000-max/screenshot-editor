import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Brain, ScanSearch, Eraser, Pipette, Wand2, Zap } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function AiScreenshotEditor() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'AI Screenshot Editor Free — FlowNote',
    description: 'AI-powered screenshot editor with font analyzer, smart auto-patch retouch and intelligent color sampling. Runs entirely in your browser. Free, no signup.',
    canonical: `${BASE}/ai-screenshot-editor`,
    keywords: 'AI screenshot editor, AI powered screenshot editing, smart screenshot editor, AI font analyzer, AI screenshot tool',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FlowNote — AI Screenshot Editor',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: `${BASE}/ai-screenshot-editor`,
      description: 'AI-powered screenshot editing with font detection, smart retouch and color sampling. Browser-based, free.',
      featureList: ['AI Font Analyzer', 'Smart Auto-Patch Retouch', 'Intelligent color sampling'],
    },
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="AI Screenshot Editor"
      tagline="Font detection, smart retouch and intelligent fills — all in your browser."
      intro="Most tools that put 'AI' in the name are either using it for marketing or sending your data to a cloud service to process it. FlowNote's AI features run entirely in your browser using canvas-based algorithms. No API calls, no uploads, no latency. The font analyzer, auto-patch retouch, and smart color sampling all happen locally — which also means your screenshots never leave your device."
      ctaLabel="Try AI Screenshot Editor"
      stats={[
        { value: '100%', label: 'Local AI processing' },
        { value: '21', label: 'Font profiles analyzed' },
        { value: '0ms', label: 'Upload latency' },
        { value: '0', label: 'Cloud APIs used' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Drop in a screenshot', desc: 'Any JPG, PNG, WEBP or GIF. Paste from clipboard or drag onto the canvas.' },
        { num: '2', title: 'Activate font detection', desc: 'Open the Text tab, click the font analyzer, then click any text in your screenshot. Results appear in under a second.' },
        { num: '3', title: 'Use smart retouch', desc: 'In the Retouch tab, switch to auto-patch mode. Paint over content you want removed — the AI fills the area using surrounding pixel data.' },
        { num: '4', title: 'Export privately', desc: 'Download your edited screenshot. Nothing was sent to any server during the entire process.' },
      ]}
      sections={[
        {
          heading: 'How the font analyzer actually works',
          body: 'When you click on text in a screenshot, the analyzer samples a 30×30 pixel region centered on your click. It computes the stroke-to-background ratio — this correlates with font weight, so a high ratio suggests bold or heavy weights, a low ratio suggests thin or light. It then analyzes the ink distribution pattern: mostly vertical strokes indicate a sans-serif or modern face; vertical plus horizontal strokes suggest serifs or slab serifs; roughly equal distribution in all directions suggests a monospace font. These metrics are scored against 21 built-in font profiles to generate a ranked list of matches with confidence percentages. It\'s not perfect — it struggles with very small text or heavily compressed screenshots — but for standard UI fonts at normal sizes, it\'s accurate enough to be genuinely useful.',
        },
        {
          heading: 'What makes auto-patch retouch different',
          body: 'Standard content removal in basic tools works like this: you paint over an area and it fills with a solid color. The result looks obviously edited. Auto-patch mode does something more useful. Before applying the fill, it samples a 10-pixel border around your brush stroke — all the pixels that immediately surround the area you\'re painting. It takes a weighted average of those neighboring pixels and uses that as the fill color, blending from the center outward. The result is a fill that fades naturally into the surrounding area, reducing the "patched" appearance. It works best when the background is relatively uniform — solid color backgrounds, gradients, simple textures. It\'s less effective on complex patterns, but even then, it produces better results than a flat fill.',
        },
        {
          heading: 'Why local AI matters for screenshot tools',
          body: 'Cloud-based AI tools for screenshot editing face a real trust problem. To process your screenshot, they have to send it to a server. For personal screenshots — one-off edits of random images — that might feel acceptable. But professional screenshots often contain sensitive content: API keys in terminal windows, customer data in dashboards, confidential business information in spreadsheets. Sending those to a third-party server for AI processing creates a data exposure risk that most users don\'t think about until it\'s too late. FlowNote\'s approach eliminates that risk entirely. The AI processing happens in your browser. It never leaves your machine.',
        },
      ]}
      useCases={[
        {
          role: 'Designer',
          scenario: 'I was trying to match the typography in a competitor\'s UI screenshot for a comparison document. Instead of squinting at font characteristics, I used FlowNote\'s font analyzer to identify it directly from the screenshot.',
          outcome: 'Font identified in two seconds. Comparison document typography matched perfectly.',
        },
        {
          role: 'Developer',
          scenario: 'I had a terminal screenshot with a visible environment variable. I needed to remove it cleanly — not just paint a black box over it, but make it look like the variable was never there.',
          outcome: 'Auto-patch retouch blended the fill with the terminal background. Near-invisible edit.',
        },
        {
          role: 'Technical Writer',
          scenario: 'I was updating documentation screenshots for a UI that had been redesigned. The new UI used different fonts than the previous version. I needed to match my annotation typography to the new design.',
          outcome: 'Font analyzer identified the new UI typeface. Annotations updated to match across the entire documentation set.',
        },
      ]}
      features={[
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Identifies fonts by analyzing stroke weight, ink distribution and serif characteristics. Scores against 21 font profiles. Results in under a second.' },
        { icon: <Eraser className="w-5 h-5" />, title: 'Smart Auto-Patch Retouch', desc: 'Samples the 10-pixel border around your brush stroke and creates a blended fill that fades into the surrounding background. Cleaner than solid fill for natural-looking edits.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Intelligent Color Sampling', desc: 'The eyedropper analyzes the pixel neighborhood around your click, not just the single pixel, to suggest the most representative background color for retouch fills.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'AI-Curated Filter Presets', desc: 'Vivid, Noir, Vintage, Chrome, Dramatic — each preset applies optimized parameter combinations across brightness, contrast, saturation and hue simultaneously.' },
        { icon: <Brain className="w-5 h-5" />, title: 'Client-Side Processing', desc: 'All AI features run in your browser via the Canvas API. No cloud services, no API keys required, no usage limits. Your screenshots never leave your device.' },
        { icon: <Zap className="w-5 h-5" />, title: 'Zero Latency', desc: 'Local processing means instant results. No upload/download round trip. Font analysis returns in milliseconds.' },
      ]}
      faq={[
        { q: 'What AI features does FlowNote have?', a: 'Three: the font analyzer (identifies fonts from screenshot text), smart auto-patch retouch (context-aware background fill for content removal), and intelligent color sampling (pixel neighborhood analysis for better color matching).' },
        { q: 'Does the AI send my screenshot to a server?', a: 'No. Every AI feature runs locally in your browser using the HTML5 Canvas API. Nothing is sent anywhere.' },
        { q: 'How accurate is the font analyzer?', a: 'Accurate enough to be useful for common UI fonts (Inter, Roboto, SF Pro, Geist) at normal screen sizes. It struggles with very small text, heavily compressed screenshots, or uncommon decorative fonts.' },
        { q: 'When should I use auto-patch vs. solid fill?', a: 'Use auto-patch when the background behind the content you\'re removing is relatively uniform — solid colors, simple gradients. It produces a more natural blend. Use solid fill when you want hard redaction and don\'t care about visual smoothness.' },
        { q: 'Is the AI available without a paid plan?', a: 'Yes, all AI features are completely free. There\'s no paid tier.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
      ]}
      keywords={['AI screenshot editor', 'AI font analyzer', 'smart screenshot editor', 'AI powered screenshot tool']}
    />
  );
}
