# CreativeOtter runtime contract

CreativeOtter adaptation, 2026-11-01. Read once per task, before applying a workflow or provider guide.

## Connection and available capabilities

Use only tools belonging to the configured **creativeotter** MCP connection. A tool with the same name on another service is not interchangeable. This repository contains instructions, not a running generation service. The default packages deliberately have no active MCP URL. If tools are absent, explain that the backend must be deployed and the package rebuilt with its real HTTPS endpoint; do not send the user to another product or invent a sign-in page.

When connected, call `get_capabilities` if exposed and use its enabled operations, schema version and default models. Otherwise inspect the actual exposed tools. An installed skill is not evidence that its backend exists. Stop only the unavailable execution branch; planning and prompt drafting can continue. Do not promise Studio, widgets, examples, voices or models that the server does not advertise.

## Schemas and model guides

The exposed tool schema defines top-level inputs. `get_model_params` defines current settings for a selected model. Both take precedence over copied examples and provider guides, which are prompting references, not an availability or pricing catalog. Discover models through `list_models`; honor an explicitly requested available model and never silently substitute one. Use the server's advertised default where suitable. No packaged model ID is a CreativeOtter default merely because it appears in a guide.

## Paid requests and approval

Before **each** paid operation, obtain a quote through `estimate_generation` or the server's advertised equivalent using the exact normalized inputs. Preserve its `quote_id`, expiry, maximum charge and review link. Pass the quote ID only in a field the actual execution schema declares. If the required quoting/execution contract is missing, stop paid execution and explain the missing integration; never fall back to an unquoted paid call.

Initial CreativeOtter behavior is Review: execution prepares a request and returns an authenticated web approval link; the user approves the bound request directly. A chat instruction is not that browser approval. Do not click approval, self-approve, poll while approval is pending, or assume a widget is present. Changed inputs, expired quotes and additional takes need a fresh quote. Auto execution is permitted only when the server reports the user's explicit opt-in and finite spending limits. An estimate-only request never starts work. For batches, include keyframes, audio, editing and rendering in the cost plan, and obtain the applicable quote for each operation.

## Jobs, assets and reporting

Keep returned quote, job, project and asset IDs distinct. A job is unfinished until the server confirms success with a saved asset. Honor `retry_after` and bounded status checks. For an unknown submission outcome, retain the job and reconcile it; never blindly submit another generation. A failed ingestion is not permission to regenerate the provider output. Ask before a replacement paid attempt unless that attempt was already explicitly requested and remains within the server's limits.

Prefer workspace asset IDs. Use private uploads and server-returned signed URLs where supported; never promise permanent or public links. A local file path or attachment identifier is not a remote URL. Refresh an expired link through the owning asset rather than importing it again. Explain any inspection limitations honestly.

Read balances, charges, refunds and retention from current account/policy results. Missing amounts are unknown, not zero. No fixed credit rates, trials, included generations, refund guarantees, retention periods or voice quotas are established by these packages.

Feedback is sent only when the user explicitly asks to report it. Workflow attribution (`skills_used`) is off unless the user has explicitly opted in and the server exposes the field. Never send prompts, media, local paths, conversation history, private data or another plugin's identity as analytics. Share only current CreativeOtter support/policy URLs returned by the configured backend; do not invent a mailbox or domain.

This contract defines the CreativeOtter integration. Conflicting commercial, model-default, widget, consent-form or API details in inherited references are not implemented behavior. Use their creative guidance only after checking current capabilities.
