---
name: creativeotter-create-character
description: Save, inspect or update an existing reusable CreativeOtter Character and its visual identity. Use creativeotter-create-avatar for guided photo-to-avatar and character-sheet creation.
---

> CreativeOtter adaptation, 2026-11-01. Before using this workflow, read [the runtime contract](references/runtime-contract.md). Use only enabled CreativeOtter tools, current model schemas, bound quotes and direct web approvals. Inherited examples do not establish defaults, prices, entitlements or UI availability.


# Manage a reusable Character



For guided avatar creation from photos, use creativeotter-create-avatar when available. For an existing approved visual or a direct Character update, use this workflow. Read [identity guidance](references/avatars/identity.md) when preparing a new sheet.

1. Find the intended Character with list_characters. Reuse its ID rather than creating a duplicate.
2. Save an approved image with `create_character({ title, description, image_url })`; update an existing Character with `update_character` and `id` plus only changed fields.
3. Keep stable identity in description and temporary scene actions in generation prompts. The record stores one canonical image; retain auxiliary face/body/wardrobe views as named assets.
4. A sheet grid is an identity reference, not a literal video opening. Generate a clean keyframe from approved anchors first. In video, `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix).
5. For a voice: consenting speaker's recording → creativeotter-clone-voice (Cartesia by default, or ElevenLabs); description → `design_voice` (three auditions, saved to the same Character); stock → `update_character({ id, voice_model, voice_id })`. Designed ElevenLabs voices speak with v4, Google-designed with `speech/gemini-3.8-flash-tts`, Cartesia clones with Cartesia Sonic, ElevenLabs clones with v2 (steady) or v4 (expressive, dialogue), stock with their saved model. Visual identity does not control native video audio; for speech in video, see [voice in video](references/video/voice-in-video.md).
6. Replace an existing visual/voice only as requested. Delete a Character (`delete_character({ id, confirm: true })`, permanent) only on explicit direction, after identifying the exact record. Older clients without `create_character` or `delete_character`: `manage_character` without `id` creates, and `manage_character({ id, delete: true })` deletes. Verify a requested update with list_characters when useful.

An approved Character is reusable reference data, not a newly trained visual model or guaranteed identity lock.
