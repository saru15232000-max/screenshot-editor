import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { EyeOff, Shield, Pipette, Eraser, Wand2, Download, Lock, Zap } from 'lucide-react';
import { SEOLandingPage } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';

const BASE = 'https://useflownote.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowNote — Blur Screenshot Online',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: `${BASE}/blur-screenshot-online`,
  description: 'Blur sensitive information in screenshots online. Blur passwords, emails, faces, and private data — free, private, no signup required.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I blur part of a screenshot online?', acceptedAnswer: { '@type': 'Answer', text: 'Upload your screenshot to FlowNote, use the Adjust tab to apply global blur, or use the Retouch brush to paint solid fills over specific sensitive areas.' } },
    { '@type': 'Question', name: 'Is the blur tool free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. FlowNote\'s blur and retouch tools are completely free with no signup.' } },
  ],
};

export default function BlurScreenshot() {
  const [, navigate] = useLocation();
  const editor = useEditor();

  useSEO({
    title: 'Blur Screenshot Online Free — FlowNote',
    description: 'Blur passwords, emails & sensitive data in screenshots online. Free blur tool, no signup needed. Protect your privacy with FlowNote.',
    canonical: `${BASE}/blur-screenshot-online`,
    keywords: 'blur screenshot online, blur part of screenshot, screenshot blur tool, censor screenshot, hide sensitive information screenshot, blur password screenshot',
    jsonLd: [jsonLd, faqSchema] as any,
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1="Blur Screenshot Online — Protect Your Privacy"
      tagline="Hide passwords, emails & sensitive data instantly."
      intro="Need to share a screenshot but protect private information? FlowNote lets you blur, redact, or paint over sensitive areas — passwords, email addresses, personal details, faces — before sharing. 100% private, runs in your browser, no signup."
      ctaLabel="Blur Screenshot Free"
      features={[
        { icon: <EyeOff className="w-5 h-5" />, title: 'Blur Sensitive Areas', desc: 'Apply gaussian blur to your entire screenshot or specific regions using the Adjust tab slider controls.' },
        { icon: <Eraser className="w-5 h-5" />, title: 'Retouch & Redact', desc: 'Use the smart retouch brush to paint solid fills over passwords, credit card numbers, faces, or any private data.' },
        { icon: <Pipette className="w-5 h-5" />, title: 'Background Color Match', desc: 'Sample your background color with the eyedropper for seamless fills that blend naturally into the screenshot.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Privacy-First Processing', desc: 'Everything runs locally in your browser. Your screenshot is never uploaded to any server or stored anywhere.' },
        { icon: <Wand2 className="w-5 h-5" />, title: 'Auto-Patch Mode', desc: 'Enable auto mode to let FlowNote sample surrounding pixels and create smooth, context-aware fills automatically.' },
        { icon: <Download className="w-5 h-5" />, title: 'Export Safely', desc: 'Download your redacted screenshot as PNG, JPG, or WEBP. All blur and fill effects are permanently baked in.' },
      ]}
      sections={[
        { heading: 'Why blur screenshots before sharing?', body: 'Screenshots often contain sensitive information you didn\'t intend to share: saved passwords visible in form fields, email addresses in headers, Slack messages with personal details, credit card numbers, private API keys, or confidential business information. Blurring or redacting this data before sharing protects your privacy and your team\'s security.' },
        { heading: 'Blur vs. redact: which should you use?', body: 'Blur softens an area so it\'s illegible but still visible. Redaction (solid fill) completely covers and removes the content. For maximum security, use FlowNote\'s retouch brush with a solid fill color sampled from the background. This ensures no information can be reconstructed from the image.' },
        { heading: 'Use cases: developers, support teams & creators', body: 'Developers share debug screenshots without exposing API keys or tokens. Customer support agents redact customer PII before escalating tickets. Content creators blur irrelevant background content to keep focus on what matters. All without any tools installed.' },
      ]}
      faq={[
        { q: 'How do I blur part of a screenshot online?', a: 'Open your screenshot in FlowNote, go to the Adjust tab and use the Blur slider to apply global blur. For targeted blur on specific areas, use the Retouch brush to paint opaque fills over sensitive regions.' },
        { q: 'Can I permanently remove sensitive information?', a: 'Yes — use the Retouch brush in solid fill mode to paint over content. The fill is baked permanently into the exported image.' },
        { q: 'Is blurred content recoverable?', a: 'Solid fills applied by the retouch brush completely replace the original pixels and cannot be reversed in the exported file. For maximum security, use solid fill rather than blur.' },
        { q: 'Does FlowNote upload my screenshot to process the blur?', a: 'No. All processing is done entirely in your browser using the HTML5 Canvas API. Nothing is sent to any server.' },
        { q: 'What areas can I blur?', a: 'You can blur the entire screenshot with the global blur slider, or use the retouch brush to target any specific region with pixel-precision.' },
      ]}
      relatedLinks={[
        { href: '/free-screenshot-editor-online', label: 'Free Screenshot Editor' },
        { href: '/annotate-screenshot-online', label: 'Annotate Screenshot' },
        { href: '/screenshot-editor-no-signup', label: 'No Signup Editor' },
        { href: '/add-text-to-screenshot-online', label: 'Add Text to Screenshot' },
      ]}
      keywords={['blur screenshot online', 'blur part of screenshot free', 'screenshot blur tool', 'redact screenshot online', 'censor screenshot online', 'hide sensitive info screenshot']}
    />
  );
}
