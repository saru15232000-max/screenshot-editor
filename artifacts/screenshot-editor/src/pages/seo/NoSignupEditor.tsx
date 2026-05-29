import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Zap, Shield, Lock, Wand2, Globe, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function NoSignupEditor() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Screenshot Editor No Signup — Edit Instantly | FlowNote',
    description: 'Screenshot editor with no account, no email, no login. Full-featured editing in your browser — free, private, instantly accessible.',
    canonical: `${BASE}/screenshot-editor-no-signup`,
    keywords: 'screenshot editor no signup, screenshot editor no login, screenshot editor without account, instant screenshot editor',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Screenshot Editor — No Signup Required"
      tagline="No email. No password. No account. Just open and edit."
      intro="Signup friction kills useful tools. You find something that looks like it might solve your problem, click through to the site, then hit a registration wall — email, password, sometimes a credit card. FlowNote doesn't do any of that. There's no user account system. Open the page, drop your screenshot, and start editing. Every feature is available from your first second without identifying yourself to anyone."
      ctaLabel="Start Editing Now"
      stats={[
        { value: '0', label: 'Fields to fill out' },
        { value: '0', label: 'Emails sent' },
        { value: '100%', label: 'Features unlocked immediately' },
        { value: '0', label: 'Data collected' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open the page', desc: 'No account creation, no email verification, no loading screen. The editor is ready when the page loads.' },
        { num: '2', title: 'Drop your screenshot', desc: 'Drag it in, paste from clipboard, or click to browse. The canvas loads immediately.' },
        { num: '3', title: 'Use any tool you need', desc: 'All features are unlocked: text layers, AI font analyzer, retouch, filters, crop — no upgrade prompt, no paywall.' },
        { num: '4', title: 'Download and move on', desc: 'Export to PNG, JPG or WEBP. No watermark. Close the tab when you\'re done — there\'s no session to log out of.' },
      ]}
      sections={[
        {
          heading: 'Why signup-gating is a broken pattern for editing tools',
          body: 'Signup walls exist because they serve the tool, not the user. They create a user database for retargeting, they let the product team track behavior, and they give sales teams something to follow up on. For an editing tool that runs entirely in the browser, none of that is necessary. The product doesn\'t need to know who you are to process a canvas operation. FlowNote is structured so that there\'s genuinely nothing to sign up for — there\'s no backend storing your files, no history to attach to an account, no personalized settings that need to persist. It\'s just a browser app that runs when you open it.',
        },
        {
          heading: 'What zero data collection actually means',
          body: 'Not collecting data is a bigger deal than most people treat it as. Most "free" tools collect usage analytics, track which features you use, record your session behavior, and often share or sell that data. FlowNote runs with no tracking scripts, no analytics, no session recording. The editing session exists entirely in your browser\'s memory and is gone when you close the tab. There\'s no record of what screenshots you edited, what changes you made, or when you used the tool.',
        },
        {
          heading: 'All features, no unlock conditions',
          body: 'When a tool has a free plan and a paid plan, the free plan is usually designed to be frustrating enough to push you toward paying. Features get locked behind upgrade prompts. File size limits kick in. Watermarks appear on exports. FlowNote doesn\'t operate this way. There is no paid plan — which means there\'s nothing to gate behind one. The AI font analyzer, auto-patch retouch, all 18 style templates, 21 font families, the color eyedropper — all of it works without any account, immediately.',
        },
      ]}
      useCases={[
        {
          role: 'Freelancer',
          scenario: 'I needed to quickly annotate a screenshot for a client deliverable. I didn\'t want to create yet another account on a tool I might use twice. FlowNote was the first option I found that didn\'t make me register.',
          outcome: 'Screenshot annotated and sent to client in under three minutes.',
        },
        {
          role: 'Student',
          scenario: 'I was working on a presentation late at night and needed to add labels to a screenshot for a slide. I didn\'t have time to deal with a signup flow and email confirmation.',
          outcome: 'Labeled screenshot added to the presentation immediately, no registration needed.',
        },
        {
          role: 'Operations Manager',
          scenario: 'I needed to blur personal data from a screenshot before including it in a report. I was on a work computer without admin rights to install software, and I didn\'t want to create an account on an unknown service.',
          outcome: 'Data redacted in the browser. No software installed, no account created, no company data on a third-party service.',
        },
      ]}
      features={[
        { icon: <Zap className="w-5 h-5" />, title: 'Zero Onboarding', desc: 'No splash screen, no tutorial prompt, no account setup. The editing canvas is ready from the first page load.' },
        { icon: <Lock className="w-5 h-5" />, title: 'No Identity Required', desc: 'No email, no OAuth sign-in, no phone number. FlowNote has no concept of user identity.' },
        { icon: <Shield className="w-5 h-5" />, title: 'No Data Collected', desc: 'No analytics scripts, no session recording, no usage tracking. Nothing is recorded about your editing session.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Full Feature Access', desc: 'Every tool — AI font analyzer, auto-patch retouch, 21 fonts, 18 templates, color eyedropper — is available from the first second.' },
        { icon: <Globe className="w-5 h-5" />, title: 'Works Anywhere', desc: 'Any browser on any OS. Chrome, Firefox, Safari, Edge. Windows, Mac, Linux, Chromebook. No account synchronization needed.' },
        { icon: <Download className="w-5 h-5" />, title: 'No-Watermark Export', desc: 'Download your edited screenshot in PNG, JPG or WEBP. Nothing added by FlowNote. Your image, your output.' },
      ]}
      faq={[
        { q: 'Why does FlowNote not require an account?', a: 'The tool runs entirely in your browser with no backend storage. There\'s nothing to attach to an account — no saved files, no history, no settings that need to persist across sessions.' },
        { q: 'Is any information collected when I use FlowNote?', a: 'No. There are no analytics scripts, no session recording, no cookies that identify you. FlowNote has no way of knowing you visited.' },
        { q: 'Will my screenshots be stored anywhere?', a: 'No. The editing session exists entirely in your browser\'s memory and clears when you close the tab. Nothing is uploaded or stored.' },
        { q: 'Can I use it on a work computer without admin rights?', a: 'Yes. It runs in any browser and requires no installation, no plugins, and no system permissions.' },
        { q: 'Is there a usage limit if I don\'t have an account?', a: 'No. Unlimited screenshots, unlimited edits, unlimited exports. There\'s nothing to limit.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/blur-screenshot-online', label: 'Blur Screenshot' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
      ]}
      keywords={['screenshot editor no signup', 'screenshot editor no login', 'screenshot editor without account', 'instant screenshot editor']}
    />
  );
}
