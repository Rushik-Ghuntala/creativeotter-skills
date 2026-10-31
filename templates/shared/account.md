# Account and recorded charges

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](../runtime-contract.md).

Use the configured `manage_account` tool for the current workspace, balance, settings and ledger activity. Use only its exposed input fields; response pagination and field names are not established by inherited examples.

Match a charge to its job and ledger reference. Distinguish reserved funds, settled charges, released reservations and credited refunds. Never count the same transaction twice. A failed job is not proof of a refund; a missing amount is unknown. Read subsequent pages only if needed to answer the question. Do not expose unrelated activity.

For future work obtain a bound quote; an estimate-only question must not start a generation. Report credit units as returned, including their display scale. Do not invent a fixed money-to-credit conversion, membership discount, trial or included generation.

Credit purchases and account changes happen through the current authenticated web link returned by the server. Reading account activity does not buy credits, issue refunds or change settings. Use a returned support URL for a discrepancy; do not invent a support mailbox or promise an outcome. Submit product feedback only on explicit user request.
