import React from 'react';
import { LegalLayout } from './LegalLayout';
import { useSEO } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';

export default function CookiePolicy() {
  useSEO({
    title: 'Cookie Policy — FlowNote',
    description: 'FlowNote cookie policy. We use minimal cookies. All image editing is done locally in your browser with no tracking cookies.',
    canonical: `${BASE}/cookie-policy`,
    keywords: 'FlowNote cookie policy, screenshot editor cookies, no tracking',
    breadcrumbs: [{ name: 'Cookie Policy', url: `${BASE}/cookie-policy` }],
  });

  return (
    <LegalLayout>
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 19, 2026</p>

        <Section title="1. What Are Cookies?">
          <p>
            Cookies are small text files that are placed on your device by a website when you visit it.
            They are widely used to make websites work, or to work more efficiently, as well as to provide
            information to website operators.
          </p>
          <p>
            This Cookie Policy explains how FlowNote (<a href="https://useflownote.online" className="text-indigo-600 underline">useflownote.online</a>)
            uses cookies and similar technologies, and what your choices are regarding them.
          </p>
        </Section>

        <Section title="2. Our Approach to Cookies">
          <p>
            FlowNote is built with a privacy-first philosophy. We do not use advertising tracking cookies,
            cross-site tracking pixels, or social media cookies. Our use of cookies is intentionally minimal.
          </p>
        </Section>

        <Section title="3. Types of Cookies We Use">
          <table className="w-full text-sm border-collapse mt-2">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Type</th>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Purpose</th>
                <th className="text-left py-2 font-semibold text-foreground">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td className="py-3 pr-4 font-medium text-foreground">Strictly Necessary</td>
                <td className="py-3 pr-4">Session load-balancing by our hosting provider (Vercel). Contains no personal data.</td>
                <td className="py-3">Session</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td className="py-3 pr-4 font-medium text-foreground">Preference Storage</td>
                <td className="py-3 pr-4">Browser <code>localStorage</code> (not a cookie) may store your last-used export format or colour. Never transmitted to us.</td>
                <td className="py-3">Persistent (local only)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Advertising (AdSense)</td>
                <td className="py-3 pr-4">If ads are shown, Google AdSense may set cookies to serve relevant advertisements based on your previous visits to this and other websites.</td>
                <td className="py-3">Up to 2 years (Google-managed)</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="4. Google AdSense Cookies">
          <p>
            When Google AdSense advertisements are displayed on this website, Google may use cookies to
            serve ads based on your prior visits to this site or other sites on the internet. Google&rsquo;s
            use of advertising cookies enables it and its partners to serve ads based on your visit to our
            site and/or other sites on the internet.
          </p>
          <p>You may opt out of personalized advertising by visiting:</p>
          <ul>
            <li>
              <a href="https://www.google.com/settings/ads" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
            </li>
            <li>
              <a href="https://www.aboutads.info/choices" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">
                Digital Advertising Alliance opt-out
              </a>
            </li>
            <li>
              <a href="https://youronlinechoices.eu" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">
                Your Online Choices (EU)
              </a>
            </li>
          </ul>
        </Section>

        <Section title="5. Cookies We Do NOT Use">
          <p>FlowNote does not use:</p>
          <ul>
            <li>Analytics cookies (e.g., Google Analytics, Hotjar)</li>
            <li>Social media tracking pixels (e.g., Facebook Pixel)</li>
            <li>Cross-site tracking or retargeting cookies</li>
            <li>Any cookies that track your identity or create persistent profiles</li>
          </ul>
        </Section>

        <Section title="6. How to Control Cookies">
          <p>
            You can control and/or delete cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>See what cookies have been set and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block all cookies (though this may affect website functionality)</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p>
            Note that disabling strictly necessary cookies may prevent core website functionality from
            working correctly. Because FlowNote is browser-based, clearing cookies will not affect your
            ability to use the editor — your images are only stored locally in your browser session.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We may update this Cookie Policy from time to time. Changes will be posted on this page with
            an updated &ldquo;Last updated&rdquo; date. See also our{' '}
            <a href="/privacy-policy" className="text-indigo-600 underline">Privacy Policy</a>.
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
