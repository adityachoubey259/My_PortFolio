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

## Deploy

The app is Vercel-compatible:

```bash
npm run build
```

Connect the repository to Vercel, keep the default Next.js settings, and add a real canonical URL in `src/app/layout.tsx` and `src/app/sitemap.ts` after a production domain exists.
