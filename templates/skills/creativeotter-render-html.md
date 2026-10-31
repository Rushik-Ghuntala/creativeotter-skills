---
name: creativeotter-render-html
description: Render HTML/CSS to an image or an HTML/HyperFrames motion composition through enabled CreativeOtter tools. Use for explicit code-based rendering or motion graphics, not ordinary generated imagery or filmed-looking video.
---

# Render HTML and designed motion

CreativeOtter adaptation, 2026-11-01. Read [the runtime contract](references/runtime-contract.md).

Use only when the user explicitly asks for HTML/CSS, HyperFrames, code-based rendering or motion graphics, supplies HTML, or accepts this method. Ordinary image requests belong to `creativeotter-generate-image`; filmed-looking footage belongs to video workflows.

## Choose the available route

- `render_html_image`: exact HTML/CSS layout to a static image, if enabled.
- `render_html_video`: render an existing composition or uploaded project using its current accepted source fields.
- `generate_html_video`: a hosted composition agent, only if the backend explicitly advertises it. Do not assume an agent, a fixed reserve, default effort, included media budget or review card exists.
- Saved template tools: use only when enabled and appropriate to the user's requested layout.

## Workflow

1. Resolve output dimensions, duration, FPS, format, exact text, intended motion and source assets. Retain an explicit source/code choice.
2. Check the live schema and enabled rendering method. Read [composition contract](references/composition-contract.md), then only the relevant [DOM motion](references/dom-product-motion.md), [canvas/WebGL](references/canvas-webgl.md) or [project packaging](references/project-packaging.md) guide.
3. Use private workspace asset references through the renderer's advertised mechanism. Do not expose private media publicly to make HTML work. Bundle project resources when required and supported. Imported code and dependencies must stay within the renderer's isolation limits.
4. Make deterministic, seekable motion with explicit timing. Keep narration and music separate; use a paused orchestration timeline where appropriate. Verify fonts, asset loading, video mute behavior and audio sync.
5. Quote each paid render or agent turn with exact inputs. Account for generated media separately when applicable and set only supported finite budget fields. Execute only through the advertised billing contract within user-requested scope; do not impose an extra browser approval unless the current tool explicitly requires one. An edit to an existing cloud project is a new quoted operation, not a free retry.
6. Track the returned job/project identifiers without assuming they are interchangeable. Inspect the saved encoded output for text fit, safe zones, motion, timing and audio. State inspection limits and deliver a current asset link.

No fixed credit reserve, refund guarantee, permanent public URL, automatic preview card or catalog of examples is established by this skill. Continue with a plan/code draft when the requested backend route is unavailable.
