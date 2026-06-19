/**
 * FlowNote — Sitemap Generator
 * Generates public/sitemap.xml from the centralized route config.
 * Run: node scripts/generate-sitemap.mjs
 * Auto-runs before every production build via package.json "build" script.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'https://useflownote.online';
const TODAY = new Date().toISOString().split('T')[0];
const RECENT = '2025-05-15';

// ─── Route definitions (mirrors src/data/routes-config.ts) ──────────────────
// Kept as plain JS so the script has zero TS/bundler dependencies.

const ROUTES = [
  // HOMEPAGE
  { slug: '', priority: 1.0, changeFreq: 'daily', lastMod: TODAY },

  // LEGAL & INFORMATIONAL PAGES
  { slug: 'about', priority: 0.8, changeFreq: 'monthly', lastMod: TODAY },
  { slug: 'contact', priority: 0.7, changeFreq: 'monthly', lastMod: TODAY },
  { slug: 'privacy-policy', priority: 0.5, changeFreq: 'yearly', lastMod: TODAY },
  { slug: 'terms-of-service', priority: 0.5, changeFreq: 'yearly', lastMod: TODAY },
  { slug: 'cookie-policy', priority: 0.4, changeFreq: 'yearly', lastMod: TODAY },
  { slug: 'disclaimer', priority: 0.4, changeFreq: 'yearly', lastMod: TODAY },

  // HAND-CRAFTED PRIORITY PAGES
  { slug: 'free-screenshot-editor-online', priority: 0.95, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'annotate-screenshot-online', priority: 0.95, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'blur-screenshot-online', priority: 0.95, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'screenshot-editor-no-signup', priority: 0.9, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'ai-screenshot-editor', priority: 0.9, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'add-text-to-screenshot-online', priority: 0.9, changeFreq: 'weekly', lastMod: TODAY },

  // COMPARISON PAGES (high commercial intent)
  { slug: 'snagit-alternative', priority: 0.88, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'lightshot-alternative', priority: 0.88, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'greenshot-alternative', priority: 0.88, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'markup-hero-alternative', priority: 0.88, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'cleanshot-alternative', priority: 0.88, changeFreq: 'weekly', lastMod: TODAY },
  { slug: 'awesome-screenshot-alternative', priority: 0.82, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'screenshot-editor-like-canva', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },

  // CORE SEO PAGES
  { slug: 'screenshot-editor-online', priority: 0.85, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'best-screenshot-editor', priority: 0.85, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'edit-screenshot-online', priority: 0.85, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'free-screenshot-editing-software', priority: 0.82, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'best-free-screenshot-editor', priority: 0.85, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'screenshot-editor-app', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'advanced-screenshot-editor', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'professional-screenshot-editor', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'fast-screenshot-editor', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'easy-screenshot-editor', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'modern-screenshot-editor', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-annotation-tool', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-editing-software', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-markup-tool', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-blur-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-drawing-tool', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-sharing-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-collaboration-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'best-screenshot-tool-online', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },

  // FEATURE PAGES
  { slug: 'screenshot-annotation-tool', priority: 0.82, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'screenshot-markup-tool', priority: 0.82, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'screenshot-crop-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-text-editor', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-drawing-tool', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-redaction-tool', priority: 0.82, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'add-arrow-to-screenshot-online', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'highlight-screenshot-online', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'draw-on-screenshot-online', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'edit-screenshot-without-photoshop', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'edit-screenshot-in-browser', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-blur', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-text', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-arrows', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-shapes', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-highlight', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-crop', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-annotation', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-sharing', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'online-screenshot-annotation-tool', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'online-screenshot-markup-tool', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'online-screenshot-blur-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'online-screenshot-drawing-tool', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'online-screenshot-sharing-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'free-screenshot-annotation-tool', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'free-screenshot-blur-tool', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'free-screenshot-drawing-tool', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'free-screenshot-markup-tool', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },

  // AI PAGES
  { slug: 'free-ai-screenshot-editor', priority: 0.85, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'ai-powered-screenshot-editor', priority: 0.83, changeFreq: 'weekly', lastMod: RECENT },
  { slug: 'screenshot-ai-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'ai-screenshot-annotation-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'ai-screenshot-blur-tool', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'smart-screenshot-editor', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'smart-screenshot-editing-tool', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'ai-screenshot-markup-tool', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'ai-screenshot-crop-tool', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'ai-screenshot-cleanup-tool', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-ai', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-ai-blur', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },

  // PLATFORM PAGES
  { slug: 'screenshot-editor-for-windows', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-mac', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-pc', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'browser-screenshot-editor', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-without-download', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'instant-screenshot-editor', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-online-no-login', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-chrome', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-firefox', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-edge', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },

  // AUDIENCE PAGES
  { slug: 'screenshot-editor-for-teams', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-developers', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-designers', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-students', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-work', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-productivity', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-documentation', priority: 0.82, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-tutorials', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-feedback', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-remote-teams', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-bug-reports', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-presentations', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-businesses', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-agencies', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-creators', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-content-teams', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-qa-testing', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-customer-support', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-product-teams', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },

  // SOFTWARE / APP CATEGORY
  { slug: 'screenshot-annotation-software', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editing-software', priority: 0.8, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editing-app', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editing-website', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editing-platform', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editing-workspace', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-saas', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-businesses', priority: 0.75, changeFreq: 'monthly', lastMod: RECENT },

  // COLLABORATION / WORKFLOW
  { slug: 'screenshot-editor-with-collaboration', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-with-comments', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'online-screenshot-collaboration-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-collaboration-software', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-workflow-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-productivity-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-management-tool', priority: 0.68, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-visual-feedback-tool', priority: 0.7, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-note-taking-tool', priority: 0.68, changeFreq: 'monthly', lastMod: RECENT },

  // LONG-TAIL
  { slug: 'screenshot-tool-online-free', priority: 0.78, changeFreq: 'monthly', lastMod: RECENT },
  { slug: 'screenshot-editor-for-agencies', priority: 0.72, changeFreq: 'monthly', lastMod: RECENT },
];

// ─── De-duplicate slugs ────────────────────────────────────────────────────
const seen = new Set();
const UNIQUE_ROUTES = ROUTES.filter(r => {
  if (seen.has(r.slug)) return false;
  seen.add(r.slug);
  return true;
});

// ─── Generate XML ───────────────────────────────────────────────────────────
function buildUrl(route) {
  const loc = route.slug === '' ? BASE + '/' : `${BASE}/${route.slug}`;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${route.lastMod}</lastmod>`,
    `    <changefreq>${route.changeFreq}</changefreq>`,
    `    <priority>${route.priority.toFixed(2)}</priority>`,
    '  </url>',
  ].join('\n');
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
  '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
  '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  '',
  ...UNIQUE_ROUTES.map(buildUrl),
  '',
  '</urlset>',
].join('\n');

// ─── Write output ────────────────────────────────────────────────────────────
const outDir = join(ROOT, 'public');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');

console.log(`✓ Sitemap generated: ${outPath}`);
console.log(`  ${UNIQUE_ROUTES.length} URLs included`);
console.log(`  Highest priority: ${UNIQUE_ROUTES.filter(r => r.priority >= 0.9).length} pages at 0.90+`);
console.log(`  Change weekly: ${UNIQUE_ROUTES.filter(r => r.changeFreq === 'weekly').length} pages`);
