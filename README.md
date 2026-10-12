# @ace/site-blocks

Shared schema package for Ace Club Sites. Pure TypeScript + zod (no React).
`zod` is a **peer dependency** (`^4.3.6`): consumers must install it themselves so that
they and this package share a single zod instance (schemas from two instances do not compose).
It defines the block JSON stored in Supabase (`club_sites`, `club_site_pages`),
theme/nav/legal schemas, the RPC return shapes of the `site_*` functions and a
legal (Impressum) completeness check.

- Editor (ace-web) writes block JSON validated with `BlockListSchema`.
- Renderer (ace-sites) validates RPC results with the `Site*Schema` exports and
  blocks with `parseBlocks`.

## Consuming

Initially: `"@ace/site-blocks": "file:../ace-site-blocks"` in package.json.
Later: a git tag dependency, e.g. `github:PlayAceTennis/ace-site-blocks#v0.1.0`.

The package exports TypeScript source (`src/index.ts`); consumers must compile it
(Next.js: `transpilePackages: ["@ace/site-blocks"]`).

Bump `BLOCKS_VERSION` on breaking block-shape changes.
