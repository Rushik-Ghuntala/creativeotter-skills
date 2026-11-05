# Compatibility and evidence

This is a multi-client test kit, not a guarantee that every AI accepts one plugin format. Configuration examples do not prove an installation is authenticated. The server supports remote Streamable HTTP MCP with OAuth; clients must support that combination and the required tool schemas.

| Client | Included route | Verification scope |
| --- | --- | --- |
| Codex | Complete plugin and local marketplace; MCP-only TOML | Prior live account/saved-image reads verified against backend 0.8.1; new ZIP build validated offline |
| Claude Code | Complete plugin and marketplace; MCP-only JSON | Prior actual Claude desktop Code account read verified against backend 0.8.1; package validator used for ZIP output |
| Cursor | Remote MCP JSON | Configuration follows official documentation; actual Cursor sign-in not tested by packaging |
| VS Code / Copilot | Remote MCP JSON with `servers` | Configuration follows official documentation; actual Copilot sign-in not tested by packaging |
| Claude chat/Desktop/Cowork | Custom remote connector URL | Configure in the app; Claude Code installation does not create this connector |
| ChatGPT | Custom remote MCP URL, where available | Requires the client's custom MCP controls and account/admin access; no public directory approval claimed |
| Other assistants | Endpoint and portable config example; skill folders | Requires compatible OAuth MCP and optional skills support; not tested individually |

The Codex-default, Claude and generic OAuth protocol fixtures passed against backend 0.8.1 on 2026-11-05, including PKCE, refresh, account-only tool discovery, media discovery and revocation. Historical evidence is not a fresh test of every client or a promise of uptime. Package tests make no generation calls or account changes. The package metadata does not mark every host as verified.

MCP Apps rendering and native media generation vary by host. Without inline UI, tools can still return structured results and authenticated web links. A missing host-native image engine needs an enabled backend provider route and its billing workflow; the ZIP does not supply an image model.

Official format/setup references checked 2026-11-05:

- [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins)
- [Codex MCP setup](https://developers.openai.com/codex/mcp)
- [Claude Code plugin development](https://code.claude.com/docs/en/plugins/create)
- [Claude MCP](https://code.claude.com/docs/en/mcp)
- [Claude remote connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
- [Cursor MCP](https://prod.cursor.com/docs/mcp)
- [VS Code MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)
