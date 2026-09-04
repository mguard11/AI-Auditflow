# Plan: MangoLogic.ai Marketing Website

## Goal
Build a high-conversion interactive marketing site at `apps/marketing/` that demonstrates the MangoLogic product experience, emphasizes self-hosted architecture, and drives design-partner signups.

## Decision: Separate Next.js App
Create `apps/marketing/` as an independent Next.js 14 app, separate from `apps/web` (product UI) and `apps/api` (backend).

**Rationale:**
- Public marketing site needs different deploy cadence than authenticated product
- Can use static generation / ISR for performance
- Independent hosting on Vercel or Cloudflare Pages
- Clean separation for `www.mangologic.ai` vs future `app.mangologic.ai`

**Constraint:** `apps/marketing/` is a standalone marketing site. It must not import from `apps/web`, `apps/api`, or `packages/*` to avoid coupling product code with public-facing content.

## Core Website Design Principles

These are non-negotiable UX and brand rules for the MangoLogic.ai marketing site.

1. **No friction is the UX principle, not just the tagline.** Every page should feel effortless. Minimal navigation, short sections, clear hierarchy, obvious CTAs, no giant walls of compliance language, and no unnecessary forms. A visitor should understand the product within **10–15 seconds**.

2. **Show intelligence rather than talking about AI.** Avoid generic AI imagery—robots, glowing brains, circuit boards, floating particles. Instead, visualize MangoLogic actually reasoning: `Policy → Control → Evidence → Gap → Action`. The interactive product experience should be the visual centerpiece of the website.

3. **Enterprise-grade without looking like legacy GRC software.** The visual language should combine the credibility of cybersecurity/enterprise infrastructure with the simplicity of a modern AI company. Think dark charcoal/navy foundations, strong typography, generous whitespace, restrained mango/orange accents, subtle green for successful controls, and very limited decorative effects.

4. **Product before marketing claims.** Instead of saying “Revolutionary AI-powered compliance,” show a realistic finding: **“CC6.1 — 3 privileged accounts have no matching access approval.”** Then show where MangoLogic found it, why it matters, and the recommended action. That demonstrates the product much more effectively.

5. **One dominant message per screen.** The homepage should tell a deliberate story: **What MangoLogic is → what problem it solves → watch it work → why it's different → integrations → security → use cases → CTA.** Don't try to explain the entire platform in the hero.

6. **Human language over GRC language.** Write “MangoLogic finds the evidence before your auditor asks for it,” rather than “Automated evidence orchestration and continuous control monitoring.” Technical terminology belongs deeper in Product, Security and Architecture pages.

7. **Security should be visible early.** Your private/self-hosted architecture is strategically important. The site should communicate **“Runs in your environment. Your data stays yours.”** prominently rather than burying deployment architecture on a security page.

8. **Design for expansion beyond SOC 2.** The visual identity should represent **MangoLogic**, not SOC 2. The product can start with compliance, but the site architecture should accommodate future products around continuous audit, operational controls and AI-agent assurance without requiring a redesign.

## Visual Identity

Restrained system:

**Primary:** deep navy / near-black
**Brand accent:** mango orange
**Secondary accent:** subtle mango yellow
**Success:** restrained green
**Text:** white / off-white / slate
**Typography:** modern sans-serif such as Inter, Geist or similar

Use orange strategically for **MangoLogic intelligence/actions**, rather than painting the entire website orange.

The mango should be a **brand cue**, not a cartoon theme. MangoLogic can have personality while still looking credible enough to sit in front of a CISO.

## Reasoning Visualization (Brand Asset)

Instead of generic illustrations, use a recognizable **MangoLogic reasoning visualization**:

```
CONTROL
CC6.1 Logical Access
↓
OBSERVE
AWS IAM · Okta · GitHub · Jira
↓
REASON
17 privileged users
14 approved access requests
↓
DETECT
⚠ 3 unmatched privileged accounts
↓
ACTION
Review or revoke access
↓
PROVE
Evidence package generated
```

