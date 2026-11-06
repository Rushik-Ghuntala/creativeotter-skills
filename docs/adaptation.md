# Adaptation notes

The copied upstream snapshot remains frozen at its recorded commit. All 490 captured files, including the original 21 skills and their model guides/assets, stay byte-identical under `vendor/creative-claw/upstream`. LICENSE, NOTICE and provenance remain intact. No upstream build script is executed.

## Current active packages

Version 0.6.1 replaces every adapted entry point and invocation description with instructions matching CreativeOtter's real backend. All 21 skills remain discoverable. Images use the existing priced native-first workflow or the implemented provider model. Gallery, brand, character, project, storyboard and voice-direction records use the actual current tools and inputs.

Video, speech, cloning, music, sound effects, processing, code rendering and feedback submission remain unavailable as execution services. Their skills provide useful preparation, scripts or plans and explain the limitation. Saving a brief or preset is never described as generated media. Host-native tools do not add a missing CreativeOtter billing contract for those categories.

Only reachable, maintained CreativeOtter references are shipped in active skill packages. Historical guides and unused assets are preserved in the original vendor snapshot rather than exposed as operational instructions. Creative direction useful for supported images and planning has been retained in concise maintained guidance. `provenance/adaptation.json` maps current entry points and metadata to their original hashes; new references use a null source.

Both native and API image generation require the current credit quote and supported execution flow. An explicit request starts the requested image without extra browser approval. Estimate-only requests do not execute. Unknown outcomes, upload failures and safety refusals never cause automatic replacement generation. Existing saved-image display is read-only.

## Maintenance and verification

Edit `templates/skills`, `templates/shared` and `config/skill-workflows.json`, then regenerate with `npm run adapt` and `npm run build`. The adapter checks that every original skill has an override and packages only the local reference closure. No direct edits to generated outputs or vendor files are needed.

`config/backend-contract.json` contains public input schemas exported from the real backend through in-memory MCP discovery with no database calls. Use `npm run check:backend -- /path/to/creativeotter-app` to detect drift. The checked contract is a development baseline, not authorization or proof that a particular user's permissions/provider budget enable a tool. Live capabilities and schemas govern execution.

Run `npm run verify` before release. It verifies original hashes and package parity, validates realistic request examples against actual tool schemas, rejects incompatible legacy inputs, and checks reproducible credential-free archives. Offline prompt examples do not prove an assistant's natural-language behavior; keep live user-prompt results separate. A future media adapter requires a reviewed billing contract, implementation, revised skill and real integration tests before it is advertised.
