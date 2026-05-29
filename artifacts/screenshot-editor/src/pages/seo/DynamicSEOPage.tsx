import { useCallback } from 'react';
import { useLocation, useParams } from 'wouter';
import {
  Wand2, Type, ScanSearch, Pipette, Eraser, Download,
  Brain, Layers, Shield, Zap, EyeOff, Lock, Globe,
  Move, Palette, AlignCenter,
} from 'lucide-react';
import { SEOLandingPage, FeatureItem } from '@/components/SEOLandingPage';
import { useSEO } from '@/hooks/use-seo';
import { useEditor } from '@/hooks/use-editor';
import { getPageBySlug, PageCategory } from '@/data/seo-pages';
import NotFound from '@/pages/not-found';

const BASE = 'https://useflownote.online';

const CATEGORY_FEATURES: Record<PageCategory, FeatureItem[]> = {
  core: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation, hue and blur — plus one-click presets: Vivid, Noir, Vintage, Chrome, Dramatic.' },
    { icon: <Type className="w-5 h-5" />, title: 'Text Overlays', desc: '21 fonts, 18 style templates, per-layer opacity and drag-to-position. Pro typography in two clicks.' },
    { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click any text in your screenshot to get the top 3 font matches. Scores by stroke weight, ink distribution and serif characteristics.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel for exact color matching on text, fills, or retouch patches.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Smart Retouch Brush', desc: 'Two modes: solid fill for hard redaction, or AI auto-patch that samples the surrounding background for a natural blend.' },
    { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'PNG, JPG or WEBP at full resolution. No watermarks, no FlowNote branding on the output.' },
  ],
  annotation: [
    { icon: <Type className="w-5 h-5" />, title: '21 Font Families', desc: 'Sans-serif, Serif, Monospace, Display, Handwriting. The right font for every screenshot context.' },
    { icon: <Palette className="w-5 h-5" />, title: '18 Style Templates', desc: 'Pre-designed annotation styles: Neon, Movie Title, Watermark, Subtitle, Code Block, Step Number, Warning and more.' },
    { icon: <Move className="w-5 h-5" />, title: 'Drag-to-Position', desc: 'Grab any text layer and drag it anywhere on the canvas. No coordinate entry needed.' },
    { icon: <Layers className="w-5 h-5" />, title: 'Unlimited Layers', desc: 'Add as many annotation layers as the screenshot needs. Each independently styled, positioned, and editable.' },
    { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Click on any text in your screenshot to identify its font family, weight and style.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel from the screenshot to use as your text color for perfect visual consistency.' },
  ],
  blur: [
    { icon: <EyeOff className="w-5 h-5" />, title: 'Global Blur Slider', desc: 'Apply gaussian blur across the entire screenshot with a single control. Good for softening background detail.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Precision Retouch Brush', desc: 'Adjustable brush size. Solid fill mode for hard redaction, auto-patch for a natural background blend.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Background Color Match', desc: 'Use the eyedropper before painting to sample the exact background color for seamless fills.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Local Processing Only', desc: 'Every pixel is processed in your browser. Screenshots never touch any server.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Auto-Patch Mode', desc: 'Analyzes surrounding pixels and creates a weighted blend that matches the local background texture.' },
    { icon: <Download className="w-5 h-5" />, title: 'Permanent Baked Export', desc: 'Redaction is written into the exported pixels. No layers, no recoverable data in the output file.' },
  ],
  ai: [
    { icon: <ScanSearch className="w-5 h-5" />, title: 'AI Font Analyzer', desc: 'Identifies fonts by analyzing stroke weight, ink distribution and serif presence. Scores against 21 font profiles.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Auto-Patch Retouch', desc: 'Samples the 10-pixel border around your brush stroke to generate a blended fill that fades into the background.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Smart Color Sampling', desc: 'Pixel neighborhood analysis to find the most representative color in a region, not just the single clicked pixel.' },
    { icon: <Wand2 className="w-5 h-5" />, title: 'AI Filter Presets', desc: 'Curated combinations across brightness, contrast, saturation and hue — Vivid, Noir, Vintage, Chrome, Dramatic.' },
    { icon: <Lock className="w-5 h-5" />, title: 'Private Local AI', desc: 'All AI features run in your browser. No cloud APIs, no uploads, no usage limits.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Zero Latency Results', desc: 'Local processing means instant output. Font analysis, retouch fills, and color sampling all happen in milliseconds.' },
  ],
  audience: [
    { icon: <Zap className="w-5 h-5" />, title: 'No Onboarding Required', desc: 'No account, no software install. Drop a screenshot and every tool is immediately available.' },
    { icon: <Type className="w-5 h-5" />, title: 'Rich Annotations', desc: '21 fonts, 18 templates, unlimited layers. Callouts that look intentional, not improvised.' },
    { icon: <EyeOff className="w-5 h-5" />, title: 'Blur & Redact', desc: 'Protect sensitive data before sharing. Global blur slider and precision retouch brush with AI auto-patch.' },
    { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Brightness, contrast, saturation and filter presets for polished, consistent output.' },
    { icon: <Shield className="w-5 h-5" />, title: '100% Private', desc: 'All processing happens locally. No uploads, no server storage, no data collected.' },
    { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'PNG, JPG, WEBP — no watermarks, no branding, just your screenshot.' },
  ],
  alternative: [
    { icon: <Zap className="w-5 h-5" />, title: 'No Install', desc: 'Open a URL and start editing. No downloading installers, no admin rights, no disk space used.' },
    { icon: <Lock className="w-5 h-5" />, title: 'No Account', desc: 'No email, no password, no trial activation. Every feature immediately accessible.' },
    { icon: <Type className="w-5 h-5" />, title: 'Better Typography', desc: '21 fonts and 18 templates — more annotation depth than most alternatives at any price point.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Font Detection', desc: 'Identifies fonts in screenshots automatically. A feature most desktop alternatives don\'t have.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Smart Retouch', desc: 'AI auto-patch for seamless content removal — cleaner than basic solid fill.' },
    { icon: <Download className="w-5 h-5" />, title: 'No Watermarks. Ever.', desc: 'Export at full resolution with nothing added. No paid tier needed to remove branding.' },
  ],
  action: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Adjust & Filter', desc: 'Brightness, contrast, saturation, hue, blur and five one-click filter presets.' },
    { icon: <Type className="w-5 h-5" />, title: 'Add Text', desc: '21 fonts, 18 style templates, per-layer opacity and drag-to-position. All in the Text tab.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Retouch & Redact', desc: 'Solid fill or AI auto-patch. Adjustable brush size and 20-step undo.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample any pixel for exact color matching on text or retouch fills.' },
    { icon: <AlignCenter className="w-5 h-5" />, title: 'Crop & Resize', desc: 'Custom dimensions, social media presets, aspect ratio lock, flip and rotate.' },
    { icon: <Download className="w-5 h-5" />, title: 'Export', desc: 'PNG, JPG or WEBP. No watermarks, no size limits.' },
  ],
  platform: [
    { icon: <Globe className="w-5 h-5" />, title: 'Any Browser, Any OS', desc: 'Chrome, Firefox, Safari, Edge — full feature support on Windows, Mac, Linux and Chromebook.' },
    { icon: <Lock className="w-5 h-5" />, title: 'No Extension Needed', desc: 'Works as a pure web app. No browser extensions, plugins or add-ons required.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Instant Load', desc: 'No splash screens, no loading progress bars, no onboarding flows.' },
    { icon: <Shield className="w-5 h-5" />, title: 'No Permissions Needed', desc: 'No admin rights, no system permissions, no disk space required.' },
    { icon: <Type className="w-5 h-5" />, title: 'Identical Feature Set', desc: 'Every tool works the same on every platform. No reduced-feature mobile version.' },
    { icon: <Download className="w-5 h-5" />, title: 'Direct Download', desc: 'Download the edited screenshot straight from the browser tab. No file manager workarounds.' },
  ],
  feature: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Filters & Adjustments', desc: 'Fine-tune brightness, contrast, saturation and hue with sliders plus one-click filter presets.' },
    { icon: <Type className="w-5 h-5" />, title: 'Rich Text Layers', desc: '21 fonts, 18 templates, draggable layers with full opacity and alignment control.' },
    { icon: <Eraser className="w-5 h-5" />, title: 'Retouch Brush', desc: 'AI auto-patch and solid fill modes with adjustable brush size and 20-step undo.' },
    { icon: <Pipette className="w-5 h-5" />, title: 'Color Eyedropper', desc: 'Sample exact pixel colors for perfect text color and background fill matching.' },
    { icon: <AlignCenter className="w-5 h-5" />, title: 'Crop & Resize', desc: 'Social media presets, custom dimensions, aspect ratio lock, flip and rotate.' },
    { icon: <Download className="w-5 h-5" />, title: 'Multi-Format Export', desc: 'PNG, JPG or WEBP at full resolution. No watermarks added.' },
  ],
  collaboration: [
    { icon: <Zap className="w-5 h-5" />, title: 'Zero Friction for Every Team Member', desc: 'No accounts to set up for new team members. Share the URL and they\'re ready to edit immediately.' },
    { icon: <Type className="w-5 h-5" />, title: 'Consistent Annotations', desc: '18 style templates create visual consistency across screenshots made by different people on the same team.' },
    { icon: <EyeOff className="w-5 h-5" />, title: 'Privacy Before Sharing', desc: 'Blur sensitive data before screenshots reach Slack, Jira or email threads.' },
    { icon: <Download className="w-5 h-5" />, title: 'Share-Ready Export', desc: 'Export in the right format for any platform — Notion, Confluence, GitHub, email, wherever your team works.' },
    { icon: <Shield className="w-5 h-5" />, title: 'No Data Stored', desc: 'Screenshots processed locally, not on FlowNote servers. No retention risk.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Works for Distributed Teams', desc: 'Any browser, any OS, any location. Consistent for remote and hybrid teams.' },
  ],
  software: [
    { icon: <Wand2 className="w-5 h-5" />, title: 'Software-Level Feature Depth', desc: 'Filters, AI tools, text layers, retouch, crop and export — everything desktop editing software offers.' },
    { icon: <Zap className="w-5 h-5" />, title: 'No Install Overhead', desc: 'Open a URL and edit. No installers, no update prompts, no compatibility checks.' },
    { icon: <Lock className="w-5 h-5" />, title: 'No Licensing Costs', desc: 'Free forever. No per-seat fees, no annual renewals, no feature tier upgrades needed.' },
    { icon: <Brain className="w-5 h-5" />, title: 'AI Built In', desc: 'Font analyzer and auto-patch retouch — capabilities most paid desktop software doesn\'t include.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Data Stays Local', desc: 'No cloud processing. Screenshots processed and stored only in your browser.' },
    { icon: <Download className="w-5 h-5" />, title: 'Clean Export', desc: 'Full resolution PNG, JPG or WEBP. No watermarks, no branding.' },
  ],
};

