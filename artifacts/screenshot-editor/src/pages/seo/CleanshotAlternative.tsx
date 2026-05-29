import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Globe, Lock, Wand2, ScanSearch, Shield, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function CleanshotAlternative() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Free CleanShot X Alternative — FlowNote',
    description: 'A free CleanShot X alternative for Mac and Windows. Browser-based annotation, AI font detection, smart retouch. No $29 purchase, no install needed.',
    canonical: `${BASE}/cleanshot-alternative`,
    keywords: 'cleanshot alternative, free cleanshot replacement, cleanshot x alternative free, screenshot editor like cleanshot',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Free CleanShot X Alternative"
      tagline="CleanShot-quality annotations without the $29 purchase."
      intro="CleanShot X is one of the best screenshot tools available for Mac. The capture experience is polished, the annotation UI is clean, and features like background removal and the Scrollshot capture are genuinely well-executed. At $29 it's not expensive, but it's Mac-only, requires a purchase, and doesn't run in a browser. For teams with Windows users, or for anyone who wants to annotate and export screenshots without a dedicated app, FlowNote covers the editing workflow for free."
      ctaLabel="Try FlowNote Free"
      stats={[
        { value: '$0', label: 'FlowNote cost' },
        { value: '$29', label: 'CleanShot X' },
        { value: '100%', label: 'Cross-platform' },
        { value: '0', label: 'Install required' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open FlowNote in any browser', desc: 'No download, no Mac App Store, no license key. Works in Chrome, Safari, Firefox, Edge on any OS.' },
        { num: '2', title: 'Drop in your screenshot', desc: 'Drag, paste from clipboard, or browse. The same screenshot you captured with CleanShot or any other tool.' },
        { num: '3', title: 'Annotate and edit', desc: '21 fonts, 18 style templates, AI font detection, blur, smart retouch. Comparable annotation depth to CleanShot X.' },
        { num: '4', title: 'Export cleanly', desc: 'PNG, JPG or WEBP. Full resolution, no watermark. Download directly to your device.' },
      ]}
      sections={[
        {
          heading: 'Where CleanShot X genuinely excels',
          body: 'CleanShot X\'s capture experience is excellent — particularly the Scrollshot feature for capturing long pages and the ability to capture windows with transparent backgrounds. The annotations UI is one of the cleanest in any desktop tool, and the ability to capture and annotate in one continuous workflow without switching apps is a real usability win. The Cloud storage feature for quick sharing links is well implemented. If you\'re on Mac and do a lot of capture-and-annotate work in a single flow, CleanShot X is genuinely good value at $29.',
        },
        {
          heading: 'The platform and cost barrier',
          body: 'CleanShot X is Mac-only. It doesn\'t run on Windows, Linux, or Chromebook. For mixed teams, this creates a tool inconsistency where Mac users have CleanShot and Windows users need a different solution. It also requires a purchase — not a subscription, to be fair, but a $29 per-seat cost that adds up for larger teams. FlowNote runs in any browser on any OS, costs nothing, and requires no installation. For the annotation and export portion of the workflow — which is what most people need most often — FlowNote provides comparable capability at zero cost.',
        },
        {
          heading: 'AI features: a different approach',
          body: 'CleanShot X includes a background removal feature that\'s useful for a specific category of screenshots. FlowNote takes a different approach to AI: the font analyzer identifies fonts from any text in your screenshot (useful when you need annotation typography to match the product UI), and the auto-patch retouch mode produces context-aware fills for content removal. These are different AI capabilities than CleanShot X\'s, but they\'re useful for a broader set of annotation workflows. Both tools are running local processing, which is the right approach for screenshot privacy.',
        },
      ]}
      useCases={[
        {
          role: 'Cross-Platform Team',
          scenario: 'Our design team is on Mac (CleanShot users) and our engineering team is mostly on Windows. We needed a shared annotation tool for screenshot feedback that everyone could use without different setups.',
          outcome: 'FlowNote became the shared annotation layer. Mac and Windows users both use it. No tool inconsistency.',
        },
        {
          role: 'Windows Developer',
          scenario: 'CleanShot X only works on Mac. I needed a high-quality alternative for Windows that could match the annotation quality CleanShot delivers.',
          outcome: 'FlowNote in Chrome on Windows. Annotation quality matches CleanShot X for text overlay and retouch tasks.',
        },
        {
          role: 'Freelancer',
          scenario: 'I couldn\'t justify $29 for a tool I\'d use occasionally. I needed CleanShot-level annotation quality without the purchase.',
          outcome: 'Full annotation workflow available for free in the browser. No $29 purchase, no installation.',
        },
      ]}
      comparisonTable={{
        competitor: 'CleanShot X',
        subtitle: 'CleanShot X is excellent on Mac. FlowNote works everywhere for free.',
        rows: [
          { feature: 'Price', flownote: 'Free', them: '$29 (one-time)' },
          { feature: 'macOS only', flownote: false, them: true, note: 'FlowNote works on all platforms' },
          { feature: 'Windows support', flownote: true, them: false },
          { feature: 'Linux support', flownote: true, them: false },
          { feature: 'Browser-based', flownote: true, them: false },
          { feature: 'Requires install', flownote: false, them: true },
          { feature: 'Text annotation', flownote: true, them: true },
          { feature: 'Multiple fonts', flownote: '21 fonts', them: 'Limited' },
          { feature: 'AI font detection', flownote: true, them: false },
          { feature: 'Background removal', flownote: false, them: true },
          { feature: 'Scrollshot capture', flownote: false, them: true },
          { feature: 'Smart auto-patch retouch', flownote: true, them: false },
          { feature: 'Cloud storage for share links', flownote: false, them: true, note: 'CleanShot Cloud subscription' },
          { feature: 'Private (no uploads)', flownote: true, them: true, note: 'Unless using CleanShot Cloud' },
          { feature: 'No watermark export', flownote: true, them: true },
        ],
        verdict: 'If you\'re on Mac and want a polished single-app capture-and-annotate workflow, CleanShot X at $29 is worth it. If you\'re on Windows, Linux, or a mixed-OS team — or if you just don\'t want to pay for screenshot editing — FlowNote provides comparable annotation depth for free in any browser.',
      }}
      features={[
        { icon: <Globe className="w-5 h-5" />, title: 'Cross-Platform', desc: 'Works in any browser on any OS. Unlike CleanShot X, no Mac requirement.' },
        { icon: <Lock className="w-5 h-5" />, title: 'Free — No Purchase', desc: 'No $29 license, no App Store purchase. Free, permanently, for every user.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Identifies fonts in your screenshots by stroke analysis. Not available in CleanShot X.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Smart Auto-Patch Retouch', desc: 'Context-aware fills for content removal. Different to CleanShot X\'s background removal but more useful for in-screenshot edits.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Private by Design', desc: 'All processing is local. No cloud uploads unless you choose to share.' },
        { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'PNG, JPG or WEBP at full resolution. No watermark. Direct download.' },
      ]}
      faq={[
        { q: 'Does FlowNote work on Windows like CleanShot X doesn\'t?', a: 'Yes — FlowNote works in any modern browser on Windows, including Chrome, Edge and Firefox. No installation required.' },
        { q: 'Can FlowNote replace CleanShot X for Mac users?', a: 'For annotation and editing of existing screenshots, yes. For capture workflows (scrolling capture, window capture), CleanShot X has features FlowNote doesn\'t. Many Mac users use both.' },
        { q: 'Is FlowNote really free when CleanShot X costs $29?', a: 'Yes — completely free, no purchase, no subscription. The tool runs client-side which means there\'s nothing to charge for.' },
        { q: 'What\'s the annotation quality comparison?', a: 'FlowNote has more font options (21 vs limited), AI font detection that CleanShot doesn\'t have, and a comparable template/style system. For text-based annotation work, FlowNote is at least equivalent.' },
      ]}
      relatedLinks={[
        { href: '/snagit-alternative', label: 'Snagit Alternative' },
        { href: '/lightshot-alternative', label: 'Lightshot Alternative' },
        { href: '/screenshot-editor-for-mac', label: 'Screenshot Editor for Mac' },
        { href: '/screenshot-editor-for-windows', label: 'Screenshot Editor for Windows' },
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
      ]}
      keywords={['cleanshot alternative', 'cleanshot x alternative', 'free cleanshot replacement', 'screenshot editor like cleanshot']}
    />
  );
}
