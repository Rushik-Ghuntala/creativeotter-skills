---
name: creativeotter-generate-music
description: Compose songs, scores, instrumentals or remixes through enabled CreativeOtter music models. Use for music, not narration or isolated sound effects.
---

> CreativeOtter adaptation, 2026-11-01. Before using this workflow, read [the runtime contract](references/runtime-contract.md). Prefer suitable native engines, but require a CreativeOtter credit quote, direct approval and execution claim before native tools. Missing billing stops generation. Provider-specific steps below apply only to enabled CreativeOtter API fallback, with current schemas, bound quotes and direct web approval. Native execution follows its own host schema; inherited examples do not establish availability or pricing.


# Generate Music



Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, required quotes and web approval, imports, and recovery.

Create a finished music asset with `generate_music`. Route narration or dialogue to `creativeotter-generate-voiceover`. Route Foley, ambience, impacts, transitions, UI cues, and other non-musical sounds to `creativeotter-generate-sound-effects`.

## Pick the model

| Need | Model | Notes |
| --- | --- | --- |
| Full-length vocal songs, expressive musical performances, custom or automatic lyrics, instrumentals | `music/mureka-v9.5` | Use a current bound quote; no fixed rate or entitlement is established here. |
| Background beds, scores, or image-inspired tracks | `music/lyria-3.5` (omitted-model default) | About 30 to 180 s; `music_length_ms` is guidance, not exact. Up to 10 `image_urls` as visual inspiration. `force_instrumental` defaults to true. |
| Exact length, or a sting under 30 s | `music/elevenlabs-music-v2.5` | Exact 3 s to 10 min via `music_length_ms` (default 30 s). Prompt up to 4,100 characters. `output_format` selectable. `force_instrumental` defaults to true. |
| Remix an existing song or sung vocal recording | `music/mureka-remix` | Supply `audio_url` with detectable musical tempo, not ordinary speech. Read its current schema. |
| Replace lyrics in a selected source time range | `music/mureka-region-edit` | Supply `audio_url`, replacement lyrics, and the millisecond edit range from its current schema. |
| Explicit MiniMax choice or a requirement for its seed/quality controls | `music/minimax-music-3` | Requires `lyrics` with section tags on separate lines. No `force_instrumental`. `music_length_ms` is an upper bound (up to 5 min). |

Use Mureka V9.5 for full-length songs and expressive musical performances, Lyria for background or image-inspired tracks, and ElevenLabs for exact duration or format. Honor an explicit model choice. Fetch `get_model_params` for the selected model when its schema is not already known; if unavailable, explain and offer an available model without silently substituting it.

## Workflow

1. Establish the track's purpose, duration, placement, genre, mood, tempo, instrumentation, energy arc, ending, and whether vocals are wanted. Ask only for missing choices that materially change the result.
2. Pick the model from the table. Read [music prompting](references/music-prompting.md) before writing the prompt. For Mureka, also read [its model reference](references/mureka.md). Keep quoted lyrics and required timing exactly.
3. Obtain a bound quote with `estimate_generation` for the exact inputs before paid execution; follow the runtime contract. An estimate-only request does not authorize generation.
4. State consequential settings briefly, then call `generate_music`. One requested track authorizes one generation. Generate alternatives only when the user asks for a batch or another take. Resolve queued Lyria, MiniMax, and Mureka jobs with `check_job`.
5. Listen for genre fit, tempo, instrumentation, vocal presence, lyric accuracy, energy arc, mix density, ending, and clipping. A defect can justify a proposed revision, not an unrequested paid regeneration.
6. Return the saved asset reference. To put it under a video, keep it separate until approved, then follow [media assembly](references/media-assembly.md): `add_audio_to_video` with `audio_mode: "mix"` keeps the clip's sound (`added_volume` about 0.3 under speech).

## Tool contract

- Pass only the fields the selected model supports. Do not send sound-effect fields such as `duration_seconds`, `loop`, or `prompt_influence`.
- For instrumental work, keep `force_instrumental: true` (Lyria, ElevenLabs, Mureka) and say "instrumental, no vocals" in the prompt. For vocals, set it to `false` and describe the vocal role. For Mureka, choose supplied or automatic lyrics deliberately; their costs differ.
- Describe musical traits, never a named artist, band, song, or copyrighted lyrics.
- For Mureka style inspiration, provide `audio_url` or `extras.reference_audio_url` as documented by the live schema. Longer references are cut to their first 30 seconds, and the reference replaces the style prompt. Use the separate Remix and Region Edit models for those operations. Do not invent upstream composition-plan, stem, voice-cloning, or extension parameters.

## Completion standard

Return the saved asset reference and identify the model, requested duration (or model-chosen length for Mureka), vocal or instrumental setting, and intended use. Mention any important mismatch found during review. When a merged video is requested, distinguish the approved music asset from the separately rendered video result.
