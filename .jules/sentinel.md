
## 2024-05-24 - Hardcoded JWT Secret Fallback Removed
**Vulnerability:** The NestJS backend previously used a hardcoded fallback string ('dev-secret-change-me') for the JWT signature secret in both `auth.module.ts` and `jwt.strategy.ts` when `process.env.JWT_SECRET` was missing.
**Learning:** Developers often insert hardcoded secrets as fallbacks for local development convenience. However, if deployed to production without the environment variable properly configured, this exposes the application to critical token forgery attacks because the secret is known. The application fails insecurely rather than failing securely.
**Prevention:** Always enforce the presence of critical security configuration via environment variables by explicitly throwing an error at startup if they are missing. Avoid providing fallback secret strings in code.
