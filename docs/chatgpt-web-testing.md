# ChatGPT web installation check — 6 November 2026

The historical v0.5.3 package declared a direct remote MCP server and was marked **Desktop only** when imported into ChatGPT web. Typing its name in the composer did not select a plugin.

The v0.5.4 web builder creates a separate `creativeotter-web` package containing all 21 shared skills and a `.app.json` reference to a remote app registered in the intended ChatGPT account. It excludes raw MCP declarations and local execution features. Its separate package name allows installation alongside an existing desktop import.

Observed through ChatGPT's browser interface:

- The custom remote app completed OAuth and appeared as connected.
- The corrected archive was uploaded from the app repository's `plugins/creativeotter/` directory.
- Its detail page showed **Your cloud plugin**, **Apps 1**, **Skills 21** and web installation controls.
- After installation, **Try in chat** selected the plugin in a new browser chat.
- “Check my CreativeOtter account” loaded the branded account panel and returned the live balance.
- “Show my three latest saved CreativeOtter images together, please. Don't create anything new.” opened the branded gallery with three saved thumbnails and an image preview.
- Selecting a second thumbnail changed the displayed image. Returning to the first and refreshing displayed **Preview up to date**.
- Downloading the second saved image completed in Chrome's download history.
- No generation was requested or performed, and the gallery response reported no credit charge.

This check covers the registered app available in the tested account. It does not establish access for unrelated accounts or a public marketplace listing. Another account must have access to that app, or register its own connection and rebuild against its actual app reference. Long-duration expiry and other assistant clients were not retested in this packaging check.

Automated validation: five tests passed, covering immutable upstream verification, shared build checks, registered app ID validation, web ZIP contents and reproducibility. All current app release checksums passed. Historical archives were preserved byte-for-byte.
