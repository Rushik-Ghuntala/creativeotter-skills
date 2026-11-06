---
name: creativeotter-create-avatar
description: "Create an avatar or character sheet using CreativeOtter image generation, then save its approved image as a reusable character. Voice and talking-video generation are not available."
---

# Create a reusable avatar

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Use this for a new reusable visual identity. Use create-character for storing an already prepared image. List `manage_characters` first to avoid duplicating an existing identity. Ask only for missing appearance or intended style details; for a personal avatar use the user's photos, and for another real person require permission.

Import ready PNG/JPEG/WebP references through [private uploads](references/platform-upload.md), or select existing assets with `manage_assets`. Generate only the requested sheet or portrait using the generate-image skill's paid native/provider workflow. Preserve likeness and stable features. A reference sheet is a guide, not a trained model or identity guarantee.

After the user approves this exact image for reuse (including approval already supplied), save with `manage_characters` action save and data containing name, description, appearance, identity_type and reference_asset_id. Use the confirmed ready output asset ID, not generation_id, a local path or URL. Include id only when updating the intended existing character. See [Studio records](references/studio-records.md).

Do not use inherited character create/update aliases. Voice cloning, synthetic speech, lip-sync and talking video are unavailable. A request for a talking avatar can receive a script and shot plan, but does not authorize paid still-image substitutes. Future image work must load and pass the saved character's owned reference explicitly.
