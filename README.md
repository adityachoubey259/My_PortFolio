# Aditya Choubey Portfolio

Ultra-premium interactive portfolio for Aditya Choubey, built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, and Lucide icons.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

For a production-style local release check:

```bash
npm run build
npm run start -- -p 3001
npm run verify:release
```

`verify:release` checks public routes, the legacy analytics redirect, the resume PDF, security headers, health endpoint and key AI Assistant knowledge answers against `http://localhost:3001` by default. Use `VERIFY_BASE_URL=https://your-domain.example npm run verify:release` after a real deployment exists.

## Environment

Copy `.env.example` to a local `.env` file when needed. Keep real secrets out of Git.

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ASSISTANT_API_KEY=
ASSISTANT_MODEL=gpt-5-mini
ASSISTANT_PROVIDER_URL=https://api.openai.com/v1/chat/completions
ASSISTANT_TIMEOUT_MS=8000
```

Without `ASSISTANT_API_KEY`, the assistant uses local Portfolio Knowledge Mode.

## Update Content

Primary editable content lives in:

```text
src/content/profile.ts
```

Use that file to update projects, skills, experience, contact details, resume availability, and learning items. The project descriptions intentionally avoid invented metrics, dates, live links, screenshots, or unverified deployment claims.

## Add Resume

Place the real resume PDF at:

```text
public/resume/Aditya-Choubey-Resume.pdf
```

Then set `profile.resume.available` to `true` in `src/content/profile.ts`.

## Add Project Screenshots

Add real images under:

```text
public/projects/
```

Then replace the illustrative visuals in `src/components/sections/ProjectVisual.tsx` with `next/image` components and accurate alt text.

## Deployment Readiness

The verified local deployment target is a Node.js production server:

```bash
npm ci
npm run build
npm run start -- -p 3000
```

Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin after a production domain exists. See:

```text
docs/V7_PRODUCTION_AUDIT.md
docs/VPS_DEPLOYMENT_READINESS.md
docs/VPS_INFORMATION_REQUIRED.md
docs/V7_RELEASE_CHECKLIST.md
docs/V7_TEST_RESULTS.md
```
