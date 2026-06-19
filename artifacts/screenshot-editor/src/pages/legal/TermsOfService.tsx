import React from 'react';
import { LegalLayout } from './LegalLayout';
import { useSEO } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';

export default function TermsOfService() {
  useSEO({
    title: 'Terms of Service — FlowNote',
    description: 'Terms of service for FlowNote, the free browser-based screenshot editor. Read our usage terms, acceptable use policy, and disclaimer of warranties.',
    canonical: `${BASE}/terms-of-service`,
    keywords: 'FlowNote terms of service, screenshot editor terms, acceptable use',
    breadcrumbs: [{ name: 'Terms of Service', url: `${BASE}/terms-of-service` }],
  });

  return (
    <LegalLayout>
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 19, 2026</p>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using FlowNote at <a href="https://useflownote.online" className="text-indigo-600 underline">useflownote.online</a>{' '}
            (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
            If you do not agree to these Terms, please do not use the Service.
          </p>
          <p>
            These Terms apply to all visitors and users of the Service. We reserve the right to update
            these Terms at any time. Continued use of the Service after changes constitutes acceptance.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            FlowNote is a free, browser-based screenshot editing tool. It allows you to:
          </p>
          <ul>
            <li>Upload and edit images locally in your browser</li>
            <li>Apply adjustments, filters, text overlays, and retouching</li>
            <li>Export edited images to your device</li>
          </ul>
          <p>
            All image processing occurs entirely within your browser using the HTML5 Canvas API. No images
            are transmitted to our servers. The Service is provided free of charge with no registration required.
          </p>
        </Section>

        <Section title="3. Acceptable Use">
          <p>You agree to use the Service only for lawful purposes. You must not use the Service to:</p>
          <ul>
            <li>Edit or create images that are illegal, defamatory, obscene, or otherwise harmful</li>
            <li>Infringe the intellectual property rights of others (copyright, trademark, etc.)</li>
            <li>Create fraudulent, misleading, or deceptive content</li>
            <li>Attempt to disrupt or compromise the availability or security of the Service</li>
            <li>Scrape, crawl, or automate interactions with the Service in a way that impairs performance</li>
            <li>Impersonate any person or entity</li>
          </ul>
          <p>
            We reserve the right to block access to the Service for any user who violates these Terms.
          </p>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            <strong>Your content:</strong> You retain full ownership of all images you edit using
            FlowNote. We claim no rights over your content.
          </p>
          <p>
            <strong>Our content:</strong> The FlowNote application, including its source code, design,
            branding, and written content, is protected by copyright and other intellectual property laws.
            You may not copy, modify, distribute, or create derivative works from our application without
            our prior written consent.
          </p>
        </Section>

        <Section title="5. Disclaimer of Warranties">
          <p>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES
            OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or
            other harmful components. We do not warrant that any defects will be corrected.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, FLOWNOTE AND ITS OPERATORS SHALL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA,
            LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING FROM YOUR USE OF OR INABILITY TO USE THE
            SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            Because FlowNote processes images locally and does not store your data, we accept no liability
            for data loss that occurs due to browser limitations, device failures, or accidental navigation
            away from the editor.
          </p>
        </Section>

        <Section title="7. Third-Party Links">
          <p>
            The Service may contain links to third-party websites. These links are provided for your
            convenience only. We have no control over the content of those sites and accept no
            responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </Section>

        <Section title="8. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with applicable law. Any disputes
            arising under these Terms shall be subject to the exclusive jurisdiction of the courts of
            the applicable jurisdiction.
          </p>
        </Section>

        <Section title="9. Changes to Terms">
          <p>
            We reserve the right to modify these Terms at any time. We will post the updated Terms on
            this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Service
            after any such changes constitutes your acceptance of the new Terms.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            If you have questions about these Terms, please visit our{' '}
            <a href="/contact" className="text-indigo-600 underline">Contact page</a>.
            You may also wish to read our{' '}
            <a href="/privacy-policy" className="text-indigo-600 underline">Privacy Policy</a> and{' '}
            <a href="/disclaimer" className="text-indigo-600 underline">Disclaimer</a>.
          </p>
        </Section>
      </article>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">{children}</div>
    </section>
  );
}
