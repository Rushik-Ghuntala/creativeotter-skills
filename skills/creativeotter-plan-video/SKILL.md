---
name: creativeotter-plan-video
description: "Write a video brief, script and ordered shot list, and save a CreativeOtter film storyboard when requested. This workflow does not generate footage or speech."
---

# Plan a video

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Resolve audience, format, length, story and fixed dialogue from the brief. Produce clear visual direction, narration and durations, preserving continuity. Planning-only requests never authorize paid keyframes, clips or voiceovers.

When the user asks to save or continue a film, use `manage_projects` section films, data.kind film. Find the intended existing record first. Save shots through `manage_storyboards` with project_id and shot containing position, prompt, narration, duration_seconds and reference_asset_id (owned image or null). Use id to update an existing shot and list again to verify order; a duplicate position is not a request to append another shot. See [Studio records](references/studio-records.md).

Current video, speech and assembly services are unavailable. A saved storyboard is a plan, not a rendered film. State that limit if production was requested; offer the useful plan without pretending footage exists. If tools are absent, provide the plan in chat and say it has not been saved. Budget targets are planning values, not spending caps.
