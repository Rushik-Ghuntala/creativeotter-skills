---
name: creativeotter
description: "Use CreativeOtter for image creation, saved images, brand kits, characters, account questions and creative project planning. Route a specific media request to its focused skill."
---

# CreativeOtter

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Use the authenticated CreativeOtter connection, not another media plugin. Current execution supports images; video, speech, music, sound effects, media processing and code rendering are planning-only. Read [tool routing](references/tool-catalog.md) when a tool choice is unclear. Check live capabilities when availability or permissions are uncertain.

For saved images, use `manage_assets` with action list, kind output and the requested limit, then pass their returned gallery_reference values to `show_image_gallery`. For a particular saved image, use its returned asset ID with action get. Do not open the account panel for a gallery request.

For connection, balance or activity questions use `manage_account` with section overview, activity or settings. It is read-only; it cannot change settings, buy credits or refund charges.

Use the image skill for a new image, edit or current image price quote, product-photoshoot for coordinated images, and create-avatar for an identity sheet. Use create-character to store an existing identity. Brand kits use `manage_themes`; projects and scripts use `manage_projects`, `manage_storyboards` or `manage_voice_presets` as described in [Studio records](references/studio-records.md).

Preserve the user's requested count, model and outcome. Keep IDs and execution details inside tools. Show the branded account/gallery result with a short helpful reply. When a media operation is unavailable, explain that simply and offer an appropriate script, shot list or edit plan; do not silently create paid still images instead.
