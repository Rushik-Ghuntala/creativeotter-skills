# CreativeOtter test kit v{{VERSION}}

One download for testing CreativeOtter across supported assistants. Extract this ZIP first, then choose your client below. The outer ZIP is a test kit, not a plugin manifest: install the matching folder under `plugins/`.

**MCP endpoint:** `{{MCP_URL}}`

Includes 21 skills in each complete Codex and Claude Code plugin, per-client configuration examples, checksums and license/provenance. Other assistants need remote Streamable HTTP MCP, OAuth sign-in and compatible tool support. A ZIP alone cannot add these capabilities to every AI app. Each client signs in separately to the same CreativeOtter account; no credentials are included.

## Codex

From the extracted `creativeotter-test-kit` directory:

```sh
codex plugin marketplace add .
codex plugin add creativeotter@{{MARKETPLACE}}
codex mcp login creativeotter --scopes openid,email,offline_access
```

If CreativeOtter is already installed, use its existing connection to avoid duplicate tools. Use a fresh chat after installation if the tool catalog is cached. Desktop versions with a Plugins UI can select this local marketplace and install CreativeOtter there.

For MCP-only testing instead of installing the plugin, add the server with `codex mcp add creativeotter --url {{MCP_URL}}`, then run the same login command. This option does not install skills. The equivalent TOML is in `adapters/codex/config.toml`; merge only its server entry into your configuration.

## Claude Code

From the extracted directory, start a local session:

```sh
claude --plugin-dir ./plugins/claude
```

Use `/mcp` to authenticate CreativeOtter. For a persistent install, inside Claude Code use `/plugin marketplace add /absolute/path/to/creativeotter-test-kit`, then `/plugin install creativeotter@{{MARKETPLACE}}` and `/mcp`. Choose the existing connection if already configured.

For MCP-only setup, merge `adapters/claude-code/.mcp.json` into the project's `.mcp.json` instead of installing the plugin. Keep other server entries.

## Cursor

Merge the `creativeotter` entry from `adapters/cursor/mcp.json` into your project's `.cursor/mcp.json` or your user `~/.cursor/mcp.json`. Open the MCP settings and complete OAuth. This adds tools; it does not install a Cursor plugin. If the client supports portable skills, you can add the relevant skill folders from `plugins/claude/skills/` through its supported skill mechanism.

## VS Code / GitHub Copilot

Merge `adapters/vscode/mcp.json` into `.vscode/mcp.json`. Start/trust the server through VS Code's MCP controls and complete OAuth. This format uses `servers`, while Cursor uses `mcpServers`; keep the correct format and preserve other entries. Tool use requires an MCP-capable chat session permitted by your organization.

## Claude chat, Desktop, Cowork and ChatGPT

Use the client's custom remote MCP/connector/plugin controls to add `{{MCP_URL}}`, choose OAuth, then sign in to CreativeOtter. For Claude, use Customize > Connectors > Add custom connector. If asked how to identify the OAuth client, choose **Register automatically** for this backend's dynamic registration flow. For ChatGPT, use Plugins > Add custom MCP server if that control is available. These web/desktop connector flows are separate from installing a Claude Code or Codex plugin folder. Client plan, admin policy and available features determine whether local plugins or custom remote MCP can be used.

## Other MCP assistants

Enter the endpoint as a remote Streamable HTTP MCP server and select OAuth. `adapters/portable/mcp.json` is an example for hosts accepting `mcpServers`, not a universal config schema. If the assistant supports neither MCP OAuth nor plugins, this kit cannot connect it. Do not paste API keys or bearer tokens into configuration or chat. Reuse the bundled skills only through that host's supported skill mechanism.

## Test without spending generation credits

After OAuth, send this prompt:

> Use CreativeOtter to call get_capabilities and manage_account overview. Report the actual backend version, connected workspace, available/reserved credits and enabled tools. Do not generate, quote, claim, upload, spend credits, change settings or edit files.

Compare the workspace across clients. Account-only consent exposes account tools. Approve the optional media access only if you want saved-media and requested-generation tools, then refresh discovery. Real image generation spends CreativeOtter credits at the current server quote; this kit does not include free credits or enable unavailable media types. See [test prompts](docs/TEST-PROMPTS.md) and [compatibility](docs/COMPATIBILITY.md).

## Verify the download

The repository ships a `.zip.sha256` beside this ZIP. Check it before extraction with `shasum -a 256 -c <filename>.zip.sha256` (or `sha256sum -c`). From the extracted kit directory, verify file contents using `shasum -a 256 -c SHA256SUMS`. Windows users can compare the ZIP hash with `Get-FileHash <filename>.zip -Algorithm SHA256`.

## Rebuild and source

In the CreativeOtter skills repository: `npm ci --ignore-scripts`, then `npm run package:test-kit`. The public endpoint lives in `config/test-kit.json`; the shared templates and build code produce both packages. No install script runs, accounts are not pre-authorized, and no generation runs during packaging.

See `LICENSE`, `NOTICE` and `provenance/`. The upstream reference snapshot remains unchanged in the source repository. The adaptation map describes the shared source before connected Codex dependency metadata is added; `SHA256SUMS` describes the exact files in this kit.
