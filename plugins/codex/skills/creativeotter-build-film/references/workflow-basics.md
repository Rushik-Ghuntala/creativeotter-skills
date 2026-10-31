# Shared execution guidance

CreativeOtter adaptation, 2026-11-01. Read [the paid hybrid runtime contract](runtime-contract.md).

An explicit generation request authorizes its requested output and configured credit charge. Continue without an extra confirmation or browser review. Estimate-only requests spend nothing. Honor user budgets and do not add unrequested takes.

1. Preserve the brief, references, model requirements, exact text and consent. Planning can continue without generation authorization.
2. Inspect actual host tools and prefer a suitable native engine to reduce operating cost. Both native and API generation spend CreativeOtter credits.
3. Before any native image call, obtain `prepare_native_generation` and immediately a successful `claim_native_generation` for the requested image, without browser approval. Missing pricing, funds or connection stops generation; do not bypass with a direct host call.
4. Invoke the claimed native operation once, then upload and finalize its existing result using the same execution token. Report uncertainty for reconciliation; do not regenerate after a lost claim or upload failure.
5. For API fallback, inspect enabled model parameters, obtain a bound credit quote and immediately call `generate_image` for the requested image. Other media need their own implemented billing workflow.
6. Inspect confirmed outputs and ledger state. Keep retries within the existing operation. Reuse completed assets when appropriate; a new generated take requires a fresh quote and user-requested scope.

Read [client guidance](platform-client.md), [uploads](platform-upload.md) or [recovery](job-recovery.md) when relevant. Feedback and analytics require explicit authorization.

For two or more saved images, call `show_image_gallery` to present them together in the CreativeOtter viewer. Reopening a saved gallery never authorizes regeneration or credit spending.

If a chat has an older tool catalog, use the runtime contract’s explicit connection-refresh guidance and exact-ID CreativeOtter gallery link. Do not stop at “combined viewer unavailable” or generate new images for display.
