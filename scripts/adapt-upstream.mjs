import { readFile, rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT, files, write, hash, json, assert } from './lib.mjs';

const snapshot = path.join(ROOT, 'vendor/creative-claw');
const original = path.join(snapshot, 'upstream/plugins/creative-claw/skills');
const dest = path.join(ROOT, 'skills');
const config = await json(path.join(ROOT, 'config/plugin.json'));
const workflows = await json(path.join(ROOT, 'config/skill-workflows.json'));
const sourceEntries = (await files(original)).filter(file => file.endsWith('/SKILL.md'));
assert(sourceEntries.length === 21 && Object.keys(workflows).length === 21, 'Keep all 21 adapted workflows.');
const resources = {
  'references/runtime-contract.md': 'runtime-contract.md',
  'references/tool-catalog.md': 'tool-catalog.md',
  'references/studio-records.md': 'studio-records.md',
  'references/image-direction.md': 'image-direction.md',
  'references/workflow-basics.md': 'workflow-basics.md',
  'references/platform-client.md': 'platform-client.md',
  'references/platform-upload.md': 'platform-upload.md',
  'references/job-recovery.md': 'job-recovery.md',
  'references/async-jobs.md': 'async-jobs.md',
  'references/workflows/account.md': 'account.md',
  'references/workflows/feedback.md': 'feedback.md',
  'references/voices/cloning.md': 'cloning.md',
  'references/video/review.md': 'review.md',
};
const modifications = [];
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
const record = async (relative, bytes, source = null) => {
  await write(path.join(dest, relative), bytes);
  const originalBytes = source ? await readFile(path.join(snapshot, source)) : null;
  modifications.push({ source, path: `skills/${relative}`, ...(originalBytes ? { source_sha256: hash(originalBytes) } : {}), sha256: hash(bytes), modified: true });
};

for (const sourceEntry of sourceEntries) {
  const oldName = path.basename(path.dirname(sourceEntry));
  const name = oldName.replaceAll('creativeclaw', 'creativeotter').replaceAll('creative-claw', 'creativeotter');
  const workflow = workflows[name];
  assert(workflow, `Missing current workflow: ${name}`);
  const entry = await readFile(path.join(ROOT, 'templates/skills', `${name}.md`));
  const frontmatter = YAML.parse(entry.toString().match(/^---\n([\s\S]*?)\n---/)[1]);
  assert(frontmatter.name === name && frontmatter.description === workflow.description, `Metadata drift: ${name}`);
  await record(`${name}/SKILL.md`, entry, `upstream/plugins/creative-claw/skills/${oldName}/SKILL.md`);
  const sourceYaml = `upstream/plugins/creative-claw/skills/${oldName}/agents/openai.yaml`;
  const metadata = YAML.parse(await readFile(path.join(snapshot, sourceYaml), 'utf8'));
  delete metadata.dependencies;
  metadata.interface = { ...metadata.interface, display_name: `CreativeOtter — ${workflow.title}`, short_description: workflow.short_description, default_prompt: `Use $${name} to help with this request: ${workflow.prompt}` };
  await record(`${name}/agents/openai.yaml`, Buffer.from('# CreativeOtter adaptation, 2026-11-06. Generated from current workflow metadata.\n' + YAML.stringify(metadata, { defaultStringType: 'QUOTE_DOUBLE', defaultKeyType: 'PLAIN' })), sourceYaml);

  // Package only reachable, maintained resources. All historical guides/assets
  // remain byte-identical in vendor/creative-claw/upstream for future adaptation.
  const queue = [['SKILL.md', entry.toString()]];
  const visited = new Set(['SKILL.md']);
  while (queue.length) {
    const [resource, text] = queue.shift();
    for (const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      const link = match[1].split('#')[0];
      if (!link || /^(https?:|mailto:)/.test(link)) continue;
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(resource), link));
      assert(resources[target], `Unmaintained resource in ${name}: ${target}`);
      if (visited.has(target)) continue;
      visited.add(target);
      const content = await readFile(path.join(ROOT, 'templates/shared', resources[target]));
      await record(`${name}/${target}`, content);
      queue.push([target, content.toString()]);
    }
  }
}
modifications.sort((a,b) => a.path.localeCompare(b.path));
await write(path.join(ROOT, 'provenance/adaptation.json'), {
  source_repository: 'https://github.com/CreativeClawCo/creative-claw-marketplace',
  source_commit: '9a611714f425047e44de916eac7d778804a188fa',
  adaptation_version: config.version, adapted_on: '2026-11-06', skill_count: sourceEntries.length,
  note: 'Current entry points and reachable maintained resources only. Historical model guides and assets remain unchanged in vendor/creative-claw/upstream, outside active packages. Modified files retain provenance; source-null files are CreativeOtter additions.',
  files: modifications,
});
const rows = Object.entries(workflows).sort(([a],[b])=>a.localeCompare(b)).map(([name,w])=>`| \`${name}\` | ${w.description.replaceAll('|','\\|')} |`);
await write(path.join(ROOT, 'docs/skills.md'), '# Skill inventory\n\nAll 21 adapted skills match the implemented image and Studio tools. Motion graphics use the opt-in HyperFrames renderer when configured; filmed video and generated audio/editing skills support preparation only. Installing skills does not enable a worker, pricing or generation. Current native and provider image work both require the live credit workflow. The original copied snapshot remains unchanged outside active packages.\n\n| Skill | Purpose |\n| --- | --- |\n' + rows.join('\n') + '\n');
console.log(`Adapted ${sourceEntries.length} workflows and ${modifications.length} maintained files; original snapshot unchanged.`);
