# Client packages and connection status

## Package types

| Package | Manifest | Connection file | Current status |
| --- | --- | --- | --- |
| Codex | `plugins/codex/.codex-plugin/plugin.json` | `.mcp.json` | Instructions-only |
| Claude Code | `plugins/claude/.claude-plugin/plugin.json` | `.mcp.json` | Instructions-only |

Both contain all 21 skills and their local resources. Their contents are generated from one shared skill tree. The default MCP maps are empty because no CreativeOtter endpoint has been selected/deployed. This avoids accidental connections to the reference product or an unclaimed hostname.

The connected build adds the same `creativeotter` HTTP server to both `.mcp.json` files, and adds that endpoint to every Codex skill's `agents/openai.yaml` MCP dependency. It does not register an app, grant access, start a server or call the endpoint. Do not add a copied registered app ID from another publisher.

## Codex development

The repository marketplace is `.agents/plugins/marketplace.json`; paths resolve from the repository root. It points at `plugins/codex`. Open the repository in a supporting trusted local client and install through its plugin controls. Availability varies by surface and policy.

For a connected development build, change a local development marketplace entry to `./dist/connected/codex` before refreshing/installing. Do not commit this temporary path as the default marketplace: `dist/` is ignored. Keep the endpoint and package version stable during OAuth tests. Full live registration and user authorization remain separate steps.

## Claude Code development

Load `plugins/claude` or `dist/connected/claude` with `claude --plugin-dir <path>`, or use the root Claude marketplace. In a connected session, `/mcp` shows the server and its authentication state. A loaded skill does not mean its tool is available.

## Claude chat, Desktop and Cowork

Configure the deployed server through the current custom remote connector flow. Remote connections must be reachable from Anthropic's cloud infrastructure. The Claude Code package does not automatically install a connector or publish a Claude directory bundle. Test instructions and tool use in each intended client; use returned browser links when inline UI or native attachment transfer is absent.

## Sign-in and connection recovery

Use the assistant's existing CreativeOtter connection. Avoid adding a manual server when the installed plugin already supplies it. Complete OAuth in the same CreativeOtter account; enable media library/requested generation only when the user approves that access. Signing in to the website alone does not connect a host.

For a manually configured Codex server, the sign-in command is:

```sh
codex mcp login creativeotter --scopes openid,email,offline_access
```

The deployed consent screen accepts standard issuer scopes, including the `phone` scope Codex may request by default. That identity scope never grants workspace or media access. The explicit scopes above avoid requesting phone identity and retain refresh-token access. Unknown/custom scopes remain rejected by the backend.

In Claude Code, use `/mcp` to authenticate the configured CreativeOtter server. In Claude's remote connector settings, use Connect or Reconnect. The shared backend uses the same account/workspace; each assistant authorizes its own connection.

Verify with `manage_account` and `get_capabilities` before making a media request. These checks cost no generation credits. Account-only access exposes account tools; media permission adds saved-image and generation tools. A cached plugin, copied skill, or CLI showing stored OAuth credentials is not proof of live connectivity.

Expired tokens should refresh through the host's normal OAuth flow. A missing or revoked workspace grant returns a `401` Bearer challenge so the host can offer sign-in again. A scope error, expired request, or temporary service failure needs its corresponding recovery; repeatedly restarting the application does not repair authorization. Reload the connection after changed permissions/plugin updates; start a new chat only if the host keeps its older tool catalog. A separate successful diagnostic call does not prove the original active chat refreshed.

## Public distribution

Git repository distribution, local development installation and public directory review are different steps. This repository creates the first two package formats; it is not a submitted or approved directory listing. Before submitting, verify current host requirements, our developer identity, domain verification where required, real support/privacy/terms pages, authentication and test cases. Include MCP in the initial public package when the intended product uses it.

Official format references checked on 2026-11-01:

- [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins)
- [OpenAI submission](https://developers.openai.com/plugins/deploy/submission)
- [Claude plugin manifest](https://code.claude.com/docs/en/plugins-reference)
- [Claude repository marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude remote connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
