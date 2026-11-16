import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const origin = 'https://truepath406.com';
const endpoint = 'https://api.indexnow.org/indexnow';
const statePath = '.indexnow/state.json';
const reportPath = '.indexnow/latest-result.json';

export function validateUrl(value) {
  const url = new URL(value);
  if (url.origin !== origin || url.username || url.password || url.search || url.hash || /^\/(api|tools|blog)(\/|$)/.test(url.pathname)) {
    throw new Error(`Not an approved canonical public URL: ${value}`);
  }
  return url.href;
}

export function sitemapUrls(xml) {
  if (!/<urlset\b/.test(xml) || !/<\/urlset>/.test(xml)) throw new Error('Invalid or incomplete sitemap');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => validateUrl(m[1]));
  if (urls.length < 8 || urls.length > 10000 || new Set(urls).size !== urls.length) throw new Error('Unexpected sitemap inventory');
  return urls.sort();
}

export function fingerprint(html, url) {
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
  if (!canonical || new URL(canonical).href !== new URL(url).href) throw new Error(`Wrong or missing canonical: ${url}`);
  if (/<meta[^>]+name="(?:robots|bingbot)"[^>]+content="[^"]*noindex/i.test(html)) throw new Error(`Noindex page: ${url}`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error(`Missing server-rendered main content: ${url}`);
  const clean = main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[^]*?-->/g, '');
  const text = clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const links = [...clean.matchAll(/\b(?:href|src|alt)="([^"]*)"/g)].map(m => m[0]);
  const metadata = [html.match(/<title>[^]*?<\/title>/i)?.[0], ...html.matchAll(/<meta\b[^>]+(?:name="(?:description|robots|bingbot)"|property="og:[^"]+")[^>]*>/gi)].map(String);
  const schema = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([^]*?)<\/script>/gi)].map(m => m[1]);
  return createHash('sha256').update(JSON.stringify([text, links, metadata, schema])).digest('hex');
}

export function changedUrls(previous, current, pending = []) {
  return [...new Set([...pending, ...Object.keys(current).filter(url => previous[url] !== current[url]), ...Object.keys(previous).filter(url => !(url in current))])].sort();
}

async function get(url) {
  return fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'TruePath-IndexNow-Monitor/1.0' } });
}

export async function run({ dryRun = false } = {}) {
  const config = JSON.parse(await readFile('indexnow/config.json', 'utf8'));
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(config.key)) throw new Error('Invalid IndexNow key');
  const keyLocation = `${origin}/${config.key}.txt`;
  if (!dryRun) {
    const verification = await get(keyLocation);
    if (verification.status !== 200 || (await verification.text()).trim() !== config.key) throw new Error('Live IndexNow key file verification failed');
  }
  const sitemap = await get(`${origin}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`Sitemap fetch failed: ${sitemap.status}`);
  const urls = sitemapUrls(await sitemap.text());
  let previous = { version: 1, pages: {}, pending: [] };
  try { previous = JSON.parse(await readFile(statePath, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (previous.version !== 1 || !previous.pages || !Array.isArray(previous.pending)) throw new Error('Invalid saved IndexNow state');
  const current = {};
  // Small concurrency avoids overwhelming the live website.
  for (let i = 0; i < urls.length; i += 4) {
    await Promise.all(urls.slice(i, i + 4).map(async url => {
      const response = await get(url);
      if (response.status !== 200 || /noindex/i.test(response.headers.get('x-robots-tag') || '')) throw new Error(`Page not indexable: ${url} (${response.status})`);
      current[url] = fingerprint(await response.text(), url);
    }));
  }
  const changes = changedUrls(previous.pages, current, previous.pending).map(validateUrl);
  // A sitemap omission alone is not proof of deletion. Verify before notifying.
  for (const url of changes.filter(url => !(url in current))) {
    const response = await get(url);
    if (![301, 308, 404, 410].includes(response.status)) throw new Error(`Unconfirmed removal/redirect: ${url} (${response.status})`);
    if ([301, 308].includes(response.status)) validateUrl(new URL(response.headers.get('location'), url).href);
  }
  const result = { checkedAt: new Date().toISOString(), dryRun, canonicalPages: urls.length, changedUrls: changes, status: changes.length ? 'dry-run' : 'unchanged' };
  await mkdir('.indexnow', { recursive: true });
  if (!dryRun) {
    let pending = [];
    if (changes.length && previous.submittedAt && Date.now() - Date.parse(previous.submittedAt) < 300000) {
      result.status = 'deferred-minimum-five-minute-interval';
      await writeFile(reportPath, JSON.stringify(result, null, 2));
      console.log(JSON.stringify(result, null, 2));
      return result;
    }
    if (changes.length) {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: new URL(origin).host, key: config.key, keyLocation, urlList: changes }),
        signal: AbortSignal.timeout(30000),
      });
      result.httpStatus = response.status;
      result.response = (await response.text()).slice(0, 2000);
      if (![200, 202].includes(response.status)) {
        result.status = 'failed';
        await writeFile(reportPath, JSON.stringify(result, null, 2));
        throw new Error(`IndexNow rejected notification: HTTP ${response.status}`);
      }
      result.status = response.status === 200 ? 'received' : 'accepted-pending-validation';
      if (response.status === 202) pending = changes;
    }
    // Save only after the full check and any submission succeeds. HTTP 202 stays pending.
    await writeFile(statePath, JSON.stringify({ version: 1, checkedAt: result.checkedAt, pages: current, pending, submittedAt: changes.length ? result.checkedAt : previous.submittedAt }, null, 2));
  }
  await writeFile(reportPath, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await run({ dryRun: process.argv.includes('--dry-run') });
}
