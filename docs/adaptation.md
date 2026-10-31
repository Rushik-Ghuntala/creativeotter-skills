# Adaptation notes

The source snapshot is frozen at the pinned commit recorded in `vendor/creative-claw/PROVENANCE.json`. All 490 captured files remain byte-identical; no upstream script is used by our adaptation/build process. It includes 461 files in the original 21 skill folders. The generated shared tree contains those resources with our changes plus the common references required by the rewritten workflows.

## What changed

- Renamed all skill directories, frontmatter names, cross-skill references, descriptions and invocation metadata to CreativeOtter.
- Removed the reference product's connection destinations, Claude directory UUID, registered app identity and support mailbox from adapted content. No guessed CreativeOtter domain is used as an active connection.
- Replaced router, setup, image generation, budget projects, voice cloning, feedback and HTML rendering entry points with CreativeOtter-specific versions while retaining their relevant supporting creative guides.
- Replaced common execution/client/upload/recovery/account/feedback/review/consent/tool-routing references. Every skill routes to a self-contained runtime contract.
- Made model availability/defaults and top-level input schemas runtime-discovered. Inherited provider guides remain technical prompting references; they are not promises of model access, supported controls or current commercial terms.
- Removed fixed credit-rate claims and trial entitlements. Required bound quotes and direct authenticated Review approval for paid work, with no assistant approval shortcut. New takes and uncertain submissions cannot trigger blind regeneration.
- Made feedback explicit-request-only and optional workflow attribution opt-in. No automatic reports or inherited analytics destinations are enabled.
- Replaced permanent-public-delivery assumptions with private assets and current delivery links. Replaced copied voice consent text with a requirement for the backend's actual provider/consent flow.
- Generated isolated, self-contained Codex and Claude Code packages, each carrying LICENSE, NOTICE and the working CreativeOtter logo. Original upstream logos are confined to the vendor snapshot.

Modified Markdown/YAML/HTML files are marked with adaptation notices. `provenance/adaptation.json` maps every shared skill file to its original hash and current hash; new shared files have a null source. Some unbranded data assets are copied unchanged. The root and packaged LICENSE retain the original text, and NOTICE retains the upstream copyright attribution.

## What remains

No backend, provider integration, billing, policy pages, consent service, OAuth client registration or public listing has been implemented. Package structure and offline invariants are checked; live media quality, host-specific OAuth, optional widgets, schema compatibility and actual paid-job behavior must be tested against our deployed service. Keep unavailable capability branches disabled at runtime.

## Maintaining the source

Run `npm run adapt` only after editing our templates/transformer. Never edit the vendor snapshot to update a guide. A future upstream update should be a separately reviewed snapshot with its own provenance, compared with our maintained overrides before adoption. Run `npm run build` and `npm run verify` after adaptation changes and commit both shared and generated outputs together.
