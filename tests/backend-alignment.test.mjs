import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import Ajv from 'ajv';
import YAML from 'yaml';
import { ROOT, files, json } from '../scripts/lib.mjs';

const contract = await json(path.join(ROOT,'config/backend-contract.json'));
const workflows = await json(path.join(ROOT,'config/skill-workflows.json'));
const examples = await json(path.join(ROOT,'tests/fixtures/customer-prompts.json'));
const ajv = new Ajv({allErrors:true, strict:false, formats:{uuid:/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i}});
const validators = new Map(contract.tools.map(t=>[t.name,ajv.compile(t.inputSchema)]));

test('all 21 maintained skill workflows and their invocation metadata match actual tool contracts', async()=>{
  assert.equal(Object.keys(workflows).length,21);
  for(const [name,w] of Object.entries(workflows)) {
    for(const tool of w.tools) assert.ok(validators.has(tool),`${name} calls missing ${tool}`);
    const text=await readFile(path.join(ROOT,'skills',name,'SKILL.md'),'utf8');
    const fm=YAML.parse(text.match(/^---\n([\s\S]*?)\n---/)[1]);
    assert.equal(fm.description,w.description);
    const ui=YAML.parse(await readFile(path.join(ROOT,'skills',name,'agents/openai.yaml'),'utf8'));
    assert.equal(ui.interface.short_description,w.short_description);
    assert.ok(w.short_description.length>=25 && w.short_description.length<=64,name);
    assert.ok(ui.interface.default_prompt.includes(`$${name}`));
  }
});

test('everyday prompt call examples satisfy real backend input schemas, covering every implemented tool',()=>{
  assert.deepEqual(new Set(examples.cases.map(c=>c.skill)),new Set(Object.keys(workflows)));
  const covered=new Set();
  for(const c of examples.cases) assert.equal(c.schema_examples_only,true);
  for(const step of [...examples.cases.flatMap(c=>c.steps),...examples.image_call_examples]) {
    const validate=validators.get(step.tool);
    assert.ok(validate,`Missing tool ${step.tool}`);
    assert.ok(validate(step.arguments),`${step.tool}: ${ajv.errorsText(validate.errors)}`);
    covered.add(step.tool);
  }
  assert.deepEqual(covered,new Set(validators.keys()));
});

test('real schemas reject inherited model, field and ID-key contracts',()=>{
  for(const [name,args] of [
    ['check_job',{job_id:'10000000-0000-4000-8000-000000000001'}],
    ['generate_image',{prompt:'A bakery post'}],
    ['get_model_params',{model:'image/unsupported-model'}],
    ['list_models',{category:'video'}],
    ['estimate_generation',{operation:'video',prompt:'An ad'}],
    ['manage_characters',{action:'save',data:{title:'Mascot',image_url:'https://example.com/image.png'}}],
    ['create_upload_url',{filename:'voice.mp3',mime_type:'audio/mpeg'}],
  ]) assert.equal(validators.get(name)(args),false,`${name} should reject incompatible input`);
});

test('active packages contain no inherited execution aliases or unsupported provider models',async()=>{
  const obsolete=/\b(search_assets|list_characters|create_character|update_character|get_theme|create_film_project|update_film_project|assemble_film|generate_video|generate_speech|generate_music|generate_sound_effect|swap_video_characters|render_html_image|render_html_video|submit_feedback|upload_asset|import_media|trim_video|add_subtitles|merge_media|cut_and_reframe_video)\b/;
  for(const file of await files(path.join(ROOT,'skills'))) {
    const text=await readFile(file,'utf8');
    assert.ok(!obsolete.test(text),`Legacy executable reference: ${file}`);
    for(const m of text.matchAll(/`((?:image|video|speech|music|sfx)\/[a-z0-9][a-z0-9.-]+)`/g)) assert.equal(m[1],'image/nano-banana-2',file);
  }
});
