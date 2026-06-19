import React from 'react';
import { LegalLayout } from './LegalLayout';
import { useSEO } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy — FlowNote',
    description: 'FlowNote privacy policy. We collect no personal data. All screenshot editing happens locally in your browser — nothing is uploaded to any server.',
    canonical: `${BASE}/privacy-policy`,
    keywords: 'FlowNote privacy policy, screenshot editor privacy, no data collection',
    breadcrumbs: [{ name: 'Privacy Policy', url: `${BASE}/privacy-policy` }],
  });

  return (
    <LegalLayout>
      <article className="prose prose-neutral max-w-none">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 19, 2026</p>

        <Section title="1. Overview">
          <p>
            FlowNote (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{' '}
            <a href="https://useflownote.online" className="text-indigo-600 underline">useflownote.online</a>{' '}
            (the &ldquo;Service&rdquo;). This Privacy Policy explains what information we collect, how we use it,
            and your rights regarding your personal data.
          </p>
          <p>
            <strong>The short version:</strong> FlowNote is a browser-based screenshot editor. Your images
            are processed entirely on your own device using the HTML5 Canvas API. We do not upload, store,
            or transmit your screenshots to any server — ever.
          </p>
        </Section>

        <Section title="2. Information We Do Not Collect">
          <p>Because all processing happens in your browser, FlowNote does not collect or have access to:</p>
          <ul>
            <li>The screenshots or images you edit</li>
            <li>Your name, email address, or any account information (there are no accounts)</li>
            <li>Payment or financial data</li>
            <li>Location data</li>
            <li>Device identifiers or fingerprints</li>
          </ul>
          <p>
            We do not use third-party analytics services (such as Google Analytics), advertising trackers,
            or session-recording software that would collect personal information about your browsing behaviour.
          </p>
        </Section>

        <Section title="3. Information That May Be Collected Automatically">
          <p>
            Like virtually all websites, our hosting infrastructure (Vercel) may record standard server logs
            including IP addresses, browser user-agent strings, referring URLs, and page request timestamps.
            These logs are retained for security and operational purposes and are not used to identify
            individual users. They are deleted on a rolling 30-day schedule.
          </p>
          <p>
            If you contact us via email, we will receive the information contained in your message (your
            email address and the content of your correspondence) and use it solely to respond to you.
          </p>
        </Section>

        <Section title="4. Cookies and Local Storage">
          <p>
            FlowNote does not set persistent advertising or tracking cookies. The application may use
            browser <code>localStorage</code> to remember your editor preferences (such as the last colour
            you selected or the last export format you used). This data never leaves your browser and is
            not accessible to us.
          </p>
          <p>
            Our hosting provider may set a single session cookie for load-balancing purposes. This cookie
            contains no personally identifiable information and expires when you close your browser.
          </p>
          <p>
            For more information, see our <a href="/cookie-policy" className="text-indigo-600 underline">Cookie Policy</a>.
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>We use the following third-party services to operate the website:</p>
          <ul>
            <li>
              <strong>Vercel</strong> — website hosting. Vercel may collect anonymised access logs.
              See <a href="https://vercel.com/legal/privacy-policy" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">Vercel&rsquo;s Privacy Policy</a>.
            </li>
            <li>
              <strong>Google AdSense</strong> (if enabled) — advertising. When ads are displayed,
              Google may set cookies and collect data in accordance with{' '}
              <a href="https://policies.google.com/privacy" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">Google&rsquo;s Privacy Policy</a>.
              You may opt out via{' '}
              <a href="https://www.google.com/settings/ads" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
            </li>
          </ul>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            FlowNote is not directed at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has provided us with personal data,
            please contact us at the address below and we will delete it promptly.
          </p>
        </Section>

        <Section title="7. Data Security">
          <p>
            Because we do not collect or store your images or personal information, there is no database
            of user data that could be breached. The website itself is served over HTTPS with TLS encryption.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>
            Depending on your jurisdiction, you may have rights under data protection law including the
            right to access, correct, or delete personal data we hold about you. As we hold no personal
            data beyond server log entries (which are anonymised and deleted on a rolling basis), these
            rights are effectively satisfied by our architecture.
          </p>
          <p>
            If you are located in the European Economic Area, you have rights under the GDPR. If you are
            a California resident, you have rights under the CCPA. To exercise any rights, contact us at
            the address in Section 10.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with
            an updated &ldquo;Last updated&rdquo; date. We encourage you to review this page periodically.
            Your continued use of the Service after any changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please visit our{' '}
            <a href="/contact" className="text-indigo-600 underline">Contact page</a>{' '}
            or see the <a href="/about" className="text-indigo-600 underline">About page</a> for more information about FlowNote.
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
