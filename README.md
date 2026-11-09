# Nimstead documentation site

The static, searchable site at <https://docs.nimstead.systems>, covering every Nimstead product.

| What | Where it lives |
|---|---|
| Assure's pages | [Nimstead/assure](https://github.com/Nimstead/assure) under `docs/` (and `CONTRIBUTING.md`), next to the code they describe, so a change and its docs land in one PR |
| Pulse's pages | this repo, `docs/pulse/` |
| The builder, theme, search, and the list of published pages | this repo: `build.mjs`, `public/`, `pages.json`, `products.json` |
| Hosting | a Cloudflare Worker serving the built `dist/` as static assets (`cloudflare.config.ts`, `wrangler.config.ts`) |

## Build and test

You need Node.js 22.18 or later and a checkout of Assure in `./assure` (or anywhere, named by `ASSURE_DIR`):

```bash
git clone https://github.com/Nimstead/assure.git assure
npm ci
npm run build
npm test
npm run dev
```

Open `http://localhost:4321`. The build copies Assure's pages and this repo's into `.build/` (it never writes to the Assure checkout) and fails on a missing page, link or heading target. Search runs in the browser and sends no queries anywhere. Pages work without JavaScript.

`DOCS_SOURCE_REF` names the Assure branch that "View Markdown source" links point to. It defaults to the checkout's branch; CI sets it to `main`.

## Publish

`.github/workflows/deploy.yml` builds, tests and deploys on every push to `main` here. It also checks every hour whether Assure's `main` has moved on from the commit the live site describes, and redeploys if so. Pull requests build, test and dry-run the deploy without publishing.

One-time setup, by an owner:

1. In Cloudflare, create an API token from the **Edit Cloudflare Workers** template. Limit it to the Nimstead account and the `nimstead.systems` zone.
2. In this repo's settings, under Secrets and variables, then Actions, add `CLOUDFLARE_API_TOKEN` (that token) and `CLOUDFLARE_ACCOUNT_ID` (the account ID from the Cloudflare dashboard).
3. Run the workflow once (Actions, then Deploy, then Run workflow). The first deploy attaches `docs.nimstead.systems` to the Worker as a custom domain. If that name has an existing DNS record, from the earlier host, remove it first, because Cloudflare won't attach a custom domain over another record.

To deploy by hand: `npx cf build`, then `npx cf deploy --prebuilt` (with `cf auth login` or `CLOUDFLARE_API_TOKEN` set).

## Maintain content

1. Edit Assure's pages in the Assure repo, and Pulse's under `docs/pulse/` here.
2. Add a record to `pages.json` for each new published page: its `source` (relative to the Assure repo for Assure, or `docs/pulse/...` for Pulse), `slug`, `title`, Diataxis `group`, and `product`. Add new products to `products.json`.
3. Build, test, and check desktop and phone layouts before merging.
4. Link historical plans to their repository source, rather than presenting them as current operator instructions.

`cf` is in beta, so `cf` and `wrangler` are pinned to exact versions in `package.json`. Update them deliberately, and dry-run the deploy when you do.
