# Cloudflare Pages Configuration

## Required Dashboard Settings

When creating or updating the Cloudflare Pages project for `apps/marketing`, use these exact settings:

- **Framework preset:** `None` / `Custom`
- **Root directory:** `apps/marketing`
- **Build command:** `pnpm --filter @mangologic/marketing build`
- **Output directory:** `out`
- **Environment variables:** None required for MVP

## Local Build Command

To build the static export locally:

```bash
cd apps/marketing
pnpm build
# Output goes to apps/marketing/out/
```

To preview the static export locally:

```bash
cd apps/marketing
pnpm build
npx serve out
```

## Why These Settings Matter

- **Root directory:** Setting this to `apps/marketing` ensures Cloudflare treats the marketing app as the project root. Without this, Cloudflare may auto-detect the monorepo root `requirements.txt` and attempt to run `pip install`, which fails because the Python backend lives in `apps/api`, not `apps/marketing`.
- **Output directory:** Next.js `output: 'export'` writes static files to `apps/marketing/out/`.
- **Framework preset:** Use `None` / `Custom` because the marketing app uses a standalone `next.config.js` with static export, not a standard Next.js deployment.

## Deploy Command

To deploy the static export with Wrangler from the monorepo root:

```bash
pnpm --filter @mangologic/marketing deploy
```

Or run the command directly:

```bash
cd apps/marketing
pnpm deploy
```

The `deploy` script runs `wrangler pages deploy out`, which uses `apps/marketing/out` as the asset directory.

## Custom Domain

After deployment, add `www.mangologic.ai` (or your preferred domain) in **Pages → Custom domains**.
