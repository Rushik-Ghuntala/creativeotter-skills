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

## Delivery, ledger and privacy

Report the execution source and authoritative quoted/reserved/charged/released credit state. Historical legacy records with no charge are not a current free tier. Never invent a credit balance, fixed price, trial, retention or refund promise. A quote is not a charge; a reservation reduces available credits before execution. Confirmed saved delivery settles it once.

Use private scoped assets and refresh expired links through their owning tools. Local paths and attachment IDs are not remote URLs; use supported transfer mechanisms without publishing private files. If transfer fails, preserve the existing result, report the unresolved delivery and reservation, and do not claim saved fulfillment. Keep execution tokens, signed upload credentials and provider keys out of user-facing text.

This direct image workflow does not waive likeness/voice consent or host-enforced permissions. Creative review stages for collaborative productions remain separate; recognize user approval already given. Feedback and telemetry require explicit authorization and supported endpoints. Never forward private paths, media or chat history to another product's analytics.
