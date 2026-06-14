## 2024-06-14 - Hardcoded JWT Secret Fallback
**Vulnerability:** The application used a hardcoded fallback (`'dev-secret-change-me'`) for the JWT secret if `process.env.JWT_SECRET` was missing. This allows trivial forging of JWTs (including admin tokens) if the environment variable is accidentally omitted in production.
**Learning:** Default fallback values for cryptographic secrets create silent, critical vulnerabilities. It's better for an application to crash on startup (fail securely) than to start with a weak, known secret.
**Prevention:** Never use fallbacks for secrets. Enforce presence of required security environment variables on application startup.