This visual pattern should become a reusable component/brand asset across the site, especially in the interactive demo and security page.

## Design Principle: Lightweight First

The marketing site must be cheap to host and fast to load. Every dependency and animation choice should be evaluated against this constraint.

**Rules:**
- Minimize JavaScript bundles; prefer CSS transitions over JS animation libraries
- Use static generation (`output: 'export'`) for all pages
- Avoid client-side data fetching; all content is compile-time or interactive demo mocks
- No external dependencies unless they add measurable conversion value

**Budget baseline:**
- Hosting: $0–$5/month
- Forms: $0/month (use free tier or static fallback)
- Domain: ~$10–15/year

## Tech Stack (Revised for Weight)
- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
  - Use `output: 'export'` in `next.config.js` for fully static HTML/CSS/JS output
  - No SSR, no ISR, no server components beyond static
- **Animations**: CSS transitions + `@keyframes` (no Framer Motion bundle cost)
  - Use `tailwindcss-animate` plugin or inline `<style>` for keyframe animations
  - Framer Motion is **out of scope** for MVP due to bundle weight
- **Forms**: Static form fallback + optional Formspree/Netlify Forms if needed
  - Primary: `<form>` with `action="mailto:..."` or static CTA
  - Optional: Formspree free tier (50 submissions/month)
- **Deployment**: Cloudflare Pages (recommended) or Vercel
  - Cloudflare Pages: generous free tier, global edge, unlimited bandwidth for static sites
  - Vercel: also free for hobby sites, but Cloudflare is cheaper at scale

## Package Configuration

### `apps/marketing/package.json`
```json
{
  "name": "@mangologic/marketing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "export": "next build && next export"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.368.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

**Note:** `lucide-react` is included because it is tree-shakeable and lightweight (~10KB). If bundle analysis shows it adds too much weight, replace with inline SVG icons.

### Monorepo Integration
Add `apps/marketing` to root `package.json` workspaces array. Do NOT add it to `turbo.json` pipeline unless its build/test/lint commands need to run in CI with other apps.

### Static Export Config
`next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true
};
module.exports = nextConfig;
```
This produces a `dist/` folder with pure static files that can be deployed anywhere.

## Directory Structure
```
apps/marketing/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Homepage
│   │   ├── product/page.tsx
│   │   ├── security/page.tsx
│   │   ├── frameworks/page.tsx
│   │   ├── resources/page.tsx
│   │   └── demo/page.tsx              # Book a Demo
│   ├── components/
│   │   ├── marketing/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ReasoningDemo.tsx      # Core interactive element: CONTROL→OBSERVE→REASON→DETECT→ACTION→PROVE
│   │   │   ├── AgentFlow.tsx
│   │   │   ├── IntegrationGrid.tsx
│   │   │   ├── FrameworkCards.tsx
│   │   │   └── DemoForm.tsx
│   │   └── ui/                         # Shared primitive components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Section.tsx
│   └── lib/
│       └── demo-data.ts               # Mock data for interactive demo
├── public/
│   └── images/
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── .env.example                        # FORMSPREE_ENDPOINT
```

## SEO & Metadata Strategy

### Global metadata (`layout.tsx`)
- Title template: `%s | MangoLogic`
- Default title: `MangoLogic — AI Audit Engine`
- Default description: `MangoLogic installs an AI audit engine into your VPC. Your compliance data never leaves your infrastructure.`

### Per-page metadata
| Route | Title | Description |
|-------|-------|-------------|
| `/` | MangoLogic — AI Audit Engine | Self-hosted compliance automation. SOC 2 Type II proven. |
| `/product` | Product — MangoLogic | 5-agent pipeline for policy mapping, evidence collection, and gap analysis. |
| `/security` | Security — MangoLogic | Your data stays in your infrastructure. Self-hosted architecture. |
| `/frameworks` | Frameworks — MangoLogic | SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS support. |
| `/resources` | Resources — MangoLogic | Documentation, roadmap, and compliance insights. |
| `/demo` | Book a Demo — MangoLogic | Join our design partner program. |

## Page Blueprint

### 1. Homepage (`/`)
**Sections (top to bottom):**
- **Hero**: 
  - Wordmark: `MangoLogic.ai`
  - H1: `The AI audit engine your team won't hate using.`
  - Subhead: `No friction. Just smart workflows.`
  - Body: `MangoLogic works quietly across your existing systems to find evidence, detect gaps and tell your team what needs attention—before the auditor does.`
  - Primary CTA: `See MangoLogic in action` → scrolls to interactive demo
  - Secondary CTA: `Book a demo`
