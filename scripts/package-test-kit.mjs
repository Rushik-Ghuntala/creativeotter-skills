import { chmod, copyFile, cp, mkdir, readFile, rm, utimes } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from './build-plugins.mjs';
import { ROOT, pruneOldArchives, assert, files, hash, json, validateMcpUrl, write } from './lib.mjs';

const folderName = 'creativeotter-test-kit';
const epoch = new Date('2000-01-01T00:00:00Z');

export const packageTestKit = async ({ staging, archives, mcpUrl, marketplaceName = 'creativeotter-test-kit' }) => {
  const url = validateMcpUrl(mcpUrl);
  assert(url, 'A deployed CreativeOtter MCP URL is required for a connected test kit.');
  assert(/^[a-z0-9-]+$/.test(marketplaceName), 'Invalid test marketplace name.');
  const config = await json(path.join(ROOT, 'config/plugin.json'));
  const kit = path.join(staging, folderName);
  await rm(kit, { recursive: true, force: true });
  await mkdir(kit, { recursive: true });
  await build({ out: path.join(kit, 'plugins'), mcpUrl: url, marketplaces: false });
  await write(path.join(kit, '.agents/plugins/marketplace.json'), {
    name: marketplaceName,
    plugins: [{ name: config.name, source: { source: 'local', path: './plugins/codex' }, policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' }, category: 'Creativity' }],
  });
  await write(path.join(kit, '.claude-plugin/marketplace.json'), {
    name: marketplaceName, description: 'Connected CreativeOtter packages for local cross-client testing.', owner: config.author,
    plugins: [{ name: config.name, source: './plugins/claude', description: 'CreativeOtter connected test package.' }],
  });
  const server = { type: 'http', url };
  await write(path.join(kit, 'adapters/claude-code/.mcp.json'), { mcpServers: { [config.serverName]: server } });
  await write(path.join(kit, 'adapters/cursor/mcp.json'), { mcpServers: { [config.serverName]: { url } } });
  await write(path.join(kit, 'adapters/vscode/mcp.json'), { servers: { [config.serverName]: server } });
  await write(path.join(kit, 'adapters/portable/mcp.json'), { mcpServers: { [config.serverName]: server } });
  await write(path.join(kit, 'adapters/codex/config.toml'), `[mcp_servers.${config.serverName}]\nurl = ${JSON.stringify(url)}\n`);
  await cp(path.join(ROOT, 'templates/test-kit'), kit, { recursive: true });
  // Only public, allowlisted package inputs enter the archive; no workspace/config copy.
  for (const name of ['LICENSE', 'NOTICE']) await copyFile(path.join(ROOT, name), path.join(kit, name));
  await mkdir(path.join(kit, 'provenance'), { recursive: true });
  await copyFile(path.join(ROOT, 'provenance/adaptation.json'), path.join(kit, 'provenance/adaptation.json'));
  await copyFile(path.join(ROOT, 'vendor/creative-claw/PROVENANCE.json'), path.join(kit, 'provenance/upstream.json'));
  for (const name of ['README.md', 'docs/TEST-PROMPTS.md', 'docs/COMPATIBILITY.md']) {
    const file = path.join(kit, name);
    await write(file, (await readFile(file, 'utf8')).replaceAll('{{MCP_URL}}', url).replaceAll('{{VERSION}}', config.version).replaceAll('{{MARKETPLACE}}', marketplaceName));
  }
  // Each inner ZIP is directly installable: manifests are at the archive root.
  const installArchives = {};
  for (const [client, label] of [['codex', 'codex-desktop'], ['claude', 'claude']]) {
    const root = path.join(kit, 'plugins', client);
    const inputs = (await files(root)).sort();
    for (const file of inputs) { await chmod(file, 0o644); await utimes(file, epoch, epoch); }
    const relative = `install/creativeotter-${label}-v${config.version}.zip`;
    const target = path.join(kit, relative);
    await mkdir(path.dirname(target), { recursive: true });
    const zipped = spawnSync('zip', ['-X', '-q', target, '-@'], {
      cwd: root, input: inputs.map(file => path.relative(root, file).split(path.sep).join('/')).join('\n') + '\n',
      encoding: 'utf8', env: { ...process.env, TZ: 'UTC' },
    });
    assert(zipped.status === 0, zipped.stderr || zipped.error?.message || 'Plugin ZIP creation failed.');
    installArchives[client] = relative;
  }
  await write(path.join(kit, 'TEST-KIT.json'), {
    product: config.displayName, version: config.version, mode: 'connected-test-kit',
    mcp_url: url, transport: 'streamable-http', authentication: 'OAuth via each host',
    install_archives: installArchives,
    skill_count_per_plugin: 21, plugin_clients: ['codex', 'claude-code'],
    configuration_adapters: ['codex', 'claude-code', 'cursor', 'vscode', 'portable'],
    all_ai_compatibility_guaranteed: false, marketplace_approved: false,
    credentials_included: false, generation_on_install: false,
  });
  const entries = (await files(kit)).sort();
  const sums = await Promise.all(entries.map(async file => `${hash(await readFile(file))}  ${path.relative(kit, file).split(path.sep).join('/')}`));
  await write(path.join(kit, 'SHA256SUMS'), sums.join('\n') + '\n');
  const packaged = (await files(kit)).sort();
  for (const file of packaged) {
    await chmod(file, 0o644);
    await utimes(file, epoch, epoch);
  }
  await mkdir(archives, { recursive: true });
  const archive = path.join(archives, `creativeotter-test-kit-v${config.version}.zip`);
  await rm(archive, { force: true });
  // Explicit, sorted files include dotfiles and give stable archives across rebuilds.
  const names = packaged.map(file => path.relative(staging, file).split(path.sep).join('/'));
  const result = spawnSync('zip', ['-X', '-q', archive, '-@'], {
    cwd: staging, input: names.join('\n') + '\n', encoding: 'utf8', env: { ...process.env, TZ: 'UTC' },
  });
  assert(result.status === 0, result.stderr || result.error?.message || 'Install zip to create the test kit.');
  const sha256 = hash(await readFile(archive));
  await write(archive + '.sha256', `${sha256}  ${path.basename(archive)}\n`);
  await pruneOldArchives(archives, config.version);
  return { kit, archive, sha256, file_count: packaged.length };
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  assert(process.argv.length === 2, 'Usage: npm run package:test-kit (endpoint configured in config/test-kit.json)');
  const profile = await json(path.join(ROOT, 'config/test-kit.json'));
  const result = await packageTestKit({ staging: path.join(ROOT, 'dist/test-kit'), archives: path.join(ROOT, 'releases'), ...profile });
  console.log(JSON.stringify(result, null, 2));
}
