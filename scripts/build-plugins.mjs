import { readFile, rm, cp, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { ROOT, json, files, write, validateMcpUrl, assert } from './lib.mjs';

export async function build({ out = path.join(ROOT, 'plugins'), mcpUrl = null, marketplaces = true } = {}) {
  const config = await json(path.join(ROOT, 'config/plugin.json'));
  const url = validateMcpUrl(mcpUrl);
  const paths = [];
  for (const client of ['codex', 'claude']) {
    const dest = path.join(out, client);
    await rm(dest, { recursive: true, force: true });
    await mkdir(dest, { recursive: true });
    await cp(path.join(ROOT, 'skills'), path.join(dest, 'skills'), { recursive: true });
    await mkdir(path.join(dest, 'assets'), { recursive: true });
    await copyFile(path.join(ROOT, 'templates/icon.png'), path.join(dest, 'assets/icon.png'));
    for (const f of ['LICENSE', 'NOTICE']) await copyFile(path.join(ROOT, f), path.join(dest, f));
    const base = {
      name: config.name, version: config.version,
      description: 'CreativeOtter media workflows. Generation requires a configured CreativeOtter backend; availability depends on its enabled tools.',
      author: config.author, repository: config.repository, license: 'Apache-2.0',
      keywords: ['creativeotter', 'media', 'image-generation', 'video', 'voice', 'skills', 'mcp'],
    };
    const mcp = { mcpServers: url ? { [config.serverName]: { type: 'http', url } } : {} };
    await write(path.join(dest, '.mcp.json'), mcp);
    if (client === 'codex') {
      await write(path.join(dest, '.codex-plugin/plugin.json'), {
        ...base, skills: './skills/', mcpServers: './.mcp.json',
        interface: {
          displayName: config.displayName, shortDescription: 'Create media with CreativeOtter',
          longDescription: 'Shared image, video, voice, music and production workflows. This development package includes 21 skills; execution requires enabled tools on our own backend.',
          developerName: config.author.name, category: 'Creativity', capabilities: ['Read', 'Write'],
          composerIcon: './assets/icon.png', logo: './assets/icon.png',
          defaultPrompt: ['Create one image from this brief.', 'Help me plan a short product video.'],
        },
      });
      if (url) {
        for (const f of (await files(path.join(dest, 'skills'))).filter(f => f.endsWith('/agents/openai.yaml'))) {
          const data = YAML.parse(await readFile(f, 'utf8'));
          data.dependencies = { tools: [{ type: 'mcp', value: config.serverName, description: 'CreativeOtter media and workspace tools', transport: 'streamable_http', url }] };
          await write(f, '# CreativeOtter generated connected package.\n' + YAML.stringify(data, { defaultStringType: 'QUOTE_DOUBLE', defaultKeyType: 'PLAIN' }));
        }
      }
    } else {
      // Default skills/ and .mcp.json are discovered at the plugin root by Claude Code.
      await write(path.join(dest, '.claude-plugin/plugin.json'), { ...base });
    }
    await write(path.join(dest, 'BUILD.json'), {
      version: config.version, client, skill_count: 21,
      mode: url ? 'connected-development' : 'instructions-only', mcp_url: url,
      backend_tested: false, marketplace_approved: false,
    });
    paths.push(dest);
  }
  if (marketplaces) {
    assert(path.resolve(out) === path.join(ROOT, 'plugins'), 'Repo marketplaces must point to the default plugins directory.');
    await write(path.join(ROOT, '.agents/plugins/marketplace.json'), {
      name: 'creativeotter-skills', plugins: [{ name: config.name, source: { source: 'local', path: './plugins/codex' }, policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' }, category: 'Creativity' }],
    });
    await write(path.join(ROOT, '.claude-plugin/marketplace.json'), {
      name: 'creativeotter-skills', description: 'CreativeOtter media workflows for our separately deployed backend.', owner: config.author,
      plugins: [{ name: config.name, source: './plugins/claude', description: 'CreativeOtter media skills for a separately configured backend.' }],
    });
  }
  return paths;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  let mcpUrl = null, connected = false;
  if (args.length) {
    assert(args.length === 2 && args[0] === '--mcp-url', 'Usage: npm run build [-- --mcp-url https://your-real-host/api/mcp]');
    mcpUrl = args[1]; connected = true;
  }
  const out = connected ? path.join(ROOT, 'dist/connected') : path.join(ROOT, 'plugins');
  const paths = await build({ out, mcpUrl, marketplaces: !connected });
  console.log(`Built ${connected ? 'connected development' : 'instructions-only'} packages:\n${paths.join('\n')}`);
  if (!connected) console.log('No active MCP endpoint was added. Rebuild with --mcp-url after deploying the CreativeOtter backend.');
}
