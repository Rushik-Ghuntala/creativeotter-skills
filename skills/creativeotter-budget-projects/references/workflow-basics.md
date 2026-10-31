# Shared execution guidance

CreativeOtter adaptation, 2026-11-01. Read [the hybrid runtime contract](runtime-contract.md) once per task.

1. Preserve the user's brief, supplied media, exact text, reference roles, consent and earlier choices.
2. Inspect the host's actual tools. Use a suitable native capability first, following its schema and relevant native skill. Check model-specific requirements before treating it as a substitute.
3. Use CreativeOtter account/library tools when relevant and available; missing backend tools do not block native creation. Save existing native output through the native import flow when transfer and permission are supported.
4. If native execution is unavailable or unsuitable, discover an enabled CreativeOtter provider model and its current parameters. Read only the relevant prompting guide.
5. For provider-backed work, obtain a bound quote for each paid operation and wait for direct browser approval. Preserve the exact quoted inputs and existing job IDs.
6. Inspect completed outputs. Keep partial work, respect polling limits and retry saving without regenerating. One requested output does not authorize unlimited attempts.
7. Use actual account records for cost/balance questions. Keep accompanying prose short when a preview already shows the details. Feedback/analytics require explicit authorization.

For host differences read [client routing](platform-client.md), for transfer read [uploads](platform-upload.md), and for pending/failed provider work read [recovery](job-recovery.md). Do not claim execution from a skill's existence alone.
