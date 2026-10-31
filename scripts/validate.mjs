import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT, files, json, hash, assert } from './lib.mjs';

const snapshot = path.join(ROOT, 'vendor/creative-claw');
const provenance = await json(path.join(snapshot, 'PROVENANCE.json'));
const originals = await files(path.join(snapshot, 'upstream'));
assert(originals.length === Object.keys(provenance.sha256).length, 'Upstream file inventory changed.');
for (const [rel, expected] of Object.entries(provenance.sha256)) {
  assert(hash(await readFile(path.join(snapshot, rel))) === expected, `Upstream snapshot changed: ${rel}`);
}
assert((await readFile(path.join(ROOT, 'LICENSE'))).equals(await readFile(path.join(snapshot, provenance.license_path))), 'Root license differs from upstream license.');

const root = path.join(ROOT, 'skills');
const sourceFiles = await files(root);
const entries = sourceFiles.filter(f => f.endsWith('/SKILL.md'));
assert(entries.length === 21, 'Expected all 21 adapted skills.');
const names = new Set();
for (const f of entries) {
  const text = await readFile(f, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(match, `Missing frontmatter: ${f}`);
  const data = YAML.parse(match[1]);
  assert(/^[a-z0-9-]{1,63}$/.test(data.name), `Invalid skill name: ${f}`);
  assert(data.name === path.basename(path.dirname(f)), `Folder/name mismatch: ${f}`);
  assert(!names.has(data.name), `Duplicate skill: ${data.name}`); names.add(data.name);
  assert(typeof data.description === 'string' && data.description.trim().length > 20, `Missing description: ${f}`);
  assert(text.includes('references/runtime-contract.md'), `Runtime contract not routed: ${f}`);
}
const index = await json(path.join(ROOT, 'provenance/adaptation.json'));
assert(index.files.length === sourceFiles.length, 'Adaptation file inventory changed. Regenerate provenance.');
for (const entry of index.files) {
  assert(hash(await readFile(path.join(ROOT, entry.path))) === entry.sha256, `Adapted file changed without regeneration: ${entry.path}`);
  if (entry.source) assert(hash(await readFile(path.join(snapshot, entry.source))) === entry.source_sha256, `Source mismatch: ${entry.source}`);
}
for (const f of sourceFiles) {
  if (!/\.(md|yaml|html|json)$/.test(f)) continue;
  const text = await readFile(f, 'utf8');
  assert(!/creative[\s_-]?claw|3b9e3067|6a2528e2|plugin_asdk_app/i.test(text), `Old service identity in adapted content: ${f}`);
  if (f.endsWith('.yaml')) {
    const data = YAML.parse(text);
    const skill = path.basename(path.dirname(path.dirname(f)));
    assert(data.interface?.default_prompt?.includes(`$${skill}`), `Incorrect invocation metadata: ${f}`);
    assert(data.policy?.allow_implicit_invocation !== false, `Unexpected explicit-only policy: ${f}`);
    assert(!data.dependencies, `Shared skill source must not bind an undeployed endpoint: ${f}`);
  }
  if (f.endsWith('.json')) JSON.parse(text);
  if (!f.endsWith('.md')) continue;
  for (const m of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const local = decodeURIComponent(target.split('#')[0]);
    if (!local) continue;
    const resolved = path.resolve(path.dirname(f), local);
    assert(resolved.startsWith(root + path.sep), `Reference escapes skill source: ${f}: ${target}`);
    await access(resolved).catch(() => { throw new Error(`Broken reference in ${f}: ${target}`); });
  }
}

const cfg = await json(path.join(ROOT, 'config/plugin.json'));
for (const client of ['codex', 'claude']) {
  const p = path.join(ROOT, 'plugins', client);
  const manifest = await json(path.join(p, client === 'codex' ? '.codex-plugin/plugin.json' : '.claude-plugin/plugin.json'));
  assert(manifest.name === cfg.name && manifest.version === cfg.version, `Stale ${client} manifest.`);
  const build = await json(path.join(p, 'BUILD.json'));
  assert(build.mode === 'instructions-only' && build.mcp_url === null, 'Checked-in packages must not use an undeployed endpoint.');
  const mcp = await json(path.join(p, '.mcp.json'));
  assert(Object.keys(mcp.mcpServers).length === 0, 'Default package unexpectedly connects to a service.');
  const copies = await files(path.join(p, 'skills'));
  assert(copies.length === sourceFiles.length, `${client} missing skill resources.`);
  for (const f of sourceFiles) {
    const rel = path.relative(root, f);
    assert((await readFile(f)).equals(await readFile(path.join(p, 'skills', rel))), `Stale generated ${client} resource: ${rel}`);
  }
  for (const f of ['LICENSE', 'NOTICE']) assert((await readFile(path.join(ROOT, f))).equals(await readFile(path.join(p, f))), `${client} missing legal attribution.`);
}
const codex = await json(path.join(ROOT, '.agents/plugins/marketplace.json'));
const claude = await json(path.join(ROOT, '.claude-plugin/marketplace.json'));
assert(codex.plugins[0].source.path === './plugins/codex', 'Wrong Codex marketplace path.');
assert(claude.plugins[0].source === './plugins/claude', 'Wrong Claude marketplace path.');
console.log(`Validated ${originals.length} immutable upstream files, 21 skills, ${sourceFiles.length} adapted files, local references, legal attribution and both generated packages.`);
