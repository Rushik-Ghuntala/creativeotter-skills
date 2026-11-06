# Recover an existing image operation

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](runtime-contract.md).

For provider work use check_job with quote_id. For native work use get_native_generation with generation_id. Never pass a provider job ID to check_job or infer a generation ID from an asset ID.

| State | Action |
| --- | --- |
| Unstarted quote / awaiting_approval | For a previously explicit image request start once through claim_native_generation or generate_image. An estimate-only request stops; do not poll a quote or ask for an extra browser approval. |
| Queued / submitting / submitted / generating / saving | Read the same operation as needed; retain its quote/generation ID. Do not create a replacement. |
| needs_reconciliation / unknown outcome | Inspect the existing operation. Report interrupted native work with report_native_outcome using its execution token. Do not self-refund, switch engines or start again. |
| save_failed / awaiting_upload | Retry delivery or status recovery for the existing output. Do not regenerate just to obtain a downloadable file. |
| succeeded | Show only the confirmed private saved output and current preview/download links. |
| failed / cancelled / expired | Report the actual outcome and known credit state. A new attempt requires a user request covering it and a fresh supported quote. |

A lost native claim does not authorize another host call. A successful upload needs complete_native_output before fulfillment is confirmed. A failure is not proof of a refund. For billing questions read manage_account activity rather than inferring charges from balance changes.
