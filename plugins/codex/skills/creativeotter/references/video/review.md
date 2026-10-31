# Requested generation and optional creative review

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](../runtime-contract.md).

An explicit request to generate authorizes the requested output at the configured credit price. For native images, prepare the bound quote and immediately claim execution to reserve credits; for API images, prepare the quote and immediately call `generate_image`. No separate browser review or confirmation is required. The internal `awaiting_approval` state means a quote has not started; it does not impose a browser step. Missing funds, expired quotes and unavailable adapters stop execution.

Estimate-only and planning-only requests do not authorize spending. Do not start, claim or poll a new generation in response to those requests. Preserve any user budget limits and requested count. A new take or additional output needs a user request covering that scope. Never duplicate an uncertain execution.

Keep explicit creative review stages for multi-stage productions when applicable, honoring approvals already given. Identity and voice consent remain required independently. Unsupported media need their own advertised billing/execution contract; an image claim cannot pay for video or voice.
