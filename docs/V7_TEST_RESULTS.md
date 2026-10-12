# V7 Test Results

Date: 2026-10-12

## Commands Executed

- `git add .; git commit -m "Rollback point before portfolio v7 production readiness"` -> pass, commit `2259f02`.
- `npm audit --audit-level=moderate` -> fail due unresolved dev-tooling `braces` advisory.
- Secret scan with `rg` -> pass, no committed secret values found.
- `npm run lint` -> pass.
- `npm run build` -> pass.
- `npm run start -- -p 3001` -> pass.
- `npm run verify:release` -> pass.
- `docker --version` -> pass, Docker CLI available.
- `docker build -t aditya-os-v7-local .` -> blocked, Docker daemon not running.
- `npx lighthouse --version` -> blocked, temporary install hung and was stopped.

## Production Route Checks

`npm run verify:release` checked:

- `/`
- `/projects`
- `/about`
- `/skills`
- `/experience`
- `/contact`
- `/recruiter`
- `/analytics`
- `/playground`
- `/playground/checklist`
- `/playground/rs485`
- `/playground/automation`
- `/lab`
- `/work/xecroai`
- `/work/itl-checklist`
- `/work/rs485-industrial-monitoring`
- `/work/n8n-workflow-automation`
- `/work/python-website-system`
- `/api/health`
- `/resume/Aditya-Choubey-Resume.pdf`
- `/robots.txt`
- `/sitemap.xml`

Legacy `/lab/analytics` redirect to `/analytics` passed.

## Security Checks

Verified headers on `/`:

- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

Assistant negative probes:

- non-JSON content type -> 415
- oversized body -> 413
- invalid JSON -> 400
- repeated requests from same IP key -> 429 after allowed window count

## AI Assistant Checks

Offline/local Portfolio Knowledge Mode answered correctly for:

- XecroAI
- ITL Checklist
- RS485 Monitoring
- n8n Automation
- Python Website System
- technical skills
- work experience
- education
- current learning
- resume
- contact

Verified facts:

- Industrial Trade Link: 6 months
- CAITPL: 3 months
- tirth.ai: 3 months
- C++: currently learning
- PLC/HMI/SCADA: ongoing learning

Browser assistant suite passed:

- open
- close
- reopen with fresh greeting
- minimize and restore with preserved conversation
- drag and clamp
- resume action
- compact mobile display

## Interaction Checks

Browser/CDP interaction suite passed:

- command palette
- mobile navigation drawer
- project search
- analytics filter and CSV export
- checklist progress control
- RS485 simulated fault
- automation route simulation

## Responsive Checks

Overflow/overlap sweep passed for homepage at:

- 360 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px
- 1920 px

Screenshots captured in ignored `.qa`:

- `v7-home-desktop.png`
- `v7-home-mobile.png`
- `v7-projects-desktop.png`
- `v7-project-detail-mobile.png`
- `v7-ai-open-desktop.png`

## Known Limitations

- Lighthouse score not collected.
- Dockerfile syntax/build not verified because Docker daemon was unavailable.
- Full WCAG conformance is not claimed.
- In-memory assistant rate limiting is process-local.
