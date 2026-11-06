# Account and recorded charges

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](../runtime-contract.md).

For saved-image requests, use the library and gallery tools; do not open this panel unless the user also asks about their account.

Use the configured `manage_account` tool for the current workspace, balance, settings and ledger activity. Use only its exposed input fields; response pagination and field names are not established by inherited examples.

When the user asks to check the connection or account, call `manage_account` with `section: "overview"`; use `activity` or `settings` when requested. `get_capabilities` alone does not open the account panel. UI-capable hosts render the account panel returned by this tool. Keep the accompanying answer to a short connection confirmation or the specific finding the user asked for; do not repeat every visible row or expose internal IDs. A balance question usually needs only “You have [live amount] credits available.” Hosts without UI still receive the same structured account data and account link. Say when billing or generation history is unavailable rather than inventing a zero balance or empty ledger.

Match a charge to its job and ledger reference. Distinguish reserved funds, settled charges, released reservations and credited refunds. Never count the same transaction twice. A failed job is not proof of a refund; a missing amount is unknown. Read subsequent pages only if needed to answer the question. Do not expose unrelated activity.

For future work obtain a bound quote; an estimate-only question must not start a generation. Report credit units as returned, including their display scale. Do not invent a fixed money-to-credit conversion, membership discount, trial or included generation.

Credit purchases and account changes happen through the current authenticated web link returned by the server. Reading account activity does not buy credits, issue refunds or change settings. Use a returned support URL for a discrepancy; do not invent a support mailbox or promise an outcome. Submit product feedback only on explicit user request.
