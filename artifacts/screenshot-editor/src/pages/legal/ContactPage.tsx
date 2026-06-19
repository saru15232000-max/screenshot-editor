import React, { useState } from 'react';
import { LegalLayout } from './LegalLayout';
import { useSEO } from '@/hooks/use-seo';
import { Mail, Clock, MessageSquare, Shield } from 'lucide-react';

const BASE = 'https://useflownote.online';
const CONTACT_EMAIL = 'hello@useflownote.online';

export default function ContactPage() {
  useSEO({
    title: 'Contact Us — FlowNote',
    description: 'Get in touch with the FlowNote team. We respond to questions about the screenshot editor, bug reports, and feedback within 2 business days.',
    canonical: `${BASE}/contact`,
    keywords: 'FlowNote contact, screenshot editor support, FlowNote help',
    breadcrumbs: [{ name: 'Contact', url: `${BASE}/contact` }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact FlowNote',
      url: `${BASE}/contact`,
      description: 'Contact the FlowNote team for support, feedback, and bug reports.',
    },
  });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    const subject = encodeURIComponent(form.subject || 'FlowNote Enquiry');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <LegalLayout>
      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-foreground">Contact Us</h1>
          <p className="text-muted-foreground leading-relaxed">
            Have a question, found a bug, or want to share feedback? We&rsquo;d love to hear from you.
            The FlowNote team typically responds within 2 business days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Mail className="w-5 h-5" />, label: 'Email', value: CONTACT_EMAIL },
            { icon: <Clock className="w-5 h-5" />, label: 'Response time', value: '1–2 business days' },
            { icon: <Shield className="w-5 h-5" />, label: 'Privacy', value: 'Your message is private' },
          ].map(item => (
            <div key={item.label}
              className="rounded-2xl p-5 space-y-2"
              style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)' }}>
              <div className="text-indigo-500">{item.icon}</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
              <p className="text-sm text-foreground font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
          </div>

          {submitted ? (
            <div className="rounded-2xl p-8 text-center"
              style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)' }}>
              <p className="text-lg font-bold text-foreground mb-2">Your email client has opened!</p>
              <p className="text-sm text-muted-foreground">
                If it didn&rsquo;t open automatically, email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 underline">{CONTACT_EMAIL}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl px-4 py-3 text-sm text-foreground bg-background border border-black/10 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl px-4 py-3 text-sm text-foreground bg-background border border-black/10 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="subject">
                  Subject
                </label>
                <select
                  id="subject" name="subject"
                  value={form.subject} onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 text-sm text-foreground bg-background border border-black/10 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all">
                  <option value="">Select a topic…</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Question">General Question</option>
                  <option value="Privacy Enquiry">Privacy Enquiry</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={6}
                  value={form.message} onChange={handleChange}
                  placeholder="Describe your question or issue in as much detail as possible…"
                  className="w-full rounded-xl px-4 py-3 text-sm text-foreground bg-background border border-black/10 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button type="submit"
                  className="fn-gradient-bg text-white text-sm font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}>
                  Send Message
                </button>
                <p className="text-xs text-muted-foreground">
                  This opens your email client.{' '}
                  You can also email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 underline">{CONTACT_EMAIL}</a>.
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed"
          style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
          <p className="font-semibold text-foreground mb-2">Privacy notice</p>
          <p>
            Information you share via this contact form or by email will only be used to respond to your
            enquiry. We do not add you to any mailing list and will not share your information with third
            parties. See our <a href="/privacy-policy" className="text-indigo-600 underline">Privacy Policy</a> for full details.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How quickly will you respond?',
                a: 'We aim to respond to all enquiries within 1–2 business days. Complex technical issues may take slightly longer.',
              },
              {
                q: 'Do you offer phone support?',
                a: 'No. FlowNote is a small, independent project and we currently offer support by email only.',
              },
              {
                q: 'I found a bug. What information should I include?',
                a: 'Please include your browser name and version (e.g., Chrome 125), your operating system, the image format you were editing, and a description of what happened versus what you expected. Screenshots of the problem are very helpful.',
              },
              {
                q: 'Can I request a feature?',
                a: 'Absolutely. We read every feature request and prioritise the most commonly requested features for upcoming releases.',
              },
            ].map(item => (
              <div key={item.q} className="rounded-2xl p-5"
                style={{ background: 'rgba(248,249,252,0.9)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="font-semibold text-foreground text-sm mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
