import { readFile, rm, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT, files, write, hash, json, assert } from './lib.mjs';

const original = path.join(ROOT, 'vendor/creative-claw/upstream/plugins/creative-claw/skills');
const dest = path.join(ROOT, 'skills');
const config = await json(path.join(ROOT, 'config/plugin.json'));
const rename = s => s.replaceAll('creativeclaw', 'creativeotter').replaceAll('creative-claw', 'creativeotter');
const rebrand = s => s
  .replace(/Creative Claw Co\.?/g, 'CreativeOtter')
  .replace(/CreativeClawCo/g, 'CreativeOtter')
  .replace(/Creative[ _-]?Claw/gi, m => m === m.toLowerCase() ? 'creativeotter' : 'CreativeOtter')
  .replace(/CREATIVE_CLAW/g, 'CREATIVEOTTER');

function removeCommercialClaims(text) {
  let priceColumns = [], inTable = false;
  const quote = 'Use a current bound quote; no fixed rate or entitlement is established here.';
  const commercial = /current quoted charge|\b(?:costs?|pricing|rates?|charge[sd]?|credits|free|purchase|membership|entitlements?)\b/i;
  return text.split('\n').map(line => {
    if (line.trim().startsWith('|')) {
      const cells = line.split('|');
      if (!inTable) {
        priceColumns = cells.map((c,i) => /credits|price|cost/i.test(c) ? i : -1).filter(i => i >= 0);
        inTable = true;
        return line;
      }
      if (cells.every(c => /^\s*[:\-]*\s*$/.test(c))) return line;
      return cells.map((cell, i) => priceColumns.includes(i) || (/current quoted charge/.test(cell)) ? ` ${quote} ` : cell).join('|');
    }
    inTable = false; priceColumns = [];
    // Preserve the creative/technical sentences alongside an inherited price claim.
    return line.split(/(?<=[.!?])\s+(?=[A-Z])/).map(sentence => {
      if (/current quoted charge/.test(sentence) || (commercial.test(sentence) && /\d|\bfree\b/i.test(sentence))) return quote;
      return sentence;
    }).filter((s,i,a) => i === 0 || s !== a[i-1]).join(' ');
  }).join('\n');
}

const shared = {
  'references/workflow-basics.md': 'workflow-basics.md',
  'references/platform-client.md': 'platform-client.md',
  'references/platform-upload.md': 'platform-upload.md',
  'references/job-recovery.md': 'job-recovery.md',
  'references/async-jobs.md': 'async-jobs.md',
  'references/workflows/account.md': 'account.md',
  'references/workflows/feedback.md': 'feedback.md',
  'references/video/review.md': 'review.md',
  'references/tool-catalog.md': 'tool-catalog.md',
  'references/voices/cloning.md': 'cloning.md',
};
const modifications = [];
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

