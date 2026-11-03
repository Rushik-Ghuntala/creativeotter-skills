# CreativeOtter paid hybrid runtime

CreativeOtter adaptation, 2026-11-01. This contract takes precedence over inherited model examples.

## Generate on explicit request

Native-first reduces CreativeOtter operating cost. **Native and API generation both spend CreativeOtter credits.** An available host tool, missing provider key, zero backend inference cost or `media_generation: false` never authorizes free CreativeOtter execution. Account reads, planning and reference uploads are not generation.

Inspect the actual host tools and preserve the user's requested model, references and outcome. Prefer a suitable native engine, but call CreativeOtter billing tools before invoking it. `resolve_generation_route` selects an engine; it is not execution permission. If authentication, pricing, funds or the required billing workflow is unavailable, stop generation and explain the missing prerequisite. Do not silently bypass CreativeOtter by invoking the native tool directly or relabel an unbilled native result as a CreativeOtter generation.

Only image-native billing is currently implemented. Other native media workflows need an advertised matching quote/reservation/execution contract; do not use an image quote to authorize video, voice, music or rendering. Skills and inherited guides do not establish backend availability.

## Paid native image workflow

1. Finalize exact prompt, ratio, resolution and owned reference IDs. Call `prepare_native_generation` with those inputs, the real host, a model name only if actually reported (otherwise null), expected image MIME and a stable UUID `request_key`. A quote is not a debit or generation authorization.
2. An explicit request to generate authorizes that requested image and its configured CreativeOtter credit charge. Continue immediately to the execution claim without asking for another confirmation or opening a browser review page. An estimate-only, planning-only or account question does not authorize generation: return the quote or answer and stop without claiming. Honor any user budget ceiling. Missing or insufficient credits stops execution.
3. Call `claim_native_generation` directly for the requested image; it atomically reserves sufficient credits and claims execution once. Only a successful response with `claimed: true`, reserved credits and its execution token authorizes one host-native image call using the returned fixed inputs. Keep the token private. A duplicate/lost claim or uncertain native outcome requires reconciliation, not another generation.
4. Invoke the actual native tool once under its own schema and native skill. Respect model requirements and safety refusals. Do not claim an unreported model or treat refusal as a reason to switch providers.
5. Call `create_native_output` with the claimed `generation_id` and `execution_token`, transfer the existing PNG/JPEG/WebP bytes using its signed upload method/MIME, then call `complete_native_output` with the same ID/token. Confirm saved output and the actual credit state. Upload/validation retries reuse the same result and reservation; never regenerate merely to retry saving.
6. For interrupted, failed or unknown host outcomes, call `report_native_outcome` with the existing ID/token. Credits remain reserved for operator review. Do not promise a refund based solely on a client report. Unclaimed work can be cancelled in the authenticated web page; claimed work cannot be self-refunded.

Host-native usage limits/charges may also apply independently of CreativeOtter credits. The backend enforces CreativeOtter reservations and saved delivery; it cannot disable a user's independent tools outside this product. Do not imply a global paywall around the host.

## Provider fallback

If native is absent or unsuitable, inspect the configured **creativeotter** server's `get_capabilities`, `list_models` and `get_model_params`. Other plugins are not silent substitutes. Obtain a bound `estimate_generation` quote for exact inputs, then immediately call `generate_image` with its quote ID for an explicit generation request. This reserves credits and starts one job without a separate browser approval. Estimate-only requests stop before `generate_image`. A changed input requires a fresh quote. Extra takes, batches and model comparisons require the user to request that additional scope; do not silently add them.

Use only implemented, configured adapters. Operators provide API credentials; customers never paste keys into chat. Do not run a second engine after a safety refusal, uncertain native outcome or saving failure. Native and provider operation IDs are distinct; keep the original request for recovery.

## Multi-image delivery

For two or more saved images, carousel slides or campaign outputs, call `show_image_gallery` with a short title and the original ordered list of `{ generation_id, execution_source }` returned by CreativeOtter. For provider results use the quote ID as generation_id. This opens the CreativeOtter embedded viewer with thumbnails, per-image Output/Inputs, favorites and download. Also use it when the user asks to show existing slides together. This is a read-only display operation: reuse saved images and never prepare, claim or regenerate merely to reopen the gallery. Viewing needs media read access; it does not require new credit pricing or funds.

Keep the branded gallery as the primary combined presentation when the host supports MCP Apps. Do not replace it with a host Canvas, artifact slideshow or raw Markdown image gallery. Keep final prose brief and let the widget present the images. If the gallery tool is missing from this chat's tool catalog, call `get_capabilities` once to read the server’s `gallery_endpoint` and confirm its current capabilities. This call does not itself refresh the host’s cached tool catalog. If it is still missing, build the authenticated CreativeOtter gallery link with `items=native:<generation-id>,provider:<quote-id>,...` in the exact requested order and a URL-encoded `title`. Use only IDs from the explicitly requested saved set; do not search for or automatically add other private images. Present that branded gallery link and explain that refreshing the MCP connection enables its embedded tool. Do not replace the saved set with Canvas or a generic host gallery. A UI discovery failure never authorizes regeneration. The host may independently show native tool previews while generation runs; our gallery presents the saved CreativeOtter results.

## Saved Studio records

Studio operations are available only when exposed by the connected backend. A local website update does not prove the production connector was deployed. Use current tool schemas and returned IDs.

- `manage_themes` saves brand colors, typography, tone and an owned logo asset ID. Load the intended kit before constructing a generation prompt; do not invent automatic brand application.
- `manage_characters` saves character direction and an owned canonical reference asset ID. It does not train a model, create a voice clone or guarantee identity consistency. Use fictional characters, the user's own likeness or explicitly authorized likenesses.
- `manage_projects` handles campaign, film and music briefs. `manage_storyboards` saves a film's explicitly ordered visual/narration shots. Planning and saving these records are not media generation.
- `manage_voice_presets` saves language, voice direction and scripts; a preset is not a provider voice. Browser auditions are unsaved browser previews. If speech, cloning, music, video or rendering tools are unavailable, explain that media execution is unavailable; do not label a saved brief as generated output.
- `assign_project_asset` attributes only the exact saved assets requested by the user. One asset belongs to at most one project. Read the project's historical assigned charges; assignment does not charge again or alter the original ledger. A planning budget target is not an enforced spending cap.

List/get before an ambiguous update; preserve the intended existing ID. Archive/restore are reversible and do not delete saved media. Direct account settings and teammate invitations belong in the authenticated app, not assistant tools. Do not expand workspace access through a creative-record operation.

## Delivery, ledger and privacy

Report the execution source and authoritative quoted/reserved/charged/released credit state. Historical legacy records with no charge are not a current free tier. Never invent a credit balance, fixed price, trial, retention or refund promise. A quote is not a charge; a reservation reduces available credits before execution. Confirmed saved delivery settles it once.

Use private scoped assets and refresh expired links through their owning tools. Local paths and attachment IDs are not remote URLs; use supported transfer mechanisms without publishing private files. If transfer fails, preserve the existing result, report the unresolved delivery and reservation, and do not claim saved fulfillment. Keep execution tokens, signed upload credentials and provider keys out of user-facing text.

This direct image workflow does not waive likeness/voice consent or host-enforced permissions. Creative review stages for collaborative productions remain separate; recognize user approval already given. Feedback and telemetry require explicit authorization and supported endpoints. Never forward private paths, media or chat history to another product's analytics.
