---
name: creativeotter-setup
description: "Help users connect CreativeOtter and discover its currently enabled image, library and planning features. A setup request does not authorize paid samples."
---

# Get started with CreativeOtter

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Use the existing CreativeOtter connection and its normal OAuth flow; a website login alone does not authenticate the assistant. Do not add a duplicate connection or invent authorization URLs. See [client guidance](references/platform-client.md).

Use `manage_account` overview and `get_capabilities` to verify the account and current permissions. Account-only access cannot expose saved images or prepare media. Explain missing media access using the current returned setup link. Native image generation also requires CreativeOtter billing and available credits; a host's image generator does not make it free.

Introduce enabled image creation/editing, private saved images, brand kits, characters and project planning. Introduce short silent motion graphics and animations only if live html_rendering availability is true. Still images and static graphics use generate-image. Filmed video and audio remain planning-only. A tour does not authorize paid samples or saving demonstration records. Ask what the user wants to make only when they have not said; use the focused skill for that outcome.
