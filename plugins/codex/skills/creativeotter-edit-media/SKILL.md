---
name: creativeotter-edit-media
description: "Explain or draft cuts, captions, framing, audio and assembly edits for existing media. CreativeOtter video/audio processing is not implemented; image edits use generate-image."
---

# Plan edits to existing video or audio

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Route an actual image correction to generate-image, using the owned image as a reference. This skill is for existing video/audio editing plans.

CreativeOtter has no trim, merge, resize, subtitle, transcription, noise-cleanup, background-removal, upscale, frame-extraction, watermark or audio-mixing service. Do not call inherited processing names or offer them as enabled. Only image files can use the current private upload flow.

When execution is requested, say the processing feature is unavailable and offer a precise edit plan. Use supplied or actually inspected timings and words; do not fabricate transcripts, source dimensions or cut points. Keep the original content and meaning intact. Captions, transitions and music are proposed edits, not rendered output. Never invent a processing quote, refund, output file or download.
