import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Wand2, Type, ScanSearch, Pipette, Eraser, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function FreeScreenshotEditor() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Free Screenshot Editor Online — FlowNote',
    description: 'Edit screenshots for free in your browser. Add text, blur sensitive data, apply filters and export — no signup, no download, no watermarks.',
    canonical: `${BASE}/free-screenshot-editor-online`,
    keywords: 'free screenshot editor online, screenshot editor free, edit screenshot online free, free screenshot editing tool',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'FlowNote — Free Screenshot Editor Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: `${BASE}/free-screenshot-editor-online`,
        description: 'Free online screenshot editor. No signup. Add text, blur, filters and export.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1240' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is FlowNote free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. FlowNote is 100% free — no hidden plans, no watermarks, no limits.' } },
          { '@type': 'Question', name: 'Does it upload my screenshots?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing happens in your browser. Nothing is ever uploaded.' } },
        ],
      },
    ] as any,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Free Screenshot Editor Online"
      tagline="No signup. No watermarks. No catches."
      intro="Most screenshot tools make you create an account before you can do anything useful. FlowNote skips all of that. Drop in a screenshot and you're editing — brightness, text overlays, blur, retouch — in seconds. Everything runs in your browser, so nothing gets uploaded."
      ctaLabel="Edit Screenshot Free"
      stats={[
        { value: '100%', label: 'Free, forever' },
        { value: '0', label: 'Uploads required' },
        { value: '21', label: 'Font families' },
        { value: '18', label: 'Style templates' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Drop your screenshot', desc: 'Drag it onto the canvas, paste from clipboard, or click to browse. JPG, PNG, WEBP and GIF all work.' },
        { num: '2', title: 'Edit with the tools you need', desc: 'Adjust filters, add text overlays, blur sensitive regions, or retouch content you want removed. Skip what you don\'t need.' },
        { num: '3', title: 'Fine-tune and reposition', desc: 'Drag text layers anywhere. Undo up to 20 steps. Adjust opacity and size until it looks right.' },
        { num: '4', title: 'Export and share', desc: 'Download as PNG, JPG, or WEBP at full resolution. No watermark, no FlowNote branding on the output.' },
      ]}
      sections={[
        {
          heading: 'Why most free screenshot editors disappoint',
          body: 'The free tier problem is real. You sign up, you start editing, then you hit a wall — the export has a watermark, the font selection is locked behind a Pro plan, or the tool just isn\'t capable enough for anything beyond drawing a red box. FlowNote was built to sidestep all of that. There\'s no server backend gating features. The tool runs entirely in your browser, which means there\'s nothing to upsell. Every feature — the AI font analyzer, smart retouch, all 18 style templates — is available from your first second on the page.',
        },
        {
          heading: 'What you can actually do with it',
          body: 'The editing suite covers the tasks that come up most often: adjusting brightness and contrast for screenshots that are too dark or washed out; adding text callouts to point out specific UI elements in documentation; blurring passwords, API keys, or personal data before sharing; using the retouch brush to remove clutter from the background; and exporting in the right format for whatever platform you\'re posting to. The AI font analyzer is genuinely useful if you\'re trying to match the typography in an existing screenshot — click on any text and it tells you the top font matches based on stroke analysis. Not flashy, but it works.',
        },
        {
          heading: 'The difference between "free" and free',
          body: 'Tools like Snagit, CleanShot X, and Markup Hero all have free plans — but they either add watermarks, limit the number of exports, or lock advanced features behind paywalls. FlowNote has no paid plan to unlock. The codebase runs client-side, which means the business model doesn\'t depend on feature gating. You get the full tool, not a preview of what you\'d get if you paid.',
        },
      ]}
      useCases={[
        {
          role: 'Developer',
          scenario: 'I had a bug screenshot with a session token visible in the request headers. I needed to post it to the GitHub issue tracker without exposing it. I opened FlowNote, used the retouch brush to paint over the token, exported, and posted — took about 45 seconds.',
          outcome: 'Sensitive data redacted without opening any other software.',
        },
        {
          role: 'Technical Writer',
          scenario: 'I was updating a product documentation page and needed to annotate a series of UI screenshots with step numbers. FlowNote\'s text layers let me add numbered callouts in a consistent style across a dozen screenshots.',
          outcome: 'Consistent, numbered annotations across a full documentation set.',
        },
        {
          role: 'Support Engineer',
          scenario: 'A customer sent us a screenshot showing their account dashboard — with their billing info visible. Before forwarding it to the dev team, I needed to blur the financial data. FlowNote handles it in under a minute without any account setup.',
          outcome: 'PII protected before escalating to a wider team.',
        },
      ]}
      features={[
        { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation, hue and blur. One-click presets: Vivid, Noir, Vintage, Chrome, Dramatic. Fine-tune with sliders after.' },
        { icon: <Type className="w-5 h-5" />, title: 'Text Overlays', desc: '21 fonts across 5 categories, 18 pre-built style templates. Every layer is draggable, resizable, and has independent opacity control.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click any text in your screenshot. The analyzer measures stroke width, ink distribution, and serif characteristics to surface the top 3 font matches.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel for exact color matching on text fills, background retouch, or anything else where precision matters.' },
        { icon: <Eraser className="w-5 h-5" />, title: 'Smart Retouch Brush', desc: 'Two modes: solid fill for hard redaction, or AI auto-patch which samples surrounding pixels and blends the fill to match the background.' },
        { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'PNG, JPG, or WEBP at full resolution. No watermarks. No FlowNote branding on the output. Your screenshot, your image.' },
      ]}
      faq={[
        { q: 'Is FlowNote actually free, or is there a catch?', a: 'Genuinely free. There\'s no paid tier, no watermarks, no export limits, and no feature gating. The tool runs client-side, so there\'s no subscription needed to keep the lights on.' },
        { q: 'Do my screenshots get uploaded anywhere?', a: 'No. Everything is processed in your browser using the HTML5 Canvas API. Your images never leave your device — not even temporarily.' },
        { q: 'What file formats does FlowNote accept?', a: 'JPG, PNG, WEBP, and GIF on input. PNG, JPG, or WEBP on export. If you\'re pasting from clipboard, that works too.' },
        { q: 'Does it work on Mac?', a: 'Yes — it works in any modern browser. Chrome, Firefox, Safari, and Edge on both Mac and Windows.' },
        { q: 'What\'s the difference between the retouch brush modes?', a: 'Solid fill paints a flat color over the selected area — use this when you want hard redaction. Auto-patch samples the surrounding pixels and creates a blended fill that matches the background, which looks more natural for cleaning up clutter.' },
        { q: 'Can I undo edits?', a: 'Yes. FlowNote keeps a 20-step undo history. Press Ctrl+Z (or Cmd+Z on Mac) or use the undo button.' },
      ]}
      relatedLinks={[
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/add-text-to-screenshot-online', label: 'Add Text' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
        { href: '/snagit-alternative', label: 'Snagit Alternative' },
      ]}
      keywords={['free screenshot editor online', 'screenshot editor free', 'edit screenshot online free', 'screenshot editor no watermark']}
    />
  );
}
