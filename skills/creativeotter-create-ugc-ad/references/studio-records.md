# Studio record fields

CreativeOtter adaptation, 2026-11-06. Only use tools exposed by the authenticated connection. The public input schemas are recorded in the repository's backend contract for regression checks; live schemas govern actual calls.

List and get existing records before an ambiguous update. For save, omit id for a requested new record and include the actual existing id to update it. Read existing values and preserve fields not requested to change. Unknown or ambiguous user references need clarification; never guess IDs. Shared records support archive/restore, not permanent deletion.

| Tool | Save data |
| --- | --- |
| `manage_themes` | name, description, colors (array of six-digit hex colors), font_family, tone, logo_asset_id (owned ready image ID or null) |
| `manage_characters` | name, description, appearance, identity_type (fictional/self/authorized), reference_asset_id (owned ready image ID or null) |
| `manage_voice_presets` | name, description, language, script, style. This does not create a provider voice. |
| `manage_projects` | section projects/films/music; data includes name, description, kind campaign/film/music matching the section, status draft/active/complete, budget_target_units (decimal string or null), aspect_ratio, genre, lyrics. A saved plan is not completed production. |
| `manage_storyboards` | action list needs project_id. For save, project_id plus shot: position, prompt, narration, duration_seconds (integer), reference_asset_id (owned image ID or null). Include id for an existing shot. No archive action. |
| `assign_project_asset` | project_id and asset_id. Only the exact requested saved assets; an existing assignment is not silently moved. |

Brand, character, voice and project tools use action list/get/save/archive/restore, with optional include_archived. Budget targets use 1000 units per display credit, so 100 credits is the string "100000". These are planning targets, not enforced caps. Assignment shows original charges without charging again. Do not promise automatic attribution of future generations.

Find ready image IDs with manage_assets, including returned output IDs after generation. A generation ID or quote ID cannot serve as a reference_asset_id. Current library actions are list, get and favorite; favorite needs asset_id and favorite boolean. There is no text search, asset renaming, tag editing or bulk ZIP tool. List up to 50 newest records and inspect returned labels; clarify an ambiguous match rather than guessing.
