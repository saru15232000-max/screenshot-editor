import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Zap, Lock, Download, Wand2, ScanSearch, Shield } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function SnagitAlternative() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Free Snagit Alternative — FlowNote',
    description: 'Looking for a free Snagit alternative? FlowNote offers AI font detection, smart retouch, rich annotation and export in your browser. No cost, no download.',
    canonical: `${BASE}/snagit-alternative`,
    keywords: 'snagit alternative free, free snagit replacement, snagit alternative online, screenshot editor like snagit',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Free Snagit Alternative — FlowNote',
      description: 'FlowNote vs Snagit comparison. Free browser-based alternative to TechSmith Snagit.',
      url: `${BASE}/snagit-alternative`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Snagit Alternative', item: `${BASE}/snagit-alternative` },
        ],
      },
    },
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Free Snagit Alternative"
      tagline="Skip the $62.99/year. Get the same annotation power for free."
      intro="Snagit is a solid tool. The annotation system is capable, the capture workflow is polished, and TechSmith has been refining it for years. But $62.99 a year for screenshot editing is a hard sell when most of what people actually use Snagit for — annotating, blurring, adding text, exporting — can be done in a browser for nothing. FlowNote covers those use cases without the license fee."
      ctaLabel="Try FlowNote Free"
      stats={[
        { value: '$0', label: 'FlowNote cost' },
        { value: '$62.99', label: 'Snagit/year' },
        { value: '0', label: 'Install required' },
        { value: '100%', label: 'Features free' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open useflownote.online', desc: 'No download, no installer, no license key. The editor is ready in your browser tab.' },
        { num: '2', title: 'Drop in your screenshot', desc: 'Drag, paste, or click to browse. Snagit uses its own capture flow — FlowNote works with any image you already have.' },
        { num: '3', title: 'Annotate, blur, retouch', desc: 'The same core editing tasks: text overlays, region fills, filter adjustments. AI font matching if you need it.' },
        { num: '4', title: 'Export cleanly', desc: 'PNG, JPG or WEBP, full resolution, no watermark. Share directly from the download.' },
      ]}
      sections={[
        {
          heading: 'What Snagit does better',
          body: 'Being honest about this matters. Snagit has genuine advantages. The scrolling capture feature is excellent for capturing long web pages or chat threads — FlowNote doesn\'t do capture at all, only editing of images you already have. Snagit\'s video recording capability is a real differentiator if you need to capture and annotate screen recordings. The stamp library and the "simplify" tool for turning screenshots into simplified diagrams are genuinely useful for certain workflows. If those are the features you rely on, Snagit is probably worth the cost.',
        },
        {
          heading: 'Where FlowNote does things differently',
          body: 'The AI font analyzer is something Snagit doesn\'t have — it identifies fonts in your screenshots by analyzing stroke characteristics, which is useful when you\'re trying to match annotation typography to the product you\'re documenting. The auto-patch retouch mode produces cleaner content-removal results than Snagit\'s basic fill tool in many cases. And because FlowNote runs in a browser, it works identically on Windows, Mac, Linux, and Chromebook without different license tiers. Snagit\'s pricing distinguishes between "new" and "upgrade" licenses in ways that add up over time.',
        },
        {
          heading: 'The actual cost comparison',
          body: 'Snagit is $62.99 for a new license. Upgrades to new major versions typically run around $30-35. If you\'re on a team of five people all using Snagit, that\'s $315/year in license costs before upgrades. FlowNote is $0 for every person on the team, forever. For teams whose Snagit usage is primarily annotation and export rather than capture and video — which is most teams — FlowNote covers the workflow at zero cost. The decision comes down to whether the features unique to Snagit (capture, video, stamps, simplify) are worth paying for.',
        },
      ]}
      useCases={[
        {
          role: 'Technical Writer',
          scenario: 'Our team was using Snagit for documentation screenshots. When we did an audit, 90% of the usage was annotation and export — nothing that required capture or video. We switched to FlowNote and stopped paying the license fees.',
          outcome: 'Documentation workflow maintained. Snagit license cost eliminated.',
        },
        {
          role: 'Developer',
          scenario: 'I was on a Linux machine where Snagit doesn\'t run. I needed to annotate a bug screenshot before filing a ticket. FlowNote worked in Firefox without any setup.',
          outcome: 'Annotated screenshot filed without needing a Windows machine or a different tool.',
        },
        {
          role: 'Freelancer',
          scenario: 'I couldn\'t justify $62.99 for a tool I\'d use occasionally. I needed something capable that didn\'t require a subscription for basic annotation tasks.',
          outcome: 'Full annotation workflow available for free. No subscription required.',
        },
      ]}
      comparisonTable={{
        competitor: 'Snagit',
        subtitle: 'An honest comparison of what each tool does and what it costs.',
        rows: [
          { feature: 'Price', flownote: 'Free', them: '$62.99/year' },
          { feature: 'Download required', flownote: false, them: true },
          { feature: 'Account required', flownote: false, them: true },
          { feature: 'Browser-based', flownote: true, them: false },
          { feature: 'Works on Linux', flownote: true, them: false },
          { feature: 'Text annotation', flownote: true, them: true },
          { feature: 'AI font detection', flownote: true, them: false },
          { feature: 'Smart auto-patch retouch', flownote: true, them: false },
          { feature: 'Scrolling screen capture', flownote: false, them: true, note: 'FlowNote edits images; it doesn\'t capture screens' },
          { feature: 'Video recording', flownote: false, them: true },
          { feature: 'Export without watermark', flownote: true, them: true },
          { feature: 'Export formats', flownote: 'PNG, JPG, WEBP', them: 'PNG, JPG, GIF, PDF' },
          { feature: 'Private (no uploads)', flownote: true, them: false, note: 'Snagit\'s sharing features use TechSmith servers' },
        ],
        verdict: 'For annotation, blur, text overlays, and clean export — FlowNote does everything Snagit does, free, in your browser. If you need scrolling capture, video recording, or the stamp library, Snagit is worth considering. But for teams whose usage is primarily editing and annotating existing screenshots, the $62.99/year is hard to justify.',
      }}
      features={[
        { icon: <Zap className="w-5 h-5" />, title: 'No Install', desc: 'Open a URL and start editing. No downloading a 100MB installer, no license activation, no compatibility checks.' },
        { icon: <Lock className="w-5 h-5" />, title: 'No Account', desc: 'No TechSmith account, no login screen, no password to manage. Every feature immediately available.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Identifies fonts in your screenshots by stroke analysis. Something Snagit doesn\'t offer.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Smart Retouch', desc: 'Auto-patch mode creates context-aware fills for content removal. Cleaner results than basic solid fill.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Private by Design', desc: 'Processing is local. No screenshots sent to TechSmith or any other server.' },
        { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'Full resolution PNG, JPG or WEBP. No watermarks.' },
      ]}
      faq={[
        { q: 'Is FlowNote really free, or does it have a Snagit-like pricing model?', a: 'Genuinely free. No paid tier, no upgrade prompt, no license key. The tool runs client-side with no subscription needed.' },
        { q: 'Can FlowNote replace Snagit for screen capture?', a: 'FlowNote is an image editor, not a screen capture tool. It edits screenshots you\'ve already taken. If you need scrolling capture or video recording, Snagit has features FlowNote doesn\'t.' },
        { q: 'Does FlowNote work on Mac, like Snagit does?', a: 'Yes — FlowNote works in any modern browser on Mac, including Safari, Chrome, and Firefox.' },
        { q: 'What about Snagit\'s stamp library?', a: 'FlowNote doesn\'t have a stamp library. It has text overlays with 18 style templates, an AI font analyzer, and retouch tools. For most annotation tasks, that\'s sufficient.' },
        { q: 'Is the annotation quality comparable?', a: 'For text-based annotations with font control and position flexibility, yes. FlowNote actually goes further with AI font detection, which Snagit doesn\'t have.' },
      ]}
      relatedLinks={[
        { href: '/lightshot-alternative', label: 'Lightshot Alternative' },
        { href: '/cleanshot-alternative', label: 'CleanShot Alternative' },
        { href: '/markup-hero-alternative', label: 'Markup Hero Alternative' },
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
      ]}
      keywords={['snagit alternative free', 'free snagit replacement', 'snagit alternative online']}
    />
  );
}
