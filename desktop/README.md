# ISC Studio Desktop Strategy

ISC Studio uses a minimal Electron shell around its existing local Next.js server.

Tauri was evaluated first because its operating-system webview produces a smaller binary and its capability model is attractive. It was not selected for the current architecture because Tauri's supported Next.js path requires a static export, while ISC Studio relies on local catalogue, workbook, PDF, and raster API routes. Replacing those routes would be a product-level migration rather than desktop packaging. The current build environment also has no Rust toolchain.

Electron preserves the tested web and API layers. The renderer is sandboxed, has no Node integration or preload bridge, receives no permissions, cannot open windows, and cannot navigate away from its randomly assigned loopback origin.

Commands:

- `npm run desktop:dev` starts Electron and a local Next development server.
- `npm run build` creates the web build and standalone server.
- `npm run desktop:prepare` copies bundled public/static assets into Next's standalone output.
- `npm run desktop:start` prepares and launches the standalone production shell after a build.

A distributable should package `desktop/`, `.next/standalone/`, `.next/static/`, and `public/` under the application resource directory. Platform installers and signing should be added with Electron Forge during release engineering; signing credentials are intentionally not part of this repository.
