# Backend-aligned skills validation

Version 0.6.1 updates all 21 adapted entry points and invocation descriptions to the actual CreativeOtter backend. The original copied snapshot and its provenance remain unchanged.

## Automated contract checks

- Exported all 24 actual tool input schemas through the backend's own MCP server using an in-memory transport and a database object that throws on any access.
- Confirmed the checked schema snapshot matches the current backend source.
- Validated offline call examples for everyday prompts covering all 21 workflows and every implemented tool against those actual schemas.
- Rejected legacy inputs: job_id for provider progress, direct prompt input to image execution, unsupported models/categories, old character fields and audio uploads to the image-only uploader.
- Checked active adapted content for legacy execution aliases and unsupported provider model references.
- Verified all 490 copied upstream files by their recorded hashes, legal attribution, local reference closure and both generated packages.
- All 21 skill folders passed the skill-creator validator. Nine repository tests passed.

The everyday prompt fixtures are schema examples with synthetic identifiers; they do not run a language model, generate media or change live records. Live behavior tests are recorded separately below.

## Live verification

The v0.6.1 web archive was uploaded from the app codebase using the existing plugin's Upload new version control. The plugin page showed version 0.6.1 and the revised preparation-only descriptions, with the existing registered app still connected. A fresh chat was started through Try in chat.

The live backend capability/model reads confirmed image-only execution and Nano Banana 2 with the supported image schema. Existing Studio records and gallery tools remained available. No backend code, database schema, provider settings or credit price was changed for this skills update.

The initial live price-only test exposed a customer-facing error: provider operating cost was quoted as a dollar/rupee price. v0.6.1 now explicitly requires customer credit_units and the display scale, forbids presenting provider estimated_cost_label/max_cost_micro_usd as retail prices, and routes current image price questions to a fresh non-spending quote. The web listing also makes unavailable execution categories explicit. Follow-up prompts without a fresh plugin selection in the initial chat also produced an unsupported video claim; final tests must explicitly select the installed plugin and record that boundary rather than claim all ordinary chat replies are controlled by a skill.

Final selected-plugin live tests in ChatGPT web (v0.6.1):

| Everyday prompt | Observed result |
| --- | --- |
| “How much would one Instagram picture for my bakery cost? Just tell me the price, please.” | “16 CreativeOtter credits for one Instagram bakery picture.” No generation. |
| “Can you make a video of my bakery mascot waving hello?” | Explained that video generation is unavailable and offered a concept/animation prompt. |
| “Can you record a welcome message for my cafe using my own voice?” | Explained voice cloning/recording is unavailable and offered a welcome script; did not collect audio. |
| “Plan a six-shot cafe launch film, but do not generate or save anything.” | Produced six ordered shots and a written voiceover with explicit planning-only status. No footage, audio or Studio records were claimed as saved. The host also displayed web reference images; these were not generated CreativeOtter assets. |
| Follow-up without another mention: “Show my three latest saved images together again, please.” | Opened the CreativeOtter three-image embedded gallery and stated no new images were generated. |

The first four prompts used the normal CreativeOtter mention picker in a fresh chat. No technical tool names, IDs or developer instructions were included in these user prompts. A separate live backend estimate confirmed the current image quote was 16000 units (16 display credits), in unstarted quoted state. This report does not claim that every host reply without plugin selection follows these instructions, nor that all 21 workflows were live-executed.

No new generation, credit reservation, provider job or charge was requested by the tests. The account's available/reserved/spent totals were checked before and after; all stayed unchanged. Test evidence screenshots and chat URLs are retained in the private project context, not included in plugin archives. Codex and Claude packages were rebuilt and validated; this task's live language-model tests used ChatGPT web, not new paid generations or live Claude execution.
