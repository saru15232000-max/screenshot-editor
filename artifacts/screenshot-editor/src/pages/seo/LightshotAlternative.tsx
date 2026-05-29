import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Type, Layers, Wand2, ScanSearch, Shield, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function LightshotAlternative() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Lightshot Alternative — More Editing Power | FlowNote',
    description: 'A better Lightshot alternative with proper typography, AI font detection, smart retouch and filters. Free, no install, no account required.',
    canonical: `${BASE}/lightshot-alternative`,
    keywords: 'lightshot alternative, free lightshot replacement, screenshot editor like lightshot, better than lightshot',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Lightshot Alternative with More Editing Power"
      tagline="Lightshot gets you the screenshot. FlowNote helps you actually edit it."
      intro="Lightshot is one of the most popular screenshot tools around, and for good reason — the capture experience is fast and the basic annotation layer is useful for quick markup. But its editing capabilities stop well short of what many users actually need: proper font control, blur and redaction, color adjustment, AI font matching. FlowNote covers all of that, and it does it without requiring a desktop install."
      ctaLabel="Try FlowNote Free"
      stats={[
        { value: '21', label: 'Font families (vs 1 in Lightshot)' },
        { value: '18', label: 'Style templates' },
        { value: '0', label: 'Install required' },
        { value: '$0', label: 'Cost' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Take your screenshot with any tool', desc: 'Lightshot, the OS built-in, Print Screen — whatever you already use for capture. Save the image.' },
        { num: '2', title: 'Open FlowNote for editing', desc: 'Drop the saved screenshot into FlowNote. No install, no account. The editing canvas opens immediately.' },
        { num: '3', title: 'Use proper annotation tools', desc: 'Multiple fonts, style templates, AI font matching, blur, retouch — the tools Lightshot doesn\'t have.' },
        { num: '4', title: 'Export and share', desc: 'PNG, JPG or WEBP, no watermark. Share directly or paste into whatever you\'re working in.' },
      ]}
      sections={[
        {
          heading: 'What Lightshot does well',
          body: 'The quick-capture experience in Lightshot is genuinely fast. The global hotkey, the drag-to-select capture region, the instant overlay annotation panel — it\'s a smooth workflow for getting a screenshot and adding a quick arrow or box before sharing. The built-in image search is a bonus feature that\'s occasionally useful. For quick, disposable annotations on the way to a share link, Lightshot is hard to beat on speed.',
        },
        {
          heading: 'Where the editing experience falls short',
          body: 'Lightshot\'s text tool gives you one font, limited size options, and no style control worth speaking of. There\'s no blur tool for redacting sensitive information. There\'s no way to remove or clean up content using retouch. There are no filter or brightness controls. If you take a screenshot that needs real editing before sharing — matching typography to the product you\'re documenting, blurring a password, adjusting brightness — Lightshot leaves you opening a second tool anyway. FlowNote is designed to be that second tool, except it\'s capable enough to be your first.',
        },
        {
          heading: 'The privacy angle',
          body: 'Lightshot\'s sharing feature uploads your screenshots to their servers. That\'s the mechanism behind the share links it generates. For personal screenshots, this is probably fine. For anything containing sensitive business data, customer information, credentials, or confidential product information, uploading to a third-party server is a real risk. FlowNote processes everything locally — your screenshots never leave your browser tab. If privacy matters for your use case, that\'s a meaningful difference.',
        },
      ]}
      useCases={[
        {
          role: 'Designer',
          scenario: 'I was using Lightshot for quick captures but kept having to open another tool for anything beyond a basic red box. FlowNote became my editing step between capturing and sharing.',
          outcome: 'Two-step capture-then-edit workflow. Better annotation quality without switching to a heavy editor.',
        },
        {
          role: 'Operations Manager',
          scenario: 'Our team used Lightshot for internal reporting screenshots. When I realized the shared links were uploading our internal data to Lightshot\'s servers, I needed a privacy-safe alternative for editing before sharing.',
          outcome: 'Switched to FlowNote for editing. Screenshots stay local. No third-party server exposure.',
        },
        {
          role: 'Support Engineer',
          scenario: 'Lightshot doesn\'t have a blur tool, but I regularly need to redact customer PII from screenshots before sharing them internally. FlowNote fills that gap.',
          outcome: 'PII redacted with the retouch brush before every internal share. Lightshot still used for quick captures.',
        },
      ]}
      comparisonTable={{
        competitor: 'Lightshot',
        subtitle: 'Lightshot is great for capture. FlowNote is better for editing.',
        rows: [
          { feature: 'Price', flownote: 'Free', them: 'Free' },
          { feature: 'Download required', flownote: false, them: true, note: 'Lightshot requires a browser extension or desktop app' },
          { feature: 'Account required', flownote: false, them: false },
          { feature: 'Screen capture', flownote: false, them: true, note: 'FlowNote edits images, doesn\'t capture screens' },
          { feature: 'Multiple fonts', flownote: true, them: false, note: 'Lightshot has limited font options' },
          { feature: 'Style templates', flownote: '18 templates', them: false },
          { feature: 'Blur / redaction tool', flownote: true, them: false },
          { feature: 'AI font detection', flownote: true, them: false },
          { feature: 'Brightness/contrast controls', flownote: true, them: false },
          { feature: 'Smart retouch', flownote: true, them: false },
          { feature: 'Uploads screenshots to server', flownote: false, them: true, note: 'Lightshot share links use their servers' },
          { feature: 'Export without watermark', flownote: true, them: true },
        ],
        verdict: 'Lightshot wins for capture speed. FlowNote wins for editing depth. Most users find they need both: Lightshot for the quick grab, FlowNote for everything that comes after. If you want editing and privacy without any install, FlowNote covers the full workflow.',
      }}
      features={[
        { icon: <Type className="w-5 h-5" />, title: 'Proper Typography', desc: '21 font families vs Lightshot\'s single font. 18 style templates for instant professional-looking annotations.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Blur & Redaction', desc: 'Global blur slider and precision retouch brush. The tool Lightshot doesn\'t have for hiding sensitive content.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click any text in your screenshot to identify its font. Not available in Lightshot.' },
        { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Layers', desc: 'Stack multiple independent annotation layers, each with its own style and position.' },
        { icon: <Shield className="w-5 h-5" />, title: 'No Server Uploads', desc: 'All processing is local. Unlike Lightshot share links, nothing is sent to any server.' },
        { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'PNG, JPG, WEBP. No watermark. Full resolution.' },
      ]}
      faq={[
        { q: 'Can FlowNote replace Lightshot completely?', a: 'For editing, yes. For screen capture, no — FlowNote edits images you already have, it doesn\'t capture your screen. Many users use both: Lightshot to capture, FlowNote to edit.' },
        { q: 'Does FlowNote require a browser extension like Lightshot?', a: 'No extension, no installation of any kind. Open the URL in any browser and start editing.' },
        { q: 'Is Lightshot\'s sharing private?', a: 'No — Lightshot\'s share links work by uploading your screenshot to their servers. FlowNote processes everything locally with no server uploads.' },
        { q: 'Does FlowNote have the same annotation tools as Lightshot?', a: 'FlowNote has more annotation depth: 21 fonts vs one, 18 style templates, AI font detection, blur, retouch, and filter controls that Lightshot doesn\'t offer.' },
      ]}
      relatedLinks={[
        { href: '/snagit-alternative', label: 'Snagit Alternative' },
        { href: '/greenshot-alternative', label: 'Greenshot Alternative' },
        { href: '/markup-hero-alternative', label: 'Markup Hero Alternative' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
      ]}
      keywords={['lightshot alternative', 'better than lightshot', 'lightshot replacement', 'screenshot editor like lightshot']}
    />
  );
}