const CATEGORY_WORKFLOW: Record<PageCategory, { num: string; title: string; desc: string }[]> = {
  core: [
    { num: '1', title: 'Drop your screenshot', desc: 'Drag it onto the canvas, paste from clipboard, or click to browse. JPG, PNG, WEBP and GIF all work.' },
    { num: '2', title: 'Choose your tools', desc: 'Adjust filters, add text overlays, blur sensitive regions, or retouch content you want removed.' },
    { num: '3', title: 'Fine-tune everything', desc: 'Drag text layers, adjust opacity, undo as needed. Everything is live before you export.' },
    { num: '4', title: 'Export and share', desc: 'Download as PNG, JPG or WEBP. No watermark, no branding on the output.' },
  ],
  annotation: [
    { num: '1', title: 'Open your screenshot', desc: 'Drop it in or paste from clipboard. The canvas loads immediately.' },
    { num: '2', title: 'Add text layers', desc: 'Open the Text tab and click Add Text. Choose a style template for instant formatting.' },
    { num: '3', title: 'Drag and position', desc: 'Grab any layer and move it exactly where you need it. Stack multiple layers freely.' },
    { num: '4', title: 'Export with all annotations baked in', desc: 'Every layer renders into the final image at export. Download when it looks right.' },
  ],
  blur: [
    { num: '1', title: 'Open your screenshot', desc: 'Drop the image in. No account, no waiting.' },
    { num: '2', title: 'Open the Retouch tab', desc: 'Set your brush size and choose a mode: solid fill for hard redaction, or auto-patch for a natural blend.' },
    { num: '3', title: 'Paint over sensitive content', desc: 'Drag the brush over passwords, names, credentials — anything that shouldn\'t be visible.' },
    { num: '4', title: 'Export permanently redacted', desc: 'Download as PNG, JPG or WEBP. The redaction is baked into the pixels.' },
  ],
  ai: [
    { num: '1', title: 'Drop in a screenshot', desc: 'Any JPG, PNG, WEBP or GIF. Paste from clipboard or drag onto the canvas.' },
    { num: '2', title: 'Use the font analyzer', desc: 'Click the font analyzer in the Text tab, then click any text. Results appear immediately.' },
    { num: '3', title: 'Apply smart retouch', desc: 'Switch to auto-patch mode in the Retouch tab. Paint over content to remove — AI fills it contextually.' },
    { num: '4', title: 'Export privately', desc: 'Download your edited screenshot. No data was sent to any server.' },
  ],
  audience: [
    { num: '1', title: 'Open FlowNote in any browser', desc: 'No account to create. No software to install. The editor is ready immediately.' },
    { num: '2', title: 'Drop in your screenshot', desc: 'Drag, paste or browse. The editing canvas loads instantly.' },
    { num: '3', title: 'Use exactly what you need', desc: 'Annotations, blur, retouch, filters — all tools available without any unlock or upgrade.' },
    { num: '4', title: 'Export and share', desc: 'Download in the right format and share it however your team works.' },
  ],
  alternative: [
    { num: '1', title: 'No install, no account', desc: 'Open the URL in any browser. No comparing license tiers, no download page.' },
    { num: '2', title: 'Drop in your screenshot', desc: 'The same image you\'d edit in any other tool. Just drag it in.' },
    { num: '3', title: 'More editing depth', desc: 'AI font detection, 21 fonts, 18 templates, smart retouch, blur. Often more capable than paid alternatives.' },
    { num: '4', title: 'Clean export, no watermark', desc: 'Download directly. No branding added, no share link required.' },
  ],
  action: [
    { num: '1', title: 'Open your screenshot', desc: 'Drop it in or paste from clipboard. The editing canvas is instant.' },
    { num: '2', title: 'Select the right tool', desc: 'Adjust tab for color/filter work, Text tab for overlays, Retouch for fill and redaction, Layout for crop.' },
    { num: '3', title: 'Make your edits', desc: 'Everything is live and undoable. Adjust until it looks exactly right.' },
    { num: '4', title: 'Export', desc: 'PNG, JPG or WEBP. Full resolution, no watermark.' },
  ],
  platform: [
    { num: '1', title: 'Open any browser', desc: 'Chrome, Firefox, Safari, Edge — on Windows, Mac, Linux or Chromebook. No installation.' },
    { num: '2', title: 'Drop in your screenshot', desc: 'Drag, paste or browse. The editor loads the same way regardless of your OS.' },
    { num: '3', title: 'Edit with the full tool set', desc: 'Every feature available on every platform. No reduced-feature mobile or Linux version.' },
    { num: '4', title: 'Download and share', desc: 'Export directly from the browser tab. No app dependencies.' },
  ],
  feature: [
    { num: '1', title: 'Open your screenshot', desc: 'Drop it in or paste from clipboard.' },
    { num: '2', title: 'Use the relevant tab', desc: 'Adjust, Filters, Text, Retouch, or Layout — each tab contains the tools for that editing category.' },
    { num: '3', title: 'Fine-tune', desc: 'Everything is adjustable before export. Drag layers, change settings, undo freely.' },
    { num: '4', title: 'Export', desc: 'PNG, JPG or WEBP at full resolution. No watermarks.' },
  ],
  collaboration: [
    { num: '1', title: 'Anyone opens FlowNote', desc: 'No accounts to set up. Any team member can use it immediately from any browser.' },
    { num: '2', title: 'Edit the screenshot', desc: 'Annotate, blur sensitive data, adjust brightness — whatever the screenshot needs before sharing.' },
    { num: '3', title: 'Export share-ready', desc: 'Download in the format your team uses — PNG for docs, WEBP for web, JPG for email.' },
    { num: '4', title: 'Drop it into your workflow', desc: 'Paste into Slack, Jira, Notion, Confluence, GitHub — wherever your team communicates.' },
  ],
  software: [
    { num: '1', title: 'Open a URL instead of installing software', desc: 'No downloading, no running an installer, no admin rights needed.' },
    { num: '2', title: 'Drop in your screenshot', desc: 'The same image you\'d open in any desktop editor. Drag it onto the canvas.' },
    { num: '3', title: 'Access the full feature set', desc: 'AI tools, text layers, filters, retouch, crop — everything a desktop app has, in the browser.' },
    { num: '4', title: 'Export cleanly', desc: 'PNG, JPG or WEBP at full resolution. No watermarks, no subscriptions.' },
  ],
};

