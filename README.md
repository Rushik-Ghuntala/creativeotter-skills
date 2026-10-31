# CreativeOtter Skills

Shared media-production skills with separate **Codex** and **Claude Code** plugin packages. Includes all **21 adapted skills**, their prompting references and rendering assets, plus an unchanged, hash-verified upstream snapshot.

**Status:** paid native-first routing, version 0.4.0. Prefer a suitable native engine to lower operating cost; native and API generation both spend CreativeOtter credits. New native work requires a priced quote and a single execution claim that reserves credits directly on user request before the host tool runs. A missing connection, price or balance stops generation. The committed packages have no active MCP endpoint; build a connected package for the actual backend. No public directory approval is implied.

## Repository layout

```text
skills/                  Generated shared skill source used by both packages
templates/skills/        CreativeOtter workflow overrides
templates/shared/        Shared execution, privacy and connection guidance
templates/icon.png       CreativeOtter working logo
plugins/codex/           Self-contained Codex compatibility package
plugins/claude/          Self-contained Claude Code package
.agents/plugins/         Codex repository marketplace
.claude-plugin/          Claude Code repository marketplace
config/plugin.json       Our package identity/version; no active MCP URL
scripts/                 Adapt, build, validate and ZIP tooling
tests/                   Offline package/endpoint regression tests
provenance/              Adapted file hashes and source mapping
vendor/creative-claw/    Untouched pinned upstream snapshot and provenance
```

Next.js, Supabase, provider adapters, database migrations and billing belong in the separate product/backend repository. This repository never stores service credentials or private research/chat records.

## Build and validate

Requires Node.js 22 or newer and npm. ZIP packaging additionally requires the `zip` executable.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run adapt
npm run build
npm run verify
npm run package
```

`adapt` derives `skills/` from the pinned snapshot plus our overrides; `build` creates both installable directories and marketplace files. Generated directories are committed so consumers do not have to run scripts to inspect/install the packages. ZIPs are written to ignored `dist/archives/` and contain each plugin's contents at the archive root.

Validation checks the 490 captured upstream file hashes, all 21 frontmatters, invocation metadata, local Markdown references, absence of the old service identity in adapted content, legal attribution, and parity of the generated packages. Tests exercise endpoint rejection, connected builds and removal of stale endpoint configuration. They do **not** prove live OAuth or generation behavior.

## Use with Codex

Open/trust this repository in a Codex client that supports repository marketplaces. `.agents/plugins/marketplace.json` points to `./plugins/codex`; refresh/restart the client's plugin view and install **CreativeOtter** from **creativeotter-skills**. Client support and installation policy can vary. The package uses the supported `.codex-plugin/plugin.json` compatibility layout.

The packaged `agents/openai.yaml` metadata refers to `$creativeotter-…` skill names. The initial package has no tool dependencies bound to a remote endpoint. A standalone copy of a skill does not configure the backend connection.

## Use with Claude Code

For a local development session, run this from the repository root:

```sh
claude --plugin-dir ./plugins/claude
```

For a repository marketplace install, run these **inside Claude Code**:

```text
/plugin marketplace add Rushik-Ghuntala/creativeotter-skills
/plugin install creativeotter@creativeotter-skills
```

The GitHub install needs repository access. Claude Code discovers the package's `skills/` and `.mcp.json`. Use the skill invocations shown by the installed client; Claude may namespace them under `creativeotter`. No hooks, local server processes or install-time scripts are bundled.

Claude chat, Desktop and Cowork remote connectors are a separate connection flow; this Claude Code marketplace does not automatically create a connector or directory listing there. See [client setup](docs/client-setup.md).

## Connect our backend later

Deploy the CreativeOtter MCP service first. Then supply its actual stable HTTPS URL (for example a Vercel or Supabase endpoint) through `--mcp-url`:

```sh
npm run build -- --mcp-url "$CREATIVEOTTER_MCP_URL"
npm run package -- --connected
```

Set `CREATIVEOTTER_MCP_URL` in your shell to **our actual deployed service** before those commands. Connected packages are written to ignored `dist/connected/codex` and `dist/connected/claude`; the committed instructions-only packages stay unchanged. No network call is made by this build. It validates syntax and configuration, not server ownership or availability. Never include credentials in the URL.

Load the connected Claude directory with `claude --plugin-dir ./dist/connected/claude`; for Codex, point a development repository marketplace at `./dist/connected/codex`. These are development packages. After live testing, intentionally add the real endpoint to a release build and complete the current publication/review requirements. Do not submit a skills-only public listing first if the intended listing will include MCP later.

See [backend contract](docs/backend-contract.md) for the tool integration these skills expect. Tools and paid operations remain unavailable until their capabilities are implemented and verified.

## Change a skill

Edit a file under `templates/skills/` or `templates/shared/`, then run `adapt`, `build` and `verify`. For a workflow that does not yet have an override, copy its generated `skills/<name>/SKILL.md` into `templates/skills/<name>.md` and edit that override. Cross-cutting resource adaptations belong in `scripts/adapt-upstream.mjs` or an explicitly mapped shared template. Direct edits to generated `skills/` and `plugins/` will be overwritten.

Keep required frontmatter names aligned with folder names and update each skill's invocation metadata consistently. Only ship enabled branches as operational capabilities; all 21 workflows are included now as an adaptation foundation, not a claim of feature availability.

See [the complete skill inventory](docs/skills.md) for names and routing descriptions.

## License and provenance

Apache-2.0. Original source: [Creative Claw marketplace](https://github.com/CreativeClawCo/creative-claw-marketplace), commit `9a611714f425047e44de916eac7d778804a188fa`, captured plugin version 0.7.55. Original copyright and license remain intact; adapted files carry modification notices. See [NOTICE](NOTICE), [upstream provenance](vendor/creative-claw/PROVENANCE.json), and [adaptation map](provenance/adaptation.json).

Old publisher names, URLs and identifiers occur only in the immutable vendor snapshot and legal/provenance documentation. They are not active connection destinations in our skills or plugin packages. Provider/model prompting guides are inherited technical background, not a current catalog or price list. [Adaptation notes](docs/adaptation.md) explain the changes and remaining integration work.
