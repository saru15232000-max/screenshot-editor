import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Globe, Zap, Type, Wand2, ScanSearch, Shield } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function GreenshotAlternative() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Greenshot Alternative Online Free — FlowNote',
    description: 'A free Greenshot alternative that works in any browser without installation. More editing tools, modern UI, AI font detection. No account needed.',
    canonical: `${BASE}/greenshot-alternative`,
    keywords: 'greenshot alternative, free greenshot replacement, screenshot editor like greenshot, greenshot online alternative',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Greenshot Alternative — Browser-Based & Free"
      tagline="Greenshot-level editing without the Windows install."
      intro="Greenshot has been a go-to free screenshot tool for Windows users for years. The annotation tools are decent, the OCR feature is occasionally useful, and being genuinely free without ads or subscription made it stand out from the competition. The problem is it only works on Windows, and it hasn't kept pace with what screenshot editing tools look like in 2024. FlowNote runs in any browser on any OS, has a more capable editing suite, and includes AI features Greenshot doesn't have."
      ctaLabel="Try FlowNote Free"
      stats={[
        { value: '100%', label: 'Cross-platform' },
        { value: '0', label: 'Install required' },
        { value: '$0', label: 'Cost' },
        { value: '21', label: 'Font families' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open any browser', desc: 'Chrome, Firefox, Safari or Edge. Windows, Mac, Linux, Chromebook. The editor works everywhere without installation.' },
        { num: '2', title: 'Drop in your screenshot', desc: 'Drag the file in, paste from clipboard, or click to browse. The canvas loads immediately.' },
        { num: '3', title: 'Annotate and edit', desc: '21 fonts, 18 style templates, AI font detection, smart retouch, blur, filters. More depth than Greenshot\'s annotation panel.' },
        { num: '4', title: 'Export to any format', desc: 'PNG, JPG or WEBP at full resolution. No watermark. No Greenshot branding.' },
      ]}
      sections={[
        {
          heading: 'Greenshot\'s genuine strengths',
          body: 'For a free, lightweight Windows tool, Greenshot is solid. The capture hotkeys are well-designed, the quick-annotation overlay is fast, and the Greenshot image editor handles basic tasks without unnecessary complexity. The integration with Confluence and Jira (via plugins) is useful for teams in those ecosystems. And it\'s genuinely free, not a freemium product trying to push you toward a paid plan. That matters.',
        },
        {
          heading: 'The platform limitation',
          body: 'Greenshot is Windows-only. There\'s a Mac port that hasn\'t been updated in years and is largely unmaintained. For teams with a mix of Windows and Mac users — increasingly common in tech and creative industries — Greenshot creates a workflow inconsistency. Some team members have it, some don\'t. FlowNote solves this cleanly: it runs in any modern browser on any OS, so the entire team uses the same tool with identical features regardless of what they\'re running.',
        },
        {
          heading: 'What the editing capability gap looks like',
          body: 'Greenshot\'s image editor is functional but dated. Font selection is limited, the blur tool works but lacks the precision of a proper brush-based tool, and there\'s no intelligent retouch or color matching. FlowNote\'s editing layer is significantly deeper: 21 font families, 18 style templates, the AI font analyzer, smart auto-patch retouch, an eyedropper-based color sampler, filter presets with manual fine-tuning, and crop/resize with social media presets. For teams producing polished documentation or tutorial screenshots, that depth makes a real difference.',
        },
      ]}
      useCases={[
        {
          role: 'Team Lead',
          scenario: 'Half our team is on Mac, half on Windows. Greenshot only works for the Windows users. We needed a shared tool that worked identically for everyone.',
          outcome: 'Switched to FlowNote. Same tool, same workflow, regardless of OS.',
        },
        {
          role: 'Developer',
          scenario: 'I use Linux for development work. Greenshot doesn\'t run on Linux, and most screenshot editors assume Windows. FlowNote was the first option I found that worked in Firefox on Linux without any setup.',
          outcome: 'Full annotation and redaction workflow available on Linux for the first time.',
        },
        {
          role: 'Content Manager',
          scenario: 'We were using Greenshot for documentation screenshots but the font options were too limited for our brand guidelines. We needed Inter for annotations to match our product UI.',
          outcome: 'Switched to FlowNote. Inter is one of the 21 available fonts. Brand consistency maintained.',
        },
      ]}
      comparisonTable={{
        competitor: 'Greenshot',
        subtitle: 'Greenshot is a solid Windows tool. FlowNote works everywhere.',
        rows: [
          { feature: 'Price', flownote: 'Free', them: 'Free' },
          { feature: 'macOS support', flownote: true, them: false, note: 'Mac Greenshot port is unmaintained' },
          { feature: 'Linux support', flownote: true, them: false },
          { feature: 'Chromebook support', flownote: true, them: false },
          { feature: 'Download / install required', flownote: false, them: true },
          { feature: 'Account required', flownote: false, them: false },
          { feature: 'Multiple font families', flownote: '21 fonts', them: 'Limited' },
          { feature: 'Style templates', flownote: '18 templates', them: false },
          { feature: 'AI font detection', flownote: true, them: false },
          { feature: 'Smart auto-patch retouch', flownote: true, them: false },
          { feature: 'Blur tool', flownote: true, them: true },
          { feature: 'Screen capture', flownote: false, them: true },
          { feature: 'Jira / Confluence integration', flownote: false, them: true, note: 'Via Greenshot plugins' },
        ],
        verdict: 'If you\'re a Windows-only team and the Jira/Confluence integrations matter to you, Greenshot is worth keeping. For cross-platform teams, or for anyone who wants a more capable editing suite with modern typography and AI tools, FlowNote is the better fit — and it doesn\'t need installation.',
      }}
      features={[
        { icon: <Globe className="w-5 h-5" />, title: 'Cross-Platform', desc: 'Works in any browser on Windows, Mac, Linux, Chromebook. Unlike Greenshot, no OS restrictions.' },
        { icon: <Zap className="w-5 h-5" />, title: 'No Install', desc: 'Open a URL and start editing. No downloading, no running an installer, no system changes.' },
        { icon: <Type className="w-5 h-5" />, title: 'Better Typography', desc: '21 font families and 18 style templates. Significantly more capable than Greenshot\'s annotation font system.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Identifies fonts in your screenshots. Something Greenshot doesn\'t have.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Smart Retouch', desc: 'AI auto-patch mode for natural-looking content removal. More capable than basic fill tools.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Private Processing', desc: 'No server uploads. Everything processed locally in your browser.' },
      ]}
      faq={[
        { q: 'Does FlowNote work on Linux like Greenshot doesn\'t?', a: 'Yes — FlowNote works in any modern browser including Firefox on Linux. No installation, no compatibility issues.' },
        { q: 'Can FlowNote capture screenshots like Greenshot?', a: 'FlowNote is an image editor, not a screen capture tool. It edits screenshots you\'ve already taken. For capture on any OS, you can use the built-in OS screenshot tool or any other capture app.' },
        { q: 'Is FlowNote free like Greenshot?', a: 'Yes, completely free. No ads, no paid tier, no watermarks. Similar ethos to Greenshot but browser-based and more capable on the editing side.' },
        { q: 'Does FlowNote integrate with Jira or Confluence?', a: 'Not via a plugin like Greenshot does. You export the annotated screenshot and attach it manually. For most teams, that\'s not a significant difference in practice.' },
      ]}
      relatedLinks={[
        { href: '/snagit-alternative', label: 'Snagit Alternative' },
        { href: '/lightshot-alternative', label: 'Lightshot Alternative' },
        { href: '/cleanshot-alternative', label: 'CleanShot Alternative' },
        { href: '/screenshot-editor-for-windows', label: 'Editor for Windows' },
        { href: '/screenshot-editor-for-mac', label: 'Editor for Mac' },
      ]}
      keywords={['greenshot alternative', 'greenshot replacement', 'greenshot online alternative', 'free screenshot editor linux']}
    />
  );
}
