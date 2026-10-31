# Private media uploads

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](runtime-contract.md).

1. Reuse a workspace asset ID when the media is already saved. Refresh expired signed URLs through that asset instead of importing again.
2. For a local file the client can read, request an upload with `get_upload_url` using its exposed schema, transfer the bytes only to the returned upload destination using a supported client capability, then call `confirm_upload` if required. Check purpose, size and MIME restrictions before transfer. A successful transfer alone is not a finalized asset.
3. For a conversation attachment, use a native import tool only when this CreativeOtter connection exposes one and accepts that host's attachment format. Host attachment IDs and filesystem paths are not downloadable URLs.
4. When the assistant cannot transfer the bytes, use the authenticated web upload link returned by CreativeOtter. Let the user upload there, then locate the finalized asset. Do not invent an upload page or an API call.
5. Import a public URL only with an advertised import capability. Keep private recordings private, particularly voice-clone samples. Never make an asset public just to satisfy a provider input.

Use returned IDs and media references in downstream tools according to current schemas. Do not claim permanent storage, a fixed retention period or universal cross-client attachment support.
