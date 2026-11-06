import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { normalizeRegisteredAppId, packageChatgptWeb } from '../scripts/package-chatgpt-web.mjs';
import { ROOT, files, hash, json } from '../scripts/lib.mjs';

test('web package requires a registered app reference rather than an uploaded plugin ID or guessed URL', () => {
  assert.equal(normalizeRegisteredAppId('plugin_asdk_app_fixture'), 'asdk_app_fixture');
  assert.equal(normalizeRegisteredAppId('asdk_app_fixture'), 'asdk_app_fixture');
  for (const value of [undefined, '', 'Plugin_103f_fixture', 'plugin_fixture', 'https://creativeotter-app.vercel.app/api/mcp', '../asdk_app_fixture', 'asdk_app_fixture?token=secret']) assert.throws(() => normalizeRegisteredAppId(value));
});

test('web ZIP references only the registered app and omits desktop MCP declarations without changing shared skills', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'otter-web-'));
  const source = await files(path.join(ROOT, 'skills'));
  const before = new Map(await Promise.all(source.map(async file => [file, hash(await readFile(file))])));
  try {
    const appId = 'asdk_app_offline_fixture'; // Configuration fixture; never contacted.
    const first = await packageChatgptWeb({ appId, staging: path.join(temp, 'first'), archives: path.join(temp, 'archives') });
    const manifest = await json(path.join(first.root, '.codex-plugin/plugin.json'));
    assert.equal(manifest.name, 'creativeotter-web');
    assert.equal(manifest.apps, './.app.json');
    assert.equal(manifest.mcpServers, undefined);
    assert.equal(manifest.hooks, undefined);
    assert.deepEqual(await json(path.join(first.root, '.app.json')), { apps: { creativeotter: { id: appId, required: true } } });
    const names = (await files(first.root)).map(file => path.relative(first.root, file));
    assert.equal(names.filter(name => /^skills\/[^/]+\/SKILL\.md$/.test(name)).length, 21);
    assert.ok(names.includes('LICENSE') && names.includes('NOTICE'));
    assert.ok(!names.some(name => ['.mcp.json', 'mcp.json', 'hooks', 'node_modules', '.env', '.git'].includes(name.split('/')[0])));
    for (const name of names.filter(name => name.endsWith('/agents/openai.yaml'))) {
      assert.ok(!/dependencies:/.test(await readFile(path.join(first.root, name), 'utf8')), 'Do not silently add raw server dependencies to the web package');
    }
    const listing = spawnSync('unzip', ['-Z1', first.archive], { encoding: 'utf8' });
    assert.equal(listing.status, 0);
    assert.ok(listing.stdout.split('\n').includes('.app.json'));
    assert.ok(listing.stdout.split('\n').includes('.codex-plugin/plugin.json'));
    assert.equal(spawnSync('unzip', ['-tq', first.archive], { encoding: 'utf8' }).status, 0);
    const second = await packageChatgptWeb({ appId, staging: path.join(temp, 'second'), archives: path.join(temp, 'other') });
    assert.equal(first.sha256, second.sha256);
    for (const [file, sha256] of before) assert.equal(hash(await readFile(file)), sha256);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
