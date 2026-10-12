# V7 Production Audit

Date: 2026-10-12

Decision: READY FOR DEPLOYMENT CONFIGURATION. The app was not deployed or exposed publicly.

## Architecture Overview

ADITYA OS is a Next.js 16.4.0 App Router portfolio using React 19.3.0, TypeScript, Tailwind CSS 4, Motion and Lucide. Most public pages are statically generated or partially prerendered. Dynamic server behavior is limited to `/api/assistant`; `/api/health` is a minimal liveness endpoint.

Primary content is centralized in `src/content/profile.ts`. The AI Assistant uses local retrieval from `src/lib/assistant/*` and can optionally call a provider when `ASSISTANT_API_KEY` or `OPENAI_API_KEY` is configured.

## Fixed Issues

- P1: Added production security headers in `next.config.ts`: CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, DNS prefetch control, Permissions Policy and COOP.
- P1: Replaced hardcoded localhost metadata/sitemap origin with `NEXT_PUBLIC_SITE_URL` via `src/lib/site.ts`.
- P1: Hardened assistant API with JSON content-type enforcement, body size limit, response length limit, approved-action filtering, no-store responses, provider timeout and concurrent provider request cap.
- P1: Added `/api/health` for simple process liveness.
- P2: Added generated PNG Open Graph image route at `/opengraph-image`.
- P2: Added `scripts/verify-release.mjs` and `npm run verify:release`.
- P2: Added Dockerfile and `.dockerignore` for container readiness.
- P2: Updated `.env.example` and README for production configuration.

## Security Findings

P0: None found.

P1: `npm audit --audit-level=moderate` reports a high advisory in the dev linting dependency path: `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`. `braces@3.0.3` is already the latest version available locally via npm, and `npm audit fix --force` would downgrade `eslint-config-next` to 14.2.35, a breaking change for this Next 16 project. This remains documented as an upstream dev-tooling advisory, not a runtime app dependency.

P1: CSP is practical and tested, but not strict. It includes `'unsafe-inline'` for scripts/styles to stay compatible with the current inline theme script and Next static rendering. `frame-ancestors 'none'` and `X-Frame-Options: DENY` are active.

P2: In-memory rate limiting protects a single Node process only. Multi-instance production deployment should use a shared store or reverse-proxy rate limiting.

Secrets scan found only placeholders and code references, not committed credentials.

## Dependency Findings

- Runtime dependency set is small: `next`, `react`, `react-dom`, `motion`, `lucide-react`.
- Node requirement from installed Next package: `>=20.9.0`.
- Local validation used Node `v24.15.0` and npm `11.12.1`.
- Major updates are available for some packages, but no major upgrade was made during V7 to avoid changing the functioning V6 behavior.

## Performance Results

Production build passed. Static generated asset total under `.next/static` was about 1,071,824 bytes across 34 files after V7.

Largest static files observed:
- `16hg2lfsbfrrn.js`: 229,627 bytes
- `35wp9ox4lmgkc.js`: 179,280 bytes
- `2o9yh7hja192h.js`: 150,013 bytes
- `0cz1d0mv5g_q7.js`: 112,594 bytes
- main CSS chunk: 53,047 bytes

Lighthouse was attempted with `npx lighthouse --version`, but the temporary install hung and was stopped. No Lighthouse score is claimed.

## Accessibility Findings

Automated lint passed. Manual/browser checks covered navigation, command palette, assistant dialog, mobile drawer, form controls, simulator controls and route interactions. No new V7 accessibility regression was found. Full WCAG 2.2 AA conformance is not claimed.

## Content And Privacy Findings

- Contact email and GitHub are present: `adityachoubey259@gmail.com`, `github.com/adityachoubey259`.
- Experience durations are conservative and verified in local content: Industrial Trade Link 6 months, CAITPL 3 months, tirth.ai 3 months.
- C++ and PLC/HMI/SCADA are labeled as current/ongoing learning.
- Public project media is conceptual; no real company screenshots are included.
- `public/` contains generic SVG assets, the generated OG source SVG, and the resume PDF.

## Remaining Risks

- Confirm the resume PDF content before public launch.
- Confirm publishing permission before adding real project screenshots or company artifacts.
- Configure production `NEXT_PUBLIC_SITE_URL` after the domain is known.
- Replace in-memory assistant rate limiting with proxy/shared-store limits if running multiple instances.
- Re-run `npm audit` after Next/eslint tooling publishes a compatible fix for the braces advisory.
