import React from 'react';
import { Link } from 'wouter';
import { GuideLayout } from './GuideLayout';
import { useSEO, buildFAQSchema } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';
const SLUG = 'how-to-share-screenshots-safely';

const FAQ = [
  { q: 'Do screenshots contain metadata that reveals personal information?', a: 'Screenshots taken by your operating system (e.g., Windows Snipping Tool, Mac Cmd+Shift+4) may embed metadata including device name, creation timestamp, and occasionally GPS coordinates. Screenshots exported from FlowNote contain no metadata from the original file — the export is a fresh canvas render.' },
  { q: 'Is it safe to share screenshots in Slack or Teams?', a: 'Slack and Teams store images on their servers, accessible to workspace administrators and the platform itself. Redact any sensitive information before sharing. Check your workspace data retention policies and understand that images may be stored indefinitely.' },
  { q: 'What is the safest file format to use when sharing screenshots?', a: 'PNG is recommended for screenshots containing text, UI elements, or sensitive areas you have redacted. PNG is lossless, preserving redaction fills exactly. Avoid JPG for redacted screenshots — JPG compression can create artefacts near covered areas.' },
  { q: 'Can I share screenshots that contain other people\'s faces?', a: 'In many jurisdictions, sharing identifiable photos of individuals without consent is regulated. If a screenshot contains faces (e.g., a video call screenshot), blur or redact faces before sharing, particularly when sharing publicly or in a professional context.' },
  { q: 'How do I share a screenshot without uploading it to a third-party service?', a: 'Use encrypted file transfer (Signal, ProtonMail) or a self-hosted file service. For internal sharing, your company\'s secure document management system is preferable to consumer cloud storage.' },
];

