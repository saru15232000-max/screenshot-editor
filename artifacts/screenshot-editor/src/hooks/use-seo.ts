/**
 * FlowNote — useSEO hook
 * Sets all head metadata: title, description, canonical, OG, Twitter, JSON-LD.
 * Supports multiple JSON-LD schemas per page (SoftwareApplication + FAQPage, etc.)
 */
import { useEffect } from 'react';

const BASE_URL = 'https://useflownote.online';
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;
const DEFAULT_TITLE = 'FlowNote — Free Screenshot Editor Online';
const DEFAULT_SITE_NAME = 'FlowNote';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  /** Single JSON-LD object or array of schemas */
  jsonLd?: object | object[];
  /** Breadcrumb trail: [{ name, url }] — injected as BreadcrumbList schema */
  breadcrumbs?: { name: string; url: string }[];
  /** noindex: true blocks crawlers on this page */
  noindex?: boolean;
}

// ─── DOM helpers ─────────────────────────────────────────────────────────────

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute(rel, rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeMeta(name: string, attr: 'name' | 'property' = 'name') {
  document.querySelector(`meta[${attr}="${name}"]`)?.remove();
}

/** Inject or replace a named JSON-LD script block */
function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  keywords,
  jsonLd,
  breadcrumbs,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Core meta
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical
    if (canonical) {
      setLink('canonical', canonical);
    }

    // Open Graph
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', DEFAULT_SITE_NAME, 'property');
    setMeta('og:title', ogTitle ?? title, 'property');
    setMeta('og:description', ogDescription ?? description, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:url', canonical ?? BASE_URL, 'property');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@flownote');
    setMeta('twitter:title', ogTitle ?? title);
    setMeta('twitter:description', ogDescription ?? description);
    setMeta('twitter:image', ogImage);

    // JSON-LD schemas
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        setJsonLd(`dynamic-json-ld-${i}`, schema);
      });
      // Clean up extras from a previous longer schema list
      for (let i = schemas.length; i < 10; i++) {
        removeJsonLd(`dynamic-json-ld-${i}`);
      }
    }

    // Breadcrumbs JSON-LD
    if (breadcrumbs && breadcrumbs.length > 0) {
      setJsonLd('dynamic-breadcrumb-ld', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.name,
            item: b.url,
          })),
        ],
      });
    } else {
      removeJsonLd('dynamic-breadcrumb-ld');
    }

    return () => {
      document.title = DEFAULT_TITLE;
      removeMeta('robots');
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, keywords, jsonLd, breadcrumbs, noindex]);
}

// ─── Helper: build a standard SoftwareApplication JSON-LD ────────────────────

export function buildSoftwareAppSchema(opts: {
  name: string;
  description: string;
  url: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: opts.url,
    description: opts.description,
    ...(opts.rating && opts.reviewCount
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: String(opts.rating), reviewCount: String(opts.reviewCount) } }
      : {}),
    ...(opts.features ? { featureList: opts.features } : {}),
  };
}

/** Build a FAQ schema from q/a pairs */
export function buildFAQSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Build a comparison / product review WebPage schema */
export function buildComparisonSchema(opts: {
  name: string;
  description: string;
  url: string;
  competitor: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    about: {
      '@type': 'SoftwareApplication',
      name: opts.competitor,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: opts.name, item: opts.url },
      ],
    },
  };
}
