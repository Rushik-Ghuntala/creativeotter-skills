# Current tool routing

CreativeOtter adaptation, 2026-11-06. This inventory matches backend 0.11.2 (including opt-in rendering). Actual permissions and tool discovery still govern each connection.

| Purpose | Implemented tools |
| --- | --- |
| Automatic public website artwork import | `discover_brand_assets` |
| Opt-in HyperFrames motion MP4 and legacy CSS layouts | `prepare_render`, `render_design`, `get_render_status`, `get_render`, `list_renders` |
| Private editable motion projects | `save_motion_project`, `get_motion_project`, `list_motion_projects`, `revise_motion_project` |
| Complete project ZIP upload | `prepare_motion_upload`, `confirm_motion_upload` |
| Availability and account | `get_capabilities`, `manage_account` |
| Image routing and provider schemas | `resolve_generation_route`, `list_models`, `get_model_params` |
| Provider image quote/start/status | `estimate_generation`, `generate_image`, `check_job` |
| Native image quote/claim | `prepare_native_generation`, `claim_native_generation` |
| Save or recover native image | `create_native_output`, `complete_native_output`, `get_native_generation`, `report_native_outcome` |
| Private image references | `create_upload_url`, `complete_upload` |
| Saved image library and presentation | `manage_assets`, `show_image_gallery` |
| Brand, identity and voice-direction records | `manage_themes`, `manage_characters`, `manage_voice_presets` |
| Campaign/film/music briefs, shot plans and attribution | `manage_projects`, `manage_storyboards`, `assign_project_asset` |

The model catalog accepts category image only. get_model_params accepts the returned provider model `image/nano-banana-2`; quote fields are prompt, aspect_ratio, resolution and owned reference_asset_ids. generate_image and check_job each accept quote_id, not job_id. Native claims use generation_id; saving additionally needs execution_token. These are different IDs and cannot be inferred from an asset ID.

The creativeotter-render-html skill uses these render tools only for animated MP4 output. Its low-level PNG option is not the skill’s still-image workflow; route all still images to creativeotter-generate-image.

The render tools are registered only when the backend rendering gate is enabled; workspace availability and prices additionally require a live worker and opt-in configuration. Other media categories have no executable backend tools or pricing contract. Do not translate a missing video, speech or music tool into an image call. Do not use inherited aliases for asset search, character creation, brand reads, film assembly, feedback or provider jobs. Use the actual schema for every call. See [Studio fields](studio-records.md), [uploads](platform-upload.md) and [recovery](job-recovery.md) when relevant.
