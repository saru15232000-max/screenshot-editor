import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'social-media-screenshot-guide';

const FAQ = [
  { q: 'What size should screenshots be for Twitter/X?', a: 'Twitter displays images at up to 1200×675px (16:9 ratio) in the feed. For single images, 1200×675px is optimal. For multiple images in one tweet, Twitter crops them — use square (1:1) images for the most predictable display.' },
  { q: 'What size should screenshots be for LinkedIn?', a: 'LinkedIn displays single images at 1200×628px (roughly 2:1). Square images (1200×1200px) also work well and take up more feed space, which can increase visibility.' },
  { q: 'Can I share screenshots of other people\'s content on social media?', a: 'It depends on copyright and platform terms. Screenshots of publicly posted content are generally treated as fair use for commentary or reporting purposes, but reproducing substantial copyrighted content, removing attribution, or presenting others\' work as your own is not acceptable. Always credit the original source.' },
  { q: 'How do I make a screenshot go viral on social media?', a: 'Viral screenshots typically contain a strong emotional hook (surprise, humour, insight), are immediately readable on mobile without zooming, have high contrast text, are square or 4:3 ratio, and contain a clear focal point. Annotation and cropping to remove irrelevant context dramatically improve shareability.' },
  { q: 'Should I add a watermark to my screenshots?', a: 'A subtle watermark (your username or website URL in a corner) is reasonable for original content you want attribution for. Avoid aggressive watermarks that obscure the content — these reduce engagement. In FlowNote, add a small text layer in the corner with a low opacity setting.' },
];

const PLATFORM_SPECS = [
  { platform: 'Twitter / X', recommended: '1200 × 675px', ratio: '16:9', notes: 'Square (1:1) also works well. Multiple images are cropped.' },
  { platform: 'LinkedIn', recommended: '1200 × 628px', ratio: '1.91:1', notes: 'Square (1200×1200) gets more feed space.' },
  { platform: 'Instagram Feed', recommended: '1080 × 1080px', ratio: '1:1', notes: 'Also supports 4:5 (1080×1350) for more vertical space.' },
  { platform: 'Instagram Stories', recommended: '1080 × 1920px', ratio: '9:16', notes: 'Keep important content in centre 80% — UI overlays appear at top and bottom.' },
  { platform: 'Facebook', recommended: '1200 × 630px', ratio: '1.91:1', notes: 'Square also supported. Shared links use 1200×628.' },
  { platform: 'Pinterest', recommended: '1000 × 1500px', ratio: '2:3', notes: 'Taller images get more feed space. Maximum ratio 1:2 (1000×2000).' },
];

