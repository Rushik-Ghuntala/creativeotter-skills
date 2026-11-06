---
name: creativeotter-budget-projects
description: "Group CreativeOtter saved images by client or project and read original attributed credit costs. Budget targets are planning targets, not automatic spending caps."
---

# Organize projects and costs

CreativeOtter adaptation, 2026-11-06. Follow [the runtime contract](references/runtime-contract.md).

Use `manage_projects` to list/get or save the requested campaign (section projects, data.kind campaign), film (films/film) or music brief (music/music). Include id for an update. See [Studio records](references/studio-records.md).

Use `manage_assets` to identify only the intended saved outputs. `assign_project_asset` accepts project_id and asset_id, not generation or quote IDs. Resolve ambiguous selections or an existing assignment before moving work. One asset can belong to at most one project.

Read the project's returned assigned charge total. Assignment never creates a charge and must not add historical costs to spending again. Budget_target_units is a decimal string in 1/1000-credit units (or null); a requested 100-credit target is 100000 units. Explain that it does not enforce a cap. No automatic per-chat attribution, subscription billing, provider-dollar conversion or refund tool exists. Archive/restore only requested project records.
