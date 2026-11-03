---
name: creativeotter-plan-video
description: Plan a CreativeOtter film as a reusable brief, ordered visual shot list and narration, without generating footage.
---

# Plan a film

CreativeOtter adaptation, 2026-11-04. Read [the runtime contract](references/runtime-contract.md).

Resolve the intended audience, format, length, story and any fixed dialogue from the user's brief. Reuse their approved decisions. Produce useful shot direction and continuity anchors; do not generate footage for a planning-only request.

When the connected tools advertise Studio planning, use `manage_projects` with section films and data.kind film to save the agreed brief. Find and reuse an existing film ID for updates. Save individual ordered shots using `manage_storyboards` with the film's project_id, explicit position, visual prompt, exact narration, duration_seconds and optional owned reference_asset_id. Reuse a returned shot ID to update it; a duplicate ordinal is an error rather than permission to append another shot. Read the saved storyboard to confirm order and duration. Link the returned CreativeOtter Studio film page when useful.

Planning and reference assignment do not spend credits. A budget_target_units value is a planning target, not an enforced cap. Creating actual keyframes, speech or clips requires separately available priced execution tools within the user's requested scope. If video or audio execution is disabled, retain the plan and say which steps remain unavailable. Never call an image billing claim to authorize video or narration.

If Studio planning tools are absent, provide the plan in chat and explain that it was not persisted. Do not invent a film ID, completion state or saved storyboard.
