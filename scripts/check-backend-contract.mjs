import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { ROOT, assert, json, write } from './lib.mjs';

const args = process.argv.slice(2);
assert(args[0] && args.length <= 2 && (!args[1] || args[1] === '--write'), 'Usage: node scripts/check-backend-contract.mjs /path/to/creativeotter-app [--write]');
const app = path.resolve(args[0]);
const moduleUrl = relative => JSON.stringify(pathToFileURL(path.join(app, relative)).href);
const script = `
import { createCreativeOtterMcp } from ${moduleUrl('src/lib/mcp/server.ts')};
import { InMemoryTransport } from ${moduleUrl('node_modules/@modelcontextprotocol/sdk/dist/esm/inMemory.js')};
import { Client } from ${moduleUrl('node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js')};
const id = '10000000-0000-4000-8000-000000000001';
const context = {user_id:id,client_id:'schema-only',workspace:{id,name:'Schema fixture'},role:'owner',permissions:['account:read','media:read','media:prepare']};
const noDatabase = new Proxy({}, {get:()=>{throw new Error('Schema export must not access a database')}});
const server = createCreativeOtterMcp(context,'https://creativeotter-app.vercel.app',null,noDatabase);
const [a,b] = InMemoryTransport.createLinkedPair();
const client = new Client({name:'schema-export',version:'1'});
await Promise.all([server.connect(a),client.connect(b)]);
try {const result=await client.listTools(); process.stdout.write(JSON.stringify(result.tools.map(({name,inputSchema})=>({name,inputSchema})).sort((a,b)=>a.name.localeCompare(b.name))))}
finally {await client.close();await server.close()}
`;
const tools = JSON.parse(execFileSync(process.execPath, ['--conditions=react-server', '--import', path.join(app,'node_modules/tsx/dist/loader.mjs'), '--input-type=module', '-e', script], {
  cwd: app, encoding: 'utf8', env: {...process.env, NEXT_PUBLIC_SUPABASE_URL:'https://schema-fixture.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY:'schema-fixture', CREATIVEOTTER_RENDERING_ENABLED:'true'},
}));
const file = path.join(ROOT,'config/backend-contract.json');
if (args[1] === '--write') {
  const version = JSON.parse(await readFile(path.join(app,'package.json'),'utf8')).version;
  await write(file,{checked_on:'2026-11-06',backend_version:version,note:'Tools/list schemas, including opt-in rendering with only its discovery flag enabled, exported from backend code using an in-memory transport. No account data, credentials, database calls or generation.',tools});
} else {
  assert(JSON.stringify((await json(file)).tools) === JSON.stringify(tools), 'Backend schemas changed: review adaptations, then intentionally refresh the contract.');
}
console.log(`Verified ${tools.length} backend tool schemas without database access or media execution.`);
