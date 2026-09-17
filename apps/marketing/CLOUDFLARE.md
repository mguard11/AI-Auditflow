# Cloudflare Deployment Configuration

## Build Configuration

The marketing site uses Next.js static export:

- `next.config.js` has `output: 'export'`
- Static output is written to `apps/marketing/out/`
- Build command: `pnpm --filter @mangologic/marketing build`

## Wrangler Configuration

`wrangler.jsonc` configures the deployment as a Worker with static assets:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "ai-auditflow-website",
  "compatibility_date": "2026-09-17",
  "assets": {
    "directory": "./out"
  }
}
```

This uploads everything in `apps/marketing/out/` as static assets. No Worker script is needed.

## Deploy Command

To deploy from the monorepo root:

```bash
pnpm --filter @mangologic/marketing run deploy
```

Or run directly from `apps/marketing`:

```bash
cd apps/marketing
pnpm run deploy
```

The `deploy` script runs `wrangler deploy`, which uses `wrangler.jsonc` and uploads `out/` as assets.

## Preview

To preview the static export locally:

```bash
cd apps/marketing
pnpm build
npx serve out
```

## Custom Domain

After deployment, add `www.mangologic.ai` (or your preferred domain) in **Workers & Pages → ai-auditflow-website → Custom domains**.
