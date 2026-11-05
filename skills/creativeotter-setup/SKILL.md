---
name: creativeotter-setup
description: Guide a first CreativeOtter connection and tour based on enabled capabilities. Use for setup, getting started or a tour; route a specific media request to its focused skill.
---

# Set up CreativeOtter

CreativeOtter adaptation, 2026-11-01. Read [the runtime contract](references/runtime-contract.md) and [client guidance](references/platform-client.md).

1. Introduce native-first routing: inspect the host’s actual media tools and prefer a suitable native engine without requiring a provider key. The CreativeOtter connection, configured credit pricing, sufficient funds and a paid execution claim are still required; never invent a URL or claim a missing native generator exists.
2. Check actual connection/authentication state when tools are missing, following the runtime contract's connection recovery guidance. Once connected, use `manage_account` and `get_capabilities` for the current workspace. Verify media permission separately before attempting generation. Introduce only enabled features relevant to the user's goal. Do not promise free credits, an included first video, a fixed catalog or a ready-made Studio.
3. Ask what the user wants to make if they have not said. A request for a tour does not authorize paid examples. For an explicit image request, use `creativeotter-generate-image`; for another outcome, use its matching skill and enabled tools.
4. Import references only when needed, using private upload routes. Save a Character or theme only when the user wants it and its tools are enabled. Likeness approval, voice consent and spending approval are separate.
5. For a requested sample, use a suitable native tool first. Both native and API samples need a CreativeOtter credit quote. Start the requested sample immediately: native execution claims/reserves once; API execution calls `generate_image`. Do not add browser approval or another confirmation. Avoid automatically chaining an image, video, voice audition and extra versions.
6. Show confirmed saved assets through available previews or links. Open Studio only if requested and a current link is returned. Offer the next relevant capability without claiming it has been implemented merely because its skill is installed.
