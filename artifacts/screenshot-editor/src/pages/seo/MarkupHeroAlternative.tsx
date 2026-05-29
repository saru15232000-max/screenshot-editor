import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Lock, Layers, Wand2, ScanSearch, Shield, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function MarkupHeroAlternative() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Markup Hero Alternative Free — FlowNote',
    description: 'A free Markup Hero alternative with no account, no upload limits, and more editing tools. AI font detection, smart retouch, and clean export. No signup.',
    canonical: `${BASE}/markup-hero-alternative`,
    keywords: 'markup hero alternative, free markup hero replacement, screenshot editor like markup hero, markup tool without account',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Free Markup Hero Alternative"
      tagline="The markup power, without the account requirement."
      intro="Markup Hero is a well-designed annotation tool with a clean interface and a good sharing workflow. But it requires an account, limits history on the free plan, and the pricing structure pushes you toward a subscription fairly quickly if you use it regularly. FlowNote covers the core annotation and sharing workflow without any of those constraints — no account, no history limits, no subscription."
      ctaLabel="Try FlowNote Free"
      stats={[
        { value: '$0', label: 'FlowNote cost' },
        { value: '$0', label: 'Required account' },
        { value: '∞', label: 'No history limits' },
        { value: '100%', label: 'Features unlocked' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open FlowNote in any browser', desc: 'No account creation. No welcome email. No onboarding flow. The editor is available immediately.' },
        { num: '2', title: 'Drop in your screenshot', desc: 'The same drag-and-drop experience, without the Markup Hero account context.' },
        { num: '3', title: 'Annotate with full control', desc: '21 fonts, 18 style templates, AI font matching, blur, retouch. More editing depth than Markup Hero\'s free tier.' },
        { num: '4', title: 'Export and share', desc: 'Download directly. No Markup Hero link, no upload to their servers. Your image, your share method.' },
      ]}
      sections={[
        {
          heading: 'Markup Hero\'s model and why it matters',
          body: 'Markup Hero requires an account because its value proposition includes history — a searchable archive of all your markups, accessible from any device. That\'s a genuine feature if you produce a lot of annotated screenshots and need to find and reuse them. The product is well-executed. But the account requirement is a real barrier for occasional users or teams who just want to annotate something quickly without onboarding. The free plan is also limited in how many markups you can keep before you hit the history cap, which creates the kind of friction that pushes users toward paying.',
        },
        {
          heading: 'What FlowNote does differently',
          body: 'FlowNote takes the opposite approach to Markup Hero on data. Where Markup Hero stores your markups server-side to enable history and cross-device access, FlowNote keeps everything local. Your screenshots are processed in the browser, never uploaded, and the session clears when you close the tab. There\'s no history because there\'s no server. If you need to go back to a screenshot, you\'ll need to keep the original — but for most annotation workflows, that\'s fine. You annotate, you share, you move on. The editing depth FlowNote offers — AI font analyzer, auto-patch retouch, 18 templates — is actually greater than what Markup Hero provides on annotation quality.',
        },
        {
          heading: 'The sharing workflow comparison',
          body: 'Markup Hero\'s sharing workflow creates a link that hosts the annotated image on their servers. This is convenient if you want to share something that will always be accessible via URL. FlowNote\'s export workflow downloads the image to your device, from which you share it however you normally would — drag it into Slack, attach it to a Jira ticket, paste it in an email. This is less automatically "shareable" but more private and more flexible — the image lives in your own storage rather than on a third-party server.',
        },
      ]}
      useCases={[
        {
          role: 'Startup Team',
          scenario: 'We tried Markup Hero for team screenshot annotations but kept hitting the free tier history limit and getting pushed toward the paid plan for what felt like basic functionality.',
          outcome: 'Switched to FlowNote. Annotation workflow maintained, subscription eliminated.',
        },
        {
          role: 'Contractor',
          scenario: 'I annotate screenshots for multiple clients. I didn\'t want all of those showing up in a Markup Hero account linked to my personal email, or having client screenshots stored on their servers.',
          outcome: 'FlowNote processes everything locally. No client screenshot data on third-party servers. No account mixing.',
        },
        {
          role: 'Privacy-Conscious User',
          scenario: 'Many of my screenshots contain confidential product information. I was uncomfortable with Markup Hero storing them server-side even on a paid plan.',
          outcome: 'FlowNote\'s local processing means no server exposure. Annotation workflow maintained with better privacy.',
        },
      ]}
      comparisonTable={{
        competitor: 'Markup Hero',
        subtitle: 'Markup Hero is great for hosted history. FlowNote is better if you want annotation without the account.',
        rows: [
          { feature: 'Price', flownote: 'Free', them: 'Free (limited) / $4–$8/mo' },
          { feature: 'Account required', flownote: false, them: true },
          { feature: 'History / markup archive', flownote: false, them: true, note: 'FlowNote is session-only; no stored history' },
          { feature: 'Screenshot upload to server', flownote: false, them: true },
          { feature: 'Shareable URL for markup', flownote: false, them: true, note: 'FlowNote exports a local file; you share via your own method' },
          { feature: 'Multiple fonts', flownote: '21 fonts', them: 'Limited' },
          { feature: 'Style templates', flownote: '18 templates', them: 'Basic' },
          { feature: 'AI font detection', flownote: true, them: false },
          { feature: 'Blur / redaction tool', flownote: true, them: false },
          { feature: 'Smart auto-patch retouch', flownote: true, them: false },
          { feature: 'Filter / brightness controls', flownote: true, them: false },
          { feature: 'History limits on free tier', flownote: false, them: true },
          { feature: 'No watermark on export', flownote: true, them: true },
        ],
        verdict: 'If you need a searchable archive of your markups and easy shareable links, Markup Hero\'s model makes sense. If you want powerful annotation without an account, without server uploads, and without worrying about hitting history limits, FlowNote is the better fit.',
      }}
      features={[
        { icon: <Lock className="w-5 h-5" />, title: 'No Account', desc: 'No email, no password, no account creation. Every tool available from the first second.' },
        { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Layers', desc: 'Unlimited annotation layers per screenshot. No history limits to worry about.' },
        { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Identifies fonts in your screenshots. Something Markup Hero doesn\'t offer.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Blur & Retouch', desc: 'Global blur and smart retouch brush. Not available in Markup Hero.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Local Processing', desc: 'Nothing uploaded to any server. Screenshots stay on your device.' },
        { icon: <Download className="w-5 h-5" />, title: 'Clean Download', desc: 'Export directly to your device. No hosted link, no third-party server dependency.' },
      ]}
      faq={[
        { q: 'Does FlowNote store my markups like Markup Hero does?', a: 'No — FlowNote is session-only. There\'s no account, no history, no server storage. Close the tab and the session is gone. Keep the original screenshot if you need to re-edit.' },
        { q: 'Can FlowNote generate shareable links like Markup Hero?', a: 'FlowNote exports the annotated image as a file. You share it via your own method — Slack, email, Jira, wherever. There are no hosted links.' },
        { q: 'Is FlowNote free in a way that Markup Hero\'s free tier isn\'t?', a: 'Yes. FlowNote has no history limits, no feature gating, no upgrade prompt. It\'s fully free because it has no backend costs to recover.' },
        { q: 'What annotation features does FlowNote have that Markup Hero doesn\'t?', a: 'AI font detection, smart auto-patch retouch, blur/redaction tool, filter and brightness controls, and 18 style templates vs Markup Hero\'s basic annotation options.' },
      ]}
      relatedLinks={[
        { href: '/snagit-alternative', label: 'Snagit Alternative' },
        { href: '/awesome-screenshot-alternative', label: 'Awesome Screenshot Alternative' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
      ]}
      keywords={['markup hero alternative', 'free markup hero replacement', 'screenshot markup without account', 'markup hero free alternative']}
    />
  );
}
