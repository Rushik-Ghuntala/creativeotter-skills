---
name: creativeotter-generate-image
description: Generate or edit one image with native-first CreativeOtter routing and an optional provider fallback. Use for a single image or correction; use product-photoshoot for a campaign or create-avatar for a reusable identity.
---

# Generate image

CreativeOtter adaptation, 2026-11-01. Read [the hybrid runtime contract](references/runtime-contract.md).

## Choose execution

Resolve the subject, purpose, ratio, exact text, references and must-preserve details. Inspect actual native image tools and preserve any explicit model requirement. Native-first reduces operating cost; customers still spend CreativeOtter credits.

Before invoking a host-native generator, follow the [paid native sequence](references/runtime-contract.md): `prepare_native_generation` → successful `claim_native_generation`, which reserves credits automatically. An explicit generation request needs no additional browser approval or chat confirmation; an estimate-only request stops before claiming. Use only the fixed inputs returned by the claim. Missing funds, pricing or connection stops generation; do not deliver an unbilled native substitute.

After the one authorized native call, inspect the result, transfer the existing bytes through `create_native_output` and `complete_native_output` with the execution token, and report the actual saved/charged state. A failed upload is not permission for a second take. Report failed/unknown native outcomes for reconciliation; do not self-refund or switch engines.

## Provider branch

If a native tool is absent/unsuitable or a specific available provider model was requested, discover it through `list_models` and inspect `get_model_params`. Follow only its live schema; packaged [image guides](references/images/index.md) are prompting references, not model availability or pricing promises.

Obtain a bound `estimate_generation` quote for exact inputs and owned reference assets. Open `generate_image` using only the quote field declared by its schema. For an explicit generation request, call it immediately to reserve credits and start the image; no browser approval is required. For estimate-only requests, return the quote without executing. Keep its quote/job IDs, use [recovery guidance](references/job-recovery.md), and inspect only confirmed saved output. No fallback after a safety refusal, unknown native outcome, or successful native result merely because saving failed.

## Show multiple saved results

After multiple requested images have been saved, or when asked to show existing images together, call `show_image_gallery` in the original slide order. Follow [multi-image delivery](references/runtime-contract.md). Use the CreativeOtter embedded gallery for the combined result, with no new generation or credit charge. If its tool is missing from an older chat, follow the runtime contract’s discovery refresh and exact-ID branded gallery link.

## Prompt construction

Specify deliverable, subject, composition, preservation requirements, environment, lighting, materials, exact quoted copy and exclusions. Use ordered reference roles. For an edit, preserve the source ratio unless reframing was requested and describe the smallest change. Native and provider tools can have different aspect/edit/transparency limits; verify rather than assuming interchangeability. A provider keyframe or extra take is another paid operation with its own quote within user-requested scope.
