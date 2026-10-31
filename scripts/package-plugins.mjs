import { mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT, assert } from './lib.mjs';

const connected = process.argv.includes('--connected');
assert(process.argv.slice(2).every(a => a === '--connected'), 'Only --connected is supported.');
const source = connected ? path.join(ROOT, 'dist/connected') : path.join(ROOT, 'plugins');
const out = path.join(ROOT, 'dist/archives');
await mkdir(out, { recursive: true });
for (const client of ['codex', 'claude']) {
  const target = path.join(out, `creativeotter-${client}${connected ? '-connected' : ''}.zip`);
  // Recreate the archive so removed files cannot survive from a prior build.
  const { rm } = await import('node:fs/promises');
  await rm(target, { force: true });
  const result = spawnSync('zip', ['-q', '-r', target, '.'], { cwd: path.join(source, client), encoding: 'utf8' });
  assert(result.status === 0, result.stderr || result.error?.message || 'ZIP creation failed. Install zip first.');
  console.log(target);
}
