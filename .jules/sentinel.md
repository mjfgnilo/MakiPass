## 2024-06-28 - Hardcoded JWT Secret Fallbacks
**Vulnerability:** JWT_SECRET was configured with a hardcoded fallback value in `auth.module.ts` and `jwt.strategy.ts` (`dev-secret-change-me`). If the environment variable was missing, the application would silently start using the insecure default key.
**Learning:** Hardcoded secrets (even with "change-me" in the name) pose a critical risk because they allow attackers to forge valid JWTs if the app is accidentally deployed without the proper environment variables. The application must fail securely.
**Prevention:** Instead of providing a fallback value with `||`, throw an explicit error (`throw new Error('JWT_SECRET environment variable is missing')`) during initialization if the critical environment variable is absent.