- **Interactive Demo**: Immediately below hero. Clickable simulation showing the MangoLogic reasoning flow:
  - CONTROL: `CC6.1 — Logical Access Controls`
  - OBSERVE: AWS IAM, Okta, GitHub, Jira
  - REASON: `17 privileged users · 14 approved access requests`
  - DETECT: `⚠ 3 unmatched privileged accounts`
  - ACTION: `Review or revoke access`
  - PROVE: `Evidence package generated`
  - User clicks "Run Audit" to advance through steps; can click any step to jump ahead; reset to replay
- **Problem / Outcomes**: 200–400 hour burden → automated. Before/after metrics. Human language, not GRC jargon.
- **5-Agent Workflow**: Visual pipeline diagram with brief descriptions per agent (Ingest, Map, Collect, Analyze, Report)
- **Integrations**: Grid of GDrive, Jira, GitHub, AWS Config, Notion
- **Security / Self-Hosted Architecture**: "Runs in your environment. Your data stays yours." prominently near top. Architecture diagram showing all data staying in customer VPC.
- **Frameworks**: SOC 2 Type II (proven), ISO 27001/HIPAA/PCI-DSS (roadmap)
- **Target Customers**: "VP Engineering, Head of Security, Director of Compliance at 50–500 employee mid-market companies in regulated industries"
- **Design-Partner CTA**: "Join 10 design partners. $0–$5K/mo. Help shape the product."

**Homepage story rule:** One dominant message per screen. Do not explain the entire platform in the hero.

### 2. Product (`/product`)
- Deep-dive on the agent pipeline
- Feature breakdown per agent
- Technical differentiators

### 3. Security (`/security`)
- Self-hosted architecture details
- Data flow diagram
- Network requirements (only outbound: LLM API + OAuth token exchange)
- Compliance posture

### 4. Frameworks (`/frameworks`)
- SOC 2 Type II detail page
- Roadmap items: ISO 27001, HIPAA, PCI-DSS
- Extensibility model

### 5. Resources (`/resources`)
- Blog / docs placeholder
- Links to architecture docs, roadmap
- Newsletter signup (optional)

### 6. Book a Demo (`/demo`)
- Short form: Name, Work Email, Company, Framework interest, Message
- Submit to Formspree
- Confirmation state

## Interactive Demo Spec (`InteractiveDemo.tsx`)

**Purpose:** Show MangoLogic reasoning, not just pipeline steps. The demo is the visual centerpiece of the site.

**State machine (React state only, no router):**
```ts
type DemoState = "idle" | "control" | "observe" | "reason" | "detect" | "action" | "prove" | "complete";
```

**Implementation approach:**
- Single client component using `useState` and `useEffect`
- CSS transitions triggered by class changes on step containers
- Auto-advance via `setTimeout` in `useEffect` when state changes
- No animation library; use Tailwind `transition-*` utilities and custom `@keyframes` in global CSS if needed

**Mock data types:**
```ts
interface ReasoningStep {
  id: DemoState;
  label: string;
  title: string;
  description: string;
  artifacts?: Array<{ source: string; title: string; status: "found" | "missing" }>;
  duration: number; // ms for auto-advance
}
```

