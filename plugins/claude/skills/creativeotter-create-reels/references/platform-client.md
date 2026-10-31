# Client capability routing

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](runtime-contract.md).

- **Codex:** use the CreativeOtter plugin's configured MCP connection. A standalone skill installation needs that connection configured separately. Do not modify user-global settings without a request. Follow the current client's sign-in controls; a registered plugin identity is created later and must not be copied from another publisher.
- **Claude Code:** load the Claude plugin package and use `/mcp` to inspect/authenticate its `creativeotter` server when one is configured. Skill names can appear under the plugin namespace; use the installed host's displayed invocation instead of inventing a slash command.
- **Claude chat/Desktop/Cowork:** a Claude Code package is not proof that a remote connector is registered. Add the deployed CreativeOtter MCP URL through the current custom-connector flow and authenticate. A directory listing and any accompanying skill bundle need their own publication process.
- **No backend yet:** explain that the shipped default packages are instructions-only. Do not direct the user to a guessed endpoint, promise authentication will fix an undeployed service, or borrow tools from another plugin.
- Use text and links as the common delivery baseline. Preview cards, file imports and Studio are optional capabilities; if absent, use a returned web link or explain the limitation. Never claim that a viewer is monitoring a job without evidence.

Keep host tool schemas authoritative. Do not translate a local path or a host attachment ID into a remote asset by guessing. For paid execution, a missing quote/approval contract blocks that operation even if an old generation tool is visible.
