---
name: creativeotter-create-character
description: Save, inspect or update a reusable CreativeOtter character and its canonical reference image; use create-avatar for a newly generated identity sheet.
---

# Reusable characters

CreativeOtter adaptation, 2026-11-04. Read [the runtime contract](references/runtime-contract.md).

Use the connected backend's `manage_characters` when available. `action: list` finds existing identities; `get` reads one ID. For `save`, use its current `data` schema: name, description, stable appearance, identity_type and an owned reference_asset_id. Pass `id` to update the intended existing record. Omit id only for a requested new character. A reference is a ready private CreativeOtter asset, not a local path or arbitrary URL. Upload through the current private asset tools when needed.

Keep stable face, proportions, materials, outfit and distinctive details in appearance. Keep temporary actions and shot direction in generation prompts. Only save fictional identities, the user's own likeness or another person's likeness with permission. Saving a record does not generate an identity sheet, train a visual model or clone a voice. New image generation follows the priced native-first workflow before execution.

For future generations, load this saved character, inspect its canonical reference, and include the owned reference ID in the actual generation inputs. Do not claim that merely saving a character applies it automatically to all models. Archive or restore the exact requested record through the advertised action; no permanent deletion is implemented by this tool. Voice cloning and speech require separate enabled adapters and applicable consent.
