import { chmod, copyFile, cp, mkdir, readFile, rm, utimes } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ROOT, assert, files, hash, json, write } from './lib.mjs';

export const normalizeRegisteredAppId = value => {
  assert(typeof value === 'string', 'Supply the registered remote app ID from this ChatGPT account.');
  const id = value.trim().replace(/^plugin_(?=asdk_app_|connector_|templated_apps_)/, '');
  assert(/^(asdk_app|connector|templated_apps)_[A-Za-z0-9][A-Za-z0-9_-]{0,199}$/.test(id),
    'Expected a registered app ID, not the uploaded plugin ID, a URL or credentials.');
  return id;
};

export const packageChatgptWeb = async ({ appId, staging, archives }) => {
  const id = normalizeRegisteredAppId(appId);
  const config = await json(path.join(ROOT, 'config/plugin.json'));
  const root = path.join(staging, 'creativeotter-chatgpt-web');
  await rm(root, { recursive: true, force: true });
  await mkdir(root, { recursive: true });
  await cp(path.join(ROOT, 'skills'), path.join(root, 'skills'), { recursive: true });
  await mkdir(path.join(root, 'assets'), { recursive: true });
  await copyFile(path.join(ROOT, 'templates/icon.png'), path.join(root, 'assets/icon.png'));
  for (const name of ['LICENSE', 'NOTICE']) await copyFile(path.join(ROOT, name), path.join(root, name));
  const desktop = await json(path.join(ROOT, 'plugins/codex/.codex-plugin/plugin.json'));
  assert(desktop.version === config.version, 'Run npm run build before packaging the web plugin.');
  // Web packages reference a registered remote app. Bundling raw MCP server
  // declarations can cause ChatGPT to classify the import as desktop-only.
  const { mcpServers, ...manifest } = desktop;
  void mcpServers;
  await write(path.join(root, '.codex-plugin/plugin.json'), {
    ...manifest,
    name: `${config.name}-web`,
    apps: './.app.json',
    interface: {
      ...manifest.interface,
      shortDescription: 'Your creative studio, inside ChatGPT',
      longDescription: 'Create and edit images, view private saved images, and save brand, character and project plans. Motion graphics and animations require the opt-in HTML/CSS renderer; still images use the image workflow. Filmed video, speech, voice cloning, music and general media processing remain planning-only. Image quotes are customer CreativeOtter credits, not provider dollar costs. New images use your CreativeOtter credits.',
      defaultPrompt: ['Check my CreativeOtter account.', 'Show my latest saved CreativeOtter images.'],
    },
  });
  await write(path.join(root, '.app.json'), { apps: { [config.serverName]: { id, required: true } } });
  await write(path.join(root, 'BUILD.json'), {
    version: config.version, client: 'chatgpt-web', mode: 'registered-remote-app',
    registered_app_id: id, skill_count: 21, credentials_included: false,
    registration_verified_by_packaging: false, web_import_verified_by_packaging: false,
  });
  await write(path.join(root, 'README.md'), `# CreativeOtter for ChatGPT web\n\nThis package contains all 21 skills and references the registered CreativeOtter remote app \`${id}\`. It contains no direct MCP server launch/configuration, hooks or credentials.\n\nInstall or update it using ChatGPT's plugin archive controls, then connect the required CreativeOtter app and complete your own sign-in. The referenced app must be available in the target account/workspace. This ZIP does not register an app or grant access by itself. For another account without access to this app, create a custom remote MCP connection there and rebuild using its actual registered app ID.\n\nA successful archive build is not proof of a live web install. Verify the uploaded plugin no longer has the laptop/Desktop only label and that its connection works in a new web chat. Test with: “Is my CreativeOtter account connected?” and “Show my latest saved CreativeOtter images. Don't create anything new.”\n\nSource guidance: https://learn.chatgpt.com/docs/enterprise/plugin-management and https://developers.openai.com/plugins/build/plugins\n`);
  const entries = (await files(root)).sort();
  const epoch = new Date('2000-01-01T00:00:00Z');
  for (const file of entries) { await chmod(file, 0o644); await utimes(file, epoch, epoch); }
  await mkdir(archives, { recursive: true });
  const archive = path.join(archives, `creativeotter-chatgpt-web-v${config.version}.zip`);
  await rm(archive, { force: true });
  const zipped = spawnSync('zip', ['-X', '-q', archive, '-@'], {
    cwd: root, input: entries.map(file => path.relative(root, file).split(path.sep).join('/')).join('\n') + '\n',
    encoding: 'utf8', env: { ...process.env, TZ: 'UTC' },
  });
  assert(zipped.status === 0, zipped.stderr || 'Web plugin ZIP creation failed.');
  const sha256 = hash(await readFile(archive));
  await write(archive + '.sha256', `${sha256}  ${path.basename(archive)}\n`);
  return { root, archive, sha256, registered_app_id: id, file_count: entries.length };
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  assert(args.length === 2 && args[0] === '--app-id', 'Usage: npm run package:chatgpt-web -- --app-id asdk_app_<actual-registered-id>');
  const result = await packageChatgptWeb({ appId: args[1], staging: path.join(ROOT, 'dist/chatgpt-web'), archives: path.join(ROOT, 'releases') });
  console.log(JSON.stringify(result, null, 2));
}
