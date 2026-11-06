# Compatibility and evidence

This is a multi-client test kit, not a guarantee that every AI accepts one plugin format. Configuration examples do not prove an installation is authenticated. The server supports remote Streamable HTTP MCP with OAuth; clients must support that combination and the required tool schemas.

| Client | Included route | Verification scope |
| --- | --- | --- |
| Codex | Complete plugin and local marketplace; MCP-only TOML | Live account, image, gallery and automatic preview recovery checked against backend 0.8.10 on 2026-11-06; ZIP contents validated offline |
| Claude Code | Complete plugin and marketplace; MCP-only JSON | Live Claude desktop Code saved-gallery navigation, preview refresh and three downloads checked against backend 0.8.9 on 2026-11-06; ZIP contents validated offline |
| Cursor | Remote MCP JSON | Configuration follows official documentation; actual Cursor sign-in not tested by packaging |
| VS Code / Copilot | Remote MCP JSON with `servers` | Configuration follows official documentation; actual Copilot sign-in not tested by packaging |
| Claude chat/Desktop/Cowork | Custom remote connector URL | Configure in the app; Claude Code installation does not create this connector |
| ChatGPT web | Register remote MCP with OAuth; optional separate skills ZIP bound to its registered app | The Codex ZIP is desktop-only in the observed web import. A registered remote app and a web package without direct MCP declarations require their own live test. |
| Grok Bot | Custom remote MCP URL and bundled skill references | Official custom-server setup documented; CreativeOtter sign-in and embedded UI not yet tested there |
| Grok Build | Claude-compatible plugin directory | Format documented by xAI; live CreativeOtter connection not tested there |
| Other assistants | Endpoint and portable config example; skill folders | Requires compatible OAuth MCP and optional skills support; not tested individually |

The Codex-default, Claude and generic OAuth protocol fixtures passed against backend 0.8.1 on 2026-11-05, including PKCE, refresh, account-only tool discovery, media discovery and revocation. Historical evidence is not a fresh test of every client or a promise of uptime. Package tests make no generation calls or account changes. The package metadata does not mark every host as verified.

MCP Apps rendering and native media generation vary by host. Without inline UI, tools can still return structured results and authenticated web links. A missing host-native image engine needs an enabled backend provider route and its billing workflow; the ZIP does not supply an image model.

Official format/setup references checked 2026-11-06:

- [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins)
- [Codex MCP setup](https://developers.openai.com/codex/mcp)
- [Claude Code plugin development](https://code.claude.com/docs/en/plugins/create)
- [Claude MCP](https://code.claude.com/docs/en/mcp)
- [Claude remote connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
- [Cursor MCP](https://prod.cursor.com/docs/mcp)
- [VS Code MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)

- [Grok Bot connections](https://docs.x.ai/grok-bot/computer-and-apps)
- [Grok Build plugin compatibility](https://docs.x.ai/build/features/skills-plugins-marketplaces)

A laptop icon or “Open in desktop app” means the imported package cannot be used in ChatGPT web. The v0.5.3 archive named `chatgpt-codex` was misleading: it bundled direct MCP settings. New kits label that archive `codex-desktop` and provide a separate registered-app web packaging command.