export default function SocialMediaScreenshotGuide() {
  useSEO({
    title: 'Social Media Screenshot Guide — Sizes, Formats & Best Practices | FlowNote',
    description: 'Screenshot sizes, formats, and best practices for Twitter, LinkedIn, Instagram, and Facebook. How to make your screenshots look great on every platform.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'social media screenshot guide, screenshot size Twitter, screenshot size LinkedIn, Instagram screenshot size, social media image sizes',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'Social Media Screenshot Guide', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'Social Media Screenshot Guide', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="Social Media Screenshot Guide" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Social Media Guide · 7 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">Social Media Screenshot Guide</h1>
          <p className="text-base leading-relaxed">Screenshots are one of the most shared content types on social media — from developer insights and product announcements to conversation highlights and infographics. But a screenshot that looks fine on a desktop browser can appear cropped, blurry, or unreadable in a mobile social feed. This guide covers the right dimensions, formats, and editing techniques to make screenshots perform well on every major platform.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Why Platform Dimensions Matter</h2>
          <p>Every social platform displays images differently. Twitter crops landscape images. Instagram is optimised for square and portrait formats. LinkedIn favours near-square images. If your screenshot doesn't match the expected ratio, the platform will crop it — often cutting off exactly the part you wanted to show.</p>
          <p className="mt-3">The solution is to resize and crop your screenshot to the target platform's optimal ratio before posting. FlowNote's Layout tab includes preset export sizes for common social media formats, or you can set a custom width and height.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Platform Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Platform</th>
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Recommended Size</th>
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Ratio</th>
                  <th className="text-left py-3 font-semibold text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORM_SPECS.map(row => (
                  <tr key={row.platform} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td className="py-2.5 pr-4 font-medium text-foreground">{row.platform}</td>
                    <td className="py-2.5 pr-4 font-mono">{row.recommended}</td>
                    <td className="py-2.5 pr-4">{row.ratio}</td>
                    <td className="py-2.5">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">How to Optimise Screenshots for Social Media in FlowNote</h2>

          <h3 className="text-base font-bold text-foreground mb-2">1. Crop to the Right Ratio</h3>
          <p>Open your screenshot in <Link href="/" className="text-indigo-600 underline">FlowNote</Link>. Go to the <strong>Layout</strong> tab. Select the preset for your target platform (Twitter, Instagram, LinkedIn) or enter a custom width and height. FlowNote will resize the canvas and let you position the content within the new dimensions.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">2. Add Context for Mobile Readers</h3>
          <p>Social media is predominantly consumed on mobile. Assume your screenshot will be viewed at roughly 375px wide. At this size, small UI text becomes illegible. Crop aggressively to the relevant area, or add a large-font annotation that summarises the key point so mobile readers don't need to zoom in.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">3. Boost Contrast for Feed Readability</h3>
          <p>Screenshots displayed in a social feed compete with all surrounding content. In the <strong>Adjust</strong> tab, consider a slight contrast boost (5–15%) and brightness adjustment to make the screenshot "pop" in a busy feed. Avoid over-processing — the goal is clarity, not dramatic visual effect.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">4. Add Attribution or Branding</h3>
          <p>If you are sharing screenshots of your own product or content you want attributed back to you, add a small text layer in a corner with your username or URL. Use low opacity (60–70%) so it doesn't distract from the content. The <strong>Caption</strong> template in FlowNote creates a subtle attribution label.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">5. Redact Private Information</h3>
          <p>Before sharing any screenshot publicly, review it for personal data, internal usernames, email addresses, and anything else that shouldn't be public. Use the Retouch tab to paint over sensitive content. See <Link href="/guides/how-to-blur-sensitive-information" className="text-indigo-600 underline">How to Blur Sensitive Information</Link> for the full technique.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">6. Export as PNG or JPG</h3>
          <p>For screenshots with text and sharp UI elements, use PNG. For screenshots that are primarily photographic (e.g., a photo with a UI overlay), JPG at 85–90% quality produces a significantly smaller file with minimal visible quality loss. All major social platforms accept both formats.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Platform-by-Platform Tips</h2>

          <h3 className="text-base font-bold text-foreground mb-2">Twitter / X</h3>
          <p>Twitter shows a cropped preview in the feed and the full image on click. For a single image tweet, 1200×675 fills the preview perfectly. For thread screenshots (long conversations), crop to the most interesting exchange — don't share the full thread with tiny text. Add a caption annotation if the key insight is not immediately obvious from the screenshot itself.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">LinkedIn</h3>
          <p>LinkedIn users skew professional. For product screenshots, add a brief annotation explaining what is notable. For data screenshots (dashboards, analytics), ensure the key metric is visible at feed size without zooming. LinkedIn's audience responds well to "before/after" screenshot pairs showing a problem and solution.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Instagram</h3>
          <p>Instagram is visual-first. Screenshots of UI perform less well than photographic content on Instagram — unless the UI itself is visually striking or the screenshot contains a strong text message. For Instagram, a square crop (1080×1080) works best. Boost saturation slightly for the feed — slightly more vivid colours stop the scroll. Use the Vivid preset in FlowNote as a starting point.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Instagram Stories</h3>
          <p>Stories are 9:16 (1080×1920). A horizontal screenshot placed in a Story will appear as a small strip with large empty areas above and below. Fill the empty space: add a background colour (use a complementary colour sampled from the screenshot), add a title annotation, or use the space for additional context.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Privacy Considerations for Public Screenshots</h2>
          <p>Sharing screenshots publicly on social media is a permanent action — images can be saved, re-shared, and cached by search engines and archive services. Before posting any screenshot publicly:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Remove all personally identifiable information (names, emails, phone numbers, addresses)</li>
            <li>Check for any credentials, API keys, or tokens visible in the screenshot</li>
            <li>Consider whether any visible business data (revenue, customer counts) is meant to be public</li>
            <li>For screenshots of other people's content, ensure you are not reproducing more than is necessary for commentary or reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <div key={item.q} className="rounded-2xl p-5" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)' }}>
          <p className="font-semibold text-foreground mb-2">Resize and edit screenshots for social media — free</p>
          <p className="mb-4">FlowNote includes social media presets (Twitter, Instagram, LinkedIn) in the Layout tab. No install, no account.</p>
          <Link href="/" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Open FlowNote →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
