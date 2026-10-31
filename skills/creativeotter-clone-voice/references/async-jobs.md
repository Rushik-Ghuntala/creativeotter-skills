# Asynchronous jobs

CreativeOtter adaptation, 2026-11-01.

Follow [job recovery](job-recovery.md) and [the runtime contract](runtime-contract.md). Preserve the exact job identifier returned by the configured tool. Use `check_job` only when exposed, after generation starts and when a downstream step or user status request needs it. Respect returned polling intervals and stop after bounded checks with an honest pending status. Do not assume an inline widget will track the job. Save the final workspace asset ID and use a current signed media link for delivery.
