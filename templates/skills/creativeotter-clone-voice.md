---
name: creativeotter-clone-voice
description: Guide private recording upload, consented voice cloning and reuse through enabled CreativeOtter providers. Use for copying a real speaker with explicit permission; use generate-voiceover to design a new synthetic voice.
---

# Clone a consented voice

CreativeOtter adaptation, 2026-11-01. Read [the runtime contract](references/runtime-contract.md), [private uploads](references/platform-upload.md) and the relevant [voice guide](references/voices/cloning.md) as technical background.

1. Verify that cloning and the intended provider are enabled. Possessing a recording is not proof of the speaker's consent. Clone only the user's own voice or a speaker who explicitly authorized it.
2. Obtain the current CreativeOtter/provider consent text and policy URLs from the configured backend's consent flow. Do not reuse an inherited consent form, invent policy URLs or treat an old boolean example as legal authorization. If that flow is unavailable, stop cloning and continue only preparation.
3. Use a private upload with the required purpose, retention and deletion controls. A host microphone/card is optional; offer the returned authenticated web upload link when the client cannot transfer the sample.
4. Quote the supported clone operation, prepare it through the current schema and follow its advertised credit execution contract within the user-requested scope. Preserve provider and consent records; never switch providers silently.
5. Reuse the returned Character/voice identity for separately quoted speech. Audition only when requested; do not generate a paid test automatically. Keep source recordings private and do not pass them into later speech unless explicitly required and authorized.
6. Match synthesis to the clone's actual provider and supported model. Replacing a recording, deleting a voice or creating an additional provider copy requires the applicable explicit request and consent. Never silently replace a clone with a stock voice after failure.
