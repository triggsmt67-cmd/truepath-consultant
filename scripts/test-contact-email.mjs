import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync('src/app/api/contact/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

for (const formSource of ['homepage', 'drawer']) {
  test(`${formSource} inquiry routes to Trevor's current address and replies to the visitor`, async () => {
    const calls = [];
    const context = {
      exports: {}, Request, Response, console,
      process: { env: { RESEND_API_KEY: 'test-only' } },
      require: (name) => {
        assert.equal(name, 'node:crypto');
        return { randomUUID };
      },
      fetch: async (url, options) => {
        calls.push({ url, body: JSON.parse(options.body) });
        return Response.json({ id: 'mock-email' });
      },
    };
    vm.runInNewContext(source, context);
    const response = await context.exports.POST(new Request('https://truepath406.com/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: formSource, name: 'Example visitor', email: 'visitor@example.com',
        challenge: 'Please review my website.', to: 'unexpected@example.com' }),
    }));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).inquiryAccepted, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.resend.com/emails');
    assert.deepEqual(calls[0].body.to, ['trevor@truepath406.com']);
    assert.equal(calls[0].body.reply_to, 'visitor@example.com');
    assert.equal(calls[0].body.cc, undefined);
    assert.equal(calls[0].body.bcc, undefined);
    assert.ok(calls[0].body.text.includes(formSource === 'drawer' ? 'Request a Review drawer' : 'Homepage contact form'));
  });
}

for (const scenario of ['honeypot', 'invalid', 'provider-failure']) {
  test(`${scenario} never returns an accepted inquiry marker`, async () => {
    const calls = [];
    const context = {
      exports: {}, Request, Response,
      console: { error() {} },
      process: { env: { RESEND_API_KEY: 'test-only' } },
      require: () => ({ randomUUID }),
      fetch: async (...args) => {
        calls.push(args);
        return Response.json({ error: 'mock failure' }, { status: 500 });
      },
    };
    vm.runInNewContext(source, context);
    const submission = { name: 'Example', email: 'visitor@example.com', challenge: 'Test' };
    if (scenario === 'honeypot') submission.company_url = 'spam';
    if (scenario === 'invalid') submission.email = 'invalid';
    const response = await context.exports.POST(new Request('https://truepath406.com/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission),
    }));
    assert.equal(response.status, scenario === 'honeypot' ? 200 : scenario === 'invalid' ? 400 : 502);
    assert.equal((await response.json()).inquiryAccepted, undefined);
    assert.equal(calls.length, scenario === 'provider-failure' ? 1 : 0);
  });
}
