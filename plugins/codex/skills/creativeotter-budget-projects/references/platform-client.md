# Client capability routing

CreativeOtter adaptation, 2026-11-01. Follow [the hybrid runtime contract](runtime-contract.md).

- Inspect the tools actually exposed by the current host. Built-in native media tools and local rendering/editing may be used before an API fallback. Another external plugin is not a native tool and must not be substituted silently.
- A native image tool can satisfy an ordinary image request without a CreativeOtter provider key. Explicit model requirements, advanced edits, voice cloning, video and file transfer must each be checked separately.
- The backend cannot discover the host's tool inventory. Its native availability is host-dependent; `media_generation: false` or an unconfigured provider does not prove that a native generator is absent.
- Missing CreativeOtter authentication prevents private account/library operations, not independent native creation. Deliver the native output and explain optional saving limitations. Never claim a local/attached file is saved remotely without completed transfer.
- Use CreativeOtter's exposed tools for provider fallback and current account data. If no suitable native capability or configured fallback exists, explain the limitation and continue useful planning.
- Preview cards, fullscreen and upload mechanisms vary by host. Use the standard MCP Apps panel where supported; otherwise return structured findings and current links. Do not promise a widget or background monitoring without evidence.
