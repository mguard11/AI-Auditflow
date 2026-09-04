# Website Hosting Recommendation

## Marketing Site (`apps/marketing`) — Already Built

**Host on Cloudflare Pages.**

Justification:
- Built with `output: 'export'` → pure static files in `out/`
- Cloudflare Pages deploys directly from Git, no build server needed
- Free tier covers unlimited bandwidth for static sites
- Global CDN with excellent performance for marketing content
- Zero ongoing cost for your expected traffic

Setup:
1. Connect the GitHub repo `AI-Auditflow`
2. In Cloudflare Pages → Create project → **select branch `feat/marketing-site`** (not `main`; PR #1 has not been merged yet)
3. Framework preset: None / Custom
4. Build command: `pnpm --filter @mangologic/marketing build`
5. Output directory: `apps/marketing/out`
6. Environment variables: None required for MVP

After PR #1 is merged to `main`, you can either keep building from `main` or continue using `feat/marketing-site`.

## Product Web App (`apps/web`)

**Two realistic options:**

| Option | Host | Rationale |
|--------|------|-----------|
| A | Vercel | Easiest for Next.js App Router. Free hobby tier. Keep marketing + product separate per your plan. |
| B | Self-hosted | Run `next start` behind nginx/Caddy on the same VPC as your API. Keeps everything in your infra boundary. |

**Recommendation: Option A (Vercel).** Your backend is self-hosted with data staying in your VPC. The web app is just a public shell that calls your API. Vercel for the web app doesn't compromise your data-residency story. Use Option B only if you need to avoid any third-party SaaS.

## Backend API + Workers

**Self-hosted in your VPC** per your decision. Docker Compose for evaluation, Kubernetes + Helm for production (per `docs/architecture.md`).

GPU for vLLM + Llama 3 8B: 1x A100 40GB is sufficient for single-model serving. Consider 2x A100 if you want tensor parallelism for higher throughput.
