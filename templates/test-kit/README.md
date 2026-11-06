# CreativeOtter test kit v{{VERSION}}

One download for testing CreativeOtter across supported assistants. Extract this ZIP first, then choose your client below. The outer ZIP is a test kit. For an upload control, choose the matching ZIP inside `install/`; for a local marketplace or folder install, use `plugins/`.

**MCP endpoint:** `{{MCP_URL}}`

Includes 21 skills in each complete Codex and Claude Code plugin, per-client configuration examples, checksums and license/provenance. Other assistants need remote Streamable HTTP MCP, OAuth sign-in and compatible tool support. A ZIP alone cannot add these capabilities to every AI app. Each client signs in separately to the same CreativeOtter account; no credentials are included.

## Choose your package

| Assistant | Package / setup |
| --- | --- |
| Codex desktop / CLI | `install/creativeotter-codex-desktop-v{{VERSION}}.zip`, or local `plugins/codex/` |
| Claude Code / compatible Claude plugin upload | `install/creativeotter-claude-v{{VERSION}}.zip`, or `plugins/claude/` |
| Claude chat / Cowork remote connector | Add the MCP endpoint and sign in; ZIP upload availability depends on the client |
| Grok Bot | Add the remote MCP endpoint through the Bot; see below |
| Grok Build | Claude-compatible `plugins/claude/`; sign in through its MCP controls |
| Other MCP clients | Use a matching `adapters/` example or the endpoint |

Each upload ZIP includes all 21 skills and has its manifest at the root. Upload through the client's plugin installer when offered; attaching a ZIP to an ordinary chat does not itself install or authorize a plugin. These are test packages, not public-directory-approved listings.

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

## ChatGPT web and Claude remote connections

**ChatGPT web:** this kit's Codex ZIP bundles direct MCP settings and can be classified **Desktop only**, even though the endpoint is online. Use Plugins > Add > Add custom MCP server to register `{{MCP_URL}}` with OAuth and automatic/DCR registration. Install and connect that remote plugin, then test it in a new web chat. This path provides the hosted tools and previews.

For all 21 skills in a web package, first register the app in the intended account/workspace, then run `npm run package:chatgpt-web -- --app-id <actual-registered-app-id>` in the skills repository. That separate ZIP references the registered app and omits direct MCP declarations. The app must be available to the target user; the ZIP does not create or authorize it. Do not invent or reuse another workspace's app reference. A new package still needs a live web import test. Do not upload the Codex desktop ZIP expecting it to enable web chat.

**Claude chat/Desktop/Cowork:** add `{{MCP_URL}}` through the client's remote connector controls and complete OAuth. This is separate from a Claude Code plugin install. Client and admin policies determine availability.

Official guidance: [ChatGPT web and MCP](https://learn.chatgpt.com/docs/extend/mcp), [registered app references and desktop-only imports](https://learn.chatgpt.com/docs/enterprise/plugin-management).

## Grok Bot and Grok Build

For **Grok Bot**, ask:

> Add CreativeOtter using this remote MCP server: {{MCP_URL}}. Help me sign in, then check whether my CreativeOtter account is connected. Do not generate any images yet.

Finish the account's OAuth connection. Grok Bot documents adding custom MCP servers by URL; a generic ZIP-import flow and CreativeOtter inline previews have not been verified there. If its installer offers packaged-skill import, use the bundled skills through that supported mechanism. Do not assume a Claude plugin ZIP installs in Grok Bot.

**Grok Build is a separate product.** Its documentation describes Claude Code plugin compatibility. Extract the kit and use `grok --plugin-dir ./plugins/claude`, then authenticate the MCP connection in the client's controls. This format follows its documentation; a live CreativeOtter sign-in in Grok Build has not been tested.

Sources: [Grok Bot connections](https://docs.x.ai/grok-bot/computer-and-apps), [Grok Build plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces).

## Other MCP assistants

Enter the endpoint as a remote Streamable HTTP MCP server and select OAuth. `adapters/portable/mcp.json` is an example for hosts accepting `mcpServers`, not a universal config schema. If the assistant supports neither MCP OAuth nor plugins, this kit cannot connect it. Do not paste API keys or bearer tokens into configuration or chat. Reuse the bundled skills only through that host's supported skill mechanism.

## Test without spending generation credits

After OAuth, send:

> Is my CreativeOtter account connected? How many credits do I have left?

For a saved gallery, try:

> Show my three latest saved CreativeOtter images together, please. Don't create anything new.

Compare the workspace across clients. Account-only consent exposes account tools. Approve the optional media access only if you want saved-media and requested-generation tools, then refresh discovery. Real image generation spends CreativeOtter credits at the current server quote; this kit does not include free credits or enable unavailable media types. See [test prompts](docs/TEST-PROMPTS.md) and [compatibility](docs/COMPATIBILITY.md).

## Verify the download

The repository ships a `.zip.sha256` beside this ZIP. Check it before extraction with `shasum -a 256 -c <filename>.zip.sha256` (or `sha256sum -c`). From the extracted kit directory, verify file contents using `shasum -a 256 -c SHA256SUMS`. Windows users can compare the ZIP hash with `Get-FileHash <filename>.zip -Algorithm SHA256`.

## Rebuild and source

In the CreativeOtter skills repository: `npm ci --ignore-scripts`, then `npm run package:test-kit`. The public endpoint lives in `config/test-kit.json`; the shared templates and build code produce both packages. No install script runs, accounts are not pre-authorized, and no generation runs during packaging.

See `LICENSE`, `NOTICE` and `provenance/`. The upstream reference snapshot remains unchanged in the source repository. The adaptation map describes the shared source before connected Codex dependency metadata is added; `SHA256SUMS` describes the exact files in this kit.

## Current format references

- [OpenAI plugin packages and local setup](https://developers.openai.com/plugins/build/plugins): this kit uses the supported Codex compatibility manifest.
- [Claude plugins](https://code.claude.com/docs/en/plugins): local plugin folders and marketplaces are distinct from remote connectors.

Client installation controls and organization policies may vary. Each new account must complete its own sign-in; no existing user's access is transferred in this kit.
