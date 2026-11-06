---
name: creativeotter-render-html
description: "Create and revise motion-graphics videos with animated typography, shapes, transitions and logo reveals. Use for animated graphic designs, not still images or filmed footage."
---

# Create motion graphics and animations

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

This skill creates motion: animated typography, moving shapes, graphic sequences, transitions, logo reveals and short announcements. Deliver a visibly animated MP4, never a PNG or a still image held as video. Route still-image requests to creativeotter-generate-image. Existing logos, images, footage and audio may be animation ingredients. Do not generate extra source artwork, music or voice without a request and an available billing workflow.

Inspect `get_capabilities.html_rendering` and the tools actually exposed in this chat. The motion workflow is opt-in and requires a live worker and workspace price. If unavailable, offer editable animation source or a plan without claiming a rendered video or spending credits. Chromium, HyperFrames and FFmpeg render the composition; fal.ai and a separate paid authoring agent are not needed. Author the project with the current assistant.

Create a complete HyperFrames project: index.html contains a root with data-composition-id, data-width, data-height and data-duration; register its matching paused timeline in window.__timelines. Use pinned GSAP 3.14.2 from https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js (resolved locally by the worker). JavaScript compositions and nested data-composition-src files are supported. Bundle all other dependencies, fonts and media; no external network access or package scripts run. Frame timing must be deterministic and seekable, including backward seeks. Design an entrance, visible progression and readable finish.

Use MP4, even dimensions 128–1920, 1–30 whole seconds and 12/24/25/30 fps; prefer 30 fps. Settings must match the root. Name each audio/video element, bundle its file and specify data-start and data-duration. Audio supports fixed data-media-start, data-playback-rate (0.5–2), data-volume (0–2), loops and multiple tracks; mark an audible video's data-has-audio=true. HyperFrames owns video seeking. Audio automation, speed ramps, generated speech/music and arbitrary remote media are not supported by this renderer.

Save authored files with `save_motion_project`. For a complete ZIP, use `prepare_motion_upload`, PUT its existing bytes to the returned upload_url with application/zip, then `confirm_motion_upload`. ZIPs are private, bounded and validated; never execute their npm scripts. Saving a project spends no credits. Use the returned render_input with `prepare_render` and a stable fresh request_key. Estimates stop here. For an explicit animation request, continue directly with `render_design`; no extra browser approval or chat confirmation is needed. Reuse the same render_id after an uncertain response. Prices come from the live quote; never assume a test rate or use image quotes.

Poll `get_render` and show the CreativeOtter video panel. Only succeeded, saved and charged means ready. The panel offers playback, automatic private-link refresh, Download and Edit project. Do not substitute a host Canvas or raw HTML for this result. Confirmed failure releases reserved credits; uncertain saving reconciles the same render.

For changes, find the project with `list_motion_projects`, open its latest version with `get_motion_project`, and replace the required text files with `revise_motion_project`. Assets and all prior versions remain intact. Keep size/duration metadata consistent with edits. A new revision is free; render it only when requested. Existing videos use `list_renders` and `get_render`. Opening, refreshing and downloading spend no credits. Project ZIP downloads require the user's authenticated connection and include editable source; never publish private source. Keep replies short and friendly, without IDs, technical timestamps or processing internals. Never claim a download succeeded from a URL alone.