export default function HowToShareScreenshotsSafely() {
  useSEO({
    title: 'How to Share Screenshots Safely — Privacy Best Practices | FlowNote',
    description: 'Learn safe screenshot sharing practices: removing metadata, redacting personal data, choosing secure channels, and avoiding privacy mistakes.',
    canonical: `${BASE}/guides/${SLUG}`,
    keywords: 'share screenshots safely, screenshot privacy, screenshot metadata, safe screenshot sharing, screenshot security',
    breadcrumbs: [{ name: 'Guides', url: `${BASE}/guides` }, { name: 'Share Screenshots Safely', url: `${BASE}/guides/${SLUG}` }],
    jsonLd: [buildFAQSchema(FAQ), { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Share Screenshots Safely', url: `${BASE}/guides/${SLUG}`, author: { '@type': 'Organization', name: 'FlowNote' } }],
  });

  return (
    <GuideLayout breadcrumb="Share Screenshots Safely" currentSlug={SLUG}>
      <article className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <header>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Privacy Guide · 6 min read</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">How to Share Screenshots Safely</h1>
          <p className="text-base leading-relaxed">Sharing a screenshot seems simple, but it carries real risks: hidden metadata, accidentally included personal data, insecure upload destinations, and images stored indefinitely on third-party servers. This guide covers the full picture of safe screenshot sharing — from what to redact, to which formats to use, to how to choose the right channel.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">The Risks of Sharing Unedited Screenshots</h2>
          <p>Most people think of screenshot sharing as a low-risk activity. In reality, an unedited screenshot can expose:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Personal data</strong> — names, email addresses, phone numbers, and other identifiers visible in the UI</li>
            <li><strong>Credentials</strong> — passwords, API keys, session tokens, or authentication headers visible in browser devtools or terminal output</li>
            <li><strong>Business-sensitive information</strong> — revenue figures, internal project names, unreleased features, or customer counts visible in dashboards</li>
            <li><strong>Metadata</strong> — the image file itself may contain embedded information about your device, software, and location</li>
            <li><strong>Context clues</strong> — open browser tabs, window titles, taskbar items, and system notifications visible around the main content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Before Sharing: The Pre-Share Checklist</h2>
          <div className="space-y-2">
            {[
              { step: 'Redact personal data', detail: 'Cover all names, emails, phone numbers, and IDs using FlowNote\'s Retouch tool.' },
              { step: 'Remove credentials', detail: 'Paint over API keys, passwords, tokens, and connection strings.' },
              { step: 'Check the periphery', detail: 'Look at browser tabs, window titles, taskbar, and notification areas for anything sensitive.' },
              { step: 'Remove metadata', detail: 'Export from FlowNote — the output contains no embedded metadata from the original file.' },
              { step: 'Choose the right format', detail: 'Use PNG for UI screenshots; avoid JPG for images with redacted content.' },
              { step: 'Choose the right channel', detail: 'Match the channel\'s security level to the sensitivity of the content.' },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-4 rounded-2xl p-4" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <span className="w-7 h-7 rounded-full fn-gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{item.step}</p>
                  <p className="mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Understanding Screenshot Metadata</h2>
          <p>Image files can contain EXIF metadata — embedded data that describes the image's origin. For screenshots taken on a smartphone, this often includes GPS coordinates. For screenshots taken on a desktop OS, it typically includes the device name, operating system, and creation timestamp.</p>
          <p className="mt-3">When you edit a screenshot in FlowNote and export it, the exported file is a newly rendered canvas image. It does not inherit the metadata from the original file. The PNG or JPG output from FlowNote contains only the image data and basic format information — no device name, no timestamp from the original file, no GPS data.</p>
          <p className="mt-3">This makes FlowNote a naturally privacy-safe editing step in your workflow: even if you forget to strip metadata manually, the export process removes it.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Choosing the Right Sharing Channel</h2>
          <div className="space-y-3">
            {[
              { channel: 'Email (encrypted)', security: 'High', notes: 'Suitable for confidential internal screenshots. Use ProtonMail or S/MIME encryption for highly sensitive content.' },
              { channel: 'Slack / Teams', security: 'Medium', notes: 'Images are stored on corporate servers and accessible to admins. Suitable for internal screenshots after redaction. Not suitable for customer PII.' },
              { channel: 'GitHub / Jira Issues', security: 'Medium', notes: 'Attachments are stored on the platform\'s servers. Always redact personal data and credentials before attaching to issues.' },
              { channel: 'Public social media', security: 'Low', notes: 'Images may be indexed, re-shared, and permanently cached. Only share screenshots with all personal data, credentials, and sensitive context fully removed.' },
              { channel: 'Imgur / public image hosts', security: 'Very Low', notes: 'Images are public by default and indexed by search engines. Treat as fully public — no sensitive content should appear.' },
            ].map(item => (
              <div key={item.channel} className="rounded-2xl p-4 grid grid-cols-[1fr_auto] gap-4 items-start" style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div>
                  <p className="font-semibold text-foreground">{item.channel}</p>
                  <p className="mt-1">{item.notes}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0" style={{
                  background: item.security === 'High' ? 'rgba(34,197,94,0.15)' : item.security === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                }}>{item.security}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Platform-Specific Considerations</h2>
          <h3 className="text-base font-bold text-foreground mb-2">Sharing in Slack</h3>
          <p>Slack stores all uploaded files on its servers (AWS S3) for the duration of your workspace's data retention policy. Workspace admins can access files. Enterprise Grid customers may have more control, but the default is that all uploaded images are accessible to anyone with workspace access. Redact before uploading — don't rely on channel permissions alone.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Sharing on GitHub Issues or Pull Requests</h3>
          <p>GitHub stores uploaded images on their CDN. For public repositories, all attached images are publicly accessible regardless of what you intended. For private repositories, images are accessible to anyone with repo access. Never attach screenshots with API keys, passwords, or customer data to GitHub issues or PRs.</p>

          <h3 className="text-base font-bold text-foreground mt-4 mb-2">Sharing in Support Tickets</h3>
          <p>Support platforms (Zendesk, Intercom, Freshdesk) store attachments and may share them with third-party integrations, AI analysis tools, or offshore support teams. When filing or responding to support tickets, redact customer PII before attaching screenshots — even if the screenshot is of a customer's account.</p>
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
          <p className="font-semibold text-foreground mb-2">Redact and prepare screenshots privately</p>
          <p className="mb-4">FlowNote runs in your browser and exports metadata-clean PNG files. Nothing leaves your device until you download.</p>
          <Link href="/" className="inline-flex items-center gap-2 fn-gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all" style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Open FlowNote →</Link>
        </div>
      </article>
    </GuideLayout>
  );
}
