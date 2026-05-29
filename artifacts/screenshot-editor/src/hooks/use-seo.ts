import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  jsonLd?: object;
}

const BASE_URL = 'https://useflownote.online';

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
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data: object) {
  const id = 'dynamic-json-ld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = `${BASE_URL}/opengraph.jpg`,
  keywords,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('og:title', ogTitle ?? title, 'property');
    setMeta('og:description', ogDescription ?? description, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonical ?? BASE_URL, 'property');
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', ogTitle ?? title, 'name');
    setMeta('twitter:description', ogDescription ?? description, 'name');
    setMeta('twitter:image', ogImage, 'name');
    if (canonical) setLink('canonical', canonical);
    if (jsonLd) setJsonLd(jsonLd);

    return () => {
      document.title = 'FlowNote — Capture. Organize. Flow.';
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, keywords, jsonLd]);
}
