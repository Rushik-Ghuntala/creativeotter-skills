---
name: creativeotter-generate-image
description: Generate or edit one image through CreativeOtter using an enabled model. Use for a single image or correction; use product-photoshoot for coordinated campaigns or create-avatar for a reusable identity.
---

# Generate image

CreativeOtter adaptation, 2026-11-01. Read [the runtime contract](references/runtime-contract.md) and [shared guidance](references/workflow-basics.md) before tools.

## Workflow

1. Resolve subject, purpose, aspect ratio, style, exact text and details that must remain unchanged. Infer minor creative choices from the brief.
2. Check CreativeOtter's image capability. Reuse known workspace assets or search for references when identity/product continuity matters. Follow [uploads](references/platform-upload.md) for new media. Use a saved theme only when supported and relevant.
3. Discover enabled image models with `list_models` when selection is unresolved. Honor an explicitly chosen available model, otherwise use a suitable advertised default. Read `get_model_params` and only the relevant [image guide](references/images/index.md). There is no hardcoded model default.
4. Prepare one direction unless more were requested. Confirm reference counts, supported ratio, edit mode, transparency and output format from the current schema. Never assume that `character_id`, `character_ids`, URL inputs or `extras` are interchangeable.
5. Obtain a quote for the exact inputs. Call `generate_image` with the quoted values and `quote_id` only as declared by its schema. In Review mode give the returned authenticated approval link and wait for the user's direct approval. Missing quoting/approval support blocks paid execution.
6. Keep the returned job ID and use [recovery guidance](references/job-recovery.md). Once saved, inspect subject/product identity, exact copy, crop, composition, brand rules and visible artifacts. State any inspection limits.
7. Name/tag approved assets using supported metadata tools. Describe a revision before another paid attempt and obtain its fresh quote; do not regenerate automatically after inspection.

## Prompt construction

Order the prompt by deliverable and subject; composition; must-preserve facts; environment; lighting/camera; materials; aesthetic; exact required text; exclusions. Work in the user's language and preserve supplied copy, punctuation and script direction. A transparent background must be supported by the selected model or a separately quoted background-removal operation.

For an edit, preserve the source ratio unless reframing is requested. Describe the smallest requested change and inspect for unintended changes. Exact pixel preservation outside a region may require a separate compositing operation rather than a generative promise.

For a video keyframe, use the video's ratio, approved anchors and one clean full-bleed frame without labels, grids or text unless requested. Generating a keyframe is itself paid work and needs its own quote and approval.

Deliver the saved asset with a current preview/download link. Do not describe a pending job as a finished image or promise permanent public URLs.
