---
name: creativeotter-product-photoshoot
description: "Create a coordinated set of product images or carousel slides through the supported CreativeOtter image workflow, reusing product and brand references."
---

# Product image sets

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Create the requested image set, preserving product shape, label, color, materials and approved copy. Resolve count and intended placements from the user's brief; ask only for consequential missing details. A request for several images authorizes that count, not extra hero drafts or retries.

Find saved references with `manage_assets` action list, kind reference; the current library has no text search or tag filter. Match returned labels and inspect the intended assets, or ask when ambiguous. Import new images through [private uploads](references/platform-upload.md). Load the requested brand with `manage_themes` list/get; [Studio records](references/studio-records.md) defines its fields.

Write a compact shot list: for example hero, detail and lifestyle. Follow [image direction](references/image-direction.md) and the generate-image skill's exact paid image workflow for each requested image. Use the current model catalog, not inherited model recommendations. Pass only owned reference_asset_ids. A saved brand must actually be included in the prompt; saving it does not automatically apply it.

Review each output for product accuracy and consistency. Reuse the original anchors and an approved hero when appropriate. Corrections requiring another generation need that additional scope from the user.

Once saved, collect the actual gallery_reference pairs and open `show_image_gallery` in slide order. Use `assign_project_asset` only if the user asked to group these exact assets in a known project. The library supports favorites, not renaming or tagging tools. Do not promise an automatic ZIP download of the full set; show the supported per-image downloads.
