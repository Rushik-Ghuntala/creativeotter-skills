---
name: creativeotter-create-character
description: "Save, inspect or update an existing CreativeOtter character and its ready reference image. Use create-avatar to generate a new identity sheet."
---

# Save a reusable character

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Use `manage_characters` with action list/get before an ambiguous save. New requested identities use action save without id; updates include the actual existing id. Data fields are name, description, appearance, identity_type (fictional, self or authorized) and reference_asset_id (a ready owned asset ID, or null when no image is supplied). See [Studio records](references/studio-records.md).

Use `manage_assets` to identify the intended ready image. Do not substitute a generation ID or arbitrary image URL. Upload an attached reference with the supported image upload flow if needed. Recording stable direction does not generate a new image, train an identity model or clone a voice.

Only store fictional identities, the user's own likeness or an authorized likeness. Preserve existing fields on updates. Archive/restore only the requested record. To reuse a character in a later image, read its reference and include it in the actual generation inputs. Saving alone does not apply it automatically.
