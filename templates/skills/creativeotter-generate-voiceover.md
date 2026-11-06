---
name: creativeotter-generate-voiceover
description: "Prepare narration, dialogue and reusable voice direction for CreativeOtter. Speech generation and synthetic voice design are not yet implemented."
---

# Plan narration or dialogue

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

CreativeOtter currently cannot synthesize speech or design a provider voice. For a request to generate audio, say this plainly and offer a script or voice direction. Do not call another plugin, use an image quote or present browser speech as a saved CreativeOtter voiceover.

For writing requests, preserve the user's language and approved words; write natural spoken lines with useful pacing and pronunciation notes when needed. Ask only for missing details that change the result.

If the user asks to save reusable direction, use `manage_voice_presets` list/get/save with name, description, language, script and style, preserving the existing id for updates. See [Studio records](references/studio-records.md). A preset is text direction, not generated audio or a cloned voice. Do not claim a download, audio duration or finished recording.
