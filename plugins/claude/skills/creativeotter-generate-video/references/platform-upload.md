# Private media uploads

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](runtime-contract.md).

Reuse a ready workspace asset when possible. Refresh its signed links rather than importing it again.

For reference files, inspect the live upload schema. The current image backend exposes `create_upload_url` and `complete_upload`: prepare the upload, transfer the selected PNG/JPEG/WebP bytes with the returned method/content type, then finalize and retain the asset ID. A successful byte transfer alone is not a ready asset. For native generated images use `create_native_output` and `complete_native_output` instead, with a stable import request key. Retry transferring or saving the same result after an upload error; do not generate another image.

Local paths and conversation attachment IDs are not downloadable URLs. Use a supported host file-transfer capability. If none is available, deliver the native result and use the authenticated library upload page returned by the server when the user wants to save it. Do not invent a signed URL or claim that a host attachment has been imported.

Import public URLs only through a supported import capability. Keep private recordings private and separate voice-cloning consent. Never make a private file public merely to feed a provider. Do not expose scoped upload tokens in user-facing prose.
