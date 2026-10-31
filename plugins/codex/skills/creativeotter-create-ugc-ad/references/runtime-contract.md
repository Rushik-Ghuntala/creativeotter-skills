# CreativeOtter hybrid runtime contract

CreativeOtter adaptation, 2026-11-01. This routing contract takes precedence over provider-specific steps in inherited guides.

## Native first

Inspect the actual tools available in the current host for the requested operation. Skills describe workflows; their installation does not prove that a generator exists. Prefer a matching built-in host tool or local code/rendering capability. In Codex, use the native image-generation tool and its imagegen guidance when available. Do not ask for a provider API key to use an available built-in tool. Host usage limits or charges can still apply; do not describe native work as universally free.

A native tool must satisfy the requested outcome, reference/edit requirements and any explicitly requested model. Do not label a native output as Nano Banana or another model unless the host actually identifies that model. Do not silently replace an explicitly requested model. A safety refusal is not a reason to switch providers. For an unknown outcome, reconcile the native attempt before starting another generation.

Backend unavailability, missing media permissions, or `media_generation: false` do not disable an independent native tool. CreativeOtter's capability response distinguishes its provider adapter from host-native availability. If `resolve_generation_route` exists, use it to confirm routing after inspecting host tools; never report an uninspected host tool as available.

Provider tool sequences and model guides below apply to the provider branch. For native execution, use that host's actual tool schema and applicable native skill. Do not call a second generator merely to reproduce a provider-specific sequence. A successfully generated native result is already an output; a saving failure does not authorize regeneration.

## Save native results when supported

Deliver the native result even if optional library saving is unavailable. When the CreativeOtter connection supports native imports and has media permission, call `create_native_output` with the exact prompt, reported host/model (model may be null), owned reference asset IDs, actual output MIME and a unique `request_key`. Reuse that key only for the same import and inputs. Upload the existing file bytes to the returned `signed_url` using its method/content type, then call `complete_native_output` with the returned `generation_id`. A private upload is not a saved generation until completion confirms a ready asset. `get_native_generation` refreshes existing private links without generation.

Local paths and host attachment IDs are not remote URLs. Use a supported host transfer capability; otherwise give the native preview/download and the returned web upload link when available. Do not fabricate a saved library record or send private content to another service. Do not expose scoped upload credentials in the user-facing reply.

## Provider fallback

If no suitable native tool is available, or the user explicitly requests an available provider model, use only the configured **creativeotter** MCP server. Other products' similarly named tools are not interchangeable and are not a silent fallback. Inspect `get_capabilities`, `list_models` and `get_model_params` for enabled adapters and current input placement. A packaged guide is not proof that its model, pricing, UI or feature is implemented.

Obtain a bound quote through `estimate_generation` for the exact normalized inputs before every provider-backed paid operation. Preserve the `quote_id`, expiry, maximum estimate and authenticated review link. Use `generate_image` or the advertised execution tool with only the fields its schema declares. Initial provider behavior is Review: the user approves the bound request directly in the authenticated browser. A chat instruction or a native generation is not provider spending approval. Do not click that approval, self-approve, change quoted inputs, or run another take without a fresh quote and approval. An estimate-only request never starts work.

The operator configures server-side provider credentials and a finite workspace budget. End users do not paste API keys into chat. If the required fallback is unavailable, explain the missing capability and keep planning or native delivery useful. Do not represent unavailable video/audio/editing adapters as implemented.

## Jobs, private assets and reporting

Keep native generation, quote, provider job and asset IDs distinct. A provider job is unfinished until a valid output is saved in private storage. Honor bounded polling and retry intervals. For unknown submission outcomes retain and reconcile the existing job; never blindly resubmit. Failed ingestion means retry saving the same output, not generate again.

Prefer owned workspace asset IDs and current signed URLs. Refresh expired links through the owning asset. Inspect the result with available tools and state inspection limits. Report the actual engine/source and cost category: native host usage, provider estimate, or recorded charge. Missing billing amounts are unknown, not zero; no copied fixed prices, trials, retention or refund guarantees apply.

Consent for likeness/voice, approval of creative direction and provider spending approval are separate. Feedback and workflow attribution are off unless explicitly requested and supported. Never send another plugin's identity, private paths, conversation history or private media as analytics. Use only current support/policy URLs returned by our backend.
