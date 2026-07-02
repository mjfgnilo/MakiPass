## 2024-05-24 - Hardcoded JWT Secret Fallback
**Vulnerability:** Found hardcoded fallback for JWT_SECRET ('dev-secret-change-me') in `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded fallbacks for critical secrets in code risk being deployed to production environments if the environment variable is not properly set, allowing unauthorized access.
**Prevention:** Fail securely. If a required secret like JWT_SECRET is missing from the environment configuration, the application should throw an explicit error or fail to start instead of using an insecure default.
