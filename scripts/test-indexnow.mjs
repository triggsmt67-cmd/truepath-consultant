import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { origin, validateUrl, sitemapUrls, fingerprint, changedUrls, run } from './indexnow.mjs';

const page = (url, text='A useful page') => `<html><head><title>Example</title><link rel="canonical" href="${url}"><meta name="description" content="Example"></head><body><main class="random-build-class"><h1>${text}</h1><a href="/work">Work</a><script>runtime()</script></main></body></html>`;
const urls = ['/', '/work', '/insights', '/checkup', '/services/google-profile', '/services/website-builds', '/services/lead-response', '/services/chatgpt-business-profile'].map(p=>origin+p);
const xml = `<urlset>${urls.map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>`;

test('rejects backend, alternate-host, API, legacy and tracking URLs', () => {
  for(const u of ['https://admin.truepath406.com/', 'https://www.truepath406.com/', origin+'/api/contact', origin+'/blog/example', origin+'/?email=private', origin+'/#contact', 'https://example.com/']) assert.throws(()=>validateUrl(u));
  assert.equal(validateUrl(origin+'/services/website-builds'), origin+'/services/website-builds');
});
test('accepts complete sitemap and refuses partial or duplicate inventory', () => {
  assert.equal(sitemapUrls(xml).length,8);
  assert.throws(()=>sitemapUrls('<urlset/>'));
  assert.throws(()=>sitemapUrls(xml.replace('</urlset>',`<url><loc>${urls[0]}</loc></url></urlset>`)));
});
test('meaningful content and SEO changes trigger fingerprints; runtime scripts and classes do not', () => {
  const base=page(urls[0]);
  assert.equal(fingerprint(base,urls[0]),fingerprint(base.replace('random-build-class','another').replace('runtime()','unrelated()'),urls[0]));
  assert.notEqual(fingerprint(base,urls[0]),fingerprint(page(urls[0],'New main content'),urls[0]));
  assert.notEqual(fingerprint(base,urls[0]),fingerprint(base.replace('content="Example"','content="New description"'),urls[0]));
  assert.throws(()=>fingerprint(base.replace(urls[0],origin+'/other'),urls[0]));
  assert.throws(()=>fingerprint(base.replace('<title>','<meta name="robots" content="noindex"><title>'),urls[0]));
});
test('diff includes edits, additions, removals and retries, without unchanged URLs', () => {
  assert.deepEqual(changedUrls({a:'1',b:'1',d:'1'},{a:'1',b:'2',c:'1'},['b','e']),['b','c','d','e']);
});

test('live submission pipeline verifies the key, retains pending requests, avoids repeat notifications, and fails closed', async () => {
  const cwd=process.cwd(), originalFetch=global.fetch, originalLog=console.log;
  const dir=await mkdtemp(join(tmpdir(),'truepath-indexnow-'));
  let status=202, updated=false, failKey=false, failPage=false, posts=[];
  try {
    process.chdir(dir);await mkdir('indexnow');
    await writeFile('indexnow/config.json',JSON.stringify({key:'0123456789abcdef0123456789abcdef'}));
    console.log=()=>{};
    global.fetch=async (url,opts={})=> {
      if(url==='https://api.indexnow.org/indexnow') {posts.push(JSON.parse(opts.body));return new Response('',{status});}
      if(url.endsWith('.txt')) return new Response(failKey?'wrong':'0123456789abcdef0123456789abcdef');
      if(url.endsWith('/sitemap.xml')) return new Response(xml);
      return new Response(page(url,updated&&url.endsWith('/work')?'Changed':'A useful page'),{status:failPage?503:200});
    };
    const first=await run();assert.equal(first.status,'accepted-pending-validation');assert.equal(posts.length,1);assert.equal(posts[0].urlList.length,8);
    let saved=JSON.parse(await readFile('.indexnow/state.json'));assert.equal(saved.pending.length,8);
    await run();assert.equal(posts.length,1,'five-minute debounce protects pending retries');
    saved.submittedAt='2000-01-01T00:00:00.000Z';await writeFile('.indexnow/state.json',JSON.stringify(saved));
    status=200;await run();assert.equal(posts.length,2);
    saved=JSON.parse(await readFile('.indexnow/state.json'));assert.equal(saved.pending.length,0);
    await run();assert.equal(posts.length,2,'unchanged content is not resubmitted');
    saved.submittedAt='2000-01-01T00:00:00.000Z';await writeFile('.indexnow/state.json',JSON.stringify(saved));
    saved.submittedAt='2020-01-01T00:00:00Z';await writeFile('.indexnow/state.json',JSON.stringify(saved));
    status=200;await run();assert.equal(posts.length,2);saved=JSON.parse(await readFile('.indexnow/state.json'));assert.deepEqual(saved.pending,[]);
    await run();assert.equal(posts.length,2,'unchanged content is not resubmitted');
    saved.submittedAt='2020-01-01T00:00:00Z';await writeFile('.indexnow/state.json',JSON.stringify(saved));
    updated=true;await run();assert.equal(posts.length,3);assert.deepEqual(posts[2].urlList,[origin+'/work']);
    const before=await readFile('.indexnow/state.json','utf8');
    failPage=true;await assert.rejects(run(),/Page not indexable/);assert.equal(await readFile('.indexnow/state.json','utf8'),before);failPage=false;
    failKey=true;await assert.rejects(run(),/key file verification failed/);assert.equal(await readFile('.indexnow/state.json','utf8'),before);
  } finally {process.chdir(cwd);global.fetch=originalFetch;console.log=originalLog;await rm(dir,{recursive:true,force:true});}
});
