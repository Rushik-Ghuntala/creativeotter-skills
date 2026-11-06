---
name: creativeotter-generate-music
description: "Write music briefs or lyrics and save them in CreativeOtter. Music generation, remixing and audio downloads are not implemented."
---

# Plan music and lyrics

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Music generation and remixing are not currently available in CreativeOtter. Explain this for an audio-generation request; offer lyrics, a composition brief or production direction without claiming a track exists. Do not select inherited music models, use an image credit quote or route through another media plugin.

For a writing request, define genre, mood, intended use, vocal/instrumental direction and requested duration. Preserve supplied lyrics and requested language. Write original lyrics and describe musical traits rather than promising an artist imitation.

When saving is requested, use `manage_projects` section music and data.kind music, with name, description, genre, lyrics and other supported fields. See [Studio records](references/studio-records.md). A saved brief is not an audio asset; do not mark production complete or provide a fabricated play/download link.
