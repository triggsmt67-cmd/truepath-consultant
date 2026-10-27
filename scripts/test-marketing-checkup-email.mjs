import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

const compile = (path) => ts.transpileModule(readFileSync(path, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const sharedContext = { exports: {} };
vm.runInNewContext(compile('src/lib/marketing-checkup.ts'), sharedContext);
const shared = sharedContext.exports;
const emailContext = { exports: {}, require: () => shared };
vm.runInNewContext(compile('src/lib/marketing-checkup-email.ts'), emailContext);
const emailTemplate = emailContext.exports;
const source = compile('src/app/api/marketing-checkup/email/route.ts');
function setup({ provider = async () => Response.json({ id: 'test-message' }), configured = true, senderConfigured = true } = {}) {
  const calls = [];
  const context = {
    exports: {}, Request, Response, TextDecoder, AbortSignal, Date, URL,
    process: { env: configured ? { RESEND_API_KEY: 'test-only', ...(senderConfigured ? { CONTACT_EMAIL_FROM: 'Test <test@example.com>' } : {}) } : {} },
    require: (name) => name === 'node:crypto' ? { createHash } : name === '@/lib/marketing-checkup-email' ? emailTemplate : shared,
    fetch: async (url, options) => { calls.push({ url, options, body: JSON.parse(options.body) }); return provider(); },
  };
  vm.runInNewContext(source, context);
  return { post: context.exports.POST, calls };
}
const valid = {
  email: 'owner@example.com', answers: ['No', 'Not sure', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
  requestId: 'fd629c35-d7d7-4c67-a732-766788d808e4', company_url: '',
};
function request(body = valid, headers = {}) {
  return new Request('http://localhost:3000/api/marketing-checkup/email', {
    method: 'POST', headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('sends only to requested recipient and generates ordered results on the server', async () => {
  const { post, calls } = setup();
  assert.equal((await post(request())).status, 200);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body.to, ['owner@example.com']);
  assert.equal(calls[0].body.cc, undefined);
  assert.equal(calls[0].body.bcc, undefined);
  assert.equal(calls[0].body.subject, 'Your Marketing Checkup results');
  assert.equal((calls[0].body.text.match(/Your answer:/g) || []).length, 7);
  assert.ok(calls[0].body.html.indexOf('01 / The right kind') < calls[0].body.html.indexOf('02 / What counts'));
  assert.ok(calls[0].body.html.includes('Your answer: No</strong>'));
  assert.ok(calls[0].body.html.includes('Your answer: Not sure</strong>'));
  assert.ok(calls[0].body.text.includes(shared.questions[1].followup));
  assert.ok(calls[0].body.html.includes('Keep checking'));
  assert.ok(calls[0].body.html.includes('does not sign you up for marketing emails'));
  assert.ok(calls[0].options.signal);
});

test('all Yes has no gap questions or profitability claim', async () => {
  const { post, calls } = setup();
  await post(request({ ...valid, answers: Array(7).fill('Yes') }));
  assert.ok(calls[0].body.html.includes('You have visibility into these seven areas'));
  assert.ok(calls[0].body.html.includes('does not tell us whether your marketing is profitable or effective'));
  assert.ok(calls[0].body.text.includes('Keep checking'));
  assert.equal((calls[0].body.text.match(/Next step:/g) || []).length, 7);
});

test('rejects invalid input before contacting provider', async () => {
  const { post, calls } = setup();
  for (const body of [null, [], '{', { ...valid, email: 'bad' },
    { ...valid, email: 'one@example.com,two@example.com' }, { ...valid, email: 'one@example.com\r\nBcc: two@example.com' },
    { ...valid, answers: Array(6).fill('Yes') }, { ...valid, answers: [...Array(6).fill('Yes'), null] },
    { ...valid, answers: [...Array(6).fill('Yes'), '<script>bad</script>'] }, { ...valid, requestId: '' }]) {
    assert.equal((await post(request(body))).status, 400);
  }
  assert.equal((await post(request('x'.repeat(4097)))).status, 413);
  assert.equal((await post(request(valid, { origin: 'https://other.example' }))).status, 403);
  assert.equal((await post(request(valid, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal(calls.length, 0);
});

test('honeypot does not send and missing settings fail honestly', async () => {
  const { post, calls } = setup();
  assert.equal((await post(request({ ...valid, company_url: 'spam' }))).status, 200);
  assert.equal(calls.length, 0);
  const unconfigured = setup({ configured: false });
  assert.equal((await unconfigured.post(request())).status, 503);
  assert.equal(unconfigured.calls.length, 0);
});

test('provider rejection, malformed success, and network failure do not report success', async () => {
  for (const provider of [async () => Response.json({ error: 'rejected' }, { status: 422 }),
    async () => Response.json({}), async () => { throw new Error('network'); }]) {
    const { post } = setup({ provider });
    const response = await post(request());
    assert.equal(response.status, 502);
    const result = await response.json();
    assert.ok(result.error);
    assert.notEqual(result.ok, true);
  }
});

test('retries reuse provider idempotency key; rate limit stops repeated sends', async () => {
  const { post, calls } = setup();
  for (let i = 0; i < 3; i++) assert.equal((await post(request())).status, 200);
  assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
  assert.equal((await post(request())).status, 429);
  assert.equal(calls.length, 3);
});


test('every question and answer has actionable direction in HTML and plain text', () => {
  for (let index = 0; index < 7; index++) {
    for (const answer of shared.choices) {
      const answers = Array(7).fill('Yes');
      answers[index] = answer;
      const report = shared.getCheckupReport(answers);
      const { text, html } = emailTemplate.renderCheckupEmail(answers);
      const item = report.items[index];
      assert.ok(item.next.length > 50);
      assert.ok(item.evidence.length > 40);
      assert.ok(item.ask.endsWith('?'));
      assert.ok(text.includes(item.next));
      assert.ok(text.includes(item.evidence));
      assert.ok(text.includes(item.ask));
      assert.equal((text.match(/Your answer:/g) || []).length, 7);
      assert.equal((html.match(/Your next step<\/strong>/g) || []).length, 7);
      assert.equal((text.match(/Ask your agency:/g) || []).length, 7);
      assert.ok(Buffer.byteLength(html) < 80_000);
      assert.ok(!/<script|<form|<input/i.test(html));
    }
  }
});

test('starting point uses the first No, then first uncertainty; never calls uncertainty a gap', () => {
  assert.equal(shared.getCheckupReport(['Yes','Not sure','Yes','No','Yes','No','Yes']).start.number, 4);
  const uncertain = shared.getCheckupReport(['Yes','Not sure','Yes','Yes','Yes','Yes','Yes']);
  assert.equal(uncertain.start.number, 2);
  assert.ok(uncertain.startReason.includes('before deciding whether it needs a change'));
  assert.throws(() => shared.getCheckupReport(Array(6).fill('Yes')));
  assert.throws(() => shared.getCheckupReport([...Array(6).fill('Yes'), undefined]));
});

test('email preview serves only canned local samples and is disabled in production', () => {
  const previewSource = compile('src/app/tools/marketing-checkup/email-preview/route.ts');
  for (const environment of ['development', 'production']) {
    const context = {
      exports: {}, URL, Response,
      process: { env: { NODE_ENV: environment } },
      require: () => emailTemplate,
    };
    vm.runInNewContext(previewSource, context);
    const response = context.exports.GET(new Request('http://localhost:3000/tools/marketing-checkup/email-preview?sample=yes'));
    assert.equal(response.status, environment === 'development' ? 200 : 404);
    if (environment === 'development') assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  }
});


test('uses the existing contact sender default when no override is configured', async () => {
  const { post, calls } = setup({ senderConfigured: false });
  assert.equal((await post(request())).status, 200);
  assert.equal(calls[0].body.from, 'True Path Consultants <website@truepath406.com>');
});
