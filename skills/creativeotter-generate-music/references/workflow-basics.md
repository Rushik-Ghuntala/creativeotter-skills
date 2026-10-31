# Shared execution guidance

CreativeOtter adaptation, 2026-11-01. Read [the paid hybrid runtime contract](runtime-contract.md).

1. Preserve the brief, references, model requirements, exact text and consent. Planning can continue without generation authorization.
2. Inspect actual host tools and prefer a suitable native engine to reduce operating cost. Both native and API generation spend CreativeOtter credits.
3. Before any native image call, obtain `prepare_native_generation`, direct browser approval and a successful `claim_native_generation`. Missing pricing, funds or connection stops generation; do not bypass with a direct host call.
4. Invoke the claimed native operation once, then upload and finalize its existing result using the same execution token. Report uncertainty for reconciliation; do not regenerate after a lost claim or upload failure.
5. For API fallback, inspect enabled model parameters, obtain a bound credit quote and wait for direct browser approval. Other media need their own implemented billing workflow.
6. Inspect confirmed outputs and ledger state. Keep retries within the existing operation. Reuse completed assets when appropriate; a new generated take requires its own approved quote.

Read [client guidance](platform-client.md), [uploads](platform-upload.md) or [recovery](job-recovery.md) when relevant. Feedback and analytics require explicit authorization.