const COMMON_FAQ = [
  { q: 'Is FlowNote completely free?', a: 'Yes — 100% free with no feature limits, no watermarks, and no hidden tiers. The tool runs client-side so there\'s no subscription needed.' },
  { q: 'Do I need to create an account?', a: 'No account, no email, no sign-in. Every feature is immediately available.' },
  { q: 'Are my screenshots uploaded to a server?', a: 'Never. All processing happens locally in your browser. Screenshots don\'t leave your device.' },
  { q: 'What file formats are supported?', a: 'JPG, PNG, WEBP and GIF on input. PNG, JPG or WEBP on export.' },
  { q: 'Does it work offline?', a: 'Once the page has loaded, all editing features work without an internet connection.' },
];

export default function DynamicSEOPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const editor = useEditor();

  const page = getPageBySlug(params.slug);

  useSEO(page ? {
    title: page.title,
    description: page.description,
    canonical: `${BASE}/${page.slug}`,
    keywords: page.keywords.join(', '),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `FlowNote — ${page.h1}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: `${BASE}/${page.slug}`,
      description: page.description,
    },
  } : {
    title: 'FlowNote — Free Screenshot Editor Online',
    description: 'Free online screenshot editor. No signup required.',
  });

  const handleFile = useCallback((file: File) => {
    editor.handleImageUpload(file);
    navigate('/');
  }, [editor, navigate]);

  if (!page) return <NotFound />;

  const features = CATEGORY_FEATURES[page.category] ?? CATEGORY_FEATURES.core;
  const workflowSteps = CATEGORY_WORKFLOW[page.category] ?? CATEGORY_WORKFLOW.core;
  const faq = [...COMMON_FAQ, ...(page.faqExtra ?? [])];
  const relatedLinks = (page.relatedSlugs ?? []).map(s => ({
    href: `/${s}`,
    label: s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  }));

  return (
    <SEOLandingPage
      onFileSelected={handleFile}
      h1={page.h1}
      tagline={page.tagline}
      intro={page.intro}
      features={features}
      workflowSteps={workflowSteps}
      faq={faq}
      relatedLinks={relatedLinks}
      sections={page.sections}
      keywords={page.keywords}
    />
  );
}
