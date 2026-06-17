## 2026-06-17 - [CRITICAL] Hardcoded JWT Secret
**Vulnerability:** The NestJS backend has a hardcoded fallback JWT secret (`dev-secret-change-me`) in `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded fallback secrets are extremely dangerous because they can easily end up being used in production if the environment variable is not set correctly. Since this app uses this JWT for administrative access, this is a critical authorization bypass vulnerability. If an attacker knows the fallback secret, they can generate valid admin tokens locally and use them to gain full access to the admin API.
**Prevention:** Never provide a hardcoded fallback for a secret. Throw an error on initialization if required secrets are missing.
