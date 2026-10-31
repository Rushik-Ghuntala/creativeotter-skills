---
name: creativeotter
description: Route mixed media and workspace requests through CreativeOtter. Use for connection checks, account overview, activity or settings, several media types, onboarding, saved assets, themes or budgets; use a focused skill for one clear media outcome.
---

# CreativeOtter

CreativeOtter adaptation, 2026-11-01. Read [the runtime contract](references/runtime-contract.md) and [shared execution guidance](references/workflow-basics.md) before tools. They define the CreativeOtter integration; inherited examples do not establish available models, prices or UI.

Use suitable native host tools first under the hybrid runtime contract. Inspect the real host inventory; do not require a provider key for an available native tool. Use the configured `creativeotter` connection for optional saved assets, account data and reviewed API fallback. `get_capabilities` describes our backend, not the host’s native inventory. Do not substitute another external plugin’s similarly named tools.

## Choose the workflow

| Outcome | Skill |
| --- | --- |
| One image or image edit | `creativeotter-generate-image` |
| Coordinated product images | `creativeotter-product-photoshoot` |
| One generated, extended or transformed video | `creativeotter-generate-video` |
| Script, shot list and storyboard | `creativeotter-plan-video` |
| Multi-shot film | `creativeotter-build-film` |
| Creator-style product ad | `creativeotter-create-ugc-ad` |
| Several ad variants | `creativeotter-ad-variations` |
| Narration, dialogue or a designed synthetic voice | `creativeotter-generate-voiceover` |
| Consented personal voice clone | `creativeotter-clone-voice` |
| New music | `creativeotter-generate-music` |
| Sound effects, Foley and ambience | `creativeotter-generate-sound-effects` |
| Reusable avatar and identity sheet | `creativeotter-create-avatar` |
| Save or update a Character | `creativeotter-create-character` |
| Select social highlights from existing footage | `creativeotter-create-reels` |
| Edit existing video or audio | `creativeotter-edit-media` |
| Recast people in existing footage | `creativeotter-swap-characters` |
| Explicit HTML/CSS or motion-graphics rendering | `creativeotter-render-html` |
| Track production/client spend | `creativeotter-budget-projects` |
| Guided first run | `creativeotter-setup` |
| Explicitly requested product feedback report | `creativeotter-submit-feedback` |

Use the focused skill's relevant references, not every guide. Model names do not change the owning outcome. Prefer a clear user outcome over broad media routing. If designed motion versus filmed-looking footage is materially unclear, ask one question.

For connection checks, account overview, balance, activity or settings, call `manage_account` with the relevant section and follow [account guidance](references/workflows/account.md). A capabilities-only response does not open the account panel. In UI-capable hosts, let the returned interactive panel present the details and keep accompanying prose brief. In other hosts, summarize the returned data and include its account link. For assets, themes and project state, use only their enabled tools. Curated examples require an advertised catalog; none is provided by this repository. Feedback and optional attribution require explicit user authorization.

## Production pattern

Resolve the brief and references, inspect native capabilities and preserve explicit model requirements. Prefer suitable native execution and save existing outputs when possible. For provider fallback, select an enabled model, quote all paid steps and obtain direct web approval. Preserve IDs, inspect confirmed outputs and organize assets. Reuse completed work and approved identity anchors across shots. Do not silently add keyframes, auditions, variants or generative repairs outside the requested scope. A completed asset must be confirmed by the server; a job ID alone is unfinished.
