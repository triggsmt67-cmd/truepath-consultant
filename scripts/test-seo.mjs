import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
import sanitizeHtml from 'sanitize-html';

const source = ts.transpileModule(readFileSync('src/lib/wordpress-content.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const context = {
  exports: {}, URL, console,
  require: (name) => {
    if (name === 'server-only') return {};
    if (name === 'sanitize-html') return sanitizeHtml;
    throw new Error(`Unexpected module: ${name}`);
  },
};
vm.runInNewContext(source, context);
const { sanitizeWordPressHtml } = context.exports;

test('preserves editorial internal links while normalizing old public URLs', () => {
  const html = sanitizeWordPressHtml(
    '<p><a href="https://www.truepath406.com/blog/ai-search-visibility-why-local-businesses-are-disappearing/">Related article</a> <a href="/#contact">Ask a question</a></p>',
    'thin-service-pages-look-generic',
  );
  assert.ok(html.includes('href="https://truepath406.com/insights/ai-search-visibility-why-local-businesses-are-disappearing"'));
  assert.ok(html.includes('href="/#contact">Ask a question</a>'));
});

test('normalizes legacy services, relative blog links, query strings and fragments', () => {
  const html = sanitizeWordPressHtml('<p><a href="http://truepathdigital.com/solutions/lead-velocity/?utm_source=article#process">Response</a><a href="/blog/example/">Article</a><a href="/solutions/demand-audit/">Audit</a><a href="/tools/marketing-checkup/">Worksheet</a></p>');
  assert.ok(html.includes('href="https://truepath406.com/services/lead-response?utm_source=article#process"'));
  assert.ok(html.includes('href="/insights/example"'));
  assert.ok(html.includes('href="/#audit"'));
  assert.ok(html.includes('href="/checkup"'));
});

test('leaves external, API and media URLs intact and still sanitizes unsafe HTML', () => {
  const html = sanitizeWordPressHtml('<p>https://truepathdigital.com/blog/quoted/ <a href="//example.com/a/" target="_blank">Source</a><a href="https://admin.truepath406.com/wp-json/">API</a><a href="javascript:alert(1)">Unsafe</a></p><img src="https://admin.truepath406.com/wp-content/uploads/photo.jpg" alt="Work"><script>alert(1)</script>');
  assert.ok(html.includes('https://truepathdigital.com/blog/quoted/'));
  assert.ok(html.includes('href="//example.com/a/"'));
  assert.ok(html.includes('href="https://admin.truepath406.com/wp-json/"'));
  assert.ok(html.includes('src="https://admin.truepath406.com/wp-content/uploads/photo.jpg"'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(!html.includes('<script'));
});

test('supplementary links never nest inside existing editorial anchors', () => {
  const html = sanitizeWordPressHtml('<p><a href="/checkup">response time</a>. Your reviews help. Track your estimate-to-close rate and estimate process.</p>', 'how-to-follow-up-on-an-estimate-before-it-goes-cold');
  assert.ok(html.includes('<a href="/checkup">response time</a>'));
  assert.doesNotMatch(html, /<a\b[^>]*>[^<]*<a\b/);
  assert.ok(html.includes('href="/services/lead-response"'));
});

// Run against a built Next.js server: SEO_BASE_URL=http://localhost:3001 node --test scripts/test-seo.mjs
test('production sitemap, pages, metadata, internal links and redirects', { skip: !process.env.SEO_BASE_URL }, async () => {
  const base = process.env.SEO_BASE_URL;
  const canonicalOrigin = 'https://truepath406.com';
  const get = (path, options) => fetch(new URL(path, base), options);
  const sitemap = await get('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  // Only page loc elements, excluding image:loc.
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.ok(urls.includes(`${canonicalOrigin}/checkup`));
  assert.ok(urls.includes(`${canonicalOrigin}/privacy-policy`));
  assert.ok(urls.some((url) => url.includes('/insights/')));
  assert.equal(new Set(urls).size, urls.length);
  const pages = new Map();
  for (const url of urls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, canonicalOrigin);
    assert.ok(!/^\/(blog|tools|api)(\/|$)/.test(parsed.pathname));
    const response = await get(parsed.pathname, { redirect: 'manual' });
    assert.equal(response.status, 200, url);
    assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), url);
    const html = await response.text();
    assert.ok(html.includes(`rel="canonical" href="${url}"`), `Self-canonical: ${url}`);
    assert.ok(!/<meta[^>]+(?:name="(?:robots|googlebot)"[^>]+content="[^"]*noindex|content="[^"]*noindex[^"]*"[^>]+name="(?:robots|googlebot)")/i.test(html), url);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, url);
    assert.ok(html.includes('href="mailto:trevor@truepath406.com"'), `Contact email link: ${url}`);
    assert.match(html, /"email"\s*:\s*"trevor@truepath406\.com"/, `Contact schema: ${url}`);
    assert.doesNotMatch(html, /trevor@truepath(?:digital|consultants)\.com/i, `Obsolete contact email: ${url}`);
    pages.set(parsed.pathname, html);
  }
  const article = pages.get('/insights/thin-service-pages-look-generic');
  assert.ok(article?.includes('href="https://truepath406.com/insights/ai-search-visibility-why-local-businesses-are-disappearing"'));
  assert.ok(article.includes('Thin service pages'));
  assert.ok(!/href="https?:\/\/(?:www\.)?truepathdigital\.com/.test(article));
  const checkup = pages.get('/checkup');
  assert.ok(checkup?.includes('property="og:url" content="https://truepath406.com/checkup"'));
  assert.ok(checkup.includes('name="twitter:title" content="Service Business Marketing Checkup | True Path Digital"'));
  const contactResource = await get('/llms.txt');
  assert.equal(contactResource.status, 200);
  const contactText = await contactResource.text();
  assert.ok(contactText.includes('trevor@truepath406.com'));
  assert.doesNotMatch(contactText, /trevor@truepath(?:digital|consultants)\.com/i);
  const robots = await (await get('/robots.txt')).text();
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots));
  const redirects = new Map([
    ['/blog', '/insights'],
    ['/blog/thin-service-pages-look-generic', '/insights/thin-service-pages-look-generic'],
    ['/solutions/review-system', '/services/google-profile'],
    ['/solutions/website-conversion', '/services/website-builds'],
    ['/solutions/lead-velocity', '/services/lead-response'],
    ['/solutions', '/#services'],
    ['/trust-calculator', '/#audit'],
    ['/tools/marketing-checkup', '/checkup'],
    ['/tools/hvac-marketing-checkup', '/checkup'],
  ]);
  for (const [from, to] of redirects) {
    const response = await get(from, { redirect: 'manual' });
    assert.equal(response.status, 308, from);
    assert.equal(new URL(response.headers.get('location'), base).pathname + new URL(response.headers.get('location'), base).hash, to, from);
  }
  for (const path of ['/hello-world', '/insights/does-not-exist-seo-audit']) {
    assert.equal((await get(path)).status, 404, path);
  }
  for (const path of ['/tools/marketing-checkup/email-preview', '/tools/hvac-marketing-checkup/email-preview']) {
    assert.equal((await get(path)).status, 404, path);
  }
  const internalPaths = new Set();
  for (const html of pages.values()) {
    sanitizeHtml(html, { transformTags: { a: (tagName, attribs) => {
      if (attribs.href) {
        const url = new URL(attribs.href, canonicalOrigin);
        if (url.origin === canonicalOrigin) internalPaths.add(url.pathname);
      }
      return { tagName, attribs };
    } } });
  }
  for (const path of internalPaths) {
    assert.equal((await get(path, { redirect: 'manual' })).status, 200, `Internal link: ${path}`);
  }
  console.log(`Verified ${urls.length} sitemap pages, ${internalPaths.size} internal paths, metadata, contact email, CMS article HTML, robots, redirects and 404s.`);
});
