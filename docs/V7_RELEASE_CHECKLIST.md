# V7 Release Checklist

## COMPLETE

- Rollback checkpoint created before V7: `2259f02`.
- Next.js local docs reviewed for headers, metadata, sitemap, production and deployment behavior.
- Security headers added and verified locally.
- CSP added and verified locally. It is practical, not strict, because it uses `'unsafe-inline'`.
- Metadata, sitemap and robots now use configurable `NEXT_PUBLIC_SITE_URL`.
- PNG Open Graph image route added and verified.
- AI Assistant API hardened for content type, size limits, approved actions, response bounds, provider timeout and concurrency cap.
- Local health endpoint added at `/api/health`.
- Release verification script added and passed.
- README updated.
- VPS deployment docs created.
- VPS information checklist created.
- Dockerfile and `.dockerignore` prepared.
- Production lint/build passed.
- Local production server validation passed on `http://localhost:3001`.
- Browser interaction QA passed for command palette, mobile nav, project search, analytics export, checklist, RS485 and automation demos.
- AI Assistant QA passed for open, close, reopen, minimize, restore, drag, mobile bounds, greeting reset/preservation behavior and resume action.
- Responsive overflow sweep passed at 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px widths.
- Secret scan found no committed credential values.

## PENDING

- Provide real VPS, domain, DNS and OS details.
- Set production `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin.
- Configure reverse proxy and HTTPS.
- Decide whether to enable paid AI provider mode.
- Confirm resume PDF content before public launch.
- Confirm project media permissions before adding real screenshots.

## BLOCKED

- Docker image build verification is blocked locally because the Docker daemon was not running.
- Lighthouse score collection is blocked because temporary `npx lighthouse` install did not complete cleanly.
- The npm audit `braces` advisory is blocked on a compatible upstream fix; the available force fix would downgrade Next lint tooling.

## NOT APPLICABLE

- Database migration.
- File upload storage.
- Background worker deployment.
- Remote VPS deployment in V7.
- Public DNS changes in V7.
