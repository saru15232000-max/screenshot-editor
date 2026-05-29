import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { EyeOff, Shield, Pipette, Eraser, Wand2, Download } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

export default function BlurScreenshot() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Blur Screenshot Online Free — FlowNote',
    description: 'Blur passwords, emails and sensitive data in screenshots. Free browser-based tool — nothing uploaded, no signup. Precise retouch brush with AI auto-patch.',
    canonical: `${BASE}/blur-screenshot-online`,
    keywords: 'blur screenshot online, blur part of screenshot, screenshot blur tool, redact screenshot, censor screenshot, hide sensitive information',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'FlowNote — Blur Screenshot Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: `${BASE}/blur-screenshot-online`,
        description: 'Blur and redact sensitive information in screenshots. Free, private, browser-based.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do I blur part of a screenshot online?', acceptedAnswer: { '@type': 'Answer', text: 'Open FlowNote, drop your screenshot, and use the Retouch tab. Select your brush size, choose solid fill or auto-patch mode, and paint over the sensitive area. Export when done.' } },
          { '@type': 'Question', name: 'Is blurred content recoverable?', acceptedAnswer: { '@type': 'Answer', text: 'Solid fill redaction permanently replaces the original pixels in the exported image. It cannot be reversed.' } },
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
      h1="Blur Screenshot Online — Free"
      tagline="Redact passwords, emails and sensitive data before you share."
      intro="Sometimes you need to share a screenshot but something in it shouldn't be visible — a password auto-filled in a form field, a colleague's email address, a customer's billing details. FlowNote lets you blur or completely redact any part of a screenshot in your browser, without uploading anything to a server."
      ctaLabel="Blur Screenshot Free"
      stats={[
        { value: '0%', label: 'Data uploaded' },
        { value: '2', label: 'Redaction modes' },
        { value: '20', label: 'Undo steps' },
        { value: '100%', label: 'Browser-based' },
      ]}
      workflowSteps={[
        { num: '1', title: 'Open your screenshot', desc: 'Drop the image onto the canvas or click to browse. No account, no waiting.' },
        { num: '2', title: 'Switch to Retouch', desc: 'Open the Retouch tab. Set your brush size and choose a mode: solid fill for hard redaction, or auto-patch for a natural blend.' },
        { num: '3', title: 'Paint over sensitive content', desc: 'Drag the brush over passwords, names, card numbers, API keys — anything that shouldn\'t be visible. Use the eyedropper first if you want to match the background color exactly.' },
        { num: '4', title: 'Export the redacted screenshot', desc: 'Download as PNG, JPG or WEBP. The redaction is baked in permanently — no layers, no recoverable data.' },
      ]}
      sections={[
        {
          heading: 'Why screenshot privacy matters more than you think',
          body: 'Screenshots travel further than you expect. You take one to report a bug, paste it in a Slack channel, and it ends up in a Jira ticket that twelve people across two teams can see. If there was a password or a customer\'s name in that screenshot, it\'s now exposed to everyone in that chain. The fix is simple: redact before you share. FlowNote makes that fast enough that it actually happens rather than being skipped because it\'s too much effort.',
        },
        {
          heading: 'Blur vs. solid fill — which one to use',
          body: 'There\'s an important distinction here. Blur makes content harder to read but technically the pixel data is still there — someone with the right tools could potentially reconstruct blurred text. Solid fill is different: it completely replaces the original pixels with a flat color, leaving nothing to reconstruct. For anything genuinely sensitive — passwords, credentials, PII — use solid fill with a color sampled from the background. For softening irrelevant content or reducing visual noise, blur works fine. FlowNote gives you both modes in the same brush tool.',
        },
        {
          heading: 'Common scenarios where this saves you',
          body: 'API keys in terminal screenshots before posting to Stack Overflow. Customer PII visible in support tickets before forwarding them internally. A colleague\'s salary data glimpsed in a finance screenshot shared in the wrong channel. Employee names in HR screenshots being prepared for an external audit report. Personal information in browser screenshots taken during a screen share recording. These aren\'t edge cases — they happen regularly to teams that handle real data, and the redaction step is almost always skipped because it takes too long. FlowNote makes it fast enough to actually do.',
        },
      ]}
      useCases={[
        {
          role: 'Developer',
          scenario: 'I was preparing a bug report with a network request screenshot. The Authorization header contained a live bearer token. I needed to blur it before uploading to the public GitHub issue.',
          outcome: 'Token redacted with solid fill in under a minute. Bug report posted safely.',
        },
        {
          role: 'Customer Support',
          scenario: 'A customer sent us a screenshot showing their account settings page — full name, email, and billing address all visible. I needed to forward it to our engineering team without the PII.',
          outcome: 'All personal data painted over with background-matched fill before internal escalation.',
        },
        {
          role: 'Content Creator',
          scenario: 'I was recording a tutorial video and accidentally captured my email inbox in a screenshot. Before publishing the thumbnail, I needed to blur the email subjects that were visible in the background.',
          outcome: 'Inbox blurred with the global blur slider. Thumbnail exported cleanly.',
        },
      ]}
      features={[
        { icon: <EyeOff className="w-5 h-5" />, title: 'Global Blur Slider', desc: 'Apply gaussian blur across the entire screenshot. Useful for softening background content or reducing visual noise in non-sensitive areas.' },
        { icon: <Eraser className="w-5 h-5" />, title: 'Precision Retouch Brush', desc: 'Adjustable brush size. Two modes: solid fill for hard redaction, or AI auto-patch that samples surrounding pixels for a natural blend.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Background Color Matching', desc: 'Use the eyedropper before painting to sample the exact background color. The fill blends in invisibly instead of looking like an obvious patch.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Private Local Processing', desc: 'Every pixel is processed in your browser via the Canvas API. Your screenshots never touch a server — not ours, not anyone\'s.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'AI Auto-Patch Mode', desc: 'The brush analyzes a border of surrounding pixels and generates a weighted blend that matches the local background texture, reducing visible edit artifacts.' },
        { icon: <Download className="w-5 h-5" />, title: 'Permanent Baked Export', desc: 'The exported file has the redaction permanently written into the pixels. There are no layers, no hidden data, no recoverable original content.' },
      ]}
      faq={[
        { q: 'How do I blur part of a screenshot online?', a: 'Open FlowNote, drop your screenshot, go to the Retouch tab, select your brush size and mode, then paint over the content you want to redact. Export when done.' },
        { q: 'Is solid fill redaction actually permanent?', a: 'Yes. When you export, the fill is written directly into the image pixels. There are no layers, no hidden data, and no way to recover the original content from the exported file.' },
        { q: 'What\'s the difference between blur and solid fill?', a: 'Blur reduces contrast and makes text hard to read but the underlying pixel data is still present. Solid fill completely replaces the original pixels. For sensitive data, always use solid fill.' },
        { q: 'Does FlowNote upload my screenshot to process the blur?', a: 'No. All processing uses the browser\'s HTML5 Canvas API. Nothing is sent anywhere — the editing happens entirely on your device.' },
        { q: 'Can I blur multiple areas in the same screenshot?', a: 'Yes. The brush tool works continuously across the canvas. You can paint over as many regions as you need before exporting.' },
        { q: 'What brush sizes are available?', a: 'The brush size slider lets you go from a small 5px brush for precision work to a large 60px brush for quickly covering big areas.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
        { href: '/ai-screenshot-editor', label: 'AI Screenshot Editor' },
      ]}
      keywords={['blur screenshot online', 'blur part of screenshot', 'redact screenshot', 'censor screenshot online', 'blur password screenshot']}
    />
  );
}
