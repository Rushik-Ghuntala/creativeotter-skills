# Private image uploads

CreativeOtter adaptation, 2026-11-01. Follow [the paid runtime contract](runtime-contract.md).

Reference files use `create_upload_url`, a scoped byte transfer and `complete_upload`. Uploading a reference is not generation authorization. Reuse ready assets and refresh private links rather than importing duplicates.

New native outputs require a prior `prepare_native_generation` quote and successful `claim_native_generation`. After the host tool runs, call `create_native_output` with that exact generation ID and execution token, upload the existing PNG/JPEG/WebP bytes, and call `complete_native_output` with the same ID/token. No free post-generation import route is available. Retry saving the same output; do not generate again or claim a charge settled until finalization confirms it.

Local paths and attachment IDs are not remote URLs. Use supported transfer capabilities; preserve the existing output and report a delivery problem if transfer is unavailable. Keep tokens private. Never publish a private recording or image to feed another service. Other media formats require their own implemented billing/import contract.
