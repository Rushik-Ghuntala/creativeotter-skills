# Backend contract for these skills

This document describes the intended integration, not implemented services. The backend remains a separate Next.js/Supabase product without Clerk. No API keys are needed to build these packages.

## First connection proof

Serve MCP over a stable, reachable HTTPS endpoint with the transport supported by the target clients. Configure current OAuth discovery and authorization correctly; use Supabase identity with per-request workspace membership and client-grant checks. Skill packages must never carry secrets. An endpoint-only package build does not configure OAuth or prove the endpoint works.

Begin with read-only `get_capabilities` and `manage_account`. Confirm the same signed-in workspace is accessible from Codex and Claude, and cross-workspace access fails. Host-native attachment imports and widgets are optional; start with text and authenticated web links.

## First image workflow

The planned tools are `list_models`, `get_model_params`, `estimate_generation`, `generate_image`, `check_job`, `get_upload_url`, `confirm_upload`, `search_assets`, `show_media`, `load_image` and `update_asset`. Implement only the operations needed for one real image model initially. Actual exposed JSON schemas are authoritative; inherited guide examples do not define them.

1. Select a currently enabled model and validate reference ownership and supported inputs.
2. Quote exact canonical inputs and return a single-use `quote_id`, expiry, maximum credit charge and applicable approval flow.
3. `generate_image` accepts that quote ID and matching inputs. In initial Review mode it prepares a durable request and returns an authenticated web approval link. The assistant cannot approve it. Do not submit the provider job before direct user approval.
4. Atomically reserve credits and enqueue the approved job; dispatch through an idempotent worker. Reconcile unknown submissions rather than blindly resubmitting.
5. Verify provider callbacks, deduplicate events, copy valid outputs into private workspace storage and settle once. Return a saved asset ID and current delivery link. Ingestion failure must not regenerate the media.

The planned financial scale is 1,000 integer ledger units per displayed credit, serialized as decimal strings when precision matters. Provider costs are separate from retail credits. The actual backend must define these fields in its schema; the skill must not infer or invent balances, charges or refunds.

## Capability expansion

All other skills are present for adaptation, but their tools are not implemented here. Expose capabilities only after their own model/provider, quote, consent, asynchronous execution, storage and failure-recovery paths work. Every paid operation, including edits, assembly, cloning and rendering, needs the same applicable quote/approval guarantees. An unquoted legacy operation is not a fallback.

Retain these boundaries:

- Private uploads and asset IDs across clients; no fabricated attachment transport or permanent public URLs.
- Current model schemas/defaults, supported parameters and prices from the backend, not hardcoded inherited routes.
- Consent and provider deletion flows before voice cloning; no transplanted consent form or invented privacy policy.
- Explicit opt-in for any later Auto mode, with finite limits enforced server-side.
- Feedback only on explicit request, and optional skill attribution off until the user explicitly opts in.
- Read-only account tools cannot purchase credits, issue refunds or approve a paid request.

Live checks must cover OAuth, tenant isolation, duplicate requests/callbacks, quote expiry, unknown provider submission, ingestion recovery, direct approval, private download links and cross-client asset reuse before claiming generation support.
