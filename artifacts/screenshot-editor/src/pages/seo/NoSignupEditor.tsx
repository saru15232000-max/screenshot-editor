import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Zap, Shield, Lock, Wand2, Type, Download, Clock, Globe } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowNote — Screenshot Editor No Signup',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: `${BASE}/screenshot-editor-no-signup`,
  description: 'Screenshot editor with no signup, no login, and no download. Edit instantly in your browser — completely free and private.',
};

export default function NoSignupEditor() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Screenshot Editor No Signup — Edit Instantly | FlowNote',
    description: 'Screenshot editor with no account, no login, no download required. Edit, annotate & export screenshots instantly in your browser. 100% free.',
    canonical: `${BASE}/screenshot-editor-no-signup`,
    keywords: 'screenshot editor no signup, screenshot editor no login, screenshot editor without account, instant screenshot editor, screenshot editor online no login, edit screenshot without sign up',
    jsonLd,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Screenshot Editor — No Signup, No Login Required"
      tagline="Open. Edit. Download. No account ever needed."
      intro="FlowNote is a fully-featured screenshot editor that requires zero account creation. No email, no password, no trial — just open your screenshot and start editing. Every feature is available from your first second on the page."
      ctaLabel="Start Editing Instantly"
      features={[
        { icon: <Zap className="w-5 h-5" />, title: 'Instant Access', desc: 'No loading screens, no onboarding flows, no account walls. Drop your screenshot and the editor is ready immediately.' },
        { icon: <Lock className="w-5 h-5" />, title: 'Zero Data Collected', desc: 'No cookies tracked, no usage analytics. FlowNote doesn\'t know who you are and never will.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Fully Private', desc: 'Your screenshot is processed entirely in your browser. It never touches any server, database, or cloud storage.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'All Features Unlocked', desc: 'Every tool — filters, text layers, font analyzer, retouch brush, layout transforms — is fully available without an account.' },
        { icon: <Globe className="w-5 h-5" />, title: 'Works in Any Browser', desc: 'Chrome, Firefox, Safari, Edge — FlowNote works everywhere without extensions, plugins, or installs.' },
        { icon: <Download className="w-5 h-5" />, title: 'Export Without Watermarks', desc: 'Download your edited screenshot in PNG, JPG, or WEBP. No watermarks, no FlowNote branding added to your file.' },
      ]}
      sections={[
        { heading: 'Why most screenshot tools require signup — and FlowNote doesn\'t', body: 'Most online tools require accounts to gate features behind paid plans and to collect user data for advertising. FlowNote is different: it runs entirely in your browser with no backend, which means there\'s nothing to sign up for. There\'s no server storing your files or your identity.' },
        { heading: 'All features, no restrictions', body: 'Tools with "free tiers" often hide their best features behind accounts. FlowNote gives you full access to every tool immediately: brightness & filter controls, 21 fonts with 18 style templates, the AI font analyzer, color eyedropper, retouch brush, layout controls, and multi-format export — all without any login.' },
        { heading: 'Instant screenshot editing for teams and individuals', body: 'When you need to quickly annotate a screenshot for a bug report, blur sensitive data before sharing, or add a callout to a tutorial image, you don\'t want to stop and create an account. FlowNote is designed for speed — open the page, drop the file, done.' },
      ]}
      faq={[
        { q: 'Do I need to create an account to use FlowNote?', a: 'No. FlowNote has no user accounts. Open the page, drop your screenshot, and every feature is immediately available.' },
        { q: 'Is any personal information collected when I use FlowNote?', a: 'No personal information is collected. FlowNote has no backend, no analytics, and no cookies that track you.' },
        { q: 'Will my screenshots be saved or stored anywhere?', a: 'Your screenshots are never stored or uploaded. The editor session exists only in your browser\'s memory and clears when you close the tab.' },
        { q: 'Are there any watermarks on exported screenshots?', a: 'No watermarks, ever. Your exported screenshot contains only the content you put there.' },
        { q: 'Can I use FlowNote for commercial projects?', a: 'Yes. There are no usage restrictions. Use FlowNote for personal, professional, or commercial screenshot editing freely.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
      ]}
      keywords={['screenshot editor no signup', 'screenshot editor no login', 'screenshot editor without account', 'edit screenshot online no login', 'instant screenshot editor free']}
    />
  );
}