**Mock data flow (reasoning chain):**
- **CONTROL**: `CC6.1 — Logical Access Controls`
- **OBSERVE**: Connected to AWS IAM, Okta, GitHub, Jira
- **REASON**: `17 privileged users · 14 approved access requests`
- **DETECT**: `⚠ 3 unmatched privileged accounts`
- **ACTION**: `Review or revoke access`
- **PROVE**: `Evidence package generated`

**Visual layout:**
- Vertical chain on mobile, horizontal or diagonal on desktop
- Each step has a label (CONTROL, OBSERVE, etc.), title, and description
- Orange accent line connects steps
- Evidence artifacts appear inline during OBSERVE/DETECT steps
- JSON/PDF preview appears during PROVE step

**Interaction:**
- User clicks "Run Audit" to start
- Each step auto-advances with 1–1.5s delay via `setTimeout`
- User can click any step to jump ahead
- Reset button to replay
- **No Framer Motion**: use CSS `opacity`, `transform`, and `transition` classes

**CSS transition pattern:**
```tsx
<div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
  {/* content */}
</div>
```

**Error/edge cases:**
- If user clicks "Run Audit" while already running, ignore or show brief "Already running" tooltip
- If user resets during a step, cancel pending timers and return to idle
- Mobile: stack vertical instead of horizontal pipeline; reduce animation duration to 800ms
- If `setTimeout` drift causes timing issues, use a single master timer that advances state index

## Design System

**Colors (Tailwind mapping):**
- Primary background: `slate-950` / `#020617` (deep navy/near-black)
- Surface: `slate-900` / `#0f172a` (cards, elevated areas)
- Brand accent: `orange-500` / `#f97316` (mango orange for CTAs, highlights, active states)
- Secondary accent: `orange-300` / `#fdba74` (subtle mango yellow for hover/secondary highlights)
- Success: `emerald-500` / `#10b981` (restrained green for found evidence, positive states)
- Warning: `amber-500` / `#f59e0b` (gaps, attention items)
- Error: `rose-500` / `#f43f5e` (missing evidence, critical gaps)
- Text primary: `white`
- Text secondary: `slate-400`
- Text muted: `slate-500`

**Typography:**
- Headings: `Inter` from `next/font/google` (weights: 400, 500, 600, 700)
- Body: `Inter`
- Mono: `font-mono` for code snippets / JSON previews / control IDs

**Spacing:**
- Section padding: `py-20` on desktop, `py-12` on mobile
- Container max-width: `max-w-6xl mx-auto px-6`
- Generous whitespace: avoid cramped sections

**Borders/Effects:**
- Minimal borders; use subtle `slate-800` or `slate-700` for card separation
- No heavy drop shadows
- Use `ring` sparingly for focus states
- Decorative effects: very limited; use subtle gradients only on primary CTAs

**Interactive elements:**
- Primary CTA: `bg-orange-500 hover:bg-orange-400 text-black`
- Secondary CTA: `border border-orange-500/30 text-orange-400 hover:bg-orange-500/10`
- Links: `text-orange-400 hover:text-orange-300`

## Form Handling (Revised for Cost)

**Option A: Static only (recommended for MVP)**
- No form backend cost
- CTA buttons link to `mailto:hello@mangologic.ai` with pre-filled subject
- Or: single-page form that opens user's email client
- Zero ongoing cost

