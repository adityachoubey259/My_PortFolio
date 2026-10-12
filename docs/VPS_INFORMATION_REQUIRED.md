# VPS Information Required

Provide these details after V7 when deployment begins. Do not paste passwords or private keys into project files.

1. VPS operating system and version
   - Find safely: `cat /etc/os-release` or hosting panel OS label.

2. CPU cores
   - Find safely: `nproc` or hosting panel resources page.

3. RAM
   - Find safely: `free -h`.

4. Available storage
   - Find safely: `df -h`.

5. Hosting provider
   - Use the provider name and plan type if known.

6. Domain or subdomain
   - Provide the exact intended hostname, for example `portfolio.example.com`.

7. DNS access availability
   - Confirm whether you can edit A/AAAA/CNAME records.

8. SSH access method
   - Say whether access is via SSH key, provider console, or managed panel.
   - Secure handoff: share a temporary public key or use the provider's collaborator feature. Do not send private SSH keys or root passwords in chat/docs.

9. Existing web server
   - Find safely: `systemctl status nginx`, `systemctl status apache2`, or `systemctl status caddy`.

10. Installed Docker/Node.js
   - Find safely: `node -v`, `npm -v`, `docker --version`.

11. Existing applications and occupied ports
   - Find safely: `sudo ss -tulpn`.

12. Firewall configuration
   - Find safely: `sudo ufw status` or provider firewall panel.

13. HTTPS certificate status
   - Find safely: check existing reverse-proxy config or `sudo certbot certificates` if Certbot is installed.

14. Deployment preference
   - Choose native Node.js/process manager or Docker if available.

15. AI provider and production usage preferences
   - Decide whether to run local Portfolio Knowledge Mode only, or enable paid provider mode with request limits.

Credential handoff should use a password manager, SSH public-key exchange, provider console access, or another secure channel. Do not commit credentials to this repository.
