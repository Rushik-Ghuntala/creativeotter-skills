---
name: creativeotter-budget-projects
description: Organize CreativeOtter saved work by client or project and inspect original attributed credit costs.
---

# Project costs

CreativeOtter adaptation, 2026-11-04. Read [the runtime contract](references/runtime-contract.md).

Use `manage_projects` when exposed. List the relevant section (projects for campaigns, films for films, music for track briefs), then get the intended record. Save the requested name/brief with its matching data.kind and reuse its ID on updates. Budget targets use integer 1/1000-credit units and are planning targets, not enforced spending caps. State that distinction when a user sets a limit; no automatic per-chat project attribution is implemented.

For already saved work, use `assign_project_asset` only with the exact project and asset IDs requested. An asset has at most one project assignment. Existing assignments are never silently moved; ask to resolve an ambiguous intended destination. Assignment is free and does not change the original credit ledger. Project details return the historical assigned charge total, which must not be added to account spending again.

Future generation still needs its own current quote, sufficient credits and execution claim. A project record is not a spending authorization. Do not promise tracking of unassigned work, subscriptions, provider-dollar conversions or refunds absent authoritative tool data. Archive or restore only the requested project; saved media and historical charges remain available.