for (const src of await files(original)) {
  const oldRel = path.relative(original, src).split(path.sep).join('/');
  const [oldSkill, ...parts] = oldRel.split('/');
  const skill = rename(oldSkill), resource = parts.join('/');
  const rel = `${skill}/${resource}`;
  const target = path.join(dest, rel);
  const bytes = await readFile(src);
  let output = bytes;
  if (resource.endsWith('.md') || resource.endsWith('.yaml') || resource.endsWith('.html')) {
    let text = rebrand(bytes.toString());
    // Remove the old publisher's operational destinations, rather than guessing ours.
    text = text.replace(/\*\*Not connected yet\?\*\*[^\n]*(?:\n|$)/g, '')
      .replace(/^For each CreativeOtter tool call[^\n]*(?:\n|$)/gm, '')
      .replace(/\[([^\]]+)\]\(https?:\/\/[^\s)]*creativeotter\.co[^\s)]*\)/gi, '$1 (use a current URL returned by the configured backend)')
      .replace(/https?:\/\/[^\s<>\]"`)]*creativeotter\.co[^\s<>\]"`)]*/gi, 'CREATIVEOTTER_SERVER_RETURNED_URL')
      .replace(/\[support@creativeotter\.co\]\(mailto:support@creativeotter\.co\)/gi, 'the CreativeOtter support channel returned by the backend')
      .replace(/(?:mailto:)?support@creativeotter\.co/gi, 'the CreativeOtter support channel returned by the backend')
      .replace(/https:\/\/claude\.ai\/customize\/plugins\/id\/[^\s)]+/g, 'CREATIVEOTTER_CONNECTOR_FROM_CLIENT_SETTINGS')
      .replace(/optional cost checks/g, 'bound quotes and direct requested execution')
      .replace(/Use `estimate_generation` with ([^\n]*?) only when [^.\n]+\./g, 'Obtain a bound quote with `estimate_generation` for the exact inputs before paid execution; follow the runtime contract.')
      .replace(/Estimate with `operation: "image"` only for user-requested cost\/budget help\./g, 'Obtain a bound quote for the exact image request before paid execution.')
      .replace(/Use `estimate_generation` with ([^\n]*?) only when [^.\n]+\./g, 'Obtain a bound quote before paid execution and follow the runtime contract.')
      .replace(/It is available before purchase and eligible for the free first video\./g, 'Availability and entitlements come from the current backend.')
      .replace(/Available before purchase and eligible for the free first video\./g, 'Verify availability with the current backend.')
      .replace(/Report concrete (?:CreativeOtter )?product or quality issues through `submit_feedback` and say briefly that you did; do not report when the user asks you not to\./g, 'Submit a product or quality report only when the user explicitly asks to send it; otherwise continue helping without reporting.')
      .replace(/Use `submit_feedback` (for|when)/g, 'Only when the user explicitly asks to report it, use `submit_feedback` $1')
      .replace(/and report the route behavior through `submit_feedback`\./g, 'and report the route behavior only if the user explicitly requests a report.')
      .replace(/Estimate cost only when the user asks about cost or sets a budget\./g, 'Obtain a bound quote for the exact inputs before every paid operation.')
      .replace(/`estimate_generation` does not cover these processing operations\. Discuss cost only when it matters to the request, and do not present a partial estimate as the total\./g, 'Every paid processing operation needs a supported quote/reservation route. If quoting is unavailable, stop paid execution instead of calling an unquoted edit. Do not present a partial estimate as the total.')
      .replace(/^2\. Add the utility prices:[^\n]+/gm, '2. Obtain current quotes for every utility operation in the set, including audio mixing, assembly, captions, trimming and frame extraction. Do not use fixed packaged credit rates.')
      .replace(/With video inputs, reserve billed seconds[^\n]+/g, 'With video inputs, obtain a quote for the exact output settings, measured source lengths and cuts. Do not reuse another service\'s billed-second formula or rates; the current backend quote defines the maximum charge.')
      .replace(/Within HeyGen, Precision is the default mode[^.]+\./g, 'Select a mode supported by the current backend and obtain its bound quote.')
      .replace(/\bpermanent, publicly retrievable CreativeOtter URL\b/g, 'private workspace asset reference accepted by the live schema')
      .replace(/\bpermanent, worker-accessible HTTP\(S\) URLs\b/g, 'worker-accessible media references returned by the backend')
      .replace(/\bpermanent (result|generated audio|CreativeOtter asset)\b/g, 'saved $1')
      .replace(/Nothing is still running and no video was charged\. Check the inputs with `check_job`, then start a corrected swap\./g, 'Inspect the existing job and recorded ledger state. A corrected swap needs a fresh quote within user-requested scope; do not assume it was uncharged or start another automatically.')
      .replace(/No credits were charged\. Rendering the same clip unchanged/g, 'Check the actual ledger before describing charges. Rendering the same clip unchanged')
      .replace(/permanent (audio )?(?:asset|URL)/gi, 'saved asset reference')
      .replace(/permanent URLs/gi, 'current asset links');

    // Commercial rates in inherited guides belong to another service, not this product.
    text = text.split('\n').map(line => {
      if (/\b\d+(?:\.\d+)?(?:[-–]\d+)?\s+credits\b/i.test(line) && !line.trim().startsWith('"')) {
        return line.replace(/(?:\d+(?:\.\d+)?(?:[-–]\d+)?\s+credits(?:\s+per\s+\w+)?)/gi, 'the current quoted charge');
      }
      return line;
    }).join('\n');
    if (resource.endsWith('.md')) text = removeCommercialClaims(text);

    if (resource === 'SKILL.md') {
      const override = path.join(ROOT, 'templates/skills', `${skill}.md`);
      try { text = await readFile(override, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (!text.includes('references/runtime-contract.md')) {
        const end = text.indexOf('\n---', 4) + 4;
        assert(end > 4, `Missing frontmatter: ${rel}`);
        text = text.slice(0, end) + '\n\n> CreativeOtter adaptation, 2026-11-01. Before using this workflow, read [the runtime contract](references/runtime-contract.md). Prefer suitable native engines, but require a CreativeOtter credit quote and paid execution claim directly on explicit user request before native tools. Missing billing stops generation. Provider-specific steps below apply only to enabled CreativeOtter API fallback, with current schemas and bound quotes, starting requested images without extra browser approval. Native execution follows its own host schema; inherited examples do not establish availability or pricing.\n' + text.slice(end);
      }
      if (skill === 'creativeotter-generate-music') {
        text = text.replace(/^description:.*$/m, 'description: Compose songs, scores, instrumentals or remixes through enabled CreativeOtter music models. Use for music, not narration or isolated sound effects.');
      }
    } else if (shared[resource]) {
      text = await readFile(path.join(ROOT, 'templates/shared', shared[resource]), 'utf8');
    } else if (resource === 'agents/openai.yaml') {
      const data = YAML.parse(text);
      delete data.dependencies; // An actual endpoint is injected only in an explicitly connected build.
      data.interface.display_name = data.interface.display_name.replace(/CreativeOtter/g, config.displayName);
      data.interface.default_prompt = data.interface.default_prompt.replace(/\$creativeotter(?:-[a-z-]+)?/g, `$${skill}`);
      text = '# CreativeOtter adaptation, 2026-11-01. MCP dependency is added by a connected package build.\n' + YAML.stringify(data, { defaultStringType: 'QUOTE_DOUBLE', defaultKeyType: 'PLAIN' });
    } else if (resource.endsWith('.md')) {
      const link = path.posix.relative(path.posix.dirname(resource), 'references/runtime-contract.md');
      text = `> CreativeOtter adaptation, 2026-11-01. [Runtime contract](${link}) governs execution. This inherited creative/technical guide is not a current model catalog, price list, API schema or product-policy promise.\n\n` + text;
    } else if (resource.endsWith('.html')) {
      text = '<!-- CreativeOtter adaptation, 2026-11-01: identity and reference copy. -->\n' + text;
    }
    output = Buffer.from(text.trimEnd() + '\n');
  }
  await write(target, output);
  modifications.push({ source: `upstream/plugins/creative-claw/skills/${oldRel}`, path: `skills/${rel}`, source_sha256: hash(bytes), sha256: hash(output), modified: !bytes.equals(output) });
}

const skillNames = [...new Set(modifications.map(f => f.path.split('/')[1]))].sort();
for (const name of skillNames) {
  const p = `skills/${name}/references/runtime-contract.md`;
  const data = await readFile(path.join(ROOT, 'templates/shared/runtime-contract.md'));
  await write(path.join(ROOT, p), data);
  modifications.push({ source: null, path: p, sha256: hash(data), modified: true });
  // Focused upstream skills do not all carry the same common references.
  // Add only the common files our rewritten entry points now link to.
  for (const basename of ['workflow-basics.md', 'platform-client.md', 'platform-upload.md', 'job-recovery.md', 'async-jobs.md']) {
    const extra = `skills/${name}/references/${basename}`;
    if (modifications.some(f => f.path === extra)) continue;
    const content = await readFile(path.join(ROOT, 'templates/shared', basename));
    await write(path.join(ROOT, extra), content);
    modifications.push({ source: null, path: extra, sha256: hash(content), modified: true });
  }
  if (name === 'creativeotter-submit-feedback') {
    const extra = `skills/${name}/references/workflows/feedback.md`;
    if (!modifications.some(f => f.path === extra)) {
      const content = await readFile(path.join(ROOT, 'templates/shared/feedback.md'));
      await write(path.join(ROOT, extra), content);
      modifications.push({ source: null, path: extra, sha256: hash(content), modified: true });
    }
  }
}
await write(path.join(ROOT, 'provenance/adaptation.json'), {
  source_repository: 'https://github.com/CreativeClawCo/creative-claw-marketplace',
  source_commit: '9a611714f425047e44de916eac7d778804a188fa',
  adaptation_version: config.version, adapted_on: '2026-11-01', skill_count: skillNames.length,
  note: 'Modified files carry adaptation notices. Original snapshot and license remain unchanged. Source-null files are original CreativeOtter additions.',
  files: modifications,
});
const inventory = [];
for (const name of skillNames) {
  const entry = await readFile(path.join(dest, name, 'SKILL.md'), 'utf8');
  const frontmatter = YAML.parse(entry.match(/^---\n([\s\S]*?)\n---/)[1]);
  inventory.push(`| \`${name}\` | ${frontmatter.description.replaceAll('|', '\\|')} |`);
}
await write(path.join(ROOT, 'docs/skills.md'), '# Skill inventory\n\nAll 21 workflows are included in both client packages. They prefer suitable native engines; both native and API execution require backend credit reservation and paid execution. Skills alone do not supply missing generators.\n\n| Skill | Purpose |\n| --- | --- |\n' + inventory.join('\n') + '\n');
console.log(`Adapted ${skillNames.length} skills and ${modifications.length} files; upstream snapshot was not changed.`);