**Option B: Formspree free tier**
- 50 submissions/month free
- Requires environment variable in Vercel/Cloudflare
- Minimal setup: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`

**Form fields (if form is added later):**
- Name (required)
- Work Email (required, validated client-side)
- Company (required)
- Framework Interest (select: SOC 2, ISO 27001, HIPAA, PCI-DSS, Other)
- Message (optional textarea)

**Validation:**
- Client-side with simple regex for email
- No backend validation needed

## Build Order
1. Scaffold `apps/marketing/` with Next.js + Tailwind + `output: 'export'`
2. Add `apps/marketing` to root `package.json` workspaces
3. Build UI primitives (`Button`, `Card`, `Section`) with minimal CSS
4. Build layout (`Navbar`, `Footer`, `layout.tsx` with global metadata)
5. Build Homepage sections in order: Hero → ReasoningDemo → Problem → Agent Flow → Integrations → Security → Frameworks → Customers → CTA
6. Build secondary pages: Product, Security, Frameworks, Resources, Demo
7. Add CSS transitions/animations using Tailwind utilities and `tailwindcss-animate`
8. Add `.env.example` (minimal, likely empty for static site)
9. Configure Cloudflare Pages or Vercel for static export
10. Connect domain

## Out of Scope
- Headless CMS (add only if nontechnical content updates become frequent)
- Blog engine (static placeholder is sufficient for MVP)
- Multi-language / i18n
- Advanced analytics / CRM integration (can add later)
- Shared component library with `apps/web` (keep marketing components isolated)

## Repo Strategy

**Recommended: Keep `apps/marketing/` in the existing GitHub repo.**

Rationale:
- Single source of truth for brand, copy, and product positioning
- Shared `pnpm` workspaces and tooling
- Easier to keep marketing copy aligned with product reality (`docs/gtm/` positioning)
- One CI/CD pipeline; deploy marketing site independently via Cloudflare Pages from the same repo
- No overhead of managing a second repository

**Alternative: Separate `mangologic-website` repo**
- Use only if marketing site needs completely different access controls or contributor base
- Increases overhead: separate CI, separate dependency management, copy drift risk

The plan assumes the **same repo** approach. The marketing site is a first-class workspace, not a standalone project.

## Validation
- Lighthouse performance > 90 on all pages
- Interactive demo works without backend
- Form submission routes to email (mailto or Formspree)
- Responsive on mobile (375px), tablet (768px), desktop (1440px)
- No references to Vercel/AWS ECS/Pinecone in security messaging
- TypeScript strict mode passes (`tsc --noEmit`)
- Static export produces clean `dist/` folder with no server-side code
- Bundle size < 100KB JS gzipped on homepage

## Open Questions / Decisions Needed
1. **Form backend**: User prefers minimal expense. Recommended: static `mailto:` fallback with optional Formspree free tier. No paid form service unless volume exceeds 50/month.
2. **Analytics**: Plausible or Cloudflare Web Analytics are privacy-friendly and free/cheap. Vercel Analytics also free on hobby tier.
3. **Typography**: Inter is default; user may prefer Geist or another modern sans-serif. Inter is safe and already used in `apps/web`.
4. **Content ownership**: Who writes copy for Product, Security, Frameworks, Resources pages? Plan assumes user provides or agent drafts based on existing docs.
5. **Reasoning visualization fidelity**: Should the demo show realistic-looking JSON/PDF outputs, or keep them abstract? Recommended: realistic mock output to maximize conversion.

## Risks
- **Bundle size**: Next.js runtime + React adds ~80KB gzipped. Acceptable for marketing site. Monitor total JS budget; avoid adding heavy libraries.
- **Design drift**: The site must not look like "another compliance SaaS." Enforce the reasoning visualization and mango/orange accent system consistently.
- **Content drift**: Marketing copy may diverge from product reality. Align with `docs/gtm/` positioning.
- **Domain/DNS**: User must own `mangologic.ai` and configure DNS for Cloudflare Pages.
- **Static export limitations**: No server-side redirects, no API routes. Ensure all navigation is client-side or static files.
- **Mobile reasoning viz**: The CONTROL→OBSERVE→REASON→DETECT→ACTION→PROVE chain must remain readable on 375px screens; may need abbreviated labels or vertical stacking with connectors.
