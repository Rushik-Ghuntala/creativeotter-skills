# Tool routing reference

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](runtime-contract.md). This is a map of intended tool roles, not proof that they are implemented. Use only tools actually exposed by the configured CreativeOtter connection.

| Capability | Tools to look for when enabled |
| --- | --- |
| Available operations and defaults | `get_capabilities` |
| Model discovery and parameters | `list_models`, `get_model_params` |
| Quotes and requested execution | `estimate_generation`, the selected execution tool, returned operation IDs |
| One generated image/video | `generate_image`, `generate_video` |
| Speech, music and sound effects | `generate_speech`, `generate_music`, `generate_sound_effect` |
| Current jobs | `check_job` |
| Private uploads and assets | `get_upload_url`, `confirm_upload`, `search_assets`, `show_media`, `load_image`, `update_asset` |
| Current account and ledger | `manage_account` |
| Reusable brand, identity and project state | Advertised theme, Character, Film and budget-project tools |
| Existing media processing | Advertised trim, caption, audio, reframe and assembly tools |
| Explicit code-based rendering | `render_html_image`, `render_html_video`, optionally `generate_html_video` |
| Requested product feedback | `submit_feedback`, only after explicit user request |

No examples catalog, inline viewer, Studio or host-native import is guaranteed. Use tool schemas for fields; never infer a usable legacy alias. Every paid processing, cloning or rendering operation also needs the server's quote/reservation/execution contract. Read current account activity for charges; a quote is not a charge record.

For displaying multiple saved image results, use `show_image_gallery` with ordered generation IDs and execution sources. This opens the CreativeOtter-branded MCP Apps gallery and is read-only; it never generates or charges credits.
