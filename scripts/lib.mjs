import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const json = async p => JSON.parse(await readFile(p, 'utf8'));
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export async function files(dir) {
  const out = [];
  for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name, 'en'))) {
    const p = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlink is not permitted in package inputs: ${p}`);
    if (entry.isDirectory()) out.push(...await files(p));
    else if (entry.isFile()) out.push(p);
  }
  return out;
}
export async function write(p, content) {
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, typeof content === 'string' || Buffer.isBuffer(content) ? content : JSON.stringify(content, null, 2) + '\n');
}
export function assert(condition, message) { if (!condition) throw new Error(message); }
export function validateMcpUrl(value) {
  if (!value) return null;
  let u;
  try { u = new URL(value); } catch { throw new Error('MCP URL must be an absolute HTTPS URL.'); }
  assert(u.protocol === 'https:' && !u.username && !u.password && !u.hash && !u.search,
    'MCP URL must use HTTPS and contain no credentials, query or fragment.');
  assert(!/(creative[-_.]?claw|3b9e3067|6a2528e2)/i.test(u.href), 'The original service cannot be used as the CreativeOtter endpoint.');
  assert(!/(^|\.)(invalid|example|test|localhost)$/.test(u.hostname) && !/^\d+\.\d+\.\d+\.\d+$/.test(u.hostname) && !u.hostname.includes(':'),
    'Use a deployed HTTPS hostname, not a placeholder, localhost or IP address.');
  assert(!/(^|\.)example\.(com|org|net)$/.test(u.hostname), 'Use the real deployed endpoint, not an example domain.');
  return u.href;
}
