# Shared execution guidance

CreativeOtter adaptation, 2026-11-01.

Read [the runtime contract](runtime-contract.md) once per task. It defines connection checks, current schemas, quotes, direct web approval, private assets and bounded recovery for all skills.

1. Use the user's brief, supplied media and earlier choices. Ask only for missing details that materially affect execution.
2. Check the configured CreativeOtter tools and enabled capabilities. Reuse known asset IDs; search the library only when continuity or saved media matters.
3. Discover a suitable enabled model and read its current parameters. Read only the relevant packaged prompting guide; do not copy model IDs or commercial terms as defaults.
4. Preserve exact visible copy, spoken wording, reference roles, consent and approved creative constraints. Consult speech-localization guidance when pronunciation requires it, while honoring the user's requested wording and pronunciation style.
5. Obtain a bound quote for each paid operation and prepare the request using the quoted inputs. In Review mode give the returned approval link and wait for the user's direct browser approval. Do not use an MCP tool or browser automation to approve it.
6. Track the existing job to completion only when needed, respecting polling intervals. Keep partial results. One requested output does not authorize unlimited takes or attempts.
7. Inspect completed media with available client capabilities. State what could not be inspected. Save useful names and tags without discarding existing metadata.
8. For account questions, use current ledger evidence. Feedback and optional workflow analytics require explicit user authorization; ordinary product friction does not authorize transmission.

For missing tools or UI, read [client routing](platform-client.md). For imports read [uploads](platform-upload.md); for pending/failed work read [recovery](job-recovery.md). A capability absent from this package's backend can still be planned, but must not be claimed as executed.
