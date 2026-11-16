import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync('src/lib/analytics.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup(pathname = '/services/website-builds', gtag) {
  const calls = [];
  const context = { exports: {}, window: {
    location: { origin: 'https://truepath406.com', pathname, search: '?email=private@example.com', hash: '#private' },
    gtag: gtag ?? ((...args) => calls.push(args)),
  } };
  vm.runInNewContext(code, context);
  return { ...context.exports, calls, context };
}

test('commercial pages and individual articles are separated from article index and tools', () => {
  const { getContentGroup } = setup();
  for (const path of ['/', '/work', '/services/google-profile', '/services/lead-response', '/services/website-builds', '/services/chatgpt-business-profile']) {
    assert.equal(getContentGroup(path), 'Money pages');
  }
  assert.equal(getContentGroup('/insights/example-post'), 'Blog posts');
  for (const path of ['/insights', '/checkup', '/tools/marketing-checkup']) assert.equal(getContentGroup(path), 'Other');
});

test('only accepted inquiries count and no visitor fields or URL query/hash enter payload', () => {
  for (const form of ['homepage', 'drawer']) {
    const tracker = setup();
    for (const result of [null, {}, { ok: true }, { inquiryAccepted: false }, { error: 'failed' }]) tracker.trackAcceptedInquiry(result, form);
    assert.equal(tracker.calls.length, 0);
    tracker.trackAcceptedInquiry({ inquiryAccepted: true, email: 'private@example.com', challenge: 'private text' }, form);
    assert.equal(tracker.calls.length, 1);
    const [command, event, payload] = tracker.calls[0];
    assert.equal(command, 'event');
    assert.equal(event, 'generate_lead');
    assert.equal(payload.form_id, form);
    assert.equal(payload.send_to, 'G-125W3VQB10');
    assert.equal(payload.content_group, 'Money pages');
    assert.equal(payload.page_location, 'https://truepath406.com/services/website-builds');
    assert.ok(!JSON.stringify(payload).includes('private'));
  }
});

test('content and click events retain their originating page and fixed labels', () => {
  const tracker = setup('/insights/example-post');
  for (const name of ['phone_click', 'email_click', 'blog_post_view']) tracker.trackEvent(name, { link_position: 'footer' });
  assert.equal(tracker.calls.length, 3);
  assert.ok(tracker.calls.every(call => call[2].content_group === 'Blog posts' && call[2].page_path === '/insights/example-post'));
});

test('blocked or missing analytics cannot break a successful inquiry', () => {
  const tracker = setup('/', () => { throw new Error('blocked'); });
  assert.doesNotThrow(() => tracker.trackAcceptedInquiry({ inquiryAccepted: true }, 'homepage'));
  delete tracker.context.window.gtag;
  assert.doesNotThrow(() => tracker.trackAcceptedInquiry({ inquiryAccepted: true }, 'drawer'));
  delete tracker.context.window;
  assert.doesNotThrow(() => tracker.trackEvent('phone_click'));
});
