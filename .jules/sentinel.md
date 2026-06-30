## 2024-06-30 - Remove hardcoded JWT secret fallback

**Vulnerability:** A hardcoded secret (`dev-secret-change-me`) was used as a fallback for `JWT_SECRET` in `backend/src/auth/auth.module.ts` and `backend/src/auth/jwt.strategy.ts`. This poses a CRITICAL security risk because if the environment variable is missing in production, the application will silently fall back to a known, insecure secret, allowing attackers to forge valid JWTs and bypass authentication.

**Learning:** Hardcoded fallbacks for cryptographic secrets provide a false sense of security and fail open rather than failing securely. Missing critical secrets should cause the application to crash immediately so the configuration error can be noticed and fixed.

**Prevention:** Never use default or hardcoded values for critical security configurations like `JWT_SECRET`. Instead, validate the presence of these environment variables at application startup and throw an explicit error if they are missing. This ensures the application fails securely.
