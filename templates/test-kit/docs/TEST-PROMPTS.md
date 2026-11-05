# Read-only testing

## 1. Account connection

> Use CreativeOtter get_capabilities and manage_account overview. Report the actual backend version, workspace ID, available/reserved credits and permissions. Do not generate, quote, claim, upload, spend credits, change settings or edit files.

Expected: authenticated account and a real workspace. Account reads spend no generation credits. Record actual results rather than assuming a fixed version or balance.

## 2. Shared workspace

Repeat the account prompt in another assistant after signing in with the same CreativeOtter account. Workspace IDs and current credit state should agree. Different accounts should not expose each other's libraries. Do not copy tokens between clients.

## 3. Existing image

Use only an ID returned for your own saved image:

> Open my existing saved image with generation ID [your existing ID] and execution source [native or provider]. Use the appropriate existing-result tool or show_image_gallery. Do not create, quote, claim, regenerate, upload or spend credits. If the image is unavailable, report that error.

Replace the brackets with your own actual ID/source. Provider IDs are quote IDs. The kit deliberately contains no owner's private image IDs. Inline UI depends on the client; use the returned authenticated CreativeOtter link when it cannot render MCP Apps.

## 4. Refresh and recovery

Close and reopen your assistant normally, then repeat the account read. The host should reuse/refresh OAuth when available. An intentionally disconnected connection should require sign-in again; do not revoke other clients merely to test this kit. Unsupported scopes, expired requests, and temporary service failures have different messages.

If skills are visible but tools are absent, inspect the actual MCP connection, its auth state and media permission before restarting. Website login alone does not connect the assistant. Reload discovery after permission changes. Avoid duplicate manual/plugin servers; start a new chat if the host keeps an old tool catalog.

## Optional paid image test

Only request generation intentionally after the free connection checks pass. An explicit generation request authorizes that requested output and its configured CreativeOtter credit charge. No generation is part of the packaging test. Check current capabilities; bundled skill names do not guarantee that video, music, voice or every provider is enabled.
