# CreativeOtter skills repository

This repository contains adapted skills and plugin packages only. It contains no deployed backend, billing service or provider credentials.

- Keep `vendor/creative-claw/upstream/` and its capture provenance byte-identical. Never execute the upstream build scripts. Retain LICENSE and NOTICE in every distribution.
- Edit `templates/` and `scripts/adapt-upstream.mjs` for adaptation behavior, then run `npm run adapt`. `skills/` is the shared generated source; direct edits there will be overwritten.
- Run `npm run build` to regenerate both `plugins/codex` and `plugins/claude`. Commit generated packages so repository installs work without running build scripts.
- Default packages are instructions-only. Use `npm run build -- --mcp-url <real-https-endpoint>` for separate connected development packages under ignored `dist/connected/`. Never point them at the upstream service or invent an endpoint.
- Run `npm run verify` before committing. Do not run paid generations, install global plugins, deploy a backend or publish directory listings as part of repository maintenance unless requested.
- Keep only CreativeOtter operational branding in adapted skills. Upstream names belong in immutable source and legal/provenance documentation. Do not upload project research, account information, secrets or chat history.
- Git identity is repository-local: Rushik <rushisoni2003@gmail.com>. Do not change global Git configuration.
