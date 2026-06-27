## 2024-06-27 - Hardcoded Fallback for JWT_SECRET
**Vulnerability:** The application was using a hardcoded fallback value ('dev-secret-change-me') for `JWT_SECRET` in both `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** This is a critical security vulnerability because if the environment variable is accidentally omitted in production, the application will silently start using a known, easily guessable secret, potentially allowing attackers to forge JWTs and bypass authentication completely.
**Prevention:** Always enforce the presence of critical security environment variables (like `JWT_SECRET`) at startup. The application must fail securely by throwing an explicit error rather than falling back to a default value.
