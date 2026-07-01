## 2024-06-03 - [CRITICAL] Prevent Hardcoded Secrets in Authentication

**Vulnerability:** Hardcoded `JWT_SECRET` fallback value (`'dev-secret-change-me'`) used in NestJS `JwtModule` and `PassportStrategy`.
**Learning:** Hardcoded fallbacks, even seemingly innocent ones meant for development, risk being deployed to production if environment variables are misconfigured. This allows anyone knowing the fallback string to forge valid JWTs, completely bypassing authentication and impersonating any user (including admins).
**Prevention:** Always remove hardcoded fallback secrets. The application must fail-fast and securely crash on startup (e.g., throwing a startup error) if critical secrets like `JWT_SECRET` are not explicitly provided via environment variables.
