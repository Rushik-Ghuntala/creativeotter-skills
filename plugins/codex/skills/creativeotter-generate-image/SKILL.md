---
name: creativeotter-generate-image
description: Generate or edit one image with native-first CreativeOtter routing and an optional reviewed provider fallback. Use for a single image or correction; use product-photoshoot for a campaign or create-avatar for a reusable identity.
---

# Generate image

CreativeOtter adaptation, 2026-11-01. Read [the hybrid runtime contract](references/runtime-contract.md).

## Choose execution

Resolve the subject, purpose, ratio, exact text, references and must-preserve details. Inspect the host's actual image tools before checking provider configuration. If a suitable built-in image generator exists, use it and its native imagegen guidance. Missing CreativeOtter provider tools or API keys must not block this path. Preserve the requested model: if the user explicitly chose one the native tool cannot identify/support, use its available provider route or explain the limitation.

Use the native tool's actual schema and reference mechanism. Produce one image unless more were requested. Inspect its content, text, identity and crop; report any inspection limit. Deliver the native preview. If supported and authorized, save the existing output using the [private native import flow](references/platform-upload.md). Report the actual source; do not claim a provider model or a CreativeOtter credit charge for native work. Failure to save is not failure to generate.

## Provider branch

If a native tool is absent/unsuitable or a specific available provider model was requested, discover it through `list_models` and inspect `get_model_params`. Follow only its live schema; packaged [image guides](references/images/index.md) are prompting references, not model availability or pricing promises.

Obtain a bound `estimate_generation` quote for exact inputs and owned reference assets. Open `generate_image` using only the quote field declared by its schema. In Review mode give the authenticated review link and wait for the user's direct approval. Keep its quote/job IDs, use [recovery guidance](references/job-recovery.md), and inspect only confirmed saved output. No fallback after a safety refusal, unknown native outcome, or successful native result merely because saving failed.

## Prompt construction

Specify deliverable, subject, composition, preservation requirements, environment, lighting, materials, exact quoted copy and exclusions. Use ordered reference roles. For an edit, preserve the source ratio unless reframing was requested and describe the smallest change. Native and provider tools can have different aspect/edit/transparency limits; verify rather than assuming interchangeability. A provider keyframe or extra take is another paid operation with its own quote and approval.
