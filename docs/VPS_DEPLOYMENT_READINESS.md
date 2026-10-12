# VPS Deployment Readiness

Do not deploy yet. This document prepares the handover for the existing VPS after its details are provided.

## Production Requirements

- Node.js: `>=20.9.0` required by Next 16.4.0.
- Package manager: npm with `package-lock.json`; use `npm ci`.
- Build command: `npm run build`.
- Start command: `npm run start -- -p 3000`.
- Required environment variable for final SEO: `NEXT_PUBLIC_SITE_URL=https://real-domain.example`.
- Optional assistant variables: `ASSISTANT_API_KEY`, `ASSISTANT_MODEL`, `ASSISTANT_PROVIDER_URL`, `ASSISTANT_TIMEOUT_MS`.
- No database required.
- No persistent writable storage required for the current app.
- No background worker required.
- Static assets are served by Next from `public/` and `.next/static`.

## Recommended Approach

Recommended: Native Node.js deployment with a process manager.

Why: the current app uses standard Next server behavior, one dynamic assistant API route, local static assets and no database. A native Node process behind Nginx/Caddy/Apache is simple, inspectable and easy to roll back on a VPS.

Docker is also prepared with `Dockerfile` and `.dockerignore`, but the local Docker daemon was not running during V7, so the image build was not verified. Use Docker only if the VPS already supports it and you prefer containerized operations.

Static export is not recommended because the AI Assistant API route requires server support.

## Native Node Steps

1. Clone or upload the repository to the VPS.
2. Install Node.js `>=20.9.0`.
3. Create production `.env` from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
5. Run:

```bash
npm ci
npm run build
npm run start -- -p 3000
```

For a persistent process, use a process manager such as PM2 or systemd.

## Process Management

Example PM2 command:

```bash
pm2 start npm --name aditya-os -- run start -- -p 3000
pm2 save
```

Example checks:

```bash
pm2 status
pm2 logs aditya-os
curl -f http://127.0.0.1:3000/api/health
```

## Reverse Proxy And HTTPS

Put the Node process behind a reverse proxy. The proxy should:

- terminate HTTPS
- forward traffic to `127.0.0.1:3000`
- preserve `Host`, `X-Forwarded-For` and `X-Forwarded-Proto`
- enforce request body size limits
- optionally add shared rate limits for `/api/assistant`

Do not enable HSTS until HTTPS and domain/subdomain ownership are confirmed.

## Health Checks

Liveness: `GET /api/health` returns `{"status":"ok","service":"aditya-os"}`.

Readiness: also check `/`, `/projects`, `/resume/Aditya-Choubey-Resume.pdf` and `/api/assistant` local fallback with `npm run verify:release`.

## Logging

Start with process-manager logs and reverse-proxy access/error logs. Watch for:

- unexpected restarts
- 4xx/5xx spikes
- `/api/assistant` 429s
- provider failures when AI credentials are enabled
- disk usage and certificate renewal failures

## Backup And Recovery

Back up:

- repository commit SHA
- `.env` values in a secure password manager
- reverse-proxy config
- process-manager config
- resume PDF and public assets

Rollback:

1. Stop the process.
2. Check out the previous known-good commit.
3. Run `npm ci` if dependencies changed.
4. Run `npm run build`.
5. Restart.
6. Run `npm run verify:release` against the local URL.

Rollback checkpoint before V7: `2259f02`.

## Docker Notes

Prepared files:

- `Dockerfile`
- `.dockerignore`

Expected local image command:

```bash
docker build -t aditya-os .
docker run --env-file .env -p 3000:3000 aditya-os
```

V7 Docker build result: not verified because Docker CLI was installed but the Docker daemon was not running locally.

## Security Considerations

- Keep `.env` out of Git.
- Use HTTPS before public sharing.
- Restrict SSH access and use key-based login.
- Configure firewall rules for SSH, HTTP and HTTPS only.
- Add reverse-proxy rate limits for `/api/assistant` for public traffic.
- Review real project media before publishing.
