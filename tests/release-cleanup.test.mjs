import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pruneOldArchives } from '../scripts/lib.mjs';

test('release cleanup removes obsolete CreativeOtter archives only, retaining latest clients and unrelated files', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'otter-releases-'));
  try {
    for (const name of ['creativeotter-test-kit-v0.7.0.zip', 'creativeotter-test-kit-v0.7.0.zip.sha256', 'creativeotter-chatgpt-codex-v0.5.3.zip', 'creativeotter-test-kit-v0.8.1.zip', 'creativeotter-chatgpt-web-v0.8.1.zip', 'creativeotter-chatgpt-web-v0.8.1.zip.sha256', 'another-plugin-v0.1.0.zip', 'LICENSE']) await writeFile(path.join(dir, name), 'fixture');
    await mkdir(path.join(dir, 'creativeotter-nested-v0.1.0.zip'));
    assert.equal((await pruneOldArchives(dir, '0.8.1')).length, 3);
    assert.deepEqual((await readdir(dir)).sort(), ['LICENSE', 'another-plugin-v0.1.0.zip', 'creativeotter-chatgpt-web-v0.8.1.zip', 'creativeotter-chatgpt-web-v0.8.1.zip.sha256', 'creativeotter-nested-v0.1.0.zip', 'creativeotter-test-kit-v0.8.1.zip']);
    assert.deepEqual(await pruneOldArchives(dir, '0.8.1'), []);
    await assert.rejects(() => pruneOldArchives(dir, '../invalid'));
  } finally { await rm(dir, { recursive: true, force: true }); }
});
