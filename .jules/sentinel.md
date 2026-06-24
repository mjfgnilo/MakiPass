## 2024-06-24 - Hardcoded JWT Secret Fallback

**Vulnerability:** A hardcoded default JWT secret (`'dev-secret-change-me'`) was used in `auth.module.ts` and `jwt.strategy.ts` when `process.env.JWT_SECRET` was missing.
**Learning:** Hardcoded fallback secrets are extremely dangerous, as developers or deployment scripts might forget to provide an environment variable in production, leaving the application vulnerable to token forgery. Applications must fail securely.
**Prevention:** Instead of providing a fallback, the application must throw a hard error and fail to start if critical security configurations (like `JWT_SECRET`) are missing.
