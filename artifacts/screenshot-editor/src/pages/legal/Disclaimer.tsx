import React from 'react';
import { LegalLayout } from './LegalLayout';
import { useSEO } from '@/hooks/use-seo';

const BASE = 'https://useflownote.online';

export default function Disclaimer() {
  useSEO({
    title: 'Disclaimer — FlowNote',
    description: 'FlowNote disclaimer. Information about limitations of liability, accuracy of content, and the nature of our free browser-based screenshot editing service.',
    canonical: `${BASE}/disclaimer`,
    keywords: 'FlowNote disclaimer, screenshot editor disclaimer',
    breadcrumbs: [{ name: 'Disclaimer', url: `${BASE}/disclaimer` }],
  });

  return (
    <LegalLayout>
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 19, 2026</p>

        <Section title="1. General Disclaimer">
          <p>
            The information and tools provided on FlowNote (<a href="https://useflownote.online" className="text-indigo-600 underline">useflownote.online</a>)
            are offered for general informational and utility purposes only. While we strive to keep the
            Service accurate, reliable, and up to date, we make no representations or warranties of any
            kind — express or implied — about the completeness, accuracy, reliability, suitability, or
            availability of the Service or the information contained therein.
          </p>
          <p>
            Any reliance you place on the Service or on information provided through the Service is strictly
            at your own risk.
          </p>
        </Section>

        <Section title="2. No Professional Advice">
          <p>
            Nothing on this website constitutes professional, legal, financial, medical, or any other
            regulated advice. The Service is a software tool — not a professional consultancy. You should
            seek appropriate professional advice before making decisions based on any content on this website.
          </p>
        </Section>

        <Section title="3. Image Editing Results">
          <p>
            FlowNote&rsquo;s editing features (including AI-assisted font detection, blur, retouch, and
            colour sampling) are provided as-is. Results may vary depending on the quality of the original
            image, browser capabilities, and hardware. We make no guarantee that any particular editing
            outcome will be achieved.
          </p>
          <p>
            You are solely responsible for the images you edit using FlowNote and for ensuring that your
            use of edited images complies with all applicable laws and third-party rights (including copyright).
          </p>
        </Section>

        <Section title="4. Availability and Uptime">
          <p>
            We do not guarantee that the Service will be available at any particular time or that it will
            be free from interruptions, errors, or security vulnerabilities. The Service may be temporarily
            unavailable due to maintenance, updates, or circumstances beyond our control.
          </p>
          <p>
            Because FlowNote processes images locally in your browser, a brief loss of internet connectivity
            after the initial page load will not affect your ability to continue editing. However, refreshing
            the page or navigating away will clear your current editing session.
          </p>
        </Section>

        <Section title="5. External Links">
          <p>
            This website may contain links to external sites that are not operated by us. We have no
            control over the content and availability of those sites. The inclusion of any link does not
            imply endorsement of the linked site or its content.
          </p>
        </Section>

        <Section title="6. Advertising">
          <p>
            FlowNote may display advertisements served by Google AdSense or similar ad networks. The
            presence of an advertisement does not constitute an endorsement or recommendation by FlowNote
            of the advertiser&rsquo;s products or services. We are not responsible for the accuracy of
            advertising claims or for any transactions between you and an advertiser.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            In no event shall FlowNote be liable for any loss or damage including — without limitation —
            indirect or consequential loss or damage, or any loss or damage arising from loss of data or
            profits, arising out of or in connection with the use of this website or the Service.
          </p>
        </Section>

        <Section title="8. Changes">
          <p>
            We reserve the right to update this Disclaimer at any time. Changes will be posted on this
            page with a revised &ldquo;Last updated&rdquo; date.
          </p>
          <p>
            For related policies, see our <a href="/privacy-policy" className="text-indigo-600 underline">Privacy Policy</a>,{' '}
            <a href="/terms-of-service" className="text-indigo-600 underline">Terms of Service</a>, and{' '}
            <a href="/cookie-policy" className="text-indigo-600 underline">Cookie Policy</a>.
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
