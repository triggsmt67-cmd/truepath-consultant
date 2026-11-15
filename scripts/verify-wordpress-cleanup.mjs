import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const cms = 'https://admin.truepath406.com';
const site = 'https://truepath406.com';
const checks = [];
async function request(path, options = {}) {
  const response = await fetch(new URL(path, cms), {
    redirect: 'manual', signal: AbortSignal.timeout(20000), ...options,
  });
  const body = await response.text();
  return { path, status: response.status, location: response.headers.get('location'),
    robots: response.headers.get('x-robots-tag'), contentType: response.headers.get('content-type'), body };
}
function record(result, label) {
  const summary = { ...result };
  delete summary.body;
  checks.push({ label, ...summary });
}
const query = '{ posts(first:100) { pageInfo { hasNextPage } nodes { slug featuredImage { node { sourceUrl } } } } }';
const graphql = await request('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
assert.equal(graphql.status, 200);
const data = JSON.parse(graphql.body);
assert.ok(!data.errors, JSON.stringify(data.errors));
assert.equal(data.data.posts.pageInfo.hasNextPage, false, 'Expand verification pagination when CMS exceeds 100 posts');
const posts = data.data.posts.nodes;
assert.ok(posts.length > 0);
record(graphql, `GraphQL returns ${posts.length} published posts`);

// Bounded concurrency so the release checks do not flood the CMS.
for (let start = 0; start < posts.length; start += 4) {
  await Promise.all(posts.slice(start, start + 4).map(async ({ slug }) => {
    const r = await request(`/${slug}/`);
    record(r, 'Published article redirects directly');
    assert.equal(r.status, 301, r.path);
    assert.equal(r.location, `${site}/insights/${slug}`, r.path);
    const target = await fetch(r.location, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    assert.equal(target.status, 200, r.location);
  }));
}
const root = await request('/');
record(root, 'Backend home redirects to public home');
assert.equal(root.status, 301);
assert.equal(root.location, `${site}/`);
const retired = [
  '/2026/03/', '/2026/04/', '/category/foundational/', '/category/decision-making/',
  '/category/reputation-scaling/', '/category/gmb-optimization/', '/category/foundational-logic/',
  '/feed/', '/missing-seo-cleanup-check/', '/*', '/wp-content/themes/twentytwentyone/*',
  '/sitemap_index.xml', '/post-sitemap.xml', '/page-sitemap.xml', '/category-sitemap.xml',
  '/post_tag-sitemap.xml', '/author-sitemap.xml', '/wp-sitemap.xml',
];
for (let start = 0; start < retired.length; start += 4) {
  await Promise.all(retired.slice(start, start + 4).map(async (path) => {
    const r = await request(path);
    record(r, 'Retired or missing URL returns direct 404');
    assert.equal(r.status, 404, path);
    assert.equal(r.location, null, path);
    assert.match(r.robots || '', /noindex/, path);
    // Requests into the static media directory retain their own server 404.
    if (!path.startsWith('/wp-content/')) {
      assert.ok(r.body.includes('This address does not have a public page.'), path);
      assert.ok(!r.body.includes('/category/foundational/'), path);
    }
  }));
}
const robots = await request('/robots.txt');
record(robots, 'Robots permits crawl and advertises no backend sitemap');
assert.equal(robots.status, 200);
assert.ok(!robots.body.includes('Sitemap:'), robots.body);
assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots.body), robots.body);
const tracking = await request('/service-business-website/?utm_source=seo-check&preview_nonce=test-not-a-secret');
record(tracking, 'Tracking retained; CMS nonce parameter not forwarded');
assert.equal(tracking.status, 301);
assert.equal(tracking.location, `${site}/insights/service-business-website?utm_source=seo-check`);

for (const path of ['/wp-json/', '/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,status', '/?rest_route=/wp/v2/posts&per_page=1&_fields=id,slug', '/wp-login.php']) {
  const r = await request(path);
  record(r, 'REST/login path remains available');
  assert.equal(r.status, 200, path);
  if (path.startsWith('/wp-json/wp/v2/posts')) {
    const restPosts = JSON.parse(r.body);
    assert.equal(restPosts.length, posts.length);
    assert.deepEqual(restPosts.map(p => p.slug).sort(), posts.map(p => p.slug).sort());
  }
}
const mediaUrl = posts.find(p => p.featuredImage?.node?.sourceUrl)?.featuredImage.node.sourceUrl;
assert.ok(mediaUrl);
const media = await fetch(mediaUrl, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
assert.equal(media.status, 200);
assert.match(media.headers.get('content-type') || '', /^image\//);
checks.push({ label: 'Existing featured image loads', url: mediaUrl, status: media.status });

const result = { reviewedOn: '2026-11-15', cms, publicSite: site, publishedArticles: posts.length,
  status: 'passed', checks, robotsBody: robots.body,
  limitations: 'HTTP checks do not log in or publish content. Authenticated dashboard/draft preview and saved settings are verified separately in Chrome.' };
if (process.env.SEO_EVIDENCE_PATH) writeFileSync(process.env.SEO_EVIDENCE_PATH, JSON.stringify(result, null, 2) + '\n');
console.log(`PASS: ${checks.length} backend checks; ${posts.length} article redirects and destinations, archives, 404s, sitemaps, robots, REST, GraphQL, login, tracking and media.`);
