import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { packageTestKit } from '../scripts/package-test-kit.mjs';
import { ROOT, files, hash, json } from '../scripts/lib.mjs';

test('the extracted multi-client ZIP is complete, credential-free and reproducible without mutating default packages', async () => {
  const temp = await mkdtemp(path.join(tmpdir(), 'creativeotter-kit-'));
  const sourceFiles = await files(path.join(ROOT, 'plugins'));
  const original = new Map(await Promise.all(sourceFiles.map(async file => [file, hash(await readFile(file))])));
  const url = 'https://otter-demo.vercel.app/api/mcp'; // Offline synthetic endpoint; never contacted.
  try {
    const first = await packageTestKit({ staging: path.join(temp, 'first'), archives: path.join(temp, 'archives'), mcpUrl: url });
    const list = spawnSync('unzip', ['-Z1', first.archive], { encoding: 'utf8' });
    assert.equal(list.status, 0, list.stderr);
    const entries = list.stdout.trim().split('\n');
    assert.equal(entries.length, first.file_count);
    for (const name of entries) {
      assert.ok(name.startsWith('creativeotter-test-kit/'));
      assert.ok(!name.split('/').some(part => ['..', '.env', '.git', 'node_modules', 'work', 'project-context', 'hooks'].includes(part)), name);
      assert.ok(!name.split('/').some(part => part.startsWith('.env.')), name);
    }
    const extracted = path.join(temp, 'extracted');
    await mkdir(extracted);
    const unzip = spawnSync('unzip', ['-q', first.archive, '-d', extracted], { encoding: 'utf8' });
    assert.equal(unzip.status, 0, unzip.stderr);
    const kit = path.join(extracted, 'creativeotter-test-kit');
    const checksums = (await readFile(path.join(kit, 'SHA256SUMS'), 'utf8')).trim().split('\n');
    assert.equal(checksums.length, first.file_count - 1);
    for (const line of checksums) {
      const [expected, relative] = line.split('  ');
      assert.equal(hash(await readFile(path.join(kit, relative))), expected, relative);
    }
    assert.equal((await readFile(first.archive + '.sha256', 'utf8')).split(' ')[0], hash(await readFile(first.archive)));
    const config = await json(path.join(ROOT, 'config/plugin.json'));
    for (const [client, manifest] of [['codex', '.codex-plugin/plugin.json'], ['claude', '.claude-plugin/plugin.json']]) {
      const base = path.join(kit, 'plugins', client);
      assert.equal((await json(path.join(base, manifest))).version, config.version);
      assert.equal((await json(path.join(base, '.mcp.json'))).mcpServers.creativeotter.url, url);
      assert.equal((await files(path.join(base, 'skills'))).filter(file => file.endsWith('/SKILL.md')).length, 21);
      assert.ok((await readFile(path.join(base, 'LICENSE'))).equals(await readFile(path.join(ROOT, 'LICENSE'))));
      assert.ok((await readFile(path.join(base, 'NOTICE'))).equals(await readFile(path.join(ROOT, 'NOTICE'))));
    }
    const marketplace = await json(path.join(kit, '.agents/plugins/marketplace.json'));
    assert.equal(marketplace.plugins[0].source.path, './plugins/codex');
    assert.equal((await json(path.join(kit, '.claude-plugin/marketplace.json'))).plugins[0].source, './plugins/claude');
    const cursor = await json(path.join(kit, 'adapters/cursor/mcp.json'));
    assert.deepEqual(cursor, { mcpServers: { creativeotter: { url } } });
    const vscode = await json(path.join(kit, 'adapters/vscode/mcp.json'));
    assert.deepEqual(vscode, { servers: { creativeotter: { type: 'http', url } } });
    assert.equal((await json(path.join(kit, 'adapters/portable/mcp.json'))).mcpServers.creativeotter.url, url);
    assert.equal((await json(path.join(kit, 'adapters/claude-code/.mcp.json'))).mcpServers.creativeotter.url, url);
    assert.match(await readFile(path.join(kit, 'adapters/codex/config.toml'), 'utf8'), /\[mcp_servers.creativeotter\]/);
    const metadata = await json(path.join(kit, 'TEST-KIT.json'));
    assert.equal(metadata.mcp_url, url);
    assert.equal(metadata.all_ai_compatibility_guaranteed, false);
    assert.equal(metadata.credentials_included, false);
    for (const file of ['README.md', 'docs/TEST-PROMPTS.md', 'docs/COMPATIBILITY.md']) {
      assert.doesNotMatch(await readFile(path.join(kit, file), 'utf8'), /\{\{[A-Z_]+\}\}/);
    }
    const second = await packageTestKit({ staging: path.join(temp, 'second'), archives: path.join(temp, 'other-archives'), mcpUrl: url });
    assert.equal(first.sha256, second.sha256, 'Rebuilding identical inputs must produce the same ZIP bytes');
    for (const [file, expected] of original) assert.equal(hash(await readFile(file)), expected, `Default package changed: ${file}`);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
