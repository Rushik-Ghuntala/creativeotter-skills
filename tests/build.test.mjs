import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import { build } from '../scripts/build-plugins.mjs';
import { validateMcpUrl, files, json, hash, ROOT } from '../scripts/lib.mjs';

test('connection configuration rejects placeholders, upstream services and embedded credentials', () => {
  for (const u of ['http://localhost/mcp', 'https://example.com/mcp', 'https://creativeotter.invalid/mcp', 'https://app.creativeclaw.co/mcp', 'https://user:secret@otter.vercel.app/mcp', 'https://otter.vercel.app/mcp?token=secret', 'https://127.0.0.1/mcp', 'not-a-url']) {
    assert.throws(() => validateMcpUrl(u), undefined, u);
  }
  assert.equal(validateMcpUrl(null), null);
  assert.equal(validateMcpUrl('https://otter-demo.vercel.app/api/mcp'), 'https://otter-demo.vercel.app/api/mcp');
});

test('connected builds bind both clients and all Codex dependencies to the supplied endpoint without changing source', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'creativeotter-build-'));
  const src = await files(path.join(ROOT, 'skills'));
  const before = new Map(await Promise.all(src.map(async f => [f, hash(await readFile(f))])));
  const url = 'https://otter-demo.vercel.app/api/mcp'; // Synthetic configuration test; never contacted.
  try {
    await build({ out: temp, mcpUrl: url, marketplaces: false });
    for (const client of ['codex', 'claude']) {
      const p = path.join(temp, client);
      assert.equal((await json(path.join(p, '.mcp.json'))).mcpServers.creativeotter.url, url);
      assert.equal((await json(path.join(p, 'BUILD.json'))).mode, 'connected-development');
      assert.equal((await files(path.join(p, 'skills'))).filter(f => f.endsWith('/SKILL.md')).length, 21);
    }
    const metadata = (await files(path.join(temp, 'codex/skills'))).filter(f => f.endsWith('/agents/openai.yaml'));
    assert.equal(metadata.length, 21);
    for (const f of metadata) assert.equal(YAML.parse(await readFile(f, 'utf8')).dependencies.tools[0].url, url);
    for (const [f, h] of before) assert.equal(hash(await readFile(f)), h, `Source mutated: ${f}`);
    // A rebuild with no endpoint must remove an earlier connection completely.
    await build({ out: temp, marketplaces: false });
    assert.deepEqual((await json(path.join(temp, 'codex/.mcp.json'))).mcpServers, {});
    for (const f of metadata) assert.equal(YAML.parse(await readFile(f, 'utf8')).dependencies, undefined);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
